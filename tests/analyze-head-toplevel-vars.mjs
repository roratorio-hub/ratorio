/**
 * head.js のモジュールトップレベル let/var 宣言を列挙し、各識別子の全参照を
 * ESLint スコープ解析で厳密に収集する（シャドーイングを正しく除外する）。
 * 三大 switch ブロック（物理基本/物理特殊/魔法判定）の内側・外側の両方から
 * 参照されている変数だけが Phase 3a（calc-state.js 化。旧 head-calc-state.js。B-26aでプレフィックス撤廃）の対象候補になる。
 *
 * 使い方: node analyze-head-toplevel-vars.mjs <file> <block1start> <block1end> <block2start> <block2end> <block3start> <block3end>
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, ...rangeArgs] = process.argv;
const ranges = [];
for (let i = 0; i < rangeArgs.length; i += 2) {
    ranges.push([Number(rangeArgs[i]), Number(rangeArgs[i + 1])]);
}

const src = readFileSync(file, 'utf8');
const linter = new Linter();

const topDecls = []; // {name, kind, line}
const allRefsByName = new Map(); // name -> [line,...]

linter.verify(src, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: {
        capture: {
            rules: {
                capture: {
                    create(context) {
                        return {
                            Program(node) {
                                for (const stmt of node.body) {
                                    if (stmt.type === 'VariableDeclaration' && (stmt.kind === 'let' || stmt.kind === 'var')) {
                                        for (const d of stmt.declarations) {
                                            if (d.id.type === 'Identifier') {
                                                topDecls.push({ name: d.id.name, kind: stmt.kind, line: d.loc.start.line });
                                            }
                                        }
                                    }
                                }
                            },
                            'Program:exit'(node) {
                                // module scope: ESLint creates a "module" scope as child of global for sourceType module
                                const scopes = [context.sourceCode.getScope(node)];
                                // gather module-level scope (child of global, type 'module')
                                function collectModuleScope(scope, out) {
                                    if (scope.type === 'module') out.push(scope);
                                    for (const child of scope.childScopes) collectModuleScope(child, out);
                                }
                                const moduleScopes = [];
                                collectModuleScope(scopes[0], moduleScopes);
                                const targetScope = moduleScopes[0] || scopes[0];
                                for (const variable of targetScope.variables) {
                                    if (!allRefsByName.has(variable.name)) allRefsByName.set(variable.name, []);
                                    for (const ref of variable.references) {
                                        allRefsByName.get(variable.name).push({
                                            line: ref.identifier.loc.start.line,
                                            write: ref.isWrite(),
                                        });
                                    }
                                    // also include the def location itself is already counted via references in most cases
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

function inAnyRange(line) {
    return ranges.some(([s, e]) => line >= s && line <= e);
}

console.log(`# 対象ファイル: ${file}`);
console.log(`# switch ブロック範囲: ${ranges.map(([s, e]) => `${s}-${e}`).join(', ')}`);
console.log('');
console.log('name\tkind\tdeclLine\ttotalRefs\tinsideRefs\toutsideRefs\tinAndOut');

const results = [];
for (const decl of topDecls) {
    const refs = allRefsByName.get(decl.name) || [];
    const inside = refs.filter(r => inAnyRange(r.line)).length;
    const outside = refs.filter(r => !inAnyRange(r.line)).length;
    results.push({ ...decl, total: refs.length, inside, outside, both: inside > 0 && outside > 0 });
}

results.sort((a, b) => b.total - a.total);
for (const r of results) {
    console.log(`${r.name}\t${r.kind}\t${r.line}\t${r.total}\t${r.inside}\t${r.outside}\t${r.both ? 'YES' : ''}`);
}

const bothCount = results.filter(r => r.both).length;
console.error(`\n# 内外両方から参照される変数: ${bothCount} 件`);
