#!/usr/bin/env python3
"""
scan_inline_handlers.py — inline ハンドラ文字列の window カバレッジスキャナ

JS ファイル内の setAttribute / HtmlSetAttribute / HTML文字列 に埋め込まれた
インラインハンドラ文字列を静的解析し、参照関数が window compat ブロックで
カバーされているかを確認する。

スキャン対象パターン:
  A.  HtmlSetAttribute(el, "onXxx", "<文字列リテラル>")
  A2. HtmlSetAttribute(el, "onXxx", "FuncName(" + ...)   ← 連結の先頭フラグメント
  B.  el.setAttribute("onXxx", "<文字列リテラル>")
  B2. el.setAttribute("onXxx", "FuncName(" + ...)        ← 同上
  C.  HTML文字列内の onXxx="handler()"                   ← myInnerHtml / innerHTML 等
  D.  HTML文字列内の onXxx='handler()'

既知の限界（スキャンしないもの）:
  - 完全動的な連結文字列  ("Func(" + v1 + "," + v2 + ")") — A2/B2 では先頭フラグメントのみ検出
  - テンプレートリテラル中の ${} 式
  - roro/other/ 以下のファイル
  - select2.custom.js 等のサードパーティ周辺コード

使用方法 (ratorio/ ディレクトリから実行):
    python util/scan_inline_handlers.py            # MISSING のみ表示
    python util/scan_inline_handlers.py --verbose  # COVERED も表示
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent  # util/ → ratorio/

JS_SCAN_DIRS = [
    ROOT / "roro/m/js",
    ROOT / "ro4/m/js",
    ROOT / "roro/common/js",
]

# ---------------------------------------------------------------------------
# 常にスキップする識別子（組み込み・DOM API・非関数名）
# ---------------------------------------------------------------------------
BUILTIN_SKIP = frozenset({
    # JS 組み込み
    "this", "new", "typeof", "instanceof", "void", "delete", "return",
    "true", "false", "null", "undefined",
    "parseInt", "parseFloat", "isNaN", "isFinite",
    "encodeURIComponent", "decodeURIComponent", "eval",
    "JSON", "Math", "Date", "Array", "Object", "String", "Number",
    "Boolean", "RegExp", "Error", "Promise", "Set", "Map",
    "setTimeout", "clearTimeout", "setInterval", "clearInterval",
    "alert", "confirm", "prompt",
    "console", "document", "window", "location", "navigator",
    # HTML / DOM コンストラクタ
    "Option", "Event", "CustomEvent",
    # JS キーワード / よく出る非関数トークン
    "function", "class", "const", "let", "var", "if", "else",
    "for", "while", "do", "switch", "case", "break", "continue",
    "try", "catch", "finally", "throw",
})

# ---------------------------------------------------------------------------
# ユーティリティ
# ---------------------------------------------------------------------------

def strip_block_comments(text: str) -> str:
    """/* ... */ ブロックコメントを除去（行数を保持するため改行は残す）"""
    return re.sub(
        r'/\*.*?\*/',
        lambda m: '\n' * m.group().count('\n'),
        text,
        flags=re.DOTALL,
    )


def pos_to_lineno(text: str, pos: int) -> int:
    return text[:pos].count('\n') + 1


def extract_func_names(handler_str: str) -> list:
    """
    ハンドラ文字列から window 上で必要な識別子（関数 / クラス名）を抽出する。

    "FuncA(args) | FuncB(arg)"  → ["FuncA", "FuncB"]
    "Class.Method(args)"        → ["Class"]   # window.Class が必要
    """
    names = []
    # 識別子 (+ オプションの .メソッド名) + "(" のパターン
    for m in re.finditer(
        r'\b([A-Za-z_$][A-Za-z0-9_$]*)(?:\.[A-Za-z_$][A-Za-z0-9_$]*)?\s*\(',
        handler_str,
    ):
        top = m.group(1)  # "Class.Method(" → "Class"
        if top not in BUILTIN_SKIP:
            names.append(top)
    return list(dict.fromkeys(names))  # 重複除去・順序保持


# ---------------------------------------------------------------------------
# Step 1: window compat カバレッジ収集
# ---------------------------------------------------------------------------

# window.X = X  (compat 再エクスポート)
_RE_WIN_X_EQ_X = re.compile(
    r'window\s*\.\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*\1\b'
)
# Object.assign(window, { X, Y, ... })
_RE_OBJECT_ASSIGN = re.compile(
    r'Object\.assign\s*\(\s*window\s*,\s*\{([^}]+)\}',
    re.DOTALL,
)
_RE_IDENT = re.compile(r'\b([A-Za-z_$][A-Za-z0-9_$]*)\b')
# window.X = <何でも>  (compat でない mutable state も含む)
_RE_WIN_ANY = re.compile(
    r'window\s*\.\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*='
)


def collect_window_covered(js_files: list) -> set:
    """全 JS ファイルをスキャンして window に公開されているシンボルセットを返す"""
    covered = set()
    for path in js_files:
        text = strip_block_comments(path.read_text(encoding='utf-8'))
        for m in _RE_WIN_X_EQ_X.finditer(text):
            covered.add(m.group(1))
        for m in _RE_OBJECT_ASSIGN.finditer(text):
            for sym in _RE_IDENT.findall(m.group(1)):
                if sym not in BUILTIN_SKIP:
                    covered.add(sym)
        for m in _RE_WIN_ANY.finditer(text):
            covered.add(m.group(1))
    return covered


# ---------------------------------------------------------------------------
# Step 2: inline ハンドラのスキャン
# ---------------------------------------------------------------------------

# (regex, ラベル) のリスト — 上から順に試みる
_SCAN_PATTERNS = [
    # A: HtmlSetAttribute 第3引数が文字列リテラル
    (re.compile(
        r'\bHtmlSetAttribute\s*\([^,\n]+,\s*["\']on[A-Za-z]+["\']\s*,\s*["\']([^"\']+)["\']'
    ), 'HtmlSetAttribute'),

    # A2: HtmlSetAttribute 第3引数が連結（先頭フラグメントに関数名）
    (re.compile(
        r'\bHtmlSetAttribute\s*\([^,\n]+,\s*["\']on[A-Za-z]+["\']\s*,\s*"([A-Za-z_$][A-Za-z0-9_$]*)\s*\('
    ), 'HtmlSetAttribute(concat)'),

    # B: .setAttribute 第2引数が文字列リテラル
    (re.compile(
        r'\.setAttribute\s*\(\s*["\']on[A-Za-z]+["\']\s*,\s*["\']([^"\']+)["\']'
    ), 'setAttribute'),

    # B2: .setAttribute 第2引数が連結（先頭フラグメントに関数名）
    (re.compile(
        r'\.setAttribute\s*\(\s*["\']on[A-Za-z]+["\']\s*,\s*"([A-Za-z_$][A-Za-z0-9_$]*)\s*\('
    ), 'setAttribute(concat)'),

    # C: HTML 文字列内 onXxx="handler()"  （ダブルクォート属性）
    (re.compile(r'\bon[A-Za-z]+\s*=\s*"([^"<>]+)"'), 'HTML-attr(DQ)'),

    # D: HTML 文字列内 onXxx='handler()'  （シングルクォート属性）
    (re.compile(r"\bon[A-Za-z]+\s*=\s*'([^'<>]+)'"), 'HTML-attr(SQ)'),
]


def scan_file(path: Path) -> list:
    """
    ファイルをスキャンして inline ハンドラのリストを返す。
    Returns: [(lineno, label, handler_str), ...]
    """
    raw = path.read_text(encoding='utf-8')
    text = strip_block_comments(raw)
    results = []
    seen: set = set()  # (lineno, handler) で重複排除

    for pattern, label in _SCAN_PATTERNS:
        for m in pattern.finditer(text):
            handler = m.group(1).strip()
            # 関数呼び出しを含まない値はスキップ（data 属性等）
            if '(' not in handler:
                continue
            lineno = pos_to_lineno(text, m.start())
            key = (lineno, handler)
            if key not in seen:
                seen.add(key)
                results.append((lineno, label, handler))

    return sorted(results)  # 行番号順


# ---------------------------------------------------------------------------
# メイン
# ---------------------------------------------------------------------------

def main() -> None:
    verbose = '--verbose' in sys.argv

    # JS ファイル収集
    js_files: list = []
    for d in JS_SCAN_DIRS:
        if d.exists():
            js_files.extend(sorted(d.glob('*.js')))

    if not js_files:
        print('ERROR: JS ファイルが見つかりません。ratorio/ ディレクトリから実行してください。')
        sys.exit(1)

    print(f'スキャン対象: {len(js_files)} ファイル ({", ".join(str(d.relative_to(ROOT)) for d in JS_SCAN_DIRS if d.exists())})')

    # window カバレッジ収集
    covered = collect_window_covered(js_files)
    print(f'window カバー済みシンボル: {len(covered)} 件\n')

    total_missing = 0
    total_covered_hits = 0

    for path in js_files:
        rel = path.relative_to(ROOT)
        handlers = scan_file(path)
        if not handlers:
            continue

        file_missing: list = []
        file_covered: list = []

        for (lineno, label, handler_str) in handlers:
            func_names = extract_func_names(handler_str)
            for name in func_names:
                entry = (lineno, label, handler_str, name)
                if name not in covered:
                    file_missing.append(entry)
                else:
                    file_covered.append(entry)

        if file_missing:
            print(f'[MISSING]  {rel}')
            for (lineno, label, handler_str, name) in file_missing:
                # handler_str が長い場合は省略
                display = repr(handler_str)
                if len(display) > 80:
                    display = display[:77] + "...'"
                print(f'  L{lineno:4d}  [{label}]  {display}')
                print(f'           → 未カバー: {name}')
            print()
            total_missing += len(file_missing)

        if verbose and file_covered:
            print(f'[COVERED]  {rel}')
            for (lineno, label, handler_str, name) in file_covered:
                print(f'  L{lineno:4d}  [{label}]  {name!r}  ← covered')
            print()
            total_covered_hits += len(file_covered)

    print('=' * 60)
    print(f'MISSING: {total_missing} 件')
    if verbose:
        print(f'COVERED: {total_covered_hits} 件  (ハンドラ内シンボル延べ数)')

    if total_missing > 0:
        print()
        print('MISSING 関数の対処:')
        print('  (a) window compat ブロック追加 または addEventListener 変換で直接修正')
        print('  (b) 各 MISSING エントリに対応する Playwright テストケースを生成')
        print('詳細: .claude/context/dewindow/plan.md の Phase 3c を参照')
        sys.exit(1)
    else:
        print()
        print('✓ MISSING なし — 既知の inline ハンドラはすべてカバー済みです。')


if __name__ == '__main__':
    main()
