/**
 * ステータスや装備などを初期化して職業変更する
 * @param {string} jobId
 */
function changeJobSettings(jobId) {
	// 職業IDが引数で渡されなかった時用のコード
	const selectJobElem = document.getElementById("OBJID_SELECT_JOB");
	if (selectJobElem) {
		if (typeof jobId === "undefined" || jobId === null) {
			jobId = selectJobElem.value;
		}
		// OBJID_SELECT_JOB内にoptionが存在しない場合
		// 後ほど選択できるようdata-job-idに値を保存
		selectJobElem.setAttribute("data-job-id", jobId);
	}
	// 職業IDが確定したら、ジョブデータを取得
	let jobData = JobMap.getById(jobId);

	// 移行中のため、MigIDをグローバル変数「n_A_JOB」を設定
	window.n_A_JOB = jobData.getMigIdNum();

	// 職業情報の初期化
	InitJobInfo(jobId);

	// 計算機の初期化
	Init(jobId);

	// 武器属性付与手段の名称の設定
	if (41 <= jobData.getMigIdNum() && jobData.getMigIdNum() <= 43) {
		myInnerHtml("ID_A_HUYO_NAME","暖かい風",0);
	} else {
		myInnerHtml("ID_A_HUYO_NAME","武器属性付与",0);
	}

	// Baseレベル自動調整が有効だと値設定ができない不具合があるので、無効化...
	let checkAutoBaseLevel = document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL");
	if (checkAutoBaseLevel.getAttribute("checked")) {
		checkAutoBaseLevel.removeAttribute("checked");
	}

	// ベースレベル選択セレクトボックスの設定
	var lvMax = jobData.getBaseLvMax();
	var lvMin = jobData.getBaseLvMin();
	var inputElem = document.getElementById("OBJID_SELECT_BASE_LEVEL");
	inputElem.min = lvMin;
	inputElem.max = lvMax;
	inputElem.value = lvMin.toString();

	// ジョブレベル選択セレクトボックスの設定
	var lvMax = jobData.getJobLvMax();
	var lvMin = 1;
	var inputElem = document.getElementById("OBJID_SELECT_JOB_LEVEL");
	inputElem.min = lvMin;
	inputElem.max = lvMax;
	inputElem.value = lvMin.toString();

	// ステータス選択セレクトボックスの設定
	RebuildStatusSelect(jobId);

	// 速度ＰＯＴ選択セレクトボックスの設定
	// スピードアップポーション
	for (var i = 2; i <= 3; i++) {
		document.getElementById("OBJID_SPEED_POT").options[2] = null;
	}
	// ハイスピードポーション
	if (IsUsableHSPJob(jobData.getMigIdNum())) {
		document.getElementById("OBJID_SPEED_POT").options[2] = new Option(SpeedPotName[2] + "(Lv40)", "2");
	} else {
		document.getElementById("OBJID_SPEED_POT").options[2] = new Option("-", "0");
	}
	// バーサークポーション
	if (IsUsableBSPJob(jobData.getMigIdNum())) {
		document.getElementById("OBJID_SPEED_POT").options[3] = new Option(SpeedPotName[3]+"(Lv85)", "3");
	} else if(IsSameJobClass(JOB_ID_ASSASINCROSS) || IsSameJobClass(JOB_ID_GILOTINCROSS)) {
		document.getElementById("OBJID_SPEED_POT").options[3] = new Option("■特殊("+ SkillObjNew[304][SKILL_DATA_INDEX_NAME] +"Lv85)/毒薬の瓶", "3");
	} else {
		document.getElementById("OBJID_SPEED_POT").options[3] = new Option("■特殊("+ SkillObjNew[304][SKILL_DATA_INDEX_NAME] +")(Lv85)", "3");
	}

	// スパノビの装備制限解除フラグを初期化
	g_bSuperNoviceFullWeapon = undefined;
	// 二刀流状態の解除
	if (n_Nitou) {
		n_Nitou = false;
	}
	OnChangeArmsTypeLeft(ITEM_KIND_NONE);

	// 武器種類選択セレクトボックスの設定
	//var jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, jobId);

	var selectElem = document.getElementById("OBJID_ARMS_TYPE_RIGHT");
	HtmlRemoveOptionAll(selectElem);
	var j = 0;
	for (var i = 0; i <= 21; i++) {
		// スパノビ系の両手斧は装備制限解除状態の時のみ可
		if (GetHigherJobSeriesID(jobData.getMigIdNum()) == JOB_SERIES_ID_SUPERNOVICE) {
			if (i == ITEM_KIND_AXE_2HAND) {
				if (!g_bSuperNoviceFullWeapon) {
					continue;
				}
			}
		}
		if (jobData.GetWeaponAspd(i) !== undefined) {
			selectElem.options[j] = new Option(GetItemKindNameText(i), i.toString());
			j++;
		}
	}
	// 武器選択セレクトボックスの設定
	OnChangeArmsTypeRight(ITEM_KIND_NONE);
	// 防具選択欄を再構築
	RebuildArmorsSelect();
	// シャドウ装備
	if ((typeof g_shadowEquipController) !== "undefined") {
		g_shadowEquipController.rebuildAll();
	}
	// 習得スキルの初期化
	n_A_LearnedSkill = new Array();
	for (var dmyidx = 0; dmyidx < LEARNED_SKILL_MAX_COUNT; dmyidx++) {
		n_A_LearnedSkill[dmyidx] = 0;
	}
	OnClickSkillSWLearned();
	// 攻撃手段欄の初期化
	CAttackMethodAreaComponentManager.RebuildControls();
	// 拡張表示の選択値記憶のリセット
	CExtraInfoAreaComponentManager.ClearStoredValueAll(true);
	// 拡張表示の再構築
	CExtraInfoAreaComponentManager.RebuildDispAreaAll();
}



/************************************************************************************************
 *
 * 右手武器の武器種別変更イベントハンドラ
 *
 *-----------------------------------------------------------------------------------------------
 * @param itemKind 武器種別
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function OnChangeArmsTypeRight(itemKind){

	var idx = 0;

	var arrowId = 0;
	var arrowData = null;
	var arrowIdArrayEquipable = new Array();

	var objRoot = null;
	var objSelectArrow = null;

	// 職業情報の更新
	InitJobInfo();

	// 武器種別の設定
	HtmlSetObjectValueById("OBJID_ARMS_TYPE_RIGHT", itemKind);
	n_A_WeaponType = itemKind;



	// 矢リストを再構築する
	for (idx = 0; idx < ArrowOBJNew.length; idx++) {

		// 矢データを取得
		arrowData = ArrowOBJNew[idx];

		// 職業系統ごとに、設定するデータを変える
		switch (GetLowerJobSeriesID(n_A_JOB)) {

		// シーフ系統、または、アーチャー系統の場合
		case JOB_SERIES_ID_THIEF:
		case JOB_SERIES_ID_ARCHER:
			// 矢のタイプが「なし」「矢」の場合のみ、ピックアップする
			switch (arrowData[ARROW_DATA_INDEX_KIND]) {
			case ARROW_KIND_NONE:
			case ARROW_KIND_ARROW:
				arrowIdArrayEquipable.push(arrowData[ARROW_DATA_INDEX_ID]);
			}
			break;

		// ガンスリンガー系統の場合
		case JOB_SERIES_ID_GUNSLINGER:
			// 矢のタイプが「なし」「弾」の場合のみ、ピックアップする
			switch (arrowData[ARROW_DATA_INDEX_KIND]) {
			case ARROW_KIND_NONE:
			case ARROW_KIND_BULLET:
				arrowIdArrayEquipable.push(arrowData[ARROW_DATA_INDEX_ID]);
			}
			break;
		}

	}

	// 読み仮名ソート実行
	arrowIdArrayEquipable.sort(
		function(a, b) {
			if (ArrowOBJNew[a][ARROW_DATA_INDEX_KANA] < ArrowOBJNew[b][ARROW_DATA_INDEX_KANA]) return -1;
			if (ArrowOBJNew[a][ARROW_DATA_INDEX_KANA] > ArrowOBJNew[b][ARROW_DATA_INDEX_KANA]) return 1;
			return 0;
		}
	);



	// 矢セレクトボックスを調整する
	objSelectArrow = document.getElementById("OBJID_SELECT_ARROW");

	// リストに要素が存在する場合
	if (arrowIdArrayEquipable.length > 0) {

		// セレクトボックスが存在した場合は、全要素削除
		if (objSelectArrow != null) {
			HtmlRemoveOptionAll(objSelectArrow);
		}

		// セレクトボックスが存在しない場合は、生成する
		else {
			objRoot = document.getElementById("OBJID_SPAN_SELECT_ARROW");

			objSelectArrow = document.createElement("select");
			objSelectArrow.setAttribute("id", "OBJID_SELECT_ARROW");
			objSelectArrow.setAttribute("onChange", "StAllCalc() | AutoCalc()");
			objRoot.appendChild(objSelectArrow);
		}

		// リストアップした矢の名称を、セレクトボックスに追加
		for(idx = 0; idx < arrowIdArrayEquipable.length; idx++) {
			arrowId = arrowIdArrayEquipable[idx];
			HtmlCreateElementOption(arrowId, ArrowOBJNew[arrowId][ARROW_DATA_INDEX_NAME], objSelectArrow);
		}

		// 初期値を設定
		HtmlSetObjectValueById("OBJID_SELECT_ARROW", ARROW_ID_NONE);
	}

	// リストに要素が存在しない場合
	else {
		// セレクトボックスを削除する
		HtmlRemoveFromParent(objSelectArrow);
	}



	// 右手装備情報のクリア
	ClearEquip(EQUIP_REGION_ID_ARMS);

	with(document.calcForm){

		// 右手装備欄の再構築
		RebuildArmsRightSelect();

		if(GetHigherJobSeriesID(n_A_JOB) == 8 && itemKind != ITEM_KIND_KATAR){
			if (!n_Nitou) {
				myInnerHtml("A_SobWeaponName","　左手："+'<select id="OBJID_ARMS_TYPE_LEFT" name="A_Weapon2Type" onChange = "OnChangeArmsTypeLeft(this[this.selectedIndex].value) | StAllCalc() | AutoCalc()"> <option value="0">素手or盾<option value="1">短剣<option value="2">片手剣<option value="6">片手斧</select>',0);
			}
		}
		else if((IsSameJobClass(JOB_ID_KAGERO) || IsSameJobClass(JOB_ID_OBORO)) && (itemKind != ITEM_KIND_FUMA)){
			if (!n_Nitou) {
				myInnerHtml("A_SobWeaponName","　左手："+'<select id="OBJID_ARMS_TYPE_LEFT" name="A_Weapon2Type" onChange = "OnChangeArmsTypeLeft(this[this.selectedIndex].value) | StAllCalc() | AutoCalc()"> <option value=0>素手or盾<option value=1>短剣</select>',0);
			}
		}
		else{

			myInnerHtml("A_SobWeaponName","",0);

			HtmlRemoveOptionAll(OBJID_ARMS_LEFT);
			OBJID_ARMS_LEFT.options[0] = new Option(ItemObjNew[ITEM_ID_SUDE][ITEM_DATA_INDEX_NAME], ITEM_ID_SUDE);

			// 二刀流が解除される場合は、左手装備をクリア
			if (n_Nitou) {
				OnChangeArmsTypeLeft(ITEM_KIND_NONE);
			}

			n_Nitou = false;

			// 左手武器欄を無効化する
			A_Weapon2_ATKplus.disabled = true;
			A_Weapon2_ATKplus.style.visibility = "hidden";

			OBJID_ARMS_LEFT.disabled = true;
			OBJID_ARMS_LEFT.style.visibility = "hidden";

			// 盾欄を有効化する
			A_SHIELD_DEF_PLUS.disabled = false;
			A_SHIELD_DEF_PLUS.style.visibility = "visible";

			OBJID_SHIELD.disabled = false;
			OBJID_SHIELD.style.visibility = "visible";

		}

		// 二刀流でない場合は、左右武器入れ替えボタンを削除
		if (!n_Nitou) {
			HtmlRemoveAllChild(document.getElementById("OBJID_SPAN_SWAP_ARMS"));
		}

		// 装備を更新（選択セレクトボックスの先頭要素）
		OnChangeEquip(EQUIP_REGION_ID_ARMS, parseInt(eval(OBJID_ARMS_RIGHT.value)));

		// 使用可否の更新
		if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
			SetCardSlotEnability(EQUIP_REGION_ID_ARMS);
			SetCardSlotEnability(EQUIP_REGION_ID_SHIELD);
		}
		else {
			SetRndOptEnablityAll();
			// SetEnchSlotsEnablity();
		}

		// 攻撃手段の更新
		CAttackMethodAreaComponentManager.RebuildControls();

		// アイテムデータ説明の更新
		CItemInfoManager.OnChangeEquip(CONST_DATA_KIND_ITEM, n_A_Equip[EQUIP_REGION_ID_ARMS]);
	}
}



/************************************************************************************************
 *
 * 右手装備欄の再構築
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildArmsRightSelect() {

	var idx = 0;
	var itemId = 0;
	var itemName = "";
	var ItemIdArrayEquipable = new Array();

	var objSelect = null;

	// 全てのアイテムを走査
	for (idx = 0; idx < ItemObjNew.length; idx++) {

		// 武器種別が一致しない場合は、次へ
		if (ItemObjNew[idx][ITEM_DATA_INDEX_KIND] != n_A_WeaponType) {
			continue;
		}

		// アイテム ID を取得
		itemId = ItemObjNew[idx][ITEM_DATA_INDEX_ID];

		// 職業制限に適合する場合は、ピックアップ配列に追加
		if (IsMatchJobRestrict(itemId, n_A_JOB)) {
			ItemIdArrayEquipable.push(itemId);
		}

		// 職業制限に不適合でも、スパノビの魂の対象である場合は、ピックアップ配列に追加
		else if (Math.floor(ItemObjNew[idx][ITEM_DATA_INDEX_WPNLV] % 10) == 4 && g_bSuperNoviceFullWeapon){
			ItemIdArrayEquipable.push(itemId);
		}
	}

	// 読み仮名ソート実行
	ItemIdArrayEquipable.sort(
		function(a, b) {
			if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] < ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return -1;
			if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] > ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return 1;
			return 0;
		}
	);

	// アイテムセレクトボックスを取得
	objSelect = document.getElementById("OBJID_ARMS_RIGHT");

	// セレクトボックスの要素を全削除
	HtmlRemoveOptionAll(objSelect);

	// ソートしたアイテムの名称を、セレクトボックスに追加
	for (idx = 0; idx < ItemIdArrayEquipable.length; idx++) {

		// アイテム ID を取得
		itemId = ItemIdArrayEquipable[idx];

		HtmlCreateElementOption(itemId, GetFlagAppendedItemName(itemId), objSelect);
	}
}

function GetFlagAppendedItemName(targetId) {

	var baseName = "";

	baseName = ItemObjNew[targetId][ITEM_DATA_INDEX_NAME];

	return (IsLearnedEffectEquipable(CONST_DATA_KIND_ITEM, targetId)) ? ("【習】" + baseName) : baseName;
}

function GetFlagAppendedCardName(targetId) {

	var baseName = "";

	baseName = CardObjNew[targetId][CARD_DATA_INDEX_NAME];

	return (IsLearnedEffectEquipable(CONST_DATA_KIND_CARD, targetId)) ? ("【習】" + baseName) : baseName;
}

function IsLearnedEffectEquipable(dataKind, targetId) {

	var idx = 0;
	var idxSet = 0;

	// アイテム単品を判定
	if (dataKind == CONST_DATA_KIND_ITEM) {
		for (idx = ITEM_DATA_INDEX_SPBEGIN; idx < ItemObjNew[targetId].length; idx += 2) {
			if (ItemObjNew[targetId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				return true;
			}
		}
		setIndexArray = ItemIdToSetIdMap[targetId];
	}

	// カード単品を判定
	else {
		for (idx = CARD_DATA_INDEX_SPBEGIN; idx < CardObjNew[targetId].length; idx += 2) {
			if (CardObjNew[targetId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				return true;
			}
		}
		setIndexArray = CardIdToSetIdMap[targetId];
	}

	// セットでの対象を判定
	if (setIndexArray) {

		for (idxSet = 0; idxSet < setIndexArray.length; idxSet++) {

			setIndex = setIndexArray[idxSet];

			setDataId = w_SE[setIndex][0];

			// セット定義のアイテムを判定
			if (setDataId >= 0) {
				for (idx = ITEM_DATA_INDEX_SPBEGIN; idx < ItemObjNew[setDataId].length; idx += 2) {
					if (ItemObjNew[setDataId][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
						return true;
					}
				}
			}

			// セット定義のカードを判定
			else {
				for (idx = CARD_DATA_INDEX_SPBEGIN; idx < CardObjNew[Math.abs(setDataId)].length; idx += 2) {
					if (CardObjNew[Math.abs(setDataId)][idx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
						return true;
					}
				}
			}
		}
	}

	return false;
}




/************************************************************************************************
 *
 * 左手武器の武器種別変更イベントハンドラ
 *
 *-----------------------------------------------------------------------------------------------
 * @param itemKind 武器種別
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function OnChangeArmsTypeLeft(itemKind){

	var idx = 0;

	var objSelectLeft = null;
	let objSelectLeftRefine = null;
	var objSelectLeftTranscendence = null;
	var objSelectLeftCardShort = null;
	var objSelectShiled = null;
	var objSelectShiledRefine = null;
	let objSelectShiledTranscendence = null;

	var objArrayToVisible = new Array();
	var objArrayToHidden = new Array();

	var objSpan = null;
	var objInput = null;



	// 武器種別の設定
	HtmlSetObjectValueById("OBJID_ARMS_TYPE_LEFT", itemKind);
	n_A_Weapon2Type = itemKind;

	// 対象セレクトボックスの取得
	objSelectLeft = document.getElementById("OBJID_ARMS_LEFT");
	objSelectLeftTranscendence = document.getElementById("OBJID_ARMS_LEFT_TRANSCENDENCE");
	objSelectLeftRefine = document.getElementById("OBJID_ARMS_LEFT_REFINE");
	objSelectLeftCardShort = document.getElementById("OBJID_ARMS_LEFT_CARD_SHORT");
	objSelectShiled = document.getElementById("OBJID_SHIELD");
	objSelectShiledRefine = document.getElementById("OBJID_SHIELD_REFINE");
	objSelectShiledTranscendence = document.getElementById("OBJID_SHIELD_TRANSCENDENCE");

	// 職業情報の更新
	InitJobInfo();

	// 左手装備、および、盾装備の、情報クリア
	ClearEquip(EQUIP_REGION_ID_ARMS_LEFT);
	ClearEquip(EQUIP_REGION_ID_SHIELD);



	// 装備欄の調整
	// 二刀流設定の場合
	if(itemKind != ITEM_KIND_NONE){

		// 盾のカード情報を全クリア
		ClearCardSlot(EQUIP_REGION_ID_SHIELD);

		// 左手武器欄を有効化する
		objArrayToVisible.push(objSelectLeft);
		objArrayToVisible.push(objSelectLeftRefine);
		objArrayToVisible.push(objSelectLeftCardShort);
		objArrayToVisible.push(objSelectLeftTranscendence);

		// 盾欄を無効化する
		HtmlSetObjectValueById("OBJID_SHIELD_REFINE", 0);
		objArrayToHidden.push(objSelectShiled);
		objArrayToHidden.push(objSelectShiledRefine);
		objArrayToHidden.push(objSelectShiledTranscendence);

		n_Nitou = true;
	}

	// 二刀流解除の場合
	else {

		// 左手武器のカード情報を全クリア
		ClearCardSlot(EQUIP_REGION_ID_ARMS_LEFT);

		// 左手武器欄を無効化する
		HtmlSetObjectValueById("OBJID_ARMS_LEFT_TRANSCENDENCE", 0);
		HtmlSetObjectValueById("OBJID_ARMS_LEFT_REFINE", 0);
		HtmlSetObjectValueById("OBJID_ARMS_LEFT_CARD_SHORT", 0);
		objArrayToHidden.push(objSelectLeft);
		objArrayToHidden.push(objSelectLeftTranscendence);
		objArrayToHidden.push(objSelectLeftRefine);
		objArrayToHidden.push(objSelectLeftCardShort);

		// 盾欄を有効化する
		objArrayToVisible.push(objSelectShiled);
		objArrayToVisible.push(objSelectShiledRefine);
		objArrayToVisible.push(objSelectShiledTranscendence);

		n_Nitou = false;
	}

	for (idx = 0; idx < objArrayToVisible.length; idx++) {
		if (!objArrayToVisible[idx]) {
			continue;
		}
		objArrayToVisible[idx].removeAttribute("disabled");
		objArrayToVisible[idx].setAttribute("style", "visibility : visible");
	}

	for (idx = 0; idx < objArrayToHidden.length; idx++) {
		if (!objArrayToHidden[idx]) {
			continue;
		}
		objArrayToHidden[idx].setAttribute("disabled", "disabled");
		objArrayToHidden[idx].setAttribute("style", "visibility : hidden");
	}



	// 左右武器入れ替えボタンを削除
	objSpan = document.getElementById("OBJID_SPAN_SWAP_ARMS");
	HtmlRemoveAllChild(objSpan);

	// 二刀流の場合は、左右武器入れ替えボタンを追加
	if (n_Nitou) {
		objInput = HtmlCreateElement("input", objSpan);
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "左右武器入れ替え");
		objInput.setAttribute("onclick", "OnClickSwapArms()");
	}

	// 左手武器選択欄の再構築
	RebuildArmsLeftSelect();
	OnChangeEquip(EQUIP_REGION_ID_ARMS_LEFT, HtmlGetObjectValueById("OBJID_ARMS_LEFT", ITEM_ID_SUDE));

	// 左手武器、および盾のカード欄を再構築
	RebuildCardSelect(EQUIP_REGION_ID_ARMS_LEFT, n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]);
	RebuildCardSelect(EQUIP_REGION_ID_SHIELD, n_A_Equip[EQUIP_REGION_ID_SHIELD]);

	// ステートフルデータも更新する
	SetStatefullData("DATA_OBJID_ARMS_LEFT", n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]);

	// 使用可否の更新
	if (GetSlotMode() == SLOTPAGER_MODE_CARD) {
		SetCardSlotEnability(EQUIP_REGION_ID_ARMS_LEFT);
		SetCardSlotEnability(EQUIP_REGION_ID_SHIELD);
	}
	else {
		SetRndOptEnablityAll();
		// SetEnchSlotsEnablity();
	}
}



/************************************************************************************************
 *
 * 左手装備欄の再構築
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildArmsLeftSelect() {

	var objLeft = null;
	var optName = "";
	var optValue = 0;

	//--------------------------------
	// 左手武器種別の取得
	//--------------------------------
	n_A_Weapon2Type = HtmlGetObjectValueById("OBJID_ARMS_TYPE_LEFT", 0);


	//--------------------------------
	// 左手武器選択欄の初期化
	//--------------------------------
	objLeft = HtmlGetElementById("OBJID_ARMS_LEFT");
	if (objLeft == null) {
		return;
	}
	HtmlRemoveOptionAll(objLeft);

	// 二刀流でない場合は、装備なしのみ
	if (!n_Nitou) {
		optName = ItemObjNew[ITEM_ID_SUDE][ITEM_DATA_INDEX_NAME];
		optValue = ITEM_ID_SUDE;
		objLeft.options[0] = new Option(optName, optValue);

		return;
	}


	//--------------------------------
	// 装備可能なアイテムの抽出
	//--------------------------------
	var itemId = 0;
	var equipableItemArray = new Array();

	for (itemId = 0; itemId < ItemObjNew.length; itemId++) {

		// 武器種別が違う場合は次へ進む
		if (ItemObjNew[itemId][ITEM_DATA_INDEX_KIND] != n_A_Weapon2Type) {
			continue;
		}

		// 装備不可能な場合は次へ進む
		if (IsMatchJobRestrict(itemId, n_A_JOB) != true) {
			continue;
		}

		// 装備可能配列へアイテムＩＤを追加
		equipableItemArray[equipableItemArray.length] = itemId;
	}

	// 読み仮名ソート実行
	equipableItemArray.sort(
		function(a, b) {
			if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] < ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return -1;
			if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] > ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return 1;
			return 0;
		}
	);

	//--------------------------------
	// 選択欄の再構築
	//--------------------------------
	var idx = 0;
	var itemData = null;

	for (idx = 0; idx < equipableItemArray.length; idx++) {

		// アイテムデータの取得
		itemData = ItemObjNew[equipableItemArray[idx]];

		// 選択項目の追加
		objLeft.options[objLeft.options.length] =
			new Option(GetFlagAppendedItemName(itemData[ITEM_DATA_INDEX_ID]), itemData[ITEM_DATA_INDEX_ID]);
	}
}



/************************************************************************************************
 *
 * 精錬値変更イベントハンドラ.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
function OnChangeRefined() {

	// ステータス全計算
	StAllCalc();

	// 攻撃手段の更新
	CAttackMethodAreaComponentManager.RebuildControls();

}



/************************************************************************************************
 *
 * 装備変更イベントハンドラ.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 装備領域ＩＤ
 * @param itemId 変更後のアイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
function OnChangeEquip(eqpRgnId, itemId) {

	// エンチャント設定のクリア
	ClearEnchantOnChangeEquip(eqpRgnId, itemId);

	// スロット欄の更新
	if (GetSlotMode() == SLOTPAGER_MODE_CARD) {

		// 選択セレクトボックスの再構築
		RebuildCardSelect(eqpRgnId, itemId);

		// 使用可否の設定
		SetCardSlotEnability(eqpRgnId);
	}
	else {

		// 選択セレクトボックスの再構築
		RebuildRndOptSelect(eqpRgnId, itemId);
		// RebuildRndEnchSelect(eqpRgnId, itemId);

		// 使用可否の設定
		SetRndOptEnablityAll();
		// SetEnchSlotsEnablity();
	}

	// ステートフルデータの更新
	UpdateStatefullDataOnChangeEquip(eqpRgnId);

	// ステータス全計算
	StAllCalc();

	// アイテムデータ表示の更新
	CItemInfoManager.OnChangeEquip(CONST_DATA_KIND_ITEM, itemId);

	// 習得スキル欄の注意書きの更新
	UpdateLearnedSkillNotice();

	// 習得スキル設定欄の強調表示更新
	UpdateLearnedSkillSettingColoring();

	// 攻撃手段の更新
	CAttackMethodAreaComponentManager.RebuildControls();

}

/************************************************************************************************
 *
 * 装備変更に伴うエンチャント設定のクリア.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 装備領域ＩＤ
 * @param itemId 変更後のアイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 ************************************************************************************************/
function ClearEnchantOnChangeEquip(eqpRgnId, itemId) {

	var targetidx = 0;
	var slotidx = 0;
	var cardRgnId = 0;
	var itemIdTarget = 0;

	var itemIdArrayToClear = new Array();
	var cardRegionIdArrayToClear = new Array();

	// エンチャント設定のクリア
	// （カードの設定は維持するが、エンチャントの種類は装備に依存するので、装備変更と同時にクリアする）

	// 検査対象アイテムＩＤ配列に、変更前、変更後、それぞれのアイテムＩＤを追加
	itemIdArrayToClear.push(n_A_Equip[eqpRgnId]);
	itemIdArrayToClear.push(itemId);

	// さらに、クリア対象となるカードデータの配列添字を、添字配列に追加
	switch (eqpRgnId) {

	case EQUIP_REGION_ID_ARMS:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_3);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_RIGHT_4);
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_3);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ARMS_LEFT_4);
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_HEAD_TOP);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_TOP_3);
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_HEAD_MID);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_MID_3);
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_HEAD_UNDER_3);
		break;

	case EQUIP_REGION_ID_SHIELD:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_SHIELD);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHIELD_3);
		break;

	case EQUIP_REGION_ID_BODY:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_BODY);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_BODY_3);
		break;

	case EQUIP_REGION_ID_SHOULDER:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_SHOULDER);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOULDER_3);
		break;

	case EQUIP_REGION_ID_SHOES:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_SHOES);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_SHOES_3);
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ACCESSARY_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_1_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_1_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_1_3);
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ACCESSARY_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_2_1);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_2_2);
		cardRegionIdArrayToClear.push(CARD_REGION_ID_ENCHANT_ACCESSARY_2_3);
		break;
	}

	// アイテムの定義を検査して、設定をクリアする
	for (targetidx = 0; targetidx < itemIdArrayToClear.length; targetidx++) {

		// 配列からアイテムＩＤを取り出す
		itemIdTarget = itemIdArrayToClear[targetidx];

		// （無いとは思うが）有効でないＩＤの場合は、次へ
		if (ItemObjNew[itemIdTarget] == undefined) {
			continue;
		}

		// 当該スロットがエンチャント用の場合、設定状況をクリアする
		for (slotidx = 0; slotidx < cardRegionIdArrayToClear.length; slotidx++) {

			// 武器以外は、第二スロット以降なら強制クリアでよい
			switch (eqpRgnId) {
			case EQUIP_REGION_ID_ARMS:
			case EQUIP_REGION_ID_ARMS_LEFT:
				break;
			default:
				if (slotidx >= 1) {
					n_A_card[cardRgnId] = CARD_ID_NONE;
				}
				continue;
			}

			// それ以外の場合は、現在設定されている値がエンチャントの場合、クリアする

			// カード領域ＩＤを配列から取り出す
			cardRgnId = cardRegionIdArrayToClear[slotidx];

			// 設定状況をクリア
			if (CardObjNew[n_A_card[cardRgnId]][CARD_DATA_INDEX_KIND] == CARD_KIND_ENCHANT) {
				n_A_card[cardRgnId] = CARD_ID_NONE;
			}
		}
	}
}



function UpdateStatefullDataOnChangeEquip(eqpRgnId) {

	var idx = 0;
	var strObjId = "";
	var valueOfObject = 0;

	var objIdKind = "";
	var objIdValue = "";

	var rndOptKind = 0;
	var rndOptValue = 0;

	var idxMinCard = 1;
	var idxMaxCard = 4;

	switch (eqpRgnId) {

	case EQUIP_REGION_ID_ARMS:
		strObjId = "OBJID_ARMS_RIGHT";
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		strObjId = "OBJID_ARMS_LEFT";
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		strObjId = "OBJID_HEAD_TOP";
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		strObjId = "OBJID_HEAD_MID";
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		strObjId = "OBJID_HEAD_UNDER";
		break;

	case EQUIP_REGION_ID_SHIELD:
		strObjId = "OBJID_SHIELD";
		break;

	case EQUIP_REGION_ID_BODY:
		strObjId = "OBJID_BODY";
		break;

	case EQUIP_REGION_ID_SHOULDER:
		strObjId = "OBJID_SHOULDER";
		break;

	case EQUIP_REGION_ID_SHOES:
		strObjId = "OBJID_SHOES";
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		strObjId = "OBJID_ACCESSARY_1";
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		strObjId = "OBJID_ACCESSARY_2";
		break;
	}

	// 装備品本体
	valueOfObject = HtmlGetObjectValueById(strObjId);
	SetStatefullData("DATA_" + strObjId, valueOfObject);

	// カード・一般エンチャント
	for (idx = idxMinCard; idx <= idxMaxCard; idx++) {
		valueOfObject = HtmlGetObjectValueById(strObjId + "_CARD_" + idx, 0);
		SetStatefullData("DATA_" + strObjId + "_CARD_" + idx, valueOfObject);
	}

	// ランダムオプション
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		// ランダムオプション種別
		objIdKind = GetObjectIdRndOptKind(eqpRgnId, idx)
		rndOptKind = HtmlGetObjectValueByIdAsInteger(objIdKind, 0);

		// ランダムオプション値
		objIdValue = GetObjectIdRndOptValue(eqpRgnId, idx)
		rndOptValue = HtmlGetObjectValueByIdAsInteger(objIdValue, 0);

		SetEquipRndOptTable(eqpRgnId, idx, rndOptKind, rndOptValue);
	}
}


/**
 * 一部の装備の特殊効果を発動させられる習得スキルを保持している場合に
 * 習得スキル一覧のタイトルバーに注記を表示する 
 */
function UpdateLearnedSkillNotice () {
	let itemId = 0;
	let spidx = 0;
	let skillId = 0;
	let bEquipped = false;
	let objSpan = null;
	const learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
	// 全ての装備を走査し、習得スキル設定対象がないかをチェック
	for (let idx = 0; idx < n_A_Equip.length; idx++) {
		itemId = n_A_Equip[idx];
		spidx = ITEM_DATA_INDEX_SPBEGIN;
		while (ItemObjNew[itemId][spidx] != ITEM_SP_END) {
			if (ItemObjNew[itemId][spidx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
				// さらに、該当スキルが、習得スキル設定の一覧にあるかを検査
				for (let idxSkill = 0; idxSkill < learnSkillIdArray.length; idxSkill++) {
					skillId = learnSkillIdArray[idxSkill];
					if (ItemObjNew[itemId][spidx + 1] == skillId) {
						bEquipped = true;
						break;
					}
				}
			}
			if (bEquipped) {
				break;
			}
			spidx += 2;
		}
		if (bEquipped) {
			break;
		}
	}
	// 全てのカードを走査し、習得スキル設定対象がないかをチェック
	if (!bEquipped) {
		for (let idx = 0; idx < n_A_card.length; idx++) {
			cardId = n_A_card[idx];
			spidx = CARD_DATA_INDEX_SPBEGIN;
			while (CardObjNew[cardId][spidx] != ITEM_SP_END) {
				if (CardObjNew[cardId][spidx] == ITEM_SP_LEARNED_SKILL_EFFECT) {
					// さらに、該当スキルが、習得スキル設定の一覧にあるかを検査
					for (let idxSkill = 0; idxSkill < learnSkillIdArray.length; idxSkill++) {
						skillId = learnSkillIdArray[idxSkill];
						if (CardObjNew[cardId][spidx + 1] == skillId) {
							bEquipped = true;
							break;
						}
					}
				}
				if (bEquipped) {
					break;
				}
				spidx += 2;
			}
			if (bEquipped) {
				break;
			}
		}
	}
	// 走査結果を検証し、テキストを調整
	objSpan = document.getElementById("ID_SKILL_LEARNED_NOTICE");
	HtmlRemoveAllChild(objSpan);
	if (bEquipped) {
		HtmlCreateTextNode("習得スキル設定対象あり", objSpan);
	}
}



/**
 * 左右武器入れ替えイベントハンドラ.
 */
function OnClickSwapArms() {

	var idx = 0;

	var armsTypeRight = 0;
	var itemIdRight = 0;
	var refinedRight = 0;
	let transcendenceRight = 0;
	var cardIdArrayRight = null;
	var rndoptDataArrayRight = null;

	var armsTypeLeft = 0;
	var itemIdLeft = 0;
	var refinedLeft = 0;
	let transcendenceLeft = 0;
	var cardIdArrayLeft = null;
	var rndoptDataArrayLeft = null;

	var slotPageModeOld = 0;
	var objIdKind = "";
	var objIdValue = "";
	var objValue = null;

	// 現在の情報を取得

	// 右手武器
	armsTypeRight = n_A_WeaponType;
	itemIdRight = n_A_Equip[EQUIP_REGION_ID_ARMS];
	refinedRight = n_A_Weapon_ATKplus;
	transcendenceRight = n_A_Weapon_Transcendence;
	cardIdArrayRight = [
		n_A_card[CARD_REGION_ID_ARMS_RIGHT_1],
		n_A_card[CARD_REGION_ID_ARMS_RIGHT_2],
		n_A_card[CARD_REGION_ID_ARMS_RIGHT_3],
		n_A_card[CARD_REGION_ID_ARMS_RIGHT_4],
	];
	rndoptDataArrayRight = [];
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {
		rndoptDataArrayRight.push(
			[
				GetEquipRndOptTableKind(EQUIP_REGION_ID_ARMS, idx),
				GetEquipRndOptTableValue(EQUIP_REGION_ID_ARMS, idx),
			]
		);
	}

	// 左手武器
	armsTypeLeft = n_A_Weapon2Type;
	itemIdLeft = n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT];
	refinedLeft = n_A_Weapon2_ATKplus;
	transcendenceLeft = n_A_Weapon2_Transcendence;
	cardIdArrayLeft = [
		n_A_card[CARD_REGION_ID_ARMS_LEFT_1],
		n_A_card[CARD_REGION_ID_ARMS_LEFT_2],
		n_A_card[CARD_REGION_ID_ARMS_LEFT_3],
		n_A_card[CARD_REGION_ID_ARMS_LEFT_4],
	];
	rndoptDataArrayLeft = [];
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {
		rndoptDataArrayLeft.push(
			[
				GetEquipRndOptTableKind(EQUIP_REGION_ID_ARMS_LEFT, idx),
				GetEquipRndOptTableValue(EQUIP_REGION_ID_ARMS_LEFT, idx),
			]
		);
	}

	// ランダムエンチャント画面の場合は、カード画面にする
	slotPageModeOld = GetSlotMode();
	if (slotPageModeOld == SLOTPAGER_MODE_RNDENCH) {
		OnClickSlotModeButton();
	}

	// アイテムの入れ替え
	OnChangeArmsTypeRight(armsTypeLeft);
	HtmlSetObjectValueById("OBJID_ARMS_RIGHT", itemIdLeft);
	OnChangeEquip(EQUIP_REGION_ID_ARMS, itemIdLeft);

	OnChangeArmsTypeLeft(armsTypeRight);
	HtmlSetObjectValueById("OBJID_ARMS_LEFT", itemIdRight);
	OnChangeEquip(EQUIP_REGION_ID_ARMS_LEFT, itemIdRight);

	// 精錬値の入れ替え
	HtmlSetObjectValueById("OBJID_ARMS_RIGHT_REFINE", refinedLeft);
	HtmlSetObjectValueById("OBJID_ARMS_LEFT_REFINE", refinedRight);

	// 超越段階の入れ替え
	HtmlSetObjectValueById("OBJID_ARMS_RIGHT_TRANSCENDENCE", transcendenceLeft);
	HtmlSetObjectValueById("OBJID_ARMS_LEFT_TRANSCENDENCE", transcendenceRight);
	
	// カードの入れ替え
	for (idx = 0; idx < cardIdArrayRight.length; idx++) {
		HtmlSetObjectValueById("OBJID_ARMS_RIGHT_CARD_" + (idx + 1), cardIdArrayLeft[idx]);
		HtmlSetObjectValueById("OBJID_ARMS_LEFT_CARD_" + (idx + 1), cardIdArrayRight[idx]);
	}
	SaveSlotStateCard(EQUIP_REGION_ID_ARMS);
	SaveSlotStateCard(EQUIP_REGION_ID_ARMS_LEFT);

	// ランダムエンチャントの入れ替え
	OnClickSlotModeButton();
	for (idx = 0; idx < RND_OPT_SLOT_COUNT; idx++) {

		objIdKind = GetObjectIdRndOptKind(EQUIP_REGION_ID_ARMS, idx);
		objIdValue = GetObjectIdRndOptValue(EQUIP_REGION_ID_ARMS, idx);
		objValue = document.getElementById(objIdValue);

		HtmlSetObjectValueById(objIdKind, rndoptDataArrayLeft[idx][0]);
		SetUpRndOptValue(objValue, rndoptDataArrayLeft[idx][0]);
		HtmlSetObjectValueById(objIdValue, rndoptDataArrayLeft[idx][1]);

		objIdKind = GetObjectIdRndOptKind(EQUIP_REGION_ID_ARMS_LEFT, idx);
		objIdValue = GetObjectIdRndOptValue(EQUIP_REGION_ID_ARMS_LEFT, idx);
		objValue = document.getElementById(objIdValue);

		HtmlSetObjectValueById(objIdKind, rndoptDataArrayRight[idx][0]);
		SetUpRndOptValue(objValue, rndoptDataArrayRight[idx][0]);
		HtmlSetObjectValueById(objIdValue, rndoptDataArrayRight[idx][1]);
	}
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ARMS);
	SaveSlotStateRndEnch(EQUIP_REGION_ID_ARMS_LEFT);

	// 入力画面を戻す
	if (slotPageModeOld != GetSlotMode()) {
		OnClickSlotModeButton();
	}

	// 再計算
	calc();

	// 検索可能リスト更新
	LoadSelect2();
}



/**
 * カード変更イベントハンドラ.
 */
function OnChangeCard(cardId) {

	SaveSlotStateCardAll();

	StAllCalc();

	if (cardId >= 0) {
		CItemInfoManager.OnChangeEquip(CONST_DATA_KIND_CARD, cardId);
	}

	// 習得スキル欄の注意書きの更新
	UpdateLearnedSkillNotice();

	// 習得スキル設定欄の強調表示更新
	UpdateLearnedSkillSettingColoring();

	// 攻撃手段の更新
	CAttackMethodAreaComponentManager.RebuildControls();
}





/**
 * 衣装変更イベントハンドラ.
 */
function OnChangeCostume(costumeId) {
	SaveSlotStateCostumeAll();
	StAllCalc();
	CItemInfoManager.OnChangeEquip(CONST_DATA_KIND_COSTUME, costumeId);
 }





/**
 * ランダムエンチャント変更イベントハンドラ.
 */
function OnChangeRandomEnchant() {
	SaveSlotStateRndEnchAll();
	StAllCalc();
}







function sort(work) {
	for(var i=1;work[i]!="EOF";i++){
		for(var k=i;k>0;k--){
			if(ItemObjNew[work[k-1]][ITEM_DATA_INDEX_KANA] > ItemObjNew[work[k]][ITEM_DATA_INDEX_KANA]){
				var work_backup = work[k-1];
				work[k-1] = work[k];
				work[k] = work_backup;
			}
		}
	}
	return work;
}





/************************************************************************************************
 *
 * 防具欄の再構築
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function RebuildArmorsSelect() {

	var idx = 0;
	var idxItem = 0;

	var itemData = null;
	var itemId = 0;
	var itemKind = 0;
	var itemName = "";

	var itemIdArrayEquipable = new Array();

	var objSelectArray = new Array();



	// アイテム ID 抽出用配列を初期化
	for (idx = EQUIP_REGION_ID_HEAD_TOP; idx <= EQUIP_REGION_ID_ACCESSARY_2; idx++) {
		itemIdArrayEquipable[idx] = new Array();
	}


	// セレクトボックスを特定
	objSelectArray[EQUIP_REGION_ID_HEAD_TOP] = document.getElementById("OBJID_HEAD_TOP");
	objSelectArray[EQUIP_REGION_ID_HEAD_MID] = document.getElementById("OBJID_HEAD_MID");
	objSelectArray[EQUIP_REGION_ID_HEAD_UNDER] = document.getElementById("OBJID_HEAD_UNDER");
	objSelectArray[EQUIP_REGION_ID_SHIELD] = document.getElementById("OBJID_SHIELD");
	objSelectArray[EQUIP_REGION_ID_BODY] = document.getElementById("OBJID_BODY");
	objSelectArray[EQUIP_REGION_ID_SHOULDER] = document.getElementById("OBJID_SHOULDER");
	objSelectArray[EQUIP_REGION_ID_SHOES] = document.getElementById("OBJID_SHOES");
	objSelectArray[EQUIP_REGION_ID_ACCESSARY_1] = document.getElementById("OBJID_ACCESSARY_1");
	objSelectArray[EQUIP_REGION_ID_ACCESSARY_2] = document.getElementById("OBJID_ACCESSARY_2");


	// セレクトボックスの要素を全削除
	for (idx = EQUIP_REGION_ID_HEAD_TOP; idx <= EQUIP_REGION_ID_ACCESSARY_2; idx++) {
		HtmlRemoveOptionAll(objSelectArray[idx]);
	}


	// 全アイテムを走査して、リストアップ
	for (idx = 0; idx < ItemObjNew.length; idx++) {

		// アイテムデータを取得
		itemData = ItemObjNew[idx];
		itemId = itemData[ITEM_DATA_INDEX_ID];
		itemKind = itemData[ITEM_DATA_INDEX_KIND];

		// 装備可能判定

		// スパノビの魂状態の場合は、頭装備の制限が解除される
		if (g_bSuperNoviceFullWeapon) {

			// 頭装備の場合は、この時点で装備可能
			switch (itemKind) {
			case ITEM_KIND_HEAD_TOP:
			case ITEM_KIND_HEAD_MID:
			case ITEM_KIND_HEAD_UNDER:
				break;

			// 頭装備以外の場合は、装備制限適合判定を行う
			default:
				if (!IsMatchJobRestrict(itemId, n_A_JOB)) {
					// 適合しなかった場合は、次へ
					continue;
				}
				break;
			}
		}

		// スパノビの魂状態でなければ、装備制限適合判定を行う
		else {
			if (!IsMatchJobRestrict(itemId, n_A_JOB)) {
				// 適合しなかった場合は、次へ
				continue;
			}
		}

		// ここまでくれば、装備可能

		// アイテムＩＤ配列へ追加
		switch (itemKind) {

		case ITEM_KIND_HEAD_TOP:
			itemIdArrayEquipable[EQUIP_REGION_ID_HEAD_TOP].push(itemId);
			break;

		case ITEM_KIND_HEAD_MID:
			itemIdArrayEquipable[EQUIP_REGION_ID_HEAD_MID].push(itemId);
			break;

		case ITEM_KIND_HEAD_UNDER:
			itemIdArrayEquipable[EQUIP_REGION_ID_HEAD_UNDER].push(itemId);
			break;

		case ITEM_KIND_SHIELD:
			itemIdArrayEquipable[EQUIP_REGION_ID_SHIELD].push(itemId);
			break;

		case ITEM_KIND_BODY:
			itemIdArrayEquipable[EQUIP_REGION_ID_BODY].push(itemId);
			break;

		case ITEM_KIND_SHOULDER:
			itemIdArrayEquipable[EQUIP_REGION_ID_SHOULDER].push(itemId);
			break;

		case ITEM_KIND_FOOT:
			itemIdArrayEquipable[EQUIP_REGION_ID_SHOES].push(itemId);
			break;

		case ITEM_KIND_ACCESSARY:
			itemIdArrayEquipable[EQUIP_REGION_ID_ACCESSARY_1].push(itemId);
			itemIdArrayEquipable[EQUIP_REGION_ID_ACCESSARY_2].push(itemId);
			break;

		case ITEM_KIND_ACCESSARY_ON1:
			itemIdArrayEquipable[EQUIP_REGION_ID_ACCESSARY_1].push(itemId);
			break;

		case ITEM_KIND_ACCESSARY_ON2:
			itemIdArrayEquipable[EQUIP_REGION_ID_ACCESSARY_2].push(itemId);
			break;
		}
	}


	// 抽出したリストを読み仮名ソート実行
	for (idx = EQUIP_REGION_ID_HEAD_TOP; idx <= EQUIP_REGION_ID_ACCESSARY_2; idx++) {
		itemIdArrayEquipable[idx].sort(
			function(a, b) {
				if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] < ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return -1;
				if (ItemObjNew[a][ITEM_DATA_INDEX_KANA] > ItemObjNew[b][ITEM_DATA_INDEX_KANA]) return 1;
				return 0;
			}
		);
	}


	// セレクトボックスにアイテムを追加
	for (idx = EQUIP_REGION_ID_HEAD_TOP; idx <= EQUIP_REGION_ID_ACCESSARY_2; idx++) {

		for (idxItem = 0; idxItem < itemIdArrayEquipable[idx].length; idxItem++) {

			// データ取得
			itemId = itemIdArrayEquipable[idx][idxItem];
			itemName = GetFlagAppendedItemName(itemId);

			// 要素生成
			HtmlCreateElementOption(itemId, itemName, objSelectArray[idx]);
		}
	}
}




/**
 * もう使われていない可能性がある
 * @returns 
 */
function WeaponSet2(){
	with(document.calcForm){
		InitJobInfo();

		HtmlRemoveOptionAll(A_head1);
		HtmlRemoveOptionAll(A_head2);
		HtmlRemoveOptionAll(A_head3);
		HtmlRemoveOptionAll(A_left);
		HtmlRemoveOptionAll(A_body);
		HtmlRemoveOptionAll(A_shoulder);
		HtmlRemoveOptionAll(A_shoes);
		HtmlRemoveOptionAll(A_acces1);
		HtmlRemoveOptionAll(A_acces2);


		if(first_check == 0){
			first_check = 1;
			A_head1.options[0] = new Option(ItemObjNew[142][ITEM_DATA_INDEX_NAME],ItemObjNew[142][ITEM_DATA_INDEX_ID]);
			A_head2.options[0] = new Option(ItemObjNew[243][ITEM_DATA_INDEX_NAME],ItemObjNew[243][ITEM_DATA_INDEX_ID]);
			A_head3.options[0] = new Option(ItemObjNew[268][ITEM_DATA_INDEX_NAME],ItemObjNew[268][ITEM_DATA_INDEX_ID]);
			A_left.options[0] = new Option(ItemObjNew[305][ITEM_DATA_INDEX_NAME],ItemObjNew[305][ITEM_DATA_INDEX_ID]);
			A_body.options[0] = new Option(ItemObjNew[279][ITEM_DATA_INDEX_NAME],ItemObjNew[279][ITEM_DATA_INDEX_ID]);
			A_shoulder.options[0] = new Option(ItemObjNew[311][ITEM_DATA_INDEX_NAME],ItemObjNew[311][ITEM_DATA_INDEX_ID]);
			A_shoes.options[0] = new Option(ItemObjNew[317][ITEM_DATA_INDEX_NAME],ItemObjNew[317][ITEM_DATA_INDEX_ID]);
			A_acces1.options[0] = new Option(ItemObjNew[326][ITEM_DATA_INDEX_NAME],ItemObjNew[326][ITEM_DATA_INDEX_ID]);
			A_acces2.options[0] = new Option(ItemObjNew[326][ITEM_DATA_INDEX_NAME],ItemObjNew[326][ITEM_DATA_INDEX_ID]);
			return;
		}
		first_check = 2;
		var workB = new Array();
		for(i=0;i<=8;i++) workB[i] = new Array();
		var wsj = new Array();
		for(i=0;i<=8;i++) wsj[i]=0;
		for(i=0;i<ItemObjNew.length;
		i++){
			if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 50 && (IsMatchJobRestrict(i, n_A_JOB) == true || g_bSuperNoviceFullWeapon)){
				workB[0][wsj[0]] = i;
				wsj[0]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 51 && (IsMatchJobRestrict(i, n_A_JOB) == true || g_bSuperNoviceFullWeapon)){
				workB[1][wsj[1]] = i;
				wsj[1]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 52 && (IsMatchJobRestrict(i, n_A_JOB) == true || g_bSuperNoviceFullWeapon)){
				workB[2][wsj[2]] = i;
				wsj[2]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 61 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[3][wsj[3]] = i;
				wsj[3]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 60 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[4][wsj[4]] = i;
				wsj[4]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 62 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[5][wsj[5]] = i;
				wsj[5]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 63 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[6][wsj[6]] = i;
				wsj[6]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 64 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[7][wsj[7]] = i;
				wsj[7]++;
				workB[8][wsj[8]] = i;
				wsj[8]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 65 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[7][wsj[7]] = i;
				wsj[7]++;
			}
			else if(ItemObjNew[i][ITEM_DATA_INDEX_KIND] == 66 && IsMatchJobRestrict(i, n_A_JOB) == true){
				workB[8][wsj[8]] = i;
				wsj[8]++;
			}
		}
		for(i=0;i<=8;i++) workB[i][wsj[i]] = "EOF";
		for(var m=0;m<=8;m++) workB[m] = sort(workB[m]);
		var z = 0;
		var itemId = 0;
		var itemName = "";

		for(i=0;i<wsj[0];i++){
			z = workB[0][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_head1);
		}

		for(i=0;i<wsj[1];i++){
			z = workB[1][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_head2);
		}

		for(i=0;i<wsj[2];i++){
			z = workB[2][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_head3);
		}

		for(i=0;i<wsj[3];i++){
			z = workB[3][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_left);
		}

		for(i=0;i<wsj[4];i++){
			z = workB[4][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_body);
		}

		for(i=0;i<wsj[5];i++){
			z = workB[5][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_shoulder);
		}

		for(i=0;i<wsj[6];i++){
			z = workB[6][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_shoes);
		}

		for(i=0;i<wsj[7];i++){
			z = workB[7][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_acces1);
		}

		for(i=0;i<wsj[8];i++){
			z = workB[8][i];
			itemId = ItemObjNew[z][ITEM_DATA_INDEX_ID];
			itemName = GetFlagAppendedItemName(z);
			HtmlCreateElementOption(itemId, itemName, A_acces2);
		}
	}
}





/************************************************************************************************
 *
 * 装備欄をデフォルトセットアップする（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function InitEquipDefaultAll() {

	// 個別関数を全コール
	InitEquipDefault(EQUIP_REGION_ID_ARMS);
	InitEquipDefault(EQUIP_REGION_ID_ARMS_LEFT);
	InitEquipDefault(EQUIP_REGION_ID_HEAD_TOP);
	InitEquipDefault(EQUIP_REGION_ID_HEAD_MID);
	InitEquipDefault(EQUIP_REGION_ID_HEAD_UNDER);
	InitEquipDefault(EQUIP_REGION_ID_SHIELD);
	InitEquipDefault(EQUIP_REGION_ID_BODY);
	InitEquipDefault(EQUIP_REGION_ID_SHOULDER);
	InitEquipDefault(EQUIP_REGION_ID_SHOES);
	InitEquipDefault(EQUIP_REGION_ID_ACCESSARY_1);
	InitEquipDefault(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * 装備欄をデフォルトセットアップする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function InitEquipDefault(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__InitEquipDefault("OBJID_ARMS_RIGHT", ITEM_ID_SUDE);
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__InitEquipDefault("OBJID_ARMS_LEFT", ITEM_ID_SUDE);
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__InitEquipDefault("OBJID_HEAD_TOP", ITEM_ID_NOEQUIP_HEAD_TOP);
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__InitEquipDefault("OBJID_HEAD_MID", ITEM_ID_NOEQUIP_HEAD_MID);
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__InitEquipDefault("OBJID_HEAD_UNDER", ITEM_ID_NOEQUIP_HEAD_UNDER);
		break;

	case EQUIP_REGION_ID_SHIELD:
		__InitEquipDefault("OBJID_SHIELD", ITEM_ID_NOEQUIP_SHIELD);
		break;

	case EQUIP_REGION_ID_BODY:
		__InitEquipDefault("OBJID_BODY", ITEM_ID_NOEQUIP_BODY);
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__InitEquipDefault("OBJID_SHOULDER", ITEM_ID_NOEQUIP_SHOULDER);
		break;

	case EQUIP_REGION_ID_SHOES:
		__InitEquipDefault("OBJID_SHOES", ITEM_ID_NOEQUIP_SHOES);
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__InitEquipDefault("OBJID_ACCESSARY_1", ITEM_ID_NOEQUIP_ACCESSARY);
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__InitEquipDefault("OBJID_ACCESSARY_2", ITEM_ID_NOEQUIP_ACCESSARY);
		break;
	}
}

/************************************************************************************************
 *
 * 装備欄をデフォルトセットアップする（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param objidPrifix オブジェクトＩＤのプリフィックス
 * @param アイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __InitEquipDefault(objidPrifix, itemId) {

	var objSelect = null;

	objSelect = HtmlGetElementById(objidPrifix);

	HtmlRemoveOptionAll(objSelect);
	HtmlCreateElementOption(itemId, ItemObjNew[itemId][ITEM_DATA_INDEX_NAME], objSelect);
	HtmlSetObjectValueById(itemId);
}





/************************************************************************************************
 *
 * 装備の選択状態をクリアする（すべて）.
 *
 *-----------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearEquipAll() {

	// 個別関数を全コール
	ClearEquip(EQUIP_REGION_ID_ARMS);
	ClearEquip(EQUIP_REGION_ID_ARMS_LEFT);
	ClearEquip(EQUIP_REGION_ID_HEAD_TOP);
	ClearEquip(EQUIP_REGION_ID_HEAD_MID);
	ClearEquip(EQUIP_REGION_ID_HEAD_UNDER);
	ClearEquip(EQUIP_REGION_ID_SHIELD);
	ClearEquip(EQUIP_REGION_ID_BODY);
	ClearEquip(EQUIP_REGION_ID_SHOULDER);
	ClearEquip(EQUIP_REGION_ID_SHOES);
	ClearEquip(EQUIP_REGION_ID_ACCESSARY_1);
	ClearEquip(EQUIP_REGION_ID_ACCESSARY_2);
}

/************************************************************************************************
 *
 * 装備の選択状態をクリアする.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function ClearEquip(eqpRgnId) {

	// サブ関数をコール
	switch (eqpRgnId) {
	case EQUIP_REGION_ID_ARMS:
		__ClearEquip(eqpRgnId, "OBJID_ARMS_RIGHT", ITEM_ID_SUDE);
		break;

	case EQUIP_REGION_ID_ARMS_LEFT:
		__ClearEquip(eqpRgnId, "OBJID_ARMS_LEFT", ITEM_ID_SUDE);
		break;

	case EQUIP_REGION_ID_HEAD_TOP:
		__ClearEquip(eqpRgnId, "OBJID_HEAD_TOP", ITEM_ID_NOEQUIP_HEAD_TOP);
		break;

	case EQUIP_REGION_ID_HEAD_MID:
		__ClearEquip(eqpRgnId, "OBJID_HEAD_MID", ITEM_ID_NOEQUIP_HEAD_MID);
		break;

	case EQUIP_REGION_ID_HEAD_UNDER:
		__ClearEquip(eqpRgnId, "OBJID_HEAD_UNDER", ITEM_ID_NOEQUIP_HEAD_UNDER);
		break;

	case EQUIP_REGION_ID_SHIELD:
		__ClearEquip(eqpRgnId, "OBJID_SHIELD", ITEM_ID_NOEQUIP_SHIELD);
		break;

	case EQUIP_REGION_ID_BODY:
		__ClearEquip(eqpRgnId, "OBJID_BODY", ITEM_ID_NOEQUIP_BODY);
		break;

	case EQUIP_REGION_ID_SHOULDER:
		__ClearEquip(eqpRgnId, "OBJID_SHOULDER", ITEM_ID_NOEQUIP_SHOULDER);
		break;

	case EQUIP_REGION_ID_SHOES:
		__ClearEquip(eqpRgnId, "OBJID_SHOES", ITEM_ID_NOEQUIP_SHOES);
		break;

	case EQUIP_REGION_ID_ACCESSARY_1:
		__ClearEquip(eqpRgnId, "OBJID_ACCESSARY_1", ITEM_ID_NOEQUIP_ACCESSARY);
		break;

	case EQUIP_REGION_ID_ACCESSARY_2:
		__ClearEquip(eqpRgnId, "OBJID_ACCESSARY_2", ITEM_ID_NOEQUIP_ACCESSARY);
		break;
	}
}

/************************************************************************************************
 *
 * 装備の選択状態をクリアする（サブ関数）.
 *
 *-----------------------------------------------------------------------------------------------
 * @param eqpRgnId 対象となる装備領域ＩＤ
 * @param objidPrifix オブジェクトＩＤのプリフィックス
 * @param itemId アイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return なし
 ************************************************************************************************/
function __ClearEquip(eqpRgnId, objidPrifix, itemId) {

	// エンチャント設定のクリア
	ClearEnchantOnChangeEquip(eqpRgnId, itemId);

	// 装備選択セレクトを更新
	HtmlSetObjectValueById(objidPrifix, itemId);

	// スロット欄の更新
	if (GetSlotMode() == SLOTPAGER_MODE_CARD) {

		// 選択セレクトボックスの再構築
		RebuildCardSelect(eqpRgnId, itemId);

		// 使用可否の設定
		SetCardSlotEnability(eqpRgnId);
	}
	else {

		// 選択セレクトボックスの再構築
		RebuildRndOptSelect(eqpRgnId, itemId);
		// RebuildRndEnchSelect(eqpRgnId, itemId);

		// 使用可否の設定
		SetRndOptEnablity(eqpRgnId);
		// SetEnchSlotsEnablity(eqpRgnId);
	}

	// ステートフルデータを更新
	UpdateStatefullDataOnChangeEquip(eqpRgnId);
}





/************************************************************************************************
 *
 * 指定の装備が遠距離攻撃かを判定する.
 *
 *-----------------------------------------------------------------------------------------------
 * @param itemId アイテムＩＤ
 *-----------------------------------------------------------------------------------------------
 * @return true:遠距離攻撃, false:遠距離でない
 ************************************************************************************************/
function IsLongRange(itemId) {

	var wpntype = 0;
	wpntype = ItemObjNew[itemId][ITEM_DATA_INDEX_KIND];

	// 武器の種類自体が遠距離攻撃のもの
	switch (wpntype) {
	case ITEM_KIND_BOW:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		return true;
	}

	// 個別の装備特性としての射程距離を取得
	var range = 0;

	// TODO: n_tok の参照に修正予定
	range = GetItemSP(itemId, ITEM_SP_SPECIAL_RANGE);

	// 射程距離４以上で遠距離攻撃
	if (range >= 4) {
		return true;
	}


	// ここまで来たら、遠距離でない
	return false;
}

function copyAccs(from, to){
	// ランダムオプション入力中はelementがないので処理できない
	// 中途半端になるので何もしないようにする
	if (GetSlotMode() != SLOTPAGER_MODE_CARD) {
		return;
	}

	const id_from = "#OBJID_ACCESSARY_"+from;
	const id_to = "#OBJID_ACCESSARY_"+to;
	const accs_from = $(id_from).val();

	if ($(`${id_to} option[value=${accs_from}]`).length>0) {
		$(id_to).val(accs_from).change().trigger("select2:select");
		[1,2,3,4].forEach((i)=>{
			$(`${id_to}_CARD_${i}`).prop("selectedIndex", $(`${id_from}_CARD_${i}`).prop("selectedIndex")).change();
		})
	} else {
		$(id_to).prop("selectedIndex", 0).change().trigger("select2:select");
		[1,2,3,4].forEach((i)=>{
			$(`${id_to}_CARD_${i}`).prop("selectedIndex", 0).change();
		})
	}
}
