#!/usr/bin/env node
/**
 * engine/ 配下の任意のファイル移動・改名を機械実行する汎用版移行スクリプト
 * （残件台帳 B-25・B-26。旧 `migrate-engine-layout.mjs`（B-19）の後継）。
 *
 * B-19 との違い: バケット表（ディレクトリ単位の割当）ではなく、JSON マップファイルで
 * 「旧パス → 新パス」（ともに `engine/` 相対）を直接指定する。移動と改名はパス解決の
 * 観点では同一操作なので、この1本を B-25（データファイルのドメイン按分）・
 * B-26a（分割ファイルのプレフィックス撤廃）・B-26b（本体・bridge の改名）の
 * 3フェーズすべてで別々のマップファイルを渡して使う。
 *
 * ステージ構成・不変条件（全ての参照サイト r について、旧解決先 T_old に対し新しい参照の
 * 解決先 T_new が必ず map(T_old) と一致すること）は migrate-engine-layout.mjs と同一。
 * B-19 の検証で判明した2つの落とし穴を最初から広く取り込んである:
 *   - tests/**\/*.ts の絶対パス指定（/workspace/ratorio/engine/X.js）
 *   - tests/**\/*.ts の素の相対パス（vi.mock('../../engine/util.js')）
 *
 * 使い方:
 *   node migrate-engine-rename.mjs <mapfile.json> --report          何も書き込まず計画を報告する
 *   node migrate-engine-rename.mjs <mapfile.json> --apply-moves      ファイル移動のみ実行する
 *   node migrate-engine-rename.mjs <mapfile.json> --apply-rewrites   移動後のファイルの中身を書き換える。
 *                                                                     ⚠ べき等ではない。2回実行しないこと
 *
 * mapfile.json の書式: { "旧パス（engine/相対）": "新パス（engine/相対）", ... }
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, resolve, sep, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { Linter } from 'eslint';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // ratorio/
const ENGINE = join(ROOT, 'engine');
const TESTS_DIR = join(ROOT, 'tests');
const PAGES_DIR = join(ROOT, 'pages');
const WS_SRC_DIR = join(ROOT, 'workspace/src');

const mapFileArg = process.argv[2];
const mode = process.argv[3] || '--report';

if (!mapFileArg || !existsSync(mapFileArg)) {
    console.error('使い方: node migrate-engine-rename.mjs <mapfile.json> [--report|--apply-moves|--apply-rewrites]');
    process.exit(1);
}

function toPosix(p) {
    return p.split(sep).join('/');
}

// ─── Stage A: マップファイルからのファイルマップ構築・衝突検査 ──────────

function buildFileMap() {
    const raw = JSON.parse(readFileSync(mapFileArg, 'utf8'));
    const map = new Map(); // absOld -> absNew
    for (const [oldRel, newRel] of Object.entries(raw)) {
        const oldAbs = join(ENGINE, oldRel);
        if (!existsSync(oldAbs)) {
            console.error(`✗ マップファイルのファイルが存在しません: engine/${oldRel}`);
            process.exit(1);
        }
        map.set(oldAbs, join(ENGINE, newRel));
    }
    return map;
}

function checkCollisions(fileMap) {
    const seen = new Map();
    const collisions = [];
    for (const [oldP, newP] of fileMap) {
        if (seen.has(newP)) collisions.push([seen.get(newP), oldP, newP]);
        seen.set(newP, oldP);
    }
    for (const [, newP] of fileMap) {
        if (existsSync(newP) && !fileMap.has(newP)) {
            collisions.push(['(既存ファイル)', newP, newP]);
        }
    }
    return collisions;
}

function mapAbs(fileMap, absPath) {
    return fileMap.has(absPath) ? fileMap.get(absPath) : absPath;
}

// ─── Stage B: JS import/export specifier の書き換え（ESLint AST。B-19と同一実装） ──

function collectJsSpecifierRanges(code) {
    const linter = new Linter();
    const ranges = [];
    const collectorRule = {
        create() {
            const record = (node) => {
                if (node && node.type === 'Literal' && typeof node.value === 'string') {
                    ranges.push({ range: node.range, value: node.value });
                }
            };
            return {
                ImportDeclaration(node) { record(node.source); },
                ExportNamedDeclaration(node) { record(node.source); },
                ExportAllDeclaration(node) { record(node.source); },
                ImportExpression(node) { record(node.source); },
            };
        },
    };
    linter.verify(code, {
        languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
        plugins: { collect: { rules: { collect: collectorRule } } },
        rules: { 'collect/collect': 'error' },
    });
    return ranges.filter((r) => r.value.startsWith('.') || r.value.startsWith('/'));
}

function planJsRewrite(absFilePath, fileMap, readFromAbsOverride) {
    const code = readFileSync(readFromAbsOverride ?? absFilePath, 'utf8');
    const ranges = collectJsSpecifierRanges(code);
    const edits = [];
    for (const { range, value } of ranges) {
        if (!value.startsWith('.')) continue;
        const oldAbsTarget = resolve(dirname(absFilePath), value);
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        const newFileDir = dirname(mapAbs(fileMap, absFilePath));
        let rel = toPosix(relative(newFileDir, newAbsTarget));
        if (!rel.startsWith('.')) rel = './' + rel;
        if (rel === value) continue;
        edits.push({ range, oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
    }
    return { absFilePath, code, edits };
}

function applyEdits(code, edits) {
    let out = code;
    const sorted = [...edits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + JSON.stringify(e.newValue) + out.slice(e.range[1]);
    }
    return out;
}

// ─── Stage B2: .ts ファイル（正規表現。相対指定子・vi.mock・絶対パスの3種を拾う） ──

// `import '...'`（bare side-effect import。from句もimport()も無い）も拾う必要がある
// （B-25適用時に tests/engine/CMobConfInput.test.ts で発覚。`import\s+(?=['"])` で
// `import { Foo } from` 等と区別する＝直後がクォートの場合のみ側効果importとみなす）。
const TS_SPEC_PREFIX = /(?:\bfrom\s+|\bimport\s*\(\s*|\bimport\s+(?=['"])|vi\.mock\(\s*)/.source;
const TS_SPEC_RE = new RegExp(`(${TS_SPEC_PREFIX})(['"])((?:\\.\\.?\\/)[^'"]*)\\2`, 'g');
const TS_ABS_SPEC_RE = new RegExp(`(${TS_SPEC_PREFIX})(['"])(\\/workspace\\/ratorio\\/engine\\/[^'"]*)\\2`, 'g');

function planTsRewrite(absFilePath, fileMap) {
    const code = readFileSync(absFilePath, 'utf8');
    const edits = [];
    let m;
    TS_SPEC_RE.lastIndex = 0;
    while ((m = TS_SPEC_RE.exec(code))) {
        const value = m[3];
        const quoteStart = m.index + m[1].length;
        const valueStart = quoteStart + 1;
        const valueEnd = valueStart + value.length;
        const oldAbsTarget = resolve(dirname(absFilePath), value);
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        if (newAbsTarget === oldAbsTarget) continue;
        let rel = toPosix(relative(dirname(absFilePath), newAbsTarget));
        if (!rel.startsWith('.')) rel = './' + rel;
        edits.push({ range: [valueStart, valueEnd], oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
    }
    TS_ABS_SPEC_RE.lastIndex = 0;
    while ((m = TS_ABS_SPEC_RE.exec(code))) {
        const value = m[3];
        const quoteStart = m.index + m[1].length;
        const valueStart = quoteStart + 1;
        const valueEnd = valueStart + value.length;
        const oldAbsTarget = value; // 既に絶対パス
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        if (newAbsTarget === oldAbsTarget) continue;
        edits.push({ range: [valueStart, valueEnd], oldValue: value, newValue: newAbsTarget, oldAbsTarget, newAbsTarget });
    }
    return { absFilePath, code, edits };
}

function applyRawEdits(code, edits) {
    let out = code;
    const sorted = [...edits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + e.newValue + out.slice(e.range[1]);
    }
    return out;
}

// ─── Stage C: HTML の書き換え ──────────────────────────────────────────

const URL_ATTRS = [
    ['script', 'src'], ['link', 'href'], ['a', 'href'], ['img', 'src'],
    ['iframe', 'src'], ['form', 'action'], ['source', 'src'],
];

function isSkippableUrl(v) {
    return /^([a-z][a-z0-9+.-]*:|\/|#)/i.test(v) || v === '';
}

function planHtmlRewrite(absHtmlPath, fileMap) {
    const code = readFileSync(absHtmlPath, 'utf8');
    const htmlDir = dirname(absHtmlPath);
    const baseMatch = /<base\s+href="([^"]*)"\s*\/?>/i.exec(code);
    const baseAbs = baseMatch ? resolve(htmlDir, baseMatch[1]) : htmlDir;

    const edits = [];
    for (const [tag, attr] of URL_ATTRS) {
        const re = new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]*)"`, 'gi');
        let m;
        while ((m = re.exec(code))) {
            const value = m[1];
            if (isSkippableUrl(value)) continue;
            const attrStart = m.index + m[0].indexOf(`${attr}="`) + attr.length + 2;
            const attrEnd = attrStart + value.length;
            const oldAbsTarget = resolve(baseAbs, value);
            const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
            let rel = toPosix(relative(htmlDir, newAbsTarget));
            if (rel === '') rel = '.';
            if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
            if (rel === value) continue;
            edits.push({ range: [attrStart, attrEnd], oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
        }
    }
    return { absHtmlPath, code, edits };
}

function applyHtmlEdits(code, edits) {
    let out = code;
    const sorted = [...edits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + e.newValue + out.slice(e.range[1]);
    }
    return out;
}

function htmlTargets() {
    const targets = [
        join(ROOT, 'ro4/m/calcx.html'),
        join(ROOT, 'ro4/m/calcx-ai.html'),
    ];
    if (existsSync(PAGES_DIR)) {
        for (const f of readdirSync(PAGES_DIR)) {
            if (f.endsWith('.html')) targets.push(join(PAGES_DIR, f));
        }
    }
    return targets.filter(existsSync);
}

function pagesJsTargets() {
    const jsDir = join(PAGES_DIR, 'js');
    if (!existsSync(jsDir)) return [];
    return readdirSync(jsDir).filter((f) => f.endsWith('.js')).map((f) => join(jsDir, f));
}

function listFilesRecursive(dir) {
    const out = [];
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...listFilesRecursive(p));
        else out.push(p);
    }
    return out;
}

// ─── Stage D: tests/**/*.ts の `@engine/X.js` バレスペシファイア書き換え ──

const ENGINE_ALIAS_RE = /@engine\/([A-Za-z0-9_.\/-]+)/g;

function planEngineAliasRewrite(absFilePath, fileMap) {
    const code = readFileSync(absFilePath, 'utf8');
    const edits = [];
    let m;
    ENGINE_ALIAS_RE.lastIndex = 0;
    while ((m = ENGINE_ALIAS_RE.exec(code))) {
        const relPath = m[1];
        const oldAbsTarget = join(ENGINE, relPath);
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        if (newAbsTarget === oldAbsTarget) continue;
        const newRelPath = toPosix(relative(ENGINE, newAbsTarget));
        const valueStart = m.index + '@engine/'.length;
        const valueEnd = valueStart + relPath.length;
        edits.push({ range: [valueStart, valueEnd], oldValue: relPath, newValue: newRelPath });
    }
    return { absFilePath, code, edits };
}

function tsTestTargets() {
    const out = [];
    function walk(d) {
        if (!existsSync(d)) return;
        for (const f of readdirSync(d)) {
            const p = join(d, f);
            if (statSync(p).isDirectory()) walk(p);
            else if (f.endsWith('.ts')) out.push(p);
        }
    }
    for (const sub of ['engine', 'integration', 'helpers']) {
        walk(join(TESTS_DIR, sub));
    }
    return out;
}

// ─── Stage E: Category E（動的import文字列・snapshotキー文字列） ──────────

const CATEGORY_E_FILES = [
    'tests/helpers/objid-snapshot.ts',
    'tests/integration/skill-data-sweep.test.ts',
    'tests/integration/calc-headless.test.ts',
    'tests/integration/saveimage-output.test.ts',
    'tests/integration/skill-formula-sweep.test.ts',
    'tests/integration/calcx.test.ts',
    'tests/integration/test-oracle-helpers.test.ts',
];

const DYNAMIC_IMPORT_STRING_RE = /(?:dynamicImport|import)\(\s*(['"])(\/[^'"]+)\1\s*\)/g;
const SNAPSHOT_KEY_RE = /(['"])(\/engine\/[^'"#]+)#([^'"]+)\1/g;
const ROOT_REL_ARRAY_ITEM_RE = /^\s*(['"])(\/engine\/[^'"]+)\1\s*,?\s*(?:\/\/.*)?$/;

function findCategoryELiterals(absFilePath) {
    if (!existsSync(absFilePath)) return [];
    const code = readFileSync(absFilePath, 'utf8');
    const found = [];
    let m;
    DYNAMIC_IMPORT_STRING_RE.lastIndex = 0;
    while ((m = DYNAMIC_IMPORT_STRING_RE.exec(code))) {
        if (!m[2].startsWith('/engine/')) continue;
        found.push({ kind: 'dynamicImport', literal: m[2] });
    }
    SNAPSHOT_KEY_RE.lastIndex = 0;
    while ((m = SNAPSHOT_KEY_RE.exec(code))) {
        found.push({ kind: 'snapshotKey', literal: m[2], exportName: m[3] });
    }
    for (const line of code.split('\n')) {
        const am = ROOT_REL_ARRAY_ITEM_RE.exec(line);
        if (am && !found.some((f) => f.literal === am[2])) {
            found.push({ kind: 'arrayLiteral', literal: am[2] });
        }
    }
    return found;
}

function mapRootRelative(fileMap, literal) {
    const abs = join(ROOT, literal.replace(/^\//, ''));
    const newAbs = mapAbs(fileMap, abs);
    return '/' + toPosix(relative(ROOT, newAbs));
}

// ─── レポート ──────────────────────────────────────────────────────────

function allTargets(fileMap) {
    const allEngineJs = listFilesRecursive(ENGINE).filter((p) => p.endsWith('.js'));
    const wsTargets = existsSync(WS_SRC_DIR)
        ? readdirSync(WS_SRC_DIR).filter((f) => f.endsWith('.ts')).map((f) => join(WS_SRC_DIR, f))
        : [];
    const startupTest = join(ROOT, 'workspace/__tests__/src/startup.test.ts');
    if (existsSync(startupTest)) wsTargets.push(startupTest);
    return { allEngineJs, wsTargets };
}

function report() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);

    console.log('=== Stage A: ファイルマップ ===');
    console.log(`移動対象: ${fileMap.size}件`);
    for (const [oldAbs, newAbs] of fileMap) {
        console.log(`  ${toPosix(relative(ENGINE, oldAbs))} -> ${toPosix(relative(ENGINE, newAbs))}`);
    }
    console.log(`衝突: ${collisions.length}`);
    for (const [a, b, t] of collisions) {
        console.log(`  ✗ ${a === '(既存ファイル)' ? a : relative(ROOT, a)} と ${relative(ROOT, b)} が両方 ${relative(ROOT, t)} へ`);
    }
    if (collisions.length > 0) {
        console.error('\n✗ 衝突が解消されていません。処理を中止します。');
        process.exit(1);
    }

    const { allEngineJs, wsTargets } = allTargets(fileMap);

    console.log('\n=== Stage B: engine/ 配下 .js 全ファイルの書き換え計画 ===');
    let totalJsEdits = 0;
    let filesWithEdits = 0;
    for (const abs of allEngineJs) {
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length > 0) { filesWithEdits++; totalJsEdits += plan.edits.length; }
    }
    console.log(`走査対象: ${allEngineJs.length}件`);
    console.log(`書き換えが必要なファイル: ${filesWithEdits}`);
    console.log(`書き換え箇所の合計: ${totalJsEdits}`);

    console.log('\n=== Stage B2: pages/js/*.js の書き換え計画 ===');
    let pagesJsEdits = 0;
    for (const abs of pagesJsTargets()) {
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件`);
            pagesJsEdits += plan.edits.length;
        }
    }
    console.log(`合計: ${pagesJsEdits}件`);

    console.log('\n=== Stage B3: workspace/src/*.ts の書き換え計画 ===');
    let tsEdits = 0;
    for (const abs of wsTargets) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件`);
            tsEdits += plan.edits.length;
        }
    }
    console.log(`合計: ${tsEdits}件`);

    console.log('\n=== Stage C: HTML の書き換え計画 ===');
    let totalHtmlEdits = 0;
    for (const p of htmlTargets()) {
        const plan = planHtmlRewrite(p, fileMap);
        totalHtmlEdits += plan.edits.length;
        if (plan.edits.length > 0) console.log(`  ${toPosix(relative(ROOT, p))}: ${plan.edits.length}件書き換え`);
    }
    console.log(`書き換え合計: ${totalHtmlEdits}件`);

    console.log('\n=== Stage D: tests/**/*.ts の @engine/ エイリアス書き換え計画 ===');
    const tsTargets = tsTestTargets();
    let aliasEdits = 0, aliasFiles = 0;
    for (const abs of tsTargets) {
        const plan = planEngineAliasRewrite(abs, fileMap);
        if (plan.edits.length > 0) { aliasFiles++; aliasEdits += plan.edits.length; }
    }
    console.log(`走査対象: ${tsTargets.length}ファイル`);
    console.log(`書き換えが必要なファイル: ${aliasFiles}`);
    console.log(`書き換え箇所の合計: ${aliasEdits}`);

    console.log('\n=== Stage D2: tests/**/*.ts の相対指定子・絶対パス指定子（TS_SPEC_RE/TS_ABS_SPEC_RE）===');
    let tsRelEdits = 0, tsRelFiles = 0;
    for (const abs of tsTargets) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            tsRelFiles++; tsRelEdits += plan.edits.length;
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件`);
        }
    }
    console.log(`書き換えが必要なファイル: ${tsRelFiles} / 合計: ${tsRelEdits}件`);

    console.log('\n=== Stage E: Category E（動的import文字列・snapshotキー）===');
    let categoryETotal = 0, categoryEChanged = 0;
    for (const file of CATEGORY_E_FILES) {
        const abs = join(ROOT, file);
        const literals = findCategoryELiterals(abs);
        for (const lit of literals) {
            categoryETotal++;
            const mapped = mapRootRelative(fileMap, lit.literal);
            const changed = mapped !== lit.literal;
            if (changed) { categoryEChanged++; console.log(`  ${file} [${lit.kind}] ${lit.literal} → ${mapped}`); }
        }
    }
    console.log(`Category E 合計: ${categoryETotal}件 / 変化あり: ${categoryEChanged}件`);

    console.log('\n=== サマリ ===');
    console.log(`ファイル移動対象: ${fileMap.size}`);
    console.log(`JS書き換え箇所: ${totalJsEdits + pagesJsEdits + tsEdits}`);
    console.log(`HTML書き換え箇所: ${totalHtmlEdits}`);
    console.log(`@engineエイリアス書き換え箇所: ${aliasEdits}`);
    console.log(`tests相対/絶対指定子書き換え箇所: ${tsRelEdits}`);
    console.log(`Category E: ${categoryETotal}件中${categoryEChanged}件変化`);
}

// ─── apply-moves / apply-rewrites ───────────────────────────────────────

const CHECKPOINT_PATH = `/tmp/claude-1000/-workspace/0a1f8d5b-c99b-4264-b563-0c936f539981/scratchpad/migrate-rename-${basename(mapFileArg, '.json')}.checkpoint.json`;

function persistFileMap(fileMap) {
    const obj = {};
    for (const [oldAbs, newAbs] of fileMap) {
        obj[toPosix(relative(ROOT, oldAbs))] = toPosix(relative(ROOT, newAbs));
    }
    writeFileSync(CHECKPOINT_PATH, JSON.stringify(obj, null, 2));
}

function loadFileMap() {
    if (!existsSync(CHECKPOINT_PATH)) {
        console.error(`チェックポイントが見つかりません: ${CHECKPOINT_PATH}\n` +
            '先に --apply-moves を実行するか（初回）、既に --apply-rewrites 済みなら再実行しないこと。');
        process.exit(1);
    }
    const obj = JSON.parse(readFileSync(CHECKPOINT_PATH, 'utf8'));
    const map = new Map();
    for (const [oldRel, newRel] of Object.entries(obj)) {
        map.set(join(ROOT, oldRel), join(ROOT, newRel));
    }
    return map;
}

function applyMoves() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);
    if (collisions.length > 0) {
        console.error(`✗ 衝突 ${collisions.length}件。中止します。`);
        process.exit(1);
    }
    persistFileMap(fileMap);
    console.log(`チェックポイント保存: ${CHECKPOINT_PATH}（${fileMap.size}件）`);

    let moved = 0;
    for (const [oldAbs, newAbs] of fileMap) {
        mkdirSync(dirname(newAbs), { recursive: true });
        renameSync(oldAbs, newAbs);
        moved++;
    }
    console.log(`移動完了: ${moved}件`);
}

function applyRewrites() {
    const fileMap = loadFileMap();
    let jsEdits = 0, htmlEdits = 0, aliasEdits = 0, tsRelEdits = 0, categoryEApplied = 0;

    // 1) 移動済みファイル自身のimport書き換え（内容は新パスから読む・旧パス基準で解決）
    for (const [oldAbs, newAbs] of fileMap) {
        const plan = planJsRewrite(oldAbs, fileMap, newAbs);
        if (plan.edits.length === 0) continue;
        writeFileSync(newAbs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 2) bystander（移動しないengine内の全.js）
    const allEngineJs = listFilesRecursive(ENGINE).filter((p) => p.endsWith('.js'));
    for (const abs of allEngineJs) {
        if (fileMap.has(abs)) continue;
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 3) pages/js/*.js
    for (const abs of pagesJsTargets()) {
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 4) workspace/src/*.ts + startup.test.ts（正規表現ベース）
    const wsTargets = existsSync(WS_SRC_DIR)
        ? readdirSync(WS_SRC_DIR).filter((f) => f.endsWith('.ts')).map((f) => join(WS_SRC_DIR, f))
        : [];
    const startupTest = join(ROOT, 'workspace/__tests__/src/startup.test.ts');
    if (existsSync(startupTest)) wsTargets.push(startupTest);
    for (const abs of wsTargets) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 5) HTML
    for (const p of htmlTargets()) {
        const plan = planHtmlRewrite(p, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(p, applyHtmlEdits(plan.code, plan.edits));
        htmlEdits += plan.edits.length;
    }

    // 6) tests/**/*.ts の @engine/ エイリアス
    const tsTargets = tsTestTargets();
    for (const abs of tsTargets) {
        const plan = planEngineAliasRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        aliasEdits += plan.edits.length;
    }

    // 6b) tests/**/*.ts の相対指定子・絶対パス指定子
    for (const abs of tsTargets) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        tsRelEdits += plan.edits.length;
    }

    // 7) Category E（動的import文字列・snapshotキー文字列）
    for (const file of CATEGORY_E_FILES) {
        const abs = join(ROOT, file);
        if (!existsSync(abs)) continue;
        let code = readFileSync(abs, 'utf8');
        const literals = findCategoryELiterals(abs);
        let changed = false;
        for (const lit of literals) {
            const mapped = mapRootRelative(fileMap, lit.literal);
            if (mapped === lit.literal || !code.includes(lit.literal)) continue;
            code = code.split(lit.literal).join(mapped);
            changed = true;
            categoryEApplied++;
        }
        if (changed) writeFileSync(abs, code);
    }

    console.log(`JS書き換え適用: ${jsEdits}箇所`);
    console.log(`HTML書き換え適用: ${htmlEdits}箇所`);
    console.log(`@engineエイリアス書き換え適用: ${aliasEdits}箇所`);
    console.log(`tests相対/絶対指定子書き換え適用: ${tsRelEdits}箇所`);
    console.log(`Category E書き換え適用: ${categoryEApplied}箇所`);

    unlinkSync(CHECKPOINT_PATH);
    console.log('\nチェックポイントを削除した（再実行防止）。');
}

// ─── メイン ────────────────────────────────────────────────────────────

if (mode === '--report') {
    report();
} else if (mode === '--apply-moves') {
    applyMoves();
} else if (mode === '--apply-rewrites') {
    applyRewrites();
} else {
    console.error(`不明なモード: ${mode}`);
    process.exit(1);
}
