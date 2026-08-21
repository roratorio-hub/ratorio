/**
 * 職業×攻撃手段 生成コーパス — ローカル自己回帰スナップショット（Phase 0 テストオラクル拡張）。
 *
 * .claude/context/remaining-work.md 系「UI/ロジック分離」リファクタリング計画の Phase 0。
 * 既存の「セーブデータ復元比較（本番 vs ローカル）」（calcx.test.ts スイート3）は
 * fixtures/sample-savedata-new.md / -old.md の手作業収集 14〜15件のみが対象で、
 * 89職業中ごく一部しかカバーしない。本テストは generate-job-corpus.mjs が機械生成した
 * fixtures/generated-job-corpus.md（101件・全89職業×通常攻撃 + 代表12職業×スキル攻撃）を
 * 全て読み込み、captureFullObjidSnapshot（calcForm 拡張込み）の結果をローカルの
 * ゴールデンスナップショットとして固定する。
 *
 * 本番とは比較しない（対象は自己無矛盾なローカル生成URLであり、本番に存在しない
 * 最新職業/スキルを含みうるため、本番比較には fixtures/sample-savedata-*.md を使う）。
 * 目的は「Phase 5 以降（StAllCalc 分割・model 導入等）でこの101パターンのどれか1つでも
 * 挙動が変わったら検出する」という広域リグレッション網であり、値そのものの正しさの検証ではない。
 *
 * 通常実行 … __snapshots__/job-corpus-snapshot/default.json と照合
 * JOB_CORPUS_SWEEP_OUT=<dir> pnpm test:integration -- job-corpus-snapshot
 *   … 照合の代わりに <dir>/default.json へ生JSONを書き出す（コーパス再生成後の再固定用）
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
    startStaticServer, closeServer, loadSaveDataEntries, captureFullObjidSnapshot,
} from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const FIXTURES_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');

const entries = loadSaveDataEntries(FIXTURES_PATH, 'job-corpus');

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

describe('職業×攻撃手段コーパス 全 OBJID_* スナップショット', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（tests/generate-job-corpus.mjs で生成してください）', () => {
            console.warn('generated-job-corpus.md にエントリがないためスキップ');
        });
        return;
    }

    it(`default: 全${entries.length}件のローカル復元結果がスナップショットと一致する`, async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(String(e)));

        const out: Record<string, Record<string, string>> = {};
        for (const { label, query } of entries) {
            await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            out[label] = await captureFullObjidSnapshot(page);
        }

        await context.close();

        expect(pageErrors, `コーパス走査中に未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
        expect(Object.keys(out).length).toBe(entries.length);

        const sweepOut = process.env.JOB_CORPUS_SWEEP_OUT;
        if (sweepOut) {
            mkdirSync(sweepOut, { recursive: true });
            writeFileSync(join(sweepOut, 'default.json'), JSON.stringify(out, null, 2) + '\n');
        } else {
            await expect(out).toMatchFileSnapshot('./__snapshots__/job-corpus-snapshot/default.json');
        }
    }, 15 * 60 * 1000); // 101件 × (goto + expandAllSections) のため通常より長いタイムアウトを与える
});
