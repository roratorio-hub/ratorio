/**
 * calcFromModel(extractModelFromDom()) がDOM経由の計算結果と一致することを検証する
 * （リファクタリング計画 Phase 10: headless API の公開）。
 *
 * DOM駆動側（StAllCalc() → ComputeBattleResult()）とheadless側（calcFromModel()）は
 * それぞれ別のページロード（別コンテキスト）で計測する。同一ページ内で連続実行すると、
 * CBattleCalcResultAll.js に残るモジュールレベル可変グローバル（設置スキルのシミュレーション
 * 状態、calc-headless.js のJSDoc参照）が干渉し、Phase 10とは無関係な差分が出うるため。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const FIXTURES_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');

const allEntries = loadSaveDataEntries(FIXTURES_PATH, 'headless');
// 全101件はPlaywrightで2回ずつページロードすると重いため、均等に抜粋する。
const SAMPLE_SIZE = 12;
const step = Math.max(1, Math.floor(allEntries.length / SAMPLE_SIZE));
const entries = allEntries.filter((_, i) => i % step === 0).slice(0, SAMPLE_SIZE);

let server: Awaited<ReturnType<typeof startStaticServer>>['server'];
let baseUrl: string;
let browser: Browser;

beforeAll(async () => {
    ({ server, baseUrl } = await startStaticServer(PROJECT_ROOT));
    browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
    await browser?.close();
    await closeServer(server);
});

async function gotoFixture(query: string) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    const qi = query.indexOf('?');
    const q = qi >= 0 ? query.slice(qi) : `?${query}`;
    await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
    // 固定700ms待機は、フルスイート実行時の負荷次第で攻撃手段セレクトの再構築
    // （セーブデータ復元によるオプション再生成）が間に合わないことがあった
    // （headless[0]のflake。memory project-calc-headless-test-flake / 残件台帳 B-13）。
    // CAttackMethodAreaComponentManager.selectObjectArray[0] の値が、実際に
    // 有効な攻撃手段データへ解決できるようになるまで条件待機する。
    //
    // 加えて calc-headless.js（_ratorioReg.extractModelFromDom / calcFromModel を登録）は
    // calcx.html 内で CAttackMethodAreaComponentManager.js より後に読み込まれる
    // <script type="module"> であり、battlecalc.js/stallcalc.js 経由の依存チェーンが長いぶん評価完了が
    // 遅れうる。上記の条件だけでは「攻撃手段セレクトは整った」ことしか保証できず、
    // フルスイート実行時の負荷が高いと captureHeadless() 側が _ratorioReg の未登録関数を
    // 呼んで `reg.extractModelFromDom is not a function` になることがあった
    // （headless[24]/[56]のflake、2026-08-26 B-23検証時に発覚）。calc-headless.js 自体の
    // 登録完了も同じ条件待機に含める。
    await page.waitForFunction(async () => {
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, any>>;
        const mod = await dynamicImport('/engine/battle/CAttackMethodAreaComponentManager.js');
        const mgr = mod.CAttackMethodAreaComponentManager;
        const sel = mgr?.selectObjectArray?.[0];
        if (!sel) return false;
        if (mgr.GetAttackMethodData(sel.value) == null) return false;
        const reg = (globalThis as any)._ratorioReg;
        return typeof reg?.extractModelFromDom === 'function' && typeof reg?.calcFromModel === 'function'
            && typeof reg?.calcCoreFromModel === 'function';
    });
    return { context, page, errors };
}

// page.evaluate に渡す関数は Vitest の SSR トランスフォームを通ってから文字列化されて
// ブラウザへ送られるため、構文上の import(...) は書けない（helpers/objid-snapshot.ts の
// snapshotAllGlobals と同じ理由）。new Function で動的importを組み立てて回避する。
async function captureDomDriven(page: Awaited<ReturnType<typeof gotoFixture>>['page']) {
    return page.evaluate(async () => {
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, any>>;
        const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
        const head = await dynamicImport('/engine/battle/battlecalc.js');
        const retValArray = footBridge.StAllCalc();
        const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
        return JSON.parse(JSON.stringify(battleCalcResultAll));
    });
}

async function captureHeadless(page: Awaited<ReturnType<typeof gotoFixture>>['page']) {
    return page.evaluate(async () => {
        const reg = (globalThis as any)._ratorioReg;
        const model = reg.extractModelFromDom();
        const battleCalcResultAll = reg.calcFromModel(model);
        return JSON.parse(JSON.stringify(battleCalcResultAll));
    });
}

// B-09 Phase 1: StAllCalcCore() が「書くだけ」で roro-state.js/ro4-state.js へ書き込む6変数
// （aspdRaw/delayDownForDisp/g_lucky_over/n_B_MDEF2/n_CastCutForDisp/n_SiegeMode）は、
// Phase 1 で戻り値の第5要素 coreOutput に格上げされたが、既存の set_X() 呼び出し・
// グローバル自体は削除していない（期待差分ゼロの前提）。そのため両者は常に一致するはずで、
// 一致しなければ Phase 1 の実装（読み取りタイミング・import 先の取り違え等）にバグがある。
const CORE_OUTPUT_STATE_MODULES = ['/engine/runtime/ro4-state.js', '/engine/runtime/roro-state.js'];
const CORE_OUTPUT_KEYS = ['aspdRaw', 'delayDownForDisp', 'g_lucky_over', 'n_B_MDEF2', 'n_CastCutForDisp', 'n_SiegeMode'];

/** DOM駆動の計算後、roro-state.js/ro4-state.js の現在値から coreOutput 相当のオブジェクトを組み立てる。 */
async function captureDomCoreOutputViaGlobals(page: Awaited<ReturnType<typeof gotoFixture>>['page']) {
    return page.evaluate(async ({ modules, keys }) => {
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, any>>;
        const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
        // StAllCalc() が内部で StAllCalcCore() を呼び、set_X() 経由でグローバルへ書き込む。
        // ComputeBattleResult() は不要（coreOutput の6変数は Core 内で確定するため）。
        footBridge.StAllCalc();
        const states = await Promise.all(modules.map((m: string) => dynamicImport(m)));
        const merged = Object.assign({}, ...states);
        const out: Record<string, unknown> = {};
        for (const k of keys) out[k] = merged[k];
        return out;
    }, { modules: CORE_OUTPUT_STATE_MODULES, keys: CORE_OUTPUT_KEYS });
}

/** headless経路（calcCoreFromModel）から coreOutput をそのまま取り出す。 */
async function captureHeadlessCoreOutput(page: Awaited<ReturnType<typeof gotoFixture>>['page']) {
    return page.evaluate(async () => {
        const reg = (globalThis as any)._ratorioReg;
        const model = reg.extractModelFromDom();
        const { coreOutput } = reg.calcCoreFromModel(model);
        return coreOutput;
    });
}

describe('calcFromModel(extractModelFromDom()) がDOM経由の結果と一致する（Phase 10）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    for (const { label, query } of entries) {
        it(`${label}: headless結果とDOM駆動結果が一致する`, async () => {
            const dom = await gotoFixture(query);
            const domResult = await captureDomDriven(dom.page);
            await dom.context.close();
            expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

            const headless = await gotoFixture(query);
            const headlessResult = await captureHeadless(headless.page);
            await headless.context.close();
            expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

            expect(headlessResult).toEqual(domResult);
        }, 60000);
    }
});

describe('calcCoreFromModel() の coreOutput がDOM駆動側の書き込み結果と一致する（残件台帳 B-09 Phase 1）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    // coreOutput の6変数は全フィクスチャで挙動が変わりにくいため、サンプルは4件に絞る
    // （既存のheadless一致テストが12件で全体を広くカバー済み。ここは配線の正しさの確認）。
    const coreOutputEntries = entries.slice(0, 4);

    for (const { label, query } of coreOutputEntries) {
        it(`${label}: coreOutputがDOM駆動側のグローバル書き込み結果と一致する`, async () => {
            const dom = await gotoFixture(query);
            const domCoreOutput = await captureDomCoreOutputViaGlobals(dom.page);
            await dom.context.close();
            expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

            const headless = await gotoFixture(query);
            const headlessCoreOutput = await captureHeadlessCoreOutput(headless.page);
            await headless.context.close();
            expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

            expect(headlessCoreOutput).toEqual(domCoreOutput);
        }, 60000);
    }
});

describe('extractModelFromDom() がOBJID_ARMS_TYPE_LEFT（二刀流左手武器種別）を捕捉する（残件台帳 B-09 Step 5）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    // OBJID_ARMS_TYPE_LEFT は equip.js が二刀流可能な武器を右手に装備したときだけ
    // 動的に<select>を生成する要素（stallcalc-hydrate.js は元々これを一切読んでおらず、
    // headless経路ではモデルに載らずグローバルの残存値に暗黙依存していた）。
    // 実際の二刀流装備を組む代わりに、要素を直接注入して境界の読み取り自体を検証する。
    const { query } = entries[0];

    it('OBJID_ARMS_TYPE_LEFTが存在する場合、その値をmodel.weapon.weapon2Typeへ捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(() => {
            const select = document.createElement('select');
            select.id = 'OBJID_ARMS_TYPE_LEFT';
            select.innerHTML = '<option value="6">6</option>';
            select.value = '6';
            document.body.appendChild(select);

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return model.weapon.weapon2Type;
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured).toBe('6');
    }, 60000);

    it('OBJID_ARMS_TYPE_LEFTが存在しない場合（非二刀流。通常ケース）、既定値0を捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(() => {
            // 通常のフィクスチャは二刀流でないため要素は元々存在しない前提。
            // 念のため明示的に無いことを確認してから抽出する。
            if (document.getElementById('OBJID_ARMS_TYPE_LEFT') !== null) {
                throw new Error('想定外: このフィクスチャは既にOBJID_ARMS_TYPE_LEFTを持つ');
            }
            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return model.weapon.weapon2Type;
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured).toBe(0);
    }, 60000);
});
