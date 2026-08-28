/**
 * CSkillManager 総当たりスイープ（関数入出力の before/after ハーネス）。
 *
 * CSkillManager.js リファクタリング計画（.claude/context/remaining-work.md「着手可能な小タスク」
 * 由来・plan: remining-work-md-cskillmanager-js-cskill-magical-elephant）の安全網。
 * g_skillManager の 31 個のアクセサ全てに対し、全 1,396 SKILL_ID_* を通し、
 * 結果をスナップショット/生JSONとして固定する。
 *
 * vitest の SSR ローダーで CSkillManager.js 系を直接 import すると循環 import で
 * ハングする（tests/vitest.config.ts の exclude と同じ理由）ため、
 * skill-formula-sweep.test.ts と同様に実ブラウザの ESM ローダー経由で呼ぶ。
 *
 * 引数（charaData/specData/mobData/option）は本番と同じ経路（StAllCalc()）で1回だけ取得し、
 * 全 1,396 ID に使い回す。これにより UsedSkillSearch/LearnedSkillSearch も実登録された
 * 実装が呼ばれる。
 *
 * 用途:
 *   通常実行 … __snapshots__/skill-data-sweep/default.json と照合
 *   SKILL_SWEEP_OUT=<dir> pnpm test:integration -- skill-data-sweep
 *     … 照合の代わりに <dir>/default.json へ生JSONを書き出す（before/after diff 用）
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
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

describe('CSkillManager 全アクセサ 総当たりスイープ', () => {
    it('default: 全 SKILL_ID_* に対する g_skillManager.Get* 出力がスナップショットと一致する', async () => {
        const page = await browser.newPage();
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(String(e)));
        await page.goto(`${baseUrl}/ro4/m/calcx.html`, { waitUntil: 'networkidle', timeout: 60000 });
        await page.waitForTimeout(500);

        // page.evaluate に渡すのは文字列（skill-formula-sweep.test.ts と同じ理由:
        // 関数で渡すと中の dynamic import() が Vite に書き換えられブラウザ内で解決できない）。
        const result = await page.evaluate(`
            (async () => {
                const globalMod = await import('/engine/runtime/global.js');
                const bridge    = await import('/engine/bridge/foot-bridge.js');
                const skillMod  = await import('/engine/skill/skill.dat.js');
                const kindsMod  = await import('/engine/const/EnumItemKind.js');

                const sm = globalMod.g_skillManager;
                const skillIds = Object.entries(skillMod)
                    .filter(([name]) => name.startsWith('SKILL_ID_'))
                    .map(([, value]) => value)
                    .sort((a, b) => a - b);

                // 本番と同じ経路で引数を1回だけ取得する（StAllCalc の戻り値は
                // [charaData, specData(=n_tok), mobData, attackMethodConfArray]。
                // engine/head.js の calc() と同じ取り出し方）。
                const retVal = bridge.StAllCalc();
                const charaData = retVal[0];
                const specData  = retVal[1];
                const mobData   = retVal[2];
                const optArray  = retVal[3];
                const option    = optArray && optArray[0] ? optArray[0] : null;

                const WEAPONS = [
                    kindsMod.ITEM_KIND_KNIFE, kindsMod.ITEM_KIND_SWORD, kindsMod.ITEM_KIND_SPEAR,
                    kindsMod.ITEM_KIND_AXE, kindsMod.ITEM_KIND_BOW, kindsMod.ITEM_KIND_STUFF,
                    kindsMod.ITEM_KIND_BOOK, kindsMod.ITEM_KIND_FIST,
                ];
                const DEFAULT_WEAPON = kindsMod.ITEM_KIND_SWORD;

                function ser(v) {
                    if (typeof v === 'number') {
                        if (Number.isNaN(v)) return 'NaN';
                        if (!Number.isFinite(v)) return v > 0 ? 'Inf' : '-Inf';
                        if (Object.is(v, -0)) return '-0';
                        return String(v);
                    }
                    if (v === undefined) return 'undefined';
                    if (v === null) return 'null';
                    if (typeof v === 'object') return '[object]';
                    return String(v);
                }
                function call(fn) {
                    try { return ser(fn()); } catch (e) { return 'ERR:' + e.message; }
                }

                const out = {};

                // ID のみ（8）
                const idOnly = {
                    GetBaseSkillId:     (id) => sm.GetBaseSkillId(id),
                    GetSkillName:       (id) => sm.GetSkillName(id),
                    GetSkillPlaneName:  (id) => sm.GetSkillPlaneName(id),
                    GetSkillKana:       (id) => sm.GetSkillKana(id),
                    GetMaxLv:           (id) => sm.GetMaxLv(id),
                    GetSkillType:       (id) => sm.GetSkillType(id),
                    GetStackLimit:      (id) => sm.GetStackLimit(id),
                    GetStackIncrement:  (id) => sm.GetStackIncrement(id),
                };
                for (const [name, fn] of Object.entries(idOnly)) {
                    const row = {};
                    for (const id of skillIds) row[id] = call(() => fn(id));
                    out[name] = row;
                }

                // ID × 武器種（2）
                const idWeapon = {
                    GetSkillRange:         (id, w) => sm.GetSkillRange(id, w),
                    MatchWeaponCondition:  (id, w) => sm.MatchWeaponCondition(id, w),
                };
                for (const [name, fn] of Object.entries(idWeapon)) {
                    const row = {};
                    for (const id of skillIds) {
                        row[id] = WEAPONS.map((w) => call(() => fn(id, w))).join('|');
                    }
                    out[name] = row;
                }

                // ID × option/mob/parent（3）
                {
                    const row = {};
                    for (const id of skillIds) {
                        row[id] = [
                            call(() => sm.GetElement(id, option, mobData, 0)),
                            call(() => sm.GetElement(id, null, mobData, 0)),
                        ].join('|');
                    }
                    out.GetElement = row;
                }
                {
                    const row = {};
                    for (const id of skillIds) {
                        row[id] = [
                            call(() => sm.GetForcedElement(id, option, mobData, 0)),
                            call(() => sm.GetForcedElement(id, null, mobData, 0)),
                        ].join('|');
                    }
                    out.GetForcedElement = row;
                }
                {
                    const row = {};
                    for (const id of skillIds) row[id] = call(() => sm.IsGroundInstallation(id, option));
                    out.IsGroundInstallation = row;
                }

                // ID × Lv（16。Lv軸は [1, GetMaxLv(id)||1] の重複除去）
                const idLevel = {
                    GetPower:            (id, lv) => sm.GetPower(id, lv, charaData, option, mobData, DEFAULT_WEAPON, 0),
                    GetHitCount:         (id, lv) => sm.GetHitCount(id, lv, option, DEFAULT_WEAPON, 0),
                    GetDividedHitCount:  (id, lv) => sm.GetDividedHitCount(id, lv, charaData, option, 0),
                    GetCostVary:         (id, lv) => sm.GetCostVary(id, lv, charaData),
                    GetCostFixed:        (id, lv) => sm.GetCostFixed(id, lv, charaData),
                    GetCostAP:           (id, lv) => sm.GetCostAP(id, lv, charaData),
                    GetCastTimeVary:     (id, lv) => sm.GetCastTimeVary(id, lv, charaData),
                    GetCastTimeFixed:    (id, lv) => sm.GetCastTimeFixed(id, lv, charaData),
                    GetCastTimeForce:    (id, lv) => sm.GetCastTimeForce(id, lv, charaData),
                    GetDelayTimeCommon:  (id, lv) => sm.GetDelayTimeCommon(id, lv, charaData),
                    GetCoolTime:         (id, lv) => sm.GetCoolTime(id, lv, charaData),
                    GetLifeTime:         (id, lv) => sm.GetLifeTime(id, lv, charaData),
                    GetDamageInterval:   (id, lv) => sm.GetDamageInterval(id, lv),
                    IsEnableCritical:    (id, lv) => sm.IsEnableCritical(id, lv, charaData, specData, mobData),
                    GetCriActRate:       (id, lv) => sm.GetCriActRate(id, lv, charaData, specData, mobData, option, DEFAULT_WEAPON),
                    CriDamageRate:       (id, lv) => sm.CriDamageRate(id, lv, charaData, specData, mobData),
                };
                for (const [name, fn] of Object.entries(idLevel)) {
                    const row = {};
                    for (const id of skillIds) {
                        const maxLv = sm.GetMaxLv(id) || 1;
                        const levels = maxLv === 1 ? [1] : [1, maxLv];
                        row[id] = levels.map((lv) => call(() => fn(id, lv))).join('|');
                    }
                    out[name] = row;
                }

                // GetSkillIdByName は名前側から掃く（ID起点ではない）
                {
                    const row = {};
                    for (const id of skillIds) {
                        const name = sm.GetSkillName(id);
                        row[id] = call(() => sm.GetSkillIdByName(name));
                    }
                    out.GetSkillIdByName = row;
                }

                return { out, skillIdCount: skillIds.length, dataCount: sm.GetDataCount() };
            })()
        `) as { out: Record<string, Record<string, unknown>>; skillIdCount: number; dataCount: number };

        expect(pageErrors, `スイープ中に未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
        expect(result.skillIdCount, 'skill.dat.js から SKILL_ID_* が読めていない').toBeGreaterThan(1000);
        expect(result.dataCount, 'GetDataCount() が SKILL_ID_* の件数と一致しない').toBe(result.skillIdCount);

        const sweepOut = process.env.SKILL_SWEEP_OUT;
        if (sweepOut) {
            mkdirSync(sweepOut, { recursive: true });
            writeFileSync(join(sweepOut, 'default.json'), JSON.stringify(result.out, null, 2) + '\n');
        } else {
            await expect(result.out).toMatchFileSnapshot('./__snapshots__/skill-data-sweep/default.json');
        }
        await page.close();
    });
});
