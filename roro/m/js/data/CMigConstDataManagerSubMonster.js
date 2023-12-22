/**
 * モンスターデータマネージャクラス.
 */
function CMigConstDataManagerSubMonster () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



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

		// TODO: データ移行過渡処理
		this.idEnumObjectName = "EnumMigMonsterId";

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