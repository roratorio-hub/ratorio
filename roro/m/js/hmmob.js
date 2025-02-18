function UpdateMobDataHtml(monsterId, mobData) {

	var idx = 0;
	var val = 0;

	var objRoot = null;
	var objSpan = null;
	var objSelect = null;
	var objText = null;

	var mobDataOriginal = new Array();


	//----------------------------------------------------------------
	// 元データの取得
	//----------------------------------------------------------------
	for (idx = 0; idx < MONSTER_DATA_INDEX_COUNT; idx++) {
		val = MonsterObjNew[monsterId][idx];
		mobDataOriginal[idx] = (val === undefined) ? 0 : val;
	}


	//----------------------------------------------------------------
	// 導出ステータスの計算（元データ保持用。★代入先注意★）
	//----------------------------------------------------------------

	// 減算DEF(最小)
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN]
		= Math.floor(MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LEVEL] / 2
						+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_VIT] / 2);

	// 減算DEF(最大)
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX]
		= MonsterObjNew[monsterId][MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN];

	// 減算MDEF
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS]
		= Math.floor((MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LEVEL]
						+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_INT]) / 4);

	// ＨＩＴ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_HIT]
		= 150
			+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LEVEL]
				+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_DEX];

	// ＦＬＥＥ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_FLEE]
		= 100
			+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LEVEL]
				+ MonsterObjNew[monsterId][MONSTER_DATA_INDEX_AGI];

	// １００％ＨＩＴ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_100HIT]
		= mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_FLEE] + 100;

	// ９５％ＦＬＥＥ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_95FLEE]
		= mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_HIT] - 5;

	// 最小ＡＴＫ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_ATK_MIN]
		= MonsterObjNew[monsterId][MONSTER_DATA_EXTRA_INDEX_ATK_MIN];

	// 最大ＡＴＫ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_ATK_MAX]
		= MonsterObjNew[monsterId][MONSTER_DATA_EXTRA_INDEX_ATK_MAX];

	// 最小ＭＡＴＫ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_MATK_MIN]
		= MonsterObjNew[monsterId][MONSTER_DATA_EXTRA_INDEX_MATK_MIN];

	// 最大ＭＡＴＫ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_MATK_MAX]
		= MonsterObjNew[monsterId][MONSTER_DATA_EXTRA_INDEX_MATK_MAX];

	// サイズ
	mobDataOriginal[MONSTER_DATA_INDEX_SIZE]
		= MonsterObjNew[monsterId][MONSTER_DATA_INDEX_SIZE];
	
	// １００％ＣＲＩ
	mobDataOriginal[MONSTER_DATA_EXTRA_INDEX_100CRI]
		= 100 + Math.ceil(MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LEVEL] / 150 + MonsterObjNew[monsterId][MONSTER_DATA_INDEX_LUK] / 5);


//================================================================================================
// 画面表示
//================================================================================================

	//----------------------------------------------------------------
	// 能力値欄
	//----------------------------------------------------------------
	var paramId = 0;
	var bColorReverse = false;
	var paramArray = [
		[MONSTER_DATA_INDEX_LEVEL, "OBJID_SPAN_MONSTER_LEVEL", false]
		, [MONSTER_DATA_INDEX_HP, "OBJID_SPAN_MONSTER_HP", false]
		, [MONSTER_DATA_EXTRA_INDEX_ATK_MIN, "OBJID_SPAN_MONSTER_ATK_MIN", false]
		, [MONSTER_DATA_EXTRA_INDEX_ATK_MAX, "OBJID_SPAN_MONSTER_ATK_MAX", false]
		, [MONSTER_DATA_EXTRA_INDEX_MATK_MIN, "OBJID_SPAN_MONSTER_MATK_MIN", false]
		, [MONSTER_DATA_EXTRA_INDEX_MATK_MAX, "OBJID_SPAN_MONSTER_MATK_MAX", false]
		, [MONSTER_DATA_EXTRA_INDEX_100HIT, "OBJID_SPAN_MONSTER_100HIT", false]
		, [MONSTER_DATA_EXTRA_INDEX_95FLEE, "OBJID_SPAN_MONSTER_95FLEE", false]
		, [MONSTER_DATA_INDEX_DEF_DIV, "OBJID_SPAN_MONSTER_DEF_DIV", false]
		, [MONSTER_DATA_INDEX_MDEF_DIV, "OBJID_SPAN_MONSTER_MDEF_DIV", false]
		, [MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MIN, "OBJID_SPAN_MONSTER_DEF_MINUS_MIN", false]
		// 現在の仕様では、減算ＤＥＦに振れ幅はないと思われる。
		//, [MONSTER_DATA_EXTRA_INDEX_DEF_MINUS_MAX, "OBJID_SPAN_MONSTER_DEF_MINUS_MAX", false]
		, [MONSTER_DATA_EXTRA_INDEX_MDEF_MINUS, "OBJID_SPAN_MONSTER_MDEF_MINUS", false]
		, [MONSTER_DATA_INDEX_BASE_EXP, "OBJID_SPAN_MONSTER_BASE_EXP", true]
		, [MONSTER_DATA_INDEX_JOB_EXP, "OBJID_SPAN_MONSTER_JOB_EXP", true]
		// 特性ステータス対応
		, [MONSTER_DATA_INDEX_RES, "OBJID_SPAN_MONSTER_RES", false]
		, [MONSTER_DATA_INDEX_MRES, "OBJID_SPAN_MONSTER_MRES", false]
		// 2025/02 リクエスト対応
		, [MONSTER_DATA_EXTRA_INDEX_100CRI, "OBJID_SPAN_MONSTER_100CRI", false]
	];

	var valCur = 0;
	var valOrg = 0;

	// パラメタ配列の定義に従って、HTML document に情報を埋め込んでいく
	for (idx = 0; idx < paramArray.length; idx++) {

		// 表示用のオブジェクトを生成
		objSpan = HtmlCreateElement("span", null);

		paramId = paramArray[idx][0];
		bColorReverse = paramArray[idx][2];



		switch (paramId) {
			// 特性ステータス対応
			case MONSTER_DATA_INDEX_RES:
				if (mobData[MONSTER_DATA_INDEX_RES] === undefined) {
					continue;
				}
				valCur = GetMobRes(mobData);
				valOrg = mobData[paramId];
				break;

			// 特性ステータス対応
			case MONSTER_DATA_INDEX_MRES:
				if (mobData[MONSTER_DATA_INDEX_MRES] === undefined) {
					continue;
				}
				valCur = GetMobMres(mobData);
				valOrg = mobData[paramId];
				break;

			// 2025/02 リクエスト対応
			case MONSTER_DATA_EXTRA_INDEX_100CRI:
				valCur = mobDataOriginal[paramId];	// 100%Cri は mobData に存在しないので
				valOrg = mobDataOriginal[paramId];
				break;

			default:
				valCur = mobData[paramId];
				valOrg = mobDataOriginal[paramId];
				break;
		}

		// 能力値の変化に応じて着色
		if (valCur > valOrg) {
			if (bColorReverse) {
				objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_GOOD");
			}
			else {
				objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_BAD");
			}
		}
		else if (valCur < valOrg) {
			if (bColorReverse) {
				objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_BAD");
			}
			else {
				objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_GOOD");
			}
		}
		else {
			objSpan.removeAttribute("class");
		}

		// 能力値の値をテキストとして追加
		objText = document.createTextNode(__DIG3(valCur));
		objSpan.appendChild(objText);

		// 追加テキストの追加
		switch (paramId) {

			case MONSTER_DATA_INDEX_DEF_DIV:
				// 除算ＤＥＦの欄の場合、軽減率を追加表示
				val = ROUNDDOWN(1000 - ((4000 + mobData[MONSTER_DATA_INDEX_DEF_DIV]) / (4000 + mobData[MONSTER_DATA_INDEX_DEF_DIV] * 10) * 1000)) / 10;
				objText = document.createTextNode(" [" + val + "%]");
				objSpan.appendChild(objText);
				break;

			case MONSTER_DATA_INDEX_MDEF_DIV:
				// 除算ＭＤＥＦの欄の場合、軽減率を追加表示
				val = ROUNDDOWN(1000 - ((4000 + mobData[MONSTER_DATA_INDEX_MDEF_DIV] * 4) / (4000 + mobData[MONSTER_DATA_INDEX_MDEF_DIV] * 40) * 1000)) / 10;
				objText = document.createTextNode(" [" + val + "%]");
				objSpan.appendChild(objText);
				break;

			// 特性ステータス対応
			case MONSTER_DATA_INDEX_RES:
				// 軽減率を追加表示
				val = GetMobRes(mobData);
				val = ROUNDDOWN(1000 - ((2000 + val) / (2000 + 5 * val) * 1000)) / 10;
				objText = document.createTextNode(" [" + val + "%]");
				objSpan.appendChild(objText);
				break;

			case MONSTER_DATA_INDEX_MRES:
				// 軽減率を追加表示
				val = GetMobMres(mobData);
				val = ROUNDDOWN(1000 - ((2000 + val) / (2000 + 5 * val) * 1000)) / 10;
				objText = document.createTextNode(" [" + val + "%]");
				objSpan.appendChild(objText);
				break;
		}

		// 管理クラスに設定
		CMonsterMapAreaComponentManager.SetDispObject(paramArray[idx][1], objSpan);
	}



	//----------------------------------------------------------------
	// 種族欄
	//----------------------------------------------------------------

	// 表示用のオブジェクトを生成
	objSpan = HtmlCreateElement("span", null);

	if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {
		// 対プレイヤーの場合は、対プレイヤー設定欄の設定に従って表示
		// （ここでは表示のみ加工する。実際の計算は、各所で別計算）
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
			case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
				objText = document.createTextNode("人間");
				objSpan.appendChild(objText);
				break;

			case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
				objText = document.createTextNode("ドラム");
				objSpan.appendChild(objText);
				break;
		}
	}
	else {
		// 対プレイヤーでなければ、モンスターの種族をそのまま表示
		objText = document.createTextNode(GetRaceText(mobData[MONSTER_DATA_INDEX_RACE]));
		objSpan.appendChild(objText);

		// 種族が変化している場合は着色
		if (mobData[MONSTER_DATA_INDEX_RACE] != mobDataOriginal[MONSTER_DATA_INDEX_RACE]) {
			objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_BAD");
		}
		else {
			objSpan.removeAttribute("class");
		}
	}

	// 管理クラスに設定
	CMonsterMapAreaComponentManager.SetDispObject("OBJID_SPAN_MONSTER_RACE", objSpan);



	//----------------------------------------------------------------
	// 属性欄
	//----------------------------------------------------------------

	// 表示用のオブジェクトを生成
	objSpan = HtmlCreateElement("span", null);

	// 属性が変化している場合は着色
	if (mobData[MONSTER_DATA_INDEX_ELEMENT] != mobDataOriginal[MONSTER_DATA_INDEX_ELEMENT]) {
		objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_BAD");
	}
	else {
		objSpan.removeAttribute("class");
	}

	objText = document.createTextNode(GetMonsterElementText(mobData[MONSTER_DATA_INDEX_ELEMENT]));
	objSpan.appendChild(objText);

	// 管理クラスに設定
	CMonsterMapAreaComponentManager.SetDispObject("OBJID_SPAN_MONSTER_ELEMENT", objSpan);



	//----------------------------------------------------------------
	// サイズ欄
	//----------------------------------------------------------------

	// 表示用のオブジェクトを生成
	objSpan = HtmlCreateElement("span", null);

	if (mobData[MONSTER_DATA_INDEX_ID] == MONSTER_ID_PLAYER) {

		// 対プレイヤーの場合は、対プレイヤー設定欄の設定に従って表示
		// （ここでは表示のみ加工する。実際の計算は、各所で別計算）
		switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SHUZOKU]) {
		case MOB_CONF_PLAYER_ID_SHUZOKU_HUMAN:
			objText = document.createTextNode("中型");
			objSpan.appendChild(objText);
			break;

		case MOB_CONF_PLAYER_ID_SHUZOKU_DORAM:
			objText = document.createTextNode("小型");
			objSpan.appendChild(objText);
			break;
		}
	}
	else {
		// 対プレイヤーでなければ、モンスターの種族をそのまま表示
		objText = document.createTextNode(GetSizeText(mobData[MONSTER_DATA_INDEX_SIZE]));
		objSpan.appendChild(objText);

		// サイズが変化している場合は着色
		if (mobData[MONSTER_DATA_INDEX_SIZE] != mobDataOriginal[MONSTER_DATA_INDEX_SIZE]) {
			objSpan.setAttribute("class", "CSSCLS_MONSTER_PARAM_BAD");
		}
		else {
			objSpan.removeAttribute("class");
		}
	}

	// 管理クラスに設定
	CMonsterMapAreaComponentManager.SetDispObject("OBJID_SPAN_MONSTER_SIZE", objSpan);



	//----------------------------------------------------------------
	// 特性欄
	//----------------------------------------------------------------

	// 表示用のオブジェクトを生成
	objSpan = HtmlCreateElement("span", null);

	var strSpec = "";

	// BOSS属性
	if (mobData[MONSTER_DATA_INDEX_BOSS_TYPE] != MONSTER_BOSSTYPE_NONE) {
		if (strSpec != "") {
			strSpec += "/";
		}
		strSpec += "Boss";
	}

	// 草属性
	switch (mobData[MONSTER_DATA_INDEX_GRASS_TYPE]) {
	case MONSTER_GRASSTYPE_GLASS:
		if (strSpec != "") {
			strSpec += "/";
		}
		strSpec += "旧草";
		break;

	case MONSTER_GRASSTYPE_EMPERIUM:
		if (strSpec != "") {
			strSpec += "/";
		}
		strSpec += "エンペ";
		break;

	case MONSTER_GRASSTYPE_GLASS_NEW:
		if (strSpec != "") {
			strSpec += "/";
		}
		strSpec += "新草";
		break;
	}

	// 遠距離攻撃
	if (mobData[MONSTER_DATA_INDEX_RANGE] >= 4) {
		if (strSpec != "") {
			strSpec += "/";
		}
		strSpec += "遠距離";
	}

	if (strSpec == "") {
		strSpec = "-";
	}

	objText = document.createTextNode(strSpec);
	objSpan.appendChild(objText);

	// 管理クラスに設定
	CMonsterMapAreaComponentManager.SetDispObject("OBJID_SPAN_MONSTER_SPECIALITY", objSpan);

}
