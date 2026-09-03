/**
 * toCalcModel(extractSaveModelFromState()) が ExtractModelFromDom() と一致することを検証する
 * （残件台帳 B-33 B4）。
 *
 * 射影対象のフィールドに限定して比較する。除外フィールド（攻撃手段・シャドウ装備の
 * アイテムID/精錬値/ランダムオプション・costume・timeItemConfEffective・bonusStatus・
 * passiveSkill/buff4/buff7/buff8/autoSpell）は `engine/runtime/save-to-calc-model.js` の
 * 先頭コメント参照。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries, waitForBattleResultRendered } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');

const entries = loadSaveDataEntries(join(__dirname, 'fixtures/sample-savedata-new.md'), 'save-to-calc-model');

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

// 射影対象のフィールドだけを抜き出す（除外フィールドの一覧は save-to-calc-model.js 冒頭参照）。
const PROJECTED_KEYS = [
    'status', 'weapon', 'defPlus', 'defTranscendence', 'arrow', 'equip', 'card',
    'confIchizi', 'confNizi', 'confSanzi', 'confYozi', 'confDebuff', 'timeItemConf',
    'mobConfTaisei', 'mobConfIjyou', 'mobConfKyouka', 'learnedSkill',
    'confCustomStatus', 'confCustomAtk', 'confCustomDef', 'confCustomSkill', 'confCustomSpecStatus',
    'pureStatus',
];

describe('toCalcModel(extractSaveModelFromState()) と ExtractModelFromDom() の同値性（残件台帳 B-33 B4）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（fixtures/sample-savedata-new.md に URL がありません）', () => {
            console.warn('sample-savedata-new.md にエントリがないためスキップ');
        });
        return;
    }

    for (const { label, query } of entries) {
        it(`${label}: 射影対象フィールドが一致する`, async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const qi = query.indexOf('?');
            const q = qi >= 0 ? query.slice(qi) : `?${query}`;
            try {
                await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
                await waitForBattleResultRendered(page);

                const { domModel, projectedModel } = await page.evaluate(async (keys) => {
                    const dynamicImport = new Function('specifier', 'return import(specifier);') as
                        (specifier: string) => Promise<Record<string, any>>;
                    const reg = (globalThis as any)._ratorioReg;
                    const { extractSaveModelFromState } = await dynamicImport('/engine/savedata/savedata-collect.js');
                    const { toCalcModel } = await dynamicImport('/engine/runtime/save-to-calc-model.js');

                    const domFull = reg.extractModelFromDom();
                    const saveModel = extractSaveModelFromState();
                    const projectedFull = toCalcModel(saveModel);

                    const pick = (obj: any) => {
                        const out: Record<string, unknown> = {};
                        for (const k of keys) out[k] = obj[k];
                        return out;
                    };
                    return {
                        domModel: JSON.parse(JSON.stringify(pick(domFull))),
                        projectedModel: JSON.parse(JSON.stringify(pick(projectedFull))),
                    };
                }, PROJECTED_KEYS);

                // arrow・weapon.weapon2Type は HtmlGetObjectValueById(...)（legacyNum変換なし）の
                // DOM側の型が「対応する<select>が存在するか」に依存して文字列/数値のどちらにも
                // なりうる（weapon2Typeの読み取り元 OBJID_ARMS_TYPE_LEFT は二刀流可能な職業でしか
                // 動的生成されない）。本射影は常に数値で統一しているため、値の一致を見るために
                // 両側をNumber()で正規化してから比較する。
                const normalize = (m: any) => ({
                    ...m,
                    arrow: Number(m.arrow),
                    weapon: { ...m.weapon, weapon2Type: Number(m.weapon.weapon2Type) },
                });
                expect(normalize(projectedModel)).toEqual(normalize(domModel));
            } finally {
                await context.close();
            }
        });
    }
});
