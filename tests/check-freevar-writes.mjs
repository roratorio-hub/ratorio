/**
 * 指定した自由変数について、対象コード内で書き込み（代入・複合代入・++/--）が
 * あるかどうかを判定する。読み取り専用なら import だけで済み、書き込みがあれば
 * head.js 側で export let + setter 化が必要になる。
 *
 * 使い方: node check-freevar-writes.mjs <body.js> <name1> [<name2> ...]
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, ...names] = process.argv;
const code = readFileSync(file, 'utf8');
const wrapped = `(function(){\n${code}\n})`; // トップレベル関数群を式として包んで解析
const linter = new Linter();

const nameSet = new Set(names);
const writeLines = new Map();
const readLines = new Map();

linter.verify(code, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { capture: { rules: { capture: { create(context) {
        return {
            'Program:exit'(node) {
                function walk(n) {
                    if (!n || typeof n.type !== 'string') return;
                    if (n.type === 'Identifier' && nameSet.has(n.name)) {
                        const p = n.parent;
                        let isWrite = false;
                        if (p.type === 'AssignmentExpression' && p.left === n) isWrite = true;
                        if ((p.type === 'UpdateExpression') && p.argument === n) isWrite = true;
                        if (p.type === 'MemberExpression' && p.object === n) {
                            // n[...] = ... や n.x = ... は「配列/オブジェクトの中身書き換え」であり
                            // 束縛自体の再代入ではない。別カテゴリとして記録する。
                            const gp = p.parent;
                            if (gp && gp.type === 'AssignmentExpression' && gp.left === p) isWrite = 'member';
                        }
                        if (isWrite === true) {
                            if (!writeLines.has(n.name)) writeLines.set(n.name, []);
                            writeLines.get(n.name).push(n.loc.start.line);
                        } else if (isWrite === 'member') {
                            if (!writeLines.has(n.name)) writeLines.set(n.name, []);
                            writeLines.get(n.name).push(`${n.loc.start.line}(member)`);
                        } else {
                            if (!readLines.has(n.name)) readLines.set(n.name, []);
                            readLines.get(n.name).push(n.loc.start.line);
                        }
                    }
                    for (const key in n) {
                        if (key === 'parent') continue;
                        const v = n[key];
                        if (Array.isArray(v)) v.forEach(walk);
                        else if (v && typeof v.type === 'string') walk(v);
                    }
                }
                walk(node);
            },
        };
    } } } } },
    rules: { 'capture/capture': 'error' },
});

for (const name of names) {
    const w = writeLines.get(name) || [];
    const r = readLines.get(name) || [];
    console.log(`${name}\twrites=${w.length}\treads=${r.length}\twriteLines=${w.slice(0,5).join(',')}`);
}
