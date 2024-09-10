
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();




CGlobalConstManager.DefineEnum(
	"EnumMigEnchListInfo",
	[
		"MIG_ENCH_LIST_INFO_NONE",

		"MIG_ENCH_LIST_INFO_POS_NTH_ENCHANT",
		"MIG_ENCH_LIST_INFO_POS_NTH_SLOT",
		"MIG_ENCH_LIST_INFO_POS_NTH_SELECT",

		"MIG_ENCH_LIST_INFO_CONDITION_REFINE_UNDER",
		"MIG_ENCH_LIST_INFO_CONDITION_REFINE_OVER",
	],
	0,
	1
);
CGlobalConstManager.DefinePseudoEnum(
	"EnumMigEnchListInfo",
	[
		"MIG_ENCH_LIST_INFO_COUNT",
	],
	EnumMigEnchListInfo.Count,
	1
);







/**
 * エンチャントリストパーサパース情報クラス.
 */
function CMigEnchListParserParsedInfo () {

	// 成否
	this.bSuccess = false;

	// パース失敗データ配列
	this.failedDataArray = [];
}

/**
 * エンチャントリストパーサパース結果クラス.
 */
function CMigEnchListParserParsedResult () {

	// パース結果データ配列
	this.parsedDataArray = [];

	// パース結果説明文配列
	this.parsedExplainArray = [];
}




/**
 * データパーサクラス.
 */
function CMigDataParserEnchList () {

}

/**
 * 定義ブロック終端記号.
 */
CMigDataParserEnchList.blockTerminateChar = String.fromCodePoint(0x2015);
CMigDataParserEnchList.blockTerminateCharAliases = [CMigDataParserEnchList.blockTerminateChar, String.fromCodePoint(0x2500)];
CMigDataParserEnchList.GetRegTextBlockTerminateCharAliases = function () {

	let idx = 0;
	let num = null;

	let regText = "[";

	for (idx = 0; idx < CMigDataParserEnchList.blockTerminateCharAliases.length; idx++) {
		num = new Number(CMigDataParserEnchList.blockTerminateCharAliases[idx].codePointAt(0));
		regText += "\\u" + ("0000" + num.toString(16)).slice(-4);
	}

	regText += "]";

	return regText;
};

/**
 * 定義ブロック終端データ.
 */
CMigDataParserEnchList.blockTerminateData = CMigDataParserEnchList.blockTerminateChar.repeat(8);
CMigDataParserEnchList.regBlockTerminateData = new RegExp(CMigDataParserEnchList.GetRegTextBlockTerminateCharAliases() + "{8,}");
CMigDataParserEnchList.regBlockTerminateLine = new RegExp("^" + CMigDataParserEnchList.GetRegTextBlockTerminateCharAliases() + "+$");

/**
 * 定義ブロックの終端かを判定する.
 * @param lineBuffer 行データ
 * @return 判定結果
 */
CMigDataParserEnchList.IsBlockTerminated = function (lineBuffer) {

	var execResult = CMigDataParserEnchList.regBlockTerminateData.exec(lineBuffer);

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
CMigDataParserEnchList.IsNotBlockTerminated = function (lineBuffer) {
	return !CMigDataParserEnchList.IsBlockTerminated(lineBuffer);
};





/**
 * エンチャントリスト説明文をパースする
 * @param dataId データID（パース内容の補正に使用）
 * @param targetStr 対象文字列
 * @param slotDataArray スロットごとのデータ配列
 * @return 結果配列（0:パース情報、1:パース結果データ）
 */
CMigDataParserEnchList.ParseEnchListExplain = function (dataId, targetStr, slotDataArray) {

	var idx = 0;
	var idxLine = 0;
	var idxBlockStart = 0;

	var ret = null;

	var dtNow = null;
	var dateText = "";

	var inputtedArray = null;

	var lineBuffer = "";
	var blockBuffer = "";
	var readBuffer = "";
	var analyzedDataArray = null;
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



	// データ統合（簡易整形も行う）
	inputtedArray = CMigDataParserEnchList.splitInputtedList(targetStr, slotDataArray);



	idxBlockStart = -1;
	blockBuffer = "";
	readBuffer = "";
	analyzedDataArray = [];

	matchedTree = null;
	matchedTreeArray = [];

	// すべての行を順に処理
	for (idxLine = 0; idxLine < inputtedArray.length; idxLine++) {

		if (idxBlockStart < 0) {
			idxBlockStart = idxLine;
		}

		// １行読み込み
		lineBuffer = inputtedArray[idxLine];

		// 空文字列はスキップ
		if (lineBuffer == "") {
			continue;
		}

		// 定義ブロックの切り替わりの場合
		if (CMigDataParserEnchList.IsBlockTerminated(lineBuffer)) {

			// 読み残しバッファが空の場合、処理なし
			if (readBuffer == "") {
			}

			// 読み残しがあるが、先頭ブロックの場合（アイテム説明文と判断）
			else if (idxBlockStart == 0) {
				// 元の改行位置を保ったまま、専用の配列に追加する
				for (idx = idxBlockStart; idx < idxLine; idx++) {
					resultParsedArrayExplain.push(".AddExplain(\"" + inputtedArray[idx] + "\")");
				}
				readBuffer = "";
			}

			// それ以外で読み残しがある場合は、全体を失敗とする
			else {
				WriteConsoleLog("ParseEnchListExplain" + ":" + "ブロック終了も解析不能" + "、" + "「" + readBuffer + "」");
				readBuffer = blockBuffer;
			}

			// 読み残しバッファが空でない場合、パース失敗データに登録
			if (readBuffer != "") {
				resultParseFailedArray.push(readBuffer);
			}

			// 各バッファを空にして、次へ
			idxBlockStart = -1;
			blockBuffer = "";
			readBuffer = "";
			analyzedDataArray = [];

			// TODO: テスト中
			if (matchedTree) {
				if (matchedTree.refMatcher !== null) {
					matchedTreeArray.push(matchedTree);
					matchedTree = null;
				}
			}
			continue;
		}

		// ブロックバッファに記録
		blockBuffer += lineBuffer;

		// 読み残しバッファと連結
		lineBuffer = readBuffer + lineBuffer;

		// V2形式処理

		// 処理中のマッチツリーがない場合は新規に作成
		if (!matchedTree) {
			matchedTree = new CMigRrtSrcMatchedTree();
		}

		// １行解析
		ret = CMigDataParserEnchList.AnalyzeLine(lineBuffer, matchedTree.Clone());

		// 解析不能だった場合は、読み残しバッファを更新して、次へ
		if (!ret) {
			readBuffer = lineBuffer;
			continue;
		}

		// 完全な解析に失敗している場合は、読み残しバッファを更新して、次へ
		if (ret[1] != "") {
			// 普段は紛らわしいので出力しない
			WriteConsoleLog("ParseEnchListExplain" + ":" + "完全な解析に失敗" + "、" + "「" + lineBuffer + "」");
			readBuffer = lineBuffer;
			continue;
		}

		// 成功した場合は、読み残しバッファをクリア
		readBuffer = "";

		// ツリーのポインタを更新
		matchedTree = ret[0];
	}



	// 結果を格納している matchedTreeArray の各要素（matchedTree）について、データの正規化を行う
	// （処理の詳細は、当該関数のコメントを参照のこと）
	for (idx = 0; idx < matchedTreeArray.length; idx++) {
		matchedTreeArray[idx].GetRoot().Normalize(dataId, "");
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



	// 結果を返す
	return [resultParsedInfo, resultParsedResult];

}



/**
 * 入力データを分割する.
 * @param inputtedText 入力データ
 * @return 結果配列
 */
CMigDataParserEnchList.splitInputtedList = function (targetStr, slotDataArray) {

	var idx = 0;

	var splitted = null;
	var splittedWork = null;
	var splittedTarget = null;

	var regExpBraced = /^\s*\[[^\[]+(?:\[\d+\])?\]\s*$/i;


	// 対象データの統合
	splitted = [];

	splitted.push(CMigDataParserEnchList.blockTerminateData);

	// フォームからの入力の場合
	if (slotDataArray !== undefined) {

		// 対象リスト
		splittedTarget = targetStr.split(/\r*\n/);

		// すべての対象に強制的に括弧を付与する
		for (idx = 0; idx < splittedTarget.length; idx++) {
			if (splittedTarget[idx].length == 0) {
				continue;
			}
			if (!regExpBraced.test(splittedTarget[idx])) {
				splittedTarget[idx] = "[" + splittedTarget[idx] + "]";
			}
		}

		splitted = splitted.concat(splittedTarget);

		// エンチャント効果リスト
		for (idx = 0; idx < slotDataArray.length; idx++) {
			if ((slotDataArray[idx][0].length == 0) || (slotDataArray[idx][1].length == 0)) {
				continue;
			}
			splitted = splitted.concat(slotDataArray[idx][0].split(/\r*\n/));
			splitted = splitted.concat(slotDataArray[idx][1].split(/\r*\n/));
		}
	}

	// RRTSRC ファイルから
	else {
		splittedWork = targetStr.split(CMigDataParserEnchList.blockTerminateData);

		// 対象リスト
		splittedTarget = splittedWork[0].split(/\r*\n/);

		// すべての対象に強制的に括弧を付与する
		for (idx = 0; idx < splittedTarget.length; idx++) {
			if (splittedTarget[idx].length == 0) {
				continue;
			}
			if (!regExpBraced.test(splittedTarget[idx])) {
				splittedTarget[idx] = "[" + splittedTarget[idx] + "]";
			}
		}

		splitted = splitted.concat(splittedTarget);

		// エンチャント効果リスト
		splitted = splitted.concat(splittedWork[2].split(/\r*\n/));
	}


	splitted.push(CMigDataParserEnchList.blockTerminateData);


	// トリミング
	for (idx = 0; idx < splitted.length; idx++) {
		splitted[idx] = splitted[idx].replace(/^[\s　]+/, "").replace(/[\s　]+$/, "").replace(/\[\d+\]$/, "");
	}

	return splitted;
};



/**
 * 入力データを解析する.
 * @param inputted 入力データ
 * @return 結果配列（失敗時は、null）
 */
CMigDataParserEnchList.AnalyzeLine = function (inputted, matchedTree) {

	var idx = 0;
	var ret = null;
	var retFirst = null;

	var remained = "";

	var regBlankText = /^[\s　]*$/i;

	var matcherIdList = [
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_TARGET_LIST,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_STAGE_V2,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_ENCHANT,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V2,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V3,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SLOT_V4,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_NTH_SELECT,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_POSITION_SLOT_ENCHANT,
		MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION,
		MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION_V2,
		MIG_RRTSRC_LIST_DATA_MATCHER_REFINE_CONDITION_V3,
		MIG_RRTSRC_LIST_DATA_MATCHER_ENCHANT_EFFECT_LIST,
	];

	var funcMatchLoop = function (valueF, indexF, arrayF) {

		var retF = null;
		var matcherF = null;

		matcherF = g_MigRrtSrcMatcherLibrary.Get(valueF);

		// 種別がコア／データのものは、対象としない
		switch (matcherF.kind) {
		case MIG_RRTSRC_MATCHER_KIND_CORE:
		case MIG_RRTSRC_MATCHER_KIND_DATA:
			return;
		}

		// マッチ実行
		retF = matcherF.Match(remained);

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

		// 使用候補のマッチャを全処理
		matcherIdList.forEach(funcMatchLoop);

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

