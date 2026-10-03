import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { MONSTER_DATA_INDEX_RACE } from '@engine/const/EnumMonsterDataIndex.js';
import { RACE_ID_DEMON, RACE_ID_HUMAN, RACE_ID_UNDEAD } from '@engine/const/EnumRaceId.js';

// 2026-10 の公式スキル調整（rotool の記載値）を固定する仕様テスト。
// 特性ステータス係数・「○○の習得Lv」係数は公式非公開のため従来値のまま TODO を付けてある。
// そのため Power は、特性ステータス0・習得Lv0・BaseLv100 のときに公式の「攻撃力」と一致することを検証する
// （係数を実測値で埋めたあとも、この条件では同じ値になる）。

let sm: any;
let S: any;
let Mob: any;
let Used: Record<number, number>;
let Learned: Record<number, number>;
const idByRef: Record<string, number> = {};

const opt = (...v: number[]) => ({ GetOptionValue: (i: number) => v[i] ?? 0 });
const range = (n: number, f: (lv: number) => number) => Array.from({ length: n }, (_, i) => f(i + 1));
const same = (n: number, v: number) => range(n, () => v);

beforeAll(async () => {
    S = await import('@engine/skill/skill.dat.js');
    await import('@engine/runtime/global.js');
    const mod = await import('@engine/skill/CSkillManager.js');
    sm = new mod.CSkillManager();
    const search = await import('@engine/bridge/skill-search-bridge.js');
    search.RegisterUsedSkillSearch((id: number) => Used[id] ?? 0);
    search.RegisterLearnedSkillSearch((id: number) => Learned[id] ?? 0);
    const hmjob = await import('@engine/bridge/hmjob-bridge.js');
    hmjob.__registerHmjobFunctions({ GetTotalSpecStatus: () => 0 });
    const state = await import('@engine/runtime/ro4-state.js');
    state.set_n_A_BaseLV(100);
    Mob = await import('@engine/monster/mobconfdebuf.js');
    for (const id of Object.keys(S.SkillObjNew)) {
        const ref = S.SkillObjNew[id][3];
        if (ref) idByRef[ref] = Number(id);
    }
});

beforeEach(() => {
    Used = {};
    Learned = {};
});
afterEach(() => {
    Mob.n_B_IJYOU.fill(0);
});

const id = (ref: string): number => {
    expect(idByRef[ref], `${ref} が skill.dat.js に登録されていること`).toBeDefined();
    return idByRef[ref];
};
const power = (ref: string, lv: number, o = opt(), mob: any = []) => sm.GetPower(id(ref), lv, null, o, mob, 0);

type Expect = {
    sp: number[]; ap: number[]; fixed: number[]; vary: number[]; delay: number[]; cool: number[];
    life?: number[]; power?: number[];
};
// [公式スキルコード, 最大Lv, 公式の値]
const TABLE: [string, number, Expect][] = [
    ['DK_SERVANT_W_SIGN', 5, { sp: same(5, 60), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 0), delay: range(5, (l) => 500 * l), cool: same(5, 500), life: range(5, (l) => 3500 + 500 * l), power: range(5, (l) => 1200 + 1200 * l) }],
    ['DK_SERVANT_W_PHANTOM', 5, { sp: same(5, 190), ap: same(5, 0), fixed: same(5, 0), vary: range(5, (l) => 1000 + 200 * l), delay: range(5, (l) => 1000 * l), cool: same(5, 2000), power: range(5, (l) => 800 + 800 * l) }],
    ['DK_VIGOR', 10, { sp: same(10, 320), ap: range(10, (l) => 20 + 3 * l), fixed: same(10, 0), vary: same(10, 0), delay: same(10, 3000), cool: same(10, 500), life: same(10, 120000) }],
    ['DK_SERVANT_W_DEMOL', 5, { sp: same(5, 190), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 0), delay: range(5, (l) => 1000 * l), cool: same(5, 500), power: range(5, (l) => 800 + 800 * l) }],
    ['IG_IMPERIAL_PRESSURE', 5, { sp: same(5, 350), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => 5500 + 800 * l), delay: same(5, 5000), cool: same(5, 500), power: range(5, (l) => 1100 * l) }],
    ['AG_DEADLY_PROJECTION', 5, { sp: same(5, 160), ap: same(5, 0), fixed: same(5, 500), vary: same(5, 2000), delay: same(5, 3000), cool: same(5, 3000), life: range(5, (l) => 5000 + 1000 * l), power: range(5, (l) => 2000 + 500 * l) }],
    ['AG_TWOHANDSTAFF', 10, { sp: same(10, 0), ap: same(10, 0), fixed: same(10, 0), vary: same(10, 0), delay: same(10, 0), cool: same(10, 0) }],
    ['EM_ACTIVITY_BURN', 5, { sp: same(5, 170), ap: same(5, 0), fixed: same(5, 500), vary: same(5, 2000), delay: same(5, 3000), cool: same(5, 3000) }],
    ['TR_RHYTHMICAL_WAVE', 5, { sp: same(5, 230), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => 500 + 500 * l), delay: range(5, (l) => 1000 * l), cool: same(5, 500), power: range(5, (l) => 4000 + 1000 * l) }],
    ['CD_DILECTIO_HEAL', 5, { sp: same(5, 380), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 3000), delay: same(5, 500), cool: range(5, (l) => 500 * l) }],
    ['CD_FRAMEN', 5, { sp: same(5, 440), ap: same(5, 0), fixed: same(5, 500), vary: same(5, 2500), delay: range(5, (l) => 1000 * l), cool: range(5, (l) => 500 * l), power: range(5, (l) => 1400 * l) }],
    ['CD_DIVINUS_FLOS', 5, { sp: same(5, 440), ap: same(5, 0), fixed: same(5, 1500), vary: range(5, (l) => 5500 + 800 * l), delay: same(5, 5000), cool: same(5, 500), power: range(5, (l) => 1500 + 1100 * l) }],
    ['SHC_SHADOW_SENSE', 10, { sp: same(10, 0), ap: same(10, 0), fixed: same(10, 0), vary: same(10, 0), delay: same(10, 0), cool: same(10, 0) }],
    ['SHC_FATAL_SHADOW_CROW', 10, { sp: same(10, 310), ap: range(10, (l) => 15 + 1 * l), fixed: same(10, 0), vary: same(10, 0), delay: same(10, 3000), cool: same(10, 3000), life: same(10, 10000), power: range(10, (l) => 1000 + 500 * l) }],
    ['SHC_CROSS_SLASH', 5, { sp: same(5, 210), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 0), delay: range(5, (l) => 1000 * l), cool: same(5, 500), life: same(5, 10000), power: range(5, (l) => 50 + 50 * l) }],
    ['ABC_ABYSS_SLAYER', 10, { sp: same(10, 340), ap: range(10, (l) => 20 + 3 * l), fixed: same(10, 1000), vary: same(10, 0), delay: same(10, 500), cool: same(10, 5000), life: same(10, 120000) }],
    ['SKE_ENCHANTING_SKY', 10, { sp: same(10, 380), ap: range(10, (l) => 53 + -3 * l), fixed: same(10, 1000), vary: same(10, 0), delay: same(10, 0), cool: same(10, 500), life: range(10, (l) => 50000 + 10000 * l) }],
    ['SOA_TALISMAN_OF_PROTECTION', 5, { sp: same(5, 170), ap: same(5, 0), fixed: same(5, 1000), vary: same(5, 1000), delay: same(5, 1000), cool: same(5, 1000), life: same(5, 120000) }],
    ['SOA_TALISMAN_OF_WARRIOR', 5, { sp: same(5, 170), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 1000), delay: same(5, 800), cool: same(5, 0), life: same(5, 120000) }],
    ['SOA_TALISMAN_OF_MAGICIAN', 5, { sp: same(5, 170), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 1000), delay: same(5, 800), cool: same(5, 0), life: same(5, 120000) }],
    ['SOA_TALISMAN_OF_SOUL_STEALING', 5, { sp: same(5, 200), ap: same(5, 0), fixed: same(5, 0), vary: same(5, 2000), delay: range(5, (l) => 1000 * l), cool: same(5, 500), power: range(5, (l) => 11800 + 1300 * l) }],
    ['SOA_EXORCISM_OF_MALICIOUS_SOUL', 5, { sp: same(5, 300), ap: same(5, 0), fixed: same(5, 0), vary: range(5, (l) => 2500 + 1400 * l), delay: same(5, 5000), cool: same(5, 500) }],
    ['SOA_TALISMAN_OF_BLUE_DRAGON', 5, { sp: same(5, 200), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => -500 + 1400 * l), delay: same(5, 4000), cool: same(5, 500), life: same(5, 10000), power: range(5, (l) => 12000 + 1320 * l) }],
    ['SOA_TALISMAN_OF_WHITE_TIGER', 5, { sp: same(5, 360), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => -500 + 1400 * l), delay: same(5, 4000), cool: same(5, 500), life: same(5, 10000), power: range(5, (l) => 9400 + 1000 * l) }],
    ['SOA_TALISMAN_OF_RED_PHOENIX', 5, { sp: same(5, 360), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => -500 + 1400 * l), delay: same(5, 4000), cool: same(5, 500), life: same(5, 10000), power: range(5, (l) => 10600 + 1200 * l) }],
    ['SOA_TALISMAN_OF_FOUR_BEARING_GOD', 5, { sp: same(5, 300), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => -500 + 1400 * l), delay: same(5, 4000), cool: same(5, 500), power: range(5, (l) => 1400 + 150 * l) }],
    ['SOA_SOUL_OF_HEAVEN_AND_EARTH', 10, { sp: same(10, 680), ap: range(10, (l) => 20 + 3 * l), fixed: range(10, (l) => 500 + 100 * l), vary: same(10, 0), delay: same(10, 3000), cool: same(10, 10000), life: same(10, 60000) }],
    ['SS_KAGEGISSEN', 10, { sp: same(10, 190), ap: same(10, 0), fixed: same(10, 0), vary: same(10, 0), delay: range(10, (l) => 500 * l), cool: same(10, 500), power: range(10, (l) => 2500 + 100 * l) }],
    ['NW_HIDDEN_CARD', 10, { sp: same(10, 360), ap: range(10, (l) => 20 + 3 * l), fixed: same(10, 1000), vary: same(10, 0), delay: same(10, 500), cool: same(10, 500), life: same(10, 120000) }],
    ['AT_NATURE_HARMONY', 5, { sp: same(5, 320), ap: range(5, (l) => 20 + 6 * l), fixed: same(5, 1000), vary: same(5, 0), delay: same(5, 500), cool: same(5, 500), life: same(5, 120000) }],
    ['HN_JUPITEL_THUNDER_STORM', 10, { sp: same(10, 80), ap: same(10, 0), fixed: same(10, 500), vary: range(10, (l) => -500 + 700 * l), delay: range(10, (l) => 400 * l), cool: same(10, 500), power: range(10, (l) => 3650 + 200 * l) }],
    ['HN_HELLS_DRIVE', 10, { sp: same(10, 70), ap: same(10, 0), fixed: same(10, 500), vary: range(10, (l) => -500 + 700 * l), delay: range(10, (l) => 400 * l), cool: same(10, 500), power: range(10, (l) => 3800 + 175 * l) }],
    ['HN_NAPALM_VULCAN_STRIKE', 10, { sp: same(10, 110), ap: same(10, 0), fixed: same(10, 500), vary: range(10, (l) => -500 + 700 * l), delay: range(10, (l) => 400 * l), cool: same(10, 500), power: range(10, (l) => 3800 + 175 * l) }],
    ['HN_OVERCOMING_CRISIS', 5, { sp: same(5, 110), ap: range(5, (l) => 10 + 20 * l), fixed: same(5, 1000), vary: same(5, 0), delay: same(5, 500), cool: same(5, 500), life: same(5, 120000) }],
    ['SH_TEMPORARY_COMMUNION', 5, { sp: same(5, 230), ap: range(5, (l) => 10 + 20 * l), fixed: same(5, 1000), vary: same(5, 0), delay: same(5, 500), cool: same(5, 500), life: same(5, 120000) }],
    ['AG_CLIMAX', 5, { sp: same(5, 610), ap: range(5, (l) => 20 + 6 * l), fixed: same(5, 1000), vary: same(5, 0), delay: same(5, 0), cool: same(5, 500), life: same(5, 120000) }],
    ['AG_SOUL_VC_STRIKE', 5, { sp: same(5, 330), ap: same(5, 0), fixed: range(5, (l) => 500 + 200 * l), vary: same(5, 2000), delay: same(5, 1000), cool: same(5, 500), power: range(5, (l) => 500 + 200 * l) }],
    ['WH_WILD_WALK', 5, { sp: same(5, 170), ap: same(5, 5), fixed: same(5, 0), vary: same(5, 0), delay: range(5, (l) => 1000 * l), cool: same(5, 500), life: range(5, (l) => 4000 * l), power: range(5, (l) => -500 + 1000 * l) }],
    ['TR_METALIC_FURY', 5, { sp: same(5, 130), ap: same(5, 0), fixed: same(5, 0), vary: range(5, (l) => 500 + 500 * l), delay: range(5, (l) => 1000 * l), cool: same(5, 500), power: range(5, (l) => 3000 + 1500 * l) }],
    ['CD_PNEUMATICUS_PROCELLA', 10, { sp: same(10, 660), ap: same(10, 15), fixed: same(10, 1000), vary: same(10, 19000), delay: same(10, 5000), cool: same(10, 12000), life: same(10, 12000), power: range(10, (l) => 7000 + 2000 * l) }],
    ['SOA_TALISMAN_OF_BLACK_TORTOISE', 5, { sp: same(5, 360), ap: same(5, 0), fixed: same(5, 500), vary: range(5, (l) => -500 + 1400 * l), delay: same(5, 4000), cool: same(5, 500), life: same(5, 10000), power: range(5, (l) => 9400 + 1000 * l) }],
];

describe('2026-10 スキル調整: 消費SP/AP・詠唱・ディレイ・再使用待機・持続時間・攻撃力（公式サイトの値）', () => {
    for (const [ref, maxLv, e] of TABLE) {
        it(`${ref}`, () => {
            const sid = id(ref);
            expect(sm.GetMaxLv(sid)).toBe(maxLv);
            const at = (f: (l: number) => number) => range(maxLv, f);
            expect(at((l) => sm.GetCostFixed(sid, l, null)), '消費SP').toEqual(e.sp);
            expect(at((l) => sm.GetCostAP(sid, l, null)), '消費AP').toEqual(e.ap);
            expect(at((l) => sm.GetCastTimeFixed(sid, l, null)), '固定詠唱').toEqual(e.fixed);
            expect(at((l) => sm.GetCastTimeVary(sid, l, null, opt())), '変動詠唱').toEqual(e.vary);
            expect(at((l) => sm.GetDelayTimeCommon(sid, l, null, opt())), 'ディレイ').toEqual(e.delay);
            expect(at((l) => sm.GetCoolTime(sid, l, null, opt())), '再使用待機').toEqual(e.cool);
            if (e.life) expect(at((l) => sm.GetLifeTime(sid, l, null)), '持続時間').toEqual(e.life);
            if (e.power) expect(at((l) => power(ref, l)), '攻撃力').toEqual(e.power);
        });
    }
});

describe('2026-10 スキル調整: 状態によって変わる攻撃力', () => {
    it('メタリックフューリー: サウンドブレンド状態の敵には 4750+1750×Lv%', () => {
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SOUND_BLEND] = 1;
        expect(range(5, (l) => power('TR_METALIC_FURY', l))).toEqual([6500, 8250, 10000, 11750, 13500]);
    });
    it('リズミカルウェーブ: ミスティックシンフォニー状態（攻撃オプション）では 4750+1750×Lv%', () => {
        expect(range(5, (l) => power('TR_RHYTHMICAL_WAVE', l, opt(1)))).toEqual([6500, 8250, 10000, 11750, 13500]);
        expect(range(5, (l) => power('TR_RHYTHMICAL_WAVE', l, opt(0)))).toEqual([5000, 6000, 7000, 8000, 9000]);
    });
    it('クロススラッシュ: シャドウエクシード状態では 2倍', () => {
        Used[S.SKILL_ID_SHADOW_EXCEED] = 1;
        expect(range(5, (l) => power('SHC_CROSS_SLASH', l))).toEqual([200, 300, 400, 500, 600]);
    });
    it('死霊浄化: 攻撃力はソウルエナジー消費数に比例し、死霊憑依状態の敵には 975+125×Lv%', () => {
        Used[S.SKILL_ID_COUNT_OF_SOUL_ENERGY] = 1;
        expect(range(5, (l) => power('SOA_EXORCISM_OF_MALICIOUS_SOUL', l))).toEqual([775, 825, 875, 925, 975]);
        Used[S.SKILL_ID_COUNT_OF_SOUL_ENERGY] = 3;
        expect(power('SOA_EXORCISM_OF_MALICIOUS_SOUL', 1)).toBe(775 * 3);
        Used[S.SKILL_ID_COUNT_OF_SOUL_ENERGY] = 1;
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SHIRYO_HYOI] = 1;
        expect(range(5, (l) => power('SOA_EXORCISM_OF_MALICIOUS_SOUL', l))).toEqual([1100, 1225, 1350, 1475, 1600]);
    });
    // 四方五行陣状態 = 四方符状態が5
    const GOGYO: [string, number[]][] = [
        ['SOA_TALISMAN_OF_BLUE_DRAGON', [16650, 18300, 19950, 21600, 23250]],
        ['SOA_TALISMAN_OF_WHITE_TIGER', [13000, 14250, 15500, 16750, 18000]],
        ['SOA_TALISMAN_OF_RED_PHOENIX', [14750, 16250, 17750, 19250, 20750]],
        ['SOA_TALISMAN_OF_BLACK_TORTOISE', [13000, 14250, 15500, 16750, 18000]],
    ];
    for (const [ref, expected] of GOGYO) {
        it(`${ref}: 四方五行陣状態の攻撃力`, () => {
            Used[S.SKILL_ID_SHIHO_FU_ZYOTAI] = 5;
            expect(range(5, (l) => power(ref, l))).toEqual(expected);
        });
    }
});

describe('2026-10 スキル調整: ヒット数', () => {
    const hits = (ref: string, lv: number, o = opt()) => sm.GetHitCount(id(ref), lv, o, 0);
    it('ソウルバルカンストライクは全Lvで3回連続', () => {
        expect(range(5, (l) => hits('AG_SOUL_VC_STRIKE', l))).toEqual([3, 3, 3, 3, 3]);
    });
    it('影一閃は全Lvで2回連続', () => {
        expect(range(10, (l) => hits('SS_KAGEGISSEN', l))).toEqual(same(10, 2));
    });
    it('クロススラッシュは全Lvで2回連続', () => {
        expect(range(5, (l) => hits('SHC_CROSS_SLASH', l))).toEqual(same(5, 2));
    });
    it('四方神符は 青龍符/白虎符/朱雀符/玄武符/四方五行陣 状態で 2/3/4/5/6回連続', () => {
        const byState = [0, 1, 2, 3, 4, 5].map((st) => {
            Used[S.SKILL_ID_SHIHO_FU_ZYOTAI] = st;
            return hits('SOA_TALISMAN_OF_FOUR_BEARING_GOD', 1);
        });
        expect(byState).toEqual([1, 2, 3, 4, 5, 6]);
    });
});

describe('サーヴァントサイン状態（敵の状態）', () => {
    const SW = 'DK_SERVANTWEAPON';
    const CLEAVE = 'DK_SERVANT_W_CLEAVE';
    it('サーヴァントウェポン: サーヴァントサイン状態の敵には攻撃力が 1.5倍', () => {
        const base = range(5, (l) => power(SW, l));
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SERVANT_SIGN] = 1;
        expect(range(5, (l) => power(SW, l))).toEqual(base.map((p) => Math.floor(p * 1.5)));
    });
    it('サーヴァントウェポン: ヴィゴール状態でもサーヴァントサイン状態の敵には 1.5倍', () => {
        Used[S.SKILL_ID_VIGOR] = 1;
        const base = range(5, (l) => power(SW, l));
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SERVANT_SIGN] = 1;
        expect(range(5, (l) => power(SW, l))).toEqual(base.map((p) => Math.floor(p * 1.5)));
    });
    it('クリーブ: サーヴァントサイン状態の敵には攻撃力が 1.5倍', () => {
        const base = range(5, (l) => power(CLEAVE, l));
        expect(base.every((p) => p > 0)).toBe(true);
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SERVANT_SIGN] = 1;
        expect(range(5, (l) => power(CLEAVE, l))).toEqual(base.map((p) => Math.floor(p * 1.5)));
    });
    it('他のスキル（ファントム・サイン自身）は倍率が変わらない', () => {
        const before = ['DK_SERVANT_W_PHANTOM', 'DK_SERVANT_W_DEMOL', 'DK_SERVANT_W_SIGN'].map((r) => range(5, (l) => power(r, l)));
        Mob.n_B_IJYOU[Mob.MOB_CONF_DEBUF_ID_SERVANT_SIGN] = 1;
        const after = ['DK_SERVANT_W_PHANTOM', 'DK_SERVANT_W_DEMOL', 'DK_SERVANT_W_SIGN'].map((r) => range(5, (l) => power(r, l)));
        expect(after).toEqual(before);
    });
    it('敵の状態異常設定にチェックボックスとして登録されている', () => {
        const row = Mob.MobConfDebufOBJ?.find?.((d: any) => d[0] === Mob.MOB_CONF_DEBUF_ID_SERVANT_SIGN);
        expect(row?.[1]).toBe('サーヴァントサイン状態');
    });
});

describe('クロススラッシュのクリティカル率', () => {
    it('自身のクリティカル率の1/2でクリティカルが発生する', () => {
        const d = sm.dataArray[id('SHC_CROSS_SLASH')];
        d._CriActRate100 = () => 100;
        expect(d.CriActRate(1, null, null, [], opt())).toBe(50);
    });
});

describe('ニューマティックプロセラ・フレーメン: 敵の種族による倍率の違いは無い', () => {
    const mobOf = (race: number) => {
        const mob: any[] = [];
        mob[MONSTER_DATA_INDEX_RACE] = race;
        return mob;
    };
    for (const ref of ['CD_PNEUMATICUS_PROCELLA', 'CD_FRAMEN']) {
        it(`${ref}: 不死・悪魔でもそれ以外でも攻撃力が同じ`, () => {
            const human = range(5, (l) => power(ref, l, opt(), mobOf(RACE_ID_HUMAN)));
            expect(range(5, (l) => power(ref, l, opt(), mobOf(RACE_ID_UNDEAD)))).toEqual(human);
            expect(range(5, (l) => power(ref, l, opt(), mobOf(RACE_ID_DEMON)))).toEqual(human);
            expect(human.every((p) => p > 0)).toBe(true);
        });
    }
});

describe('2026-10 スキル調整: サウンドオブディストラクション', () => {
    it('消費SPは Lv1〜5 で 80 / 90 / 100 / 110 / 120、再使用待機は 15秒', () => {
        const sid = id('WM_SOUND_OF_DESTRUCTION');
        expect(range(5, (l) => sm.GetCostFixed(sid, l, null))).toEqual([80, 90, 100, 110, 120]);
        expect(range(5, (l) => sm.GetCoolTime(sid, l, null, opt()))).toEqual(same(5, 15000));
    });
});
