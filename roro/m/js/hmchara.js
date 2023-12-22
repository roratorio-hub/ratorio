function IsUnconfirmedHP(jobId, level) {

	var hpspArray = GetUnconfirmedHPSPArray();

	if (jobId >= hpspArray.length) {
		return true;
	}

	if (!Array.isArray(hpspArray[jobId])) {
		return false;
	}

	return (hpspArray[jobId][0].indexOf(level) != -1);
}

function IsUnconfirmedSP(jobId, level) {

	var hpspArray = GetUnconfirmedHPSPArray();

	if (jobId >= hpspArray.length) {
		return true;
	}

	if (!Array.isArray(hpspArray[jobId])) {
		return false;
	}

	return (hpspArray[jobId][1].indexOf(level) != -1);
}


function UpdateCharaDataHtml(charaData, specData) {

	var idx = 0;
	var val = 0;
	var valueWork = 0;
	var textWork = "";
	var valueText = "";

	var objRoot = null;
	var objSpan = null;
	var objSelect = null;
	var objText = null;

	var mobDataOriginal = new Array();





	//----------------------------------------------------------------
	// ＡＴＫ
	//----------------------------------------------------------------
	var totalAtkBase = 0;
	var totalAtkAppend = 0;

	totalAtkBase = charaData[CHARA_DATA_INDEX_STATUS_ATK];

	totalAtkAppend = charaData[CHARA_DATA_INDEX_WEAPON_ATK];
	totalAtkAppend += charaData[CHARA_DATA_INDEX_REFINE_ATK];
	totalAtkAppend += charaData[CHARA_DATA_INDEX_LEFT_ATK];
	totalAtkAppend += specData[ITEM_SP_ATK_PLUS];

	charaData[CHARA_DATA_INDEX_DISP_ATK_LEFT] = totalAtkBase;
	charaData[CHARA_DATA_INDEX_DISP_ATK_RIGHT] = totalAtkAppend;

	objSpan = document.getElementById("OBJID_SPAN_CHARA_ATK");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(totalAtkBase + "+" + totalAtkAppend);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＭａｘＨＰ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_MAXHP] = charaData[CHARA_DATA_INDEX_MAXHP];

	valueText = charaData[CHARA_DATA_INDEX_MAXHP];
	if (IsUnconfirmedHP(n_A_JOB, n_A_BaseLV)) {
		valueText += "?(情報募集中)"
	}
	objText = document.createTextNode(valueText);

	objSpan = document.getElementById("OBJID_SPAN_CHARA_MAXHP");
	HtmlRemoveAllChild(objSpan);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＭａｘＳＰ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_MAXSP] = charaData[CHARA_DATA_INDEX_MAXSP];

	valueText = charaData[CHARA_DATA_INDEX_MAXSP];
	if (IsUnconfirmedSP(n_A_JOB, n_A_BaseLV)) {
		valueText += "?(情報募集中)"
	}
	objText = document.createTextNode(valueText);

	objSpan = document.getElementById("OBJID_SPAN_CHARA_MAXSP");
	HtmlRemoveAllChild(objSpan);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＤＥＦ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_DEF_LEFT] = charaData[CHARA_DATA_INDEX_DEF_MINUS];
	charaData[CHARA_DATA_INDEX_DISP_DEF_RIGHT] = charaData[CHARA_DATA_INDEX_DEF_DIV];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_DEF");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_DEF_MINUS] + "+" + charaData[CHARA_DATA_INDEX_DEF_DIV]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＭＤＥＦ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_MDEF_LEFT] = charaData[CHARA_DATA_INDEX_MDEF_MINUS];
	charaData[CHARA_DATA_INDEX_DISP_MDEF_RIGHT] = charaData[CHARA_DATA_INDEX_MDEF_DIV];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_MDEF");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_MDEF_MINUS] + "+" + charaData[CHARA_DATA_INDEX_MDEF_DIV]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＨＩＴ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_HIT] = charaData[CHARA_DATA_INDEX_HIT];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_HIT");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_HIT]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＦＬＥＥ
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_FLEE] = charaData[CHARA_DATA_INDEX_FLEE];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_FLEE");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_FLEE]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// 完全回避
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_LUCKY] = charaData[CHARA_DATA_INDEX_LUCKY];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_LUCKY");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_LUCKY]);
	objSpan.appendChild(objText);

	if (g_lucky_over > 0) {

		valueWork = Math.round(g_lucky_over * 10);
		textWork = "" + Math.floor(valueWork / 10);
		if ((valueWork % 10) != 0) {
			textWork += "." + (valueWork % 10);
		}

		objSpan.appendChild(document.createElement("br"));
		objText = HtmlCreateTextSpan("[過 " + textWork + "]", objSpan, "");
		objText.style.color = "red";
		objSpan.appendChild(objText);
	}



	//----------------------------------------------------------------
	// クリティカル
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_CRI] = charaData[CHARA_DATA_INDEX_CRI];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_CRI");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_CRI]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＭＡＴＫ
	//----------------------------------------------------------------
	var totalMatkBase = 0;
	var totalMatkAppend = 0;

	totalMatkBase = charaData[CHARA_DATA_INDEX_STATUS_MATK];

	totalMatkAppend = charaData[CHARA_DATA_INDEX_WEAPON_MATK];
	totalMatkAppend += specData[ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF];

	charaData[CHARA_DATA_INDEX_DISP_MATK_LEFT] = totalMatkBase;
	charaData[CHARA_DATA_INDEX_DISP_MATK_RIGHT] = totalMatkAppend;

	objSpan = document.getElementById("OBJID_SPAN_CHARA_MATK");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(totalMatkBase + "+" + totalMatkAppend);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＡＳＰＤ
	//----------------------------------------------------------------
	var dispAspd = Math.floor(charaData[CHARA_DATA_INDEX_ASPD] * 10) / 10;
	charaData[CHARA_DATA_INDEX_DISP_ASPD] = dispAspd;

	objSpan = document.getElementById("OBJID_SPAN_CHARA_ASPD");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(dispAspd);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＨＰ回復力
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_HPR] = charaData[CHARA_DATA_INDEX_HPR];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_HPR");
	HtmlRemoveAllChild(objSpan);
	objText = document.createTextNode(charaData[CHARA_DATA_INDEX_HPR]);
	objSpan.appendChild(objText);



	//----------------------------------------------------------------
	// ＳＰ回復力
	//----------------------------------------------------------------
	charaData[CHARA_DATA_INDEX_DISP_SPR] = charaData[CHARA_DATA_INDEX_SPR];

	objSpan = document.getElementById("OBJID_SPAN_CHARA_SPR");
	HtmlRemoveAllChild(objSpan);
	if (charaData[CHARA_DATA_INDEX_SPR_STOP] == 0) {
		objText = document.createTextNode(charaData[CHARA_DATA_INDEX_SPR]);
	}
	else {
		objText = document.createTextNode("回復停止(" + charaData[CHARA_DATA_INDEX_SPR] + ")");
	}
	objSpan.appendChild(objText);







}











