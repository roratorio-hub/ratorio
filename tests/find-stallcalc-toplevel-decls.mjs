/**
 * StAllCalc の「トップレベル文」のうち VariableDeclaration（var/let/const）を列挙する。
 * これらは StAllCalc 全体のスコープに存在し、以降のどの「ここから」セクションからも
 * 参照されうる（aspd 事故の原因はこれ）。
 *
 * 使い方: node find-stallcalc-toplevel-decls.mjs <file> <StAllCalc開始行> <StAllCalc終了行>
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, startArg, endArg] = process.argv;
const saStart = Number(startArg);
const saEnd = Number(endArg);

const allLines = readFileSync(file, 'utf8').split('\n');
const body = allLines.slice(saStart - 1, saEnd).join('\n');
const wrapped = `function __StAllCalc__() {\n${body}\n}`;

const linter = new Linter();
const decls = [];

linter.verify(wrapped, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'script' },
    plugins: {
        capture: {
            rules: {
                capture: {
                    create() {
                        return {
                            FunctionDeclaration(node) {
                                if (node.id?.name !== '__StAllCalc__') return;
                                for (const stmt of node.body.body) {
                                    if (stmt.type === 'VariableDeclaration') {
                                        for (const d of stmt.declarations) {
                                            if (d.id.type === 'Identifier') {
                                                decls.push({
                                                    name: d.id.name,
                                                    kind: stmt.kind,
                                                    line: d.loc.start.line - 1 + saStart - 1,
                                                    hasInit: !!d.init,
                                                });
                                            }
                                        }
                                    }
                                }
                            },
                        };
                    },
                },
            },
        },
    },
    rules: { 'capture/capture': 'error' },
});

for (const d of decls) {
    console.log(`${d.line}\t${d.kind}\t${d.name}\t${d.hasInit ? 'init' : 'noinit'}`);
}
