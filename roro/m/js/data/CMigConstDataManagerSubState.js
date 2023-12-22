/**
 * 状態異常データマネージャクラス.
 */
function CMigConstDataManagerSubState () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



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

		// TODO: データ移行過渡処理
		this.idEnumObjectName = "EnumMigStateId";

	}).call(this);

}
CMigConstDataManagerSubState.prototype = new CMigConstDataManagerSubBase();