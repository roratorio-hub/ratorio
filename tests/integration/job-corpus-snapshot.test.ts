/**
 * 職業×攻撃手段 生成コーパス — ローカル自己回帰スナップショット（Phase 0 テストオラクル拡張）。
 *
 * .claude/context/remaining-work.md 系「UI/ロジック分離」リファクタリング計画の Phase 0。
 * 既存の「セーブデータ復元比較（本番 vs ローカル）」（calcx.test.ts スイート3）は
 * fixtures/sample-savedata-new.md / -old.md の手作業収集 14〜15件のみが対象で、
 * 89職業中ごく一部しかカバーしない。本テストは generate-job-corpus.mjs が機械生成した
 * fixtures/generated-job-corpus.md（Pass A: 全89職業×通常攻撃 + Pass B: 代表12職業×
 * スキル攻撃 = 101件 + Pass C: 5次職代表12職業×装備・ステータス・対象モンスター設定込み
 * 2バリアント = 24件、計125件）を全て読み込み、captureFullObjidSnapshot（calcForm 拡張込み）
 * の結果をローカルのゴールデンスナップショットとして固定する。
 *
 * 本番とは比較しない（対象は自己無矛盾なローカル生成URLであり、本番に存在しない
 * 最新職業/スキルを含みうるため、本番比較には fixtures/sample-savedata-*.md を使う）。
 * 目的は「Phase 5 以降（StAllCalc 分割・model 導入等）でこのパターンのどれか1つでも
 * 挙動が変わったら検出する」という広域リグレッション網であり、値そのものの正しさの検証ではない。
 * Pass C（残件台帳 B-32）追加以前は Pass A/B が装備なし・弱デフォルトステータスのため
 * 与ダメージ・DPS がほぼ全件0で、与ダメージの大きさそのものの回帰は検出できなかった。
 *
 * 通常実行 … __snapshots__/job-corpus-snapshot/default.json と照合
 * JOB_CORPUS_SWEEP_OUT=<dir> pnpm test:integration -- job-corpus-snapshot
 *   … 照合の代わりに <dir>/default.json へ生JSONを書き出す（コーパス再生成後の再固定用）
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
    startStaticServer, closeServer, loadSaveDataEntries, captureFullObjidSnapshot,
} from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const FIXTURES_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');

const entries = loadSaveDataEntries(FIXTURES_PATH, 'job-corpus');

/**
 * generated-job-corpus.md 内の "# Pass C:" 見出し以降にある URL 行の数を数え、
 * entries 配列における Pass C の開始インデックスを求める（残件台帳 B-32）。
 * 数値インデックスを固定で書くとコーパス再生成（Pass A/B の件数変化）のたびに壊れるため、
 * 見出し行を目印にする（test-oracle-helpers.test.ts の findSkillAttackFixtureQuery と同じ方針）。
 */
function findPassCStartIndex(filePath: string): number | null {
    if (!existsSync(filePath)) return null;
    let urlCount = 0;
    let seenPassCHeader = false;
    for (const raw of readFileSync(filePath, 'utf-8').split('\n')) {
        const line = raw.trim();
        if (line.startsWith('# Pass C:')) { seenPassCHeader = true; continue; }
        if (!line || line.startsWith('#')) continue;
        if (seenPassCHeader) return urlCount;
        urlCount++;
    }
    return null;
}
const passCStartIndex = findPassCStartIndex(FIXTURES_PATH);

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
        const emptyBattlePanelLabels: string[] = [];
        const zeroDamagePassCLabels: string[] = [];
        let entryIndex = 0;
        for (const { label, query } of entries) {
            await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            out[label] = await captureFullObjidSnapshot(page);
            // 戦闘結果パネル（battle:）が空振りしていないことを確認する（残件台帳 B-29）。
            // ここを見ずにゴールデンを再固定すると、空振りしたまま「正しいスナップショット」
            // として凍結されてしまう（B-16の運用上、以降誰も気付けなくなる）。
            const battleKeyCount = Object.keys(out[label]).filter((k) => k.startsWith('battle:')).length;
            if (battleKeyCount <= 10) emptyBattlePanelLabels.push(`${label}(${battleKeyCount}件)`);
            // Pass C（残件台帳 B-32）の範囲だけ、与ダメージが0のまま再固定されていないことを
            // 確認する。これが無いと将来ここが0ダメージへ戻っても誰も気付けない（B-29と同型）。
            if (passCStartIndex !== null && entryIndex >= passCStartIndex) {
                const minATK = out[label]['legacy:MinATKnum'] ?? '';
                if (minATK.includes('0ダメージ')) zeroDamagePassCLabels.push(`${label}(${minATK})`);
            }
            entryIndex++;
        }

        await context.close();

        expect(pageErrors, `コーパス走査中に未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
        expect(Object.keys(out).length).toBe(entries.length);
        expect(
            emptyBattlePanelLabels,
            `戦闘結果パネル（battle:）がほぼ空振りのフィクスチャがあります: ${emptyBattlePanelLabels.join(', ')}`,
        ).toEqual([]);
        expect(
            zeroDamagePassCLabels,
            `Pass C（残件台帳 B-32）で与ダメージが0のフィクスチャがあります: ${zeroDamagePassCLabels.join(', ')}`,
        ).toEqual([]);

        const sweepOut = process.env.JOB_CORPUS_SWEEP_OUT;
        if (sweepOut) {
            mkdirSync(sweepOut, { recursive: true });
            writeFileSync(join(sweepOut, 'default.json'), JSON.stringify(out, null, 2) + '\n');
        } else {
            await expect(out).toMatchFileSnapshot('./__snapshots__/job-corpus-snapshot/default.json');
        }
    }, 20 * 60 * 1000); // 125件 × (goto + expandAllSections) のため通常より長いタイムアウトを与える
});
