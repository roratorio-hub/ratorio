#!/usr/bin/env node
/**
 * 巨大ファイル分割（foot.js/head.js）の before/after 差分ハーネス用ベースラインを作る。
 *
 * 現在のツリーを丸ごとコピーする（git のブランチ操作は禁止事項のため、
 * 「ただのディレクトリコピー」でベースラインを用意する。参照:
 * .claude/context/remaining-work.md「残作業 1」/ 作業計画のPhase 0）。
 *
 * 分割作業に着手する前に一度だけ実行する。
 * split-regression.test.ts はここで作ったディレクトリと現在のツリーを
 * 2つの静的サーバーで配信し、同一URL・同一操作列の結果を突き合わせる。
 *
 * 実行: node make-baseline.mjs [出力先ディレクトリ]
 *   省略時は $SPLIT_BASELINE_DIR（未設定なら固定の scratchpad パス）を使う。
 */
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '..'); // tests/.. = ratorio/

// split-regression.test.ts と定義を揃えてある（どちらか一方だけ変えないこと）。
const DEFAULT_BASELINE_DIR = '/tmp/claude-1000/-workspace/ed728728-d42e-44b1-ba49-4bedcc896dd7/scratchpad/split-baseline';

const dest = process.argv[2] ?? process.env.SPLIT_BASELINE_DIR ?? DEFAULT_BASELINE_DIR;

// 静的配信に不要な巨大ディレクトリ・アイテム検索用データ（calcx.html の起動経路では未参照）・
// git 管理データを除外する。calcx.html が実際に読むファイルだけを持てば十分。
// ⚠ dist/ は除外しないこと。calcx.html が `../../dist/bundle.js`（Layer 2 TypeScript の
//   ビルド出力）を読み込んでおり、無いとセーブデータ復元自体が動かず全項目が空になる
//   （2026-08-10 に一度この事故で split-regression.test.ts が全滅した）。
const EXCLUDES = [
    '.git/', 'node_modules/', '_draft/', '解析メモ/',
    'tests/', 'util/', '.circleci/', '.github/', '.vscode/',
    'ro4/m/items_part1.json', 'ro4/m/items_part2.json',
    'ro4/m/items_part3.json', 'ro4/m/items_part4.json',
];

if (existsSync(dest)) {
    console.log(`既存のベースラインを削除: ${dest}`);
    rmSync(dest, { recursive: true, force: true });
}
mkdirSync(dirname(dest), { recursive: true });

console.log(`ベースライン作成: ${PROJECT_ROOT} → ${dest}`);
const args = [
    '-a',
    ...EXCLUDES.flatMap((e) => ['--exclude', e]),
    `${PROJECT_ROOT}/`,
    `${dest}/`,
];
execFileSync('rsync', args, { stdio: 'inherit' });
console.log('完了。split-regression.test.ts は SPLIT_BASELINE_DIR（未設定ならこの既定パス）を参照する。');
