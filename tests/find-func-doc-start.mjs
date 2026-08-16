/**
 * `export function X(` の行番号を与えると、直前に連続する JSDoc/コメントブロックの
 * 開始行を遡って探す（空行に当たったら停止＝そのコメントは対象外）。
 * 関数を「その説明コメントごと」1単位として範囲を切るための境界特定に使う。
 *
 * 使い方: node find-func-doc-start.mjs <file> <line1> [<line2> ...]
 */
import { readFileSync } from 'node:fs';

const [, , file, ...lineArgs] = process.argv;
const lines = readFileSync(file, 'utf8').split('\n');

for (const arg of lineArgs) {
    const funcLine = Number(arg);
    let i = funcLine - 2; // 0-indexed line right above the function (funcLine is 1-indexed)
    // 直上が "*/" で終わるブロックコメントなら、対応する "/*" までさかのぼる
    if (lines[i] !== undefined && lines[i].trim().endsWith('*/')) {
        while (i >= 0 && !lines[i].trim().startsWith('/*')) i--;
    } else {
        // コメントが無ければ関数自身の行が開始
        i = funcLine - 1;
    }
    console.log(`${funcLine}\t${i + 1}`); // 1-indexed
}
