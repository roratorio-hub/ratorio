
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMigEquipableDataIndex",
	[
		"MIG_EQUIPABLE_DATA_INDEX_ID",
		"MIG_EQUIPABLE_DATA_INDEX_REF_ID",
		"MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID",
		"MIG_EQUIPABLE_DATA_INDEX_SLOT",

		"MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY",
		"MIG_EQUIPABLE_DATA_INDEX_STATIC_DATA",
		"MIG_EQUIPABLE_DATA_INDEX_SP_DATA",

		// 説明文は、現状対応なし
		// "MIG_EQUIPABLE_DATA_INDEX_EXPLAIN",

		"MIG_EQUIPABLE_DATA_INDEX_NOTE",
	],
	0,
	1
);






/*

	基本的には、配列にデータを格納しており、そのまま操作する

*/



/**
 * 装備可能品データクラス.
 * @param dataArrayC 設定するアイテムデータ配列
 */
function CMigEquipableData (dataArrayC) {

	// データ配列
	this.dataArray = null;

	// 名称カナ配列
	this.nameKanaArray = null;

	// 固定情報
	this.staticData = null;

	// SPデータ配列
	this.spDataArray = null;





	/**
	 * イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// データ配列を設定
		this.dataArray = dataArrayC;

		// 名称カナ情報を設定
		this.nameKanaArray = [];

		for (idx = 0; idx < this.dataArray[MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY].length; idx++) {
			this.nameKanaArray[idx] = new CNameKana(
				this.dataArray[MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY][idx][0],
				this.dataArray[MIG_EQUIPABLE_DATA_INDEX_NAME_KANA_ARRAY][idx][1]
			);
		}

		// 固定情報を設定
		this.staticData = new CMigEquipableStaticData(this.dataArray[MIG_EQUIPABLE_DATA_INDEX_STATIC_DATA]);

		// SPデータ配列を設定
		this.spDataArray = [];

		for (idx = 0; idx < this.dataArray[MIG_EQUIPABLE_DATA_INDEX_SP_DATA].length; idx++) {
			this.spDataArray[idx] = new CMigEquipableSpData(this.dataArray[MIG_EQUIPABLE_DATA_INDEX_SP_DATA][idx]);
		}

	}).call(this);




	/**
	 * 公式IDを取得する.
	 * @return 公式ID
	 */
	this.GetOfficialId = function () {
		return this.dataArray[MIG_EQUIPABLE_DATA_INDEX_OFFICIAL_ID];
	};

	/**
	 * 参照IDを取得する.
	 * @return 参照ID
	 */
	this.GetRefId = function () {
		return this.dataArray[MIG_EQUIPABLE_DATA_INDEX_REF_ID];
	};

	/**
	 * 名称カナ配列を取得する.
	 * @return 名称カナ配列
	 */
	this.GetNameKanaArray = function () {
		return this.nameKanaArray;
	};

	/**
	 * スロットを取得する.
	 * @return スロット
	 */
	this.GetSlot = function () {
		return this.dataArray[MIG_EQUIPABLE_DATA_INDEX_SLOT];
	};



	/**
	 * 指定の固定情報を取得する.
	 * @param spid 固定情報のSPID
	 * @param valueWhenUndefined 未定義だった場合に返す値
	 * @return 固定情報
	 */
	this.GetStaticDataOf = function (spid, valueWhenUndefined) {

		var value = null;

		value = this.staticData.GetAttribute(spid);

		if (value === undefined) {
			return valueWhenUndefined;
		}

		return value;
	};




	/**
	 * SPデータをループ処理する.
	 * @param funcProc 処理関数（引数は、(value, index, array)）
	 */
	this.ForEachSpData = function (funcProc) {

		var idx = 0;

		for (idx = 0; idx < this.spDataArray.length; idx++) {
			funcProc(this.spDataArray[idx], idx, this.spDataArray);
		}
	};


}
