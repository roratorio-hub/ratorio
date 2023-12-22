
//================================================================================================
//================================================================================================
//====
//==== ブラウザ移行欄
//====
//================================================================================================
//================================================================================================

function OnClickBrowserMigrationSwitch() {

	var idx = 0;

	var switchChecked = false;

	var objSW = null;

	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objSpan = null;
	var objText = null;
	var objSelect = null;
	var objOption = null;
	var objInput = null;
	var objProgress = null;
	var objTextArea = null;
	var objFont = null;
	var objLabel = null;



	// チェックボックスのチェック状態を取得
	objSW = document.getElementById("OBJID_BROWSER_MIGRATION_EXTRACT_CHECKBOX");
	if (objSW) {
		switchChecked = objSW.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_BROWSER_MIGRATION");
	HtmlRemoveAllChild(objRoot);

	// 設定欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// ヘッダ部分を構築
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_BROWSER_MIGRATION_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", 4);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_BROWSER_MIGRATION_EXTRACT_CHECKBOX");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_BROWSER_MIGRATION_EXTRACT_CHECKBOX");
	if (document.getElementById("OBJID_SAVE_BLOCK_MIG")) {
		HtmlCreateTextNode("ブラウザ移行　（※次世代版セーブは調整中（利用不可））", objLabel);
	}
	else {
		HtmlCreateTextNode("ブラウザ移行", objLabel);
	}



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	RefreshBrowserMigrationHeader(null, -1, 0);

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}


	// TODO: 調整中
	if (document.getElementById("OBJID_SAVE_BLOCK_MIG")) {
		return;
	}


	// 注意事項欄
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("colspan", "4");
	objTr.appendChild(objTd);

	objSpan = document.createElement("span");
	objTd.appendChild(objSpan);

	HtmlCreateTextNode("注意事項", objSpan);
	HtmlCreateElement("br", objSpan);

	objSpan = document.createElement("span");
	objTd.appendChild(objSpan);



	// 当機能では、現在のセーブデータを元に出力します。
	HtmlCreateTextNode("　・当機能では、現在のセーブデータを元に出力します。", objSpan);
	HtmlCreateElement("br", objSpan);

	// 編集中のデータは、セーブするまで出力に含まれないので、ご注意ください。
	HtmlCreateTextNode("　　", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("編集中のデータは、セーブするまで出力に含まれない", objFont);

	HtmlCreateTextNode("ので、ご注意ください。", objSpan);
	HtmlCreateElement("br", objSpan);

	// 特に、ＵＲＬを直接入力して表示した場合、それはセーブデータに　『　含　ま　れ　な　い　』　のでご注意ください。
	HtmlCreateTextNode("　　特に、", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("ＵＲＬを直接入力して表示した場合、それはセーブデータに　『　含　ま　れ　な　い　』", objFont);

	HtmlCreateTextNode("　のでご注意ください。", objSpan);

	HtmlCreateElement("br", objSpan);

	// あくまでも、お使いのブラウザに保存されているセーブデータが対象です。
	HtmlCreateTextNode("　　あくまでも、お使いのブラウザに保存されているセーブデータが対象です。", objSpan);
	HtmlCreateElement("br", objSpan);



	// 当機能では、「適用」ボタンを押した瞬間に、セーブデータを上書きします。元には戻せません。
	HtmlCreateTextNode("　・当機能では、", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("「適用」ボタンを押した瞬間に、セーブデータを上書き", objFont);

	HtmlCreateTextNode("します。", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("元には戻せません。", objFont);

	HtmlCreateElement("br", objSpan);



	// 当機能では、「適用」ボタンを押した後、最後にページの再読み込みを行います。
	HtmlCreateTextNode("　・当機能では、「適用」ボタンを押した後、", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("最後にページの再読み込みを行います。", objFont);

	HtmlCreateElement("br", objSpan);

	// 編集中のデータは保存されず、クリアされますので、ご注意ください。
	HtmlCreateTextNode("　　", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("編集中のデータは保存されず、クリアされます", objFont);

	HtmlCreateTextNode("ので、ご注意ください。", objSpan);

	HtmlCreateElement("br", objSpan);

	// （お使いのブラウザによっては、入力状態が復元される場合もありますが、サポート対象外です）
	HtmlCreateTextNode("　　（お使いのブラウザによっては、入力状態が復元される場合もありますが、サポート対象外です）", objSpan);

	HtmlCreateElement("br", objSpan);



	// 「全セーブデータ出力」ボタンの操作は、サポート対象外のブラウザでも動作すると思います。
	HtmlCreateTextNode("　・「全セーブデータ出力」ボタンの操作は、サポート対象外のブラウザでも動作すると思います。", objSpan);
	HtmlCreateElement("br", objSpan);

	// サポート対象外のブラウザからデータを移行する場合は、他の操作は極力行わず、「全セーブデータ出力」を行ってください。
	HtmlCreateTextNode("　　サポート対象外のブラウザからデータを移行する場合は、他の操作は極力行わず、「全セーブデータ出力」を行ってください。", objSpan);
	HtmlCreateElement("br", objSpan);



	// 入力データのデータチェックは、ほぼ行いません。
	HtmlCreateTextNode("　・入力データのデータチェックは、ほぼ行いません。", objSpan);
	HtmlCreateElement("br", objSpan);

	// 出力したデータは、編集せず、そのまま入力欄に貼り付けるようにしてください。
	HtmlCreateTextNode("　　", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("出力したデータは、編集せず、そのまま入力欄に貼り付ける", objFont);

	HtmlCreateTextNode("ようにしてください。", objSpan);

	HtmlCreateElement("br", objSpan);





	// 手順欄
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("colspan", "4");
	objTr.appendChild(objTd);

	objSpan = document.createElement("span");
	objTd.appendChild(objSpan);

	HtmlCreateTextNode("ブラウザ移行手順", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　１）移行元のブラウザ（セーブデータがあるブラウザ）での操作", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　１－１）「ブラウザ移行」欄を開きます。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　１－２）「出力モード」を選択します。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　１－３）「全セーブデータ出力」ボタンを押して、データを出力します。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　１－４）出力されたデータを、コピーします。", objSpan);
	HtmlCreateElement("br", objSpan);
	HtmlCreateTextNode("　　　　　　　対応しているブラウザでは、コピーボタンを押すとコピーできます。（コピーできた場合ははメッセージが表示されます）", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　２）移行先のブラウザ（今後使用するブラウザ）での操作", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　２－１）「ブラウザ移行」欄を開きます。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　２－２）「入力モード」を選択します。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　２－３）「ロック解除」チェックボックスにチェックを入れて、ロックを解除します。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　２－４）先ほどコピーしたデータを、入力欄に貼り付けます。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　２－５）「適用」ボタンを押します。", objSpan);
	HtmlCreateElement("br", objSpan);

	HtmlCreateTextNode("　　　　　　　繰り返しになりますが、", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("「適用」ボタンを押した瞬間に、セーブデータを上書き", objFont);

	HtmlCreateTextNode("します。", objSpan);

	objFont = document.createElement("font");
	objFont.setAttribute("color", "red");
	objSpan.appendChild(objFont);

	HtmlCreateTextNode("元には戻せません。", objFont);

	HtmlCreateElement("br", objSpan);





	// ブラウザ移行欄（出力）
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_RADIO_BROWSER_MIGRATION_OUTPUT");
	objInput.setAttribute("name", "OBJID_RADIO_BROWSER_MIGRATION");
	objInput.setAttribute("type", "radio");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationRadio()");
	objInput.setAttribute("checked", "checked");
	objTd.appendChild(objInput);

	objLabel = document.createElement("label");
	objLabel.setAttribute("for", "OBJID_RADIO_BROWSER_MIGRATION_OUTPUT");
	objLabel.appendChild(document.createTextNode("出力モード"));
	objTd.appendChild(objLabel);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_OUTPUT_ALL_DATA");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "全セーブデータ出力");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationOutputAllData()");
	objTd.appendChild(objInput);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objTextArea = document.createElement("textarea");
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_ALL_SAVE_DATA");
	objTextArea.setAttribute("cols", "140");
	objTextArea.setAttribute("rows", "10");
	objTd.appendChild(objTextArea);

	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_COPY");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "コピー");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationCopyData()");
	objTd.appendChild(objInput);



	// ブラウザ移行欄（入力）
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_RADIO_BROWSER_MIGRATION_INPUT");
	objInput.setAttribute("name", "OBJID_RADIO_BROWSER_MIGRATION");
	objInput.setAttribute("type", "radio");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationRadio()");
	objTd.appendChild(objInput);

	objLabel = document.createElement("label");
	objLabel.setAttribute("for", "OBJID_RADIO_BROWSER_MIGRATION_INPUT");
	objLabel.appendChild(document.createTextNode("入力モード"));
	objTd.appendChild(objLabel);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationCheckLock()");
	objTd.appendChild(objInput);

	objLabel = document.createElement("label");
	objLabel.setAttribute("id", "OBJID_LABEL_BROWSER_MIGRATION_LOCK_INPUT");
	objLabel.setAttribute("for", "OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
	objLabel.appendChild(document.createTextNode("ロック解除"));
	objTd.appendChild(objLabel);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objTextArea = document.createElement("textarea");
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_INPUT_SAVE_DATA");
	objTextArea.setAttribute("cols", "140");
	objTextArea.setAttribute("rows", "10");
	objTextArea.setAttribute("disabled", "disabled");
	objTd.appendChild(objTextArea);


	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_APPLY");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "適用");
	objInput.setAttribute("onClick", "OnClickBrowserMigrationApplyData()");
	objInput.setAttribute("disabled", "disabled");
	objTd.appendChild(objInput);



	// 初期設定
	RefreshBrowserMigrationDisableStates();
}



function RefreshBrowserMigrationHeader(objSelect, changedIdx, newValue) {

	var switchChecked = false;

	var objSW = null;
	var objHeader = null;

	// チェックボックスのチェック状態を取得
	objSW = document.getElementById("OBJID_BROWSER_MIGRATION_EXTRACT_CHECKBOX");
	switchChecked = objSW.checked;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_BROWSER_MIGRATION_HEADER");
	if (switchChecked) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
	}
}


function OnClickBrowserMigrationRadio() {
	RefreshBrowserMigrationDisableStates();
}

function OnClickBrowserMigrationCheckLock() {
	RefreshBrowserMigrationDisableStates();
}



function RefreshBrowserMigrationDisableStates() {

	var bOutput = true;
	var objInput = null;
	var objTextArea = null;
	var objLabel = null;
	var objCheck = null;

	objInput = document.getElementById("OBJID_RADIO_BROWSER_MIGRATION_INPUT");
	if (objInput) {
		if (objInput.checked) {
			bOutput = false;
		}
	}


	if (bOutput) {
		// 出力系コントロール
		objInput = document.getElementById("OBJID_INPUT_OUTPUT_ALL_DATA");
		if (objInput) {
			objInput.removeAttribute("disabled");
		}
		objTextArea = document.getElementById("OBJID_TEXTAREA_ALL_SAVE_DATA");
		if (objTextArea) {
			objTextArea.removeAttribute("disabled");
		}
		objInput = document.getElementById("OBJID_INPUT_COPY");
		if (objInput) {
			objInput.removeAttribute("disabled");
		}

		// 入力系コントロール
		objCheck = document.getElementById("OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
		if (objCheck) {
			objCheck.setAttribute("disabled", "disabled");
		}
		objLabel = document.getElementById("OBJID_LABEL_BROWSER_MIGRATION_LOCK_INPUT");
		if (objLabel) {
			objLabel.setAttribute("disabled", "disabled");
			objLabel.style.color = "#999999";
		}
		objTextArea = document.getElementById("OBJID_TEXTAREA_INPUT_SAVE_DATA");
		if (objTextArea) {
			objTextArea.setAttribute("disabled", "disabled");
		}
		objInput = document.getElementById("OBJID_INPUT_APPLY");
		if (objInput) {
			objInput.setAttribute("disabled", "disabled");
		}

	}
	else {
		// 出力系コントロール
		objInput = document.getElementById("OBJID_INPUT_OUTPUT_ALL_DATA");
		if (objInput) {
			objInput.setAttribute("disabled", "disabled");
		}
		objTextArea = document.getElementById("OBJID_TEXTAREA_ALL_SAVE_DATA");
		if (objTextArea) {
			objTextArea.setAttribute("disabled", "disabled");
		}
		objInput = document.getElementById("OBJID_INPUT_COPY");
		if (objInput) {
			objInput.setAttribute("disabled", "disabled");
		}

		// 入力系コントロール
		objCheck = document.getElementById("OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
		if (objCheck) {
			objCheck.removeAttribute("disabled");
		}
		objLabel = document.getElementById("OBJID_LABEL_BROWSER_MIGRATION_LOCK_INPUT");
		if (objLabel) {
			objLabel.removeAttribute("disabled");
			objLabel.style.color = null;
		}
		objTextArea = document.getElementById("OBJID_TEXTAREA_INPUT_SAVE_DATA");
		if (objTextArea) {
			objCheck = document.getElementById("OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
			if (objCheck) {
				if (objCheck.checked) {
					objTextArea.removeAttribute("disabled");
				}
				else {
					objTextArea.setAttribute("disabled", "disabled");
				}
			}
		}
		objInput = document.getElementById("OBJID_INPUT_APPLY");
		if (objInput) {
			objCheck = document.getElementById("OBJID_CHECK_BROWSER_MIGRATION_LOCK_INPUT");
			if (objCheck) {
				if (objCheck.checked) {
					objInput.removeAttribute("disabled");
				}
				else {
					objInput.setAttribute("disabled", "disabled");
				}
			}
		}
	}

}


function OnClickBrowserMigrationOutputAllData() {

	var idx = 0;

	var outputText = "";

	var objTextArea = null;

	objTextArea = document.getElementById("OBJID_TEXTAREA_ALL_SAVE_DATA");

	outputText = "";

	outputText += "==COOKIE==" + "\n";
	outputText += document.cookie + "\n";

	outputText += "==DATAS==" + "\n";
	if (n_CONFIG[2] > 19){
		if (localStorage.ROratorioDOM_SaveData) {
			outputText += localStorage.ROratorioDOM_SaveData + "\n";
		}
	}

	outputText += "==NAMES==" + "\n";
	if (n_CONFIG[2] > 19){
		if (localStorage.ROratorioDOM_SaveName) {
			outputText += localStorage.ROratorioDOM_SaveName + "\n";
		}
	}

	objTextArea.value = outputText.substring(0, outputText.length - 1);
}



function OnClickBrowserMigrationCopyData() {

	var objTextArea = null;

	objTextArea = document.getElementById("OBJID_TEXTAREA_ALL_SAVE_DATA");

	// 空の時は処理しない
	if (objTextArea.value.length == 0) {
		alert("出力欄に文字がありません。");
		return;
	}

	objTextArea.select();

	document.execCommand("copy");

	alert("出力欄の内容を、クリップボードにコピーしました。");
}



function OnClickBrowserMigrationApplyData() {

	var idx = 0;

	var tagCookie = "==COOKIE==";
	var tagDatas = "==DATAS==";
	var tagNames = "==NAMES==";
	var tagSaveData = "ROratorioSave=";

	var inputText = "";

	var indexOfCookieTag = 0;
	var indexOfDatasTag = 0;
	var indexOfNamesTag = 0;
	var indexOfSaveDataTag = 0;

	var dataStringCookie = "";
	var dataStringCookieBody = "";
	var dataStringDatas = "";
	var dataStringNames = "";

	var cookieDataArray = null;
	var saveDataArray = null;
	var nameDataArray = null;

	var objTextArea = null;

	objTextArea = document.getElementById("OBJID_TEXTAREA_INPUT_SAVE_DATA");

	inputText = objTextArea.value;

	// データチェック
	indexOfCookieTag = inputText.indexOf(tagCookie);
	indexOfDatasTag = inputText.indexOf(tagDatas);
	indexOfNamesTag = inputText.indexOf(tagNames);

	if (indexOfCookieTag < 0) {
		alert("入力データが所定の形式に則っていません。（COOKIEタグ なし）");
		return;
	}

	if (indexOfDatasTag < 0) {
		alert("入力データが所定の形式に則っていません。（DATASタグ なし）");
		return;
	}

	if (indexOfDatasTag < 0) {
		alert("入力データが所定の形式に則っていません。（NAMESタグ なし）");
		return;
	}

	if (indexOfCookieTag > indexOfDatasTag) {
		alert("入力データが所定の形式に則っていません。（タグ順序不正 COOKIE > DATAS）");
		return;
	}

	if (indexOfCookieTag > indexOfNamesTag) {
		alert("入力データが所定の形式に則っていません。（タグ順序不正 COOKIE > NAMES）");
		return;
	}

	if (indexOfDatasTag > indexOfNamesTag) {
		alert("入力データが所定の形式に則っていません。（タグ順序不正 DATAS > NAMES）");
		return;
	}

	// データ切り出し
	dataStringCookie = inputText.substring(indexOfCookieTag + tagCookie.length, indexOfDatasTag);
	dataStringDatas = inputText.substring(indexOfDatasTag + tagDatas.length, indexOfNamesTag);
	dataStringNames = inputText.substring(indexOfNamesTag + tagNames.length);

	dataStringCookie = dataStringCookie.replace(/\n/g, "");
	dataStringDatas = dataStringDatas.replace(/\n/g, "");
	dataStringNames = dataStringNames.replace(/\n/g, "");

	// データ適用
	document.cookie = dataStringCookie;
	localStorage.ROratorioDOM_SaveData = dataStringDatas;
	localStorage.ROratorioDOM_SaveName = dataStringNames;

	alert("セーブデータの更新が終わりました。\nページの再読み込みを行います。");

	document.body.style.display = "none";
	window.scrollTo(0, 0);
	window.location.reload();
}
