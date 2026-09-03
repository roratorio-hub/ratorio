// buildMobUnit() 等が CMonsterMapAreaComponentManager 経由でモンスターデータファイルを
// 参照するため、CSaveDataManager.test.ts / savedata-collect.test.ts と同じくモックする
// （実データを読み込むと happy-dom 環境でヒープOOMになる。原因未特定・残件台帳 B-28 参照）。
import { describe, it, expect } from 'vitest';
import '@engine/data/mig.job.dat.js';
import { toCalcModel } from '@engine/runtime/save-to-calc-model.js';
import { createEmptySaveModel } from '@engine/savedata/save-model.js';
import {
    MIG_EQUIP_REGION_ID_ARMS_RIGHT, MIG_EQUIP_REGION_ID_ARMS_LEFT, MIG_EQUIP_REGION_ID_HEAD_TOP,
    MIG_EQUIP_REGION_ID_HEAD_MID, MIG_EQUIP_REGION_ID_HEAD_UNDER, MIG_EQUIP_REGION_ID_SHIELD,
    MIG_EQUIP_REGION_ID_BODY, MIG_EQUIP_REGION_ID_SHOULDER, MIG_EQUIP_REGION_ID_FOOT,
    MIG_EQUIP_REGION_ID_ACCESSORY_1, MIG_EQUIP_REGION_ID_ACCESSORY_2,
} from '@engine/const/EnumMigEquipRegionId.js';
import {
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT,
} from '@engine/const/EnumEquipRegionId.js';
import {
    CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_HEAD_TOP,
    CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_SHADOW_ENCHANT_BODY_1,
} from '@engine/runtime/common.js';

/** テスト用に11部位ぶんのitemRegionsを既定値で埋めた最小セーブモデルを作る。 */
function buildMinimalSaveModel(): any {
    const model: any = createEmptySaveModel();
    const migIds = [
        MIG_EQUIP_REGION_ID_ARMS_RIGHT, MIG_EQUIP_REGION_ID_ARMS_LEFT, MIG_EQUIP_REGION_ID_HEAD_TOP,
        MIG_EQUIP_REGION_ID_HEAD_MID, MIG_EQUIP_REGION_ID_HEAD_UNDER, MIG_EQUIP_REGION_ID_SHIELD,
        MIG_EQUIP_REGION_ID_BODY, MIG_EQUIP_REGION_ID_SHOULDER, MIG_EQUIP_REGION_ID_FOOT,
        MIG_EQUIP_REGION_ID_ACCESSORY_1, MIG_EQUIP_REGION_ID_ACCESSORY_2,
    ];
    model.equip.itemRegions = migIds.map((eqpRgnId) => ({
        eqpRgnId, itemId: 0, refine: 0, transcendence: 0,
        rndOpt: Array(5).fill({ kind: 0, value: 0 }),
        cardCategoryIds: null, cardIds: [0, 0, 0, 0],
    }));
    const shadowIds = [
        EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_BODY,
        EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
    ];
    model.equip.shadowRegions = shadowIds.map((eqpRgnId) => ({
        eqpRgnId, itemId: 0, refine: 0,
        rndOpt: Array(5).fill({ kind: 0, value: 0 }),
        cardIds: [0, 0, 0],
    }));
    model.equip.debuff = Array(50).fill(0);
    return model;
}

describe('toCalcModel', () => {
    it('全部0のセーブモデルから、既定値のcalcモデルを組み立てる（例外なし）', () => {
        const saveModel = buildMinimalSaveModel();
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.status).toBeDefined();
        expect(calcModel.equip.length).toBeGreaterThan(0);
        expect(calcModel.card.length).toBeGreaterThan(0);
    });

    it('基本ステータスをそのまま転記する', () => {
        const saveModel = buildMinimalSaveModel();
        saveModel.jobId = 42;
        saveModel.baseLv = 150;
        saveModel.jobLv = 50;
        saveModel.statStr = 90;
        saveModel.statLuk = 30;
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.status.jobId).toBe(42);
        expect(calcModel.status.baseLv).toBe(150);
        expect(calcModel.status.jobLv).toBe(50);
        expect(calcModel.status.str).toBe(90);
        expect(calcModel.status.luk).toBe(30);
    });

    it('武器種別はItemObjNewのITEM_DATA_INDEX_KINDから導出する', () => {
        const saveModel = buildMinimalSaveModel();
        const armsRight = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_ARMS_RIGHT);
        armsRight.itemId = 4; // ItemObjNew[4]=ダーク。[4,1,0,59,2,...] → ITEM_DATA_INDEX_KIND(添字1)=1
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.weapon.type).toBe(1);
    });

    it('装備アイテムIDはEQUIP_REGION_ID_*（MIG_EQUIP_REGION_ID_*と同じ添字空間）へそのまま転記する', () => {
        const saveModel = buildMinimalSaveModel();
        const armsRight = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_ARMS_RIGHT);
        armsRight.itemId = 1201;
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.equip[EQUIP_REGION_ID_ARMS]).toBe(1201);
    });

    it('二刀流でなければ左手装備・左手カード・weapon2AtkPlusは既定値のまま（weapon2Type/Transcendenceは常に転記）', () => {
        const saveModel = buildMinimalSaveModel();
        const armsLeft = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_ARMS_LEFT);
        armsLeft.itemId = 0; // 非二刀流（weapon2Type導出結果が0になる）
        armsLeft.refine = 7;
        armsLeft.transcendence = 2;
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.equip[EQUIP_REGION_ID_ARMS_LEFT]).toBe(0);
        expect(calcModel.weapon.weapon2AtkPlus).toBeUndefined();
        // weapon2Transcendenceは非二刀流でも常に転記される（hydrate.js:233と同じ挙動）
        expect(calcModel.weapon.weapon2Transcendence).toBe(2);
    });

    it('二刀流なら左手装備・左手カード・weapon2AtkPlusも転記する', () => {
        const saveModel = buildMinimalSaveModel();
        const armsLeft = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_ARMS_LEFT);
        armsLeft.itemId = 1; // ItemObjNew[1]（ナイフ）はkind!=0のはず→二刀流扱い
        armsLeft.refine = 5;
        armsLeft.cardIds = [10, 20, 30, 40];
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.equip[EQUIP_REGION_ID_ARMS_LEFT]).toBe(1);
        expect(calcModel.weapon.weapon2AtkPlus).toBe(5);
    });

    it('武器のカードは4枠ともCARD_REGION_ID_ARMS_RIGHT_*へ転記する', () => {
        const saveModel = buildMinimalSaveModel();
        const armsRight = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_ARMS_RIGHT);
        armsRight.cardIds = [111, 222, 333, 444];
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.card[CARD_REGION_ID_ARMS_RIGHT_1]).toBe(111);
        expect(calcModel.card[CARD_REGION_ID_ARMS_RIGHT_3]).toBe(333);
    });

    it('防具のカードはスロット1=本体カード・スロット2-4=エンチャントへ分かれる', () => {
        const saveModel = buildMinimalSaveModel();
        const headTop = saveModel.equip.itemRegions.find((r: any) => r.eqpRgnId === MIG_EQUIP_REGION_ID_HEAD_TOP);
        headTop.cardIds = [501, 502, 503, 504];
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.card[CARD_REGION_ID_HEAD_TOP]).toBe(501);
        expect(calcModel.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2]).toBe(503);
    });

    it('シャドウ装備のカードも転記する（アイテムID/精錬値/ランダムオプションは対象外）', () => {
        const saveModel = buildMinimalSaveModel();
        const shadowBody = saveModel.equip.shadowRegions.find((r: any) => r.eqpRgnId === EQUIP_REGION_ID_SHADOW_BODY);
        shadowBody.cardIds = [901, 902, 903];
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_1]).toBe(901);
    });

    it('性能カスタマイズ・支援設定はそのまま転記する', () => {
        const saveModel = buildMinimalSaveModel();
        saveModel.confCustomAtk = Array(30).fill(0);
        saveModel.confCustomAtk[5] = 77;
        saveModel.confIchizi = Array(50).fill(0);
        saveModel.confIchizi[3] = 4;
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.confCustomAtk[5]).toBe(77);
        expect(calcModel.confIchizi[3]).toBe(4);
    });

    it('pureStatusは特性6要素（POW..CRT）のみ埋める。classic6要素は常にundefined（bonusStatusは対象外）', () => {
        // g_pureStatus は hmjob.js:392-398 で POW..CRT（添字6-11）しか書き込まれない
        // （STR..LUK分の添字0-5は常にundefinedのまま）。B4検証時にDOM側の実測で確認した
        // 挙動（当初「classic統計も含む」と誤認していたが実測で判明・修正）。
        const saveModel = buildMinimalSaveModel();
        saveModel.statStr = 1; saveModel.statAgi = 2; saveModel.statVit = 3;
        saveModel.statInt = 4; saveModel.statDex = 5; saveModel.statLuk = 6;
        saveModel.statPow = 7; saveModel.statSta = 8; saveModel.statWis = 9;
        saveModel.statSpl = 10; saveModel.statCon = 11; saveModel.statCrt = 12;
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.pureStatus).toEqual([
            undefined, undefined, undefined, undefined, undefined, undefined,
            7, 8, 9, 10, 11, 12,
        ]);
        expect(calcModel.bonusStatus).toEqual(Array(12).fill(0));
    });

    it('costume/timeItemConfEffectiveは射影対象外のため既定値のまま', () => {
        const saveModel = buildMinimalSaveModel();
        const calcModel = toCalcModel(saveModel);
        expect(calcModel.timeItemConfEffective).toEqual(Array(20).fill(true));
    });
});
