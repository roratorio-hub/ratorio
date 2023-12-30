
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * エンチャントリストデータ作成情報クラス.
 */
function CMigEnchListDataMakeInfo () {

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
CMigEnchListDataMakeInfo.prototype = new CMigEquipableDataMakeInfo();





// データ作成モードなら、本番データを上書き
// （後続の part ファイル内でデータを定義していく）
if (_DATA_CREATE_MODE) {

	// グローバル固定データマネージャの、データ配列を初期化
	g_constDataManager.enchListDataManager.sourceArray = [];
}
