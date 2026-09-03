/**
 * テストオラクル拡張の動作確認（リファクタリング計画 Phase 0）。
 *
 * .claude/context/remaining-work.md 系の「UI/ロジック分離」リファクタリング計画で、
 * 既存の安全網 `evalObjidSnapshot`（`[id^="OBJID_"]` のみ観測）が
 * StAllCalc（engine/stallcalc.js）の読む calcForm 入力 126 種類のうち
 * 約30種類しか観測できていなかった問題への対処:
 *
 *   1. evalObjidSnapshot の calcForm 拡張（helpers/objid-snapshot.ts）
 *      — OBJID を持たない name 属性のみの入力（BuffItemAndFood.js 等が実行時生成する
 *        入力を含む）も `calcForm:<name>` キーで観測できることを確認する。
 *        （BuffGuildAndGospel.js/BuffOtherCategory.js は Phase 6 で `<template>` 化され、
 *        生成される入力欄が OBJID を持つようになった。今はこの2ファイルの例は使わない）
 *   2. snapshotAllGlobals（helpers/objid-snapshot.ts）
 *      — 計算用グローバル state モジュールを直接読み、JS 例外なく完走することを確認する
 *        （Phase 7 の hydration 二重実行差分オラクルとして使う前提の土台）。
 *
 * このファイル自体は StAllCalc の分割（Phase 5 以降）には関与しない。
 * 新設ヘルパーが「動く」ことだけを保証する。
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { type Server } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    createStaticServer, evalObjidSnapshot, snapshotAllGlobals, waitForBattleResultRendered,
} from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const CORPUS_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');

/**
 * generated-job-corpus.md から「Pass B: 代表職業（スキル攻撃手段選択）」の1件を選ぶ。
 * 数値インデックスで決め打ちすると再生成（generate-job-corpus.mjs）で対象が変わりうるため、
 * コメント行（`# ○○（スキル攻撃）`）を目印に探す。
 * ウォーロック（詠唱の長い魔法スキル）を優先する——他の代表職業は「攻撃手段セレクトの
 * 2番目の option」がインスタントスキルで詠唱0のことがあり、詠唱非ゼロを保証できないため
 * （実測で確認済み）。無ければ最初に見つかった「スキル攻撃」フィクスチャへフォールバックする。
 */
function findSkillAttackFixtureQuery(): string | null {
    const lines = readFileSync(CORPUS_PATH, 'utf-8').split('\n');
    let lastComment = '';
    let fallback: string | null = null;
    for (const raw of lines) {
        const line = raw.trim();
        if (line.startsWith('#')) { lastComment = line; continue; }
        if (line.startsWith('https') && lastComment.includes('スキル攻撃')) {
            const qi = line.indexOf('?');
            if (qi < 0) continue;
            const query = line.slice(qi + 1);
            if (lastComment.includes('ウォーロック')) return query;
            fallback ??= query;
        }
    }
    return fallback;
}

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

describe('evalObjidSnapshot の calcForm 拡張', () => {
    it('OBJID を持つ要素は calcForm:<name> と OBJID_* の両方に同じ値で現れる', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        // OBJID_SELECT_BASE_LEVEL は id="OBJID_SELECT_BASE_LEVEL" name="A_BaseLV" の同一要素。
        expect(snapshot['calcForm:A_BaseLV']).toBeDefined();
        expect(snapshot['calcForm:A_BaseLV']).toBe(snapshot['OBJID_SELECT_BASE_LEVEL']);
    });

    it('OBJID を持たない name のみの入力（A7_Skill42）も calcForm:A7_Skill42 として観測できる', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        // 「アイテム・食品他」スイッチは folding-switch-MIG を持たないため
        // expandAllSections では開かない。直接クリックして展開する。
        await page.check('#OBJID_CHECK_A7_SKILLSW');
        await page.waitForTimeout(300);

        // 前提確認: BuffItemAndFood.js の期間限定効果セレクト（A7_Skill42 等）は
        // 実際に id を持たない（OBJID_* 走査の観測対象外であることの直接確認）。
        const elementId = await page.evaluate(
            () => document.querySelector<HTMLElement>('[name="A7_Skill42"]')?.id ?? null
        );
        expect(elementId).toBe('');

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        expect(snapshot['calcForm:A7_Skill42']).toBeDefined();
    });

    it('A_JOB は OBJID_SELECT_JOB と同一要素のため calcForm:A_JOB と OBJID_SELECT_JOB が同じ値で現れる', async () => {
        // 2026-08-10〜2026-08-31（残件台帳 B-29）の間は本番未デプロイの差分を理由に
        // 除外されていたが、本番デプロイ完了に伴い陳腐化したため撤去済み（INTENTIONAL_DIVERGENCE_FORM_NAMES
        // は helpers/objid-snapshot.ts 参照）。他の name 付き要素と同じ扱いになったことを確認する。
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        expect(snapshot['calcForm:A_JOB']).toBeDefined();
        expect(snapshot['calcForm:A_JOB']).toBe(snapshot['OBJID_SELECT_JOB']);
    });
});

describe('evalObjidSnapshot の戦闘結果パネル採取（残件台帳 B-29）', () => {
    it('詠唱時間（変動）が0秒以外の値として観測できる（g_VariableCastTimeRate 型の回帰を検出可能）', async () => {
        // 通常攻撃のセーブデータは BASIC グリッドに「詠唱/ディレイ > （変動）」行自体が
        // 現れない（攻撃間隔のみ）ため、必ず詠唱を伴うスキル攻撃のフィクスチャを使う。
        const query = findSkillAttackFixtureQuery();
        expect(query).not.toBeNull();

        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html?${query}`, { waitUntil: 'networkidle', timeout: 60000 });
        await waitForBattleResultRendered(page);

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        const castKey = 'battle:BATTLE_RESULT_BASIC > 詠唱/ディレイ > （変動）';
        expect(snapshot[castKey]).toBeDefined();
        expect(snapshot[castKey]).not.toBe('0.00 秒');
        expect(snapshot['battle:TINY > DPS']).toBeDefined();
        expect(snapshot['legacy:AveSecondATK']).toBeDefined();
    });

    it('最大被ダメージ行のラベル（<select>を内包）は行ラベルとして属性選択肢を巻き込まない', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        const battleKeys = Object.keys(snapshot).filter((k) => k.startsWith('battle:'));
        expect(battleKeys.length).toBeGreaterThan(10);
        for (const key of battleKeys) {
            expect(key).not.toContain('属性なし無属性水属性');
        }
    });
});

describe('snapshotAllGlobals', () => {
    it('JS例外なく完走し、計算用グローバルの値を返す', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const snapshot = await snapshotAllGlobals(page);
        await context.close();

        expect(Object.keys(snapshot).length).toBeGreaterThan(100);
        // roro-state.js の n_A_STR はデフォルト状態で 1（初期値）。
        expect(snapshot['/engine/runtime/roro-state.js#n_A_STR']).toBe('1');
    });

    it('職業変更の前後で異なるグローバル値を検出できる（差分オラクルとしての基本性質）', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const before = await snapshotAllGlobals(page);
        await page.selectOption('#OBJID_SELECT_JOB', { index: 1 });
        await page.waitForTimeout(500);
        const after = await snapshotAllGlobals(page);
        await context.close();

        // ro4-state.js の n_A_ActiveSkill は職業変更で攻撃手段がリセットされるため、
        // 何らかのキーが変化するはず（具体的にどのキーが変わるかはハードコードしない —
        // Phase 5 以降の hydration 実装差分でここが変わっても意味は保たれる）。
        const changedKeys = Object.keys(before).filter((k) => before[k] !== after[k]);
        expect(changedKeys.length).toBeGreaterThan(0);
    });
});
