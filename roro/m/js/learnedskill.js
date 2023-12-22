
var n_SkillSWLearned = false;

LEARNED_SKILL_MAX_COUNT = 200;

//================================================================================================
//================================================================================================
//====
//==== 習得スキル欄
//====
//================================================================================================
//================================================================================================

n_A_LearnedSkill = new Array();
for (var dmyidx = 0; dmyidx < LEARNED_SKILL_MAX_COUNT; dmyidx++) {
	n_A_LearnedSkill[dmyidx] = 0;
}

function LearnedSkillSearch(skillId) {

	var idx = 0;
	var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();


	for (idx = 0; idx < learnSkillIdArray.length; idx++) {
		if (learnSkillIdArray[idx] == skillId) {
			return n_A_LearnedSkill[idx];
		}
	}

	return 0;

}

function OnClickSkillSWLearned(){

	var objSW = null;

	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objInput = null;
	var objText = null;
	var objSpan = null;
	var objA = null;
	var objLabel = null;

	var skillId = 0;
	var skillName = "";
	var objSelect = null;
	var objOption = null;



	// チェックボックスのチェック状態を取得
	n_SkillSWLearned = false;
	objSW = document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX");
	if (objSW) {
		n_SkillSWLearned = objSW.checked;
	}



	// 設定欄を初期化
	objRoot = document.getElementById("ID_SKILL_LEARNED");
	while (objRoot.firstChild) {
		objRoot.removeChild(objRoot.firstChild);
	}

	// 設定欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	// 設定欄のヘッダ部分を構築
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_SKILL_COLUMN_HEADER_LEARNED");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", 6);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX");
	objInput.setAttribute("onClick", "OnClickSkillSWLearned()");
	if (n_SkillSWLearned) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("習得スキル（装備効果用）", objLabel);

	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "OBJID_SKILL_COLUMN_USEDTEXT_LEARNED");
	objTd.appendChild(objSpan);

	objText = document.createTextNode("　　");
	objTd.appendChild(objText);

	// 注意喚起テキスト
	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "ID_SKILL_LEARNED_NOTICE");
	objSpan.setAttribute("style", "color : red");
	objTd.appendChild(objSpan);

	UpdateLearnedSkillNotice();


	// 設定欄の注意書き部分を構築
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("colspan", 6);
	objTr.appendChild(objTd);

	objText = document.createTextNode("この欄の対象装備は、アイテムデータ欄などで確認してください");
	objTd.appendChild(objText);
	objTd.appendChild(document.createElement("br"));
	objText = document.createTextNode("（装備名に【習】がついている装備、アイテムデータで【習得スキル設定対象】と書かれているものが対象です）");
	objTd.appendChild(objText);
	objTd.appendChild(document.createElement("br"));
	objText = document.createTextNode("（該当のアイテムを装備したうえで、この設定欄を開き、対象のスキルの習得レベルを設定してください）");
	objTd.appendChild(objText);
	objTd.appendChild(document.createElement("br"));
	objText = document.createTextNode("（書かれていないものは、「パッシブ持続系」などから設定してください）");
	objTd.appendChild(objText);



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	RefreshSkillColumnHeaderLearned(null, -1, 0);

	// 展開表示しない場合は、ここで処理終了
	if (!n_SkillSWLearned) {
		return;
	}



	// 設定欄内のスキルテーブルを構築
	var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();

	for (var idx = 0; idx < learnSkillIdArray.length; idx++) {

		skillId = learnSkillIdArray[idx];

		// １行あたり３個のスキル表示とする
		if ((idx % 3) == 0) {
			objTr = document.createElement("tr");
			objTbody.appendChild(objTr);
		}

		// スキル名の表示
		skillName = SkillObjNew[skillId][SKILL_DATA_INDEX_NAME];
		skillName = skillName.replace(/\([^)]*\)/g, "");
		skillName = skillName.replace(/\<[^>]*\>/g, "");

		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_LEARNED_SKILL_NAME_" + idx);
		objTr.appendChild(objTd);

		// 習得スキル設定対象でれあば、強調表示クラスに設定
		if (IsLearnedSkillTarget(skillId)) {
			objTd.setAttribute("class", "CSSCLS_LEARNED_SKILL_TARGET");
		}

		objText = document.createTextNode(skillName);
		objTd.appendChild(objText);

		// スキルレベル選択部品の構築
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_LEARNED_SKILL_LEVEL_" + idx);
		objTr.appendChild(objTd);

		// 習得スキル設定対象でれあば、強調表示クラスに設定
		if (IsLearnedSkillTarget(skillId)) {
			objTd.setAttribute("class", "CSSCLS_LEARNED_SKILL_TARGET");
		}

		objSelect = document.createElement("select");
		objSelect.setAttribute("id", "OBJID_SELECT_LEARNED_SKILL_LEVEL_" + idx);
		objSelect.setAttribute("onChange", "RefreshSkillColumnHeaderLearned(this, " + idx + ", this.value)");
		objTd.appendChild(objSelect);

		for (var lvIdx = 0; lvIdx <= SkillObjNew[skillId][SKILL_DATA_INDEX_MAXLV]; lvIdx++) {

			objOption = document.createElement("option");
			objOption.setAttribute("value", lvIdx);
			if (n_A_LearnedSkill[idx] == lvIdx) {
				objOption.setAttribute("selected", "selected");
			}
			objSelect.appendChild(objOption);

			objText = document.createTextNode(lvIdx);
			objOption.appendChild(objText);
		}

		// レベルが 0 でなければ、背景色を設定
		if (n_A_LearnedSkill[idx] != 0) {
			objSelect.setAttribute("class", "CSSCLS_SELECTED_LEARNED_SKILL");
		}
	}

}

function IsLearnedSkillTarget (skillId) {

	var idx = 0;
	var itemId = 0;
	var cardId = 0;
	var spidx = 0;

	// 全ての装備を走査し、習得スキル設定対象がないかをチェック
	for (idx = 0; idx < n_A_Equip.length; idx++) {

		itemId = n_A_Equip[idx];

		spidx = ITEM_DATA_INDEX_SPBEGIN;

		while (ItemObjNew[itemId][spidx] != ITEM_SP_END) {
			if (ItemObjNew[itemId][spidx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				if (ItemObjNew[itemId][spidx + 1] == skillId) {
					return true;
				}
			}

			spidx += 2;
		}
	}

	// 全てのカードを走査し、習得スキル設定対象がないかをチェック
	for (idx = 0; idx < n_A_card.length; idx++) {

		cardId = n_A_card[idx];

		spidx = CARD_DATA_INDEX_SPBEGIN;

		while (CardObjNew[cardId][spidx] != ITEM_SP_END) {
			if (CardObjNew[cardId][spidx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				if (CardObjNew[cardId][spidx + 1] == skillId) {
					return true;
				}
			}

			spidx += 2;
		}
	}

	return false;
}



function UpdateLearnedSkillSettingColoring() {

	var idx = 0;

	var learnSkillIdArray = null;
	var skillId = 0;
	var objTd = null;


	// 展開表示しない場合は、ここで処理終了
	if (!n_SkillSWLearned) {
		return;
	}

	// 設定欄内のスキルテーブルを走査
	learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();

	for (idx = 0; idx < learnSkillIdArray.length; idx++) {

		skillId = learnSkillIdArray[idx];

		// 名称欄
		objTd = document.getElementById("OBJID_TD_LEARNED_SKILL_NAME_" + idx);
		objTd.removeAttribute("class");

		// 習得スキル設定対象でれあば、強調表示クラスに設定
		if (IsLearnedSkillTarget(skillId)) {
			objTd.setAttribute("class", "CSSCLS_LEARNED_SKILL_TARGET");
		}


		// レベル欄
		objTd = document.getElementById("OBJID_TD_LEARNED_SKILL_LEVEL_" + idx);
		objTd.removeAttribute("class");

		// 習得スキル設定対象でれあば、強調表示クラスに設定
		if (IsLearnedSkillTarget(skillId)) {
			objTd.setAttribute("class", "CSSCLS_LEARNED_SKILL_TARGET");
		}


	}

}



function RefreshSkillColumnHeaderLearned(objSelect, changedIdx, newValue) {

	if (0 <= changedIdx) {
		n_A_LearnedSkill[changedIdx] = parseInt(newValue);
		calc();
	}

	// 背景設定
	if (objSelect) {
		if (0 != newValue) {
			objSelect.setAttribute("class", "CSSCLS_SELECTED_LEARNED_SKILL");
		} else {
			objSelect.setAttribute("class", "");
		}
	}

	var sColorCode = "#ddddff";
	var sUsedText = "";
	for (var idx = 0; idx < n_A_LearnedSkill.length; idx++) {
		if (n_A_LearnedSkill[idx] != 0) {
			sColorCode = "#ff7777";
			sUsedText = "　設定中";
			break;
		}
	}


	var objHeader = null;
	var objUsedText = null;
	var objText = null;

	objHeader = document.getElementById("OBJID_SKILL_COLUMN_HEADER_LEARNED");
	objHeader.setAttribute("bgcolor", sColorCode);

	objUsedText = document.getElementById("OBJID_SKILL_COLUMN_USEDTEXT_LEARNED");
	while (objUsedText.firstChild) {
		objUsedText.removeChild(objUsedText.firstChild);
	}
	objText = document.createTextNode(sUsedText);
	objUsedText.appendChild(objText);

}

