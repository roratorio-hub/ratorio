/**
 * ro4/m/calcx.html 統合テスト
 *
 * テストスイート:
 *   1. 起動テスト         — ページロード・ユーザー操作で未捕捉 JS 例外が発生しないことを確認
 *   2. URL 往復テスト     — 新形式フィクスチャのみ。ロード後に出力してもクエリが変質しないことを確認
 *   3. 全 OBJID_* 比較   — 全セクション展開後に全 OBJID_* 要素の値を本番と比較（広域リグレッション検出）
 *
 * フィクスチャ:
 *   fixtures/sample-savedata-new.md — 新形式（ro4 形式）URL。スイート 2・3 両方で使用。
 *   fixtures/sample-savedata-old.md — 旧形式（roro 形式）URL。スイート 3 のみ使用。
 *
 * セーブデータ復元テストで検出できる主なバグ（スイート 3）:
 *   - Pattern A バリアント: let X（classic script）と window.X の乖離
 *     例: n_A_Arrow が head.js の let バインディングを読んで矢の選択値がズレる
 *   - Pattern B: 非ESMスクリプトが export let 配列を差し替えて習得スキル表示が消える
 *   - 折りたたみセクション内要素（CConfBase 等）がクリックなしでは生成されないバグ
 *
 * 本番サイトへのアクセスが必要なテストはオフライン環境では自動スキップされる。
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { createServer, type Server } from 'node:http';
import { createReadStream, existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────

const PROJECT_ROOT = join(__dirname, '../..');

const CONTENT_TYPES: Record<string, string> = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'text/javascript; charset=utf-8',
    '.mjs':  'text/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.yaml': 'text/yaml; charset=utf-8',
    '.yml':  'text/yaml; charset=utf-8',
    '.png':  'image/png',
    '.gif':  'image/gif',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ttf':  'font/ttf',
};

function createStaticServer(root: string): Server {
    return createServer((req, res) => {
        const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
        const filePath = join(root, safe);
        if (!filePath.startsWith(root) || !existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end(`Not found: ${urlPath}`);
            return;
        }
        const ext = extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] ?? 'application/octet-stream' });
        createReadStream(filePath).pipe(res);
    });
}

// ─── セーブデータフィクスチャ ─────────────────────────────────────────────────

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const FIXTURES_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');

type FixtureEntry = { label: string; prodUrl: string; query: string };

/** フィクスチャファイルから本番URLのリストを読み込む */
function loadSaveDataEntries(filePath: string, prefix: string): FixtureEntry[] {
    if (!existsSync(filePath)) return [];
    return readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'))
        .map((url, i) => {
            const qi = url.indexOf('?');
            return {
                label: `${prefix}[${i}]`,
                prodUrl: url,
                query: qi >= 0 ? url.slice(qi + 1) : '',
            };
        })
        .filter(({ query }) => query.length > 0);
}

// 新形式: 比較 + 往復テスト両方の対象
const entriesNew = loadSaveDataEntries(FIXTURES_NEW_PATH, 'new');
// 旧形式: 全 OBJID_* 比較（スイート 3）の対象
const entriesOld = loadSaveDataEntries(FIXTURES_OLD_PATH, 'old');
// 全フィクスチャ（スイート 3 で使用）
const allEntries = [...entriesNew, ...entriesOld];

// ─── 例外収集ヘルパー ─────────────────────────────────────────────────────────

const SUPPRESSED_ERROR_PATTERNS: RegExp[] = [
    // ESM 移行と無関係な既知エラーをここに追加する（コメント必須）
    // calchistory.js が使用する Chart.js を CDN から取得できないテスト環境で発生する。ESM 移行と無関係。
    /Chart is not defined/,
];

function isSuppressed(message: string): boolean {
    return SUPPRESSED_ERROR_PATTERNS.some((re) => re.test(message));
}

/**
 * ページを開いて setupFn を実行し、発生した未捕捉 JS 例外をすべて返す。
 * pageerror と unhandledrejection の両方を収集する。
 */
async function collectPageErrors(
    browser: Browser,
    setupFn: (page: Page) => Promise<void>
): Promise<string[]> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors: string[] = [];

    page.on('pageerror', (err) => {
        if (!isSuppressed(err.message)) errors.push(`[pageerror] ${err.message}`);
    });

    // Playwright の pageerror では拾えない unhandledrejection をページ内で直接収集する
    await page.addInitScript(() => {
        (window as any).__pendingRejections = [];
        window.addEventListener('unhandledrejection', (event) => {
            const msg = (event.reason as any)?.message ?? String(event.reason);
            (window as any).__pendingRejections.push(msg);
        });
    });

    await setupFn(page);

    const rejections: string[] = await page.evaluate(
        () => (window as any).__pendingRejections ?? []
    );
    for (const msg of rejections) {
        if (!isSuppressed(msg)) errors.push(`[unhandledrejection] ${msg}`);
    }

    await context.close();
    return errors;
}

// ─── テストセットアップ ──────────────────────────────────────────────────────

let server: Server;
let browser: Browser;
let baseUrl: string;

beforeAll(async () => {
    server = createStaticServer(PROJECT_ROOT);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const port = typeof addr === 'object' && addr !== null ? addr.port : 0;
    baseUrl = `http://127.0.0.1:${port}`;
    browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
    await browser?.close();
    await new Promise<void>((resolve, reject) =>
        server?.close((err) => (err ? reject(err) : resolve()))
    );
});

// ─── スイート 1: 起動テスト ──────────────────────────────────────────────────

describe('ro4/m/calcx.html 起動テスト', () => {
    it('スクリプト読み込みと初期化で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);
        });
        expect(errors, formatErrorMsg('ページロード中', errors)).toHaveLength(0);
    });

    // 職業変更は equip.js・learnedskill.js 等の初期化コードをトリガーする。
    // ESM 移行で壊れた場合に ReferenceError として現れることがあるため検出する。
    it('職業変更操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.selectOption('#OBJID_SELECT_JOB', { index: 1 });
            await page.waitForTimeout(500);
            await page.selectOption('#OBJID_SELECT_JOB', { index: 0 });
            await page.waitForTimeout(300);
        });
        expect(errors, formatErrorMsg('職業変更操作中', errors)).toHaveLength(0);
    });

    // 全折りたたみセクション + 全 CConfBase/CConfBase2 設定欄スイッチを展開する操作。
    // window.CConfBase / window.CConfBase2 が未登録（compat ブロック除去等）の場合に
    // "CConfBase is not defined" ReferenceError として現れるため検出する。
    it('全設定欄展開操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            // Pass 1 & 2: folding-switch-MIG
            for (let pass = 0; pass < 2; pass++) {
                await page.evaluate(() => {
                    document.querySelectorAll<HTMLInputElement>(
                        'input[type="checkbox"].folding-switch-MIG:not(:checked)'
                    ).forEach((cb) => cb.click());
                });
                await page.waitForTimeout(300);
            }
            // Pass 3: CConfBase / CConfBase2 スイッチ
            await page.evaluate(() => {
                document.querySelectorAll<HTMLInputElement>(
                    '[id^="OBJID_CONTROL_CONF_"][id$="_SWITCH"]:not(:checked), ' +
                    '[id^="OBJID_CONTROL_CONF2_"][id$="_SWITCH"]:not(:checked)'
                ).forEach((cb) => cb.click());
            });
            await page.waitForTimeout(300);
        });
        expect(errors, formatErrorMsg('全設定欄展開操作中', errors)).toHaveLength(0);
    });

    // スキルSW チェックボックスのクリック操作をトリガーする。
    // dewindow フェーズで window への登録を除去した後、インライン onclick や
    // setAttribute("onClick",...) の残留によって ReferenceError が発生するケースを検出する。
    //
    // 各 SW が 2 回クリックされることが重要:
    //   1 回目: eventsetup.js が初期要素にアタッチしたリスナーが発火（DOM 再構築）
    //   2 回目: 再構築後の新要素にリスナーが正しく再アタッチされているか確認
    //
    // 対象スイッチ:
    //   - A1_SKILLSW: 職固有自己支援（BuffJobSpecificSelf.js / Click_PassSkillSW）
    //   - A3_SKILLSW: 演奏/踊り系（BuffMusicAndDance.js / Click_Skill3SW）
    //   - A4_SKILLSW: ギルドスキル/ゴスペル（BuffGuildAndGospel.js / Click_Skill4SW）
    //   - A7_SKILLSW: アイテム/食品（BuffItemAndFood.js / Click_Skill7SW）
    //   - A8_SKILLSW: その他支援（BuffOtherCategory.js / Click_Skill8SW）
    //   - OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX: 習得スキル欄（learnedskill.js / OnClickSkillSWLearned）
    it('スキルSW チェックボックスのクリック操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // 各スキル SW を ON→OFF とトグル（name 属性で特定できるもの）
            // DOM 再構築後の要素に再アタッチが正しく行われているかを 2 回目クリックで確認する。
            const nameSwNames = ['A1_SKILLSW', 'A3_SKILLSW', 'A4_SKILLSW', 'A7_SKILLSW', 'A8_SKILLSW'];
            for (const swName of nameSwNames) {
                await page.evaluate((name) => {
                    document.querySelector<HTMLInputElement>(`[name="${name}"]`)?.click(); // OFF→ON
                }, swName);
                await page.waitForTimeout(200);
                await page.evaluate((name) => {
                    document.querySelector<HTMLInputElement>(`[name="${name}"]`)?.click(); // ON→OFF（再構築後）
                }, swName);
                await page.waitForTimeout(200);
            }

            // 習得スキル欄 SW を ON→OFF とトグル
            // （初期化時に OnClickSkillSWLearned() が呼ばれ checkbox が生成されている）
            await page.evaluate(() => {
                (document.getElementById('OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX') as HTMLInputElement | null)?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                (document.getElementById('OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX') as HTMLInputElement | null)?.click();
            });
            await page.waitForTimeout(200);
        });
        expect(errors, formatErrorMsg('スキルSW クリック操作中', errors)).toHaveLength(0);
    });

    // 各スキルSW欄を展開した後、内部コントロール（セレクト・チェックボックス）を
    // 操作して未捕捉 JS 例外が発生しないことを確認する。
    // dewindow フェーズで以下の関数を window に露出していなかった問題の回帰テスト:
    //   - Skill3SW_2 / Click_A3  (BuffMusicAndDance.js  — compat block 追加)
    //   - Click_A4               (BuffGuildAndGospel.js — compat block 追加)
    //   - Click_A7               (BuffItemAndFood.js    — addEventListener 変換)
    //   - OnChangeSettingAutoSpell (calcautospell.js    — addEventListener 変換)
    it('各スキルSW展開後の内部コントロール操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // A3: 演奏/踊り系 — Skill3SW_2 / Click_A3
            await page.evaluate(() => {
                document.querySelector<HTMLInputElement>('[name="A3_SKILLSW"]')?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                // html_CS3SW_SKILL で挿入される select（Skill3SW_2 ハンドラ）
                const sel = document.querySelector<HTMLSelectElement>('[name="A3_Skill0_1"]');
                sel?.dispatchEvent(new Event('change', { bubbles: true }));
                // Click_A3 ハンドラ
                const sel2 = document.querySelector<HTMLSelectElement>('[name="A3_Skill7"]');
                sel2?.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(200);

            // A4: ギルドスキル/ゴスペル — Click_A4
            await page.evaluate(() => {
                document.querySelector<HTMLInputElement>('[name="A4_SKILLSW"]')?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                // html_CS4SW_SKILL で挿入される select（Click_A4 ハンドラ）
                const sel = document.querySelector<HTMLSelectElement>('[name="A4_Skill1"]');
                sel?.dispatchEvent(new Event('change', { bubbles: true }));
                // checkbox（Click_A4 ハンドラ）
                const cb = document.querySelector<HTMLInputElement>('[name="A4_Skill0"]');
                cb?.click();
            });
            await page.waitForTimeout(200);

            // A7: アイテム/食品 — Click_A7
            await page.evaluate(() => {
                document.querySelector<HTMLInputElement>('[name="A7_SKILLSW"]')?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                // ステータス+食品セレクト（Click_A7 ハンドラ）
                const sel = document.querySelector<HTMLSelectElement>('[name="A7_Skill20"]');
                sel?.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(200);

            // オートスペル設定 — OnChangeSettingAutoSpell
            await page.evaluate(() => {
                (document.getElementById('OBJID_EXTRACT_SETTING_AUTO_SPELL') as HTMLInputElement | null)?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                // スキル選択セレクト（OnChangeSettingAutoSpell ハンドラ）
                const sel = document.getElementById('OBJID_AS_SKILL_ID_100') as HTMLSelectElement | null;
                sel?.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(200);
        });
        expect(errors, formatErrorMsg('各スキルSW展開後 内部コントロール操作中', errors)).toHaveLength(0);
    });

    // OBJID_MONSTER_MAP_AREA のカテゴリ変更でマップリストがカスケード更新されることを確認。
    // dewindow フェーズで CCustomSelectBase の onchange 属性を addEventListener に切り替えた後、
    // カテゴリ変更 → マップリスト更新 / マップ変更 → モンスターリスト更新 の連鎖が壊れていないかを確認する。
    it('モンスターマップ カテゴリ変更でマップリストがカスケード更新される', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // マップ指定エリアを展開する
            await page.evaluate(() => {
                const cb = document.getElementById('OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX') as HTMLInputElement | null;
                if (cb && !cb.checked) cb.click();
            });
            await page.waitForTimeout(300);

            // 展開後にカテゴリ選択の選択肢数とマップ選択の選択肢数を取得する
            const result = await page.evaluate(() => {
                const catSel = document.querySelector<HTMLSelectElement>('.OBJID_MONSTER_MAP_CATEGORY');
                const mapSel = document.querySelector<HTMLSelectElement>('.OBJID_MONSTER_MAP_MAP');
                const monSel = document.querySelector<HTMLSelectElement>('.OBJID_MONSTER_MAP_MONSTER');
                if (!catSel || !mapSel || !monSel) {
                    return { error: 'セレクト要素が見つからない', catLen: 0, mapLenBefore: 0, mapLenAfter: 0, monLenBefore: 0, monLenAfter: 0 };
                }

                // 初期マップ選択肢数（全地域のはず）
                const mapLenBefore = mapSel.options.length;
                const monLenBefore = monSel.options.length;

                // カテゴリを 2 番目の選択肢に変更（全地域 以外の地域カテゴリ）
                // カテゴリ選択肢が 2 つ以上なければスキップ
                if (catSel.options.length < 2) {
                    return { error: 'カテゴリ選択肢が不足', catLen: catSel.options.length, mapLenBefore, mapLenAfter: mapLenBefore, monLenBefore, monLenAfter: monLenBefore };
                }

                // 「全地域」以外のカテゴリを選択 — 最後の選択肢（特定地域）を使う
                catSel.value = catSel.options[catSel.options.length - 1].value;
                catSel.dispatchEvent(new Event('change', { bubbles: true }));

                const mapLenAfter = mapSel.options.length;

                // マップを 2 番目の選択肢に変更してモンスターリスト更新を確認
                const monLenAfterCatChange = monSel.options.length;
                if (mapSel.options.length >= 2) {
                    mapSel.value = mapSel.options[mapSel.options.length - 1].value;
                    mapSel.dispatchEvent(new Event('change', { bubbles: true }));
                }
                const monLenAfter = monSel.options.length;

                return { error: null, catLen: catSel.options.length, mapLenBefore, mapLenAfter, monLenBefore, monLenAfter };
            });

            // カテゴリを絞り込んだらマップ選択肢が減っているはず
            if (result.error) {
                throw new Error(`カスケードテスト前提条件エラー: ${result.error}`);
            }
            expect(
                result.mapLenAfter,
                `カテゴリ変更後のマップ選択肢数 (${result.mapLenAfter}) が変更前 (${result.mapLenBefore}) 以下である必要がある`
            ).toBeLessThan(result.mapLenBefore);
        });
        expect(errors, formatErrorMsg('モンスターマップカスケード操作中', errors)).toHaveLength(0);
    });

    // クイックコントロール欄を展開し、装備一括設定セレクトの input イベントで
    // ReferenceError が発生しないことを確認する。
    // dewindow フェーズで quickcontrol.js の onInput 属性を addEventListener に切り替えた後、
    // OnInputQuickControlItemPack が window に露出していなくても動作することを確認する。
    it('クイックコントロール 装備一括設定セレクト変更で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // クイックコントロール欄を展開する
            await page.evaluate(() => {
                const cb = document.getElementById('OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX') as HTMLInputElement | null;
                if (cb && !cb.checked) cb.click();
            });
            await page.waitForTimeout(300);

            // 装備一括設定セレクトに input イベントを発火する
            await page.evaluate(() => {
                const sel = document.getElementById('OBJID_SELECT_QUICK_CONTROL_ITEMPACK') as HTMLSelectElement | null;
                if (sel) {
                    sel.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
            await page.waitForTimeout(200);
        });
        expect(errors, formatErrorMsg('クイックコントロール装備一括設定 input 操作中', errors)).toHaveLength(0);
    });

    // 詠唱シミュレータ欄を展開し、スキル選択セレクトの change イベントで
    // ReferenceError が発生しないことを確認する。
    // dewindow フェーズで castsim.js の onChange 属性を addEventListener に切り替えた後、
    // OnChangeSkillCastSim / OnChangeSkillLvCastSim が window に露出していなくても
    // 動作することを確認する。
    it('詠唱シミュレータ スキル選択変更で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // 詠唱シミュレータ欄を展開する（初期状態は折りたたまれている）
            await page.evaluate(() => {
                const cb = document.getElementById('OBJID_CONTROL_CASTSIM_SWITCH') as HTMLInputElement | null;
                if (cb && !cb.checked) cb.click();
            });
            await page.waitForTimeout(300);

            // スキル選択セレクト（0行目）に change イベントを発火する
            await page.evaluate(() => {
                const sel = document.getElementById('OBJID_CONTROL_CAST_SIM_SKILL_SELECT_0') as HTMLSelectElement | null;
                if (sel) {
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
            await page.waitForTimeout(200);

            // レベル選択セレクト（0行目）に change イベントを発火する
            await page.evaluate(() => {
                const sel = document.getElementById('OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_0') as HTMLSelectElement | null;
                if (sel) {
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
            await page.waitForTimeout(200);
        });
        expect(errors, formatErrorMsg('詠唱シミュレータ スキル選択変更中', errors)).toHaveLength(0);
    });

    // 「その他の支援/設定」スイッチを ON にして各種セレクト・チェックボックスを操作し、
    // ReferenceError が発生しないことを確認する。
    // dewindow フェーズで Click_A8 / OnChangePetSelect が window に露出していない問題を
    // window compat block 追加で修正した後の回帰テスト。
    it('その他の支援設定 ペット選択・各種セレクト変更で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // 「その他の支援/設定」スイッチを ON にする
            await page.evaluate(() => {
                const cb = document.querySelector<HTMLInputElement>('[name="A8_SKILLSW"]');
                if (cb && !cb.checked) cb.click();
            });
            await page.waitForTimeout(300);

            // ペット選択セレクト（OnChangePetSelect）に change イベントを発火する
            await page.evaluate(() => {
                const sel = document.getElementById('OBJID_SELECT_PET') as HTMLSelectElement | null;
                if (sel) sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(200);

            // 親密度セレクト（Click_A8）に change イベントを発火する
            await page.evaluate(() => {
                const sel = document.getElementById('OBJID_SELECT_PET_FRIENDLITY') as HTMLSelectElement | null;
                if (sel) sel.dispatchEvent(new Event('change', { bubbles: true }));
            });
            await page.waitForTimeout(200);

            // 「設定欄を表示」ボタン（CTimeItemAreaComponentManager.FocusArea）のクリック
            await page.evaluate(() => {
                const btn = document.querySelector<HTMLInputElement>('#EN809 input[type="button"]');
                if (btn) btn.click();
            });
            await page.waitForTimeout(200);
        });
        expect(errors, formatErrorMsg('その他の支援設定 操作中', errors)).toHaveLength(0);
    });

    // セーブデータを URL から読み込む操作をトリガーする。
    // フィクスチャに URL がある場合のみ実行する（1 件目を代表として使用）。
    it('セーブデータ URL 読み込みで未捕捉 JS 例外が発生しない', async () => {
        if (allEntries.length === 0) {
            console.warn('フィクスチャにエントリがないためスキップ');
            return;
        }
        const { query } = allEntries[0];
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);
        });
        expect(errors, formatErrorMsg('セーブデータ読み込み中', errors)).toHaveLength(0);
    });
});

// ─── スイート 2: URL セーブ/ロード 往復テスト（新形式のみ）────────────────────
//
// テスト手順:
//   1. OBJID_INPUT_URL_IN_MIG にセーブデータURLを入力
//   2. OBJID_BUTTON_URL_IN_MIG をクリック（ロード）
//   3. OBJID_BUTTON_URL_OUT_MIG をクリック（URL出力）
//   4. OBJID_INPUT_URL_OUT_MIG の出力クエリが入力クエリと一致するか確認
//
// 旧形式フィクスチャは読み込み後に新形式へ変換されるためセーブデータが変質する。
// このテストは新形式フィクスチャ（sample-savedata-new.md）のみを対象とする。
//
// このテストで検出できる主なバグ:
//   - encodeToURL が失敗して空文字を返す（try/catch で飲み込まれたエラー）
//   - セーブデータの一部が欠損・変質してエンコード結果が変わる
//   - import 漏れにより CSaveDataUnitXxx が undefined になる

describe('URL セーブ/ロード 往復テスト（新形式フィクスチャのみ）', () => {
    if (entriesNew.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md に URL を追加してください）', () => {
            console.warn('sample-savedata-new.md にエントリがないためスキップ');
        });
    }

    for (const { label, query } of entriesNew) {
        it(`${label}: URL入力 → URL出力 でクエリ文字列が変質しない`, async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const errors: string[] = [];

            page.on('pageerror', (err) => {
                if (!isSuppressed(err.message)) errors.push(`[pageerror] ${err.message}`);
            });

            // クリップデータ保存の confirm ダイアログを自動キャンセル
            page.on('dialog', async (dialog) => { await dialog.dismiss(); });

            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });

            // セーブ/ロードセクションを展開（折りたたみチェックボックス）
            await page.check('#OBJID_SWITCH_SAVE_CTRL_MIG');
            await page.waitForSelector('#OBJID_INPUT_URL_IN_MIG', { state: 'visible', timeout: 5000 });

            // 1. URL入力欄にセーブデータURLをセット
            await page.fill(
                '#OBJID_INPUT_URL_IN_MIG',
                `${baseUrl}/ro4/m/calcx.html?${query}`,
            );

            // 2. URL入力ボタンをクリック（内部で setTimeout を使用）
            await page.click('#OBJID_BUTTON_URL_IN_MIG');

            // ロード完了を待機（職業値がデフォルト "0" から変化するまで）
            await page.waitForFunction(
                () => {
                    const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                    return job !== null && job.value !== '' && job.value !== '0';
                },
                { timeout: 10000 },
            ).catch(() => { /* 職業未設定のセーブデータの場合はそのまま続行 */ });

            // 3. URL出力ボタンをクリック
            await page.click('#OBJID_BUTTON_URL_OUT_MIG');

            // 出力URLを取得
            const outputUrl = await page.inputValue('#OBJID_INPUT_URL_OUT_MIG');
            const outputQuery = outputUrl.split('?')[1] ?? '';

            await context.close();

            // JS例外がないことを確認
            expect(errors, formatErrorMsg('URL往復テスト中', errors)).toHaveLength(0);

            // 出力クエリが空でないことを確認（encodeToURL の失敗を検出）
            expect(
                outputQuery,
                'URL出力が空です（encodeToURL が失敗した可能性 — ブラウザコンソールのエラーを確認してください）',
            ).not.toBe('');

            // 入力クエリと出力クエリが一致することを確認
            expect(outputQuery, [
                `セーブデータが変質しています (${label})`,
                `入力: ${query.slice(0, 80)}...`,
                `出力: ${outputQuery.slice(0, 80)}...`,
            ].join('\n')).toBe(query);
        });
    }
});

// ─── 全 OBJID_* スナップショット（スイート 3 用）────────────────────────────────

/**
 * 全セクション・全設定欄を展開する。
 *
 * Pass 1–2: folding-switch-MIG（calcx.html にハードコードされた CSS折りたたみ開閉スイッチ）
 *   - 2パス実行でネストしたセクション（OBJID_SWITCH_CONFIRM_DIALOG 等）も確実に開く
 *   - 装備スロット・スキルスイッチ等の計算値に直結するチェックボックスは含まない
 * Pass 3: OBJID_CONTROL_CONF_*_SWITCH / OBJID_CONTROL_CONF2_*_SWITCH
 *   - CConfBase / CConfBase2 が BuildUpSelectArea() で動的生成するスイッチ
 *   - onclick="CConfBase.OnClickSwitchHandler(...)" をグローバルスコープで評価するため
 *     window.CConfBase が未登録の場合は ReferenceError が発生する
 *   - このパスを実行することで設定欄の子要素（OBJID_CONTROL_CONF_*_ID_*）が DOM に生成される
 */
async function expandAllSections(page: Page): Promise<void> {
    page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

    // Pass 1 & 2: CSS 折りたたみセクション（folding-switch-MIG）
    for (let pass = 0; pass < 2; pass++) {
        await page.evaluate(() => {
            document.querySelectorAll<HTMLInputElement>(
                'input[type="checkbox"].folding-switch-MIG:not(:checked)'
            ).forEach((cb) => cb.click());
        });
        await page.waitForTimeout(300);
    }

    // Pass 3: CConfBase / CConfBase2 設定欄スイッチ
    await page.evaluate(() => {
        document.querySelectorAll<HTMLInputElement>(
            '[id^="OBJID_CONTROL_CONF_"][id$="_SWITCH"]:not(:checked), ' +
            '[id^="OBJID_CONTROL_CONF2_"][id$="_SWITCH"]:not(:checked)'
        ).forEach((cb) => cb.click());
    });
    await page.waitForTimeout(500); // BuildUpSelectArea の DOM 再構築を待つ
}

/** 全 OBJID_* 要素の値を DOM から直接評価して返す（副作用なし）。 */
function evalObjidSnapshot(page: Page): Promise<Record<string, string>> {
    return page.evaluate((): Record<string, string> => {
        const snapshot: Record<string, string> = {};
        document.querySelectorAll<HTMLElement>('[id^="OBJID_"]').forEach((el) => {
            const id = el.id;
            if (el instanceof HTMLInputElement) {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    snapshot[id] = el.checked ? 'true' : 'false';
                } else {
                    snapshot[id] = el.value;
                }
            } else if (el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement) {
                snapshot[id] = el.value;
            } else {
                // コンテナ要素（子に OBJID_* を持つ）は除外。葉要素のみ記録する。
                const hasObjidChild = el.querySelector('[id^="OBJID_"]') !== null;
                if (!hasObjidChild) {
                    snapshot[id] = el.textContent?.trim() ?? '';
                }
            }
            // bgcolor 属性（スキルヘッダ等の色表現）は常に記録
            const bg = el.getAttribute('bgcolor');
            if (bg !== null) snapshot[`${id}:bgcolor`] = bg;
        });
        return snapshot;
    });
}

/**
 * セーブデータ復元完了まで待ち、全セクションを展開してから全 OBJID_* 要素を取得する。
 */
async function captureFullObjidSnapshot(page: Page): Promise<Record<string, string>> {
    await page.waitForFunction(
        () => {
            const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
            return job !== null && job.value !== '' && job.value !== '0';
        },
        { timeout: 5000 }
    ).catch(() => { /* 職業未設定のセーブデータはそのまま続行 */ });
    await expandAllSections(page);
    await page.waitForTimeout(200);
    return evalObjidSnapshot(page);
}

/**
 * 本番スナップショットをベースに、ローカルとの差分を整形して返す。
 * ローカルにしか存在しない要素（未デプロイの新機能）は報告しない。
 * 差分が多い場合は先頭 20 件のみ表示する。
 */
function buildObjidDiffMessage(
    label: string,
    prod: Record<string, string>,
    local: Record<string, string>,
): string {
    const diffs: string[] = [];
    for (const key of Object.keys(prod).sort()) {
        const pv = prod[key];
        const lv = local[key] ?? '(なし)';
        if (pv !== lv) {
            diffs.push(`  ${key}:\n    本番:     ${pv}\n    ローカル: ${lv}`);
        }
    }
    const header = `リグレッション検出 (${label}) — ${diffs.length} 項目（本番にある要素がローカルと一致しない）:`;
    const body   = diffs.slice(0, 20).join('\n');
    const tail   = diffs.length > 20 ? `\n  ...他 ${diffs.length - 20} 件（全差分はスタックトレースを参照）` : '';
    return [header, body, tail].filter(Boolean).join('\n');
}

// ─── スイート 3: セーブデータ復元比較（全 OBJID_* 要素・本番 vs ローカル）──────────
//
// .folding-switch-MIG チェックボックスを全て展開してから全 OBJID_* 要素を収集し、
// 本番と比較する。折りたたみセクション内の要素（CConfBase 等がクリックで生成する要素）も
// 含めて検証するため、セーブデータ復元の確認として最も広いカバレッジを持つ。
//
// staging-vs-prod.test.ts の「セーブデータ復元比較」に対応するローカル版。
// staging-vs-prod はネット接続・staging 環境が必要で pnpm test:staging-diff でのみ実行される。

describe('セーブデータ復元比較（全 OBJID_* 要素・本番 vs ローカル）', () => {
    if (allEntries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md または -old.md に URL を追加してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
    }

    for (const { label, prodUrl, query } of allEntries) {
        it(`${label}: 全 OBJID_* 要素の値が本番と一致する`, async () => {
            // ── 本番から期待値を取得 ─────────────────────────────────────
            let prodSnapshot: Record<string, string>;
            try {
                const prodCtx  = await browser.newContext();
                const prodPage = await prodCtx.newPage();
                await prodPage.goto(prodUrl, { waitUntil: 'networkidle', timeout: 30000 });
                prodSnapshot = await captureFullObjidSnapshot(prodPage);
                await prodCtx.close();
            } catch {
                console.warn(`本番サイトへのアクセスに失敗したためスキップ: ${label}`);
                return;
            }

            // ── ローカルで同一セーブデータを読み込み ─────────────────────
            const localCtx  = await browser.newContext();
            const localPage = await localCtx.newPage();
            await localPage.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            const localSnapshot = await captureFullObjidSnapshot(localPage);
            await localCtx.close();

            // ── 比較 ─────────────────────────────────────────────────────
            // 本番に存在するキーのみをローカルから抽出して照合する。
            // ローカルにしかないキー（未デプロイ新機能）は比較対象外。
            const localSubset: Record<string, string> = {};
            for (const key of Object.keys(prodSnapshot!)) {
                localSubset[key] = localSnapshot[key] ?? '(なし)';
            }
            expect(
                localSubset,
                buildObjidDiffMessage(label, prodSnapshot!, localSnapshot),
            ).toEqual(prodSnapshot);
        });
    }
});

// ─── ユーティリティ ───────────────────────────────────────────────────────────

function formatErrorMsg(context: string, errors: string[]): string {
    return `${context}に未捕捉 JS 例外が ${errors.length} 件発生しました:\n${errors.join('\n')}`;
}
