/**
 * カスタムセレクトクラス（モンスター）.
 */
function CCustomSelectMapMonster (instanceIdNameC, mapSelectC) {

	// 再計算フラグ
	this.bRecalculate = false;

	// マップ選択セレクトクラスのインスタンス
	this.mapSelect = null;

	/**
	 * イニシャライザ.
	 * @param instanceIdName インスタンスID名
	 * @param extractTitle 展開エリアタイトル
	 * @param mapSelect マップ選択セレクトクラスのインスタンス
	 */
	this.Initialize = function (instanceIdName, extractTitle, mapSelect) {

		// 変数初期化
		this.bRecalculate = false;

		// カテゴリ選択セレクトクラスのインスタンスを保持
		this.mapSelect = mapSelect;

		// カテゴリ選択セレクトクラスのデータ選択変更イベントの追加ハンドラを登録
		this.mapSelect.AddOnChangeSelectDataExtraHandller(this.RebuildSelectData, this);
		this.mapSelect.AddOnChangeSelectDataExtraHandller(this.RebuildSearchResult, this);

		// 基底クラスのイニシャライザをコール
		CCustomSelectMapMonster.prototype.Initialize.call(this, instanceIdName, extractTitle);

		// 初期化完了後、再計算フラグを立てる
		this.bRecalculate = true;
	};

	/**
	 * データ選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSub = function () {

		var idx = 0;

		var selectedMapId = 0;

		var dataArraySorted = null;
		var dataObject = null;
		var dataId = 0;
		var dataIdArray = null;
		var dataName = 0;
		var candidateDataId = 0;



		// 選択されたマップIDを取得
		selectedMapId = this.mapSelect.GetSelectedDataId();

		// 選択されたマップIDで、モンスターリストを調整
		switch (selectedMapId) {

		// 全地域の場合
		case MONSTER_MAP_ID_MAP_ALL:
			dataArraySorted = MonsterObjNew.slice();
			break;

		// 特定地域の場合
		default:

			dataArraySorted = [];
			dataIdArray = g_MonsterMapDataArray[selectedMapId][MONSTER_MAP_DATA_INDEX_DATA_ARRAY];

			for (idx = 0; idx < dataIdArray.length; idx++) {
				dataArraySorted.push(MonsterObjNew[dataIdArray[idx]].slice());
			}
			break;
		}



		// ソートの key を特定する
		switch (this.selectedSortId) {
		case 0:
			sortKeyIndex = MONSTER_DATA_INDEX_KANA;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 1:
			sortKeyIndex = MONSTER_DATA_INDEX_ELEMENT;
			funcGetLabel = function (monsterDataF) {
				return GetElementText(Math.floor(monsterDataF[MONSTER_DATA_INDEX_ELEMENT] / 10))
					+ (monsterDataF[MONSTER_DATA_INDEX_ELEMENT] % 10)
					+ "）"
					+ monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 2:
			sortKeyIndex = MONSTER_DATA_INDEX_RACE;
			funcGetLabel = function (monsterDataF) {
				return GetRaceText(monsterDataF[MONSTER_DATA_INDEX_RACE])
					+ "）"
					+ monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 3:
			sortKeyIndex = MONSTER_DATA_EXTRA_INDEX_100HIT;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_EXTRA_INDEX_100HIT]
					+ "）"
					+ monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 4:
			sortKeyIndex = MONSTER_DATA_EXTRA_INDEX_95FLEE;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_EXTRA_INDEX_95FLEE]
					+ "）"
					+ monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 5:
			sortKeyIndex = MONSTER_DATA_INDEX_BASE_EXP;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 6:
			sortKeyIndex = MONSTER_DATA_INDEX_JOB_EXP;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 7:
			sortKeyIndex = MONSTER_DATA_EXTRA_INDEX_ATK_MAX;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;

		case 8:
			sortKeyIndex = MONSTER_DATA_INDEX_HP;
			funcGetLabel = function (monsterDataF) {
				return monsterDataF[MONSTER_DATA_INDEX_NAME];
			}
			break;
		}

		// ソート
		dataArraySorted.sort(
			function(a, b) {
				if (a[sortKeyIndex] < b[sortKeyIndex]) return -1;
				if (a[sortKeyIndex] > b[sortKeyIndex]) return 1;
				return 0;
			}
		);



		// 選択肢全削除
		HtmlRemoveOptionAll(this.objSelectData);

		// 候補検索用変数を初期化
		candidateDataId = -1;

		// データ追加
		for (idx = 0; idx < dataArraySorted.length; idx++) {

			// データ取得
			dataObject = dataArraySorted[idx];

			// ID取得
			dataId = dataObject[MONSTER_DATA_INDEX_ID];

			// 名称取得
			dataName = funcGetLabel(dataObject);

			// 選択肢追加
			HtmlCreateElementOption(dataId, dataName, this.objSelectData);

			// 選択するIDの調整
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

		// 再計算
		if (this.bRecalculate) {
			calc();
		}
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
	 * データ選択コントロールの変更イベントハンドラ（処理本体）.
	 * @remark 継承先でオーバーライドすること
	 */
	this.OnChangeSelectDataSub = function () {
		// 基底クラスの処理をコール
		CCustomSelectMapMonster.prototype.OnChangeSelectDataSub.call(this);
		// バリカタ情報をサジェストする
		const monsterId = this.GetSelectedDataId();
		CMonsterMapAreaComponentManager.updateMonsterSuggest(monsterId);
		// 再計算
		if (this.bRecalculate) {
			calc();
		}
	};

	/**
	 * ヘルプエリアを再構築する（処理本体）.
	 * @param objRoot ルートオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildHelpAreaSub = function (objRoot) {

		var summaryArray = null;
		var explainArray = null;



		// 概要配列
		summaryArray = [
			"選択されたマップに出現する「モンスター」を、さらに絞り込む機能です。",
		];

		// 説明データ配列
		explainArray = [
			[
				"ソート",
				[
					"「モンスター」の並び順を変更できます。",
				],
			],
			[
				"検索",
				[
					"入力された文字を含む「モンスター」を検索します。",
					"「モンスター」の名称、一部の略称や通称が対象です。",
					"（読み仮名の検索は未対応です）",
					"（一部の特殊な文字は、自動で変換されます）",
				],
			],
			[
				"結果",
				[
					"検索で該当した「モンスター」のリストです。",
					"「適用」ボタンを押すと、セレクトボックスに反映します。",
					"（検索結果をダブルクリックすることでも可能です）",
				],
			],
		];



		// デフォルト処理関数で処理
		this.RebuildHelpAreaSubDefault(summaryArray, explainArray, objRoot);
	};

	/**
	 * ソート選択コントロールを再構築する（処理本体）.
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildSelectSortSub = function () {

		// 選択肢全削除
		HtmlRemoveOptionAll(this.objSelectSort);

		HtmlCreateElementOption(0, "五十音順", this.objSelectSort);
		HtmlCreateElementOption(1, "属性順", this.objSelectSort);
		HtmlCreateElementOption(2, "種族順", this.objSelectSort);
		HtmlCreateElementOption(3, "100%HIT順", this.objSelectSort);
		HtmlCreateElementOption(4, "95%回避順", this.objSelectSort);
		HtmlCreateElementOption(5, "BaseExp順", this.objSelectSort);
		HtmlCreateElementOption(6, "JobExp順", this.objSelectSort);
		HtmlCreateElementOption(7, "最大Atk順", this.objSelectSort);
		HtmlCreateElementOption(8, "MaxHP順", this.objSelectSort);

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
		// TODO: 読み仮名検索未対応
		regSearchKana = null;

		// データ選択セレクトボックスの選択肢配列を取得
		options = this.objSelectData.options;

		// 全ての選択肢をループ
		for (idx = 0; idx < options.length; idx++) {

			// データIDを取得
			dataId = parseInt(options[idx].value, 10);

			// 名称データ取得
			dataName = MonsterObjNew[dataId][MONSTER_DATA_INDEX_NAME];

			// 全ての正規表現をテスト
			for (idxReg = 0; idxReg < regSearchArray.length; idxReg++) {
				if (regSearchArray[idxReg].test(dataName)) {
					break;
				}
			}

			// マッチしていなかった場合は、次へ
			if (idxReg >= regSearchArray.length) {
				continue;
			}

			// 検索結果に追加
			HtmlCreateElementOption(dataId, options[idx].text, this.objSearchResult);

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

	// イニシャライザ呼び出し
	this.Initialize(instanceIdNameC, "モンスター選択", mapSelectC);

}

CCustomSelectMapMonster.prototype = new CCustomSelectBase();