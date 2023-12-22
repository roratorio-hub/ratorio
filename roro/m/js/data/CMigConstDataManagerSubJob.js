/**
 * 職業データマネージャクラス.
 */
function CMigConstDataManagerSubJob () {

	//----------------
	// 継承定義は、クラス本体の次に記述
	//----------------



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.dataObjectClass = CMigJobData;
		this.dataIndexId = MIG_JOB_DATA_INDEX_ID;
		this.dataIndexNameKanaArray = MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY;
		this.sourceArray = [];
		this.objectArray = [];

		// 職業ID定義オブジェクト
		this.idEnumObjectName = "EnumMigJobId";

	}).call(this);

}
CMigConstDataManagerSubJob.prototype = new CMigConstDataManagerSubBase();