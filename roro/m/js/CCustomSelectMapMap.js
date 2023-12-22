




/**
 * カスタムセレクトクラス（マップ）.
 */
function CCustomSelectMapMap (instanceIdNameC, categorySelectC) {

	// カテゴリ選択セレクトクラスのインスタンス
	this.categorySelect = null;



	/**
	 * イニシャライザ.
	 * @param instanceIdName インスタンスID名
	 * @param extractTitle 展開エリアタイトル
	 * @param categorySelect カテゴリ選択セレクトクラスのインスタンス
	 */
	this.Initialize = function (instanceIdName, extractTitle, categorySelect) {

		// カテゴリ選択セレクトクラスのインスタンスを保持
		this.categorySelect = categorySelect;

		// カテゴリ選択セレクトクラスのデータ選択変更イベントの追加ハンドラを登録
		this.categorySelect.AddOnChangeSelectDataExtraHandller(this.RebuildSelectData, this);
		this.categorySelect.AddOnChangeSelectDataExtraHandller(this.RebuildSearchResult, this);

		// 基底クラスのイニシャライザをコール
		CCustomSelectMapMap.prototype.Initialize.call(this, instanceIdName, extractTitle);
	};



	/**
	 * データ取得関数.
	 * @param dataId データID
	 * @remark 継承先でオーバーライドすること
	 */
	this.GetMonsterMapData = function (dataId) {
		return g_MonsterMapDataArray[dataId];
	};



	/**
	 * データ選択コントロール用データ配列取得関数.
	 * @param dataArray データ配列
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSubGetDataArray = function () {

		var dataArraySorted = null;

		// モンスターマップカテゴリデータ配列を複製してソート
		dataArraySorted = g_MonsterMapDataArray.slice();

		switch (this.selectedSortId) {

		case 0:
			dataArraySorted.sort(CCustomSelectMapBase.SortByName);
			break;

		case 1:
			dataArraySorted.sort(CCustomSelectMapBase.SortById);
			break;

		}

		return dataArraySorted;
	};

	/**
	 * データ選択コントロール用フィルタ関数.
	 * @param dataObject データオブジェクト
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSubDataFilter = function (dataObject) {

		var dataId = 0;
		var selectedCategoryData = null;



		// 選択中のカテゴリを取得
		selectedCategoryData = g_MonsterMapCategoryDataArray[this.categorySelect.GetSelectedDataId()];



		// マップID取得
		dataId = dataObject[MONSTER_MAP_DATA_INDEX_ID];

		// 特殊なマップIDの処理
		switch (dataId) {

		// 一般的なマップIDの処理
		default:

			// カテゴリ選択が「全地域」の場合、無条件で対象
			if (selectedCategoryData[MONSTER_MAP_DATA_INDEX_ID] == MONSTER_MAP_ID_CATEGORY_ALL) {
				break;
			}

			// カテゴリ選択が「メモリアルダンジョン」の場合、マップの種別がメモリアルダンジョンでなければ、対象外
			if (selectedCategoryData[MONSTER_MAP_DATA_INDEX_ID] == MONSTER_MAP_ID_CATEGORY_MEMORIAL_DUNGEON) {
				if (dataObject[MONSTER_MAP_DATA_INDEX_KIND] != MONSTER_MAP_KIND_MEMORIAL_DUNGEON) {
					return false;
				}
			}

			// それ以外の場合、選択中のカテゴリに含まれなければ、対象外
			else {
				if (selectedCategoryData[MONSTER_MAP_DATA_INDEX_DATA_ARRAY].indexOf(dataId) < 0) {
					return false;
				}
			}

			break;
		}



		return true;
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
			"選択された地域の中にある「マップ」を、さらに絞り込む機能です。",
		];

		// 説明データ配列
		explainArray = [
			[
				"ソート",
				[
					"「マップ」の並び順を変更できます。",
				],
			],
			[
				"検索",
				[
					"入力された文字を含む「マップ」を検索します。",
					"「マップ」の名称や読み仮名、一部の略称や通称が対象です。",
					"（一部の特殊な文字は、自動で変換されます）",
				],
			],
			[
				"結果",
				[
					"検索で該当した「マップ」のリストです。",
					"「適用」ボタンを押すと、セレクトボックスに反映します。",
					"（検索結果をダブルクリックすることでも可能です）",
				],
			],
		];



		// デフォルト処理関数で処理
		this.RebuildHelpAreaSubDefault(summaryArray, explainArray, objRoot);
	};



	// イニシャライザ呼び出し
	this.Initialize(instanceIdNameC, "マップ選択", categorySelectC);
}

CCustomSelectMapMap.prototype = new CCustomSelectMapBase();





