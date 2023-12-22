
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMigStateDataIndex",
	[
		"MIG_STATE_DATA_INDEX_ID",

		"MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY",
	],
	0,
	1
);



/*

	基本的には、配列にデータを格納しており、そのまま操作する

*/



/**
 * 状態異常データマネージャクラス.
 * @param dataArrayC 設定する状態異常データ配列
 */
function CMigStateData (dataArrayC) {

	// データ配列
	this.dataArray = null;

	// 名称カナ配列
	this.nameKanaArray = null;



	/**
	 * イニシャライザ.
	 * @param dataArray 設定するデータ配列
	 */
	(function () {

		var idx = 0;

		// データ配列を設定
		this.dataArray = dataArrayC;

		// 名称カナ情報を設定
		this.nameKanaArray = [];

		for (idx = 0; idx < this.dataArray[MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY].length; idx++) {
			this.nameKanaArray[idx] = new CNameKana(
				this.dataArray[MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY][idx][0],
				this.dataArray[MIG_STATE_DATA_INDEX_NAME_KANA_ARRAY][idx][1]
			);
		}

	}).call(this);



	/**
	 * 名称カナ配列を取得する.
	 * @return 名称カナ配列
	 */
	this.GetNameKanaArray = function () {
		return this.nameKanaArray;
	};

}