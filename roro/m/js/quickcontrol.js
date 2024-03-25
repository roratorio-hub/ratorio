
var g_QuickControlSW = false;

//================================================================================================
//================================================================================================
//====
//==== クイック設定欄
//====
//================================================================================================
//================================================================================================

function OnClickQuickControlSW(){

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
	var objInput = null;



	// チェックボックスのチェック状態を取得
	objSW = document.getElementById("OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX");
	g_QuickControlSW = objSW.checked;



	// 設定欄を初期化
	objRoot = document.getElementById("ID_QUICK_CONTROL");
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
	objTd.setAttribute("id", "OBJID_QUICK_CONTROL_HEADER");
	objTd.setAttribute("class", "title");
	objTd.setAttribute("colspan", 6);
	objTr.appendChild(objTd);

	// 設定欄展開用チェックボックス
	objInput = document.createElement("input");
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX");
	objInput.setAttribute("onClick", "OnClickQuickControlSW()");
	if (g_QuickControlSW) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}
	objTd.appendChild(objInput);

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("クイック設定", objLabel);

	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "OBJID_QUICK_CONTROL_USEDTEXT");
	objTd.appendChild(objSpan);



	// 設定欄のヘッダ部分をリフレッシュ（着色処理等）
	RefreshQuickControlHeaderLearned(null, -1, 0);

	// 展開表示しない場合は、ここで処理終了
	if (!g_QuickControlSW) {
		return;
	}



	// 装備一括設定欄
	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objText = document.createTextNode("装備一括設定");
	objTd.appendChild(objText);

	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objSelect = document.createElement("select");
	objSelect.setAttribute("id", "OBJID_SELECT_QUICK_CONTROL_ITEMPACK");
	objSelect.setAttribute("onInput", "OnInputQuickControlItemPack()");
	objTd.appendChild(objSelect);

	for (var idx = 0; idx < ItemPackOBJ.length; idx++) {
		objOption = document.createElement("option");
		objOption.setAttribute("value", idx);
		objSelect.appendChild(objOption);

		objText = document.createTextNode(ItemPackOBJ[idx][ITEM_PACK_DATA_INDEX_NAME]);
		objOption.appendChild(objText);
	}

	objTd = document.createElement("td");
	objTr.appendChild(objTd);

	objInput = document.createElement("input");
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "適用");
	objInput.setAttribute("onClick", "OnClickQuickControlSetItemPack() | LoadSelect2()");
	objTd.appendChild(objInput);

	objTr = document.createElement("tr");
	objTbody.appendChild(objTr);

	objTd = document.createElement("td");
	objTd.setAttribute("colspan", "3");
	objTr.appendChild(objTd);

	objSpan = document.createElement("span");
	objSpan.setAttribute("id", "OBJID_QUICK_CONTROL_ITEMS_TEXT");
	objTd.appendChild(objSpan);



	OnInputQuickControlItemPack();
}



function RefreshQuickControlHeaderLearned(objSelect, changedIdx, newValue) {

/*
	// 背景設定
	if (objSelect) {
		if (0 != newValue) {
			objSelect.setAttribute("class", "CSSCLS_SELECTED_LEARNED_SKILL");
		} else {
			objSelect.setAttribute("class", "");
		}
	}
*/

	var sColorCode = "#ddddff";
	var sUsedText = "";

/*
	for (var idx = 0; idx < n_A_LearnedSkill.length; idx++) {
		if (n_A_LearnedSkill[idx] != 0) {
			sColorCode = "#ff7777";
			sUsedText = "　設定中";
			break;
		}
	}
*/

	var objHeader = null;
	var objUsedText = null;
	var objText = null;

	objHeader = document.getElementById("OBJID_QUICK_CONTROL_HEADER");
	objHeader.setAttribute("bgcolor", sColorCode);

	objUsedText = document.getElementById("OBJID_QUICK_CONTROL_USEDTEXT");
	while (objUsedText.firstChild) {
		objUsedText.removeChild(objUsedText.firstChild);
	}
	objText = document.createTextNode(sUsedText);
	objUsedText.appendChild(objText);
}



function OnInputQuickControlItemPack() {

	var bEquipable = false;

	var itemPackId = 0;
	var itemPackItems = null;
	var itemPackItemsKind = 0;
	var itemText = "";

	var objSpan = null;
	var objSpanCannotEquip = null;

	objSpan = document.getElementById("OBJID_QUICK_CONTROL_ITEMS_TEXT");

	if (!objSpan) {
		return;
	}

	// 現在のテキストを全削除
	HtmlRemoveAllChild(objSpan);



	// 職業情報の更新
	InitJobInfo();



	// 選択されたアイテムパックの ID を取得
	itemPackId = HtmlGetObjectValueById("OBJID_SELECT_QUICK_CONTROL_ITEMPACK", 0);

	// アイテムパックの構成要素を取得
	itemPackItems = ItemPackOBJ[itemPackId][ITEM_PACK_DATA_INDEX_ITEMS];

	// 全ての構成要素を設定していく
	for (idx = 0; idx < itemPackItems.length; idx += 3) {

		// 構成要素の情報を取得
		itemPackItemsKind = itemPackItems[idx];
		itemId = itemPackItems[idx + 1];
		itemRefine = itemPackItems[idx + 2];

		// 改行の追加
		if (idx > 0) {
			HtmlCreateElement("br", objSpan);
		}

		// 構成要素の種類によって処理を振り分け
		switch (itemPackItemsKind) {

		// アイテムの場合
		case ITEM_PACK_ITEMS_KIND_ITEM:

			// 表示名を生成
			itemText = "";
			if (itemRefine > 0) {
				itemText += "+" + itemRefine + " ";
			}
			itemText += ItemObjNew[itemId][ITEM_DATA_INDEX_NAME];

			// 構成要素が、装備可能かを検査
			bEquipable = IsMatchJobRestrict(itemId, n_A_JOB);

			// 装備可能の場合
			if (bEquipable) {
				HtmlCreateTextNode(itemText, objSpan);
			}
			// 装備不可の場合
			else {
				// 色付け span を追加
				objSpanCannotEquip = document.createElement("span");
				objSpanCannotEquip.setAttribute("style", "color : red");
				objSpan.appendChild(objSpanCannotEquip);
				// テキスト表示を、色付け配下に追加
				HtmlCreateTextNode(itemText + "（装備不可）", objSpanCannotEquip);
			}

			break;

		// カードの場合
		case ITEM_PACK_ITEMS_KIND_CARD:

			// 表示名を生成
			itemText = "";
			itemText += CardObjNew[itemId][CARD_DATA_INDEX_NAME];

			HtmlCreateTextNode(itemText, objSpan);

			break;
		}
	}

	// TODO: 注意事項を追記
	if (idx > 0) {
		HtmlCreateElement("br", objSpan);
		HtmlCreateElement("br", objSpan);
	}
	HtmlCreateTextNode("※ランダムエンチャント入力画面の場合、自動的にカード入力画面になります。", objSpan);

}



function OnClickQuickControlSetItemPack() {

	var idx = 0;

	var itemPackId = 0;
	var itemPackItems = null;
	var itemPackItemsKind = 0;
	var itemId = 0;
	var itemRefine = 0;




	// 職業情報の更新
	InitJobInfo();



	// 選択されたアイテムパックの ID を取得
	itemPackId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_QUICK_CONTROL_ITEMPACK", 0);

	// ランダムエンチャント画面の場合は、カード画面にする
	if (GetSlotMode() == SLOTPAGER_MODE_RNDENCH) {
		OnClickSlotModeButton();
	}

	// 全解除系は特殊処理
	switch (itemPackId) {

	case ITEM_PACK_ID_CLEAR_SHADOW_ALL:
		OnClickQuickControlSetItemPackSubForClearShadowEquipAll();
		StAllCalc();
		return;

	case ITEM_PACK_ID_CLEAR_EQUIP_ALL:
		OnClickQuickControlSetItemPackSubForClearEquipAll();
		StAllCalc();
		return;

	case ITEM_PACK_ID_CLEAR_REFINE_ALL:
		OnClickQuickControlSetItemPackSubForClearRefineAll();
		StAllCalc();
		return;

	case ITEM_PACK_ID_CLEAR_CARD_ALL:
		OnClickQuickControlSetItemPackSubForClearCardAll();
		StAllCalc();
		return;
	}

	// アイテムパックの構成要素を取得
	itemPackItems = ItemPackOBJ[itemPackId][ITEM_PACK_DATA_INDEX_ITEMS];

	// 全ての構成要素を設定していく
	for (idx = 0; idx < itemPackItems.length; idx += 3) {

		// 構成要素の情報を取得
		itemPackItemsKind = itemPackItems[idx];
		itemId = itemPackItems[idx + 1];
		itemRefine = itemPackItems[idx + 2];

		// 構成要素の種類によって処理を振り分け
		switch (itemPackItemsKind) {

		case ITEM_PACK_ITEMS_KIND_ITEM:
			OnClickQuickControlSetItemPackSubForItem(itemId, itemRefine);
			break;

		case ITEM_PACK_ITEMS_KIND_CARD:
			OnClickQuickControlSetItemPackSubForCard(itemId);
			break;

		}
	}

	// ステータス再計算
	StAllCalc();
}

function OnClickQuickControlSetItemPackSubForItem(itemId, itemRefine) {

	var idx = 0;

	var bEquipable = false;
	var targetObjIdEquip = "";
	var targetObjIdRefine = "";
	var eqpRegion = 0;

	var objSelect = null;



	// 構成要素が、装備可能かを検査
	bEquipable = IsMatchJobRestrict(itemId, n_A_JOB);

	// 装備できない場合は、処理終了
	if (!bEquipable) {
		return;
	}

	// 構成要素が武器の場合は、武器種類を適合させる
	// 同時に、構成要素ごとに、検査対象のセレクトボックスを特定する
	// また、装備リージョンも設定する
	switch (ItemObjNew[itemId][ITEM_DATA_INDEX_KIND]) {
	case ITEM_KIND_NONE:
	case ITEM_KIND_KNIFE:
	case ITEM_KIND_SWORD:
	case ITEM_KIND_SWORD_2HAND:
	case ITEM_KIND_SPEAR:
	case ITEM_KIND_SPEAR_2HAND:
	case ITEM_KIND_AXE:
	case ITEM_KIND_AXE_2HAND:
	case ITEM_KIND_CLUB:
	case ITEM_KIND_STUFF:
	case ITEM_KIND_BOW:
	case ITEM_KIND_KATAR:
	case ITEM_KIND_BOOK:
	case ITEM_KIND_FIST:
	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
	case ITEM_KIND_FUMA:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		OnChangeArmsTypeRight(ItemObjNew[itemId][ITEM_DATA_INDEX_KIND]);
		targetObjIdEquip = "OBJID_ARMS_RIGHT";
		targetObjIdRefine = "OBJID_ARMS_RIGHT_REFINE";
		eqpRegion = EQUIP_REGION_ID_ARMS;
		break;

	case ITEM_KIND_HEAD_TOP:
		targetObjIdEquip = "OBJID_HEAD_TOP";
		targetObjIdRefine = "OBJID_HEAD_TOP_REFINE";
		eqpRegion = EQUIP_REGION_ID_HEAD_TOP;
		break;

	case ITEM_KIND_HEAD_MID:
		targetObjIdEquip = "OBJID_HEAD_MID";
		eqpRegion = EQUIP_REGION_ID_HEAD_MID;
		break;

	case ITEM_KIND_HEAD_UNDER:
		targetObjIdEquip = "OBJID_HEAD_UNDER";
		eqpRegion = EQUIP_REGION_ID_HEAD_UNDER;
		break;

	case ITEM_KIND_BODY:
		targetObjIdEquip = "OBJID_BODY";
		targetObjIdRefine = "OBJID_BODY_REFINE";
		eqpRegion = EQUIP_REGION_ID_BODY;
		break;

	case ITEM_KIND_SHIELD:
		// 二刀流状態の場合は、予め解除しておく
		if (n_Nitou) {
			HtmlSetObjectValueById("OBJID_ARMS_TYPE_LEFT", ITEM_KIND_NONE);
			OnChangeArmsTypeLeft(ITEM_KIND_NONE);
			OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_ARMS_LEFT", EQUIP_REGION_ID_ARMS_LEFT);
		}

		targetObjIdEquip = "OBJID_SHIELD";
		targetObjIdRefine = "OBJID_SHIELD_REFINE";
		eqpRegion = EQUIP_REGION_ID_SHIELD;
		break;

	case ITEM_KIND_SHOULDER:
		targetObjIdEquip = "OBJID_SHOULDER";
		targetObjIdRefine = "OBJID_SHOULDER_REFINE";
		eqpRegion = EQUIP_REGION_ID_SHOULDER;
		break;

	case ITEM_KIND_FOOT:
		targetObjIdEquip = "OBJID_SHOES";
		targetObjIdRefine = "OBJID_SHOES_REFINE";
		eqpRegion = EQUIP_REGION_ID_SHOES;
		break;

	case ITEM_KIND_ACCESSARY:
		targetObjIdEquip = "OBJID_ACCESSARY_1";
		eqpRegion = EQUIP_REGION_ID_ACCESSARY_1;
		break;

	case ITEM_KIND_ACCESSARY_ON1:
		targetObjIdEquip = "OBJID_ACCESSARY_1";
		eqpRegion = EQUIP_REGION_ID_ACCESSARY_1;
		break;

	case ITEM_KIND_ACCESSARY_ON2:
		targetObjIdEquip = "OBJID_ACCESSARY_2";
		eqpRegion = EQUIP_REGION_ID_ACCESSARY_2;
		break;

	}
	objSelect = document.getElementById(targetObjIdEquip);

	// 構成要素が装備欄にリストアップされているかを検査
	bEquipable = false;
	for (idx = 0; idx < objSelect.options.length; idx++) {
		if (objSelect.options[idx].value == itemId) {
			bEquipable = true;
			break;
		}
	}

	// 装備できない場合は、処理終了
	if (!bEquipable) {
		return;
	}

	// 装備変更
	HtmlSetObjectValueById(targetObjIdEquip, itemId);
	OnChangeEquip(eqpRegion, itemId);

	// 精錬値変更
	if (targetObjIdRefine != "") {
		HtmlSetObjectValueById(targetObjIdRefine, itemRefine);
	}

	// 両手武器の場合には、盾をクリア
	switch (ItemObjNew[itemId][ITEM_DATA_INDEX_KIND]) {
	case ITEM_KIND_STUFF:
		// 杖は両手杖特性を直接検索する
		if (GetEquippedTotalSPEquip(ITEM_SP_STUFF2HAND) == 0) {
			break;
		}
	case ITEM_KIND_SWORD_2HAND:
	case ITEM_KIND_SPEAR_2HAND:
	case ITEM_KIND_AXE_2HAND:
	case ITEM_KIND_BOW:
	case ITEM_KIND_KATAR:
	case ITEM_KIND_FUMA:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_SHIELD", EQUIP_REGION_ID_SHIELD);
		HtmlSetObjectValueById("OBJID_SHIELD_REFINE", 0);
		for (idxSlot = SLOT_INDEX_CARD_MIN; idxSlot <= SLOT_INDEX_CARD_MAX; idxSlot++) {
			OnClickQuickControlSetItemPackSubForClearCardAllSub("OBJID_SHIELD" + "_CARD_" + idxSlot);
		}
	}
}

function OnClickQuickControlSetItemPackSubForCard(cardId) {

	var idx = 0;

	var bEquipable = false;
	var targetObjIdCard = "";

	var objSelect = null;



	// 構成要素ごとに、検査対象のセレクトボックスを特定する
	switch (CardObjNew[cardId][CARD_DATA_INDEX_KIND]) {
	case CARD_KIND_ARMS:
		targetObjIdCard = "OBJID_ARMS_RIGHT_CARD_1";
		break;

	case CARD_KIND_HEAD:
		targetObjIdCard = "OBJID_HEAD_TOP_CARD_1";
		break;

	case CARD_KIND_BODY:
		targetObjIdCard = "OBJID_BODY_CARD_1";
		break;

	case CARD_KIND_SHIELD:
		targetObjIdCard = "OBJID_SHIELD_CARD_1";
		break;

	case CARD_KIND_SHOULDER:
		targetObjIdCard = "OBJID_SHOULDER_CARD_1";
		break;

	case CARD_KIND_FOOT:
		targetObjIdCard = "OBJID_SHOES_CARD_1";
		break;

	case CARD_KIND_ACCESSARY:
		targetObjIdCard = "OBJID_ACCESSARY_1_CARD_1";
		break;
	}
	objSelect = document.getElementById(targetObjIdCard);

	// 構成要素が装備欄にリストアップされているかを検査
	bEquipable = false;
	for (idx = 0; idx < objSelect.options.length; idx++) {
		if (objSelect.options[idx].value == cardId) {
			bEquipable = true;
			break;
		}
	}

	// 装備できない場合は、処理終了
	if (!bEquipable) {
		return;
	}

	// 装備変更
	HtmlSetObjectValueById(targetObjIdCard, cardId);
	OnChangeCard(cardId);
}

/**
 * シャドウ装備を全てクリアする
 */
function OnClickQuickControlSetItemPackSubForClearShadowEquipAll() {
	const target = [
		'OBJID_SHADOW_WEAPON',
		'OBJID_SHADOW_SHIELD',
		'OBJID_SHADOW_BODY',
		'OBJID_SHADOW_SHOESE',
		'OBJID_SHADOW_ACCESSORY1',
		'OBJID_SHADOW_ACCESSORY2',
	];
	const e = new Event('change', {bubbles: true});
	for (let i = 0; i < target.length; i++) {
		HtmlSetObjectValueById(target[i] + '_REFINE', 0);
		HtmlSetObjectValueById(target[i], 0);
		document.getElementById(target[i]).dispatchEvent(e);
	}
}

function OnClickQuickControlSetItemPackSubForClearEquipAll() {

	// 左手：武器種別リセット　→　装備変更
	HtmlSetObjectValueById("OBJID_ARMS_TYPE_LEFT", ITEM_KIND_NONE);
	OnChangeArmsTypeLeft(ITEM_KIND_NONE);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_ARMS_LEFT", EQUIP_REGION_ID_ARMS_LEFT);

	// 右手：武器種別リセット　→　装備変更
	HtmlSetObjectValueById("OBJID_ARMS_TYPE_RIGHT", ITEM_KIND_NONE);
	OnChangeArmsTypeRight(ITEM_KIND_NONE);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_ARMS_RIGHT", EQUIP_REGION_ID_ARMS);

	// 防具：装備変更
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_HEAD_TOP", EQUIP_REGION_ID_HEAD_TOP);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_HEAD_MID", EQUIP_REGION_ID_HEAD_MID);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_HEAD_UNDER", EQUIP_REGION_ID_HEAD_UNDER);

	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_BODY", EQUIP_REGION_ID_BODY);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_SHIELD", EQUIP_REGION_ID_SHIELD);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_SHOULDER", EQUIP_REGION_ID_SHOULDER);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_SHOES", EQUIP_REGION_ID_SHOES);

	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_ACCESSARY_1", EQUIP_REGION_ID_ACCESSARY_1);
	OnClickQuickControlSetItemPackSubForClearEquipAllSub("OBJID_ACCESSARY_2", EQUIP_REGION_ID_ACCESSARY_2);
}

function OnClickQuickControlSetItemPackSubForClearEquipAllSub(objId, eqprgn) {

	var objSelect = null;
	var itemId = 0;

	objSelect = document.getElementById(objId);
	itemId = objSelect.options[0].value;

	HtmlSetObjectValueById(objId, itemId);
	OnChangeEquip(eqprgn, itemId);
}

function OnClickQuickControlSetItemPackSubForClearRefineAll() {

	// 左手
	HtmlSetObjectValueById("OBJID_ARMS_LEFT_REFINE", 0);

	// 右手
	HtmlSetObjectValueById("OBJID_ARMS_RIGHT_REFINE", 0);

	// 防具：装備変更
	HtmlSetObjectValueById("OBJID_HEAD_TOP_REFINE", 0);

	HtmlSetObjectValueById("OBJID_BODY_REFINE", 0);
	HtmlSetObjectValueById("OBJID_SHIELD_REFINE", 0);
	HtmlSetObjectValueById("OBJID_SHOULDER_REFINE", 0);
	HtmlSetObjectValueById("OBJID_SHOES_REFINE", 0);
}

function OnClickQuickControlSetItemPackSubForClearCardAll() {

	var objIdBaseList = [
		"OBJID_ARMS_LEFT", "OBJID_ARMS_RIGHT",
		"OBJID_HEAD_TOP", "OBJID_HEAD_MID", "OBJID_HEAD_UNDER",
		"OBJID_BODY", "OBJID_SHIELD", "OBJID_SHOULDER", "OBJID_SHOES",
		"OBJID_ACCESSARY_1", "OBJID_ACCESSARY_2",
	];

	var idx = 0;
	var idxSlot = 0;

	for (idx = 0; idx < objIdBaseList.length; idx++) {
		for (idxSlot = SLOT_INDEX_CARD_MIN; idxSlot <= SLOT_INDEX_CARD_MAX; idxSlot++) {
			OnClickQuickControlSetItemPackSubForClearCardAllSub(objIdBaseList[idx] + "_CARD_" + idxSlot);
		}
	}
}

function OnClickQuickControlSetItemPackSubForClearCardAllSub(objId) {

	var objSelect = null;
	var cardId = 0;

	objSelect = document.getElementById(objId);
	cardId = objSelect.options[0].value;

	HtmlSetObjectValueById(objId, cardId);
	OnChangeCard(cardId);
}
