/**
 * enum 定数の値がスナップショットと完全一致するか検証する。
 *
 * 移行中はひとつの定数が次のどちらかに居る:
 *   (a) まだ DefineEnum のまま  → 実ブラウザで採取した実行時レジストリに居る
 *   (b) const 化済み            → roro/m/js/const/EnumXxx.js の `export const` に居る
 * 両者を突き合わせ、**和集合がスナップショットと完全一致**することを確認する。
 * これにより「移行の途中でも値が一切ズレていない」ことを常に保証できる。
 *
 * enum 定数の値は登録順で決まるため、定義の並べ替え・追加・削除で容易にズレる。
 * 値がズレるとセーブデータ URL とアイテムデータの解釈が壊れるので、
 * const 化の各バッチでこの検証を通すことを必須とする。
 *
 * 実行: node util/enum/verify-enum-values.mjs
 * 終了コード: 一致で 0、差異ありで 1（CI gate に利用可）
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { extractEnums, REPO } from './enum-runtime.mjs';

const CONST_DIR = join(REPO, 'roro/m/js/const');
const snapshot = JSON.parse(readFileSync(join(REPO, 'util/enum/enum-values.snapshot.json'), 'utf8'));
const expected = snapshot.constants;

/** const/*.js から `export const NAME = value;` を読み取る。 */
function readConstModules() {
    const found = Object.create(null);
    if (!existsSync(CONST_DIR)) return found;
    for (const f of readdirSync(CONST_DIR)) {
        if (!f.endsWith('.js') || f === 'createEnum.js') continue;
        const src = readFileSync(join(CONST_DIR, f), 'utf8');
        const re = /^export const\s+([A-Za-z_$][\w$]*)\s*=\s*(-?\d+n?|-?\d*\.\d+)\s*;/gm;
        let m;
        while ((m = re.exec(src))) found[m[1]] = { value: m[2], file: f };
    }
    return found;
}

const fromConst = readConstModules();
const { constants: fromRuntime, pageErrors } = await extractEnums();

if (pageErrors.length) {
    console.error('✗ ページ内で JS エラー。抽出が不完全なので検証を中止する:');
    for (const m of pageErrors.slice(0, 10)) console.error(`    ${m}`);
    process.exit(1);
}

const changed = [];
const missing = [];
const duplicated = [];

for (const [name, e] of Object.entries(expected)) {
    const c = fromConst[name];
    const r = fromRuntime[name];
    if (c && r) {
        // 二重定義。DefineEnum 側の削除漏れ（グローバルと import が食い違い事故になる）
        duplicated.push(name);
    }
    const actual = c ?? r;
    if (!actual) { missing.push(name); continue; }
    if (String(actual.value) !== String(e.value)) {
        changed.push(`${name}: 期待 ${e.value} → 実際 ${actual.value}${c ? ` (${c.file})` : ' (実行時)'}`);
    }
}

const added = Object.keys(fromRuntime).filter((n) => !(n in expected) && !(n in fromConst));

const nConst = Object.keys(fromConst).length;
const nRuntime = Object.keys(fromRuntime).length;
console.log(`基準 ${Object.keys(expected).length} 件`);
console.log(`  const 化済み : ${nConst} 件（roro/m/js/const/）`);
console.log(`  DefineEnum   : ${nRuntime} 件（実行時レジストリ）`);

let ng = false;
if (changed.length) {
    ng = true;
    console.error(`\n✗ 値が変わった定数 ${changed.length} 件（セーブデータ破壊の恐れ・要修正）:`);
    for (const c of changed.slice(0, 40)) console.error(`    ${c}`);
}
if (missing.length) {
    ng = true;
    console.error(`\n✗ どこにも存在しない定数 ${missing.length} 件（const 化の取りこぼし）:`);
    for (const c of missing.slice(0, 40)) console.error(`    ${c}`);
}
if (duplicated.length) {
    ng = true;
    console.error(`\n✗ 二重定義 ${duplicated.length} 件（const 化したのに DefineEnum が残っている）:`);
    for (const c of duplicated.slice(0, 40)) console.error(`    ${c}`);
}
if (added.length) {
    console.log(`\n△ 基準に無い定数 ${added.length} 件（意図的なら dump で基準を更新する）:`);
    for (const c of added.slice(0, 20)) console.log(`    ${c}`);
}

if (ng) process.exit(1);
console.log('\n✓ 全定数の値が基準と一致している。');
