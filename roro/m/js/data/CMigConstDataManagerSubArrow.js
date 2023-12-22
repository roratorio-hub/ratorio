/**
 * 矢データマネージャクラス.
 */
function CMigConstDataManagerSubArrow () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



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

		// TODO: データ移行過渡処理
		this.idEnumObjectName = "EnumMigArrowId";

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

		for (idx = 0; idx < ArrowOBJNew.length; idx++) {
			if (ArrowOBJNew[idx][ARROW_DATA_INDEX_NAME] == dataName) {
				return ArrowOBJNew[idx][ARROW_DATA_INDEX_ID];
			}
		}

		return -1;
	};

}
CMigConstDataManagerSubArrow.prototype = new CMigConstDataManagerSubBase();