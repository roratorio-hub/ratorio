/**
 * 全スキル ダメージ計算 総当たりスイープ（関数入出力の before/after ハーネス）。
 *
 * `engine/battle/skill-formula-{physical,magical,special}.js` の switch case を
 * `engine/skill/<職業>/*.js` の defineSkill 側へ移す作業（plan:
 * engine-battle-skill-fomula-js-engine-sk-graceful-wombat）の安全網。
 *
 * skill-data-sweep.test.ts と同様に実ブラウザの ESM ローダー経由で呼ぶ
 * （vitest の SSR ローダーで battlecalc.js 系を直接 import すると循環 import で
 * ハングするため）。装備ありのフィクスチャで StAllCalc() を1回だけ呼び、
 * charaData/specData/mobData/attackMethodConfArray を固定した上で、
 * 全 SKILL_ID_* × Lv[1, GetMaxLv(id)] について n_A_ActiveSkill/LV を強制的に差し替えて
 * ComputeBattleResult() を呼び、その主撃結果（CBattleCalcResult）をスナップショット化する。
 * 装備なしだと与ダメージが大半0になり回帰を検出できないため（backlog-archive B-32）、
 * 装備ありのフィクスチャ（sample-savedata-new.md の先頭エントリ）を使う。
 *
 * 各スキルの直前に SET_ZOKUSEI(mobData, attackMethodConfArray) を呼ぶこと。
 * 本番では StAllCalc() がスキル選択のたびにこれを1回呼ぶため n_A_Weapon_zokusei は
 * 常にそのスキル用の値になるが、本ハーネスは StAllCalc() を1回しか呼ばないため、
 * 呼ばないと「属性を自分で設定しないスキル（未対応スキル・攻撃系ではない案内役の
 * ダミー等）」を計算した直後は前のスキルの属性が残り、次に計算する無関係なスキルの
 * ダメージが NaN（JSON化すると null）になることがある（実測: SKILL_ID_TWOHAND_DEFENDING
 * 等を経由した直後に SKILL_ID_DRAGONIC_AURA が壊れた）。
 *
 * 用途:
 *   通常実行 … __snapshots__/battle-damage-sweep/default.json と照合
 *   BATTLE_SWEEP_OUT=<dir> pnpm test:integration -- battle-damage-sweep
 *     … 照合の代わりに <dir>/default.json へ生JSONを書き出す（before/after diff 用）
 *
 * 注意: この harness は「今の挙動」を固定するだけで正しさは保証しない
 * （job-corpus-snapshot.test.ts と同じ位置づけ。backlog-archive B-16）。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const geared = loadSaveDataEntries(FIXTURES_NEW_PATH, 'new')[0];
const fixtureQuery = geared ? geared.query : '';

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

describe('全スキル ダメージ計算 総当たりスイープ（BattleCalc999Core）', () => {
    it('default: 全 SKILL_ID_* × Lv[1,maxLv] の CBattleCalcResult がスナップショットと一致する', async () => {
        const page = await browser.newPage();
        const pageErrors: string[] = [];
        page.on('pageerror', (e) => pageErrors.push(String(e)));
        await page.goto(`${baseUrl}/ro4/m/calcx.html${fixtureQuery ? `?${fixtureQuery}` : ''}`, {
            waitUntil: 'networkidle',
            timeout: 60000,
        });
        await page.waitForTimeout(500);

        // page.evaluate に渡すのは文字列（skill-data-sweep.test.ts と同じ理由:
        // 関数で渡すと中の dynamic import() が Vite に書き換えられブラウザ内で解決できない）。
        const result = await page.evaluate(`
            (async () => {
                const stateMod  = await import('/engine/runtime/ro4-state.js');
                const globalMod = await import('/engine/runtime/global.js');
                const bridge    = await import('/engine/bridge/stallcalc-bridge.js');
                const battleMod = await import('/engine/battle/battlecalc.js');
                const skillMod  = await import('/engine/skill/skill.dat.js');

                const sm = globalMod.g_skillManager;
                const skillIds = Object.entries(skillMod)
                    .filter(([name]) => name.startsWith('SKILL_ID_'))
                    .map(([, value]) => value)
                    .sort((a, b) => a - b);

                // 本番と同じ経路で charaData/specData/mobData/attackMethodConfArray を
                // 1回だけ取得し、全 SKILL_ID_* に使い回す（skill-data-sweep と同じ手順）。
                const retValArray = bridge.StAllCalc();
                const mobData = retValArray[2];
                const attackMethodConfArray = retValArray[3];

                function ser(v) {
                    if (typeof v === 'number') {
                        if (Number.isNaN(v)) return 'NaN';
                        if (!Number.isFinite(v)) return v > 0 ? 'Inf' : '-Inf';
                        if (Object.is(v, -0)) return '-0';
                        return String(v);
                    }
                    if (v === undefined) return 'undefined';
                    if (v === null) return 'null';
                    if (Array.isArray(v)) return '[' + v.map(ser).join(',') + ']';
                    return String(v);
                }

                // CBattleCalcResult のプレーンなフィールドを固定順で直列化する
                // （w_DMG 単体ではなく、詠唱・ディレイ・ヒット数・判定フラグまで含めて
                // 「BattleCalc999Core が書く値」全体を固定する）。
                const FIELDS = [
                    'dmgUnitArray', 'dmgPerfectArray', 'hitCountArray', 'dividedHitCountArray',
                    'castVary', 'castFixed', 'delayMotion', 'delaySkill', 'delayForce', 'delayInput',
                    'damageInterval', 'objectLifeTime', 'coolTime', 'attackInterval',
                    'actRate', 'hitRate', 'perfectRate', 'criRate', 'stackLimit', 'stackIncrement',
                    'bGroundInstallation', 'bWeaponMismatch', 'bNoDamage', 'bIrregularBattleTime', 'bUnknownCasts',
                ];
                function serializeResult(r) {
                    if (!r) return '(none)';
                    return FIELDS.map((f) => f + '=' + ser(r[f])).join(';');
                }

                const out = {};
                for (const id of skillIds) {
                    const maxLv = sm.GetMaxLv(id) || 1;
                    const levels = maxLv === 1 ? [1] : [1, maxLv];
                    const row = {};
                    for (const lv of levels) {
                        try {
                            stateMod.set_n_A_ActiveSkill(id);
                            stateMod.set_n_A_ActiveSkillLV(lv);
                            // StAllCalc() が毎回行う属性設定を、このスキルの分だけ再現する。
                            battleMod.SET_ZOKUSEI(mobData, attackMethodConfArray);
                            const { battleCalcResultAll } = battleMod.ComputeBattleResult(retValArray);
                            const r = battleCalcResultAll.GetActiveResult(0);
                            row[lv] = serializeResult(r);
                        } catch (e) {
                            row[lv] = 'ERR:' + e.message;
                        }
                    }
                    out[id] = row;
                }

                return { out, skillIdCount: skillIds.length };
            })()
        `) as { out: Record<string, Record<string, string>>; skillIdCount: number };

        expect(pageErrors, `スイープ中に未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
        expect(result.skillIdCount, 'skill.dat.js から SKILL_ID_* が読めていない').toBeGreaterThan(1000);

        const sweepOut = process.env.BATTLE_SWEEP_OUT;
        if (sweepOut) {
            mkdirSync(sweepOut, { recursive: true });
            writeFileSync(join(sweepOut, 'default.json'), JSON.stringify(result.out, null, 2) + '\n');
        } else {
            await expect(result.out).toMatchFileSnapshot('./__snapshots__/battle-damage-sweep/default.json');
        }
        await page.close();
    }, 180000);
});
