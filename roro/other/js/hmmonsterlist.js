
// カテゴリ選択セレクト
g_customSelectCategory = new CCustomSelectMapCategory("MONSTER_MAP_CATEGORY");

// マップ選択セレクト
g_customSelectMap = new CCustomSelectMapMap("MONSTER_MAP_MAP", g_customSelectCategory);
g_customSelectMap.AddOnChangeSelectDataExtraHandller(RefreshMonsterList, null);



/**
 * 3桁区切りの適用.
 * @param value 値
 */
function __DIG3(value) {

	if (HtmlGetObjectCheckedById("OBJID_INPUT_DIGIT3", false)) {
		return DivideDigits3(value);
	}

	return ("" + value);
}



/**
 * 初期化処理.
 */
function InitMonsterListSelectArea() {

	var idx = 0;

	var objRoot = null;
	var objSelect = null;



	//----------------------------------------------------------------
	// 地域選択
	//----------------------------------------------------------------
	objRoot = document.getElementById("OBJID_TD_MONSTER_MAP_CATEGORY");
	HtmlRemoveAllChild(objRoot);
	objRoot.appendChild(g_customSelectCategory.GetRootObject());



	//----------------------------------------------------------------
	// マップ選択
	//----------------------------------------------------------------
	objRoot = document.getElementById("OBJID_TD_MONSTER_MAP_MAP");
	HtmlRemoveAllChild(objRoot);
	objRoot.appendChild(g_customSelectMap.GetRootObject());

	// 初期値設定（適当にマップを選んで設定）
	g_customSelectMap.ChangeSelectedDataId(336, true);



	//----------------------------------------------------------------
	// 一覧並べ替え
	//----------------------------------------------------------------

	// セレクトボックスの子要素を全削除
	objSelect = document.getElementById("OBJID_SELECT_SORT_KEY");
	HtmlRemoveOptionAll(objSelect);

	// 全てのソートキー名を登録
	HtmlCreateElementOption(MONSTER_DATA_INDEX_KANA, "名前順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_LEVEL, "Lv順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_HP, "HP順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_100HIT, "100%HIT順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_95FLEE, "95%FLEE順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_STR, "STR順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_AGI, "AGI順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_VIT, "VIT順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_INT, "INT順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_DEX, "DEX順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_LUK, "LUK順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_ATK_MIN, "最小ATK順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_ATK_MAX, "最大ATK順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_MATK_MIN, "最小MATK順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_EXTRA_INDEX_MATK_MAX, "最大MATK順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_DEF_DIV, "除算DEF順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_MDEF_DIV, "除算MDEF順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_BASE_EXP, "BaseExp順", objSelect);
	HtmlCreateElementOption(MONSTER_DATA_INDEX_JOB_EXP, "JobExp順", objSelect);



	//----------------------------------------------------------------
	// 種族抽出
	//----------------------------------------------------------------

	// セレクトボックスの子要素を全削除
	objSelect = document.getElementById("OBJID_SELECT_RACE");
	HtmlRemoveOptionAll(objSelect);

	// 全ての種族名を登録
	HtmlCreateElementOption(-1, "なし", objSelect);
	for(idx = 0; idx < RACE_ID_COUNT; idx++) {
		HtmlCreateElementOption(idx, GetRaceText(idx), objSelect);
	}



	//----------------------------------------------------------------
	// 属性別抽出
	//----------------------------------------------------------------

	// セレクトボックスの子要素を全削除
	objSelect = document.getElementById("OBJID_SELECT_ELEMENT");
	HtmlRemoveOptionAll(objSelect);

	// 全ての属性名を登録
	HtmlCreateElementOption(-1, "なし", objSelect);
	for(idx = 0; idx < ELM_ID_COUNT; idx++) {
		HtmlCreateElementOption(idx, GetElementText(idx), objSelect);
	}



	//----------------------------------------------------------------
	// サイズ別抽出
	//----------------------------------------------------------------

	// セレクトボックスの子要素を全削除
	objSelect = document.getElementById("OBJID_SELECT_SIZE");
	HtmlRemoveOptionAll(objSelect);

	// 全てのサイズ名を登録
	HtmlCreateElementOption(-1, "なし", objSelect);
	for(idx = 0; idx < SIZE_ID_COUNT; idx++) {
		HtmlCreateElementOption(idx, GetSizeText(idx), objSelect);
	}



	//----------------------------------------------------------------
	// クァグマイア
	//----------------------------------------------------------------

	// セレクトボックスの子要素を全削除
	objSelect = document.getElementById("OBJID_SELECT_QM");
	HtmlRemoveOptionAll(objSelect);

	// 全てのレベルを登録
	HtmlCreateElementOption(0, "なし", objSelect);
	for(idx = 1; idx <= 5; idx++) {
		HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
	}

	$("#OBJID_TD_MONSTER_MAP_CATEGORY select").select2();
	$("#OBJID_TD_MONSTER_MAP_MAP select").select2();
	

	// 表示更新
	RefreshMonsterList();
}



/**
 * モンスターリストの更新.
 */
function RefreshMonsterList() {

	var idx = 0;

	var selectedMapId = 0;
	var dataArraySorted = null;
	var monsterData = null;

	var paramText = "";
	var monsterData = null;
	var qmMax = 0;

	var condRace = 0;
	var condElm = 0;
	var condSize = 0;
	var condDesc = "";
	var condQM = 0;
	var condDarkness = 0;
	var condAntiBless = 0;

	var sortKeyIndex = 0;

	var objSelect = null;
	var objInput = null;
	var objTableResult = null;
	var objTbody = null;
	var objTr = null;
	var objTd = null;
	var objText = null;


	// 抽出条件を取得
	objSelect = document.getElementById("OBJID_SELECT_RACE");
	condRace = parseInt(objSelect.value);

	objSelect = document.getElementById("OBJID_SELECT_ELEMENT");
	condElm = parseInt(objSelect.value);

	objSelect = document.getElementById("OBJID_SELECT_SIZE");
	condSize = parseInt(objSelect.value);

	objInput = document.getElementById("OBJID_INPUT_DESC");
	condDesc = objInput.checked;



	// 補正条件を取得
	objSelect = document.getElementById("OBJID_SELECT_QM");
	condQM = parseInt(objSelect.value);

	objInput = document.getElementById("OBJID_INPUT_DARKNESS");
	condDarkness = objInput.checked;

	objInput = document.getElementById("OBJID_INPUT_ANTI_BLESS");
	condAntiBless = objInput.checked;



	// モンスター定義配列を複製
	// （生息マップによるフィルタリング）

	// 選択されたマップIDを取得
	selectedMapId = g_customSelectMap.GetSelectedDataId();

	// 選択されたマップIDで、モンスターリストを調整
	switch (selectedMapId) {

	// 全地域の場合
	case MONSTER_MAP_ID_MAP_ALL:

		dataArraySorted = [];

		for (idx = 0; idx < MonsterObjNew.length; idx++) {

			monsterData = MonsterObjNew[idx];

			if (IsMatchCondMonsterList(monsterData, condRace, condElm, condSize)) {
				dataArraySorted.push(monsterData.slice());
			}
		}

		break;

	// 特定地域の場合
	default:

		dataArraySorted = [];
		dataIdArray = g_MonsterMapDataArray[selectedMapId][MONSTER_MAP_DATA_INDEX_DATA_ARRAY];

		for (idx = 0; idx < dataIdArray.length; idx++) {

			monsterData = MonsterObjNew[dataIdArray[idx]];

			if (IsMatchCondMonsterList(monsterData, condRace, condElm, condSize)) {
				dataArraySorted.push(monsterData.slice());
			}
		}
		break;
	}



	// モンスターデータの補正
	for (idx = 0; idx < dataArraySorted.length; idx++) {

		monsterData = dataArraySorted[idx];

		// クァグマイア効果の適用
		if (condQM > 0) {
			qmMax = condQM * 10;

			monsterData[MONSTER_DATA_INDEX_AGI] -= Math.min(qmMax, Math.floor(monsterData[MONSTER_DATA_INDEX_AGI] / 2));
			monsterData[MONSTER_DATA_INDEX_DEX] -= Math.min(qmMax, Math.floor(monsterData[MONSTER_DATA_INDEX_DEX] / 2));

			monsterData[MONSTER_DATA_EXTRA_INDEX_100HIT] -= Math.min(qmMax, Math.floor(monsterData[MONSTER_DATA_INDEX_AGI] / 2));
			monsterData[MONSTER_DATA_EXTRA_INDEX_95FLEE] -= Math.min(qmMax, Math.floor(monsterData[MONSTER_DATA_INDEX_DEX] / 2));
		}

		// 暗闇効果の適用
		if (condDarkness) {
			if (monsterData[MONSTER_DATA_INDEX_BOSS_TYPE] != MONSTER_BOSSTYPE_BOSS) {
				monsterData[MONSTER_DATA_EXTRA_INDEX_100HIT] = Math.ceil((monsterData[MONSTER_DATA_EXTRA_INDEX_100HIT] - 100) * 0.75) + 100;
				monsterData[MONSTER_DATA_EXTRA_INDEX_95FLEE] = Math.ceil((monsterData[MONSTER_DATA_EXTRA_INDEX_95FLEE] + 5) * 0.75) - 5;
			}
		}

		// 闇ブレス効果の適用
		if (condAntiBless) {
			if (monsterData[MONSTER_DATA_INDEX_BOSS_TYPE] != MONSTER_BOSSTYPE_BOSS) {
				if (monsterData[MONSTER_DATA_INDEX_RACE] == RACE_ID_DEMON
					|| GetMonseterElmBasicType(monsterData[MONSTER_DATA_INDEX_ELEMENT]) == ELM_ID_UNDEAD){
					monsterData[MONSTER_DATA_INDEX_STR] -= Math.floor(monsterData[MONSTER_DATA_INDEX_STR] / 2);
					monsterData[MONSTER_DATA_INDEX_INT] -= Math.floor(monsterData[MONSTER_DATA_INDEX_INT] / 2);
					monsterData[MONSTER_DATA_EXTRA_INDEX_95FLEE] -= Math.floor(monsterData[MONSTER_DATA_INDEX_DEX] * 0.5);	// 計算順注意
					monsterData[MONSTER_DATA_INDEX_DEX] -= Math.floor(monsterData[MONSTER_DATA_INDEX_DEX] / 2);

				}
			}
		}
	}



	// ソートの key を特定する
	objSelect = document.getElementById("OBJID_SELECT_SORT_KEY");
	sortKeyIndex = parseInt(objSelect.value);



	// ソート
	if (condDesc) {
		// 降順ソート
		dataArraySorted.sort(
			function(a, b) {
				if (a[sortKeyIndex] < b[sortKeyIndex]) return 1;
				if (a[sortKeyIndex] > b[sortKeyIndex]) return -1;
				return 0;
			}
		);
	}
	else {
		// 昇順ソート
		dataArraySorted.sort(
			function(a, b) {
				if (a[sortKeyIndex] < b[sortKeyIndex]) return -1;
				if (a[sortKeyIndex] > b[sortKeyIndex]) return 1;
				return 0;
			}
		);
	}

	// ソートの 範囲 を特定する
	var objLow = document.getElementById("OBJID_INPUT_LOW");
	var LowNum = parseInt(objLow.value, 10);
	var objHigh = document.getElementById("OBJID_INPUT_HIGH");
	var HighNum = parseInt(objHigh.value, 10);

	// 下限値でフィルタリング
	if (!isNaN(LowNum)) {
		dataArraySorted = dataArraySorted.filter(
			function (i) {
				return i[sortKeyIndex] >= LowNum;
			}
		);
	}

	// 上限値でフィルタリング
	if (!isNaN(HighNum)) {
		dataArraySorted = dataArraySorted.filter(
			function (i) {
				return i[sortKeyIndex] <= HighNum;
			}
		);
	}




	//------------------------------------------------------------------------------------------------
	// 結果リストを更新
	//------------------------------------------------------------------------------------------------

	// 現在のモンスターリストをクリア
	objTableResult = document.getElementById("OBJID_TABLE_RESULT");
	HtmlRemoveAllChild(objTableResult);

	// テーブル再構築
	objTbody = document.createElement("tbody");
	objTableResult.appendChild(objTbody);



	for (idx = 0; idx < dataArraySorted.length; idx++) {

		// 30行に1行、ヘッダ行を追加
		if ((idx % 30) == 0) {
			objTr = document.createElement("tr");
			objTr.setAttribute("bgcolor", "#aaaaff");
			objTbody.appendChild(objTr);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("名前");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("Lv");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("種族");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("属性");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("サイズ");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("HP");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("STR");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("AGI");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("VIT");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("INT");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("DEX");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("LUK");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("ATK");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("MATK(仮)");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("DEF");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("MDEF");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("BaseExp");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("JobExp");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("100%HIT");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("95%FLEE");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("BOSS属性");
			objTd.appendChild(objText);

			objTd = document.createElement("td");
			objTr.appendChild(objTd);
			objText = document.createTextNode("遠距離攻撃");
			objTd.appendChild(objText);
		}



		// モンスターデータ行の追加
		objTr = document.createElement("tr");
		if ((idx % 2) == 0) {
			objTr.setAttribute("bgcolor", "#ddddff");
		}
		objTbody.appendChild(objTr);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(dataArraySorted[idx][MONSTER_DATA_INDEX_NAME]);
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(dataArraySorted[idx][MONSTER_DATA_INDEX_LEVEL]);
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(GetRaceText(dataArraySorted[idx][MONSTER_DATA_INDEX_RACE]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(GetMonsterElementText(dataArraySorted[idx][MONSTER_DATA_INDEX_ELEMENT]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(GetSizeText(dataArraySorted[idx][MONSTER_DATA_INDEX_SIZE]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_HP]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_STR]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_AGI]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_VIT]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_INT]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_DEX]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_LUK]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		paramText = __DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_ATK_MIN]);
		paramText += " ～ ";
		paramText += __DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_ATK_MAX]);
		objText = document.createTextNode(paramText);
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		paramText = __DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_MATK_MIN]);
		paramText += " ～ ";
		paramText += __DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_MATK_MAX]);
		objText = document.createTextNode(paramText);
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_DEF_DIV]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_MDEF_DIV]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_BASE_EXP]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_INDEX_JOB_EXP]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_100HIT]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTr.appendChild(objTd);
		objText = document.createTextNode(__DIG3(dataArraySorted[idx][MONSTER_DATA_EXTRA_INDEX_95FLEE]));
		objTd.appendChild(objText);

		objTd = document.createElement("td");
		objTd.setAttribute("align", "center");
		objTr.appendChild(objTd);
		if (dataArraySorted[idx][MONSTER_DATA_INDEX_BOSS_TYPE] == MONSTER_BOSSTYPE_BOSS) {
			objText = document.createTextNode("○");
			objTd.appendChild(objText);
		}

		objTd = document.createElement("td");
		objTd.setAttribute("align", "center");
		objTr.appendChild(objTd);
		if (dataArraySorted[idx][MONSTER_DATA_INDEX_RANGE] >= 4) {
			objText = document.createTextNode("○");
			objTd.appendChild(objText);
		}
	}
}



/**
 * 抽出条件に適合しているかの判定.
 * @param monsterData モンスターデータ
 * @param condRace 種族条件
 * @param condElm 属性条件
 * @param condSize サイズ条件
 */
function IsMatchCondMonsterList(monsterData, condRace, condElm, condSize) {

	// 種族条件
	if (condRace != -1) {
		if (monsterData[MONSTER_DATA_INDEX_RACE] != condRace) {
			return false;
		}
	}

	// 属性条件
	if (condElm != -1) {
		if (Math.floor(monsterData[MONSTER_DATA_INDEX_ELEMENT] / 10) != condElm) {
			return false;
		}
	}

	// サイズ条件
	if (condSize != -1) {
		if (monsterData[MONSTER_DATA_INDEX_SIZE] != condSize) {
			return false;
		}
	}

	return true;
}
