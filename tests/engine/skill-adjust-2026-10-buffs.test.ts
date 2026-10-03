import { describe, it, expect, beforeAll } from 'vitest';
import { calcCoreFromModel } from '@engine/runtime/calc-headless.js';
import { createEmptyModel } from '@engine/runtime/calc-model.js';
import { g_constDataManager } from '@engine/runtime/global.js';
import { setN_Skill1SW } from '@engine/ui/BuffJobSpecificSelf.js';
import { CONST_DATA_KIND_JOB } from '@engine/const/EnumConstDataKind.js';
import { ApplySpecModify, GetHPlus, GetPAtk, GetSMatk } from '@engine/chara/hmjob.js';
import {
    GetBattlerAtkPercentUp, HEAL_TARGETTYPE_PLAYER, HEALTYPE_DILECTIO_HEAL, HEALTYPE_SHUGO_FU, HealCalc,
} from '@engine/battle/battlecalc.js';
import { n_tok } from '@engine/runtime/ro4-state.js';
import { ITEM_KIND_KATAR, ITEM_KIND_KNIFE, ITEM_KIND_STUFF } from '@engine/const/EnumItemKind.js';
import {
    ITEM_SP_CRI_PLUS, ITEM_SP_FLEE_PLUS, ITEM_SP_LONGRANGE_DAMAGE_UP, ITEM_SP_STUFF2HAND,
} from '@engine/const/EnumItemSpId.js';
import {
    MIG_JOB_ID_ARCH_MAGE, MIG_JOB_ID_DRAGON_KNIGHT, MIG_JOB_ID_NIGHT_WATCH, MIG_JOB_ID_SHADOW_CROSS,
} from '@engine/data/mig.job.dat.js';
import { CCharaConfIchizi } from '@engine/chara/CCharaConfIchizi.js';
import { CCharaConfNizi } from '@engine/chara/CCharaConfNizi.js';
import { CCharaConfSanzi } from '@engine/chara/CCharaConfSanzi.js';
import { CCharaConfYozi } from '@engine/chara/CCharaConfYozi.js';
import { CCharaConfDebuff } from '@engine/chara/CCharaConfDebuff.js';
import * as S from '@engine/skill/skill.dat.js';

// 2026-10 の公式スキル調整のうち、スキル定義の外（hmjob.js / battlecalc.js）にある効果量を固定する。
// 職固有自己支援欄の Lv は model.passiveSkill[配列上の位置]、習得スキル欄の Lv は model.learnedSkill[配列上の位置]、
// 四次職支援は model.confYozi[CCharaConfYozi.CONF_ID_*] で渡す。

type Opts = {
    passive?: [number, number]; learned?: [number, number]; yozi?: [number, number];
    weapon?: number; staff2hand?: boolean;
};

const job = (jobId: number) => (g_constDataManager as any).GetDataObject(CONST_DATA_KIND_JOB, jobId);

function buildModel(jobId: number, o: Opts): any {
    const model: any = createEmptyModel();
    model.status.jobId = jobId;
    model.status.baseLv = 250;
    model.status.jobLv = 50;
    for (const k of ['str', 'agi', 'vit', 'dex', 'int', 'luk']) model.status[k] = 50;
    model.status.speedPot = 0;
    for (const k of ['head', 'body', 'shield', 'shoulder', 'shoes']) {
        model.defPlus[k] = 0;
        model.defTranscendence[k] = 0;
    }
    model.weapon.type = o.weapon ?? 0;
    model.weapon.zokusei = 0;
    model.weapon.atkPlus = 0;
    model.weapon.transcendence = 0;
    model.weapon.weapon2Type = 0;
    model.weapon.weapon2AtkPlus = 0;
    model.weapon.weapon2Transcendence = 0;
    model.attackMethod.skillId = S.SKILL_ID_TUZYO_KOGEKI_CALC_RIGHT;
    model.attackMethod.sourceType = 0;
    model.attackMethod.skillLv = 1;
    model.attackMethod.optionValueArray = [];
    model.passiveSkill = new Array(job(jobId).GetPassiveSkillIdArray().length).fill(0);
    if (o.passive) {
        const idx = job(jobId).GetPassiveSkillIdArray().indexOf(o.passive[0]);
        expect(idx, '職固有自己支援の配列に含まれていること').toBeGreaterThanOrEqual(0);
        model.passiveSkill[idx] = o.passive[1];
    }
    if (o.learned) {
        const idx = job(jobId).GetLearnSkillIdArray().indexOf(o.learned[0]);
        expect(idx, '習得スキル欄の配列に含まれていること').toBeGreaterThanOrEqual(0);
        model.learnedSkill[idx] = o.learned[1];
    }
    if (o.yozi) model.confYozi[o.yozi[0]] = o.yozi[1];
    return model;
}

/** 計算を走らせ、その時点の補正値を複製して返す（specData などは次の計算で書き換わる共有配列のため） */
function run(jobId: number, o: Opts) {
    const model = buildModel(jobId, o);
    const { specData } = calcCoreFromModel(model);
    const snapshot = Array.from(specData as ArrayLike<number>);
    if (o.staff2hand) (n_tok as number[])[ITEM_SP_STUFF2HAND] = 1;
    return {
        pAtk: GetPAtk() as number,
        sMatk: GetSMatk() as number,
        plus: (spid: number) => ApplySpecModify(spid, 0) as number,
        sp: (i: number) => snapshot[i],
        atkPercentUp: () => GetBattlerAtkPercentUp(undefined as any, snapshot as any, [] as any, [{ GetOptionValue: () => 0 }] as any) as number,
    };
}

beforeAll(() => {
    setN_Skill1SW(true);
    // 支援設定・状態異常設定の設定IDはUI構築（stallcalc-shell.js の Init）で採番されるため、
    // ヘッドレス実行では未採番になり補正値が NaN になる。ここで採番だけ行う。
    for (const Conf of [CCharaConfIchizi, CCharaConfNizi, CCharaConfSanzi, CCharaConfYozi, CCharaConfDebuff]) {
        new (Conf as any)(Array(100).fill(0));
    }
});

const range = (n: number, f: (lv: number) => number) => Array.from({ length: n }, (_, i) => f(i + 1));

describe('2026-10 スキル調整: 四次職支援・自己支援・パッシブの効果量', () => {
    it('武士符（四次職支援）: P.Atk が +3×Lv', () => {
        const J = MIG_JOB_ID_DRAGON_KNIGHT;
        const base = run(J, {}).pAtk;
        expect(range(5, (lv) => run(J, { yozi: [CCharaConfYozi.CONF_ID_BUSHI_FU, lv] }).pAtk - base)).toEqual([3, 6, 9, 12, 15]);
    });
    it('法師符（四次職支援）: S.Matk が +3×Lv', () => {
        const J = MIG_JOB_ID_DRAGON_KNIGHT;
        const base = run(J, {}).sMatk;
        expect(range(5, (lv) => run(J, { yozi: [CCharaConfYozi.CONF_ID_HOSHI_FU, lv] }).sMatk - base)).toEqual([3, 6, 9, 12, 15]);
    });
    it('ヒドゥンカード: 遠距離物理攻撃で与えるダメージが +(100+15×Lv)%', () => {
        const J = MIG_JOB_ID_NIGHT_WATCH;
        const at = (lv: number) => run(J, { passive: [S.SKILL_ID_HIDDEN_CARD, lv] }).sp(ITEM_SP_LONGRANGE_DAMAGE_UP);
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual(range(10, (lv) => 100 + 15 * lv));
    });
    it('シャドウセンス: Flee が +10×Lv（Lv8以降は 85/100/150）', () => {
        const J = MIG_JOB_ID_SHADOW_CROSS;
        const at = (lv: number) => run(J, { learned: [S.SKILL_ID_SHADOW_SENSE, lv] }).plus(ITEM_SP_FLEE_PLUS);
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual([10, 20, 30, 40, 50, 60, 70, 85, 100, 150]);
    });
    it('シャドウセンス: 短剣装備時の Cri は 4×Lv（Lv8以降は 45/70/120）', () => {
        const J = MIG_JOB_ID_SHADOW_CROSS;
        const at = (lv: number) => run(J, { learned: [S.SKILL_ID_SHADOW_SENSE, lv], weapon: ITEM_KIND_KNIFE }).plus(ITEM_SP_CRI_PLUS);
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual([4, 8, 12, 16, 20, 24, 28, 45, 70, 120]);
    });
    it('シャドウセンス: カタール装備時の Cri は 1×Lv（Lv8以降は 10/15/25）', () => {
        const J = MIG_JOB_ID_SHADOW_CROSS;
        const at = (lv: number) => run(J, { learned: [S.SKILL_ID_SHADOW_SENSE, lv], weapon: ITEM_KIND_KATAR }).plus(ITEM_SP_CRI_PLUS);
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual([1, 2, 3, 4, 5, 6, 7, 10, 15, 25]);
    });
    it('両手杖修練: 両手杖装備時の S.Matk が +5/10/15/25/35/50/65/85/105/130', () => {
        const J = MIG_JOB_ID_ARCH_MAGE;
        const at = (lv: number) => run(J, { learned: [S.SKILL_ID_RYOTETUSE_SHUREN, lv], weapon: ITEM_KIND_STUFF, staff2hand: true }).sMatk;
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual([5, 10, 15, 25, 35, 50, 65, 85, 105, 130]);
    });
    it('ヴィゴール: 通常近接物理攻撃の追加物理攻撃力が +1000×Lv%', () => {
        const J = MIG_JOB_ID_DRAGON_KNIGHT;
        const at = (lv: number) => run(J, { passive: [S.SKILL_ID_VIGOR, lv] }).atkPercentUp();
        const base = at(0);
        expect(range(10, (lv) => at(lv) - base)).toEqual(range(10, (lv) => 1000 * lv));
    });
});

describe('2026-10 スキル調整: 回復スキルの回復量', () => {
    const heal = (type: number, lv: number) => {
        calcCoreFromModel(buildModel(MIG_JOB_ID_DRAGON_KNIGHT, {}));
        return HealCalc(lv, type, 1, HEAL_TARGETTYPE_PLAYER, 1) as number;
    };
    it('守護符: 基本回復量が Lv1 から 1500 / 3750 / 6000 / 8250 / 10500（BaseLv100換算で Lv ごとに +2250）', () => {
        // Lv に依存するのは「固定値に対するBaseLv補正」の項だけなので、Lv間の差から基本回復量の増分を取り出す（BaseLv250 で 2250×2.5）
        for (let lv = 1; lv < 5; lv++) {
            expect(heal(HEALTYPE_SHUGO_FU, lv + 1) - heal(HEALTYPE_SHUGO_FU, lv), `Lv${lv}→${lv + 1}`).toBe(2250 * 250 / 100);
        }
    });
    it('ディレクティオヒール: HP回復増加量が 1050% / 1100% / 1150% / 1200% / 1250%', () => {
        // 回復量は Lv の一次式 h(Lv) = W×(1000+50×Lv)/100 + H.Plus×Lv（W: Lvに依存しない基礎回復量）。
        // h(0) = 10W、傾き s = h(2)-h(1) = 0.5W + H.Plus から W を消すと h(0) = 20×(s - H.Plus) が成り立つ（旧: 倍率 625%〜では 24×(s - H.Plus)）。
        const h1 = heal(HEALTYPE_DILECTIO_HEAL, 1);
        const h2 = heal(HEALTYPE_DILECTIO_HEAL, 2);
        const hPlus = GetHPlus() as number;
        const h0 = 2 * h1 - h2;
        expect(h0).toBeGreaterThan(0);
        expect(Math.abs(h0 - 20 * ((h2 - h1) - hPlus))).toBeLessThanOrEqual(20);
    });
});
