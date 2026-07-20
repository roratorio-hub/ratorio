/**
 * ステージング vs 本番 差分テスト
 *
 * ESM移行済みのステージング環境と本番環境を比較し、
 * ローカルテスト・単体テストでは検出できないバグを洗い出す。
 *
 * テストスイート:
 *   1. ステージング起動テスト — JS例外なしにページが起動するかを確認
 *   2. セーブデータ復元比較 — 本番とステージングで同一セーブデータの復元結果を全OBJID要素で比較
 *   3. リロード安定性テスト — モジュール読み込み競合によるフラキーネスを検出
 *   4. 操作後の計算結果比較 — 値変更・職業変更などの操作シーケンス後の結果を本番と比較
 *
 * 検出できる主なバグカテゴリ:
 *   - ESM strict mode 起因のサイレントバグ（入力パターン依存でコードパスが変わる場合）
 *   - Object.assign(window, ...) の書き込みタイミング競合（リロード安定性テストで検出）
 *   - jQuery / CGlobalConstManager 参照タイミング問題
 *   - ネットワーク環境下でのみ現れる初期化順序バグ
 *
 * 実行方法:
 *   cd /workspace/ratorio/tests && pnpm test:staging-diff
 *
 * 注意:
 *   - ステージング・本番両方へのインターネットアクセスが必要
 *   - どちらかに到達できない場合は各テストを自動スキップ
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const STAGING_BASE    = 'https://roratorio-hub.github.io/staging/ro4/m/calcx.html';
const PRODUCTION_BASE = 'https://roratorio-hub.github.io/ratorio/ro4/m/calcx.html';

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const FIXTURES_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');

// リロード安定性テストの繰り返し回数（多すぎると遅い、3回でレース条件は十分検出できる）
const RELOAD_REPS = 3;

// ─── フィクスチャ読み込み ─────────────────────────────────────────────────────

type FixtureEntry = { label: string; query: string };

function loadSaveDataEntries(filePath: string, prefix: string): FixtureEntry[] {
    if (!existsSync(filePath)) return [];
    return readFileSync(filePath, 'utf-8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith('#'))
        .map((url, i) => {
            const qi = url.indexOf('?');
            return { label: `${prefix}[${i}]`, query: qi >= 0 ? url.slice(qi + 1) : '' };
        })
        .filter(({ query }) => query.length > 0);
}

const entriesNew = loadSaveDataEntries(FIXTURES_NEW_PATH, 'new');
const entriesOld = loadSaveDataEntries(FIXTURES_OLD_PATH, 'old');
const allEntries  = [...entriesNew, ...entriesOld];

// ─── スナップショット ──────────────────────────────────────────────────────────

/**
 * folding-switch-MIG クラスのセクション開閉チェックボックスだけを全て展開する。
 *
 * 開閉制御チェックボックスをクリックすることで初めて生成される OBJID_* 要素を
 * スナップショットに含めるために、キャプチャ前に呼び出す。
 *
 * セレクタを .folding-switch-MIG に絞る理由:
 *   input[type="checkbox"] は装備スロット (equip-ctrl, item-ctrl, rndopt-ctrl, card-ctrl) や
 *   スキルスイッチ (A1_SKILLSW, A3_SKILLSW ...) など計算値に直結するチェックボックスも含む。
 *   これらを誤クリックすると計算結果が変わり、バグではない差分として誤検知される。
 *   folding-switch-MIG は純粋なセクション開閉用クラスであり安全にクリックできる。
 *
 * 2パス実行する理由:
 *   OBJID_SWITCH_CONFIRM_DIALOG は OBJID_SWITCH_SAVE_CTRL_MIG の内側にネストしている。
 *   1パス目で親セクションを開き、2パス目でネストした子セクションを開く。
 */
async function expandAllSections(page: Page): Promise<void> {
    page.on('dialog', (dialog) => dialog.dismiss().catch(() => {}));

    for (let pass = 0; pass < 2; pass++) {
        await page.evaluate(() => {
            document.querySelectorAll<HTMLInputElement>(
                'input[type="checkbox"].folding-switch-MIG:not(:checked)'
            ).forEach((cb) => cb.click());
        });
        // DOM 生成・再描画を待つ
        await page.waitForTimeout(300);
    }
}

/** 全 OBJID_* 要素の値を DOM から直接評価して返す（副作用なし）。 */
function evalObjidSnapshot(page: Page): Promise<Record<string, string>> {
    return page.evaluate((): Record<string, string> => {
        const snapshot: Record<string, string> = {};

        // Tom Select は元 select の id を継承して補助ノードを生成する
        // （例: OBJID_ARMS_RIGHT-ts-control / -ts-dropdown / -ts-label）。
        // これらは id が "OBJID_" で始まるため前方一致セレクタに混入するが、
        // 本番(select2)側は "select2-" プレフィックスで対応物が無いため、
        // 除外しないとステージング vs 本番が全フィクスチャで誤検知する。
        const TS_GENERATED_ID = /-ts-(control|dropdown|label)$/;

        // ステージング(phase1-2)にのみ存在する意図的な追加要素。
        // 本番(master)が追従したら不要になるので、その際に削除すること。
        // OBJID_CHECK_A3_SKILLSW: 演奏/踊り系スキル欄はステージング側で機能削除済み
        // （本番にのみ存在する）ため除外。
        const IGNORED_OBJIDS = new Set(['OBJID_BUTTON_OPT_IN_SAVEDATA', 'OBJID_CHECK_A3_SKILLSW']);

        document.querySelectorAll<HTMLElement>('[id^="OBJID_"]').forEach((el) => {
            const id = el.id;

            if (TS_GENERATED_ID.test(id) || IGNORED_OBJIDS.has(id)) return;

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
 * ページを URL に遷移させ、セーブデータ復元完了まで待ってから全セクションを展開する。
 * Suite 4（操作後比較）でページを長期保持して複数回操作するために使用する。
 *
 * - expandAllSections() がダイアログ dismiss ハンドラも登録するため、ここでは登録しない。
 * - 返した page は操作後に evalObjidSnapshot() でスナップショットを取れる状態になっている。
 */
async function setupPage(
    browser: Browser,
    url: string,
): Promise<{ page: Page; ctx: BrowserContext }> {
    const ctx  = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForFunction(
        () => {
            const job = document.getElementById('OBJID_SELECT_JOB') as HTMLSelectElement | null;
            return job !== null && job.value !== '' && job.value !== '0';
        },
        { timeout: 5000 }
    ).catch(() => {});
    await expandAllSections(page);
    await page.waitForTimeout(200);
    return { page, ctx };
}

/**
 * ページ内の全 OBJID_* 要素の状態を一括収集する（Suite 2/3 用）。
 * セーブデータ復元完了まで待ち、全セクションを展開してから evalObjidSnapshot() を呼ぶ。
 */
async function captureObjidSnapshot(page: Page): Promise<Record<string, string>> {
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

// ─── 例外収集 ─────────────────────────────────────────────────────────────────

const SUPPRESSED_ERROR_PATTERNS: RegExp[] = [
    // calchistory.js が使用する Chart.js を CDN から取得できない場合に発生。ESM 移行と無関係。
    /Chart is not defined/,
];

function isSuppressed(msg: string): boolean {
    return SUPPRESSED_ERROR_PATTERNS.some((re) => re.test(msg));
}

/** page に対して pageerror / unhandledrejection の収集リスナーをセットアップする。 */
function setupErrorCollection(page: Page, errors: string[]): void {
    page.on('pageerror', (err) => {
        if (!isSuppressed(err.message)) errors.push(`[pageerror] ${err.message}`);
    });
    page.addInitScript(() => {
        (window as any).__pendingRejections = [];
        window.addEventListener('unhandledrejection', (ev) => {
            const msg = (ev.reason as any)?.message ?? String(ev.reason);
            (window as any).__pendingRejections.push(msg);
        });
    });
}

async function drainRejections(page: Page, errors: string[]): Promise<void> {
    const rejections: string[] = await page.evaluate(() => (window as any).__pendingRejections ?? []);
    for (const msg of rejections) {
        if (!isSuppressed(msg)) errors.push(`[unhandledrejection] ${msg}`);
    }
}

// ─── 到達可能性チェック ───────────────────────────────────────────────────────

async function isReachable(browser: Browser, url: string): Promise<boolean> {
    const ctx = await browser.newContext();
    const pg  = await ctx.newPage();
    try {
        const res = await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
        return (res?.status() ?? 0) < 500;
    } catch {
        return false;
    } finally {
        await ctx.close();
    }
}

// ─── セットアップ ─────────────────────────────────────────────────────────────

let browser: Browser;
let stagingOk    = false;
let productionOk = false;

beforeAll(async () => {
    browser = await chromium.launch({ headless: true });
    [stagingOk, productionOk] = await Promise.all([
        isReachable(browser, STAGING_BASE),
        isReachable(browser, PRODUCTION_BASE),
    ]);
    if (!stagingOk)    console.warn('[staging-vs-prod] ステージングに到達できません。関連テストをスキップします。');
    if (!productionOk) console.warn('[staging-vs-prod] 本番環境に到達できません。関連テストをスキップします。');
});

afterAll(async () => {
    await browser?.close();
});

// ─── スイート 1: ステージング起動テスト ──────────────────────────────────────
//
// ステージング環境（GitHub Pages でホスト）で JS 例外が発生しないかを確認する。
// ネットワーク越しに 172 本の ESM モジュールを読み込む環境固有のバグを検出する。

describe('ステージング起動テスト', () => {
    it('ページロードで未捕捉 JS 例外が発生しない', async () => {
        if (!stagingOk) { console.warn('スキップ: ステージング到達不可'); return; }

        const ctx    = await browser.newContext();
        const page   = await ctx.newPage();
        const errors: string[] = [];
        setupErrorCollection(page, errors);

        await page.goto(STAGING_BASE, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);
        await drainRejections(page, errors);
        await ctx.close();

        expect(errors, formatErrors('ページロード', errors)).toHaveLength(0);
    });

    // 職業変更は equip.js / learnedskill.js 等の再初期化をトリガーする。
    // window グローバルが壊れている場合に ReferenceError として現れやすい。
    it('職業変更操作で未捕捉 JS 例外が発生しない', async () => {
        if (!stagingOk) { console.warn('スキップ: ステージング到達不可'); return; }

        const ctx    = await browser.newContext();
        const page   = await ctx.newPage();
        const errors: string[] = [];
        setupErrorCollection(page, errors);

        await page.goto(STAGING_BASE, { waitUntil: 'networkidle', timeout: 60000 });
        await page.selectOption('#OBJID_SELECT_JOB', { index: 1 });
        await page.waitForTimeout(500);
        await page.selectOption('#OBJID_SELECT_JOB', { index: 0 });
        await page.waitForTimeout(300);
        await drainRejections(page, errors);
        await ctx.close();

        expect(errors, formatErrors('職業変更操作', errors)).toHaveLength(0);
    });

    // セーブデータ URL 読み込みで発生する例外を確認（フィクスチャがある場合のみ）。
    it('セーブデータ URL 読み込みで未捕捉 JS 例外が発生しない', async () => {
        if (!stagingOk)           { console.warn('スキップ: ステージング到達不可'); return; }
        if (allEntries.length === 0) { console.warn('スキップ: フィクスチャなし'); return; }

        const { query } = allEntries[0];
        const ctx    = await browser.newContext();
        const page   = await ctx.newPage();
        const errors: string[] = [];
        setupErrorCollection(page, errors);

        await page.goto(`${STAGING_BASE}?${query}`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);
        await drainRejections(page, errors);
        await ctx.close();

        expect(errors, formatErrors('セーブデータ読み込み', errors)).toHaveLength(0);
    });
});

// ─── スイート 2: セーブデータ復元比較（ステージング vs 本番）────────────────────
//
// フィクスチャの各URLを本番・ステージングに同時に読み込み、
// 全 OBJID_* 要素の値を突合する。
//
// ローカルテスト（スイート 2 in calcx.test.ts）との違い:
//   - 比較先がローカルサーバーではなくステージング（デプロイ済みESM環境）
//   - スナップショット対象が一部フィールドでなく全 OBJID_* 要素
//   - ネットワーク越しのモジュール読み込みで起きる問題を検出できる

describe('セーブデータ復元比較（ステージング vs 本番）', () => {
    if (allEntries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md または -old.md に URL を追加してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
    }

    for (const { label, query } of allEntries) {
        it(`${label}: ステージングと本番で全 OBJID 要素の値が一致する`, async () => {
            if (!stagingOk || !productionOk) {
                console.warn(`スキップ (${label}): 環境に到達できません`);
                return;
            }

            // 本番・ステージングを並列で取得（時間短縮）
            const [prodSnapshot, stagingSnapshot] = await Promise.all([
                (async () => {
                    const ctx  = await browser.newContext();
                    const page = await ctx.newPage();
                    await page.goto(`${PRODUCTION_BASE}?${query}`, { waitUntil: 'networkidle', timeout: 60000 });
                    const snap = await captureObjidSnapshot(page);
                    await ctx.close();
                    return snap;
                })(),
                (async () => {
                    const ctx  = await browser.newContext();
                    const page = await ctx.newPage();
                    await page.goto(`${STAGING_BASE}?${query}`, { waitUntil: 'networkidle', timeout: 60000 });
                    const snap = await captureObjidSnapshot(page);
                    await ctx.close();
                    return snap;
                })(),
            ]);

            expect(
                stagingSnapshot,
                buildDiffMessage(label, prodSnapshot, stagingSnapshot),
            ).toEqual(prodSnapshot);
        });
    }
});

// ─── スイート 3: リロード安定性テスト（レース条件検出）──────────────────────────
//
// ステージングを RELOAD_REPS 回連続でリロードし、毎回同じ結果が得られるかを確認する。
//
// 検出対象:
//   - Object.assign(window, {...}) の書き込みが他モジュールの参照より遅れる競合
//   - 並列フェッチ順序の揺れによる初期化順序の非決定性
//
// 本番（非ESM）は決定的なので同症状は発生しない。
// ステージングでのみ結果がリロードごとに変わるなら ESM 移行由来のバグと判断できる。

describe(`リロード安定性テスト（ステージング ${RELOAD_REPS} 回連続）`, () => {
    const entry = allEntries[0];

    if (!entry) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md に URL を追加してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
    } else {
        it(`${entry.label}: ${RELOAD_REPS} 回リロードしても結果が安定している`, async () => {
            if (!stagingOk) { console.warn('スキップ: ステージング到達不可'); return; }

            const snapshots: Record<string, string>[] = [];
            for (let i = 0; i < RELOAD_REPS; i++) {
                const ctx  = await browser.newContext();
                const page = await ctx.newPage();
                await page.goto(`${STAGING_BASE}?${entry.query}`, { waitUntil: 'networkidle', timeout: 60000 });
                snapshots.push(await captureObjidSnapshot(page));
                await ctx.close();
            }

            for (let i = 1; i < snapshots.length; i++) {
                expect(
                    snapshots[i],
                    [
                        `リロード ${i + 1} 回目の結果が 1 回目と異なります（モジュール初期化競合の疑い）`,
                        buildDiffMessage(`リロード ${i + 1} 回目 vs 1 回目`, snapshots[0], snapshots[i]),
                    ].join('\n'),
                ).toEqual(snapshots[0]);
            }
        });
    }
});

// ─── スイート 4: 操作後の計算結果比較（ステージング vs 本番）────────────────────
//
// セーブデータロード後にユーザーが値を変更した際の計算結果を本番と比較する。
// Suite 2 は「ロード直後の静的な状態」しか比較しないのに対し、
// このスイートは「操作を経た動的な状態」も検証する。
//
// 操作はステージング・本番に同じ順序で累積的に適用し、各ステップで比較する。
// これによりどの操作でズレが生じたかが特定しやすくなる。
//
// 検出できる主なバグ:
//   - onchange / oninput ハンドラが ESM 移行後に正しく動作しない
//   - 職業変更時に equip.js・learnedskill.js の再計算が片方だけ失敗する
//   - グローバル変数の参照タイミングが操作後に変わるケース

type Interaction = { label: string; fn: (page: Page) => Promise<void> };

/**
 * 標準操作シーケンス。各操作は前の操作に累積される（1→2→3 の順で同じページに適用）。
 * 操作後の待機時間は各 fn の内側で完結させること（evalObjidSnapshot を呼ぶ前に完了している前提）。
 *
 * index 指定にしている理由:
 *   本番・ステージングで同一の select 要素が同一順序でオプションを持つはず。
 *   もし順序が異なれば Suite 2 のスナップショット比較で事前に検出される。
 */
const STANDARD_INTERACTIONS: Interaction[] = [
    {
        // OBJID_SELECT_BASE_LEVEL は <input type="number"> のため fill() を使う
        label: '基本レベル変更（100）',
        fn: async (page) => {
            await page.fill('#OBJID_SELECT_BASE_LEVEL', '100');
            await page.dispatchEvent('#OBJID_SELECT_BASE_LEVEL', 'change');
            await page.waitForTimeout(400);
        },
    },
    {
        // OBJID_SELECT_JOB_LEVEL は <input type="number"> のため fill() を使う
        label: '職業レベル変更（10）',
        fn: async (page) => {
            await page.fill('#OBJID_SELECT_JOB_LEVEL', '10');
            await page.dispatchEvent('#OBJID_SELECT_JOB_LEVEL', 'change');
            await page.waitForTimeout(400);
        },
    },
    {
        // OBJID_SELECT_JOB は <select> のため selectOption() を使う
        label: '職業変更（index 2）',
        fn: async (page) => {
            await page.selectOption('#OBJID_SELECT_JOB', { index: 2 });
            // 職業変更は装備・スキル・ステータスの再計算を伴うため長めに待つ
            await page.waitForTimeout(800);
        },
    },
];

describe('操作後の計算結果比較（ステージング vs 本番）', () => {
    if (allEntries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md または -old.md に URL を追加してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
    }

    for (const { label, query } of allEntries) {
        it(`${label}: 操作シーケンス後も計算結果が一致する`, async () => {
            if (!stagingOk || !productionOk) {
                console.warn(`スキップ (${label}): 環境に到達できません`);
                return;
            }

            // 本番・ステージングのページを並列で準備（フィクスチャ読み込み + セクション展開済み）
            const [prod, staging] = await Promise.all([
                setupPage(browser, `${PRODUCTION_BASE}?${query}`),
                setupPage(browser, `${STAGING_BASE}?${query}`),
            ]);

            try {
                for (const { label: opLabel, fn } of STANDARD_INTERACTIONS) {
                    // 両環境に同じ操作を並列で適用
                    await Promise.all([fn(prod.page), fn(staging.page)]);

                    // 操作後のスナップショットを並列で取得して比較
                    const [prodSnap, stagingSnap] = await Promise.all([
                        evalObjidSnapshot(prod.page),
                        evalObjidSnapshot(staging.page),
                    ]);

                    expect(
                        stagingSnap,
                        buildDiffMessage(`${label} / ${opLabel}`, prodSnap, stagingSnap),
                    ).toEqual(prodSnap);
                }
            } finally {
                await prod.ctx.close();
                await staging.ctx.close();
            }
        });
    }
});

// ─── ユーティリティ ───────────────────────────────────────────────────────────

function formatErrors(ctx: string, errors: string[]): string {
    return `${ctx}に未捕捉 JS 例外が ${errors.length} 件:\n${errors.join('\n')}`;
}

/**
 * 2つのスナップショットの差分を人が読みやすい形式に整形する。
 * 差分が多い場合は先頭 20 件のみ表示する。
 */
function buildDiffMessage(
    label: string,
    expected: Record<string, string>,
    actual: Record<string, string>,
): string {
    const allKeys = new Set([...Object.keys(expected), ...Object.keys(actual)]);
    const diffs: string[] = [];

    for (const key of [...allKeys].sort()) {
        const ev = expected[key] ?? '(なし)';
        const av = actual[key]   ?? '(なし)';
        if (ev !== av) {
            diffs.push(`  ${key}:\n    本番:         ${ev}\n    ステージング: ${av}`);
        }
    }

    const header = `差分あり (${label}) — ${diffs.length} 項目:`;
    const body   = diffs.slice(0, 20).join('\n');
    const tail   = diffs.length > 20 ? `\n  ...他 ${diffs.length - 20} 件（テスト失敗時の全差分はスタックトレースを参照）` : '';

    return [header, body, tail].filter(Boolean).join('\n');
}
