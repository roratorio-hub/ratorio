/**
 * 各セクションが charaData/specData/mobData/attackMethodConf/attackMethodConfArray の
 * どれを参照しているかを列挙する（StAllCalc セクション分割の関数シグネチャ決定用）。
 *
 * 使い方: node analyze-section-params.mjs <file> <start1> <end1> [<start2> <end2> ...]
 */
import { readFileSync } from 'node:fs';

const PARAMS = ['charaData', 'specData', 'mobData', 'attackMethodConf', 'attackMethodConfArray'];

const [, , file, ...rangeArgs] = process.argv;
const allLines = readFileSync(file, 'utf8').split('\n');

for (let i = 0; i < rangeArgs.length; i += 2) {
    const start = Number(rangeArgs[i]);
    const end = Number(rangeArgs[i + 1]);
    const body = allLines.slice(start - 1, end).join('\n');
    const used = PARAMS.filter((p) => new RegExp(`[^A-Za-z0-9_]${p}[^A-Za-z0-9_]`).test(`\n${body}\n`));
    console.log(`${start} ${end}: ${used.join(', ') || '(なし)'}`);
}
