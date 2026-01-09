//----------------------------------------------------------------
// 拡張情報の種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumExtraInfoIndex",
	[
		"EXTRA_INFO_ID_NONE",

		"EXTRA_INFO_ID_HEALING",
		"EXTRA_INFO_ID_RECOVERY",
		"EXTRA_INFO_ID_CAPACITY",
		"EXTRA_INFO_ID_PHYSICAL_SPECIALIZE",
		"EXTRA_INFO_ID_MAGICAL_SPECIALIZE",
		"EXTRA_INFO_ID_RESIST_ELEMENT",
		"EXTRA_INFO_ID_RESIST_DAMAGE",
		"EXTRA_INFO_ID_RESIST_STATE",
		"EXTRA_INFO_ID_RESIST_STATE_R_NEW",
		"EXTRA_INFO_ID_CAST_AND_DELAY",
		"EXTRA_INFO_ID_EXP",
		"EXTRA_INFO_ID_STATUS_SUM",
		"EXTRA_INFO_ID_ALCHEMIST",
		"EXTRA_INFO_ID_PVP_INFO",
		"EXTRA_INFO_ID_EFFECTIVE_SP",
	],
	0,
	1
);

//----------------------------------------------------------------
// ステータス合計情報の種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumExtraInfoStatusSumKind",
	[
		"EXTRA_INFO_STATUS_SUM_KIND_NONE",

		"EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD",
		"EXTRA_INFO_STATUS_SUM_KIND_ALL_ITEM_AND_CARD",
	],
	0,
	1
);

//----------------------------------------------------------------
// 有効なSP情報の種類
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumExtraInfoEffectiveSpKind",
	[
		"EXTRA_INFO_EFFECTIVE_SP_KIND_NONE",

		"EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_BASIC",
		"EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_SPECIAL",
		"EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_EXTRA",
		"EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_ALL",
	],
	0,
	1
);



/**
 * 拡張情報の種類のテキストを取得する.
 * @param infoId 拡張情報ID
 */
function GetExtraInfoText(infoId) {

	switch (infoId) {
	case EXTRA_INFO_ID_NONE:
		return "なし";

	case EXTRA_INFO_ID_HEALING:
		return "ヒール回復力";

	case EXTRA_INFO_ID_RECOVERY:
		return "回復力向上";

	case EXTRA_INFO_ID_CAPACITY:
		return "所持限界量";

	case EXTRA_INFO_ID_PHYSICAL_SPECIALIZE:
		return "物理特化";

	case EXTRA_INFO_ID_MAGICAL_SPECIALIZE:
		return "魔法特化";

	case EXTRA_INFO_ID_RESIST_ELEMENT:
		return "属性倍率";

	case EXTRA_INFO_ID_RESIST_DAMAGE:
		return "ダメージ耐性";

	case EXTRA_INFO_ID_RESIST_STATE:
		return "状態異常耐性";

	case EXTRA_INFO_ID_RESIST_STATE_R_NEW:
		return "新状態異常耐性";

	case EXTRA_INFO_ID_CAST_AND_DELAY:
		return "詠唱/ディレイ";

	case EXTRA_INFO_ID_EXP:
		return "経験値";

	case EXTRA_INFO_ID_STATUS_SUM:
		return "純粋なステータス合計";
	
	case EXTRA_INFO_ID_ALCHEMIST:
		return "製薬ステータス";

	case EXTRA_INFO_ID_PVP_INFO:
		return "対人情報";

	case EXTRA_INFO_ID_EFFECTIVE_SP:
		return "ステータス補正";
	}

	return "エラー";
}





/**
 * 拡張情報エリアコンポーネントマネージャクラス.
 */
function CExtraInfoAreaComponentManager () {

	// マネージャクラスのインスタンスＩＤ
	this.managerInstanceId = CExtraInfoAreaComponentManager.instanceManager.registerInstance(this);

	// 選択中の拡張情報ＩＤ
	this.selectedInfoId = EXTRA_INFO_ID_NONE;

	// サブ要素の選択値マップ
	this.selectedValueStore = new Map();



	/**
	 * サブ要素の選択値を保管する.
	 */
	this.StoreSelectedValue = function (objID) {
		var value = HtmlGetObjectValueByIdAsInteger(objID, undefined);
		if (value !== undefined) {
			this.selectedValueStore.set(objID, value);
		}
	};

	/**
	 * サブ要素の選択値を復元する.
	 */
	this.RestoreSelectedValue = function (objID, valueWhenNull) {
		var value = this.selectedValueStore.get(objID);
		if (value !== undefined) {
			HtmlSetObjectValueById(objID, value);
		}
		else {
			HtmlSetObjectValueById(objID, valueWhenNull);
		}
	};

	/**
	 * サブ要素の選択値を保管する（すべて）.
	 */
	this.StoreSelectedValueAll = function () {

		// 設定値を保持（呼び出し先で、オブジェクトの存在チェックが行われるので、存在しなければ保持されない）
		this.selectedValueStore.forEach(
			function (valueF, keyF, mapF) {
				this.StoreSelectedValue(keyF);
			},
			this
		);
	};

	/**
	 * 記憶している選択値をクリアする.
	 * @param bPreserveStaticOptions 職業等に依存しないオプションを維持するかのフラグ
	 */
	this.ClearStoredValue = function (bPreserveStaticOptions) {

		var idx = 0;

		var mapOld = null;
		var valueOld = null;

		var preserveKeyArray = [

			// ステータス合計関連
			"OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId,
			"OBJID_SELECT_EXTRA_INFO_STATUS_SUM_COND_TABLE_KIND_" + this.managerInstanceId,
			"OBJID_SELECT_EXTRA_INFO_STATUS_SUM_TARGET_ITEM_KIND_" + this.managerInstanceId,

			// ステータス補正関連
			"OBJID_SELECT_EXTRA_INFO_EFFECTIVE_SP_DISP_KIND_" + this.managerInstanceId,
		];



		// 維持する場合は、旧マップを保持
		if (bPreserveStaticOptions) {
			mapOld = this.selectedValueStore;
		}

		// マップを新たに生成
		this.selectedValueStore = new Map();

		// 旧マップが保持されている場合は、特定のオプションを新マップに追加する
		if (mapOld) {
			for (idx = 0; idx < preserveKeyArray.length; idx++) {

				valueOld = mapOld.get(preserveKeyArray[idx]);

				if (valueOld !== undefined) {
					this.selectedValueStore.set(preserveKeyArray[idx], valueOld);
				}
			}
		}

	};



	/**
	 * 画面部品を再構築する.
	 */
	this.RebuildControls = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSelect = null;

		var objTableChild = null;
		var objTbodyChild = null;
		var objTrChild = null;
		var objTdChild = null;

		var optArray = [
			EXTRA_INFO_ID_NONE,

			EXTRA_INFO_ID_HEALING,
			EXTRA_INFO_ID_RECOVERY,
			EXTRA_INFO_ID_CAPACITY,
			EXTRA_INFO_ID_EFFECTIVE_SP,
			EXTRA_INFO_ID_PHYSICAL_SPECIALIZE,
			EXTRA_INFO_ID_MAGICAL_SPECIALIZE,
			EXTRA_INFO_ID_RESIST_ELEMENT,
			EXTRA_INFO_ID_RESIST_DAMAGE,
			EXTRA_INFO_ID_PVP_INFO,
			EXTRA_INFO_ID_RESIST_STATE,
			EXTRA_INFO_ID_RESIST_STATE_R_NEW,
			EXTRA_INFO_ID_CAST_AND_DELAY,
			EXTRA_INFO_ID_EXP,
			EXTRA_INFO_ID_STATUS_SUM,
			EXTRA_INFO_ID_ALCHEMIST,
		];



		// ルートオブジェクトを取得
		objRoot = document.getElementById("ID_EXTRA_INFO_AREA_" + this.managerInstanceId);

		// ルートオブジェクトが存在しない場合は処理しない
		if (!objRoot) {
			return;
		}



		// 設定欄を初期化
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = document.createElement("table");
		objTable.setAttribute("style", "width : 100%;");
		objRoot.appendChild(objTable);

		objTbody = document.createElement("tbody");
		objTable.appendChild(objTbody);



		//----------------------------------------------------------------
		// セレクトボックス行
		//----------------------------------------------------------------
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);

		objTableChild = HtmlCreateElement("table", objTd);
		objTableChild.setAttribute("style", "width : 100%;");
		objTbodyChild = HtmlCreateElement("tbody", objTableChild);

		objTrChild = HtmlCreateElement("tr", objTbodyChild);
		objTdChild = HtmlCreateElement("td", objTrChild);

		objSelect = HtmlCreateElement("select", objTdChild);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_" + this.managerInstanceId);
		objSelect.setAttribute("onchange", "CExtraInfoAreaComponentManager.OnChangeInfo(" + this.managerInstanceId + ")");

		for (idx = 0; idx < optArray.length; idx++) {
			HtmlCreateElementOption(optArray[idx], GetExtraInfoText(optArray[idx]), objSelect);
		}

		objSelect.value = this.selectedInfoId;



		//----------------------------------------------------------------
		// 表示行
		//----------------------------------------------------------------
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);



		// 初期表示
		this.RebuildDispArea();
	};





	/**
	 * 拡張情報ＩＤ変更イベントハンドラ.
	 */
	this.OnChangeInfo = function () {

		var infoId = 0;

		// 設定値の保持
		this.StoreSelectedValueAll();

		// 拡張情報ＩＤを取得
		infoId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_" + this.managerInstanceId, 0);

		// 選択中のＩＤを更新
		this.selectedInfoId = infoId;

		// セーブデータ更新
		CSaveController.setSettingProp(`floatingInfo${this.managerInstanceId}InfoName`, infoId);
		
		// 再構築処理呼び出し
		this.RebuildDispArea();
	};



	/**
	 * 表示エリアを再構築する.
	 * @param infoId 拡張情報ＩＤ
	 */
	this.RebuildDispArea = function () {

		// 設定値の保持
		this.StoreSelectedValueAll();

		// 指定の種類に応じて再構築
		switch (this.selectedInfoId) {

		case EXTRA_INFO_ID_HEALING:
			this.RebuildDispAreaHealing();
			break;

		case EXTRA_INFO_ID_RECOVERY:
			this.RebuildDispAreaRecovery();
			break;

		case EXTRA_INFO_ID_CAPACITY:
			this.RebuildDispAreaCapacity();
			break;

		case EXTRA_INFO_ID_PHYSICAL_SPECIALIZE:
			this.RebuildDispAreaPhysicalSpecialize();
			break;

		case EXTRA_INFO_ID_MAGICAL_SPECIALIZE:
			this.RebuildDispAreaMagicalSpecialize();
			break;

		case EXTRA_INFO_ID_RESIST_ELEMENT:
			this.RebuildDispAreaResistElement();
			break;

		case EXTRA_INFO_ID_RESIST_DAMAGE:
			this.RebuildDispAreaResistDamage();
			break;

		case EXTRA_INFO_ID_RESIST_STATE:
			this.RebuildDispAreaResistState();
			break;

		case EXTRA_INFO_ID_RESIST_STATE_R_NEW:
			this.RebuildDispAreaResistStateR();
			break;

		case EXTRA_INFO_ID_CAST_AND_DELAY:
			this.RebuildDispAreaCastAndDelay();
			break;

		case EXTRA_INFO_ID_EXP:
			this.RebuildDispAreaExp();
			break;

		case EXTRA_INFO_ID_STATUS_SUM:
			this.RebuildDispAreaStatusSum();
			break;
		
		case EXTRA_INFO_ID_ALCHEMIST:
			this.RebuildDispAreaAlchemist();
			break;

		case EXTRA_INFO_ID_PVP_INFO:
			this.RebuildDispAreaPvPInfo();
			break;

		case EXTRA_INFO_ID_EFFECTIVE_SP:
			this.RebuildDispAreaEffectiveSp();
			break;

		default:
			this.RebuildDispAreaNone();
		}



		// 初期表示
		this.RefreshDispArea();

	};



	/**
	 * 表示エリアを再表示する.
	 */
	this.RefreshDispArea = function () {

		// 設定値の保持
		this.StoreSelectedValueAll();

		// 指定の種類に応じて再構築
		switch (this.selectedInfoId) {

		case EXTRA_INFO_ID_HEALING:
			this.RefreshDispAreaHealing();
			break;

		case EXTRA_INFO_ID_RECOVERY:
			this.RefreshDispAreaRecovery();
			break;

		case EXTRA_INFO_ID_CAPACITY:
			this.RefreshDispAreaCapacity();
			break;

		case EXTRA_INFO_ID_PHYSICAL_SPECIALIZE:
			this.RefreshDispAreaPhysicalSpecialize();
			break;

		case EXTRA_INFO_ID_MAGICAL_SPECIALIZE:
			this.RefreshDispAreaMagicalSpecialize();
			break;

		case EXTRA_INFO_ID_RESIST_ELEMENT:
			this.RefreshDispAreaResistElement();
			break;

		case EXTRA_INFO_ID_RESIST_DAMAGE:
			this.RefreshDispAreaResistDamage();
			break;

		case EXTRA_INFO_ID_RESIST_STATE:
			this.RefreshDispAreaResistState();
			break;

		case EXTRA_INFO_ID_RESIST_STATE_R_NEW:
			this.RefreshDispAreaResistStateR();
			break;

		case EXTRA_INFO_ID_CAST_AND_DELAY:
			this.RefreshDispAreaCastAndDelay();
			break;

		case EXTRA_INFO_ID_EXP:
			this.RefreshDispAreaExp();
			break;

		case EXTRA_INFO_ID_STATUS_SUM:
			this.RefreshDispAreaStatusSum();
			break;
		
		case EXTRA_INFO_ID_ALCHEMIST:
			this.RefreshDispAreaAlchemist();
			break;

		case EXTRA_INFO_ID_PVP_INFO:
			this.RefreshDispAreaPvPInfo();
			break;

		case EXTRA_INFO_ID_EFFECTIVE_SP:
			this.RefreshDispAreaEffectiveSp();
			break;

		default:
			this.RefreshDispAreaNone();
		}

	};





	//--------------------------------------------------------------------------------
	// 各拡張情報ごとの表示欄構築関数ここから
	//--------------------------------------------------------------------------------

	/**
	 * 拡張情報の表示欄を構築する（なし）.
	 */
	this.RebuildDispAreaNone = function () {

		var objRoot = null;

		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);
	};

	/**
	 * 拡張情報の表示欄を更新する（なし）.
	 */
	this.RefreshDispAreaNone = function () {

	};




	/**
	 * 拡張情報の表示欄を構築する（ヒール回復力）.
	 */
	this.RebuildDispAreaHealing = function () {
		var idx = 0;
		var healTypeArray = null;
		var healTargetArray = null;
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSelect = null;

		// 選択できるヒール種別をリストアップ
		healTypeArray = [];
		// ヒール
		healTypeArray.push([HEALTYPE_HEAL, SKILL_ID_HEAL]);
		// コルセオヒール
		if (IsSameJobClass(JOB_ID_ARCBISHOP)) {
			healTypeArray.push([HEALTYPE_COLUCEO_HEAL, SKILL_ID_COLUCEO_HEAL]);
		}
		// ハイネスヒール
		if (IsSameJobClass(JOB_ID_ARCBISHOP) || IsSameJobClass(JOB_ID_SHADOWCHASER)) {
			healTypeArray.push([HEALTYPE_HIGHNESS, SKILL_ID_HIGHNESS_HEAL]);
		}
		// サンクチュアリ（使用可能になる装備アリ）
		healTypeArray.push([HEALTYPE_SANCTUARY, SKILL_ID_SANCTUARY]);
		// ディレクティオヒール
		if (IsSameJobClass(JOB_ID_CARDINAL)) {
			healTypeArray.push([HEALTYPE_DILECTIO_HEAL, SKILL_ID_DILECTIO_HEAL]);
		}
		// 新鮮なエビ
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			healTypeArray.push([HEALTYPE_SHINSENNA_EBI, SKILL_ID_SHINSENNA_EBI]);
		}
		// エビ三昧
		if (IsSameJobClass(JOB_ID_SUMMONER)) {
			healTypeArray.push([HEALTYPE_EBI_ZANMAI, SKILL_ID_EBI_ZANMAI]);
		}
		// 守護符
		if (IsSameJobClass(MIG_JOB_ID_SOUL_ASCETIC)) {
			healTypeArray.push([HEALTYPE_SHUGO_FU, SKILL_ID_SHUGO_FU]);
		}
		// 城隍堂
		if (IsSameJobClass(MIG_JOB_ID_SOUL_ASCETIC)) {
			healTypeArray.push([HEALTYPE_ZYOKODO, SKILL_ID_ZYOKODO]);
		}
		// タートルスプリンクラー
		if (IsSameJobClass(MIG_JOB_ID_SPIRIT_HANDLER)) {
			healTypeArray.push([HEALTYPE_TURTLE_SPRINKLER, SKILL_ID_TURTLE_SPRINKLER]);
		}

		// 選択できる使用対象をリストアップ
		healTargetArray = [
			[HEAL_TARGETTYPE_SELF, "自分"],
			[HEAL_TARGETTYPE_PLAYER, "他人"],
		];

		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// セレクトボックスを構築

		// ヒール種別
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("スキル", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_HEAL_TYPE_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
		for (idx = 0; idx < healTypeArray.length; idx++) {
			HtmlCreateElementOption(healTypeArray[idx][0], SkillObjNew[healTypeArray[idx][1]][SKILL_DATA_INDEX_NAME], objSelect);
		}
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_TYPE_" + this.managerInstanceId, 0);

		// 対象の受けた効果UP
		if (HtmlGetObjectValueById("OBJID_SELECT_EXTRA_INFO_HEAL_TYPE_" + this.managerInstanceId, undefined) == HEALTYPE_COLUCEO_HEAL) {
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("PT人数", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_HEAL_PTM_COUNT_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 1; idx <= 12; idx++) {
				HtmlCreateElementOption(idx, idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_PTM_COUNT_" + this.managerInstanceId, 1);
		}

		// 使用対象
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("対象", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_HEAL_TARGET_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
		for (idx = 0; idx < healTargetArray.length; idx++) {
			HtmlCreateElementOption(healTargetArray[idx][0], healTargetArray[idx][1], objSelect);
		}
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_TARGET_" + this.managerInstanceId, 0);

		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（ヒール回復力）.
	 */
	this.RefreshDispAreaHealing = function () {
		var lv = 0;
		var lvMax = 0;
		var healType = 0;
		var healTarget = 0;
		var valueMinArray = [];
		var valueMaxArray = [];
		var valueText = "";
		var objIdActive = "";
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objActive = null;

		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------

		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_TYPE_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_TARGET_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HEAL_PTM_COUNT_" + this.managerInstanceId);

		//--------------------------------
		// コントロール再構築
		//--------------------------------
		objIdActive = "";

		objActive = document.activeElement;
		if (objActive) {
			objIdActive = objActive.getAttribute("id");
		}

		this.RebuildDispAreaHealing();

		objActive = document.getElementById(objIdActive);
		if (objActive) {
			objActive.focus();
		}

		//--------------------------------
		// ヒール種別、使用対象を取得する
		//--------------------------------

		healType = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_HEAL_TYPE_" + this.managerInstanceId, 0);
		healTarget = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_HEAL_TARGET_" + this.managerInstanceId, 0);
		ptmCount = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_HEAL_PTM_COUNT_" + this.managerInstanceId, 0);

		//--------------------------------
		// 回復量計算
		//--------------------------------
		if (healType == HEALTYPE_SANCTUARY) {
			// サンクチュアリの場合
			lvMax = 10;
			// 未整理
			for (i = 0; i<= 6; i++) {
				valueMinArray[i] = 100 * i;
			}
			valueMinArray[7] = valueMinArray[8] = valueMinArray[9] = valueMinArray[10] = 777;
			var w_BAI = 100 + n_tok[ITEM_SP_HEAL_UP_USING];
			const meditatio_lv = Math.max(LearnedSkillSearch(SKILL_ID_MEDITATIO), UsedSkillSearch(SKILL_ID_MEDITATIO));
			if (meditatio_lv > 0) {
				w_BAI -= meditatio_lv * 2;
			}
			for (i = 0; i <= 10; i++) {
				valueMinArray[i] = Math.floor(valueMinArray[i] * w_BAI / 100);
				if(healTarget == 0) {
					valueMinArray[i] = Math.floor(valueMinArray[i] * (100 + n_tok[ITEM_SP_HEAL_UP_USED]) / 100);
				}
				valueMaxArray[i] = valueMinArray[i];
			}
		} else {
			// 最大レベルを取得
			switch (healType) {
				case HEALTYPE_HEAL:
				case HEALTYPE_COLUCEO_HEAL:
					lvMax = 10;
					break;
				case HEALTYPE_DILECTIO_HEAL:
				case HEALTYPE_HIGHNESS:
				case HEALTYPE_SHINSENNA_EBI:
				case HEALTYPE_EBI_ZANMAI:
				case HEALTYPE_SHUGO_FU:
				case HEALTYPE_ZYOKODO:
					lvMax = 5;
					break;
				case HEALTYPE_TURTLE_SPRINKLER:
					lvMax = 7;
					break;
			}
			for (lv = 0; lv <= lvMax; lv++) {
				// HealCalc()関数は ro4/m/js/head.js で定義されています
				valueMinArray[lv] = HealCalc(lv, healType, 0, healTarget, ptmCount);
				valueMaxArray[lv] = HealCalc(lv, healType, 2, healTarget, ptmCount);
			}
		}

		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// レベルごとの表示
		for (lv = 1; lv <= lvMax; lv++) {

			// 表示テキストを調整
			if (valueMinArray[lv] == valueMaxArray[lv]) {
				valueText = valueMinArray[lv];
			}
			else {
				valueText = valueMinArray[lv] + "　～　" + valueMaxArray[lv];
			}

			// 表示組み立て
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan("Lv" + lv, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan(valueText, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		}

		// 補正表示
		if ((n_tok[ITEM_SP_HEAL_UP_USING] != 0) || (n_tok[ITEM_SP_HEAL_UP_USED] != 0)) {

			HtmlCreateElement("hr", objRoot);

			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			objTr = HtmlCreateElement("tr", objTbody);
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTd.setAttribute("colspan", "2");
			HtmlCreateTextSpan("装備等による増幅効果", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			if (n_tok[ITEM_SP_HEAL_UP_USING] != 0) {
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan("ヒールの回復力", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(n_tok[ITEM_SP_HEAL_UP_USING] + "%", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			if (n_tok[ITEM_SP_HEAL_UP_USED] != 0) {
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan("受けるヒールの回復力", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(n_tok[ITEM_SP_HEAL_UP_USED] + "%", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（回復力向上）.
	 */
	this.RebuildDispAreaRecovery = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// セレクトボックスを構築

		// HP回復力向上
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("HP回復力向上", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (learnSkillIdArray.indexOf(SKILL_ID_HP_KAIFUKURYOKU_KOZYO) < 0) {
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("（習得不能）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_HPR_UP_LV_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 0; idx <= g_skillManager.GetMaxLv(SKILL_ID_HP_KAIFUKURYOKU_KOZYO); idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HPR_UP_LV_" + this.managerInstanceId, 0);
		}

		// SP回復力向上
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("SP回復力向上", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (learnSkillIdArray.indexOf(SKILL_ID_SP_KAIFUKURYOKU_KOZYO) < 0) {
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("（習得不能）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_SPR_UP_LV_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 0; idx <= g_skillManager.GetMaxLv(SKILL_ID_SP_KAIFUKURYOKU_KOZYO); idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_SPR_UP_LV_" + this.managerInstanceId, 0);
		}

		// 息吹
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("息吹", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (learnSkillIdArray.indexOf(SKILL_ID_IBUKI) < 0) {
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("（習得不能）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_IBUKI_LV_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 0; idx <= g_skillManager.GetMaxLv(SKILL_ID_IBUKI); idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_IBUKI_LV_" + this.managerInstanceId, 0);
		}



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（回復力向上）.
	 */
	this.RefreshDispAreaRecovery = function () {

		var idx = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var valueTextArrayHP = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------

		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_HPR_UP_LV_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_SPR_UP_LV_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_IBUKI_LV_" + this.managerInstanceId);



		//--------------------------------
		// HP回復量計算
		//--------------------------------

		valueTextArrayHP = [];

		// HP回復力向上
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_HPR_UP_LV_" + this.managerInstanceId, 0);
		if (lv > 0) {
			typeText = "HP回復力向上";
			value = Math.floor((5 + CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_MAXHP] / 500) * lv);
			valueText = value + "/" + "10秒";
			valueTextArrayHP.push([typeText, valueText]);
		}

		// 息吹
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_IBUKI_LV_" + this.managerInstanceId, 0);
		if (lv > 0) {
			typeText = "息吹";
			value = Math.floor((4 + CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_MAXHP] / 500) * lv);
			valueText = value + "/" + "10秒";
			valueTextArrayHP.push([typeText, valueText]);
		}



		//--------------------------------
		// SP回復量計算
		//--------------------------------

		valueTextArraySP = [];

		// SP回復力向上
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_SPR_UP_LV_" + this.managerInstanceId, 0);
		if (lv > 0) {
			typeText = "SP回復力向上";
			value = Math.floor((3 + CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_MAXSP] / 500) * lv);
			valueText = value + "/" + "10秒";
			valueTextArraySP.push([typeText, valueText]);
		}

		// 息吹
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_IBUKI_LV_" + this.managerInstanceId, 0);
		if (lv > 0) {
			typeText = "息吹";
			value = Math.floor((2 + CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_MAXSP] / 500) * lv);
			valueText = value + "/" + "10秒";
			valueTextArraySP.push([typeText, valueText]);
		}




		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// HP回復
		HtmlCreateElement("hr", objRoot);

		HtmlCreateTextSpan("HP回復", objRoot, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (valueTextArrayHP.length == 0) {
			HtmlCreateElement("br", objRoot);
			HtmlCreateTextSpan("なし", objRoot, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		else {

			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			for (idx = 0; idx < valueTextArrayHP.length; idx++) {

				// 表示組み立て
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(valueTextArrayHP[idx][0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(valueTextArrayHP[idx][1], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}
		}

		// SP回復
		HtmlCreateElement("hr", objRoot);

		HtmlCreateTextSpan("SP回復", objRoot, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (valueTextArraySP.length == 0) {
			HtmlCreateElement("br", objRoot);
			HtmlCreateTextSpan("なし", objRoot, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		else {

			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			for (idx = 0; idx < valueTextArraySP.length; idx++) {

				// 表示組み立て
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(valueTextArraySP[idx][0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(valueTextArraySP[idx][1], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（所持限界量）.
	 */
	this.RebuildDispAreaCapacity = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// セレクトボックスを構築

		// 所持限界量増加
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("所持限界量増加", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		if (learnSkillIdArray.indexOf(SKILL_ID_SHOZIGENKAIRYO_ZOKA) < 0) {
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("（習得不能）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_LV_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 0; idx <= g_skillManager.GetMaxLv(SKILL_ID_SHOZIGENKAIRYO_ZOKA); idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_LV_" + this.managerInstanceId, 0);
		}

		// 所持限界量増加Ｒ
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("所持限界量増加Ｒ", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_R_LV_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
		for (idx = 0; idx <= g_skillManager.GetMaxLv(SKILL_ID_SHOZIGENKAIRYO_ZOKA_R); idx++) {
			HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
		}
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_R_LV_" + this.managerInstanceId, 0);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（所持限界量）.
	 */
	this.RefreshDispAreaCapacity = function () {
		var idx = 0;
		var lv = 0;
		var value = 0;
		var weightEquiped = 0;
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_LV_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_R_LV_" + this.managerInstanceId);
		//--------------------------------
		// 所持限界量計算
		//--------------------------------
		value = 2000;
		// 職業によるボーナス
		var jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB);
		value += jobData.GetWeightBonus();
		// 素ＳＴＲによるボーナス
		value += 30 * SU_STR;

		if (UsedSkillSearch(SKILL_ID_KIHE_SHUREN) > 0) {
			// ペコ・グリフォンに搭乗時
			value += 1000;
		} else if (UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) > 0) {
			// ドラゴンに搭乗時
			// ドラゴントレーニング習得Lv補正. UsedSkillSearch の方は'Lv0'の前に'未騎乗'が挿入されているのでオフセットを合わせている
			const dragon_training_lv = Math.max(LearnedSkillSearch(SKILL_ID_DRAGON_TRAINING), UsedSkillSearch(SKILL_ID_DRAGON_TRAINING) - 1);
			if (dragon_training_lv > 0) {
				value += 500 + 200 * dragon_training_lv;
			}
		}

		// 所持限界量増加
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_LV_" + this.managerInstanceId, 0);
		value += 200 * lv;
		// 所持限界量増加Ｒ
		lv = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_CAPACITY_UP_R_LV_" + this.managerInstanceId, 0);
		value += 200 * lv;
		//--------------------------------
		// 装備品重量合計計算
		//--------------------------------
		weightEquiped = 0;
		for (idx = 0; idx < EQUIP_REGION_ID_COUNT; idx++) {
			weightEquiped += ItemObjNew[n_A_Equip[idx]][ITEM_DATA_INDEX_WEIGHT];
		}
		//--------------------------------
		// HTML組み立て
		//--------------------------------
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);
		HtmlCreateElement("hr", objRoot);
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);
		// 所持限界量
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("所持限界量", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan(value, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		// 装備品重量合計
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("装備品重量合計", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan(weightEquiped, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
	};



	/**
	 * 拡張情報の表示欄を構築する（属性倍率）.
	 */
	this.RebuildDispAreaResistElement = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（属性倍率）.
	 */
	this.RefreshDispAreaResistElement = function () {

		var idx = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var resistValueArray = null;
		var resistValueArrayOver = null;
		var bodyElmRatioArray = null;
		var finalRatioArray = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSpan = null;



		//--------------------------------
		// 属性倍率計算
		//--------------------------------

		resistValueArray = [];
		resistValueArrayOver = [];
		bodyElmRatioArray = [];
		finalRatioArray = [];

		// 装備効果等による耐性
		for (idx = 0; idx < ELM_ID_COUNT; idx++) {
			resistValueArray[idx] = n_tok[ITEM_SP_RESIST_ELM_VANITY + idx];
			resistValueArrayOver[idx] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_ELM_VANITY + idx] - n_tok[ITEM_SP_RESIST_ELM_VANITY + idx]);
			bodyElmRatioArray[idx] = zokusei[n_A_BodyZokusei * 10 + 1][idx] + 100;
			finalRatioArray[idx] = bodyElmRatioArray[idx] - Math.floor(resistValueArray[idx] * bodyElmRatioArray[idx]) / 100;
		}




		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// ヘッダ行
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("属性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("属性耐性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("属性倍率", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("最終倍率", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		for (idx = 0; idx < ELM_ID_COUNT; idx++) {

			// 表示組み立て
			objTr = HtmlCreateElement("tr", objTbody);

			// 属性名
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");
			HtmlCreateTextSpan(GetElementText(idx), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 属性耐性
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (resistValueArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (resistValueArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(resistValueArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 超過分
			if (resistValueArrayOver[idx] > 0) {
				HtmlCreateElement("br", objTd);
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
				HtmlCreateTextSpan("[過 " + resistValueArrayOver[idx] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			// 属性倍率
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (bodyElmRatioArray[idx] < 100) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (bodyElmRatioArray[idx] > 100) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(bodyElmRatioArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 最終倍率
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (finalRatioArray[idx] < 100) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (finalRatioArray[idx] > 100) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(finalRatioArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（物理特化）.
	 */
	this.RebuildDispAreaPhysicalSpecialize = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（物理特化）.
	 */
	this.RefreshDispAreaPhysicalSpecialize = function () {

		var idx = 0;
		var idxRow = 0;
		var idxLoop = 0;
		var idxLabel = 0;
		var idxSpec = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var resistValueArray = null;
		var bodyElmRatioArray = null;
		var finalRatioArray = null;

		var loopData = null;
		var specArray = null;
		var loopDataArray = null;
		var createdCount = 0;
		var spanClassName = "";

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objTableChild = null;
		var objTbodyChild = null;
		var objTrChild = null;
		var objTdChild = null;
		var objSpan = null;



		//--------------------------------
		// ループ処理用データ作成
		//--------------------------------

		loopDataArray = [];		// 各要素は、[ラベル, 生成すべき行インデックス, rowspan, 色付けモード, specArray] で構成される


		// 種族欄
		specArray = [];

		for (idx = 0; idx < RACE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetRaceText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID + idx],
					"\\%",
				]
			);
			if (idx == RACE_ID_HUMAN) {
				specArray.push(
					[
						["（非PC）"],
						CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER],
						"(+\\%)",
					]
				);
			}
		}

		loopDataArray.push(["種族", 0, 4, 1, specArray]);


		// 敵属性欄
		specArray = [];

		for (idx = 0; idx < ELM_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetElementText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY + idx],
					"\\%",
				]
			);
		}

		loopDataArray.push(["敵属性", 0, 4, 1, specArray]);


		// サイズ欄
		specArray = [];

		for (idx = 0; idx < SIZE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetSizeText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL + idx],
					"\\%",
				]
			);
		}

		loopDataArray.push(["サイズ", 0, 1, 1, specArray]);


		// ボス欄
		specArray = [
			[["ボス"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS], "\\%"],
			[["一般"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS], "\\%"],
		];

		loopDataArray.push(["ボス", 1, 1, 1, specArray]);


		// 物理ＵＰ欄
		specArray = [
			[["物理"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP], "\\%"],
			[["近接物理"], CExtraInfoAreaComponentManager.specData[ITEM_SP_SHORTRANGE_DAMAGE_UP], "\\%"],
			[["遠距離"], CExtraInfoAreaComponentManager.specData[ITEM_SP_LONGRANGE_DAMAGE_UP], "\\%"],
			[["ｸﾘﾃｨｶﾙ"], CExtraInfoAreaComponentManager.specData[ITEM_SP_CRITICAL_DAMAGE_UP], "\\%"],
		];

		loopDataArray.push(["物理UP", 2, 1, 1, specArray]);


		// 対PC欄
		specArray = [
			[["すべて"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL], "\\%"],
			[["人間"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN], "\\%"],
			[["ドラム"], CExtraInfoAreaComponentManager.specData[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM], "\\%"],
		];

		loopDataArray.push(["対PC", 3, 1, 1, specArray]);


		// 防御無視欄
		specArray = [];

		for (idx = 0; idx < RACE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetRaceText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_DEF_RACE_SOLID + idx]
						+ CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_DEF_RACE_ALL]
						+ CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_DEF_ALL],
					"\\%",
				]
			);
		}
		specArray.push(
			[
				["錐効果"],
				CExtraInfoAreaComponentManager.specData[ITEM_SP_KIRI_EFFECT],
				(CExtraInfoAreaComponentManager.specData[ITEM_SP_KIRI_EFFECT] > 0 ? "あり" : "なし"),
			]
		);

		loopDataArray.push(["防御無視", 0, 3, 1, specArray]);

		// その他欄
		specArray = [];
		specArray.push(
			[
				["必中"],
				CExtraInfoAreaComponentManager.specData[ITEM_SP_PERFECT_ATTACK_UP],
				"\\%",
			]
		);		
		loopDataArray.push(["その他", 3, 1, 1, specArray]);





		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);


		// 行ごとにループ処理で生成
		createdCount = 0;

		for (idxRow = 0; createdCount < loopDataArray.length; idxRow++) {

			if (idxRow > 0) {
				objTr = HtmlCreateElement("tr", objTbody);
				objTd = HtmlCreateElement("td", objTr);
			}

			objTr = HtmlCreateElement("tr", objTbody);

			for (idxLoop = 0; idxLoop < loopDataArray.length; idxLoop++) {

				// ループ処理情報取得
				loopData = loopDataArray[idxLoop];

				// 生成すべき行インデックスが異なる場合は、次へ
				if (loopData[1] != idxRow) {
					continue;
				}

				// HTML生成
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_OUTER");
				if (loopData[2] > 1) {
					objTd.setAttribute("rowspan", loopData[2] * 2 - 1);
				}

				objTableChild = HtmlCreateElement("table", objTd);
				objTableChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objTableChild.setAttribute("style", "width : 100%;");
				objTbodyChild = HtmlCreateElement("tbody", objTableChild);

				objTrChild = HtmlCreateElement("tr", objTbodyChild);
				objTdChild = HtmlCreateElement("td", objTrChild);
				objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_TITLE");
				objTdChild.setAttribute("colspan", "2");
				objSpan = HtmlCreateElement("span", objTdChild);
				HtmlCreateTextSpan(loopData[0], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				specArray = loopData[4];

				for (idxSpec = 0; idxSpec < specArray.length; idxSpec++) {

					// 色付け判定
					spanClassName = "";
					if (specArray[idxSpec][1] > 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
					}
					else if (specArray[idxSpec][1] < 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
					}

					objTrChild = HtmlCreateElement("tr", objTbodyChild);

					objTdChild = HtmlCreateElement("td", objTrChild);
					objSpan = HtmlCreateElement("span", objTdChild);
					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					for (idxLabel = 0; idxLabel < specArray[idxSpec][0].length; idxLabel++) {
						if (idxLabel > 0) {
							HtmlCreateElement("br", objSpan);
						}
						HtmlCreateTextSpan(specArray[idxSpec][0][idxLabel], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}

					objTdChild = HtmlCreateElement("td", objTrChild);
					objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_VALUE");
					objSpan = HtmlCreateElement("span", objTdChild);
					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					if (specArray[idxSpec][2] == "\\%") {
						HtmlCreateTextSpan(specArray[idxSpec][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else if (specArray[idxSpec][2] == "(+\\%)") {
						HtmlCreateTextSpan("(" + ((specArray[idxSpec][1] >= 0) ? "+" : "-") + specArray[idxSpec][1] + "%" + ")", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else {
						HtmlCreateTextSpan(specArray[idxSpec][2], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
				}

				// 生成済み個数をインクリメント
				createdCount++;
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（魔法特化）.
	 */
	this.RebuildDispAreaMagicalSpecialize = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（魔法特化）.
	 */
	this.RefreshDispAreaMagicalSpecialize = function () {

		var idx = 0;
		var idxRow = 0;
		var idxLoop = 0;
		var idxLabel = 0;
		var idxSpec = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var resistValueArray = null;
		var bodyElmRatioArray = null;
		var finalRatioArray = null;

		var loopData = null;
		var specArray = null;
		var loopDataArray = null;
		var createdCount = 0;
		var spanClassName = "";

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objTableChild = null;
		var objTbodyChild = null;
		var objTrChild = null;
		var objTdChild = null;
		var objSpan = null;



		//--------------------------------
		// ループ処理用データ作成
		//--------------------------------

		loopDataArray = [];		// 各要素は、[ラベル, 生成すべき行インデックス, rowspan, 色付けモード, specArray] で構成される


		// 種族欄
		specArray = [];

		for (idx = 0; idx < RACE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetRaceText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID + idx],
					"\\%",
				]
			);
			if (idx == RACE_ID_HUMAN) {
				specArray.push(
					[
						["（非PC）"],
						CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER],
						"(+\\%)",
					]
				);
			}
		}

		loopDataArray.push(["種族", 0, 4, 1, specArray]);


		// 敵属性欄
		specArray = [];

		for (idx = 0; idx < ELM_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetElementText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY + idx],
					"\\%",
				]
			);
		}

		loopDataArray.push(["敵属性", 0, 4, 1, specArray]);


		// 属性魔法欄
		specArray = [];

		for (idx = 0; idx < ELM_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetElementText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY + idx],
					"\\%",
				]
			);
		}

		loopDataArray.push(["属性魔法", 0, 4, 1, specArray]);


		// サイズ欄
		specArray = [];

		for (idx = 0; idx < SIZE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetSizeText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL + idx],
					"\\%",
				]
			);
		}

		loopDataArray.push(["サイズ", 0, 1, 1, specArray]);


		// ボス欄
		specArray = [
			[["ボス"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_BOSS], "\\%"],
			[["一般"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS], "\\%"],
		];

		loopDataArray.push(["ボス", 1, 1, 1, specArray]);


		// 魔法ＵＰ欄
		specArray = [
			[["魔法"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP], "\\%"],
		];

		loopDataArray.push(["魔法UP", 2, 1, 1, specArray]);


		// 対PC欄
		specArray = [
			[["すべて"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL], "\\%"],
			[["人間"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN], "\\%"],
			[["ドラム"], CExtraInfoAreaComponentManager.specData[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM], "\\%"],
		];

		loopDataArray.push(["対PC", 3, 1, 1, specArray]);


		// 防御無視欄
		specArray = [];

		for (idx = 0; idx < RACE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetRaceText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_MDEF_RACE_SOLID + idx]
						+ CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_MDEF_RACE_ALL]
						+ CExtraInfoAreaComponentManager.specData[ITEM_SP_IGNORE_MDEF_ALL],
					"\\%",
				]
			);
		}

		loopDataArray.push(["防御無視", 0, 4, 1, specArray]);





		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);


		// 行ごとにループ処理で生成
		createdCount = 0;

		for (idxRow = 0; createdCount < loopDataArray.length; idxRow++) {

			if (idxRow > 0) {
				objTr = HtmlCreateElement("tr", objTbody);
				objTd = HtmlCreateElement("td", objTr);
			}

			objTr = HtmlCreateElement("tr", objTbody);

			for (idxLoop = 0; idxLoop < loopDataArray.length; idxLoop++) {

				// ループ処理情報取得
				loopData = loopDataArray[idxLoop];

				// 生成すべき行インデックスが異なる場合は、次へ
				if (loopData[1] != idxRow) {
					continue;
				}

				// HTML生成
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_MAGICAL_SPEC_OUTER");
				if (loopData[2] > 1) {
					objTd.setAttribute("rowspan", loopData[2] * 2 - 1);
				}

				objTableChild = HtmlCreateElement("table", objTd);
				objTableChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objTableChild.setAttribute("style", "width : 100%;");
				objTbodyChild = HtmlCreateElement("tbody", objTableChild);

				objTrChild = HtmlCreateElement("tr", objTbodyChild);
				objTdChild = HtmlCreateElement("td", objTrChild);
				objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_MAGICAL_SPEC_TITLE");
				objTdChild.setAttribute("colspan", "2");
				objSpan = HtmlCreateElement("span", objTdChild);
				HtmlCreateTextSpan(loopData[0], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				specArray = loopData[4];

				for (idxSpec = 0; idxSpec < specArray.length; idxSpec++) {

					// 色付け判定
					spanClassName = "";
					if (specArray[idxSpec][1] > 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
					}
					else if (specArray[idxSpec][1] < 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
					}

					objTrChild = HtmlCreateElement("tr", objTbodyChild);

					objTdChild = HtmlCreateElement("td", objTrChild);
					objSpan = HtmlCreateElement("span", objTdChild);
					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					for (idxLabel = 0; idxLabel < specArray[idxSpec][0].length; idxLabel++) {
						if (idxLabel > 0) {
							HtmlCreateElement("br", objSpan);
						}
						HtmlCreateTextSpan(specArray[idxSpec][0][idxLabel], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}

					objTdChild = HtmlCreateElement("td", objTrChild);
					objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_MAGICAL_SPEC_VALUE");
					objSpan = HtmlCreateElement("span", objTdChild);
					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					if (specArray[idxSpec][2] == "\\%") {
						HtmlCreateTextSpan(specArray[idxSpec][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else if (specArray[idxSpec][2] == "(+\\%)") {
						HtmlCreateTextSpan("(" + ((specArray[idxSpec][1] >= 0) ? "+" : "-") + specArray[idxSpec][1] + "%" + ")", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else {
						HtmlCreateTextSpan(specArray[idxSpec][2], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
				}

				// 生成済み個数をインクリメント
				createdCount++;
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（ダメージ耐性）.
	 */
	this.RebuildDispAreaResistDamage = function () {
		var idx = 0;
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（ダメージ耐性）.
	 */
	this.RefreshDispAreaResistDamage = function () {
		var idx = 0;
		var idxRow = 0;
		var idxLoop = 0;
		var idxLabel = 0;
		var idxSpec = 0;
		var lv = 0;
		var lvMax = 0;
		var value = 0;
		var typeText = "";
		var valueText = "";
		var resistValueArray = null;
		var bodyElmRatioArray = null;
		var finalRatioArray = null;
		var loopData = null;
		var specArray = null;
		var loopDataArray = null;
		var createdCount = 0;
		var spanClassName = "";
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objTableChild = null;
		var objTbodyChild = null;
		var objTrChild = null;
		var objTdChild = null;
		var objSpan = null;

		//--------------------------------
		// ループ処理用データ作成
		//--------------------------------
		loopDataArray = [];		// 各要素は、[ラベル, 生成すべき行インデックス, rowspan, 色付けモード, specArray] で構成される

		// 種族欄
		specArray = [];
		for (idx = 0; idx < RACE_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetRaceText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_RACE_SOLID + idx],
					"\\%",
				]
			);

			// 超過分
			value = n_tok_no_limit[ITEM_SP_RESIST_RACE_SOLID + idx] - n_tok[ITEM_SP_RESIST_RACE_SOLID + idx];
			if (value > 0) {
				specArray.push(
					[
						["[過 "],
						value,
						"+\\%]",
					]
				);
			}

			if (idx == RACE_ID_HUMAN) {
				specArray.push(
					[
						["（非PC）"],
						CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER],
						"(+\\%)",
					]
				);
			}
		}
		loopDataArray.push(["種族", 0, 4, 1, specArray]);

		// 敵属性欄
		specArray = [];
		for (idx = 0; idx < ELM_ID_COUNT; idx++) {
			specArray.push(
				[
					[GetElementText(idx)],
					CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_MONSTER_ELM_VANITY + idx],
					"\\%",
				]
			);

			// 超過分
			value = n_tok_no_limit[ITEM_SP_RESIST_MONSTER_ELM_VANITY + idx] - n_tok[ITEM_SP_RESIST_MONSTER_ELM_VANITY + idx];
			if (value > 0) {
				specArray.push(
					[
						["[過 "],
						value,
						"+\\%]",
					]
				);
			}
		}
		loopDataArray.push(["敵属性", 0, 4, 1, specArray]);

		// サイズ欄
		specArray = [];
		for (idx = 0; idx < SIZE_ID_COUNT; idx++) {
			// 物理・魔法共通耐性
			let size_ratio = n_tok[ITEM_SP_RESIST_SIZE_SMALL + idx];
			let over_size_ratio = n_tok_no_limit[ITEM_SP_RESIST_SIZE_SMALL + idx] - n_tok[ITEM_SP_RESIST_SIZE_SMALL + idx];			
			specArray.push(
				[
					[GetSizeText(idx)],
					size_ratio,
					"\\%",
				]
			);
			if (over_size_ratio > 0) {
				specArray.push(
					[
						["[過 "],
						over_size_ratio,
						"+\\%]",
					]
				);
			}
			// 物理攻撃だけに効くサイズ耐性
			if (n_tok[ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL + idx] > 0) {
				size_ratio += n_tok[ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL + idx];
				specArray.push(
					[
						["> 物理のみ"],
						size_ratio,
						"\\%",
					]
				);
			}
		}
		loopDataArray.push(["サイズ", 0, 1, 1, specArray]);

		// ボス欄
		specArray = [];
		specArray.push(
			[["ボス"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_BOSS], "\\%"]
		);
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_BOSS] - n_tok[ITEM_SP_RESIST_BOSS];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		specArray.push(
			[["一般"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_NOTBOSS], "\\%"]
		);
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_BOSS] - n_tok[ITEM_SP_RESIST_BOSS];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		loopDataArray.push(["ボス", 1, 1, 1, specArray]);

		// 特殊欄
		specArray = [
			[["遠距離"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_LONGRANGE], "\\%"],
			[["ﾉｯｸﾊﾞｯｸ"], CExtraInfoAreaComponentManager.specData[ITEM_SP_NEVER_KNOCK_BACK],(CExtraInfoAreaComponentManager.specData[ITEM_SP_NEVER_KNOCK_BACK] > 0 ? "無効" : "する")],
		];
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_LONGRANGE] - n_tok[ITEM_SP_RESIST_LONGRANGE];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		loopDataArray.push(["特殊", 2, 1, 1, specArray]);

		// 対PC欄
		specArray = [];
		specArray.push(
			[["すべて"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_PLAYER_ALL], "\\%"]
		);
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_PLAYER_ALL] - n_tok[ITEM_SP_RESIST_PLAYER_ALL];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		specArray.push(
			[["人間"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_PLAYER_HUMAN], "\\%"]
		);
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_PLAYER_HUMAN] - n_tok[ITEM_SP_RESIST_PLAYER_HUMAN];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		specArray.push(
			[["ドラム"], CExtraInfoAreaComponentManager.specData[ITEM_SP_RESIST_PLAYER_DORAM], "\\%"]
		);
		// 超過分
		value = n_tok_no_limit[ITEM_SP_RESIST_PLAYER_DORAM] - n_tok[ITEM_SP_RESIST_PLAYER_DORAM];
		if (value > 0) {
			specArray.push(
				[
					["[過 "],
					value,
					"+\\%]",
				]
			);
		}
		loopDataArray.push(["対PC", 3, 1, 1, specArray]);

		//--------------------------------
		// HTML組み立て
		//--------------------------------
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);
		// 行ごとにループ処理で生成
		createdCount = 0;
		for (idxRow = 0; createdCount < loopDataArray.length; idxRow++) {

			if (idxRow > 0) {
				objTr = HtmlCreateElement("tr", objTbody);
				objTd = HtmlCreateElement("td", objTr);
			}

			objTr = HtmlCreateElement("tr", objTbody);

			for (idxLoop = 0; idxLoop < loopDataArray.length; idxLoop++) {

				// ループ処理情報取得
				loopData = loopDataArray[idxLoop];

				// 生成すべき行インデックスが異なる場合は、次へ
				if (loopData[1] != idxRow) {
					continue;
				}

				// HTML生成
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_OUTER");
				if (loopData[2] > 1) {
					objTd.setAttribute("rowspan", loopData[2] * 2 - 1);
				}

				objTableChild = HtmlCreateElement("table", objTd);
				objTableChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objTableChild.setAttribute("style", "width : 100%;");
				objTbodyChild = HtmlCreateElement("tbody", objTableChild);

				objTrChild = HtmlCreateElement("tr", objTbodyChild);
				objTdChild = HtmlCreateElement("td", objTrChild);
				objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_TITLE");
				objTdChild.setAttribute("colspan", "2");
				objSpan = HtmlCreateElement("span", objTdChild);
				HtmlCreateTextSpan(loopData[0], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				specArray = loopData[4];

				for (idxSpec = 0; idxSpec < specArray.length; idxSpec++) {

					// 色付け判定
					spanClassName = "";
					if (specArray[idxSpec][1] > 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
					}
					else if (specArray[idxSpec][1] < 0) {
						if (loopData[3] > 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_RED";
						}
						else if (loopData[3] < 0) {
							spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
						}
					}

					objTrChild = HtmlCreateElement("tr", objTbodyChild);

					objTdChild = HtmlCreateElement("td", objTrChild);
					objSpan = HtmlCreateElement("span", objTdChild);

					// 超過行特殊処理
					if (specArray[idxSpec][2] == "+\\%]") {
						objTdChild.setAttribute("colspan", "2");
						objTdChild.setAttribute("style", "text-align: right;");
						objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");

						HtmlCreateTextSpan(specArray[idxSpec][0][0] + specArray[idxSpec][1] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
						continue;
					}

					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					for (idxLabel = 0; idxLabel < specArray[idxSpec][0].length; idxLabel++) {
						if (idxLabel > 0) {
							HtmlCreateElement("br", objSpan);
						}
						HtmlCreateTextSpan(specArray[idxSpec][0][idxLabel], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}

					objTdChild = HtmlCreateElement("td", objTrChild);
					objTdChild.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_PHYSICAL_SPEC_VALUE");
					objSpan = HtmlCreateElement("span", objTdChild);
					if (spanClassName != "") {
						objSpan.setAttribute("class", spanClassName);
					}
					if (specArray[idxSpec][2] == "\\%") {
						HtmlCreateTextSpan(specArray[idxSpec][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else if (specArray[idxSpec][2] == "(+\\%)") {
						HtmlCreateTextSpan("(" + ((specArray[idxSpec][1] >= 0) ? "+" : "") + specArray[idxSpec][1] + "%" + ")", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else {
						HtmlCreateTextSpan(specArray[idxSpec][2], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
				}

				// 生成済み個数をインクリメント
				createdCount++;
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（状態異常耐性）.
	 */
	this.RebuildDispAreaResistState = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（状態異常耐性）.
	 */
	this.RefreshDispAreaResistState = function () {

		var idx = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var equipValueArray = null;
		var paramValueArray = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSpan = null;



		//--------------------------------
		// 状態異常耐性計算
		//--------------------------------

		equipValueArray = [];
		paramValueArray = [];

		// 装備効果等による耐性
		for (idx = 0; idx <= STATE_ID_STONE; idx++) {

			equipValueArray[idx] = n_tok[ITEM_SP_RESIST_STATE_POISON + idx];

			switch (idx) {

			case STATE_ID_SLEEP:
			case STATE_ID_BLEEDING:
				paramValueArray[idx] = n_A_AGI;
				break;

			case STATE_ID_POISON:
			case STATE_ID_STUN:
				paramValueArray[idx] = n_A_VIT;
				break;

			case STATE_ID_BLIND:
			case STATE_ID_SILENCE:
				paramValueArray[idx] = n_A_INT;
				break;

			case STATE_ID_CURSED:
			case STATE_ID_CONFUSE:
				paramValueArray[idx] = n_A_LUK;
				break;

			case STATE_ID_FROZEN:
			case STATE_ID_STONE:
				paramValueArray[idx] = CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_MDEF_DIV_IGNORE_BUFF];
				break;

			default:
				paramValueArray[idx] = 0;
				break;
			}
		}

		// 不死属性付与による、凍結、石化耐性
		if (n_A_BodyZokusei == ELM_ID_UNDEAD) {
			equipValueArray[STATE_ID_FROZEN] = 100;
			equipValueArray[STATE_ID_STONE] = 100;
		}

		// LUK0 による呪い完全耐性
		if(n_A_LUK == 0) {
			paramValueArray[STATE_ID_CURSED] = 100;
		}



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// ヘッダ行
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("異常", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("装備耐性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ステ耐性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 石化まで表示
		for (idx = 0; idx <= STATE_ID_STONE; idx++) {

			// 表示組み立て
			objTr = HtmlCreateElement("tr", objTbody);

			// 状態異常名
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");
			HtmlCreateTextSpan(GetStateText(idx), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 装備耐性
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (equipValueArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (equipValueArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(equipValueArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			// ステ耐性
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (paramValueArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (paramValueArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(paramValueArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（新状態異常耐性）.
	 */
	this.RebuildDispAreaResistStateR = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（新状態異常耐性）.
	 */
	this.RefreshDispAreaResistStateR = function () {

		var idx = 0;

		var lv = 0;
		var lvMax = 0;
		var value = 0;

		var typeText = "";
		var valueText = "";
		var equipValueArray = null;
		var paramValueArray = null;
		var paramTimeArray = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSpan = null;



		//--------------------------------
		// 状態異常耐性計算
		//--------------------------------

		equipValueArray = [];
		paramValueArray = [];
		paramTimeArray = [];

		// 装備効果等による耐性 Rの新状態異常、新状態異常に対応
		for (idx = STATE_R_ID_CHILLED; idx < STATE_ID_COUNT; idx++) {

			equipValueArray[idx] = n_tok[ITEM_SP_RESIST_STATE_R_CHILLED + (idx-STATE_R_ID_CHILLED)];

			switch (idx) {

			case STATE_R_ID_CHILLED: // 冷凍
				// ステ耐性 なし
				paramValueArray[idx] = 0;
				//効果の持続時間(最大２０秒)
				paramTimeArray[idx] = 20 - n_A_VIT / 10;
				break;

			case STATE_R_ID_IGNITION: // 発火
				// ステ耐性 BaseLv / 600 + Agi / 500
				paramValueArray[idx] = n_A_BaseLV / 600 + n_A_AGI / 500;
				//効果の持続時間(最小１０秒)
				paramTimeArray[idx] = 22 - (0.04 * (n_A_BaseLV - 1)) - (0.04 * (n_A_AGI - 1));
				paramTimeArray[idx] = (paramTimeArray[idx] >= 10.0) ? paramTimeArray[idx] : 10.0;
				break;

			case STATE_R_ID_ICED: // 氷結
				// ステ耐性 なし
				paramValueArray[idx] = 0;
				//効果の持続時間(最小３４秒)
				paramTimeArray[idx] = 40 - (0.0479 * (n_A_VIT - 1));
				paramTimeArray[idx] = (paramTimeArray[idx] >= 34.0) ? paramTimeArray[idx] : 34.0;
				break;

			case STATE_R_ID_FEAR: // 恐怖
				// ステ耐性 BaseLv / 5 + Int / 5
				paramValueArray[idx] = n_A_BaseLV / 5 + n_A_INT / 5;
				// 持続時間 ドラゴンハウリング (22 sec) を想定
				paramTimeArray[idx] = 22 - (0.0365 * (n_A_BaseLV - 1)) - (0.0365 * (n_A_INT - 1));
				break;

			case STATE_R_ID_DEEPSLEEP: // 深い眠り
				// ステ耐性
				paramValueArray[idx] = n_A_INT / 6 + n_A_LUK / 10;
				//効果の持続時間()
				paramTimeArray[idx] = 16 - (0.049 * (n_A_BaseLV - 1)) - (0.0255 * (n_A_INT - 1));
				paramTimeArray[idx] = (paramTimeArray[idx] >= 1.77) ? paramTimeArray[idx] : 1.77;
				break;
			
			case STATE_R_ID_CHARMED: // 魅了
				// ステ耐性 不明
				paramValueArray[idx] = 0;
				// 持続時間 セイレーンの声Lv5 (27 sec) を想定
				paramTimeArray[idx] = 27; // BaseLv と JobLv で時間短縮
				break;
			
			case STATE_R_ID_FRENZY:	// 狂乱
				// ステ耐性 不明
				paramValueArray[idx] = 0;
				// 持続時間 フライデーナイトフィーバーLv5 (30 sec) を想定
				paramTimeArray[idx] = 30;	// 時間短縮ステータス不明
				break;
			
			case STATE_R_ID_HOWLING: // 精神衝撃
				paramValueArray[idx] = (n_A_VIT + n_A_LUK) / 5;
				// 持続時間 HoM Lv5 (30 sec) を想定
				paramTimeArray[idx] = 30;	// 時間短縮ステータスなし
				break;
			
			case STATE_NEW_ID_LETHARGY://無気力
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのPOWにより減少する
				paramTimeArray[idx] = 0;
				break;

			case STATE_NEW_ID_JETBLACK://漆黒
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのSTAにより減少する
				paramTimeArray[idx] = 0;
				break;

				case STATE_NEW_ID_HIGHLYPOISONOUS://強毒
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのSTAにより2秒まで減少する
				paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_STA / 10));
				break;

			case STATE_NEW_ID_TORRENT://激流
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのWISにより2秒まで減少する
				paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_WIS / 10));
				break;

			case STATE_NEW_ID_MELANCHOLY://憂鬱
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのWISにより減少する
				paramTimeArray[idx] = 0;
				break;

			case STATE_NEW_ID_STILLNESS://静寂
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのSPLにより減少する
				paramTimeArray[idx] = 0;
				break;

			case STATE_NEW_ID_CONFLAGRATION://火災
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのSPLにより2秒まで減少する
				paramTimeArray[idx] = Math.max(2, 9 - Math.floor(n_A_SPL / 10));
				break;

			case STATE_NEW_ID_RAPIDCOOLING://急冷
			case STATE_NEW_ID_CRYSTALLIZATION://結晶化
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのCRTにより3秒まで減少する
				paramTimeArray[idx] = Math.max(3, 10 - Math.floor(n_A_CRT / 10));
				break;

			case STATE_NEW_ID_UNHAPPINESS://不幸
				// 耐性は術者とターゲットのBaseLv差による
				paramValueArray[idx] = 0;
				// 持続時間はターゲットのCRTにより減少する
				paramTimeArray[idx] = 0;
				break;
			
			default:
				paramValueArray[idx] = 0;
				break;
			}
			if (equipValueArray[idx] >= 100) {
				paramTimeArray[idx] = 0;//装備耐性１００％の場合、持続時間０秒にする
			}
			paramValueArray[idx] = Math.floor(paramValueArray[idx]);
			paramTimeArray[idx] = Math.floor(paramTimeArray[idx] * 100) / 100;//小数点以下２桁まで残し切り捨て
		}



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateTextSpan("開発中のため参考程度に留めて下さい", objRoot, "CSSCLS_GENERAL_COLOR_RED");

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// ヘッダ行
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("異常", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("装備耐性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ステ耐性", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("持続時間", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);


		//
		// 冷凍から不幸まで表示
		for (idx = STATE_R_ID_CHILLED; idx <= STATE_NEW_ID_UNHAPPINESS; idx++) {

			// 表示組み立て
			objTr = HtmlCreateElement("tr", objTbody);

			// 状態異常名
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");
			HtmlCreateTextSpan(GetStateText(idx), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 装備耐性
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (equipValueArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (equipValueArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(equipValueArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			// ステ耐性
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (paramValueArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (paramValueArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}
			HtmlCreateTextSpan(paramValueArray[idx] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			// 持続時間
			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RESIST_ELEMENT");

			objSpan = HtmlCreateElement("span", objTd);
			if (paramTimeArray[idx] > 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			}
			else if (paramTimeArray[idx] < 0) {
				objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			}

			HtmlCreateTextSpan(paramTimeArray[idx] + "秒", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		}
	};



	/**
	 * 拡張情報の表示欄を構築する（詠唱/ディレイ）.
	 */
	this.RebuildDispAreaCastAndDelay = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（詠唱/ディレイ）.
	 */
	this.RefreshDispAreaCastAndDelay = function () {

		var idx = 0;
		var idxTd = 0;

		var value = 0;
		var valueText = "";
		var funcSelectData = null;
		var loopDataArrayGeneral = 0;
		var loopDataArrayActive = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSpan = null;





		//--------------------------------
		// ループ処理用データ作成
		//--------------------------------

		funcSelectData = function (valueF, threshF, dataLowerF, dataEqualF, dataHigherF) {
			if (valueF > threshF) {
				return dataHigherF;
			}
			else if (valueF < threshF) {
				return dataLowerF;
			}

			return dataEqualF;
		};


		//----------------
		// 全般
		//----------------

		loopDataArrayGeneral = [];

		// 変動詠唱時間
		value = Math.round(g_VariableCastTimeRate * 10000) / 100;
		spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = value + "%";
		loopDataArrayGeneral.push(
			[
				["", "変動詠唱時間"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// 装備効果
		value = n_CastCutForDisp - 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "%短縮）", "0%）", Math.abs(value) + "%増加）");
		loopDataArrayGeneral.push(
			[
				[spanClassName, "（装備効果"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);

		// 固定詠唱時間
		value = Math.round((100 - n_A_Kotei_Cast_Keigen) * 100) / 100;
		spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = value + "%";
		loopDataArrayGeneral.push(
			[
				["", "固定詠唱時間"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// ディレイ時間
		value = Math.round((100 - CExtraInfoAreaComponentManager.specData[ITEM_SP_SKILL_DELAY_DOWN]) * 100) / 100;
		spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = value + "%";
		if (delayDownForDisp > 100) {
			valueText += " ";
			valueText += "(実合計：" + Math.round((100 - delayDownForDisp) * 100) / 100 +"%)";
		}
		loopDataArrayGeneral.push(
			[
				["", "ディレイ時間"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// ＳＰ消費量
		// TODO: この意味不明な計算どうにかしたい
		if ((CExtraInfoAreaComponentManager.specData[ITEM_SP_COST_DOWN] >= 0) || (CExtraInfoAreaComponentManager.specData[ITEM_SP_COST_DOWN] == -100)) {

			value = CExtraInfoAreaComponentManager.specData[ITEM_SP_COST_DOWN];

			if (value < 0) {
				value = Math.abs(value) * 1.25;
			}

			spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			valueText = value + "%";
		}
		else{

			value = CExtraInfoAreaComponentManager.specData[ITEM_SP_COST_DOWN];
			value = Math.ceil(Math.abs(value) * 1.25);

			spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
			valueText = funcSelectData(value, 100, "約" + value + "%", "100%", "約" + value + "%");
		}
		if (costDownForDisp > 100) {
			valueText += " ";
			valueText += "(実合計：" + Math.round((100 - costDownForDisp) * 100) / 100 +"%)";
		}
		loopDataArrayGeneral.push(
			[
				["", "ＳＰ消費量"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// ステ無詠唱
		value = CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_CAST_PARAM];
		spanClassName = funcSelectData(value, CAST_PARAM_BORDER, "", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
		valueText = funcSelectData(value, CAST_PARAM_BORDER, value + " (< " + CAST_PARAM_BORDER + ")", value + " (>= " + CAST_PARAM_BORDER + ")", value + " (>= " + CAST_PARAM_BORDER + ")");
		loopDataArrayGeneral.push(
			[
				["", "INT/2+DEX"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// コンボ短縮
		value = CExtraInfoAreaComponentManager.charaData[CHARA_DATA_INDEX_COMBO_PARAM];
		spanClassName = "";
		valueText = value + " ms";
		loopDataArrayGeneral.push(
			[
				["", "コンボ短縮"],
				["", ":"],
				["", valueText],
			]
		);

		// 詠唱妨害
		valueText = "される";
		spanClassName = "";
		if (CExtraInfoAreaComponentManager.specData[ITEM_SP_NEVER_CAST_CANCEL] > 0) {
			valueText = "されない";
			spanClassName = "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE";
		}
		loopDataArrayGeneral.push(
			[
				["", "詠唱中断"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		//----------------
		// 選択中のスキル
		//----------------

		loopDataArrayActive = [];

		// 変動詠唱時間
		value = Math.max(0, GetCastScalingOfSkillForCastTimeVary(n_A_ActiveSkill));
		value = Math.round((g_VariableCastTimeRate * value / 100) * 10000) / 100;
		spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = value + "%";
		loopDataArrayActive.push(
			[
				["", "変動詠唱時間"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// 装備効果
		value = GetCastScalingOfSkillForCastTimeVary(n_A_ActiveSkill) - 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "%短縮）", "0%）", Math.abs(value) + "%増加）");
		loopDataArrayActive.push(
			[
				[spanClassName, "（装備効果"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);

		// 固定増減
		value = Math.round(GetCastFixOfSkillForCastTimeVary(n_A_ActiveSkill) / 10) / 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "秒短縮）", "±0.00秒）", Math.abs(value) + "秒増加）");
		loopDataArrayActive.push(
			[
				[spanClassName, "（固定増減"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);

		// 固定詠唱時間
		value = Math.max(0, GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill));
		value = Math.max(0, value - n_A_Kotei_Cast_Keigen);
		spanClassName = funcSelectData(value, 100, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = value + "%";
		loopDataArrayActive.push(
			[
				["", "固定詠唱時間"],
				["", ":"],
				[spanClassName, valueText],
			]
		);

		// 装備効果
		value = GetCastScalingOfSkillForCastTimeFixed(n_A_ActiveSkill) - 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "%短縮）", "0%）", Math.abs(value) + "%増加）");
		loopDataArrayActive.push(
			[
				[spanClassName, "（装備効果"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);

		// 固定増減
		value = GetCastFixOfSkillForCastTimeFixed(n_A_ActiveSkill);
		value -= CExtraInfoAreaComponentManager.specData[ITEM_SP_SKILL_FIXED_MINUS];
		value = Math.round(value / 10) / 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "秒短縮）", "±0.00秒）", Math.abs(value) + "秒増加）");
		loopDataArrayActive.push(
			[
				[spanClassName, "（固定増減"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);

		// クールタイム
		// 現状、固定増減しかないので、この行は空行
		loopDataArrayActive.push(
			[
				["", "クールタイム"],
				["", ":"],
				["", ""],
			]
		);

		// 固定増減
		value = GetCoolFixOfSkill(n_A_ActiveSkill);
		value = Math.round(value / 10) / 100;
		spanClassName = funcSelectData(value, 0, "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_RED");
		valueText = funcSelectData(value, 0, Math.abs(value) + "秒短縮）", "±0.00秒）", Math.abs(value) + "秒増加）");
		loopDataArrayActive.push(
			[
				[spanClassName, "（固定増減"],
				[spanClassName, ":"],
				[spanClassName, valueText],
			]
		);





		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTbody = HtmlCreateElement("tbody", objTable);


		// 全般
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("colspan", "4");
		HtmlCreateTextSpan("全般", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		for (idx = 0; idx < loopDataArrayGeneral.length; idx++) {

			objTr = HtmlCreateElement("tr", objTbody);

			// スペーサ
			if (idx == 0) {
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("rowspan", loopDataArrayGeneral.length);
				HtmlCreateTextSpan("　", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			for (idxTd = 0; idxTd < loopDataArrayGeneral[idx].length; idxTd++) {
				objTd = HtmlCreateElement("td", objTr);
				objSpan = HtmlCreateElement("span", objTd);
				if (loopDataArrayGeneral[idx][idxTd][0] != "") {
					objSpan.setAttribute("class", loopDataArrayGeneral[idx][idxTd][0]);
				}
				HtmlCreateTextSpan(loopDataArrayGeneral[idx][idxTd][1], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}
		}


		// 選択中のスキル
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("colspan", "4");
		HtmlCreateTextSpan(SkillObjNew[n_A_ActiveSkill][SKILL_DATA_INDEX_NAME], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		for (idx = 0; idx < loopDataArrayActive.length; idx++) {

			objTr = HtmlCreateElement("tr", objTbody);

			// スペーサ
			if (idx == 0) {
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("rowspan", loopDataArrayActive.length);
				HtmlCreateTextSpan("　", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			for (idxTd = 0; idxTd < loopDataArrayActive[idx].length; idxTd++) {
				objTd = HtmlCreateElement("td", objTr);
				objSpan = HtmlCreateElement("span", objTd);
				if (loopDataArrayActive[idx][idxTd][0] != "") {
					objSpan.setAttribute("class", loopDataArrayActive[idx][idxTd][0]);
				}
				HtmlCreateTextSpan(loopDataArrayActive[idx][idxTd][1], objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（経験値）.
	 */
	this.RebuildDispAreaExp = function () {

		var idx = 0;

		var lvMax = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// セレクトボックスを構築


		// ベース経験値
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("ベース", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("Lv" + n_A_BaseLV, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_BASE_EXP_GAUGE_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
		for (idx = 0; idx < 1000; idx++) {
			HtmlCreateElementOption(idx, Math.floor(idx / 10) + "." + (idx % 10), objSelect);
		}
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_BASE_EXP_GAUGE_" + this.managerInstanceId, 0);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("%", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("目標", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);

		lvMax = GetBaseLevelMax(n_A_JOB);

		if (n_A_BaseLV == lvMax) {
			HtmlCreateTextSpan("（Lv上限）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_BASE_LV_FOCUS_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = n_A_BaseLV + 1; idx <= lvMax; idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_BASE_LV_FOCUS_" + this.managerInstanceId, n_A_BaseLV + 1);
		}


		// ジョブ経験値
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("ジョブ", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("Lv" + n_A_JobLV, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_JOB_EXP_GAUGE_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
		for (idx = 0; idx < 1000; idx++) {
			HtmlCreateElementOption(idx, Math.floor(idx / 10) + "." + (idx % 10), objSelect);
		}
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_JOB_EXP_GAUGE_" + this.managerInstanceId, 0);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("%", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("目標", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);

		lvMax = GetJobLevelMax(n_A_JOB);

		if (n_A_JobLV == lvMax) {
			HtmlCreateTextSpan("（Lv上限）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
		else {
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_JOB_LV_FOCUS_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = n_A_JobLV + 1; idx <= lvMax; idx++) {
				HtmlCreateElementOption(idx, "Lv" + idx, objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_JOB_LV_FOCUS_" + this.managerInstanceId, n_A_JobLV + 1);
		}



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "6");
	};

	/**
	 * 拡張情報の表示欄を更新する（経験値）.
	 */
	this.RefreshDispAreaExp = function () {

		var idx = 0;

		var value = 0;

		var lvMax = 0;
		var lvFocus = 0;
		var expNow = 0;
		var expToNext = 0;
		var mobCountToNext = 0;
		var mobCountToFocused = 0;

		// 必要討伐数計算用
		var wkRefExpTable = null;
		var wkMobExp = 0;
		var wkExpNow = 0;
		var wkExpLvUp = 0;
		var wkMobCount = 0;

		// 出力データ用
		var lvFocusBase = 0;
		var expToNextBase = 0;
		var expToFocusedBase = 0;
		var mobCountToNextBase = 0;
		var mobCountToFocusedBase = 0;
		var lvFocusJob = 0;
		var expToNextJob = 0;
		var expToFocusedJob = 0;
		var mobCountToNextJob = 0;
		var mobCountToFocusedJob = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------

		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_BASE_EXP_GAUGE_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_BASE_LV_FOCUS_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_JOB_EXP_GAUGE_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_JOB_LV_FOCUS_" + this.managerInstanceId);



		//--------------------------------
		// ベース経験値計算
		//--------------------------------

		lvFocusBase = 0;
		expToNextBase = 0;
		expToFocusedBase = 0;
		mobCountToNextBase = 0;
		mobCountToFocusedBase = 0;

		lvMax = GetBaseLevelMax(n_A_JOB);
		var jobData = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB);

		if(n_A_BaseLV < lvMax) {

			// 参照先切り替え
			wkRefExpTable = GetBaseExpTable(jobData.GetBaseExpTableId());

			wkMobExp = CExtraInfoAreaComponentManager.mobData[MONSTER_DATA_INDEX_BASE_EXP];

			// 経験値情報を取得
			expNow = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_BASE_EXP_GAUGE_" + this.managerInstanceId, 0);
			expNow = Math.floor(wkRefExpTable[n_A_BaseLV] * expNow / 1000);

			expToNextBase = wkRefExpTable[n_A_BaseLV] - expNow;

			// 目標レベルを取得
			lvFocusBase = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_BASE_LV_FOCUS_" + this.managerInstanceId, lvMax);

			// 必要討伐数を算出
			wkExpNow = expNow;

			if ((n_A_BaseLV > 1) && (wkMobExp == 0)) {
				mobCountToNextBase = -1;
				mobCountToFocusedBase = -1;
			}
			else {
				mobCountToFocusedBase = 0;

				for (idx = n_A_BaseLV; idx < lvFocusBase; idx++) {

					// 次のレベルまでに必要な経験値を取得
					wkExpLvUp = wkRefExpTable[idx];

					// 累積必要経験値に加算
					expToFocusedBase += wkExpLvUp;

					// 次のレベルまでに必要な討伐数を計算
					wkMobCount = Math.ceil((wkExpLvUp - wkExpNow) / wkMobExp);

					// 現在のレベルから次のレベルまでの討伐数は別途保持する
					if (idx == n_A_BaseLV) {
						mobCountToNextBase = wkMobCount;
					}

					// 累計討伐数に加算
					mobCountToFocusedBase += wkMobCount;

					// 累積経験値を加算
					wkExpNow += wkMobExp * wkMobCount;

					// レベルアップ分の経験値を減算
					wkExpNow -= wkExpLvUp;

					// 一度に獲得できる経験値の上限補正
					wkExpNow = Math.min(wkExpLvUp - 1, wkExpNow)
				}

				// 累積必要経験値から現在の経験値を減算
				expToFocusedBase -= expNow;
			}
		}



		//--------------------------------
		// ジョブ経験値計算
		//--------------------------------

		lvFocusJob = 0;
		expToNextJob = 0;
		mobCountToNextJob = 0;
		mobCountToFocusedJob = 0;

		lvMax = GetJobLevelMax(n_A_JOB);

		if(n_A_JobLV < lvMax) {

			// 参照先切り替え
			wkRefExpTable = GetJobExpTable(jobData.GetJobExpTableId());
			wkMobExp = CExtraInfoAreaComponentManager.mobData[MONSTER_DATA_INDEX_JOB_EXP];

			// 経験値情報を取得
			expNow = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_JOB_EXP_GAUGE_" + this.managerInstanceId, 0);
			expNow = Math.floor(wkRefExpTable[n_A_JobLV] * expNow / 1000);

			expToNextJob = wkRefExpTable[n_A_JobLV] - expNow;

			// 目標レベルを取得
			lvFocusJob = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_JOB_LV_FOCUS_" + this.managerInstanceId, lvMax);

			// 必要討伐数を算出
			wkExpNow = expNow;

			if ((n_A_JobLV > 1) && (wkMobExp == 0)) {
				mobCountToNextJob = -1;
				mobCountToFocusedJob = -1;
			}
			else {
				mobCountToFocusedJob = 0;

				for (idx = n_A_JobLV; idx < lvFocusJob; idx++) {

					// 次のレベルまでに必要な経験値を取得
					wkExpLvUp = wkRefExpTable[idx];

					// 累積必要経験値に加算
					expToFocusedJob += wkExpLvUp;

					// 次のレベルまでに必要な討伐数を計算
					wkMobCount = Math.ceil((wkExpLvUp - wkExpNow) / wkMobExp);

					// 現在のレベルから次のレベルまでの討伐数は別途保持する
					if (idx == n_A_JobLV) {
						mobCountToNextJob = wkMobCount;
					}

					// 累計討伐数に加算
					mobCountToFocusedJob += wkMobCount;

					// 累積経験値を加算
					wkExpNow += wkMobExp * wkMobCount;

					// レベルアップ分の経験値を減算
					wkExpNow -= wkExpLvUp;

					// 一度に獲得できる経験値の上限補正
					wkExpNow = Math.min(wkExpLvUp - 1, wkExpNow)
				}

				// 累積必要経験値から現在の経験値を減算
				expToFocusedJob -= expNow;
			}
		}



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);



		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);


		// モンスター情報
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("colspan", "2");
		HtmlCreateTextSpan(CExtraInfoAreaComponentManager.mobData[MONSTER_DATA_INDEX_NAME], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ベース経験値", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan(DivideDigits3("" + CExtraInfoAreaComponentManager.mobData[MONSTER_DATA_INDEX_BASE_EXP]), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ジョブ経験値", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan(DivideDigits3("" + CExtraInfoAreaComponentManager.mobData[MONSTER_DATA_INDEX_JOB_EXP]), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);



		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// ベース経験値
		if ((n_A_BaseLV == 1) || (expToNextBase > 0)) {

			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTd.setAttribute("rowspan", "2");
			HtmlCreateTextSpan("ベース", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan("次まで", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan(DivideDigits3("" + expToNextBase), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objTd);
			HtmlCreateTextSpan("（" + DivideDigits3("" + mobCountToNextBase) + "匹" + "）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan("Lv" + lvFocusBase + "まで", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan(DivideDigits3("" + expToFocusedBase), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objTd);
			HtmlCreateTextSpan("（" + DivideDigits3("" + mobCountToFocusedBase) + "匹" + "）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}


		// ジョブ経験値
		if ((n_A_JobLV == 1) || (expToNextJob > 0)) {
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTd.setAttribute("rowspan", "2");
			HtmlCreateTextSpan("ジョブ", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan("次まで", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan(DivideDigits3("" + expToNextJob), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objTd);
			HtmlCreateTextSpan("（" + DivideDigits3("" + mobCountToNextJob) + "匹" + "）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan("Lv" + lvFocusJob + "まで", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			HtmlCreateTextSpan(DivideDigits3("" + expToFocusedJob), objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objTd);
			HtmlCreateTextSpan("（" + DivideDigits3("" + mobCountToFocusedJob) + "匹" + "）", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		}
	};



	/**
	 * 拡張情報の表示欄を構築する（ステータス合計）.
	 */
	this.RebuildDispAreaStatusSum = function () {

		var idx = 0;

		var targetArray = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// セレクトボックスを構築

		// 表示区分
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("表示区分", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RebuildAndRefreshDispArea(" + this.managerInstanceId + ")");
		HtmlCreateElementOption(EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD, "魔女のスキルカード", objSelect);
		HtmlCreateElementOption(EXTRA_INFO_STATUS_SUM_KIND_ALL_ITEM_AND_CARD, "アイテム／カード全般", objSelect);
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId, EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD);


		// 追加セレクトボックス
		switch (HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId, 0)) {

		// 魔女のスキルカード
		case EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD:

			objTr = HtmlCreateElement("tr", objTbody);
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("状況欄表示区分", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_STATUS_SUM_COND_TABLE_KIND_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			HtmlCreateElementOption(0, "そのスキルが使える数値", objSelect);
			HtmlCreateElementOption(1, "単純な倍数の数値", objSelect);
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_COND_TABLE_KIND_" + this.managerInstanceId, 0);
			break;

		// アイテム全般
		case EXTRA_INFO_STATUS_SUM_KIND_ALL_ITEM_AND_CARD:

			// TODO: 新アイテムデータに移行したら、自動化予定
			targetArray = [
				[ITEM_ID_BOTONO_SCARF, ItemObjNew[ITEM_ID_BOTONO_SCARF][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_BOTONO_SCARF][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_LINDWURMNO_KAWA, ItemObjNew[ITEM_ID_LINDWURMNO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_LINDWURMNO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_RADOONNO_KAWA, ItemObjNew[ITEM_ID_RADOONNO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_RADOONNO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_TUPOONNO_KAWA, ItemObjNew[ITEM_ID_TUPOONNO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_TUPOONNO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_GWIBERNO_KAWA, ItemObjNew[ITEM_ID_GWIBERNO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_GWIBERNO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_MARRACONO_KAWA, ItemObjNew[ITEM_ID_MARRACONO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_MARRACONO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_KODAIRYUNO_HOKAN, ItemObjNew[ITEM_ID_KODAIRYUNO_HOKAN][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_KODAIRYUNO_HOKAN][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_HAKKEINO_FUZYU, ItemObjNew[ITEM_ID_HAKKEINO_FUZYU][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_HAKKEINO_FUZYU][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_EUROPA_ROBE, ItemObjNew[ITEM_ID_EUROPA_ROBE][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_EUROPA_ROBE][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_AZI_DAHAKANO_KAWA, ItemObjNew[ITEM_ID_AZI_DAHAKANO_KAWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_AZI_DAHAKANO_KAWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_GUARDIAN_OF_SOUL, ItemObjNew[ITEM_ID_GUARDIAN_OF_SOUL][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_GUARDIAN_OF_SOUL][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_REIZOKUNO_KUBIWA, ItemObjNew[ITEM_ID_REIZOKUNO_KUBIWA][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_REIZOKUNO_KUBIWA][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_IMPERIAL_GLORY, ItemObjNew[ITEM_ID_IMPERIAL_GLORY][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_IMPERIAL_GLORY][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_SAITANNO_HOKAN, ItemObjNew[ITEM_ID_SAITANNO_HOKAN][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_SAITANNO_HOKAN][ITEM_DATA_INDEX_KANA]],
				[ITEM_ID_LORD_OF_ROYALS, ItemObjNew[ITEM_ID_LORD_OF_ROYALS][ITEM_DATA_INDEX_NAME], ItemObjNew[ITEM_ID_LORD_OF_ROYALS][ITEM_DATA_INDEX_KANA]],

				[(0 - CARD_ID_GOPINICH), CardObjNew[CARD_ID_GOPINICH][CARD_DATA_INDEX_NAME] + "カード", "コヒニク"],
				[(0 - CARD_ID_OSEN_SARETA_DARK_LORD), CardObjNew[CARD_ID_OSEN_SARETA_DARK_LORD][CARD_DATA_INDEX_NAME] + "カード", "オセンサレタタアクロオト"],
				[(0 - CARD_ID_SHINKAINO_DEVIAS), CardObjNew[CARD_ID_SHINKAINO_DEVIAS][CARD_DATA_INDEX_NAME] + "カード", "シンカイノテヒアス"],
			];
			targetArray.sort(
				function(a, b) {
					if (a[2] < b[2]) return -1;
					if (a[2] > b[2]) return 1;
					return 0;
				}
			);

			objTr = HtmlCreateElement("tr", objTbody);
			objTd = HtmlCreateElement("td", objTr);
			HtmlCreateTextSpan("対象", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objSelect = HtmlCreateElement("select", objTd);
			objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_STATUS_SUM_TARGET_ITEM_KIND_" + this.managerInstanceId);
			objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RefreshDispArea(" + this.managerInstanceId + ")");
			for (idx = 0; idx < targetArray.length; idx++) {
				HtmlCreateElementOption(targetArray[idx][0], targetArray[idx][1], objSelect);
			}
			this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_TARGET_ITEM_KIND_" + this.managerInstanceId, targetArray[0][0]);
			break;

		}




		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（ステータス合計量）.
	 */
	this.RefreshDispAreaStatusSum = function () {

		var idx = 0;
		var idxLoopInfo = 0;
		var idxEffective = 0;
		var idxEffectivePrev = 0;
		var idxEffectiveNext = 0;
		var idxPrime = 0;
		var idxTarget = 0;
		var idxCheck = 0;

		var dispKind = 0;

		var condTableKind = 0;

		var paramMax = 0;
		var totalMax = 0;

		var totalSum = 0;
		var paramTimesBase = 0;

		var effectiveNum = 0;
		var effectiveNumArray = null;
		var bPossible = false;
		var bJust = false;
		var prevTimesValue = 0;
		var nextTimesValue = 0;
		var bEffectivePrime = false;
		var bDataDetected = false;

		var calculatedData = null;
		var calculatedDataArrayMazyonoSkillCard = null;

		var bRestArray = null;
		var baseNumArray = null;
		var text = "";

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;

		// スキル名取得
		var funcGetTrimedSkillName = function (skillIdF) {

			var nameF = "";
			var reg = null;

			nameF = g_skillManager.GetSkillName(skillIdF);

			// 余計なかっこ等を除去する
			reg = RegExp("\\([^)]+\\)", "");
			while (reg.test(nameF)) {
				nameF = nameF.replace(reg, "");
			}

			return nameF;
		};

		var loopInfo = null;

		var loopInfoArrayWork = null;
		var loopInfoArrayWorkAll = null;

		// 魔女のスキルカード用ループ情報配列
		var loopInfoArrayMazyonoSkillCard = [

			// [ スキル名, 単一条件ステータス（-1:未指定）, 単一条件値（-1:未指定）, 倍数条件（-1:素数） ]
			[funcGetTrimedSkillName(SKILL_ID_CONCENTRATION), -1, -1, 19],
			[funcGetTrimedSkillName(SKILL_ID_HELL_INFERNO), -1, -1, 17],
			[funcGetTrimedSkillName(SKILL_ID_DEMONIC_FIRE), -1, -1, 13],
			[funcGetTrimedSkillName(SKILL_ID_GRAPHITY), -1, -1, 11],
			[funcGetTrimedSkillName(SKILL_ID_REMOVE_TRAP), -1, -1, 7],
			[funcGetTrimedSkillName(SKILL_ID_ANTIDOTE), -1, -1, 3],
			[funcGetTrimedSkillName(SKILL_ID_GRAND_CROSS), -1, -1, 2],
			[funcGetTrimedSkillName(SKILL_ID_TEIOAPUCHAGI), PARAM_LUK, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_ZANEI), PARAM_VIT, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_MAGMA_ILLUPTION), PARAM_STR, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_METALIC_SOUND), PARAM_INT, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_JUDEX), PARAM_DEX, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_PSYCHIC_WAVE), PARAM_AGI, 125, -1],
			[funcGetTrimedSkillName(SKILL_ID_HEAL), -1, -1, 1],
		];

		// 素数表
		var primeNumberList = [
			2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
			31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
			73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
			127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
			179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
			233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
			283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
			353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
			419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
			467, 479, 487, 491, 499, 503, 509, 521, 523, 541,
			547, 557, 563, 569, 571, 577, 587, 593, 599, 601,
			607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
			661, 673, 677, 683, 691, 701, 709, 719, 727, 733,
			739, 743, 751, 757, 761, 769, 773, 787, 797, 809,
			811, 821, 823, 827, 829, 839, 853, 857, 859, 863,
			877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
			947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013,
		];

		// 優先される素数の配列
		var effectivePrimeNumArrayMazyonoSkillCard = [5,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];

		// 有効な値の配列
		var effectiveNumArrayMazyonoSkillCard = [
			[19,38,57,76,95,114,133,152,171,190,209,228,247,266,285,304,323,342,361,380,399,418,437,456,475,494,513,532,551,570,589,608,627,646,665,684,703,722,741,760,779,798,817,836,855,874,893,912,931,950,969,988],
			[17,34,51,68,85,102,119,136,153,170,187,204,221,238,255,272,289,306,340,357,374,391,408,425,442,459,476,493,510,527,544,561,578,595,612,629,663,680,697,714,731,748,765,782,799,816,833,850,867,884,901,918,935,952,986],
			[13,26,39,52,65,78,91,104,117,130,143,156,169,182,195,208,234,260,273,286,299,312,325,338,351,364,377,390,403,416,429,455,468,481,507,520,533,546,559,572,585,598,611,624,637,650,676,689,702,715,728,754,767,780,793,806,819,832,845,858,871,897,910,923,936,949,962,975],
			[11,22,33,44,55,66,77,88,99,110,121,132,154,165,176,198,220,231,242,253,264,275,297,308,319,330,341,352,363,385,396,407,440,451,462,473,484,495,506,517,528,539,550,583,594,605,616,638,649,660,671,682,693,704,726,737,759,770,781,792,803,814,825,847,869,880,891,902,913,924,946,957,968,979,990],
			[7,14,21,28,35,42,49,56,63,70,84,98,105,112,126,140,147,161,168,175,189,196,203,210,217,224,245,252,259,280,287,294,301,315,322,329,336,343,350,371,378,392,406,413,420,427,434,441,448,469,483,490,497,504,511,518,525,553,560,567,574,581,588,602,609,623,630,644,651,658,672,679,686,700,707,721,735,742,749,756,763,777,784,791,805,812,826,840,854,861,868,875,882,889,896,903,917,938,945,959,966,973,980,987,994],
			[3,6,9,12,15,18,24,27,30,36,45,48,54,60,69,72,75,81,87,90,93,96,108,111,120,123,129,135,138,141,144,150,159,162,174,177,180,183,186,192,201,207,213,216,219,222,225,237,240,243,246,249,258,261,267,270,276,279,282,288,291,300,303,309,318,321,324,327,333,339,345,348,354,360,366,369,372,375,381,384,387,393,402,405,411,414,417,423,426,432,435,438,444,447,450,453,465,471,474,477,480,486,489,492,498,501,516,519,522,531,534,537,540,543,549,552,555,558,564,573,576,579,582,591,597,600,603,606,615,618,621,633,636,639,642,645,648,654,657,666,669,675,678,681,687,690,696,699,705,708,711,717,720,723,729,732,738,744,747,750,753,762,768,771,774,783,786,789,795,801,804,807,810,813,822,828,831,834,837,843,846,849,852,864,870,873,876,879,885,888,894,900,906,909,915,921,927,930,933,939,942,948,951,954,960,963,972,978,981,984,993,996,999],
			[2,4,8,10,16,20,32,40,46,50,58,62,64,74,80,82,86,92,94,100,106,116,118,122,124,128,134,142,146,148,158,160,164,166,172,178,184,188,194,200,202,206,212,214,218,226,230,232,236,244,248,250,254,256,262,268,274,278,284,290,292,296,298,302,310,314,316,320,326,328,332,334,344,346,356,358,362,368,370,376,382,386,388,394,398,400,404,410,412,422,424,428,430,436,446,452,454,458,460,464,466,470,472,478,482,488,496,500,502,508,512,514,524,526,530,536,538,542,548,554,556,562,566,568,580,584,586,590,592,596,604,610,614,620,622,626,628,632,634,640,652,656,662,664,668,670,674,688,692,694,698,706,710,712,716,718,724,730,734,736,740,746,752,758,764,766,772,776,778,788,790,794,796,800,802,808,818,820,824,830,838,842,844,848,856,860,862,866,872,878,886,890,892,898,904,908,914,916,920,922,926,928,932,934,940,944,956,958,964,970,974,976,982,992,998],
			effectivePrimeNumArrayMazyonoSkillCard,
			effectivePrimeNumArrayMazyonoSkillCard,
			effectivePrimeNumArrayMazyonoSkillCard,
			effectivePrimeNumArrayMazyonoSkillCard,
			effectivePrimeNumArrayMazyonoSkillCard,
			effectivePrimeNumArrayMazyonoSkillCard,
			[1,5,23,25,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,115,125,127,131,137,139,145,149,151,155,157,163,167,173,179,181,185,191,193,197,199,205,211,215,223,227,229,233,235,239,241,251,257,263,265,269,271,277,281,283,293,295,305,307,311,313,317,331,335,337,347,349,353,355,359,365,367,373,379,383,389,395,397,401,409,415,419,421,431,433,439,443,445,449,457,461,463,467,479,485,487,491,499,503,505,509,515,521,523,529,535,541,545,547,557,563,565,569,571,575,577,587,593,599,601,607,613,617,619,625,631,635,641,643,647,653,655,659,661,667,673,677,683,685,691,695,701,709,713,719,725,727,733,739,743,745,751,755,757,761,769,773,775,785,787,797,809,811,815,821,823,827,829,835,839,841,851,853,857,859,863,865,877,881,883,887,895,899,905,907,911,919,925,929,937,941,943,947,953,955,961,965,967,971,977,983,985,989,991,995,997],
		];



		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------

		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_COND_TABLE_KIND_" + this.managerInstanceId);
		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_TARGET_ITEM_KIND_" + this.managerInstanceId);

		// 表示区分
		dispKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_DISP_KIND_" + this.managerInstanceId, 0);



		//--------------------------------
		// データ計算
		//--------------------------------

		// 単一ステータスの最大値を決定する
		paramMax = GetStatusMax(JOB_ID_ANY, false);

		// 全合計の最大値を決定する
		// とりあえず 999
		totalMax = Math.max(999, paramMax * 6);



		switch (dispKind) {

		//--------------------------------
		// 魔女のスキルカード
		//--------------------------------
		case EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD:

			// 状況欄表示区分
			condTableKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_COND_TABLE_KIND_" + this.managerInstanceId, 0);

			// 現在の値を配列に保持
			paramArray = [SU_STR, SU_AGI, SU_VIT, SU_INT, SU_DEX, SU_LUK];

			// 現在の全合計を取得する
			totalSum = SU_STR + SU_AGI + SU_VIT + SU_INT + SU_DEX + SU_LUK;

			// 各スキルについて、現在の状況と、前後の数値を計算する
			calculatedDataArrayMazyonoSkillCard = [];
			for (idxLoopInfo = 0; idxLoopInfo < loopInfoArrayMazyonoSkillCard.length; idxLoopInfo++) {

				// ループ情報取得
				loopInfo = loopInfoArrayMazyonoSkillCard[idxLoopInfo];


				// 単一条件検査
				bPossible = true;
				if (loopInfo[1] >= 0) {
					if (paramArray[loopInfo[1]] < loopInfo[2]) {
						bPossible = false;
					}
				}


				// 倍数検査
				paramTimesBase = loopInfo[3];
				effectiveNumArray = effectiveNumArrayMazyonoSkillCard[idxLoopInfo];

				switch (condTableKind) {

				case 0:
					for (idxEffective = 0; idxEffective < effectiveNumArray.length; idxEffective++) {

						bEffectivePrime = false;
						bDataDetected = false;

						effectiveNum = effectiveNumArray[idxEffective];

						// 条件を満たしている素数スキルの判定に邪魔されないかの判定
						for (idxCheck = 0; idxCheck < idxLoopInfo; idxCheck++) {
							loopInfoCheck = loopInfoArrayMazyonoSkillCard[idxCheck];
							// 素数スキルでなければ、次へ
							if (loopInfoCheck[3] >= 0) {
								continue;
							}
							// ステータス条件を満たしているかの判定
							if (loopInfoCheck[1] >= 0) {
								if (paramArray[loopInfoCheck[1]] >= loopInfoCheck[2]) {

									bEffectivePrime = true;

									// 優先される素数に含まれるかの判定
									if (effectivePrimeNumArrayMazyonoSkillCard.indexOf(effectiveNum) >= 0) {
										// ここまで来たら邪魔される
										break;
									}
								}
							}
						}
						if (idxCheck < idxLoopInfo) {
							continue;
						}


						if (totalSum < effectiveNum) {
							bJust = false;

							idxEffectivePrev = idxEffective - 1;
							idxEffectiveNext = idxEffective;

							bDataDetected = true;
						}
						else if (effectiveNum == totalSum) {
							bJust = true;

							idxEffectivePrev = idxEffective - 1;
							idxEffectiveNext = idxEffective + 1;

							bDataDetected = true;
						}
						else {
							if (idxEffective + 1 == effectiveNumArray.length) {
								bJust = false;

								idxEffectivePrev = idxEffective;
								idxEffectiveNext = idxEffective + 1;

								bDataDetected = true;
							}
						}

						if (bDataDetected) {

							if (bEffectivePrime) {
								while (idxEffectivePrev >= 0) {
									if (effectivePrimeNumArrayMazyonoSkillCard.indexOf(effectiveNumArray[idxEffectivePrev]) < 0) {
										break;
									}
									idxEffectivePrev--;
								}
								while (idxEffectiveNext < effectiveNumArray.length) {
									if (effectivePrimeNumArrayMazyonoSkillCard.indexOf(effectiveNumArray[idxEffectiveNext]) < 0) {
										break;
									}
									idxEffectiveNext++;
								}
							}

							prevTimesValue = (idxEffectivePrev < 0) ? -1 : effectiveNumArray[idxEffectivePrev];
							nextTimesValue = (idxEffectiveNext >= effectiveNumArray.length) ? -1 : effectiveNumArray[idxEffectiveNext];

							calculatedDataArrayMazyonoSkillCard.push([bPossible, bJust, prevTimesValue, totalSum, nextTimesValue]);
							break;
						}
					}
					break;

				case 1:
					// 素数指定の場合
					if (paramTimesBase == -1) {

						bJust = false;

						for (idxPrime = 0; idxPrime < primeNumberList.length; idxPrime++) {

							effectiveNum = primeNumberList[idxPrime];

							if (totalSum < effectiveNum) {
								bJust = false;
								prevTimesValue = (idxPrime == 0) ? -1 : primeNumberList[idxPrime - 1];
								nextTimesValue = (idxPrime + 1 == primeNumberList.length) ? -1 : primeNumberList[idxPrime];

								calculatedDataArrayMazyonoSkillCard.push([bPossible, bJust, prevTimesValue, totalSum, nextTimesValue]);
								break;
							}
							else if (effectiveNum == totalSum) {
								bJust = true;
								prevTimesValue = (idxPrime == 0) ? -1 : primeNumberList[idxPrime - 1];
								nextTimesValue = (idxPrime + 1 == primeNumberList.length) ? -1 : primeNumberList[idxPrime + 1];

								calculatedDataArrayMazyonoSkillCard.push([bPossible, bJust, prevTimesValue, totalSum, nextTimesValue]);
								break;
							}
							else {
								if (idxPrime + 1 == primeNumberList.length) {
									bJust = false;
									prevTimesValue = primeNumberList[idxPrime];
									nextTimesValue = -1;

									calculatedDataArrayMazyonoSkillCard.push([bPossible, bJust, prevTimesValue, totalSum, nextTimesValue]);
									break;
								}
							}
						}
					}

					// 一般倍数指定
					else {

						bJust = ((totalSum % paramTimesBase) == 0);
						prevTimesValue = (Math.floor(totalSum / paramTimesBase) - (bJust ? 1 : 0)) * paramTimesBase;
						nextTimesValue = (Math.ceil(totalSum / paramTimesBase) + (bJust ? 1 : 0)) * paramTimesBase;

						if (prevTimesValue <= 0) {
							prevTimesValue = -1;
						}
						if (nextTimesValue > totalMax) {
							prevTimesValue = -1;
						}

						calculatedDataArrayMazyonoSkillCard.push([bPossible, bJust, prevTimesValue, totalSum, nextTimesValue]);
					}
					break;
				}


				// 条件をひとつも満たしておらず、データが追加されていない場合は、使用不可のデータを追加する
				if (calculatedDataArrayMazyonoSkillCard.length < idxLoopInfo + 1) {
					calculatedDataArrayMazyonoSkillCard.push([bPossible, false, -1, totalSum, -1]);
				}
			}
		}



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);


		switch (dispKind) {

		//----------------
		// 魔女のスキルカード
		//----------------
		case EXTRA_INFO_STATUS_SUM_KIND_MAZYONO_SKILL_CARD:

			// 実際に発動するスキル
			idxTarget = -1;

			// 現在値行
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
			objTd.setAttribute("colspan", 3);
			HtmlCreateTextSpan("現在の素ステ合計", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_GRAY_BACK");
			objTd.setAttribute("colspan", 3);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
			objTd.setAttribute("colspan", 6);
			HtmlCreateTextSpan(totalSum, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_GRAY_BACK");
			objTd.setAttribute("colspan", 3);


			// ダミー行
			objTr = HtmlCreateElement("tr", objTbody);
			objTr.setAttribute("style", "visibility : collapse;");

			objTd = HtmlCreateElement("td", objTr);
			objTd = HtmlCreateElement("td", objTr);
			objTd = HtmlCreateElement("td", objTr);

			for (idx = 0; idx < 12; idx++) {
				objTd = HtmlCreateElement("td", objTr);
				HtmlCreateTextSpan("8", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}



			// ヘッダ行
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			HtmlCreateTextSpan("発動スキル", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			HtmlCreateTextSpan("倍数", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			HtmlCreateTextSpan("他条件", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			objTd.setAttribute("colspan", 12);
			HtmlCreateTextSpan("←前値｜判定｜次値→", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);


			// データ行
			for (idx = 0; idx < loopInfoArrayMazyonoSkillCard.length; idx++) {

				// ループ情報取得
				loopInfo = loopInfoArrayMazyonoSkillCard[idx];

				// 計算データ
				calculatedData = calculatedDataArrayMazyonoSkillCard[idx];
				bPossible = calculatedData[0];
				bJust = calculatedData[1];
				prevTimesValue = calculatedData[2];
				totalSum = calculatedData[3];
				nextTimesValue = calculatedData[4];

				// 実際に使われるスキルか判定
				if ((idxTarget < 0) && (bPossible) && (bJust)) {
					idxTarget = idx;
				}

				// 組み立て
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				if (idx == idxTarget) {
					objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_JUST");
				}
				else {
					objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				}
				HtmlCreateTextSpan(loopInfo[0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				if (loopInfo[3] == -1) {
					HtmlCreateTextSpan("素数", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}
				else {
					HtmlCreateTextSpan(loopInfo[3], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}

				objTd = HtmlCreateElement("td", objTr);
				if (!bPossible) {
					objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_NG");
				}
				else {
					objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				}
				if (loopInfo[1] >= 0) {
					HtmlCreateTextSpan(GetParamText(loopInfo[1]) + "≧" + loopInfo[2], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}
				else {
					HtmlCreateTextSpan("なし", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				objTd.setAttribute("colspan", (bJust ? 3 : 4));
				if (prevTimesValue < 0) {
					HtmlCreateTextSpan("－", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}
				else {
					HtmlCreateTextSpan(prevTimesValue, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}

				objTd = HtmlCreateElement("td", objTr);
				if (bJust) {
					objTd.setAttribute("colspan", 6);
					if (!bPossible) {
						objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_NG");
						HtmlCreateTextSpan("条件×", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else {
						objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_JUST");
						HtmlCreateTextSpan(totalSum, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
				}
				else {
					objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_GRAY_BACK");
					objTd.setAttribute("colspan", 4);
				}

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				objTd.setAttribute("colspan", (bJust ? 3 : 4));
				if (nextTimesValue < 0) {
					HtmlCreateTextSpan("－", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}
				else {
					HtmlCreateTextSpan(nextTimesValue, objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
				}

			}
			break;

		//----------------
		// ステータス２種類
		//----------------
		case EXTRA_INFO_STATUS_SUM_KIND_ALL_ITEM_AND_CARD:

			// 対象ＩＤ
			selectedTargetId = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_STATUS_SUM_TARGET_ITEM_KIND_" + this.managerInstanceId, 0);

			// ループ情報切り替え
			loopInfoArrayWorkAll = [];
			loopInfoArrayWork = [];

			switch (selectedTargetId) {

			case ITEM_ID_BOTONO_SCARF:
				baseNumArray = [80];
				loopInfoArrayWork = [
					["STR＋LUK", SU_STR + SU_LUK],
					["INT＋DEX", SU_INT + SU_DEX],
					["AGI＋VIT", SU_AGI + SU_VIT],
				];
				break;

			case ITEM_ID_LINDWURMNO_KAWA:
			case ITEM_ID_RADOONNO_KAWA:
			case ITEM_ID_TUPOONNO_KAWA:
				baseNumArray = [20];
				loopInfoArrayWork = [ ["AGI＋VIT", SU_AGI + SU_VIT] ];
				break;

			case ITEM_ID_GWIBERNO_KAWA:
				baseNumArray = [20];
				loopInfoArrayWork = [ ["INT＋DEX", SU_INT + SU_DEX] ];
				break;

			case ITEM_ID_MARRACONO_KAWA:
				baseNumArray = [20];
				loopInfoArrayWork = [ ["STR＋LUK", SU_STR + SU_LUK] ];
				break;

			case ITEM_ID_KODAIRYUNO_HOKAN:
				baseNumArray = [10];
				loopInfoArrayWork = [ ["INT＋DEX", SU_INT + SU_DEX] ];
				break;

			case ITEM_ID_HAKKEINO_FUZYU:
				baseNumArray = [50];
				loopInfoArrayWork = [ ["INT＋DEX", SU_INT + SU_DEX] ];
				break;

			case ITEM_ID_EUROPA_ROBE:
				baseNumArray = [10];
				loopInfoArrayWork = [ ["VIT＋LUK", SU_VIT + SU_LUK] ];
				break;

			case ITEM_ID_AZI_DAHAKANO_KAWA:
				baseNumArray = [20];
				loopInfoArrayWork = [ ["VIT＋LUK", SU_VIT + SU_LUK] ];
				break;

			case ITEM_ID_GUARDIAN_OF_SOUL:
				baseNumArray = [18];
				loopInfoArrayWork = [
					["STR＋LUK", SU_STR + SU_LUK],
					["AGI＋VIT", SU_AGI + SU_VIT],
					["INT＋DEX", SU_INT + SU_DEX],
				];
				break;

			case ITEM_ID_REIZOKUNO_KUBIWA:
				baseNumArray = [50];
				loopInfoArrayWork = [ ["STR＋LUK", SU_STR + SU_LUK] ];
				break;

			case ITEM_ID_IMPERIAL_GLORY:
				baseNumArray = [50];
				loopInfoArrayWork = [ ["AGI＋VIT", SU_AGI + SU_VIT] ];
				break;

			case ITEM_ID_SAITANNO_HOKAN:
				baseNumArray = [10];
				loopInfoArrayWork = [ ["INT＋DEX", SU_INT + SU_DEX] ];
				break;

			case ITEM_ID_LORD_OF_ROYALS:
				baseNumArray = [50];
				loopInfoArrayWork = [ ["STR＋INT", SU_STR + SU_INT] ];
				break;

			case (0 - CARD_ID_GOPINICH):
			case (0 - CARD_ID_OSEN_SARETA_DARK_LORD):
				baseNumArray = [10];
				loopInfoArrayWork = [ ["STR＋INT＋DEX", SU_STR + SU_INT + SU_DEX] ];
				break;

			case (0 - CARD_ID_SHINKAINO_DEVIAS):
				baseNumArray = [25];
				loopInfoArrayWork = [
					["STR＋VIT＋DEX", SU_STR + SU_VIT + SU_DEX],
					["AGI＋INT＋LUK", SU_AGI + SU_INT + SU_LUK],
				];
				break;
			}

			// エラーチェック
			if ((baseNumArray.length == 0) || (loopInfoArrayWork.length == 0)) {
				break;
			}

			// ヘッダ行
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			HtmlCreateTextSpan("ステータス", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
			HtmlCreateTextSpan("合計値", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			for (idxLoopInfo = 0; idxLoopInfo < baseNumArray.length; idxLoopInfo++) {

				// ループ情報取得
				loopInfo = baseNumArray[idxLoopInfo];

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_HEAD");
				HtmlCreateTextSpan("＝" + loopInfo + "×？", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
			}


			// データ行
			for (idx = 0; idx < loopInfoArrayWork.length; idx++) {

				// ループ情報取得
				loopInfo = loopInfoArrayWork[idx];

				bRestArray = [];

				for (idxBase = 0; idxBase < baseNumArray.length; idxBase++) {
					if ((loopInfo[1] % baseNumArray[idxBase]) == 0) {
						bRestArray.push(0);
					}
					else {
						remainPlus = (loopInfo[1] % baseNumArray[idxBase]);
						remainMinus = (loopInfo[1] % baseNumArray[idxBase]) - baseNumArray[idxBase];

						bRestArray.push((Math.abs(remainPlus) < Math.abs(remainMinus)) ? ("+" + remainPlus) : remainMinus);
					}
				}

				// 組み立て
				objTr = HtmlCreateElement("tr", objTbody);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				HtmlCreateTextSpan(loopInfo[0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
				HtmlCreateTextSpan(loopInfo[1], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				for (idxBase = 0; idxBase < baseNumArray.length; idxBase++) {

					objTd = HtmlCreateElement("td", objTr);

					text = "×" + Math.floor(loopInfo[1] / baseNumArray[idxBase]);

					if (bRestArray[idxBase] == 0) {
						objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD_JUST");
						HtmlCreateTextSpan(text + " (±0)", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
					else {
						objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SKILL_CARD");
						HtmlCreateTextSpan(text + " (" + bRestArray[idxBase] + ")", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
					}
				}
			}
			break;

		}

	};



	/**
	 * 拡張情報の表示欄を構築する（対人情報）.
	 */
	this.RebuildDispAreaPvPInfo = function () {

		var idx = 0;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（対人情報）.
	 */
	this.RefreshDispAreaPvPInfo = function () {

		var idx = 0;

		var lv = 0;

		var value = 0;
		var weightEquiped = 0;

		var physicalValueArray = [0, 0, 0, 0, 0];
		var magicalValueArray = [0, 0, 0, 0, 0];
		var resistValueArray = [0, 0, 0, 0, 0];
		var resistOverArray = [0, 0, 0, 0, 0];

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;
		var objSpan = null;

		var funcSelectClassName = function (value, namePlus, nameZero, nameMinus) {
			if (value > 0) {
				return namePlus;
			}
			else if (value < 0) {
				return nameMinus;
			}

			return nameZero;
		};



		physicalValueArray[0] = ["", n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL]];
		physicalValueArray[1] = ["", n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN] + n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN]];
		physicalValueArray[2] = ["", physicalValueArray[0][1] + physicalValueArray[1][1]];
		physicalValueArray[3] = ["", n_tok[ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM]];
		physicalValueArray[4] = ["", physicalValueArray[0][1] + physicalValueArray[3][1]];

		magicalValueArray[0] = ["", n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL]];
		magicalValueArray[1] = ["", n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN] + n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN]];
		magicalValueArray[2] = ["", magicalValueArray[0][1] + magicalValueArray[1][1]];
		magicalValueArray[3] = ["", n_tok[ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM]];
		magicalValueArray[4] = ["", magicalValueArray[0][1] + magicalValueArray[3][1]];

if (_APPLY_UPDATE_LV200) {
		resistValueArray[0] = ["", n_tok[ITEM_SP_RESIST_PLAYER_ALL]];
		resistOverArray[0] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_PLAYER_ALL] - n_tok[ITEM_SP_RESIST_PLAYER_ALL]);

		resistValueArray[1] = ["", Math.min(95, n_tok[ITEM_SP_RESIST_PLAYER_HUMAN] + n_tok[ITEM_SP_RESIST_RACE_HUMAN])];
		resistOverArray[1] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_PLAYER_HUMAN] + n_tok_no_limit[ITEM_SP_RESIST_RACE_HUMAN] - 95);

		resistValueArray[2] = ["", Math.min(95, resistValueArray[0][1] + resistValueArray[1][1])];
		resistOverArray[2] = Math.max(0, resistValueArray[0][1] + resistValueArray[1][1] - 95) + resistOverArray[0] + resistOverArray[1];

		resistValueArray[3] = ["", n_tok[ITEM_SP_RESIST_PLAYER_DORAM]];
		resistOverArray[3] = Math.max(0, n_tok_no_limit[ITEM_SP_RESIST_PLAYER_DORAM] - 95);

		resistValueArray[4] = ["", Math.min(95, resistValueArray[0][1] + resistValueArray[3][1])];
		resistOverArray[4] = Math.max(0, resistValueArray[0][1] + resistValueArray[3][1] - 95) + resistOverArray[0] + resistOverArray[3];
}
else {
		resistValueArray[0] = ["", n_tok[ITEM_SP_RESIST_PLAYER_ALL]];
		resistValueArray[1] = ["", n_tok[ITEM_SP_RESIST_PLAYER_HUMAN] + n_tok[ITEM_SP_RESIST_RACE_HUMAN]];
		resistValueArray[2] = ["", resistValueArray[0][1] + resistValueArray[1][1]];
		resistValueArray[3] = ["", n_tok[ITEM_SP_RESIST_PLAYER_DORAM]];
		resistValueArray[4] = ["", resistValueArray[0][1] + resistValueArray[3][1]];
}

		for (idx = 0; idx < 5; idx++) {
			physicalValueArray[idx][0] = funcSelectClassName(physicalValueArray[idx][1], "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED")
			magicalValueArray[idx][0] = funcSelectClassName(magicalValueArray[idx][1], "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED")
			resistValueArray[idx][0] = funcSelectClassName(resistValueArray[idx][1], "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE", "", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED")
		}



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateElement("hr", objRoot);

		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// 物理ヘッダ
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("物理特化", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("全PC", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("種族別", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("合計", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 物理人間
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("人間", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("rowspan", "2");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", physicalValueArray[0][0]);
		HtmlCreateTextSpan(physicalValueArray[0][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", physicalValueArray[1][0]);
		HtmlCreateTextSpan(physicalValueArray[1][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", physicalValueArray[2][0]);
		HtmlCreateTextSpan(physicalValueArray[2][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 物理ドラム
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ドラム", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", physicalValueArray[3][0]);
		HtmlCreateTextSpan(physicalValueArray[3][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", physicalValueArray[4][0]);
		HtmlCreateTextSpan(physicalValueArray[4][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);



		// 魔法ヘッダ
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("魔法特化", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("全PC", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("種族別", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("合計", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 魔法人間
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("人間", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("rowspan", "2");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", magicalValueArray[0][0]);
		HtmlCreateTextSpan(magicalValueArray[0][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", magicalValueArray[1][0]);
		HtmlCreateTextSpan(magicalValueArray[1][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", magicalValueArray[2][0]);
		HtmlCreateTextSpan(magicalValueArray[2][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 魔法ドラム
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ドラム", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", magicalValueArray[3][0]);
		HtmlCreateTextSpan(magicalValueArray[3][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", magicalValueArray[4][0]);
		HtmlCreateTextSpan(magicalValueArray[4][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);



		// 耐性ヘッダ
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("耐性特化", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("全PC", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("種族別", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
		HtmlCreateTextSpan("合計", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 耐性人間
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("人間", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objTd.setAttribute("rowspan", "2");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", resistValueArray[0][0]);
		HtmlCreateTextSpan(resistValueArray[0][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 超過分
		if (resistOverArray[0] > 0) {
			HtmlCreateElement("br", objTd);
			objSpan = HtmlCreateElement("span", objTd);
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			HtmlCreateTextSpan("[過 " + resistOverArray[0] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", resistValueArray[1][0]);
		HtmlCreateTextSpan(resistValueArray[1][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 超過分
		if (resistOverArray[1] > 0) {
			HtmlCreateElement("br", objTd);
			objSpan = HtmlCreateElement("span", objTd);
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			HtmlCreateTextSpan("[過 " + resistOverArray[1] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", resistValueArray[2][0]);
		HtmlCreateTextSpan(resistValueArray[2][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 超過分
		if (resistOverArray[2] > 0) {
			HtmlCreateElement("br", objTd);
			objSpan = HtmlCreateElement("span", objTd);
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			HtmlCreateTextSpan("[過 " + resistOverArray[2] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		// 耐性ドラム
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		HtmlCreateTextSpan("ドラム", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", resistValueArray[3][0]);
		HtmlCreateTextSpan(resistValueArray[3][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 超過分
		if (resistOverArray[3] > 0) {
			HtmlCreateElement("br", objTd);
			objSpan = HtmlCreateElement("span", objTd);
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			HtmlCreateTextSpan("[過 " + resistOverArray[3] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}

		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
		objSpan = HtmlCreateElement("span", objTd);
		objSpan.setAttribute("class", resistValueArray[4][0]);
		HtmlCreateTextSpan(resistValueArray[4][1] + "%", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

		// 超過分
		if (resistOverArray[4] > 0) {
			HtmlCreateElement("br", objTd);
			objSpan = HtmlCreateElement("span", objTd);
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			HtmlCreateTextSpan("[過 " + resistOverArray[4] + "%]", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
		}


	};



	/**
	 * 拡張情報の表示欄を構築する（ステータス補正）.
	 */
	this.RebuildDispAreaEffectiveSp = function () {

		var idx = 0;

		var targetArray = null;

		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 設定欄テーブルを再構築
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);



		// セレクトボックスを構築

		// 表示区分
		objTr = HtmlCreateElement("tr", objTbody);

		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("表示区分", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

		objTd = HtmlCreateElement("td", objTr);
		objSelect = HtmlCreateElement("select", objTd);
		objSelect.setAttribute("id", "OBJID_SELECT_EXTRA_INFO_EFFECTIVE_SP_DISP_KIND_" + this.managerInstanceId);
		objSelect.setAttribute("onChange", "CExtraInfoAreaComponentManager.RebuildAndRefreshDispArea(" + this.managerInstanceId + ")");
		HtmlCreateElementOption(EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_BASIC, "基本ステータス", objSelect);
		HtmlCreateElementOption(EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_SPECIAL, "特性ステータス", objSelect);
		HtmlCreateElementOption(EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_EXTRA, "拡張ステータス", objSelect);
		HtmlCreateElementOption(EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_ALL, "全ステータス（※縦長注意）", objSelect);
		this.RestoreSelectedValue("OBJID_SELECT_EXTRA_INFO_EFFECTIVE_SP_DISP_KIND_" + this.managerInstanceId, EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_BASIC);

		// 表示欄
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		objTd.setAttribute("id", "OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		objTd.setAttribute("colspan", "2");
	};

	/**
	 * 拡張情報の表示欄を更新する（ステータス補正）.
	 */
	this.RefreshDispAreaEffectiveSp = function () {

		var idx = 0;

		var dispKind = 0;

		var jobBonusArray = null;
		var dispInfoArray = null;
		var dispInfoArrayArray = null;
		var dispValue = "";
		var valueObjectClassName = "";

		var funcCreateDispValueText = function (valueF, bAddPlusSignF, bPercentF) {

			var signF = "";
			var percentF = "";

			// 未定義値の補正
			if (!valueF) {
				valueF = 0;
			}

			// 符号の生成
			if (bAddPlusSignF) {
				if (valueF >= 0) {
					signF = "+";
				}
			}

			// パーセント記号の生成
			if (bPercentF) {
				percentF = "%";
			}

			return (signF + valueF + percentF);
		};

		var funcCreateDispValueTextBySpId = function (spidF, bAddPlusSignF, bPercentF) {

			var valueF = 0;
			var valuePlaneF = 0;
			var valueTextF = "";

			// 補正値の取得
			valueF = CExtraInfoAreaComponentManager.dispDataMap.get(spidF);
			valueTextF = funcCreateDispValueText(valueF, bAddPlusSignF, bPercentF);

			// 集中力向上等が乗るデータの場合は、情報を追加
			// （装備固有のINTによるSP上昇などもあるが、とりあえず集中力向上のみ対処）
			switch (spidF) {

			case ITEM_SP_AGI_PLUS:
				valuePlaneF = CExtraInfoAreaComponentManager.dispDataMap.get(ITEM_SP_AGI_PLUS_PLANE);
				valueTextF += "　(" + funcCreateDispValueText(valuePlaneF, false, bPercentF) + ")";
				break;

			case ITEM_SP_DEX_PLUS:
				valuePlaneF = CExtraInfoAreaComponentManager.dispDataMap.get(ITEM_SP_DEX_PLUS_PLANE);
				valueTextF += "　(" + funcCreateDispValueText(valuePlaneF, false, bPercentF) + ")";
				break;

			}

			return valueTextF;
		};

		var funcGetValueObjectClassNameBySpId = function (spidF, bReverse, bAddPlusSignF, bPercentF) {

			var valueF = 0;

			valueF = CExtraInfoAreaComponentManager.dispDataMap.get(spidF);
			if (!valueF) {
				valueF = 0;
			}

			if (valueF > 0) {
				return (!bReverse ? "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE" : "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			}
			else if (valueF < 0) {
				return (!bReverse ? "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED" : "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE");
			}

			return "";
		}

		var funcGetValueObjectClassNameByValue = function (valueF, bReverse, bAddPlusSignF, bPercentF) {

			if (!valueF) {
				valueF = 0;
			}

			if (valueF > 0) {
				return (!bReverse ? "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE" : "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED");
			}
			else if (valueF < 0) {
				return (!bReverse ? "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_RED" : "CSSCLS_EXTRA_INFO_DISP_TABLE_SPEC_VALUE_BLUE");
			}

			return "";
		}


		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objTr = null;
		var objTd = null;



		//--------------------------------
		// 個別領域の選択値を保管
		//--------------------------------

		this.StoreSelectedValue("OBJID_SELECT_EXTRA_INFO_EFFECTIVE_SP_DISP_KIND_" + this.managerInstanceId);

		// 表示区分
		dispKind = HtmlGetObjectValueByIdAsInteger("OBJID_SELECT_EXTRA_INFO_EFFECTIVE_SP_DISP_KIND_" + this.managerInstanceId, 0);



		//--------------------------------
		// HTML組み立て
		//--------------------------------

		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_DISP_AREA_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		HtmlCreateElement("hr", objRoot);


		switch (dispKind) {

		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_BASIC:
		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_ALL:

			// ジョブボーナス取得
			jobBonusArray = GetJobBonus(n_A_JOB, n_A_JobLV);

			// 表示情報配列を生成
			dispInfoArrayArray = [
				["STR", jobBonusArray[0], ITEM_SP_STR_PLUS, ITEM_SP_NONE],
				["AGI", jobBonusArray[1], ITEM_SP_AGI_PLUS, ITEM_SP_NONE],
				["VIT", jobBonusArray[2], ITEM_SP_VIT_PLUS, ITEM_SP_NONE],
				["INT", jobBonusArray[3], ITEM_SP_INT_PLUS, ITEM_SP_NONE],
				["DEX", jobBonusArray[4], ITEM_SP_DEX_PLUS, ITEM_SP_NONE],
				["LUK", jobBonusArray[5], ITEM_SP_LUK_PLUS, ITEM_SP_NONE],
			];

			// 表示用テーブル生成
			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			// ヘッダ
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("能力", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("Job補正", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("＋○○", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("○○％", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);


			// データ表示
			for (idx = 0; idx < dispInfoArrayArray.length; idx++) {

				dispInfoArray = dispInfoArrayArray[idx];

				// 行生成
				objTr = HtmlCreateElement("tr", objTbody);

				// 能力名
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(dispInfoArray[0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				// Job補正
				dispValue = funcCreateDispValueText(dispInfoArray[1], true, false);
				valueObjectClassName = "";

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				// 固定値上昇
				dispValue = funcCreateDispValueTextBySpId(dispInfoArray[2], true, false);
				valueObjectClassName = funcGetValueObjectClassNameBySpId(dispInfoArray[2], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				// ％上昇
				dispValue = funcCreateDispValueTextBySpId(dispInfoArray[3], true, true);
				valueObjectClassName = funcGetValueObjectClassNameBySpId(dispInfoArray[3], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			// 補足事項
			objSpan = HtmlCreateElement("span", objRoot);
			objSpan.setAttribute("style", "font-size : smaller;");
			HtmlCreateTextSpan("※『＋○○』欄にある()内の数値は、", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objSpan);
			HtmlCreateTextSpan("　集中力向上の計算に含まれる値。", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			break;

		default:
			break;

		}


		switch (dispKind) {

		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_SPECIAL:
		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_ALL:

			//------------------------------------------------------------------------------------------------
			//
			// 特性ステータス対応
			//
			//------------------------------------------------------------------------------------------------
			var wSPC_SPEC_ALL = GetEquippedTotalSPEquip(ITEM_SP_ALL_SPECS_PLUS);

			var wSPC_POW = GetEquippedTotalSPEquip(ITEM_SP_POW_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_POW_PLUS);
			var wSPC_STA = GetEquippedTotalSPEquip(ITEM_SP_STA_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_STA_PLUS);
			var wSPC_WIS = GetEquippedTotalSPEquip(ITEM_SP_WIS_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_WIS_PLUS);
			var wSPC_SPL = GetEquippedTotalSPEquip(ITEM_SP_SPL_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_SPL_PLUS);
			var wSPC_CON = GetEquippedTotalSPEquip(ITEM_SP_CON_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_CON_PLUS);
			var wSPC_CRT = GetEquippedTotalSPEquip(ITEM_SP_CRT_PLUS) + GetEquippedTotalSPCardAndElse(ITEM_SP_CRT_PLUS);

			// ランダムエンチャント効果
			wSPC_SPEC_ALL += GetRndOptTotalValue(ITEM_SP_ALL_SPECS_PLUS, null, false);

			wSPC_POW += GetRndOptTotalValue(ITEM_SP_POW_PLUS, null, false);
			wSPC_STA += GetRndOptTotalValue(ITEM_SP_STA_PLUS, null, false);
			wSPC_WIS += GetRndOptTotalValue(ITEM_SP_WIS_PLUS, null, false);
			wSPC_SPL += GetRndOptTotalValue(ITEM_SP_SPL_PLUS, null, false);
			wSPC_CON += GetRndOptTotalValue(ITEM_SP_CON_PLUS, null, false);
			wSPC_CRT += GetRndOptTotalValue(ITEM_SP_CRT_PLUS, null, false);

			// 全ステ上昇を分配
			wSPC_POW += wSPC_SPEC_ALL;
			wSPC_STA += wSPC_SPEC_ALL;
			wSPC_WIS += wSPC_SPEC_ALL;
			wSPC_SPL += wSPC_SPEC_ALL;
			wSPC_CON += wSPC_SPEC_ALL;
			wSPC_CRT += wSPC_SPEC_ALL;


			//----------------------------------------------------------------
			// 「性能カスタマイズ」の、効果
			//----------------------------------------------------------------
			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_POW_PLUS);
			if (confval != 0) {
				wSPC_POW += confval;
			}

			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_STA_PLUS);
			if (confval != 0) {
				wSPC_STA += confval;
			}

			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_WIS_PLUS);
			if (confval != 0) {
				wSPC_WIS += confval;
			}

			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_SPL_PLUS);
			if (confval != 0) {
				wSPC_SPL += confval;
			}

			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_CON_PLUS);
			if (confval != 0) {
				wSPC_CON += confval;
			}

			confval = g_objCharaConfCustomSpecStatus.GetConf(CCharaConfCustomSpecStatus.CONF_ID_CRT_PLUS);
			if (confval != 0) {
				wSPC_CRT += confval;
			}



			// 「砂時計のネックレス」の効果（ペナルティ）
			if ((itemCount = EquipNumSearch(ITEM_ID_SUNADOKENO_NECKLACE)) > 0) {
				confval = Math.min(6, Math.floor(n_A_JobLV / 5)) * itemCount;

				wSPC_POW -= confval;
				wSPC_STA -= confval;
				wSPC_WIS -= confval;
				wSPC_SPL -= confval;
				wSPC_CON -= confval;
				wSPC_CRT -= confval;
			}

			// 「ソウルアセティック」スキル「霊道術修練」による効果
			if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN), UsedSkillSearch(SKILL_ID_REIDOZYUTSU_SHUREN))) > 0) {
				wSPC_SPL += sklLv;
			}

			// 四次職支援「レリギオ」による効果
			// 術者側の H.Plus +100 あたり効果量 +2 加算は未実装
			// SKILL_ID_RERIGIO
			if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_RERIGIO]) > 0) {
				value = 2 * bufLv;
				wSPC_STA += value;
				wSPC_WIS += value;
				wSPC_SPL += value;
			}

			// 四次職支援「ベネディクトゥム」による効果
			// 術者側の H.Plus +100 あたり効果量 +2 加算は未実装
			// SKILL_ID_BENEDICTUM
			if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_BENEDICTUM]) > 0) {

				value = 2 * bufLv;

				wSPC_POW += value;
				wSPC_CON += value;
				wSPC_CRT += value;
			}

			// 四次職支援「サンドフェスティバル」による効果
			if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_SAND_FESTIVAL]) > 0) {
				if (g_confDataYozi[CCharaConfYozi.CONF_ID_RERIGIO] == 0) {
					value = 2 * bufLv;

					wSPC_STA += value;
					wSPC_WIS += value;
					wSPC_SPL += value;
				}
			}

			// 四次職支援「マリンフェスティバル」による効果
			if ((bufLv = g_confDataYozi[CCharaConfYozi.CONF_ID_MARIN_FESTIVAL]) > 0) {
				if (g_confDataYozi[CCharaConfYozi.CONF_ID_BENEDICTUM] == 0) {
					value = 2 * bufLv;

					wSPC_POW += value;
					wSPC_CON += value;
					wSPC_CRT += value;	
				}
			}

			// 「ナイトウォッチ」スキル「グレネードマスタリー」による効果
			if ((sklLv = Math.max(LearnedSkillSearch(SKILL_ID_GRENADE_MASTERY), UsedSkillSearch(SKILL_ID_GRENADE_MASTERY))) > 0) {
				wSPC_CON += sklLv
			}




			// ジョブボーナス取得
			jobBonusArray = GetJobBonus(n_A_JOB, n_A_JobLV);

			// 表示情報配列を生成
			dispInfoArrayArray = [
				["POW", jobBonusArray[6], wSPC_POW, ITEM_SP_NONE],
				["STA", jobBonusArray[7], wSPC_STA, ITEM_SP_NONE],
				["WIS", jobBonusArray[8], wSPC_WIS, ITEM_SP_NONE],
				["SPL", jobBonusArray[9], wSPC_SPL, ITEM_SP_NONE],
				["CON", jobBonusArray[10], wSPC_CON, ITEM_SP_NONE],
				["CRT", jobBonusArray[11], wSPC_CRT, ITEM_SP_NONE],
			];

			// 表示用テーブル生成
			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			// ヘッダ
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("能力", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("Job補正", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("＋○○", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("○○％", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);


			// データ表示
			for (idx = 0; idx < dispInfoArrayArray.length; idx++) {

				dispInfoArray = dispInfoArrayArray[idx];

				// 行生成
				objTr = HtmlCreateElement("tr", objTbody);

				// 能力名
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(dispInfoArray[0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				// Job補正
				dispValue = funcCreateDispValueText(dispInfoArray[1], true, false);
				valueObjectClassName = "";

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				// 固定値上昇
				dispValue = funcCreateDispValueText(dispInfoArray[2], true, false);
				valueObjectClassName = funcGetValueObjectClassNameByValue(dispInfoArray[2], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				// ％上昇
				dispValue = funcCreateDispValueTextBySpId(dispInfoArray[3], true, true);
				valueObjectClassName = funcGetValueObjectClassNameByValue(dispInfoArray[3], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			break;

		default:
			break;

		}


		switch (dispKind) {

		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_EXTRA:
		case EXTRA_INFO_EFFECTIVE_SP_KIND_STATUS_ALL:

			// 表示情報配列を生成
			dispInfoArrayArray = [
				["MaxHP", ITEM_SP_MAXHP_PLUS, ITEM_SP_MAXHP_UP],
				["MaxSP", ITEM_SP_MAXSP_PLUS, ITEM_SP_MAXSP_UP],
				["Atk", ITEM_SP_ATK_PLUS, ITEM_SP_ATK_UP],
				["Matk", ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, ITEM_SP_NONE],
				["除算Def", ITEM_SP_DEF_PLUS, ITEM_SP_DEF_UP],
				["除算Mdef", ITEM_SP_MDEF_PLUS, ITEM_SP_MDEF_UP],
				["Aspd", ITEM_SP_ASPD_PLUS, ITEM_SP_ASPD_UP],
			];

			// 表示用テーブル生成
			objTable = HtmlCreateElement("table", objRoot);
			objTable.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
			objTable.setAttribute("style", "width : 100%;");
			objTbody = HtmlCreateElement("tbody", objTable);

			// ヘッダ
			objTr = HtmlCreateElement("tr", objTbody);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("能力", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("＋○○", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

			objTd = HtmlCreateElement("td", objTr);
			objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_GRAY_BACK");
			HtmlCreateTextSpan("○○％", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);


			// データ表示
			for (idx = 0; idx < dispInfoArrayArray.length; idx++) {

				dispInfoArray = dispInfoArrayArray[idx];

				// 行生成
				objTr = HtmlCreateElement("tr", objTbody);

				// 能力名
				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				HtmlCreateTextSpan(dispInfoArray[0], objTd, CExtraInfoAreaComponentManager.fontSizeClassName);

				// 固定値上昇
				dispValue = funcCreateDispValueTextBySpId(dispInfoArray[1], true, false);
				valueObjectClassName = funcGetValueObjectClassNameBySpId(dispInfoArray[1], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

				// ％上昇
				dispValue = funcCreateDispValueTextBySpId(dispInfoArray[2], true, true);
				valueObjectClassName = funcGetValueObjectClassNameBySpId(dispInfoArray[2], false);

				objTd = HtmlCreateElement("td", objTr);
				objTd.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE");
				objSpan = HtmlCreateElement("span", objTd);
				objSpan.setAttribute("class", valueObjectClassName);
				HtmlCreateTextSpan(dispValue, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			}

			// 補足事項
			objSpan = HtmlCreateElement("span", objRoot);
			objSpan.setAttribute("style", "font-size : smaller;");
			HtmlCreateTextSpan("※ゲーム内で『Matk＋○○％』と書かれている効果は、", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objSpan);
			HtmlCreateTextSpan("　計算上は、『魔法攻撃で与えるダメージ＋○○％』。", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			HtmlCreateElement("br", objRoot);

			objSpan = HtmlCreateElement("span", objRoot);
			objSpan.setAttribute("style", "font-size : smaller;");
			HtmlCreateTextSpan("※現状の計算機では、装備自体が持つMDEFと、", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objSpan);
			HtmlCreateTextSpan("　特殊効果の『MDEF＋○○』は区別不能なので、", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
			HtmlCreateElement("br", objSpan);
			HtmlCreateTextSpan("　両方の合計を表示。", objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);

			break;

		default:
			break;

		}


	};


	/**
	 * 拡張情報の表示欄を構築する（製薬ステータス）.
	 */
	this.RebuildDispAreaAlchemist = function () {

		var idx = 0;
		var objRoot = null;
		var objTable = null;
		var objTbody = null;
		var objSpan = null;
		var objTr = null;
		var objTd = null;
		var stat = 0;

		// 指定の領域をクリア
		objRoot = document.getElementById("OBJID_TD_EXTRA_INFO_" + this.managerInstanceId);
		HtmlRemoveAllChild(objRoot);

		// 共通部分
		objTable = HtmlCreateElement("table", objRoot);
		objTable.setAttribute("style", "width : 100%;");
		objTbody = HtmlCreateElement("tbody", objTable);

		// 製薬ステータス
		objTr = HtmlCreateElement("tr", objTbody);
		objTd = HtmlCreateElement("td", objTr);
		HtmlCreateTextSpan("DEX+LUK+INT/2：", objTd, CExtraInfoAreaComponentManager.fontSizeClassName);
		objTd = HtmlCreateElement("td", objTr);
		stat = n_A_DEX + n_A_LUK + n_A_INT / 2;
		objSpan = HtmlCreateElement("span", objTd);
		if (stat >= 560) {
			objSpan.setAttribute("class", "CSSCLS_EXTRA_INFO_DISP_TABLE_BLUE");
			stat += " (>=560)"
		} else {
			stat += " (<560)"
		}
		HtmlCreateTextSpan(stat, objSpan, CExtraInfoAreaComponentManager.fontSizeClassName);
	};


	/**
	 * 拡張情報の表示欄を更新する（製薬ステータス）.
	 */
	this.RefreshDispAreaAlchemist = function () {

	};

	//--------------------------------------------------------------------------------
	// 各拡張情報ごとの表示欄構築関数ここまで
	//--------------------------------------------------------------------------------

}



/**
 * 拡張情報エリアコンポーネントマネージャクラスのインスタンスマネージャ.
 */
CExtraInfoAreaComponentManager.instanceManager = new CInstanceManager();

/**
 * フォントサイズクラス名.
 */
CExtraInfoAreaComponentManager.fontSizeClassName = "";



/**
 * 参照するキャラデータ.
 */
CExtraInfoAreaComponentManager.charaData = null;

/**
 * 参照する特性データ.
 */
CExtraInfoAreaComponentManager.specData = null;

/**
 * 参照する敵データ.
 */
CExtraInfoAreaComponentManager.mobData = null;

/**
 * 参照するデータのマップ（個別処理が必要なもの）.
 */
CExtraInfoAreaComponentManager.dispDataMap = new Map();



/**
 * 参照するデータを設定する.
 */
CExtraInfoAreaComponentManager.setReferData = function (charaData, specData, mobData) {
	CExtraInfoAreaComponentManager.charaData = charaData;
	CExtraInfoAreaComponentManager.specData = specData;
	CExtraInfoAreaComponentManager.mobData = mobData;
};



/**
 * 拡張情報ＩＤ変更イベントハンドラ.
 * @param instanceId 対象となるマネージャクラスのインスタンスＩＤ
 */
CExtraInfoAreaComponentManager.OnChangeInfo = function (instanceId) {

	var objManager = null;

	// マネージャクラスのインスタンスを取得
	objManager = CExtraInfoAreaComponentManager.instanceManager.searchInstanceById(instanceId);

	// メンバ関数のハンドラをコール
	objManager.OnChangeInfo();
};



/**
 * 指定の表示エリアを再構築する.
 * @param instanceId 対象となるマネージャクラスのインスタンスＩＤ
 */
CExtraInfoAreaComponentManager.RebuildDispArea = function (instanceId) {

	var objManager = null;

	// マネージャクラスのインスタンスを取得
	objManager = CExtraInfoAreaComponentManager.instanceManager.searchInstanceById(instanceId);

	// メンバ関数のハンドラをコール
	objManager.RebuildDispArea();
};

/**
 * 指定の表示エリアを再表示する.
 * @param instanceId 対象となるマネージャクラスのインスタンスＩＤ
 */
CExtraInfoAreaComponentManager.RefreshDispArea = function (instanceId) {

	var objManager = null;

	// マネージャクラスのインスタンスを取得
	objManager = CExtraInfoAreaComponentManager.instanceManager.searchInstanceById(instanceId);

	// メンバ関数のハンドラをコール
	objManager.RefreshDispArea();
};

/**
 * 指定の表示エリアを再構築、再表示する.
 * @param instanceId 対象となるマネージャクラスのインスタンスＩＤ
 */
CExtraInfoAreaComponentManager.RebuildAndRefreshDispArea = function (instanceId) {

	var objManager = null;

	// マネージャクラスのインスタンスを取得
	objManager = CExtraInfoAreaComponentManager.instanceManager.searchInstanceById(instanceId);

	// メンバ関数のハンドラをコール
	objManager.RebuildDispArea();

	// メンバ関数のハンドラをコール
	objManager.RefreshDispArea();
};



/**
 * すべての表示エリアの記憶している選択値をクリアする.
 * @param bPreserveStaticOptions 職業等に依存しないオプションを維持するかのフラグ
 */
CExtraInfoAreaComponentManager.ClearStoredValueAll = function (bPreserveStaticOptions) {

	var idx = 0;

	var managerList = null;

	// マネージャクラスのインスタンスリストを取得
	managerList = CExtraInfoAreaComponentManager.instanceManager.getInstanceList();

	// すべてのメンバ関数のハンドラをコール
	for (idx = 0; idx < managerList.length; idx++) {
		managerList[idx].ClearStoredValue(bPreserveStaticOptions);
	}
};



/**
 * すべての表示エリアを再構築する.
 */
CExtraInfoAreaComponentManager.RebuildDispAreaAll = function () {

	var idx = 0;

	var managerList = null;

	// マネージャクラスのインスタンスリストを取得
	managerList = CExtraInfoAreaComponentManager.instanceManager.getInstanceList();

	// すべてのメンバ関数のハンドラをコール
	for (idx = 0; idx < managerList.length; idx++) {
		managerList[idx].RebuildDispArea();
	}
};

/**
 * すべての表示エリアを再表示する.
 */
CExtraInfoAreaComponentManager.RefreshDispAreaAll = function () {

	var idx = 0;

	var managerList = null;

	// マネージャクラスのインスタンスリストを取得
	managerList = CExtraInfoAreaComponentManager.instanceManager.getInstanceList();

	// すべてのメンバ関数のハンドラをコール
	for (idx = 0; idx < managerList.length; idx++) {
		managerList[idx].RefreshDispArea();
	}
};



/*
CExtraInfoAreaComponentManager.testes = function () {

	var idxBase = 0;
	var idxElder = 0;

	var effective = [];
	var targetNum = 0;
	var baseNum = 0;
	var elderNum = 0;
	var msg = "";

	// 素数表
	var primeNumberList = [
		2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
		31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
		73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
		127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
		179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
		233, 239, 241, 251, 257, 263, 269, 271, 277, 281,
		283, 293, 307, 311, 313, 317, 331, 337, 347, 349,
		353, 359, 367, 373, 379, 383, 389, 397, 401, 409,
		419, 421, 431, 433, 439, 443, 449, 457, 461, 463,
		467, 479, 487, 491, 499, 503, 509, 521, 523, 541,
		547, 557, 563, 569, 571, 577, 587, 593, 599, 601,
		607, 613, 617, 619, 631, 641, 643, 647, 653, 659,
		661, 673, 677, 683, 691, 701, 709, 719, 727, 733,
		739, 743, 751, 757, 761, 769, 773, 787, 797, 809,
		811, 821, 823, 827, 829, 839, 853, 857, 859, 863,
		877, 881, 883, 887, 907, 911, 919, 929, 937, 941,
		947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013,
	];

	var numArray = [
		19, 17, 13, 11, 7, 3, 2, -1, 1,
	];

	var funcCheckBase = null;
	var funcCheckElder = null;

	var funcCheckTimes = function (baseNumF, targetNumF) {
		return ((targetNumF % baseNumF) == 0);
	};

	var funcCheckPrime = function (baseNumF, targetNumF) {
		return (primeNumberList.indexOf(targetNumF) >= 0);
	};

	var funcCheckFalse = function (baseNumF, targetNumF) {
		return false;
	};



	for (idxBase = 0; idxBase < numArray.length; idxBase++) {

		effective = [];

		baseNum = numArray[idxBase];

		if (baseNum != -1) {
			funcCheckBase = funcCheckTimes;
		}
		else {
			funcCheckBase = funcCheckPrime;
		}

		for (targetNum = 1; targetNum < 1000; targetNum++) {

			if (!funcCheckBase(baseNum, targetNum)) {
				continue;
			}

			for (idxElder = 0; idxElder < idxBase; idxElder++) {

				elderNum = numArray[idxElder];

				if (elderNum != -1) {
					funcCheckElder = funcCheckTimes;
				}
				else {
					funcCheckElder = funcCheckFalse;
				}

				if (funcCheckElder(elderNum, targetNum)) {
					break;
				}
			}

			if (idxElder < idxBase) {
				continue;
			}

			effective.push(targetNum);
		}

		msg = baseNum + "の有効値" + "\n\n";
		msg += effective.join(",");

		WriteConsoleLog(msg);
	}
};
*/



