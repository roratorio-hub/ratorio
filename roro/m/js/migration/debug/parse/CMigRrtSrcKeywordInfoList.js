
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





function CMigRrtSrcKeywordInfo (keywordC, assignedIdNameC) {

	// キーワード
	this.keyword = "";

	// 割り当てられたID定義名
	this.assignedIdName = "";



	/**
	 *正規表現で特別な意味を持つ文字をエスケープする.
	 * @param keyword キーワード
	 * @return エスケープ後のキーワード文字列
	 */
	this.EscapeKeyword = function (keyword) {

		var idx = 0;

		var escaped = "";

		var chars = [
			"(", ")", "[", "]",
		];

		// 初期値設定
		escaped = keyword;

		// 全ての対象をエスケープ
		for (idx = 0; idx < chars.length; idx++) {
			escaped = escaped.replace(chars[idx], "\\" + chars[idx]);
		}

		return escaped;
	};



	/**
	 * 無名イニシャライザ.
	 * @param dataArray 設定するデータ配列（省略可）
	 */
	(function () {

		// 初期化
		this.keyword = this.EscapeKeyword(keywordC);
		this.assignedIdName = assignedIdNameC;

	}).call(this);



	/**
	 * キーワードを一致判定する.
	 * @param keyword キーワード
	 * @return true:一致、false:不一致
	 */
	this.IsEqualKeyword = function (keyword) {
		return (this.keyword == this.EscapeKeyword(keyword));
	};

}





function CMigRrtSrcKeywordInfoList (id) {

	// ID
	this.id = id;

	// データ配列
	this.dataArray = [];



	/**
	 * キーワード情報を追加する.
	 * @param keywordInfo キーワード情報
	 * @return 利便性のためにthisを返す
	 */
	this.Add = function (keywordInfo) {
		this.dataArray.push(keywordInfo);
		return this;
	};

	/**
	 * キーワード情報を取得する.
	 * @param id ID
	 * @return キーワード情報
	 */
	this.Get = function (keyword) {

		var idx = 0;

		for (idx = 0; idx < this.dataArray.length; idx++) {
			if (this.dataArray[idx].IsEqualKeyword(keyword)) {
				return this.dataArray[idx];
			}
		}

		return undefined;
	};



	/**
	 * キーワードを抽出する正規表現文字列を生成する.
	 * @param bCaptureEachKeyword 個別キャプチャ指定フラグ
	 * @param bCaptureAllText 全体キャプチャ指定フラグ
	 * @param bMultiple 複数許容フラグ
	 * @return 正規表現文字列
	 */
	this.CreateRegText = function (bCaptureEachKeyword, bCaptureAllText, bMultiple) {

		var idx = 0;

		var dataArrayWork = null;
		var dataArraySpliced = null;
		var splicedCount = 0;
		var keyword = "";
		var keywordArray = null;
		var regText = "";

		var separaterArray = [",", "，", "、", "・", "と"];
		var trimPostfixArray = ["形", "属性", "型"];

		var regSeparater = RegExp("(?:" + "(?:" + separaterArray.join(")|(?:") + ")" + ")", "i");
		var regTrimPostfix = RegExp("(?:" + "(?:" + trimPostfixArray.join(")|(?:") + ")" + ")$", "i");



		//----------------------------------------------------------------
		// キーワードを整列する
		//
		// この関数では、登録されているキーワードを元に、
		// 　(?:(?:キーワード１)|(?:キーワード２)|(?:キーワード３))
		// のような選択表現を生成するが、
		// 　(?:(?:キーワード)|(?:キーワード２)|(?:キーワード３))
		// のように、先にマッチした文字列が、後方の文字列の完全な部分文字列の場合、
		// 最長一致のようなことはできず、先にマッチした時点で処理が終了してしまう。
		// そこで、選択表現の生成前に、登録されているキーワードを走査し、
		// 完全な部分文字列になってしまう場合は、より後方で判定するように順序を変更する
		//----------------------------------------------------------------

		dataArrayWork = [];
		for (idx = 0; idx < this.dataArray.length; idx++) {
			dataArrayWork[idx] = this.dataArray[idx];
		}

		splicedCount = 0;
		for (idx = 0; idx < dataArrayWork.length - splicedCount; idx++) {

			// コーディングミス対策
			if (splicedCount > dataArrayWork.length) {
				alert("完全な部分文字列の走査による順序変更で無限ループ。(keyword == " + keyword + ")");
				break;
			}

			// キーワードの文字列を取得
			keyword = dataArrayWork[idx].keyword;

			// 完全な部分文字列となる要素がないか走査
			for (idxLater = idx + 1; idxLater < dataArrayWork.length; idxLater++) {
				if (dataArrayWork[idxLater].keyword.indexOf(keyword) >= 0) {
					break;
				}
			}

			// 完全な部分文字列となる要素があった場合は、順序を変更する
			if (idxLater < dataArrayWork.length) {
				dataArraySpliced = dataArrayWork.splice(idx, 1);
				dataArrayWork = dataArrayWork.concat(dataArraySpliced);
				splicedCount++;
				idx--;
				continue;
			}
		}



		// キーワードをリストアップする
		keywordArray = [];

		for (idx = 0; idx < dataArrayWork.length; idx++) {

			// キーワードの文字列を取得
			keyword = dataArrayWork[idx].keyword;

			// 不要な接尾語をトリムする
/*
			while (regTrimPostfix.test(keyword)) {
				keyword = keyword.replace(regTrimPostfix, "");
			}
*/

			// 非キャプチャグループでくくる
			keyword = "(?:" + keyword + ")";

			// キーワード配列に追加する
			keywordArray.push(keyword);
		}

		// 正規表現文字列に成型する
		if (keywordArray.length > 0) {

			// キーワード配列を、選択表現文字列に結合
			regText = "(?:" + keywordArray.join("|") + ")";

			// 複数許容フラグが真の場合、セパレータの指定を追加
			if (bMultiple) {
				regText += "|" + regSeparater.source;
			}

			// 個別キャプチャフラグ指定に従って、括弧でくくる
			if (bCaptureEachKeyword) {
				regText = "(" + regText + ")";
			}
			else {
				regText = "(?:" + regText + ")";
			}

			// 複数許容フラグが真の場合、量指定子を追加
			if (bMultiple) {
				regText += "+";
			}

			// 全体キャプチャフラグ指定に従って、括弧でくくる
			if (bCaptureAllText) {
				regText = "(" + regText + ")";
			}
			else {
				regText = "(?:" + regText + ")";
			}
		}



		return regText;
	};

}


