/**
 * const 化した列挙定数を参照しているファイルへ import を付与する。
 *
 * 呼び出し箇所（`EQUIP_REGION_ID_ARMS` 等の bare 参照）は一切書き換えない。
 * これが個別 export const 方式を選んだ理由で、10,000 箇所超の参照に触らずに済む。
 *
 * 判定は AST（acorn）のスコープ解析で行う。正規表現で「宣言済みか」を見分けようとすると
 * 複数行の配列リテラルやコメントを誤判定する（過去に SU_AGI 事故を起こしている）ため、
 * **未解決の自由識別子だけ**を対象にする。
 *
 * 実行: node util/enum/add-const-imports.mjs [--dry]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const CONST_DIR = join(REPO, 'roro/m/js/const');
const DRY = process.argv.includes('--dry');

const require = createRequire(join(REPO, 'tests', 'package.json'));
const { Linter } = require('eslint');

/** const/*.js が export している定数名 -> モジュールの絶対パス */
function buildSymbolMap() {
    const map = new Map();
    for (const f of readdirSync(CONST_DIR)) {
        if (!f.endsWith('.js') || f === 'createEnum.js') continue;
        const p = join(CONST_DIR, f);
        const src = readFileSync(p, 'utf8');
        const re = /^export const\s+([A-Za-z_$][\w$]*)\s*=/gm;
        let m;
        while ((m = re.exec(src))) map.set(m[1], p);
    }
    return map;
}

/** 走査対象の JS を集める（const/ 自身は除く）。 */
function collectTargets() {
    const out = [];
    const walk = (d) => {
        if (!existsSync(d)) return;
        for (const e of readdirSync(d)) {
            const p = join(d, e);
            if (statSync(p).isDirectory()) { walk(p); continue; }
            if (!e.endsWith('.js')) continue;
            if (p.startsWith(CONST_DIR)) continue;
            out.push(p);
        }
    };
    for (const r of ['roro/m/js', 'ro4/m/js', 'roro/other/js', 'roro/common/js']) walk(join(REPO, r));
    const ai = join(REPO, 'ro4/m/calcx-ai.js');
    if (existsSync(ai)) out.push(ai);
    return out;
}

/** ESLint スコープ解析で「未解決の read 参照」名を返す。 */
const linter = new Linter();
const rule = {
    create(context) {
        return {
            'Program:exit'() {
                for (const ref of context.sourceCode.scopeManager.globalScope.through) {
                    if (ref.isRead() && !ref.resolved) {
                        context.report({ node: ref.identifier, message: ref.identifier.name });
                    }
                }
            },
        };
    },
};
const config = {
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    plugins: { s: { rules: { r: rule } } },
    rules: { 's/r': 'error' },
};

function unresolvedNames(src) {
    const names = new Set();
    for (const m of linter.verify(src, config)) {
        if (!m.fatal) names.add(m.message);
    }
    return names;
}

/** import 文を挿入する位置（既存 import の直後、無ければ先頭コメント群の後）。 */
function insertPos(src) {
    const lines = src.split('\n');
    let last = -1;
    let depth = 0;
    let inImport = false;
    for (let i = 0; i < lines.length; i++) {
        const l = lines[i];
        if (!inImport && /^\s*import[\s{*'"]/.test(l)) inImport = true;
        if (inImport) {
            depth += (l.match(/\{/g) ?? []).length - (l.match(/\}/g) ?? []).length;
            if (depth <= 0 && /;|from\s*['"][^'"]+['"]/.test(l)) { last = i; inImport = false; depth = 0; }
        }
    }
    return last + 1;
}

const symbols = buildSymbolMap();
if (symbols.size === 0) {
    console.log('roro/m/js/const/ に export const が1件も無い。パスかファイルの状態を確認すること。');
    process.exit(0);
}

let touched = 0;
let addedTotal = 0;
for (const file of collectTargets()) {
    const src = readFileSync(file, 'utf8');
    let unresolved;
    try { unresolved = unresolvedNames(src); } catch { continue; }

    /** モジュール別に必要なシンボルをまとめる */
    const byModule = new Map();
    for (const n of unresolved) {
        const mod = symbols.get(n);
        if (!mod) continue;
        if (!byModule.has(mod)) byModule.set(mod, []);
        byModule.get(mod).push(n);
    }
    if (byModule.size === 0) continue;

    const at = insertPos(src);
    const lines = src.split('\n');
    const block = [];
    for (const [mod, names] of [...byModule].sort((a, b) => a[0].localeCompare(b[0]))) {
        let rel = relative(dirname(file), mod).replace(/\\/g, '/');
        if (!rel.startsWith('.')) rel = './' + rel;
        names.sort();
        // 1 行が長くなりすぎないよう 6 個ずつ折り返す
        const chunks = [];
        for (let i = 0; i < names.length; i += 6) chunks.push('    ' + names.slice(i, i + 6).join(', ') + ',');
        block.push(names.length <= 6
            ? `import { ${names.join(', ')} } from '${rel}';`
            : `import {\n${chunks.join('\n')}\n} from '${rel}';`);
        addedTotal += names.length;
    }
    lines.splice(at, 0, ...block);
    if (!DRY) writeFileSync(file, lines.join('\n'));
    touched++;
    console.log(`  ${relative(REPO, file)}: +${[...byModule.values()].flat().length} シンボル / ${byModule.size} モジュール`);
}

console.log(`\n${DRY ? '[dry-run] ' : ''}${touched} ファイルに計 ${addedTotal} シンボルの import を付与した`);
