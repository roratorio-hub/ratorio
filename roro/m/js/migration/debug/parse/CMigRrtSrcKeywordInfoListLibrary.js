
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// パーサファイル読み込みチェック
ParserFileIncludeCheck();





function CMigRrtSrcKeywordInfoListLibrary () {

	// データ配列
	this.dataArray = [];



	/**
	 * リストIDを登録する.
	 * @param idName 定数名
	 * @return 登録された定数値
	 */
	this.RegisterListId = function (idName) {
		return CGlobalConstManager.DefineEnum("EnumMigRrtSrcKeywordListId", [idName]);
	};

	/**
	 * キーワードIDを登録する.
	 * @param idName 定数名
	 * @return 登録された定数値
	 */
	this.RegisterKeywordId = function (idName) {
		return CGlobalConstManager.DefineEnum("EnumMigRrtSrcKeywordId", [idName]);
	};



	/**
	 * キーワード情報リストを取得する.
	 * @param id ID
	 * @return キーワード情報リスト
	 */
	this.Get = function (id) {

		var idx = 0;

		for (idx = 0; idx < this.dataArray.length; idx++) {
			if (this.dataArray[idx].id == id) {
				return this.dataArray[idx];
			}
		}

		return undefined;
	};



	/**
	 * キーワードID名を取得する.
	 * @param listId リストID
	 * @param keyword キーワード
	 * @return キーワード情報リスト
	 */
	this.GetKeywordIdName = function (listId, keyword) {
		return this.Get(listId).Get(keyword).assignedIdName;
	};




	/**
	 * 職業キーワードが職業名系列かを判定する.
	 * @param keyword 職業キーワード
	 * @return true:職業名系列、false:職業名系列ではない
	 * @remark "3次職" のキーワードが含まれる場合は false を返す
	 */
	this.IsKeywordRequiredJobSeries = function (keyword) {
		// 職業IDをループ処理させたら遅すぎたので、正規表現でマッチ
		return /^.+系$/.test(keyword);
	};

	/**
	 * 職業キーワードが3次職業名系列かを判定する.
	 * @param keyword 職業キーワード
	 * @return true:3次職業名系列、false:3次職業名系列ではない
	 */
	this.IsKeywordRequiredJobSeries3rd = function (keyword) {
		// 職業IDをループ処理させたら遅すぎたので、正規表現でマッチ
		return /^3次職.+系$/.test(keyword);
	};



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		var infoList = null;
		var workArray = null;

		// ID登録用関数（Forループ処理用関数からの参照を容易にするため変数に保持）
		var funcRegisterKeywordId = this.RegisterKeywordId;



		//--------------------------------
		// カンマ文字
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_COMMA")
			)
			.Add(new CMigRrtSrcKeywordInfo(",", EnumMigEquipableSpId.GetDefinedName(MIG_ITEM_SP_ID_DUMMY)))
			.Add(new CMigRrtSrcKeywordInfo("，", EnumMigEquipableSpId.GetDefinedName(MIG_ITEM_SP_ID_DUMMY)))
			.Add(new CMigRrtSrcKeywordInfo("、", EnumMigEquipableSpId.GetDefinedName(MIG_ITEM_SP_ID_DUMMY)))
		);



		//--------------------------------
		// 時間単位
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_TIME_UNIT")
			)
			.Add(new CMigRrtSrcKeywordInfo("秒", EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_SECOND)))
			.Add(new CMigRrtSrcKeywordInfo("分", EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_MINUTE)))
			.Add(new CMigRrtSrcKeywordInfo("時", EnumMigTimeUnitId.GetDefinedName(MIG_TIME_UNIT_ID_HOUR)))
		);



		//--------------------------------
		// 境界フラグ
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_BORDER_FLAG")
			)
			.Add(new CMigRrtSrcKeywordInfo("以下", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_UNDER)))
			.Add(new CMigRrtSrcKeywordInfo("以下で", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_UNDER)))
			.Add(new CMigRrtSrcKeywordInfo("以下の時", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_UNDER)))
			.Add(new CMigRrtSrcKeywordInfo("以下の場合", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_UNDER)))
			.Add(new CMigRrtSrcKeywordInfo("以上", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("以上で", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("以上の時", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("以上の場合", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("上がる度に", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("上がる毎に", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("毎に", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("上がるたびに", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("上がるごとに", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("高くなる程", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_BY)))
			.Add(new CMigRrtSrcKeywordInfo("未習得の場合", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_NOT)))
			.Add(new CMigRrtSrcKeywordInfo("習得時", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("以上を習得している場合", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_OVER)))
			.Add(new CMigRrtSrcKeywordInfo("で", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_EQUAL)))
			.Add(new CMigRrtSrcKeywordInfo("の時", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_EQUAL)))
			.Add(new CMigRrtSrcKeywordInfo("の場合", EnumMigBorderFlagId.GetDefinedName(MIG_BORDER_FLAG_ID_EQUAL)))
		);



		//--------------------------------
		// 攻撃手段
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_METHOD")
			)
			.Add(new CMigRrtSrcKeywordInfo("物理", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_PHYSICAL)))
			.Add(new CMigRrtSrcKeywordInfo("近接物理", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_PHYSICAL_SHORT)))
			.Add(new CMigRrtSrcKeywordInfo("遠距離物理", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_PHYSICAL_LONG)))
			.Add(new CMigRrtSrcKeywordInfo("遠距離", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_PHYSICAL_LONG)))
			.Add(new CMigRrtSrcKeywordInfo("魔法", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_MAGICAL)))
			.Add(new CMigRrtSrcKeywordInfo("クリティカル", EnumMigMethodId.GetDefinedName(MIG_METHOD_ID_CRITICAL)))
		);



		//--------------------------------
		// タイミング
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_TIMING")
			)
			.Add(new CMigRrtSrcKeywordInfo("攻撃時", EnumMigTimingId.GetDefinedName(MIG_TIMING_ID_BY_ATTACK)))
			.Add(new CMigRrtSrcKeywordInfo("攻撃で", EnumMigTimingId.GetDefinedName(MIG_TIMING_ID_BY_ATTACK)))
			.Add(new CMigRrtSrcKeywordInfo("攻撃命中時", EnumMigTimingId.GetDefinedName(MIG_TIMING_ID_HITTED)))
			.Add(new CMigRrtSrcKeywordInfo("攻撃を受けた時", EnumMigTimingId.GetDefinedName(MIG_TIMING_ID_RECEIVED)))
		);



		//--------------------------------
		// パラメータ名
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_PARAM")
			)
			.Add(new CMigRrtSrcKeywordInfo("Str", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_STR)))
			.Add(new CMigRrtSrcKeywordInfo("Agi", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_AGI)))
			.Add(new CMigRrtSrcKeywordInfo("Vit", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_VIT)))
			.Add(new CMigRrtSrcKeywordInfo("Int", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_INT)))
			.Add(new CMigRrtSrcKeywordInfo("Dex", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_DEX)))
			.Add(new CMigRrtSrcKeywordInfo("Luk", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_LUK)))
			.Add(new CMigRrtSrcKeywordInfo("すべてのステータス", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_ALL_STATUS)))
			.Add(new CMigRrtSrcKeywordInfo("All Status", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_ALL_STATUS)))
			.Add(new CMigRrtSrcKeywordInfo("Hit", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_HIT)))
			.Add(new CMigRrtSrcKeywordInfo("Flee", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_FLEE)))
			.Add(new CMigRrtSrcKeywordInfo("回避率", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_FLEE)))
			.Add(new CMigRrtSrcKeywordInfo("Cri", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_CRI)))
			.Add(new CMigRrtSrcKeywordInfo("クリティカル", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_CRI)))
			.Add(new CMigRrtSrcKeywordInfo("完全回避", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_LUCKY)))
			.Add(new CMigRrtSrcKeywordInfo("攻撃速度", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_ASPD)))
			.Add(new CMigRrtSrcKeywordInfo("Aspd", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_ASPD)))
			.Add(new CMigRrtSrcKeywordInfo("MaxHP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MAXHP)))
			.Add(new CMigRrtSrcKeywordInfo("MHP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MAXHP)))
			.Add(new CMigRrtSrcKeywordInfo("MaxSP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MAXSP)))
			.Add(new CMigRrtSrcKeywordInfo("MSP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MAXSP)))
			.Add(new CMigRrtSrcKeywordInfo("HP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_NOWHP)))					// 現在のＨＰ、撃破時回復等に使用
			.Add(new CMigRrtSrcKeywordInfo("SP", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_NOWSP)))					// 現在のＳＰ、撃破時回復等に使用
			.Add(new CMigRrtSrcKeywordInfo("Atk", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_ATK)))
			.Add(new CMigRrtSrcKeywordInfo("Matk", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MATK)))
			.Add(new CMigRrtSrcKeywordInfo("Def", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_DEF)))
			.Add(new CMigRrtSrcKeywordInfo("Mdef", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_MDEF)))
			.Add(new CMigRrtSrcKeywordInfo("HP自然回復量", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_HPR)))
			.Add(new CMigRrtSrcKeywordInfo("HP回復力", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_HPR)))
			.Add(new CMigRrtSrcKeywordInfo("SP自然回復量", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_SPR)))
			.Add(new CMigRrtSrcKeywordInfo("SP回復力", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_SPR)))
			.Add(new CMigRrtSrcKeywordInfo("必中攻撃", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_GUIDED)))
			.Add(new CMigRrtSrcKeywordInfo("武器攻撃力", EnumMigItemParamId.GetDefinedName(MIG_PARAM_ID_WEAPON_ATK)))
		);



		//--------------------------------
		// 状態異常名
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATE"));
		EnumMigStateId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(g_constDataManager.GetName(CONST_DATA_KIND_STATE, valueF), nameF));
			},
			[]
		);
		this.dataArray.push(infoList);



		//--------------------------------
		// バフ名
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_BUFF"));
		EnumMigBuffId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(g_constDataManager.GetName(CONST_DATA_KIND_BUFF, valueF), nameF));
			},
			[]
		);
		this.dataArray.push(infoList);



		//--------------------------------
		// 職業名
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_JOB"));
		EnumMigJobId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(GetJobName(valueF), nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("全て", EnumMigJobId.GetDefinedPseudoName(MIG_JOB_ID_ANY)))
		this.dataArray.push(infoList);



		//--------------------------------
		// 職業系列名
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_JOB_SERIES"));
		EnumMigJobSeriesId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(GetJobName(Math.floor(valueF / 2)) + "系", nameF));
			},
			[]
		);
		this.dataArray.push(infoList);



		//--------------------------------
		// アイテム装備領域
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_ITEM_EQUIP_REGION"));
		EnumMigItemType.For(
			function (idxF, nameF, valueF) {

				var valueOfRegionF = 0;

				// アイテムの種別をもとに、装備領域へ変換
				switch (valueF) {

				// TODO: 武器系はとりあえずすべて右手へ
				case MIG_ITEM_TYPE_KNIFE:
				case MIG_ITEM_TYPE_SWORD:
				case MIG_ITEM_TYPE_SWORD_2HAND:
				case MIG_ITEM_TYPE_SPEAR:
				case MIG_ITEM_TYPE_SPEAR_2HAND:
				case MIG_ITEM_TYPE_AXE:
				case MIG_ITEM_TYPE_AXE_2HAND:
				case MIG_ITEM_TYPE_MACE:
				case MIG_ITEM_TYPE_STUFF:
				case MIG_ITEM_TYPE_STUFF_2HAND:
				case MIG_ITEM_TYPE_BOW:
				case MIG_ITEM_TYPE_KATAR:
				case MIG_ITEM_TYPE_BOOK:
				case MIG_ITEM_TYPE_FIST:
				case MIG_ITEM_TYPE_MUSICAL:
				case MIG_ITEM_TYPE_WHIP:
				case MIG_ITEM_TYPE_FUMA:
				case MIG_ITEM_TYPE_HANDGUN:
				case MIG_ITEM_TYPE_RIFLE:
				case MIG_ITEM_TYPE_SHOTGUN:
				case MIG_ITEM_TYPE_GATLINGGUN:
				case MIG_ITEM_TYPE_GRENADEGUN:
					valueOfRegionF = MIG_EQUIP_REGION_ID_ARMS_RIGHT;
					break;

				// 頭は本来、部位によっても分岐するが、このキーワードリストの使用される状況が、
				// 装備領域の精錬値なので、実質頭上段のみ
				case MIG_ITEM_TYPE_HELM:
					valueOfRegionF = MIG_EQUIP_REGION_ID_HEAD_TOP;
					break;

				case MIG_ITEM_TYPE_ARMOR:
					valueOfRegionF = MIG_EQUIP_REGION_ID_BODY;
					break;

				case MIG_ITEM_TYPE_SHIELD:
					valueOfRegionF = MIG_EQUIP_REGION_ID_SHIELD;
					break;

				case MIG_ITEM_TYPE_SHOULDER:
					valueOfRegionF = MIG_EQUIP_REGION_ID_SHOULDER;
					break;

				case MIG_ITEM_TYPE_SHOES:
					valueOfRegionF = MIG_EQUIP_REGION_ID_FOOT;
					break;

				case MIG_ITEM_TYPE_ACCESSORY:
					valueOfRegionF = MIG_EQUIP_REGION_ID_ACCESSORY_1;
					break;

				case MIG_ITEM_TYPE_ACCESSORY_ON_1:
					valueOfRegionF = MIG_EQUIP_REGION_ID_ACCESSORY_1;
					break;

				case MIG_ITEM_TYPE_ACCESSORY_ON_2:
					valueOfRegionF = MIG_EQUIP_REGION_ID_ACCESSORY_2;
					break;

				default:
					return;
				}

				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetEquipRegionText(valueOfRegionF), EnumMigEquipRegionId.GetDefinedName(valueOfRegionF)));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("頭", EnumMigEquipRegionId.GetDefinedName(MIG_EQUIP_REGION_ID_HEAD_TOP)))
		this.dataArray.push(infoList);



		//--------------------------------
		// アイテム系列
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_ITEM_TYPE"));
		EnumMigItemType.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetItemTypeText(valueF), nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("剣", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_SWORD)))
		infoList.Add(new CMigRrtSrcKeywordInfo("槍", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_SPEAR)))
		infoList.Add(new CMigRrtSrcKeywordInfo("斧", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_AXE)))
		infoList.Add(new CMigRrtSrcKeywordInfo("杖", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_STUFF)))
		this.dataArray.push(infoList);



		//--------------------------------
		// ターゲット
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_TARGET")
			)
			.Add(new CMigRrtSrcKeywordInfo("敵", EnumMigTargetId.GetDefinedName(MIG_TARGET_ID_ENEMY)))
			.Add(new CMigRrtSrcKeywordInfo("自分", EnumMigTargetId.GetDefinedName(MIG_TARGET_ID_SELF)))
			.Add(new CMigRrtSrcKeywordInfo("敵を中心", EnumMigTargetId.GetDefinedName(MIG_TARGET_ID_ARROUND_ENEMY)))
			.Add(new CMigRrtSrcKeywordInfo("自分を中心", EnumMigTargetId.GetDefinedName(MIG_TARGET_ID_ARROUND_SELF)))
		);



		//--------------------------------
		// 種族
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_RACE"));
		EnumMigRaceId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetRaceText(valueF), nameF));
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetRaceText(valueF) + "形", nameF));
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetRaceText(valueF) + "型", nameF));
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetRaceText(valueF) + "種族", nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("魚類", EnumMigRaceId.GetDefinedName(MIG_RACE_ID_FISH)))
		infoList.Add(new CMigRrtSrcKeywordInfo("魚類" + "形", EnumMigRaceId.GetDefinedName(MIG_RACE_ID_FISH)))
		infoList.Add(new CMigRrtSrcKeywordInfo("魚類" + "型", EnumMigRaceId.GetDefinedName(MIG_RACE_ID_FISH)))
		infoList.Add(new CMigRrtSrcKeywordInfo("魚類" + "種族", EnumMigRaceId.GetDefinedName(MIG_RACE_ID_FISH)))
		infoList.Add(new CMigRrtSrcKeywordInfo("全て", EnumMigRaceId.GetDefinedPseudoName(MIG_RACE_ID_ALL)))
		this.dataArray.push(infoList);



		//--------------------------------
		// 属性
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_ELM"));
		EnumMigElementId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(GetElementText(valueF), nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("全て", EnumMigElementId.GetDefinedPseudoName(MIG_ELEMENT_ID_ALL)))
		infoList.Add(new CMigRrtSrcKeywordInfo("-", EnumMigElementId.GetDefinedPseudoName(MIG_ELEMENT_ID_NONE)))
		this.dataArray.push(infoList);



		//--------------------------------
		// サイズ
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_SIZE"));
		EnumMigSizeId.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(GetSizeText(valueF).replace("型", ""), nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("全て", EnumMigSizeId.GetDefinedPseudoName(MIG_SIZE_ID_ALL)))
		this.dataArray.push(infoList);



		//--------------------------------
		// ボス属性
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_BOSS")
			)
			.Add(new CMigRrtSrcKeywordInfo("一般", EnumMigBossId.GetDefinedName(MIG_BOSS_ID_NORMAL)))
			.Add(new CMigRrtSrcKeywordInfo("ボス", EnumMigBossId.GetDefinedName(MIG_BOSS_ID_BOSS)))
		);



		//--------------------------------
		// プレイヤー
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_PLAYER")
			)
			.Add(new CMigRrtSrcKeywordInfo("人間形プレイヤー", EnumMigPlayerId.GetDefinedName(MIG_PLAYER_ID_HUMAN)))
			.Add(new CMigRrtSrcKeywordInfo("ドラム形プレイヤー", EnumMigPlayerId.GetDefinedName(MIG_PLAYER_ID_DORAM)))
			.Add(new CMigRrtSrcKeywordInfo("プレイヤー", EnumMigPlayerId.GetDefinedPseudoName(MIG_PLAYER_ID_ALL)))
		);



		//--------------------------------
		// 打ち消し効果リスト
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_CANCEL_EFFECT")
			)
			.Add(new CMigRrtSrcKeywordInfo("再使用待機時間減少", EnumMigEquipableSpId.GetDefinedName(MIG_EQUIPABLE_SP_EFFECT_ID_COOL_TIME)))
		);



		//--------------------------------
		// 効果未適用ターゲット
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_DISEFFECT_TARGET")
			)
			.Add(new CMigRrtSrcKeywordInfo("プレイヤー", EnumMigDiseffectTargetId.GetDefinedName(MIG_DISEFFECT_TARGET_ID_PLAYER)))
		);



		//--------------------------------
		// 固定情報（系列）
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATIC_TYPE"));
		EnumMigItemType.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetItemTypeText(valueF), nameF));
			},
			[]
		);
		infoList.Add(new CMigRrtSrcKeywordInfo("剣", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_SWORD)))
		infoList.Add(new CMigRrtSrcKeywordInfo("槍", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_SPEAR)))
		infoList.Add(new CMigRrtSrcKeywordInfo("斧", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_AXE)))
		infoList.Add(new CMigRrtSrcKeywordInfo("杖", EnumMigItemType.GetDefinedName(MIG_ITEM_TYPE_STUFF)))
		this.dataArray.push(infoList);



		//--------------------------------
		// 固定情報（位置）
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATIC_POSITION"));
		EnumMigItemPosition.For(
			function (idxF, nameF, valueF) {
				infoList.Add(new CMigRrtSrcKeywordInfo(MigGetItemPositionText(valueF), nameF));
			},
			[]
		);
		this.dataArray.push(infoList);



		//--------------------------------
		// 固定情報（精錬）
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATIC_REFINABLE")
			)
			.Add(new CMigRrtSrcKeywordInfo("可", EnumMigItemRefinable.GetDefinedName(MIG_ITEM_REFINABLE_YES)))
			.Add(new CMigRrtSrcKeywordInfo("不可", EnumMigItemRefinable.GetDefinedName(MIG_ITEM_REFINABLE_NO)))
		);



		//--------------------------------
		// 固定情報（破損）
		//--------------------------------
		this.dataArray.push(
			new CMigRrtSrcKeywordInfoList(
				this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATIC_BREAKABLE")
			)
			.Add(new CMigRrtSrcKeywordInfo("する", EnumMigItemBreakable.GetDefinedName(MIG_ITEM_BREAKABLE_YES)))
			.Add(new CMigRrtSrcKeywordInfo("しない", EnumMigItemBreakable.GetDefinedName(MIG_ITEM_BREAKABLE_NO)))
		);



		//--------------------------------
		// 固定情報（装備）
		//--------------------------------
		infoList = new CMigRrtSrcKeywordInfoList(this.RegisterListId("MIG_RRTSRC_KEYWORD_LIST_STATIC_REQUIRED_JOB"));
		workArray = [[],[],[],[],[]];
		EnumMigJobId.For(
			function (idxF, nameF, valueF) {
				workArray[0].push([GetJobName(valueF), EnumMigRequiredJobId.GetDefinedName(valueF)]);
				workArray[1].push([GetJobName(valueF) + "系", EnumMigRequiredJobSeriesId.GetDefinedName(valueF)]);
				workArray[2].push([GetJobName(valueF) + "専用", EnumMigRequiredJobSeriesId.GetDefinedName(valueF)]);
				workArray[3].push(["転生" + GetJobName(valueF) + "系", EnumMigRequiredJobSeriesIdReincaneted.GetDefinedName(valueF)]);
				workArray[4].push(["3次職" + GetJobName(valueF) + "系", EnumMigRequiredJobSeries3rdId.GetDefinedName(valueF)]);
			},
			[]
		);
		workArray = workArray[4].concat(workArray[3], workArray[2], workArray[1], workArray[0]);
		for (idx = 0; idx < workArray.length; idx++) {
			infoList.Add(new CMigRrtSrcKeywordInfo(workArray[idx][0], workArray[idx][1]));
		}
		infoList.Add(new CMigRrtSrcKeywordInfo("転生職", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_REINCARNATED)))
		infoList.Add(new CMigRrtSrcKeywordInfo("転生1次職", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_REINCARNATED_1ST)))
		infoList.Add(new CMigRrtSrcKeywordInfo("転生2次職", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_REINCARNATED_2ND)))
		infoList.Add(new CMigRrtSrcKeywordInfo("上位2次職", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_REINCARNATED_2ND)))
		infoList.Add(new CMigRrtSrcKeywordInfo("3次職", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_3RD)))
		infoList.Add(new CMigRrtSrcKeywordInfo("全ての職業", EnumMigRequiredJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_ANY)))
		infoList.Add(new CMigRrtSrcKeywordInfo("女性専用(未実装)", EnumMigJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_LADY)))
		infoList.Add(new CMigRrtSrcKeywordInfo("ノービス系を除く全ての職業", EnumMigJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_NOT_NOVICE)))
		infoList.Add(new CMigRrtSrcKeywordInfo("ノービスを除く全ての職業", EnumMigJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_NOT_NOVICE)))			// ノービス系として扱っているが、本当にノービスだけ除外かもしれない
		infoList.Add(new CMigRrtSrcKeywordInfo("女性専用(未実装)ノービス系を除く全ての職業", EnumMigJobId.GetDefinedPseudoName(MIG_REQUIRED_JOB_ID_NOT_NOVICE)))		// 一部のアイテムで起きるパターン。汎用対応が面倒なので個別に定義
		this.dataArray.push(infoList);



	}).call(this);

}





