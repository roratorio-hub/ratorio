
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



// データ作成モードなら、本番データを上書き
// （後続の part ファイル内でデータを定義していく）
if (_DATA_CREATE_MODE) {

	// グローバル固定データマネージャの、データ配列を初期化
	g_constDataManager.enchListDataManager.sourceArray = [];
}
