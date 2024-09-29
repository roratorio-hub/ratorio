





function BuildUpCastSimSimulateArea(objRoot, bAsExpand) {

	var idx = 0;
	var rowidx = 0;
	var lv = 0;
	var skillId = 0;
	var skillIdArray = null;
	var skillLv = 0;
	var learnSkillSpArray = null;
	var usableSkillId = 0;
	var autoSpellSpArray = null;
	var autoSpellSkillId = 0;
	var scrollIdx = 0;
	var insertSkillData = null;
	var scrollArray;
	var maxLv = 0;
	var timeVal = 0;
	var timeStr = "";

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
	var objLabel = null;



	// 引数のルートオブジェクト配下を一度全削除
	HtmlRemoveAllChild(objRoot);



	// シミュレートエリアのテーブル生成
	objTable = document.createElement("table");
	objTable.setAttribute("border", 1);
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);




	// シミュレートテーブルのヘッダ部分を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("id", "OBJID_CONTROL_CASTSIM_HEADER");
	objTd.setAttribute("colspan", 10);
	objTd.setAttribute("bgcolor", COLOR_CODE_TABLE_HEADER_IS_NOT_SET);
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_CONTROL_CASTSIM_SWITCH");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("onClick", "OnClickCastSimSwitch()");
	if (bAsExpand) {
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_CONTROL_CASTSIM_SWITCH");
	HtmlCreateTextNode("詠唱シミュレータ", objLabel);

	objText = document.createTextNode("　");
	objTd.appendChild(objText);

	objInput = document.createElement("input");
	objInput.setAttribute("id", "OBJID_CONTROL_CASTSIM_REFRESH");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "更新");
	objInput.setAttribute("onClick", "OnClickCastSimRefresh()");
	objTd.appendChild(objInput);



	// 展開表示でなければ、終了
	if (!bAsExpand) {
		return;
	}



	//----------------------------------------------------------------
	// シミュレートテーブルのヘッダを生成
	//----------------------------------------------------------------

	// 行を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);



	// 表示名の欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("スキル名");
	objTd.appendChild(objText);



	// レベル選択の欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("レベル");
	objTd.appendChild(objText);



	// 消費ＳＰの欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("消費SP");
	objTd.appendChild(objText);



	// 消費ＡＰの欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("消費AP");
	objTd.appendChild(objText);



	// 詠唱時間の欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("colspan", 3);
	objTd.setAttribute("align", "center");
	objTr.appendChild(objTd);
	objText = document.createTextNode("詠唱時間");
	objTd.appendChild(objText);



	// ディレイ時間の欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("colspan", 2);
	objTd.setAttribute("align", "center");
	objTr.appendChild(objTd);
	objText = document.createTextNode("ディレイ時間");
	objTd.appendChild(objText);



	// 持続時間の欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("持続時間");
	objTd.appendChild(objText);



	// シミュレートの欄を生成
	objTd = document.createElement("td");
	objTd.setAttribute("rowspan", 2);
	objTd.setAttribute("colspan", 2);
	objTr.appendChild(objTd);
	objText = document.createTextNode("シミュレート");
	objTd.appendChild(objText);



	// 行を生成
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);



	// 変動詠唱の欄を生成
	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objText = document.createTextNode("変動");
	objTd.appendChild(objText);



	// 固定詠唱の欄を生成
	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objText = document.createTextNode("固定");
	objTd.appendChild(objText);



	// 強制詠唱の欄を生成
	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objText = document.createTextNode("強制");
	objTd.appendChild(objText);



	// 共通ディレイの欄を生成
	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objText = document.createTextNode("共通");
	objTd.appendChild(objText);



	// クールタイムの欄を生成
	objTd = document.createElement("td");
	objTr.appendChild(objTd);
	objText = document.createTextNode("クール");
	objTd.appendChild(objText);



	for (rowidx = 0; rowidx < 10; rowidx++) {

		// 行を生成
		objTr = document.createElement("tr");
		objTbody.appendChild(objTr);



		// 表示名の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		objSelect = document.createElement("select");
		objSelect.setAttribute("id", "OBJID_CONTROL_CAST_SIM_SKILL_SELECT_" + rowidx);
		objSelect.setAttribute("onChange", "OnChangeSkillCastSim()");
		objTd.appendChild(objSelect);

		//----------------------------------------------------------------
		// 追加すべきスキルＩＤを収集する
		//----------------------------------------------------------------
		skillIdArray = new Array();

		//--------------------------------
		// 職業で習得するスキル
		//--------------------------------
		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();

		for (idx = 0; idx < learnSkillIdArray.length; idx++) {

			skillId = learnSkillIdArray[idx];

			// パッシブスキルは表示しない
			if (!(g_skillManager.GetSkillType(skillId) & CSkillData.TYPE_ACTIVE)) {
				continue;
			}

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		//--------------------------------
		// 使用可能スキル
		//--------------------------------
		learnSkillSpArray = new Array().concat(
			GetEquippedSPValueArrayEquip(ITEM_SP_LEARN_SKILL),
			GetEquippedSPValueArrayEquip(ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED),
			GetEquippedSPValueArrayEquip(ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_LEARN_SKILL),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL)
		);

		for (idx = 0; idx < learnSkillSpArray.length; idx++) {

			// アイテムのＳＰ定義値を取得（使用可能スキルＩＤが設定されている）
			usableSkillId = learnSkillSpArray[idx];

			// スキルＩＤを取得
			skillId = InsertSkill[usableSkillId][USABLE_SKILL_DATA_INDEX_SKILL_ID];

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		//--------------------------------
		// オートスペル
		//--------------------------------
		autoSpellSpArray = new Array().concat(
			GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL),
			GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
			GetEquippedSPValueArrayEquip(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED),
			GetEquippedSPValueArrayCardAndElse(ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL)
		);

		for (idx = 0; idx < autoSpellSpArray.length; idx++) {

			// アイテムのＳＰ定義値を取得（オートスペルＩＤが設定されている）
			autoSpellSkillId = autoSpellSpArray[idx];

			// スキルＩＤを取得
			skillId = AutoSpellSkill[autoSpellSkillId][AUTO_SPELL_DATA_INDEX_SKILL_ID];

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		//--------------------------------
		// 特殊条件で追加されるスキル
		//--------------------------------
		if(CardNumSearch(164) && GetHigherJobSeriesID(n_A_JOB) == 9){
			skillId = 162;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		if(CardNumSearch(277) && GetLowerJobSeriesID(n_A_JOB)==1){
			skillId = 76;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		if(CardNumSearch(707)){
			skillId = 244;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		if(EquipNumSearch(1096)){
			skillId = 193;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		if(EquipNumSearch(2124)){
			skillId = 810;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		if(EquipNumSearch(2427)){
			skillId = 66;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}

			skillId = 76;

			// 未登録の場合のみ追加する
			if (skillIdArray.indexOf(skillId) < 0) {
				skillIdArray.push(skillId);
			}
		}

		//--------------------------------
		// 攻撃スクロール等のスキル
		//--------------------------------
		if(n_A_PassSkill7[15]){

			scrollArray = [			// 攻撃スクロール配列
				USABEL_SKILL_ID_FIRE_BOLT_5
				, USABEL_SKILL_ID_FIRE_BALL_5
				, USABEL_SKILL_ID_FIRE_WALL_5
				, USABEL_SKILL_ID_COLO_BOLT_5
				, USABEL_SKILL_ID_FROST_DIVER_5
				, USABEL_SKILL_ID_LIGHTNING_BOLT_5
				, USABEL_SKILL_ID_EARTH_SPIKE_5
				, USABEL_SKILL_ID_SOUL_STRIKE_5
				, USABEL_SKILL_ID_METEOR_STORM_5
				, USABEL_SKILL_ID_HEAL_10
				, USABEL_SKILL_ID_RESERECTION_BY_YGGDRASILLNO_HA
				, USABEL_SKILL_ID_GRAND_CROSS_10
				, USABEL_SKILL_ID_DEMONIC_FIRE_3
				, USABEL_SKILL_ID_HELL_INFERNO_3
				, USABEL_SKILL_ID_MAGMA_ILLUPTION_3
				, USABEL_SKILL_ID_PSYCHIC_WAVE_3
				, USABEL_SKILL_ID_METALIC_SOUND_3
				, USABEL_SKILL_ID_JUDEX_3
				, USABEL_SKILL_ID_TEIOAPUCHAGI_7
			];

			for (scrollIdx = 0; scrollIdx < scrollArray.length; scrollIdx++) {

				// スキルＩＤを取得
				skillId = InsertSkill[scrollArray[scrollIdx]][USABLE_SKILL_DATA_INDEX_SKILL_ID];

				// 未登録の場合のみ追加する
				if (skillIdArray.indexOf(skillId) < 0) {
					skillIdArray.push(skillId);
				}
			}
		}

		//----------------------------------------------------------------
		// セレクトボックス構築
		//----------------------------------------------------------------
		for (idx = 0; idx < skillIdArray.length; idx++) {
			objOption = HtmlCreateElementOption(skillIdArray[idx], g_skillManager.GetSkillName(skillIdArray[idx]), objSelect);
		}

		skillId = parseInt(objSelect.value);
		maxLv = g_skillManager.GetMaxLv(skillId);



		// レベル選択の欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		objSelect = document.createElement("select");
		objSelect.setAttribute("id", "OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_" + rowidx);
		objSelect.setAttribute("onChange", "OnChangeSkillLvCastSim()");
		objTd.appendChild(objSelect);

		for (lv = 1; lv <= maxLv; lv++) {
			objOption = HtmlCreateElementOption(lv, lv, objSelect);
		}

		skillLv = maxLv;
		objSelect.value = skillLv;



		// 消費ＳＰの欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_COST_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// 変動詠唱の欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_CAST_TIME_VARY_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// 固定詠唱の欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_CAST_TIME_FIXED_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// 強制詠唱の欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_CAST_TIME_FORCE_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// ディレイの欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_DELAY_TIME_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// クールタイムの欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_COOL_TIME_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);

		
		
		// 持続時間の欄を生成
		objTd = document.createElement("td");
		objTd.setAttribute("id", "OBJID_TD_CAST_SIM_LIFETIME_" + rowidx);
		objTd.setAttribute("align", "right");
		objTr.appendChild(objTd);



		// シミュレートの欄を生成
		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		objInput = document.createElement("input");
		objInput.setAttribute("id", "OBJID_BUTTON_CAST_SIM_SIMULATE_" + rowidx);
		objInput.setAttribute("type", "button");
		objTd.appendChild(objInput);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);

		objProgress = document.createElement("progress");
		objProgress.setAttribute("id", "OBJID_PROGRESS_CAST_SIM_SIMULATE_" + rowidx);
		objTd.appendChild(objProgress);
	}



	// 表示内容の更新
	RefreshCastSimSimulateArea();
}


function SprintfTimeStrCastSim(timeInMillSecond) {

	var digit = [
		timeInMillSecond % 10,
		Math.floor(timeInMillSecond / 10) % 10,
		Math.floor(timeInMillSecond / 100) % 10,
		Math.floor(timeInMillSecond / 1000),
	];

	return digit[3] + "." + digit[2] + digit[1];
}





function OnClickCastSimSwitch() {

	var bExpand = false;

	var objRoot = null;
	var objInput = null;



	// 実行中の詠唱をすべて止める
	g_castsimIntervalFunctionArray.forEach(
		function (element) {
			clearInterval(element);
		}
	);



	objRoot = document.getElementById("OBJID_TD_CASTSIM");
	objInput = document.getElementById("OBJID_CONTROL_CASTSIM_SWITCH");



	// 展開スイッチの状態を取得
	bExpand = objInput.checked;

	// 構築関数呼び出し
	BuildUpCastSimSimulateArea(objRoot, bExpand);

}



function OnClickCastSimRefresh() {

	var bExpand = false;

	var objInput = null;



	// 実行中の詠唱をすべて止める
	g_castsimIntervalFunctionArray.forEach(
		function (element) {
			clearInterval(element);
		}
	);



	// 展開スイッチの状態を取得
	objInput = document.getElementById("OBJID_CONTROL_CASTSIM_SWITCH");
	bExpand = objInput.checked;



	// 表示内容の更新
	if (bExpand) {
		RefreshCastSimSimulateArea(true);
	}
}



function OnChangeSkillCastSim() {

	// 実行中の詠唱をすべて止める
	g_castsimIntervalFunctionArray.forEach(
		function (element) {
			clearInterval(element);
		}
	);

	// 表示内容の更新
	RefreshCastSimSimulateArea(true);
}



function OnChangeSkillLvCastSim() {

	// 実行中の詠唱をすべて止める
	g_castsimIntervalFunctionArray.forEach(
		function (element) {
			clearInterval(element);
		}
	);

	// 表示内容の更新
	RefreshCastSimSimulateArea(false);
}



function RefreshCastSimSimulateArea(bRefreshLevelSelect) {

	var idx = 0;
	var rowidx = 0;
	var skillId = 0;
	var maxLv = 0;
	var skillLv = 0;
	var costVal = 0;
	var costAPVal = 0;
	var timeVal = 0;
	var timeStr = "";
	var paramStr = "";

	var castTime = 0;
	var delayTime = 0;

	var lifeTimeVal = 0;

	var objTd = null;
	var objText = null;
	var objSelect = null;
	var objInput = null;
	var objProgress = null;



	for (rowidx = 0; rowidx < 10; rowidx++) {

		// スキルＩＤの取得
		objSelect = document.getElementById("OBJID_CONTROL_CAST_SIM_SKILL_SELECT_" + rowidx);
		skillId = parseInt(objSelect.value);

		// レベル選択欄の更新フラグが指定されている場合は、更新
		if (bRefreshLevelSelect) {
			maxLv = g_skillManager.GetMaxLv(skillId);

			objSelect = document.getElementById("OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_" + rowidx);
			HtmlRemoveOptionAll(objSelect);

			for (lv = 1; lv <= maxLv; lv++) {
				objOption = HtmlCreateElementOption(lv, lv, objSelect);
			}

			objSelect.value = maxLv;
		}



		// スキルレベルの取得
		objSelect = document.getElementById("OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_" + rowidx);
		skillLv = parseInt(objSelect.value);



		costVal = 0;
		costAPVal = 0;
		castTime = 0;
		delayTime = 0;
		lifeTimeVal = 0;
		


		// 消費ＳＰの欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_COST_" + rowidx);
		HtmlRemoveAllChild(objTd);

		costVal = g_skillManager.GetCostFixed(skillId, skillLv, null);
		costVal = Math.max(1, costVal + GetCostFixOfSkill(skillId));		// 固定増減
		costVal = Math.max(1, Math.ceil(costVal * GetCostScalingOfSkill(skillId)) / 100);	// %増減
		costVal = Math.max(1, Math.ceil(costVal * n_tok[ITEM_SP_COST_DOWN] / 100));		// 端数は切り上げ
		objText = document.createTextNode(costVal);
		objTd.appendChild(objText);



		// 消費ＡＰの欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_COSTAP_" + rowidx);
		HtmlRemoveAllChild(objTd);
		costAPVal = g_skillManager.GetCostAP(skillId, skillLv, null);
		objText = document.createTextNode(costAPVal);
		objTd.appendChild(objText);



		// 変動詠唱の欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_CAST_TIME_VARY_" + rowidx);
		HtmlRemoveAllChild(objTd);

		timeVal = g_skillManager.GetCastTimeVary(skillId, skillLv, null);
		timeVal += GetCastFixOfSkillForCastTimeVary(skillId);
		if (timeVal < 0) {
			timeVal = 0;
		}
		timeVal *= n_A_CAST_COMMON * GetCastScalingOfSkillForCastTimeVary(skillId) / 100;
		if (timeVal < 0) {
			timeVal = 0;
		}
		castTime += timeVal;
		timeStr = SprintfTimeStrCastSim(timeVal);

		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);



		// 固定詠唱の欄の更新
		objTd = document.getElementById("OBJID_TD_CAST_SIM_CAST_TIME_FIXED_" + rowidx);
		HtmlRemoveAllChild(objTd);

		timeVal = g_skillManager.GetCastTimeFixed(skillId, skillLv, null);
		timeVal -= n_tok[ITEM_SP_SKILL_FIXED_MINUS];
		timeVal += GetCastFixOfSkillForCastTimeFixed(skillId);
		if (timeVal < 0) {
			timeVal = 0;
		}
		timeVal *= GetCastScalingOfSkillForCastTimeFixed(skillId) / 100;
		if (timeVal < 0) {
			timeVal = 0;
		}
		timeVal *= (100 - n_A_Kotei_Cast_Keigen) / 100;
		if (timeVal < 0) {
			timeVal = 0;
		}
		castTime += timeVal;
		timeStr = SprintfTimeStrCastSim(timeVal);

		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);



		// 強制詠唱の欄の更新
		objTd = document.getElementById("OBJID_TD_CAST_SIM_CAST_TIME_FORCE_" + rowidx);
		HtmlRemoveAllChild(objTd);

		timeVal = g_skillManager.GetCastTimeForce(skillId, skillLv, null);
		timeVal += GetCastFixOfSkillForCastTimeForce(skillId);
		if (timeVal < 0) {
			timeVal = 0;
		}
		timeVal *= GetCastScalingOfSkillForCastTimeForce(skillId) / 100;
		if (timeVal < 0) {
			timeVal = 0;
		}
		castTime += timeVal;
		timeStr = SprintfTimeStrCastSim(timeVal);

		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);



		// ディレイの欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_DELAY_TIME_" + rowidx);
		HtmlRemoveAllChild(objTd);

		timeVal = g_skillManager.GetDelayTimeCommon(skillId, skillLv, null);
		if (timeVal >= 0) {
			timeVal *= (100 - n_tok[ITEM_SP_SKILL_DELAY_DOWN]) / 100;
			delayTime = Math.max(delayTime, timeVal);
			timeStr = SprintfTimeStrCastSim(timeVal);
		}
		else {
			timeStr = "不明";
		}

		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);



		// クールタイムの欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_COOL_TIME_" + rowidx);
		HtmlRemoveAllChild(objTd);

		timeVal = g_skillManager.GetCoolTime(skillId, skillLv, null);
		if (timeVal >= 0) {
			timeVal += GetCoolFixOfSkill(skillId);
			if (timeVal < 0) {
				timeVal = 0;
			}
			delayTime = Math.max(delayTime, timeVal);
			timeStr = SprintfTimeStrCastSim(timeVal);
		}
		else {
			timeStr = "不明";
		}

		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);

		
		
		// 持続時間の欄を生成
		objTd = document.getElementById("OBJID_TD_CAST_SIM_LIFETIME_" + rowidx);
		HtmlRemoveAllChild(objTd);
		lifeTimeVal = g_skillManager.GetLifeTime(skillId, skillLv, null);
		if (lifeTimeVal >= 0) {
			timeStr = SprintfTimeStrCastSim(lifeTimeVal);
		}
		else {
			timeStr = "不明";
		}
		objText = document.createTextNode(timeStr);
		objTd.appendChild(objText);



		// シミュレートの欄を生成
		paramStr = rowidx;
		paramStr += ", " + castTime;
		paramStr += ", " + delayTime;
		objInput = document.getElementById("OBJID_BUTTON_CAST_SIM_SIMULATE_" + rowidx);
		objInput.setAttribute("value", "詠唱!!");
		objInput.setAttribute("onClick", "OnClickCastSimSimulateStart(" + paramStr + ")");

		objProgress = document.getElementById("OBJID_PROGRESS_CAST_SIM_SIMULATE_" + rowidx);
		objProgress.setAttribute("max", 0);
		objProgress.setAttribute("value", 0);

	}
}











g_castsimProgressIntervalArray = new Array();
g_castsimIntervalFunctionArray = new Array();


function OnClickCastSimSimulateStart(rowidx, castTime, delayTime) {

	var paramStr = "";

	var objSelect = null;
	var objInput = null;
	var objProgress = null;
	var countUpFunction = null;



	// 更新間隔設定の取得
	objSelect = document.getElementById("OBJID_SELECT_CASTSIM_INTERVAL");
	g_castsimProgressIntervalArray[rowidx] = parseInt(objSelect.value);



	// 詠唱ボタンの設定更新
	objInput = document.getElementById("OBJID_BUTTON_CAST_SIM_SIMULATE_" + rowidx);
	objInput.setAttribute("value", "ｷｬﾝｾﾙ");
	paramStr = rowidx;
	paramStr += ", " + castTime;
	paramStr += ", " + delayTime;
	objInput.setAttribute("onClick", "OnClickCastSimSimulateStop(" + paramStr + ")");



	// プログレスバーの設定更新
	objProgress = document.getElementById("OBJID_PROGRESS_CAST_SIM_SIMULATE_" + rowidx);
	objProgress.setAttribute("max", castTime);
	objProgress.setAttribute("value", 0);



	// カウントアップ関数を定義
	var castValue = 0;
	var maxValue = castTime;

	countUpFunction = function() {

		castValue += g_castsimProgressIntervalArray[rowidx];

		objProgress.setAttribute("value", castValue);

		if (maxValue <= castValue) {
			OnClickCastSimSimulateStartDelay(rowidx, castTime, delayTime);
		}
	};



	// カウントアップ関数を登録
	g_castsimIntervalFunctionArray[rowidx] = setInterval(countUpFunction, g_castsimProgressIntervalArray[rowidx]);
}





function OnClickCastSimSimulateStartDelay(rowidx, castTime, delayTime) {

	var objProgress = null;
	var countDownFunction = null;



	// カウントアップ関数をクリア
	clearInterval(g_castsimIntervalFunctionArray[rowidx]);



	// プログレスバーの設定を再設定
	objProgress = document.getElementById("OBJID_PROGRESS_CAST_SIM_SIMULATE_" + rowidx);
	objProgress.setAttribute("max", delayTime);
	objProgress.setAttribute("value", delayTime);



	// カウントダウン関数を定義
	var castValue = delayTime;
	var maxValue = delayTime;

	countDownFunction = function() {

		castValue -= g_castsimProgressIntervalArray[rowidx];

		objProgress.setAttribute("value", castValue);

		if (castValue <= 0) {
			OnClickCastSimSimulateStop(rowidx, castTime, delayTime);
		}
	};



	// カウントダウン関数を登録
	g_castsimIntervalFunctionArray[rowidx] = setInterval(countDownFunction, g_castsimProgressIntervalArray[rowidx]);
}





function OnClickCastSimSimulateStop(rowidx, castTime, delayTime) {

	var paramStr = "";

	var objInput = null;



	// カウント関数をクリア
	clearInterval(g_castsimIntervalFunctionArray[rowidx]);



	// ボタンの設定更新
	objInput = document.getElementById("OBJID_BUTTON_CAST_SIM_SIMULATE_" + rowidx);
	objInput.setAttribute("value", "詠唱!!");
	paramStr = rowidx;
	paramStr += ", " + castTime;
	paramStr += ", " + delayTime;
	objInput.setAttribute("onClick", "OnClickCastSimSimulateStart(" + paramStr + ")");
}

















