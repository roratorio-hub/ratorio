// デバッグファイル読み込みチェック
DebugFileIncludeCheck();





/**
 * ファイル出力マネージャクラス.
 */
function CFileOutputManager () {

}



// 出力不能時の延長時間（ミリ秒）
CFileOutputManager.EXTEND_TIME_WHEN_DISABLED = 5000;

// 各ファイルの最低出力間隔（ミリ秒）
CFileOutputManager.OUTPUT_INTERVL = 200;



// 出力可能フラグ
CFileOutputManager.bEnableOutput = false;

// 最後の出力が行われる予定の時刻
CFileOutputManager.dtFinalOutput = new Date();

// 出力待ちファイルの数
CFileOutputManager.restOutputCount = 0;

// 出力開始時の出力待ちファイルの数
CFileOutputManager.totalOutputCount = 0;

// 出力完了時のコールバック関数
CFileOutputManager.funcCallbackFinished = null;

// 出力完了時のコールバック関数に渡す this
CFileOutputManager.thisArgCallbackFinished = null;

// 出力完了時のコールバック関数に渡す引数の配列
CFileOutputManager.argsArrayCallbackFinished = null;





/**
 * ファイル出力を開始する.
 * @param funcCallbackFinished 全ファイル出力完了時のコールバック関数
 * @param thisArg コールバック関数に渡される this
 * @param argsArray コールバック関数に渡される引数の配列
 */
CFileOutputManager.BeginOutput = function (funcCallbackFinished, thisArg, argsArray) {

	// すでに開始されている場合は処理しない
	if (CFileOutputManager.bEnableOutput) {
		return;
	}

	// コールバック関数に関する情報を保持
	CFileOutputManager.funcCallbackFinished = funcCallbackFinished;
	CFileOutputManager.thisArgCallbackFinished = thisArg;
	CFileOutputManager.argsArrayCallbackFinished = argsArray;

	// 全出力ファイル数を保持
	CFileOutputManager.totalOutputCount = CFileOutputManager.restOutputCount;

	// 出力許可フラグを立てる
	CFileOutputManager.bEnableOutput = true;
};

/**
 * ファイル出力を中断する.
 * @param funcCallbackFinished 全ファイル出力完了時のコールバック関数
 */
CFileOutputManager.StopOutput = function () {

	// 出力許可フラグを落とす
	CFileOutputManager.bEnableOutput = false;
};





/**
 * ファイル出力を登録する.
 * @param fileName ファイル名
 * @param fileContent ファイルの内容
 */
CFileOutputManager.RegisterFile = function (fileName, fileContent) {

	var timeNext = 0;

	// 次の出力時刻を決定
	timeNext = Math.max(
		Date.now() + CFileOutputManager.OUTPUT_INTERVL,
		CFileOutputManager.dtFinalOutput.getTime() + CFileOutputManager.OUTPUT_INTERVL
	);

	// 最終出力予定時刻を更新
	CFileOutputManager.dtFinalOutput.setTime(timeNext);

	// 出力待ちファイルの数をインクリメント
	CFileOutputManager.restOutputCount++;

	// 時刻を待つ
	setTimeout(CFileOutputManager.OutputFile, timeNext - Date.now(), fileName, fileContent);
};






/**
 * ファイル出力する.
 * @param fileName ファイル名
 * @param fileContent ファイルの内容
 */
CFileOutputManager.OutputFile = function (fileName, fileContent) {

	var fileData = null;
	var url = null;
	var timeNext = 0;
	var funcCallbackFinished = null;

	var objA = null;



	// まだ出力可能でない場合は、再度タイムアウトを設定する
	if (!CFileOutputManager.bEnableOutput) {

		// 次の出力時刻を決定
		timeNext = Math.max(
			Date.now() + CFileOutputManager.EXTEND_TIME_WHEN_DISABLED,
			CFileOutputManager.dtFinalOutput.getTime() + CFileOutputManager.OUTPUT_INTERVL
		);

		// 最終出力予定時刻を更新
		CFileOutputManager.dtFinalOutput.setTime(timeNext);

		// 再度、時刻を待つ
		setTimeout(CFileOutputManager.OutputFile, timeNext - Date.now(), fileName, fileContent);

		return;
	}

	if (Date.now() < (CFileOutputManager.dtFinalOutput.getTime() + CFileOutputManager.OUTPUT_INTERVL)) {

		// 再度、時刻を待つ
		setTimeout(CFileOutputManager.OutputFile, CFileOutputManager.dtFinalOutput.getTime()  + CFileOutputManager.OUTPUT_INTERVL - Date.now(), fileName, fileContent);

		return;
	}



	// Blobデータ生成
	fileData = new Blob([fileContent], {type: "text/plain"});



	// ダウンロードリンクを生成
	objA = document.createElement("a");

	// アクセスＵＲＬを生成
	url = URL.createObjectURL(fileData);

	// ダウンロードリンクを設定
	objA.setAttribute("href", url);
	objA.setAttribute("target", "_blank");
	objA.setAttribute("download", fileName);

	// ダウンロード
	objA.click();

	// アクセスＵＲＬを解放
	URL.revokeObjectURL(url)



	// 出力待ちファイルの数をデクリメント
	CFileOutputManager.restOutputCount--;

	if (CFileOutputManager.restOutputCount == 0) {

		// 出力許可フラグを落とす
		CFileOutputManager.bEnableOutput = false;

		WriteConsoleLog("すべてのファイル出力が完了");

		// 終了時のコールバック関数を呼び出す
		funcCallbackFinished = CFileOutputManager.funcCallbackFinished;
		CFileOutputManager.funcCallbackFinished = null;
		if (funcCallbackFinished) {
			funcCallbackFinished.apply(CFileOutputManager.thisArgCallbackFinished, CFileOutputManager.argsArrayCallbackFinished);
		}

	}
	else {

		// 最終出力時間を更新
		CFileOutputManager.dtFinalOutput.setTime(Date.now());

		WriteConsoleLog("残りの出力数 : " + CFileOutputManager.restOutputCount + " / " + CFileOutputManager.totalOutputCount);
	}
};
