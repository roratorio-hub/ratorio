#!/usr/bin/env node
/**
 * roro/m/js/skill/NN-*.js（SKILL_ID連番で機械分割した43ファイル）を、
 * ラグナロクオンライン公式の職業ツリーに沿った 77 ファイル（13系統ディレクトリ）へ再分割する。
 *
 * 本文（defineSkill(...) ブロック）は1バイトも変更しない。移動のみ。
 * 割当先は skill-split/final_assign.json（skillId → "系統/ファイル名"）で確定済み
 * （公式サイト https://rotool.gungho.jp/job_skill_list/<系統> からの機械抽出 + 手動検証）。
 *
 * 計画: /home/vscode/.claude/plans/roro-m-js-skill-https-rotool-gungho-jp-s-glittery-cupcake.md
 *
 * 使い方:
 *   node split-skill-by-job.mjs --emit          再分割を実行する（旧43ファイルは削除）。
 *   node split-skill-by-job.mjs --check <oldTreeBackupDir>
 *       再分割前にバックアップしておいた旧 skill/ ツリーと、現在の新ツリーの
 *       本文をバイト比較する。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Linter } from 'eslint';
import assert from 'node:assert/strict';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // tests/.. = ratorio/
const JS_DIR = join(ROOT, 'roro/m/js');
const SKILL_DIR = join(JS_DIR, 'skill');
const CSKILLMANAGER = join(JS_DIR, 'CSkillManager.js');
const ASSIGN_PATH = resolve(__dirname, '../../.claude/tools/skill-split/final_assign.json');
const ORDERED_KEYS_PATH = resolve(__dirname, '../../.claude/tools/skill-split/ordered_keys.json');

const args = process.argv.slice(2);
const mode = args[0];

function fail(msg) {
    console.error(`✗ ${msg}`);
    process.exit(1);
}

// ─── 旧43ファイルから defineSkill ブロックを抽出 ───────────────────────────

const BLOCK_START_RE = /^\t\tdefineSkill\((SKILL_ID_[A-Za-z0-9_]+), function\(\) \{$/;

function listOldFiles(dir) {
    return readdirSync(dir).filter((f) => f.endsWith('.js')).sort().map((f) => join(dir, f));
}

/** 1ファイル分の `export const skills = [ ... ];` から defineSkill ブロックを抽出する */
function parseFileBlocks(path) {
    const text = readFileSync(path, 'utf8');
    const lines = text.split('\n');
    const arrOpenIdx = lines.indexOf('export const skills = [');
    if (arrOpenIdx < 0) fail(`${path}: 'export const skills = [' が見つかりません`);

    const starts = [];
    for (let i = arrOpenIdx + 1; i < lines.length; i++) {
        if (BLOCK_START_RE.test(lines[i])) starts.push(i);
        if (lines[i] === '];') break;
    }

    const blocks = [];
    for (const blockStart of starts) {
        const m = BLOCK_START_RE.exec(lines[blockStart]);
        const marker = m[1];

        let depth = 1;
        let j = blockStart + 1;
        for (; j < lines.length; j++) {
            for (const ch of lines[j]) {
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth === 0) break;
        }
        if (j >= lines.length || lines[j] !== '\t\t}),') {
            fail(`${path} L${blockStart + 1}: 終端 '}),' が想定外です（L${j + 1}: ${JSON.stringify(lines[j])}）`);
        }
        const closer = j;

        // banner開始行（連続するコメント行をブロックコメント対応でさかのぼる）
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

    // banner開始行〜次ブロックのbanner開始行の直前（末尾空行含む）を本体行として切り出す
    const regionEnds = blocks.map((b, i) => (i + 1 < blocks.length ? blocks[i + 1].bannerStart : lines.findIndex((l, idx) => idx > blocks[blocks.length - 1].closer && l === '];')));
    return blocks.map((b, i) => ({ marker: b.marker, lines: lines.slice(b.bannerStart, regionEnds[i]) }));
}

// ─── free-var 抽出・import 生成（split-cskillmanager.mjs の§Eロジックを流用） ──

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

/**
 * 元ファイル（roro/m/js/skill/NN-*.js。JS_DIR/skill/ 直下、深さ1）基準の import ソースを、
 * 新ファイル（roro/m/js/skill/<系統>/<ファイル>.js。深さ2）基準へリベースする。
 */
function rebaseToNestedSkillDir(src, newFileDir) {
    if (!src.startsWith('.')) return src;
    const abs = resolve(SKILL_DIR, src); // 旧基準（skill/ 直下）で絶対パス化
    let rel = relative(newFileDir, abs);
    if (!rel.startsWith('.')) rel = './' + rel;
    return rel.split(sep).join('/');
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

function buildGroupImports(bodyText, origImportSpecMap, newFileDir) {
    const wrapped = `export const skills = [\n${bodyText}\n];\n`;
    const free = findFreeVars(wrapped).filter((n) => n !== 'defineSkill');
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

    addImport('defineSkill', rebaseToNestedSkillDir('../CSkillData.js', newFileDir), 'defineSkill');
    for (const name of skillIdConsts) addImport(name, rebaseToNestedSkillDir('../skill.dat.js', newFileDir), name);

    for (const name of others) {
        if (SPECIAL[name]) { addImport(name, rebaseToNestedSkillDir(SPECIAL[name].source, newFileDir), SPECIAL[name].imported); continue; }
        const info = origImportSpecMap.get(name);
        if (!info) { notFound.push(name); continue; }
        addImport(name, rebaseToNestedSkillDir(info.source, newFileDir), info.imported);
    }

    return { importLines: formatImportBlock(bySource), notFound };
}

// ─── メイン処理 ─────────────────────────────────────────────────────────────

function runEmit() {
    const assign = JSON.parse(readFileSync(ASSIGN_PATH, 'utf8')); // skillId(string) -> "系統/ファイル名"
    const orderedKeys = JSON.parse(readFileSync(ORDERED_KEYS_PATH, 'utf8')); // 77件、系統→階層順

    const oldFiles = listOldFiles(SKILL_DIR);
    if (oldFiles.length !== 43) fail(`旧 skill/*.js が43本ではありません: ${oldFiles.length}`);

    // 全43ファイルの本文ブロックを集約（marker -> {lines}）
    const allBlocks = new Map();
    let origImportSpecMap = new Map();
    for (const f of oldFiles) {
        for (const b of parseFileBlocks(f)) {
            if (allBlocks.has(b.marker)) fail(`${b.marker} が複数ファイルに重複しています`);
            allBlocks.set(b.marker, b.lines);
        }
        const spec = collectImportSpecs(readFileSync(f, 'utf8'));
        for (const [k, v] of spec) origImportSpecMap.set(k, v); // 後勝ちでマージ（衝突は無い前提。あれば buildGroupImports の notFound で顕在化はしない点に注意）
    }
    if (allBlocks.size !== 1396) fail(`抽出ブロック数が1396ではありません: ${allBlocks.size}`);

    // marker(SKILL_ID_XXX) -> 数値ID の対応（skill.dat.js の定数定義から）
    const skillDat = readFileSync(join(JS_DIR, 'skill.dat.js'), 'utf8');
    const constVal = new Map();
    for (const m of skillDat.matchAll(/^export const (SKILL_ID_\w+)\s*=\s*(-?\d+);/gm)) constVal.set(m[1], Number(m[2]));

    // 77バケットへ振り分け
    const buckets = new Map(orderedKeys.map((k) => [k, []]));
    for (const [marker, lines] of allBlocks) {
        const id = constVal.get(marker);
        if (id === undefined) fail(`${marker}: skill.dat.js に定数がありません`);
        const key = assign[String(id)];
        if (!key) fail(`${marker} (id=${id}): final_assign.json に割当がありません`);
        if (!buckets.has(key)) fail(`${marker} (id=${id}): 未知の割当先キー ${key}`);
        buckets.get(key).push({ id, marker, lines });
    }
    for (const [key, arr] of buckets) {
        if (arr.length === 0) fail(`${key}: 割当スキルが0件です`);
        arr.sort((a, b) => a.id - b.id); // ファイル内 ID 昇順を維持
    }

    // 旧43ファイルを削除する前に、新ツリーを書き出す
    const notFoundAll = [];
    for (const key of orderedKeys) {
        const [dirSlug, fileSlug] = key.split('/');
        const newFileDir = join(SKILL_DIR, dirSlug);
        mkdirSync(newFileDir, { recursive: true });

        const members = buckets.get(key);
        const bodyLines = members.flatMap((m) => m.lines);
        const bodyText = bodyLines.join('\n');
        const { importLines, notFound } = buildGroupImports(bodyText, origImportSpecMap, newFileDir);
        if (notFound.length) notFoundAll.push({ key, notFound });

        const idMin = members[0].id;
        const idMax = members[members.length - 1].id;
        const header = [
            '/**',
            ` * スキル定義 ${key}（${members.length} 件 / SKILL_ID ${idMin}〜${idMax} の中から職業ツリーで再抽出）`,
            ' *',
            ' * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの',
            ' * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。',
            ' * 並び順＝ID昇順を保つこと。割当根拠は .claude/context/architecture.md 参照。',
            ' */',
        ];
        const content = [...header, ...importLines, '', 'export const skills = [', ...bodyLines, '];', ''].join('\n');
        writeFileSync(join(newFileDir, `${fileSlug}.js`), content);
    }

    if (notFoundAll.length) {
        for (const { key, notFound } of notFoundAll) console.error(`NOT FOUND in ${key}: ${notFound.join(', ')}`);
        fail('import 解決できない自由変数があります（上記参照）。');
    }

    // 旧43ファイルを削除
    for (const f of oldFiles) rmSync(f);

    // CSkillManager.js を新77本の import に差し替える
    rewriteCSkillManager(orderedKeys);

    console.log(`✓ 77ファイル（13ディレクトリ）へ再分割しました。旧43ファイルは削除済み。`);
}

function rewriteCSkillManager(orderedKeys) {
    const text = readFileSync(CSKILLMANAGER, 'utf8');
    const lines = text.split('\n');

    const importVarNames = orderedKeys.map((k) => `skills_${k.replace(/[^a-zA-Z0-9]/g, '_')}`);
    const importLines = orderedKeys.map((k, i) => `import { skills as ${importVarNames[i]} } from './skill/${k}.js';`);

    // 旧: `import { skills as skills_NN_slug } from './skill/NN-slug.js';` の連続ブロック（2行目〜アクセサ直前）を
    // 新import群に差し替える。旧ブロックの開始/終了行を検出する。
    const firstImportIdx = lines.findIndex((l) => l.startsWith("import { skills as "));
    if (firstImportIdx < 0) fail('CSkillManager.js: 既存の skill import ブロックが見つかりません');
    let lastImportIdx = firstImportIdx;
    while (lines[lastImportIdx + 1].startsWith('import { skills as ')) lastImportIdx++;

    const newLines = [
        ...lines.slice(0, firstImportIdx),
        ...importLines,
        ...lines.slice(lastImportIdx + 1),
    ];

    // ALL_SKILLS のスプレッド行を差し替える
    const allSkillsIdx = newLines.findIndex((l) => l.trimStart().startsWith('const ALL_SKILLS = ['));
    if (allSkillsIdx < 0) fail('CSkillManager.js: const ALL_SKILLS = [ が見つかりません');
    const indent = newLines[allSkillsIdx].match(/^\t*/)[0];
    newLines[allSkillsIdx] = `${indent}const ALL_SKILLS = [${importVarNames.map((v) => `...${v}`).join(', ')}];`;

    writeFileSync(CSKILLMANAGER, newLines.join('\n'));
}

// ─── --check: 旧ツリーとの本文バイト比較 ────────────────────────────────────

function extractBodiesFromTree(dir) {
    const bodies = new Map();
    const files = [];
    const walk = (d) => {
        for (const f of readdirSync(d, { withFileTypes: true })) {
            const p = join(d, f.name);
            if (f.isDirectory()) walk(p);
            else if (f.name.endsWith('.js')) files.push(p);
        }
    };
    walk(dir);
    for (const f of files.sort()) {
        const lines = readFileSync(f, 'utf8').split('\n');
        const arrOpenIdx = lines.indexOf('export const skills = [');
        if (arrOpenIdx < 0) continue;
        let i = arrOpenIdx + 1;
        while (i < lines.length && lines[i] !== '];') {
            const m = BLOCK_START_RE.exec(lines[i]);
            if (!m) { i++; continue; }
            const marker = m[1];
            let depth = 1;
            let j = i + 1;
            const body = [];
            while (j < lines.length && depth > 0) {
                for (const ch of lines[j]) {
                    if (ch === '{') depth++;
                    if (ch === '}') depth--;
                }
                if (depth === 0) break;
                body.push(lines[j]);
                j++;
            }
            bodies.set(marker, body);
            i = j + 1;
        }
    }
    return bodies;
}

function runCheck(oldTreeDir) {
    if (!existsSync(oldTreeDir)) fail(`旧ツリーのバックアップが見つかりません: ${oldTreeDir}`);
    const oldBodies = extractBodiesFromTree(oldTreeDir);
    const newBodies = extractBodiesFromTree(SKILL_DIR);
    if (oldBodies.size !== 1396) fail(`旧ツリーの本文数が1396ではありません: ${oldBodies.size}`);
    if (newBodies.size !== 1396) fail(`新ツリーの本文数が1396ではありません: ${newBodies.size}`);
    let mismatches = 0;
    for (const [marker, body] of oldBodies) {
        const cur = newBodies.get(marker);
        if (!cur) { console.error(`✗ ${marker}: 新ツリーに見つかりません`); mismatches++; continue; }
        try {
            assert.deepStrictEqual(cur, body);
        } catch {
            console.error(`✗ ${marker}: 本文が一致しません`);
            mismatches++;
        }
    }
    if (mismatches) fail(`${mismatches} 件の本文不一致があります`);
    console.log(`✓ 全 ${oldBodies.size} 件のスキル本文がバイト単位で一致しました`);
}

// ─── dispatch ───────────────────────────────────────────────────────────────

if (mode === '--emit') {
    runEmit();
} else if (mode === '--check') {
    const dir = args[1];
    if (!dir) fail('使い方: node split-skill-by-job.mjs --check <oldTreeBackupDir>');
    runCheck(dir);
} else {
    console.error('使い方:');
    console.error('  node split-skill-by-job.mjs --emit');
    console.error('  node split-skill-by-job.mjs --check <oldTreeBackupDir>');
    process.exit(2);
}
