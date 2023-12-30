
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();








/**
 * アイテムパーサパース情報クラス.
 */
function CMigItemParserParsedInfo () {

	// 成否
	this.bSuccess = false;

	// パース失敗データ配列
	this.failedDataArray = [];
}

/**
 * アイテムパーサパース結果クラス.
 */
function CMigItemParserParsedResult () {

	// パース結果データ配列
	this.parsedDataArray = [];

	// パース結果説明文配列
	this.parsedExplainArray = [];
}




/**
 * データパーサクラス.
 */
function CMigDataParserItem () {

}

/**
 * 定義ブロック終端記号.
 */
CMigDataParserItem.blockTerminateChar = String.fromCodePoint(0x2015);
CMigDataParserItem.blockTerminateCharAliases = [CMigDataParserItem.blockTerminateChar, String.fromCodePoint(0x2500)];
CMigDataParserItem.GetRegTextBlockTerminateCharAliases = function () {

	let idx = 0;
	let num = null;

	let regText = "[";

	for (idx = 0; idx < CMigDataParserItem.blockTerminateCharAliases.length; idx++) {
		num = new Number(CMigDataParserItem.blockTerminateCharAliases[idx].codePointAt(0));
		regText += "\\u" + ("0000" + num.toString(16)).slice(-4);
	}

	regText += "]";

	return regText;
};

/**
 * 定義ブロック終端データ.
 */
CMigDataParserItem.blockTerminateData = CMigDataParserItem.blockTerminateChar.repeat(8);
CMigDataParserItem.regBlockTerminateData = new RegExp(CMigDataParserItem.GetRegTextBlockTerminateCharAliases() + "{8,}");
CMigDataParserItem.regBlockTerminateLine = new RegExp("^" + CMigDataParserItem.GetRegTextBlockTerminateCharAliases() + "+$");

/**
 * 定義ブロックの終端かを判定する.
 * @param lineBuffer 行データ
 * @return 判定結果
 */
CMigDataParserItem.IsBlockTerminated = function (lineBuffer) {

	var execResult = CMigDataParserItem.regBlockTerminateData.exec(lineBuffer);

	if (execResult) {
		if (execResult.index == 0) {
			return true;
		}
	}

	return false;
};

/**
 * 定義ブロックの終端でないことを確認する.
 * @param lineBuffer 行データ
 * @return 判定結果
 */
CMigDataParserItem.IsNotBlockTerminated = function (lineBuffer) {
	return !CMigDataParserItem.IsBlockTerminated(lineBuffer);
};





/**
 * アイテム説明文をパースする
 * @param dataId データID（パース内容の補正に使用）
 * @param itemName アイテム名（ログに使用）
 * @param inputtedText パース対象データ
 * @return 結果配列（0:パース情報、1:パース結果データ）
 */
CMigDataParserItem.ParseItemExplain = function (dataId, itemName, inputtedText) {

	var idx = 0;
	var idxLine = 0;
	var idxBlockStart = 0;
	var idxBlockStartWork = 0;
	var idxBlockEndWork = 0;

	var ret = null;
	var msg = "";

	var dtNow = null;
	var dateText = "";

	var inputtedArray = null;

	var bNoTerminator = false;
	var bExplainFinished = false;
	var bStaticDataStarted = false;
	var lineBuffer = "";
	var lineBufferArray = null;
	var blockBuffer = "";
	var bBlockParsed = false;
	var bTryAgain = false;

	var readBuffer = "";
	var translatedDataArray = null;
	var finalizedData = null;

	var matchedTree = null;
	var matchedTreeArray = null;

	var resultParsedArray = null;
	var resultParsedArrayExplain = null;
	var resultParseFailedArray = null;
	var resultParsedInfo = null;
	var resultParsedResult = null;



	resultParsedArray = [];
	resultParsedArrayExplain = [];	// 説明文ブロック用
	resultParseFailedArray = [];



	// 入力データを行ごとに分割して、配列化（簡易整形、末尾へのブロック切り替わり書き込みも行う）
	ret = CMigDataParserItem.splitInputtedArray(inputtedText);

	bNoTerminator = ret[0];
	inputtedArray = ret[1];


	idxBlockStart = -1;
	blockBuffer = "";
	readBuffer = "";
	bExplainFinished = false;
	bStaticDataStarted = false;

	matchedTree = null;
	matchedTreeArray = [];

	// すべての行を順に処理
	for (idxLine = 0; idxLine < inputtedArray.length; idxLine++) {

		if (idxBlockStart < 0) {
			idxBlockStart = idxLine;
			lineBufferArray = [];
		}

		// １行読み込み
		lineBuffer = inputtedArray[idxLine];

		// 空文字列はスキップ
		if (lineBuffer.length == 0) {
			continue;
		}

		// 通常データエリアの場合
		if (!bStaticDataStarted) {

			// 定義ブロックの切り替わりまで読み込む
			// （配列の末尾には、ブロック切り替わりが書き込まれている前提）
			if (!CMigDataParserItem.regBlockTerminateLine.test(lineBuffer)) {
				lineBufferArray.push(lineBuffer);
				continue;
			}
		}

		// 固定情報エリアになっている場合
		else {

			// ブロック切り替わりを削除しつつ、全ブロックを読み込む
			// （配列の末尾には、ブロック切り替わりが書き込まれている前提）
			if (!CMigDataParserItem.regBlockTerminateLine.test(lineBuffer)) {
				lineBufferArray.push(lineBuffer);
			}

			if ((idxLine + 1) < inputtedArray.length) {
				continue;
			}
		}

		// ここに来たら、定義ブロックの切り替わり

		// １行配列が存在しない場合は、読み取りデータをクリアして、次へ
		if (lineBufferArray.length == 0) {
			idxBlockStart = -1;
			continue;
		}

		// マッチツリーを新規に作成
		matchedTree = new CMigRrtSrcMatchedTree();

		// ブロック範囲の初期値を設定
		// （定義ブロック切り替わり識別文字列の行は含まない）
		idxBlockStartWork = idxBlockStart;
		idxBlockEndWork = idxLine - 1;

		// 解析処理
		bBlockParsed = false;
		do {

			// １行配列から、ブロック範囲の要素を切り出し、文字列へ連結
			blockBuffer = lineBufferArray.slice(idxBlockStartWork - idxBlockStart, idxBlockEndWork - idxBlockStart + 1).join("");

			// １行解析
			ret = CMigDataParserItem.AnalyzeLineV2(blockBuffer, matchedTree.Clone());

			// 解析不能だった場合
			bTryAgain = false;
			if (!ret) {
				bTryAgain = true;
			}
			else if (ret[1].length != 0) {
				bTryAgain = true;
			}
			if (bTryAgain) {
				// 旧式の説明文の括弧（「」）が存在する場合は、それを現在の括弧（[]）に置換して、再度解析を試す
				// （マッチャ側で対応すると、処理時間がとてつもなく伸びるのでNG）
				if ((blockBuffer.indexOf("「") >= 0) && (blockBuffer.indexOf("」") >= 0)) {
					ret = CMigDataParserItem.AnalyzeLineV2(blockBuffer.replaceAll("「", "[").replaceAll("」", "]"), matchedTree.Clone());
				}
			}

			// 解析不能だった場合は、ブロック終端を前へずらして、再度解析する
			if (!ret) {
				idxBlockEndWork--;
				continue;
			}

			// 普段は読みづらいので出力しない
			/*
			if (ret[1].length != 0) {
				WriteConsoleLog("ParseItemExplain" + ":" + " [ " + itemName + " ] " + "完全な解析に失敗" + "、" + ret[1] + " >>" + "「" + blockBuffer + "」");
			}
			else {
				WriteConsoleLog("ParseItemExplain" + ":" + " [ " + itemName + " ] " + "解析成功" + "、" + "「" + blockBuffer + "」");
			}
			*/

			// 完全な解析に失敗している場合は、ブロック終端を前へずらして、次へ
			if (ret[1].length != 0) {
				idxBlockEndWork--;
				continue;
			}

			// ここまで来たら、解析成功

			// マッチツリーのポインタを更新
			matchedTree = ret[0];

			// ブロックの開始位置、終了位置を補正する
			idxBlockStartWork = idxBlockEndWork + 1;
			idxBlockEndWork = idxLine - 1;

		} while (idxBlockEndWork >= idxBlockStartWork);

		// ここに来るならば、全部が解析されたか、最小ブロックにまで分解しても解析できなかった状態

		// 成否判定
		bBlockParsed = ((idxBlockEndWork >= idxLine - 1) && (idxBlockStartWork > idxBlockEndWork));

		// 成否状態によって、処理補正


		// 解析に失敗している場合
		if (!bBlockParsed) {

			// TODO: 偶然アイテム説明文がマッチする可能性は考慮していない
			// 失敗しているが、まだ説明文ブロックが終了していない場合、アイテム説明文と判断して出力する
			if (!bExplainFinished) {
				for (idx = 0; idx < lineBufferArray.length; idx++) {
					resultParsedArrayExplain.push(".AddExplain(\"" + lineBufferArray[idx] + "\")");
				}
			}

			// 終端文字列が存在しない古いデータの場合
			else if (bNoTerminator) {

				// 非正規形で分割されていると想定し、挿入された仮の終端文字列を除去して、再度パースする

				// 終端文字列除去
				inputtedArray.splice(idxLine, 1);

				// カーソル再設定
				idxLine = idxBlockStart - 1;
				idxBlockStart = -1;

				continue;
			}

			// それ以外の場合は、単純に解析失敗
			else {
				msg = "ParseItemExplain" + ":" + " [ " + itemName + " ] ";
				msg += "ブロック終了も解析不能";
				msg += "、" + "不能部分" + "「";
				msg += lineBufferArray.slice(idxBlockStartWork - idxBlockStart).join("");
				msg += "」";
				msg += "、" + "ブロック全体" + "「";
				msg += lineBufferArray.join("");
				msg += "」";

				WriteConsoleLog(msg);

				// 失敗データに追記
				resultParseFailedArray.push(lineBufferArray.join(""));
			}
		}

		// 解析に成功している場合は、マッチツリー配列に追加
		else {

			// 一度でも解析に成功した場合は、説明文ブロックは終了したものとみなす。
			bExplainFinished = true;

			// 固定情報にマッチしている場合は、固定情報データ開始フラグを立てる
			if (matchedTree.refMatcher.kind == MIG_RRTSRC_MATCHER_KIND_STATIC) {
				bStaticDataStarted = true;
			}

			// マッチツリー配列に追加
			matchedTreeArray.push(matchedTree.GetRoot());

			// TODO: 元々は下記の判定だったが、これ必要？
			//if (matchedTree.refMatcher !== null) {
			//	matchedTreeArray.push(matchedTree);
			//	matchedTree = null;
			//}

		}

		// 読み取り状況を初期化
		idxBlockStart = -1;
	}



	// V2形式処理

	// 結果を格納している matchedTreeArray の各要素（matchedTree）について、データの正規化を行う
	// （処理の詳細は、当該関数のコメントを参照のこと）
	for (idx = 0; idx < matchedTreeArray.length; idx++) {
		matchedTreeArray[idx].GetRoot().Normalize(dataId, itemName);
	}

	// スクリプト出力
	scriptArrayStatic = [];
	scriptArrayEffect = [];

	for (idx = 0; idx < matchedTreeArray.length; idx++) {
		matchedTreeArray[idx].GetRoot().GetScriptArray(0, scriptArrayStatic, scriptArrayEffect);
	}

	// スクリプトを結合
	resultParsedArray = resultParsedArray.concat(scriptArrayStatic).concat(scriptArrayEffect);


	// パース情報を生成する
	resultParsedInfo = new CMigItemParserParsedInfo();
	resultParsedInfo.bSuccess = (resultParseFailedArray.length == 0);
	resultParsedInfo.failedDataArray = resultParseFailedArray;



	// パース結果を生成する
	resultParsedResult = new CMigItemParserParsedResult();
	resultParsedResult.parsedDataArray = resultParsedArray;
	resultParsedResult.parsedExplainArray = resultParsedArrayExplain;



	// TODO: パース結果出力上書き
if (false) {
	// V2
	stringArray = [];
	for (idx = 0; idx < matchedTreeArray.length; idx++) {
		stringArray = stringArray.concat(matchedTreeArray[idx].GetRoot().toStringArray(0));
	}
	resultParsedResult.parsedDataArray = stringArray;
}


	// 結果を返す
	return [resultParsedInfo, resultParsedResult];
};



/**
 * 入力データを行分割する.
 * @param inputtedText 入力データ
 * @return 結果配列
 */
CMigDataParserItem.splitInputtedArray = function (inputtedText) {

	var idx = 0;

	var inputtedArray = null;
	var inputtedArrayWork = null;

	var lineBuffer = "";
	var lineBufferArray = null;
	var reg = null;
	var bNoTerminator = false;

	var regTextCommas = "(?:(?:,)|(?:，)|(?:、))*";



	// 入力データを行ごとに分割して、配列化
	inputtedArray = inputtedText.split("\n");
	inputtedArrayWork = [];

	// 簡易整形処理を施す
	for (idx = 0; idx < inputtedArray.length; idx++) {

		// １行読み込み
		lineBuffer = inputtedArray[idx];

		// 処理の邪魔になるので、「追加で」「さらに」「また」の言葉を削除（通常のトリム対象カンマ＋"、"の付与もまとめて除去）
		reg = RegExp("\\s*(?:(?:追加で)|(?:さらに)|(?:また))\\s*" + regTextCommas, "ig");
		while (reg.test(lineBuffer)) {
			lineBuffer = lineBuffer.replace(reg, "");
		}

		// 一部の旧式表記で都合の悪い文字列の置換
		lineBuffer = lineBuffer.replaceAll("中,下段", "中下段");
		lineBuffer = lineBuffer.replaceAll(/HP(?:、)SP\s*回復速度\s*([-\+]?\s*\d+%?)/ig, "HP自然回復量$1 SP自然回復量$1");



		// セパレータによる分割
		reg = RegExp("(?:(?:,)|(?:，)|(?:。))", "i");
		lineBufferArray = lineBuffer.split(reg);

		// 作業用配列に追記
		inputtedArrayWork = inputtedArrayWork.concat(lineBufferArray);
	}

	// 作業用配列から上書き
	inputtedArray = inputtedArrayWork;

	// 古いアイテムなどで、ブロック終端データが一切ない場合、
	// 正常にパースできないので、１行１ブロックに分割する
	if (inputtedArray.every(CMigDataParserItem.IsNotBlockTerminated)) {
		bNoTerminator = true;

		inputtedArrayWork = [];
		for (idx = 0; idx < inputtedArray.length; idx++) {
			inputtedArrayWork.push(inputtedArray[idx]);
			inputtedArrayWork.push(CMigDataParserItem.blockTerminateData);
		}
		inputtedArray = inputtedArrayWork;
	}

	// そうでなければ、末尾にダミーのブロック終端データを追加する
	else {
		bNoTerminator = false;

		inputtedArray.push(CMigDataParserItem.blockTerminateData);
	}

	return [bNoTerminator, inputtedArray];
};



/**
 * 入力データを解析する.
 * @param inputted 入力データ
 * @return 結果配列（失敗時は、null）
 */
CMigDataParserItem.AnalyzeLineV2 = function (inputted, matchedTree) {

	var idx = 0;
	var ret = null;
	var retFirst = null;

	var remained = "";

	var regBlankText = /^[\s　]*$/i;

	var funcMatchLoop = function (valueF, indexF, arrayF) {

		var retF = null;

		// 種別がコア／データのものは、対象としない
		switch (valueF.kind) {
		case MIG_RRTSRC_MATCHER_KIND_CORE:
		case MIG_RRTSRC_MATCHER_KIND_DATA:
			return;
		}

		// TODO: 暫定処理、type とか作って
		switch (valueF.id) {
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_TARGET_LIST:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE_V2:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_ENCHANT:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V2:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V3:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V4:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SELECT:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_SLOT_ENCHANT:
		case MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION:
		case MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION_V2:
		case MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION_V3:
		case MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_EFFECT_LIST:
			return;
		}


		// 処理時間削減のため、すでにセット条件でマッチしている場合は、それ以上検査しない
		// （他に該当するマッチャは存在しないと仮定）
		if (retFirst) {
			switch (retFirst.matcherId) {
			case MIG_RRTSRC_CONDITION_MATCHER_EQUIP_WITH_ONE:
			case MIG_RRTSRC_CONDITION_MATCHER_EQUIP_WITH_ALL:
			case MIG_RRTSRC_CONDITION_MATCHER_EQUIP_WITH_ALL_V2:
				return;
			}
		}


		// マッチ実行
		retF = valueF.Match(remained);

		// マッチしていなかったら終了（次へ）
		if (retF == null) {
			return;
		}

		// マッチしたもののうち、最も先頭にあるものを採用する
		// （マッチ位置が同一ならば、全体文字列の長いほうを採用する）
		if (retFirst) {

			// 今回のマッチのほうが後ろの場合は、次へ
			if (retF.index > retFirst.index) {
				return;
			}

			// 今回のマッチ位置が同一の場合
			else if (retF.index == retFirst.index) {
				// マッチした全体文字列の長さが同じか短ければ、次へ
				if (retF.matchedText.length <= retFirst.matchedText.length) {
					return;
				}
			}
		}

		// ここまで来たら、採用すべきマッチ結果として採用してよい
		retFirst = retF;
	};



	remained = inputted;

	do {

		if (regBlankText.test(remained)) {
			break;
		}

		retFirst = null;

		// ライブラリに登録されているマッチャを全処理
		g_MigRrtSrcMatcherLibrary.ForEach(funcMatchLoop);

		// マッチ結果を抽出
		if (retFirst) {

			// マッチ結果をツリーに結合する
			matchedTree = matchedTree.JoinTree(retFirst.matchedTree);

			// 残りの文字列を生成
			remained = retFirst.remainFront + retFirst.remainBack;
		}

	} while (retFirst != null);



	return [matchedTree, remained];
};
