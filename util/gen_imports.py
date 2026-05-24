#!/usr/bin/env python3
"""
Phase 1 import generator for dewindow migration.

各 JS ファイルが使用している他ファイルのシンボルを静的解析し、
`import { ... } from '...'` を自動生成・挿入する。

Usage:
    python3 util/gen_imports.py                          # dry run (変更なし・出力のみ)
    python3 util/gen_imports.py --apply                  # 全対象ファイルに適用
    python3 util/gen_imports.py --apply --file roro/m/js/foot.js  # 1ファイルのみ
    python3 util/gen_imports.py --force --apply          # 既存の自動生成ブロックを再生成
"""

import os
import re
import sys
import argparse
from pathlib import Path
from collections import defaultdict

# ────────────────────────────────────────────────────────────────
# 定数
# ────────────────────────────────────────────────────────────────

BASE = Path('/workspace/ratorio')

TARGET_DIRS = [
    BASE / 'roro/m/js',
    BASE / 'ro4/m/js',
    BASE / 'roro/other/js',
    BASE / 'roro/common/js',
]

MARKER_START = '// === AUTO-GENERATED IMPORTS ===\n'
MARKER_END   = '// === END AUTO-GENERATED IMPORTS ===\n'

MIN_SYM_LEN = 4  # 3文字以下は偽陽性リスクが高いため除外


# ────────────────────────────────────────────────────────────────
# コメント・文字列除去（状態機械ベース）
# ────────────────────────────────────────────────────────────────

def strip_comments_and_strings(content: str) -> str:
    """
    JS ソースからコメントと文字列リテラルを除去して返す。
    - /* ... */  → 空白に置換
    - // ...     → 空白に置換
    - "...", '...' → "" / '' に置換
    - `...`      → `` に置換（${} 内は無視）
    """
    result = []
    i = 0
    n = len(content)

    while i < n:
        c = content[i]

        # ── 行コメント
        if c == '/' and i + 1 < n and content[i + 1] == '/':
            while i < n and content[i] != '\n':
                i += 1

        # ── ブロックコメント
        elif c == '/' and i + 1 < n and content[i + 1] == '*':
            i += 2
            while i < n - 1:
                if content[i] == '*' and content[i + 1] == '/':
                    i += 2
                    break
                i += 1
            else:
                i = n

        # ── ダブルクォート文字列
        elif c == '"':
            result.append('"')
            i += 1
            while i < n and content[i] != '"':
                if content[i] == '\\':
                    i += 2
                else:
                    i += 1
            result.append('"')
            if i < n:
                i += 1

        # ── シングルクォート文字列
        elif c == "'":
            result.append("'")
            i += 1
            while i < n and content[i] != "'":
                if content[i] == '\\':
                    i += 2
                else:
                    i += 1
            result.append("'")
            if i < n:
                i += 1

        # ── テンプレートリテラル（${} 展開は単純に無視）
        elif c == '`':
            result.append('`')
            i += 1
            depth = 0
            while i < n:
                ch = content[i]
                if ch == '\\':
                    i += 2
                    continue
                if ch == '`' and depth == 0:
                    result.append('`')
                    i += 1
                    break
                if ch == '$' and i + 1 < n and content[i + 1] == '{':
                    depth += 1
                    i += 2
                    continue
                if ch == '}' and depth > 0:
                    depth -= 1
                i += 1

        else:
            result.append(c)
            i += 1

    return ''.join(result)


# ────────────────────────────────────────────────────────────────
# ファイル収集
# ────────────────────────────────────────────────────────────────

def collect_js_files(dirs: list) -> list:
    files = []
    for d in dirs:
        if d.exists():
            for f in sorted(d.rglob('*.js')):
                files.append(f)
    return files


# ────────────────────────────────────────────────────────────────
# エクスポートシンボル抽出
# ────────────────────────────────────────────────────────────────

# export function / export async function / export class / export const|let|var NAME
_EXPORT_DIRECT_RE = re.compile(
    r'^export\s+(?:async\s+)?(?:function\*?|class|const|let|var)\s+(\w+)',
    re.MULTILINE
)

def extract_direct_exports(stripped: str) -> list:
    """コメント除去済みソースからエクスポートシンボル名を抽出する。"""
    return [m.group(1) for m in _EXPORT_DIRECT_RE.finditer(stripped)
            if len(m.group(1)) >= MIN_SYM_LEN]


# 非 export なトップレベル関数/クラス宣言（export function は除外）
_LOCAL_DECL_RE = re.compile(
    r'^(?!export\s)(?:async\s+)?(?:function\*?|class)\s+(\w+)',
    re.MULTILINE
)

def extract_local_declared_names(stripped: str) -> set:
    """コメント除去済みソースから非 export なトップレベル宣言名を抽出する。
    これらは import バインディングと名前が衝突するため exclude に加える必要がある。
    """
    return {m.group(1) for m in _LOCAL_DECL_RE.finditer(stripped)
            if len(m.group(1)) >= MIN_SYM_LEN}


# window.X = ... パターン（代入のみ・比較演算子は除外）
_WINDOW_ASSIGN_RE = re.compile(r'\bwindow\.(\w+)\s*=[^=]')

def extract_window_new_value_names(stripped: str) -> set:
    """コメント除去済みソースで window.X = <X 以外の式> と代入されているシンボル名を返す。

    window.X = X （コンパットブロックの再エクスポート）は除外。
    window.X = new Foo()、window.X = someFunc() などの「新値代入」だけを対象にする。
    これらを ESM import すると、import バインディングが新値を見られなくなるため import 禁止。
    """
    names = set()
    for m in _WINDOW_ASSIGN_RE.finditer(stripped):
        name = m.group(1)
        if len(name) < MIN_SYM_LEN:
            continue
        rhs_pos = m.end()
        # '=' の直後の空白をスキップ
        while rhs_pos < len(stripped) and stripped[rhs_pos] in ' \t':
            rhs_pos += 1
        # RHS が同名識別子 (window.X = X) かチェック → その場合はスキップ
        rhs_end = rhs_pos + len(name)
        if (stripped[rhs_pos:rhs_end] == name and
                (rhs_end >= len(stripped) or
                 not (stripped[rhs_end].isalnum() or stripped[rhs_end] in '_$'))):
            continue  # 再エクスポートパターン → スキップ
        names.add(name)
    return names


def extract_window_assigned_names(stripped: str) -> set:
    """後方互換: extract_window_new_value_names へのエイリアス。"""
    return extract_window_new_value_names(stripped)


_BARE_WRITE_RE = re.compile(
    # X = ... (bareidentifier, not preceded by . { : word $ ⇒ not a property or destructuring)
    r'(?<![.{:\w$])([A-Za-z_][A-Za-z0-9_]{3,})\s*(?:=(?!=)|\+=|-=|\*=|/=|%=)'
)
_DECL_KEYWORDS = frozenset({
    'var', 'let', 'const', 'function', 'class', 'return', 'export',
    'import', 'delete', 'typeof', 'void', 'throw', 'case', 'default',
    'else', 'async', 'await',
})

def extract_bare_write_targets(stripped: str) -> set:
    """コメント除去済みソースで bare 代入 X = ... が行われている識別子名を返す。
    symbol_map のフィルタリングは呼び出し側で行う。
    """
    targets = set()
    for m in _BARE_WRITE_RE.finditer(stripped):
        name = m.group(1)
        if name in _DECL_KEYWORDS:
            continue
        targets.add(name)
    return targets


def build_global_window_assigned_set(all_files: list, symbol_map: dict) -> set:
    """全ファイルで window.X=新値 または 他ファイルのシンボルへの bare X=... が行われる
    シンボル名を収集する。

    ① window.X = <X 以外の式>: window グローバルを新値で更新するパターン
    ② bare X = <何か> かつ X が他ファイルのエクスポート: インポートバインディングへの
       代入は ESM では read-only → TypeError になる

    いずれかのパターンに該当するシンボルを ESM import すると動作が壊れるため除外する。
    """
    # symbol → 定義ファイル の逆引きマップ
    sym_to_file: dict = symbol_map  # {name: Path}

    all_assigned: set = set()
    all_foreign_writes: set = set()

    for fpath in all_files:
        # このファイルが自身でエクスポートしているシンボル（自己参照の bare write は問題なし）
        own_syms = {name for name, src in sym_to_file.items() if src == fpath}

        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception:
            continue

        stripped = strip_comments_and_strings(content)
        stripped_no_import = re.sub(r'^import\s+[^\n]+\n', '', stripped, flags=re.MULTILINE)

        all_assigned |= extract_window_new_value_names(stripped)

        # 他ファイルのシンボルへの bare write → 全ファイルで import 禁止
        bare_writes = extract_bare_write_targets(stripped_no_import)
        foreign_writes = (bare_writes & set(sym_to_file.keys())) - own_syms
        all_foreign_writes |= foreign_writes

    combined = all_assigned | all_foreign_writes
    print(f'  window 新値代入: {len(all_assigned)}, 他ファイルへの bare 代入: {len(all_foreign_writes)}, 合計: {len(combined)}')
    return combined


# ────────────────────────────────────────────────────────────────
# DefineEnum 定数抽出
# ────────────────────────────────────────────────────────────────

# CGlobalConstManager.DefineEnum("EnumName", ["CONST_A", "CONST_B", ...], ...)
_DEFINE_ENUM_RE = re.compile(
    r'CGlobalConstManager\.Define(?:Pseudo)?Enum\s*\([^,]+,\s*\[(.*?)\]',
    re.DOTALL
)
_QUOTED_IDENT_RE = re.compile(r'"([A-Za-z_][A-Za-z0-9_]{3,})"')

def strip_comments_only(content: str) -> str:
    """コメント（/* */ と //）のみ除去し、文字列リテラルは保持する。"""
    result = []
    i = 0
    n = len(content)
    while i < n:
        if content[i] == '/' and i + 1 < n and content[i + 1] == '/':
            while i < n and content[i] != '\n':
                i += 1
        elif content[i] == '/' and i + 1 < n and content[i + 1] == '*':
            i += 2
            while i < n - 1:
                if content[i] == '*' and content[i + 1] == '/':
                    i += 2
                    break
                i += 1
            else:
                i = n
        else:
            result.append(content[i])
            i += 1
    return ''.join(result)


def extract_define_enum_constants(content_no_comment: str) -> list:
    """コメント除去済みソース（文字列リテラルは保持）から DefineEnum で定義された定数名を抽出する。"""
    constants = []
    for m in _DEFINE_ENUM_RE.finditer(content_no_comment):
        for cm in _QUOTED_IDENT_RE.finditer(m.group(1)):
            constants.append(cm.group(1))
    return constants


def build_define_enum_map(all_files: list) -> tuple:
    """
    {constant_name: Path} のマップを構築する（DefineEnum 定数）。
    同名定数が複数ファイルに存在する場合は重複として除外。
    """
    seen_once: dict = {}
    duplicates: set = set()

    for fpath in all_files:
        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception:
            continue

        content_nc = strip_comments_only(content)
        for const in extract_define_enum_constants(content_nc):
            if const in seen_once:
                if seen_once[const] != fpath:
                    duplicates.add(const)
            else:
                seen_once[const] = fpath

    enum_map = {c: p for c, p in seen_once.items() if c not in duplicates}
    return enum_map, duplicates


# ────────────────────────────────────────────────────────────────
# 既存 import 解析
# ────────────────────────────────────────────────────────────────

_IMPORT_BLOCK_RE = re.compile(r'^import\s+\{([^}]+)\}', re.MULTILINE)

def extract_existing_imported_symbols(content: str) -> set:
    """ファイル内の既存 import 文から取り込み済みシンボル名を返す。"""
    symbols = set()
    for m in _IMPORT_BLOCK_RE.finditer(content):
        for sym in m.group(1).split(','):
            s = sym.strip()
            # "sym as alias" 形式への対応
            if ' as ' in s:
                s = s.split(' as ')[0].strip()
            if s:
                symbols.add(s)
    return symbols


def extract_import_file_paths(content: str, fpath: Path) -> set:
    """content 内の import 文が参照するファイルパス（resolve済み）を返す。"""
    paths = set()
    # from '...' または from "..."
    for m in re.finditer(r"from\s+'([^']+)'|from\s+\"([^\"]+)\"", content):
        raw = m.group(1) or m.group(2)
        resolved = (fpath.parent / raw).resolve()
        paths.add(resolved)
    # サイドエフェクト: import '...' または import "..."
    for m in re.finditer(r"^\s*import\s+'([^']+)'\s*;|^\s*import\s+\"([^\"]+)\"\s*;",
                         content, re.MULTILINE):
        raw = m.group(1) or m.group(2)
        resolved = (fpath.parent / raw).resolve()
        paths.add(resolved)
    return paths


def find_last_import_end_line_index(lines: list) -> int:
    """最後の import 文の末尾行インデックス（0-based）を返す。なければ -1。
    複数行 import（import { ... } from '...';）に対応。
    """
    last_end = -1
    i = 0
    n = len(lines)

    while i < n:
        stripped = lines[i].lstrip()
        if stripped.startswith('import ') and not stripped.startswith('import.meta'):
            line = lines[i]
            # 同一行で完結するか確認（from '...' が同じ行にある）
            if "from '" in line or 'from "' in line:
                last_end = i
                i += 1
            else:
                # 複数行 import: "from '...'" が出るまで探す
                j = i + 1
                while j < n:
                    if "from '" in lines[j] or 'from "' in lines[j]:
                        last_end = j
                        i = j + 1
                        break
                    j += 1
                else:
                    # 閉じが見つからなかった（壊れたファイル）
                    i = j
        else:
            i += 1

    return last_end


# ────────────────────────────────────────────────────────────────
# シンボルマップ構築
# ────────────────────────────────────────────────────────────────

def build_symbol_map(all_files: list) -> tuple:
    """
    {symbol_name: Path} のマップを構築する。
    同名シンボルが複数ファイルに存在する場合は重複として除外。
    """
    symbol_map: dict = {}   # symbol -> Path
    seen_once: dict = {}    # symbol -> first Path
    duplicates: set = set()

    for fpath in all_files:
        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception as e:
            print(f'  WARN: 読み込み失敗 {fpath}: {e}', file=sys.stderr)
            continue

        stripped = strip_comments_and_strings(content)
        for sym in extract_direct_exports(stripped):
            if sym in seen_once:
                if seen_once[sym] != fpath:
                    duplicates.add(sym)
            else:
                seen_once[sym] = fpath

    # 重複のないシンボルのみマップへ
    for sym, fpath in seen_once.items():
        if sym not in duplicates:
            symbol_map[sym] = fpath

    return symbol_map, duplicates


# ────────────────────────────────────────────────────────────────
# 相対パス計算
# ────────────────────────────────────────────────────────────────

def relative_import_path(from_file: Path, to_file: Path) -> str:
    rel = os.path.relpath(to_file, from_file.parent)
    if not rel.startswith('.'):
        rel = './' + rel
    return rel


# ────────────────────────────────────────────────────────────────
# import ブロック生成
# ────────────────────────────────────────────────────────────────

def format_import_line(symbols: list, rel_path: str) -> str:
    """シンボルリストと相対パスから import 文を生成する。"""
    syms = sorted(symbols)
    sym_total_len = sum(len(s) for s in syms) + 2 * (len(syms) - 1)

    if sym_total_len <= 80:
        return f"import {{ {', '.join(syms)} }} from '{rel_path}';\n"
    else:
        # 80文字ごとに折り返し
        lines = []
        current = []
        current_len = 0
        for s in syms:
            if current and current_len + len(s) + 2 > 80:
                lines.append('         ' + ', '.join(current) + ',')
                current = [s]
                current_len = len(s)
            else:
                current.append(s)
                current_len += len(s) + (2 if current_len > 0 else 0)
        if current:
            lines.append('         ' + ', '.join(current))
        body = '\n'.join(lines)
        return f"import {{\n{body}\n}} from '{rel_path}';\n"


# ────────────────────────────────────────────────────────────────
# AUTO-GENERATED ブロック操作
# ────────────────────────────────────────────────────────────────

def strip_auto_generated(content: str) -> str:
    """AUTO-GENERATED IMPORTS ブロックを除去して返す。"""
    if MARKER_START not in content:
        return content
    start = content.index(MARKER_START)
    end_marker = content.find(MARKER_END)
    if end_marker != -1:
        return content[:start] + content[end_marker + len(MARKER_END):]
    return content[:start]


# ────────────────────────────────────────────────────────────────
# HTML ロード順マップ（前方 import 検出用）
# ────────────────────────────────────────────────────────────────

HTML_FILE = BASE / 'ro4/m/calcx.html'
# <base href="../../roro/m/"> → /workspace/ratorio/roro/m/
HTML_BASE = BASE / 'roro/m'

def build_html_position_map() -> dict:
    """calcx.html の script src → HTML行番号マップを構築する。
    base href を考慮してパスを解決する。
    """
    position_map: dict = {}
    if not HTML_FILE.exists():
        return position_map
    with open(HTML_FILE, encoding='utf-8') as f:
        for lineno, line in enumerate(f, 1):
            m = re.search(r'<script[^>]+src="([^"]+)"', line)
            if m:
                src = m.group(1)
                if src.startswith('//') or src.startswith('http'):
                    continue
                try:
                    resolved = (HTML_BASE / src).resolve()
                    position_map[resolved] = lineno
                except Exception:
                    pass
    return position_map


# ────────────────────────────────────────────────────────────────
# 循環依存チェック（到達可能性 BFS）
# ────────────────────────────────────────────────────────────────

def is_reachable(graph: dict, src, dst) -> bool:
    """graph で src から dst に到達可能か（BFS）。"""
    if src == dst:
        return True
    visited = {src}
    queue = list(graph.get(src, set()))
    while queue:
        node = queue.pop()
        if node == dst:
            return True
        if node not in visited:
            visited.add(node)
            queue.extend(graph.get(node, set()) - visited)
    return False


# ────────────────────────────────────────────────────────────────
# 1ファイルの計画 import を計算（書き込みなし）
# ────────────────────────────────────────────────────────────────

def compute_planned_imports(fpath: Path, content: str,
                             symbol_map: dict, define_enum_map: dict,
                             global_window_assigned: set = frozenset()) -> tuple:
    """
    ファイルに追加すべき import を計算する（ファイル書き込みなし）。
    content: AUTO-GENERATED ブロック除去済みのファイル内容
    Returns: (named: {src_path: [syms]}, side: set of src_path)
    """
    stripped = strip_comments_and_strings(content)
    own_exports = set(extract_direct_exports(stripped))
    local_decls = extract_local_declared_names(stripped)
    window_assigned = extract_window_assigned_names(stripped)
    existing_imports = extract_existing_imported_symbols(content)

    # import文自体のシンボルを除去（偽陽性防止）
    stripped_no_import = re.sub(r'^import\s+\{[^}]+\}[^\n]*\n', '', stripped, flags=re.MULTILINE)

    # bare identifier をトークン集合として抽出
    bare_tokens = set(re.findall(r'(?<![.\w$])([A-Za-z_][A-Za-z0-9_]{3,})(?![\w$])',
                                  stripped_no_import))

    # 自身が export/定義しているシンボル、window 代入シンボル（自ファイル・全ファイル）、既存 import は除外
    # window.X = ... パターン: import するとバインディングが window グローバルを隠蔽するため
    exclude = own_exports | local_decls | window_assigned | global_window_assigned | existing_imports
    named: dict = defaultdict(list)

    for sym in bare_tokens & set(symbol_map.keys()):
        if sym in exclude:
            continue
        src_file = symbol_map[sym]
        if src_file == fpath:
            continue
        named[src_file].append(sym)

    # 既存のサイドエフェクト import を収集
    existing_side: set = set()
    for line in content.splitlines():
        for pat in [r"^\s*import\s+'([^']+)'\s*;", r'^\s*import\s+"([^"]+)"\s*;']:
            m = re.match(pat, line)
            if m:
                existing_side.add((fpath.parent / m.group(1)).resolve())

    # DefineEnum 定数のサイドエフェクト import
    side: set = set()
    for const in bare_tokens & set(define_enum_map.keys()):
        src_file = define_enum_map[const]
        if src_file == fpath:
            continue
        if src_file in named:
            continue  # 名前付き import でカバー済み
        if src_file.resolve() in existing_side:
            continue  # 既存サイドエフェクト import
        side.add(src_file)

    return dict(named), side


# ────────────────────────────────────────────────────────────────
# 2パス: 循環依存を回避した安全な import セットを計算
# ────────────────────────────────────────────────────────────────

def build_cycle_safe_imports(all_files: list, symbol_map: dict,
                              define_enum_map: dict, force: bool) -> tuple:
    """
    循環依存を回避した安全な import セットを 2 パスで計算する。

    Pass 1: 全ファイルの既存（手書き）import グラフを構築
    Pass 2: 各ファイルの計画 import を計算し、循環辺はスキップ

    Returns:
        safe: {fpath: (safe_named: {src→syms}, safe_side: set)}
        content_map: {fpath: content_stripped}  # AUTO-GENERATED 除去済み
    """
    all_resolved = {f.resolve() for f in all_files}

    # 全ファイルの window 代入・bare 代入シンボルを収集（ESM バインディング問題防止）
    print('window 代入・bare 代入シンボルを収集中...')
    global_window_assigned = build_global_window_assigned_set(all_files, symbol_map)

    # ── Pass 1: 既存 import グラフを構築
    print('既存 import グラフを構築中...')
    content_map: dict = {}   # fpath → content (with or without auto-gen stripped)
    existing_graph: dict = {}  # resolved_path → set of resolved_paths

    for fpath in all_files:
        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception:
            content_map[fpath] = ''
            existing_graph[fpath.resolve()] = set()
            continue

        if force:
            # --force: AUTO-GENERATED ブロックを除去して手書き import のみを残す
            content = strip_auto_generated(content)
        # else: AUTO-GENERATED ブロックも含めてグラフに入れる（再生成しないため）

        content_map[fpath] = content
        imported = extract_import_file_paths(content, fpath)
        existing_graph[fpath.resolve()] = imported & all_resolved

    # ── Pass 2: 計画 import を計算し、循環辺をスキップしながら追加
    # 前方 import（HTML順で早いファイルが遅いファイルを import）は ESM では問題ない:
    # ESM はモジュールグラフを解決してから評価するため、import 先が先に評価される。
    # 唯一の本当の制約は循環依存のみ（`is_reachable` で検出済み）。
    print('計画 import を計算中（循環依存チェック込み）...')
    full_graph: dict = {fp: set(s) for fp, s in existing_graph.items()}
    safe: dict = {}
    total_skipped_cycle = 0

    for fpath in all_files:
        fp = fpath.resolve()
        content = content_map.get(fpath, '')

        # --force なしでは AUTO-GENERATED 済みファイルをスキップ
        if not force and MARKER_START in content:
            safe[fpath] = ({}, set())
            continue

        if not content:
            safe[fpath] = ({}, set())
            continue

        named, side = compute_planned_imports(fpath, content, symbol_map, define_enum_map,
                                              global_window_assigned)

        safe_named: dict = {}
        safe_side: set = set()

        # 名前付き import: 循環を作らないものだけ追加
        for src_file, syms in named.items():
            sfp = src_file.resolve()
            if not is_reachable(full_graph, sfp, fp):
                full_graph[fp].add(sfp)
                safe_named[src_file] = syms
            else:
                total_skipped_cycle += 1

        # サイドエフェクト import: 循環を作らないものだけ追加
        for src_file in side:
            sfp = src_file.resolve()
            if not is_reachable(full_graph, sfp, fp):
                full_graph[fp].add(sfp)
                safe_side.add(src_file)
            else:
                total_skipped_cycle += 1

        safe[fpath] = (safe_named, safe_side)

    print(f'  循環スキップ: {total_skipped_cycle} エッジ')
    return safe, content_map


# ────────────────────────────────────────────────────────────────
# 1ファイルを処理（事前計算済み import を書き込む）
# ────────────────────────────────────────────────────────────────

def process_file(fpath: Path, safe_named: dict, safe_side: set,
                 content_stripped: str, dry_run: bool = True,
                 force_cleanup: bool = False) -> bool:
    """
    事前計算済みの cycle-safe import をファイルに書き込む。
    safe_named: {src_path: [syms]}
    safe_side: set of src_path
    content_stripped: AUTO-GENERATED ブロック除去済みのファイル内容
    force_cleanup: True の場合、import が空でも旧ブロックを除去して書き込む
    """
    if not safe_named and not safe_side:
        if force_cleanup:
            tag = '[DRY]' if dry_run else 'CLEANED'
            print(f'  {tag} {fpath.relative_to(BASE)}  (import なし・旧ブロック削除)')
            if not dry_run:
                fpath.write_text(content_stripped, encoding='utf-8')
            return True
        return False

    lines = content_stripped.splitlines(keepends=True)

    # ── import ブロックを生成
    import_lines = [MARKER_START]

    # サイドエフェクト import（ファイル名順）
    for src_file in sorted(safe_side, key=lambda f: str(f.relative_to(BASE))):
        rel = relative_import_path(fpath, src_file)
        import_lines.append(f"import '{rel}';\n")

    # 名前付き import（ファイル名順）
    for src_file in sorted(safe_named.keys(), key=lambda f: str(f.relative_to(BASE))):
        rel = relative_import_path(fpath, src_file)
        import_lines.append(format_import_line(safe_named[src_file], rel))

    import_lines.append(MARKER_END)

    # ── 挿入位置を決定（最後の import 文の末尾行の直後）
    insert_at = find_last_import_end_line_index(lines) + 1

    # ── 挿入
    new_lines = lines[:insert_at] + import_lines + lines[insert_at:]
    new_content = ''.join(new_lines)

    total_syms = sum(len(v) for v in safe_named.values())
    tag = '[DRY]' if dry_run else 'UPDATED'
    print(f'  {tag} {fpath.relative_to(BASE)}'
          f'  ({len(safe_named)} files, {total_syms} syms'
          f'{f", {len(safe_side)} side-fx" if safe_side else ""})')

    if not dry_run:
        fpath.write_text(new_content, encoding='utf-8')

    return True


# ────────────────────────────────────────────────────────────────
# メイン
# ────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description='Phase 1: auto-generate import statements')
    parser.add_argument('--apply', action='store_true',
                        help='実際にファイルを変更する（デフォルトは dry run）')
    parser.add_argument('--force', action='store_true',
                        help='既存の AUTO-GENERATED IMPORTS ブロックを再生成する')
    parser.add_argument('--file', metavar='PATH',
                        help='対象を1ファイルに絞る（BASE からの相対パス）')
    parser.add_argument('--stats', action='store_true',
                        help='シンボルマップの統計のみ表示して終了')
    args = parser.parse_args()

    dry_run = not args.apply

    print('=== Phase 1: import 自動生成 ===')
    print(f'  モード: {"dry run" if dry_run else "APPLY"}')
    if args.force:
        print('  --force: 既存ブロックを再生成（循環依存チェック込み）')
    print()

    # ── 全 JS ファイルを収集
    all_files = collect_js_files(TARGET_DIRS)
    print(f'対象ファイル総数: {len(all_files)}')

    # ── シンボルマップを構築
    print('シンボルマップを構築中...')
    symbol_map, duplicates = build_symbol_map(all_files)
    print(f'  ユニークシンボル: {len(symbol_map)}')
    print(f'  重複除外シンボル: {len(duplicates)}')
    if duplicates and args.stats:
        for sym in sorted(duplicates):
            print(f'    重複: {sym}')

    # ── DefineEnum 定数マップを構築
    print('DefineEnum 定数マップを構築中...')
    define_enum_map, enum_dups = build_define_enum_map(all_files)
    print(f'  DefineEnum 定数: {len(define_enum_map)}')
    if enum_dups:
        print(f'  重複除外: {len(enum_dups)}')
    print()

    if args.stats:
        return

    # ── 2パスで循環依存を回避した安全な import セットを計算
    safe, content_map = build_cycle_safe_imports(
        all_files, symbol_map, define_enum_map, force=args.force
    )
    print()

    # ── 処理対象ファイルを決定
    if args.file:
        target_path = (BASE / args.file).resolve()
        targets = [f for f in all_files if f.resolve() == target_path]
        if not targets:
            print(f'ERROR: ファイルが見つかりません: {BASE / args.file}')
            sys.exit(1)
    else:
        targets = all_files

    # ── 各ファイルを処理
    modified = 0
    skipped = 0
    for fpath in targets:
        safe_named, safe_side = safe.get(fpath, ({}, set()))
        content_stripped = content_map.get(fpath, '')

        # content_map は --force 時に AUTO-GENERATED を除去済み
        # 元ファイルに AUTO-GENERATED ブロックがあったか判定
        orig_had_block = MARKER_START in (fpath.read_text(encoding='utf-8', errors='ignore'))

        # --force なし + AUTO-GENERATED 済み → スキップ
        if not args.force and orig_had_block:
            skipped += 1
            continue

        # --force + 元ブロックあり → import が空でも旧ブロックを除去
        force_cleanup = args.force and orig_had_block

        result = process_file(fpath, safe_named, safe_side,
                               content_stripped, dry_run=dry_run,
                               force_cleanup=force_cleanup)
        if result:
            modified += 1
        else:
            skipped += 1

    print()
    print(f'=== 完了 ===')
    print(f'  変更{"予定" if dry_run else "済み"}: {modified} ファイル')
    print(f'  スキップ: {skipped} ファイル')
    if dry_run:
        print()
        print('→ 実際に適用するには --apply フラグを付けて再実行してください。')


if __name__ == '__main__':
    main()
