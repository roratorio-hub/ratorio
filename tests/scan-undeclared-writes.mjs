/**
 * 未宣言変数への代入（ESM strict mode 違反）検出スキャナ
 *
 * ESM 移行後の各エンジン JS を解析し、「宣言も import もされていない変数への代入」を検出する。
 * これは strict mode（ESM は常に strict）で実行時 ReferenceError になる潜在バグで、
 * 通常のテストでは「その代入を含むコードパスが実行されたとき」しか顕在化しない。
 * （実例: idxItem / idxF — エンチャント表示まわりの未テストパスに潜んでいた）
 *
 * 仕組み: ESLint の scope 解析で globalScope.through（未解決参照）のうち write のみを抽出する。
 * read（CARD_KIND_* 等の bare グローバル参照）は無視するので globals 設定は不要。
 *
 * 既知の偽陽性の除外:
 *   - window.X = ... / Object.assign(window, {X}) で公開済みの名前（bare write は window へ解決し動作する）
 *   - ALLOWLIST: 静的には追えないが実行時に window 上に存在することを確認済みの名前
 *
 * 実行: cd tests && node scan-undeclared-writes.mjs
 * 終了コード: 検出 0 件で 0、検出ありで 1（CI gate に利用可）
 */
import { Linter } from 'eslint';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(process.cwd(), '..');
const SCAN_DIRS = ['roro/m/js', 'ro4/m/js', 'roro/other/js', 'roro/common/js'];
const EXTRA_FILES = ['ro4/m/calcx-ai.js'];

// 実行時に window 上へ存在することを確認済みだが、静的には公開元を追えない名前。
// （foot.js の getFlee 等が bare 代入するが runtime では window.itemCountLeft が存在し動作する）
const RUNTIME_GLOBAL_ALLOWLIST = new Set(['itemCountLeft', 'itemCountRight']);

// ── 対象ファイル収集 ──
function walk(dir, acc) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e);
        if (statSync(p).isDirectory()) walk(p, acc);
        else if (e.endsWith('.js')) acc.push(p);
    }
    return acc;
}
let files = [];
for (const d of SCAN_DIRS) walk(join(ROOT, d), files);
for (const f of EXTRA_FILES) files.push(join(ROOT, f));

// ── window 公開名の収集（bare write が window へ解決する＝安全な名前）──
const windowNames = new Set(RUNTIME_GLOBAL_ALLOWLIST);
const reWindowAssign = /\bwindow\.([A-Za-z_$][\w$]*)/g;
const reAssignBlock = /Object\.(?:assign|defineProperties)\s*\(\s*window\s*,\s*\{([\s\S]*?)\}\s*\)/g;
const reIdent = /([A-Za-z_$][\w$]*)\s*[:,}]/g;
for (const f of files) {
    const src = readFileSync(f, 'utf8');
    let m;
    while ((m = reWindowAssign.exec(src))) windowNames.add(m[1]);
    while ((m = reAssignBlock.exec(src))) {
        let mm;
        while ((mm = reIdent.exec(m[1]))) windowNames.add(mm[1]);
    }
}

// ── ESLint scope 解析で未解決 write を抽出 ──
const linter = new Linter();
const rule = {
    create(context) {
        return {
            'Program:exit'() {
                const sm = context.sourceCode.scopeManager;
                for (const ref of sm.globalScope.through) {
                    if (ref.isWrite() && !ref.resolved) {
                        context.report({ node: ref.identifier, message: ref.identifier.name });
                    }
                }
            },
        };
    },
};
const config = {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { scan: { rules: { undeclaredWrite: rule } } },
    rules: { 'scan/undeclaredWrite': 'error' },
};

const hits = {};
let parseErrors = 0;
for (const f of files) {
    let msgs;
    try { msgs = linter.verify(readFileSync(f, 'utf8'), config); }
    catch { parseErrors++; continue; }
    for (const m of msgs) {
        if (m.fatal) { parseErrors++; continue; }
        if (windowNames.has(m.message)) continue; // window 公開済み = 安全
        (hits[m.message] ||= []).push(`${f.replace(ROOT + '/', '')}:${m.line}`);
    }
}

const names = Object.keys(hits).sort();
console.log(`scanned ${files.length} files (parseErrors=${parseErrors}), window-known=${windowNames.size}`);
if (names.length === 0) {
    console.log('✓ 未宣言変数への代入は検出されませんでした。');
    process.exit(0);
}
console.log(`\n✗ 未宣言代入の疑い ${names.length} 種:`);
for (const n of names) console.log(`  ${n}  ${hits[n].join(', ')}`);
process.exit(1);
