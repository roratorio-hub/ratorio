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
 *     例: n_A_Arrow が battlecalc.js の let バインディングを読んで矢の選択値がズレる
 *   - Pattern B: 非ESMスクリプトが export let 配列を差し替えて習得スキル表示が消える
 *   - 折りたたみセクション内要素（CConfBase 等）がクリックなしでは生成されないバグ
 *
 * 本番サイトへのアクセスが必要なテストはオフライン環境では自動スキップされる。
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type Page } from 'playwright';
import { type Server } from 'node:http';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    createStaticServer, loadSaveDataEntries,
    expandAllSections, evalObjidSnapshot, captureFullObjidSnapshot, buildObjidDiffMessage,
} from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// ─── 静的ファイルサーバー ────────────────────────────────────────────────────
// 実体は helpers/objid-snapshot.ts（split-regression.test.ts と共有）。

const PROJECT_ROOT = join(__dirname, '../..');

// ─── セーブデータフィクスチャ ─────────────────────────────────────────────────
// 実体は helpers/objid-snapshot.ts。

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const FIXTURES_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');

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

// ─── 到達可能性チェック（staging-vs-prod.test.ts と同型）────────────────────────

/** url に到達できるか（5xx 未満で応答するか）を確認する。 */
async function isReachable(browser: Browser, url: string): Promise<boolean> {
    const ctx = await browser.newContext();
    try {
        const page = await ctx.newPage();
        const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        return (res?.status() ?? 0) < 500;
    } catch {
        return false;
    } finally {
        await ctx.close();
    }
}

const PRODUCTION_CALCX_URL = 'https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html';

// ─── テストセットアップ ──────────────────────────────────────────────────────

let server: Server;
let browser: Browser;
let baseUrl: string;
/** 本番サイトに到達できたか。スイート3の実行可否をここで一度だけ決める。 */
let productionOk = false;

beforeAll(async () => {
    server = createStaticServer(PROJECT_ROOT);
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', resolve));
    const addr = server.address();
    const port = typeof addr === 'object' && addr !== null ? addr.port : 0;
    baseUrl = `http://127.0.0.1:${port}`;
    browser = await chromium.launch({ headless: true });
    productionOk = await isReachable(browser, PRODUCTION_CALCX_URL);
    if (!productionOk) {
        console.warn('[calcx] 本番サイトに到達できません。本番比較テスト（スイート3）をスキップします。');
    }
}, 30000);

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

    // frame.js（現 assets/frame.js）の fetch('../date.json') は <base href> 経由でのみ
    // 正しく date.json（当時は roro/date.json）に解決していた（calcx.htmlの<base href>を
    // 前提にした相対パス）。B-14（engine/統合）で <base href> を撤去した際に見落とし、
    // 404 で失敗するようになっていた（実害: 手動ブラウザ確認で発覚。frame.js の.catch()に
    // 飲まれるため未捕捉JS例外にはならず、上の「起動テスト」では検出できない）。
    // import.meta.url基準の解決に修正した後、このテストで再発を検出する。
    it('サイドバーの更新日時が date.json から正しく読み込まれる（フェッチ失敗しない）', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForFunction(() => {
                const titles = document.querySelectorAll('.menu-title');
                const last = titles[titles.length - 1];
                return !!last && last.textContent !== '';
            }, { timeout: 10000 });
            const lastUpdatedText = await page.evaluate(() => {
                const titles = document.querySelectorAll('.menu-title');
                return titles[titles.length - 1]?.textContent ?? '';
            });
            expect(lastUpdatedText).not.toBe('取得失敗...');
            expect(lastUpdatedText).toMatch(/^\d{4}-\d{2}-\d{2}/);
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

    // 装備セレクトの change は OnChangeEquip(eqpRgnId, itemId) を呼ぶ。
    // eqpRgnId を window['EQUIP_REGION_ID_XXX'] で引く実装だと、DefineEnum 廃止で
    // 該当グローバルが消えたため undefined が渡り、
    // SetEquipRndOptTable 内の g_equipRndOptTable[undefined] で TypeError になる。
    // 静的解析では捕まらない（window への添字アクセスは未宣言変数ではない）ので、
    // 全部位で実際に change を発火させて検出する。
    it('装備セレクト変更（通常・シャドウ全部位）で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            const fired = await page.evaluate(() => {
                const ids = [
                    'OBJID_ARMS_RIGHT', 'OBJID_ARMS_LEFT', 'OBJID_HEAD_TOP',
                    'OBJID_HEAD_MID', 'OBJID_HEAD_UNDER', 'OBJID_SHIELD',
                    'OBJID_BODY', 'OBJID_SHOULDER', 'OBJID_SHOES',
                    'OBJID_ACCESSORY_1', 'OBJID_ACCESSORY_2',
                    'OBJID_SHADOW_WEAPON', 'OBJID_SHADOW_SHIELD', 'OBJID_SHADOW_BODY',
                    'OBJID_SHADOW_SHOESE', 'OBJID_SHADOW_ACCESSORY1', 'OBJID_SHADOW_ACCESSORY2',
                ];
                let count = 0;
                for (const id of ids) {
                    const sel = document.getElementById(id) as HTMLSelectElement | null;
                    if (!sel || sel.options.length < 2) continue;
                    sel.value = sel.options[1].value;
                    sel.dispatchEvent(new Event('change', { bubbles: true }));
                    count++;
                }
                return count;
            });
            // 1件も発火していなければテスト前提が崩れている（無言で通過させない）
            expect(fired, '装備セレクトが1件も見つからない（テスト前提の不成立）').toBeGreaterThan(0);
            await page.waitForTimeout(500);
        });
        expect(errors, formatErrorMsg('装備セレクト変更中', errors)).toHaveLength(0);
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
            const nameSwNames = ['A1_SKILLSW', 'A4_SKILLSW', 'A7_SKILLSW', 'A8_SKILLSW'];
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
    // dewindow フェーズの addEventListener 変換の回帰テスト:
    //   - Click_A4               (BuffGuildAndGospel.js — addEventListener 変換)
    //   - Click_A7               (BuffItemAndFood.js    — addEventListener 変換)
    //   - Click_A8 / OnChangePetSelect (BuffOtherCategory.js — addEventListener 変換)
    //   - OnChangeSettingAutoSpell (calcautospell.js    — addEventListener 変換)
    // ※ 演奏/踊り系（A3）は機能ごと削除済み
    it('各スキルSW展開後の内部コントロール操作で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

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

            // A8: その他の支援/設定 — Click_A8 / OnChangePetSelect
            await page.evaluate(() => {
                document.querySelector<HTMLInputElement>('[name="A8_SKILLSW"]')?.click();
            });
            await page.waitForTimeout(200);
            await page.evaluate(() => {
                // ペットセレクト（OnChangePetSelect ハンドラ）
                const pet = document.querySelector<HTMLSelectElement>('[name="A8_Skill0"]');
                pet?.dispatchEvent(new Event('change', { bubbles: true }));
                // 教範セレクト（Click_A8 ハンドラ）
                const sel = document.querySelector<HTMLSelectElement>('[name="A8_Skill1"]');
                sel?.dispatchEvent(new Event('change', { bubbles: true }));
                // 結婚スパノビ checkbox（Click_A8 ハンドラ）
                const cb = document.querySelector<HTMLInputElement>('[name="A8_Skill4"]');
                cb?.click();
                // 養子 checkbox（Click_A8 + RebuildStatusSelect + CalcStatusPoint ハンドラ）
                const cb13 = document.querySelector<HTMLInputElement>('[name="A8_Skill13"]');
                cb13?.click();
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

    // A1（職固有自己支援 / パッシブスキル欄）のスキルLv変更で未捕捉 JS 例外が出ないことを確認する。
    // 上の「各スキルSW…」テストはデフォルト職にパッシブが無く A_skill 欄が生成されないため A1 を
    // カバーできていなかった（Click_A1 が dewindow で未定義になっても検出できなかった）。
    // Click_PassSkillSW が myInnerHtml で生成する <select id="A_skill*"> の onChange を
    // addEventListener 化した変換を検証する。パッシブを持つ職を選んで A1 欄を展開し A_skill0 を変更する。
    it('A1 パッシブスキル欄のスキルLv変更で未捕捉 JS 例外が発生しない', async () => {
        let exercised = false;
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            // 職業セレクトの option がロードされるまで待つ（vitest 環境では networkidle 後も
            // データ反映が遅れて options が空のまま evaluate に入ることがある）
            await page.waitForFunction(() => {
                const j = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                return !!(j && j.options.length > 1);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            exercised = await page.evaluate(async () => {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                const job = document.getElementById('OBJID_SELECT_JOB') as (HTMLSelectElement & { tomselect?: { setValue(v: string): void } }) | null;
                if (!job) return false;
                // A1_SKILLSW を「チェック済み」状態にして A1 欄を展開する（Click_PassSkillSW が再構築）
                const ensureA1Open = async () => {
                    const sw = document.querySelector<HTMLInputElement>('[name="A1_SKILLSW"]');
                    if (sw && !sw.checked) { sw.click(); await sleep(400); }
                };
                // 1次職はパッシブスキル（剣術修練等）を持つので候補にする。
                // データに無い場合は全職から先頭30件にフォールバック。
                const known = ['SWORDMAN', 'THIEF', 'MAGICIAN', 'ARCHER', 'MERCHANT', 'ACOLYTE'];
                const present = known.filter((c) => Array.from(job.options).some((o) => o.value === c));
                const tryJobs = present.length
                    ? present
                    : Array.from(job.options).map((o) => o.value).filter((v) => v && v !== '0').slice(0, 30);
                for (const v of tryJobs) {
                    if (job.tomselect) job.tomselect.setValue(v);
                    else { job.value = v; job.dispatchEvent(new Event('change', { bubbles: true })); }
                    await sleep(500);
                    await ensureA1Open();
                    const sel = document.getElementById('A_skill0') as HTMLSelectElement | null;
                    if (sel && sel.options.length > 1) {
                        sel.value = sel.options[1].value;
                        sel.dispatchEvent(new Event('change', { bubbles: true }));  // → Click_A1(true)
                        await sleep(200);
                        return true;
                    }
                }
                return false;
            });
        });
        // A1 欄を実際に操作できたこと（パッシブ職で A_skill が生成され変更されたこと）を保証する。
        // ここが false だとテスト前提が崩れ Click_A1 の検証になっていないため、明示的に失敗させる。
        expect(exercised, 'A1 パッシブスキル欄を操作できなかった（テスト前提の不成立）').toBe(true);
        expect(errors, formatErrorMsg('A1パッシブスキル欄操作中', errors)).toHaveLength(0);
    });

    // スーパーノービスの魂 ON で装備制限が解除されることを確認する。
    // 回帰背景: スパノビの魂フラグ g_bSuperNoviceFullWeapon は stallcalc.js（書き手・
    // RefreshSuperNoviceFullWeapon）と equip.js（読み手・RebuildArmorsSelect 等）で
    // 共有される必要があるが、ESM 移行(#1394)で両ファイルに別個のモジュールローカル変数が
    // 宣言され状態が分断していた。結果 stallcalc.js が値を立てても equip.js 側は undefined のままで
    // 「魂を ON にしても効果が出ない」バグになっていた。
    // ユニットでは stallcalc.js が巨大で import できずクロスモジュール結線を検証できないため
    // 実機（calcx.html）で「魂 ON → 頭装備の選択肢が増える」ことを確認する。
    it('スーパーノービスの魂 ON で頭装備の選択肢が解禁される（魂フラグのクロスモジュール同期）', async () => {
        let result: { found: boolean; headBefore: number; headAfter: number; tsBefore: number; tsAfter: number } =
            { found: false, headBefore: 0, headAfter: 0, tsBefore: -1, tsAfter: -1 };
        const errors = await collectPageErrors(browser, async (page) => {
            page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            await page.waitForFunction(() => {
                const j = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
                return !!(j && j.options.length > 1);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            result = await page.evaluate(async () => {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                const fail = { found: false, headBefore: 0, headAfter: 0 };
                const job = document.getElementById('OBJID_SELECT_JOB') as
                    (HTMLSelectElement & { tomselect?: { setValue(v: string): void } }) | null;
                if (!job) return fail;
                // スーパーノービス系の職を選ぶ（魂スキルを持つ職）
                const snOpt = Array.from(job.options).find(
                    (o) => o.text.includes('スーパーノービス') && o.value && o.value !== '0');
                if (!snOpt) return fail;
                if (job.tomselect) job.tomselect.setValue(snOpt.value);
                else { job.value = snOpt.value; job.dispatchEvent(new Event('change', { bubbles: true })); }
                await sleep(500);
                // A1（職固有自己支援）欄を展開して魂スキルの select を生成させる
                const sw = document.querySelector<HTMLInputElement>('[name="A1_SKILLSW"]');
                if (sw && !sw.checked) { sw.click(); await sleep(500); }
                // 魂スキルの select は data-skill="super-novice-soul" を持つ
                // （C-6 で inline onClick 属性 → addEventListener に変換されたため data 属性で特定する）
                const soulSel = document.querySelector<HTMLSelectElement>('[data-skill="super-novice-soul"]');
                const headSel = document.getElementById('OBJID_HEAD_TOP') as
                    (HTMLSelectElement & { tomselect?: { options: Record<string, unknown> } }) | null;
                if (!soulSel || !headSel) return fail;
                const tsCount = () => headSel.tomselect ? Object.keys(headSel.tomselect.options).length : -1;
                const headBefore = headSel.options.length;
                const tsBefore = tsCount();
                // 魂を ON にする（value=1 + click 発火 → RefreshSuperNoviceFullWeapon(true)）
                soulSel.value = '1';
                soulSel.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                await sleep(300);
                const headAfter = headSel.options.length;
                const tsAfter = tsCount();
                return { found: true, headBefore, headAfter, tsBefore, tsAfter };
            });
        });
        expect(result.found, 'スーパーノービス職/魂スキルの select を操作できなかった（テスト前提の不成立）').toBe(true);
        // 魂 ON で職業制限のある頭装備が解禁され、選択肢数が増える（生の <select>）。
        // バグ時は equip.js 側のフラグが更新されず増えない（headAfter === headBefore）。
        expect(
            result.headAfter,
            `魂 ON で頭装備の選択肢が増えていない (before=${result.headBefore}, after=${result.headAfter})`,
        ).toBeGreaterThan(result.headBefore);
        // TomSelect でラップされた表示も再構築後に同期され、増えた選択肢を反映する。
        // 同期漏れ時は TomSelect 内部の option 数が更新されず tsAfter === tsBefore のまま。
        expect(result.tsBefore, 'OBJID_HEAD_TOP が TomSelect 化されていない（テスト前提の不成立）').toBeGreaterThan(0);
        expect(
            result.tsAfter,
            `魂 ON 後に TomSelect 表示が同期されていない (tsBefore=${result.tsBefore}, tsAfter=${result.tsAfter}, 生select after=${result.headAfter})`,
        ).toBe(result.headAfter);
        expect(errors, formatErrorMsg('スパノビの魂 ON 操作中', errors)).toHaveLength(0);
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

                // 「全地域」(value=0) 以外のカテゴリを選択。
                // TomSelect は選択中の option を <select> 末尾へ移動するため、
                // 位置（末尾）ではなく value で「特定地域」を判定して選ぶ。
                const specificCats = Array.from(catSel.options).filter((o) => o.value !== '0');
                catSel.value = specificCats[specificCats.length - 1].value;
                catSel.dispatchEvent(new Event('change', { bubbles: true }));

                const mapLenAfter = mapSel.options.length;

                // マップを「全マップ」(value=0) 以外に変更してモンスターリスト更新を確認
                const monLenAfterCatChange = monSel.options.length;
                const specificMaps = Array.from(mapSel.options).filter((o) => o.value !== '0');
                if (specificMaps.length >= 1) {
                    mapSel.value = specificMaps[specificMaps.length - 1].value;
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

    // アクセコピー（copyAccs）: アクセサリ1の選択（本体＋カード）をアクセサリ2へコピーした際、
    // 元 <select> の値だけでなく Tom Select の「表示」まで同期されることを確認する。
    //
    // 検出対象の2バグ（いずれも Phase 3d: select2 → Tom Select 由来）:
    //  (1) 本体: jQuery .val().change() は Tom Select の native change を駆動せず表示が古いまま残る。
    //  (2) カード: selectedIndex でコピーしていたが、アクセサリ1と2でカード候補リストの並び・件数が
    //      一致しないため index がズレて空選択（value="")になる。→ 値ベースのコピーで解消。
    // いずれも値比較だけでは不十分で、ts-control の表示テキストまで突合する必要がある。
    // happy-dom には Tom Select が無いため unit では再現不能 → 実ブラウザの integration で検証する。
    it('アクセコピーで本体とカードが Tom Select 表示まで同期される', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            // Tom Select の初期化完了を待つ
            await page.waitForFunction(() => {
                const a1 = document.querySelector('#OBJID_ACCESSORY_1') as (HTMLSelectElement & { tomselect?: unknown }) | null;
                return !!(a1 && a1.tomselect);
            }, { timeout: 10000 }).catch(() => {});

            // アクセサリ1に「なし」以外の実アクセサリを設定し、可能ならカードも1枚セットする
            const picked = await page.evaluate(async () => {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                type Sel = HTMLSelectElement & { tomselect?: { setValue(v: string): void; options: Record<string, unknown> } };
                const a1 = document.querySelector('#OBJID_ACCESSORY_1') as Sel | null;
                if (!a1 || !a1.tomselect) return null;
                const opt = Array.from(a1.options).find((o) => o.value !== '' && o.value !== '0' && o.value !== a1.value);
                if (!opt) return null;
                a1.tomselect.setValue(opt.value);
                await sleep(400);
                // カード欄（CARD_1）があれば「なし」以外の1枚をセット
                let cardSet = false;
                const c1 = document.querySelector('#OBJID_ACCESSORY_1_CARD_1') as Sel | null;
                if (c1 && c1.tomselect) {
                    const cv = Object.keys(c1.tomselect.options).find((v) => v !== '' && v !== '0');
                    if (cv) { c1.tomselect.setValue(cv); cardSet = true; await sleep(300); }
                }
                return { acc: opt.value, cardSet };
            });
            if (picked === null) {
                console.warn('スキップ: アクセサリ選択肢を用意できない環境');
                return;
            }

            // コピーボタン（アクセサリ1 → 2）をクリック（eventsetup.js の配線も同時に検証）
            await page.evaluate(() => {
                (document.getElementById('OBJID_ACCESSORY_1_COPY') as HTMLElement | null)?.click();
            });
            await page.waitForTimeout(500);

            // アクセサリ1/2 本体・カードの「値」と「Tom Select 表示テキスト」を取得
            const result = await page.evaluate(() => {
                const val = (id: string) => (document.getElementById(id) as HTMLSelectElement | null)?.value ?? '';
                const ctrlText = (id: string) => document.getElementById(`${id}-ts-control`)?.textContent?.trim() ?? '';
                return {
                    a1Value: val('OBJID_ACCESSORY_1'), a2Value: val('OBJID_ACCESSORY_2'),
                    a1Display: ctrlText('OBJID_ACCESSORY_1'), a2Display: ctrlText('OBJID_ACCESSORY_2'),
                    c1Value: val('OBJID_ACCESSORY_1_CARD_1'), c2Value: val('OBJID_ACCESSORY_2_CARD_1'),
                    c1Display: ctrlText('OBJID_ACCESSORY_1_CARD_1'), c2Display: ctrlText('OBJID_ACCESSORY_2_CARD_1'),
                };
            });

            // 既定ジョブで選択アクセサリが保持されなかった場合は意味のある検証にならないのでスキップ
            if (!result.a1Display) {
                console.warn('スキップ: 既定ジョブで保持されるアクセサリを選択できなかった');
                return;
            }

            // 本体: 値がコピーされ、表示も同期されている
            expect(result.a2Value).toBe(result.a1Value);
            expect(result.a2Display).toBe(result.a1Display);

            // カード: セットできた場合のみ検証（本体の値ベースコピーと表示同期）
            if (picked.cardSet && result.c1Value && result.c1Value !== '0') {
                expect(result.c2Value).toBe(result.c1Value);
                expect(result.c2Display).toBe(result.c1Display);
            }
        } finally {
            await context.close();
        }
    });

    // ↑↓ キーで Enter 無しに TomSelect の選択を確定できることを確認する（#1496）。
    // 開いた状態でハイライトを移動するだけでは Enter を押すまで反映されず、ネイティブ
    // <select>（精錬値・超越等）との操作感の差が「使いにくい」という要望につながっていた。
    // 加えて、確定は 'change' を発火させ document の change リスナーが LoadTomSelect() を
    // 呼ぶため、素朴に実装すると操作中のインスタンス自身が壊れてフォーカスが失われ、
    // 連続した ↓ 送りが 1 回で途切れる（destroy()/再構築の副作用）。
    // 3 連打してもフォーカスが保持され、期待どおりの選択肢まで進むことを検証する。
    it('装備セレクトで ↓ キーだけで値が確定・再計算され、連打してもフォーカスを保持する', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            // 既定状態（未選択の武器種＝素手）では OBJID_ARMS_RIGHT の選択肢が1件しか無く、
            // ↓キー連打を検証できない（RebuildArmsRightSelect() は OBJID_ARMS_TYPE_RIGHT の
            // change で発火する。equip.js 参照）。「短剣」を選んで実在武器の一覧に切り替える。
            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_TYPE_RIGHT') as HTMLSelectElement | null;
                return !!(el && el.options.length > 1);
            }, { timeout: 15000 }).catch(() => {});
            await page.selectOption('#OBJID_ARMS_TYPE_RIGHT', { index: 1 });
            await page.waitForTimeout(500);

            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT') as (HTMLSelectElement & { tomselect?: unknown }) | null;
                return !!(el && el.tomselect);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            const setup = await page.evaluate(async () => {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                type Sel = HTMLSelectElement & {
                    tomselect?: { setValue(v: string): void; options: Record<string, unknown>; settings: { valueField: string } };
                };
                const el = document.getElementById('OBJID_ARMS_RIGHT') as Sel | null;
                if (!el || !el.tomselect) return null;
                const ts = el.tomselect as any;
                const ordered = Object.values(ts.options)
                    .sort((a: any, b: any) => a.$order - b.$order)
                    .map((o: any) => String(o[ts.settings.valueField]));
                if (ordered.length < 5) return null;
                // 先頭付近に固定し、3 手先まで送れる余地を確保する
                ts.setValue(ordered[0]);
                await sleep(300);
                return { ordered, startValue: el.value };
            });
            if (!setup) {
                console.warn('スキップ: OBJID_ARMS_RIGHT の選択肢を用意できない環境');
                return;
            }

            await page.click('#OBJID_ARMS_RIGHT-ts-control');
            await page.keyboard.press('Escape'); // 開いた状態を閉じてフォーカスだけ残す
            await page.waitForTimeout(100);
            const isOpenAfterEscape = await page.evaluate(
                () => !!(document.getElementById('OBJID_ARMS_RIGHT') as any).tomselect?.isOpen
            );
            expect(isOpenAfterEscape, '閉じた状態から検証を始められなかった').toBe(false);

            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(300); // コアレスされた LoadTomSelect() / 再計算の完了を待つ

            const result = await page.evaluate(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT') as (HTMLSelectElement & { tomselect?: any }) | null;
                const wrapper = el?.nextElementSibling ?? null;
                return {
                    value: el?.value ?? '',
                    isOpen: !!el?.tomselect?.isOpen,
                    focusRetained: !!(wrapper && wrapper.contains(document.activeElement)),
                };
            });

            expect(result.value, '↓ 3 回で 3 つ先の選択肢まで進んでいない').toBe(setup.ordered[3]);
            expect(result.isOpen, 'リストが開いたままになっている').toBe(false);
            expect(result.focusRetained, '連打の途中でフォーカスが失われた（再初期化で壊れた疑い）').toBe(true);
        } finally {
            await context.close();
        }
    });

    // #1482「TomSelect再初期化時のoption末尾移動バグ」の回帰防止。
    // 元のバグ報告（3c62b768）は「装備品を変更すると選択していた装備がプルダウン末尾に
    // 現れる」——ユーザーが実際に見る**ドロップダウンの表示順**が壊れる不具合だった。
    // ↓ キー確定は操作中インスタンスの再初期化を blur まで先送りする（#1496 実装）ため、
    // 先送り中に何が起きても blur 後にドロップダウンの表示順が50音順のままであることを検証する。
    //
    // 残件台帳 B-30（2026-08-30発覚・深掘り済み）: 前提条件未達（OBJID_ARMS_RIGHT の
    // 選択肢が複数必要）のため導入（#1536）以来ずっと無言PASSしていた。前提を満たして
    // 初めて実行したところ、隠れている native <select> の生DOM順（`el.options`）は
    // 実際に乱れることを発見した。しかし深掘りの結果、ユーザーが見る**ドロップダウンの
    // 描画順は乱れない**ことを実測で確認した——TomSelect はドロップダウンを内部の
    // `$order`/検索結果メタデータから描画し、生DOMの option 順は読まない
    // （`refreshOptions()`/`self.search()`）ため。実機相当のセーブデータ・合成データの
    // 両方で、操作前後のドロップダウン描画は完全一致することを確認済み。生DOM順に
    // 依存するエンジン側コードも存在しない（`OBJID_ARMS_RIGHT`の`.options`走査はゼロ件）。
    // #1482 が本来問題にしていたのはドロップダウンの見た目なので、アサーション対象を
    // 生DOM順からドロップダウンの描画順へ差し替える。
    it('↓ キーで確定を繰り返した後 blur しても、ドロップダウンの表示順が50音順のまま変わらない（#1482 回帰防止）', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            // 既定状態（未選択の武器種＝素手）では OBJID_ARMS_RIGHT の選択肢が1件しか無く、
            // ↓キー連打を検証できない（RebuildArmsRightSelect() は OBJID_ARMS_TYPE_RIGHT の
            // change で発火する。equip.js 参照）。「短剣」を選んで実在武器の一覧に切り替える。
            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_TYPE_RIGHT') as HTMLSelectElement | null;
                return !!(el && el.options.length > 1);
            }, { timeout: 15000 }).catch(() => {});
            await page.selectOption('#OBJID_ARMS_TYPE_RIGHT', { index: 1 });
            await page.waitForTimeout(500);

            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT') as (HTMLSelectElement & { tomselect?: unknown }) | null;
                return !!(el && el.tomselect);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            // ドロップダウンを開いてユーザーに見える描画順（data-selectable）を読む。
            const readDropdownOrder = () => page.evaluate(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT') as HTMLSelectElement | null;
                const wrapper = el?.nextElementSibling ?? null;
                return wrapper
                    ? Array.from(wrapper.querySelectorAll('[data-selectable]')).map((o) => (o as HTMLElement).dataset.value)
                    : [];
            });

            await page.click('#OBJID_ARMS_RIGHT-ts-control');
            await page.waitForTimeout(200);
            const orderedBefore = await readDropdownOrder();
            if (orderedBefore.length < 3) {
                console.warn('スキップ: OBJID_ARMS_RIGHT の選択肢を用意できない環境');
                await page.keyboard.press('Escape');
                return;
            }
            await page.keyboard.press('Escape'); // 開いた状態を閉じてフォーカスだけ残す
            await page.waitForTimeout(100);

            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(200);
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(200);

            // 別の要素へフォーカスを移して blur させ、先送りされていた再初期化を発火させる
            await page.evaluate(() => (document.getElementById('OBJID_SELECT_JOB') as HTMLElement | null)?.focus());
            await page.waitForTimeout(200);

            await page.click('#OBJID_ARMS_RIGHT-ts-control');
            await page.waitForTimeout(200);
            const orderedAfter = await readDropdownOrder();

            expect(
                orderedAfter,
                '確定を繰り返した後、ドロップダウンの表示順が変化している（選択中の装備が末尾に現れる等）'
            ).toEqual(orderedBefore);
        } finally {
            await context.close();
        }
    });

    // カード選択欄は INIT_TRIGGER_IDS に含まれない（LoadTomSelect() の起点にならない）ため、
    // 装備本体と異なる再初期化経路を通る。↓ キー確定がこちらでも同様に効くことを確認する。
    it('カード選択欄（OBJID_ARMS_RIGHT_CARD_1）でも ↓ キーで即座に確定する', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT_CARD_1') as (HTMLSelectElement & { tomselect?: unknown }) | null;
                return !!(el && el.tomselect);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            const result = await page.evaluate(async () => {
                const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
                const el = document.getElementById('OBJID_ARMS_RIGHT_CARD_1') as (HTMLSelectElement & { tomselect?: any }) | null;
                if (!el || !el.tomselect) return null;
                const ts = el.tomselect;
                const ordered = Object.values(ts.options)
                    .sort((a: any, b: any) => a.$order - b.$order)
                    .map((o: any) => String(o[ts.settings.valueField]));
                if (ordered.length < 2) return null;
                ts.setValue(ordered[0]);
                await sleep(300);
                return { before: el.value, wantNext: ordered[1] };
            });
            if (!result) {
                console.warn('スキップ: OBJID_ARMS_RIGHT_CARD_1 の選択肢を用意できない環境（未展開/カード不可の装備）');
                return;
            }

            await page.click('#OBJID_ARMS_RIGHT_CARD_1-ts-control');
            await page.keyboard.press('Escape');
            await page.keyboard.press('ArrowDown');
            await page.waitForTimeout(200);

            const after = await page.evaluate(
                () => (document.getElementById('OBJID_ARMS_RIGHT_CARD_1') as HTMLSelectElement | null)?.value ?? ''
            );
            expect(after, 'カード欄で ↓ による確定が効いていない').toBe(result.wantNext);
        } finally {
            await context.close();
        }
    });

    // openOnFocus:false により Tab フォーカスだけでは開かないが、ネイティブ <select> と同じ
    // 4 通りの手段（Alt+↓ / Alt+↑ / Space / クリック）では開く（#1496）。
    // Tom Select 標準の onKeyDown は KEY_DOWN でしか open() しない（KEY_UP は開かず、
    // Space は未対応でページスクロールしてしまう）ため、この 3 つは明示的に補っている。
    it('Tab でフォーカスしてもドロップダウンは開かず、Alt+↑↓ / Space / クリックでは開く', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        try {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
            await page.waitForFunction(() => {
                const el = document.getElementById('OBJID_ARMS_RIGHT') as (HTMLSelectElement & { tomselect?: unknown }) | null;
                return !!(el && el.tomselect);
            }, { timeout: 15000 }).catch(() => {});
            await page.waitForTimeout(300);

            const isOpen = () => page.evaluate(
                () => !!(document.getElementById('OBJID_ARMS_RIGHT') as any).tomselect?.isOpen
            );
            const focusControl = () => page.evaluate(() => {
                const wrapper = document.getElementById('OBJID_ARMS_RIGHT')?.nextElementSibling as HTMLElement | null;
                (wrapper?.querySelector('.ts-control') as HTMLElement | null)?.focus();
            });

            // Tab フォーカス相当（.focus() 直接呼び出し）では開かない
            await focusControl();
            await page.waitForTimeout(100);
            expect(await isOpen(), 'Tab 相当のフォーカスだけでリストが開いてしまっている').toBe(false);

            // Alt+↓ で開く
            await page.keyboard.press('Alt+ArrowDown');
            await page.waitForTimeout(100);
            expect(await isOpen(), 'Alt+↓ でリストが開かない').toBe(true);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(100);
            expect(await isOpen(), 'Escape の後で閉じていない（前提が崩れている）').toBe(false);

            // Alt+↑ でも開く（Tom Select 標準の KEY_UP は開かないための明示対応）
            await page.keyboard.press('Alt+ArrowUp');
            await page.waitForTimeout(100);
            expect(await isOpen(), 'Alt+↑ でリストが開かない').toBe(true);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(100);

            // Space で開き、かつページがスクロールしない（既定動作の抑止）
            await focusControl();
            await page.evaluate(() => window.scrollTo(0, 0));
            const scrollBefore = await page.evaluate(() => window.scrollY);
            await page.keyboard.press('Space');
            await page.waitForTimeout(100);
            expect(await isOpen(), 'Space でリストが開かない').toBe(true);
            const scrollAfter = await page.evaluate(() => window.scrollY);
            expect(scrollAfter, 'Space でページがスクロールしてしまっている').toBe(scrollBefore);
            await page.keyboard.press('Escape');
            await page.waitForTimeout(100);

            // クリックでも開く（従来どおり）
            await page.click('#OBJID_ARMS_RIGHT-ts-control');
            await page.waitForTimeout(100);
            expect(await isOpen(), 'クリックしてもリストが開かない（従来の挙動が壊れた）').toBe(true);
        } finally {
            await context.close();
        }
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
                const btn = document.getElementById('OBJID_BUTTON_A8_TIMEITEM_FOCUS') as HTMLInputElement | null;
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

    // スロットモードボタンを2回クリックしてカード⇔ランダムオプション切替を往復する。
    // eventsetup.js で wire(id, 'click', OnClickSlotModeButton) と直接渡すと
    // MouseEvent が jobId に渡り、職業データ取得が null → TypeError が
    // 発生するリグレッションを検出する。
    it('スロットモードボタン カード→ランダムオプション→カード 往復で未捕捉 JS 例外が発生しない', async () => {
        const errors = await collectPageErrors(browser, async (page) => {
            await page.goto(`${baseUrl}/ro4/m/calcx.html`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);
            // 1回目クリック: カードモード → ランダムオプションモード
            await page.click('#OBJID_SLOT_MODE_BUTTON');
            await page.waitForTimeout(300);
            // 2回目クリック: ランダムオプションモード → カードモード（ここで jobData が undefined になっていた）
            await page.click('#OBJID_SLOT_MODE_BUTTON');
            await page.waitForTimeout(300);
        });
        expect(errors, formatErrorMsg('スロットモードボタン往復操作中', errors)).toHaveLength(0);
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
// expandAllSections / evalObjidSnapshot / captureFullObjidSnapshot / buildObjidDiffMessage の
// 実体は helpers/objid-snapshot.ts（split-regression.test.ts と共有）。

// ─── スイート 3: セーブデータ復元比較（全 OBJID_* 要素・本番 vs ローカル）──────────
//
// .folding-switch-MIG チェックボックスを全て展開してから全 OBJID_* 要素を収集し、
// 本番と比較する。折りたたみセクション内の要素（CConfBase 等がクリックで生成する要素）も
// 含めて検証するため、セーブデータ復元の確認として最も広いカバレッジを持つ。
//
// staging-vs-prod.test.ts の「セーブデータ復元比較」に対応するローカル版。
// staging-vs-prod はネット接続・staging 環境が必要で pnpm test:staging-diff でのみ実行される。

/**
 * ページ読み込み後の初回自動計算完了を待つ。
 * BATTLE_RESULT_BASIC は本番・ローカルどちらの calcx.html にも空 <div> として置かれており、
 * StAllCalc の描画（engine/battle/battle-result-html.js）で初めて子要素が入る。
 * DOM だけを見るので、モジュール配置の違い（本番 roro/m/js・ローカル engine/）に依存しない
 * （旧実装は `/engine/ui/CExtraInfoDataBridge.js` をルート絶対パスで動的importしており、
 * 本番では `github.io/ratorio/` 配下・`roro/m/js` レイアウトのため常に404していた）。
 */
const waitForAutoCalc = (p: Page) => p.waitForFunction(
    () => {
        const el = document.getElementById('BATTLE_RESULT_BASIC');
        return el !== null && el.childElementCount > 0;
    },
    { timeout: 30000 },
);

/** url を開いて初回計算完了を待ち、全 OBJID_* スナップショットを取る。context は必ず閉じる。 */
async function captureObjidSnapshotAt(url: string, gotoTimeout: number): Promise<Record<string, string>> {
    const context = await browser.newContext();
    try {
        const page = await context.newPage();
        await page.goto(url, { waitUntil: 'networkidle', timeout: gotoTimeout });
        await waitForAutoCalc(page);
        return await captureFullObjidSnapshot(page);
    } finally {
        await context.close();
    }
}

describe('セーブデータ復元比較（全 OBJID_* 要素・本番 vs ローカル）', () => {
    if (allEntries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md または -old.md に URL を追加してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
    }

    for (const { label, url: prodUrl, query } of allEntries) {
        it(`${label}: 全 OBJID_* 要素の値が本番と一致する`, async ({ skip }) => {
            // 到達性の判定は beforeAll の一度きり。ここで判定し直さないのは、
            // 比較ロジック側の不具合を「本番に繋がらなかった」に化けさせないため。
            skip(!productionOk, '本番サイトに到達できません');

            const prodSnapshot = await captureObjidSnapshotAt(prodUrl, 30000);

            // 本番側が実際に収集できていること（比較が空振りしていないこと）を保証する。
            expect(
                Object.keys(prodSnapshot).length,
                `本番スナップショットがほぼ空（比較が成立していない・テスト前提の不成立）: ${label}`,
            ).toBeGreaterThan(100);

            const localSnapshot = await captureObjidSnapshotAt(`${baseUrl}/ro4/m/calcx.html?${query}`, 60000);

            // ── 比較 ─────────────────────────────────────────────────────
            // 本番に存在するキーのみをローカルから抽出して照合する。
            // ローカルにしかないキー（未デプロイ新機能）は比較対象外。
            const localSubset: Record<string, string> = {};
            for (const key of Object.keys(prodSnapshot)) {
                localSubset[key] = localSnapshot[key] ?? '(なし)';
            }
            expect(
                localSubset,
                buildObjidDiffMessage(label, prodSnapshot, localSnapshot),
            ).toEqual(prodSnapshot);
        });
    }
});

// ─── ユーティリティ ───────────────────────────────────────────────────────────

function formatErrorMsg(context: string, errors: string[]): string {
    return `${context}に未捕捉 JS 例外が ${errors.length} 件発生しました:\n${errors.join('\n')}`;
}
