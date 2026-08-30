#!/usr/bin/env node
/**
 * roro/m/js/ + ro4/m/js/ を engine/ へ統合する移行スクリプト（残件台帳 B-14）。
 *
 * 計画: /home/vscode/.claude/plans/lively-splashing-nygaard.md
 *
 * 中心となる不変条件: 全ての参照サイト r について、旧解決先 T_old に対し
 * 新しい参照の解決先 T_new が必ず map(T_old)（移動先マップ。対象外は恒等）と
 * 一致すること。import 指定子・HTML 属性のいずれもこの1つのアルゴリズムで扱う。
 *
 * JS の import/export specifier 抽出は ESLint の Linter API を AST 走査器として
 * 使う（tests/split-skill-by-job.mjs / split-cskillmanager.mjs と同じ手法。
 * 正規表現ではなくASTなので文字列リテラル中の偽陽性が起きない）。
 * .ts ファイルは espree が型注釈を解釈できないため、import 文の specifier 部分
 * だけを対象にした正規表現で扱う（型注釈自体を触らないため安全）。
 *
 * 使い方:
 *   node migrate-to-engine.mjs --report          何も書き込まず計画を報告する（既定）
 *   node migrate-to-engine.mjs --apply-moves      ファイル移動のみ実行する（内容は無変更。
 *                                                  git mvではなくfs.renameSync。Claudeのgit操作
 *                                                  制限のため。git add時にgitの類似度検出で
 *                                                  通常通りリネームとして記録される）
 *   node migrate-to-engine.mjs --apply-rewrites   移動後のファイルの中身を書き換える。
 *                                                  ⚠ べき等ではない。2回実行しないこと
 *                                                  （成功後にチェックポイントを削除して防止する）
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, resolve, sep, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { Linter } from 'eslint';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // ratorio/
const RORO_JS = join(ROOT, 'roro/m/js');
const RO4_JS = join(ROOT, 'ro4/m/js');
const ENGINE = join(ROOT, 'engine');

const mode = process.argv[2] || '--report';

function toPosix(p) {
    return p.split(sep).join('/');
}

// ─── Stage A: ファイルマップ構築 ──────────────────────────────────────────

const RENAME_OVERRIDES = new Map([
    [join(RORO_JS, 'saveload.js'), join(ENGINE, 'savedata-codec.js')],
    [join(RO4_JS, 'saveload.js'), join(ENGINE, 'saveload-mig.js')],
]);

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

function buildFileMap() {
    const map = new Map(); // absOld -> absNew
    for (const root of [RORO_JS, RO4_JS]) {
        for (const abs of listFilesRecursive(root)) {
            if (RENAME_OVERRIDES.has(abs)) {
                map.set(abs, RENAME_OVERRIDES.get(abs));
                continue;
            }
            const rel = relative(root, abs);
            map.set(abs, join(ENGINE, rel));
        }
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

/** 絶対パスを fileMap 経由で解決する（対象外は恒等）。 */
function mapAbs(fileMap, absPath) {
    return fileMap.has(absPath) ? fileMap.get(absPath) : absPath;
}

// ─── Stage B: JS import/export specifier の書き換え（ESLint AST） ────────

/** 相対 or 絶対（"/"始まり）の specifier のみを対象に、そのバイト範囲を集める。 */
function collectJsSpecifierRanges(code) {
    const linter = new Linter();
    const ranges = []; // {range:[start,end], value}
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
                CallExpression(node) {
                    // dynamicImport('/...') / vi.mock('/...') 等、この計画時点では
                    // engine内には無いことを確認済みだが、テストヘルパー等で
                    // 出てくる可能性があるため念のため拾っておく（Stage E で別途扱う）。
                },
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
 * 1本の .js ファイルについて、書き換え計画（オフセットスプライス列）を作る。
 *
 * @param absFilePath このファイル自身の「論理的な位置」（specifier解決の基準・
 *   fileMapでの新しい書き込み先の算出に使う）。移動対象ファイルなら旧パス。
 * @param fileMap 旧絶対パス→新絶対パスのマップ
 * @param readFromAbsOverride 内容を実際に読み込む場所（省略時は absFilePath と同じ）。
 *   物理的な移動（2a）が既に完了していて新しい場所に内容がある場合、ここに新パスを
 *   渡すことで「絶対パスの意味は旧位置基準のまま・読み込みだけ新位置」という分離ができる。
 *   ⚠ このスクリプトは一度の apply-rewrites 実行内でのみこの引数を使う設計。
 *   書き換え済みの内容に対して再度これを呼ぶと、既に新形式の specifier を
 *   旧位置基準で誤って再解決し内容を壊す（実際に一度事故ったので二度としないこと）。
 */
function planJsRewrite(absFilePath, fileMap, readFromAbsOverride) {
    const code = readFileSync(readFromAbsOverride ?? absFilePath, 'utf8');
    const ranges = collectJsSpecifierRanges(code);
    const edits = [];
    for (const { range, value } of ranges) {
        if (!value.startsWith('.')) continue; // "/"始まりの絶対specifierはengine内には無い（確認済み）
        const oldAbsTarget = resolve(dirname(absFilePath), value);
        // 拡張子解決（import './foo' が './foo.js' を指す等）は本コードベースに存在しないため考慮しない
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        const newFileDir = dirname(mapAbs(fileMap, absFilePath));
        let rel = toPosix(relative(newFileDir, newAbsTarget));
        if (!rel.startsWith('.')) rel = './' + rel;
        // ⚠ ここで「newAbsTarget === oldAbsTarget なら変更不要」と早期returnしてはいけない。
        // target 自体は動いていなくても、参照元ファイル（absFilePath）が移動していれば
        // 相対パスの深さは変わる（roro/common/js/util.js への64箇所のescape参照で実際に
        // 発生し、一度事故った）。「結果の文字列が変わらないか」だけを見て判定すること。
        if (rel === value) continue; // 変化なし（対象外 or 相対深さも一致）
        edits.push({ range, oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
    }
    return { absFilePath, code, edits };
}

function applyEdits(code, edits) {
    // range は [start, end)。降順に適用してオフセットのズレを防ぐ。
    let out = code;
    const sorted = [...edits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + JSON.stringify(e.newValue) + out.slice(e.range[1]);
    }
    return out;
}

// ─── Stage B2: .ts ファイル（正規表現。型注釈を espree が読めないため） ──

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
        if (newAbsTarget === oldAbsTarget) continue;
        let rel = toPosix(relative(dirname(absFilePath), newAbsTarget)); // .ts自体は移動しない
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

// ─── Stage C: HTML の書き換え（base href 対応・統一アルゴリズム） ───────

const URL_ATTRS = [
    ['script', 'src'], ['link', 'href'], ['a', 'href'], ['img', 'src'],
    ['iframe', 'src'], ['form', 'action'], ['source', 'src'],
];

function isSkippableUrl(v) {
    return /^([a-z][a-z0-9+.-]*:|\/|#)/i.test(v) || v === '';
}

function planHtmlRewrite(absHtmlPath, fileMap, { baseOverrideAbs } = {}) {
    const code = readFileSync(absHtmlPath, 'utf8');
    const htmlDir = dirname(absHtmlPath);

    const baseMatch = /<base\s+href="([^"]*)"\s*\/?>/i.exec(code);
    const baseAbs = baseOverrideAbs
        ?? (baseMatch ? resolve(htmlDir, baseMatch[1]) : htmlDir);

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
            const inMovedTree = oldAbsTarget.startsWith(RORO_JS + sep) || oldAbsTarget === RORO_JS
                || oldAbsTarget.startsWith(RO4_JS + sep) || oldAbsTarget === RO4_JS;
            // 「実在するか」に加え、「fileMap の旧キーとして知っている（＝2a で既に物理移動済みで
            // 現在は無いだけ）」も正当な既知ターゲットとして扱う。Stage C は2a実行後（2b時点）にも
            // 呼ばれるため、既存の existsSync 判定だけでは移動済みファイルを誤検出してしまう。
            const isKnown = existsSync(oldAbsTarget) || fileMap.has(oldAbsTarget);
            if (inMovedTree && !isKnown) {
                // 移動対象ツリー配下を指しているのに実体が無い＝本移行が把握し損ねている可能性
                edits.push({ range: [attrStart, attrEnd], oldValue: value, newValue: null, error: 'T_old not found (moved tree配下のはずが実体なし)', oldAbsTarget });
                continue;
            }
            if (!inMovedTree && !isKnown) {
                // 移動対象ツリー外の既存の壊れたリンク（例: 過去に削除された information/）。
                // 本移行のスコープ外なので、恒等写像のまま経路だけ再計算して温存する。
            }
            const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
            let rel = toPosix(relative(htmlDir, newAbsTarget));
            if (rel === '') rel = '.';
            if (!rel.startsWith('.') && !rel.startsWith('/')) rel = './' + rel;
            if (rel === value) continue; // 変化なし
            edits.push({ range: [attrStart, attrEnd], oldValue: value, newValue: rel, oldAbsTarget, newAbsTarget });
        }
    }

    let baseRemoval = null;
    if (baseMatch && !baseOverrideAbs) {
        baseRemoval = { index: baseMatch.index, length: baseMatch[0].length };
    }

    return { absHtmlPath, code, edits, baseRemoval, baseAbs };
}

function applyHtmlEdits(code, edits, baseRemoval) {
    let out = code;
    const validEdits = edits.filter((e) => e.newValue !== null);
    const sorted = [...validEdits].sort((a, b) => b.range[0] - a.range[0]);
    for (const e of sorted) {
        out = out.slice(0, e.range[0]) + e.newValue + out.slice(e.range[1]);
    }
    if (baseRemoval) {
        // <base ...> を含む行ごと削除する
        const lines = out.split('\n');
        out = lines.filter((l) => !/<base\s+href=/i.test(l)).join('\n');
    }
    return out;
}

/**
 * calcx.html のscriptタグを起点に、実際にロードされる .js の絶対パス集合を
 * import グラフの推移的到達可能性として計算する（script タグに無くても
 * import で辿り着くファイルは「ブラウザが実際にロードしうる」ため、
 * 動的import文字列の照合対象は script タグの直接列挙だけでは不十分）。
 */
function computeReachableFromHtml(absHtmlPath) {
    const code = readFileSync(absHtmlPath, 'utf8');
    const htmlDir = dirname(absHtmlPath);
    const baseMatch = /<base\s+href="([^"]*)"\s*\/?>/i.exec(code);
    const baseAbs = baseMatch ? resolve(htmlDir, baseMatch[1]) : htmlDir;
    const entries = [...code.matchAll(/<script[^>]*\bsrc="([^"]*)"/gi)]
        .map((m) => m[1])
        .filter((s) => !isSkippableUrl(s) && s.endsWith('.js'))
        .map((s) => resolve(baseAbs, s))
        .filter((p) => existsSync(p));

    const seen = new Set();
    const queue = [...entries];
    while (queue.length) {
        const abs = queue.shift();
        if (seen.has(abs)) continue;
        seen.add(abs);
        if (!existsSync(abs)) continue;
        let code2;
        try { code2 = readFileSync(abs, 'utf8'); } catch { continue; }
        let ranges;
        try { ranges = collectJsSpecifierRanges(code2); } catch { continue; }
        for (const { value } of ranges) {
            if (!value.startsWith('.')) continue;
            const target = resolve(dirname(abs), value);
            if (!seen.has(target)) queue.push(target);
        }
    }
    return seen;
}

// ─── Stage E: Category E（動的import文字列）の逆算チェック ──────────────

const CATEGORY_E_FILES = [
    { file: 'tests/helpers/objid-snapshot.ts', literalsHint: 'STATE_MODULE_PATHS (10)' },
    { file: 'tests/integration/skill-data-sweep.test.ts', literalsHint: '4件' },
    { file: 'tests/integration/calc-headless.test.ts', literalsHint: '3件' },
    { file: 'tests/integration/saveimage-output.test.ts', literalsHint: '3件' },
    { file: 'tests/integration/skill-formula-sweep.test.ts', literalsHint: '2件' },
    { file: 'tests/integration/calcx.test.ts', literalsHint: '1件' },
    { file: 'tests/integration/test-oracle-helpers.test.ts', literalsHint: 'snapshotキー文字列1件' },
];

// dynamicImport('/...') ラッパー呼び出しと、page.evaluate 外で直接 import('/...') する
// 素の動的import式の両方を拾う（skill-data-sweep.test.ts/skill-formula-sweep.test.ts は
// 後者。「/」始まりのルート相対文字列であることが通常の相対importとの判別点）。
const DYNAMIC_IMPORT_STRING_RE = /(?:dynamicImport|import)\(\s*(['"])(\/[^'"]+)\1\s*\)/g;
const SNAPSHOT_KEY_RE = /(['"])(\/(?:roro|ro4)\/m\/js\/[^'"#]+)#([^'"]+)\1/g;
// STATE_MODULE_PATHS のような "ルート相対文字列だけの配列リテラル" パターン
// （dynamicImport(...)の引数に直接書かれていない文字列群）。
const ROOT_REL_ARRAY_ITEM_RE = /^\s*(['"])(\/(?:roro|ro4)\/m\/js\/[^'"]+)\1\s*,?\s*(?:\/\/.*)?$/;

function findCategoryELiterals(absFilePath) {
    if (!existsSync(absFilePath)) return [];
    const code = readFileSync(absFilePath, 'utf8');
    const found = [];
    let m;
    DYNAMIC_IMPORT_STRING_RE.lastIndex = 0;
    while ((m = DYNAMIC_IMPORT_STRING_RE.exec(code))) {
        found.push({ kind: 'dynamicImport', literal: m[2], index: m.index });
    }
    SNAPSHOT_KEY_RE.lastIndex = 0;
    while ((m = SNAPSHOT_KEY_RE.exec(code))) {
        found.push({ kind: 'snapshotKey', literal: m[2], exportName: m[3], index: m.index });
    }
    // 配列リテラル内の行単位の文字列（dynamicImport/importの直接引数ではないもの）
    for (const line of code.split('\n')) {
        const am = ROOT_REL_ARRAY_ITEM_RE.exec(line);
        if (am && !found.some((f) => f.literal === am[2])) {
            found.push({ kind: 'arrayLiteral', literal: am[2], index: -1 });
        }
    }
    return found;
}

/** "/roro/m/js/X.js" のようなルート相対文字列を、fileMap で書き換えた後の値へ変換する。 */
function mapRootRelative(fileMap, literal) {
    const abs = join(ROOT, literal.replace(/^\//, ''));
    const newAbs = mapAbs(fileMap, abs);
    return '/' + toPosix(relative(ROOT, newAbs));
}

// ─── レポート ──────────────────────────────────────────────────────────

function report() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);

    console.log('=== Stage A: ファイルマップ ===');
    console.log(`roro/m/js 由来: ${[...fileMap.keys()].filter((k) => k.startsWith(RORO_JS)).length}`);
    console.log(`ro4/m/js 由来: ${[...fileMap.keys()].filter((k) => k.startsWith(RO4_JS)).length}`);
    console.log(`合計: ${fileMap.size}`);
    console.log(`衝突: ${collisions.length}`);
    for (const [a, b, t] of collisions) {
        console.log(`  ✗ ${relative(ROOT, a)} と ${relative(ROOT, b)} が両方 ${relative(ROOT, t)} へ`);
    }
    console.log(`特別リネーム: ${[...RENAME_OVERRIDES.entries()].map(([o, n]) => `${relative(ROOT, o)} → ${relative(ROOT, n)}`).join(' / ')}`);

    if (collisions.length > 0) {
        console.error('\n✗ 衝突が解消されていません。処理を中止します。');
        process.exit(1);
    }

    console.log('\n=== Stage B: 移動対象 .js の import/export 書き換え計画 ===');
    let totalJsEdits = 0;
    let filesWithEdits = 0;
    const escapes = new Map(); // 移動対象外への参照先 -> 件数
    for (const absOld of fileMap.keys()) {
        const plan = planJsRewrite(absOld, fileMap);
        if (plan.edits.length > 0) {
            filesWithEdits++;
            totalJsEdits += plan.edits.length;
        }
        // engine 外への escape を集計（roro/common/js 等）
        for (const { range, value } of collectJsSpecifierRanges(plan.code)) {
            if (!value.startsWith('.')) continue;
            const oldAbsTarget = resolve(dirname(absOld), value);
            if (!fileMap.has(oldAbsTarget) && existsSync(oldAbsTarget)) {
                const key = toPosix(relative(ROOT, oldAbsTarget));
                escapes.set(key, (escapes.get(key) || 0) + 1);
            }
        }
    }
    console.log(`書き換えが必要なファイル: ${filesWithEdits} / ${fileMap.size}`);
    console.log(`書き換え箇所の合計: ${totalJsEdits}`);
    console.log(`engine/ 外へのエスケープ先（distinct）: ${escapes.size}`);
    const escapeTotal = [...escapes.values()].reduce((a, b) => a + b, 0);
    console.log(`エスケープ参照の合計件数: ${escapeTotal}`);
    const topEscapes = [...escapes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 10);
    for (const [k, n] of topEscapes) console.log(`  ${k}: ${n}件`);

    console.log('\n=== Stage B (roro/other/js): 外部消費者ファイルの書き換え計画 ===');
    const otherJsDir = join(ROOT, 'roro/other/js');
    let otherEdits = 0;
    for (const f of existsSync(otherJsDir) ? readdirSync(otherJsDir) : []) {
        const abs = join(otherJsDir, f);
        if (!abs.endsWith('.js')) continue;
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件`);
            otherEdits += plan.edits.length;
        }
    }
    console.log(`合計: ${otherEdits}件`);

    console.log('\n=== Stage B2: workspace/src/*.ts の書き換え計画 ===');
    const wsSrcDir = join(ROOT, 'workspace/src');
    let tsEdits = 0;
    for (const f of existsSync(wsSrcDir) ? readdirSync(wsSrcDir) : []) {
        const abs = join(wsSrcDir, f);
        if (!abs.endsWith('.ts')) continue;
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, abs))}: ${plan.edits.length}件 (${plan.edits.map((e) => `${e.oldValue} → ${e.newValue}`).join(', ')})`);
            tsEdits += plan.edits.length;
        }
    }
    const startupTest = join(ROOT, 'workspace/__tests__/src/startup.test.ts');
    if (existsSync(startupTest)) {
        const plan = planTsRewrite(startupTest, fileMap);
        if (plan.edits.length > 0) {
            console.log(`  ${toPosix(relative(ROOT, startupTest))}: ${plan.edits.length}件`);
            tsEdits += plan.edits.length;
        }
    }
    console.log(`合計: ${tsEdits}件`);

    console.log('\n=== Stage C: HTML の書き換え計画 ===');
    const htmlTargets = [
        { path: join(ROOT, 'ro4/m/calcx.html') },
        { path: join(ROOT, 'ro4/m/calcx-ai.html') },
        ...readdirSync(join(ROOT, 'roro/other')).filter((f) => f.endsWith('.html')).map((f) => ({ path: join(ROOT, 'roro/other', f) })),
        { path: join(ROOT, 'util/sortedEnchantCardIdArray.html'), baseOverrideAbs: ROOT },
    ];
    let totalHtmlEdits = 0;
    let unresolvable = 0;
    for (const { path: p, baseOverrideAbs } of htmlTargets) {
        if (!existsSync(p)) continue;
        const plan = planHtmlRewrite(p, fileMap, { baseOverrideAbs });
        const errs = plan.edits.filter((e) => e.newValue === null);
        const ok = plan.edits.filter((e) => e.newValue !== null);
        totalHtmlEdits += ok.length;
        unresolvable += errs.length;
        console.log(`  ${toPosix(relative(ROOT, p))}: ${ok.length}件書き換え${plan.baseRemoval ? ' + <base>削除' : ''}${errs.length ? ` / ✗未解決${errs.length}件` : ''}`);
        for (const e of errs) console.log(`    ✗ ${e.oldValue} が解決できません（${e.error}）`);
    }
    console.log(`書き換え合計: ${totalHtmlEdits}件 / 未解決: ${unresolvable}件`);

    console.log('\n=== Stage E: Category E（動的import文字列）の逆算チェック ===');
    // 判定すべき本当の不変条件は「script タグに直接あるか」ではなく「ブラウザが
    // 実際にこの絶対URLでこのモジュールをロードしうるか」（script タグ起点の
    // import グラフの推移的到達可能性）。calcx.html の推移的到達可能集合を
    // 旧パスで計算し、fileMap で新パスへ写像してから照合する。
    const reachableOld = computeReachableFromHtml(join(ROOT, 'ro4/m/calcx.html'));
    const reachableNewRootRel = new Set(
        [...reachableOld].map((abs) => '/' + toPosix(relative(ROOT, mapAbs(fileMap, abs))))
    );

    let categoryETotal = 0;
    let categoryEOk = 0;
    for (const { file } of CATEGORY_E_FILES) {
        const abs = join(ROOT, file);
        const literals = findCategoryELiterals(abs);
        for (const lit of literals) {
            categoryETotal++;
            const mapped = mapRootRelative(fileMap, lit.literal);
            const inGraph = reachableNewRootRel.has(mapped);
            if (inGraph) categoryEOk++;
            console.log(`  ${file} [${lit.kind}] ${lit.literal} → ${mapped} ${inGraph ? '(到達可能・一致)' : '(⚠ importグラフから到達不可。個別確認が必要)'}`);
        }
    }
    console.log(`Category E 合計: ${categoryETotal}件 / import到達可能集合と一致: ${categoryEOk}件`);
    console.log(`（calcx.html起点の推移的到達可能ファイル数: ${reachableOld.size}）`);

    console.log('\n=== 未対応ファイル: このスクリプトが現時点で一切書き換え計画を持たないファイル ===');
    console.log('（Stage B/B2/C で1箇所でも書き換え計画があるファイルは除外。全く手当てが無いものだけを表示。');
    console.log(' Phase 3/4で個別対応予定のutil/*.py・tests/*.mjsの定数・READMEプロース等が主だが、');
    console.log(' もし想定外のコード消費者が混ざっていれば、ここでStage B/Cの対象漏れとして検出できる）');
    const grepOut = execFileSync('grep', [
        '-rln', '--include=*.js', '--include=*.ts', '--include=*.py', '--include=*.html', '--include=*.yml',
        'roro/m/js\\|ro4/m/js',
        '.',
    ], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).map((f) => f.replace(/^\.\//, ''));

    // Stage B/B2/C で >=1 件の書き換え計画を持つファイルの集合（= 対象漏れではない）
    const handled = new Set();
    for (const absOld of fileMap.keys()) {
        if (planJsRewrite(absOld, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, absOld)));
    }
    for (const f of existsSync(otherJsDir) ? readdirSync(otherJsDir) : []) {
        const abs = join(otherJsDir, f);
        if (abs.endsWith('.js') && planJsRewrite(abs, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, abs)));
    }
    for (const f of existsSync(wsSrcDir) ? readdirSync(wsSrcDir) : []) {
        const abs = join(wsSrcDir, f);
        if (abs.endsWith('.ts') && planTsRewrite(abs, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, abs)));
    }
    if (existsSync(startupTest) && planTsRewrite(startupTest, fileMap).edits.length > 0) handled.add(toPosix(relative(ROOT, startupTest)));
    for (const { path: p, baseOverrideAbs: bo } of htmlTargets) {
        if (existsSync(p) && planHtmlRewrite(p, fileMap, { baseOverrideAbs: bo }).edits.some((e) => e.newValue !== null)) {
            handled.add(toPosix(relative(ROOT, p)));
        }
    }
    // 移動対象そのもの（旧パス）も「移動で消える」という意味で対応済み扱いにする
    for (const absOld of fileMap.keys()) handled.add(toPosix(relative(ROOT, absOld)));
    // Stage E（Category E）で計画済みのファイルも対応済み扱いにする
    for (const { file } of CATEGORY_E_FILES) handled.add(file);

    const unhandled = grepOut.filter((f) => !handled.has(f));
    console.log(`grepヒット総数: ${grepOut.length} / うち書き換え計画あり: ${grepOut.length - unhandled.length} / 未対応: ${unhandled.length}`);
    for (const f of unhandled) console.log(`  ${f}`);

    console.log('\n=== サマリ ===');
    console.log(`ファイル移動対象: ${fileMap.size}`);
    console.log(`JS書き換え箇所: ${totalJsEdits + otherEdits + tsEdits}`);
    console.log(`HTML書き換え箇所: ${totalHtmlEdits}`);
    console.log(`Category E: ${categoryETotal}件中${categoryEOk}件一致`);
    console.log(`未対応ファイル: ${unhandled.length}件（Phase 3/4で個別対応予定。想定外の混入が無いか要確認）`);
}

// ─── apply-moves / apply-rewrites ───────────────────────────────────────
//
// 2a（apply-moves）と2b（apply-rewrites）を別コミットにするため、2aで計算した
// fileMap を一時ファイルへ永続化し、2bで読み戻す（2a実行後は roro/m/js・ro4/m/js が
// 空になり、再列挙では復元できないため）。
//
// ⚠ apply-rewrites は一度しか安全に実行できない（べき等ではない）。2回目を実行すると、
// 既に新形式へ書き換え済みの specifier を「まだ旧形式である」前提で誤って再解決し、
// 内容を壊す（実際に一度事故った）。そのため成功後にチェックポイントを削除し、
// 2回目の実行を明示的なエラーで止める。

const CHECKPOINT_PATH = process.env.MIGRATE_CHECKPOINT
    ?? '/tmp/claude-1000/-workspace/48011b4b-866f-481b-95c4-70a5e4a99ff9/scratchpad/migrate-to-engine-filemap.json';

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
            '先に --apply-moves を実行するか（初回）、既に --apply-rewrites 済みなら再実行しないこと' +
            '（べき等ではないため2回目は内容を壊す）。');
        process.exit(1);
    }
    const obj = JSON.parse(readFileSync(CHECKPOINT_PATH, 'utf8'));
    const map = new Map();
    for (const [oldRel, newRel] of Object.entries(obj)) {
        map.set(join(ROOT, oldRel), join(ROOT, newRel));
    }
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

    removeEmptyDirsRecursive(RORO_JS);
    removeEmptyDirsRecursive(RO4_JS);
    console.log(`空ディレクトリ掃除後: roro/m/js存在=${existsSync(RORO_JS)} / ro4/m/js存在=${existsSync(RO4_JS)}`);
}

function applyRewrites() {
    const fileMap = loadFileMap();
    let jsEdits = 0;
    let htmlEdits = 0;

    // 1) 移動済みファイル自身のimport書き換え（内容は新パスから読む・旧パス基準で解決）
    for (const [oldAbs, newAbs] of fileMap) {
        const plan = planJsRewrite(oldAbs, fileMap, newAbs);
        if (plan.edits.length === 0) continue;
        writeFileSync(newAbs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 2) 外部消費者 .js（roro/other/js、移動しない）
    const otherJsDir = join(ROOT, 'roro/other/js');
    for (const f of existsSync(otherJsDir) ? readdirSync(otherJsDir) : []) {
        const abs = join(otherJsDir, f);
        if (!abs.endsWith('.js')) continue;
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 3) workspace/src/*.ts + startup.test.ts（移動しない、正規表現ベース）
    const wsSrcDir = join(ROOT, 'workspace/src');
    for (const f of existsSync(wsSrcDir) ? readdirSync(wsSrcDir) : []) {
        const abs = join(wsSrcDir, f);
        if (!abs.endsWith('.ts')) continue;
        const plan = planTsRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }
    const startupTest = join(ROOT, 'workspace/__tests__/src/startup.test.ts');
    if (existsSync(startupTest)) {
        const plan = planTsRewrite(startupTest, fileMap);
        if (plan.edits.length > 0) {
            writeFileSync(startupTest, applyRawEdits(plan.code, plan.edits));
            jsEdits += plan.edits.length;
        }
    }

    // 4) HTML
    const htmlTargets = [
        { path: join(ROOT, 'ro4/m/calcx.html') },
        { path: join(ROOT, 'ro4/m/calcx-ai.html') },
        ...readdirSync(join(ROOT, 'roro/other')).filter((f) => f.endsWith('.html')).map((f) => ({ path: join(ROOT, 'roro/other', f) })),
        { path: join(ROOT, 'util/sortedEnchantCardIdArray.html'), baseOverrideAbs: ROOT },
    ];
    for (const { path: p, baseOverrideAbs } of htmlTargets) {
        if (!existsSync(p)) continue;
        const plan = planHtmlRewrite(p, fileMap, { baseOverrideAbs });
        const errs = plan.edits.filter((e) => e.newValue === null);
        if (errs.length > 0) {
            console.error(`✗ ${toPosix(relative(ROOT, p))}: 未解決参照${errs.length}件。中止します。`);
            for (const e of errs) console.error(`  ${e.oldValue}: ${e.error}`);
            process.exit(1);
        }
        writeFileSync(p, applyHtmlEdits(plan.code, plan.edits, plan.baseRemoval));
        htmlEdits += plan.edits.filter((e) => e.newValue !== null).length;
    }

    // 5) Category E（動的import文字列・snapshotキー文字列）。通常のimport文ではなく
    // 実行時に組み立てられる文字列なので、Stage B/CのAST/正規表現走査では拾えない。
    // 各リテラルはファイル内で意味が一意な絶対パスなので単純な文字列置換で安全。
    let categoryEApplied = 0;
    for (const { file } of CATEGORY_E_FILES) {
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
    console.log(`Category E書き換え適用: ${categoryEApplied}箇所`);

    // べき等ではないため、成功したらチェックポイントを消して2回目の誤実行を防ぐ。
    unlinkSync(CHECKPOINT_PATH);
    console.log('\nチェックポイントを削除した（再実行防止）。');
    console.log('残り: tests/vitest.config.ts等のエイリアス統合・scan-undeclared/gen-depsの');
    console.log('スキャンルート更新・deploy_to_staging.ymlのmvリスト等は個別に手動対応すること。');
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
