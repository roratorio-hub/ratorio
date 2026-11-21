/**
 * 「入力欄切替」でランダムオプション表示にしたままセーブデータをロードしても、
 * カード・エンチャント欄とランダムオプション欄の両方にロード値が反映されることを検証する。
 * さらに、同じ操作を「カード表示で行った場合」と「ランダムオプション表示で行い、カード表示へ戻した場合」で
 * 結果（全OBJID・戦闘結果・セーブURL・ランダムオプション欄）が一致することを検証する（モード不変性）。
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
import { startStaticServer, closeServer, loadSaveDataEntries, evalObjidSnapshot } from '../helpers/objid-snapshot.js';

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
    await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
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


//================================================================================================
// モード不変性: 操作を行う時点の表示モード（カード/ランダムオプション）が結果に影響しないこと
//================================================================================================

/** 現在の表示モード。カード欄が画面にあればカード表示。 */
function isCardMode(page: Page): Promise<boolean> {
    return page.evaluate(() => document.getElementById('OBJID_BODY_CARD_1') !== null);
}

/** 表示モードをカード表示にそろえる。 */
async function ensureCardMode(page: Page): Promise<void> {
    if (!(await isCardMode(page))) await toggleSlotMode(page);
}

/** 操作後の状態を、カード表示にそろえてから採取する（最後は元のカード表示に戻す）。 */
async function captureNormalized(page: Page): Promise<{ full: Snapshot; cards: Snapshot; rndOpts: Snapshot; query: string }> {
    await ensureCardMode(page);
    const full = await evalObjidSnapshot(page);
    // URL出力欄とセーブ欄の開閉は、採取のたびに状態が変わるため比較から外す
    delete full['OBJID_INPUT_URL_OUT_MIG'];
    delete full['OBJID_SWITCH_SAVE_CTRL_MIG'];
    const cards = await snapshotCards(page);
    const query = await outputQuery(page);
    await toggleSlotMode(page);
    const rndOpts = await snapshotRndOpts(page);
    await toggleSlotMode(page);
    return { full, cards, rndOpts, query };
}

/** select を現在値と異なる option へ切り替えて change を発火する。切り替えられたら true。 */
function changeSelectToAnother(page: Page, id: string): Promise<boolean> {
    return page.evaluate((selectId) => {
        const select = document.getElementById(selectId) as HTMLSelectElement | null;
        if (!select) return false;
        const candidates = [...select.options].filter((o) => o.value !== select.value);
        const option = candidates[Math.min(2, candidates.length - 1)];
        if (!option) return false;
        select.value = option.value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }, id);
}

/** 要素をクリックする。要素が無ければ false。 */
function clickIfExists(page: Page, selector: string): Promise<boolean> {
    return page.evaluate((sel) => {
        const el = document.querySelector(sel) as HTMLElement | null;
        if (!el) return false;
        el.click();
        return true;
    }, selector);
}

type SlotOp = {
    name: string;
    /** 対象フィクスチャ（entries の添字） */
    fixtures: number[];
    /** 操作を実行する。実行できたら true */
    run: (page: Page) => Promise<boolean>;
    /** 既知の不具合（ランダムオプション表示中に実行するとカード等が失われる）。現状は不一致になることを検証する */
    knownBroken?: boolean;
};

const SLOT_OPS: SlotOp[] = [
    { name: '本体装備（防具）の変更', fixtures: [4], run: (p) => changeSelectToAnother(p, 'OBJID_BODY'), knownBroken: true },
    { name: '本体装備（右手武器）の変更', fixtures: [3], run: (p) => changeSelectToAnother(p, 'OBJID_ARMS_RIGHT'), knownBroken: true },
    { name: '左右武器入れ替え', fixtures: [3], run: (p) => clickIfExists(p, '#OBJID_SPAN_SWAP_ARMS input') },
    { name: 'アクセサリコピー', fixtures: [4], run: (p) => clickIfExists(p, '#OBJID_ACCESSORY_1_COPY'), knownBroken: true },
    {
        name: 'スパノビの魂トグル',
        fixtures: [0],
        // RefreshSuperNoviceFullWeapon は魂スキルの select（スーパーノービス限定）の click から呼ばれる関数。
        // ここでは職業を問わず直接呼ぶ（ページが読み込み済みの同一モジュールインスタンスを取得する）。
        // （vitest が dynamic import を書き換えるため、ページ側で評価する文字列として渡す）
        run: (p) => p.evaluate(`import('/engine/status/stallcalc.js').then((mod) => {
            if (typeof mod.RefreshSuperNoviceFullWeapon !== 'function') return false;
            mod.RefreshSuperNoviceFullWeapon(true);
            return true;
        })`) as Promise<boolean>,
        knownBroken: true,
    },
    {
        name: 'アイテムパック（ミミミクエスト報酬一式）の適用',
        fixtures: [0],
        run: async (p) => {
            const ok = await p.evaluate(() => {
                const sw = document.getElementById('OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX') as HTMLInputElement | null;
                if (!sw) return false;
                if (!sw.checked) sw.click();
                const select = document.getElementById('OBJID_SELECT_QUICK_CONTROL_ITEMPACK') as HTMLSelectElement | null;
                if (!select) return false;
                select.value = '17';
                select.dispatchEvent(new Event('input', { bubbles: true }));
                const button = [...document.querySelectorAll('#ID_QUICK_CONTROL input[type="button"]')]
                    .find((el) => (el as HTMLInputElement).value === '適用') as HTMLElement | undefined;
                if (!button) return false;
                button.click();
                return true;
            });
            return ok;
        },
    },
];

/** 2つの採取結果の不一致項目を返す（一致なら空配列）。 */
function diffFacets(
    base: Awaited<ReturnType<typeof captureNormalized>>,
    actual: Awaited<ReturnType<typeof captureNormalized>>,
): string[] {
    const out: string[] = [];
    if (JSON.stringify(actual.cards) !== JSON.stringify(base.cards)) out.push('cards');
    if (JSON.stringify(actual.rndOpts) !== JSON.stringify(base.rndOpts)) out.push('rndOpts');
    if (actual.query !== base.query) out.push('query');
    if (JSON.stringify(actual.full) !== JSON.stringify(base.full)) out.push('full');
    return out;
}

describe('同じ操作の結果は、操作時の表示モード（カード/ランダムオプション）に依存しない', () => {
    if (entries.length === 0) {
        it('フィクスチャなし', () => { console.warn('sample-savedata-new.md にエントリがありません'); });
        return;
    }

    for (const op of SLOT_OPS) {
        for (const fixtureIndex of op.fixtures) {
            if (fixtureIndex >= entries.length) continue;
            const { label, query } = entries[fixtureIndex];
            it(`${label}: ${op.name}${op.knownBroken ? '（既知の不具合: 現状は不一致）' : ''}`, async () => {
                // 基準: カード表示のまま操作
                const basePage = await openCalcx();
                let base: Awaited<ReturnType<typeof captureNormalized>>;
                try {
                    await loadUrl(basePage, query);
                    expect(await op.run(basePage), `${op.name}を実行できませんでした（基準側）`).toBe(true);
                    await settle(basePage);
                    base = await captureNormalized(basePage);
                } finally {
                    await basePage.context().close();
                }

                // 検証: ランダムオプション表示のまま操作
                const page = await openCalcx();
                let actual: Awaited<ReturnType<typeof captureNormalized>>;
                try {
                    await loadUrl(page, query);
                    await toggleSlotMode(page);
                    expect(await op.run(page), `${op.name}を実行できませんでした（検証側）`).toBe(true);
                    await settle(page);
                    actual = await captureNormalized(page);
                } finally {
                    await page.context().close();
                }

                const facets = diffFacets(base, actual);
                if (op.knownBroken) {
                    // 修正後は knownBroken を外す（その時点でこのアサーションが失敗して気付ける）
                    expect(facets, '既知の不具合が直ったので knownBroken を外してください').toContain('cards');
                } else {
                    expect(facets).toEqual([]);
                    expect(actual.cards).toEqual(base.cards);
                    expect(actual.rndOpts).toEqual(base.rndOpts);
                    expect(actual.query).toBe(base.query);
                    expect(actual.full).toEqual(base.full);
                }
            }, 180000);
        }
    }
});

describe('表示モードを往復しても、カード・衣装・ランダムオプションの値は保たれる', () => {
    it('カード欄・衣装欄を変更してモードを往復しても変わらない', async () => {
        const page = await openCalcx();
        try {
            // 衣装を現在値と異なる値へ変更する（初期状態＝ノービスは衣装を選べる）
            expect(await changeSelectToAnother(page, 'OBJID_HEAD_UNDER_COSTUME'), '衣装を変更できませんでした').toBe(true);
            // カードを現在値と異なる値へ変更する
            expect(await changeSelectToAnother(page, 'OBJID_HEAD_TOP_CARD_1'), 'カードを変更できませんでした').toBe(true);
            await settle(page);

            const costumeBefore = await page.evaluate(() => (document.getElementById('OBJID_HEAD_UNDER_COSTUME') as HTMLSelectElement).value);
            expect(costumeBefore).not.toBe('0');
            const before = await captureNormalized(page);

            await toggleSlotMode(page);
            await toggleSlotMode(page);

            const after = await captureNormalized(page);
            const costumeAfter = await page.evaluate(() => (document.getElementById('OBJID_HEAD_UNDER_COSTUME') as HTMLSelectElement).value);
            expect(costumeAfter).toBe(costumeBefore);
            expect(after.cards).toEqual(before.cards);
            expect(after.rndOpts).toEqual(before.rndOpts);
            expect(after.query).toBe(before.query);
            // プログラムから値を変えた select は TomSelect の表示が追従しないため、TomSelect 側の表示は比較しない
            const withoutTomSelect = (snapshot: Snapshot) => Object.fromEntries(Object.entries(snapshot).filter(([id]) => !/-ts-(control|dropdown)$/.test(id)));
            expect(withoutTomSelect(after.full)).toEqual(withoutTomSelect(before.full));
        } finally {
            await page.context().close();
        }
    }, 180000);
});

describe('ランダムオプションの値は、モードを往復しても保たれる', () => {
    it('ランダムオプション欄を変更してモードを往復しても変わらない', async () => {
        const index = Math.min(6, entries.length - 1);
        const page = await openCalcx();
        try {
            await loadUrl(page, entries[index].query);
            await toggleSlotMode(page);

            // 選択肢が複数ある値欄を1つ変更する
            const changed = await page.evaluate(() => {
                const selects = [...document.querySelectorAll('select[id*="_RNDOPT_VALUE_"]')] as HTMLSelectElement[];
                for (const select of selects) {
                    const option = [...select.options].find((o) => o.value !== select.value);
                    if (!option) continue;
                    select.value = option.value;
                    select.dispatchEvent(new Event('change', { bubbles: true }));
                    return select.id;
                }
                return '';
            });
            expect(changed, 'ランダムオプション値を変更できませんでした').not.toBe('');
            await settle(page);

            const rndOptBefore = await snapshotRndOpts(page);
            expect(rndOptBefore[changed]).toBeDefined();
            await toggleSlotMode(page);
            await toggleSlotMode(page);
            expect(await snapshotRndOpts(page)).toEqual(rndOptBefore);

            // カード表示でセーブしても、その値が出力される（変更前のロード値とは異なる）
            await toggleSlotMode(page);
            expect(await outputQuery(page)).not.toBe(entries[index].query);
        } finally {
            await page.context().close();
        }
    }, 180000);
});
