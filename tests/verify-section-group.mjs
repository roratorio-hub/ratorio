/**
 * extract-section-group.mjs で生成したファイルの中身が、元ファイルの該当行範囲と
 * バイト単位で一致しているかを検証する（ラップした関数シグネチャ・ローカル宣言を除く）。
 *
 * 使い方:
 *   node verify-section-group.mjs <元ファイル> <新ファイル> <FuncName1> <start1> <end1> [...]
 */
import { readFileSync } from 'node:fs';

const [, , srcFile, outFile, ...rest] = process.argv;
const src = readFileSync(srcFile, 'utf8').split('\n');
const out = readFileSync(outFile, 'utf8').split('\n');

let allOk = true;
for (let i = 0; i < rest.length; i += 3) {
    const name = rest[i];
    const start = Number(rest[i + 1]);
    const end = Number(rest[i + 2]);

    const sigIdx = out.findIndex((l) => l.startsWith(`export function ${name}(`));
    if (sigIdx === -1) {
        console.log(`❌ ${name}: 新ファイルに見つからない`);
        allOk = false;
        continue;
    }
    let bodyStart = sigIdx + 1;
    if (out[bodyStart].trim().startsWith('let ')) bodyStart++;
    if (out[bodyStart].trim() === '') bodyStart++;

    const n = end - start + 1;
    const outBody = out.slice(bodyStart, bodyStart + n);
    const srcBody = src.slice(start - 1, end);

    const match = outBody.length === srcBody.length && outBody.every((l, i) => l === srcBody[i]);
    if (match) {
        console.log(`✅ ${name} (${start}-${end}): バイト単位で一致（${n}行）`);
    } else {
        allOk = false;
        console.log(`❌ ${name} (${start}-${end}): 不一致`);
        for (let i = 0; i < Math.max(outBody.length, srcBody.length); i++) {
            if (outBody[i] !== srcBody[i]) {
                console.log(`  行${i}: src=${JSON.stringify(srcBody[i])} out=${JSON.stringify(outBody[i])}`);
            }
        }
    }
}
process.exit(allOk ? 0 : 1);
