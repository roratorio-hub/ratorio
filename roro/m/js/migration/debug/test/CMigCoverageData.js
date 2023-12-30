
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



/**
 * カバレッジデータクラス.
 * @param dataArrayC 設定するカバレッジデータ配列
 */
function CMigCoverageData (dataArrayC) {

	// 対象ID
	this.tagetId = 0;

	// テストケースカバレッジデータ配列
	this.testCaseCoverageDataArray = null;





	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.tagetId = 0;
		this.testCaseCoverageDataArray = [];

		// データが指定されている場合のみ、設定
		if (dataArrayC) {

			this.tagetId = dataArrayC[0];

			for (idx = 0; idx < dataArrayC[1].length; idx++) {
				this.testCaseCoverageDataArray[idx] = new CMigTestCaseCoverageData(dataArrayC[1][idx]);
			}
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
	 * テストケースカバレッジデータを設定する.
	 * @param testCaseNo テストケース番号
	 * @param testCaseCoverageData テストケースカバレッジデータ
	 */
	this.SetTestCaseCoverageData = function (testCaseNo, testCaseCoverageData) {
		this.testCaseCoverageDataArray[testCaseNo] = testCaseCoverageData;
	};

	/**
	 * テストケースカバレッジデータ配列をループ処理する.
	 * @param funcProc 処理関数（引数は、value, index, array）
	 */
	this.ForTestCaseCoverageData = function (funcProc) {

		var idx = 0;

		for (idx = 0; idx < this.testCaseCoverageDataArray.length; idx++) {
			funcProc(this.testCaseCoverageDataArray[idx], idx, this.testCaseCoverageDataArray);
		}
	};





	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var arrayDataSub = null;

		var testCaseCoverageData = null;

		// 配列確保
		arrayData = [];

		// 固定情報を追記
		arrayData.push(this.tagetId);

		//テストケースカバレッジデータ配列を追記
		arrayDataSub = [];
		for (idx = 0; idx < this.testCaseCoverageDataArray.length; idx++) {

			testCaseCoverageData = this.testCaseCoverageDataArray[idx];

			if (testCaseCoverageData) {
				arrayDataSub.push(testCaseCoverageData.ToArrayData());
			}
			else {
				arrayDataSub.push(testCaseCoverageData);
			}

		}
		arrayData.push(arrayDataSub);

		return arrayData;
	};


}





