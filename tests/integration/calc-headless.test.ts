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
// 全件（Pass A/B/C 計125件）をPlaywrightで2回ずつページロードすると重いため、均等に抜粋する。
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

describe('model.status.jobId / n_Nitou 導出が残存グローバルに依存しない（残件台帳 B-09 Phase 2b）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];

    it('extractModelFromDom() がOBJID_SELECT_JOB.valueをmodel.status.jobIdへ捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(() => {
            const domValue = (document as any).calcForm.A_JOB.value;
            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return { domValue, modelValue: model.status.jobId };
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(String(captured.modelValue)).toBe(String(captured.domValue));
    }, 60000);

    // 修正前は n_A_JOB・n_Nitou のどちらも HydrateFromModel が書き込んでおらず、
    // ページに残存しているグローバルの値に暗黙依存していた（headless経路での隠れ入力。
    // 残件台帳 B-09 Phase 0 の分析で確定）。ここでは意図的に「間違った」値を
    // グローバルへ書き込んでから calcFromModel() を呼び、それでも DOM 駆動側と
    // 同じ結果になる（＝もう残存値に影響されない）ことを検証する。
    it('n_A_JOB/n_Nitouのグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await captureDomDriven(dom.page);
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const roroState = await dynamicImport('/engine/runtime/roro-state.js');
            const globalState = await dynamicImport('/engine/runtime/global.js');
            // 実際の値と食い違う値を故意に書き込む（0/falseは非二刀流の職業では
            // 実際の値と一致してしまいうるため、明確に異なる値を選ぶ）。
            roroState.set_n_A_JOB(-1);
            globalState.set_n_Nitou(true);

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});

describe('支援・デバフ設定欄（confIchizi/confNizi/confSanzi/confYozi/confDebuff）（残件台帳 B-09 Phase 2c）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];
    // 生成コーパスは全て設定欄が既定値（0埋め）のため、口笛（CONF_ID_WHISTLE。
    // avoid-flee.jsでluckyへ加算される）を直接注入して非既定値を作る。

    it('extractModelFromDom() が設定欄配列の現在値をmodel.confNizi等へ捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfNizi } = await dynamicImport('/engine/chara/CCharaConfNizi.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            const whistleId = CCharaConfNizi.CONF_ID_WHISTLE;
            g.g_confDataNizi[whistleId] = 3;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return model.confNizi[whistleId];
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured).toBe(3);
    }, 60000);

    // 修正前は confIchizi 等のモデルフィールドが無く、HydrateFromModel が
    // g_confDataNizi 等を一切書き込んでいなかった（headless経路での隠れ入力）。
    // ここでは意図的に「間違った」値をグローバルへ書き込んでから calcFromModel() を呼び、
    // それでも DOM 駆動側と同じ結果になることを検証する。
    it('設定欄配列のグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await dom.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfNizi } = await dynamicImport('/engine/chara/CCharaConfNizi.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            g.g_confDataNizi[CCharaConfNizi.CONF_ID_WHISTLE] = 3;

            const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
            const head = await dynamicImport('/engine/battle/battlecalc.js');
            const retValArray = footBridge.StAllCalc();
            const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfNizi } = await dynamicImport('/engine/chara/CCharaConfNizi.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            g.g_confDataNizi[CCharaConfNizi.CONF_ID_WHISTLE] = 3; // DOM駆動側と同じ設定を注入

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom(); // ここで model.confNizi[WHISTLE] === 3 を捕捉

            // 意図的に汚す（別の呼び出しが残した想定の値で全埋め）
            for (let i = 0; i < g.g_confDataNizi.length; i++) g.g_confDataNizi[i] = -1;

            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});

describe('性能カスタマイズ欄・特性ステータス（残件台帳 B-09 Phase 2d）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];
    // 生成コーパスは性能カスタマイズ欄・特性ステータスも既定値のため、
    // CONF_ID_WEAPON_ATK_UP（武器ATK上昇）と特性ステータスSTAを直接注入して非既定値を作る。

    it('extractModelFromDom() が性能カスタマイズ欄・特性ステータスの現在値を捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfCustomAtk } = await dynamicImport('/engine/chara/CCharaConfCustomAtk.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            const hmjob = await dynamicImport('/engine/chara/hmjob.js');
            const migParam = await dynamicImport('/engine/const/EnumMigItemParamId.js');
            g.g_confDataCustomAtk[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP] = 5;
            hmjob.g_pureStatus[migParam.MIG_PARAM_ID_STA] = 7;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return {
                confCustomAtk: model.confCustomAtk[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP],
                pureStatus: model.pureStatus[migParam.MIG_PARAM_ID_STA],
            };
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured.confCustomAtk).toBe(5);
        expect(captured.pureStatus).toBe(7);
    }, 60000);

    // 修正前は confCustomAtk 等・pureStatus/bonusStatus のモデルフィールドが無く、
    // HydrateFromModel が g_confDataCustomAtk 等・g_pureStatus/g_bonusStatus を
    // 一切書き込んでいなかった（headless経路での隠れ入力）。ここでは意図的に
    // 「間違った」値をグローバルへ書き込んでから calcFromModel() を呼び、
    // それでも DOM 駆動側と同じ結果になることを検証する。
    it('性能カスタマイズ欄・特性ステータスのグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await dom.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfCustomAtk } = await dynamicImport('/engine/chara/CCharaConfCustomAtk.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            const hmjob = await dynamicImport('/engine/chara/hmjob.js');
            const migParam = await dynamicImport('/engine/const/EnumMigItemParamId.js');
            g.g_confDataCustomAtk[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP] = 5;
            hmjob.g_pureStatus[migParam.MIG_PARAM_ID_STA] = 7;

            const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
            const head = await dynamicImport('/engine/battle/battlecalc.js');
            const retValArray = footBridge.StAllCalc();
            const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const { CCharaConfCustomAtk } = await dynamicImport('/engine/chara/CCharaConfCustomAtk.js');
            const g = await dynamicImport('/engine/runtime/global.js');
            const hmjob = await dynamicImport('/engine/chara/hmjob.js');
            const migParam = await dynamicImport('/engine/const/EnumMigItemParamId.js');
            g.g_confDataCustomAtk[CCharaConfCustomAtk.CONF_ID_WEAPON_ATK_UP] = 5; // DOM駆動側と同じ設定を注入
            hmjob.g_pureStatus[migParam.MIG_PARAM_ID_STA] = 7;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();

            // 意図的に汚す（別の呼び出しが残した想定の値で全埋め）
            for (let i = 0; i < g.g_confDataCustomAtk.length; i++) g.g_confDataCustomAtk[i] = -1;
            hmjob.g_pureStatus[migParam.MIG_PARAM_ID_STA] = -1;
            hmjob.g_bonusStatus[migParam.MIG_PARAM_ID_STA] = -1;

            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});

describe('時限効果欄（timeItemConf/timeItemConfEffective）（残件台帳 B-09 Phase 2e）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];
    // OBJID_SELECT_TIME_ITEM_N は設定欄が展開されていないとDOM要素自体が存在しない
    // （n_Skill{1,4,7,8}SWと同型。CTimeItemAreaComponentManager.RebuildControls参照）。
    // 生成コーパスは既定で未展開のため、グローバル配列へ直接注入して非既定値を作る
    // （時限効果ID=1=アイシラカード。FLEE+30。枠0に設定し有効化する）。

    it('extractModelFromDom() が時限効果欄の現在値を捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const g = await dynamicImport('/engine/runtime/global.js');
            g.g_timeItemConf[0] = 1;
            g.g_timeItemConfEffective[0] = true;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return { conf: model.timeItemConf[0], effective: model.timeItemConfEffective[0] };
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured.conf).toBe(1);
        expect(captured.effective).toBe(true);
    }, 60000);

    // 修正前は timeItemConf/timeItemConfEffective のモデルフィールドが無く、
    // HydrateFromModel が g_timeItemConf/g_timeItemConfEffective を一切書き込んで
    // いなかった（headless経路での隠れ入力）。ここでは意図的に「間違った」値を
    // グローバルへ書き込んでから calcFromModel() を呼び、それでも DOM 駆動側と
    // 同じ結果になることを検証する。
    it('時限効果欄のグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await dom.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const g = await dynamicImport('/engine/runtime/global.js');
            g.g_timeItemConf[0] = 1;
            g.g_timeItemConfEffective[0] = true;

            const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
            const head = await dynamicImport('/engine/battle/battlecalc.js');
            const retValArray = footBridge.StAllCalc();
            const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const g = await dynamicImport('/engine/runtime/global.js');
            g.g_timeItemConf[0] = 1; // DOM駆動側と同じ設定を注入
            g.g_timeItemConfEffective[0] = true;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();

            // 意図的に汚す（別の呼び出しが残した想定の値で全埋め）
            for (let i = 0; i < g.g_timeItemConf.length; i++) g.g_timeItemConf[i] = -1;
            for (let i = 0; i < g.g_timeItemConfEffective.length; i++) g.g_timeItemConfEffective[i] = false;

            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});

describe('モンスター設定欄（mobConfTaisei/mobConfIjyou/mobConfKyouka）（残件台帳 B-09 Phase 2g）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];
    // モンスター設定欄も展開状態にDOM要素の有無が依存するため（2eと同型）、
    // グローバル配列へ直接注入して非既定値を作る
    // （MOB_CONF_PLAYER_ID_SENTO_AREA=YE_COLOSSEUMは戦闘エリア判定として広く読まれる）。

    it('extractModelFromDom() がモンスター設定欄の現在値を捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const mobconfplayer = await dynamicImport('/engine/monster/mobconfplayer.js');
            mobconfplayer.n_B_TAISEI[mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA] =
                mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return model.mobConfTaisei[mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA];
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured).toBeGreaterThan(0);
    }, 60000);

    // 修正前は mobConfTaisei 等のモデルフィールドが無く、HydrateFromModel が
    // n_B_TAISEI/n_B_IJYOU/n_B_KYOUKA を一切書き込んでいなかった
    // （headless経路での隠れ入力）。ここでは意図的に「間違った」値をグローバルへ
    // 書き込んでから calcFromModel() を呼び、それでも DOM 駆動側と同じ結果になることを検証する。
    it('モンスター設定欄のグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await dom.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const mobconfplayer = await dynamicImport('/engine/monster/mobconfplayer.js');
            mobconfplayer.n_B_TAISEI[mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA] =
                mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM;

            const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
            const head = await dynamicImport('/engine/battle/battlecalc.js');
            const retValArray = footBridge.StAllCalc();
            const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const mobconfplayer = await dynamicImport('/engine/monster/mobconfplayer.js');
            mobconfplayer.n_B_TAISEI[mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA] =
                mobconfplayer.MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM; // DOM駆動側と同じ設定を注入

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();

            // 意図的に汚す（別の呼び出しが残した想定の値で全埋め）
            for (let i = 0; i < mobconfplayer.n_B_TAISEI.length; i++) mobconfplayer.n_B_TAISEI[i] = -1;
            const mobconfdebuf = await dynamicImport('/engine/monster/mobconfdebuf.js');
            for (let i = 0; i < mobconfdebuf.n_B_IJYOU.length; i++) mobconfdebuf.n_B_IJYOU[i] = -1;
            const mobconfbuf = await dynamicImport('/engine/monster/mobconfbuf.js');
            for (let i = 0; i < mobconfbuf.n_B_KYOUKA.length; i++) mobconfbuf.n_B_KYOUKA[i] = -1;

            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});

describe('習得スキル欄（learnedSkill）（残件台帳 B-09 Phase 2h）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    const { query } = entries[0];
    // 習得スキル欄も展開状態にDOM要素の有無が依存するため（2e/2gと同型）、
    // グローバル配列へ直接注入して非既定値を作る。

    it('extractModelFromDom() が習得スキル欄の現在値を捕捉する', async () => {
        const { context, page, errors } = await gotoFixture(query);
        const captured = await page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const learnedskill = await dynamicImport('/engine/skill/learnedskill.js');
            learnedskill.n_A_LearnedSkill[0] = 5;

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            return model.learnedSkill[0];
        });
        await context.close();
        expect(errors, `未捕捉例外: ${errors.join('\n')}`).toEqual([]);
        expect(captured).toBe(5);
    }, 60000);

    // 修正前は learnedSkill のモデルフィールドが無く、HydrateFromModel が
    // n_A_LearnedSkill を一切書き込んでいなかった（headless経路での隠れ入力）。
    // ここでは意図的に「間違った」値をグローバルへ書き込んでから calcFromModel() を呼び、
    // それでも DOM 駆動側と同じ結果になることを検証する。
    it('習得スキル欄のグローバルを意図的に汚しても、calcFromModel()の結果はDOM駆動側と一致する', async () => {
        const dom = await gotoFixture(query);
        const domResult = await dom.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const learnedskill = await dynamicImport('/engine/skill/learnedskill.js');
            learnedskill.n_A_LearnedSkill[0] = 5;

            const footBridge = await dynamicImport('/engine/bridge/stallcalc-bridge.js');
            const head = await dynamicImport('/engine/battle/battlecalc.js');
            const retValArray = footBridge.StAllCalc();
            const { battleCalcResultAll } = head.ComputeBattleResult(retValArray);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await dom.context.close();
        expect(dom.errors, `DOM駆動側で未捕捉例外: ${dom.errors.join('\n')}`).toEqual([]);

        const headless = await gotoFixture(query);
        const headlessResult = await headless.page.evaluate(async () => {
            const dynamicImport = new Function('specifier', 'return import(specifier);') as
                (specifier: string) => Promise<Record<string, any>>;
            const learnedskill = await dynamicImport('/engine/skill/learnedskill.js');
            learnedskill.n_A_LearnedSkill[0] = 5; // DOM駆動側と同じ設定を注入

            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();

            // 意図的に汚す（別の呼び出しが残した想定の値で全埋め）
            for (let i = 0; i < learnedskill.n_A_LearnedSkill.length; i++) learnedskill.n_A_LearnedSkill[i] = -1;

            const battleCalcResultAll = reg.calcFromModel(model);
            return JSON.parse(JSON.stringify(battleCalcResultAll));
        });
        await headless.context.close();
        expect(headless.errors, `headless側で未捕捉例外: ${headless.errors.join('\n')}`).toEqual([]);

        expect(headlessResult).toEqual(domResult);
    }, 60000);
});
