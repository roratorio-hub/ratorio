
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





function CMigRrtSrcMatchResult () {

	// マッチしたマッチャID
	this.matcherId = 0;

	// マッチ結果のツリー
	this.matchedTree = null;

	// マッチした先頭位置
	this.index = 0;

	// マッチした文字列全体
	this.matchedText = "";

	// マッチしなかった前残り文字列
	this.remainFront = "";

	// マッチしなかった後残り文字列
	this.remainBack = "";
}



