import { describe, it, expect, beforeEach } from 'vitest';
import {
    CalcHealing,
    CalcRecovery,
    CalcCapacity,
    CalcResistElement,
    CalcResistState,
    CalcResistStateR,
    CalcExp,
} from '@roro/CExtraInfoAreaComponentManagerCalc.js';
import {
    n_tok, n_tok_no_limit, set_n_tok, set_n_tok_no_limit, set_n_A_BaseLV,
} from '@ro4/ro4-state.js';
import {
    set_n_A_AGI, set_n_A_VIT, set_n_A_INT, set_n_A_LUK, set_n_A_BodyZokusei, set_n_A_JOB, set_n_A_JobLV, set_SU_STR, set_n_A_Equip,
} from '@roro/roro-state.js';
import { ELM_ID_UNDEAD } from '@roro/const/EnumElmId.js';
import { EQUIP_REGION_ID_COUNT } from '@roro/const/EnumMigItemParamId.js';
import { STATE_ID_STONE, STATE_ID_FROZEN, STATE_ID_CURSED, STATE_R_ID_CHILLED } from '@roro/const/EnumStateId.js';
import { ITEM_SP_HEAL_UP_USING, ITEM_SP_HEAL_UP_USED, ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_STATE_R_CHILLED } from '@roro/const/EnumItemSpId.js';
import { HEALTYPE_SANCTUARY } from '@ro4/head.js';
import { CHARA_DATA_INDEX_MAXHP, CHARA_DATA_INDEX_MAXSP, CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF } from '@roro/const/EnumCharaDataIndex.js';
import { MONSTER_DATA_INDEX_BASE_EXP, MONSTER_DATA_INDEX_JOB_EXP } from '@roro/const/EnumMonsterDataIndex.js';

// リファクタリング計画 Phase 12: CExtraInfoAreaComponentManager.js から抽出した
// DOM非依存の純粋な計算部分。抽出前は DOM 経由でしか検証できなかったため、
// 抽出後にテストを新規追加する（testing.md の「実装と同時にテストを書く」原則）。

function resetTok() {
    set_n_tok(Array(451).fill(0));
    set_n_tok_no_limit(Array(451).fill(0));
}

describe('CExtraInfoAreaComponentManagerCalc.js', () => {
    beforeEach(() => {
        resetTok();
        set_n_A_AGI(1);
        set_n_A_VIT(1);
        set_n_A_INT(1);
        set_n_A_LUK(1);
        set_n_A_BodyZokusei(0);
        set_n_A_BaseLV(1);
        set_SU_STR(1);
        set_n_A_Equip(Array(EQUIP_REGION_ID_COUNT).fill(0)); // 素手・無装備（アイテムID 0 = 未装備）
    });

    describe('CalcResistElement', () => {
        it('属性耐性・属性倍率・最終倍率を n_tok / zokusei から計算する', () => {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] = 10; // 水属性への耐性+10%
            const result = CalcResistElement();
            expect(result.resistValueArray[0]).toBe(10);
            // ボディ属性0（無属性）での属性倍率は基準100%
            expect(result.bodyElmRatioArray[0]).toBe(100);
            // 最終倍率 = 倍率 - floor(耐性*倍率)/100 = 100 - floor(1000)/100 = 100-10 = 90
            expect(result.finalRatioArray[0]).toBe(90);
        });

        it('耐性が上限を超えた分は resistValueArrayOver に計上される', () => {
            n_tok[ITEM_SP_RESIST_ELM_VANITY] = 30;
            n_tok_no_limit[ITEM_SP_RESIST_ELM_VANITY] = 50;
            const result = CalcResistElement();
            expect(result.resistValueArrayOver[0]).toBe(20);
        });
    });

    describe('CalcResistState', () => {
        const charaData: number[] = [];
        charaData[CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF] = 77;

        it('凍結・石化耐性は charaData の MDEF_DIV_IGNORE_BUFF を使う', () => {
            const result = CalcResistState(charaData);
            expect(result.paramValueArray[STATE_ID_FROZEN]).toBe(77);
            expect(result.paramValueArray[STATE_ID_STONE]).toBe(77);
        });

        it('不死属性のとき凍結・石化の装備耐性が100%になる', () => {
            set_n_A_BodyZokusei(ELM_ID_UNDEAD);
            const result = CalcResistState(charaData);
            expect(result.equipValueArray[STATE_ID_FROZEN]).toBe(100);
            expect(result.equipValueArray[STATE_ID_STONE]).toBe(100);
        });

        it('LUKが0のとき呪い完全耐性になる', () => {
            set_n_A_LUK(0);
            const result = CalcResistState(charaData);
            expect(result.paramValueArray[STATE_ID_CURSED]).toBe(100);
        });
    });

    describe('CalcResistStateR', () => {
        it('装備耐性が100%以上のとき持続時間が0秒になる', () => {
            n_tok[ITEM_SP_RESIST_STATE_R_CHILLED] = 100;
            const result = CalcResistStateR();
            expect(result.paramTimeArray[STATE_R_ID_CHILLED]).toBe(0);
        });

        it('冷凍の持続時間はVITが高いほど短くなる（20 - VIT/10）', () => {
            set_n_A_VIT(50);
            const result = CalcResistStateR();
            expect(result.paramTimeArray[STATE_R_ID_CHILLED]).toBe(15); // 20 - 50/10
        });
    });

    describe('CalcRecovery', () => {
        const charaData: number[] = [];
        charaData[CHARA_DATA_INDEX_MAXHP] = 5000;
        charaData[CHARA_DATA_INDEX_MAXSP] = 1000;

        it('HP回復力向上Lvが0なら該当行を追加しない', () => {
            const result = CalcRecovery(0, 0, 0, charaData);
            expect(result.valueTextArrayHP).toEqual([]);
            expect(result.valueTextArraySP).toEqual([]);
        });

        it('HP回復力向上Lv1で floor((5 + MaxHP/500) * 1) を計算する', () => {
            const result = CalcRecovery(1, 0, 0, charaData);
            expect(result.valueTextArrayHP).toEqual([["HP回復力向上", "15/10秒"]]); // floor(5+5000/500)=15
        });

        it('息吹LvはHP欄・SP欄の両方に反映される', () => {
            const result = CalcRecovery(0, 1, 0, charaData);
            expect(result.valueTextArrayHP.length).toBe(1);
            expect(result.valueTextArraySP.length).toBe(1);
        });
    });

    describe('CalcCapacity', () => {
        it('所持限界量増加Lvが1につき+200される', () => {
            const base = CalcCapacity(0, 0);
            const withLv1 = CalcCapacity(1, 0);
            expect(withLv1.value - base.value).toBe(200);
        });

        it('所持限界量増加RLvも1につき+200される', () => {
            const base = CalcCapacity(0, 0);
            const withRLv1 = CalcCapacity(0, 1);
            expect(withRLv1.value - base.value).toBe(200);
        });

        it('装備品重量合計は素手・無装備なら0', () => {
            const result = CalcCapacity(0, 0);
            expect(result.weightEquiped).toBe(0);
        });
    });

    describe('CalcHealing', () => {
        it('サンクチュアリは装備補正なしで基準テーブル通りの回復量になる', () => {
            const result = CalcHealing(HEALTYPE_SANCTUARY, /* healTarget */ 1, 0);
            expect(result.lvMax).toBe(10);
            // Lv1: 100 * 1 = 100（w_BAI=100%、healTarget!=0なので追加補正なし）
            expect(result.valueMinArray[1]).toBe(100);
            expect(result.valueMinArray[1]).toBe(result.valueMaxArray[1]);
        });

        it('ヒール増幅（ITEM_SP_HEAL_UP_USING）が回復量に反映される', () => {
            n_tok[ITEM_SP_HEAL_UP_USING] = 50; // +50%
            const result = CalcHealing(HEALTYPE_SANCTUARY, 1, 0);
            expect(result.valueMinArray[1]).toBe(150); // floor(100 * 150 / 100)
        });

        it('healTarget=0（自分）のときは受けるヒール増幅も乗算される', () => {
            n_tok[ITEM_SP_HEAL_UP_USED] = 20; // +20%
            const result = CalcHealing(HEALTYPE_SANCTUARY, 0, 0);
            expect(result.valueMinArray[1]).toBe(120); // floor(floor(100*100/100) * 120/100)
        });
    });

    describe('CalcExp', () => {
        it('現在レベルが上限に達していれば経験値計算は0のままになる', () => {
            // Novice(職業ID 0) の上限を超えたレベルを与え、両方の分岐を通過させない
            set_n_A_JOB(0);
            const veryHighLv = 999999;
            set_n_A_BaseLV(veryHighLv);
            set_n_A_JobLV(veryHighLv);
            const mobData: number[] = [];
            mobData[MONSTER_DATA_INDEX_BASE_EXP] = 100;
            mobData[MONSTER_DATA_INDEX_JOB_EXP] = 100;
            const result = CalcExp(0, veryHighLv, 0, veryHighLv, mobData);
            expect(result.expToNextBase).toBe(0);
            expect(result.expToNextJob).toBe(0);
            expect(result.mobCountToNextBase).toBe(0);
            expect(result.mobCountToNextJob).toBe(0);
        });

        it('lvMaxBase/lvMaxJob を返り値として返す', () => {
            set_n_A_JOB(0);
            const mobData: number[] = [];
            mobData[MONSTER_DATA_INDEX_BASE_EXP] = 100;
            mobData[MONSTER_DATA_INDEX_JOB_EXP] = 100;
            const result = CalcExp(0, 1, 0, 1, mobData);
            expect(result.lvMaxBase).toBeGreaterThan(1);
            expect(result.lvMaxJob).toBeGreaterThan(1);
        });
    });
});
