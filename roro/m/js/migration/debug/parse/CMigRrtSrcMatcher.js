
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





//----------------------------------------------------------------
// マッチャ種別定義
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMigRrtSrcMatcherKind",
	[
		"MIG_RRTSRC_MATCHER_KIND_CORE",			// １個以下のキャプチャグループを持つ正規表現
		"MIG_RRTSRC_MATCHER_KIND_DATA",
		"MIG_RRTSRC_MATCHER_KIND_CONDITION",
		"MIG_RRTSRC_MATCHER_KIND_ATTRIBUTE",
		"MIG_RRTSRC_MATCHER_KIND_EFFECT",
		"MIG_RRTSRC_MATCHER_KIND_STATIC",
		"MIG_RRTSRC_MATCHER_KIND_LIST_DATA",
	],
	0,
	1
);





function CMigRrtSrcMatcher (refLibrary, id, kind, spIdName, sourceArray, funcExtraCheck) {

	// ライブラリの参照
	this.refLibrary = refLibrary;

	// ID
	this.id = id;

	// 種別
	this.kind = kind;

	// 対応するSPID定数名
	this.spIdName = spIdName;

	// 正規表現のソース配列
	this.regSourceArray = sourceArray;

	// 正規表現文字列
	this.regString = "";

	// 追加検査用関数
	this.funcExtraCheck = funcExtraCheck;

	// 内包マッチャの配列
	this.refChildren = [];



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var ret = null;

		var regString = "";
		var replaceString = "";

		var blockString = "";
		var blockFlag = "";
		var blockId = 0;
		var blockMatcher = null;

		var regDefinedPart = RegExp("<([$?]{2})(\\w+)([$?]{2})>", "");



		// キャプチャ表現を追加して、正規表現ソースを連結
		regString = this.regSourceArray.join("\\s*");

		// 定義済み正規表現の名称を、実際の正規表現に置き換える
		while (ret = regDefinedPart.exec(regString)) {

			// ブロックの情報を切り出す
			blockString = ret[0];
			blockFlag = ret[1];
			blockId = parseInt(ret[2], 10);

			// 指定されたマッチャを取得
			blockMatcher = this.refLibrary.Get(blockId);

			// 内包マッチャの配列に追加
			this.refChildren.push(blockMatcher);

			// 実際の正規表現を取得
			replaceString = "(?:" + blockMatcher.regString + ")";

			// 定義名の量指定フラグによって、正規表現を加工
			if (blockFlag == "??") {
				replaceString += "?";
			}

			// 名称部分を正規表現に置き換え
			regString = regString.replace(blockString, replaceString);
		}

		// 正規表現文字列を保存
		this.regString = regString;

	}).call(this);



	/**
	 * マッチ実行.
	 * @param text マッチ対象の文字列
	 */
	this.Match = function (text) {

		var idx = 0;
		var ret = null;
		var retRecursive = null;

		var regObject = null;
		var matchedArray = null;
		var result = null;


		// 正規表現オブジェクトを生成
		regObject = RegExp("(.*?)\\s*(?<!\\S)" + this.regString + "\\s*(.*)", "i");


		// マッチング実行
		ret = regObject.exec(text);

		// マッチしなかった場合は、処理終了
		if (ret == null) {
			return null;
		}

		// マッチ情報の配列を取り出す
		matchedArray = [];
		for (idx = 2; idx < ret.length - 1; idx++) {
			matchedArray.push(ret[idx]);
		}

		// 結果ツリー生成
		retRecursive = this.CreateMatchResultRecursive(matchedArray, 0, null);

		// 結果ツリー生成の段階で不適合の場合は、処理終了
		if (!retRecursive) {
			return null;
		}

		// マッチ結果を保存
		result = new CMigRrtSrcMatchResult();
		result.index = ret.index + ret[1].length;
		result.matcherId = this.id;
		result.matchedTree = retRecursive[1];
		result.matchedText = ret[0].substring(ret[1].length, ret[0].length - ret[ret.length - 1].length);
		result.remainFront = ret[1];
		result.remainBack = ret[ret.length - 1];

		return result;
	};

	/**
	 * マッチ結果生成（再帰）.
	 * @param matchedArray マッチした文字列の配列
	 * @param currentIndex 現在の配列インデックス
	 * @param matchedTreeParent 親マッチツリー
	 */
	this.CreateMatchResultRecursive = function (matchedArray, currentIndex, matchedTreeParent) {

		var idx = 0;
		var ret = null;

		var matchedTree = null;

		// マッチツリーを生成
		matchedTree = new CMigRrtSrcMatchedTree();
		matchedTree.refMatcher = this;

		// 親があれば登録
		if (matchedTreeParent != null) {
			matchedTree.parent = matchedTreeParent;
			matchedTreeParent.value.push(matchedTree);
		}

		// 値の設定（葉要素の場合）
		if (this.refChildren.length == 0) {
			if (matchedArray.length > currentIndex) {
				matchedTree.value = matchedArray[currentIndex];
				currentIndex++;
			}
		}

		// 値の設定（枝要素の場合）
		else {

			matchedTree.value = [];

			for (idx = 0; idx < this.refChildren.length; idx++) {

				ret = this.refChildren[idx].CreateMatchResultRecursive(matchedArray, currentIndex, matchedTree);

				if (!ret) {
					return null;
				}

				currentIndex = ret[0];
			}
		}

		// 追加チェック関数が指定されている場合は、その判定を実施
		if (this.funcExtraCheck !== undefined) {
			if (!this.funcExtraCheck(matchedTree.value)) {
				return null;
			}
		}

		return [currentIndex, matchedTree];
	};

}
