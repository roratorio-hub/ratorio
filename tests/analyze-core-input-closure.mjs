/**
 * B-09 Phase 0: `calcFromModel()` チェーン全体（層1 StAllCalcCore + 層2 ComputeBattleResult）が
 * 読み書きするモジュールレベル可変状態を、`engine/` 全域を走査対象として機械的に分類する。
 *
 * 旧 `analyze-stallcalccore-globals.mjs`（B-09 訂正0以前）は
 * `roro-state.js`(59) + `ro4-state.js`(26) + `global.js`(33) = 118個しか見ておらず、
 * `engine/**` に313個ある `export let` のうち195個が走査窓の外だった
 * （2026-08-29 全体設計調査で判明。詳細は `.claude/context/b09-core-purification-design.md`）。
 * 本ツールはその反省を踏まえ、対象変数の宇宙を `engine/**` の全モジュールレベル
 * 可変束縛（`export let` + 非exportのトップレベル `let` + `CS`（`calc-state.js`）の
 * プロパティ）へ広げる。
 *
 * ---- Core の判定方法（2段階） ----
 *
 * `StAllCalcCore()`（stallcalc.js）・`ComputeBattleResult()`（battlecalc.js）は
 * どちらも「本体は薄く、大半の計算を同一ファイル内の他のトップレベル関数や
 * 外部ヘルパーファイルへ委譲する」構造を持つ。旧ツールは stallcalc.js について
 * 手動計測した固定行範囲（CORE_START/CORE_END）+ ディレクトリ丸ごと
 * （engine/status/* 全部）という単純な近似で済ませていたが、battlecalc.js は
 * 同じ近似が効かない（RenderCalcResults 等の Shell 関数も同居し、ディレクトリ
 * 丸ごとでは Shell まで Core に含めてしまう）。
 *
 * そこで、両エントリ関数について「同一ファイル内でどのトップレベル関数から
 * 到達可能か」を呼び出しグラフで求める（`closure()`）。さらに、到達済み関数が
 * import 経由で外部ファイルへ処理を委譲し、その外部ファイルが「呼び戻し」で
 * 同一ファイル内の未到達関数を呼んでいるケース（例: skill-formula-physical.js が
 * battlecalc.js の BattleCalcSubDamagePhysicalCommon を呼び返す）を検出して
 * 到達集合へ追加する「ピンポン」ステップを、収束するまで繰り返す。
 *
 * ⚠️ ピンポン検出は最初 `文字列に "Name(" が含まれるか` という素朴な正規表現で
 * 実装したところ、`stallcalc-exp-reflect-atk-size.js` 内のコメント
 * 「StAllCalc() 側（Shell）で描画する」を誤って呼び出しと判定し、Shell関数の
 * StAllCalc が Core と誤分類された（CLAUDE.md が警告する「grepはコメント内も
 * ヒットさせる」の実例）。そのため呼び戻し判定は必ず ESLint の AST（CallExpression/
 * NewExpression の callee）で行い、生テキストへの正規表現は使わない。
 *
 * さらに `StAllCalcCore()`（層1・stallcalc.js）が `SET_ZOKUSEI()`（層2・battlecalc.js）を
 * 直接呼ぶような、層1→層2をまたぐ関数呼び出しも実在する（1444行）。これは
 * 「層1・層2は変数だけでなく関数レベルでも完全には分離していない」ことの実例であり、
 * 層1側の到達集合が battlecalc.js の関数を参照していれば、その関数も battlecalc.js 側の
 * 到達集合へ合流させる（クロス伝播。`crossPollinate()`）。
 *
 * ピンポン検出の誤爆を避けるため、「呼び戻し」チェックは
 * entry ファイルと同一ディレクトリのファイルに限定する（`engine/bridge/*` 等の
 * 「外部消費者への仲介」ファイルは対象外。仲介ファイルが Shell 関数を再エクスポートの
 * ために呼ぶのは、Core到達性とは無関係なため）。
 *
 * ディレクトリ丸ごと近似は、層1（`engine/status/*.js`。旧ツールから継続）と、
 * ここで新規に発見される層2の外部ヘルパーファイル（`skill-formula-*.js` 等）の
 * 両方に適用する。
 *
 * ---- 変数の分類（D1: 入力閉包） ----
 *
 *   (A) 隠れ入力      = Core が読むが HydrateFromModel が書かない
 *                        （かつ Core 内で書かれてもいない）
 *   (B) 内部スクラッチ = Core が読み書きの両方を行う（Core内で完結する可能性がある。
 *                        ただし「読む前に必ず書かれる」かは制御フローに依存し
 *                        静的には確定しない。Phase 1 の実測・Phase 3/4 の監査が必要）
 *   (C) 定数/サービス  = Core が読むだけで、engine 全体を見ても一度も書き込まれない
 *
 * 「HydrateFromModel が書く」変数は上記のどれであっても「供給済み」として別記する。
 *
 * ---- 既知の限界（誤検出の実例あり。B-09 Phase 2h で確認） ----
 *
 * - **多次元の添字代入**（`X[a][b] = c`）は書き込みとして検出できない
 *   （検出ロジックが1段のMemberExpressionしか見ていないため）。
 * - **外部ファイル発見は1ホップのみ**: entryファイル（stallcalc.js/battlecalc.js）から
 *   直接参照されたシンボルの所属ファイルしか「Core」と判定しない。発見済み外部ファイル
 *   （例: skill-formula-*.js）が**さらに別の外部ファイル**（例: calcautospell.js の
 *   `AS_PLUS`）を呼んでいても、その2段目のファイル・関数までは辿らない。
 *
 * 上記2つが重なると、Core内で完結する正規のスクラッチ変数（`n_AS_DMG`/
 * `n_AS_DMG_OverHP`）が (A) 隠れ入力に誤分類される実例が確認されている
 * （`AS_Calc()` が毎回リセットし `AS_PLUS()` が同一呼び出し内で読むだけで、
 * 外部からの書き込みは存在しない。詳細は `.claude/context/b09-core-purification-design.md`）。
 * (A) の判定結果は**人間によるダブルチェックを前提**とし、鵜呑みにしないこと。
 *
 * 使い方:
 *   cd ratorio/tests && node analyze-core-input-closure.mjs
 *   node analyze-core-input-closure.mjs --json > /tmp/out.json   # JSON出力（後続フェーズ用）
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, normalize } from 'node:path';
import { Linter } from 'eslint';

const REPO = join(process.cwd(), '..');
const linter = new Linter();
const JSON_MODE = process.argv.includes('--json');

const STALLCALC = 'engine/status/stallcalc.js';
const BATTLECALC = 'engine/battle/battlecalc.js';
const HYDRATE = 'engine/status/stallcalc-hydrate.js';
const CALC_STATE = 'engine/battle/calc-state.js';
const STATE_FILES = ['engine/runtime/roro-state.js', 'engine/runtime/ro4-state.js', 'engine/runtime/global.js'];

// ============================================================
// AST ユーティリティ
// ============================================================

const astCache = new Map();
function parse(rel) {
    if (astCache.has(rel)) return astCache.get(rel);
    const src = readFileSync(join(REPO, rel), 'utf8');
    let result;
    try {
        linter.verify(src, {
            languageOptions: { ecmaVersion: 2022, sourceType: 'module' },
            plugins: { probe: { rules: { probe: { create() { return {}; } } } } },
            rules: {},
        }, { filename: rel });
        result = { src, ast: linter.getSourceCode().ast, ok: true };
    } catch (e) {
        result = { src, ast: null, ok: false, error: String(e) };
    }
    astCache.set(rel, result);
    return result;
}

function walkEach(node, visit) {
    if (!node || typeof node.type !== 'string') return;
    visit(node);
    for (const k in node) {
        if (k === 'parent') continue;
        const v = node[k];
        if (Array.isArray(v)) v.forEach((c) => c && typeof c.type === 'string' && walkEach(c, visit));
        else if (v && typeof v.type === 'string') walkEach(v, visit);
    }
}

function topLevelFunctions(ast) {
    const fns = new Map();
    for (const stmt of ast.body) {
        let fn = null;
        if (stmt.type === 'FunctionDeclaration') fn = stmt;
        else if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration && stmt.declaration.type === 'FunctionDeclaration') fn = stmt.declaration;
        if (fn && fn.id) fns.set(fn.id.name, { name: fn.id.name, start: fn.loc.start.line, end: fn.loc.end.line, node: fn });
    }
    return fns;
}

function callNamesInTree(rootNode) {
    const out = new Set();
    walkEach(rootNode, (n) => {
        if ((n.type === 'CallExpression' || n.type === 'NewExpression') && n.callee.type === 'Identifier') out.add(n.callee.name);
    });
    return out;
}

function allIdentifierNames(fnNode) {
    const out = new Set();
    walkEach(fnNode.body, (n) => { if (n.type === 'Identifier') out.add(n.name); });
    return out;
}

function importMapOf(src) {
    const re = /import\s*\{([^}]*)\}\s*from\s*["']([^"']+)["']/gs;
    let m; const map = {};
    while ((m = re.exec(src))) {
        const names = m[1].split(',').map((s) => s.trim().split(/\s+as\s+/).pop()).filter(Boolean);
        for (const n of names) map[n] = m[2];
    }
    return map;
}

/** ファイル全体で呼ばれている名前の集合（AST由来。コメント・文字列は含まない）。 */
const fileCallNamesCache = new Map();
function callNamesInFile(rel) {
    if (fileCallNamesCache.has(rel)) return fileCallNamesCache.get(rel);
    const { ast, ok } = parse(rel);
    const names = ok ? callNamesInTree({ type: 'Program', body: ast.body }) : new Set();
    fileCallNamesCache.set(rel, names);
    return names;
}

// ============================================================
// Core 到達性クロージャ
// ============================================================

/**
 * entryFile 内で seedNames から到達可能なトップレベル関数を求め、
 * 到達可能関数が import 経由で参照する外部ローカルファイルとその参照シンボル名を発見する。
 * 「ピンポン」（同一ディレクトリの外部ファイルが entryFile 自身の未到達関数を
 * 呼び戻すケース）を収束するまで繰り返す。
 *
 * `externalFiles` はファイルパスだけでなく `Map<file, Set<参照シンボル名>>` として返す。
 * これは呼び出し側が「ファイル丸ごとをCoreとみなす」か「参照された関数だけをCoreとみなす」かを
 * 選べるようにするため（後者は equip.js/hmjob.js のような Shell と同居する巨大ファイルを
 * 誤って丸ごとCore扱いしてしまう事故を防ぐ。詳細は呼び出し元コメント参照）。
 */
function closure(entryFile, seedNames) {
    const { src, ast } = parse(entryFile);
    const fns = topLevelFunctions(ast);
    const imap = importMapOf(src);
    const sameDir = dirname(entryFile);
    const reach = new Set(seedNames.filter((n) => fns.has(n)));
    /** @type {Map<string, Set<string>>} */
    const externalFiles = new Map();
    const addExternal = (file, symbol) => {
        if (!externalFiles.has(file)) externalFiles.set(file, new Set());
        const s = externalFiles.get(file);
        if (!s.has(symbol)) { s.add(symbol); return true; }
        return false;
    };
    let changed = true;
    while (changed) {
        changed = false;
        const queue = [...reach];
        while (queue.length) {
            const name = queue.shift();
            const fn = fns.get(name);
            if (!fn) continue;
            for (const callee of callNamesInTree(fn.node.body)) {
                if (fns.has(callee) && !reach.has(callee)) { reach.add(callee); queue.push(callee); changed = true; }
            }
        }
        for (const name of reach) {
            const fn = fns.get(name);
            for (const id of allIdentifierNames(fn.node)) {
                if (imap[id] && imap[id].startsWith('.')) {
                    const abs = normalize(join(dirname(entryFile), imap[id]));
                    if (addExternal(abs, id)) changed = true;
                }
            }
        }
        for (const ext of externalFiles.keys()) {
            if (dirname(ext) !== sameDir) continue; // 仲介ファイル誤爆防止（コメント参照）
            const calledNames = callNamesInFile(ext);
            for (const [name] of fns) {
                if (reach.has(name)) continue;
                if (calledNames.has(name)) { reach.add(name); changed = true; }
            }
        }
    }
    return { fns, reach, externalFiles };
}

/** entryFile の reach 集合内の関数が、otherFile のトップレベル関数を直接呼んでいれば名前を返す。 */
function findCrossCalls(entryFile, closureResult, otherFile) {
    const { src } = parse(entryFile);
    const imap = importMapOf(src);
    const found = new Set();
    for (const name of closureResult.reach) {
        const fn = closureResult.fns.get(name);
        for (const callee of callNamesInTree(fn.node.body)) {
            if (imap[callee] && normalize(join(dirname(entryFile), imap[callee])) === otherFile) {
                found.add(callee);
            }
        }
    }
    return found;
}

let stallClosure = closure(STALLCALC, ['StAllCalcCore']);
let battleClosure = closure(BATTLECALC, ['ComputeBattleResult']);

// クロス伝播: 層1→層2、層2→層1の直接関数呼び出し（例: StAllCalcCore→SET_ZOKUSEI）を反映する。
for (let round = 0; round < 5; round++) {
    const toStall = findCrossCalls(BATTLECALC, battleClosure, STALLCALC);
    const toBattle = findCrossCalls(STALLCALC, stallClosure, BATTLECALC);
    let changed = false;
    for (const n of toBattle) if (!battleClosure.reach.has(n) && battleClosure.fns.has(n)) changed = true;
    for (const n of toStall) if (!stallClosure.reach.has(n) && stallClosure.fns.has(n)) changed = true;
    if (!changed) break;
    battleClosure = closure(BATTLECALC, [...battleClosure.reach, ...toBattle]);
    stallClosure = closure(STALLCALC, [...stallClosure.reach, ...toStall]);
}

// ============================================================
// Core ファイル集合
// ============================================================
//
// `engine/status/*.js`（stallcalc.js/stallcalc-hydrate.js/stallcalc-shell.jsを除く）は
// 既存の複数フェーズの調査で「ほぼ100% Core」と人手検証済みの閉じた集合なので、引き続き
// ファイル丸ごとを Core として扱う（ディレクトリ丸ごと近似）。stallcalc-shell.js は
// Phase 5 で新設した Shell 側（DOM初期化）のため、stallcalc-hydrate.js と同様に除外する。
//
// 一方、closure() が新規に発見した外部ファイル（stallClosure/battleClosure の
// externalFiles）は玉石混淆で、skill-formula-*.js のような「100% Core」の小さな
// 専用ファイルもあれば、equip.js/hmjob.js/chara.js のように DOM Shell と Core 計算が
// 同居する巨大ファイルも含まれる。試作版でファイル丸ごとCore扱いにしたところ、
// equip.js（DOM参照46件）由来の `set_n_Nitou()` 呼び出し（ユーザー操作で発火する
// Shell側の書き込み）が誤って「Core内書き込み」と分類される事故が起きた。
// そのため発見ファイルは **参照された関数の行範囲のみ** を Core とする
// （関数として解決できないシンボル＝データ/クラス等は、判断コストが高い割に
// 実害が小さいため、安全側に倒してファイル丸ごとを対象に含める）。

const statusDirBlanket = new Set(
    readdirSync(join(REPO, 'engine/status'))
        .filter((f) => f.endsWith('.js'))
        .filter((f) => f !== 'stallcalc.js' && f !== 'stallcalc-hydrate.js' && f !== 'stallcalc-shell.js')
        .map((f) => `engine/status/${f}`),
);

/** @type {Map<string, Array<[number, number]>>} 発見ファイルごとのCore行範囲（関数単位）。 */
const discoveredFileRanges = new Map();
/** 丸ごとCore扱いにせざるを得なかった発見ファイル（関数として解決できない参照を含む）。 */
const discoveredFileBlanket = new Set();

for (const externalFiles of [stallClosure.externalFiles, battleClosure.externalFiles]) {
    for (const [file, symbols] of externalFiles) {
        if (file === BATTLECALC || file === STALLCALC || file === HYDRATE) continue;
        if (statusDirBlanket.has(file)) continue; // 既存の丸ごと近似を優先
        const { ast, ok } = parse(file);
        if (!ok) continue;
        const fileFns = topLevelFunctions(ast);
        for (const sym of symbols) {
            const fn = fileFns.get(sym);
            if (fn) {
                if (!discoveredFileRanges.has(file)) discoveredFileRanges.set(file, []);
                discoveredFileRanges.get(file).push([fn.start, fn.end]);
            }
            // 関数として解決できない場合（データ/クラス/再exportなど）は「安全側」の意味が
            // 逆転するため、あえて何もしない（ファイル丸ごとCore扱いにはしない）。
            //
            // 試作版ではここを「丸ごとCoreとみなす」フォールバックにしていたところ、
            // engine/monster/mobconfplayer.js（Coreは配列 n_B_TAISEI をデータとして
            // importするだけ）が丸ごとCore扱いになり、同ファイル内のDOM駆動UIハンドラ
            // （`objSelect.value` を読んで `n_B_TAISEI[confId] = ...` を書く、
            // ユーザー操作でのみ発火するコード）まで「Core内書き込み」と誤検出する事故が
            // 起きた（equip.js/hmjob.js/chara.js と同型の「Shell同居ファイル」問題）。
            // データ変数自体の読み書きは、それを実際に参照するコード側
            // （既にisCoreLocationで判定済みのファイル）で正しく捕捉されるため、
            // 宣言ファイルを丸ごとCoreにする必要はない。
        }
    }
}

function coreLineRanges(closureResult) {
    return [...closureResult.reach].map((n) => {
        const f = closureResult.fns.get(n);
        return [f.start, f.end];
    });
}
const stallCoreRanges = coreLineRanges(stallClosure);
const battleCoreRanges = coreLineRanges(battleClosure);

function inRanges(line, ranges) {
    return ranges.some(([s, e]) => line >= s && line <= e);
}

/** 指定ファイル・行が Core と判定されるか。 */
function isCoreLocation(rel, line) {
    if (rel === STALLCALC) return inRanges(line, stallCoreRanges);
    if (rel === BATTLECALC) return inRanges(line, battleCoreRanges);
    if (statusDirBlanket.has(rel)) return true;
    if (discoveredFileBlanket.has(rel)) return true;
    if (discoveredFileRanges.has(rel)) return inRanges(line, discoveredFileRanges.get(rel));
    return false;
}

/** レポート表示・privateLet収集用に「Coreとみなすファイル」の一覧（範囲限定分も含む）。 */
const coreFileBlanket = new Set([...statusDirBlanket, ...discoveredFileBlanket]);
const coreFilesWithRanges = new Set([...discoveredFileRanges.keys()]);

if (!JSON_MODE) {
    console.log(`層1（stallcalc.js）到達関数: ${stallClosure.reach.size}/${stallClosure.fns.size} — ${[...stallClosure.reach].sort().join(', ')}`);
    console.log(`層2（battlecalc.js）到達関数: ${battleClosure.reach.size}/${battleClosure.fns.size}`);
    console.log(`Core 外部ファイル（ディレクトリ丸ごと近似含む）: ${coreFileBlanket.size}件`);
}

// ============================================================
// 対象変数の宇宙: export let（全engine） + 非exportトップレベルlet（Coreファイル限定） + CS プロパティ
// ============================================================

function walkJsFiles(dir) {
    let out = [];
    for (const name of readdirSync(join(REPO, dir))) {
        const rel = `${dir}/${name}`;
        const abs = join(REPO, rel);
        if (statSync(abs).isDirectory()) out = out.concat(walkJsFiles(rel));
        else if (name.endsWith('.js')) out.push(rel);
    }
    return out;
}
const allEngineFiles = walkJsFiles('engine');

/** @type {Map<string, {file:string, kind:'exportLet'|'privateLet'|'csProp', declFile?:string}>} */
const varMeta = new Map();

for (const rel of allEngineFiles) {
    const { ast, ok } = parse(rel);
    if (!ok) continue;
    for (const stmt of ast.body) {
        if (stmt.type === 'ExportNamedDeclaration' && stmt.declaration && stmt.declaration.type === 'VariableDeclaration' && stmt.declaration.kind === 'let') {
            for (const decl of stmt.declaration.declarations) {
                if (decl.id.type === 'Identifier') varMeta.set(decl.id.name, { file: rel, kind: 'exportLet' });
            }
        }
    }
}

// 非export・トップレベル let は Core と判定された「場所」（ファイル+行）に限って収集する
// （Phase 3/4 のリセット監査対象を明確にするため。Core外の私的stateは対象外。
// isCoreLocation() が stallcalc.js/battlecalc.js の行範囲制限・関数単位範囲制限も
// 一括で扱うので、宣言行そのものを isCoreLocation で判定すればよい）。
const coreFilesForPrivateLet = new Set([STALLCALC, BATTLECALC, ...statusDirBlanket, ...discoveredFileBlanket, ...coreFilesWithRanges]);
for (const rel of coreFilesForPrivateLet) {
    const { ast, ok } = parse(rel);
    if (!ok) continue;
    for (const stmt of ast.body) {
        if (stmt.type === 'VariableDeclaration' && stmt.kind === 'let') {
            for (const decl of stmt.declarations) {
                if (decl.id.type !== 'Identifier') continue;
                const name = decl.id.name;
                if (varMeta.has(name)) continue; // exportLetと同名は既存を優先（衝突なしを別途確認済み）
                if (!isCoreLocation(rel, decl.loc.start.line)) continue; // Shell側等の宣言は対象外
                varMeta.set(`${rel}::${name}`, { file: rel, kind: 'privateLet', localName: name });
            }
        }
    }
}

// CS（calc-state.js）のプロパティ
const { ast: csAst } = parse(CALC_STATE);
const csProps = [];
walkEach({ type: 'Program', body: csAst.body }, (n) => {
    if (n.type === 'VariableDeclarator' && n.id.type === 'Identifier' && n.id.name === 'CS' && n.init && n.init.type === 'ObjectExpression') {
        for (const prop of n.init.properties) {
            if (prop.type === 'Property' && prop.key.type === 'Identifier') csProps.push(prop.key.name);
        }
    }
});
for (const p of csProps) varMeta.set(`CS.${p}`, { file: CALC_STATE, kind: 'csProp', localName: p });

if (!JSON_MODE) {
    const nExportLet = [...varMeta.values()].filter((v) => v.kind === 'exportLet').length;
    const nPrivateLet = [...varMeta.values()].filter((v) => v.kind === 'privateLet').length;
    console.log(`\n対象変数の宇宙: export let ${nExportLet}個 + 非exportトップレベルlet(Coreファイル限定) ${nPrivateLet}個 + CS プロパティ ${csProps.length}個 = ${varMeta.size}個`);
}

// ============================================================
// 読み書きスキャン
// ============================================================

/** @type {Map<string, {coreRead:boolean, coreWrite:boolean, hydrateWrite:boolean, outsideRead:Set<string>, outsideWrite:Set<string>}>} */
const stats = new Map([...varMeta.keys()].map((k) => [k, {
    coreRead: false, coreWrite: false, hydrateWrite: false,
    outsideRead: new Set(), outsideWrite: new Set(),
}]));

// exportLet 名 → key（そのまま）、privateLet/csProp はファイル内ローカル名で引く必要がある。
const exportLetNames = new Set([...varMeta.entries()].filter(([, v]) => v.kind === 'exportLet').map(([k]) => k));
const setterNames = new Set([...exportLetNames].map((v) => `set_${v}`));

for (const rel of allEngineFiles) {
    if (rel === CALC_STATE && false) continue; // CS宣言ファイル自身も走査対象（CS.propの読み書きがある）
    if (STATE_FILES.includes(rel)) continue; // export let 宣言ファイル自身は対象外（旧ツールと同様）
    const { ast, ok } = parse(rel);
    if (!ok) continue;

    // --- exportLet 変数（グローバル名。set_X() 呼び出し or 添字代入で検出） ---
    walkEach({ type: 'Program', body: ast.body }, (node) => {
        const name = node.type === 'Identifier' ? node.name : null;
        if (!name) return;
        const parent = node.parent;
        const line = node.loc.start.line;
        const core = isCoreLocation(rel, line);

        if (parent && (parent.type === 'ImportSpecifier' || parent.type === 'ExportSpecifier')) return;

        if (setterNames.has(name) && parent && parent.type === 'CallExpression' && parent.callee === node) {
            const varName = name.slice(4);
            const s = stats.get(varName);
            if (rel === HYDRATE) s.hydrateWrite = true;
            if (core) s.coreWrite = true; else s.outsideWrite.add(rel);
            return;
        }
        if (exportLetNames.has(name)) {
            const s = stats.get(name);
            if (core) s.coreRead = true; else s.outsideRead.add(rel);
            if (parent && parent.type === 'MemberExpression' && parent.object === node) {
                const gp = parent.parent;
                const isAssign = gp && gp.type === 'AssignmentExpression' && gp.left === parent;
                const isUpdate = gp && gp.type === 'UpdateExpression' && gp.argument === parent;
                if (isAssign || isUpdate) {
                    if (rel === HYDRATE) s.hydrateWrite = true;
                    if (core) s.coreWrite = true; else s.outsideWrite.add(rel);
                }
            }
        }
    });

    // --- privateLet（宣言ファイル内でのみ意味を持つローカル名。同ファイル内の read/write のみ判定） ---
    for (const [key, meta] of varMeta) {
        if (meta.kind !== 'privateLet' || meta.file !== rel) continue;
        const localName = meta.localName;
        const s = stats.get(key);
        walkEach({ type: 'Program', body: ast.body }, (node) => {
            if (node.type !== 'Identifier' || node.name !== localName) return;
            const parent = node.parent;
            if (parent && parent.type === 'VariableDeclarator' && parent.id === node) return; // 宣言自体は除外
            const line = node.loc.start.line;
            const core = isCoreLocation(rel, line);
            if (parent && parent.type === 'AssignmentExpression' && parent.left === node) {
                if (core) s.coreWrite = true; else s.outsideWrite.add(rel);
                return;
            }
            if (parent && parent.type === 'UpdateExpression' && parent.argument === node) {
                if (core) s.coreWrite = true; else s.outsideWrite.add(rel);
                return;
            }
            if (core) s.coreRead = true; else s.outsideRead.add(rel);
            if (parent && parent.type === 'MemberExpression' && parent.object === node) {
                const gp = parent.parent;
                const isAssign = gp && gp.type === 'AssignmentExpression' && gp.left === parent;
                const isUpdate = gp && gp.type === 'UpdateExpression' && gp.argument === parent;
                if (isAssign || isUpdate) { if (core) s.coreWrite = true; else s.outsideWrite.add(rel); }
            }
        });
    }

    // --- CS.prop（MemberExpression限定） ---
    walkEach({ type: 'Program', body: ast.body }, (node) => {
        if (node.type !== 'MemberExpression' || node.object.type !== 'Identifier' || node.object.name !== 'CS') return;
        if (node.property.type !== 'Identifier') return;
        const key = `CS.${node.property.name}`;
        if (!stats.has(key)) return;
        const s = stats.get(key);
        const line = node.loc.start.line;
        const core = isCoreLocation(rel, line);
        const gp = node.parent;
        const isAssign = gp && gp.type === 'AssignmentExpression' && gp.left === node;
        const isUpdate = gp && gp.type === 'UpdateExpression' && gp.argument === node;
        if (isAssign || isUpdate) {
            if (rel === HYDRATE) s.hydrateWrite = true;
            if (core) s.coreWrite = true; else s.outsideWrite.add(rel);
        } else {
            if (core) s.coreRead = true; else s.outsideRead.add(rel);
        }
    });
}

// ============================================================
// 分類（D1）
// ============================================================

const hiddenInput = []; // (A)
const scratchCandidate = []; // (B)
const constService = []; // (C)
const covered = []; // Hydrateが書く
const writeOnlyOutput = []; // 旧「書くだけ」相当（B-09 Step 0でcoreOutputへ格上げ済みのもの含む）
const unused = [];

for (const [key, s] of stats) {
    const anyWriteAnywhere = s.coreWrite || s.outsideWrite.size > 0;
    if (!s.coreRead && !s.coreWrite) { unused.push(key); continue; }
    if (s.hydrateWrite) { covered.push(key); continue; }
    if (s.coreWrite && !s.coreRead) { writeOnlyOutput.push(key); continue; }
    if (s.coreRead && s.coreWrite) { scratchCandidate.push(key); continue; }
    // coreRead && !coreWrite
    if (!anyWriteAnywhere) constService.push(key);
    else hiddenInput.push(key);
}

if (!JSON_MODE) {
    function printList(label, keys, note) {
        console.log(`\n## ${label}（${keys.length}個）${note ? ` — ${note}` : ''}`);
        for (const k of keys.sort()) {
            const s = stats.get(k);
            const outR = s.outsideRead.size, outW = s.outsideWrite.size;
            console.log(`  - ${k}${outR || outW ? ` [外部: 読${outR}件/書${outW}件]` : ' [Core限定]'}`);
        }
    }
    printList('(A) 確定 隠れ入力', hiddenInput, 'HydrateFromModelが書かず、Core内でも書かれない。Phase 2でモデルへ追加すべき候補');
    printList('(B) 内部スクラッチ候補（要Phase1実測・Phase3/4監査）', scratchCandidate, 'Core内で読み書き両方。順序次第で再入不可能性の原因になりうる');
    printList('(C) 定数/サービス', constService, 'Coreは読むだけ・engine全体で一度も書かれない（=真の定数化候補）');
    printList('供給済み（HydrateFromModelが書く）', covered);
    printList('書くだけ（出力扱い）', writeOnlyOutput, 'B-09 Step 0のcoreOutput等、既存の戻り値化対象');
    console.log(`\n(未使用: ${unused.length}個 — Core無関係につき省略)`);

    console.log('\n---\n次のアクション: (A)は Phase 2 でグループ単位のモデル化対象。');
    console.log('(B)は Phase 1 の実測（calc-reentrancy.test.ts）で本当に順序依存かを確認し、Phase 3/4のリセット監査対象にする。');
} else {
    const out = {
        universe: varMeta.size,
        stallReach: [...stallClosure.reach].sort(),
        battleReach: [...battleClosure.reach].sort(),
        coreFilesBlanket: [...coreFileBlanket].sort(),
        coreFilesRangeLimited: Object.fromEntries([...discoveredFileRanges.entries()].sort()),
        hiddenInput: hiddenInput.sort(),
        scratchCandidate: scratchCandidate.sort(),
        constService: constService.sort(),
        covered: covered.sort(),
        writeOnlyOutput: writeOnlyOutput.sort(),
        unused: unused.sort(),
    };
    console.log(JSON.stringify(out, null, 2));
}
