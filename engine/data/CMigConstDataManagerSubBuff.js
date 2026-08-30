// === AUTO-GENERATED IMPORTS ===
import { CMigConstDataManagerSubBase } from "./CMigConstDataManagerSubBase.js";
import { CMigEquipableData } from "./CMigEquipableData.js";
import { MIG_EQUIPABLE_DATA_INDEX_ID, MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY, MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID, MIG_EQUIPABLE_DATA_INDEX_REF_ID } from "../const/EnumMigEquipableDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
/**
 * バフデータマネージャクラス.
 */
export function CMigConstDataManagerSubBuff () {

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

}
CMigConstDataManagerSubBuff.prototype = new CMigConstDataManagerSubBase();
