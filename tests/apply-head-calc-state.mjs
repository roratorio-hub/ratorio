/**
 * Phase 3a: head.js のモジュールトップレベル scratch 変数のうち、物理/特殊/魔法の
 * 3大 switch ブロック（分割予定）の内外両方から参照される 35 個を、
 * head-calc-state.js の CS オブジェクトへの参照に機械的に書き換える。
 *
 * - 対象変数の宣言文（`let X = ...;`）を削除する
 * - 対象変数への全参照（読み書き）を `CS.X` に置換する（ESLint スコープ解析で
 *   シャドーイングを正しく除外し、対象の束縛だけを書き換える）
 * - 先頭に `import { CS } from './head-calc-state.js';` を追加する
 *
 * 使い方: node apply-head-calc-state.mjs <head.js> <names.txt>
 *   names.txt は対象変数名を1行1個で列挙したファイル
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, namesFile] = process.argv;
const targetNames = new Set(readFileSync(namesFile, 'utf8').split('\n').map(s => s.trim()).filter(Boolean));

const src = readFileSync(file, 'utf8');
const linter = new Linter();

const edits = []; // {start, end, text}
const declStmtRanges = []; // for removal
const foundNames = new Set();

linter.verify(src, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { capture: { rules: { capture: { create(context) {
        return {
            'Program:exit'(node) {
                function collectModuleScope(scope, out) {
                    if (scope.type === 'module') out.push(scope);
                    for (const child of scope.childScopes) collectModuleScope(child, out);
                }
                const moduleScopes = [];
                collectModuleScope(context.sourceCode.getScope(node), moduleScopes);
                const targetScope = moduleScopes[0];
                for (const variable of targetScope.variables) {
                    if (!targetNames.has(variable.name)) continue;
                    foundNames.add(variable.name);
                    // declaration removal: def.node is the VariableDeclarator; its parent is VariableDeclaration
                    for (const def of variable.defs) {
                        if (def.type === 'Variable') {
                            const declStmt = def.node.parent; // VariableDeclaration
                            if (declStmt.declarations.length !== 1) {
                                throw new Error(`複数宣言の文は未対応: ${variable.name} @ line ${declStmt.loc.start.line}`);
                            }
                            declStmtRanges.push({ name: variable.name, range: declStmt.range, line: declStmt.loc.start.line });
                        }
                    }
                    for (const ref of variable.references) {
                        // 宣言文自身の初期化子は "write reference" として references にも
                        // 現れる（eslint-scope の仕様）。宣言文ごと削除するので二重編集を避けてスキップする。
                        if (ref.init) continue;
                        const id = ref.identifier;
                        edits.push({ start: id.range[0], end: id.range[1], text: `CS.${variable.name}` });
                    }
                }
            },
        };
    } } } } },
    rules: { 'capture/capture': 'error' },
});

for (const name of targetNames) {
    if (!foundNames.has(name)) throw new Error(`変数が見つからない: ${name}`);
}

// removal edits: remove entire line including trailing newline.
// 直上の行が単行 JSDoc（/** ... */ 1行完結）なら、その変数の説明とみなして一緒に除去し、
// テキストを comments.json へ書き出す（head-calc-state.js の CS プロパティの説明に転用するため）。
const lines = src.split('\n');
function lineStartOffset(lineNum) { // 1-indexed
    return lines.slice(0, lineNum - 1).join('\n').length + (lineNum > 1 ? 1 : 0);
}
const SINGLE_LINE_DOC = /^\s*\/\*\*(.*)\*\/\s*$/;
const comments = {};
for (const d of declStmtRanges) {
    const lineNum = d.line;
    let removeFromLine = lineNum;
    const aboveLine = lines[lineNum - 2]; // lineNum-1 is 0-indexed self, -2 is the line above
    const m = aboveLine != null ? aboveLine.match(SINGLE_LINE_DOC) : null;
    if (m) {
        removeFromLine = lineNum - 1;
        comments[d.name] = m[1].trim();
    }
    const start = lineStartOffset(removeFromLine);
    const end = lineStartOffset(lineNum + 1);
    edits.push({ start, end, text: '', kind: 'removal', name: d.name });
}
writeFileSync(new URL('./head-calc-state-comments.json', import.meta.url), JSON.stringify(comments, null, 2));

// import insertion: right before the first import statement
const firstImportMatch = src.match(/^import /m);
if (!firstImportMatch) throw new Error('import 文が見つからない');
const insertPos = firstImportMatch.index;
edits.push({
    start: insertPos, end: insertPos,
    text: "// ダメージ計算スクラッチ状態（BattleCalc999Core とスキル計算式分割先が共有する）。詳細は head-calc-state.js 参照。\nimport { CS } from './head-calc-state.js';\n",
});

// sort edits by start descending, apply
edits.sort((a, b) => b.start - a.start || b.end - a.end);
for (let i = 1; i < edits.length; i++) {
    const prev = edits[i - 1], cur = edits[i];
    if (cur.end > prev.start) {
        throw new Error(`編集範囲が重複: [${cur.start},${cur.end}) と [${prev.start},${prev.end})`);
    }
}
let out = src;
for (const e of edits) {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
}

writeFileSync(file, out);
console.log(`removed ${declStmtRanges.length} declarations, rewrote ${edits.length - declStmtRanges.length - 1} references, inserted 1 import`);
