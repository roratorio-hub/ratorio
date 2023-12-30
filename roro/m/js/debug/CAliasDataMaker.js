
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





/**
 * エイリアスデータ作成クラス.
 */
function CAliasDataMaker () {

}

/**
 * データ定義を上書き定義する.
 */
CAliasDataMaker.OverrideData = function () {

	var dataMap = null;
	var dataDat = null;



	dataMap = new Map();
	dataDat = [];

	dataMap.set("YE", "ユグドラシル");


	dataMap.set("GD", "ゲフェン地下ダンジョン");
	dataMap.set("LOD", "ロードオブデス");
	dataMap.set("MD", "メモリアルダンジョン");

	dataMap.set("赤芋", "アルギオペ");
	dataMap.set("兄貴", "オークウォリアー");
	dataMap.set("姉貴", "オークレディ");
	dataMap.set("夫", "オットー");
	dataMap.set("伊豆", "イズルード");
	dataMap.set("師匠", "スリーパー");
	dataMap.set("船長", "ドレイク");
	dataMap.set("スリッパ", "スリーパー");
	dataMap.set("谷", "レディータニー");
	dataMap.set("棚", "タナトス");
	dataMap.set("超", "オークヒーロー");
	dataMap.set("禿", "彷徨う者");
	dataMap.set("廃兄貴", "ハイオーク");
	dataMap.set("ハイオク", "ハイオーク");
	dataMap.set("婆", "バースリー");
	dataMap.set("ヒルメルズ", "ヒメルメズ");
	dataMap.set("プロンテラ北", "迷宮の森");
	dataMap.set("プロ北", "迷宮の森");
	dataMap.set("道", "オークロード");
	dataMap.set("ワムテ", "ワームテール");










	// 各データをdatデータに変換する
	dataMap.forEach(
		function (valueF, keyF, mapF) {
			dataDat.push([keyF, valueF]);
		}
	);



	// 定義済みデータ配列を上書き
	g_AliasDataArray = dataDat;

};





// データ上書き
if (_DATA_CREATE_MODE) {
	CAliasDataMaker.OverrideData();
}
