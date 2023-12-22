




/**
 * カスタムセレクトクラス（マップ地域）.
 */
function CCustomSelectMapCategory (instanceIdNameC) {



	/**
	 * データ取得関数.
	 * @param dataId データID
	 * @remark 継承先でオーバーライドすること
	 */
	this.GetMonsterMapData = function (dataId) {
		return g_MonsterMapCategoryDataArray[dataId];
	};



	/**
	 * データ選択コントロール用データ配列取得関数.
	 * @param dataArray データ配列
	 * @remark 継承先でオーバーライドすること
	 */
	this.RebuildSelectDataSubGetDataArray = function () {

		var dataArraySorted = null;

		// モンスターマップカテゴリデータ配列を複製してソート
		dataArraySorted = g_MonsterMapCategoryDataArray.slice();

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
	 * ヘルプエリアを再構築する（処理本体）.
	 * @param objRoot ルートオブジェクト
	 * @remark 必要に応じて継承先でオーバーライドすること
	 */
	this.RebuildHelpAreaSub = function (objRoot) {

		var summaryArray = null;
		var explainArray = null;



		// 概要配列
		summaryArray = [
			"マップの「地域」を絞り込む機能です。",
		];

		// 説明データ配列
		explainArray = [
			[
				"ソート",
				[
					"「地域」の並び順を変更できます。",
				],
			],
			[
				"検索",
				[
					"入力された文字を含む「地域」を検索します。",
					"「地域」の名称や読み仮名、一部の略称や通称が対象です。",
					"（一部の特殊な文字は、自動で変換されます）",
				],
			],
			[
				"結果",
				[
					"検索で該当した「地域」のリストです。",
					"「適用」ボタンを押すと、セレクトボックスに反映します。",
					"（検索結果をダブルクリックすることでも可能です）",
				],
			],
		];



		// デフォルト処理関数で処理
		this.RebuildHelpAreaSubDefault(summaryArray, explainArray, objRoot);
	};



	// イニシャライザ呼び出し
	this.Initialize(instanceIdNameC, "マップ地域選択");
}

CCustomSelectMapCategory.prototype = new CCustomSelectMapBase();







