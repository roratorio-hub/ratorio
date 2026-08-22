/**
 * DPS clip 履歴パネルの統合テスト（refactor/clip-history-dedupe）。
 *
 * calchistory.js（新規構築時）と CSaveController.js（セーブデータ復元時）に
 * バイト単位で重複していたモーダルHTMLスケルトン・履歴行テンプレートを
 * calchistory.js 側の共有関数（buildHistoryPanelHtml / buildHistoryRowHtml）に
 * 統合し、同時に以下を修正した:
 *
 *   - XSS: 履歴行のメモ（prompt() 由来の自由入力文字列）がテキスト内容と
 *     value 属性の両方に無エスケープで埋め込まれていた
 *     （二重引用符を含むメモで value 属性を脱出できた。メモはセーブデータの
 *     URL に同梱されるため self-XSS に留まらない）
 *   - jquery-modal 依存をネイティブ <dialog> に置換
 *     （このパネル2ファイルのみが使っていた唯一の実プラグイン依存）
 *
 * 追補（同ブランチ追加コミット）: 上記の <dialog> 置換で `showModal()` を使ったところ、
 * 内部の自動フォーカスがブラウザ標準のフォーカス時スクロールを誘発し、List/Reset操作の
 * たびにページが scrollY:0 まで巻き戻る回帰が実ブラウザ確認で発覚した。`showModal()`
 * （モーダル・top layer昇格）をやめ、`.show()`（非モーダル）+ 自前の #clip_modal_blocker +
 * `position: fixed` 手動配置に置き換えて解消した（jquery-modal 自身の実装方式を踏襲）。
 * openHistoryModal()/wireHistoryModalClose() がその配線。
 *
 * ここは「イベントリスナーの接続」「実際のユーザー操作フロー」（ダイアログの
 * 開閉・ESC・backdropクリック）にあたるため、testing.md の基準により
 * ユニットテストではなく Playwright で検証する。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

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

/** memo に prompt() で悪意ある文字列を返しつつ、clip → list表示 までを行う共通セットアップ。 */
async function setupClipWithMemo(page: Page, memo: string): Promise<void> {
    page.on('dialog', async (dialog) => {
        if (dialog.type() === 'prompt') {
            await dialog.accept(memo);
        } else {
            await dialog.dismiss().catch(() => {});
        }
    });
    await page.check('#clip_with_memo');
    await page.click('#history_clip');
    await page.waitForTimeout(500);
}

describe('clip履歴パネル', () => {
    it('memo のXSS試行文字列がエスケープされ、テーブル構造が壊れない', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(String(e)));

        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1000);

        const maliciousMemo = 'memo with " quote <script>alert(1)</script>';
        await setupClipWithMemo(page, maliciousMemo);
        await page.click('#history_list');
        await page.waitForTimeout(300);

        const rowInfo = await page.evaluate(() => {
            const div = document.querySelector<HTMLElement>('#clip_modal_table .clip_memo');
            const input = document.querySelector<HTMLInputElement>('#clip_modal_table input.clip_memo');
            return {
                divText: div?.textContent ?? null,
                inputValue: input?.value ?? null,
                rowCount: document.querySelectorAll('#clip_modal_table tbody tr').length,
                scriptExecuted: (window as unknown as { __xssFired?: boolean }).__xssFired === true,
            };
        });

        await context.close();

        expect(pageErrors, `未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
        // エスケープされていれば、テキスト内容・value 属性ともに元の文字列がそのまま
        // リテラルとして保持される（<script> がタグとして解釈されテーブル構造が壊れない）。
        expect(rowInfo.divText).toBe(maliciousMemo);
        expect(rowInfo.inputValue).toBe(maliciousMemo);
        expect(rowInfo.rowCount).toBe(1);
        expect(rowInfo.scriptExecuted).toBe(false);
    });

    it('history_list クリックでダイアログが開き、×ボタンで閉じてグラフが元の位置に戻る', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1000);
        await page.click('#history_clip');
        await page.waitForTimeout(300);

        await page.click('#history_list');
        await page.waitForTimeout(300);
        expect(await page.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)).toBe(true);

        await page.click('#clip_modal_close');
        await page.waitForTimeout(200);
        expect(await page.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)).toBe(false);
        expect(
            await page.evaluate(() =>
                document.getElementById('history_container')?.contains(document.getElementById('history_graph'))
            )
        ).toBe(true);

        await context.close();
    });

    it('ESCキーでダイアログが閉じる', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1000);
        await page.click('#history_clip');
        await page.waitForTimeout(300);
        await page.click('#history_list');
        await page.waitForTimeout(300);

        await page.keyboard.press('Escape');
        await page.waitForTimeout(200);

        expect(await page.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)).toBe(false);
        await context.close();
    });

    it('backdrop（ダイアログ外側）クリックで閉じる', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1000);
        await page.click('#history_clip');
        await page.waitForTimeout(300);
        await page.click('#history_list');
        await page.waitForTimeout(300);

        // ダイアログはビューポート中央に幅800px以上で表示される。左上隅はダイアログの
        // コンテンツ領域外（backdrop）になるはず。
        await page.mouse.click(5, 5);
        await page.waitForTimeout(200);

        expect(await page.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)).toBe(false);
        await context.close();
    });

    // CSaveController.js は calchistory.js とは別に buildHistoryPanelHtml/buildHistoryRowHtml
    // を呼ぶ独立したコードパス（セーブデータにチャートデータが同梱されている場合の復元時、
    // #restoreChartDisplay 経由）。dedup 後も両方が動くことを、実際に
    // clip → URL出力 → 別ページでURL読み込み → 復元 の往復で検証する。
    it('セーブURLにチャートデータを含めて復元すると、CSaveController.js 側のパネルも同様に動作する', async () => {
        const context = await browser.newContext();
        const clipPage = await context.newPage();
        const clipErrors: string[] = [];
        clipPage.on('pageerror', (e) => clipErrors.push(String(e)));

        const maliciousMemo = 'memo with " quote <script>alert(1)</script>';
        clipPage.on('dialog', async (dialog) => {
            if (dialog.type() === 'prompt') await dialog.accept(maliciousMemo);
            else if (dialog.type() === 'confirm') await dialog.accept(); // 「クリップデータを保存しますか？」
            else await dialog.dismiss().catch(() => {});
        });

        await clipPage.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await clipPage.waitForTimeout(1000);
        await clipPage.check('#clip_with_memo');
        await clipPage.click('#history_clip');
        await clipPage.waitForTimeout(500);

        await clipPage.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
        await clipPage.waitForSelector('#OBJID_INPUT_URL_OUT_MIG', { state: 'visible', timeout: 5000 });
        await clipPage.click('#OBJID_BUTTON_URL_OUT_MIG');
        await clipPage.waitForTimeout(300);
        const outputUrl = await clipPage.inputValue('#OBJID_INPUT_URL_OUT_MIG');
        await clipPage.close();

        expect(clipErrors, `clip中に未捕捉例外: ${clipErrors.join('\n')}`).toEqual([]);
        expect(outputUrl.length).toBeGreaterThan(200); // chart データが同梱されていること

        const restorePage = await context.newPage();
        const restoreErrors: string[] = [];
        restorePage.on('pageerror', (e) => restoreErrors.push(String(e)));
        restorePage.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

        await restorePage.goto(outputUrl, { waitUntil: 'networkidle', timeout: 60000 });
        await restorePage.waitForTimeout(1500);

        // #restoreChartDisplay によるパネル再構築で要素が重複していないこと
        const counts = await restorePage.evaluate(() => ({
            clipModal: document.querySelectorAll('#clip_modal').length,
            historyGraph: document.querySelectorAll('#history_graph').length,
        }));
        expect(counts.clipModal).toBe(1);
        expect(counts.historyGraph).toBe(1);

        await restorePage.click('#history_list');
        await restorePage.waitForTimeout(300);
        expect(
            await restorePage.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)
        ).toBe(true);

        const rowInfo = await restorePage.evaluate(() => {
            const div = document.querySelector<HTMLElement>('#clip_modal_table .clip_memo');
            const input = document.querySelector<HTMLInputElement>('#clip_modal_table input.clip_memo');
            return {
                divText: div?.textContent ?? null,
                inputValue: input?.value ?? null,
                rowCount: document.querySelectorAll('#clip_modal_table tbody tr').length,
            };
        });
        expect(rowInfo.rowCount).toBe(1);
        expect(rowInfo.divText).toBe(maliciousMemo);
        expect(rowInfo.inputValue).toBe(maliciousMemo);

        await restorePage.click('#clip_modal_close');
        await restorePage.waitForTimeout(200);
        expect(
            await restorePage.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)
        ).toBe(false);

        expect(restoreErrors, `復元中に未捕捉例外: ${restoreErrors.join('\n')}`).toEqual([]);
        await context.close();
    });

    // showModal() の内部自動フォーカスがブラウザ標準のフォーカス時スクロールを誘発し、
    // List操作のたびにページが scrollY:0 まで巻き戻る回帰があった（実ブラウザ確認で発覚）。
    // jquery-modal は背景ページの位置を一切動かさなかったため、この点は黒箱テストでは
    // 検出できず、Phase 1 時点のテストには無かった観点。
    it('ページをスクロールした状態でList/Resetを開閉してもスクロール位置が変化しない', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(1000);
        await page.click('#history_clip');
        await page.waitForTimeout(300);

        await page.evaluate(() => window.scrollTo(0, 900));
        await page.waitForTimeout(200);
        const before = await page.evaluate(() => window.scrollY);
        expect(before).toBe(900);

        await page.click('#history_list');
        await page.waitForTimeout(300);
        expect(await page.evaluate(() => window.scrollY)).toBe(before);
        expect(
            await page.evaluate(() => (document.getElementById('clip_modal') as HTMLDialogElement | null)?.open)
        ).toBe(true);

        await page.click('#clip_modal_close');
        await page.waitForTimeout(200);
        expect(await page.evaluate(() => window.scrollY)).toBe(before);

        // Reset側でも同様（別のクリックハンドラなので独立して確認する）
        await page.click('#history_list');
        await page.waitForTimeout(300);
        await page.click('#clip_modal_close');
        await page.waitForTimeout(200);
        await page.click('#history_reset');
        await page.waitForTimeout(200);
        expect(await page.evaluate(() => window.scrollY)).toBe(before);

        await context.close();
    });
});
