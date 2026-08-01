/**
 * 未宣言変数の「読み取り」検出スキャナ（scan-undeclared-writes.mjs の対になるもの）
 *
 * 姉妹スキャナが write のみを見て read を明示的に無視しているため、
 * 「宣言も import もされていない変数を読む」バグは検出できない状態だった。
 * ESM は常に strict mode なので、未定義識別子の読み取りは実行時 ReferenceError になる。
 * これは「その分岐を通る操作をしたときだけ」落ちるため、integration 全緑のまますり抜ける。
 * （実例: head.js の SU_INT 等20箇所 / CSkillManager の powCard タイポ / saveload の n_CONFIG_SW）
 *
 * bare read の大半は CGlobalConstManager.DefineEnum() が実行時に生成する定数なので、
 * その名前を全て収集して除外した上で、残ったものだけを報告する。
 *
 * 実行: cd tests && node scan-undeclared-reads.mjs
 * 終了コード: 検出 0 件で 0、検出ありで 1（CI gate に利用可）
 */
import { Linter } from 'eslint';
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(process.cwd(), '..');
const SCAN_DIRS = ['roro/m/js', 'ro4/m/js', 'roro/other/js', 'roro/common/js'];
const EXTRA_FILES = ['ro4/m/calcx-ai.js'];

// classic script（type="module" でない <script>）が定義する真のグローバルを収集する対象
const CLASSIC_DIRS = ['lib', 'jquery'];
// TypeScript 層（workspace/）が window に生やすシンボルを収集する対象
const TS_DIR = 'workspace/src';

// ブラウザ / JS 組み込み。ESLint の globals パッケージが無いため明示列挙する。
const BUILTINS = new Set([
    'undefined', 'NaN', 'Infinity', 'globalThis', 'console', 'Math', 'JSON', 'Object', 'Array',
    'String', 'Number', 'Boolean', 'Date', 'RegExp', 'Error', 'TypeError', 'RangeError', 'Map',
    'Set', 'WeakMap', 'WeakSet', 'Promise', 'Symbol', 'Proxy', 'Reflect', 'BigInt', 'parseInt',
    'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent', 'decodeURIComponent', 'encodeURI',
    'decodeURI', 'escape', 'unescape', 'eval', 'Function', 'setTimeout', 'setInterval',
    'clearTimeout', 'clearInterval', 'queueMicrotask', 'requestAnimationFrame',
    'cancelAnimationFrame', 'structuredClone', 'btoa', 'atob',
    'window', 'document', 'navigator', 'location', 'history', 'screen', 'self', 'top', 'parent',
    'opener', 'frames', 'localStorage', 'sessionStorage', 'performance', 'crypto',
    'alert', 'confirm', 'prompt', 'open', 'close', 'print', 'focus', 'blur', 'scrollTo',
    'getComputedStyle', 'matchMedia',
    'fetch', 'XMLHttpRequest', 'FormData', 'Blob', 'File', 'FileReader', 'URL', 'URLSearchParams',
    'Headers', 'Response', 'Request', 'AbortController', 'AbortSignal', 'WebSocket', 'Worker',
    'MessageChannel', 'Notification', 'Intl',
    'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array', 'Uint32Array', 'Int32Array',
    'Float32Array', 'Float64Array', 'ArrayBuffer', 'DataView', 'TextEncoder', 'TextDecoder',
    'Image', 'Option', 'Audio', 'Range', 'Selection', 'DOMParser',
    'Event', 'CustomEvent', 'MouseEvent', 'KeyboardEvent', 'Node', 'Element', 'HTMLElement',
    'HTMLCollection', 'NodeList', 'Text', 'DocumentFragment', 'CSSStyleDeclaration', 'Storage',
    'FileList', 'Window', 'SVGElement', 'HTMLInputElement', 'HTMLSelectElement',
    'HTMLCanvasElement', 'HTMLImageElement', 'HTMLFormElement', 'HTMLTableElement',
    'HTMLOptGroupElement', 'HTMLOptionElement', 'HTMLTableRowElement', 'HTMLTableCellElement',
    'MutationObserver', 'IntersectionObserver', 'ResizeObserver',
    // 外部ライブラリ（CDN / lib 配下の classic script）
    '$', 'jQuery', 'TomSelect', 'Chart', 'html2canvas',
]);

// 静的には追えないが、デッドコード内のためランタイムに到達しないことを確認済みの名前。
// ここに足すのは「呼び出し元が存在しない関数の中」に限ること。到達しうるなら必ず直す。
const DEAD_CODE_ALLOWLIST = new Map([
    ['n_EnchantType', 'hmcard.js BuildUpCardSlotsCard/Enchant は呼び出し元なし（デッド）'],
    ['n_EnchantList', 'hmcard.js BuildUpCardSlotsCard/Enchant は呼び出し元なし（デッド）'],
    ['n_A_PassSkill8', 'mig.job.h.js UpgradeJobTo4th は呼び出し元なし（デッド）。import すると skillstate→item.h→mig.job.h の循環になるため据置'],
    ['Click_CONFIG', 'foot.js で try/catch に包まれた「次世代版では消える」暫定呼び出し'],
]);
// mig.itemsp.h.js は export 15個中14個が未呼び出しのデッドファイル。
// MIG_STATE_ID_* / MIG_JOB_SERIES_ID_* 等が未定義のまま残っているが到達しない。
// ファイルごと削除するのが本筋（要承認）。それまではファイル単位で除外する。
const DEAD_FILE_ALLOWLIST = new Set(['roro/m/js/data/mig.itemsp.h.js']);

// ── 対象ファイル収集 ──
function walk(dir, acc) {
    if (!existsSync(dir)) return acc;
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        if (statSync(p).isDirectory()) walk(p, acc);
        else if (e.endsWith('.js')) acc.push(p);
    }
    return acc;
}
let files = [];
for (const d of SCAN_DIRS) walk(join(ROOT, d), files);
for (const f of EXTRA_FILES) {
    const p = join(ROOT, f);
    if (existsSync(p)) files.push(p);
}

// ── DefineEnum が実行時生成する定数名の収集 ──
// CGlobalConstManager.DefineEnumSubCommon が Function(name + " = " + value + ";")() で
// グローバルへ直接生やすため、静的には一切追えない。名前を集めて除外する。
function collectEnumNames(srcFiles) {
    const names = new Set();
    const reCall = /CGlobalConstManager\.(?:DefineEnum|DefinePseudoEnum)\s*\(/g;
    const reIdentStr = /["']([A-Za-z_$][\w$]*)["']/g;
    for (const f of srcFiles) {
        const src = readFileSync(f, 'utf8');
        // 1) DefineEnum(...) の実引数に現れる識別子形の文字列リテラル
        let m, mm;
        while ((m = reCall.exec(src))) {
            let i = src.indexOf('(', m.index);
            let depth = 0, j = i;
            for (; j < src.length; j++) {
                if (src[j] === '(') depth++;
                else if (src[j] === ')' && --depth === 0) break;
            }
            const arg = src.slice(i, j + 1)
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .replace(/\/\/[^\n]*/g, '');

            while ((mm = reIdentStr.exec(arg))) names.add(mm[1]);
        }
        // 2) SetEnumName("X") / enumName = "X" 経由（CConfBase 系の登録パターン）
        for (const re of [/SetEnumName\s*\(\s*["']([A-Za-z_$][\w$]*)["']/g,
                          /\benumName\s*=\s*["']([A-Za-z_$][\w$]*)["']/g]) {
            while ((mm = re.exec(src))) names.add(mm[1]);
        }
    }
    return names;
}

// ── classic script / TypeScript 層が生やすグローバルの収集 ──
function collectHostGlobals() {
    const names = new Set();
    let classicFiles = [];
    for (const d of CLASSIC_DIRS) walk(join(ROOT, d), classicFiles);
    // minified バンドルは誤検出のもとなので除外
    classicFiles = classicFiles.filter((f) => !/\.min\.js$/.test(f));
    for (const f of classicFiles) {
        const src = readFileSync(f, 'utf8');
        let m;
        const re = /^\s*(?:function\s+([A-Za-z_$][\w$]*)|var\s+([A-Za-z_$][\w$]*)\s*=)/gm;
        while ((m = re.exec(src))) names.add(m[1] || m[2]);
    }
    // workspace TS が window に生やすシンボル（Layer1 から bare 参照される）
    const tsDir = join(ROOT, TS_DIR);
    if (existsSync(tsDir)) {
        let tsFiles = [];
        (function w(d) {
            for (const e of readdirSync(d)) {
                const p = join(d, e);
                if (statSync(p).isDirectory()) w(p);
                else if (e.endsWith('.ts')) tsFiles.push(p);
            }
        })(tsDir);
        const re = /\(\s*window\s+as\s+any\s*\)\.([A-Za-z_$][\w$]*)\s*=|declare\s+function\s+([A-Za-z_$][\w$]*)/g;
        for (const f of tsFiles) {
            let m;
            const src = readFileSync(f, 'utf8');
            while ((m = re.exec(src))) names.add(m[1] || m[2]);
        }
    }
    return names;
}

const enumNames = collectEnumNames(files);
const hostGlobals = collectHostGlobals();

// engine-registry / bridge 経由で登録される Workspace I/F（window 残置の2件を含む）
const REGISTRY_IF = new Set(['StAllCalc', 'AutoCalc']);

// ── ESLint scope 解析で未解決 read を抽出 ──
const linter = new Linter();
const rule = {
    create(context) {
        return {
            'Program:exit'() {
                const sm = context.sourceCode.scopeManager;
                for (const ref of sm.globalScope.through) {
                    if (ref.isRead() && !ref.resolved) {
                        context.report({ node: ref.identifier, message: ref.identifier.name });
                    }
                }
            },
        };
    },
};
const config = {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { scan: { rules: { undeclaredRead: rule } } },
    rules: { 'scan/undeclaredRead': 'error' },
};

const hits = {};
let parseErrors = 0;
let skippedDeadFile = 0;
for (const f of files) {
    const rel = f.replace(ROOT + '/', '');
    if (DEAD_FILE_ALLOWLIST.has(rel)) { skippedDeadFile++; continue; }
    let msgs;
    try { msgs = linter.verify(readFileSync(f, 'utf8'), config); }
    catch { parseErrors++; continue; }
    for (const m of msgs) {
        if (m.fatal) { parseErrors++; continue; }
        const n = m.message;
        if (BUILTINS.has(n)) continue;
        if (enumNames.has(n)) continue;      // DefineEnum が実行時生成
        if (hostGlobals.has(n)) continue;    // classic script / TS 層のグローバル
        if (REGISTRY_IF.has(n)) continue;
        if (DEAD_CODE_ALLOWLIST.has(n)) continue;
        (hits[n] ||= []).push(`${rel}:${m.line}`);
    }
}

const names = Object.keys(hits).sort();
console.log(
    `scanned ${files.length - skippedDeadFile} files (parseErrors=${parseErrors}), ` +
    `enum-known=${enumNames.size}, host-globals=${hostGlobals.size}, dead-files-skipped=${skippedDeadFile}`
);
if (names.length === 0) {
    console.log('✓ 未宣言変数の読み取りは検出されませんでした。');
    process.exit(0);
}
console.log(`\n✗ 未宣言読み取りの疑い ${names.length} 種（ESM strict mode で ReferenceError）:`);
for (const n of names) console.log(`  ${n}  ${hits[n].join(', ')}`);
process.exit(1);
