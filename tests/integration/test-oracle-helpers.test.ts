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
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createStaticServer, evalObjidSnapshot, snapshotAllGlobals } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

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

    it('A_JOB は OBJID_SELECT_JOB と同一要素のため意図的乖離として除外される', async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        const snapshot = await evalObjidSnapshot(page);
        await context.close();

        expect(snapshot['calcForm:A_JOB']).toBeUndefined();
        expect(snapshot['OBJID_SELECT_JOB']).toBeUndefined();
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
