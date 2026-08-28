// === AUTO-GENERATED IMPORTS ===
import "../chara/CNameKana.js";
import "../item.h.js";
import { CMigConstDataManagerSubBase } from "./CMigConstDataManagerSubBase.js";
import { CMigEquipableData } from "./CMigEquipableData.js";
import { ItemObjNew } from "../item.dat.js";
import { ITEM_DATA_INDEX_ID, ITEM_DATA_INDEX_NAME } from "../const/EnumItemDataIndex.js";
import { MIG_EQUIPABLE_DATA_INDEX_ID, MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY, MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID, MIG_EQUIPABLE_DATA_INDEX_REF_ID, MIG_EQUIPABLE_DATA_INDEX_SLOT } from "../const/EnumMigEquipableDataIndex.js";
import { NAME_KANA_DATA_INDEX_NAME } from "../const/EnumNameKanaDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
/**
 * アイテムデータマネージャクラス.
 */
export function CMigConstDataManagerSubItem () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.dataObjectClass = CMigEquipableData;
		this.dataIndexId = MIG_EQUIPABLE_DATA_INDEX_ID;
		this.dataIndexRefId = MIG_EQUIPABLE_DATA_INDEX_REF_ID;
		this.dataIndexOfficialId = MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID;
		this.dataIndexNameKanaArray = MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY;
		this.sourceArray = [];
		this.objectArray = [];


	}).call(this);



	//----------------
	// オーバーライド
	//----------------

	// TODO: 移行過渡期の処理

	/**
	 * データIDを取得する（オブジェクト化なし）.
	 * @param dataName データ名称
	 * @return 公式ID
	 */
	this.GetIdByName = function (dataName) {

		var idx = 0;

		var nameKanaArray = null;

		for (idx = 0; idx < this.sourceArray.length; idx++) {

			if (!this.sourceArray[idx]) {
				continue;
			}

			if (this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY].length < 1) {
				continue;
			}

			if (this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME] == dataName) {
				return this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_ID];
			}
		}

		for (idx = 0; idx < ItemObjNew.length; idx++) {
			if (ItemObjNew[idx][ITEM_DATA_INDEX_NAME] == dataName) {
				return ItemObjNew[idx][ITEM_DATA_INDEX_ID];
			}
		}

		return -1;
	};

	/**
	 * データIDを取得する（スロット付記を考慮）（オブジェクト化なし）.
	 * @param dataName データ名称
	 * @return 公式ID
	 */
	this.GetIdByNameSlotted = function (dataName) {

		var idx = 0;

		var dataNameCore = "";
		var idxExact = -1;
		var idxCore = -1;

		var regSlot = /\[\d+\]$/;


		dataNameCore = dataName.replace(regSlot, "");



// TODO: 移行時処理
// 本来は sourceArray だけを走査すればよいが、移行中は定義がないので先に旧データを走査
// 新形式で追加されるデータ（収集品等）の場合に対応するため、旧データで見つからない場合のみ、新データを走査

		for (idx = 0; idx < ItemObjNew.length; idx++) {

			if (ItemObjNew[idx][ITEM_DATA_INDEX_NAME] == dataName) {
				idxExact = idx;
			}
			else if (ItemObjNew[idx][ITEM_DATA_INDEX_NAME] == dataNameCore) {
				idxCore = idx;
			}
		}

		if ((idxExact < 0) && (idxCore < 0)) {
			for (idx = 0; idx < this.sourceArray.length; idx++) {

				if (!this.sourceArray[idx]) {
					continue;
				}

				if (this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY].length < 1) {
					continue;
				}

				if (this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME] == dataName) {
					idxExact = idx;
				}
				else if (this.sourceArray[idx][MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME] == dataNameCore) {
					idxCore = idx;
				}
			}
		}


		if (idxExact >= 0) {
			return idxExact;
		}

		if (idxCore >= 0) {
			return idxCore;
		}

		return -1;
	};



	/**
	 * フル名称を取得する（オブジェクト化なし）.
	 * @param dataId データID
	 * @return 名称
	 * @remark 主にアイテム名にスロット識別子を付与するため（オーバーライド）
	 */
	this.GetFullyName = function (dataId) {

		var slotText = "";
		var refId = 0;

		slotText = "[" + this.sourceArray[dataId][MIG_EQUIPABLE_DATA_INDEX_SLOT] + "]";

		refId = this.GetRefId(dataId);

		if (refId > 0) {
			return this.GetName(refId) + slotText;
		}

		return this.GetName(dataId) + slotText;
	};

}
CMigConstDataManagerSubItem.prototype = new CMigConstDataManagerSubBase();
