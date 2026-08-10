/**
 * StAllCalc 全体を1つの AST としてパースし、各「ここから」バナー行が
 * 「トップレベル文と文の間」（＝安全な分割点）にあるかを検証する。
 *
 * 発覚した問題（aspd 事故）を受けて作った、ブレース深さのカウントに頼らない
 * 厳密な検証。banner コメントは必ずしも文法的なブロック境界と一致しないため、
 * 実際に AST を見て「その行より前に開始し、その行より後に終了する文」が
 * 存在しないことを確認する。
 *
 * 使い方: node check-stallcalc-boundaries.mjs <file> <StAllCalc開始行> <StAllCalc終了行> <banner行1> [<banner行2> ...]
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, startArg, endArg, ...bannerArgs] = process.argv;
const saStart = Number(startArg);
const saEnd = Number(endArg);
const banners = bannerArgs.map(Number);

const allLines = readFileSync(file, 'utf8').split('\n');
const body = allLines.slice(saStart - 1, saEnd).join('\n');
const wrapped = `function __StAllCalc__() {\n${body}\n}`;

const linter = new Linter();
let topLevelStatements = null;
let fatalMsg = null;

linter.verify(wrapped, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'script' },
    plugins: {
        capture: {
            rules: {
                capture: {
                    create() {
                        return {
                            FunctionDeclaration(node) {
                                if (node.id?.name === '__StAllCalc__') {
                                    topLevelStatements = node.body.body.map(s => ({
                                        // wrapped の1行目ぶん +1 して元ファイルの行番号に戻す
                                        start: s.loc.start.line - 1 + saStart - 1,
                                        end: s.loc.end.line - 1 + saStart - 1,
                                        type: s.type,
                                    }));
                                }
                            },
                        };
                    },
                },
            },
        },
    },
    rules: { 'capture/capture': 'error' },
}).forEach(m => { if (m.fatal) fatalMsg = m.message; });

if (fatalMsg) {
    console.log(`❌ StAllCalc 全体のパースに失敗: ${fatalMsg}`);
    process.exit(1);
}
if (!topLevelStatements) {
    console.log('❌ トップレベル文の取得に失敗（内部エラー）');
    process.exit(1);
}

console.log(`StAllCalc 直下のトップレベル文: ${topLevelStatements.length} 個`);

let anyUnsafe = false;
for (const banner of banners) {
    // banner 行を「またぐ」トップレベル文（start < banner <= end かつ start < banner という意味で
    // 「文の途中」）を探す。文の直後（end < banner）や文の直前（start >= banner）なら安全。
    const straddling = topLevelStatements.filter(s => s.start < banner && banner <= s.end);
    if (straddling.length > 0) {
        anyUnsafe = true;
        console.log(`❌ 行${banner}: トップレベル文の途中にある → ${straddling.map(s => `${s.type}(${s.start}-${s.end})`).join(', ')}`);
    } else {
        console.log(`✅ 行${banner}: 文と文の間（安全な分割点）`);
    }
}

if (!anyUnsafe) console.log('\n✓ 全 banner が安全な分割点');
else console.log('\n⚠ 上記 banner は隣接セクションと結合が必要（実際のブロック境界に合わせる）');
