
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//----------------------------------------------------------------
// アイテムデータ作成用データクラス
//----------------------------------------------------------------

/**
 * アイテムデータ作成クラス.
 */
function CMigItemMakeData () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.id = 0;
		this.refId = -1;
		this.officialId = 0;
		this.nameKanaArray = [];
		this.slot = 0;
		this.staticData = new CMigEquipableStaticData();
		this.spDataArray = [];
		this.explainArray = [];
		this.noteArray = [];

	}).call(this);

}
CMigItemMakeData.prototype = new CMigEquipableDataMakeInfo();





// データ作成モードなら、本番データを上書き
// （後続の part ファイル内でデータを定義していく）
if (_DATA_CREATE_MODE) {

	// グローバル固定データマネージャの、データ配列を初期化
	g_constDataManager.itemDataManager.sourceArray = [];
}
