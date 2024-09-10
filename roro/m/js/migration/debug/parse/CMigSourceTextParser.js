// デバッグファイル読み込みチェック
DebugFileIncludeCheck();













/**
 * データソーステキストパーサクラス.
 */
function CMigSourceTextParser () {

	// パースしたデータの解析情報の配列
	this.parsedInfoArray = [];



	/**
	 * パースしたデータの解析情報を取得する.
	 * @param idValue データのID
	 * @return パースしたデータの解析情報（CParsedInfoクラス、失敗時は undefined）
	 */
	this.GetParsedInfo = function (idValue) {

		var idx = 0;

		for (idx = 0; idx < this.parsedInfoArray.length; idx++) {
			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) == idValue) {
				return this.parsedInfoArray[idx];
			}
		}

		return undefined;
	};

	/**
	 * パースしたデータの解析情報を、ID値でソートしたうえで、ループする.
	 * @param funcCallback コールバック関数　(currentValue, index, array)
	 */
	this.ForEachParsedInfoSortedByIdValue = function (funcCallback) {

		var parsedInfoArraySorted = null;

		// ID値でソート
		parsedInfoArraySorted = this.parsedInfoArray.slice();
		parsedInfoArraySorted.sort(
			function(a, b) {
				if (a.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) < b.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID)) return -1;
				if (a.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) > b.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID)) return 1;
				return 0;
			}
		);

		// forEach 呼び出し
		parsedInfoArraySorted.forEach(funcCallback);
	};

	/**
	 * パースしたデータの解析情報の個数を取得する.
	 * @return パースしたデータの解析情報の個数
	 */
	this.GetParsedInfoCount = function () {
		return this.parsedInfoArray.length;
	};



	/**
	 * データソーステキストをパースする（装備用）.
	 * @param dataText パース対象となるデータテキスト
	 * @param dataKind データ種別（RRTSRCファイル読み込み時、省略可）
	 * @param idStr ID定義定数名（RRTSRCファイル読み込み時、省略可）
	 * @param name 名称（RRTSRCファイル読み込み時、省略可）
	 * @param kana 読み仮名（RRTSRCファイル読み込み時、省略可）
	 * @param officialId 公式ID（RRTSRCファイル読み込み時、省略可）
	 * @param idValue ID値（移行途上仕様からのデータ変換時のみ指定、通常は省略）
	 * @param refIdValue 参照ID値（移行途上仕様からのデータ変換時のみ指定、通常は省略）
	 * @param slotCount スロット数（移行途上仕様からのデータ変換時のみ指定、通常は省略）
	 * @return 追加されたデータのID値
	 */
	this.ParseSourceTextEquipables = function (dataText, dataKind, idStr, name, kana, officialId, idValue, refIdValue, slotCount) {

		var idx = 0;
		var idxArray = 0;
		var ret = null;
		var retArray = null;
		var retTarget = null;

		var parsedInfo = null;
		var dataTextArray = null;
		var dataTextBody = "";

		var nameActual = "";
		var dataIdDecided = 0;
		var dataTextEscaped = "";
		var status = false;
		var failedText = "";
		var parsedDataArray = null;
		var explainArray = null;

		var slotCountWorkThis = 0;
		var slotCountWorkRef = 0;

		var regParsedComment = new RegExp("^//(\\S+)\\s?:(.*)$");
		var regParsedCommentSplitter = new RegExp("^//-+$");
		var regSlot = new RegExp("^\\s*(.+)\\s*\\[(\\d)\\]\\s*$");

		var funcModifyAsRefData = function (infoThisF, infoRefF) {

			var idStrWorkF = "";
			var idValueWorkF = 0;

			// 登録済みデータの参照を設定
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR, infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR));
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID, infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID));

			// ID文字列を加工
			idStrWorkF = infoThisF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR);
			idStrWorkF = idStrWorkF.replace(/_S\d$/, "") + "_S" + infoThisF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT);
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR, idStrWorkF);

			// データのIDを再取得
			// TODO: 移行時の処理として、参照IDにオフセットを足し、それを登録する
			idValueWorkF = 40000 + parseInt(infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID), 10);
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID, idValueWorkF);
		};



		// 解析情報を生成
		parsedInfo = new CMigRrtSrcParsedInfo();



		// データテキストに、解析データコメントが含まれている場合、それを読み取る
		dataTextArray = dataText.split(/\r?\n/);
		while (dataTextArray.length > 0) {

			// 解析データコメントのスプリッタ判定
			ret = regParsedCommentSplitter.exec(dataTextArray[0]);
			if (ret) {
				dataTextArray.shift();
				continue;
			}

			// 解析データコメントを正規表現で取り出し
			ret = regParsedComment.exec(dataTextArray[0]);

			// なければ打ち切り
			if (!ret) {
				break;
			}

			// 読み取ったデータを解析情報として保持
			parsedInfo.SetParsedData(ret[1], ret[2]);

			// 必要情報に設定
			switch (ret[1]) {

			// case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION:

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND:
				if (isNaN(ret[2])) {
					dataKind = EnumConstDataKind.GetDefinedValue(ret[2].trim());
				}
				else {
					dataKind = parseInt(ret[2], 10);
				}
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID:
				idValue = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID:
				refIdValue = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID:
				officialId = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR:
				idStr = ret[2];
				break;

			// case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR:

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME:
				name = ret[2];
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA:
				kana = ret[2];
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT:
				slotCount = parseInt(ret[2], 10);
				break;

			}

			// データテキスト１行配列の先頭を削除
			dataTextArray.shift();
		}

		// 解析データコメントを読み取った残りを、データテキストとして結合
		dataTextBody = dataTextArray.join("\n");



		// この時点で、引数で渡されるべきデータが未確定の場合は、異常終了
		if (dataKind === undefined) {
			return -1;
		}
		if (idStr === undefined) {
			return -1;
		}
		if (name === undefined) {
			return -1;
		}
		if (kana === undefined) {
			return -1;
		}
		if (officialId === undefined) {
			return -1;
		}


		// この時点で、確定していないID値には、自動を指定する
		if (idValue === undefined) {
			idValue = -1;
		}
		if (refIdValue === undefined) {
			refIdValue = -1;
		}



		// 入力されたID定義定数文字列を元に、データのIDを決定する
		switch (dataKind) {

		case CONST_DATA_KIND_ITEM:

			// 入力された名称から、名称本体とスロット指定を取得
			if (slotCount === undefined) {
				ret = regSlot.exec(name);
				nameActual = ret[1];
				slotCount = parseInt(ret[2], 10);
			}

			// すでにスロット数が判明している場合は、RRTSRCからの読み込みなので、名称はそのまま使用する
			else {
				nameActual = name;
			}

			// データID決定
			dataIdDecided = g_constDataManager.itemDataManager.RegisterId(idStr, idValue);
			break;

		case CONST_DATA_KIND_ARROW:

			// 名称本体とスロット指定を決定
			nameActual = name;
			slotCount = 0;

			// データID決定
			dataIdDecided = g_constDataManager.arrowDataManager.RegisterId(idStr, idValue);
			break;

		}



		// パース用のエスケープ処理
		dataTextEscaped = this.EscapeInput(dataTextBody);

		// パース処理
		status = PARSED_INFO_STATUS_FAILED;
		failedText = "";
		parsedDataArray = [];
		explainArray = [];

		// 参照指定がない場合
		if (refIdValue < 0) {

			// パース処理呼び出し
			switch (dataKind) {

			case CONST_DATA_KIND_ITEM:
			case CONST_DATA_KIND_ARROW:
				ret = CMigDataParserItem.ParseItemExplain(dataIdDecided, nameActual, dataTextEscaped);
				break;
			}

			// 結果データ加工
			if (ret) {
				// パース結果を連結
				status = (ret[0].bSuccess ? PARSED_INFO_STATUS_SUCCEEDED : PARSED_INFO_STATUS_FAILED);
				failedText = ret[0].failedDataArray.join("\r\n");
				parsedDataArray = ret[1].parsedDataArray;
				explainArray = ret[1].parsedExplainArray;
			}

		}

		// 参照指定がある場合
		else {
			// 結果データ加工
			status = PARSED_INFO_STATUS_SUCCEEDED;
		}



		// 解析情報を生成し、情報を設定する
		parsedInfo.status = status;
		parsedInfo.statusDetailText = failedText;
		parsedInfo.dataTextSrc = dataTextBody;
		parsedInfo.parsedDataArray = parsedDataArray;
		parsedInfo.parsedExplainArray = explainArray;

		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND, dataKind);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR, idStr);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME, nameActual);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA, kana);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT, slotCount);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID, officialId);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID, dataIdDecided);



		// 参照指定がある場合（アイテムでしか発生しない前提）
		if (refIdValue >= 0) {

			// 登録済みデータを検索してデータを修正する
			for (idx = 0; idx < this.parsedInfoArray.length; idx++) {

				if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) != refIdValue) {
					continue;
				}

				// ここまでくれば、参照すべきデータ
				funcModifyAsRefData(parsedInfo, this.parsedInfoArray[idx]);

				break;
			}

			// 起きないハズ
			if (idx >= this.parsedInfoArray.length) {
				alert("参照ID指定があるも、参照先のデータが未登録");
			}
		}



		// すでに登録済みのデータでないかを検索する
		for (idx = 0; idx < this.parsedInfoArray.length; idx++) {

			bMissmatchSlot = false;

			// 一致必須項目
			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND) != parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND)) {
				continue;
			}

			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME) != parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME)) {
				continue;
			}

			if (this.parsedInfoArray[idx].parsedDataArray.length != parsedInfo.parsedDataArray.length) {
				continue;
			}

			// スロット数のみが異なる同一のアイテムでないかを判定する
			slotCountWorkTarget = this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT);
			slotCountWorkCurrent = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT);

			if (slotCountWorkTarget === slotCountWorkCurrent) {

				// スロット数が同一の場合、他の何かのデータが異なる場合は、別のアイテムとして処理する
				if (!parsedInfo.IsSameData(this.parsedInfoArray[idx], false, false)) {
					continue;
				}
			}
			else {

				// 参照指定が未特定の場合
				if (refIdValue < 0) {

					// スロット数のみが異なる同一アイテムの場合、参照指定を保持して、別のアイテムとして処理する
					if (parsedInfo.IsSameData(this.parsedInfoArray[idx], true, true)) {

						parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID, this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID));
						parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR, this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR));
						refIdValue = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID);

						parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID, 40000 + this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID));
						parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR, this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR) + "_S" + slotCountWorkCurrent);

						continue;
					}
				}

				// 参照指定がある場合
				else {

					// TODO: 未対応
					// 指定のアイテムでない場合は、ログ出力
					if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) != refIdValue) {
					}

					// 全ケースで、別アイテムとして処理
					continue;
				}
			}

			// 登録済みデータがエラーで、登録するデータが正常の場合は、上書を許可する
			//if ((this.parsedInfoArray[idx].status == PARSED_INFO_STATUS_FAILED) && (parsedInfo.status == PARSED_INFO_STATUS_SUCCEEDED)) {
			//}
			//else {
			//	// ここに来るならば、完全同一の登録済みデータがある
			//}

			// データを上書きする
			this.parsedInfoArray[idx] = parsedInfo;

			// 処理終了
			break;
		}

		// 登録済みでなければ、配列へ追記
		if (idx >= this.parsedInfoArray.length) {
			this.parsedInfoArray.push(parsedInfo);
		}



		// 追加されたデータのID値を返す
		return parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID);
	};



	/**
	 * データソーステキストをパースする（エンチャントリスト用）.
	 * @param dataText パース対象となるデータテキスト
	 * @param idStr ID定義定数名（RRTSRCファイル読み込み時、省略可）
	 * @param targetStr 対象リスト（RRTSRCファイル読み込み時、省略可）
	 * @param explainStr 説明リスト（RRTSRCファイル読み込み時、省略可）
	 * @param slotDataArray 各スロットのデータ（RRTSRCファイル読み込み時、省略可）
	 * @return 追加されたデータのID値
	 */
	this.ParseSourceTextEnchList = function (dataText, dataKind, idStr, name, kana, targetStr, explainStr, slotDataArray) {

		var idx = 0;
		var idxSlot = 0;
		var idxArray = 0;
		var ret = null;
		var retArray = null;
		var retTarget = null;

		var idValue = 0;

		var parsedInfo = null;
		var dataTextArray = null;
		var dataTextBody = "";

		var nameActual = "";
		var dataIdDecided = 0;
		var status = false;
		var failedText = "";
		var splittedTargetStr = null;
		var fileNameAlias = "";
		var parsedDataArray = null;
		var explainArray = null;

		var slotCountWorkThis = 0;
		var slotCountWorkRef = 0;

		var regParsedComment = new RegExp("^//(\\S+)\\s?:(.*)$");
		var regParsedCommentSplitter = new RegExp("^//-+$");
		var regSlot = new RegExp("^\\s*(.+)\\s*\\[(\\d)\\]\\s*$");

		var funcModifyAsRefData = function (infoThisF, infoRefF) {

			var idStrWorkF = "";
			var idValueWorkF = 0;

			// 登録済みデータの参照を設定
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR, infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR));
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID, infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID));

			// ID文字列を加工
			idStrWorkF = infoThisF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR);
			idStrWorkF = idStrWorkF.replace(/_S\d$/, "") + "_S" + infoThisF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT);
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR, idStrWorkF);

			// データのIDを再取得
			// TODO: 移行時の処理として、参照IDにオフセットを足し、それを登録する
			idValueWorkF = 40000 + parseInt(infoRefF.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID), 10);
			infoThisF.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID, idValueWorkF);
		};



		// 初期設定
		idValue = undefined;



		// 解析情報を生成
		parsedInfo = new CMigRrtSrcParsedInfo();



		// データテキストに、解析データコメントが含まれている場合、それを読み取る
		dataTextArray = dataText.split(/\r?\n/);
		while (dataTextArray.length > 0) {

			// 解析データコメントのスプリッタ判定
			ret = regParsedCommentSplitter.exec(dataTextArray[0]);
			if (ret) {
				dataTextArray.shift();
				continue;
			}

			// 解析データコメントを正規表現で取り出し
			ret = regParsedComment.exec(dataTextArray[0]);

			// なければ打ち切り
			if (!ret) {
				break;
			}

			// 読み取ったデータを解析情報として保持
			parsedInfo.SetParsedData(ret[1], ret[2]);

			// 必要情報に設定
			switch (ret[1]) {

			// case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_VERSION:

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND:
				if (isNaN(ret[2])) {
					dataKind = EnumConstDataKind.GetDefinedValue(ret[2].trim());
				}
				else {
					dataKind = parseInt(ret[2], 10);
				}
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID:
				idValue = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID:
				refIdValue = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID:
				officialId = parseInt(ret[2], 10);
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR:
				idStr = ret[2];
				break;

			// case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR:

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME:
				name = ret[2];
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA:
				kana = ret[2];
				break;

			case CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT:
				slotCount = parseInt(ret[2], 10);
				break;

			}

			// データテキスト１行配列の先頭を削除
			dataTextArray.shift();
		}

		// 解析データコメントを読み取った残りを、データテキストとして結合
		dataTextBody = dataTextArray.join("\r\n");



		// この時点で、引数で渡されるべきデータが未確定の場合は、異常終了
		if (dataKind === undefined) {
			return -1;
		}
		if (idStr === undefined) {
			return -1;
		}
		if (name === undefined) {
			return -1;
		}
		if (kana === undefined) {
			return -1;
		}



		// この時点で、確定していないID値には、自動を指定する
		if (idValue === undefined) {
			idValue = -1;
		}


		// 入力されたID定義定数文字列を元に、データのIDを決定する
		switch (dataKind) {

		case CONST_DATA_KIND_ENCHANT_LIST:

			// データID決定
			dataIdDecided = g_constDataManager.enchListDataManager.RegisterId(idStr, idValue);
			break;

		}



		// パース処理
		status = PARSED_INFO_STATUS_FAILED;
		failedText = "";
		parsedDataArray = [];
		explainArray = [];

		switch (dataKind) {

		case CONST_DATA_KIND_ENCHANT_LIST:

			// フォームからの入力
			if (dataTextBody.length == 0) {

				// スロット配列のエスケープ処理
				for (idxSlot = 0; idxSlot < slotDataArray.length; idxSlot++) {
					slotDataArray[idxSlot][0] = this.EscapeInput(slotDataArray[idxSlot][0]);
					slotDataArray[idxSlot][1] = this.EscapeInput(slotDataArray[idxSlot][1]);
				}

				// パース処理呼び出し
				ret = CMigDataParserEnchList.ParseEnchListExplain(
					dataIdDecided,
					this.EscapeInput(targetStr),
					slotDataArray
				);
			}

			// RRTSRC からの読み込み
			else {
				// パース処理呼び出し
				ret = CMigDataParserEnchList.ParseEnchListExplain(dataIdDecided, dataTextBody);
			}

			// 結果データ加工
			if (ret) {
				status = (ret[0].bSuccess ? PARSED_INFO_STATUS_SUCCEEDED : PARSED_INFO_STATUS_FAILED);
				failedText = ret[0].failedDataArray.join("\r\n");
				parsedDataArray = ret[1].parsedDataArray;
				explainArray = ret[1].parsedExplainArray;
			}

			break;
		}



		// ファイル名用のエイリアスを生成する
		fileNameAlias = name;

		if (targetStr) {

			splittedTargetStr = targetStr.split(/\r*\n/);

			if (splittedTargetStr.length > 0) {
				fileNameAlias = name + "@" + splittedTargetStr[0].replace(/\[.*$/, "");
			}
		}





		// 解析情報を生成し、情報を設定する
		parsedInfo.status = status;
		parsedInfo.statusDetailText = failedText;
		if (dataTextBody.length > 0) {
			parsedInfo.dataTextSrc = dataTextBody;
		}
		else {
			parsedInfo.dataTextSrc = targetStr.replace(/(?:\r*\n)+$/, "").replace(/[\s　]+$/, "") + "\r\n";
			parsedInfo.dataTextSrc += CMigDataParserEnchList.blockTerminateData + "\r\n";
			if (explainStr.length > 0) {
				parsedInfo.dataTextSrc += explainStr.replace(/(?:\r*\n)+$/, "").replace(/[\s　]+$/, "") + "\r\n";
			}
			parsedInfo.dataTextSrc += CMigDataParserEnchList.blockTerminateData + "\r\n";
			for (idx = 0; idx < slotDataArray.length; idx++) {
				if ((slotDataArray[idx][0].length != 0) && (slotDataArray[idx][1].length != 0)) {
					parsedInfo.dataTextSrc += slotDataArray[idx][0].replace(/(?:\r*\n)+$/, "").replace(/[\s　]+$/, "") + "\r\n";
					parsedInfo.dataTextSrc += slotDataArray[idx][1].replace(/(?:\r*\n)+$/, "").replace(/[\s　]+$/, "") + "\r\n";
				}
			}
		}
		parsedInfo.parsedDataArray = parsedDataArray;
		parsedInfo.parsedExplainArray = explainArray;

		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND, dataKind);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR, idStr);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME, name);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA, kana);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID, dataIdDecided);
		parsedInfo.SetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA_ALIAS, fileNameAlias);



		// すでに登録済みのデータでないかを検索する
		for (idx = 0; idx < this.parsedInfoArray.length; idx++) {

			bMissmatchSlot = false;

			// 一致必須項目
			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND) != parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND)) {
				continue;
			}

			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME) != parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME)) {
				continue;
			}

			if (this.parsedInfoArray[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA) != parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA)) {
				continue;
			}

			// 登録済みデータがエラーで、登録するデータが正常の場合は、上書を許可する
			if ((this.parsedInfoArray[idx].status == PARSED_INFO_STATUS_FAILED) && (parsedInfo.status == PARSED_INFO_STATUS_SUCCEEDED)) {
			}
			else {

				if (this.parsedInfoArray[idx].parsedDataArray.length != parsedInfo.parsedDataArray.length) {
					continue;
				}

				for (idxArray = 0; idxArray < this.parsedInfoArray[idx].parsedDataArray.length; idxArray++) {
					if (this.parsedInfoArray[idx].parsedDataArray[idxArray] != parsedInfo.parsedDataArray[idxArray]) {
						break;
					}
				}
				if (idxArray < this.parsedInfoArray[idx].parsedDataArray.length) {
					continue;
				}

				// ここに来るならば、完全同一の登録済みデータがある
			}

			// データを上書きする
			this.parsedInfoArray[idx] = parsedInfo;

			// 処理終了
			break;
		}

		// 登録済みでなければ、配列へ追記
		if (idx >= this.parsedInfoArray.length) {
			this.parsedInfoArray.push(parsedInfo);
		}



		// 追加されたデータのID値を返す
		return parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID);
	};



	/**
	 * 入力内容のエスケープ.
	 */
	this.EscapeInput = function (inputted) {

		var ret = null;

		var reg = null;
		var escaped = "";
		var lastIndex = 0;

		var targetString = "\"";
		var escapeChar = "\\";



		lastIndex = 0;
		escaped = inputted;

		// 正規表現の生成
		reg = new RegExp("(" + targetString + ")");

		// 全置換
		do {
			ret = reg.exec(escaped.slice(lastIndex));

			if (!ret) {
				break;
			}

			escaped = escaped.slice(0, lastIndex) + escaped.slice(lastIndex, lastIndex + ret.index) + escapeChar + ret[1] + escaped.substring(lastIndex + ret.index + ret[1].length);

			lastIndex += ret.index + escapeChar.length + ret[1].length;

		} while (lastIndex < escaped.length);

		return escaped;
	};



	/**
	 * パースした情報配列をもとに、js コードを生成する.
	 */
	this.MakeJsText = function (dataKind) {

		var idx = 0;
		var ret = null;

		var parsedInfoArraySorted = null;
		var jsTextIdArea = "";
		var jsTextDataArea = "";

		// ID値でソート
		parsedInfoArraySorted = this.parsedInfoArray.slice();
		parsedInfoArraySorted.sort(
			function(a, b) {
				if (a.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) < b.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID)) return -1;
				if (a.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) > b.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID)) return 1;
				return 0;
			}
		);

		// 先頭から順に出力
		for (idx = 0; idx < parsedInfoArraySorted.length; idx++) {

			// データ種別が異なる場合は、次へ
			if (parsedInfoArraySorted[idx].GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND) != dataKind) {
				continue;
			}

			// 出力
			ret = this.MakeJsTextSub(parsedInfoArraySorted[idx]);

			// それぞれの領域に追記
			jsTextIdArea += ret[0] + "\r\n";
			jsTextDataArea += ret[1] + "\r\n" + "\r\n".repeat(3);
		}

		// データがなかった場合は、空文字列を返す
		if ((jsTextIdArea.length == 0) && (jsTextDataArea.length == 0)) {
			return "";
		}

		return ("\t// ID定数登録" + "\r\n" + jsTextIdArea + "\r\n".repeat(3) + jsTextDataArea);
	};

	/**
	 * パースした情報配列をもとに、js コードを生成する（サブ関数）.
	 */
	this.MakeJsTextSub = function (parsedInfo) {

		var idx = 0;

		var makeDataClassName = "";
		var managerCode = "";

		var dtNow = null;
		var dateStr = "";

		var jsTextId = "";
		var jsTextArray = null;



		// クラス名、データ定義マネージャを示す文字列等の特定
		switch (parseInt(parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KIND), 10)) {

		case CONST_DATA_KIND_ITEM:
			makeDataClassName = "CMigItemMakeData";
			managerCode = "g_constDataManager.itemDataManager";
			break;

		case CONST_DATA_KIND_ARROW:
			makeDataClassName = "CMigArrowMakeData";
			managerCode = "g_constDataManager.arrowDataManager";
			break;

		case CONST_DATA_KIND_ENCHANT_LIST:
			makeDataClassName = "CMigEnchListDataMakeInfo";
			managerCode = "g_constDataManager.enchListDataManager";
			break;

		}



		// ID定義部の出力
		jsTextId = "\t" + managerCode + ".RegisterId(\"" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR) + "\", " + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATA_ID) + ");";



		// データ定義部の出力
		jsTextArray = [];

		// 固定情報の出力
		jsTextArray.push(".SetId(" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR) + ")");
		if (parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID) !== undefined) {
			jsTextArray.push(".SetOfficialId(" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_OFFICIAL_ID) + ")");
		}

		// 参照形式の場合
		if (parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID) !== undefined) {

			// 参照情報を出力
			jsTextArray.push(".SetRefId(" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_REF_ID_STR) + ")");

			// スロット情報を出力
			jsTextArray.push(".SetSlot(" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT) + ")");
		}

		// 通常形式の場合
		else {

			// 名称を出力
			jsTextArray.push(".AddNameKana(\"" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_NAME) + "\", \"" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_KANA) + "\")");

			// スロット情報を出力
			if (parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT) !== undefined) {
				jsTextArray.push(".SetSlot(" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_SLOT) + ")");
			}

			// データ定義本体を出力
			jsTextArray = jsTextArray.concat(parsedInfo.parsedDataArray);

			// 説明文定義を出力
			jsTextArray = jsTextArray.concat(parsedInfo.parsedExplainArray);
		}



		// 全体をインデントして、インスタンス定義を追加
		for (idx = 0; idx < jsTextArray.length; idx++) {
			jsTextArray[idx] = "\t\t" + jsTextArray[idx];
		}
		jsTextArray.unshift("\tdataArray[" + parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_ID_STR) + "] = new " + makeDataClassName + "()");
		jsTextArray.push("\t\t.ToArrayData()");
		jsTextArray.push("\t;");

		// さらに先頭にコメントを追記
		dateText = parsedInfo.GetParsedData(CMigRrtSrcParsedInfo.PARSED_DATA_KEY_DATE);
		if (dateText === undefined) {
			dtNow = new Date();

			dateText = dtNow.getFullYear();
			dateText += "/" + ("0" + (dtNow.getMonth() + 1)).slice(-2);
			dateText += "/" + ("0" + dtNow.getDate()).slice(-2);
		}
		jsTextArray.unshift("\t// パーサにより変換" + "(SrcDate : " + dateText + ")");



		// 文字列にして返す
		return [jsTextId, jsTextArray.join("\r\n")];
	};




}







