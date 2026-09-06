/**
 * セーブモデル（`save-model.js`）から calc モデル（`calc-model.js`）への射影（残件台帳 B-33 B4）.
 *
 * `calc-model.js` 自体は変更しない（B-09 が確立したD1入力閉包の定義を保つ）。
 * このファイルは save-model の値を calc-model の形へ機械的に転記するだけの片方向の
 * アダプタで、`ExtractModelFromDom()`（`engine/status/stallcalc-hydrate.js`）が読む
 * DOM/グローバルの対応箇所をそのまま突き合わせて作った（対応箇所は各セクションの
 * コメントに hydrate.js の行範囲を記す）。
 *
 * ## 射影しないフィールド（意図的な除外）
 *
 * - **攻撃手段・シャドウ装備**（`GetAttackMethodConf()`/`g_shadowEquipController`経由の値）:
 *   calc-model.js自身が明示的にモデル境界の外と定義している（コンポーネント内部状態のため）
 * - **`costume`**: セーブ側は未対応（衣装のセーブ・ロードは次世代版時点で非対応）
 * - **`timeItemConfEffective`**: クイック調整欄のON/OFFはセーブされない
 * - **`bonusStatus`**: 装備から計算される派生値（`g_bonusStatus`）であり、セーブされる入力値ではない
 * - **`passiveSkill`/`buff4`/`buff7`/`buff8`/`autoSpell`**: `ExtractModelFromDom()`は
 *   `n_Skill{1,4,7,8}SW`（設定欄の開閉状態）でこれらの抽出可否を切り替え、かつ
 *   `buff4`/`buff7`/`buff8`はスロットごとに`boolean`（チェックボックス）と`number`（セレクト）が
 *   混在する（例: buff7は53スロット中 boolean/number が不規則に混在）。開閉状態はセーブデータに
 *   存在せず、型混在のマッピングもスロット単位の追加検証が要るため、B4の対象外とした
 *   （将来のフェーズで個別に対応する）
 */
import {
    EQUIP_REGION_ID_ARMS, EQUIP_REGION_ID_ARMS_LEFT, EQUIP_REGION_ID_HEAD_TOP, EQUIP_REGION_ID_HEAD_MID,
    EQUIP_REGION_ID_HEAD_UNDER, EQUIP_REGION_ID_SHIELD, EQUIP_REGION_ID_BODY, EQUIP_REGION_ID_SHOULDER,
    EQUIP_REGION_ID_SHOES, EQUIP_REGION_ID_ACCESSORY_1, EQUIP_REGION_ID_ACCESSORY_2,
} from "../const/EnumEquipRegionId.js";
import { EQUIP_REGION_ID_COUNT } from "../const/EnumMigItemParamId.js";
import {
    CARD_REGION_ID_ARMS_RIGHT_1, CARD_REGION_ID_ARMS_RIGHT_2, CARD_REGION_ID_ARMS_RIGHT_3, CARD_REGION_ID_ARMS_RIGHT_4,
    CARD_REGION_ID_ARMS_LEFT_1, CARD_REGION_ID_ARMS_LEFT_2, CARD_REGION_ID_ARMS_LEFT_3, CARD_REGION_ID_ARMS_LEFT_4,
    CARD_REGION_ID_HEAD_TOP, CARD_REGION_ID_HEAD_MID, CARD_REGION_ID_HEAD_UNDER,
    CARD_REGION_ID_SHIELD, CARD_REGION_ID_BODY, CARD_REGION_ID_SHOULDER, CARD_REGION_ID_SHOES,
    CARD_REGION_ID_ACCESSORY_1, CARD_REGION_ID_ACCESSORY_2,
    CARD_REGION_ID_ENCHANT_HEAD_TOP_1, CARD_REGION_ID_ENCHANT_HEAD_TOP_2, CARD_REGION_ID_ENCHANT_HEAD_TOP_3,
    CARD_REGION_ID_ENCHANT_HEAD_MID_1, CARD_REGION_ID_ENCHANT_HEAD_MID_2, CARD_REGION_ID_ENCHANT_HEAD_MID_3,
    CARD_REGION_ID_ENCHANT_HEAD_UNDER_1, CARD_REGION_ID_ENCHANT_HEAD_UNDER_2, CARD_REGION_ID_ENCHANT_HEAD_UNDER_3,
    CARD_REGION_ID_ENCHANT_SHIELD_1, CARD_REGION_ID_ENCHANT_SHIELD_2, CARD_REGION_ID_ENCHANT_SHIELD_3,
    CARD_REGION_ID_ENCHANT_BODY_1, CARD_REGION_ID_ENCHANT_BODY_2, CARD_REGION_ID_ENCHANT_BODY_3,
    CARD_REGION_ID_ENCHANT_SHOULDER_1, CARD_REGION_ID_ENCHANT_SHOULDER_2, CARD_REGION_ID_ENCHANT_SHOULDER_3,
    CARD_REGION_ID_ENCHANT_SHOES_1, CARD_REGION_ID_ENCHANT_SHOES_2, CARD_REGION_ID_ENCHANT_SHOES_3,
    CARD_REGION_ID_ENCHANT_ACCESSORY_1_1, CARD_REGION_ID_ENCHANT_ACCESSORY_1_2, CARD_REGION_ID_ENCHANT_ACCESSORY_1_3,
    CARD_REGION_ID_ENCHANT_ACCESSORY_2_1, CARD_REGION_ID_ENCHANT_ACCESSORY_2_2, CARD_REGION_ID_ENCHANT_ACCESSORY_2_3,
    CARD_REGION_ID_SHADOW_ARMS_RIGHT_1, CARD_REGION_ID_SHADOW_ARMS_RIGHT_2, CARD_REGION_ID_SHADOW_ARMS_RIGHT_3,
    CARD_REGION_ID_SHADOW_SHIELD_1, CARD_REGION_ID_SHADOW_SHIELD_2, CARD_REGION_ID_SHADOW_SHIELD_3,
    CARD_REGION_ID_SHADOW_ENCHANT_BODY_1, CARD_REGION_ID_SHADOW_ENCHANT_BODY_2, CARD_REGION_ID_SHADOW_ENCHANT_BODY_3,
    CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1, CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2, CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3,
    CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2, CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3,
    CARD_REGION_ID_COUNT,
} from "../runtime/common.js";
import { ITEM_DATA_INDEX_KIND } from "../const/EnumItemDataIndex.js";
import { ItemObjNew } from "../equip/item.dat.js";
import {
    MIG_EQUIP_REGION_ID_ARMS_RIGHT, MIG_EQUIP_REGION_ID_ARMS_LEFT, MIG_EQUIP_REGION_ID_HEAD_TOP,
    MIG_EQUIP_REGION_ID_HEAD_MID, MIG_EQUIP_REGION_ID_HEAD_UNDER, MIG_EQUIP_REGION_ID_SHIELD,
    MIG_EQUIP_REGION_ID_BODY, MIG_EQUIP_REGION_ID_SHOULDER, MIG_EQUIP_REGION_ID_FOOT,
    MIG_EQUIP_REGION_ID_ACCESSORY_1, MIG_EQUIP_REGION_ID_ACCESSORY_2,
} from "../const/EnumMigEquipRegionId.js";
import {
    EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, EQUIP_REGION_ID_SHADOW_ARMS_LEFT, EQUIP_REGION_ID_SHADOW_BODY,
    EQUIP_REGION_ID_SHADOW_FOOT, EQUIP_REGION_ID_SHADOW_ACCESSORY_1, EQUIP_REGION_ID_SHADOW_ACCESSORY_2,
} from "../const/EnumEquipRegionId.js";
import { ARROW_ID_NONE } from "../equip/arrow.dat.js";
import { createEmptyModel } from "./calc-model.js";

/** 装備品ID→武器種別（ITEM_DATA_INDEX_KIND）。旧#applyDataToControlsEquipable()の
 *  `OnChangeArmsTypeRight(ItemObjNew[itemID][ITEM_DATA_INDEX_KIND])` と同じ導出。 */
function deriveWeaponType(itemId) {
    return ItemObjNew[itemId]?.[ITEM_DATA_INDEX_KIND] ?? 0;
}

/** 二刀流判定（calc-model.jsのderiveNitou()と同じ基準）。 */
function deriveNitou(weapon2Type) {
    return Number(weapon2Type ?? 0) !== 0;
}

/** 装備部位IDでitemRegionsから1件探す（無ければ既定値のダミーを返す）。 */
function findItemRegion(saveModel, migEqpRgnId) {
    return saveModel.equip.itemRegions.find((r) => r.eqpRgnId === migEqpRgnId)
        ?? { itemId: 0, refine: 0, transcendence: 0, cardIds: [0, 0, 0, 0] };
}

/** シャドウ装備部位IDでshadowRegionsから1件探す（無ければ既定値のダミーを返す）。 */
function findShadowRegion(saveModel, shadowEqpRgnId) {
    return saveModel.equip.shadowRegions.find((r) => r.eqpRgnId === shadowEqpRgnId)
        ?? { cardIds: [0, 0, 0] };
}

/**
 * セーブモデルから calc モデルへ射影する.
 * @param {object} saveModel `extractSaveModelFromState()` の戻り値（`save-model.js`の形）
 * @returns {object} `createEmptyModel()`（`calc-model.js`）の形。射影対象外フィールドは既定値のまま
 */
export function toCalcModel(saveModel) {
    const model = createEmptyModel();

    // ---- 基本ステータス（hydrate.js:178-190） ----
    model.status.jobId = saveModel.jobId;
    model.status.baseLv = saveModel.baseLv;
    model.status.jobLv = saveModel.jobLv;
    model.status.str = saveModel.statStr;
    model.status.agi = saveModel.statAgi;
    model.status.vit = saveModel.statVit;
    model.status.int = saveModel.statInt;
    model.status.dex = saveModel.statDex;
    model.status.luk = saveModel.statLuk;
    model.status.speedPot = saveModel.speedPot;

    // ---- 装備（武器種別・矢・精錬値・超越値。hydrate.js:196-243） ----
    const armsRight = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_ARMS_RIGHT);
    const armsLeft = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_ARMS_LEFT);
    const headTop = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_HEAD_TOP);
    const headMid = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_HEAD_MID);
    const headUnder = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_HEAD_UNDER);
    const shield = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_SHIELD);
    const body = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_BODY);
    const shoulder = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_SHOULDER);
    const foot = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_FOOT);
    const accessory1 = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_ACCESSORY_1);
    const accessory2 = findItemRegion(saveModel, MIG_EQUIP_REGION_ID_ACCESSORY_2);

    // weapon.type/weapon2Type は旧経路（equip.js の OnChangeArmsTypeRight/Left）と同じ、
    // 装備アイテムの ITEM_DATA_INDEX_KIND から導出する（hydrate.js は逆にDOM保持値を
    // そのまま読むだけだが、その値自体がロード時にこの導出で書き込まれたもの）。
    model.weapon.type = deriveWeaponType(armsRight.itemId);
    model.weapon.zokusei = saveModel.armsElement;
    model.weapon.atkPlus = armsRight.refine;
    model.weapon.transcendence = armsRight.transcendence;
    // weapon2Type/weapon2Transcendence は hydrate.js 上では isNitou 判定より前に、
    // 二刀流かどうかに関わらず常に読まれる（hydrate.js:201, 233）。
    // weapon2Type の読み取り元 OBJID_ARMS_TYPE_LEFT は equip.js が二刀流可能な職業のときだけ
    // 動的生成する<select>（等号連想がSelectOptionのvalue文字列を返す）ため、DOM側の型は
    // 職業によって文字列/数値のどちらにもなりうる（要素が無ければHtmlGetObjectValueByIdの
    // フォールバック数値0、あればDOM .value の文字列）。本射影は常に数値で統一する。
    const weapon2Type = deriveWeaponType(armsLeft.itemId);
    model.weapon.weapon2Type = weapon2Type;
    model.weapon.weapon2Transcendence = armsLeft.transcendence;
    const isNitou = deriveNitou(weapon2Type);

    // HtmlGetObjectValueById(..., ...)（legacyNum変換なし）は要素が存在すれば<select>.value
    // （常に文字列）を、存在しなければフォールバック値（数値）をそのまま返す——型が要素の
    // 存在有無に依存し不安定。本射影は常に数値で統一する（値は同じで型のみ異なるケースは
    // 同値性テスト側でNumber()正規化して吸収する。詳細は save-to-calc-model.test.ts 参照）。
    model.arrow = saveModel.arrow ?? ARROW_ID_NONE;

    model.equip = new Array(EQUIP_REGION_ID_COUNT).fill(0);
    model.equip[EQUIP_REGION_ID_ARMS] = armsRight.itemId;
    if (isNitou) {
        // hydrate.js:212-214 と同じく、二刀流でなければ既定値0のまま
        model.equip[EQUIP_REGION_ID_ARMS_LEFT] = armsLeft.itemId;
        // weapon2AtkPlus のみ isNitou ゲート対象（hydrate.js:241-243）
        model.weapon.weapon2AtkPlus = armsLeft.refine;
    }
    model.equip[EQUIP_REGION_ID_HEAD_TOP] = headTop.itemId;
    model.equip[EQUIP_REGION_ID_HEAD_MID] = headMid.itemId;
    model.equip[EQUIP_REGION_ID_HEAD_UNDER] = headUnder.itemId;
    model.equip[EQUIP_REGION_ID_SHIELD] = shield.itemId;
    model.equip[EQUIP_REGION_ID_BODY] = body.itemId;
    model.equip[EQUIP_REGION_ID_SHOULDER] = shoulder.itemId;
    model.equip[EQUIP_REGION_ID_SHOES] = foot.itemId;
    model.equip[EQUIP_REGION_ID_ACCESSORY_1] = accessory1.itemId;
    model.equip[EQUIP_REGION_ID_ACCESSORY_2] = accessory2.itemId;
    // costume（EQUIP_REGION_ID_COSTUME_HEAD_UNDER）はセーブ側が未対応のため常に既定値0のまま

    model.defPlus.head = headTop.refine;
    model.defPlus.body = body.refine;
    model.defPlus.shield = shield.refine;
    model.defPlus.shoulder = shoulder.refine;
    model.defPlus.shoes = foot.refine;

    model.defTranscendence.head = headTop.transcendence;
    model.defTranscendence.shield = shield.transcendence;
    model.defTranscendence.body = body.transcendence;
    model.defTranscendence.shoulder = shoulder.transcendence;
    model.defTranscendence.shoes = foot.transcendence;

    // ---- 装着カード・エンチャント（CARD_REGION_ID_*。hydrate.js:246-325） ----
    model.card = new Array(CARD_REGION_ID_COUNT).fill(0);
    model.card[CARD_REGION_ID_ARMS_RIGHT_1] = armsRight.cardIds[0];
    model.card[CARD_REGION_ID_ARMS_RIGHT_2] = armsRight.cardIds[1];
    model.card[CARD_REGION_ID_ARMS_RIGHT_3] = armsRight.cardIds[2];
    model.card[CARD_REGION_ID_ARMS_RIGHT_4] = armsRight.cardIds[3];
    if (isNitou) {
        model.card[CARD_REGION_ID_ARMS_LEFT_1] = armsLeft.cardIds[0];
        model.card[CARD_REGION_ID_ARMS_LEFT_2] = armsLeft.cardIds[1];
        model.card[CARD_REGION_ID_ARMS_LEFT_3] = armsLeft.cardIds[2];
        model.card[CARD_REGION_ID_ARMS_LEFT_4] = armsLeft.cardIds[3];
    }
    model.card[CARD_REGION_ID_HEAD_TOP] = headTop.cardIds[0];
    model.card[CARD_REGION_ID_HEAD_MID] = headMid.cardIds[0];
    model.card[CARD_REGION_ID_HEAD_UNDER] = headUnder.cardIds[0];
    model.card[CARD_REGION_ID_SHIELD] = shield.cardIds[0];
    model.card[CARD_REGION_ID_BODY] = body.cardIds[0];
    model.card[CARD_REGION_ID_SHOULDER] = shoulder.cardIds[0];
    model.card[CARD_REGION_ID_SHOES] = foot.cardIds[0];
    model.card[CARD_REGION_ID_ACCESSORY_1] = accessory1.cardIds[0];
    model.card[CARD_REGION_ID_ACCESSORY_2] = accessory2.cardIds[0];

    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1] = headTop.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2] = headTop.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3] = headTop.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_1] = headMid.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_2] = headMid.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_MID_3] = headMid.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1] = headUnder.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2] = headUnder.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3] = headUnder.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_SHIELD_1] = shield.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_SHIELD_2] = shield.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_SHIELD_3] = shield.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_BODY_1] = body.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_BODY_2] = body.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_BODY_3] = body.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_1] = shoulder.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_2] = shoulder.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_SHOULDER_3] = shoulder.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_SHOES_1] = foot.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_SHOES_2] = foot.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_SHOES_3] = foot.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_1] = accessory1.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_2] = accessory1.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_1_3] = accessory1.cardIds[3];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_1] = accessory2.cardIds[1];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_2] = accessory2.cardIds[2];
    model.card[CARD_REGION_ID_ENCHANT_ACCESSORY_2_3] = accessory2.cardIds[3];

    // シャドウ装備のカード（アイテムID/精錬値/ランダムオプションはモデル境界の外だが、
    // カードはhydrate.js自身がDATA_OBJID経由で直接読んでいるためモデルの対象——hydrate.js:308-325）
    const shadowArmsRight = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_ARMS_RIGHT);
    const shadowArmsLeft = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_ARMS_LEFT);
    const shadowBody = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_BODY);
    const shadowFoot = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_FOOT);
    const shadowAccessory1 = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_ACCESSORY_1);
    const shadowAccessory2 = findShadowRegion(saveModel, EQUIP_REGION_ID_SHADOW_ACCESSORY_2);
    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_1] = shadowArmsRight.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_2] = shadowArmsRight.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_ARMS_RIGHT_3] = shadowArmsRight.cardIds[2];
    // シャドウ左手（ARMS_LEFT）は「SHADOW_SHIELD」名で扱う（旧#collectDataShadowEquips()の
    // eqpRgnKeyと同じ対応。hydrate.js:311-313も同じ命名）
    model.card[CARD_REGION_ID_SHADOW_SHIELD_1] = shadowArmsLeft.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_SHIELD_2] = shadowArmsLeft.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_SHIELD_3] = shadowArmsLeft.cardIds[2];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_1] = shadowBody.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_2] = shadowBody.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_BODY_3] = shadowBody.cardIds[2];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_1] = shadowFoot.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_2] = shadowFoot.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_SHOES_3] = shadowFoot.cardIds[2];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_1] = shadowAccessory1.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_2] = shadowAccessory1.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY1_3] = shadowAccessory1.cardIds[2];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_1] = shadowAccessory2.cardIds[0];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_2] = shadowAccessory2.cardIds[1];
    model.card[CARD_REGION_ID_SHADOW_ENCHANT_ACCESSORY2_3] = shadowAccessory2.cardIds[2];

    // ---- 支援・設定欄（すべてg_confDataXxx等の直接スナップショット。hydrate.js:488-527） ----
    model.confIchizi = saveModel.confIchizi.slice();
    model.confNizi = saveModel.confNizi.slice();
    model.confSanzi = saveModel.confSanzi.slice();
    model.confYozi = saveModel.confYozi.slice();
    model.confDebuff = saveModel.equip.debuff.slice();
    model.timeItemConf = saveModel.timeItemConf.slice();
    model.mobConfTaisei = saveModel.mobConfTaisei.slice();
    model.mobConfIjyou = saveModel.mobConfIjyou.slice();
    model.mobConfKyouka = saveModel.mobConfKyouka.slice();
    model.learnedSkill = saveModel.learnedSkill.slice();

    // ---- 性能カスタマイズ（hydrate.js:497-501。g_confDataCustomXxxの直接スナップショット） ----
    model.confCustomStatus = saveModel.confCustomStatus.slice();
    model.confCustomAtk = saveModel.confCustomAtk.slice();
    model.confCustomDef = saveModel.confCustomDef.slice();
    model.confCustomSkill = saveModel.confCustomSkill.slice();
    model.confCustomSpecStatus = saveModel.confCustomSpecStatus.slice();

    // ---- 特性ステータス素点（hydrate.js:502。g_pureStatusはMIG_PARAM_ID_POW..CRT(6-11)の
    // 6要素分しか書き込まれない——hmjob.js:392-398参照。0-5(classic統計分)は常にundefinedのまま
    // （実測でDOM側がnullを返すことを確認済み。当初「classic統計も含む12要素」と誤認していたが
    // 実装時のブラウザ突き合わせで判明・修正） ----
    model.pureStatus = [
        undefined, undefined, undefined, undefined, undefined, undefined,
        saveModel.statPow, saveModel.statSta, saveModel.statWis,
        saveModel.statSpl, saveModel.statCon, saveModel.statCrt,
    ];
    // bonusStatus（g_bonusStatus）は装備等から計算される派生値であり、セーブされる入力値ではないため
    // 対象外（既定値0埋めのまま）

    return model;
}
