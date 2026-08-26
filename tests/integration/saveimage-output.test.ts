/**
 * generateImage()（画像保存機能）が生成するHTMLの主要項目が、画面表示（DOM/registry経由の値）
 * と一致することを検証する。
 *
 * 背景（マージ前レビュー指摘 R1 対応）: refactor/savedata-and-view-from-model ブランチで
 * saveimage.js の jQuery DOM走査（v()/t()/e()）をモデル読み取り（extractModelFromDom）・
 * 計算結果ブリッジ（g_extraInfoDataBridge）・純粋関数（hmjob-bridge.js 等）に置き換えたが、
 * 出力HTMLの内容そのものを検証する自動テストが存在しなかった（tests/ro4/saveimage.test.ts は
 * engine-registry への登録確認のみ）。等価性はソース突合で確認済みだが、実行時の裏付けが無い
 * ままだったギャップを埋める。
 *
 * 手法: generateImage() を実行して構築される #imgdiv の内容を、画面側の対応する
 * DOM要素・hmjob-bridge の各アクセサから独立に読み取った期待値と突き合わせる。
 * ラベル文字列（"Str"・"P.Atk" 等）をキーに <th>/<dt> の次の要素を取得することで、
 * テンプレートの列位置が変わっても崩れにくくしている。
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { chromium, type Browser } from 'playwright';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { startStaticServer, closeServer, loadSaveDataEntries } from '../helpers/objid-snapshot.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PROJECT_ROOT = join(__dirname, '../..');
const JOB_CORPUS_PATH = join(__dirname, 'fixtures/generated-job-corpus.md');
const SAMPLE_NEW_PATH = join(__dirname, 'fixtures/sample-savedata-new.md');
const SAMPLE_OLD_PATH = join(__dirname, 'fixtures/sample-savedata-old.md');

// generated-job-corpus.md は職業を切り替えるだけで装備は空のままのため、装備欄
// （equipSlot/enchCount の CARD_REGION_ID マッピング）の検証には向かない。
// 実際に武器・カード・エンチャントが入った sample-savedata-*.md（本番URLフィクスチャ）を
// 全件使い、job-corpus からは職業名・ステータス欄の多様性確保のため少数だけ間引いて足す。
const jobCorpusAll = loadSaveDataEntries(JOB_CORPUS_PATH, 'saveimage-job');
const JOB_CORPUS_SAMPLE_SIZE = 4;
const step = Math.max(1, Math.floor(jobCorpusAll.length / JOB_CORPUS_SAMPLE_SIZE));
const jobCorpusSample = jobCorpusAll.filter((_, i) => i % step === 0).slice(0, JOB_CORPUS_SAMPLE_SIZE);

const entries = [
    ...loadSaveDataEntries(SAMPLE_NEW_PATH, 'saveimage-new'),
    ...loadSaveDataEntries(SAMPLE_OLD_PATH, 'saveimage-old'),
    ...jobCorpusSample,
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

describe('generateImage() の出力が画面表示と一致する（マージ前レビュー R1 対応）', () => {
    if (entries.length === 0) {
        it('フィクスチャなし（sample-savedata-*.md / generated-job-corpus.md を確認してください）', () => {
            console.warn('フィクスチャにエントリがないためスキップ');
        });
        return;
    }

    for (const { label, query } of entries) {
        it(`${label}: 画像HTMLの主要項目が画面表示と一致する`, async () => {
            const context = await browser.newContext();
            const page = await context.newPage();
            const errors: string[] = [];
            page.on('pageerror', (e) => errors.push(String(e)));

            const qi = query.indexOf('?');
            const q = qi >= 0 ? query.slice(qi) : `?${query}`;
            await page.goto(`${baseUrl}/ro4/m/calcx.html${q}`, { waitUntil: 'networkidle', timeout: 60000 });
            // 固定700ms待機は、フルスイート実行時の負荷次第でページ読み込み後の初回自動計算が
            // 間に合わないことがあった（saveimage-old[5]のflake。残件台帳 B-13）。
            // generateImage() が読む g_extraInfoDataBridge.charaData が実際に埋まるまで待つ。
            await page.waitForFunction(async () => {
                const dynamicImport = new Function('specifier', 'return import(specifier);') as
                    (specifier: string) => Promise<Record<string, any>>;
                const mod = await dynamicImport('/engine/CExtraInfoDataBridge.js');
                return mod.g_extraInfoDataBridge?.charaData != null;
            });

            const result = await page.evaluate(async () => {
                const dynamicImport = new Function('specifier', 'return import(specifier);') as
                    (specifier: string) => Promise<Record<string, any>>;
                const hmjobBridge = await dynamicImport('/engine/hmjob.js');
                const itemDat = await dynamicImport('/engine/item.dat.js');
                const reg = (globalThis as any)._ratorioReg;

                const byId = (id: string) => document.getElementById(id);
                const val = (id: string) => (byId(id) as HTMLInputElement | null)?.value ?? '';
                const txt = (id: string) => byId(id)?.textContent ?? '';
                const bonusText = (n: number) => ((n >= 0) ? '+' : '') + n;

                const weaponEquipId = val('OBJID_ARMS_RIGHT');
                const weaponName: string | null = weaponEquipId && weaponEquipId !== '0'
                    ? ((itemDat.ItemObjNew as any)[weaponEquipId]?.[8] ?? null)
                    : null;

                // 画面（DOM/registry）から独立に読み取った期待値
                const expected = {
                    baseLv: val('OBJID_SELECT_BASE_LEVEL'),
                    jobLv: val('OBJID_SELECT_JOB_LEVEL'),
                    hp: txt('OBJID_SPAN_CHARA_MAXHP'),
                    sp: txt('OBJID_SPAN_CHARA_MAXSP'),
                    str: val('OBJID_SELECT_STATUS_STR') + txt('OBJID_SPAN_STATUS_BONUS_STR'),
                    agi: val('OBJID_SELECT_STATUS_AGI') + txt('OBJID_SPAN_STATUS_BONUS_AGI'),
                    atk: txt('OBJID_SPAN_CHARA_ATK'),
                    def: txt('OBJID_SPAN_CHARA_DEF'),
                    matk: txt('OBJID_SPAN_CHARA_MATK'),
                    mdef: txt('OBJID_SPAN_CHARA_MDEF'),
                    hit: txt('OBJID_SPAN_CHARA_HIT'),
                    flee: txt('OBJID_SPAN_CHARA_FLEE'),
                    cri: txt('OBJID_SPAN_CHARA_CRI'),
                    aspd: txt('OBJID_SPAN_CHARA_ASPD'),
                    statusPoint: txt('A_STPOINT'),
                    tStatusPoint: String(hmjobBridge.GetTStatusPointRemain()),
                    pow: val('OBJID_SELECT_STATUS_POW') + txt('OBJID_SPAN_STATUS_BONUS_POW'),
                    pAtk: String(hmjobBridge.GetDisplayedPAtk()),
                    sMatk: String(hmjobBridge.GetDisplayedSMatk()),
                    cRate: String(hmjobBridge.GetDisplayedCRate()),
                    res: String(hmjobBridge.GetDisplayedRes()),
                    mres: String(hmjobBridge.GetDisplayedMres()),
                    hPlus: String(hmjobBridge.GetDisplayedHPlus()),
                    weaponName,
                };

                // generateImage() を実行して #imgdiv を構築させる
                reg.generateImage();
                const imgdiv = document.getElementById('imgdiv');
                if (!imgdiv) throw new Error('#imgdiv が生成されませんでした');

                const getLabeledValue = (label: string): string | null => {
                    const th = Array.from(imgdiv.querySelectorAll('th'))
                        .find((el) => el.textContent?.trim() === label);
                    const td = th?.nextElementSibling;
                    return td ? (td.textContent ?? '') : null;
                };
                const nthSpanText = (containerId: string, n: number): string | null => {
                    const spans = imgdiv.querySelector(`#${containerId}`)?.querySelectorAll('span');
                    return spans && spans[n] ? (spans[n].textContent ?? '') : null;
                };
                const weaponDd = Array.from(imgdiv.querySelectorAll('dt'))
                    .find((el) => el.textContent?.trim() === '【右手】')?.nextElementSibling;

                const actual = {
                    baseLv: nthSpanText('base', 1),
                    jobLv: nthSpanText('base', 6),
                    hp: nthSpanText('hp', 1),
                    sp: nthSpanText('sp', 1),
                    str: getLabeledValue('Str'),
                    agi: getLabeledValue('Agi'),
                    atk: getLabeledValue('Atk'),
                    def: getLabeledValue('Def'),
                    matk: getLabeledValue('Matk'),
                    mdef: getLabeledValue('Mdef'),
                    hit: getLabeledValue('Hit'),
                    flee: getLabeledValue('Flee'),
                    cri: getLabeledValue('Cri'),
                    aspd: getLabeledValue('Aspd'),
                    statusPoint: getLabeledValue('Status Point'),
                    tStatusPoint: getLabeledValue('T.Status Point'),
                    pow: getLabeledValue('Pow'),
                    pAtk: getLabeledValue('P.Atk'),
                    sMatk: getLabeledValue('S.Matk'),
                    cRate: getLabeledValue('C.Rate'),
                    res: getLabeledValue('Res'),
                    mres: getLabeledValue('Mres'),
                    hPlus: getLabeledValue('H.Plus'),
                    weaponName: weaponName ? (weaponDd?.textContent ?? '') : null,
                };

                imgdiv.remove();

                // weaponName が null（未装備）の場合は「含まれる」判定のみ実施
                if (weaponName) {
                    (actual as any).weaponNameIncluded = (actual.weaponName ?? '').includes(weaponName);
                    (expected as any).weaponNameIncluded = true;
                    delete (actual as any).weaponName;
                    delete (expected as any).weaponName;
                }

                return { expected, actual };
            });

            expect(errors, `ページ内で未捕捉例外: ${errors.join('\n')}`).toEqual([]);
            expect(result.actual).toEqual(result.expected);

            await context.close();
        }, 60000);
    }
});
