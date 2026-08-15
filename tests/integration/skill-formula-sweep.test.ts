/**
 * スキル総当たりスイープ（関数入出力の before/after ハーネス）。
 *
 * .claude/context/remaining-work.md「残作業 1」の作業計画（Phase 0）が挙げる案
 * 「分割前後で『エクスポートされた各関数の入出力』を記録・比較するハーネスを作る」の実装。
 *
 * DOM の攻撃方法セレクト（カスケード式・複数階層）を実際に操作して全スキルを踏むのは
 * 構造が複雑すぎて非現実的なため、対象を「skillId を直接引数に取るスキルデータ関数」に絞り、
 * ページ内で動的 import してブラウザ内で直接呼び出す方式にした
 * （foot.js を vitest の SSR ローダーで直接 import すると CSkillManager 系の循環 import で
 * ハングする既知の問題があるため、実ブラウザの ESM ローダーを経由する）。
 *
 * roro/m/js/skill.dat.js が定義する SKILL_ID_* 定数（約1,382件）全てに対して各関数を呼び、
 * 結果を Vitest スナップショットに固定する。foot.js の分割（Phase 1・Phase 2）で該当関数を
 * 別ファイルへ移動する際、本文を1バイトでも変えればここで検出できる。
 *
 * 対象関数は Phase 1 の分割単位と対応している（foot-bridge.js 経由。関数一覧は下記 TARGETS）。
 * Phase 2 で StAllCalc からセクションを切り出す際は、対応する関数をここに追加すること。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

// skillId を直接引数に取り、foot-bridge.js 経由で呼び出せる関数（Phase 1 分割対象と対応）。
// GetAdditionalFixedCastTime は skillId 引数を取らないためスイープ対象外
// （呼び出し元 charaData 経由で split-regression.test.ts の全 OBJID_* 比較がカバーする）。
const TARGETS = [
    'GetCoolFixOfSkill',
    'GetCostScalingOfSkill',
    'GetCostFixOfSkill',
    'GetCastScalingOfSkillForCastTimeVary',
    'GetCastFixOfSkillForCastTimeVary',
    'GetCastScalingOfSkillForCastTimeFixed',
    'GetCastFixOfSkillForCastTimeFixed',
    'GetCastScalingOfSkillForCastTimeForce',
    'GetCastFixOfSkillForCastTimeForce',
];

const FIXTURES_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const FIXTURES_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');
const allEntries = [
    ...loadSaveDataEntries(FIXTURES_NEW_PATH, 'new'),
    ...loadSaveDataEntries(FIXTURES_OLD_PATH, 'old'),
];
// 全フィクスチャを回すと実行時間が伸びるため、装備構成が多様な代表的なものに絞る
// （+ クエリなしのデフォルト状態）。増やしたい場合は allEntries から追加してよい。
const sweepEntries: { label: string; query: string }[] = [
    { label: 'default', query: '' },
    ...allEntries.slice(0, 3),
];

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

describe('スキルデータ関数 総当たりスイープ（foot.js）', () => {
    for (const { label, query } of sweepEntries) {
        it(`${label}: 全 SKILL_ID_* に対する関数出力がスナップショットと一致する`, async () => {
            const page = await browser.newPage();
            const pageErrors: string[] = [];
            page.on('pageerror', (e) => pageErrors.push(String(e)));
            await page.goto(`${baseUrl}/ro4/m/calcx.html${query ? `?${query}` : ''}`, {
                waitUntil: 'networkidle',
                timeout: 60000,
            });
            await page.waitForTimeout(500);

            // page.evaluate に渡す関数はテストファイル自体の Vite 変換対象になり、
            // 中の dynamic import() が __vite_ssr_dynamic_import__ に書き換えられて
            // ブラウザ内で解決できなくなる。文字列で渡すことでこの変換を回避する。
            const result = await page.evaluate(`
                (async () => {
                    const targets = ${JSON.stringify(TARGETS)};
                    const bridge = await import('/roro/m/js/foot-bridge.js');
                    const skillMod = await import('/roro/m/js/skill.dat.js');
                    const skillIds = Object.entries(skillMod)
                        .filter(([name]) => name.startsWith('SKILL_ID_'))
                        .map(([, value]) => value)
                        .sort((a, b) => a - b);

                    const out = {};
                    for (const fnName of targets) {
                        const fn = bridge[fnName];
                        const row = {};
                        for (const id of skillIds) {
                            try {
                                row[id] = fn(id);
                            } catch (e) {
                                row[id] = 'ERR:' + e.message;
                            }
                        }
                        out[fnName] = row;
                    }
                    return { out, skillIdCount: skillIds.length };
                })()
            `) as { out: Record<string, Record<string, unknown>>; skillIdCount: number };

            expect(pageErrors, `スイープ中に未捕捉例外: ${pageErrors.join('\n')}`).toEqual([]);
            expect(result.skillIdCount, 'skill.dat.js から SKILL_ID_* が読めていない').toBeGreaterThan(1000);
            await expect(result.out).toMatchFileSnapshot(`./__snapshots__/skill-formula-sweep/${label}.json`);
            await page.close();
        });
    }
});
