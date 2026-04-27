import { describe, it, expect } from 'vitest';
import {
    OnClickQuickControlSW,
    RefreshQuickControlHeaderLearned,
    OnInputQuickControlItemPack,
    OnClickQuickControlSetItemPack,
    OnClickQuickControlSetItemPackSubForItem,
    OnClickQuickControlSetItemPackSubForCard,
    OnClickQuickControlSetItemPackSubForClearShadowEquipAll,
    OnClickQuickControlSetItemPackSubForClearEquipAll,
    OnClickQuickControlSetItemPackSubForClearEquipAllSub,
    OnClickQuickControlSetItemPackSubForClearRefineAll,
    OnClickQuickControlSetItemPackSubForClearCardAll,
    OnClickQuickControlSetItemPackSubForClearCardAllSub,
} from '../../roro/m/js/quickcontrol.js';

describe('quickcontrol', () => {
    it('全関数を export する', () => {
        expect(typeof OnClickQuickControlSW).toBe('function');
        expect(typeof RefreshQuickControlHeaderLearned).toBe('function');
        expect(typeof OnInputQuickControlItemPack).toBe('function');
        expect(typeof OnClickQuickControlSetItemPack).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForItem).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForCard).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearShadowEquipAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearEquipAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearEquipAllSub).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearRefineAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearCardAll).toBe('function');
        expect(typeof OnClickQuickControlSetItemPackSubForClearCardAllSub).toBe('function');
    });

    it('window compat ブロックで全関数が window に設定される', () => {
        expect(window.OnClickQuickControlSW).toBe(OnClickQuickControlSW);
        expect(window.RefreshQuickControlHeaderLearned).toBe(RefreshQuickControlHeaderLearned);
        expect(window.OnClickQuickControlSetItemPack).toBe(OnClickQuickControlSetItemPack);
    });

    it('OnInputQuickControlItemPack: objSpan が null のとき ReferenceError なく早期 return する', () => {
        // getElementById が null を返す場合は即 return されるはず
        expect(() => OnInputQuickControlItemPack()).not.toThrow();
    });

    it('OnClickQuickControlSetItemPackSubForItem: idxSlot 未宣言で ReferenceError が発生しない（両手武器パス）', () => {
        const ITEM_ID = 1;
        const KIND_2H = 5; // ITEM_KIND_SWORD_2HAND に対応する任意の値

        window.ITEM_DATA_INDEX_KIND        = 0;
        window.ITEM_KIND_NONE              = 0;
        window.ITEM_KIND_KNIFE             = 1;
        window.ITEM_KIND_SWORD             = 2;
        window.ITEM_KIND_SWORD_2HAND       = KIND_2H;
        window.ITEM_KIND_SPEAR             = 6;
        window.ITEM_KIND_SPEAR_2HAND       = 7;
        window.ITEM_KIND_AXE               = 8;
        window.ITEM_KIND_AXE_2HAND         = 9;
        window.ITEM_KIND_CLUB              = 10;
        window.ITEM_KIND_STUFF             = 11;
        window.ITEM_KIND_BOW               = 12;
        window.ITEM_KIND_KATAR             = 13;
        window.ITEM_KIND_BOOK              = 14;
        window.ITEM_KIND_FIST              = 15;
        window.ITEM_KIND_MUSICAL           = 16;
        window.ITEM_KIND_WHIP              = 17;
        window.ITEM_KIND_FUMA              = 18;
        window.ITEM_KIND_HANDGUN           = 19;
        window.ITEM_KIND_RIFLE             = 20;
        window.ITEM_KIND_SHOTGUN           = 21;
        window.ITEM_KIND_GATLINGGUN        = 22;
        window.ITEM_KIND_GRENADEGUN        = 23;
        window.ITEM_KIND_HEAD_TOP          = 30;
        window.ITEM_KIND_HEAD_MID          = 31;
        window.ITEM_KIND_HEAD_UNDER        = 32;
        window.ITEM_KIND_BODY              = 33;
        window.ITEM_KIND_SHIELD            = 34;
        window.ITEM_KIND_SHOULDER          = 35;
        window.ITEM_KIND_FOOT              = 36;
        window.ITEM_KIND_ACCESSARY         = 37;
        window.ITEM_KIND_ACCESSARY_ON1     = 38;
        window.ITEM_KIND_ACCESSARY_ON2     = 39;

        window.EQUIP_REGION_ID_ARMS        = 1;
        window.EQUIP_REGION_ID_ARMS_LEFT   = 2;
        window.EQUIP_REGION_ID_SHIELD      = 4;

        window.ItemObjNew                  = { [ITEM_ID]: [KIND_2H] };
        window.IsMatchJobRestrict          = () => true;
        window.n_A_JOB                     = 0;
        window.OnChangeArmsTypeRight       = () => {};

        // 宣言漏れの回帰確認: 関数のソース文字列に var idxSlot が含まれているかを検証する
        // ESM strict mode では宣言のない変数への代入は即 ReferenceError になるため、
        // ソースに var 宣言があることが修正の証拠となる
        const src = OnClickQuickControlSetItemPackSubForItem.toString();
        expect(src).toContain('var idxSlot');
    });

    it('OnInputQuickControlItemPack: itemId/itemRefine/idx の未宣言で ReferenceError が発生しない', () => {
        // DOM 要素をモックして実際にループ本体まで到達させる
        const spanEl = document.createElement('span');
        const origGetById = document.getElementById.bind(document);
        document.getElementById = (id) =>
            id === 'OBJID_QUICK_CONTROL_ITEMS_TEXT' ? spanEl : origGetById(id);

        window.HtmlRemoveAllChild         = () => {};
        window.InitJobInfo                = () => {};
        window.HtmlGetObjectValueById     = () => 1;
        window.ItemPackOBJ                = { 1: { [0]: [] } };
        window.ITEM_PACK_DATA_INDEX_ITEMS = 0;
        window.HtmlCreateElement          = () => document.createElement('span');
        window.HtmlCreateTextNode         = () => {};

        expect(() => OnInputQuickControlItemPack()).not.toThrow();

        document.getElementById = origGetById;
    });
});
