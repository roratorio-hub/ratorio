/**
 * `calcFromModel()` の同一コンテキスト内連続呼び出しが呼び出し順に依存しないことを検証する
 * （残件台帳 B-09 Phase 1・設計docの D2「決定性」）。
 *
 * `tests/integration/calc-headless.test.ts` は DOM駆動側とheadless側を**別ページロード**
 * （別コンテキスト）で比較しており、「同一コンテキスト内で複数回呼んでも安全か」という
 * D2 の観点は検証していなかった（同ファイルの冒頭コメント参照）。本ファイルはその欠落を埋める。
 *
 * 手法: 1つのページ（1つのJSモジュールインスタンス群）の中で
 *   1. 対象フィクスチャのモデル `m` を抽出し `r1 = calcFromModel(m)`
 *   2. 「異物モデル」`mForeign` で `calcFromModel(mForeign)` を1回挟む
 *      （呼び出しだけ行い、結果は捨てる — モジュールグローバルへの書き込みだけが目的）
 *   3. 再び `r2 = calcFromModel(m)` を計算し、`r1` と一致するか検証する
 * を行う。DOM自体はページロード時のまま固定しているため、一致しない場合の原因は
 * 「呼び出し間でモジュールグローバルの値が持ち越された」ことに絞られる
 * （モデル自体の欠落＝隠れ入力の影響は、mの内容が2回とも同一なので定数として相殺される）。
 *
 * ---- 異物モデルの選定（重要） ----
 *
 * 当初「12サンプル中の隣接フィクスチャ」を異物モデルにしていたが、これは
 * `n_Enekyori`（層2→層1の逆流。設計docで指摘済みの既知の疑わしい変数）を一切
 * 動かさなかった（101件中 n_Enekyori が0以外になるのは僅か6件で、均等間引き12件は
 * たまたま全て0のまま）。実測で全101件の n_Enekyori 分布を洗い出し、0以外の値
 * （1または2）を残す実在のフィクスチャを異物モデルとして固定選定することで、
 * 少なくともこの既知の疑わしい変数については確実に状態を動かす異物にした
 * （foreign-job-corpus.mjs 相当の再生成は行っておらず、`generated-job-corpus.md` の
 * 固定インデックスを直接使う。フィクスチャが再生成されて中身が変わった場合は
 * このコメントと ADVERSARIAL_FOREIGN_INDEX の妥当性を再確認すること）。
 *
 * 手動検証: n_Enekyori を実際に0→1へ動かす異物モデルを挟んだ上で、12サンプル全件＋
 * 逆方向（n_Enekyori=1を自然に持つフィクスチャ自身をmとし、0/2を持つ異物を挟む）でも
 * 差分は検出されなかった（2026-08-29実測）。これは「n_Enekyoriの読み取りがこれらの
 * フィクスチャの出力に影響しない」ことを意味するに過ぎず、(B)内部スクラッチ候補57個
 * 全体の安全性を証明するものではない。既知の最有力候補で崩せなかった、という
 * 経験的な確認にとどまる。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const FIXTURES_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');

// 対象フィクスチャは calc-headless.test.ts と同じ間引き（12件）。
const allEntries = loadSaveDataEntries(FIXTURES_PATH, 'reentrancy');
const SAMPLE_SIZE = 12;
const step = Math.max(1, Math.floor(allEntries.length / SAMPLE_SIZE));
const entries = allEntries.filter((_, i) => i % step === 0).slice(0, SAMPLE_SIZE);

// 異物モデルは間引き後の12件ではなく、全101件から選ぶ（上記コメント参照）。
// 末尾付近（インデックス100）は実測で n_Enekyori=2 を残すことを確認済み。
const ADVERSARIAL_FOREIGN_INDEX = allEntries.length - 1;
const adversarialForeignEntry = allEntries[ADVERSARIAL_FOREIGN_INDEX];

let server: Awaited<ReturnType<typeof startStaticServer>>['server'];
let baseUrl: string;
let browser: Browser;
let foreignModel: unknown;

beforeAll(async () => {
    ({ server, baseUrl } = await startStaticServer(PROJECT_ROOT));
    browser = await chromium.launch({ headless: true });
    if (adversarialForeignEntry) {
        const { context, page } = await gotoFixture(adversarialForeignEntry.query);
        foreignModel = await page.evaluate(() => (globalThis as any)._ratorioReg.extractModelFromDom());
        await context.close();
    }
}, 60000);

afterAll(async () => {
    await browser?.close();
    await closeServer(server);
});

// calc-headless.test.ts の gotoFixture と同一の条件待機（flakeの既知パターン。
// memory project_calc_headless_test_flake / 残件台帳 B-13 参照）。エクスポートされていない
// ローカル関数のため複製する（コメントも含め挙動を変えない）。
async function gotoFixture(query: string) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const qi = query.indexOf('?');
    const q = qi >= 0 ? query.slice(qi) : `?${query}`;
    await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForFunction(async () => {
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, any>>;
        const mod = await dynamicImport('/engine/battle/CAttackMethodAreaComponentManager.js');
        const mgr = mod.CAttackMethodAreaComponentManager;
        const sel = mgr?.selectObjectArray?.[0];
        if (!sel) return false;
        if (mgr.GetAttackMethodData(sel.value) == null) return false;
        const reg = (globalThis as any)._ratorioReg;
        return typeof reg?.extractModelFromDom === 'function' && typeof reg?.calcFromModel === 'function';
    });
    return { context, page, errors };
}

/**
 * 対象フィクスチャのページ内で r1 → 異物呼び出し → r2 を実行し、両者を返す。
 * `foreignModel` は beforeAll で事前に別ページから採取したものを引数として渡す
 * （page.evaluate は引数をシリアライズして渡せる。calc-model.js のモデルはプレーンオブジェクト）。
 */
async function captureReentrancy(query: string) {
    const { context, page, errors } = await gotoFixture(query);
    const result = await page.evaluate(({ foreignModel }) => {
        const reg = (globalThis as any)._ratorioReg;
        const m = reg.extractModelFromDom();
        const r1 = reg.calcFromModel(m);
        reg.calcFromModel(foreignModel); // 結果は捨てる。モジュールグローバルの書き換えだけが目的
        const r2 = reg.calcFromModel(m);
        return { r1: JSON.parse(JSON.stringify(r1)), r2: JSON.parse(JSON.stringify(r2)) };
    }, { foreignModel });
    await context.close();
    if (errors.length) throw new Error(`再入テスト中に未捕捉例外: ${errors.join('\n')}`);
    return result;
}

// 現時点で一致しないと判明している項目（既知の失敗として扱う）。
// it.fails は「失敗するはず」のテストが実際に失敗した場合にPASSと報告し、
// 逆に（修正されて）成功してしまった場合はFAILと報告する — つまりこの配列からの
// 削除漏れを自動検知できる。
//
// ⚠️ 層1が層2の出力を「1回遅れ」で読む変数（n_Enekyori等）は、ここに追加する前に
// core-shell.md「既知の罠」を確認すること。ブラウザのカスケード式UIでは複数回の
// calc()呼び出しで自己修復する設計であり、単発のcalcFromModel()比較で不一致が
// 出ても実在のバグとは限らない（B-09 Phase 3はこれを誤診断してリグレッションを
// 作り込み、revertした。詳細はgit log参照）。
// 2026-08-29実測: n_Enekyoriを標的にした異物モデルで12件全てに差分なし（上記コメント参照）。
// 現時点で既知の失敗は無い。
const KNOWN_ORDER_DEPENDENT: string[] = [];

describe('calcFromModel()の同一コンテキスト内連続呼び出しが順序に依存しない（残件台帳 B-09 Phase 1・D2）', () => {
    if (entries.length === 0 || !adversarialForeignEntry) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    for (const { label, query } of entries) {
        const testFn = KNOWN_ORDER_DEPENDENT.includes(label) ? it.fails : it;

        testFn(`${label}: 異物モデル(${adversarialForeignEntry.label})を挟んでも計算結果が変わらない`, async () => {
            const { r1, r2 } = await captureReentrancy(query);
            expect(r2).toEqual(r1);
        }, 60000);
    }
});

/**
 * g_VariableCastTimeRate（Phase 4で層2専用スクラッチと誤分類したバグ）の回帰テスト。
 *
 * 層1（stallcalc-motion-hp-sp.js の ApplyMotionDelay()）が毎回無条件に書き、
 * 層2（battlecalc.js の BuildCastAndDelayHtmlMIG()）が読む受け渡し変数。
 * Phase 4 で `ComputeBattleResult()` 入口に `set_g_VariableCastTimeRate(0)` が
 * 追加されると、層1が書いた値が層2に渡る前に毎回0へ潰され、変動詠唱時間
 * （castVary）が常に0になる。これは呼び出し順序に依存しない一発目からの破壊なので、
 * 上のD2スイープ（再入検証）では検出できない——`job-corpus-snapshot.test.ts` が
 * OBJID_付き要素しか見ておらず戦闘結果パネル（castVary の表示先）を素通りすることとは
 * 別に、そもそも1回の呼び出しだけで壊れる問題であるため、単純な1回呼び出しで直接検証する。
 *
 * フィクスチャは generated-job-corpus.md の Pass B「ウォーロック（スキル攻撃）」
 * （非0の変動詠唱時間を持つ代表例）を固定インデックスで指定する。
 */
describe('g_VariableCastTimeRate は層1が書いた値が層2の詠唱計算まで保たれる', () => {
    // Pass B「ウォーロック（スキル攻撃）」固定。フィクスチャが再生成された場合は
    // generated-job-corpus.md の該当行番号から非コメント行インデックスを数え直すこと。
    const WARLOCK_SKILL_INDEX = 98;
    const target = allEntries[WARLOCK_SKILL_INDEX];

    if (!target) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    it(`${target.label}: calcFromModel() 単発呼び出しで変動詠唱時間(castVary)が0にならない`, async () => {
        const { context, page, errors } = await gotoFixture(target.query);
        const result = await page.evaluate(() => {
            const reg = (globalThis as any)._ratorioReg;
            const m = reg.extractModelFromDom();
            const battleCalcResultAll = reg.calcFromModel(m);
            const castVary = battleCalcResultAll?.activeResultArray?.[0]?.castVary;
            return { castVary };
        });
        await context.close();
        if (errors.length) throw new Error(`テスト中に未捕捉例外: ${errors.join('\n')}`);
        expect(result.castVary).toBeGreaterThan(0);
    }, 60000);
});
