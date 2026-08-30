/**
 * StAllCalc（foot.js）をセクション単位に分割する前に、各セクションが
 * StAllCalc ローカル変数を「書いてから読む」か「読んでから書く（＝前のセクションへの
 * 隠れた依存）」かを機械的に判定する。
 *
 * .claude/context/remaining-work.md「残作業 1」の作業計画 Phase 2 が要求する
 * 「ESLint のスコープ解析で read-before-write な自由変数を機械的に列挙し、
 * ゼロであることを確認してから切る」を実装したもの。
 *
 * 判定ルール（対象変数ごとに、セクション内で最初に触れた箇所を見る）:
 *   - 単純代入（x = ...）が最初 → 安全（このセクション内で値を作ってから使っている）
 *   - 複合代入（x += ...）/ 前置後置インクリメント（x++）が最初 → 危険（既存値に依存）
 *   - それ以外の参照（読み取り）が最初 → 危険（前のセクションが書いた値に依存）
 *   - セクション内で一度も参照されない → 対象外
 *
 * 使い方:
 *   node analyze-section-vars.mjs <対象ファイル> <開始行> <終了行> [<開始行> <終了行> ...]
 *   例: node analyze-section-vars.mjs ../engine/status/foot.js 2621 2662 2663 3994 ...
 *
 * 出力: セクションごとに「危険」変数があれば一覧表示。全セクションで危険ゼロなら
 *   最後に "✓ 全セクション安全" と出す。
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

// charaData/specData/mobData/attackMethodConf(Array) は含めない。
// StAllCalc 全体を通じて結果を積み上げる「出力先」オブジェクトであり、
// 各セクション関数の引数として明示的に渡す前提（危険判定の対象外）。
const WATCHED_VARS = [
    'sandanDelay', 'vartmp', 'valary', 'confval', 'sklLv', 'bufLv',
    'objSelect', 'monsterId',
    'itemCount', 'itemCountRight', 'itemCountLeft', 'itemCountAccessory1', 'itemCountAccessory2',
    'cardCount', 'cardcount', 'cardCountRight', 'cardCountLeft',
    'cardCountHeadTop', 'cardCountHeadMid', 'cardCountShield', 'cardCountBody',
    'cardCountShoulder', 'cardCountShoes', 'cardCountAccessory1', 'cardCountAccessory2',
    'calcForm',
    // ここから追加: StAllCalc 本体の途中で var 宣言され、hoisting で他セクションから
    // 参照可能になっている変数（check-hoisting.py で機械検出）。
    'i', 'idx', 'skllv', 'valWork', 'w',
];

// 常に「読み取りのみ」で妥当な変数（StAllCalc 冒頭で一度だけ計算され、以降は
// 参照専用の値。書き込みがないため safe-write 判定が出ず誤検知するのでスキップ）
const READONLY_OK_VARS = new Set(['calcForm']);

const [, , file, ...rangeArgs] = process.argv;
if (!file || rangeArgs.length < 2 || rangeArgs.length % 2 !== 0) {
    console.error('使い方: node analyze-section-vars.mjs <file> <start1> <end1> [<start2> <end2> ...]');
    process.exit(2);
}

const allLines = readFileSync(file, 'utf8').split('\n');
const linter = new Linter();

let anyDanger = false;

for (let i = 0; i < rangeArgs.length; i += 2) {
    const start = Number(rangeArgs[i]);
    const end = Number(rangeArgs[i + 1]);
    // 1-indexed 行番号 → 0-indexed slice。関数でラップしてパース可能にする。
    const body = allLines.slice(start - 1, end).join('\n');
    const wrapped = `function __section__() {\n${body}\n}`;

    const firstTouch = new Map(); // name -> 'safe-write' | 'danger'
    const order = []; // 出現順を記録するため

    linter.verify(wrapped, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'script' },
        plugins: {
            walk: {
                rules: {
                    walk: {
                        create() {
                            return {
                                Identifier(node) {
                                    const name = node.name;
                                    if (!WATCHED_VARS.includes(name)) return;
                                    if (firstTouch.has(name)) return; // 最初の1回だけ見る

                                    const parent = node.parent;
                                    let classification = 'danger'; // デフォルトは危険（読み取り扱い）

                                    if (
                                        parent &&
                                        parent.type === 'AssignmentExpression' &&
                                        parent.left === node &&
                                        parent.operator === '='
                                    ) {
                                        classification = 'safe-write';
                                    } else if (
                                        parent &&
                                        (parent.type === 'VariableDeclarator') &&
                                        parent.id === node
                                    ) {
                                        // ローカル再宣言（let/var x = ...）。宣言のみで初期値なしなら危険側に倒す
                                        classification = parent.init ? 'safe-write' : 'danger';
                                    } else if (
                                        parent &&
                                        parent.type === 'MemberExpression' &&
                                        parent.object === node
                                    ) {
                                        // charaData[...] のような添字アクセス。配列オブジェクト自体の参照は「読み取り」
                                        classification = 'danger';
                                    }
                                    // AssignmentExpression の複合代入（+=, -= 等）・UpdateExpression（++/--）・
                                    // 通常の読み取りはすべてデフォルトの 'danger' のまま

                                    firstTouch.set(name, classification);
                                    order.push(name);
                                },
                            };
                        },
                    },
                },
            },
        },
        rules: { 'walk/walk': 'error' },
    });

    const dangerVars = [...firstTouch.entries()]
        .filter(([k, v]) => v === 'danger' && !READONLY_OK_VARS.has(k))
        .map(([k]) => k);
    const readonlyUsed = [...firstTouch.entries()].filter(([k]) => READONLY_OK_VARS.has(k)).map(([k]) => k);
    if (dangerVars.length > 0) {
        anyDanger = true;
        console.log(`❌ ${start}-${end}: 危険（read-before-write の疑い） → ${dangerVars.join(', ')}`);
    } else {
        const safeVars = [...firstTouch.entries()].filter(([k]) => !READONLY_OK_VARS.has(k)).map(([k]) => k);
        const note = readonlyUsed.length ? `（+ 読み取り専用共有: ${readonlyUsed.join(', ')}）` : '';
        console.log(`✅ ${start}-${end}: 安全${safeVars.length ? ` (使用: ${safeVars.join(', ')})` : '（対象変数を使用しない）'}${note}`);
    }
}

if (!anyDanger) {
    console.log('\n✓ 全セクション安全（read-before-write なし）');
} else {
    console.log('\n⚠ 上記の危険セクションは前のセクションの計算結果に依存している可能性がある。個別に確認すること。');
}
