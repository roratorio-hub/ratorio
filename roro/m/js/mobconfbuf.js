

// モンスター状態強化設定の限界値
// この数を超える場合は、セーブデータの拡張が必要
MOB_CONF_BUF_LIMIT = 80;

// 初期化作業
let n_B_KYOUKA = [];

MobConfBufOBJ = new Array();

InitMobConfBufData();





//================================================================
// モンスター状態強化データ定義用ダミー関数
// （可読性を高める目的で使用する）
//================================================================
function MobConfBufText(value) { return value; };
function MobConfBufControlType(value) { return value; };
function MobConfBufDefaultValue(value) { return value; };
function MobConfBufMinValue(value) { return value; };
function MobConfBufMaxValue(value) { return value; };





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** モンスター状態強化データ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * モンスター状態強化データを初期化（セットアップ）する.
 */
function InitMobConfBufData() {

	var idx = 0;

	var MobConfBufId = 0;
	var MobConfBufData = new Array();
	var MobConfBufOBJSorted = new Array();

	var indexdefiner = 0;



	//----------------------------------------------------------------
	// データインデックス定義
	//----------------------------------------------------------------
	MOB_CONF_BUF_DATA_INDEX_ID = indexdefiner++;
	MOB_CONF_BUF_DATA_INDEX_TEXT = indexdefiner++;
	MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE = indexdefiner++;
	MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE = indexdefiner++;
	MOB_CONF_BUF_DATA_INDEX_MIN_VALUE = indexdefiner++;
	MOB_CONF_BUF_DATA_INDEX_MAX_VALUE = indexdefiner++;



	//----------------------------------------------------------------
	// データ定義　ここから
	//----------------------------------------------------------------
	MOB_CONF_BUF_ID_SOKUDO_ZOKA = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("速度増加"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(10)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_ASSUMPTIO = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("アスムプティオ"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_ADRENALINE_RUSH = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("(×)アドレナリンラッシュ"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_MAXIMIZE_POWER = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("マキシマイズパワー"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_RUSH_ATTACK = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("ラッシュアタック(ATK3倍 HIT2倍)"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_SOKUDO_KYOKA = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("速度強化(FLEE2倍)"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_ZOKUSEI_HENKA = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("属性変化"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(94)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_STONE_SKIN = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("ストーンスキン"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(5)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_ANTI_MAGIC = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("(△)アンチマジック"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(5)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_KEEPING = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("キーピング"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_DEFENDER = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("ディフェンダー(特殊=耐性87.5%(スリーパー等))"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(6)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_REBIRTH = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("リバース状態(復活後) (カブキはLV2/エリオットは3)"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_NUMBER),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(5)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_DAMAGE_DIVIDE = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("ダメージ減衰"),
		MobConfBufControlType(CONTROL_TYPE_SELECTBOX_SPECIAL),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(100)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;



	MOB_CONF_BUF_ID_MAX_PAIN = MobConfBufId;
	MobConfBufData = [
		MobConfBufId,
		MobConfBufText("マックスペイン"),
		MobConfBufControlType(CONTROL_TYPE_CHECKBOX),
		MobConfBufDefaultValue(0),
		MobConfBufMinValue(0),
		MobConfBufMaxValue(1)
	];
	MobConfBufOBJ[MobConfBufId] = MobConfBufData;
	MobConfBufId++;


	//----------------------------------------------------------------
	// データ定義数チェック
	//----------------------------------------------------------------
	if (MOB_CONF_BUF_LIMIT < MobConfBufOBJ.length) {
		alert("モンスター状態強化　定義数超過");
	}



	//----------------------------------------------------------------
	// 状態強化設定変数配列を初期化
	//----------------------------------------------------------------
	for (idx = 0; idx < MOB_CONF_BUF_LIMIT; idx++) {
		if (idx < MobConfBufOBJ.length) {
			n_B_KYOUKA[idx] = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE];
		}
		else {
			n_B_KYOUKA[idx] = 0;
		}
	}



	//----------------------------------------------------------------
	// 表示順序に従い、状態強化データ定義を再配列
	//----------------------------------------------------------------
	MobConfBufOBJSorted = new Array();
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_DAMAGE_DIVIDE];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_SOKUDO_ZOKA];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_ASSUMPTIO];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_ADRENALINE_RUSH];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_MAXIMIZE_POWER];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_RUSH_ATTACK];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_SOKUDO_KYOKA];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_ZOKUSEI_HENKA];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_STONE_SKIN];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_ANTI_MAGIC];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_KEEPING];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_DEFENDER];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_REBIRTH];
	MobConfBufOBJSorted[MobConfBufOBJSorted.length] = MobConfBufOBJ[MOB_CONF_BUF_ID_MAX_PAIN];
	MobConfBufOBJ = MobConfBufOBJSorted;

}





/**
 * モンスター状態強化設定テーブルを構築する.
 * @param objRoot テーブルの親オブジェクト
 * @param bAsExpand 展開表示フラグ（true : 展開表示、false : ヘッダのみ）
 */
function BuildUpMobConfBufSelectArea(objRoot, bAsExpand) {

	var idx = 0;
	var confId = 0;
	var confText = "";
	var textArray = null;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objText = null;
	var objInput = null;
	var objSelect = null;
	var objOption = null;
	var objLabel = null;



	// 引数のルートオブジェクト配下を一度全削除
	HtmlRemoveAllChild(objRoot);


	// 設定欄のテーブルを生成
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// 設定欄テーブルのヘッダ部分を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_TD_MOB_CONF_BUF_HEADER");
	objTd.setAttribute("colspan", 2);
	objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_BUF_SWITCH");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("onClick", "OnClickMobConfBufSwitch()");
	if (bAsExpand) {
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_INPUT_MOB_CONF_BUF_SWITCH");
	HtmlCreateTextNode("モンスター状態強化設定", objLabel);



	// 展開表示でなければ、ヘッダだけ更新して終了
	if (!bAsExpand) {
		// ヘッダ更新
		RefreshMobConfBufSelectAreaHeader();

		return;
	}



	// モンスター状態強化設定定義をループして、設定欄を構築する
	for (idx = 0; idx < MobConfBufOBJ.length; idx++) {

		// モンスター状態強化設定ＩＤを取得
		confId = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_ID];



		// 設定欄用のテーブル行を生成
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);



		// 表示名の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		confText = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_TEXT];
		objText = document.createTextNode(confText);
		objTd.appendChild(objText);



		// 設定値の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		controlType = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE];



		// 設定方法が数値選択方式の場合
		switch (controlType) {
		case CONTROL_TYPE_SELECTBOX_NUMBER:

			// 選択セレクトボックスを生成
			objSelect = document.createElement("select");
			objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_BUF_" + confId);
			objSelect.setAttribute("onChange", "OnChangeMobConfBuf(true)");
			objTd.appendChild(objSelect);

			// 範囲定義に従い、セレクトオプションを生成
			controlValueMin = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_MAX_VALUE];
			for (controlValue = controlValueMin; controlValue <= controlValueMax; controlValue++) {
				objOption = HtmlCreateElementOption(controlValue, controlValue, objSelect);
			}

			// 初期値設定
			objSelect.setAttribute("value", MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]);

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:

			// チェックボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_BUF_" + confId);
			objInput.setAttribute("type", "checkbox");
			objInput.setAttribute("onChange", "OnChangeMobConfBuf(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			if (MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE] == 1) {
				objInput.setAttribute("checked", "checked");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:

			// 予備(未使用)入力テキストボックスを生成
			objInput = document.createElement("input");
			objInput.setAttribute("type", "text");
			objInput.setAttribute("id", "OBJID_INPUT_MOB_CONF_BUF_" + confId);
			objInput.setAttribute("size", "6");
			objInput.setAttribute("onChange", "OnChangeMobConfBuf(true)");
			objTd.appendChild(objInput);

			// 初期値設定
			objInput.setAttribute("value", MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]);

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SELECTBOX_SPECIAL:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			// 属性変化
			case MOB_CONF_BUF_ID_ZOKUSEI_HENKA:

				// 属性選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_BUF_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfBuf(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(0, "なし", objSelect);

				objOption = HtmlCreateElementOption(1, "無1", objSelect);
				objOption = HtmlCreateElementOption(2, "無2", objSelect);
				objOption = HtmlCreateElementOption(3, "無3", objSelect);
				objOption = HtmlCreateElementOption(4, "無4", objSelect);

				objOption = HtmlCreateElementOption(11, "水1", objSelect);
				objOption = HtmlCreateElementOption(12, "水2", objSelect);
				objOption = HtmlCreateElementOption(13, "水3", objSelect);
				objOption = HtmlCreateElementOption(14, "水4", objSelect);

				objOption = HtmlCreateElementOption(21, "地1", objSelect);
				objOption = HtmlCreateElementOption(22, "地2", objSelect);
				objOption = HtmlCreateElementOption(23, "地3", objSelect);
				objOption = HtmlCreateElementOption(24, "地4", objSelect);

				objOption = HtmlCreateElementOption(31, "火1", objSelect);
				objOption = HtmlCreateElementOption(32, "火2", objSelect);
				objOption = HtmlCreateElementOption(33, "火3", objSelect);
				objOption = HtmlCreateElementOption(34, "火4", objSelect);

				objOption = HtmlCreateElementOption(41, "風1", objSelect);
				objOption = HtmlCreateElementOption(42, "風2", objSelect);
				objOption = HtmlCreateElementOption(43, "風3", objSelect);
				objOption = HtmlCreateElementOption(44, "風4", objSelect);

				objOption = HtmlCreateElementOption(51, "毒1", objSelect);
				objOption = HtmlCreateElementOption(52, "毒2", objSelect);
				objOption = HtmlCreateElementOption(53, "毒3", objSelect);
				objOption = HtmlCreateElementOption(54, "毒4", objSelect);

				objOption = HtmlCreateElementOption(61, "聖1", objSelect);
				objOption = HtmlCreateElementOption(62, "聖2", objSelect);
				objOption = HtmlCreateElementOption(63, "聖3", objSelect);
				objOption = HtmlCreateElementOption(64, "聖4", objSelect);

				objOption = HtmlCreateElementOption(71, "闇1", objSelect);
				objOption = HtmlCreateElementOption(72, "闇2", objSelect);
				objOption = HtmlCreateElementOption(73, "闇3", objSelect);
				objOption = HtmlCreateElementOption(74, "闇4", objSelect);

				objOption = HtmlCreateElementOption(81, "念1", objSelect);
				objOption = HtmlCreateElementOption(82, "念2", objSelect);
				objOption = HtmlCreateElementOption(83, "念3", objSelect);
				objOption = HtmlCreateElementOption(84, "念4", objSelect);

				objOption = HtmlCreateElementOption(91, "不死1", objSelect);
				objOption = HtmlCreateElementOption(92, "不死2", objSelect);
				objOption = HtmlCreateElementOption(93, "不死3", objSelect);
				objOption = HtmlCreateElementOption(94, "不死4", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]);

				break;



			// ディフェンダー
			case MOB_CONF_BUF_ID_DEFENDER:

				// レベル選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_BUF_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfBuf(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(0, "0", objSelect);
				objOption = HtmlCreateElementOption(1, "1", objSelect);
				objOption = HtmlCreateElementOption(2, "2", objSelect);
				objOption = HtmlCreateElementOption(3, "3", objSelect);
				objOption = HtmlCreateElementOption(4, "4", objSelect);
				objOption = HtmlCreateElementOption(5, "5", objSelect);
				objOption = HtmlCreateElementOption(6, "特殊", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]);

				break;



			// ダメージ減衰
			case MOB_CONF_BUF_ID_DAMAGE_DIVIDE:

				// レベル選択セレクトボックスを生成
				objSelect = document.createElement("select");
				objSelect.setAttribute("id", "OBJID_SELECT_MOB_CONF_BUF_" + confId);
				objSelect.setAttribute("onChange", "OnChangeMobConfBuf(true)");
				objTd.appendChild(objSelect);

				objOption = HtmlCreateElementOption(0, "等倍", objSelect);
				objOption = HtmlCreateElementOption(1, "１／２", objSelect);
				objOption = HtmlCreateElementOption(2, "１／５", objSelect);
				objOption = HtmlCreateElementOption(3, "１／１０", objSelect);
				objOption = HtmlCreateElementOption(4, "１／２０", objSelect);
				objOption = HtmlCreateElementOption(5, "１／５０", objSelect);
				objOption = HtmlCreateElementOption(6, "１／１００", objSelect);
				objOption = HtmlCreateElementOption(7, "１／２００", objSelect);
				objOption = HtmlCreateElementOption(8, "１／５００", objSelect);
				objOption = HtmlCreateElementOption(9, "１／１０００", objSelect);

				// 初期値設定
				objSelect.setAttribute("value", MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]);

				break;
			}
		}

	}



	// 変数の値をもとに、設定欄の各コントロールを同期
	SyncronizeMobConfBufSettingsVarToCtrl();

	// ヘッダ更新
	RefreshMobConfBufSelectAreaHeader();
}





/**
 * モンスター状態強化設定欄の状態を同期させる（変数の値をコントロール部品へ反映）.
 */
function SyncronizeMobConfBufSettingsVarToCtrl() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;



	// モンスター状態強化設定定義をループして、設定欄の状態を同期
	for (idx = 0; idx < MobConfBufOBJ.length; idx++) {

		confId = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_ID];
		controlType = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_BUF_" + confId);
			objSelect.value = n_B_KYOUKA[confId];

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_BUF_" + confId);

			if (n_B_KYOUKA[confId]) {
				objInput.setAttribute("checked", "checked");
			}
			else {
				objInput.removeAttribute("checked");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_BUF_" + confId);
			objInput.value = n_B_KYOUKA[confId];

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}





/**
 * モンスター状態強化設定欄の状態を同期させる（コントロール部品の状態を変数へ反映）.
 */
function SyncronizeMobConfBufSettingsCtrlToVar() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;
	var controlValue = 0;
	var controlValueMin = 0;
	var controlValueMax = 0;

	var objSelect = null;
	var objInput = null;



	// モンスター状態強化設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfBufOBJ.length; idx++) {

		confId = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_ID];
		controlType = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_BUF_" + confId);
			n_B_KYOUKA[confId] = parseInt(objSelect.value);

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			n_B_KYOUKA[confId] = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_BUF_" + confId, false);

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_BUF_" + confId);
			n_B_KYOUKA[confId] = parseInt(objInput.value);

			// 範囲外補正
			controlValueMin = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_MIN_VALUE];
			controlValueMax = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_MAX_VALUE];
			n_B_KYOUKA[confId] = ValueRangeModify(n_B_KYOUKA[confId], controlValueMin, controlValueMax);
			objInput.value = n_B_KYOUKA[confId];

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}





/**
 * モンスター状態強化設定欄の展開スイッチクリックイベントハンドラ.
 */
function OnClickMobConfBufSwitch() {

	var bExpand = false;
	var objInput = null;

	// 展開スイッチの状態を取得
	bExpand = HtmlGetObjectCheckedById("OBJID_INPUT_MOB_CONF_BUF_SWITCH", false);

	// 構築関数呼び出し
	BuildUpMobConfBufSelectArea(document.getElementById("OBJID_TD_MOB_CONF_BUF"), bExpand);

	// コントロールのCSSを更新する
	if (bExpand) {
		RefreshMobConfBufControlCSS();
	}
}





/**
 * モンスター状態強化設定欄の設定値変更イベントハンドラ.
 * @param bCalc 再計算フラグ（true : 再計算する、false : 再計算しない）
 */
function OnChangeMobConfBuf(bCalc) {

	// 設定の変更を変数に同期させる
	SyncronizeMobConfBufSettingsCtrlToVar();

	// ヘッダの表示を更新する
	RefreshMobConfBufSelectAreaHeader();

	// コントロールのCSSを更新する
	RefreshMobConfBufControlCSS();

	// 再計算フラグが立っている場合は、再計算を実行
	if (bCalc) {
		//calc();
		AutoCalc("OnChangeMobConfBuf");
	}
}





/**
 * モンスター状態強化設定テーブルのヘッダをリフレッシュする.
 */
function RefreshMobConfBufSelectAreaHeader() {

	var bSet = false;
	var bChecked = false;

	var idx = 0;
	var confId = 0;

	var objSelect = null;
	var objTd = null;



	// モンスター状態強化設定定義をループして、設定欄の状態を検査
	for (idx = 0; idx < MobConfBufOBJ.length; idx++) {

		confId = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_ID];

		if (n_B_KYOUKA[confId] != MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]) {
			bSet = true;
			break;
		}
	}



	// 設定状況に応じて、ヘッダ部分の表示を更新
	objTd = document.getElementById("OBJID_TD_MOB_CONF_BUF_HEADER");
	if (bSet) {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_SET);
	}
	else {
		objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	}
}





/**
 * モンスター状態強化設定欄の選択状態により、コントロールのCSSを変更する.
 */
function RefreshMobConfBufControlCSS() {

	var idx = 0;
	var confId = 0;

	var controlType = 0;

	var objSelect = null;
	var objInput = null;



	// モンスター状態強化設定定義をループして、設定欄の状態をもとに変数を同期
	for (idx = 0; idx < MobConfBufOBJ.length; idx++) {

		confId = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_ID];
		controlType = MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_CONTROL_TYPE];



		switch (controlType) {

		// 設定方法が数値選択方式の場合
		case CONTROL_TYPE_SELECTBOX_NUMBER:
		case CONTROL_TYPE_SELECTBOX_SPECIAL:

			objSelect = document.getElementById("OBJID_SELECT_MOB_CONF_BUF_" + confId);
			if (!objSelect) {
				continue;
			}

			if (objSelect.value != MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]) {
				objSelect.setAttribute("class", "CSSCLS_SELECTED_MOB_CONF_BUF");
			}
			else {
				objSelect.setAttribute("class", "");
			}

			break;



		// 設定方法がチェック方式の場合
		case CONTROL_TYPE_CHECKBOX:
		case CONTROL_TYPE_CHECKBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_BUF_" + confId);
			if (!objInput) {
				continue;
			}

			if ((objInput.checked) && (MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE] != 1)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_BUF");
			}
			if ((!objInput.checked) && (MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE] != 0)) {
				objInput.setAttribute("class", "CSSCLS_CHECKED_MOB_CONF_BUF");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;



		// 設定方法が数値入力方式の場合
		case CONTROL_TYPE_TEXTBOX_NUMBER:
		case CONTROL_TYPE_TEXTBOX_SPECIAL:

			objInput = document.getElementById("OBJID_INPUT_MOB_CONF_BUF_" + confId);
			if (!objInput) {
				continue;
			}

			if (objInput.value != MobConfBufOBJ[idx][MOB_CONF_BUF_DATA_INDEX_DEFAULT_VALUE]) {
				objInput.setAttribute("class", "CSSCLS_INPUTTED_MOB_CONF_BUF");
			}
			else {
				objInput.setAttribute("class", "");
			}

			break;



		// 設定方法が特殊方式の場合
		case CONTROL_TYPE_SPECIAL:

			// 個別に実装する
			switch (confId) {

			}
		}
	}
}

