
/**
 * 計算データテキスト作成クラス.
 */
function CCalcDataTextCreator () {

}



/**
 * 参照するキャラクターデータ.
 */
CCalcDataTextCreator.refCharaData = null;

/**
 * 参照する特性データ.
 */
CCalcDataTextCreator.refSpecData = null;

/**
 * 参照するモンスターデータ.
 */
CCalcDataTextCreator.refMobData = null;

/**
 * 参照するバトルデータ.
 */
CCalcDataTextCreator.refBattleData = null;



/**
 * 計算データテキストを指定のオブジェクトの value プロパティに設定する.
 */
CCalcDataTextCreator.SetCalcDataTextObjectValue = function (objTarget) {
	if (objTarget) {
		objTarget.value = CCalcDataTextCreator.CreateCalcDataText();
	}
};



/**
 * 計算データのテキストを生成する.
 * @return 計算データのテキスト
 */
CCalcDataTextCreator.CreateCalcDataText = function (testLabel) {

	var idx = 0;

	var textResult = "";

	var outOfTargetSpIdArray = [
		ITEM_SP_UNBREAKABLE,
		ITEM_SP_LEARNED_SKILL_EFFECT,
		ITEM_SP_LEARN_SKILL,
		ITEM_SP_AUTO_SPELL,
		ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED,
		ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED,
		ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL,
		ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL,
	];

	var valueModifyMap = new Map();
	valueModifyMap.set(ITEM_SP_MAXHP_PLUS, GetStatusModifyMaxHpPlus());
	valueModifyMap.set(ITEM_SP_MAXSP_PLUS, GetStatusModifyMaxSpPlus());
	valueModifyMap.set(ITEM_SP_MAXHP_UP, GetStatusModifyMaxHpUp());
	valueModifyMap.set(ITEM_SP_MAXSP_UP, GetStatusModifyMaxSpUp());
	valueModifyMap.set(ITEM_SP_DEF_PLUS, GetStatusModifyDefDivPlus());
	valueModifyMap.set(ITEM_SP_MDEF_PLUS, GetStatusModifyMdefDivPlus(false));
	valueModifyMap.set(ITEM_SP_DEF_UP, GetStatusModifyDefDivUp());
	valueModifyMap.set(ITEM_SP_MDEF_UP, GetStatusModifyMdefDivUp());
	valueModifyMap.set(ITEM_SP_HIT_PLUS, GetStatusModifyHitPlus());

	var valueReplaceMap = new Map();
	valueReplaceMap.set(ITEM_SP_STR_PLUS, n_A_STR - SU_STR);
	valueReplaceMap.set(ITEM_SP_AGI_PLUS, n_A_AGI - SU_AGI);
	valueReplaceMap.set(ITEM_SP_VIT_PLUS, n_A_VIT - SU_VIT);
	valueReplaceMap.set(ITEM_SP_INT_PLUS, n_A_INT - SU_INT);
	valueReplaceMap.set(ITEM_SP_DEX_PLUS, n_A_DEX - SU_DEX);
	valueReplaceMap.set(ITEM_SP_LUK_PLUS, n_A_LUK - SU_LUK);
	valueReplaceMap.set(ITEM_SP_FLEE_PLUS, g_ITEM_SP_FLEE_PLUS_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_ASPD_UP, g_ITEM_SP_ASPD_UP_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_SKILL_CAST_TIME, g_ITEM_SP_SKILL_CAST_TIME_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_STR_PLUS_FOR_SET, n_A_STR - SU_STR - g_ITEM_SP_STR_PLUS_PLANE_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_AGI_PLUS_FOR_SET, n_A_AGI - SU_AGI - g_ITEM_SP_AGI_PLUS_PLANE_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_VIT_PLUS_FOR_SET, n_A_VIT - SU_VIT - g_ITEM_SP_VIT_PLUS_PLANE_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_INT_PLUS_FOR_SET, n_A_INT - SU_INT - g_ITEM_SP_INT_PLUS_PLANE_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_DEX_PLUS_FOR_SET, n_A_DEX - SU_DEX - g_ITEM_SP_DEX_PLUS_PLANE_value_forCalcData);
	valueReplaceMap.set(ITEM_SP_LUK_PLUS_FOR_SET, n_A_LUK - SU_LUK - g_ITEM_SP_LUK_PLUS_PLANE_value_forCalcData);

	var funcLooperCharaData = function (idxF, nameF, valueF) {
		textResult += "CCalcDataTextCreator.refCharaData[" + nameF + "] = " + CCalcDataTextCreator.GetDataText(CCalcDataTextCreator.refCharaData[valueF]) + ";\r\n";
	};

	var funcLooperSpecData = function (idxF, nameF, valueF) {

		var spidF = valueF;
		var specValueF = CCalcDataTextCreator.GetDataText(CCalcDataTextCreator.refSpecData[valueF]);
		var modifyValueF = valueModifyMap.get(spidF);
		var replaceValueF = valueReplaceMap.get(spidF);

		// 収集対象外
		if (outOfTargetSpIdArray.indexOf(spidF) >= 0) {
			textResult += "CCalcDataTextCreator.refSpecData[" + nameF + "] = 0;\t\t// 収集除外;\r\n";
		}

		// 収集対象
		else {

			// データ元の補正
			if (modifyValueF !== undefined) {
				specValueF += modifyValueF;
			}

			// データの置換
			else if (replaceValueF !== undefined) {
				specValueF = replaceValueF;
			}

			textResult += "CCalcDataTextCreator.refSpecData[" + nameF + "] = " + specValueF + ";\r\n";
		}
	};

	var funcLooperMobData = function (idxF, nameF, valueF) {
		textResult += "CCalcDataTextCreator.refMobData[" + nameF + "] = " + CCalcDataTextCreator.GetDataText(CCalcDataTextCreator.refMobData[valueF]) + ";\r\n";
	};

	var funcLooperBattleData = function (idxF, nameF, valueF) {
		textResult += "CCalcDataTextCreator.refBattleData[" + nameF + "] = " + CCalcDataTextCreator.GetDataText(CCalcDataTextCreator.refBattleData[valueF]) + ";\r\n";
	};

	var funcGetChildText = function (objIdF, valueWhenNull) {
		var objF = document.getElementById(objIdF);
		if (!objF) {
			return valueWhenNull;
		}
		var objTextF = objF.firstChild;
		if (!objTextF) {
			return valueWhenNull;
		}
		return objTextF.data;
	};


	// テキスト組み立て
	textResult += ("\r\n").repeat(1);

	// テストケースラベル
	textResult += "testLabel = " + testLabel.replace("\\", "\\\\") + ";\r\n";

	textResult += ("\r\n").repeat(1);

	// デバッグフラグ系
	/*
	textResult += "_DEBUG = " + _DEBUG + ";\r\n";
	textResult += "_DATA_CREATE_MODE = " + _DATA_CREATE_MODE + ";\r\n";
	textResult += "_DATA_PARSE_MODE = " + _DATA_PARSE_MODE + ";\r\n";
	textResult += "_DATA_MIGRATION_MODE = " + _DATA_MIGRATION_MODE + ";\r\n";
	textResult += "_ENABLE_MIGRATION_BLOCK_NEW_PROCESS = " + _ENABLE_MIGRATION_BLOCK_NEW_PROCESS + ";\r\n";
	textResult += "_ENABLE_MIGRATION_BLOCK_TRANSIT = " + _ENABLE_MIGRATION_BLOCK_TRANSIT + ";\r\n";
	textResult += "_TEST_SETTINGS_APPLYING = " + _TEST_SETTINGS_APPLYING + ";\r\n";

	textResult += ("\r\n").repeat(3);
	*/

	// 全ての収集データに適用

	EnumCharaDataIndex.For(funcLooperCharaData);

	textResult += ("\r\n").repeat(3);

	EnumItemSpId.For(funcLooperSpecData);

	textResult += ("\r\n").repeat(3);

	EnumMonsterDataIndex.For(funcLooperMobData, [MONSTER_DATA_INDEX_COUNT]);

	textResult += ("\r\n").repeat(3);

	EnumBattleDataIndex.For(funcLooperBattleData);

	textResult += ("\r\n").repeat(3);

	// 詠唱シミュレータ情報
	for (idx = 0; idx < 10; idx++) {
		textResult += "OBJID_CONTROL_CAST_SIM_SKILL_SELECT_" + idx + " = " + HtmlGetObjectValueByIdAsInteger("OBJID_CONTROL_CAST_SIM_SKILL_SELECT_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_" + idx + " = " + HtmlGetObjectValueByIdAsInteger("OBJID_CONTROL_CAST_SIM_LEVEL_SELECT_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_COST_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_COST_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_COSTAP_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_COSTAP_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_CAST_TIME_VARY_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_CAST_TIME_VARY_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_CAST_TIME_FIXED_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_CAST_TIME_FIXED_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_CAST_TIME_FORCE_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_CAST_TIME_FORCE_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_DELAY_TIME_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_DELAY_TIME_" + idx, undefined) + ";\r\n";
		textResult += "OBJID_TD_CAST_SIM_COOL_TIME_" + idx + " = " + funcGetChildText("OBJID_TD_CAST_SIM_COOL_TIME_" + idx, undefined) + ";\r\n";
	}

	textResult += ("\r\n").repeat(3);



	return textResult;
};



/**
 * 必要に応じてダブルクォーテーション付与する.
 * @param dataObject 対象となるデータ
 */
CCalcDataTextCreator.GetDataText = function (dataObject) {

	var dataText = "";

	// ダブルクォーテーション付与
	if (dataObject === "") {
		dataText = "\"" + dataObject + "\"";
	}
	else if (isNaN(dataObject)) {
		dataText = "\"" + dataObject + "\"";
	}
	else if (dataObject !== Number(dataObject)) {
		dataText = "\"" + dataObject + "\"";
	}
	else {
		dataText = dataObject;
	}

	return dataText;
};

