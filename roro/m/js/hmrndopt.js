


function GetObjectPrefixRndOpt(eqpRgnId) {
	return "OBJID_" + EnumEquipRegionId.GetDefinedName(eqpRgnId);
}

function GetObjectIdRndOptKindTD(eqpRgnId, slotIndex) {
	return GetObjectPrefixRndOpt(eqpRgnId) + "_RNDOPT_KIND_TD_" + slotIndex;
}

function GetObjectIdRndOptKind(eqpRgnId, slotIndex) {
	return GetObjectPrefixRndOpt(eqpRgnId) + "_RNDOPT_KIND_" + slotIndex;
}

function GetObjectIdRndOptValueTD(eqpRgnId, slotIndex) {
	return GetObjectPrefixRndOpt(eqpRgnId) + "_RNDOPT_VALUE_TD_" + slotIndex;
}

function GetObjectIdRndOptValue(eqpRgnId, slotIndex) {
	return GetObjectPrefixRndOpt(eqpRgnId) + "_RNDOPT_VALUE_" + slotIndex;
}



/************************************************************************************************
 *
 * ランダムオプション欄を再構築する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param itemId 対象となるアイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildRndOptSelect(eqpRgnId, itemId) {

	var idx = 0;

	var rndOptTypeId = 0;
	var rndOptListId = 0;
	var rndOptId = 0;

	var objIdRoot = "";
	var objIdKind = "";
	var objIdValue = "";

	var objRndOptKind = null;
	var objRndOptValue = null;



	switch (eqpRgnId) {

	case EQUIP_REGION_ID_ARMS:
		objIdRoot = "OBJID_ARMS_RIGHT";
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		objIdRoot = "OBJID_ARMS_LEFT";
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		objIdRoot = "OBJID_HEAD_TOP";
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		objIdRoot = "OBJID_HEAD_MID";
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		objIdRoot = "OBJID_HEAD_UNDER";
		break;

	case EQUIP_REGION_ID_SHIELD:
		objIdRoot = "OBJID_SHIELD";
		break;

	case EQUIP_REGION_ID_BODY:
		objIdRoot = "OBJID_BODY";
		break;

	case EQUIP_REGION_ID_SHOULDER:
		objIdRoot = "OBJID_SHOULDER";
		break;

	case EQUIP_REGION_ID_SHOES:
		objIdRoot = "OBJID_SHOES";
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		objIdRoot = "OBJID_ACCESSARY_1";
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		objIdRoot = "OBJID_ACCESSARY_2";
		break;
	}

	objRoot = HtmlGetElementById(objIdRoot + "_SLOT_ROOT");



	// ランダムオプションタイプIDを取得する
	rndOptTypeId = GetRndOptTypeId(ItemObjNew[itemId][ITEM_DATA_INDEX_WPNLV]);

	// 全オプションスロットをループ
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// 一時変数を初期化
		rndOptListId = 0;
		rndOptId = 0;

		// 有効なランダムオプションタイプIDが設定されている場合は、該当スロットのオプションリストIDを取得する
		if (rndOptTypeId > 0) {
			rndOptListId = g_rndOptTypeArray[rndOptTypeId][RND_OPT_TYPE_DATA_INDEX_LIST_ID_ARRAY][idx];
		}

		// オブジェクトIDを取得する
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx)
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)



		//--------------------------------
		// ランダムオプション種別
		//--------------------------------

		// オブジェクト取得
		objRndOptKind = HtmlGetElementById(objIdKind);

		// オブジェクトが存在しない場合は、オブジェクトを生成する
		if (!objRndOptKind) {
			objRndOptKind = CreateRndOptKind(objRoot, eqpRgnId, idx);
		}

		// オブジェクトが存在する場合のみ、再構築
		if (objRndOptKind != null) {

			// セレクトボックスを再構築
			SetUpRndOptKind(objRndOptKind, rndOptListId)

			// 再構築したデフォルト値を、選択している値として取得
			rndOptId = HtmlGetObjectValueByIdAsInteger(objIdKind, 0);
		}



		//--------------------------------
		// ランダムオプション値
		//--------------------------------

		// オブジェクト取得
		objRndOptValue = HtmlGetElementById(objIdValue);

		// オブジェクトが存在しない場合は、オブジェクトを生成する
		if (!objRndOptValue) {
			objRndOptValue = CreateRndOptValue(objRoot, eqpRgnId, idx);
		}

		// オブジェクトが存在する場合のみ、再構築
		if (objRndOptValue != null) {
			SetUpRndOptValue(objRndOptValue, rndOptId)
		}
	}
}


function CreateRndOptKind(objRoot, eqpRgnId, slotIndex) {

	var objTd = null;
	var objSelect = null;

	var objIdKindTD = "";
	var objIdKind = "";

	if (objRoot == null) {
		return;
	}

	objIdKindTD = GetObjectIdRndOptKindTD(eqpRgnId, slotIndex);
	objIdKind = GetObjectIdRndOptKind(eqpRgnId, slotIndex);

	objTd = HtmlCreateElement("td", objRoot);
	HtmlSetAttribute(objTd, "id", objIdKindTD);

	objSelect = HtmlCreateElement("select", objTd);
	HtmlSetAttribute(objSelect, "id", objIdKind);
	HtmlSetAttribute(objSelect, "onChange", "OnChangeRndOptKind(" + eqpRgnId + ", " + slotIndex + ") | calc()");

	return objSelect;
}

function CreateRndOptValue(objRoot, eqpRgnId, slotIndex) {

	var objTd = null;
	var objSelect = null;

	var objIdValueTD = "";
	var objIdValue = "";

	if (objRoot == null) {
		return;
	}

	objIdValueTD = GetObjectIdRndOptValueTD(eqpRgnId, slotIndex);
	objIdValue = GetObjectIdRndOptValue(eqpRgnId, slotIndex);

	objTd = HtmlCreateElement("td", objRoot);
	HtmlSetAttribute(objTd, "id", objIdValueTD);

	objSelect = HtmlCreateElement("select", objTd);
	HtmlSetAttribute(objSelect, "id", objIdValue);
	HtmlSetAttribute(objSelect, "onChange", "OnChangeRandomEnchant() | calc()");

	return objSelect;
}



function SetUpRndOptKind(objRndOpt, rndOptListId) {

	var idx = 0;

	var rndOptList = null;
	var rndOptId = 0;
	var rndOpt = null;
	var dispName = "";

	if (objRndOpt == null) {
		return;
	}

	// セレクトボックス初期化
	HtmlRemoveOptionAll(objRndOpt);

	// ランダムオプションリストデータを取得
	rndOptList = g_rndOptListArray[rndOptListId];

	// すべてのランダムオプションを追加
	for (idx = 0; idx < rndOptList[RND_OPT_LIST_DATA_INDEX_OPT_ID_ARRAY].length; idx++) {

		// ランダムオプションIDを取得
		rndOptId = rndOptList[RND_OPT_LIST_DATA_INDEX_OPT_ID_ARRAY][idx];

		// ランダムオプションデータを取得
		rndOpt = g_rndOptArray[rndOptId];

		// 表示名を取得
		dispName = GetRndOptDispName(rndOpt[RND_OPT_DATA_INDEX_SPID]);

		// 選択肢を追加
		HtmlCreateElementOption(rndOpt[RND_OPT_DATA_INDEX_ID], dispName, objRndOpt);
	}

}

function SetUpRndOptValue(objRndOpt, rndOptId) {

	var idx = 0;

	var rndOpt = null;
	var dispName = "";

	if (objRndOpt == null) {
		return;
	}

	// セレクトボックス初期化
	HtmlRemoveOptionAll(objRndOpt);

	// ランダムオプションデータを取得
	rndOpt = g_rndOptArray[rndOptId];

	// すべての値を追加
	for (idx = rndOpt[RND_OPT_DATA_INDEX_MIN]; idx <= rndOpt[RND_OPT_DATA_INDEX_MAX]; idx += rndOpt[RND_OPT_DATA_INDEX_STEP]) {

		// 選択肢を追加
		switch (rndOpt[RND_OPT_DATA_INDEX_SPECIAL_FLAG]) {

		case RND_OPT_SPECIAL_FLAG_ONOFF:
			switch (idx) {
			case 0:
				HtmlCreateElementOption(idx, "OFF", objRndOpt);
				break;
			case 1:
				HtmlCreateElementOption(idx, "ON", objRndOpt);
				break;
			}
			break;

		default:
			HtmlCreateElementOption(idx, idx, objRndOpt);
			break;
		}
	}

}

function OnChangeRndOptKind(eqpRgnId, slotIndex) {

	var objIdKind = "";
	var objIdValue = "";

	var rndOptId = 0;

	var objRndOptValue = null;

	// オブジェクトのIDを取得
	objIdKind = GetObjectIdRndOptKind(eqpRgnId, slotIndex)
	objIdValue = GetObjectIdRndOptValue(eqpRgnId, slotIndex)

	// 種類の選択状況を取得
	rndOptId = HtmlGetObjectValueByIdAsInteger(objIdKind, 0);

	// 値選択セレクトボックスを取得
	objRndOptValue = document.getElementById(objIdValue);

	// 値選択セレクトボックスを再構築
	SetUpRndOptValue(objRndOptValue, rndOptId);

	// ランダムオプション変更処理
	OnChangeRandomEnchant();
}






/************************************************************************************************
 *
 * ランダムオプション選択状態をクリアする.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearRndOptSelectAll() {

	// 個別関数を全コール
	ClearRndOptSelect(EQUIP_REGION_ID_ARMS);
	ClearRndOptSelect(EQUIP_REGION_ID_ARMS_LEFT);
	ClearRndOptSelect(EQUIP_REGION_ID_HEAD_TOP);
	ClearRndOptSelect(EQUIP_REGION_ID_HEAD_MID);
	ClearRndOptSelect(EQUIP_REGION_ID_HEAD_UNDER);
	ClearRndOptSelect(EQUIP_REGION_ID_SHIELD);
	ClearRndOptSelect(EQUIP_REGION_ID_BODY);
	ClearRndOptSelect(EQUIP_REGION_ID_SHOULDER);
	ClearRndOptSelect(EQUIP_REGION_ID_SHOES);
	ClearRndOptSelect(EQUIP_REGION_ID_ACCESSARY_1);
	ClearRndOptSelect(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * ランダムオプション選択状態をクリアする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearRndOptSelect(eqpRgnId) {

	var idx = 0;

	var objIdKind = "";
	var objIdValue = "";



	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// ランダムオプション種別
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx)
		HtmlSetObjectValueById(objIdKind, 0);

		// ランダムオプション値
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)
		HtmlSetObjectValueById(objIdValue, 0);

		// 変数も更新
		SetEquipRndOptTable(eqpRgnId, idx, 0, 0);
	}
}










function SetRndOptEnablityAll() {

	// 個別関数を全コール
	SetRndOptEnablity(EQUIP_REGION_ID_ARMS);
	SetRndOptEnablity(EQUIP_REGION_ID_ARMS_LEFT);
	SetRndOptEnablity(EQUIP_REGION_ID_HEAD_TOP);
	SetRndOptEnablity(EQUIP_REGION_ID_HEAD_MID);
	SetRndOptEnablity(EQUIP_REGION_ID_HEAD_UNDER);
	SetRndOptEnablity(EQUIP_REGION_ID_SHIELD);
	SetRndOptEnablity(EQUIP_REGION_ID_BODY);
	SetRndOptEnablity(EQUIP_REGION_ID_SHOULDER);
	SetRndOptEnablity(EQUIP_REGION_ID_SHOES);
	SetRndOptEnablity(EQUIP_REGION_ID_ACCESSARY_1);
	SetRndOptEnablity(EQUIP_REGION_ID_ACCESSARY_2);
}

function SetRndOptEnablity(eqpRgnId) {

	var idx = 0;

	var itemId = 0;

	var objIdKind = "";
	var objIdValue = "";

	var objRndOptKind = null;
	var objRndOptValue = null;

	var bEnchantableBase = false;
	var bEnchantableSlot = false;



	// 基本的な使用可否判定
	bEnchantableBase = true;

	// 二刀流時の使用可否判定補正
	if (n_Nitou) {
		if (eqpRgnId == EQUIP_REGION_ID_SHIELD) {
			bEnchantableBase = false;
		}
	}
	else {
		if (eqpRgnId == EQUIP_REGION_ID_ARMS_LEFT) {
			bEnchantableBase = false;
		}
	}

	// 全てのオプションスロットをループ
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// 使用可否判定をリセット
		bEnchantableSlot = bEnchantableBase;

		// ランダムオプション種別
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx)
		objRndOptKind = HtmlGetElementById(objIdKind);
		if (objRndOptKind) {
			bEnchantableSlot &= IsEffectiveRndOptSelect(objRndOptKind);
			SetObjectUsable(objRndOptKind, bEnchantableSlot);
		}

		// ランダムオプション値
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)
		objRndOptValue = HtmlGetElementById(objIdValue);
		if (objRndOptValue) {
			SetObjectUsable(objRndOptValue, bEnchantableSlot);
		}

		// 使用不可の場合は値をクリア
		if (bEnchantableSlot != true) {
			HtmlSetObjectValueById(objIdKind, 0);
			HtmlSetObjectValueById(objIdValue, 0);
			SetEquipRndOptTable(eqpRgnId, idx, 0, 0);
		}
	}
}

function IsEffectiveRndOptSelect(objRndOpt) {

	if (objRndOpt.options.length == 0) {
		return false;
	}

	else if (objRndOpt.options.length == 1) {
		if (parseInt(objRndOpt.value) == 0) {
			return false;
		}
	}

	return true;
}

function SetObjectUsable(objTarget, enabled) {

	if (objTarget == null) {
		return;
	}

	// 使用可否設定
	objTarget.disabled = !enabled;

	// 可視設定
	if (enabled) {
		objTarget.style.visibility = "visible";
	} else {
		objTarget.style.visibility = "hidden";
	}
}









function GetRndOptTotalValue(spid, invalidItemIdArray, bListUp) {

	var spVal = 0;
	var listUpArray = new Array();

	if (bListUp) {
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_ARMS, spid, invalidItemIdArray, bListUp));
		if (n_Nitou) {
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_ARMS_LEFT, spid, invalidItemIdArray, bListUp));
		}
		else {
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHIELD, spid, invalidItemIdArray, bListUp));
		}
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_HEAD_TOP, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_HEAD_MID, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_HEAD_UNDER, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_BODY, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHOULDER, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHOES, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_ACCESSARY_1, spid, invalidItemIdArray, bListUp));
		listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_ACCESSARY_2, spid, invalidItemIdArray, bListUp));

		if ((typeof g_shadowEquipController) !== "undefined") {
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, spid, invalidItemIdArray, bListUp));
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_ARMS_LEFT, spid, invalidItemIdArray, bListUp));
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_BODY, spid, invalidItemIdArray, bListUp));
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_FOOT, spid, invalidItemIdArray, bListUp));
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_ACCESSARY_1, spid, invalidItemIdArray, bListUp));
			listUpArray = listUpArray.concat(GetRndOptValue(EQUIP_REGION_ID_SHADOW_ACCESSARY_2, spid, invalidItemIdArray, bListUp));
		}
	}

	else {
		spVal += GetRndOptValue(EQUIP_REGION_ID_ARMS, spid, invalidItemIdArray, bListUp);
		if (n_Nitou) {
			spVal += GetRndOptValue(EQUIP_REGION_ID_ARMS_LEFT, spid, invalidItemIdArray, bListUp);
		}
		else {
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHIELD, spid, invalidItemIdArray, bListUp);
		}
		spVal += GetRndOptValue(EQUIP_REGION_ID_HEAD_TOP, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_HEAD_MID, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_HEAD_UNDER, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_BODY, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_SHOULDER, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_SHOES, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_ACCESSARY_1, spid, invalidItemIdArray, bListUp);
		spVal += GetRndOptValue(EQUIP_REGION_ID_ACCESSARY_2, spid, invalidItemIdArray, bListUp);

		if ((typeof g_shadowEquipController) !== "undefined") {
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_ARMS_RIGHT, spid, invalidItemIdArray, bListUp);
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_ARMS_LEFT, spid, invalidItemIdArray, bListUp);
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_BODY, spid, invalidItemIdArray, bListUp);
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_FOOT, spid, invalidItemIdArray, bListUp);
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_ACCESSARY_1, spid, invalidItemIdArray, bListUp);
			spVal += GetRndOptValue(EQUIP_REGION_ID_SHADOW_ACCESSARY_2, spid, invalidItemIdArray, bListUp);
		}
	}

	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}



function GetRndOptValue(eqpRgnId, spid, invalidItemIdArray, bListUp) {

	var idx = 0;

	var rndOptId = 0;
	var rndOptSpId = 0;
	var rndOptValue = 0;

	var eqpRefined = 0;
	var pureParamArray = [
		SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK,
	];

	var spDefIdMod = 0;			// 特殊条件を取り除いたＳＰのＩＤ
	var spDefRemain = 0;		// 計算途中のＳＰＩＤ値
	var spDefBaseLvOver = 0;	// BaseLv以上条件
	var spDefBaseLvBy = 0;		// BaseLvが上がる度に条件
	var spDefJobRestrict = 0;	// 職業制限
	var spDefPureStatus = 0;	// 純粋なステータス条件
	var spDefPureStatusBy = 0;	// 純粋なステータスが上がる度に条件
	var spDefRefineOver = 0;	// 精錬値以上条件
	var spDefRefineBy = 0;		// 精錬値が上がる度に条件

	var spValPureStatus = 0;	// 純粋なステータスによる上昇量

	var spVal = 0;
	var listUpArray = new Array();



	// 全てのオプションスロットをループ
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// ランダムオプション種別
		rndOptId = GetEquipRndOptTableKind(eqpRgnId, idx);

		// ランダムオプションSPID
		rndOptSpId = g_rndOptArray[rndOptId][RND_OPT_DATA_INDEX_SPID];

		// ランダムオプション値
		rndOptValue = GetEquipRndOptTableValue(eqpRgnId, idx);



		//--------------------------------
		// 装備箇所ごとに、精錬値を特定する
		//--------------------------------ID_
		switch (eqpRgnId) {

		case EQUIP_REGION_ID_ARMS:
			eqpRefined = n_A_Weapon_ATKplus;
			break;

		case EQUIP_REGION_ID_ARMS_LEFT:
			eqpRefined = n_A_Weapon2_ATKplus;
			break;

		case EQUIP_REGION_ID_HEAD_TOP:
			eqpRefined = n_A_HEAD_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHIELD:
			eqpRefined = n_A_SHIELD_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_BODY:
			eqpRefined = n_A_BODY_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHOULDER:
			eqpRefined = n_A_SHOULDER_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHOES:
			eqpRefined = n_A_SHOES_DEF_PLUS;
			break;

		case EQUIP_REGION_ID_SHADOW_ARMS_RIGHT:
		case EQUIP_REGION_ID_SHADOW_ARMS_LEFT:
		case EQUIP_REGION_ID_SHADOW_BODY:
		case EQUIP_REGION_ID_SHADOW_FOOT:
		case EQUIP_REGION_ID_SHADOW_ACCESSARY_1:
		case EQUIP_REGION_ID_SHADOW_ACCESSARY_2:
			eqpRefined = g_refinedArray[eqpRgnId];
			if (!eqpRefined) {
				eqpRefined = 0;
			}
			break;

		default:
			eqpRefined = 0;

		}



		//--------------------------------
		// 共通のSPID判定
		//--------------------------------

		// ＳＰの定義を取得
		spDefRemain = rndOptSpId;
		spDefValue = rndOptValue;

		// ＳＰ定義ＩＤが一致しない場合は、次へ
		if (!IsMatchSpDefId(spDefRemain, spid)) {
			continue;
		}

		// 親密度条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefFriendlyOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// BaseLv以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefBaseLvOver(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// BaseLvが上がる度に条件を取得
		spDefBaseLvBy = Math.floor(spDefRemain / ITEM_SP_BASE_LV_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_BASE_LV_BY_1_OFFSET;

		// 職業条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefJobRestrict(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// 純粋なステータス条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefPureStatus(spDefRemain);
		if (spDefRemain < 0) {
			continue;
		}

		// 純粋なステータスが上がる度に条件を取得
		spDefPureStatusBy = Math.floor(spDefRemain / ITEM_SP_PURE_STR_BY_10_OFFSET);
		if (1 <= spDefPureStatusBy && spDefPureStatusBy <= 6) {
			spValPureStatus = Math.floor(pureParamArray[spDefPureStatusBy - 1] / 10);
		}
		else if (7 == spDefPureStatusBy) {
			spValPureStatus = pureStatusValue[PARAM_DEX];
		}
		else if (8 == spDefPureStatusBy) {
			spValPureStatus = pureStatusValue[PARAM_VIT];
		}
		spDefRemain = spDefRemain % ITEM_SP_PURE_STR_BY_10_OFFSET;

		// 精錬値以上条件を満たさない場合は、次へ
		spDefRemain = CheckSpDefRefineOver(spDefRemain, eqpRefined);
		if (spDefRemain < 0) {
			continue;
		}

		// 精錬値が上がる度に条件を取得
		spDefRefineBy = Math.floor(spDefRemain / ITEM_SP_REFINE_BY_1_OFFSET);
		spDefRemain = spDefRemain % ITEM_SP_REFINE_BY_1_OFFSET;

		// 追加すべきＳＰ定義値を計算

		spValToCorrect = spDefValue;

		// 精錬値が上がる度に条件が設定されている場合
		if (spDefRefineBy > 0) {
			spValToCorrect *= Math.floor(eqpRefined / spDefRefineBy);
		}

		// 純粋なステータスが上がる度に条件が設定されている場合
		if (spDefPureStatusBy > 0) {
			spValToCorrect *= spValPureStatus;
		}

		// BaseLvが上がる度に条件が設定されている場合
		if (spDefBaseLvBy > 0) {
			spValToCorrect *= Math.floor(n_A_BaseLV / spDefBaseLvBy);
		}



		//--------------------------------
		// 集計
		//--------------------------------

		// リストアップの場合
		if (bListUp) {
			listUpArray.push(spValToCorrect);
		}

		// 合計値の場合
		else {
			spVal += spValToCorrect;
		}
	}

	// 結果を戻す
	if (bListUp) {
		return listUpArray
	}

	else {
		return spVal;
	}
}


