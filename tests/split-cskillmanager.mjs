#!/usr/bin/env node
/**
 * CSkillManager.js の Init（1,396 スキル定義ブロック）を
 * defineSkill(SKILL_ID_XXX, function(){ ...本文... }) 形式へ機械変換し、
 * roro/m/js/skill/ 配下のグループファイルへ分割する。
 *
 * 本文（body）は1バイトも変更しない。書き換えるのはラッパー行だけ:
 *   skillData = new function() {          → defineSkill(SKILL_ID_XXX, function() {
 *   this.prototype = new CSkillData();    → （削除）
 *   CSkillData.call(this);                → （削除）
 *   this.id = skillId;                    → （削除）
 *   };                                     → }),
 *   this.dataArray[skillId] = skillData;  → （削除）
 *   skillId++;                             → （削除）
 * 上記以外の行（banner・本文・ブロック間の空行）は一切変更しない。
 *
 * 計画: /home/vscode/.claude/plans/remining-work-md-cskillmanager-js-cskill-magical-elephant.md
 *
 * 使い方:
 *   node split-cskillmanager.mjs --parse-only [--source <file>]
 *       事前条件の検証だけ（書き込みなし）。
 *   node split-cskillmanager.mjs --suggest-groups
 *       skill.dat.js の SkillObjNew からグループ境界案を出力する（参考用）。
 *   node split-cskillmanager.mjs --emit-inline [--source <file>] [--out <file>]
 *       Commit 2: 単一ファイルのまま defineSkill 化した CSkillManager.js を書き出す。
 *   node split-cskillmanager.mjs --emit-split [--source <file>]
 *       Commit 3: roro/m/js/skill/NN-*.js 43 本 + 縮小した CSkillManager.js を書き出す。
 *   node split-cskillmanager.mjs --check <original.js> [<current-tree-root>]
 *       <original.js>（変換前のスナップショット）と現在のツリーの本文をバイト比較する。
 *       分割後（--emit-split 後）は roro/m/js/skill/*.js を読み、
 *       分割前（--emit-inline 後）は roro/m/js/CSkillManager.js を読む。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter } from 'eslint';
import assert from 'node:assert/strict';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // tests/.. = ratorio/
const JS_DIR = join(ROOT, 'engine');
const SKILL_DIR = join(JS_DIR, 'skill');
const DEFAULT_SOURCE = join(JS_DIR, 'CSkillManager.js');
const SKILL_DAT = join(JS_DIR, 'skill.dat.js');

// ─── CLI ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const mode = args.find((a) => a.startsWith('--') && a !== '--source' && a !== '--out') ?? null;
function flagValue(name) {
    const i = args.indexOf(name);
    return i >= 0 ? args[i + 1] : undefined;
}

// ─── §D グループ境界表（マーカー名をキーにして凍結） ──────────────────────────
//
// SkillObjNew（skill.dat.js）第4列（SM_BASH 等の公式スキルコード）のプレフィックスを
// 前方補完 → 連続ラン抽出 → 40件を超えない範囲で貪欲パック、の機械的手順に
// 3箇所だけ手調整（SR|WM の分割・SO の分割・GN/EVT テールの併合）を加えて確定した。
// --suggest-groups で再現できる（本表はその出力を凍結したもの）。
const SKILL_GROUPS = [
    ['01-novice-swordman-thief-acolyte', 0, 37],
    ['02-archer-mage-merchant', 38, 68],
    ['03-knight-assassin-priest', 69, 104],
    ['04-hunter-wizard', 105, 134],
    ['05-blacksmith-crusader', 135, 166],
    ['06-rogue-monk-bard', 167, 205],
    ['07-dancer-bard-sage', 206, 240],
    ['08-alchemist-transcend-hi', 241, 277],
    ['09-transcend-extra', 278, 306],
    ['10-transcend-taekwon', 307, 346],
    ['11-star-gladiator-soul-linker', 347, 384],
    ['12-soul-linker-ninja', 385, 416],
    ['13-gunslinger', 417, 438],
    ['14-rune-knight-guillotine-cross', 439, 475],
    ['15-arch-bishop', 476, 494],
    ['16-ranger', 495, 516],
    ['17-warlock', 517, 539],
    ['18-mechanic', 540, 568],
    ['19-royal-guard-shadow-chaser', 569, 608],
    ['20-sura', 609, 630],
    ['21-minstrel-wanderer', 631, 657],
    ['22-sorcerer', 658, 683],
    ['23-elemental-spirit', 684, 719],
    ['24-genetic', 720, 756],
    ['25-kagerou-oboro', 757, 796],
    ['26-third-class-extra', 797, 821],
    ['27-rebellion', 822, 858],
    ['28-legacy-class-extra', 859, 901],
    ['29-doram-summoner', 902, 943],
    ['30-star-emperor', 944, 966],
    ['31-soul-reaper', 967, 1001],
    ['32-dragon-knight-shadow-cross-cardinal', 1002, 1039],
    ['33-wind-hawk-arch-mage', 1040, 1071],
    ['34-meister-imperial-guard-abyss-chaser', 1072, 1109],
    ['35-inquisitor-troubadour', 1110, 1141],
    ['36-elemental-master-biolo', 1142, 1172],
    ['37-sky-emperor-soul-ascetic', 1173, 1212],
    ['38-night-watch-spirit-handler', 1213, 1252],
    ['39-shinkiro-shiranui', 1253, 1291],
    ['40-fourth-class-extra', 1292, 1318],
    ['41-dr', 1319, 1343],
    ['42-kr', 1344, 1365],
    ['43-at', 1366, 1395],
];

// ─── パース ─────────────────────────────────────────────────────────────────

const BLOCK_START = '\t\tskillData = new function() {';
const PROTO_LINE = '\t\t\tthis.prototype = new CSkillData();';
const CALL_LINE = '\t\t\tCSkillData.call(this);';
const ID_LINE = '\t\t\tthis.id = skillId;';
const CLOSER_LINE = '\t\t};';
const DATAARRAY_RE = /^\t\tthis\.dataArray\[skillId\] = skillData;$/;
const SKILLID_INC_RE = /^\t\tskillId\+\+;\s*$/;
const MARKER_RE = /^\t\t\/\/ (SKILL_ID_[A-Za-z0-9_]+)\s*$/;

function fail(msg) {
    console.error(`✗ ${msg}`);
    process.exit(1);
}

/**
 * CSkillManager.js のソース行を解析する。
 * 事前条件 P1–P12 を満たさない場合は即 process.exit(1) する（黙ってスキップしない）。
 * @param {string[]} lines
 * @returns {{ initOpenIdx: number, initCloseIdx: number, blocks: Array<{
 *   marker: string, blockStart: number, closer: number, protoIdx: number, callIdx: number,
 *   idIdx: number, dataArrayIdx: number, incIdx: number, bannerStart: number,
 * }> }}
 */
function parseInit(lines) {
    const initOpenIdx = lines.indexOf('\tthis.Init = function() {');
    if (initOpenIdx < 0) fail('this.Init = function() { が見つかりません');

    const starts = [];
    for (let i = initOpenIdx + 1; i < lines.length; i++) {
        if (lines[i] === BLOCK_START) starts.push(i);
        // Init の閉じ括弧（\t}）はブロック探索の外側で別途特定する
    }

    // P1: ブロック数がちょうど 1396
    if (starts.length !== 1396) {
        fail(`ブロック数が 1396 ではありません: ${starts.length}`);
    }

    const blocks = [];
    for (let bi = 0; bi < starts.length; bi++) {
        const blockStart = starts[bi];

        // P2: 直前が // SKILL_ID_XXX マーカー
        const markerLine = lines[blockStart - 1];
        const mm = MARKER_RE.exec(markerLine);
        if (!mm) fail(`L${blockStart + 1}: 直前に SKILL_ID マーカーがありません: ${JSON.stringify(markerLine)}`);
        const marker = mm[1];

        // P3–P4: 直後2行
        if (lines[blockStart + 1] !== PROTO_LINE) {
            fail(`L${blockStart + 2}: prototype 行が想定外: ${JSON.stringify(lines[blockStart + 1])}`);
        }
        if (lines[blockStart + 2] !== CALL_LINE) {
            fail(`L${blockStart + 3}: CSkillData.call 行が想定外: ${JSON.stringify(lines[blockStart + 2])}`);
        }

        // ブロック終端をブレース深さで特定する（P6–P7 を包含。空行混入があっても頑健）
        let depth = 0;
        let j = blockStart;
        for (; j < lines.length; j++) {
            for (const ch of lines[j]) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth === 0 && j > blockStart) break;
        }
        if (j >= lines.length || lines[j] !== CLOSER_LINE) {
            fail(`ブロック開始 L${blockStart + 1}: 終端 '};' が想定外です（L${j + 1}: ${JSON.stringify(lines[j])}）`);
        }
        const closer = j;

        // P5: this.id = skillId; がブロック内（callIdx より後・closer より前）にちょうど1個
        let idIdx = -1;
        for (let k = blockStart + 3; k < closer; k++) {
            if (lines[k] === ID_LINE) {
                if (idIdx !== -1) fail(`L${blockStart + 1}: this.id = skillId; が2個以上あります`);
                idIdx = k;
            }
        }
        if (idIdx === -1) fail(`L${blockStart + 1}: this.id = skillId; が見つかりません`);

        // P6/P8: dataArray 代入行・skillId++ 行（closer の直後、空行を許容してスキャン）
        let k = closer + 1;
        while (k < lines.length && lines[k].trim() === '') k++;
        if (!DATAARRAY_RE.test(lines[k])) {
            fail(`L${closer + 1} の後: dataArray 代入行が想定外: L${k + 1}: ${JSON.stringify(lines[k])}`);
        }
        const dataArrayIdx = k;
        const incIdx = dataArrayIdx + 1;
        if (!SKILLID_INC_RE.test(lines[incIdx])) {
            fail(`L${incIdx + 1}: skillId++ が想定外: ${JSON.stringify(lines[incIdx])}`);
        }

        // P12: バナー検出。通常は `//` 行の連続（1264件）または `/** */` 一行（108件）だが、
        // 1箇所（SKILL_ID_HASTY_FIRE_IN_THE_HOLE）だけ複数行の `/* ... */` ブロックコメントが
        // 割り込む形がある（remaining-work.md が警告する「バナー書式のバリエーション漏れ」の実例）。
        // ブロックコメント区間はコメント内容として扱い、境界チェックの対象外にする。
        let bannerStart = blockStart - 1; // マーカー行から遡る
        let n = 1;
        let inBlockComment = false;
        while (bannerStart - 1 >= 0) {
            const cand = lines[bannerStart - 1];
            if (inBlockComment) {
                bannerStart--;
                n++;
                if (/^\t\t\/\*/.test(cand)) inBlockComment = false; // ブロックコメント開始行に到達
                continue;
            }
            if (cand.trim() === '') break;
            if (cand.trim() === '*/') { inBlockComment = true; bannerStart--; n++; continue; } // ブロックコメント終端行
            if (!/^\t\t(\/\/|\/\*\*)/.test(cand)) break;
            bannerStart--;
            n++;
        }
        if (inBlockComment) fail(`L${blockStart + 1}: バナー中のブロックコメントが閉じていません`);
        if (n < 1 || n > 15) {
            fail(`L${blockStart + 1}: バナー行数が想定範囲外（${n}行）`);
        }

        blocks.push({ marker, blockStart, closer, idIdx, dataArrayIdx, incIdx, bannerStart });
    }

    // P9: マーカー名が一意、かつ出現順 k のマーカー定数値が k と一致
    const skillDat = readFileSync(SKILL_DAT, 'utf8');
    const constVal = new Map();
    for (const m of skillDat.matchAll(/^export const (SKILL_ID_\w+)\s*=\s*(-?\d+);/gm)) {
        constVal.set(m[1], Number(m[2]));
    }
    const seen = new Set();
    blocks.forEach((b, k) => {
        if (seen.has(b.marker)) fail(`マーカー名が重複しています: ${b.marker}`);
        seen.add(b.marker);
        if (!constVal.has(b.marker)) fail(`skill.dat.js に ${b.marker} の定数がありません`);
        if (constVal.get(b.marker) !== k) {
            fail(`index ${k}: マーカー ${b.marker} の定数値が ${constVal.get(b.marker)}（期待値 ${k}）`);
        }
    });

    // P10: ブロック間（前のブロックの skillId++ の次行 〜 次のブロックの banner 開始行）に
    // 空行以外のコードが無いこと
    for (let bi = 1; bi < blocks.length; bi++) {
        const prevEnd = blocks[bi - 1].incIdx;
        const nextBannerStart = blocks[bi].bannerStart;
        for (let k = prevEnd + 1; k < nextBannerStart; k++) {
            if (lines[k].trim() !== '') fail(`L${k + 1}: ブロック間に想定外のコードがあります: ${JSON.stringify(lines[k])}`);
        }
    }

    // P11: 本文（callIdx+1 〜 idIdx を除く closer 手前）に skillId/skillData/dataArray/idx/prototype が出現しない
    for (const b of blocks) {
        for (let k = b.blockStart + 3; k < b.closer; k++) {
            if (k === b.idIdx) continue;
            const l = lines[k];
            if (/\b(skillId|skillData|dataArray)\b/.test(l)) {
                fail(`L${k + 1}: 本文がブロック間状態を参照しています（${b.marker}）: ${JSON.stringify(l)}`);
            }
        }
    }

    // Init の閉じ括弧 '\t}' を最後のブロックの後ろから探す
    let initCloseIdx = -1;
    for (let k = blocks[blocks.length - 1].incIdx + 1; k < lines.length; k++) {
        if (lines[k] === '\t}') { initCloseIdx = k; break; }
        if (lines[k].trim() !== '') fail(`L${k + 1}: Init 終端直前に想定外のコード: ${JSON.stringify(lines[k])}`);
    }
    if (initCloseIdx < 0) fail('Init の閉じ括弧が見つかりません');

    return { initOpenIdx, initCloseIdx, blocks };
}

// ─── 変換 ───────────────────────────────────────────────────────────────────

/**
 * 1ブロック分のスライス（banner 開始行 〜 次ブロックの banner 開始行の直前 = 末尾の空行群を含む）
 * を、ラッパー5行だけ書き換えた形で返す。本文・banner・空行は一切変更しない。
 */
function transformBlockSlice(lines, block, regionEnd) {
    const out = [];
    for (let i = block.bannerStart; i < regionEnd; i++) {
        if (i === block.blockStart) {
            out.push(`\t\tdefineSkill(${block.marker}, function() {`);
        } else if (i === block.blockStart + 1 || i === block.blockStart + 2 || i === block.idIdx) {
            continue; // prototype行 / CSkillData.call行 / this.id=skillId行 を削除
        } else if (i === block.closer) {
            out.push('\t\t}),');
        } else if (i === block.dataArrayIdx || i === block.incIdx) {
            continue; // dataArray代入・skillId++ を削除
        } else {
            out.push(lines[i]);
        }
    }
    return out;
}

function transformAllBlocks(lines, blocks, initCloseIdx) {
    const regionEnds = blocks.map((b, i) => (i + 1 < blocks.length ? blocks[i + 1].bannerStart : initCloseIdx));
    return blocks.map((b, i) => ({
        marker: b.marker,
        lines: transformBlockSlice(lines, b, regionEnds[i]),
    }));
}

// ─── free-var 抽出・import 生成（§E。find-free-vars.mjs / build-imports.mjs のロジックを埋め込み） ──

function findFreeVars(code) {
    const linter = new Linter();
    const messages = linter.verify(code, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: {} },
        rules: { 'no-undef': 'error' },
    });
    const names = new Set();
    for (const m of messages) {
        const match = /'(.+?)' is not defined/.exec(m.message);
        if (match) names.add(match[1]);
    }
    return [...names].sort();
}

function collectImportSpecs(code) {
    const specMap = new Map();
    const linter = new Linter();
    linter.verify(code, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
        plugins: {
            collect: {
                rules: {
                    collect: {
                        create() {
                            return {
                                ImportDeclaration(node) {
                                    const source = node.source.value;
                                    for (const spec of node.specifiers) {
                                        if (spec.type === 'ImportSpecifier') {
                                            specMap.set(spec.local.name, { source, imported: spec.imported.name });
                                        } else if (spec.type === 'ImportDefaultSpecifier') {
                                            specMap.set(spec.local.name, { source, imported: 'default' });
                                        } else if (spec.type === 'ImportNamespaceSpecifier') {
                                            specMap.set(spec.local.name, { source, imported: '*' });
                                        }
                                    }
                                },
                            };
                        },
                    },
                },
            },
        },
        rules: { 'collect/collect': 'error' },
    });
    return specMap;
}

/** 元ファイル（roro/m/js/CSkillManager.js）基準の import ソースを roro/m/js/skill/ 基準へリベースする */
function rebaseFromJsDirToSkillDir(src) {
    if (src.startsWith('.')) {
        const abs = resolve(JS_DIR, src);
        let rel = relative(SKILL_DIR, abs);
        if (!rel.startsWith('.')) rel = './' + rel;
        return rel.split(sep).join('/');
    }
    return src; // 念のため（絶対パス相当は現状無い）
}

function formatImportBlock(bySource) {
    const lines = [];
    const sources = [...bySource.keys()].sort();
    for (const src of sources) {
        const names = [...new Set(bySource.get(src))].sort();
        const oneLiner = `import { ${names.join(', ')} } from '${src}';`;
        if (oneLiner.length < 100) {
            lines.push(oneLiner);
        } else {
            lines.push('import {');
            let line = '    ';
            for (const n of names) {
                if ((line + n + ', ').length > 118) { lines.push(line.replace(/, $/, ',')); line = '    '; }
                line += n + ', ';
            }
            if (line.trim()) lines.push(line.replace(/, $/, ''));
            lines.push(`} from '${src}';`);
        }
    }
    return lines;
}

/**
 * グループ本文（1グループ分の defineSkill(...) 配列要素の連結テキスト）から
 * 自由変数を洗い出し、CSkillManager.js の元 import ブロックを基準に import 文を組み立てる。
 * UsedSkillSearch / LearnedSkillSearch / CSkillData / defineSkill は元ファイルには
 * 存在しなかった依存（新設モジュール由来）なので特別扱いする。
 */
function buildGroupImports(bodyText, origImportSpecMap) {
    const wrapped = `export const skills = [\n${bodyText}\n];\n`;
    const free = findFreeVars(wrapped).filter((n) => n !== 'defineSkill');
    // defineSkill と SKILL_ID_* は個別に付与するので free からは除いて考える
    const skillIdConsts = free.filter((n) => /^SKILL_ID_/.test(n));
    const others = free.filter((n) => !/^SKILL_ID_/.test(n));

    const bySource = new Map();
    const notFound = [];
    const SPECIAL = {
        UsedSkillSearch: { source: '../skill-search-bridge.js', imported: 'UsedSkillSearch' },
        LearnedSkillSearch: { source: '../skill-search-bridge.js', imported: 'LearnedSkillSearch' },
        CSkillData: { source: '../CSkillData.js', imported: 'CSkillData' },
    };
    const addImport = (name, source, imported) => {
        if (!bySource.has(source)) bySource.set(source, []);
        bySource.get(source).push(imported === name ? name : `${imported} as ${name}`);
    };

    addImport('defineSkill', '../CSkillData.js', 'defineSkill');
    for (const name of skillIdConsts) addImport(name, '../skill.dat.js', name);

    for (const name of others) {
        if (SPECIAL[name]) { addImport(name, SPECIAL[name].source, SPECIAL[name].imported); continue; }
        const info = origImportSpecMap.get(name);
        if (!info) { notFound.push(name); continue; }
        addImport(name, rebaseFromJsDirToSkillDir(info.source), info.imported);
    }

    return { importLines: formatImportBlock(bySource), notFound };
}

// ─── メイン処理 ─────────────────────────────────────────────────────────────

function loadSource(path) {
    return readFileSync(path, 'utf8').split('\n');
}

function runParseOnly(sourcePath) {
    const lines = loadSource(sourcePath);
    const { blocks } = parseInit(lines);
    console.log(`✓ 事前条件クリア: ブロック数 ${blocks.length} / 全マーカー検証済み`);
}

function suggestGroups() {
    const skillDat = readFileSync(SKILL_DAT, 'utf8');
    const start = skillDat.indexOf('export const SkillObjNew');
    const rows = [...skillDat.slice(start).matchAll(/^\s*\[(\d+)\s*,\s*(\d+)\s*,\s*"([^"]*)"(?:\s*,\s*"([^"]*)")?/gm)]
        .map((m) => ({ id: Number(m[1]), code: m[4] || null }));
    let last = null;
    const prefix = rows.map((r) => { const p = r.code ? r.code.split('_')[0] : last; last = p; return p; });
    const runs = [];
    let s = 0;
    for (let i = 1; i <= prefix.length; i++) {
        if (i === prefix.length || prefix[i] !== prefix[i - 1]) { runs.push({ prefix: prefix[s], start: s, end: i - 1, len: i - s }); s = i; }
    }
    const groups = [];
    let cur = [];
    let curLen = 0;
    for (const r of runs) {
        if (curLen > 0 && curLen + r.len > 40) { groups.push(cur); cur = []; curLen = 0; }
        cur.push(r);
        curLen += r.len;
    }
    if (cur.length) groups.push(cur);
    console.log(`groups (機械生成・手調整前): ${groups.length}`);
    for (const g of groups) {
        console.log(`  ${g[0].start}-${g[g.length - 1].end} (${g[g.length - 1].end - g[0].start + 1}) prefixes=${g.map((x) => x.prefix).join(',')}`);
    }
    console.log('\n※ SKILL_GROUPS（凍結済み）との差分は手調整3箇所（SR|WM分割・SO分割・GN/EVTテール併合）のみ。');
}

function assembleInline(lines, blocks, initOpenIdx, initCloseIdx) {
    const transformed = transformAllBlocks(lines, blocks, initCloseIdx);
    const out = [];
    out.push(...lines.slice(0, initOpenIdx + 1)); // ... this.Init = function() { まで
    out.push('\t\tconst ALL_SKILLS = [');
    for (const t of transformed) out.push(...t.lines);
    out.push('\t\t];');
    out.push('');
    out.push('\t\t// 旧 util/skill/verify_skill_ids.py（採番とマーカーの照合）を実行時不変条件に置き換えたもの。');
    out.push('\t\t// 明示IDになったので「採番のズレ」は起きないが、ID重複・欠番は起こりうる。');
    out.push('\t\tfor (const skillData of ALL_SKILLS) {');
    out.push('\t\t\tif (this.dataArray[skillData.id] !== undefined) {');
    out.push('\t\t\t\tthrow new Error(`スキルIDが重複しています: ${skillData.id} (${skillData.name})`);');
    out.push('\t\t\t}');
    out.push('\t\t\tthis.dataArray[skillData.id] = skillData;');
    out.push('\t\t}');
    out.push('\t\tfor (let idx = 0; idx < ALL_SKILLS.length; idx++) {');
    out.push('\t\t\tif (this.dataArray[idx] === undefined) throw new Error(`スキルIDに欠番があります: ${idx}`);');
    out.push('\t\t}');
    out.push(...lines.slice(initCloseIdx)); // \t} 以降そのまま
    return out.join('\n');
}

function runEmitInline(sourcePath, outPath) {
    const lines = loadSource(sourcePath);
    const { initOpenIdx, initCloseIdx, blocks } = parseInit(lines);
    const text = assembleInline(lines, blocks, initOpenIdx, initCloseIdx);
    // CSkillData/defineSkill の import を確実にする（Commit 1 で ./CSkillData.js が既にあること前提）
    writeFileSync(outPath, text);
    console.log(`✓ inline 版を書き出しました: ${outPath}`);
    console.log('  ※ import 行の defineSkill 追加は手動 or 別ステップで確認すること（gen_imports.py --apply --force 推奨）');
}

const INLINE_BLOCK_START_RE = /^\t\tdefineSkill\((SKILL_ID_[A-Za-z0-9_]+), function\(\) \{$/;

/**
 * --emit-inline が生成した「defineSkill(...) 済み」のソースを解析する（--emit-split 用）。
 * parseInit と異なり、ラッパー変換は不要（既に済んでいる）。banner開始行〜次ブロックの
 * banner開始行の直前（＝末尾の空行群を含む）をそのままグループファイルへの移動対象とする。
 */
function parseInlineBlocks(lines) {
    const allSkillsIdx = lines.findIndex((l) => l === '\t\tconst ALL_SKILLS = [');
    if (allSkillsIdx < 0) fail('const ALL_SKILLS = [ が見つかりません（--emit-inline を先に実行すること）');

    const starts = [];
    for (let i = allSkillsIdx + 1; i < lines.length; i++) {
        if (INLINE_BLOCK_START_RE.test(lines[i])) starts.push(i);
        if (lines[i] === '\t\t];') break; // ALL_SKILLS 配列の終端
    }
    if (starts.length !== 1396) fail(`defineSkill(...) ブロック数が 1396 ではありません: ${starts.length}`);

    const blocks = [];
    for (const blockStart of starts) {
        const m = INLINE_BLOCK_START_RE.exec(lines[blockStart]);
        const marker = m[1];

        // 閉じ '}),' をブレース深さで特定する（skillData = new function() 版の parseInit と同じ手法）
        let depth = 1; // defineSkill(...) の行自体が持つ function() { の '{' から開始
        let j = blockStart + 1;
        for (; j < lines.length; j++) {
            for (const ch of lines[j]) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth === 0) break;
        }
        if (j >= lines.length || lines[j] !== '\t\t}),') {
            fail(`ブロック開始 L${blockStart + 1}: 終端 '}),' が想定外です（L${j + 1}: ${JSON.stringify(lines[j])}）`);
        }
        const closer = j;

        // banner 開始行（parseInit の P12 と同じ block-comment 対応ロジック）
        let bannerStart = blockStart - 1;
        let inBlockComment = false;
        while (bannerStart - 1 >= 0) {
            const cand = lines[bannerStart - 1];
            if (inBlockComment) {
                bannerStart--;
                if (/^\t\t\/\*/.test(cand)) inBlockComment = false;
                continue;
            }
            if (cand.trim() === '') break;
            if (cand.trim() === '*/') { inBlockComment = true; bannerStart--; continue; }
            if (!/^\t\t(\/\/|\/\*\*)/.test(cand)) break;
            bannerStart--;
        }

        blocks.push({ marker, bannerStart, blockStart, closer });
    }

    return blocks;
}

function runEmitSplit(sourcePath) {
    const lines = loadSource(sourcePath);
    const blocks = parseInlineBlocks(lines);
    const regionEnds = blocks.map((b, i) => (i + 1 < blocks.length ? blocks[i + 1].bannerStart : lines.findIndex((l, idx) => idx > blocks[blocks.length - 1].closer && l === '\t\t];')));
    const transformed = blocks.map((b, i) => ({ marker: b.marker, lines: lines.slice(b.bannerStart, regionEnds[i]) }));

    // グループ境界の網羅性を検証（1396件を過不足なくカバーしているか）
    const covered = new Array(1396).fill(false);
    for (const [, s, e] of SKILL_GROUPS) for (let i = s; i <= e; i++) covered[i] = true;
    const missing = covered.reduce((acc, v, i) => (v ? acc : [...acc, i]), []);
    if (missing.length) fail(`SKILL_GROUPS に含まれない ID があります: ${missing.slice(0, 10).join(',')}...`);

    const origHeader = readFileSync(sourcePath, 'utf8');
    const origImportSpecMap = collectImportSpecs(origHeader);

    mkdirSync(SKILL_DIR, { recursive: true });

    const notFoundAll = [];
    const groupImportNames = [];
    for (const [slug, s, e] of SKILL_GROUPS) {
        const memberBlocks = transformed.slice(s, e + 1);
        const bodyLines = memberBlocks.flatMap((b) => b.lines);
        const bodyText = bodyLines.join('\n');
        const { importLines, notFound } = buildGroupImports(bodyText, origImportSpecMap);
        if (notFound.length) notFoundAll.push({ slug, notFound });

        const header = [
            '/**',
            ` * スキル定義 ${slug}（SKILL_ID ${s}–${e} / ${e - s + 1} 件）`,
            ' *',
            ' * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。',
            ' * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。',
            ' */',
        ];
        const content = [...header, ...importLines, '', 'export const skills = [', ...bodyLines, '];', ''].join('\n');
        writeFileSync(join(SKILL_DIR, `${slug}.js`), content);
        groupImportNames.push(slug.replace(/[^a-zA-Z0-9]/g, '_'));
    }

    if (notFoundAll.length) {
        for (const { slug, notFound } of notFoundAll) console.error(`NOT FOUND in ${slug}: ${notFound.join(', ')}`);
        fail('import 解決できない自由変数があります（上記参照）。手動で追加してから再実行すること。');
    }

    // CSkillManager.js シェルを書く（31アクセサ部分は元ファイルから丸ごと引き継ぐ）
    const initFnIdx = lines.indexOf('\tthis.Init = function() {');
    const importVarNames = SKILL_GROUPS.map(([slug]) => `skills_${slug.replace(/[^a-zA-Z0-9]/g, '_')}`);
    const importLines = SKILL_GROUPS.map(([slug], i) => `import { skills as ${importVarNames[i]} } from './skill/${slug}.js';`);

    const shellLines = [];
    // ⚠ CSkillData/defineSkill/43グループの import は必ず AUTO-GENERATED ブロック（cycle の
    // 引き金になる ./data/mig.itemsp.h.js を含む）より前に置くこと。ES モジュールは import 文の
    // 出現順に評価されるため、後ろに置くと global.js 経由の循環の中で new CSkillManager() が
    // 呼ばれた時点でこれらの import がまだ解決しておらず、ALL_SKILLS の組み立てが
    // 壊れる（コミット1で実際に発生した回帰と同型。skillsXX は import 束縛なので今回は
    // 「undefined になる」ではなく TDZ ReferenceError で即座に露見するはずだが、
    // いずれにせよ発生させないために前に置く）。
    shellLines.push("import { CSkillData } from './CSkillData.js';");
    shellLines.push(...importLines);
    shellLines.push('');
    shellLines.push("export { CSkillData } from './CSkillData.js';");
    shellLines.push("export { RegisterUsedSkillSearch, RegisterLearnedSkillSearch } from './skill-search-bridge.js';");
    shellLines.push('');
    shellLines.push('// === AUTO-GENERATED IMPORTS ===');
    shellLines.push("import './common.js';");
    shellLines.push("import './data/mig.itemsp.h.js';");
    shellLines.push("import './item.h.js';");
    shellLines.push('// === END AUTO-GENERATED IMPORTS ===');
    shellLines.push('');
    shellLines.push('/**');
    shellLines.push(' * 各スキルの情報を一元管理するマネージャークラス.');
    shellLines.push(' * メンバメソッドの GetXXX( ) を通じて');
    shellLines.push(' * 各スキルのパラメータを取得できる.');
    shellLines.push(' *');
    shellLines.push(' * ⚠ skill オブジェクトは roro/m/js/skill/ 配下のモジュールレベルシングルトンであり、');
    shellLines.push(' * 複数の CSkillManager インスタンス間で共有される（生成タイミングも new CSkillManager() 時');
    shellLines.push(' * ではなく各グループモジュール評価時）。構築後に書き換えないこと。');
    shellLines.push(' */');
    shellLines.push('export function CSkillManager() {');
    shellLines.push('');
    shellLines.push('\tthis.dataArray = new Array();');
    shellLines.push('');

    // アクセサ群: 元ファイルの `export function CSkillManager() {` 直後（this.dataArray宣言含む）〜 Init 直前 を再利用
    const ctorOpenIdx = lines.indexOf('export function CSkillManager() {');
    // dataArray宣言と空行をスキップして、最初のアクセサ（this.GetBaseSkillId = ...）から Init 直前までをコピー
    let accessorStart = ctorOpenIdx + 1;
    while (lines[accessorStart].trim() === '' || lines[accessorStart].trim() === 'this.dataArray = new Array();') accessorStart++;
    shellLines.push(...lines.slice(accessorStart, initFnIdx));

    const ALL_SKILLS_EXPR = importVarNames.map((v) => `...${v}`).join(', ');
    shellLines.push('\tconst ALL_SKILLS = [' + ALL_SKILLS_EXPR + '];');
    shellLines.push('');
    shellLines.push('\tthis.Init = function() {');
    shellLines.push('\t\t// 旧 util/skill/verify_skill_ids.py（採番とマーカーの照合）を実行時不変条件に置き換えたもの。');
    shellLines.push('\t\t// 明示IDになったので「採番のズレ」は起きないが、ID重複・欠番は起こりうる。');
    shellLines.push('\t\tfor (const skillData of ALL_SKILLS) {');
    shellLines.push('\t\t\tif (this.dataArray[skillData.id] !== undefined) {');
    shellLines.push('\t\t\t\tthrow new Error(`スキルIDが重複しています: ${skillData.id} (${skillData.name})`);');
    shellLines.push('\t\t\t}');
    shellLines.push('\t\t\tthis.dataArray[skillData.id] = skillData;');
    shellLines.push('\t\t}');
    shellLines.push('\t\tfor (let idx = 0; idx < ALL_SKILLS.length; idx++) {');
    shellLines.push('\t\t\tif (this.dataArray[idx] === undefined) throw new Error(`スキルIDに欠番があります: ${idx}`);');
    shellLines.push('\t\t}');
    shellLines.push('\t}');
    shellLines.push('\t// 初期化');
    shellLines.push('\tthis.Init();');
    shellLines.push('');
    shellLines.push('}');
    shellLines.push('');

    writeFileSync(sourcePath, shellLines.join('\n'));
    console.log(`✓ split 版を書き出しました: ${SKILL_DIR}（43ファイル）+ ${sourcePath}`);
}

/** 与えられたテキスト（既に defineSkill 化された内容）から、マーカーごとの本文行配列を再抽出する */
function extractBodiesFromTransformed(text) {
    const lines = text.split('\n');
    const bodies = new Map();
    let i = 0;
    while (i < lines.length) {
        const m = /^\t\tdefineSkill\((SKILL_ID_\w+), function\(\) \{$/.exec(lines[i]);
        if (!m) { i++; continue; }
        const marker = m[1];
        let depth = 0;
        let j = i;
        // defineSkill( ... function() { の '(' と '{' 両方を数える必要はない。
        // 中身の波括弧だけを追うため、この行自身の '{' 1個から開始する。
        depth = 1;
        j = i + 1;
        const body = [];
        while (j < lines.length && depth > 0) {
            for (const ch of lines[j]) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth === 0) break; // '}),' 行（閉じ）は含めない
            body.push(lines[j]);
            j++;
        }
        bodies.set(marker, body);
        i = j + 1;
    }
    return bodies;
}

/** 変換前オリジナルから、マーカーごとの本文行配列を抽出する（--check 用） */
function extractBodiesFromOriginal(lines, blocks) {
    const bodies = new Map();
    for (const b of blocks) {
        const body = [];
        for (let k = b.blockStart + 3; k < b.closer; k++) {
            if (k === b.idIdx) continue;
            body.push(lines[k]);
        }
        bodies.set(b.marker, body);
    }
    return bodies;
}

function runCheck(originalPath, treeRoot) {
    const origLines = loadSource(originalPath);
    const { blocks } = parseInit(origLines);
    const origBodies = extractBodiesFromOriginal(origLines, blocks);

    let currentBodies;
    if (existsSync(SKILL_DIR) && readdirSync(SKILL_DIR).some((f) => f.endsWith('.js'))) {
        const combined = readdirSync(SKILL_DIR).filter((f) => f.endsWith('.js')).sort()
            .map((f) => readFileSync(join(SKILL_DIR, f), 'utf8')).join('\n');
        currentBodies = extractBodiesFromTransformed(combined);
    } else {
        const cur = readFileSync(DEFAULT_SOURCE, 'utf8');
        currentBodies = extractBodiesFromTransformed(cur);
    }

    let mismatches = 0;
    for (const [marker, body] of origBodies) {
        const cur = currentBodies.get(marker);
        if (!cur) { console.error(`✗ ${marker}: 現在のツリーに見つかりません`); mismatches++; continue; }
        try {
            assert.deepStrictEqual(cur, body);
        } catch {
            console.error(`✗ ${marker}: 本文が一致しません`);
            mismatches++;
        }
    }
    if (mismatches) fail(`${mismatches} 件の本文不一致があります`);
    console.log(`✓ 全 ${origBodies.size} 件のスキル本文がバイト単位で一致しました`);
}

// ─── dispatch ───────────────────────────────────────────────────────────────

if (mode === '--parse-only') {
    runParseOnly(flagValue('--source') ?? DEFAULT_SOURCE);
} else if (mode === '--suggest-groups') {
    suggestGroups();
} else if (mode === '--emit-inline') {
    runEmitInline(flagValue('--source') ?? DEFAULT_SOURCE, flagValue('--out') ?? DEFAULT_SOURCE);
} else if (mode === '--emit-split') {
    runEmitSplit(flagValue('--source') ?? DEFAULT_SOURCE);
} else if (mode === '--check') {
    const originalPath = args[args.indexOf('--check') + 1];
    if (!originalPath) fail('使い方: node split-cskillmanager.mjs --check <original.js>');
    runCheck(originalPath);
} else {
    console.error('使い方:');
    console.error('  node split-cskillmanager.mjs --parse-only [--source <file>]');
    console.error('  node split-cskillmanager.mjs --suggest-groups');
    console.error('  node split-cskillmanager.mjs --emit-inline [--source <file>] [--out <file>]');
    console.error('  node split-cskillmanager.mjs --emit-split [--source <file>]');
    console.error('  node split-cskillmanager.mjs --check <original.js>');
    process.exit(2);
}
