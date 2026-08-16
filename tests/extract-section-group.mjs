/**
 * StAllCalc（foot.js）のセクション群を1つの新ファイルへ切り出す（Phase 2 自動化パイプライン）。
 *
 * 各セクションを export function でラップし（引数は charaData/specData/mobData/
 * attackMethodConf/attackMethodConfArray のうち実際に使うものだけ、スクラッチ変数は
 * 関数内でローカル再宣言）、自由変数を解析して import 文を生成し、1ファイルに組み立てる。
 * 内部の文（statement）はラップ前後でバイト単位で不変（別途 verify-move.sh で確認する）。
 *
 * 使い方:
 *   node extract-section-group.mjs <出力ファイル> <対象.js> <headline説明> <FuncName1> <start1> <end1> [<FuncName2> <start2> <end2> ...]
 *
 * 出力: 指定した出力ファイルパスに直接書き込む。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { Linter } from 'eslint';

const SCRATCH_VARS = [
    'sandanDelay', 'vartmp', 'valary', 'confval', 'sklLv', 'bufLv',
    'objSelect', 'monsterId',
    'itemCount', 'itemCountRight', 'itemCountLeft', 'itemCountAccessory1', 'itemCountAccessory2',
    'cardCount', 'cardcount', 'cardCountRight', 'cardCountLeft',
    'cardCountHeadTop', 'cardCountHeadMid', 'cardCountShield', 'cardCountBody',
    'cardCountShoulder', 'cardCountShoes', 'cardCountAccessory1', 'cardCountAccessory2',
    'idx',
    // StAllCalc 本体の途中で var 宣言され hoisting で他セクションから参照可能になっている変数
    // （analyze-section-vars.mjs / check-hoisting.py で機械検出。全セクションで write-before-read 確認済み）
    'i', 'skllv', 'valWork', 'w',
];
const SHARED_PARAMS = ['charaData', 'specData', 'mobData', 'attackMethodConf', 'attackMethodConfArray'];

const [, , outFile, srcFile, header, ...rest] = process.argv;
if (!outFile || !srcFile || rest.length < 3 || rest.length % 3 !== 0) {
    console.error('使い方: node extract-section-group.mjs <out.js> <src.js> <header文> <Name1> <s1> <e1> ...');
    process.exit(2);
}

const srcLines = readFileSync(srcFile, 'utf8').split('\n');
const linter = new Linter();

const sections = [];
for (let i = 0; i < rest.length; i += 3) {
    sections.push({ name: rest[i], start: Number(rest[i + 1]), end: Number(rest[i + 2]) });
}

function findFreeVars(code) {
    const messages = linter.verify(code, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: {} },
        rules: { 'no-undef': 'error' },
    });
    const names = new Set();
    for (const m of messages) {
        const match = /'(.+?)' is not defined/.exec(m.message);
        if (match) names.add(match[1]);
    }
    return names;
}

function detectParams(body) {
    return SHARED_PARAMS.filter((p) => new RegExp(`[^A-Za-z0-9_]${p}[^A-Za-z0-9_]`).test(`\n${body}\n`));
}

/**
 * 本文が既に自前で「ラッパーの `let X = 0` を足すと二重宣言 SyntaxError になる」ような
 * 宣言をしている場合、その名前の集合を返す。正規表現ではなく AST を見る
 * （.claude/context に記載の通り、grep 系の文字列一致は /* ... *\/ ブロックコメント内の
 * コードにも誤ヒットするため。実際に `var i = ...` がコメントアウトされた死んだコードの
 * 中にあり、正規表現版では誤って「本文が i を宣言済み」と判定してしまうバグが発生した）。
 *
 * 判定ルール:
 *   - `var` 宣言はどの深さにあってもラッパー関数全体にホイストされるため対象に含める
 *     （二重宣言になる）。
 *   - `let`/`const` はラップした関数の直下（トップレベル文）にあるものだけを対象にする。
 *     for 文の初期化子や if ブロックの中など「ネストした」let/const は、その内側だけの
 *     スコープなので、外側でラッパーが `let X` を宣言しても衝突しない
 *     （むしろ後続の裸の代入 `X = ...` がその外側の宣言を必要とすることがある。
 *     実例: 「必中攻撃＋○○％」セクションで idx が数か所で裸代入され、末尾の
 *     for 文だけ `for (let idx = ...)` と局所宣言していたケースで発覚）。
 */
function bodyOwnLocalNames(body) {
    const wrapped = `function __body__() {\n${body}\n}`;
    const names = new Set();
    linter.verify(wrapped, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'script' },
        plugins: {
            collect: {
                rules: {
                    collect: {
                        create() {
                            return {
                                // ラップした関数の直下（トップレベル文）の var/let/const はすべて対象
                                FunctionDeclaration(node) {
                                    if (node.id?.name !== '__body__') return;
                                    for (const stmt of node.body.body) {
                                        if (stmt.type !== 'VariableDeclaration') continue;
                                        for (const d of stmt.declarations) {
                                            if (d.id.type === 'Identifier') names.add(d.id.name);
                                        }
                                    }
                                },
                                // ネストの深さを問わず、var はホイストされるので対象
                                'VariableDeclaration[kind="var"] VariableDeclarator'(node) {
                                    if (node.id.type === 'Identifier') names.add(node.id.name);
                                },
                            };
                        },
                    },
                },
            },
        },
        rules: { 'collect/collect': 'error' },
    });
    return names;
}

const wrappedFns = [];
const allFreeVars = new Set();

for (const sec of sections) {
    const body = srcLines.slice(sec.start - 1, sec.end).join('\n');
    const params = detectParams(body);
    const ownNames = bodyOwnLocalNames(body);
    const localDecls = SCRATCH_VARS.filter((v) =>
        new RegExp(`[^A-Za-z0-9_]${v}[^A-Za-z0-9_]`).test(`\n${body}\n`) && !ownNames.has(v)
    );
    const fn = `export function ${sec.name}(${params.join(', ')}) {\n` +
        (localDecls.length ? `    let ${localDecls.join(' = 0, ')} = 0;\n\n` : '') +
        body + '\n}\n';
    wrappedFns.push({ name: sec.name, start: sec.start, end: sec.end, params, localDecls, text: fn });

    // 自由変数解析はローカル変数を除いた「本文だけ」を仮関数でラップして行う
    // （スクラッチ変数はローカル宣言があるので自由変数にならないはずだが、念のため
    // ラップ後の完全なテキストで解析し、パラメータ名・ローカル宣言名は除外する）
    const probe = `function __f__(${params.join(', ')}) {\n${localDecls.map(v => `let ${v};`).join('\n')}\n${body}\n}`;
    for (const v of findFreeVars(probe)) allFreeVars.add(v);
}

const freeVarsList = [...allFreeVars].sort();
writeFileSync('/tmp/__section_group_freevars.txt', freeVarsList.join('\n') + '\n');

console.log(`# 自由変数 ${freeVarsList.length} 件 → /tmp/__section_group_freevars.txt に出力`);
console.log(`# 次に: node build-imports.mjs <元ファイル> /tmp/__section_group_freevars.txt`);
console.log(`# 各セクションの検出パラメータ:`);
for (const w of wrappedFns) {
    console.log(`#   ${w.name} (${w.start}-${w.end}): params=[${w.params.join(', ')}] locals=[${w.localDecls.join(', ')}]`);
}

writeFileSync('/tmp/__section_group_body.js', `// ${header}\n\n` + wrappedFns.map(w => w.text).join('\n'));
console.log(`# 組み立て済み本文（import 未付与）→ /tmp/__section_group_body.js`);
