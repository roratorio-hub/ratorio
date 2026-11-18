/**
 * 「入力欄切替」でランダムオプション表示にしたままセーブデータをロードしても、
 * カード・エンチャント欄とランダムオプション欄の両方にロード値が反映されることを検証する。
 *
 * 不具合の原因: ロード中に呼ばれる SaveSlotStateCardAll() が、ランダムオプション表示中は
 * DOM に存在しないカード欄 select を 0 として読み、ロード済みのカード値を全部位分上書きしていた。
 * 同じ関数がシャドウ装備の手動変更（OnChangeCard）からも呼ばれるため、ランダムオプション表示中の
 * シャドウ装備変更でも本体装備のカードが消えていた。
 * セーブ側も同様に、ランダムオプション表示中はカード欄が無いため、カードが全て0で出力されていた。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

const entries = loadSaveDataEntries(join(__dirname, 'fixtures/sample-savedata-new.md'), 'new');

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

type Snapshot = Record<string, string>;

/** 本体装備11部位のカード欄（表示中のときのみ存在）の値。シャドウ装備のエンチャント欄も含める。 */
function snapshotCards(page: Page): Promise<Snapshot> {
    return page.evaluate(() => {
        const out: Record<string, string> = {};
        const re = /^OBJID_(ARMS_RIGHT|ARMS_LEFT|HEAD_TOP|HEAD_MID|HEAD_UNDER|SHIELD|BODY|SHOULDER|SHOES|ACCESSORY_[12])(_CARD_\d)?$/;
        document.querySelectorAll('select').forEach((el) => {
            if (re.test(el.id) || el.classList.contains('card-select')) out[el.id] = (el as HTMLSelectElement).value;
        });
        return out;
    });
}

/** 本体装備のランダムオプション欄（表示中のときのみ存在）の値。 */
function snapshotRndOpts(page: Page): Promise<Snapshot> {
    return page.evaluate(() => {
        const out: Record<string, string> = {};
        document.querySelectorAll('select[id*="_RNDOPT_"]').forEach((el) => {
            out[el.id] = (el as HTMLSelectElement).value;
        });
        return out;
    });
}

/** ロードは非同期（ローディング表示→setTimeout）なので、画面状態が安定するまで待つ。 */
async function settle(page: Page): Promise<void> {
    let prev = '';
    let stableCount = 0;
    const deadline = Date.now() + 20000;
    while (Date.now() < deadline) {
        await page.waitForTimeout(400);
        const cur = JSON.stringify([await snapshotCards(page), await snapshotRndOpts(page)]);
        stableCount = cur === prev ? stableCount + 1 : 0;
        prev = cur;
        if (stableCount >= 2) return;
    }
    throw new Error('画面状態が安定しませんでした');
}

async function openCalcx(): Promise<Page> {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
    await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(500);
    return page;
}

async function loadUrl(page: Page, query: string): Promise<void> {
    await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
    await page.fill('#OBJID_INPUT_URL_IN_MIG', `${baseUrl}/ro4/m/calcx.html?${query}`);
    await page.click('#OBJID_BUTTON_URL_IN_MIG');
    await settle(page);
}

async function toggleSlotMode(page: Page): Promise<void> {
    await page.click('#OBJID_SLOT_MODE_BUTTON');
    await settle(page);
}

async function outputQuery(page: Page): Promise<string> {
    await page.click('#OBJID_BUTTON_URL_OUT_MIG');
    await page.waitForTimeout(500);
    const url = await page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
    return url.split('?')[1] ?? '';
}

describe('ランダムオプション表示のままセーブデータをロードする', () => {
    if (entries.length === 0) {
        it('フィクスチャなし', () => { console.warn('sample-savedata-new.md にエントリがありません'); });
        return;
    }

    for (const { label, query } of entries) {
        it(`${label}: カード欄・ランダムオプション欄ともにロード値が反映される`, async () => {
            // 基準: カード表示でロードした結果（カード欄の値・ランダムオプション表示に切り替えた値）
            const basePage = await openCalcx();
            let baseCards: Snapshot;
            let baseRndOpts: Snapshot;
            try {
                await loadUrl(basePage, query);
                baseCards = await snapshotCards(basePage);
                await toggleSlotMode(basePage);
                baseRndOpts = await snapshotRndOpts(basePage);
            } finally {
                await basePage.context().close();
            }
            // 比較が空振りしないこと（カードが1つも入っていないフィクスチャでは検証にならない）
            expect(
                Object.entries(baseCards).some(([id, v]) => /_CARD_\d$/.test(id) && v !== '0'),
                'フィクスチャにカード・エンチャントが1つも入っていません',
            ).toBe(true);

            // 検証: ランダムオプション表示のままロード
            const page = await openCalcx();
            try {
                await toggleSlotMode(page);
                await loadUrl(page, query);

                // ロード後もランダムオプション表示のまま、ロード値が表示されている
                expect(await snapshotRndOpts(page)).toEqual(baseRndOpts);

                // ランダムオプション表示のままセーブしても、ロードしたデータと一致する（カードが欠落しない）
                expect(await outputQuery(page)).toBe(query);

                // カード表示に戻すとロード値が復元されている
                await toggleSlotMode(page);
                expect(await snapshotCards(page)).toEqual(baseCards);
                expect(await outputQuery(page)).toBe(query);
            } finally {
                await page.context().close();
            }
        }, 120000);
    }

    it('ランダムオプション表示中にシャドウ装備を変更しても本体装備のカードは消えない', async () => {
        const page = await openCalcx();
        try {
            await loadUrl(page, entries[0].query);
            const before = await snapshotCards(page);
            await toggleSlotMode(page);

            const changed = await page.evaluate(() => {
                const select = document.querySelector('.equip-block .item-select') as HTMLSelectElement | null;
                const option = select && [...select.options].find((o) => o.value !== select.value);
                if (!select || !option) return false;
                select.value = option.value;
                select.dispatchEvent(new Event('change', { bubbles: true }));
                return true;
            });
            expect(changed, 'シャドウ装備の選択肢を変更できませんでした').toBe(true);
            await settle(page);

            await toggleSlotMode(page);
            const after = await snapshotCards(page);
            // 本体装備のカード欄（OBJID_*_CARD_n）のみ比較する（変更したシャドウ装備側は値が変わる）
            const mainOnly = (s: Snapshot) => Object.fromEntries(Object.entries(s).filter(([id]) => /^OBJID_(?!SHADOW)/.test(id)));
            expect(mainOnly(after)).toEqual(mainOnly(before));
        } finally {
            await page.context().close();
        }
    }, 120000);
});
