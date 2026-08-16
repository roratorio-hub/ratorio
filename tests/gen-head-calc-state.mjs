/**
 * head-calc-state-comments.json（apply-head-calc-state.mjs が出力）を使って
 * head-calc-state.js の CS オブジェクトを、各プロパティに元の JSDoc を付けて生成する。
 *
 * 使い方: node gen-head-calc-state.mjs <出力先 head-calc-state.js>
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , outFile] = process.argv;
const comments = JSON.parse(readFileSync(new URL('./head-calc-state-comments.json', import.meta.url), 'utf8'));

// name -> 初期値リテラル（head.js 元コードの初期値と一致させる。順序も元の宣言順）
const entries = [
    ['wLAch', 'false'],
    ['str_bSUBname', '""'],
    ['str_bSUB', '""'],
    ['cast_kotei', 'false'],
    ['n_PerfectHIT_DMG', '0'],
    ['n_KoteiCast', '0'],
    ['wCast', '0'],
    ['wbairitu', '100'],
    ['str_PerfectHIT_DMG', '0'],
    ['Last_DMG_A', '[0,0,0]'],
    ['Last_DMG_B', '[0,0,0]'],
    ['n_Buki_Muri', 'false'],
    ['g_bSkillNoDamage', 'false'],
    ['directSubtractionMdef', 'false'],
    ['n_AS_MODE', 'false'],
    ['BK_Weapon_zokusei', '0'],
    ['option_count', '0'],
    ['n_DEATH_BOUND', '[0,0,0,0]'],
    ['B_Total_DEF', '0'],
    ['B_Total_MDEF', '0'],
    ['n_A_DMG', '[0,0,0]'],
    ['n_A_DMG_GX', '[0,0,0]'],
    ['BK_n_A_DMG_Wolf', '[0,0,0]'],
    ['n_A_GX_HANDO', 'false'],
    ['SG_Special_HITnum', '0'],
    ['wHITsuu', '0'],
    ['wActiveHitNum', '0'],
    ['n_bunkatuHIT', '0'],
    ['SG_Special_DMG', '[0,0,0]'],
    ['g_damageTextArray', '[[],[],[]]'],
    ['g_wHITsuu_Array', 'null'],
    ['w_HIT', '0'],
    ['w_HIT_HYOUJI', '0'],
    ['wCSize', '0'],
    ['n_A_CriATK', '0'],
];

for (const [name] of entries) {
    if (!(name in comments)) throw new Error(`comments.json に説明が無い: ${name}`);
}
if (entries.length !== Object.keys(comments).length) {
    throw new Error(`件数不一致: entries=${entries.length} comments=${Object.keys(comments).length}`);
}

const body = entries.map(([name, initExpr]) => {
    return `    /** ${comments[name]} */\n    ${name}: ${initExpr},`;
}).join('\n');

const header = `/**
 * head.js のダメージ計算（BattleCalc999Core）用スクラッチ状態。
 *
 * 1 回のダメージ計算中だけ有効な作業変数で、物理スキル基本/特殊計算式・
 * 魔法判定スキルの各計算式ブロック（\`head-skill-formula-*.js\` として分割予定）と
 * head.js 本体の両方から読み書きされる。ESM では import した束縛に代入できないため
 * 単純な \`export let\` では共有できず、1 つのオブジェクトへ集約している。
 *
 * head.js 外からは一切参照されない（head.js とその分割先だけが import する）。
 * \`export let\` + \`set_XXX()\` という他ファイルの通例からは意図的に外れている
 * （\`wbairitu += x\` のような複合代入が700箇所以上あり、セッター呼び出しへの
 * 書き換えは差分が大きくなりすぎるため）。
 *
 * 各プロパティの説明は head.js の元 \`let\` 宣言に付いていた JSDoc を引き継いでいる。
 */
export const CS = {
${body}
};
`;

writeFileSync(outFile, header);
console.log(`wrote ${outFile} (${entries.length} properties)`);
