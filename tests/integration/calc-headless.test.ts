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
    // <script type="module"> であり、head.js/foot.js 経由の依存チェーンが長いぶん評価完了が
    // 遅れうる。上記の条件だけでは「攻撃手段セレクトは整った」ことしか保証できず、
    // フルスイート実行時の負荷が高いと captureHeadless() 側が _ratorioReg の未登録関数を
    // 呼んで `reg.extractModelFromDom is not a function` になることがあった
    // （headless[24]/[56]のflake、2026-08-26 B-23検証時に発覚）。calc-headless.js 自体の
    // 登録完了も同じ条件待機に含める。
    await page.waitForFunction(async () => {
        const dynamicImport = new Function('specifier', 'return import(specifier);') as
            (specifier: string) => Promise<Record<string, any>>;
        const mod = await dynamicImport('/engine/CAttackMethodAreaComponentManager.js');
        const mgr = mod.CAttackMethodAreaComponentManager;
        const sel = mgr?.selectObjectArray?.[0];
        if (!sel) return false;
        if (mgr.GetAttackMethodData(sel.value) == null) return false;
        const reg = (globalThis as any)._ratorioReg;
        return typeof reg?.extractModelFromDom === 'function' && typeof reg?.calcFromModel === 'function';
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
        const footBridge = await dynamicImport('/engine/foot-bridge.js');
        const head = await dynamicImport('/engine/head.js');
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
