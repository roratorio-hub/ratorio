/**
 * enum-values.snapshot.json から roro/m/js/const/EnumXxx.js を生成する。
 *
 * 生成物は:
 *   - 各定数の `export const NAME = <値リテラル>;`（呼び出し箇所は無変更のまま import だけで済む）
 *   - コンテナ `export const EnumXxx = createEnum(...)`（マネージャ API を使う列挙型のみ）
 *
 * 値は「実行時に採取した現在値」をそのまま凍結する。
 * DefineEnum は配列位置から値を算出していたため、リテラル化すると
 * 列挙型どうしの依存（EnumRaceId.Count を次の列挙型の開始値にする等）が消え、
 * 各モジュールは依存ゼロの葉になる（循環 import の温床がひとつ消える）。
 *
 * 実行: node util/enum/gen-const-modules.mjs [--only EnumA,EnumB]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const OUT_DIR = join(REPO, 'roro/m/js/const');

const snap = JSON.parse(readFileSync(join(REPO, 'util/enum/enum-values.snapshot.json'), 'utf8'));

const onlyArg = process.argv.indexOf('--only');
const only = onlyArg >= 0 ? new Set(process.argv[onlyArg + 1].split(',')) : null;

/** コード中で EnumXxx 自体を参照している列挙型だけコンテナを生成する（他は純粋な葉に保つ）。 */
function collectUsedContainers() {
    const used = new Set();
    const roots = ['roro/m/js', 'ro4/m/js', 'roro/other/js', 'roro/common/js'];
    const files = [];
    const walk = (d) => {
        if (!existsSync(d)) return;
        for (const e of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, e.name);
            // 生成物自身（const/）を数えると、全列挙型が「参照されている」と誤判定される
            if (p === OUT_DIR || p.startsWith(OUT_DIR)) continue;
            if (e.isDirectory()) walk(p);
            else if (e.name.endsWith('.js')) files.push(p);
        }
    };
    for (const r of roots) walk(join(REPO, r));
    const extra = join(REPO, 'ro4/m/calcx-ai.js');
    if (existsSync(extra)) files.push(extra);
    const names = snap.enums.map((e) => e.name);
    for (const f of files) {
        // 定義側の文字列リテラルは数えない（"EnumRaceId" という登録名の記述を除く）
        let src = readFileSync(f, 'utf8').replace(/"[^"\n]*"|'[^'\n]*'/g, ' ');
        for (const n of names) {
            if (new RegExp(`\\b${n}\\b`).test(src)) used.add(n);
        }
    }
    return used;
}

/** JSON に載せた値（BigInt は "123n" 文字列）を JS リテラル表記へ戻す。 */
function lit(v) {
    if (typeof v === 'string' && /^-?\d+n$/.test(v)) return v;      // BigInt リテラル
    if (typeof v === 'string') return JSON.stringify(v);
    return String(v);
}

const usedContainers = collectUsedContainers();
mkdirSync(OUT_DIR, { recursive: true });

let generated = 0;
let constCount = 0;
const index = [];

for (const e of snap.enums) {
    if (only && !only.has(e.name)) continue;
    const all = [...e.members, ...e.pseudo];
    if (all.length === 0) continue;

    const withContainer = usedContainers.has(e.name);
    const pad = Math.max(...all.map(([n]) => n.length));

    const out = [];
    out.push('/**');
    out.push(` * ${e.name} の定数定義.`);
    out.push(' *');
    out.push(' * !!! 自動生成ファイル。手で編集しない !!!');
    out.push(' * 生成: node util/enum/gen-const-modules.mjs');
    out.push(' * 値の一次情報: util/enum/enum-values.snapshot.json');
    out.push(' *');
    out.push(' * 値は旧 CGlobalConstManager.DefineEnum が実行時に採番していたものを凍結したもの。');
    out.push(' * **値を変えるとセーブデータとアイテムデータの解釈が壊れる**ため、');
    out.push(' * 変更時は必ず node util/enum/verify-enum-values.mjs を通すこと。');
    out.push(' */');
    if (withContainer) out.push("import { createEnum } from './createEnum.js';");
    out.push('');

    if (e.members.length) {
        out.push('// ---- 列挙定数 ----');
        for (const [n, v] of e.members) out.push(`export const ${n.padEnd(pad)} = ${lit(v)};`);
        out.push('');
    }
    if (e.pseudo.length) {
        out.push('// ---- 疑似定数（旧 DefinePseudoEnum） ----');
        for (const [n, v] of e.pseudo) out.push(`export const ${n.padEnd(pad)} = ${lit(v)};`);
        out.push('');
    }

    if (withContainer) {
        out.push(`/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */`);
        // 値は上で宣言した const をショートハンドで渡す。
        // 名前も値も一度しか書かないため、宣言との食い違いが構文的に起こり得ない。
        out.push(`export const ${e.name} = createEnum('${e.name}', {`);
        for (const [n] of e.members) out.push(`    ${n},`);
        out.push(`}, {`);
        for (const [n] of e.pseudo) out.push(`    ${n},`);
        out.push(`});`);
        out.push('');
    }

    writeFileSync(join(OUT_DIR, `${e.name}.js`), out.join('\n'));
    generated++;
    constCount += all.length;
    index.push([e.name, all.length, withContainer]);
}

console.log(`✓ ${generated} 個の列挙型モジュールを生成した（定数 ${constCount} 件）`);
console.log(`  出力先: roro/m/js/const/`);
console.log(`  コンテナ付き: ${index.filter((x) => x[2]).length} / 定数のみ: ${index.filter((x) => !x[2]).length}`);
