/**
 * オートスペル発動時のダメージ計算が、主撃の攻撃手段オプションを誤読しないことの回帰テスト。
 *
 * オートスペルの計算は主撃の attackMethodConfArray をそのまま渡すため（battlecalc.js の
 * オートスペルループ）、計算式がスキル固有のオプションを読むと別スキルの設定値を誤用する
 * （エイムドボルト・號砲で実際に倍率欠落が発生した：エイムドボルトは常に「主撃のオプション0
 * （通常攻撃には無いので0）」を読んでサイズ倍率が乗らず、號砲は閃光連撃経由だと倍率初期値の
 * ままになっていた）。
 *
 * 実在のフィクスチャ（STR/DEX/武器ATK等が揃った状態）から `extractModelFromDom()` で
 * モデルを取得し、attackMethod / autoSpell 欄だけを差し替えて `calcFromModel()` を呼ぶ
 * （calc-headless.test.ts と同じ API）。calcFromModel() の連続呼び出しはモジュールグローバルの
 * 干渉が起こりうる（calc-headless.js のJSDoc参照）ため、比較する2パターンは別ページロードで
 * 1回ずつ計測する。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const FIXTURES_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');

// キャラクターのステータス（STR/DEX/武器ATK等）が揃っていれば職業は問わない
// （エイムドボルト・號砲とも n_A_ActiveSkillLV/attackMethodConfArray から直接計算し、
// 職業チェックを経由しないため。先頭のフィクスチャを1件使う）。
const entries = loadSaveDataEntries(FIXTURES_PATH, 'sample');

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

async function gotoFixture(query: string) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const qi = query.indexOf('?');
    const q = qi >= 0 ? query.slice(qi) : `?${query}`;
    await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForFunction(async () => {
        const reg = (globalThis as any)._ratorioReg;
        return typeof reg?.extractModelFromDom === 'function' && typeof reg?.calcFromModel === 'function';
    });
    return { context, page };
}

/**
 * フィクスチャのキャラクターに attackMethod / autoSpell を上書きしたモデルで計算し、
 * 指定した結果配列（'active' | 'append'）の [0] 番目の平均ダメージ（非クリティカル）を返す。
 */
async function calcAveDamage(query: string, patch: {
    attackMethod: { skillId: number; skillLv: number; optionValueArray: number[] };
    autoSpellSlot0?: { asId: number; probIndex: number };
    resultKind: 'active' | 'append';
}) {
    const { context, page } = await gotoFixture(query);
    try {
        return await page.evaluate((p) => {
            const reg = (globalThis as any)._ratorioReg;
            const model = reg.extractModelFromDom();
            model.attackMethod.sourceType = 0;
            model.attackMethod.skillId = p.attackMethod.skillId;
            model.attackMethod.skillLv = p.attackMethod.skillLv;
            model.attackMethod.optionValueArray = p.attackMethod.optionValueArray;
            if (p.autoSpellSlot0) {
                // OBJID_OFFSET_AS_SKILL_ID = 100 / OBJID_OFFSET_AS_SKILL_LV = 200 /
                // OBJID_OFFSET_AS_SKILL_PROB = 300（calcautospell.js）。
                // Lv は null のままにして AutoSpellSkill テーブルの既定Lvを使わせる。
                model.autoSpell[100 + 0] = p.autoSpellSlot0.asId;
                model.autoSpell[200 + 0] = null;
                model.autoSpell[300 + 0] = p.autoSpellSlot0.probIndex;
            } else {
                model.autoSpell[100 + 0] = null;
                model.autoSpell[200 + 0] = null;
                model.autoSpell[300 + 0] = null;
            }
            const result = reg.calcFromModel(model);
            const r = p.resultKind === 'active'
                ? (result.GetActiveResultCount() > 0 ? result.GetActiveResult(0) : null)
                : (result.GetAppendResultCount() > 0 ? result.GetAppendResult(0) : null);
            // dmgUnitArray[0] = [非クリ最小, 非クリ平均, 非クリ最大]（CBattleCalcResult.js）
            return { skillId: r?.skillId, skillLv: r?.skillLv, ave: r ? r.dmgUnitArray[0][1] : null };
        }, patch);
    } finally {
        await context.close();
    }
}

describe('オートスペル発動時のダメージが、手動選択時と一致する', () => {
    if (entries.length === 0) {
        it.skip('フィクスチャなし（tests/integration/fixtures/sample-savedata-new.md）', () => {});
        return;
    }
    const query = entries[0].query;

    it('エイムドボルト: オートスペル(習得Lv10)発動時のダメージが、攻撃手段で直接選んだ場合と一致する', async () => {
        // SKILL_ID_TUZYO_KOGEKI = 0（通常攻撃）。装備オートスペルは主撃が通常攻撃/スペルフィストの
        // 場合のみ発動する（calcautospell.js）。
        // AS_ID_AIMED_BOLT_10 = 229（autospell.dat.js）→ AutoSpellSkill[229] = [229,1,497,10,0,1]
        // （SKILL_ID_AIMED_BOLT=497, Lv10）。発動率indexは非0であれば良い（1 → 0.1%。
        // dmgUnitArray は発動率を掛ける前の値なので結果に影響しない）。
        const auto = await calcAveDamage(query, {
            attackMethod: { skillId: 0, skillLv: 1, optionValueArray: [] },
            autoSpellSlot0: { asId: 229, probIndex: 1 },
            resultKind: 'append',
        });
        expect(auto.skillId).toBe(497);
        expect(auto.skillLv).toBe(10);
        expect(auto.ave).not.toBeNull();

        // SKILL_ID_AIMED_BOLT = 497 を攻撃手段で直接選択（Lv10・オプション「通常計算」=1）。
        const manual = await calcAveDamage(query, {
            attackMethod: { skillId: 497, skillLv: 10, optionValueArray: [1] },
            resultKind: 'active',
        });
        expect(manual.ave).not.toBeNull();

        expect(auto.ave).toBe(manual.ave);
    });

    // 號砲は「攻撃手段で直接選択」と「閃光連撃のオートスペルとして発動」とで、
    // 修羅の「閃光連撃／閃光連撃直後のATK上昇状態」の効果（chara.js）の適用条件
    // （n_A_ActiveSkill が SENKO_RENGEKI かどうか）が異なり、ダメージが一致する
    // 保証がない（これはバグではなく仕様。閃光連撃を主攻撃手段にした状態のほうが
    // ATK補正が乗る）。そのため「manual と一致する」ではなく、閃光連撃という
    // 同一コンテキストのまま號砲Lvオプションだけを変えて、ダメージがLvに応じて
    // 変化することを見る（修正前は AS 分岐に else が無く CS.wbairitu が
    // BattleCalc999Core の初期値100に固定されるため、Lvを変えてもダメージが
    // ほぼ変化しなかった＝この不変条件が壊れる）。
    it('號砲: 閃光連撃経由のオートスペル発動時のダメージが、號砲Lvオプションに応じて変化する', async () => {
        // SKILL_ID_SENKO_RENGEKI = 799。閃光連撃のオプション[2]に號砲のLvを設定すると
        // 「閃光連撃時の連撃」としてオートスペル計算に SKILL_ID_GOHO(615) が積まれる
        // （calcautospell.js。actRate は固定1000=100%）。
        const lv1 = await calcAveDamage(query, {
            attackMethod: { skillId: 799, skillLv: 5, optionValueArray: [0, 0, 1, 0] },
            resultKind: 'append',
        });
        expect(lv1.skillId).toBe(615);
        expect(lv1.skillLv).toBe(1);
        expect(lv1.ave).not.toBeNull();

        const lv10 = await calcAveDamage(query, {
            attackMethod: { skillId: 799, skillLv: 5, optionValueArray: [0, 0, 10, 0] },
            resultKind: 'append',
        });
        expect(lv10.skillId).toBe(615);
        expect(lv10.skillLv).toBe(10);
        expect(lv10.ave).not.toBeNull();

        // 修正前は wbairitu が初期値100に固定されLvに依存しないため、この比は1に近い値になる。
        expect((lv10.ave as number) / (lv1.ave as number)).toBeGreaterThan(1.5);
    });
});
