/**
 * DefineEnum 由来の全定数を実行時抽出して JSON スナップショットに書き出す。
 *
 * 用途:
 *   1. const 化の元データ（生成器 gen-const-modules.mjs が読む）
 *   2. 変換前後の値一致検証の基準（verify-enum-values.mjs が比較する）
 *
 * 実行: node util/enum/dump-enum-values.mjs [出力先]
 *       既定の出力先は util/enum/enum-values.snapshot.json
 */
import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { extractEnums, REPO } from './enum-runtime.mjs';

const out = process.argv[2] ?? join(REPO, 'util/enum/enum-values.snapshot.json');

const { constants, enums, pageErrors } = await extractEnums();

if (pageErrors.length) {
    console.error('ページ内で JS エラーが出ている。抽出が不完全な可能性があるため中止する:');
    for (const m of pageErrors.slice(0, 10)) console.error(`    ${m}`);
    process.exit(1);
}

const names = Object.keys(constants).sort();

// DefineEnum は全廃済みなので、通常この採取結果は空になる。
// そのまま書き出すとスナップショット（= const 化の正解値・唯一の基準）を消してしまうため、
// 既存より件数が減る上書きは拒否する。意図的にやり直す場合は出力先を明示すること。
if (existsSync(out) && names.length < Object.keys(JSON.parse(readFileSync(out, 'utf8')).constants).length) {
    console.error(`✗ 採取できた定数が ${names.length} 件で、既存スナップショットより少ない。`);
    console.error('  DefineEnum は const 化で全廃済みのため、これは正常な状態。');
    console.error('  スナップショットを壊さないよう上書きを中止する。');
    console.error(`  （どうしても書き出す場合は出力先を指定: node util/enum/dump-enum-values.mjs /tmp/out.json）`);
    process.exit(1);
}

writeFileSync(out, JSON.stringify({ enums, constants }, null, 1) + '\n');

console.log(`✓ 定数 ${names.length} 件 / 列挙型 ${enums.length} 件 を書き出した`);
console.log(`  ${out}`);
