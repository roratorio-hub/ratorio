/**
 * StAllCalcCore()（残件台帳 B-09 調査用）が読み書きする roro-state.js/ro4-state.js の
 * export let 変数（計85個）について、以下を機械的に集計する:
 *
 *   1. 「Core」＝ StAllCalcCore() 自身の本体（foot.js の該当行範囲）
 *      + そこから呼ばれる foot-stallcalc-*.js / foot-stplus-calc.js 群
 *      （foot-bridge.js・foot-stallcalc-hydrate.js は除く。詳細はコード内 CORE_HELPER_FILES）
 *      で「読むだけ」「書くだけ」（= set_X() 呼び出し）「両方」のどれか
 *   2. Core の外（他ファイル・foot.js の他関数）でも読み書きされているか
 *      （= 引数/戻り値化する際に影響が及ぶ範囲）
 *
 * ⚠️ 初版（Core = StAllCalcCore の280行のみ）では85個中73個が「未使用」と出て
 * 明らかにおかしかった。実際には StAllCalcCore は大半の計算を呼び出し先の
 * foot-stallcalc-*.js 群に委譲しており、変数の読み書きもそちら側で起きている
 * ため、範囲を広げて再計測している。
 *
 * 判定方式: これらの変数はすべて `export let X` + `export function set_X(v){X=v;}`
 * という対で宣言されている（宣言ファイル自身を除き、直接代入は起こり得ない —
 * import した let バインディングへの代入は ESM の仕様上 SyntaxError になるため）。
 * よって「素の識別子 X の参照」は常に読み取り、「set_X(...) の呼び出し」は常に
 * 書き込みとして機械的に分類できる（analyze-section-vars.mjs のような
 * parent ノード判定は不要）。
 *
 * 使い方:
 *   node analyze-stallcalccore-globals.mjs
 *
 * 出力: 変数ごとの分類（読/書/両方）と、StAllCalcCore 外での使用有無の一覧。
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { Linter } from 'eslint';

const REPO = join(process.cwd(), '..');
const RORO_STATE = 'roro/m/js/roro-state.js';
const RO4_STATE = 'ro4/m/js/ro4-state.js';
const FOOT_JS = 'roro/m/js/foot.js';
// StAllCalcCore() の行範囲（1-indexed、両端含む）。ズレたら再確認すること:
//   grep -n "^export function StAllCalcCore" roro/m/js/foot.js
const CORE_START = 1351;
const CORE_END = 1630;

// 「Core」の実体は StAllCalcCore() 自身の280行だけではなく、そこから呼ばれる
// foot-stallcalc-*.js / foot-stplus-calc.js 群（.claude/context/architecture.md の
// Shell/Adapter/Core 対応表を参照）。foot-bridge.js（委譲ブリッジ）と
// foot-stallcalc-hydrate.js（Adapter。意図的にDOMを読む）は除く。
const CORE_HELPER_FILES = readdirSync(join(REPO, 'roro/m/js'))
    .filter((f) => f.startsWith('foot-') && f.endsWith('.js'))
    .filter((f) => f !== 'foot-bridge.js' && f !== 'foot-stallcalc-hydrate.js')
    .map((f) => `roro/m/js/${f}`);

const SCAN_DIRS = ['roro/m/js', 'ro4/m/js'];

function collectVarNames(relPath) {
    const src = readFileSync(join(REPO, relPath), 'utf8');
    return [...src.matchAll(/^export let ([A-Za-z_$][\w$]*)/gm)].map((m) => m[1]);
}

const roroVars = collectVarNames(RORO_STATE);
const ro4Vars = collectVarNames(RO4_STATE);
const allVars = new Set([...roroVars, ...ro4Vars]);
const setterNames = new Set([...allVars].map((v) => `set_${v}`));

console.log(`対象変数: roro-state.js ${roroVars.length}個 + ro4-state.js ${ro4Vars.length}個 = ${allVars.size}個`);

function walkJsFiles(dir) {
    let out = [];
    for (const name of readdirSync(join(REPO, dir))) {
        const rel = `${dir}/${name}`;
        const abs = join(REPO, rel);
        if (statSync(abs).isDirectory()) out = out.concat(walkJsFiles(rel));
        else if (name.endsWith('.js')) out.push(rel);
    }
    return out;
}

const files = SCAN_DIRS.flatMap(walkJsFiles);
const linter = new Linter();

/** @type {Map<string, {coreRead:boolean, coreWrite:boolean, outsideRead:Set<string>, outsideWrite:Set<string>}>} */
const stats = new Map([...allVars].map((v) => [v, {
    coreRead: false, coreWrite: false,
    outsideRead: new Set(), outsideWrite: new Set(),
}]));

for (const rel of files) {
    if (rel === RORO_STATE || rel === RO4_STATE) continue; // 宣言ファイル自身は対象外
    const src = readFileSync(join(REPO, rel), 'utf8');
    const isFootJs = rel === FOOT_JS;
    const isCoreHelperFile = CORE_HELPER_FILES.includes(rel);

    const messages = linter.verify(src, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
        plugins: {
            walk: {
                rules: {
                    walk: {
                        create() {
                            return {
                                Identifier(node) {
                                    const name = node.name;
                                    const parent = node.parent;
                                    const line = node.loc.start.line;
                                    const inCore = isCoreHelperFile || (isFootJs && line >= CORE_START && line <= CORE_END);

                                    // import/export specifier 内の識別子は「使用」ではないので除外
                                    if (parent && (parent.type === 'ImportSpecifier' || parent.type === 'ExportSpecifier')) return;

                                    if (setterNames.has(name) && parent && parent.type === 'CallExpression' && parent.callee === node) {
                                        const varName = name.slice(4); // 'set_' を除去
                                        const s = stats.get(varName);
                                        if (inCore) s.coreWrite = true; else s.outsideWrite.add(rel);
                                        return;
                                    }
                                    if (allVars.has(name)) {
                                        // MemberExpression の callee（set_X 自体）は上で処理済みなので通常の参照のみ
                                        const s = stats.get(name);
                                        if (inCore) s.coreRead = true; else s.outsideRead.add(rel);
                                    }
                                },
                            };
                        },
                    },
                },
            },
        },
        rules: { 'walk/walk': 'error' },
    });
    // パースエラーは黙って無視しない — 見落としを防ぐため報告する
    const parseErr = messages.find((m) => m.fatal);
    if (parseErr) console.error(`⚠ パースエラー: ${rel}: ${parseErr.message}`);
}

// ---- 分類して出力 ----
const categories = { writeOnly: [], readOnly: [], both: [], unused: [] };
for (const [name, s] of stats) {
    if (s.coreWrite && !s.coreRead) categories.writeOnly.push(name);
    else if (s.coreRead && !s.coreWrite) categories.readOnly.push(name);
    else if (s.coreRead && s.coreWrite) categories.both.push(name);
    else categories.unused.push(name);
}

function printCategory(label, names, hint) {
    console.log(`\n## ${label}（${names.length}個）${hint ? ` — ${hint}` : ''}`);
    for (const name of names.sort()) {
        const s = stats.get(name);
        const outR = [...s.outsideRead].filter((f) => f !== FOOT_JS || true);
        const outW = [...s.outsideWrite];
        const extNote = (outR.length || outW.length)
            ? ` [外部: 読${outR.length}件${outW.length ? `/書${outW.length}件` : ''}]`
            : ' [Core限定]';
        console.log(`  - ${name}${extNote}`);
    }
}

printCategory('書くだけ（戻り値に格上げ候補）', categories.writeOnly, 'StAllCalcCore内では書くだけ');
printCategory('読むだけ（引数化候補）', categories.readOnly, 'StAllCalcCore内では読むだけ');
printCategory('両方（内部で完結すればローカル変数化候補）', categories.both);
printCategory('StAllCalcCore内で未使用（対象外）', categories.unused);

console.log('\n---\n[外部]件数が0の変数は、StAllCalcCore の外から一切触られていない');
console.log('＝ 引数/戻り値化してもStAllCalcCore単体の変更で閉じる（安全度が高い）候補。');

// ---- 詳細: 書くだけ/両方カテゴリの外部参照ファイル一覧（設計判断用） ----
console.log('\n\n=== 詳細: 書くだけ + 両方カテゴリの外部読み取り元ファイル ===');
for (const name of [...categories.writeOnly, ...categories.both].sort()) {
    const s = stats.get(name);
    console.log(`${name}:`);
    if (s.outsideRead.size) console.log(`  読: ${[...s.outsideRead].join(', ')}`);
    if (s.outsideWrite.size) console.log(`  書: ${[...s.outsideWrite].join(', ')}`);
}
