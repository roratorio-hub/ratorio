/**
 * const 化済みの列挙型について、元の CGlobalConstManager.DefineEnum(...) 呼び出しを除去する。
 *
 * 除去しないと「グローバルにも生えているし import もされている」二重定義になり、
 * どちらが効いているか分からない状態になる（verify-enum-values.mjs が検出する）。
 *
 * 対象の判定は roro/m/js/const/ に EnumXxx.js が存在するかで行う。
 * 呼び出しの第1引数（列挙名の文字列リテラル）を見て、該当するものだけ落とす。
 *
 * 実行: node util/enum/remove-define-enum.mjs [--dry]
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO = join(__dirname, '..', '..');
const CONST_DIR = join(REPO, 'roro/m/js/const');
const DRY = process.argv.includes('--dry');

const converted = new Set(
    readdirSync(CONST_DIR)
        .filter((f) => f.endsWith('.js') && f !== 'createEnum.js')
        .map((f) => f.replace(/\.js$/, '')),
);

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
    return out;
}

let files = 0;
let calls = 0;

for (const file of collectTargets()) {
    let src = readFileSync(file, 'utf8');
    const re = /CGlobalConstManager\.(?:DefineEnum|DefinePseudoEnum)\s*\(/g;
    const spans = [];
    let m;
    while ((m = re.exec(src))) {
        // 実引数の範囲を括弧の対応で求める
        const open = src.indexOf('(', m.index + 'CGlobalConstManager.'.length);
        let depth = 0;
        let j = open;
        for (; j < src.length; j++) {
            if (src[j] === '(') depth++;
            else if (src[j] === ')' && --depth === 0) break;
        }
        const arg = src.slice(open, j + 1);
        const em = arg.match(/^\(\s*["']([A-Za-z_$][\w$]*)["']/);
        if (!em || !converted.has(em[1])) continue;

        // 文末のセミコロンと直後の改行まで含める
        let end = j + 1;
        while (end < src.length && (src[end] === ';' || src[end] === '\r')) end++;
        if (src[end] === '\n') end++;

        // 直前の行コメント（「// 種族ID定義」等）も一緒に落とす
        let start = m.index;
        const before = src.slice(0, start);
        const cm = before.match(/(?:^|\n)([ \t]*\/\/[^\n]*\n)$/);
        if (cm) start = before.length - cm[1].length;

        spans.push([start, end, em[1]]);
    }
    if (!spans.length) continue;

    for (const [s, e] of spans.reverse()) src = src.slice(0, s) + src.slice(e);
    src = src.replace(/\n{4,}/g, '\n\n\n');

    if (!DRY) writeFileSync(file, src);
    files++;
    calls += spans.length;
    console.log(`  ${relative(REPO, file)}: ${spans.length} 件除去`);
}

console.log(`\n${DRY ? '[dry-run] ' : ''}${files} ファイルから計 ${calls} 件の DefineEnum 呼び出しを除去した`);
