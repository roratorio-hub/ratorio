#!/usr/bin/env python3
"""
gen_remove_compat.py - Remove window compat blocks (Object.assign and individual assignments).

A symbol can be removed from the compat block ONLY if every file that uses it
either already imports it (via ESM) or is the file that defines it.
HTML inline event handler symbols are always kept on window regardless.

Handles:
  - Object.assign(window, { F1, F2, ... }) blocks
  - Individual window.X = X; re-export lines in top-level if (typeof window) blocks
  - Object.defineProperties blocks are NOT touched

Usage:
  python3 util/gen_remove_compat.py           # dry-run
  python3 util/gen_remove_compat.py --apply   # apply changes
  python3 util/gen_remove_compat.py --verbose # dry-run with details
"""

import re
import sys
from pathlib import Path

BASE = Path(__file__).parent.parent  # /workspace/ratorio

WORKSPACE_INTERFACE_DTS = BASE / 'workspace/src/common.d.ts'

HTML_FILES = [
    BASE / 'ro4/m/calcx.html',
    *sorted((BASE / 'roro/other').glob('*.html')),
]

JS_DIRS = [
    BASE / 'roro/m/js',
    BASE / 'ro4/m/js',
    BASE / 'roro/other/js',
    BASE / 'roro/common/js',
]

MIN_SYM_LEN = 4  # same as gen_imports.py


# ---------------------------------------------------------------------------
# HTML handler collection
# ---------------------------------------------------------------------------

def collect_html_handler_symbols() -> set:
    """Collect symbol names that HTML inline handlers call via window."""
    handler_re = re.compile(r'on\w+\s*=\s*["\']([^"\']+)["\']')
    skip = frozenset({'true', 'false', 'null', 'undefined', 'parseInt', 'parseFloat', 'this'})
    must_keep = set()

    for html_file in HTML_FILES:
        if not html_file.exists():
            continue
        content = html_file.read_text(encoding='utf-8')
        for handler_m in handler_re.finditer(content):
            val = handler_m.group(1)
            for m in re.finditer(r'([A-Za-z_]\w*)\s*\.\s*[A-Za-z_]\w*\s*\(', val):
                must_keep.add(m.group(1))
            for m in re.finditer(r'(?<![.\w])([A-Za-z_]\w*)\s*\(', val):
                name = m.group(1)
                if name not in skip:
                    must_keep.add(name)

    return must_keep


def collect_workspace_interface_symbols() -> set:
    """Collect symbol names declared in workspace/src/common.d.ts (window interface)."""
    keep = set()
    if not WORKSPACE_INTERFACE_DTS.exists():
        return keep
    content = WORKSPACE_INTERFACE_DTS.read_text(encoding='utf-8')
    for m in re.finditer(r'declare\s+(?:function|let|class)\s+([A-Za-z_]\w*)', content):
        keep.add(m.group(1))
    return keep


# ---------------------------------------------------------------------------
# JS file analysis
# ---------------------------------------------------------------------------

def get_js_files() -> list:
    files = []
    for d in JS_DIRS:
        if d.exists():
            files.extend(sorted(d.rglob('*.js')))
    return files


# Single-pass lexer: handles block comments, line comments, and strings in one
# regex so that e.g. '//' inside a double-quoted string is never mistaken for
# a line comment (the string alternative matches first at that position).
_TOKEN_RE = re.compile(
    r'/\*.*?\*/'                     # block comment
    r'|//[^\n]*'                     # line comment
    r'|"(?:[^"\\]|\\.)*"'           # double-quoted string
    r"|'(?:[^'\\]|\\.)*'"           # single-quoted string
    r'|`(?:[^`\\]|\\.)*`',          # template literal (no nested ${} handling)
    re.DOTALL
)


def _token_sub(m: re.Match) -> str:
    s = m.group(0)
    if s.startswith('/*'):
        return ' '
    if s.startswith('//'):
        return ''
    return '""'


def strip_comments_and_strings(src: str) -> str:
    return _TOKEN_RE.sub(_token_sub, src)


def get_file_imports(content: str) -> set:
    """Extract all imported symbol names from a JS file's import statements."""
    imported = set()
    for m in re.finditer(r'import\s*\{([^}]+)\}', content):
        for sym_m in re.finditer(r'\b(\w+)\b', m.group(1)):
            name = sym_m.group(1)
            if name not in ('as', 'from') and len(name) >= MIN_SYM_LEN:
                imported.add(name)
    return imported


def get_compat_block_syms(content: str) -> list:
    """Extract all symbols defined in compat blocks of a file."""
    # Also check 'export function X' etc. - these are the file's own exports
    own_exports = set(re.findall(
        r'export\s+(?:function|class|const|let|var)\s+(\w+)',
        content
    ))
    return own_exports


def sym_used_in_file(sym: str, stripped: str) -> bool:
    """Check if sym appears as a bare identifier in stripped source."""
    pattern = re.compile(r'(?<![.\w])' + re.escape(sym) + r'(?![\w])')
    return bool(pattern.search(stripped))


# ---------------------------------------------------------------------------
# Safe-to-remove analysis
# ---------------------------------------------------------------------------

def build_usage_analysis(all_files: list) -> dict:
    """
    Build export map, import map, and per-file used-symbol sets.
    Returns: dict with sym_source, file_imports, file_used_exported, file_local_defs, all_files.
    """
    # Step 1: build export map
    sym_source: dict[str, Path] = {}
    for fpath in all_files:
        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception:
            continue
        for sym in re.findall(
            r'export\s+(?:function|class|const|let|var)\s+(\w+)',
            content
        ):
            if len(sym) >= MIN_SYM_LEN:
                sym_source[sym] = fpath

    # Step 2: for each file, collect imports, bare identifier usage, and local definitions
    file_imports: dict[Path, set] = {}
    file_used_exported: dict[Path, set] = {}
    file_local_defs: dict[Path, set] = {}
    exported_sym_set = set(sym_source.keys())
    _IDENT_RE = re.compile(r'(?<![.\w$])([A-Za-z_][A-Za-z0-9_]{3,})(?![\w$])')

    for fpath in all_files:
        try:
            content = fpath.read_text(encoding='utf-8')
        except Exception:
            file_imports[fpath] = set()
            file_used_exported[fpath] = set()
            file_local_defs[fpath] = set()
            continue
        file_imports[fpath] = get_file_imports(content)
        stripped = strip_comments_and_strings(content)
        # Remove import lines to avoid counting import names as usage
        stripped_no_import = re.sub(r'^import\s+[^\n]+\n', '', stripped, flags=re.MULTILINE)
        used = set(_IDENT_RE.findall(stripped_no_import))
        file_used_exported[fpath] = used & exported_sym_set
        # Collect non-exported local declarations (function/class)
        all_decls = set(re.findall(r'\b(?:function\*?|class)\s+([A-Za-z_]\w*)', stripped))
        exported_names = set(re.findall(
            r'\bexport\s+(?:async\s+)?(?:function\*?|class|const|let|var)\s+([A-Za-z_]\w*)', stripped
        ))
        file_local_defs[fpath] = {d for d in (all_decls - exported_names) if len(d) >= MIN_SYM_LEN}

    return {
        'sym_source': sym_source,
        'file_imports': file_imports,
        'file_used_exported': file_used_exported,
        'file_local_defs': file_local_defs,
        'all_files': all_files,
    }


def precompute_removable(analysis: dict, html_handlers: set) -> set:
    """
    Precompute the set of symbols that can be safely removed from window.
    A symbol can be removed if every file that uses it (bare reference) imports it.
    """
    sym_source = analysis['sym_source']
    file_imports = analysis['file_imports']
    file_used_exported = analysis['file_used_exported']
    file_local_defs = analysis.get('file_local_defs', {})
    all_files = analysis['all_files']

    # sym → set of files using it without import
    sym_unimported: dict[str, set] = {sym: set() for sym in sym_source}

    for fpath in all_files:
        used = file_used_exported.get(fpath, set())
        imported = file_imports.get(fpath, set())
        local_defs = file_local_defs.get(fpath, set())
        for sym in used - imported:
            if sym not in sym_source:
                continue
            src = sym_source[sym]
            if src == fpath:
                continue
            if sym in local_defs:
                continue  # file has its own local (non-exported) definition — not a consumer
            sym_unimported[sym].add(fpath)

    removable = {
        sym for sym, blockers in sym_unimported.items()
        if not blockers and sym not in html_handlers
    }
    print(f'  Removable symbols: {len(removable)} / {len(sym_source)} total exported')
    return removable


def can_remove_from_window(sym: str, source_file: Path, analysis: dict,
                            removable: set = None) -> bool:
    """Return True if sym can be removed. Uses precomputed set if provided."""
    if removable is not None:
        return sym in removable
    # Fallback: legacy per-symbol check
    sym_source = analysis['sym_source']
    file_imports = analysis['file_imports']
    file_used_exported = analysis['file_used_exported']
    all_files = analysis['all_files']

    if sym not in sym_source:
        return False

    for fpath in all_files:
        if fpath == source_file:
            continue
        if sym not in file_used_exported.get(fpath, set()):
            continue
        if sym not in file_imports.get(fpath, set()):
            return False
    return True


# ---------------------------------------------------------------------------
# Compat block parsing and rewriting
# ---------------------------------------------------------------------------

def find_object_assign_blocks(content: str) -> list:
    results = []
    search_from = 0
    while True:
        idx = content.find('Object.assign(window', search_from)
        if idx == -1:
            break
        brace_open = content.find('{', idx + len('Object.assign(window'))
        if brace_open == -1:
            break
        depth = 1
        j = brace_open + 1
        while j < len(content) and depth > 0:
            if content[j] == '{':
                depth += 1
            elif content[j] == '}':
                depth -= 1
            j += 1
        brace_close = j - 1
        rest = content[j:]
        m = re.match(r'\s*\)\s*;?', rest)
        end = j + (m.end() if m else 0)
        results.append((idx, end, content[brace_open + 1:brace_close]))
        search_from = end
    return results


def parse_syms(syms_str: str) -> list:
    syms_str = re.sub(r'//[^\n]*', '', syms_str)
    syms_str = re.sub(r'/\*.*?\*/', '', syms_str, flags=re.DOTALL)
    syms = []
    for part in syms_str.split(','):
        name = part.strip()
        if not name:
            continue
        name = name.split(':')[0].strip()
        if re.fullmatch(r'[A-Za-z_]\w*', name):
            syms.append(name)
    return syms


def rebuild_assign(kept: list, original_block: str) -> str:
    if not kept:
        return ''
    # Detect original indentation style (tabs or spaces) from first symbol line
    indent = '    '
    m = re.search(r'\n([ \t]+)\w', original_block)
    if m:
        indent = m.group(1)
    if len(kept) <= 4:
        inner = ', '.join(kept)
        return f'Object.assign(window, {{ {inner} }});'
    lines = ['Object.assign(window, {']
    for sym in kept:
        lines.append(f'{indent}{sym},')
    lines.append('});')
    return '\n'.join(lines)


def remove_surrounding_blank_line(content: str, start: int, end: int):
    s = start
    while s > 0 and content[s - 1] in ' \t':
        s -= 1
    if s > 0 and content[s - 1] == '\n':
        s -= 1
    e = end
    if e < len(content) and content[e] == '\n':
        e += 1
    return s, e


def remove_empty_if_wrappers(content: str) -> str:
    pattern = re.compile(
        r'if\s*\(\s*typeof\s+window\s*!==\s*[\'"]undefined[\'"]\s*\)\s*\{([^{}]*)\}',
        re.DOTALL
    )
    def replace(m):
        body = m.group(1)
        return '' if body.strip() == '' else m.group(0)

    prev = None
    while prev != content:
        prev = content
        content = pattern.sub(replace, content)
    return content


# ---------------------------------------------------------------------------
# Individual window.X = X assignment processing
# ---------------------------------------------------------------------------

_TOP_LEVEL_IF_RE = re.compile(
    r'^if\s*\(\s*typeof\s+window\s*!==\s*[\'"]undefined[\'"]\s*\)\s*\{',
    re.MULTILINE
)
_WINDOW_REEXPORT_LINE_RE = re.compile(
    r'^(\s*)window\.([A-Za-z_][A-Za-z0-9_]{3,})\s*=\s*\2\s*;[ \t]*$',
    re.MULTILINE
)


def find_top_level_if_blocks(content: str) -> list:
    """Find top-level if (typeof window !== 'undefined') { ... } blocks at column 0."""
    results = []
    for m in _TOP_LEVEL_IF_RE.finditer(content):
        block_start = m.start()
        brace_open = content.find('{', m.start())
        depth = 1
        pos = brace_open + 1
        while pos < len(content) and depth > 0:
            c = content[pos]
            if c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
            pos += 1
        results.append((block_start, pos))
    return results


def process_individual_assigns(
    fpath: Path, content: str,
    html_handlers: set, analysis: dict, removable: set = None
) -> tuple:
    """
    Remove window.X = X; re-export lines (same name both sides) from top-level
    if (typeof window) blocks when all consumers already import the symbol.
    Returns (new_content, n_removed, removed_syms_sample).
    """
    # Collect positions of top-level blocks to restrict processing scope
    top_blocks = find_top_level_if_blocks(content)
    if not top_blocks:
        return content, 0, []

    def in_top_block(pos):
        return any(start <= pos < end for start, end in top_blocks)

    removed_syms = []
    # Process from the end to preserve offsets
    matches = list(_WINDOW_REEXPORT_LINE_RE.finditer(content))
    new_content = content

    offset = 0
    for m in matches:
        sym = m.group(2)
        actual_start = m.start() + offset
        actual_end = m.end() + offset

        if not in_top_block(m.start()):
            continue
        if sym in html_handlers:
            continue
        if not can_remove_from_window(sym, fpath, analysis, removable):
            continue

        # Remove this line (including trailing newline if present)
        line_start = actual_start
        line_end = actual_end
        # Include trailing newline
        if line_end < len(new_content) and new_content[line_end] == '\n':
            line_end += 1
        # Also remove leading newline if the removed line leaves a blank
        new_content = new_content[:line_start] + new_content[line_end:]
        offset -= (line_end - line_start)
        removed_syms.append(sym)

    return new_content, len(removed_syms), removed_syms[:6]


# ---------------------------------------------------------------------------
# Main processing
# ---------------------------------------------------------------------------

def process_file(fpath: Path, html_handlers: set, analysis: dict, apply: bool, verbose: bool,
                  removable: set = None) -> bool:
    content = fpath.read_text(encoding='utf-8')
    has_object_assign = 'Object.assign(window' in content
    has_individual = bool(_WINDOW_REEXPORT_LINE_RE.search(content))
    if not has_object_assign and not has_individual:
        return False

    changed = False
    new_content = content

    # --- Pass 1: individual window.X = X; lines ---
    if has_individual:
        new_content2, n_removed, sample = process_individual_assigns(
            fpath, new_content, html_handlers, analysis, removable
        )
        if n_removed > 0:
            changed = True
            new_content = new_content2
            if verbose or not apply:
                rel = fpath.relative_to(BASE)
                print(f'  REMOVE-LINES {rel}: {n_removed} lines'
                      f' (e.g. {sample})')

    # --- Pass 2: Object.assign(window, {...}) blocks ---
    blocks = find_object_assign_blocks(new_content) if has_object_assign else []

    for (start, end, syms_str) in reversed(blocks):
        syms = parse_syms(syms_str)
        if not syms:
            continue

        kept = []
        removed = []
        for sym in syms:
            if sym in html_handlers:
                kept.append(sym)
            elif can_remove_from_window(sym, fpath, analysis, removable):
                removed.append(sym)
            else:
                kept.append(sym)  # still needed via window

        if not removed:
            continue

        changed = True
        rel = fpath.relative_to(BASE)
        original_block = new_content[start:end]

        if kept:
            replacement = rebuild_assign(kept, new_content[start + new_content[start:].find('{'):end])
            ls = start
            while ls > 0 and new_content[ls - 1] in ' \t':
                ls -= 1
            leading = new_content[ls:start]
            replacement = leading + replacement
            new_content = new_content[:ls] + replacement + new_content[end:]
            if verbose or not apply:
                print(f'  SHRINK {rel}')
                print(f'    keep   ({len(kept)}): {kept[:8]}{"..." if len(kept) > 8 else ""}')
                print(f'    remove ({len(removed)}): {removed[:6]}{"..." if len(removed) > 6 else ""}')
        else:
            s, e = remove_surrounding_blank_line(new_content, start, end)
            new_content = new_content[:s] + new_content[e:]
            if verbose or not apply:
                print(f'  REMOVE {rel}')
                print(f'    removed ({len(removed)}): {removed[:6]}{"..." if len(removed) > 6 else ""}')

    if changed:
        new_content = remove_empty_if_wrappers(new_content)
        new_content = re.sub(r'\n{4,}', '\n\n\n', new_content)

        if apply:
            fpath.write_text(new_content, encoding='utf-8')
            print(f'  UPDATED: {fpath.relative_to(BASE)}')

    return changed


def main():
    apply = '--apply' in sys.argv
    verbose = '--verbose' in sys.argv
    print('=== gen_remove_compat.py ===')
    print(f'Mode: {"APPLY" if apply else "DRY-RUN"}')
    print()

    print('Collecting HTML inline handler symbols...')
    html_handlers = collect_html_handler_symbols()
    print(f'  HTML handlers ({len(html_handlers)}): {sorted(html_handlers)}')

    print('Collecting workspace/ interface symbols...')
    ws_interface = collect_workspace_interface_symbols()
    print(f'  Workspace interface ({len(ws_interface)}): {sorted(ws_interface)}')
    html_handlers = html_handlers | ws_interface
    print(f'  Combined keep-set: {len(html_handlers)} symbols')
    print()

    js_files = get_js_files()
    print(f'Building usage analysis for {len(js_files)} JS files...')
    analysis = build_usage_analysis(js_files)
    print(f'  Exported symbols indexed: {len(analysis["sym_source"])}')
    print()

    print('Precomputing removable symbols...')
    removable = precompute_removable(analysis, html_handlers)
    print()

    print('Processing compat blocks...')
    n_changed = 0
    for fpath in js_files:
        if process_file(fpath, html_handlers, analysis, apply, verbose, removable):
            n_changed += 1

    print()
    print(f'{"Changed" if apply else "Would change"}: {n_changed} files')


if __name__ == '__main__':
    main()
