/**
 * 巨大ファイル分割（foot.js / head.js）の before/after 差分ハーネス。
 *
 * .claude/context/remaining-work.md「残作業 1: 巨大ファイルの分割」の作業計画（Phase 0）で
 * 定義した安全網。const 化と違い分割には「値の同一性」のような機械検証がなく、
 * 既存 integration（calcx.test.ts スイート3）は本番比較でカバー範囲が広いが本番アクセスが要る。
 * 本テストはオフラインで完結し、分割の各コミットで即座に回せる。
 *
 * 方式:
 *   1. 作業着手前に `node make-baseline.mjs` でツリーを scratchpad にコピーしておく
 *      （git のブランチ操作は禁止事項のため、ただのディレクトリコピーで比較対象を作る）
 *   2. ベースラインと現在の作業ツリーを別ポートの静的サーバーで同時に配信
 *   3. 同一 URL（フィクスチャ + デフォルト状態）で両方を開き、
 *      calcx.test.ts と同じ全 OBJID_* スナップショットを取って突き合わせる
 *   4. 1 項目でも差分があれば「移動元と移動先で本文が変わった」ことを意味する
 *      （分割は本文をバイト単位で不変に保つ方針のため、差分は即バグ）
 *
 * ベースラインが無い場合は全テストをスキップする（初回セットアップ前でも壊れない）。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    startStaticServer, closeServer, loadSaveDataEntries,
    captureFullObjidSnapshot, buildObjidDiffMessage,
} from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const WORKTREE_ROOT = join(__dirname, '../..');

// make-baseline.mjs の DEFAULT_BASELINE_DIR と定義を揃えてある（どちらか一方だけ変えないこと）。
const DEFAULT_BASELINE_DIR = '/tmp/claude-1000/-workspace/ed728728-d42e-44b1-ba49-4bedcc896dd7/scratchpad/split-baseline';
const BASELINE_ROOT = process.env.SPLIT_BASELINE_DIR ?? DEFAULT_BASELINE_DIR;

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const FIXTURES_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');
const allEntries = [
    ...loadSaveDataEntries(FIXTURES_NEW_PATH, 'new'),
    ...loadSaveDataEntries(FIXTURES_OLD_PATH, 'old'),
];
// フィクスチャ（セーブデータ復元）に加えて、初期状態（クエリなし）も比較する。
// StAllCalc の分岐のうちフィクスチャが踏まないパス（デフォルト職業・装備なし等）を拾うため。
const queryEntries: { label: string; query: string }[] = [
    { label: 'default', query: '' },
    ...allEntries,
];

const baselineAvailable = existsSync(BASELINE_ROOT);

let worktreeServer: Awaited<ReturnType<typeof startStaticServer>>['server'];
let baselineServer: Awaited<ReturnType<typeof startStaticServer>>['server'] | undefined;
let worktreeUrl: string;
let baselineUrl: string;
let browser: Browser;

beforeAll(async () => {
    if (!baselineAvailable) return;
    ({ server: worktreeServer, baseUrl: worktreeUrl } = await startStaticServer(WORKTREE_ROOT));
    ({ server: baselineServer, baseUrl: baselineUrl } = await startStaticServer(BASELINE_ROOT));
    browser = await chromium.launch({ headless: true });
});

afterAll(async () => {
    if (!baselineAvailable) return;
    await browser?.close();
    await closeServer(worktreeServer);
    await closeServer(baselineServer);
});

describe('巨大ファイル分割 before/after 差分（ベースライン vs 作業ツリー）', () => {
    if (!baselineAvailable) {
        it('ベースライン未作成（cd tests && node make-baseline.mjs を実行してください）', () => {
            console.warn(`ベースラインが見つからないためスキップ: ${BASELINE_ROOT}`);
        });
        return;
    }

    for (const { label, query } of queryEntries) {
        // ベースライン・作業ツリーの2ページ分を直列で読み込むため、単発ページの
        // calcx.test.ts より長めに確保する（既定の testTimeout=60000ms だと
        // default（クエリなし）ケースが timeout することを確認済み）。
        it(`${label}: 全 OBJID_* 要素の値がベースラインと一致する`, async () => {
            const url = `/ro4/m/calcx.html${query ? `?${query}` : ''}`;

            const baselinePage = await browser.newPage();
            await baselinePage.goto(`${baselineUrl}${url}`, { waitUntil: 'networkidle', timeout: 60000 });
            const baselineSnapshot = await captureFullObjidSnapshot(baselinePage);
            await baselinePage.close();

            const worktreePage = await browser.newPage();
            await worktreePage.goto(`${worktreeUrl}${url}`, { waitUntil: 'networkidle', timeout: 60000 });
            const worktreeSnapshot = await captureFullObjidSnapshot(worktreePage);
            await worktreePage.close();

            // ベースラインに存在するキーのみ突き合わせる（作業ツリー側だけの新規要素は対象外）。
            const worktreeSubset: Record<string, string> = {};
            for (const key of Object.keys(baselineSnapshot)) {
                worktreeSubset[key] = worktreeSnapshot[key] ?? '(なし)';
            }
            expect(
                worktreeSubset,
                buildObjidDiffMessage(label, baselineSnapshot, worktreeSnapshot, 'ベースライン', '作業ツリー'),
            ).toEqual(baselineSnapshot);
        }, 120000);
    }
});
