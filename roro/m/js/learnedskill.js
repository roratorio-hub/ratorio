/**
 * 習得スキル欄の生成・更新・サーチなどの関数群
 */
let n_SkillSWLearned = false;
LEARNED_SKILL_MAX_COUNT = 200;
n_A_LearnedSkill = new Array();
for (let dmyidx = 0; dmyidx < LEARNED_SKILL_MAX_COUNT; dmyidx++) {
	n_A_LearnedSkill[dmyidx] = 0;
}

/**
 * 任意の習得スキルに設定されているスキルLvを取得する
 * @param {Number} skillId 取得したいスキルのID
 * @returns {Number} スキルLv
 */
function LearnedSkillSearch(skillId) {
	// 設定可能な全ての習得スキルを取得する
	const learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
	for (let idx = 0; idx < learnSkillIdArray.length; idx++) {
		if (learnSkillIdArray[idx] == skillId) {
			// 指定されたスキルIDが見つかったとき
			if (n_A_LearnedSkill[idx] !== undefined && !isNaN(n_A_LearnedSkill[idx])) {
				// 該当のスキルLvがundefinedでもNaNでもなければ習得済みLvを返す
				return n_A_LearnedSkill[idx];
			}
		}
	}
	// スキルIDが見つからなかったり想定外の値が設定されている場合は0を返す
	return 0;
}

/**
 * 習得スキル欄を生成する
 * @returns 
 */
function OnClickSkillSWLearned(){
	let objSW = null;
	let objRoot = null;
	let objTable = null;
	let objTbody = null;
	let objTr = null;
	let objTd = null;
	let objInput = null;
	let objText = null;
	let objSpan = null;
	let objLabel = null;
	let skillId = 0;
	let skillName = "";
	let objSelect = null;
	let objOption = null;

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
	HtmlCreateTextNode("習得スキル", objLabel);

	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "OBJID_SKILL_COLUMN_USEDTEXT_LEARNED");
	objTd.appendChild(objSpan);

	objText = document.createTextNode("　　");
	objTd.appendChild(objText);

	// 習得済みスキルを発動条件に持つ装備のアノテーション
	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "ID_SKILL_LEARNED_NOTICE");
	objSpan.setAttribute("style", "color : red");
	objTd.appendChild(objSpan);
	UpdateLearnedSkillNotice();

	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	RefreshSkillColumnHeaderLearned(null, -1, 0);
	// 展開表示しない場合は、ここで処理終了
	if (!n_SkillSWLearned) {
		return;
	}
	// 公式スキルツリーから出力されたURLを読み込む機能 
	$(objTbody).append(`
		<tr><td colspan="6" style="padding: 3px">
			<div style="display:flex">
				<div style="width:100px;margin:0 0.5em"><button type="button" id="ID_SKILL_LEARNED_LOAD" style="width:100%">URL入力</button></div>
				<div style="width:100%"><input type="text" style="width:100%;height:100%" id="ID_SKILL_LEARNED_URL" placeholder="RO公式ツール「スキルツリー」から出力したURLを貼り付けてください"></div>
				<div style="width:100px;margin:0 0.5em"><button type="button" id="ID_SKILL_LEARNED_URL_CLEAR" style="width:100%" >クリア</button></div>
			</div>
		</td></tr>
	`);
	$(document).off("click","#ID_SKILL_LEARNED_URL_CLEAR");
	$(document).on("click","#ID_SKILL_LEARNED_URL_CLEAR", (e)=>{
		$("#ID_SKILL_LEARNED_URL").val("");
		$("#ID_SKILL_LEARNED_LOAD").click();
	});
	$(document).off("click","#ID_SKILL_LEARNED_LOAD");
	$(document).on("click","#ID_SKILL_LEARNED_LOAD", (e)=>{
		let	url = location.href;
		try{
			url = new URL($("#ID_SKILL_LEARNED_URL").val()||location.href);
			showLoadingIndicator();
			// 自動再計算を ON にしていると項目変更のたびに計算されて待ち時間がかさむ事があります
			// 待機中を示すスピナーもあるため深刻な問題ではないと認識していますが
			// 問題が表面化した場合には自動再計算の例外処理などを検討してください
			setTimeout(() => {
				$("#ID_SKILL_LEARNED select").each(function(idx,elm) {
					const id_skill_name = $(elm).attr("id").replace("SELECT","TD").replace("LEVEL","NAME");
					const skill_name = $("#"+id_skill_name).text();
					const skill = SkillObjNew.filter((d) => d[SKILL_DATA_INDEX_NAME].replace(/\([^)]*\)/g, "").replace(/\<[^>]*\>/g, "")==skill_name)[0];
					var skill_level = 0
					if (skill) {
						skill_level = url.searchParams.get(skill[SKILL_DATA_INDEX_REFID])||0;
					}
					$(this).val(skill_level).change();
				});
				hideLoadingIndicator();
			},0); // ローディングインジケータ表示のために 0 ms後の非同期処理に送る
		} catch(e) {}
	});
	// 設定欄内のスキルテーブルを構築
	const learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
	for (let idx = 0; idx < learnSkillIdArray.length; idx++) {
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
		for (let lvIdx = 0; lvIdx <= SkillObjNew[skillId][SKILL_DATA_INDEX_MAXLV]; lvIdx++) {
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

/**
 * 習得スキルをトリガーとするアイテムを装備しているか検査する
 * @param {Number} skillId  
 * @returns {boolean} true:装備している / false:装備していない
 */
function IsLearnedSkillTarget (skillId) {
	let idx = 0;
	let itemId = 0;
	let cardId = 0;
	let spidx = 0;
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

/**
 * トリガー条件になっている習得スキルを強調表示する
 * 判定関数として内部でIsLearnedSkillTargetを呼び出す
 * @returns 
 */
function UpdateLearnedSkillSettingColoring() {
	let idx = 0;
	let learnSkillIdArray = null;
	let skillId = 0;
	let objTd = null;
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

/**
 * 習得スキルの変更を反映する
 * @param {*} objSelect 
 * @param {*} changedIdx 
 * @param {*} newValue 
 */
function RefreshSkillColumnHeaderLearned(objSelect, changedIdx, newValue) {
	if (0 <= changedIdx) {
		n_A_LearnedSkill[changedIdx] = parseInt(newValue);
		AutoCalc("RefreshSkillColumnHeaderLearned");
	}
	// 背景設定
	if (objSelect) {
		if (0 != newValue) {
			objSelect.setAttribute("class", "CSSCLS_SELECTED_LEARNED_SKILL");
		} else {
			objSelect.setAttribute("class", "");
		}
	}
	let sColorCode = "#ddddff";
	let sUsedText = "";
	for (let idx = 0; idx < n_A_LearnedSkill.length; idx++) {
		if (n_A_LearnedSkill[idx] != 0) {
			sColorCode = "#ff7777";
			sUsedText = "　設定中";
			break;
		}
	}
	let objHeader = null;
	let objUsedText = null;
	let objText = null;
	objHeader = document.getElementById("OBJID_SKILL_COLUMN_HEADER_LEARNED");
	objHeader.setAttribute("bgcolor", sColorCode);
	objUsedText = document.getElementById("OBJID_SKILL_COLUMN_USEDTEXT_LEARNED");
	while (objUsedText.firstChild) {
		objUsedText.removeChild(objUsedText.firstChild);
	}
	objText = document.createTextNode(sUsedText);
	objUsedText.appendChild(objText);
}

