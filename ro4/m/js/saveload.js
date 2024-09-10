// 旧データ構造は、最大でバージョン 99 まで

/**
 * セーブボタン押下イベントハンドラ.
 */
function OnClickSaveSaveData () {

	// 必要情報の取得
	const inputtedName = HtmlGetObjectValueById("OBJID_INPUT_SAVE_NAME_MIG", "");
	const dataIndex = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_SAVE_DATA_MIG", 0);

	// データを保存
	const dispName = CSaveController.saveCharaData(dataIndex, inputtedName);
	if (dispName.length == 0) {
		alert("データのセーブに失敗しました。\nローカルストレージの使用が許可されているか確認してください。");
		return;
	}

	// セレクトボックスの更新
	const objSelect = document.getElementById("OBJID_SELECT_SAVE_DATA_MIG");
	if (objSelect) {
		objSelect.options[dataIndex].text = dispName;
	}
}

/**
 * ロードボタン押下イベントハンドラ.
 */
function OnClickLoadSaveData () {

	// 必要情報の取得
	const dataIndex = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_SAVE_DATA_MIG", 0);

	// データをロード
	const charaName = CSaveController.loadCharaData(dataIndex);
	if (charaName.length == 0) {
		alert("データがありません。");
		return;
	}

	// 名前入力欄へ適用
	HtmlSetObjectValueById("OBJID_INPUT_SAVE_NAME_MIG", charaName);

	// アイテム情報の構築
	CItemInfoManager.OnClickExtractSwitch();
}

/**
 * 削除ボタン押下イベントハンドラ.
 */
function OnClickDeleteSaveData () {

	// 必要情報の取得
	const dataIndex = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_SAVE_DATA_MIG", 0);

	// データを削除
	const dispName = CSaveController.deleteCharaData(dataIndex);

	// セレクトボックスの更新
	const objSelect = document.getElementById("OBJID_SELECT_SAVE_DATA_MIG");
	if (objSelect) {
		objSelect.options[dataIndex].text = dispName;
	}

	// 名前入力欄のクリア
	HtmlSetObjectValueById("OBJID_INPUT_SAVE_NAME_MIG", "");
}

/**
 * URL出力ボタン押下イベントハンドラ.
 */
function OnClickUrlOutMIG () {

	// データURLの生成
	const dataURL = CSaveController.encodeToURL();

	// サイトのベースURLを取得
	let locationBase = (location.href.split("?"))[0];

	// アンカーをクリックした後に呼び出される場合があるので不要なURLフラグメントを削除する
	locationBase = locationBase.replace('#OBJID_SAVE_BLOCK_MIG','');
	locationBase = locationBase.replace('#OBJID_ATTACK_SETTING_BLOCK_MIG','');

	// 最終的なURLを合成
	const urlText = locationBase + "?" + dataURL;

	// 出力欄へ設定
	HtmlSetObjectValueById("OBJID_INPUT_URL_OUT_MIG", urlText);

	document.getElementById("OBJID_INPUT_URL_OUT_MIG").focus();
}

/**
 * URL入力ボタン押下イベントハンドラ.
 */
function OnClickUrlInMIG () {

	// 入力欄のURLを取得
	const urlText = HtmlGetObjectValueById("OBJID_INPUT_URL_IN_MIG", "");

	// ＵＲＬからパラメタ部分を切り出す
	const splitted = urlText.split("?");

	// エラーチェック
	if (splitted.length != 2) {
		return;
	}

	CSaveController.loadFromURL(splitted[1]);
	// アイテム情報の構築
	CItemInfoManager.OnClickExtractSwitch();

	document.getElementById("OBJID_INPUT_URL_IN_MIG").focus();
}



/**
 * セーブデータ形式を新形式へ変換する（旧DecodeURLの一部）.
 */
function ConvertDataTextMIG(loadDataUrl) {

	let idx = 0;
	let pos = 0;

	let saveDataStrExtracted = "";
	let saveDataMappingArray = null;

	let versionTarget = 0;
	let saveDataArray = new Array();


	//----------------------------------------------------------------
	// データなしは処理しない
	//----------------------------------------------------------------
	// データ移行につき、空配列を返すように修正
	if (loadDataUrl == "ZZZZ") {
		return [];
	}


	//----------------------------------------------------------------
	// カレントバージョンのデータ長定義を取得し、配列領域を用意
	//----------------------------------------------------------------
	saveDataArray = MallocArray(CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION).length, 0);


	//----------------------------------------------------------------
	// 対象データ文字列を展開し、データ長を補正
	//----------------------------------------------------------------
	saveDataStrExtracted = SaveDataChangeMIG(loadDataUrl);
	saveDataStrExtracted = AdaptSaveDataStrSizeMIG(saveDataStrExtracted);


	//----------------------------------------------------------------
	// 対象データのバージョンを取得
	//----------------------------------------------------------------
	versionTarget = GetSaveDataVersion(saveDataStrExtracted);


	//----------------------------------------------------------------
	// 対象バージョンのデータ長定義を取得
	//----------------------------------------------------------------
	saveDataMappingArray = CSaveDataMappingManager.GetMappingArray(versionTarget);


	//----------------------------------------------------------------
	// 対象データ読み込み
	//----------------------------------------------------------------
	for (idx = 0, pos = 0; (idx < saveDataMappingArray.length) && (pos < saveDataStrExtracted.length); idx++) {
		saveDataArray[idx] = saveDataStrExtracted.slice(pos, pos + saveDataMappingArray[idx]);
		pos += saveDataMappingArray[idx];
	}


	//----------------------------------------------------------------
	// データ変換
	//----------------------------------------------------------------
	for (idx = 0; idx < saveDataArray.length; idx++) {
		saveDataArray[idx] = CSaveDataConverter.ConvertStoN(saveDataArray[idx]);
	}


	//----------------------------------------------------------------
	// バージョンチェック
	//----------------------------------------------------------------
	// すでに新形式の場合は処理しない
	if (saveDataArray[0] > 100) {
		return loadDataUrl;
	}


	//----------------------------------------------------------------
	// セーブデータのバージョンごとの互換性変換
	//----------------------------------------------------------------
	saveDataArray = VersionModify(saveDataArray);


	//----------------------------------------------------------------
	// カレントバージョンのデータ長定義を取得
	//----------------------------------------------------------------
	saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);


	//----------------------------------------------------------------
	// 職業の読み込み
	//----------------------------------------------------------------

	// レベル補正（旧データ対応？）
	if (saveDataArray[1] == 20 && saveDataArray[2] <45) {
		saveDataArray[2] = 45;
	}

	//----------------------------------------------------------------
	// ベースレベル自動調整チェックの読み込み
	//----------------------------------------------------------------
	if (saveDataArray[0] == 0) {
		saveDataArray[11] = 1;
	}

	//----------------------------------------------------------------
	// 旧養子情報の読み込み
	//----------------------------------------------------------------
	if (saveDataArray[0] <= 6) {
		if (saveDataArray[275]) {
			saveDataArray[275] = 0;
			saveDataArray[743] = 1;
		}
	}

	//----------------------------------------------------------------
	// 攻撃手段の読み込み
	//----------------------------------------------------------------
	// レベルが上限を超えている場合は、最大レベルに補正（設定ミスのバグ対応）
	let maxLv = g_skillManager.GetMaxLv(parseInt(saveDataArray[276], 10));
	saveDataArray[278] = Math.min(maxLv, parseInt(saveDataArray[278]));

	// レベル指定がなしになっている場合は、1 に補正
	if(saveDataArray[278] == 0) saveDataArray[278] = 1;



	// バージョン補正（新形式の初期バージョン）
	saveDataArray[0] = 101;

	// 変換した数値の配列を返す
	return saveDataArray;
}

/**
 * セーブデータ文字列長を、カレントバージョンのデータ長に合わせる.
 * @param 展開済みセーブデータ文字列
 * @return データ長が合わせられたセーブデータ文字列
 */
function AdaptSaveDataStrSizeMIG(saveDataStrExtracted) {

	var idx = 0;

	var saveDataMappingArrayCurrent = null;

	var saveDataStrLengthCurret = 0;
	var saveDataStrLengthTarget = 0;
	var saveDataStrLengthDiff = 0;

	// カレントバージョンのデータ長定義を取得
	saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);

	// カレントバージョンの全データ長を計算
	saveDataStrLengthCurret = 0;
	for (idx = 0; idx < saveDataMappingArrayCurrent.length; idx++) {
		saveDataStrLengthCurret += saveDataMappingArrayCurrent[idx];
	}

	// 対象データのデータ長を取得
	saveDataStrLengthTarget = saveDataStrExtracted.length;

	// データ長の差を計算
	saveDataStrLengthDiff = saveDataStrLengthCurret - saveDataStrLengthTarget;

	// 不足分を空データで補う
	if (saveDataStrLengthDiff > 0) {
		for (idx = 0; idx < saveDataStrLengthDiff; idx++) {
			saveDataStrExtracted += CSaveDataConverter.ConvertNtoS(0, 1);
		}
	}

	// 過剰分を切り捨て
	else if (saveDataStrLengthDiff < 0) {
		saveDataStrExtracted = saveDataStrExtracted.substr(0, saveDataStrLengthCurret);
	}

	return saveDataStrExtracted;
}

/**
 * 旧形式のデータURLの圧縮を展開する.
 * @param {string} wstr 旧形式のデータURL文字列
 * @returns 展開後のデータURL文字列
 */
function SaveDataChangeMIG (wstr) {

	let regNum = /^(\D*)(\d+)(.*?)$/;

	wstr = "" + wstr;

	do {
		const ret = regNum.exec(wstr);
		if (!ret) {
			break;
		}

		wstr = (ret[1] ? ret[1] : "")
			+ ("a").repeat(parseInt(ret[2], 10))
			+ (ret[3] ? ret[3] : "");

	} while (true);

	return wstr;
}