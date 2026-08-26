// === AUTO-GENERATED IMPORTS ===
import "../monster.h.js";
import { CMigConstDataManagerSubBase } from "./CMigConstDataManagerSubBase.js";
import { CMigEquipableData } from "./CMigEquipableData.js";
import { MonsterObjNew } from "../monster.dat.js";
import { MIG_EQUIPABLE_DATA_INDEX_ID, MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY, MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID, MIG_EQUIPABLE_DATA_INDEX_REF_ID } from "../const/EnumMigEquipableDataIndex.js";
import { MONSTER_DATA_INDEX_ID, MONSTER_DATA_INDEX_NAME } from "../const/EnumMonsterDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
/**
 * モンスターデータマネージャクラス.
 */
export function CMigConstDataManagerSubMonster () {

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

		for (idx = 0; idx < MonsterObjNew.length; idx++) {
			if (MonsterObjNew[idx][MONSTER_DATA_INDEX_NAME] == dataName) {
				return MonsterObjNew[idx][MONSTER_DATA_INDEX_ID];
			}
		}

		return -1;
	};

}
CMigConstDataManagerSubMonster.prototype = new CMigConstDataManagerSubBase();
