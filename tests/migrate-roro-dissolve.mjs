#!/usr/bin/env node
/**
 * roro/ の解体 + ro4/ の非本質リソース整理（残件台帳 B-23）。
 *
 * 計画: /home/vscode/.claude/plans/lively-splashing-nygaard.md
 *
 * tests/migrate-to-engine.mjs（B-14）と同じ設計を踏襲する:
 *   - 不変条件: 全ての参照サイト r について、旧解決先 T_old に対し新しい参照の
 *     解決先 T_new が必ず map(T_old)（移動先マップ。対象外は恒等）と一致すること。
 *   - JS の import/export specifier 抽出は ESLint の Linter API（AST）。
 *   - .ts は espree が型注釈を読めないため正規表現（vi.mock 含む）。
 *   - HTML は "実効解決先を再マップしてから、ファイル自身の新しい位置からの
 *     相対パスに再アンカーする" という統一アルゴリズム。
 *   - apply-moves → apply-rewrites の2段階＋チェックポイントファイルによる
 *     べき等性ガード（B-14で2回目実行による内容破壊事故が起きた教訓）。
 *
 * B-14との違い:
 *   - 移動対象が2つのクリーンなディレクトリ配下ではなく、35件の個別ファイル
 *     （CSS改名・common/js/の入れ子解消フラット化を含む）なので、
 *     ディレクトリスイープではなく明示的な移動リストで管理する。
 *   - 移動対象の中に HTML ファイル自身（roro/other/*.html 等11件）が含まれる
 *     （B-14では移動対象はJSのみで、HTMLは参照元としてのみ扱った）。
 *     そのため HTML 書き換えも「自分自身が移動する」ケースに対応させる。
 *   - frame.js のnav生成コード・engine/側3ファイルのkousinリンクは意図的に
 *     このスクリプトの対象外（ロジック変更のため手動修正。Phase 2で対応）。
 *
 * 使い方:
 *   node migrate-roro-dissolve.mjs --report          何も書き込まず計画を報告する（既定）
 *   node migrate-roro-dissolve.mjs --apply-moves      ファイル移動のみ実行する（内容は無変更）
 *   node migrate-roro-dissolve.mjs --apply-rewrites   移動後のファイルの中身を書き換える。
 *                                                      ⚠ べき等ではない。2回実行しないこと
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { Linter } from 'eslint';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // ratorio/

const mode = process.argv[2] || '--report';

function toPosix(p) {
    return p.split(sep).join('/');
}

// ─── Stage A: ファイルマップ構築（明示的な移動リスト） ───────────────────

/**
 * [旧相対パス, 新相対パス] の明示リスト。
 * roro/common/js/util.js は engine/ が唯一のハード依存先（64箇所）なので engine/ へ。
 * roro/common/js/toast.js は frame.js 専用のため common/js/ の入れ子を解消し
 * frame.js と同じ assets/ へフラット化する。
 * roro/m/calcx.css・ro4/m/calcx.css は選択子の重複ゼロの別物（統合の余地なし、
 * 調査済み）。同一ディレクトリに入るため名前衝突解消のリネームのみ行い、
 * 中身は1バイトも変えない。
 */
const MOVES = [
    ['roro/common/js/util.js', 'engine/util.js'],
    ['roro/common/js/toast.js', 'assets/toast.js'],
    ['roro/common.css', 'assets/common.css'],
    ['roro/m/calcx.css', 'assets/calcx-legacy.css'],
    ['roro/date.json', 'assets/date.json'],
    ['roro/frame.js', 'assets/frame.js'],
    ['roro/howtouse/howtouse_simulatecasttime.html', 'pages/howtouse_simulatecasttime.html'],
    ['roro/kousin/note20210606.html', 'pages/note20210606.html'],
    ['ro4/m/calcx.css', 'assets/calcx-chrome.css'],
    ['ro4/m/img/frame.png', 'assets/img/frame.png'],
    ['ro4/m/img/frame.xcf', 'assets/img/frame.xcf'],
];

// roro/other/*.html と roro/other/js/*.js はディレクトリごと機械列挙する
// （ファイル名は変えない。1ページ1JSの対応で衝突なし、調査済み）。
// ⚠ --apply-rewrites 時点では roro/ は既に --apply-moves で消えている
// （fileMap は checkpoint から読むので MOVES 自体が不要）。存在確認して読み飛ばす。
if (existsSync(join(ROOT, 'roro/other'))) {
    for (const f of readdirSync(join(ROOT, 'roro/other'))) {
        if (f.endsWith('.html')) MOVES.push([`roro/other/${f}`, `pages/${f}`]);
    }
    for (const f of readdirSync(join(ROOT, 'roro/other/js'))) {
        if (f.endsWith('.js')) MOVES.push([`roro/other/js/${f}`, `pages/js/${f}`]);
    }
}

function buildFileMap() {
    const map = new Map(); // absOld -> absNew
    for (const [oldRel, newRel] of MOVES) {
        map.set(join(ROOT, oldRel), join(ROOT, newRel));
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
    return collisions;
}

/**
 * roro/ 配下の全ファイル（32件のはず）＋ ro4/m/calcx.css・ro4/m/img/* が、
 * MOVES に過不足なくリストされているかを検証する。想定外のファイルが
 * roro/ に増えていたり、逆にリストが古くなっていた場合にここで検出する。
 */
function verifyCoverage(fileMap) {
    const problems = [];
    function walk(dir, acc) {
        for (const name of readdirSync(dir)) {
            const p = join(dir, name);
            if (statSync(p).isDirectory()) walk(p, acc);
            else acc.push(p);
        }
        return acc;
    }
    const actualRoro = walk(join(ROOT, 'roro'), []);
    const listedRoro = [...fileMap.keys()].filter((k) => k.startsWith(join(ROOT, 'roro') + sep));
    const actualSet = new Set(actualRoro);
    const listedSet = new Set(listedRoro);
    for (const a of actualRoro) if (!listedSet.has(a)) problems.push(`未対応（roro/に実在するがMOVESに無い）: ${toPosix(relative(ROOT, a))}`);
    for (const l of listedRoro) if (!actualSet.has(l)) problems.push(`実体なし（MOVESにあるがroro/に無い）: ${toPosix(relative(ROOT, l))}`);

    const ro4Extras = [join(ROOT, 'ro4/m/calcx.css'), join(ROOT, 'ro4/m/img/frame.png'), join(ROOT, 'ro4/m/img/frame.xcf')];
    for (const p of ro4Extras) if (!existsSync(p)) problems.push(`実体なし: ${toPosix(relative(ROOT, p))}`);

    // 不動と明言した4点が万一 MOVES に紛れ込んでいないかも確認する
    const mustStay = ['ro4/m/calcx.html', 'ro4/m/calcx-ai.html', 'ro4/m/calcx-ai.js'];
    for (const rel of mustStay) {
        if (fileMap.has(join(ROOT, rel))) problems.push(`不動指定のファイルがMOVESに含まれている: ${rel}`);
    }
    if ([...fileMap.keys()].some((k) => /items_(manifest|part\d)\.json$/.test(k))) {
        problems.push('items_manifest.json / items_part*.json がMOVESに含まれている（不動指定）');
    }
    return problems;
}

/** 絶対パスを fileMap 経由で解決する（対象外は恒等）。 */
function mapAbs(fileMap, absPath) {
    return fileMap.has(absPath) ? fileMap.get(absPath) : absPath;
}

// ─── Stage B: JS import/export specifier の書き換え（ESLint AST） ────────

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

/**
 * @param absFilePath このファイル自身の論理的位置（specifier解決の基準・fileMapでの
 *   新しい書き込み先の算出に使う）。移動対象ファイルなら旧パス。
 * @param fileMap 旧絶対パス→新絶対パスのマップ
 * @param readFromAbsOverride 内容を実際に読み込む場所（省略時は absFilePath と同じ）。
 *   ⚠ apply-rewrites 内でのみ使う。書き換え済み内容に対して再度呼ぶと壊れる。
 */
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
        // ⚠ target 自体が動いていなくても参照元が動けば深さが変わる（B-14の教訓）。
        // 「結果の文字列が変わるか」だけで判定する。
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

// ─── Stage B2: .ts ファイル（正規表現。vi.mock含む） ─────────────────────

const TS_SPEC_RE = /(\bfrom\s+|\bimport\s*\(\s*|vi\.mock\(\s*)(['"])((?:\.\.?\/)[^'"]*)\2/g;

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
        if (newAbsTarget === oldAbsTarget) continue; // .ts自体は移動しないため深さ変化なし
        let rel = toPosix(relative(dirname(absFilePath), newAbsTarget));
        if (!rel.startsWith('.')) rel = './' + rel;
        edits.push({ range: [valueStart, valueEnd], oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
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

// ─── Stage C: HTML の書き換え（自分自身が移動するケースに対応） ─────────

const URL_ATTRS = [
    ['script', 'src'], ['link', 'href'], ['a', 'href'], ['img', 'src'],
    ['iframe', 'src'], ['form', 'action'], ['source', 'src'],
];

function isSkippableUrl(v) {
    return /^([a-z][a-z0-9+.-]*:|\/|#)/i.test(v) || v === '';
}

/**
 * @param absHtmlPath このファイル自身の論理的位置（旧パス）
 * @param fileMap 旧絶対パス→新絶対パスのマップ
 * @param opts.baseOverrideAbs base href が無いファイルで実効baseを上書きしたい場合
 * @param opts.readFromAbsOverride 内容を実際に読み込む場所（apply-rewrites用）
 */
function planHtmlRewrite(absHtmlPath, fileMap, { baseOverrideAbs, readFromAbsOverride } = {}) {
    const code = readFileSync(readFromAbsOverride ?? absHtmlPath, 'utf8');
    const oldHtmlDir = dirname(absHtmlPath);
    const newHtmlDir = dirname(mapAbs(fileMap, absHtmlPath)); // 自分自身が動けばここも変わる

    const baseMatch = /<base\s+href="([^"]*)"\s*\/?>/i.exec(code);
    const baseAbs = baseOverrideAbs ?? (baseMatch ? resolve(oldHtmlDir, baseMatch[1]) : oldHtmlDir);

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
            const isKnown = existsSync(oldAbsTarget) || fileMap.has(oldAbsTarget);
            if (!isKnown) {
                // 移動対象スコープと無関係の既存の壊れたリンク（例: information/index.html）。
                // 温存する（経路だけ再計算）。
            }
            const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
            let rel = toPosix(relative(newHtmlDir, newAbsTarget));
            if (rel === '') rel = '.';
            if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
            if (rel === value) continue;
            edits.push({ range: [attrStart, attrEnd], oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
        }
    }

    let baseRemoval = null;
    if (baseMatch && !baseOverrideAbs) baseRemoval = { index: baseMatch.index, length: baseMatch[0].length };

    return { absHtmlPath, code, edits, baseRemoval };
}

function applyHtmlEdits(code, edits, baseRemoval) {
    let out = code;
    const sorted = [...edits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + e.newValue + out.slice(e.range[1]);
    }
    if (baseRemoval) {
        const lines = out.split('\n');
        out = lines.filter((l) => !/<base\s+href=/i.test(l)).join('\n');
    }
    return out;
}

// ─── Stage F: TS_SPEC_RE では拾えない文字列リテラル（page.goto等） ───────
// page.goto('${baseUrl}/roro/other/X.html') や配列リテラル中の裸文字列、
// 絶対パスimportは from/import(/vi.mock( のいずれの構文にも当たらないため
// Stage B2 の正規表現では拾えない。網羅grep（tests/roro/eventsetup-*,
// tests/roro/hmitemlist, tests/integration/cardlist, tests/integration/others）で
// 確認済みの4ファイルに限定した単純文字列置換で対応する。

const STAGE_F_FILES = [
    'tests/integration/cardlist.test.ts',
    'tests/integration/others.test.ts',
    'tests/roro/eventsetup-melonfes2026monsterdrop.test.ts',
    'tests/roro/hmitemlist.test.ts',
];

function planStageF(relPath) {
    const abs = join(ROOT, relPath);
    const code = readFileSync(abs, 'utf8');
    const replaced = code
        .split('/workspace/ratorio/roro/other/js/').join('/workspace/ratorio/pages/js/')
        .split('roro/other/').join('pages/');
    return { abs, code, replaced, changed: replaced !== code };
}

// ─── 対象ファイル一覧 ─────────────────────────────────────────────────

/** MOVES のうち .js のもの（Stage B対象）。 */
function movedJsEntries(fileMap) {
    return [...fileMap.entries()].filter(([abs]) => abs.endsWith('.js'));
}
/** MOVES のうち .html のもの（Stage C対象・自分自身が動く）。 */
function movedHtmlEntries(fileMap) {
    return [...fileMap.entries()].filter(([abs]) => abs.endsWith('.html'));
}

/** engine/ 配下の全 .js（移動しないが util.js 等への参照を持ちうる）。 */
function listEngineJsFiles() {
    const out = [];
    function walk(dir) {
        for (const name of readdirSync(dir)) {
            const p = join(dir, name);
            if (statSync(p).isDirectory()) walk(p);
            else if (p.endsWith('.js')) out.push(p);
        }
    }
    walk(join(ROOT, 'engine'));
    return out;
}

/** 移動しないが移動対象を参照しうるHTML。 */
function staticHtmlTargets() {
    return [
        { path: join(ROOT, 'ro4/m/calcx.html') },
        { path: join(ROOT, 'ro4/m/calcx-ai.html') },
        { path: join(ROOT, 'util/sortedEnchantCardIdArray.html'), baseOverrideAbs: ROOT },
    ];
}

// ─── レポート ──────────────────────────────────────────────────────────

function report() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);
    const coverage = verifyCoverage(fileMap);

    console.log('=== Stage A: ファイルマップ ===');
    console.log(`移動対象合計: ${fileMap.size}`);
    console.log(`衝突: ${collisions.length}`);
    for (const [a, b, t] of collisions) console.log(`  ✗ ${relative(ROOT, a)} と ${relative(ROOT, b)} が両方 ${relative(ROOT, t)} へ`);
    console.log(`カバレッジ問題: ${coverage.length}`);
    for (const p of coverage) console.log(`  ✗ ${p}`);

    if (collisions.length > 0 || coverage.length > 0) {
        console.error('\n✗ Stage A に問題があります。処理を中止します。');
        process.exit(1);
    }

    console.log('\n=== Stage B: 移動する.js自身のimport書き換え計画 ===');
    let jsSelfEdits = 0;
    for (const [absOld] of movedJsEntries(fileMap)) {
        const plan = planJsRewrite(absOld, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, absOld))}: ${plan.edits.length}件 (${plan.edits.map((e) => `${e.oldValue}→${e.newValue}`).join(', ')})`);
            jsSelfEdits += plan.edits.length;
        }
    }
    console.log(`合計: ${jsSelfEdits}件`);

    console.log('\n=== Stage B (engine/): util.js移動に伴う参照更新 ===');
    let engineEdits = 0;
    let engineFilesWithEdits = 0;
    for (const abs of listEngineJsFiles()) {
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length > 0) { engineEdits += plan.edits.length; engineFilesWithEdits++; }
    }
    console.log(`書き換えが必要なengineファイル: ${engineFilesWithEdits} / ${listEngineJsFiles().length}`);
    console.log(`書き換え箇所の合計: ${engineEdits}（64箇所前後の想定）`);

    console.log('\n=== Stage C: 移動するHTML自身の書き換え計画 ===');
    let htmlSelfEdits = 0;
    for (const [absOld] of movedHtmlEntries(fileMap)) {
        const plan = planHtmlRewrite(absOld, fileMap);
        htmlSelfEdits += plan.edits.length;
        console.log(`  ${toPosix(relative(ROOT, absOld))} → ${toPosix(relative(ROOT, fileMap.get(absOld)))}: ${plan.edits.length}件${plan.baseRemoval ? ' + <base>削除' : ''}`);
    }
    console.log(`合計: ${htmlSelfEdits}件`);

    console.log('\n=== Stage C: 不動HTMLからの参照書き換え計画 ===');
    let staticHtmlEdits = 0;
    for (const { path: p, baseOverrideAbs } of staticHtmlTargets()) {
        if (!existsSync(p)) continue;
        const plan = planHtmlRewrite(p, fileMap, { baseOverrideAbs });
        staticHtmlEdits += plan.edits.length;
        console.log(`  ${toPosix(relative(ROOT, p))}: ${plan.edits.length}件${plan.baseRemoval ? ' + <base>削除' : ''}`);
    }
    console.log(`合計: ${staticHtmlEdits}件`);

    console.log('\n=== Stage B2: tests/**/*.ts の relative import / vi.mock 書き換え計画 ===');
    let tsEdits = 0;
    let tsFilesWithEdits = 0;
    function walkTs(dir, acc) {
        for (const name of readdirSync(dir)) {
            const p = join(dir, name);
            if (statSync(p).isDirectory()) { if (name !== 'node_modules') walkTs(p, acc); }
            else if (p.endsWith('.ts')) acc.push(p);
        }
        return acc;
    }
    const allTs = walkTs(join(ROOT, 'tests'), []);
    for (const abs of allTs) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件 (${plan.edits.map((e) => `${e.oldValue}→${e.newValue}`).join(', ')})`);
            tsEdits += plan.edits.length;
            tsFilesWithEdits++;
        }
    }
    console.log(`書き換えが必要なファイル: ${tsFilesWithEdits} / ${allTs.length}`);
    console.log(`合計: ${tsEdits}件`);

    console.log('\n=== Stage F: page.goto等の裸文字列リテラル書き換え計画 ===');
    let stageFEdits = 0;
    let stageFFiles = 0;
    for (const rel of STAGE_F_FILES) {
        const plan = planStageF(rel);
        if (plan.changed) {
            stageFFiles++;
            console.log(`  ${rel}: 変更あり`);
        }
    }
    console.log(`書き換えが必要なファイル: ${stageFFiles} / ${STAGE_F_FILES.length}`);

    console.log('\n=== 未対応ファイル: このスクリプトが一切書き換え計画を持たないファイル ===');
    console.log('（Stage B/B2/C/F対象は除外。frame.jsのnav生成・engine/側3ファイルのkousinリンクは');
    console.log(' 意図的にPhase 2で手動対応するため、ここに出るのは正常。CI/util/*.pyはPhase 3対応。');
    console.log(' B-14時点の歴史的記述〔engine/skill/**の"旧 roro/m/js/skill/..."バナー等〕は');
    console.log(' パターンを絞ることで対象から除外している）');
    const grepOut = execFileSync('grep', [
        '-rlnE', '--include=*.js', '--include=*.ts', '--include=*.py', '--include=*.html', '--include=*.yml',
        'roro/other|roro/common|roro/m/calcx|roro/date|roro/frame|roro/howtouse|roro/kousin|ro4/m/calcx\\.css|ro4/m/img',
        '.',
    ], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).map((f) => f.replace(/^\.\//, ''));

    const handled = new Set();
    for (const [absOld] of movedJsEntries(fileMap)) if (planJsRewrite(absOld, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, absOld)));
    for (const abs of listEngineJsFiles()) if (planJsRewrite(abs, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, abs)));
    for (const [absOld] of movedHtmlEntries(fileMap)) handled.add(toPosix(relative(ROOT, absOld)));
    for (const { path: p } of staticHtmlTargets()) if (existsSync(p) && planHtmlRewrite(p, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, p)));
    for (const abs of allTs) if (planTsRewrite(abs, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, abs)));
    for (const [absOld] of fileMap) handled.add(toPosix(relative(ROOT, absOld))); // 移動対象自身
    for (const rel of STAGE_F_FILES) if (planStageF(rel).changed) handled.add(rel);

    const unhandled = grepOut.filter((f) => !handled.has(f));
    console.log(`grepヒット総数: ${grepOut.length} / うち書き換え計画あり: ${grepOut.length - unhandled.length} / 未対応: ${unhandled.length}`);
    for (const f of unhandled) console.log(`  ${f}`);

    console.log('\n=== サマリ ===');
    console.log(`ファイル移動対象: ${fileMap.size}`);
    console.log(`JS書き換え箇所（移動分自身+engine/）: ${jsSelfEdits + engineEdits}`);
    console.log(`HTML書き換え箇所（移動分自身+不動）: ${htmlSelfEdits + staticHtmlEdits}`);
    console.log(`tests/**/*.ts 書き換え箇所: ${tsEdits}`);
    console.log(`Stage F 書き換えファイル数: ${stageFFiles}`);
    console.log(`未対応ファイル: ${unhandled.length}件（Phase 2/3で個別対応予定）`);
}

// ─── apply-moves / apply-rewrites ───────────────────────────────────────

const CHECKPOINT_PATH = process.env.MIGRATE_CHECKPOINT
    ?? '/tmp/claude-1000/-workspace/48011b4b-866f-481b-95c4-70a5e4a99ff9/scratchpad/migrate-roro-dissolve-filemap.json';

function persistFileMap(fileMap) {
    const obj = {};
    for (const [oldAbs, newAbs] of fileMap) obj[toPosix(relative(ROOT, oldAbs))] = toPosix(relative(ROOT, newAbs));
    writeFileSync(CHECKPOINT_PATH, JSON.stringify(obj, null, 2));
}

function loadFileMap() {
    if (!existsSync(CHECKPOINT_PATH)) {
        console.error(`チェックポイントが見つかりません: ${CHECKPOINT_PATH}\n先に --apply-moves を実行するか、既に --apply-rewrites 済みなら再実行しないこと。`);
        process.exit(1);
    }
    const obj = JSON.parse(readFileSync(CHECKPOINT_PATH, 'utf8'));
    const map = new Map();
    for (const [oldRel, newRel] of Object.entries(obj)) map.set(join(ROOT, oldRel), join(ROOT, newRel));
    return map;
}

function removeEmptyDirsRecursive(dir) {
    if (!existsSync(dir)) return;
    for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) removeEmptyDirsRecursive(p);
    }
    if (readdirSync(dir).length === 0) execFileSync('rmdir', [dir]);
}

function applyMoves() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);
    const coverage = verifyCoverage(fileMap);
    if (collisions.length > 0 || coverage.length > 0) {
        console.error(`✗ Stage A に問題があります（衝突${collisions.length}件・カバレッジ${coverage.length}件）。中止します。`);
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

    removeEmptyDirsRecursive(join(ROOT, 'roro'));
    console.log(`空ディレクトリ掃除後: roro/存在=${existsSync(join(ROOT, 'roro'))}`);
}

function applyRewrites() {
    const fileMap = loadFileMap();
    let jsEdits = 0, htmlEdits = 0, tsEdits = 0;

    // 1) 移動した.js自身
    for (const [oldAbs, newAbs] of movedJsEntries(fileMap)) {
        const plan = planJsRewrite(oldAbs, fileMap, newAbs);
        if (plan.edits.length === 0) continue;
        writeFileSync(newAbs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }
    // 2) engine/ 配下（util.js移動に伴う参照更新。自分自身は動かない）
    for (const abs of listEngineJsFiles()) {
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }
    // 3) 移動したHTML自身
    for (const [oldAbs, newAbs] of movedHtmlEntries(fileMap)) {
        const plan = planHtmlRewrite(oldAbs, fileMap, { readFromAbsOverride: newAbs });
        writeFileSync(newAbs, applyHtmlEdits(plan.code, plan.edits, plan.baseRemoval));
        htmlEdits += plan.edits.length;
    }
    // 4) 不動HTML
    for (const { path: p, baseOverrideAbs } of staticHtmlTargets()) {
        if (!existsSync(p)) continue;
        const plan = planHtmlRewrite(p, fileMap, { baseOverrideAbs });
        writeFileSync(p, applyHtmlEdits(plan.code, plan.edits, plan.baseRemoval));
        htmlEdits += plan.edits.length;
    }
    // 5) tests/**/*.ts
    function walkTs(dir, acc) {
        for (const name of readdirSync(dir)) {
            const p = join(dir, name);
            if (statSync(p).isDirectory()) { if (name !== 'node_modules') walkTs(p, acc); }
            else if (p.endsWith('.ts')) acc.push(p);
        }
        return acc;
    }
    for (const abs of walkTs(join(ROOT, 'tests'), [])) {
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        tsEdits += plan.edits.length;
    }

    // 6) Stage F: page.goto等の裸文字列リテラル
    let stageFFiles = 0;
    for (const rel of STAGE_F_FILES) {
        const plan = planStageF(rel);
        if (!plan.changed) continue;
        writeFileSync(plan.abs, plan.replaced);
        stageFFiles++;
    }

    console.log(`JS書き換え適用: ${jsEdits}箇所`);
    console.log(`HTML書き換え適用: ${htmlEdits}箇所`);
    console.log(`tests/**/*.ts 書き換え適用: ${tsEdits}箇所`);
    console.log(`Stage F 書き換え適用: ${stageFFiles}ファイル`);

    unlinkSync(CHECKPOINT_PATH);
    console.log('\nチェックポイントを削除した（再実行防止）。');
    console.log('残り: frame.jsのnav生成・engine/側3ファイルのkousinリンク（Phase 2・手動）、');
    console.log('CI/util/tests設定類（Phase 3・手動）は個別に対応すること。');
}

// ─── メイン ────────────────────────────────────────────────────────────

if (mode === '--report') report();
else if (mode === '--apply-moves') applyMoves();
else if (mode === '--apply-rewrites') applyRewrites();
else { console.error(`不明なモード: ${mode}`); process.exit(1); }
