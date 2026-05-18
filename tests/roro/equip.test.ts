import { describe, it, expect } from 'vitest';
import {
    changeJobSettings,
    OnChangeArmsTypeRight,
    RebuildArmsRightSelect,
    GetFlagAppendedItemName,
    GetFlagAppendedCardName,
    IsLearnedEffectEquipable,
    OnChangeArmsTypeLeft,
    RebuildArmsLeftSelect,
    OnChangeRefined,
    OnChangeEquip,
    ClearEnchantOnChangeEquip,
    UpdateStatefullDataOnChangeEquip,
    UpdateLearnedSkillNotice,
    OnClickSwapArms,
    OnChangeCard,
    OnChangeCostume,
    OnChangeRandomEnchant,
    sort,
    RebuildArmorsSelect,
    WeaponSet2,
    InitEquipDefaultAll,
    InitEquipDefault,
    __InitEquipDefault,
    ClearEquipAll,
    ClearEquip,
    __ClearEquip,
    IsLongRange,
    copyAccs,
} from '@roro/equip.js';

describe('equip.js', () => {
    describe('エクスポート確認', () => {
        it('changeJobSettings が関数', () => { expect(typeof changeJobSettings).toBe('function'); });
        it('OnChangeArmsTypeRight が関数', () => { expect(typeof OnChangeArmsTypeRight).toBe('function'); });
        it('RebuildArmsRightSelect が関数', () => { expect(typeof RebuildArmsRightSelect).toBe('function'); });
        it('GetFlagAppendedItemName が関数', () => { expect(typeof GetFlagAppendedItemName).toBe('function'); });
        it('GetFlagAppendedCardName が関数', () => { expect(typeof GetFlagAppendedCardName).toBe('function'); });
        it('IsLearnedEffectEquipable が関数', () => { expect(typeof IsLearnedEffectEquipable).toBe('function'); });
        it('OnChangeArmsTypeLeft が関数', () => { expect(typeof OnChangeArmsTypeLeft).toBe('function'); });
        it('RebuildArmsLeftSelect が関数', () => { expect(typeof RebuildArmsLeftSelect).toBe('function'); });
        it('OnChangeRefined が関数', () => { expect(typeof OnChangeRefined).toBe('function'); });
        it('OnChangeEquip が関数', () => { expect(typeof OnChangeEquip).toBe('function'); });
        it('ClearEnchantOnChangeEquip が関数', () => { expect(typeof ClearEnchantOnChangeEquip).toBe('function'); });
        it('UpdateStatefullDataOnChangeEquip が関数', () => { expect(typeof UpdateStatefullDataOnChangeEquip).toBe('function'); });
        it('UpdateLearnedSkillNotice が関数', () => { expect(typeof UpdateLearnedSkillNotice).toBe('function'); });
        it('OnClickSwapArms が関数', () => { expect(typeof OnClickSwapArms).toBe('function'); });
        it('OnChangeCard が関数', () => { expect(typeof OnChangeCard).toBe('function'); });
        it('OnChangeCostume が関数', () => { expect(typeof OnChangeCostume).toBe('function'); });
        it('OnChangeRandomEnchant が関数', () => { expect(typeof OnChangeRandomEnchant).toBe('function'); });
        it('sort が関数', () => { expect(typeof sort).toBe('function'); });
        it('RebuildArmorsSelect が関数', () => { expect(typeof RebuildArmorsSelect).toBe('function'); });
        it('WeaponSet2 が関数', () => { expect(typeof WeaponSet2).toBe('function'); });
        it('InitEquipDefaultAll が関数', () => { expect(typeof InitEquipDefaultAll).toBe('function'); });
        it('InitEquipDefault が関数', () => { expect(typeof InitEquipDefault).toBe('function'); });
        it('__InitEquipDefault が関数', () => { expect(typeof __InitEquipDefault).toBe('function'); });
        it('ClearEquipAll が関数', () => { expect(typeof ClearEquipAll).toBe('function'); });
        it('ClearEquip が関数', () => { expect(typeof ClearEquip).toBe('function'); });
        it('__ClearEquip が関数', () => { expect(typeof __ClearEquip).toBe('function'); });
        it('IsLongRange が関数', () => { expect(typeof IsLongRange).toBe('function'); });
        it('copyAccs が関数', () => { expect(typeof copyAccs).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.changeJobSettings が設定されている', () => { expect(typeof (window as any).changeJobSettings).toBe('function'); });
        it('window.OnChangeArmsTypeRight が設定されている', () => { expect(typeof (window as any).OnChangeArmsTypeRight).toBe('function'); });
        it('window.OnChangeArmsTypeLeft が設定されている', () => { expect(typeof (window as any).OnChangeArmsTypeLeft).toBe('function'); });
        it('window.OnChangeEquip が設定されている', () => { expect(typeof (window as any).OnChangeEquip).toBe('function'); });
        it('window.OnChangeCard が設定されている', () => { expect(typeof (window as any).OnChangeCard).toBe('function'); });
        it('window.GetFlagAppendedItemName が設定されている', () => { expect(typeof (window as any).GetFlagAppendedItemName).toBe('function'); });
        it('window.GetFlagAppendedCardName が設定されている', () => { expect(typeof (window as any).GetFlagAppendedCardName).toBe('function'); });
        it('window.IsLongRange が設定されている', () => { expect(typeof (window as any).IsLongRange).toBe('function'); });
        it('window.InitEquipDefaultAll が設定されている', () => { expect(typeof (window as any).InitEquipDefaultAll).toBe('function'); });
        it('window.ClearEquipAll が設定されている', () => { expect(typeof (window as any).ClearEquipAll).toBe('function'); });
        it('window.copyAccs が設定されている', () => { expect(typeof (window as any).copyAccs).toBe('function'); });
        it('window.UpdateLearnedSkillNotice が設定されている', () => { expect(typeof (window as any).UpdateLearnedSkillNotice).toBe('function'); });
    });

    describe('呼び出しテスト', () => {
        // sort: ItemObjNew の KANA フィールドで挿入ソートする純粋関数に近い処理
        it('sort がカナ順に配列を並べ替える', () => {
            (window as any).ITEM_DATA_INDEX_KANA = 0;
            (window as any).ItemObjNew = { 0: [''], 1: ['あ'], 2: ['う'], 3: ['い'] };
            const work: (number | string)[] = [2, 3, 1, 'EOF'];
            sort(work as any);
            expect(work[0]).toBe(1); // 'あ'
            expect(work[1]).toBe(3); // 'い'
            expect(work[2]).toBe(2); // 'う'
        });

        // UpdateLearnedSkillNotice: n_A_card ループ内に let 宣言漏れがあると ReferenceError になる
        // このテストは cardId が未宣言だった equip.js:1053 の再発を検出するためのもの
        it('UpdateLearnedSkillNotice が n_A_card ループパスでエラーにならない', () => {
            const MOCK_SP_END = 9999;
            (window as any).ITEM_SP_END = MOCK_SP_END;
            (window as any).ITEM_SP_LEARNED_SKILL_EFFECT = 1;
            (window as any).CARD_DATA_INDEX_SPBEGIN = 0;
            (window as any).CardObjNew = { 0: [MOCK_SP_END] }; // while ループを即座に抜ける
            (window as any).n_A_Equip = [];                     // 装備ループをスキップ
            (window as any).n_A_card = [0];                     // カードループを1回実行
            (window as any).n_A_JOB = 0;
            (window as any).CONST_DATA_KIND_JOB = 0;
            (window as any).g_constDataManager = {
                GetDataObject: () => ({ GetLearnSkillIdArray: () => [] }),
            };
            (window as any).HtmlRemoveAllChild = () => {};
            (window as any).HtmlCreateTextNode = () => {};
            document.body.innerHTML = '<span id="ID_SKILL_LEARNED_NOTICE"></span>';
            expect(() => UpdateLearnedSkillNotice()).not.toThrow();
        });
    });
});
