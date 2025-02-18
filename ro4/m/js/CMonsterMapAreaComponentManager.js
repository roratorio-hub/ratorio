




/**
 * モンスターマップエリアコンポーネントマネージャクラス.
 */
function CMonsterMapAreaComponentManager () {
}



// カテゴリ選択セレクト
CMonsterMapAreaComponentManager.customSelectCategory = new CCustomSelectMapCategory("MONSTER_MAP_CATEGORY");

// マップ選択セレクト
CMonsterMapAreaComponentManager.customSelectMap = new CCustomSelectMapMap("MONSTER_MAP_MAP", CMonsterMapAreaComponentManager.customSelectCategory);

// モンスター選択セレクト
CMonsterMapAreaComponentManager.customSelectMonster = new CCustomSelectMapMonster("MONSTER_MAP_MONSTER", CMonsterMapAreaComponentManager.customSelectMap);

// 表示データのマップ
CMonsterMapAreaComponentManager.dispObjectMap = new Map();



/**
 * 画面部品を再構築する.
 */
CMonsterMapAreaComponentManager.RebuildControls = function () {

	var idx = 0;

	var switchChecked = "";

	var objSwitch = null;
	var objRoot = null;
	var objTable = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objSelect = null;
	var objSpan = null;

	var objTableChild = null;
	var objTbodyChild = null;
	var objTrChild = null;
	var objTdChild = null;



	// チェックボックスのチェック状態を取得
	objSwitch = document.getElementById("OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
	if (objSwitch) {
		switchChecked = objSwitch.checked;
	}



	// ルートオブジェクトを取得
	objRoot = document.getElementById("OBJID_TD_MONSTER_MAP_AREA");

	// 設定欄を初期化
	HtmlRemoveAllChild(objRoot);



	// 設定欄テーブルを再構築
	objTable = document.createElement("table");
	objTable.setAttribute("border", "1");
	objTable.setAttribute("style", "width : 100%;");
	objRoot.appendChild(objTable);

	objTbody = document.createElement("tbody");
	objTable.appendChild(objTbody);



	//----------------------------------------------------------------
	// ヘッダ
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// ラベル
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	objTd.setAttribute("colspan", "2");

	HtmlCreateTextNode("モンスター", objTd);

	//--------------------------------
	// 展開スイッチ
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("id", "OBJID_TD_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	objTd.setAttribute("colspan", "2");

	// 設定欄展開用チェックボックス
	objInput = HtmlCreateElement("input", objTd);
	objInput.setAttribute("type", "checkbox");
	objInput.setAttribute("id", "OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
	objInput.setAttribute("onclick", "CMonsterMapAreaComponentManager.OnClickExtractSwitch()");
	if (switchChecked) {
		// 部品を再構築しているので、チェック状態の再設定が必要
		objInput.setAttribute("checked", "checked");
	}

	objLabel = HtmlCreateElement("label", objTd);
	objLabel.setAttribute("for", "OBJID_MONSTER_MAP_AREA_EXTRACT_CHECKBOX");
	HtmlCreateTextNode("マップ指定", objLabel);



	//----------------------------------------------------------------
	// 地域選択
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 展開表示でなければ、隠す
	if (!switchChecked) {
		objTr.setAttribute("style", "display : none");
	}

	//--------------------------------
	// ラベル
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

	HtmlCreateTextNode("地域", objTd);

	//----------------
	// カスタムセレクトオブジェクト生成
	//----------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");

	objTd.appendChild(CMonsterMapAreaComponentManager.customSelectCategory.GetRootObject());



	//----------------------------------------------------------------
	// マップ選択
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	// 展開表示でなければ、隠す
	if (!switchChecked) {
		objTr.setAttribute("style", "display : none");
	}

	//--------------------------------
	// ラベル
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

	HtmlCreateTextNode("マップ", objTd);

	//----------------
	// カスタムセレクトオブジェクト生成
	//----------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");

	objTd.appendChild(CMonsterMapAreaComponentManager.customSelectMap.GetRootObject());



	//----------------------------------------------------------------
	// モンスター選択
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// ラベル
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");

	HtmlCreateTextNode("名称", objTd);

	//----------------
	// カスタムセレクトオブジェクト生成
	//----------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("colspan", "3");

	objTd.appendChild(CMonsterMapAreaComponentManager.customSelectMonster.GetRootObject());



	//----------------------------------------------------------------
	// HP / LV
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// HP
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	objTd.setAttribute("style", "min-width: 8em;");
	HtmlCreateTextNode("HP", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "min-width: 7em;");
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_HP");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_HP");

	//--------------------------------
	// LV
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	objTd.setAttribute("style", "min-width: 8em;");
	HtmlCreateTextNode("LV", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("style", "min-width: 7em;");
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_LEVEL");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_LEVEL");



	//----------------------------------------------------------------
	// ATK / BaseExp
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// ATK
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("ATK", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objTd.style.whiteSpace = "nowrap";
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ATK_MIN");
	HtmlCreateTextNode("～", objTd);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ATK_MAX");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ATK_MIN");
	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ATK_MAX");

	//--------------------------------
	// BaseExp
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("BaseExp", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_BASE_EXP");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_BASE_EXP");



	//----------------------------------------------------------------
	// MATK / JobExp
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// MATK
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("MATK", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objTd.style.whiteSpace = "nowrap";
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MATK_MIN");
	HtmlCreateTextNode("～", objTd);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MATK_MAX");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MATK_MIN");
	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MATK_MAX");

	//--------------------------------
	// JobExp
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("JobExp", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_JOB_EXP");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_JOB_EXP");



	//----------------------------------------------------------------
	// DEF(除算) / 種族
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// DEF(除算)
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("DEF(除算)", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_DEF_DIV");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_DEF_DIV");

	//--------------------------------
	// 種族
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("種族", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_RACE");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_RACE");



	//----------------------------------------------------------------
	// DEF(減算) / 属性
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// DEF(減算)
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("DEF(減算)", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_DEF_MINUS_MIN");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_DEF_MINUS_MIN");

	//--------------------------------
	// 属性
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("属性", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_ELEMENT");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_ELEMENT");



	//----------------------------------------------------------------
	// Res / サイズ
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// Res
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("Res", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_RES");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_RES");

	//--------------------------------
	// サイズ
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("サイズ", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_SIZE");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_SIZE");



	//----------------------------------------------------------------
	// MDEF(除算) / 特性
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// MDEF(除算)
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("MDEF(除算)", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MDEF_DIV");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MDEF_DIV");

	//--------------------------------
	// 特性
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("特性", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_SPECIALITY");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_SPECIALITY");



	//----------------------------------------------------------------
	// MDEF(減算) / 必中HIT
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// MDEF(減算)
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("MDEF(減算)", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MDEF_MINUS");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MDEF_MINUS");

	//--------------------------------
	// 必中HIT
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("必中HIT", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_100HIT");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_100HIT");



	//----------------------------------------------------------------
	// Mres / 95%回避FLEE
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);

	//--------------------------------
	// Mres
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("Mres", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_MRES");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_MRES");

	//--------------------------------
	// 95%回避FLEE
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("95%回避FLEE", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_95FLEE");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_95FLEE");

	//----------------------------------------------------------------
	// Blank / 100%要求CRI
	//----------------------------------------------------------------
	objTr = HtmlCreateElement("tr", objTbody);
	
	//--------------------------------
	// Blank
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);

	//--------------------------------
	// 100%要求CRI
	//--------------------------------
	objTd = HtmlCreateElement("td", objTr);
	objTd.setAttribute("class", "CSSCLS_INFO_HEADER");
	HtmlCreateTextNode("100%ｸﾘﾃｨｶﾙCRI", objTd);

	objTd = HtmlCreateElement("td", objTr);
	objSpan = HtmlCreateElement("span", objTd);
	objSpan.setAttribute("id", "OBJID_SPAN_MONSTER_100CRI");

	CMonsterMapAreaComponentManager.RefreshtDispObject("OBJID_SPAN_MONSTER_100CRI");

};



/**
 * 展開表示変更イベントハンドラ.
 */
CMonsterMapAreaComponentManager.OnClickExtractSwitch = function () {
	// コントロール再構築
	CMonsterMapAreaComponentManager.RebuildControls();
};



/**
 * 選択中のカテゴリIDを取得する.
 * @return 選択中のカテゴリID
 */
CMonsterMapAreaComponentManager.GetCategoryId = function () {
	return CMonsterMapAreaComponentManager.customSelectCategory.GetSelectedDataId();
};

/**
 * 選択中のマップIDを取得する.
 * @return 選択中のマップID
 */
CMonsterMapAreaComponentManager.GetMapId = function () {
	return CMonsterMapAreaComponentManager.customSelectMap.GetSelectedDataId();
};

/**
 * 選択中のモンスターIDを取得する.
 * @return 選択中のモンスターID
 */
CMonsterMapAreaComponentManager.GetMonsterId = function () {
	return CMonsterMapAreaComponentManager.customSelectMonster.GetSelectedDataId();
};

/**
 * 選択状態を設定する.
 * @param categoryId カテゴリID
 * @param mapId マップID
 * @param monsterId モンスターID
 * @param bResetWhenFailed 選択失敗時にリセットするかのフラグ
 * @return 実際に選択されたIDの配列
 */
CMonsterMapAreaComponentManager.ChangeSelect = function (categoryId, mapId, monsterId, bResetWhenFailed) {

	var selectedArray = null;

	selectedArray = [];

	selectedArray.push(CMonsterMapAreaComponentManager.customSelectCategory.ChangeSelectedDataId(categoryId, bResetWhenFailed));
	selectedArray.push(CMonsterMapAreaComponentManager.customSelectMap.ChangeSelectedDataId(mapId, bResetWhenFailed));
	selectedArray.push(CMonsterMapAreaComponentManager.customSelectMonster.ChangeSelectedDataId(monsterId, bResetWhenFailed));

	CMonsterMapAreaComponentManager.RebuildControls();

	return selectedArray;
};

/**
 * 選択状態をリセットする.
 */
CMonsterMapAreaComponentManager.ResetSelect = function () {

	CMonsterMapAreaComponentManager.customSelectCategory.ResetSelect();
	CMonsterMapAreaComponentManager.customSelectMap.ResetSelect();
	CMonsterMapAreaComponentManager.customSelectMonster.ResetSelect();

	CMonsterMapAreaComponentManager.RebuildControls();
};



/**
 * 表示オブジェクトを設定する.
 * @param objId オブジェクトID
 * @param objDisp 表示オブジェクト
 */
CMonsterMapAreaComponentManager.SetDispObject = function (objId, objDisp) {

	var objTarget = null;

	CMonsterMapAreaComponentManager.dispObjectMap.set(objId, objDisp);

	objTarget = document.getElementById(objId);

	if (objTarget) {
		HtmlRemoveAllChild(objTarget);
		objTarget.appendChild(objDisp);
	}
};

/**
 * 表示オブジェクトを更新する.
 * @param objId オブジェクトID
 */
CMonsterMapAreaComponentManager.RefreshtDispObject = function (objId) {

	var objTarget = null;
	var objDisp = null;

	objDisp = CMonsterMapAreaComponentManager.dispObjectMap.get(objId);

	objTarget = document.getElementById(objId);

	if (objTarget) {

		HtmlRemoveAllChild(objTarget);

		if (objDisp) {
			objTarget.appendChild(objDisp);
		}
	}
};





