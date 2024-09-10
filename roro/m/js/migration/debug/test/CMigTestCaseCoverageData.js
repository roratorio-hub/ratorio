
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



/**
 * テストケースカバレッジデータクラス.
 * @param dataArrayC 設定するカバレッジデータ配列
 */
function CMigTestCaseCoverageData (dataArrayC) {

	// 対象ID
	this.tagetId = 0;

	// テストケース番号
	this.caseNo = 0;

	// テストケースラベル
	this.testLabel = 0;

	// データURL
	this.dataURL = "";

	// SPパターンカバレッジツリー
	this.spPatternCoverageTree = null;





	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.tagetId = 0;
		this.caseNo = 0;
		this.dataURL = "";
		this.spPatternCoverageTree = new CMigSpPatternCoverageTree();

		// データが指定されている場合のみ、設定
		if (dataArrayC) {

			this.tagetId = dataArrayC[0];
			this.caseNo = dataArrayC[1];
			this.testLabel = dataArrayC[2];
			this.dataURL = dataArrayC[3];
			this.spPatternCoverageTree = new CMigSpPatternCoverageTree(dataArrayC[4]);
		}

	}).call(this);



	/**
	 * 対象IDを設定する.
	 * @param tagetId 対象ID
	 */
	this.SetTargetId = function (tagetId) {
		this.tagetId = tagetId;
	};

	/**
	 * 対象IDを取得する.
	 * @return 対象ID
	 */
	this.GetTargetId = function () {
		return this.tagetId;
	};



	/**
	 * テストケース番号を設定する.
	 * @param tagetId テストケース番号
	 */
	this.SetCaseNo = function (caseNo) {
		this.caseNo = caseNo;
	};

	/**
	 * テストケース番号を取得する.
	 * @return テストケース番号
	 */
	this.GetCaseNo = function () {
		return this.caseNo;
	};



	/**
	 * テストケースラベルを設定する.
	 * @param testLabel テストケースラベル
	 */
	this.SetTestLabel = function (testLabel) {
		this.testLabel = testLabel;
	};

	/**
	 * テストケースラベルを取得する.
	 * @return テストケースラベル
	 */
	this.GetTestLabel = function () {
		return this.testLabel;
	};



	/**
	 * データURLを設定する.
	 * @param tagetId データURL
	 */
	this.SetDataUrl = function (dataURL) {
		this.dataURL = dataURL;
	};

	/**
	 * データURLを取得する.
	 * @return データURL
	 */
	this.GetDataUrl = function () {
		return this.dataURL;
	};



	/**
	 * SPパターンカバレッジツリーを設定する.
	 * @param spPatternCoverageTree SPパターンカバレッジツリー
	 */
	this.SetSpPatternCoverageTree = function (spPatternCoverageTree) {
		this.spPatternCoverageTree = spPatternCoverageTree;
	};

	/**
	 * SPパターンカバレッジツリーを取得する.
	 * @return SPパターンカバレッジツリー
	 */
	this.GetSpPatternCoverageTree = function () {
		return this.spPatternCoverageTree;
	};





	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;

		// 配列確保
		arrayData = [];

		// 固定情報を追記
		arrayData.push(this.tagetId);
		arrayData.push(this.caseNo);
		arrayData.push(this.testLabel);
		arrayData.push(this.dataURL);

		// ツリーを追記
		arrayData.push(this.spPatternCoverageTree.ToArrayData());

		return arrayData;
	};


}





