/**
 * StAllCalc の「ここから」セクション境界が実際のブレース構造と一致しているかを検証する。
 *
 * 発覚した問題: 「魔法攻撃で与えるダメージ＋○○％」セクション内で開いた `{` ブロックが
 * 閉じずに次の「ＡＳＰＤ固定増加」セクションへ続いていた（let aspd が前セクションの
 * ブロックスコープに属し、後セクションから参照されていた）。banner コメントは
 * 「ここから」という文言に反して、必ずしも文法的なブロック境界とは限らない。
 *
 * 各候補セクションを `function __f__(){ ...text... }` でラップしてパースし、
 * 致命的なパースエラー（ブレース不均衡）が出るセクションを列挙する。
 * パースエラーが出たセクションは、次のセクションと結合して再チェックする必要がある。
 *
 * 使い方: node check-section-balance.mjs <file> <start1> <end1> [<start2> <end2> ...]
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, ...rangeArgs] = process.argv;
const allLines = readFileSync(file, 'utf8').split('\n');
const linter = new Linter();

let anyBad = false;
for (let i = 0; i < rangeArgs.length; i += 2) {
    const start = Number(rangeArgs[i]);
    const end = Number(rangeArgs[i + 1]);
    const body = allLines.slice(start - 1, end).join('\n');
    const wrapped = `function __f__() {\n${body}\n}`;
    const messages = linter.verify(wrapped, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'script' },
        rules: {},
    });
    const fatal = messages.filter((m) => m.fatal);
    if (fatal.length > 0) {
        anyBad = true;
        console.log(`❌ ${start}-${end}: パースエラー → ${fatal.map(m => m.message).join(' / ')}`);
    } else {
        console.log(`✅ ${start}-${end}: パース成功（ブレース均衡）`);
    }
}
if (!anyBad) console.log('\n✓ 全セクション、単独でパース可能（ブレース境界と一致）');
else console.log('\n⚠ 上記セクションは隣接セクションと結合が必要');
