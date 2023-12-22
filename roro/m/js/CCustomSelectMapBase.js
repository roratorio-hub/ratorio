




/**
 * カスタムセレクトクラス（マップ基底）.
 */
function CCustomSelectMapBase () {



	/**
	 * イニシャライザ.
	 * @param instanceIdName インスタンスID名
	 * @param extractTitle 展開エリアタイトル
	 */
	this.Initialize = function (instanceIdName, extractTitle) {

		// 基底クラスのイニシャライザをコール
		CCustomSelectMapBase.prototype.Initialize.call(this, instanceIdName, extractTitle);

	};



	/**
	 * データ選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSub = function () {

		var idx = 0;

		var dataArraySorted = null;
		var dataObject = null;
		var dataId = 0;
		var dataName = 0;
		var candidateDataId = 0;



		// データ配列を取得
		dataArraySorted = this.RebuildSelectDataSubGetDataArray();

		// 選択肢全削除
		HtmlRemoveOptionAll(this.objSelectData);

		// 候補検索用変数を初期化
		candidateDataId = -1;

		// データ追加
		for (idx = 0; idx < dataArraySorted.length; idx++) {

			// マップデータ取得
			dataObject = dataArraySorted[idx];

			// フィルタに適合していない場合は、次へ
			if (!this.RebuildSelectDataSubDataFilter(dataObject)) {
				continue;
			}

			// マップID取得
			dataId = dataObject[MONSTER_MAP_DATA_INDEX_ID];

			// マップ名取得
			dataName = dataObject[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME];

			// 選択肢追加
			HtmlCreateElementOption(dataId, dataName, this.objSelectData);

			// 選択するマップIDの調整
			if (candidateDataId < 0) {
				candidateDataId = dataId;
			}
			else if (dataId == this.selectedDataId) {
				candidateDataId = dataId;
			}
		}

		// 選択するIDを調整
		this.selectedDataId = candidateDataId;

		// IDを設定
		this.objSelectData.value = this.selectedDataId
	};

	/**
	 * データ選択コントロール用データ配列取得関数.
	 * @param dataArray データ配列
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSubGetDataArray = function () {
		return [];
	};

	/**
	 * データ選択コントロール用フィルタ関数.
	 * @param dataObject データオブジェクト
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSubDataFilter = function (dataObject) {
		return true;
	};



	/**
	 * ソート選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectSortSub = function () {

		// 選択肢全削除
		HtmlRemoveOptionAll(this.objSelectSort);

		HtmlCreateElementOption(0, "五十音順", this.objSelectSort);
		HtmlCreateElementOption(1, "登録順", this.objSelectSort);

		// 選択するIDを調整
		this.selectedSortId = parseInt(this.objSelectSort.value, 10);
	};



	/**
	 * 検索結果コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSearchResultSub = function () {

		var idx = 0;
		var idxName = 0;
		var idxReg = 0;

		var regSearch = null;
		var regSearchArray = null;
		var regSearchKana = null;

		var translatedAlias = "";
		var options = null;
		var candidateResultId = 0;
		var dataId = 0;
		var dataObject = null;
		var dataNameKanaArray = null;
		var dataNameKana = null;
		var dataName = 0;
		var dataKana = 0;



		// 選択肢全削除
		HtmlRemoveOptionAll(this.objSearchResult);

		// 検索入力が未入力の場合は、処理終了
		if (this.inputtedSearchText == "") {
			this.selectedSearchResult = -1;
			return;
		}

		// 候補検索用変数を初期化
		candidateResultId = -1;

		// 検索マッチング正規表現オブジェクトを生成
		regSearchArray = [];
		regSearchArray.push(new RegExp(this.inputtedSearchText, "i"));
		translatedAlias = TranslateAlias(this.inputtedSearchText);
		if (translatedAlias != "") {
			regSearchArray.push(new RegExp(translatedAlias, "i"));
		}
		regSearchKana = CCustomSelectBase.CreateKanaSearchRegExp(this.inputtedSearchText);

		// データ選択セレクトボックスの選択肢配列を取得
		options = this.objSelectData.options;

		// 全ての選択肢をループ
		for (idx = 0; idx < options.length; idx++) {

			// データIDを取得
			dataId = parseInt(options[idx].value, 10);

			// データオブジェクト取得
			dataObject = this.GetMonsterMapData(dataId);

			// 名称カナデータ配列を取得
			dataNameKanaArray = dataObject[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY];

			// 全ての名称カナデータ配列を検索テキストでマッチング
			for (idxName = 0; idxName < dataNameKanaArray.length; idxName++) {

				// 名称カナデータを取得
				dataNameKana = dataNameKanaArray[idxName];
				dataName = dataNameKana[NAME_KANA_DATA_INDEX_NAME];
				dataKana = dataNameKana[NAME_KANA_DATA_INDEX_KANA];

				// 全ての正規表現をテスト
				for (idxReg = 0; idxReg < regSearchArray.length; idxReg++) {
					if (regSearchArray[idxReg].test(dataName)) {
						break;
					}
				}

				// 合致していたら、処理打ち切り
				if (idxReg < regSearchArray.length) {
					break;
				}

				// 読み仮名検索可能な場合はそちらも試行し、合致していたら、処理打ち切り
				if (regSearchKana) {
					if (regSearchKana.test(dataKana)) {
						break;
					}
				}
			}

			// マッチしていなかった場合は、次へ
			if (idxName >= dataNameKanaArray.length) {
				continue;
			}

			// 優先名称を取得
			dataName = dataObject[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_NAME];

			// 検索結果に追加
			HtmlCreateElementOption(dataId, dataName, this.objSearchResult);

			// 選択するマップIDの調整
			if (candidateResultId < 0) {
				candidateResultId = dataId;
			}
			else if (dataId == this.selectedSearchResult) {
				candidateResultId = dataId;
			}
		}

		// 選択するIDを調整
		this.selectedSearchResult = candidateResultId;

		// IDを設定
		this.objSearchResult.value = this.selectedSearchResult
	};

}

CCustomSelectMapBase.prototype = new CCustomSelectBase();



/**
 * モンスターマップデータソート関数（五十音順）.
 */
CCustomSelectMapBase.SortByName = function (objA, objB) {

	var nameA = objA[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_SORT];
	var nameB = objB[MONSTER_MAP_DATA_INDEX_NAME_KANA_ARRAY][0][NAME_KANA_DATA_INDEX_SORT];

	if (nameA < nameB) return -1;
	if (nameA > nameB) return 1;

	return 0;
};

/**
 * モンスターマップデータソート関数（登録順）.
 */
CCustomSelectMapBase.SortById = function (objA, objB) {

	var idA = objA[MONSTER_MAP_DATA_INDEX_ID];
	var idB = objB[MONSTER_MAP_DATA_INDEX_ID];

	if (idA < idB) return -1;
	if (idA > idB) return 1;

	return 0;
};







