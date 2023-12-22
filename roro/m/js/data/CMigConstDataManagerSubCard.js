/**
 * カードデータマネージャクラス.
 */
function CMigConstDataManagerSubCard () {

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
		this.idEnumObjectName = "EnumMigCardId";

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