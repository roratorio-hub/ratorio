// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * デバッグエリアコンポーネントマネージャクラス.
 */
function CDebugAreaComponentManager () {

}



/**
 * 画面部品を再構築する.
 */
CDebugAreaComponentManager.RebuildControls = function () {

	var idx = 0;

	var colspan = 0;
	var switchChecked = false;

	var objSwitch = null;

	var objRoot = null;
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



	// 列数定義
	colspan = 5;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_DEBUG_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_DEBUG_AREA");
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
	objTd.setAttribute("id", "OBJID_DEBUG_AREA_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", colspan);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_DEBUG_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_DEBUG_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("デバッグ機能", objLabel);



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	CDebugAreaComponentManager.RefreshDebugAreaHeader();

	// 展開表示でなければ、終了
	if (!switchChecked) {
		return;
	}



	//----------------------------------------------------------------
	// データ出力行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("定義済みデータ出力", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_OUTPUT_CONST_DATA_KIND");

	EnumConstDataKind.For(
		function (idx, name, value) {
			HtmlCreateElementOption(value, GetConstDataKindText(value), objSelect);
		},
		[
			"CONST_DATA_KIND_NONE"
		]
	);
	HtmlCreateElementOption(100 + CONST_DATA_KIND_ENCHANT_LIST, "[MIG] " + GetConstDataKindText(CONST_DATA_KIND_ENCHANT_LIST), objSelect);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_CHECK_OUTPUT_CONST_DATA_READABLE_FLAG");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("checked", "checked");

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_OUTPUT_CONST_DATA_READABLE_FLAG");
	HtmlCreateTextNode("可読モード", objLabel);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("id", "OBJID_CHECK_OUTPUT_CONST_DATA_REVERSE_ASSEMBLE_FLAG");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("checked", "checked");

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CHECK_OUTPUT_CONST_DATA_REVERSE_ASSEMBLE_FLAG");
	HtmlCreateTextNode("逆変換", objLabel);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "出力");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickOutputConstData()");



	//----------------------------------------------------------------
	// データ出力行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("定義済みデータ dat 出力", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_OUTPUT_DAT_CONST_DATA_KIND");

	EnumConstDataKind.For(
		function (idx, name, value) {
			HtmlCreateElementOption(value, GetConstDataKindText(value), objSelect);
		},
		[
			"CONST_DATA_KIND_NONE"
		]
	);
	HtmlCreateElementOption(100 + CONST_DATA_KIND_ENCHANT_LIST, "[MIG] " + GetConstDataKindText(CONST_DATA_KIND_ENCHANT_LIST), objSelect);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "dat 出力");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickOutputDatConstData()");



	//----------------------------------------------------------------
	// データ検査行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("定義済みデータ検査", objTd);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "検査");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickCheckConstData()");



	//----------------------------------------------------------------
	// 定義データダンプ行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("定義済みデータダンプ", objTd);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "ダンプ");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickDumpConstData()");



	//----------------------------------------------------------------
	// 計算データダンプ行
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	HtmlCreateTextNode("計算データ出力", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSelect = HtmlCreateElement("select", objTd);
	objSelect.setAttribute("id", "OBJID_SELECT_OUTPUT_FILE_CALC_DATA");


	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);

	objTd = HtmlCreateElement("td", objTr);
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "出力");
	objInput.setAttribute("onclick", "CDebugAreaComponentManager.OnClickOutputCalcData()");



	//----------------------------------------------------------------
	// 出力欄
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", colspan);
	objTextArea = HtmlCreateElement("textarea", objTd);
	objTextArea.setAttribute("id", "OBJID_TEXTAREA_DEBUG_OUTPUT");
	objTextArea.setAttribute("cols", "120");
	objTextArea.setAttribute("rows", "10");

};



/**
 * 展開チェックボックス切り替えイベントハンドラ.
 */
CDebugAreaComponentManager.OnClickExtractSwitch = function () {
	// 再構築する
	CDebugAreaComponentManager.RebuildControls();
};



/**
 * ヘッダ部品を再設定する.
 */
CDebugAreaComponentManager.RefreshDebugAreaHeader = function () {

	var switchChecked = false;

	var objSwitch = null;
	var objHeader = null;

	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_DEBUG_AREA_EXTRACT_CHECKBOX");
	switchChecked = objSwitch.checked;

	// ヘッダの CSS を調整
	objHeader = document.getElementById("OBJID_DEBUG_AREA_HEADER");
	if (switchChecked) {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER_USED");
	}
	else {
		objHeader.setAttribute("class", "CSSCLS_SWITCH_HEADER");
	}
};



/**
 * 定義済みデータ出力ボタン押下イベントハンドラ.
 */
CDebugAreaComponentManager.OnClickOutputConstData = function () {

	var bReadableMode = false;
	var bReverseAssemble = false;
	var targetDataKind = 0;
	var extractedText = "";

	var objInput = null;

	// 可読モードフラグ取得
	objInput = document.getElementById("OBJID_CHECK_OUTPUT_CONST_DATA_READABLE_FLAG");
	if (objInput.checked) {
		bReadableMode = true;
	}

	// 逆変換フラグ取得
	objInput = document.getElementById("OBJID_CHECK_OUTPUT_CONST_DATA_REVERSE_ASSEMBLE_FLAG");
	if (objInput.checked) {
		bReverseAssemble = true;
	}

	// 対象データ種別取得
	targetDataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_OUTPUT_CONST_DATA_KIND", 0);

	// 展開処理呼び出し
	switch (targetDataKind) {

	case CONST_DATA_KIND_ITEM:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeItem20200509();
		}
		else {
			extractedText = ExtractDataArray(ItemObjNew, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_ARROW:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeArrow20200510();
		}
		else {
			extractedText = ExtractDataArray(ArrowOBJNew, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_CARD:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeCard20200509();
		}
		else {
			extractedText = ExtractDataArray(CardObjNew, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_COSTUME:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeCostume20200509();
		}
		else {
			extractedText = ExtractDataArray(CostumeOBJ, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_ITEM_SET:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeItemSet20200510();
		}
		else {
			extractedText = ExtractDataArray(w_SE, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_ENCHANT_TYPE:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeEnchType20200818();
		}
		else {
			extractedText = ExtractDataArray(n_EnchantType, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeEnchList20200818();
		}
		else {
			extractedText = ExtractDataArray(n_EnchantList, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_TIME_ITEM:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeTimeItem20200510();
		}
		else {
			extractedText = ExtractDataArray(ITEM_SP_TIME_OBJ, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_ITEM_PACK:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeItemPack20200510();
		}
		else {
			extractedText = ExtractDataArray(ItemPackOBJ, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_SKILL:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeSkill20200525();
		}
		else {
			extractedText = ExtractDataArray(SkillObjNew, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_USABLE_SKILL:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeUsableSkill20200525();
		}
		else {
			extractedText = ExtractDataArray(InsertSkill, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_AUTO_SPELL:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeAutoSpell20200525();
		}
		else {
			extractedText = ExtractDataArray(AutoSpellSkill, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_MONSTER:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeMonster20221206();
		}
		else {
			extractedText = ExtractDataArray(MonsterObjNew, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_MONSTER_GROUP:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeMonsterGroup20200525();
		}
		else {
			extractedText = ExtractDataArray(MonsterGroupObj, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_MONSTER_MAP:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeMonsterMap20200525();
		}
		else {
			extractedText = ExtractDataArray(g_MonsterMapDataArray, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_PET:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodePet20200909();
		}
		else {
			extractedText = ExtractDataArray(PET_OBJ, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_CARD_SORT_DATA:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeCardSortData20200510();
		}
		else {
			extractedText = ExtractDataArray(CardSortOBJ, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_TIME_ITEM_SORT_DATA:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeTimeItemSortData20200510();
		}
		else {
			extractedText = ExtractDataArray(ITEM_SP_TIME_OBJ_SORT, 0, bReadableMode);
		}
		break;

	case CONST_DATA_KIND_JOB_SKILL_PASSIVE:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeJobSkillPassiveData20200525();
		}
		break;

	case CONST_DATA_KIND_JOB_SKILL_ACTIVE:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeJobSkillActiveData20200525();
		}
		break;

	case CONST_DATA_KIND_JOB_SKILL_LEARNED:
		if (bReverseAssemble) {
			extractedText = CReverseCoder.GetReverseCodeJobSkillLearnedData20200525();
		}
		break;

	case (100 + CONST_DATA_KIND_ENCHANT_LIST):
		extractedText = ExtractDataArray(n_EnchantList, 0, bReadableMode);
		break;

	}

	// 出力欄に設定
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", "");
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", extractedText);
};



/**
 * 定義済みデータ dat 出力ボタン押下イベントハンドラ.
 */
CDebugAreaComponentManager.OnClickOutputDatConstData = function () {

	var targetDataKind = 0;
	var datText = "";

	// 対象データ種別取得
	targetDataKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_OUTPUT_DAT_CONST_DATA_KIND", 0);

	// 展開処理呼び出し
	switch (targetDataKind) {

	case CONST_DATA_KIND_ITEM:
		datText = CDatCoder.CreateDatCodeItem20230613();
		break;

	case CONST_DATA_KIND_ARROW:
		datText = CDatCoder.CreateDatCodeArrow20200510();
		break;

	case CONST_DATA_KIND_CARD:
		datText = CDatCoder.CreateDatCodeCard20200510();
		break;

	case CONST_DATA_KIND_COSTUME:
		datText = CDatCoder.CreateDatCodeCostume20200510();
		break;

	case CONST_DATA_KIND_ITEM_SET:
		datText = CDatCoder.CreateDatCodeItemSet20200909();
		break;

	case CONST_DATA_KIND_ENCHANT_TYPE:
		datText = CDatCoder.CreateDatCodeEnchantType20200510();
		break;

	case CONST_DATA_KIND_ENCHANT_LIST:
		datText = CDatCoder.CreateDatCodeEnchantList20200510();
		break;

	case CONST_DATA_KIND_TIME_ITEM:
		datText = CDatCoder.CreateDatCodeTimeItem20200510();
		break;

	case CONST_DATA_KIND_ITEM_PACK:
		datText = CDatCoder.CreateDatCodeItemPack20200510();
		break;

	case CONST_DATA_KIND_SKILL:
		datText = CDatCoder.CreateDatCodeSkill20200525();
		break;

	case CONST_DATA_KIND_USABLE_SKILL:
		datText = CDatCoder.CreateDatCodeUsableSkill20200525();
		break;

	case CONST_DATA_KIND_AUTO_SPELL:
		datText = CDatCoder.CreateDatCodeAutoSpell20200525();
		break;

	case CONST_DATA_KIND_MONSTER:
		datText = CDatCoder.CreateDatCodeMonster20230905();
		break;

	case CONST_DATA_KIND_MONSTER_GROUP:
		datText = CDatCoder.CreateDatCodeMonsterGroup20200525();
		break;

	case CONST_DATA_KIND_MONSTER_MAP:
		datText = CDatCoder.CreateDatCodeMonsterMap20210727();
		break;

	case CONST_DATA_KIND_PET:
		datText = CDatCoder.CreateDatCodePet20200909();
		break;

	case CONST_DATA_KIND_RND_OPT_TYPE:
		datText = CDatCoder.CreateDatCodeRndOptType20201110();
		break;

	case CONST_DATA_KIND_RND_OPT_LIST:
		datText = CDatCoder.CreateDatCodeRndOptList20201110();
		break;

	case CONST_DATA_KIND_RND_OPT:
		datText = CDatCoder.CreateDatCodeRndOpt20201110();
		break;

	case CONST_DATA_KIND_CHANGE_LOG:
		datText = CDatCoder.CreateDatCodeChangeLog20210120();
		break;

	case CONST_DATA_KIND_ALIAS:
		datText = CDatCoder.CreateDatCodeAlias20210727();
		break;

	case CONST_DATA_KIND_HPSPBASE:
		datText = CDatCoder.CreateDatCodeHpSp20221011();
		break;

	case CONST_DATA_KIND_CHARA:
		datText = CDatCoder.CreateDatCodeChara20221012();
		break;

	case CONST_DATA_KIND_JOB:
		datText = CDatCoder.CreateDatCodeJob20221112();
		break;

	case (100 + CONST_DATA_KIND_ENCHANT_LIST):
		datText = CDatCoder.CreateDatCodeMigEnchantList20220424();
		break;

	}

	// 出力欄に設定
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", "");
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", datText);
};



/**
 * 定義済みデータ検査ボタン押下イベントハンドラ.
 */
CDebugAreaComponentManager.OnClickCheckConstData = function () {


	MigHpSpTableMigrationTest20221012();
	return;


	var errorText = "";

	// 検査処理呼び出し
	errorText = CReverseCoder.CheckSpIdValidity20200509();

	// 出力欄に設定
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", "");
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", errorText);
};



/**
 * 定義済みデータダンプボタン押下イベントハンドラ.
 */
CDebugAreaComponentManager.OnClickDumpConstData = function () {

	var idx = 0;
	var idxVal = 0;
	var dumpText = "";



// スキルデータ統合チェック
if (false) {

	WriteConsoleLog("スキルデータ統合チェック：開始");

	for (idx = 0; idx < SkillObjNew.length; idx++) {

		if (SkillObjNew[idx][0] != g_skillManager.dataArray[idx].id) {
			WriteConsoleLog("ID不一致：idx == " + idx + "（" + SkillObjNew[idx][2] + "）");
		}

		if (SkillObjNew[idx][1] != g_skillManager.GetMaxLv(idx)) {
			WriteConsoleLog("最大Lv不一致：idx == " + idx + "（" + SkillObjNew[idx][2] + "）");
		}

		if (SkillObjNew[idx][2] != g_skillManager.GetSkillName(idx)) {
			WriteConsoleLog("名称不一致：idx == " + idx + "（" + SkillObjNew[idx][2] + "）");
		}
	}

	WriteConsoleLog("スキルデータ統合チェック：完了");
	return;
}





// RRTGET 専用処理（使用する場合のみ true にする）
if (false) {

	var targetItemKindArray = [
		ITEM_KIND_KNIFE,
		ITEM_KIND_SWORD,
		ITEM_KIND_SWORD_2HAND,
		ITEM_KIND_SPEAR,
		ITEM_KIND_SPEAR_2HAND,
		ITEM_KIND_AXE,
		ITEM_KIND_AXE_2HAND,
		ITEM_KIND_CLUB,
		ITEM_KIND_STUFF,
		ITEM_KIND_BOW,
		ITEM_KIND_KATAR,
		ITEM_KIND_BOOK,
		ITEM_KIND_FIST,
		ITEM_KIND_MUSICAL,
		ITEM_KIND_WHIP,
		ITEM_KIND_FUMA,
		ITEM_KIND_HANDGUN,
		ITEM_KIND_RIFLE,
		ITEM_KIND_SHOTGUN,
		ITEM_KIND_GATLINGGUN,
		ITEM_KIND_GRENADEGUN,
		ITEM_KIND_HEAD_TOP,
		ITEM_KIND_HEAD_MID,
		ITEM_KIND_HEAD_UNDER,
		ITEM_KIND_BODY,
		ITEM_KIND_SHIELD,
		ITEM_KIND_SHOULDER,
		ITEM_KIND_FOOT,
		ITEM_KIND_ACCESSARY,
		ITEM_KIND_ACCESSARY_ON1,
		ITEM_KIND_ACCESSARY_ON2,
	];

	var idxKana = 0;
	var regHiragana = /([\u3041-\u3094])/u;
	var regAlphaHanSho = /([\u0061-\u007A])/u;
	var regAlphaHanDai = /([\u0041-\u005A])/u;
	var regAlphaZenSho = /([\uFF41-\uFF5F])/u;
	var regNumHan = /([\u0030-\u0039])/u;
	var regMinus = /([\u002D\uFF0D])/u;
	var regSPHan = /(\u0020)/u;
	var regKanaCheck = /^[\u30A1-\u30F4\uFF21-\uFF3F\uFF10-\uFF19\u3000ー]+$/u;
	var execKana = null;

	for (idx = 0; idx < ItemObjNew.length; idx++) {

		// 対象外はスキップ
		if (targetItemKindArray.indexOf(ItemObjNew[idx][ITEM_DATA_INDEX_KIND]) < 0) {
			continue;
		}


		// 読み仮名は名称から生成する
		var kana = ItemObjNew[idx][ITEM_DATA_INDEX_NAME];

		if (!regKanaCheck.test(kana)) {

			// 読み仮名整形処理
			for (idxKana = 0; idxKana < kana.length; idxKana++) {

				// ローマ数字は、アルファベットのアイ等で代用されており、断定できないので対応しない

				// ひらがなをカタカナへ変換
				execKana = regHiragana.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) + 0x0060)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 半角英小文字を全角大文字へ変換
				execKana = regAlphaHanSho.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) + 0xFF00 - 0x0040)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 半角英大文字を全角大文字へ変換
				execKana = regAlphaHanDai.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) + 0xFF00 - 0x0020)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 全角英文字小文字を大文字へ変換
				execKana = regAlphaZenSho.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) - 0x0020)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 半角数字を全角数字へ変換
				execKana = regNumHan.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) + 0xFF00 - 0x0020)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 半角/全角マイナス記号を全角スペースへ変換
				execKana = regMinus.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(0x3000)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}

				// 半角スペースを全角スペースへ変換
				execKana = regSPHan.exec(kana.charAt(idxKana));
				if (execKana) {
					kana =
						((idxKana >= 1) ? kana.slice(0, idxKana) : "")
						+ String.fromCharCode(execKana[1].charCodeAt(0) + 0x3000 - 0x0020)
						+ ((idxKana < (kana.length - 1)) ? kana.slice(idxKana + 1) : "");
					continue;
				}
			}

			if (!regKanaCheck.test(kana)) {
				kana = "";
			}
		}


		dumpText += "\"" + ItemObjNew[idx][ITEM_DATA_INDEX_NAME] + "\"" + ",";
		dumpText += "\"" + kana + "\"" + ",";
		dumpText += "\"" + EnumItemId.GetDefinedName(ItemObjNew[idx][ITEM_DATA_INDEX_ID]) + "\"" + "\r\n";
	}

	// 出力欄に設定
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", "");
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", dumpText);

	return;
}




	// データ配列を一切加工せず、ただ出力する
	dumpText += "// ItemObjNew" + "\n";
	dumpText += ExtractDataArray(ItemObjNew, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// ArrowOBJNew" + "\n";
	dumpText += ExtractDataArray(ArrowOBJNew, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// CardObjNew" + "\n";
	dumpText += ExtractDataArray(CardObjNew, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// CostumeOBJ" + "\n";
	dumpText += ExtractDataArray(CostumeOBJ, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// w_SE" + "\n";
	dumpText += ExtractDataArray(w_SE, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// n_EnchantType" + "\n";
	dumpText += ExtractDataArray(n_EnchantType, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// n_EnchantList" + "\n";
	dumpText += ExtractDataArray(n_EnchantList, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// ITEM_SP_TIME_OBJ" + "\n";
	dumpText += ExtractDataArray(ITEM_SP_TIME_OBJ, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// ItemPackOBJ" + "\n";
	dumpText += ExtractDataArray(ItemPackOBJ, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// SkillObjNew" + "\n";
	dumpText += ExtractDataArray(SkillObjNew, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// InsertSkill" + "\n";
	dumpText += ExtractDataArray(InsertSkill, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// AutoSpellSkill" + "\n";
	dumpText += ExtractDataArray(AutoSpellSkill, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// CardSortOBJ" + "\n";
	dumpText += ExtractDataArray(CardSortOBJ, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// ITEM_SP_TIME_OBJ_SORT" + "\n";
	dumpText += ExtractDataArray(ITEM_SP_TIME_OBJ_SORT, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// MonsterObjNew" + "\n";
	dumpText += ExtractDataArray(MonsterObjNew, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// MonsterGroupObj" + "\n";
	dumpText += ExtractDataArray(MonsterGroupObj, 0, false);
	dumpText += "\n\n\n";

	dumpText += "// PET_OBJ" + "\n";
	dumpText += ExtractDataArray(PET_OBJ, 0, false);
	dumpText += "\n\n\n";



	// 出力欄に設定
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", "");
	HtmlSetObjectValueById("OBJID_TEXTAREA_DEBUG_OUTPUT", dumpText);
};



/**
 * 計算データ出力ボタン押下イベントハンドラ.
 */
CDebugAreaComponentManager.OnClickOutputCalcData = function () {

	// 出力欄に設定
//	CCalcDataTextCreator.SetCalcDataTextObjectValue(document.getElementById("OBJID_TEXTAREA_DEBUG_OUTPUT"));
};



// 初期構築処理
CDebugAreaComponentManager.RebuildControls();



// RRTGET 用初期処理
if (_DEBUG) {
	HtmlCreateElement("div", document.getElementById("OBJID_RRTGET_ROOT")).setAttribute("id", "OBJID_RRTGET");
}








