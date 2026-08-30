// === AUTO-GENERATED IMPORTS ===
import { CardObjNew } from "../equip/card.dat.js";
import { CMigConstDataManagerSubBase } from "./CMigConstDataManagerSubBase.js";
import { CMigEquipableData } from "./CMigEquipableData.js";
import { CARD_DATA_INDEX_ID, CARD_DATA_INDEX_NAME } from "../const/EnumCardDataIndex.js";
import { MIG_EQUIPABLE_DATA_INDEX_ID, MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY, MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID, MIG_EQUIPABLE_DATA_INDEX_REF_ID } from "../const/EnumMigEquipableDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
/**
 * カードデータマネージャクラス.
 */
export function CMigConstDataManagerSubCard () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// TODO: アイテムデータのまま

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

		var regExpTailCard = /カード$/;

		for (idx = 0; idx < CardObjNew.length; idx++) {
			if (CardObjNew[idx][CARD_DATA_INDEX_NAME] == dataName) {
				return CardObjNew[idx][CARD_DATA_INDEX_ID];
			}
		}

		if (regExpTailCard.test(dataName)) {
			return this.GetIdByName(dataName.replace(regExpTailCard, ""));
		}

		return -1;
	};

}
CMigConstDataManagerSubCard.prototype = new CMigConstDataManagerSubBase();
