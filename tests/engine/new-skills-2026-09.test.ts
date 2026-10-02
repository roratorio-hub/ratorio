import { describe, it, expect, beforeAll, beforeEach } from 'vitest';

// 2026-09 追加スキル（公式サイト rotool の数値）を固定する仕様テスト。
// 特性ステータス係数・「○○の習得Lv」係数は公式非公開のため 0 で仮置きしている。
// そのため、特性ステータス0・習得Lv0・BaseLv100 のときの Power が公式の「攻撃力」と一致することを検証する
// （係数を実測値で埋めたあとも、この条件では同じ値になる）。

let sm: any;
let CSkillData: any;
let S: any;
let K: any;
let E: any;
let Used: Record<number, number>;
let Learned: Record<number, number>;

const opt = (...v: number[]) => ({ GetOptionValue: (i: number) => v[i] ?? 0 });
const range = (n: number, f: (lv: number) => number) => Array.from({ length: n }, (_, i) => f(i + 1));
const same = (n: number, v: number) => range(n, () => v);

beforeAll(async () => {
    S = await import('@engine/skill/skill.dat.js');
    await import('@engine/runtime/global.js');
    K = await import('@engine/const/EnumItemKind.js');
    E = await import('@engine/const/EnumSereKind.js');
    const mod = await import('@engine/skill/CSkillManager.js');
    CSkillData = mod.CSkillData;
    sm = new mod.CSkillManager();
    const search = await import('@engine/bridge/skill-search-bridge.js');
    search.RegisterUsedSkillSearch((id: number) => Used[id] ?? 0);
    search.RegisterLearnedSkillSearch((id: number) => Learned[id] ?? 0);
    const hmjob = await import('@engine/bridge/hmjob-bridge.js');
    hmjob.__registerHmjobFunctions({ GetTotalSpecStatus: () => 0 });
    const state = await import('@engine/runtime/ro4-state.js');
    state.set_n_A_BaseLV(100);
});

beforeEach(() => {
    Used = {};
    Learned = {};
});

// [定数名, 名称, maxLv, SP, AP[], 固定詠唱[], 変動詠唱[], ディレイ[], クールタイム[], 持続時間ms]
type Row = [string, string, number, number, number[], number[], number[], number[], number[], number];
const lv5 = (f: (l: number) => number) => range(5, f);
const AP_BUFF = lv5((l) => 20 + 6 * l);
const TABLE: Row[] = [
    ['SERVANT_WEAPON_CLEAVE', '(×)サーヴァントウェポン：クリーブ', 5, 110, same(5, 0), same(5, 0), same(5, 0), lv5((l) => 500 * l), same(5, 500), 0],
    ['SHIELD_SLAM', '(×)シールドスラム', 5, 290, same(5, 0), same(5, 0), same(5, 0), lv5((l) => 1000 * l), same(5, 500), 0],
    ['WRAITH_DASH', '(×)レイスダッシュ', 3, 400, same(3, 0), same(3, 0), same(3, 2000), same(3, 1000), same(3, 500), 0],
    ['ELEMENTAL_INTEGRATION', 'エレメンタルインテグレーション', 5, 500, AP_BUFF, same(5, 1000), same(5, 0), same(5, 500), same(5, 500), 120000],
    ['PRIMED_SOLID_TRAP', '(×)プライムドソリッドトラップ', 5, 150, same(5, 0), same(5, 500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['PRIMED_DEEP_BLIND_TRAP', '(×)プライムドディープブラインドトラップ', 5, 210, same(5, 0), same(5, 500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['PRIMED_FLAME_TRAP', '(×)プライムドフレイムトラップ', 5, 170, same(5, 0), same(5, 500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['PRIMED_SWIFT_TRAP', '(×)プライムドスイフトトラップ', 5, 170, same(5, 0), same(5, 500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['PRIMED_TRAP', 'プライムドトラップ', 1, 350, [50], [1000], [0], [500], [500], 60000],
    ['FRAGMENT_BOLT', '(×)フラグメントボルト', 5, 210, same(5, 0), same(5, 1500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['FUGUE_DES_FLECHES', '(×)フーガデフレーシュ', 5, 230, same(5, 0), same(5, 1500), lv5((l) => 500 + 500 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['LEX_EXPIATRIX', '(×)レックスエクスピアトリクス', 5, 250, same(5, 0), same(5, 1500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['PUNITIO', '(×)プニティオ', 5, 210, same(5, 0), same(5, 0), same(5, 0), lv5((l) => 1000 * l), same(5, 500), 0],
    ['DAIZEROGEKI_HATENGEKI', '(×)第零撃：破天撃', 5, 300, same(5, 10), same(5, 0), same(5, 0), same(5, 3000), same(5, 500), 0],
    ['VENOM_IGNITION', 'ベナムイグニッション', 5, 290, AP_BUFF, same(5, 1000), same(5, 0), lv5((l) => 1000 * l), same(5, 500), 120000],
    ['PHANTOM_DAGGER', '(×)ファントムダガー', 5, 110, same(5, 0), same(5, 0), same(5, 0), lv5((l) => 1000 * l), same(5, 500), 0],
    ['OVERDRIVE_PROTOCOL', '(×)オーバードライブプロトコル', 4, 250, same(4, 0), same(4, 1500), range(4, (l) => 2000 + 500 * l), range(4, (l) => 1000 + 1000 * l), same(4, 500), 0],
    ['RAMPANT_VINE', '(×)ランパントヴァイン', 5, 170, same(5, 0), same(5, 1500), lv5((l) => 2000 + 400 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['SHICHISEI_TENKYAKU', '(×)七星天脚', 5, 230, same(5, 5), same(5, 0), same(5, 0), same(5, 3000), same(5, 500), 0],
    ['KORYU_ZIN', '(×)黄龍陣', 5, 300, same(5, 5), same(5, 500), same(5, 1000), same(5, 500), same(5, 500), 0],
    ['KAGE_GEKIRYU', '(×)影激流', 10, 190, same(10, 0), same(10, 0), same(10, 0), range(10, (l) => 500 * l), same(10, 500), 0],
    ['SHINKIRO_BUNSHIN_GUNSHU', '蜃気楼分身 -群集-', 1, 320, [25], [1000], [0], [0], [500], 60000],
    ['KAGE_MICHI', '影満ち', 5, 320, AP_BUFF, same(5, 1000), same(5, 0), same(5, 500), same(5, 500), 120000],
    ['TACTICAL_REPOSITIONING', 'タクティカルリポジショニング', 1, 10, [0], [0], [0], [0], [0], 0],
    ['PLUME_PIERCER', '(×)プルームピアサー', 5, 190, same(5, 0), same(5, 0), lv5((l) => 600 * l), lv5((l) => 1000 * l), same(5, 500), 0],
    ['NATURE_RAGE', '(×)ネイチャーレイジ', 5, 230, same(5, 0), same(5, 500), lv5((l) => -500 + 1400 * l), same(5, 4000), same(5, 500), 0],
    ['WIND_CUTTER_TURBO', '(×)ウィンドカッターターボ', 10, 80, same(10, 0), same(10, 0), range(10, (l) => 200 * l), range(10, (l) => 500 * l), same(10, 500), 0],
    ['HIGH_MAGNUM_BREAK', '(×)ハイマグナムブレイク', 10, 80, same(10, 0), same(10, 0), same(10, 0), range(10, (l) => 500 * l), same(10, 500), 0],
    ['BURNING_FLAME', 'バーニングフレイム', 5, 290, same(5, 0), same(5, 500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['FROZEN_HAIL', 'フローズンヘイル', 5, 260, same(5, 0), same(5, 500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['STORM_RISE', 'ストームライズ', 5, 290, same(5, 0), same(5, 500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['TERRA_BURST', 'テラバースト', 5, 260, same(5, 0), same(5, 500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['VENOM_BOMBARD', 'ベナムボンバード', 5, 230, same(5, 0), same(5, 500), lv5((l) => 5500 + 800 * l), same(5, 5000), same(5, 500), 0],
    ['DEER_HARMONY', 'ディアーハーモニー', 1, 290, [50], [1000], [0], [500], [500], 60000],
    ['TIGER_HARMONY', 'タイガーハーモニー', 1, 290, [50], [1000], [0], [500], [500], 60000],
];

describe('2026-09 追加スキルの基本データ（公式サイトの値）', () => {
    for (const [c, name, maxLv, sp, ap, fixed, vary, delay, ct, life] of TABLE) {
        it(`${name}: 名称・最大Lv・SP・AP・詠唱・ディレイ・クールタイム・持続時間`, () => {
            const id = S['SKILL_ID_' + c];
            expect(sm.GetSkillName(id)).toBe(name);
            expect(S.SkillObjNew[id][1]).toBe(maxLv);
            expect(S.SkillObjNew[id][2]).toBe(name);
            expect(sm.GetMaxLv(id)).toBe(maxLv);
            const at = (f: (l: number) => number) => range(maxLv, f);
            expect(at((l) => sm.GetCostFixed(id, l, null))).toEqual(same(maxLv, sp));
            expect(at((l) => sm.GetCostAP(id, l, null))).toEqual(ap);
            expect(at((l) => sm.GetCastTimeFixed(id, l, null))).toEqual(fixed);
            expect(at((l) => sm.GetCastTimeVary(id, l, null, opt()))).toEqual(vary);
            expect(at((l) => sm.GetDelayTimeCommon(id, l, null, opt()))).toEqual(delay);
            expect(at((l) => sm.GetCoolTime(id, l, null, opt()))).toEqual(ct);
            expect(at((l) => sm.GetLifeTime(id, l, null))).toEqual(same(maxLv, life));
        });
    }

    it('公式サイトのスキルコード（REFID）が登録されている', () => {
        const refs: Record<string, string> = {
            SERVANT_WEAPON_CLEAVE: 'DK_SERVANT_W_CLEAVE', SHIELD_SLAM: 'IG_SHIELD_SLAM', WRAITH_DASH: 'AG_WRAITH_DASH',
            ELEMENTAL_INTEGRATION: 'EM_ELEMENTAL_INTEGRATION', PRIMED_SOLID_TRAP: 'WH_SOLIDTRAP_ATK',
            PRIMED_DEEP_BLIND_TRAP: 'WH_DEEPBLINDTRAP_ATK', PRIMED_FLAME_TRAP: 'WH_FLAMETRAP_ATK',
            PRIMED_SWIFT_TRAP: 'WH_SWIFTTRAP_ATK', PRIMED_TRAP: 'WH_PRIMED_TRAP', FRAGMENT_BOLT: 'WH_FRAGMENT_BOLT',
            FUGUE_DES_FLECHES: 'TR_FUGUE_DES_FLECHES', LEX_EXPIATRIX: 'CD_LEX_EXPIATRIX', PUNITIO: 'CD_PUNITIO',
            DAIZEROGEKI_HATENGEKI: 'IQ_BROKENHEAVEN', VENOM_IGNITION: 'SHC_VENOMIGNITION', PHANTOM_DAGGER: 'ABC_PHANTOM_DAGGER',
            OVERDRIVE_PROTOCOL: 'MT_OVERDRIVE_PROTOCAL', RAMPANT_VINE: 'BO_RAMPANT_VINE', SHICHISEI_TENKYAKU: 'SKE_SEVENTH_KICK',
            KORYU_ZIN: 'SOA_FIELD_OF_KIRIN', KAGE_GEKIRYU: 'SS_KAGEGEKIRYU', SHINKIRO_BUNSHIN_GUNSHU: 'SS_SHINKIROU_GUNSHU',
            KAGE_MICHI: 'SS_NOBORU', TACTICAL_REPOSITIONING: 'NW_TACTICAL_REPOSITIONING', PLUME_PIERCER: 'AT_PLUME_PIERCER',
            NATURE_RAGE: 'AT_NATURE_RAGE', WIND_CUTTER_TURBO: 'HN_WIND_CUTTER_TURBO', HIGH_MAGNUM_BREAK: 'HN_HIGH_MAGNUM_BREAK',
            DEER_HARMONY: 'SH_KI_SUL_AND_HYUN_ROK', TIGER_HARMONY: 'SH_KI_SUL_AND_CHUL_HO',
            BURNING_FLAME: 'EM_BURNING_FLAME', FROZEN_HAIL: 'EM_FROZEN_HAIL', STORM_RISE: 'EM_STORM_RISE',
            TERRA_BURST: 'EM_TERRA_BURST', VENOM_BOMBARD: 'EM_VENOM_BOMBARD',
        };
        for (const [c, ref] of Object.entries(refs)) {
            expect(S.SkillObjNew[S['SKILL_ID_' + c]][3], c).toBe(ref);
        }
    });
});

// Power（特性ステータス0・習得Lv0・BaseLv100 での公式の「攻撃力」%）
describe('2026-09 追加スキルのスキル倍率（公式サイトの「攻撃力」）', () => {
    const power = (c: string, lv: number, o = opt()) => sm.GetPower(S['SKILL_ID_' + c], lv, null, o, [], 0);
    const powers = (c: string, n: number, o = opt()) => range(n, (l) => power(c, l, o));

    it('クリーブ: 通常 / ヴィゴール状態', () => {
        expect(powers('SERVANT_WEAPON_CLEAVE', 5)).toEqual([2400, 3600, 4800, 6000, 7200]);
        Used[S.SKILL_ID_VIGOR] = 1;
        expect(powers('SERVANT_WEAPON_CLEAVE', 5)).toEqual([3000, 4500, 6000, 7500, 9000]);
    });
    it('シールドスラム', () => expect(powers('SHIELD_SLAM', 5)).toEqual([1000, 2400, 3800, 5200, 6600]));
    it('レイスダッシュ', () => expect(powers('WRAITH_DASH', 3)).toEqual([1500, 2250, 3000]));
    it('プライムド4種は同じ倍率', () => {
        for (const c of ['PRIMED_SOLID_TRAP', 'PRIMED_DEEP_BLIND_TRAP', 'PRIMED_FLAME_TRAP', 'PRIMED_SWIFT_TRAP']) {
            expect(powers(c, 5), c).toEqual([4600, 8400, 12200, 16000, 19800]);
        }
    });
    it('フラグメントボルト: 通常 / カラミティゲイル状態', () => {
        expect(powers('FRAGMENT_BOLT', 5)).toEqual([1120, 1440, 1760, 2080, 2400]);
        Used[S.SKILL_ID_CALAMITY_GALE] = 1;
        expect(powers('FRAGMENT_BOLT', 5)).toEqual([1400, 1800, 2200, 2600, 3000]);
    });
    it('フーガデフレーシュ: 通常 / ミスティックシンフォニー状態（自己支援・攻撃オプションのどちらでも）', () => {
        expect(powers('FUGUE_DES_FLECHES', 5)).toEqual([2800, 3600, 4400, 5200, 6000]);
        expect(powers('FUGUE_DES_FLECHES', 5, opt(1))).toEqual([3500, 4500, 5500, 6500, 7500]);
        Used[S.SKILL_ID_MYSTIC_SYMPHONY] = 1;
        expect(powers('FUGUE_DES_FLECHES', 5)).toEqual([3500, 4500, 5500, 6500, 7500]);
    });
    it('レックスエクスピアトリクス: 通常 / コンペテンティア状態', () => {
        expect(powers('LEX_EXPIATRIX', 5)).toEqual([1500, 2812, 4125, 5437, 6750]);
        expect(powers('LEX_EXPIATRIX', 5, opt(0, 1))).toEqual([2000, 3750, 5500, 7250, 9000]);
    });
    it('プニティオ', () => expect(powers('PUNITIO', 5)).toEqual([1050, 2100, 3150, 4200, 5250]));
    it('第零撃：破天撃', () => expect(powers('DAIZEROGEKI_HATENGEKI', 5)).toEqual([7500, 9000, 10500, 12000, 13500]));
    it('ファントムダガー', () => expect(powers('PHANTOM_DAGGER', 5)).toEqual([4700, 6000, 7300, 8600, 9900]));
    it('オーバードライブプロトコル: 通常 / デュアルキャノン召喚中', () => {
        expect(powers('OVERDRIVE_PROTOCOL', 4)).toEqual([2700, 4200, 5700, 7200]);
        Used[S.SKILL_ID_ABR_DUAL_CANNON] = 1;
        expect(powers('OVERDRIVE_PROTOCOL', 4)).toEqual([3300, 5700, 8100, 10500]);
    });
    it('ランパントヴァイン: 通常 / クリーパー召喚中', () => {
        expect(powers('RAMPANT_VINE', 5)).toEqual([2300, 3450, 4600, 5750, 6900]);
        expect(powers('RAMPANT_VINE', 5, opt(1))).toEqual([3150, 4850, 6550, 8250, 9950]);
    });
    it('七星天脚: 通常 / 強化時', () => {
        expect(powers('SHICHISEI_TENKYAKU', 5)).toEqual([1500, 2250, 3000, 3750, 4500]);
        expect(powers('SHICHISEI_TENKYAKU', 5, opt(1))).toEqual([4500, 6750, 9000, 11250, 13500]);
    });
    it('黄龍陣: 通常 / 四方五行陣状態', () => {
        expect(powers('KORYU_ZIN', 5)).toEqual([1100, 2500, 3900, 5300, 6700]);
        Used[S.SKILL_ID_SHIHO_FU_ZYOTAI] = 5;
        expect(powers('KORYU_ZIN', 5)).toEqual([5200, 7300, 9400, 11500, 13600]);
    });
    it('影激流: 通常 / 影満ち状態', () => {
        expect(powers('KAGE_GEKIRYU', 10)).toEqual([1280, 1760, 2240, 2720, 3200, 3680, 4160, 4640, 5120, 5600]);
        Used[S.SKILL_ID_KAGE_MICHI] = 1;
        expect(powers('KAGE_GEKIRYU', 10)).toEqual([1600, 2200, 2800, 3400, 4000, 4600, 5200, 5800, 6400, 7000]);
    });
    it('プルームピアサー', () => expect(powers('PLUME_PIERCER', 5)).toEqual([5500, 6750, 8000, 9250, 10500]));
    it('ネイチャーレイジ', () => expect(powers('NATURE_RAGE', 5)).toEqual([6000, 7200, 8400, 9600, 10800]));
    it('ウィンドカッターターボ', () =>
        expect(powers('WIND_CUTTER_TURBO', 10)).toEqual([2250, 2800, 3350, 3900, 4450, 5000, 5550, 6100, 6650, 7200]));
    it('エレメンタルインテグレーションで発動する5種は同じ倍率（特性値・習得Lv0）', () => {
        for (const c of ['BURNING_FLAME', 'FROZEN_HAIL', 'STORM_RISE', 'TERRA_BURST', 'VENOM_BOMBARD']) {
            expect(powers(c, 5), c).toEqual([750, 2250, 3750, 5250, 6750]);
        }
    });
    it('ハイマグナムブレイク', () =>
        expect(powers('HIGH_MAGNUM_BREAK', 10)).toEqual([1725, 1950, 2175, 2400, 2625, 2850, 3075, 3300, 3525, 3750]));
});

describe('2026-09 追加スキルの距離・属性・使用条件・ヒット数', () => {
    const id = (c: string) => S['SKILL_ID_' + c];

    it('シールドスラム: ホーリーシールド状態のときだけ遠距離', () => {
        expect(sm.GetSkillRange(id('SHIELD_SLAM'), 0)).toBe(CSkillData.RANGE_SHORT);
        Used[S.SKILL_ID_HOLY_SHIELD] = 1;
        expect(sm.GetSkillRange(id('SHIELD_SLAM'), 0)).toBe(CSkillData.RANGE_LONG);
    });
    it('プニティオ: 鈍器のときだけ遠距離', () => {
        expect(sm.GetSkillRange(id('PUNITIO'), K.ITEM_KIND_SWORD)).toBe(CSkillData.RANGE_SHORT);
        expect(sm.GetSkillRange(id('PUNITIO'), K.ITEM_KIND_CLUB)).toBe(CSkillData.RANGE_LONG);
    });
    it('プライムド4種: 属性固定・プライムドトラップ状態が使用条件', () => {
        const elm = { SOLID: 'EARTH', DEEP_BLIND: 'DARK', FLAME: 'FIRE', SWIFT: 'WIND' } as Record<string, string>;
        for (const [k, e] of Object.entries(elm)) {
            const c = `PRIMED_${k}_TRAP`;
            expect(sm.GetElement(id(c), null, null, undefined), c).toBe(CSkillData['ELEMENT_FORCE_' + e]);
            expect(sm.dataArray[id(c)].WeaponCondition(0), c).toBe(false);
        }
        Used[S.SKILL_ID_PRIMED_TRAP] = 1;
        expect(sm.dataArray[id('PRIMED_SOLID_TRAP')].WeaponCondition(0)).toBe(true);
    });
    it('フラグメントボルト: 弓かつプライムドトラップ状態が使用条件・3分割', () => {
        const d = sm.dataArray[id('FRAGMENT_BOLT')];
        expect(d.WeaponCondition(K.ITEM_KIND_BOW)).toBe(false);
        Used[S.SKILL_ID_PRIMED_TRAP] = 1;
        expect(d.WeaponCondition(K.ITEM_KIND_BOW)).toBe(true);
        expect(d.WeaponCondition(K.ITEM_KIND_SWORD)).toBe(false);
        expect(sm.GetDividedHitCount(id('FRAGMENT_BOLT'), 1, null, opt())).toBe(3);
    });
    it('フーガデフレーシュ: 弓・楽器・鞭のみ', () => {
        const d = sm.dataArray[id('FUGUE_DES_FLECHES')];
        expect([K.ITEM_KIND_BOW, K.ITEM_KIND_MUSICAL, K.ITEM_KIND_WHIP].map((w) => d.WeaponCondition(w))).toEqual([true, true, true]);
        expect(d.WeaponCondition(K.ITEM_KIND_SWORD)).toBe(false);
    });
    it('レックスエクスピアトリクス: アンシラ状態で無属性、それ以外は聖属性', () => {
        expect(sm.GetElement(id('LEX_EXPIATRIX'), opt(0), null, undefined)).toBe(CSkillData.ELEMENT_FORCE_HOLY);
        expect(sm.GetElement(id('LEX_EXPIATRIX'), opt(1), null, undefined)).toBe(CSkillData.ELEMENT_FORCE_VANITY);
    });
    it('エレメンタルインテグレーションで発動する5種: 属性固定の魔法・上位精霊召喚中は3回連続攻撃', () => {
        // [スキル, 属性, 対応する上位精霊（SKILL_ID_SERE の値）]
        const cases: [string, string, number][] = [
            ['BURNING_FLAME', 'FIRE', E.SERE_KIND_ALDOR], ['FROZEN_HAIL', 'WATER', E.SERE_KIND_DILBIO],
            ['STORM_RISE', 'WIND', E.SERE_KIND_PROCERA], ['TERRA_BURST', 'EARTH', E.SERE_KIND_TELEMOTUS],
            ['VENOM_BOMBARD', 'POISON', E.SERE_KIND_SERPENSE],
        ];
        for (const [c, e, sere] of cases) {
            expect(sm.GetSkillType(id(c)) & CSkillData.TYPE_MAGICAL, c).toBeTruthy();
            expect(sm.GetElement(id(c), null, null, undefined), c).toBe(CSkillData['ELEMENT_FORCE_' + e]);
            Used = {};
            expect(sm.GetHitCount(id(c), 1, opt(), 0), c + ' 通常').toBe(2);
            Used[S.SKILL_ID_SERE] = sere;
            expect(sm.GetHitCount(id(c), 1, opt(), 0), c + ' 対応する精霊').toBe(3);
            // 別の属性の精霊では3回にならない
            Used[S.SKILL_ID_SERE] = sere === E.SERE_KIND_ALDOR ? E.SERE_KIND_DILBIO : E.SERE_KIND_ALDOR;
            expect(sm.GetHitCount(id(c), 1, opt(), 0), c + ' 別の精霊').toBe(2);
        }
    });
    it('レイスダッシュは念属性の魔法', () => {
        expect(sm.GetElement(id('WRAITH_DASH'), null, null, undefined)).toBe(CSkillData.ELEMENT_FORCE_PSYCO);
        expect(sm.GetSkillType(id('WRAITH_DASH')) & CSkillData.TYPE_MAGICAL).toBeTruthy();
    });
    it('第零撃：破天撃: 第二章：審判者状態は2ヒット、第一章：信念の力状態でクリティカル', () => {
        expect(sm.GetHitCount(id('DAIZEROGEKI_HATENGEKI'), 1, opt(0), 0)).toBe(1);
        expect(sm.GetHitCount(id('DAIZEROGEKI_HATENGEKI'), 1, opt(1), 0)).toBe(2);
        const d = sm.dataArray[id('DAIZEROGEKI_HATENGEKI')];
        d._CriActRate100 = () => 100;
        expect([0, 1, 2].map((v) => d.CriActRate(1, null, null, [], opt(v)))).toEqual([100, 0, 0]);
    });
    it('ファントムダガー: 短剣・片手剣のみ、通常2ヒット・3回連続で3ヒット', () => {
        const d = sm.dataArray[id('PHANTOM_DAGGER')];
        expect(d.WeaponCondition(K.ITEM_KIND_KNIFE)).toBe(true);
        expect(d.WeaponCondition(K.ITEM_KIND_SWORD)).toBe(true);
        expect(d.WeaponCondition(K.ITEM_KIND_BOW)).toBe(false);
        expect(sm.GetHitCount(id('PHANTOM_DAGGER'), 1, opt(0), K.ITEM_KIND_KNIFE)).toBe(2);
        expect(sm.GetHitCount(id('PHANTOM_DAGGER'), 1, opt(1), K.ITEM_KIND_KNIFE)).toBe(3);
    });
    it('オーバードライブプロトコル: インフィニティ召喚中のみクリティカル', () => {
        const d = sm.dataArray[id('OVERDRIVE_PROTOCOL')];
        d._CriActRate100 = () => 100;
        expect([0, 1].map((v) => d.CriActRate(1, null, null, [], opt(v)))).toEqual([0, 100]);
    });
    it('七星天脚: 天気の身が使用条件、強化時は7分割', () => {
        const d = sm.dataArray[id('SHICHISEI_TENKYAKU')];
        expect(d.WeaponCondition(0)).toBe(false);
        Used[S.SKILL_ID_TENKINO_MI] = 1;
        expect(d.WeaponCondition(0)).toBe(true);
        expect(sm.GetDividedHitCount(id('SHICHISEI_TENKYAKU'), 1, null, opt(0))).toBe(1);
        expect(sm.GetDividedHitCount(id('SHICHISEI_TENKYAKU'), 1, null, opt(1))).toBe(7);
    });
    it('黄龍陣: 玄武符・四方五行陣状態が使用条件、属性は暖かい風のオプション値', () => {
        const d = sm.dataArray[id('KORYU_ZIN')];
        Used[S.SKILL_ID_SHIHO_FU_ZYOTAI] = 3;
        expect(d.WeaponCondition(0)).toBe(false);
        Used[S.SKILL_ID_SHIHO_FU_ZYOTAI] = 4;
        expect(d.WeaponCondition(0)).toBe(true);
        expect(sm.GetElement(id('KORYU_ZIN'), opt(4), null, undefined)).toBe(CSkillData.ELEMENT_FORCE_WIND);
    });
    it('プルームピアサー: ウェアラプター状態が使用条件、エイペックスフェーズ状態でクリティカル', () => {
        const d = sm.dataArray[id('PLUME_PIERCER')];
        expect(d.WeaponCondition(0)).toBe(false);
        Used[S.SKILL_ID_WERERAPTOR] = 1;
        expect(d.WeaponCondition(0)).toBe(true);
        d._CriActRate100 = () => 100;
        expect([0, 1].map((v) => d.CriActRate(1, null, null, [], opt(v)))).toEqual([0, 100]);
    });
    it('ネイチャーレイジ: 通常は無属性、トゥルースオブ○○状態で水・風・地', () => {
        const el = () => sm.GetElement(id('NATURE_RAGE'), opt(), null, undefined);
        expect(el()).toBe(CSkillData.ELEMENT_FORCE_VANITY);
        Used[S.SKILL_ID_TRUTH_OF_ICE] = 1;
        expect(el()).toBe(CSkillData.ELEMENT_FORCE_WATER);
        Used = { [S.SKILL_ID_TRUTH_OF_WIND]: 1 };
        expect(el()).toBe(CSkillData.ELEMENT_FORCE_WIND);
        Used = { [S.SKILL_ID_TRUTH_OF_EARTH]: 1 };
        expect(el()).toBe(CSkillData.ELEMENT_FORCE_EARTH);
    });
    it('影激流・ハイマグナムブレイク・プニティオ・クリーブは自身のクリティカル率でクリティカル', () => {
        for (const c of ['KAGE_GEKIRYU', 'HIGH_MAGNUM_BREAK', 'PUNITIO', 'SERVANT_WEAPON_CLEAVE', 'RAMPANT_VINE', 'FRAGMENT_BOLT']) {
            const d = sm.dataArray[id(c)];
            d._CriActRate100 = () => 100;
            expect(d.CriActRate(1, null, null, [], opt()), c).toBe(100);
        }
    });
});
