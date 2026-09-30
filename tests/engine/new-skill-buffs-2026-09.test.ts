import { describe, it, expect, beforeAll } from 'vitest';
import { calcCoreFromModel, calcFromModel } from '@engine/runtime/calc-headless.js';
import { createEmptyModel } from '@engine/runtime/calc-model.js';
import { g_constDataManager } from '@engine/runtime/global.js';
import * as AS from '@engine/skill/calcautospell.js';
import { setN_Skill1SW } from '@engine/ui/BuffJobSpecificSelf.js';
import { CONST_DATA_KIND_JOB } from '@engine/const/EnumConstDataKind.js';
import { ApplySpecModify } from '@engine/chara/hmjob.js';
import {
    ITEM_SP_CRITICAL_DAMAGE_UP, ITEM_SP_HIT_PLUS, ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL,
    ITEM_SP_LONGRANGE_DAMAGE_UP, ITEM_SP_SHORTRANGE_DAMAGE_UP,
} from '@engine/const/EnumItemSpId.js';
import { MIG_JOB_ID_ELEMENTAL_MASTER, MIG_JOB_ID_SHADOW_CROSS, MIG_JOB_ID_SHINKIROU, MIG_JOB_ID_SHIRANUI } from '@engine/data/mig.job.dat.js';
import { CCharaConfIchizi } from '@engine/chara/CCharaConfIchizi.js';
import { CCharaConfNizi } from '@engine/chara/CCharaConfNizi.js';
import { CCharaConfSanzi } from '@engine/chara/CCharaConfSanzi.js';
import { CCharaConfYozi } from '@engine/chara/CCharaConfYozi.js';
import { CCharaConfDebuff } from '@engine/chara/CCharaConfDebuff.js';
import * as S from '@engine/skill/skill.dat.js';

// 自己支援スキル（ベナムイグニッション・影満ち）が計算の中間値（HIT・特性値）へ与える効果を固定する。
// 職固有自己支援欄の Lv は model.passiveSkill[配列上の位置] で渡す。

const passiveIdx = (jobId: number, skillId: number): number =>
    (g_constDataManager as any).GetDataObject(CONST_DATA_KIND_JOB, jobId).GetPassiveSkillIdArray().indexOf(skillId);

function buildModel(jobId: number, skillId: number, lv: number): any {
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
    model.weapon.type = 0;
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
    const len = (g_constDataManager as any).GetDataObject(CONST_DATA_KIND_JOB, jobId).GetPassiveSkillIdArray().length;
    model.passiveSkill = new Array(len).fill(0);
    const idx = passiveIdx(jobId, skillId);
    expect(idx, '職固有自己支援の配列に含まれていること').toBeGreaterThanOrEqual(0);
    model.passiveSkill[idx] = lv;
    return model;
}

function run(jobId: number, skillId: number, lv: number) {
    const model = buildModel(jobId, skillId, lv);
    const { specData } = calcCoreFromModel(model);
    // specData は次の計算で書き換わる共有配列のため、この時点の値を複製して返す
    const snapshot = Array.from(specData as ArrayLike<number>);
    // Hit は素ステータス等の未設定項目で NaN になりやすいため、補正値（＋○○）の加算部分だけを取り出す
    const hitPlus = ApplySpecModify(ITEM_SP_HIT_PLUS, 0) as number;
    return { hitPlus, sp: (i: number) => snapshot[i] };
}

beforeAll(() => {
    setN_Skill1SW(true);
    // 支援設定・状態異常設定の設定IDはUI構築（stallcalc-shell.js の Init）で採番されるため、
    // ヘッドレス実行では未採番（undefined）になり、補正値の計算が NaN になる。ここで採番だけ行う。
    for (const Conf of [CCharaConfIchizi, CCharaConfNizi, CCharaConfSanzi, CCharaConfYozi, CCharaConfDebuff]) {
        new (Conf as any)(Array(100).fill(0));
    }
});

describe('ベナムイグニッション（シャドウクロス）', () => {
    const J = MIG_JOB_ID_SHADOW_CROSS;
    const id = () => S.SKILL_ID_VENOM_IGNITION;

    it('Lv1〜5 で Hit が +50×Lv される', () => {
        const base = run(J, id(), 0).hitPlus;
        for (let lv = 1; lv <= 5; lv++) {
            expect(run(J, id(), lv).hitPlus - base, `Lv${lv}`).toBe(50 * lv);
        }
    });
    it('Lv1〜5 で命中物理攻撃で与えるダメージが +10×Lv% される', () => {
        const base = run(J, id(), 0).sp(ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL);
        for (let lv = 1; lv <= 5; lv++) {
            expect(run(J, id(), lv).sp(ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL) - base, `Lv${lv}`).toBe(10 * lv);
        }
    });
});

describe('ベナムイグニッションのクリティカル不発（通常攻撃）', () => {
    it('状態ではないとき通常攻撃はクリティカルが発生し、Lv1以上ではクリティカル率が 0 になる', () => {
        const criRate = (lv: number) =>
            calcFromModel(buildModel(MIG_JOB_ID_SHADOW_CROSS, S.SKILL_ID_VENOM_IGNITION, lv)).GetActiveResult(0).criRate as number;
        expect(criRate(0)).toBeGreaterThan(0);
        expect(criRate(1)).toBe(0);
        expect(criRate(5)).toBe(0);
    });
});

describe('エレメンタルインテグレーション（エレメンタルマスター）のオートスペル', () => {
    const J = MIG_JOB_ID_ELEMENTAL_MASTER;
    const ORDER = [
        S.SKILL_ID_BURNING_FLAME, S.SKILL_ID_FROZEN_HAIL, S.SKILL_ID_STORM_RISE, S.SKILL_ID_TERRA_BURST, S.SKILL_ID_VENOM_BOMBARD,
    ];
    // n_AS_SKILL は [スキルID, スキルLv, 発動率（千分率）] の配列。次の計算で作り直されるためコピーして返す
    const autoSpells = (lv: number) => {
        const model = buildModel(J, S.SKILL_ID_ELEMENTAL_INTEGRATION, lv);
        model.attackMethod.skillId = S.SKILL_ID_TUZYO_KOGEKI;	// 攻撃方法「通常攻撃」
        calcFromModel(model);
        return (AS.n_AS_SKILL as number[][]).map((a) => [...a]);
    };

    it('未使用のときは発動しない', () => {
        expect(autoSpells(0).filter((a) => ORDER.includes(a[0]))).toEqual([]);
    });
    for (let lv = 1; lv <= 5; lv++) {
        it(`Lv${lv}: ${lv}番目のスキルが Lv${lv}・発動率25% で発動する`, () => {
            expect(autoSpells(lv).filter((a) => ORDER.includes(a[0]))).toEqual([[ORDER[lv - 1], lv, 250]]);
        });
    }
});

describe('影満ち（蜃気楼・不知火）', () => {
    for (const J of [MIG_JOB_ID_SHINKIROU, MIG_JOB_ID_SHIRANUI]) {
        it(`職ID ${J}: 近接・遠距離物理攻撃ダメージが +20%、クリティカルダメージが +20×Lv%`, () => {
            const id = S.SKILL_ID_KAGE_MICHI;
            const base = run(J, id, 0);
            for (let lv = 1; lv <= 5; lv++) {
                const r = run(J, id, lv);
                expect(r.sp(ITEM_SP_SHORTRANGE_DAMAGE_UP) - base.sp(ITEM_SP_SHORTRANGE_DAMAGE_UP), `近接 Lv${lv}`).toBe(20);
                expect(r.sp(ITEM_SP_LONGRANGE_DAMAGE_UP) - base.sp(ITEM_SP_LONGRANGE_DAMAGE_UP), `遠距離 Lv${lv}`).toBe(20);
                expect(r.sp(ITEM_SP_CRITICAL_DAMAGE_UP) - base.sp(ITEM_SP_CRITICAL_DAMAGE_UP), `クリダメ Lv${lv}`).toBe(20 * lv);
            }
        });
    }
});

describe('ディアーハーモニー・タイガーハーモニー（スピリットハンドラー）', () => {
    let sm: any;
    let Used: Record<number, number>;
    beforeAll(async () => {
        const mod = await import('@engine/skill/CSkillManager.js');
        sm = new mod.CSkillManager();
        const search = await import('@engine/bridge/skill-search-bridge.js');
        Used = {};
        search.RegisterUsedSkillSearch((i: number) => Used[i] ?? 0);
        search.RegisterLearnedSkillSearch(() => 0);
        const hmjob = await import('@engine/bridge/hmjob-bridge.js');
        hmjob.__registerHmjobFunctions({ GetTotalSpecStatus: () => 0 });
        const state = await import('@engine/runtime/ro4-state.js');
        state.set_n_A_BaseLV(100);
    });
    const opt = { GetOptionValue: () => 0 };
    const power = (id: number, lv: number) => sm.GetPower(id, lv, null, opt, [], 0);

    const CASES: [string, number, number][] = [
        ['ディアーキャノン', S.SKILL_ID_DEER_CANON, S.SKILL_ID_DEER_HARMONY],
        ['ディアースピリットパワー', S.SKILL_ID_HYUN_ROK_SPIRIT_POWER, S.SKILL_ID_DEER_HARMONY],
        ['タイガースラッシュ', S.SKILL_ID_TIGER_SLASH, S.SKILL_ID_TIGER_HARMONY],
        ['タイガーバトリング', S.SKILL_ID_CHUL_HO_BATTERING, S.SKILL_ID_TIGER_HARMONY],
    ];
    for (const [name, skill, harmony] of CASES) {
        it(`${name}: 対応するハーモニー状態で倍率が 1.5倍（切り捨て）になる`, () => {
            Used = {};
            const base = power(skill, 7);
            Used[harmony] = 1;
            expect(power(skill, 7)).toBe(Math.floor(base * 1.5));
        });
    }
    it('ディアーハーモニーはタイガー系に、タイガーハーモニーはディアー系に影響しない', () => {
        Used = {};
        const deer = power(S.SKILL_ID_DEER_CANON, 7);
        const tiger = power(S.SKILL_ID_TIGER_SLASH, 7);
        Used = { [S.SKILL_ID_DEER_HARMONY]: 1 };
        expect(power(S.SKILL_ID_TIGER_SLASH, 7)).toBe(tiger);
        Used = { [S.SKILL_ID_TIGER_HARMONY]: 1 };
        expect(power(S.SKILL_ID_DEER_CANON, 7)).toBe(deer);
    });
});
