/**
 * Phase 3b: BattleCalc999Core の3大 switch ブロック（物理基本/物理特殊/魔法判定）を
 * それぞれ独立関数として抽出する。
 *
 * 各ブロックは元々 `while (true) { ... }` で1回だけ回るループとして書かれており、
 * 「該当スキルが無ければ break で while を抜けて次のブロックへ」という制御フローを
 * 実現していた（関数分割前提の設計ではない）。関数境界を跨ぐとその暗黙のフォール
 * スルーが使えないため、「該当なしは undefined を返す」という明示的な契約に変換する。
 * これは分割に伴い必然的に生じる最小限の意味変更であり、スイッチの中身（290 case 等）
 * 自体はバイト単位で不変。
 *
 * 使い方: node extract-skill-formula-block.mjs <start行> <end行> <フラグ変数名|NONE> <出力.js>
 *   フラグ変数名: 'bDefaultFormula' / 'bPhysicalFormula' / 'NONE'（ブロック3は判定なし）
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [, , startArg, endArg, flagName, outRel] = process.argv;
const start = Number(startArg), end = Number(endArg);
const HEAD_JS = '../engine/head.js';

const allLines = readFileSync(HEAD_JS, 'utf8').split('\n');
const bodyLines = allLines.slice(start - 1, end); // start行 "while (true) {" 〜 end行 "}"

if (!/^\twhile \(true\) \{$/.test(bodyLines[0])) {
    throw new Error(`先頭行が while(true) ではない: ${JSON.stringify(bodyLines[0])}`);
}
if (bodyLines[bodyLines.length - 1] !== '\t}') {
    throw new Error(`末尾行が想定と違う: ${JSON.stringify(bodyLines[bodyLines.length - 1])}`);
}

// while(true){ と 対応する } を取り除き、中身だけを残す
let inner = bodyLines.slice(1, -1);

if (flagName !== 'NONE') {
    const idx = inner.findIndex(l => new RegExp(`^\\t\\t\\tbreak;$`).test(l) && inner[inner.indexOf(l) - 1]?.includes(`if (!${flagName})`));
    // より確実に: "if (!flagName) {" を含む行の直後の break; を置換
    let replaced = false;
    for (let i = 0; i < inner.length; i++) {
        if (inner[i].includes(`if (!${flagName})`) && inner[i + 1]?.trim() === 'break;') {
            inner[i + 1] = inner[i + 1].replace('break;', 'return undefined;');
            replaced = true;
            break;
        }
    }
    if (!replaced) throw new Error(`${flagName} の break 置換箇所が見つからない`);
}

writeFileSync(outRel, inner.join('\n') + '\n');
console.log(`wrote ${outRel} (${inner.length} lines, flag=${flagName})`);
