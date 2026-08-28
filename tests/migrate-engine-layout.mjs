#!/usr/bin/env node
/**
 * engine/ トップレベル139ファイルをドメイン別サブディレクトリへ再配置する移行スクリプト
 * （残件台帳 B-19）。
 *
 * 計画: /home/vscode/.claude/plans/backlog-md-b-19-goofy-journal.md
 * 分類表（一次情報）: .claude/context/b19-classification-phase0.md
 *
 * tests/migrate-to-engine.mjs（B-14）を土台にしている。中心となる不変条件は同じ:
 * 全ての参照サイト r について、旧解決先 T_old に対し新しい参照の解決先 T_new が
 * 必ず map(T_old)（移動先マップ。対象外は恒等）と一致すること。
 *
 * B-14との違い:
 *   - 移動元・移動先とも同じ engine/ 配下（2ルート間の移動ではない）
 *   - const/ data/ savedata/ skill/ の既存ファイル（bystander）も、移動対象への
 *     相対importを持つため書き換え走査の対象に含める（B-14には無かったケース）
 *   - skill/ savedata/ バケットは新設ではなく既存ディレクトリへの合流
 *   - tests/**\/*.ts の `@engine/X.js` エイリアス指定子（196箇所）はB-14の対象に無かった
 *     新パターンなので Stage D として追加した（bare specifier・相対パスではないため
 *     ESLint AST走査のcollectJsSpecifierRangesでは拾えない。正規表現で個別に扱う）
 *   - *.dat.js/*.h.js 34件 + etc.js は残件台帳 B-25 として据え置き・対象外
 *     （fileMapに含めない＝恒等写像のまま。util/item-card-enchant/*.py が
 *     これらのパスを直接読むため、動かすと生成パイプラインとの整合が壊れる）
 *
 * 使い方:
 *   node migrate-engine-layout.mjs --report          何も書き込まず計画を報告する（既定）
 *   node migrate-engine-layout.mjs --apply-moves      ファイル移動のみ実行する（内容は無変更）
 *   node migrate-engine-layout.mjs --apply-rewrites   移動後のファイルの中身を書き換える。
 *                                                      ⚠ べき等ではない。2回実行しないこと
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync, renameSync, unlinkSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { Linter } from 'eslint';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = resolve(__dirname, '..'); // ratorio/
const ENGINE = join(ROOT, 'engine');
const TESTS_DIR = join(ROOT, 'tests');
const PAGES_DIR = join(ROOT, 'pages');
const WS_SRC_DIR = join(ROOT, 'workspace/src');

const mode = process.argv[2] || '--report';

function toPosix(p) {
    return p.split(sep).join('/');
}

// ─── Stage A: バケット割当（.claude/context/b19-classification-phase0.md §3 が一次情報） ──

const BUCKETS = {
    'ui': [
        'BuffGuildAndGospel.js', 'BuffItemAndFood.js', 'BuffJobSpecificSelf.js', 'BuffOtherCategory.js',
        'CConfBase.js', 'CConfBase2.js', 'CExtraInfoAreaComponentManager.js',
        'CExtraInfoAreaComponentManagerCalc.js', 'CExtraInfoDataBridge.js',
        'CFloatingInfoAreaComponentManager.js', 'CModalWindow.js', 'CReceivedDamageConfManager.js',
        'calchistory.js', 'etc.js', 'eventsetup.js', 'saveimage.js',
    ],
    'battle': [
        'CAttackMethodAreaComponentManager.js', 'CAttackMethodConf.js', 'CAttackMethodDataBridge.js',
        'CBattleCalcInfo.js', 'CBattleCalcResult.js', 'CBattleCalcResultAll.js',
        'CBattleQuickControlAreaComponentManager.js', 'battle-element.js', 'castsim.js',
        'head-battle-result-html.js', 'head-calc-state.js', 'head-received-damage.js',
        'head-skill-formula-magical.js', 'head-skill-formula-physical.js', 'head-skill-formula-special.js',
        'head-skill-ratio-magical.js', 'head-skill-ratio-physical.js', 'head-specialize-monster.js',
        'head-sub-name.js', 'head.js', 'quickcontrol.js',
    ],
    'chara': [
        'CCharaConfCustomAtk.js', 'CCharaConfCustomDef.js', 'CCharaConfCustomSkill.js',
        'CCharaConfCustomSpecStatus.js', 'CCharaConfCustomStatus.js', 'CCharaConfDebuff.js',
        'CCharaConfIchizi.js', 'CCharaConfNizi.js', 'CCharaConfSanzi.js', 'CCharaConfYozi.js',
        'CNameKana.js', 'chara.js', 'hmchara.js', 'hmjob.js',
    ],
    'monster': [
        'CCustomSelectBase.js', 'CCustomSelectMapBase.js', 'CCustomSelectMapCategory.js',
        'CCustomSelectMapMap.js', 'CCustomSelectMapMonster.js', 'CMobConfInput.js',
        'CMonsterMapAreaComponentManager.js', 'hmmob.js', 'mob.js', 'mobconfbuf.js',
        'mobconfdebuf.js', 'mobconfplayer.js',
    ],
    'equip': [
        'CEnchSearch.js', 'CItemInfoManager.js', 'CShadowEquipController.js',
        'CShadowEquipControllerDataBridge.js', 'CTimeItemAreaComponentManager.js',
        'CTimeItemDataBridge.js', 'equip-name.js', 'equip.js', 'hmcard.js', 'hmcostume.js',
        'hmrndopt.js', 'rndench.js', 'slotpager-const.js', 'slotpager.js',
    ],
    'runtime': [
        'CInstanceManager.js', 'calc-headless.js', 'calc-invalidation.js', 'calc-model.js',
        'common.js', 'engine-registry.d.ts', 'engine-registry.js', 'global.js',
        'ro4-state.js', 'roro-state.js', 'util.js',
    ],
    // ⚠ 新設ではなく既存 engine/savedata/（39ファイル）への合流。basename衝突なしを確認済み
    'savedata': [
        'CSaveController.js', 'CSaveDataConverter.js', 'CSaveDataManager.js',
        'CSaveDataMappingManager.js', 'savedata-codec.js', 'saveload-mig.js',
    ],
    // ⚠ 新設ではなく既存 engine/skill/（77ファイル・13職業系統ディレクトリ）への合流。
    // engine/skill/ は現状ディレクトリのみでトップレベルにファイルが無いため衝突なし
    'skill': [
        'CSkillData.js', 'CSkillManager.js', 'autospell.dat.js', 'autospell.h.js',
        'calcautospell.js', 'learnedskill.js', 'skill.dat.js', 'skill.h.js', 'skillstate.js',
        'usableskill.dat.js', 'usableskill.h.js',
    ],
    'bridge': [
        'chara-search-bridge.js', 'equip-bridge.js', 'foot-bridge.js', 'head-bridge.js',
        'hmjob-bridge.js', 'itemset-bridge.js', 'saveload-bridge.js', 'skill-search-bridge.js',
    ],
    'status': [
        'foot-aspd.js', 'foot-avoid-flee.js', 'foot-cast-delay.js', 'foot-critical.js',
        'foot-equipped-sp.js', 'foot-resist-heal.js', 'foot-skill-cast-param.js', 'foot-skill-cool.js',
        'foot-skill-cost.js', 'foot-sp-cost-reduction.js', 'foot-stallcalc-atk-base.js',
        'foot-stallcalc-boss-def-ignore.js', 'foot-stallcalc-crit-matk.js', 'foot-stallcalc-def.js',
        'foot-stallcalc-elem-size-longrange-resist.js', 'foot-stallcalc-elemental-magic-dmg.js',
        'foot-stallcalc-exp-reflect-atk-size.js', 'foot-stallcalc-guaranteed-hit.js',
        'foot-stallcalc-hydrate.js', 'foot-stallcalc-magic-dmg-aspd.js',
        'foot-stallcalc-magic-dmg-monster.js', 'foot-stallcalc-magic-dmg-player.js',
        'foot-stallcalc-maxhp-maxsp.js', 'foot-stallcalc-mdef-elem-dmg.js', 'foot-stallcalc-mdef-hit.js',
        'foot-stallcalc-motion-hp-sp.js', 'foot-stallcalc-phys-dmg-elem-boss.js',
        'foot-stallcalc-phys-dmg-general.js', 'foot-stallcalc-phys-dmg-player.js',
        'foot-stallcalc-phys-dmg-size-range.js', 'foot-stallcalc-player-race-resist.js',
        'foot-stplus-calc.js', 'foot.js',
    ],
};

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
    for (const [bucket, files] of Object.entries(BUCKETS)) {
        for (const basename of files) {
            const oldAbs = join(ENGINE, basename);
            if (!existsSync(oldAbs)) {
                console.error(`✗ 分類表のファイルが存在しません: engine/${basename}`);
                process.exit(1);
            }
            map.set(oldAbs, join(ENGINE, bucket, basename));
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
    // 既存ディレクトリ（skill/ savedata/）への合流先に、移動対象外の同名ファイルが
    // 既に存在しないかも確認する（basename衝突の安全網）
    for (const [, newP] of fileMap) {
        if (existsSync(newP) && !fileMap.has(newP)) {
            collisions.push(['(既存ファイル)', newP, newP]);
        }
    }
    return collisions;
}

/** 絶対パスを fileMap 経由で解決する（対象外は恒等）。 */
function mapAbs(fileMap, absPath) {
    return fileMap.has(absPath) ? fileMap.get(absPath) : absPath;
}

// ─── Stage B: JS import/export specifier の書き換え（ESLint AST。B-14と同一実装） ──

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
 * 1本の .js ファイルについて書き換え計画を作る。B-14と同じ関数（B-19では
 * 「移動対象自身」「const/data/savedata/skill/*.js等のbystander」「35件の
 * 据え置きdat/h/etc.jsファイル」の3種すべてにこの同じ関数を使う。
 * 移動しないファイルは fileMap にキーが無いため mapAbs が恒等となり、
 * 自然に「自身の位置は変わらない」計算になる。
 */
function planJsRewrite(absFilePath, fileMap, readFromAbsOverride) {
    const code = readFileSync(readFromAbsOverride ?? absFilePath, 'utf8');
    const ranges = collectJsSpecifierRanges(code);
    const edits = [];
    for (const { range, value } of ranges) {
        if (!value.startsWith('.')) continue; // "/"始まりの絶対specifierはengine内には無い
        const oldAbsTarget = resolve(dirname(absFilePath), value);
        const newAbsTarget = mapAbs(fileMap, oldAbsTarget);
        const newFileDir = dirname(mapAbs(fileMap, absFilePath));
        let rel = toPosix(relative(newFileDir, newAbsTarget));
        if (!rel.startsWith('.')) rel = './' + rel;
        if (rel === value) continue; // 変化なし
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

// ─── Stage B2: .ts ファイル（正規表現。espreeが型注釈を読めないため。B-14と同一） ──

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

// ─── Stage C: HTML の書き換え（B-14と同一。<base href>は今回対象HTML群に無い） ──

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

// ─── Stage D（新規）: tests/**/*.ts の `@engine/X.js` バレスペシファイア書き換え ──
//
// vitest.config.ts の `@engine` エイリアスは `../engine` を指すまま変わらないが、
// `@engine/CFoo.js` のように具体的なファイルを指す文字列自体は、そのファイルが
// サブディレクトリへ移動すれば `@engine/battle/CFoo.js` のように変わる必要がある。
// これは相対specifierでもimport文の中の静的文字列でもない（bare specifier）ため
// collectJsSpecifierRangesのAST走査では拾えず、独立した正規表現で扱う。

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
    for (const sub of ['roro', 'ro4', 'integration', 'helpers']) {
        const d = join(TESTS_DIR, sub);
        if (!existsSync(d)) continue;
        for (const f of readdirSync(d)) {
            if (f.endsWith('.ts')) out.push(join(d, f));
        }
    }
    return out;
}

// ─── Stage E: Category E（動的import文字列・snapshotキー文字列。B-14と同じ仕組み・
// プレフィックスだけ /(roro|ro4)/m/js/ → /engine/ へ変更） ────────────────

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
        if (!m[2].startsWith('/engine/')) continue; // engine外のroot相対（今回は無いはずだが念のため）
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

function report() {
    const fileMap = buildFileMap();
    const collisions = checkCollisions(fileMap);

    console.log('=== Stage A: ファイルマップ ===');
    console.log(`移動対象: ${fileMap.size}件（B-25据え置き35件は対象外）`);
    for (const bucket of Object.keys(BUCKETS)) {
        console.log(`  engine/${bucket}/: ${BUCKETS[bucket].length}件`);
    }
    console.log(`衝突: ${collisions.length}`);
    for (const [a, b, t] of collisions) {
        console.log(`  ✗ ${a === '(既存ファイル)' ? a : relative(ROOT, a)} と ${relative(ROOT, b)} が両方 ${relative(ROOT, t)} へ`);
    }
    if (collisions.length > 0) {
        console.error('\n✗ 衝突が解消されていません。処理を中止します。');
        process.exit(1);
    }

    console.log('\n=== Stage B: engine/ 配下 .js 全ファイルの書き換え計画（移動対象+bystander） ===');
    const allEngineJs = listFilesRecursive(ENGINE).filter((p) => p.endsWith('.js'));
    let totalJsEdits = 0;
    let filesWithEdits = 0;
    for (const abs of allEngineJs) {
        // --report時点ではファイルはまだ物理移動していないため、内容は常に現在地(abs)から
        // 読む。移動先の相対パス計算はfileMap経由で行われるのでreadFromOverrideは不要
        // （apply-rewrites時にのみ、移動後の新パスから読む必要がある）。
        const plan = planJsRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            filesWithEdits++;
            totalJsEdits += plan.edits.length;
        }
    }
    console.log(`走査対象: ${allEngineJs.length}件（移動139 + bystander ${allEngineJs.length - fileMap.size}）`);
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
    const wsTargets = existsSync(WS_SRC_DIR)
        ? readdirSync(WS_SRC_DIR).filter((f) => f.endsWith('.ts')).map((f) => join(WS_SRC_DIR, f))
        : [];
    const startupTest = join(ROOT, 'workspace/__tests__/src/startup.test.ts');
    if (existsSync(startupTest)) wsTargets.push(startupTest);
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
        console.log(`  ${toPosix(relative(ROOT, p))}: ${plan.edits.length}件書き換え`);
    }
    console.log(`書き換え合計: ${totalHtmlEdits}件`);

    console.log('\n=== Stage D: tests/**/*.ts の @engine/ エイリアス書き換え計画 ===');
    let aliasEdits = 0;
    let aliasFiles = 0;
    for (const abs of tsTestTargets()) {
        const plan = planEngineAliasRewrite(abs, fileMap);
        if (plan.edits.length > 0) {
            aliasFiles++;
            aliasEdits += plan.edits.length;
        }
    }
    console.log(`走査対象: ${tsTestTargets().length}ファイル`);
    console.log(`書き換えが必要なファイル: ${aliasFiles}`);
    console.log(`書き換え箇所の合計: ${aliasEdits}`);

    console.log('\n=== Stage E: Category E（動的import文字列・snapshotキー）===');
    let categoryETotal = 0;
    let categoryEChanged = 0;
    for (const file of CATEGORY_E_FILES) {
        const abs = join(ROOT, file);
        const literals = findCategoryELiterals(abs);
        for (const lit of literals) {
            categoryETotal++;
            const mapped = mapRootRelative(fileMap, lit.literal);
            const changed = mapped !== lit.literal;
            if (changed) categoryEChanged++;
            console.log(`  ${file} [${lit.kind}] ${lit.literal}${changed ? ` → ${mapped}` : ' (変化なし)'}`);
        }
    }
    console.log(`Category E 合計: ${categoryETotal}件 / 変化あり: ${categoryEChanged}件`);

    console.log('\n=== 未対応ファイル: grepベースの安全網 ===');
    console.log('（Stage B/B2/B3/C/D/E のいずれでも1箇所も書き換え計画が無いファイルのみ表示。');
    console.log(' util/*.py・util/enum/*.mjsはB-25据え置き35件のみ参照のため恒等的に対象外＝正常。');
    console.log(' tests/*.mjs分析ツール（analyze-stallcalccore-globals.mjs等）はハードコード文字列');
    console.log(' で経路を持つため自動走査の対象外。Phase 3で個別に手動修正する）');
    let grepOut = [];
    try {
        grepOut = execFileSync('grep', [
            '-rln', '--include=*.js', '--include=*.ts', '--include=*.mjs', '--include=*.py', '--include=*.html',
            'engine/',
            '.',
        ], { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean).map((f) => f.replace(/^\.\//, ''));
    } catch { /* grep終了コード1（ヒット無し）は無視 */ }

    const handled = new Set();
    for (const abs of allEngineJs) handled.add(toPosix(relative(ROOT, abs)));
    for (const abs of pagesJsTargets()) {
        if (planJsRewrite(abs, fileMap).edits.length >= 0) handled.add(toPosix(relative(ROOT, abs)));
    }
    for (const abs of wsTargets) handled.add(toPosix(relative(ROOT, abs)));
    for (const p of htmlTargets()) handled.add(toPosix(relative(ROOT, p)));
    for (const abs of tsTestTargets()) handled.add(toPosix(relative(ROOT, abs)));
    for (const f of CATEGORY_E_FILES) handled.add(f);

    const unhandled = grepOut.filter((f) => !handled.has(f));
    console.log(`grepヒット総数: ${grepOut.length} / うち書き換え計画あり(または対象内): ${grepOut.length - unhandled.length} / 未対応: ${unhandled.length}`);
    for (const f of unhandled) console.log(`  ${f}`);

    console.log('\n=== サマリ ===');
    console.log(`ファイル移動対象: ${fileMap.size}`);
    console.log(`JS書き換え箇所: ${totalJsEdits + pagesJsEdits + tsEdits}`);
    console.log(`HTML書き換え箇所: ${totalHtmlEdits}`);
    console.log(`@engineエイリアス書き換え箇所: ${aliasEdits}`);
    console.log(`Category E: ${categoryETotal}件中${categoryEChanged}件変化`);
    console.log(`未対応（要手動確認）: ${unhandled.length}件`);
}

// ─── apply-moves / apply-rewrites ───────────────────────────────────────

const CHECKPOINT_PATH = process.env.MIGRATE_CHECKPOINT
    ?? '/tmp/claude-1000/-workspace/8de40ffc-3c9d-436a-bf45-df3b85515b9a/scratchpad/migrate-engine-layout-filemap.json';

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
    let jsEdits = 0;
    let htmlEdits = 0;
    let aliasEdits = 0;
    let categoryEApplied = 0;

    // 1) 移動済みファイル自身のimport書き換え（内容は新パスから読む・旧パス基準で解決）
    for (const [oldAbs, newAbs] of fileMap) {
        const plan = planJsRewrite(oldAbs, fileMap, newAbs);
        if (plan.edits.length === 0) continue;
        writeFileSync(newAbs, applyEdits(plan.code, plan.edits));
        jsEdits += plan.edits.length;
    }

    // 2) bystander（const/data/savedata/skill/*.js・据え置き35件を含む、移動しないengine内の全.js）
    const allEngineJs = listFilesRecursive(ENGINE).filter((p) => p.endsWith('.js'));
    for (const abs of allEngineJs) {
        if (fileMap.has(abs)) continue; // 1)で処理済み
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
    for (const abs of tsTestTargets()) {
        const plan = planEngineAliasRewrite(abs, fileMap);
        if (plan.edits.length === 0) continue;
        writeFileSync(abs, applyRawEdits(plan.code, plan.edits));
        aliasEdits += plan.edits.length;
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
    console.log(`Category E書き換え適用: ${categoryEApplied}箇所`);

    unlinkSync(CHECKPOINT_PATH);
    console.log('\nチェックポイントを削除した（再実行防止）。');
    console.log('残り（Phase 3で手動対応）: tests/analyze-stallcalccore-globals.mjs のfoot-プレフィックス');
    console.log('前提・tests/extract-skill-formula-block.mjs の HEAD_JS 定数・');
    console.log('tests/build-imports.mjs / tests/analyze-section-vars.mjs のJSDoc使用例コメント・');
    console.log('util/gen_imports.py:11 のJSDoc使用例コメント。');
}

// ─── メイン ────────────────────────────────────────────────────────────
// import.meta.url ガード: 検証スクリプトから BUCKETS/buildFileMap 等を再利用するために
// import した際、意図せず report()/applyMoves() 等が副作用として走らないようにする。

if (import.meta.url === `file://${process.argv[1]}`) {
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
}

export { ROOT, ENGINE, BUCKETS, buildFileMap, mapAbs, listFilesRecursive, collectJsSpecifierRanges };
