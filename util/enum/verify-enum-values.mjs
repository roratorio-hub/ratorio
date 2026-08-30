/**
 * enum 定数の値が壊れていないかを検証する。
 *
 * engine/const/EnumXxx.js が値の一次情報。**既存の定数値を変えると
 * セーブデータとアイテムデータの解釈が壊れる**ため、git のベース断面と突き合わせて
 * 「既存の列挙定数の値が動いていないこと」を保証する。
 *
 * 列挙定数の値は「その位置に何番目として並んでいるか」を表すので、
 * 途中に定数を挿入すると後続の値が全てずれる。これが最も危険な事故で、
 * ベースとの比較はまさにそれを検出する。
 *
 * 疑似定数（COUNT / ANY 等）は列挙の長さに追従して増えるのが正常なため、
 * 値が変わっても失敗させず報告にとどめる。
 *
 * 検証する内容:
 *   1. 種別の整合   createEnum の引数と区切りコメントの分類が一致しているか
 *   2. 値の不変性   ベースに居る列挙定数の値が変わっていない・消えていないか
 *   3. 追加の報告   新しく増えた定数と、疑似定数の変化を一覧する
 *
 * 実行: node util/enum/verify-enum-values.mjs [--base <ref>]
 *   --base 省略時は dev（解決できなければ HEAD）と比較する。
 *
 * 終了コード: 問題なしで 0、要修正の差異があれば 1（CI gate に利用可）
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONST_REL = 'engine/const';
const CONST_DIR = join(REPO, CONST_REL);

// ---- git ヘルパ ----

function git(args) {
    return execFileSync('git', ['-C', REPO, ...args], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
}

/** ベースに存在しないファイルは null（= 新規ファイル）。 */
function gitShow(ref, relPath) {
    try {
        return execFileSync('git', ['-C', REPO, 'show', `${ref}:${relPath}`], {
            encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'],
        });
    } catch {
        return null;
    }
}

function resolves(ref) {
    try { git(['rev-parse', '--verify', '--quiet', ref]); return true; } catch { return false; }
}

// ---- パーサ ----

const RE_CONST = /^export const\s+([A-Za-z_$][\w$]*)\s*=\s*(-?\d+n?)\s*;/;
const RE_SECTION_MEMBER = /^\/\/ ---- 列挙定数 ----/;
const RE_SECTION_PSEUDO = /^\/\/ ---- 疑似定数/;
// コンテナはショートハンドのオブジェクト2つを取る（入れ子の波括弧は現れない）
const RE_CONTAINER = /createEnum\(\s*'[^']*'\s*,\s*\{([^}]*)\}\s*,\s*\{([^}]*)\}\s*\)/;

/** ショートハンドのオブジェクト本体から識別子だけ取り出す（コメントは除去する）。 */
function shorthandNames(body) {
    return body
        .replace(/\/\*[\s\S]*?\*\//g, ' ')
        .replace(/\/\/[^\n]*/g, ' ')
        .split(',')
        .map((s) => s.trim())
        .filter((s) => /^[A-Za-z_$][\w$]*$/.test(s));
}

/**
 * const/EnumXxx.js を読み、列挙定数と疑似定数に分類する。
 * 区切りコメントが現れるまでは列挙定数として扱う。
 */
function parseEnumFile(src) {
    const members = new Map();
    const pseudo = new Map();
    let section = members;

    for (const line of src.split('\n')) {
        if (RE_SECTION_MEMBER.test(line)) { section = members; continue; }
        if (RE_SECTION_PSEUDO.test(line)) { section = pseudo; continue; }
        const m = RE_CONST.exec(line);
        if (m) section.set(m[1], m[2]);
    }

    const c = RE_CONTAINER.exec(src);
    return {
        members,
        pseudo,
        container: c ? { members: shorthandNames(c[1]), pseudo: shorthandNames(c[2]) } : null,
        // createEnum を呼んでいるのに引数を読み取れない = 想定外の書き方。
        // 無言でスキップすると検証1が効かなくなるので、呼び出し側で落とす。
        containerUnparsed: !c && /createEnum\s*\(/.test(src),
    };
}

// ---- ベース断面の決定 ----

const baseArg = process.argv.indexOf('--base');
let base = baseArg >= 0 ? process.argv[baseArg + 1] : null;
if (!base) base = resolves('dev') ? 'dev' : 'HEAD';
if (!resolves(base)) {
    console.error(`✗ ベース '${base}' を解決できない。--base <ref> で指定すること。`);
    process.exit(1);
}

// ---- 収集 ----

const files = readdirSync(CONST_DIR).filter((f) => f.endsWith('.js') && f !== 'createEnum.js').sort();

const fail = { sectionMismatch: [], changed: [], removed: [], kindChanged: [] };
const info = { added: [], pseudoChanged: [], pseudoAdded: [], pseudoRemoved: [], newFiles: [] };
let nMembers = 0;
let nPseudo = 0;

for (const f of files) {
    const rel = `${CONST_REL}/${f}`;
    const cur = parseEnumFile(readFileSync(join(CONST_DIR, f), 'utf8'));
    nMembers += cur.members.size;
    nPseudo += cur.pseudo.size;

    // --- 検証1: 種別の整合 ---
    // createEnum の引数と区切りコメントの分類がずれると Count や For の対象が狂う。
    if (cur.containerUnparsed) {
        fail.sectionMismatch.push(
            `${f}: createEnum を呼んでいるが引数を読み取れない（ショートハンドの` +
            ` オブジェクト2つを渡す形式に揃えること）`);
    }
    if (cur.container) {
        // 順序も比較する。For の idx と GetDefinedName の先勝ちが並び順に依存するため。
        const sameOrder = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);
        const memberNames = [...cur.members.keys()];
        const pseudoNames = [...cur.pseudo.keys()];
        if (!sameOrder(cur.container.members, memberNames)) {
            fail.sectionMismatch.push(
                `${f}: createEnum の列挙定数が「列挙定数」セクションと一致しない\n` +
                `      createEnum: ${cur.container.members.join(', ') || '(なし)'}\n` +
                `      セクション: ${memberNames.join(', ') || '(なし)'}`);
        }
        if (!sameOrder(cur.container.pseudo, pseudoNames)) {
            fail.sectionMismatch.push(
                `${f}: createEnum の疑似定数が「疑似定数」セクションと一致しない\n` +
                `      createEnum: ${cur.container.pseudo.join(', ') || '(なし)'}\n` +
                `      セクション: ${pseudoNames.join(', ') || '(なし)'}`);
        }
    }

    // --- ベースとの比較 ---
    const baseSrc = gitShow(base, rel);
    if (baseSrc === null) { info.newFiles.push(f); continue; }
    const old = parseEnumFile(baseSrc);

    // 検証2: ベースに居た列挙定数は値も種別も変わってはならない
    for (const [name, value] of old.members) {
        if (cur.members.has(name)) {
            const now = cur.members.get(name);
            if (now !== value) fail.changed.push(`${f}: ${name}  ${value} → ${now}`);
        } else if (cur.pseudo.has(name)) {
            fail.kindChanged.push(`${f}: ${name} が列挙定数から疑似定数へ移動した（Count が変わる）`);
        } else {
            fail.removed.push(`${f}: ${name}（値 ${value}）が消えた`);
        }
    }

    // 検証3: 追加と疑似定数の変化は報告のみ
    for (const [name, value] of cur.members) {
        if (!old.members.has(name) && !old.pseudo.has(name)) info.added.push(`${f}: ${name} = ${value}`);
    }
    for (const [name, value] of old.pseudo) {
        if (!cur.pseudo.has(name) && !cur.members.has(name)) {
            info.pseudoRemoved.push(`${f}: ${name}（値 ${value}）`);
        } else if (cur.pseudo.has(name) && cur.pseudo.get(name) !== value) {
            info.pseudoChanged.push(`${f}: ${name}  ${value} → ${cur.pseudo.get(name)}`);
        }
    }
    for (const name of cur.pseudo.keys()) {
        if (!old.pseudo.has(name) && !old.members.has(name)) info.pseudoAdded.push(`${f}: ${name} = ${cur.pseudo.get(name)}`);
    }
}

// ---- 報告 ----

console.log(`ベース: ${base}`);
console.log(`対象  : ${files.length} ファイル / 列挙定数 ${nMembers} 件・疑似定数 ${nPseudo} 件`);

function report(label, list, limit = 40) {
    if (!list.length) return;
    console.log(`\n${label} ${list.length} 件:`);
    for (const x of list.slice(0, limit)) console.log(`    ${x}`);
    if (list.length > limit) console.log(`    ... 他 ${list.length - limit} 件`);
}

let ng = false;
for (const [label, list] of [
    ['✗ 値が変わった列挙定数（セーブデータ破壊の恐れ・要修正）', fail.changed],
    ['✗ 消えた列挙定数（セーブデータ破壊の恐れ・要修正）', fail.removed],
    ['✗ 種別が変わった定数（要修正）', fail.kindChanged],
    ['✗ createEnum の引数と区切りコメントの不一致（要修正）', fail.sectionMismatch],
]) {
    if (list.length) { ng = true; report(label, list); }
}

report('△ 追加された列挙定数（末尾追加かを確認すること）', info.added);
report('△ 値が変わった疑似定数（列挙の伸長に伴うものなら正常）', info.pseudoChanged);
report('△ 追加された疑似定数', info.pseudoAdded);
report('△ 消えた疑似定数', info.pseudoRemoved);
report('△ ベースに無い新規ファイル', info.newFiles);

if (ng) {
    console.error('\n✗ 要修正の差異がある。');
    process.exit(1);
}
console.log('\n✓ 既存の列挙定数の値は変わっていない。');
