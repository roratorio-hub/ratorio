/**
 * BattleCalc999Core 関数自身のローカル変数（パラメータ＋関数直下の let/var）について、
 * 3つの switch ブロック（物理基本/物理特殊/魔法判定）の内側・外側（プロローグ等）の
 * 参照状況を集計する。head.js 版の analyze-head-toplevel-vars.mjs と同じ発想。
 *
 * 使い方: node analyze-battlecalc-locals.mjs <file> <関数開始行> <関数終了行>
 *          <block1start> <block1end> <block2start> <block2end> <block3start> <block3end>
 */
import { readFileSync } from 'node:fs';
import { Linter } from 'eslint';

const [, , file, fnStartArg, fnEndArg, ...rangeArgs] = process.argv;
const fnStart = Number(fnStartArg), fnEnd = Number(fnEndArg);
const ranges = [];
for (let i = 0; i < rangeArgs.length; i += 2) {
    ranges.push([Number(rangeArgs[i]), Number(rangeArgs[i + 1])]);
}

const src = readFileSync(file, 'utf8');
const linter = new Linter();

let targetVars = null;

linter.verify(src, {
    languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
    plugins: { capture: { rules: { capture: { create(context) {
        return {
            'FunctionDeclaration, ExportNamedDeclaration > FunctionDeclaration'(node) {
                const fn = node.type === 'FunctionDeclaration' ? node : node.declaration;
                if (!fn || fn.loc.start.line !== fnStart) return;
                const scope = context.sourceCode.getScope(fn);
                targetVars = scope.variables.map(v => ({
                    name: v.name,
                    isParam: v.defs.some(d => d.type === 'Parameter'),
                    refs: v.references.map(r => ({ line: r.identifier.loc.start.line, write: r.isWrite() })),
                }));
            },
        };
    } } } } },
    rules: { 'capture/capture': 'error' },
});

if (!targetVars) throw new Error(`関数が見つからない（開始行 ${fnStart}）`);

function inAnyRange(line) {
    return ranges.some(([s, e]) => line >= s && line <= e);
}
function blockIndex(line) {
    return ranges.findIndex(([s, e]) => line >= s && line <= e);
}

console.log('name\tisParam\ttotalRefs\tblocksUsedIn\toutsideRefs\tnote');
for (const v of targetVars) {
    const inFn = v.refs.filter(r => r.line >= fnStart && r.line <= fnEnd);
    if (inFn.length === 0) continue;
    const blocksUsed = new Set(inFn.filter(r => inAnyRange(r.line)).map(r => blockIndex(r.line)));
    const outside = inFn.filter(r => !inAnyRange(r.line));
    const note = blocksUsed.size > 1 ? 'MULTI-BLOCK' : (blocksUsed.size === 1 && outside.length > 0 ? 'BLOCK+OUTSIDE' : '');
    console.log(`${v.name}\t${v.isParam}\t${inFn.length}\t${[...blocksUsed].sort().join(',')}\t${outside.length}\t${note}`);
}
