/**
 * 指定した JS スニペットが参照する「自由変数」（import も宣言もされていない識別子）を列挙する。
 *
 * 巨大ファイル分割（foot.js/head.js、.claude/context/remaining-work.md「残作業 1」）で
 * 関数群を新ファイルへ切り出す際、そのブロックが何に依存しているかを機械的に洗い出すために使う。
 * scan-undeclared-reads.mjs と同じ ESLint の `no-undef` を、globals を空にして流用している
 * （組み込みグローバルも含めて「本当に自由な識別子」を全部拾う）。
 *
 * 使い方:
 *   1. 移動したい行範囲を `sed -n '<start>,<end>p' foot.js > body.js` で切り出す
 *   2. node find-free-vars.mjs body.js  → 自由変数の一覧（1行1識別子）
 *   3. その一覧を build-imports.mjs に渡すと、元ファイルの import 文から出典を引いて
 *      グループ化された import 文を生成できる
 */
import { Linter } from 'eslint';
import { readFileSync } from 'node:fs';

const target = process.argv[2];
if (!target) {
    console.error('使い方: node find-free-vars.mjs <対象.js>');
    process.exit(2);
}

const code = readFileSync(target, 'utf8');
const linter = new Linter();
const messages = linter.verify(code, {
    languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: {}, // 組み込みも与えない。全ての自由変数を検出する
    },
    rules: { 'no-undef': 'error' },
});
const names = new Set();
for (const m of messages) {
    const match = /'(.+?)' is not defined/.exec(m.message);
    if (match) names.add(match[1]);
}
console.log([...names].sort().join('\n'));
