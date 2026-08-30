// === AUTO-GENERATED IMPORTS ===
import { CMigConstDataManagerSubBase } from "./CMigConstDataManagerSubBase.js";
import { CMigStateData } from "./CMigStateData.js";
import { MIG_STATE_DATA_INDEX_ID, MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY } from "../const/EnumMigStateDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
/**
 * 状態異常データマネージャクラス.
 */
export function CMigConstDataManagerSubState () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.dataObjectClass = CMigStateData;
		this.dataIndexId = MIG_STATE_DATA_INDEX_ID;
		this.dataIndexNameKanaArray = MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY;
		this.sourceArray = [];
		this.objectArray = [];


	}).call(this);

}
CMigConstDataManagerSubState.prototype = new CMigConstDataManagerSubBase();
