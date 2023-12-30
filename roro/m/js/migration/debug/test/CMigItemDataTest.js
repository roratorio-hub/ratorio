
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//================================================================================================================================
//================================================================================================================================
//
//
// 定数定義
//
//
//================================================================================================================================
//================================================================================================================================















//================================================================================================================================
//================================================================================================================================
//
//
// クラス定義
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * アイテムデータテストクラス.
 */
function CMigItemDataTest () {

}














//================================================================================================================================
//
//
// テスト条件作成用関数　ここから
//
//
//================================================================================================================================

/**
 * テスト条件の配列を取得する（アイテムデータ移行テスト用）.
 * @param idTarget テスト対象のID
 */
CMigItemDataTest.GetTestConditionArrayItemDataMigration = function (idTarget) {

	var idx = 0;
	var idxLater = 0;


	var fragmentChara = null;
	var fragmentItemThis = null;
	var fragmentItemLater = null;
	var fragmentItemArray = null;
	var fragmentItemArrayB2M = null;
	var fragmentItemArrayM2B = null;
	var testConditionArray = null;



	// テスト条件フラグメント（キャラクター）を生成
	fragmentChara = new CMigTestConditionFragmentChara(g_constDataManager);

	// テスト条件フラグメント（アイテム）の配列を取得
	fragmentItemArrayB2M = CMigItemDataTest.GetTestConditionFragmentItemArrayB2M(idTarget);
	fragmentItemArrayM2B = CMigItemDataTest.GetTestConditionFragmentItemArrayM2B(idTarget);
	fragmentItemArray = fragmentItemArrayB2M.concat(fragmentItemArrayM2B);

	// フラグメント配列のコンパクション
	// 微妙な指定の違いで、B2M と M2B のテスト重複を取り除けないケースがあるが、不問とする
	for (idx = 0; idx < fragmentItemArray.length; idx++) {

		fragmentItemThis = fragmentItemArray[idx];

		// 自身より後の要素に対してループ
		for (idxLater = idx + 1; idxLater < fragmentItemArray.length; idxLater++) {

			fragmentItemLater = fragmentItemArray[idxLater];

			// フラグメントの情報が完全に一致している場合は、配列から取り除く
			if (fragmentItemLater.IsEqual(fragmentItemThis)) {
				fragmentItemArray.splice(idxLater, 1);
				idxLater--;
				continue;
			}
		}
	}

	// TODO: 複数アイテムを装備した状態でのテストは未考慮、未対応

	// テスト条件フラグメントを展開して、テスト条件の配列にする
	testConditionArray = CMigItemDataTest.ExtractFragmentsToConditionArray(fragmentChara, fragmentItemArray);



	return testConditionArray;
};














//--------------------------------------------------------------------------------------------------------------------------------
//
//
// テスト条件作成用関数　Ｂ２Ｍ系　ここから
//
//
//--------------------------------------------------------------------------------------------------------------------------------

/**
 * 移行前データからテスト条件フラグメント（アイテム用）の配列を取得する.
 * @param idTarget テスト対象のID
 */
CMigItemDataTest.GetTestConditionFragmentItemArrayB2M = function (idTarget) {

	var idx = 0;

	var fragmentItemBase = null;
	var fragmentItemArray = null;

	var dataBefore = null;
	var spDataArrayBefore = null;



	// 移行前データを取得
	dataBefore = ItemObjNew[idTarget];
	equipRegionId = CMigItemDataTest.GetEquipRegionIdByOldItemKind(ItemObjNew[idTarget][ITEM_DATA_INDEX_KIND]);
	spDataArrayBefore = dataBefore.slice(ITEM_DATA_INDEX_SPBEGIN);



	//--------------------------------
	// SP効果による条件の展開
	//--------------------------------

	fragmentItemArray = [];

	for (idx = 0; (idx + 1) < spDataArrayBefore.length; idx += 2) {

		// テスト条件の配列を用意し、初期条件を登録
		fragmentItemBase = new CMigTestConditionFragmentItem();

		// 初期条件に装備を設定
		fragmentItemBase.SetEquippingItemId(equipRegionId, idTarget);

		// 効果による展開
		CMigItemDataTest.ExtractTestEffectB2MSkillOffset(idTarget, spDataArrayBefore[idx], fragmentItemBase);

		// 条件による展開
		CMigItemDataTest.ExtractTestConditionB2MBaseLvOver(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MBaseLvBy(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MJobRestrict(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MPureParamOver(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MPureParamBy(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MRefinedOver(idTarget, spDataArrayBefore[idx], fragmentItemBase);
		CMigItemDataTest.ExtractTestConditionB2MRefinedBy(idTarget, spDataArrayBefore[idx], fragmentItemBase);

		// 結果の配列に追加
		fragmentItemArray.push(fragmentItemBase)
	}



	return fragmentItemArray;
};

/**
 * 旧SPID効果を元に、テスト条件を展開する（スキルオフセット系）.
 */
CMigItemDataTest.ExtractTestEffectB2MSkillOffset = function (idTarget, spid, fragmentItemBase) {

	var spidRemain = 0;
	var skillId = 0;

	// SPIDから、当該条件の値を切り出す
	spidRemain = spid % ITEM_SP_REFINE_BY_1_OFFSET;

	// スキル系オフセットが指定されていなければ、処理不要
	if (spidRemain < ITEM_SP_SKILL_DAMAGE_OFFSET) {
		return;
	}

	// スキルIDを取得
	skillId = (spidRemain - ITEM_SP_SKILL_DAMAGE_OFFSET) % 2000;

	// 条件に設定
	fragmentItemBase.AddEffectiveSkillId(skillId);
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（ベースレベル以上条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MBaseLvOver = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;

	var baseValueArrayUnder = [undefined, undefined, 99, undefined];
	var baseValueArrayOver = [170, 100, undefined, 175];

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor(spid / ITEM_SP_BASE_LV_OVER_170_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {

		switch (spidDivided) {

		// ベースレベル条件
		case 1:
		case 2:
		case 3:
		case 4:
			fragmentItemBase.SetJudgeBaseArrayParam(MIG_PARAM_ID_BASE_LV, [undefined, baseValueArrayUnder[spidDivided - 1], baseValueArrayOver[spidDivided - 1], undefined]);
			break;

		// ペット親密度用
		// TODO: 未対応
		case 5:
		case 6:
			WriteConsoleLog("未対応コード @ ExtractTestConditionB2MBaseLvOver");
		}
	}
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（ベースレベル上がる度に条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MBaseLvBy = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_BASE_LV_OVER_170_OFFSET) / ITEM_SP_BASE_LV_BY_1_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {
		fragmentItemBase.SetJudgeBaseArrayParam(MIG_PARAM_ID_BASE_LV, [undefined, undefined, undefined, spidDivided]);
	}
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（職業限定）.
 */
CMigItemDataTest.ExtractTestConditionB2MJobRestrict = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_BASE_LV_BY_1_OFFSET) / ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {
		fragmentItemBase.AddEffectiveJobId(spidDivided - 1);
	}
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（純粋なパラメータ以上条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MPureParamOver = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;

	var baseValueArray = [90, 108, 120, 125, 110, 80, 130];

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET) / ITEM_SP_PURE_STR_90_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {
		fragmentItemBase.SetJudgeBaseArrayParam((MIG_PARAM_ID_STR + ((spidDivided - 1) % 6)), [undefined, undefined, baseValueArray[Math.floor((spidDivided - 1) / 6)], undefined]);
	}
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（純粋なパラメータ上がる度に条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MPureParamBy = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;

	var	baseValueArray = [10];

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_PURE_STR_90_OFFSET) / ITEM_SP_PURE_STR_BY_10_OFFSET);

	// 発動条件が指定されている場合、展開する
	if ((0 < spidDivided) && (spidDivided <= 6)) {
		fragmentItemBase.SetJudgeBaseArrayParam((MIG_PARAM_ID_STR + ((spidDivided - 1) % 6)), [undefined, undefined, undefined, baseValueArray[Math.floor((spidDivided - 1) / 6)]]);
	}
	else if (spidDivided == 7) {
		fragmentItemBase.SetJudgeBaseArrayParam(MIG_PARAM_ID_DEX, [undefined, undefined, undefined, 1]);
	}
	else if (spidDivided == 8) {
		fragmentItemBase.SetJudgeBaseArrayParam(MIG_PARAM_ID_VIT, [undefined, undefined, undefined, 1]);
	}
};


/**
 * 旧SPID条件を元に、テスト条件を展開する（精錬値以上条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MRefinedOver = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;
	var dataTarget = 0;
	var regionId = 0;

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_PURE_STR_BY_10_OFFSET) / ITEM_SP_REFINE_OVER_1_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {

		// 対象のIDから、設定すべき場所を特定する
		dataTarget = ItemObjNew[idTarget];		// 旧データから検索する
		regionId = CMigItemDataTest.GetEquipRegionIdByOldItemKind(dataTarget[ITEM_DATA_INDEX_KIND]);

		fragmentItemBase.SetJudgeBaseArrayRefined(regionId, [undefined, undefined, spidDivided, undefined]);
	}
};

/**
 * 旧SPID条件を元に、テスト条件を展開する（精錬値上がる度に条件）.
 */
CMigItemDataTest.ExtractTestConditionB2MRefinedBy = function (idTarget, spid, fragmentItemBase) {

	var spidDivided = 0;
	var dataKind = 0;
	var regionId = 0;

	// SPIDから、当該条件の値を切り出す
	spidDivided = Math.floor((spid % ITEM_SP_REFINE_OVER_1_OFFSET) / ITEM_SP_REFINE_BY_1_OFFSET);

	// 発動条件が指定されている場合、展開する
	if (spidDivided > 0) {

		// 対象のIDから、設定すべき場所を特定する
		dataTarget = ItemObjNew[idTarget];		// 旧データから検索する
		regionId = CMigItemDataTest.GetEquipRegionIdByOldItemKind(dataTarget[ITEM_DATA_INDEX_KIND]);

		fragmentItemBase.SetJudgeBaseArrayRefined(regionId, [undefined, undefined, undefined, spidDivided]);
	}
};















//--------------------------------------------------------------------------------------------------------------------------------
//
//
// テスト条件作成用関数　Ｍ２Ｂ系　ここから
//
//
//--------------------------------------------------------------------------------------------------------------------------------

/**
 * 移行後データからテスト条件フラグメント（アイテム用）の配列を取得する.
 * @param idTarget テスト対象のID
 */
CMigItemDataTest.GetTestConditionFragmentItemArrayM2B = function (idTarget) {

	var idx = 0;

	var fragmentItemBase = null;
	var fragmentItemArray = null;

	var itemData = null;



	// 移行後データを取得
	itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, idTarget);
	equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByMigItemKind(
		itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_TYPE),
		itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_POSITION)
	);



	// テスト条件の配列を用意し、初期条件を登録
	fragmentItemBase = new CMigTestConditionFragmentItem();

	// 初期条件に装備を設定
	fragmentItemBase.SetEquippingItemId(equipRegionId, idTarget);



	//--------------------------------
	// SP条件、SP効果による条件の展開
	//--------------------------------

	fragmentItemArray = [];

	itemData.ForEachSpData(
		function (valueF, indexF, arrayF) {

			var fragmentItemArrayWorkF = null;

			// 初期値を設定
			fragmentItemArrayWorkF = [fragmentItemBase.Clone()];

			// SPデータ展開（呼び出し先で再帰処理）
			fragmentItemArrayWorkF = CMigItemDataTest.ExtractTestSpDataM2B(valueF, fragmentItemArrayWorkF);

			// 結果に追加
			fragmentItemArray = fragmentItemArray.concat(fragmentItemArrayWorkF);
		}
	);



	return fragmentItemArray;
};



/**
 * 移行後SPを元に、テスト条件を展開する.
 */
CMigItemDataTest.ExtractTestSpDataM2B = function (spData, fragmentItemArray) {

	var idx = 0;

	var fragmentItemArrayBase = null;
	var fragmentItemArrayExtracted = null;



	// 引数のテスト条件を複製
	fragmentItemArrayBase = new Array();
	for (idx = 0; idx < fragmentItemArray.length; idx++) {
		fragmentItemArrayBase.push(fragmentItemArray[idx].Clone());
	}



	// 条件による展開
	CMigItemDataTest.ExtractTestConditionM2B(spData, fragmentItemArrayBase);

	// 効果による展開
	CMigItemDataTest.ExtractTestEffectM2B(spData, fragmentItemArrayBase);



	// 子要素の展開
	fragmentItemArrayExtracted = new Array();
	for (idx = 0; idx < spData.children.length; idx++) {
		fragmentItemArrayExtracted = fragmentItemArrayExtracted.concat(CMigItemDataTest.ExtractTestSpDataM2B(spData.children[idx], fragmentItemArrayBase));
	}



	return ((fragmentItemArrayExtracted.length > 0) ? fragmentItemArrayExtracted : fragmentItemArray);
};



/**
 * 移行後SP条件を元に、テスト条件を展開する.
 */
CMigItemDataTest.ExtractTestConditionM2B = function (spData, fragmentItemArray) {

	var idx = 0;
	var idxArray = 0;
	var idxParam = 0;
	var idxItem = 0;
	var idxRegion = 0;
	var idxType = 0;
	var idxSkill = 0;

	var judgeBaseArray = null;
	var spParamArray = null;
	var spItemArray = null;
	var spItemRegionArray = null;
	var spItemTypeArray = null;
	var itemData = null;
	var itemKind = 0;
	var equipRegionId = 0;
	var spSkillArray = null;
	var spJobArray = null;
	var spJobSeriesArray = null;
	var spItemArray = null;
	var spCardArray = null;
	var spArrowArray = null;
	var withOneFlag = false;

	var fragmentItemWork = null;
	var fragmentItemArrayWork = null;

	var paramIdArray = [
		MIG_PARAM_ID_STR,
		MIG_PARAM_ID_AGI,
		MIG_PARAM_ID_VIT,
		MIG_PARAM_ID_INT,
		MIG_PARAM_ID_DEX,
		MIG_PARAM_ID_LUK,
	];

	var funcGetJudgeBaseArray = function (spDataF) {

		var base = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		var flag = spDataF.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);

		switch (flag) {

		case MIG_BORDER_FLAG_ID_EQUAL:
			return [undefined, undefined, base, undefined];

		case MIG_BORDER_FLAG_ID_UNDER:
			reutrn [undefined, base, undefined, undefined];

		case MIG_BORDER_FLAG_ID_OVER:
			return [undefined, undefined, base, undefined];

		case MIG_BORDER_FLAG_ID_BY:
			return [undefined, undefined, undefined, base];
		}

		return [];
	};



	// SP条件IDで振り分け
	switch (spData.GetSpId()) {



	// ベースレベル条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_BASE_LEVEL:
		for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
			fragmentItemArray[idxArray].SetJudgeBaseArrayParam(MIG_PARAM_ID_BASE_LV, funcGetJudgeBaseArray(spData));
		}
		break;



	// 純粋なステータス条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_PURE_PARAM:

		// パラメータ指定の配列を取得
		spParamArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM);

		// 所定のパラメータが、取得した配列に含まれている場合は、条件を追記する
		for (idxParam = 0; idxParam < paramIdArray.length; idxParam++) {

			if (spParamArray.indexOf(paramIdArray[idxParam]) < 0) {
				continue;
			}

			for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
				fragmentItemArray[idxArray].SetJudgeBaseArrayParam(paramIdArray[idxParam], funcGetJudgeBaseArray(spData));
			}
		}
		break;



	// アイテム精錬値条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED:
	case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED_OLD:

		// アイテム指定の配列を取得
		spItemArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);

		// 取得したアイテム指定からアイテム種別を取得し、装備領域を特定して条件に追記する
		for (idxItem = 0; idxItem < spItemArray.length; idxItem++) {

			// TODO:
			// 移行過渡期処理
			itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, spItemArray[idxItem]);
			if (itemData) {
				equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByMigItemKind(
					itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_TYPE),
					itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_POSITION)
				);
			}
			else {
				itemKind = ItemObjNew[spItemArray[idxItem]][ITEM_DATA_INDEX_KIND];
				equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByOldItemKind(itemKind);
			}


			for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
				fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(equipRegionId, funcGetJudgeBaseArray(spData));
			}
		}
		break;



	// アイテム装備領域精錬値条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_EQUIP_REGION_REFINED:

		// アイテム装備領域指定の配列を取得
		spItemRegionArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_EQUIP_REGION);

		// すべての装備領域を条件に追記する
		for (idxRegion = 0; idxRegion < spItemRegionArray.length; idxRegion++) {

			equipRegionId = spItemRegionArray[idxRegion];

			for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
				fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(equipRegionId, funcGetJudgeBaseArray(spData));
			}
		}
		break;



	// アイテム系列精錬値条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_TYPE_REFINED:

		// アイテム系列指定の配列を取得
		spItemTypeArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_TYPE);

		// すべての系列を条件に追記する
		for (idxType = 0; idxType < spItemTypeArray.length; idxType++) {

			switch (spItemTypeArray[idxType]) {

			// 片手武器
			case MIG_ITEM_TYPE_KNIFE:
			case MIG_ITEM_TYPE_SWORD:
			case MIG_ITEM_TYPE_SPEAR:
			case MIG_ITEM_TYPE_AXE:
			case MIG_ITEM_TYPE_MACE:
			case MIG_ITEM_TYPE_STUFF:
			case MIG_ITEM_TYPE_BOOK:
			case MIG_ITEM_TYPE_FIST:
			case MIG_ITEM_TYPE_MUSICAL:
			case MIG_ITEM_TYPE_WHIP:

				// 右手武器
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_ARMS_RIGHT, funcGetJudgeBaseArray(spData));
				}

				// TODO: 二刀流左手未対応（この時点では職業は決定されていない）
				/*
				// 二刀流可能職業なら、左手武器にも設定
				if (IsDualArmsJob(this.GetJob())) {
					for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
						fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_ARMS_LEFT, funcGetJudgeBaseArray(spData));
					}
				}
				*/
				break;

			// 両手武器
			case MIG_ITEM_TYPE_SWORD_2HAND:
			case MIG_ITEM_TYPE_SPEAR_2HAND:
			case MIG_ITEM_TYPE_AXE_2HAND:
			case MIG_ITEM_TYPE_STUFF_2HAND:
			case MIG_ITEM_TYPE_BOW:
			case MIG_ITEM_TYPE_KATAR:
			case MIG_ITEM_TYPE_FUMA:
			case MIG_ITEM_TYPE_HANDGUN:
			case MIG_ITEM_TYPE_RIFLE:
			case MIG_ITEM_TYPE_SHOTGUN:
			case MIG_ITEM_TYPE_GATLINGGUN:
			case MIG_ITEM_TYPE_GRENADEGUN:

				// 右手武器のみ
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_ARMS_RIGHT, funcGetJudgeBaseArray(spData));
				}
				break;

			// 防具系
			case MIG_ITEM_TYPE_HELM:
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_HEAD_TOP, funcGetJudgeBaseArray(spData));
				}
				break;

			case MIG_ITEM_TYPE_ARMOR:
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_BODY, funcGetJudgeBaseArray(spData));
				}
				break;

			case MIG_ITEM_TYPE_SHIELD:
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_SHIELD, funcGetJudgeBaseArray(spData));
				}
				break;

			case MIG_ITEM_TYPE_SHOULDER:
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_SHOULDER, funcGetJudgeBaseArray(spData));
				}
				break;

			case MIG_ITEM_TYPE_SHOES:
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].SetJudgeBaseArrayRefined(MIG_EQUIP_REGION_ID_FOOT, funcGetJudgeBaseArray(spData));
				}
				break;

			}
		}
		break;



	// スキル習得条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED:
	case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL:
	case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL_V2:

		// スキル指定の配列を取得
		spSkillArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);

		// 取得したアイテム指定からアイテム種別を取得し、装備領域を特定して条件に追記する
		for (idxSkill = 0; idxSkill < spSkillArray.length; idxSkill++) {
			for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
				fragmentItemArray[idxArray].SetJudgeBaseArrayLearned(spSkillArray[idxSkill], funcGetJudgeBaseArray(spData));
			}
		}
		break;



	// 職業が装備時条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_JOB_EQUIPPING:

		// 職業指定の配列を取得
		spJobSeriesArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_JOB_SERIES);

		// 取得した職業指定を、条件に追記する
		spJobSeriesArray.forEach(
			function (currentValueF, indexF, arrayF) {
				var idxArrayF = 0;
				for (idxArrayF = 0; idxArrayF < fragmentItemArray.length; idxArrayF++) {
					fragmentItemArray[idxArrayF].AddEffectiveJobSeriesId(currentValueF);
				}
			}
		);
		break;



	// 共に装備時条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE:
	case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL:
	case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL_V2:

		// アイテム指定の配列を取得
		spItemArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);
		spCardArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);
		spArrowArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);

		// 『いずれかと共に』フラグを判定
		withOneFlag = (spData.GetSpId() == MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE);

		// 個別処理の関数をコール
		if (spItemArray !== undefined) {
			fragmentItemArray = CMigItemDataTest.ExtractTestConditionM2BSubEquipItem(spItemArray, fragmentItemArray, withOneFlag);
		}
		if (spCardArray !== undefined) {
			fragmentItemArray = CMigItemDataTest.ExtractTestConditionM2BSubEquipCard(spCardArray, fragmentItemArray, withOneFlag);
		}
		if (spArrowArray !== undefined) {
			fragmentItemArray = CMigItemDataTest.ExtractTestConditionM2BSubEquipArrow(spArrowArray, fragmentItemArray, withOneFlag);
		}
		break;



	// ペットのいずれかと共に装備時条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ONE:
	case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ALL:
// TODO: 未対応
		break;



	// モンスターを倒したとき条件
	case MIG_EQUIPABLE_SP_CONDITION_ID_KILL:
	case MIG_EQUIPABLE_SP_CONDITION_ID_KILL_RACE:
		// テストケースの展開なし
		break;

	// スキル使用時
	case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_USED:
		// テストケースの展開なし
		break;

	// スキル攻撃命中時
	case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_HITTED:
		// テストケースの展開なし
		break;

	// アイテム使用時
	case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_USED:
		// テストケースの展開なし
		break;

	// 装備解除時
	case MIG_EQUIPABLE_SP_CONDITION_ID_DISARMED:
		// テストケースの展開なし
		break;



	}

};



/**
 * 移行後SP条件を元に、テスト条件を展開する（サブ　アイテム装備展開用）.
 */
CMigItemDataTest.ExtractTestConditionM2BSubEquipItem = function (spItemArray, fragmentItemArray, bWithOne) {

	var idxItem = 0;
	var idxArray = 0;

	var itemKind = 0;
	var equipRegionId = 0;

	var fragmentItemWork = null;
	var fragmentItemArrayWork = null;



	// 結果用配列を確保
	fragmentItemArrayWork = [];

	// 取得したアイテム指定からアイテム種別を取得し、装備領域を特定して条件に追記する
	for (idxItem = 0; idxItem < spItemArray.length; idxItem++) {

		// TODO:
		// 移行前データを扱うタイミングもあるので、旧データから参照する
		// itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, spItemArray[idxItem]);
		// equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByMigItemKind(
		// 	itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_TYPE),
		// 	itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_POSITION)
		// );
		// // アクセサリ１が埋まってる場合は、アクセサリ２に振り替える
		// if (itemData.GetKind() == MIG_ITEM_KIND_ACCESSORY) {
		// 	if (fragmentItemArray[idxArray].GetEquippingItemId(MIG_EQUIP_REGION_ID_ACCESSORY_1) !== undefined) {
		//		equipRegionId = MIG_EQUIP_REGION_ID_ACCESSORY_2;
		//	}
		// }

		itemKind = ItemObjNew[spItemArray[idxItem]][ITEM_DATA_INDEX_KIND];
		equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByOldItemKind(itemKind);

		for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

			// アクセサリ１が埋まってる場合は、アクセサリ２に振り替える
			if (itemKind == ITEM_KIND_ACCESSARY) {
				if (fragmentItemArray[idxArray].GetEquippingItemId(MIG_EQUIP_REGION_ID_ACCESSORY_1) !== undefined) {
					equipRegionId = MIG_EQUIP_REGION_ID_ACCESSORY_2;
				}
			}

			// いずれかと装備時条件の場合は、別々の条件として追加する
			if (bWithOne) {

				// フラグメントを複製
				fragmentItemWork = fragmentItemArray[idxArray].Clone();

				// 装備を設定
				fragmentItemWork.SetEquippingItemId(equipRegionId, spItemArray[idxItem]);

				// 作業用の配列に追加
				fragmentItemArrayWork.push(fragmentItemWork);
			}

			// そうでない場合は、同一の条件にすべて設定する
			else {
				fragmentItemArray[idxArray].SetEquippingItemId(equipRegionId, spItemArray[idxItem]);
			}
		}
	}



	// 結果を返す
	return ((fragmentItemArrayWork.length > 0) ? fragmentItemArrayWork : fragmentItemArray);
}

/**
 * 移行後SP条件を元に、テスト条件を展開する（サブ　カード装備展開用）.
 */
CMigItemDataTest.ExtractTestConditionM2BSubEquipCard = function (spCardArray, fragmentItemArray, bWithOne) {

	var idxCard = 0;
	var idxArray = 0;
	var idxCandidate = 0;

	var cardKind = 0;
	var candidateCardRegionIdArray = 0;
	var candidateData = null;

	var fragmentItemWork = null;
	var fragmentItemArrayWork = null;



	// 結果用配列を確保
	fragmentItemArrayWork = [];

	// 取得したアイテム指定からアイテム種別を取得し、装備領域を特定して条件に追記する
	for (idxCard = 0; idxCard < spCardArray.length; idxCard++) {

		// TODO:
		// 移行前データを扱うタイミングもあるので、旧データから参照する
		cardKind = CardObjNew[spCardArray[idxCard]][CARD_DATA_INDEX_KIND];

		// 装着部位の候補の決定
		switch (cardKind) {

		case CARD_KIND_ARMS:
			// TODO: 左手未対応
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 0],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 1],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 2],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 3],
			];
			break;

		case CARD_KIND_HEAD:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_HEAD_TOP, 0],
				[MIG_EQUIP_REGION_ID_HEAD_MID, 0],
			];
			break;

		case CARD_KIND_SHIELD:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_SHIELD, 0],
			];
			break;

		case CARD_KIND_BODY:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_BODY, 0],
			];
			break;

		case CARD_KIND_SHOULDER:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_SHOULDER, 0],
			];
			break;

		case CARD_KIND_FOOT:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_FOOT, 0],
			];
			break;

		case CARD_KIND_ACCESSARY:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_ACCESSORY_1, 0],
				[MIG_EQUIP_REGION_ID_ACCESSORY_2, 0],
			];
			break;

		case CARD_KIND_ANY:
			candidateCardRegionIdArray = [
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 0],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 1],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 2],
				[MIG_EQUIP_REGION_ID_ARMS_RIGHT, 3],
				[MIG_EQUIP_REGION_ID_HEAD_TOP, 0],
				[MIG_EQUIP_REGION_ID_HEAD_MID, 0],
				[MIG_EQUIP_REGION_ID_SHIELD, 0],
				[MIG_EQUIP_REGION_ID_BODY, 0],
				[MIG_EQUIP_REGION_ID_SHOULDER, 0],
				[MIG_EQUIP_REGION_ID_FOOT, 0],
				[MIG_EQUIP_REGION_ID_ACCESSORY_1, 0],
				[MIG_EQUIP_REGION_ID_ACCESSORY_2, 0],
			];
			break;

		default:
			candidateCardRegionIdArray = [];
			break;
		}

		// エンチャントの場合は、装備個所に設定するのではなく、エンチャントのリストに記録しておく
		if (candidateCardRegionIdArray.length == 0) {

			// いずれかと装備時条件の場合は、別々の条件として追加する
			if (bWithOne) {
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					// フラグメントを複製
					fragmentItemWork = fragmentItemArray[idxArray].Clone();

					// カードをを設定
					fragmentItemWork.AddRequiredEnchantId(spCardArray[idxCard]);

					// 作業用の配列に追加
					fragmentItemArrayWork.push(fragmentItemWork);
				}
			}

			// そうでない場合は、同一の条件にすべて設定する
			else {
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
					fragmentItemArray[idxArray].AddRequiredEnchantId(spCardArray[idxCard]);
				}
			}
		}

		// そうでなければ、装備個所に設定する
		else {

			for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

				// 装着されていない場所を探す
				for (idxCandidate = 0; idxCandidate < candidateCardRegionIdArray.length; idxCandidate++) {

					// 候補データを取得
					candidateData = candidateCardRegionIdArray[idxCandidate];

					// すでに設定されている場合は、次へ
					if (fragmentItemArray[idxArray].GetEquippingCardId(candidateData[0], candidateData[1]) !== undefined) {
						continue;
					}

					// いずれかと装備時条件の場合は、別々の条件として追加する
					if (bWithOne) {

						// フラグメントを複製
						fragmentItemWork = fragmentItemArray[idxArray].Clone();

						// 装備を設定
						fragmentItemWork.SetEquippingCardId(candidateData[0], candidateData[1], spCardArray[idxCard]);

						// 作業用の配列に追加
						fragmentItemArrayWork.push(fragmentItemWork);
					}

					// そうでない場合は、同一の条件にすべて設定する
					else {
						fragmentItemArray[idxArray].SetEquippingCardId(candidateData[0], candidateData[1], spCardArray[idxCard]);
					}

					break;
				}

				if (idxCandidate >= candidateCardRegionIdArray.length) {
					alert("カード装備展開失敗");
				}
			}
		}
	}



	// 結果を返す
	return ((fragmentItemArrayWork.length > 0) ? fragmentItemArrayWork : fragmentItemArray);
}

/**
 * 移行後SP条件を元に、テスト条件を展開する（サブ　矢装備展開用）.
 */
CMigItemDataTest.ExtractTestConditionM2BSubEquipArrow = function (spArrowArray, fragmentItemArray, bWithOne) {

	var idxArrow = 0;
	var idxArray = 0;

	var arrowKind = 0;
	var equipRegionId = 0;

	var fragmentItemWork = null;
	var fragmentItemArrayWork = null;



	// 結果用配列を確保
	fragmentItemArrayWork = [];

	// 取得した矢指定から矢種別を取得し、装備領域を特定して条件に追記する
	for (idxArrow = 0; idxArrow < spArrowArray.length; idxArrow++) {

		equipRegionId = MIG_EQUIP_REGION_ID_ARROW;

		for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

			// いずれかと装備時条件の場合は、別々の条件として追加する
			if (bWithOne) {

				// フラグメントを複製
				fragmentItemWork = fragmentItemArray[idxArray].Clone();

				// 装備を設定
				fragmentItemWork.SetEquippingArrowId(equipRegionId, spArrowArray[idxArrow]);

				// 作業用の配列に追加
				fragmentItemArrayWork.push(fragmentItemWork);
			}

			// そうでない場合は、同一の条件にすべて設定する
			else {
				fragmentItemArray[idxArray].SetEquippingArrowId(equipRegionId, spArrowArray[idxArrow]);
			}
		}
	}



	// 結果を返す
	return ((fragmentItemArrayWork.length > 0) ? fragmentItemArrayWork : fragmentItemArray);
}



/**
 * 移行後SP効果を元に、テスト条件を展開する.
 */
CMigItemDataTest.ExtractTestEffectM2B = function (spData, fragmentItemArray) {

	var idx = 0;
	var idxArray = 0;
	var idxSkill = 0;
	var idxMonster = 0;

	var arrayWork = null;

	var skillId = 0;
	var skillIdArray = null;
	var monsterMapId = 0;
	var monsterMapIdArray = null;
	var monsterIdArray = null;
	var methodIdArray = null;
	var methodIdArrayNotEffective = null;

	var funcAddEffectiveAttributes = function (attrId) {

		var idxF = 0;
		var idxArrayF = 0;

		var attrValueArrayF = null;

		attrValueArrayF = spData.GetAttribute(attrId);

		if (!attrValueArrayF) {
			return;
		}

		for (idxF = 0; idxF < attrValueArrayF.length; idxF++) {

			for (idxArrayF = 0; idxArrayF < fragmentItemArray.length; idxArrayF++) {
				fragmentItemArray[idxArrayF].AddEffectiveAttribute(attrId, attrValueArrayF[idxF]);
			}
		}
	};



	// スキル効果系SPID
	switch (spData.GetSpId()) {

	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE:
	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD:
	case MIG_EQUIPABLE_SP_EFFECT_ID_CAST_TIME:
	case MIG_EQUIPABLE_SP_EFFECT_ID_FIXED_TIME:
	case MIG_EQUIPABLE_SP_EFFECT_ID_COOL_TIME:
	case MIG_EQUIPABLE_SP_EFFECT_ID_SKILL_DELAY:
	case MIG_EQUIPABLE_SP_EFFECT_ID_SKILL_COST:
	case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL:
	case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED:
	case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL:

		// スキル指定が存在する場合は、条件に追記する
		funcAddEffectiveAttributes(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);
		break;

	}


	// モンスターマップ指定系SPID
	switch (spData.GetSpId()) {

	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE:
	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD:
	case MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE:
	case MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE_OLD:
	case MIG_EQUIPABLE_SP_EFFECT_ID_RESIST:
	case MIG_EQUIPABLE_SP_EFFECT_ID_RESIST_OLD:

		// モンスターマップ指定が存在する場合は、条件に追記する
		monsterMapIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_MAP_MONSTER);
		if (monsterMapIdArray) {
			for (idxMap = 0; idxMap < monsterMapIdArray.length; idxMap++) {

				// 当該マップに登録されているすべてのモンスターを登録する
				monsterMapId = monsterMapIdArray[idxMap];
				monsterIdArray = g_MonsterMapDataArray[monsterMapId][MONSTER_MAP_DATA_INDEX_DATA_ARRAY];

				for (idxMonster = 0; idxMonster < monsterIdArray.length; idxMonster++) {
					for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {
						fragmentItemArray[idxArray].AddEffectiveMonsterId(monsterIdArray[idxMonster]);
					}
				}
			}
		}
		break;

	}



	// サイズ指定系SPID
//	funcAddEffectiveAttributes(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SIZE);



	// 手段限定効果系SPID
	switch (spData.GetSpId()) {

	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE:
	case MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD:

		// 手段の取得
		// 旧式は暗黙の物理限定なので加工する
		if (spData.GetSpId() == MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD) {
			methodIdArray = [MIG_METHOD_ID_PHYSICAL];
		}
		else {
			methodIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD);
		}
		methodIdArrayNotEffective = [];

		// 手段に応じて調整
		if (methodIdArray) {

			// 物理限定がある場合
			if (methodIdArray.indexOf(MIG_METHOD_ID_PHYSICAL) >= 0) {

				// 引数で渡されたフラグメント配列の各要素について、物理攻撃がなければ、通常攻撃を追加する
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					skillIdArray = fragmentItemArray[idxArray].GetEffectiveSkillIdArray();

					for (idxSkill = 0; idxSkill < skillIdArray.length; idxSkill++) {
						// TODO: オートスペル系回避用暫定措置
						skillId = CAttackMethodData.GetSkillIdFromFullId(skillIdArray[idxSkill]);
						if ((g_skillManager.GetSkillType(skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
							break;
						}
					}

					if (idxSkill >= skillIdArray.length) {
						fragmentItemArray[idxArray].AddEffectiveSkillId(SKILL_ID_TUZYO_KOGEKI);
					}
				}
			}

			// 近距離限定がある場合
			if (methodIdArray.indexOf(MIG_METHOD_ID_PHYSICAL_SHORT) >= 0) {

				// 引数で渡されたフラグメント配列の各要素について、近距離物理攻撃がなければ、通常攻撃を追加する
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					skillIdArray = fragmentItemArray[idxArray].GetEffectiveSkillIdArray();

					for (idxSkill = 0; idxSkill < skillIdArray.length; idxSkill++) {
						// TODO: オートスペル系回避用暫定措置
						skillId = CAttackMethodData.GetSkillIdFromFullId(skillIdArray[idxSkill]);
						if ((g_skillManager.GetSkillRange(skillId) & CSkillData.RANGE_SHORT) == CSkillData.RANGE_SHORT) {
							break;
						}
					}

					if (idxSkill >= skillIdArray.length) {
						fragmentItemArray[idxArray].AddEffectiveSkillId(SKILL_ID_TUZYO_KOGEKI);
					}
				}
			}

			// 遠距離限定がある場合
			if (methodIdArray.indexOf(MIG_METHOD_ID_PHYSICAL_LONG) >= 0) {

				// 引数で渡されたフラグメント配列の各要素について、遠距離物理攻撃がなければ、「ティオアプチャギ」（スキルカード）を追加する
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					skillIdArray = fragmentItemArray[idxArray].GetEffectiveSkillIdArray();

					for (idxSkill = 0; idxSkill < skillIdArray.length; idxSkill++) {
						// TODO: オートスペル系回避用暫定措置
						skillId = CAttackMethodData.GetSkillIdFromFullId(skillIdArray[idxSkill]);
						if ((g_skillManager.GetSkillRange(skillId) & CSkillData.RANGE_LONG) == CSkillData.RANGE_LONG) {
							break;
						}
					}

					if (idxSkill >= skillIdArray.length) {
						// TODO: 定数直指定
						fragmentItemArray[idxArray].AddEffectiveSkillId(10079);
					}
				}
			}

			// 魔法限定がある場合
			if (methodIdArray.indexOf(MIG_METHOD_ID_MAGICAL) >= 0) {

				// 引数で渡されたフラグメント配列の各要素について、魔法攻撃がなければ、「ヘルインフェルノ」（スクロール扱い）を追加する
				// （ヘルインフェルノなら、火属性＋闇属性なので、属性相性が完全に０％になることはないハズ）
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					skillIdArray = fragmentItemArray[idxArray].GetEffectiveSkillIdArray();

					for (idxSkill = 0; idxSkill < skillIdArray.length; idxSkill++) {
						// TODO: オートスペル系回避用暫定措置
						skillId = CAttackMethodData.GetSkillIdFromFullId(skillIdArray[idxSkill]);
						if ((g_skillManager.GetSkillType(skillId) & CSkillData.TYPE_MAGICAL) == CSkillData.TYPE_MAGICAL) {
							break;
						}
					}

					if (idxSkill >= skillIdArray.length) {
						fragmentItemArray[idxArray].AddEffectiveSkillId(SKILL_ID_HELL_INFERNO);
					}
				}
			}

			// クリティカル限定がある場合
			if (methodIdArray.indexOf(MIG_METHOD_ID_CRITICAL) >= 0) {

				// 引数で渡されたフラグメント配列の各要素について、「通常攻撃」がなければ、「通常攻撃」を追加する
				for (idxArray = 0; idxArray < fragmentItemArray.length; idxArray++) {

					skillIdArray = fragmentItemArray[idxArray].GetEffectiveSkillIdArray();

					if (skillIdArray.indexOf(SKILL_ID_TUZYO_KOGEKI) < 0) {
						fragmentItemArray[idxArray].AddEffectiveSkillId(SKILL_ID_TUZYO_KOGEKI);
					}
				}
			}

		}
		break;

	}

};














//--------------------------------------------------------------------------------------------------------------------------------
//
//
// テスト条件配列展開用関数　ここから
//
//
//--------------------------------------------------------------------------------------------------------------------------------

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する.
 */
CMigItemDataTest.ExtractFragmentsToConditionArray = function (fragmentChara, fragmentItemArray) {

	var idx = 0;

	var fragmentItem = null;

	var testCondition = null;
	var testConditionBase = null;
	var testConditionArrayBase = null;
	var testConditionArrayWork = null;
	var testConditionArrayResult = null;

	var conditionalParamIdArray = [
		MIG_PARAM_ID_BASE_LV,
		MIG_PARAM_ID_STR,
		MIG_PARAM_ID_AGI,
		MIG_PARAM_ID_VIT,
		MIG_PARAM_ID_INT,
		MIG_PARAM_ID_DEX,
		MIG_PARAM_ID_LUK,
	];

	var refinableEquipRegionIdArray = [
		MIG_EQUIP_REGION_ID_ARMS_RIGHT,
		MIG_EQUIP_REGION_ID_ARMS_LEFT,
		MIG_EQUIP_REGION_ID_HEAD_TOP,
		MIG_EQUIP_REGION_ID_SHIELD,
		MIG_EQUIP_REGION_ID_BODY,
		MIG_EQUIP_REGION_ID_SHOULDER,
		MIG_EQUIP_REGION_ID_FOOT,
	];

	var funcSetEquipLooper = function (idxF, nameF, valueF) {

		var itemIdF = fragmentItem.GetEquippingItemId(valueF);
		var textSpacer = "　　　　";

		if (itemIdF !== undefined) {
			testCondition.SetEquip(valueF, itemIdF);
		}
	};

	// パラメータ条件処理用呼び出し関数
	var funcCallerParam = function (currentValueF, indexF, arrayF) {
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubParam(testConditionArrayWork, fragmentItem, currentValueF);
	};

	// 精錬値条件処理用呼び出し関数
	var funcCallerRefined = function (currentValueF, indexF, arrayF) {
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubRefined(testConditionArrayWork, fragmentItem, currentValueF);
	};

	// スキル習得条件処理用呼び出し関数
	var funcCallerLearned = function (valueF, keyF, mapF) {
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubLearned(testConditionArrayWork, keyF, valueF);
	};



	// ベースとなる条件を生成
	testConditionBase = new CMigTestCondition();

	// 結果用の配列を確保
	testConditionArrayResult = [];



	for (idx = 0; idx < fragmentItemArray.length; idx++) {

		// フラグメントを取得
		// このフラグメント１つから、条件に応じた個数のテストケースへ展開する
		fragmentItem = fragmentItemArray[idx];

		// ベースとなる条件を複製
		testCondition = testConditionBase.Clone();

		// 装備を設定
		EnumMigEquipRegionId.For(funcSetEquipLooper);

		// ベースとなる条件配列を、作業用に設定
		testConditionArrayWork = [testCondition];



		// 作業用の配列に条件を付与しながら展開していく
		// 各呼び出し処理で、testConditionArrayWork に展開された配列が随時追加される
		// 各呼び出し処理単位で、直前までに展開された testConditionArrayWork を参照する

		// パラメータ条件設定展開
		conditionalParamIdArray.forEach(funcCallerParam);

		// 精錬値条件設定展開
		refinableEquipRegionIdArray.forEach(funcCallerRefined);

		// スキル習得レベル条件設定展開
		fragmentItem.ForEachJudgeBaseArrayLearned(funcCallerLearned);

		// 職業条件設定展開
		// 後続の補正処理で合わせて実行する

		// 装備セット条件設定展開
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubEquipWith(testConditionArrayWork, fragmentItem);



		// スキル効果展開
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubSkillEffects(testConditionArrayWork, fragmentItem);

		// サイズ指定展開
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubSizeEffects(testConditionArrayWork, fragmentItem);

		// モンスター指定展開
		testConditionArrayWork = CMigItemDataTest.ExtractFragmentsToConditionArraySubMonsterEffects(testConditionArrayWork, fragmentItem);



		// 展開された条件を元に、職業を補正
		testConditionArrayWork = CMigItemDataTest.ModifyJobIdCondition(testConditionArrayWork, fragmentItem);



		// 最終結果に追記
		testConditionArrayResult = testConditionArrayResult.concat(testConditionArrayWork);
	}



	return testConditionArrayResult;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　パラメータ用）.
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubParam = function (testConditionArrayBase, fragmentItem, paramId) {

	var idxBase = 0;

	var judgeInfoArray = null;
	var candidateInfoArray = null;
	var testConditionArrayExtracted = null;
	var testConditionCloned = null;
	var valueMin = 0;
	var valueMax = 0;
	var paramValue = 0;



	// 条件指定のマップから、該当要素の判定情報配列を取得
	judgeInfoArray = fragmentItem.GetJudgeBaseArrayParam(paramId);

	// 登録されていなければ、処理しない
	if (judgeInfoArray === undefined) {
		return testConditionArrayBase;
	}



	// 候補を元に展開
	testConditionArrayExtracted = [];

	for (idxBase = 0; idxBase < testConditionArrayBase.length; idxBase++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idxBase];

		// 値の候補の範囲を取得する
		// （職業による判定は、もっと後の段階で行うので、ここでは全体の範囲を指定する）
		valueMin = 0;
		valueMax = 0;

		switch (paramId) {

		case MIG_PARAM_ID_BASE_LV:

			// 装着されている装備の、要求レベルの最大値を取得する
			requiredLevel = 1;
			EnumEquipRegionId.For(
				function (idxF, nameF, valueF) {
					var equippedIdF = testCondition.GetEquip(valueF);
					if (equippedIdF === undefined) {
						return;
					}
					// TODO: 移行前のデータを参照するタイミングあるかもしれないので、旧データから検索する
					requiredLevel = Math.max(requiredLevel, ItemObjNew[equippedIdF][ITEM_DATA_INDEX_EQPLV]);
				}
			);

			// 要求レベル以上の条件とする
			valueMin = Math.max(1, requiredLevel);
			valueMax = 200;
			break;

		case MIG_PARAM_ID_JOB_LV:
			valueMin = 1;
			valueMax = 70;
			break;

		case MIG_PARAM_ID_STR:
		case MIG_PARAM_ID_AGI:
		case MIG_PARAM_ID_VIT:
		case MIG_PARAM_ID_INT:
		case MIG_PARAM_ID_DEX:
		case MIG_PARAM_ID_LUK:
			valueMin = 1;
			valueMax = 130;
			break;

		}

		// 値の候補を取得する
		candidateInfoArray = CMigItemDataTest.GetCandidateInfoArray(judgeInfoArray, valueMin, valueMax);

		// すべての値の候補を展開していく
		for (idxValue = 0; idxValue < candidateInfoArray.length; idxValue++) {

			// 値を設定して追加する
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetParam(paramId, candidateInfoArray[idxValue][0]);
			if (!testConditionCloned.GetNGFlagSet()) {
				testConditionCloned.SetNGFlagSet(!candidateInfoArray[idxValue][1]);
			}
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}



	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　精錬値用）.
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubRefined = function (testConditionArrayBase, fragmentItem, equipRegionId) {

	var idxBase = 0;

	var judgeInfoArray = null;
	var candidateInfoArray = null;
	var testConditionArrayExtracted = null;
	var testConditionCloned = null;



	// 条件指定のマップから、該当要素の判定情報配列を取得
	judgeInfoArray = fragmentItem.GetJudgeBaseArrayRefined(equipRegionId);

	// 登録されていなければ、処理しない
	if (judgeInfoArray === undefined) {
		return testConditionArrayBase;
	}



	// 値の候補を取得する
	candidateInfoArray = CMigItemDataTest.GetCandidateInfoArray(judgeInfoArray, 0, 10);

	// 候補を元に展開
	testConditionArrayExtracted = [];

	for (idxBase = 0; idxBase < testConditionArrayBase.length; idxBase++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idxBase];

		// すべての値の候補を展開していく
		for (idxValue = 0; idxValue < candidateInfoArray.length; idxValue++) {

			// 値を設定して追加する
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetRefined(equipRegionId, candidateInfoArray[idxValue][0]);
			if (!testConditionCloned.GetNGFlagSet()) {
				testConditionCloned.SetNGFlagSet(!candidateInfoArray[idxValue][1]);
			}
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}



	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　スキル習得レベル用）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param skillId スキルID
 * @param judgeInfoArray 判定情報配列
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubLearned = function (testConditionArrayBase, skillId, judgeInfoArray) {

	var idx = 0;

	var candidateInfoArray = null;
	var testConditionArrayExtracted = null;
	var testConditionCloned = null;



	// 値の候補を取得する
	candidateInfoArray = CMigItemDataTest.GetCandidateInfoArray(judgeInfoArray, 0, g_skillManager.GetMaxLv(skillId));

	// 候補を元に展開
	testConditionArrayExtracted = [];

	for (idx = 0; idx < testConditionArrayBase.length; idx++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idx];

		// すべての値の候補を展開していく
		for (idxValue = 0; idxValue < candidateInfoArray.length; idxValue++) {

			// 値を設定して追加する
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetLearned(skillId, candidateInfoArray[idxValue][0]);
			if (!testConditionCloned.GetNGFlagSet()) {
				testConditionCloned.SetNGFlagSet(!candidateInfoArray[idxValue][1]);
			}
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}

	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　装備セット用）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param skillId スキルID
 * @param judgeInfoArray 判定情報配列
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubEquipWith = function (testConditionArrayBase, fragmentItem) {

	var idx = 0;
	var idxInfo = 0;
	var idxInfoSkip = 0;

	var testConditionArrayExtracted = null;
	var testConditionCloned = null;

	var equippedInfoArray = null;



	// 装備の指定に関する情報を収集する
	equippedInfoArray = [];
	EnumMigEquipRegionId.For(
		function (idxF, nameF, valueF) {
			var equippedId = fragmentItem.GetEquippingItemId(valueF);
			if (equippedId !== undefined) {
				equippedInfoArray.push([valueF, equippedId]);
			}
		}
	);

	// セットと判断できる指定がなければ、処理不要
	if (equippedInfoArray.length <= 1) {
		return testConditionArrayBase;
	}



	// 収集した情報を設定して展開する

	testConditionArrayExtracted= [];

	// 全装備パターンのほか、ひとつずつ外したパターンも登録する
	// 例）[A, B, C]、[×, B, C]、[A, ×, C]、[A, B, ×]
	for (idx = 0; idx < testConditionArrayBase.length; idx++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idx];

		// すべての値の候補を展開していく

		// 全装備パターン
		testConditionCloned = testCondition.Clone();
		equippedInfoArray.forEach(
			function (currentValueF, indexF, arrayF) {
				testConditionCloned.SetEquip(currentValueF[0], currentValueF[1]);
			}
		);
		if (!testConditionCloned.GetNGFlagSet()) {
			testConditionCloned.SetNGFlagSet(false);
		}
		testConditionArrayExtracted.push(testConditionCloned);

		// いずれかひとつ欠如パターン
		for (idxInfo = 0; idxInfo < equippedInfoArray.length; idxInfo++) {
			testConditionCloned = testCondition.Clone();
			equippedInfoArray.forEach(
				function (currentValueF, indexF, arrayF) {
					testConditionCloned.SetEquip(currentValueF[0], currentValueF[1]);
				}
			);
			testConditionCloned.RemoveEquip(equippedInfoArray[idxInfo][0]);
			if (!testConditionCloned.GetNGFlagSet()) {
				testConditionCloned.SetNGFlagSet(true);
			}
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}

	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　共通処理）.
 * @param judgeInfoArray 判定情報配列
 * @param valueMin 許容される最小値
 * @param valueMax 許容される最大値
 */
CMigItemDataTest.GetCandidateInfoArray = function (judgeInfoArray, valueMin, valueMax) {

	var idx = 0;

	var baseValueNot = 0;
	var baseValueUnder = 0;
	var baseValueOver = 0;
	var baseValueBy = 0;
	var baseValueBase = 0;
	var desiredMin = 0;
	var desiredMax = 0;
	var candidateInfoArray = null;
	var candidateInfoArrayWork = null;

	var funcPushCandidate = function (baseValueF, bEnoughF) {
		var idxF = 0;

		// すでに値が設定されている場合は、追加しない
		for (idxF = 0; idxF < candidateInfoArrayWork.length; idxF++) {
			if (candidateInfoArrayWork[idxF][0] == baseValueF) {
				return;
			}
		}

		candidateInfoArrayWork.push([baseValueF, bEnoughF]);
	};

	var funcGetCandidateMin = function () {
		return candidateInfoArrayWork.reduce(
			function (aFF, bFF) {
				return Math.min(aFF[0], bFF[0]);
			}
		);
	};

	var funcGetCandidateMax = function () {
		return candidateInfoArrayWork.reduce(
			function (aFF, bFF) {
				return Math.max(aFF[0], bFF[0]);
			}
		);
	};



	// 各判定情報を取得
	baseValueNot = judgeInfoArray[MIG_TEST_SP_CONDITION_JUDGE_TYPE_NOT];
	baseValueUnder = judgeInfoArray[MIG_TEST_SP_CONDITION_JUDGE_TYPE_UNDER];
	baseValueOver = judgeInfoArray[MIG_TEST_SP_CONDITION_JUDGE_TYPE_OVER];
	baseValueBy = judgeInfoArray[MIG_TEST_SP_CONDITION_JUDGE_TYPE_BY];



	// 展開候補となる値の配列を用意
	candidateInfoArray = [];



	// NOT条件が指定されている場合
	if (baseValueNot !== undefined) {

		// TODO: 未対応
		WriteConsoleLog("未対応コード @ GetCandidateInfoArray");
	}

	// UNDER条件が指定されている場合
	else if (baseValueUnder !== undefined) {

		// 作業用の配列に、候補となる値を収集、範囲外チェックを行って更新
		baseValueBase = baseValueUnder;

		do {
			// 作業用配列はループの最初に再確保
			candidateInfoArrayWork = [];

			// 指定の値と、一つ大きい値を、候補に追加
			funcPushCandidate(baseValueBase, true);
			funcPushCandidate(baseValueBase + 1, false);

			// BY条件がある場合
			if (baseValueBy) {

				// (UNDER条件値以下の最大の倍数値 - 1), (UNDER条件値以下の最大の倍数値), (UNDER条件値以下の最大の倍数値 + 1)
				// (UNDER条件値より大きいの最小の倍数値 - 1), (UNDER条件値より大きいの最小の倍数値), (UNDER条件値より大きいの最小の倍数値 + 1)
				// を、候補に追加
				[
					Math.floor(baseValueBase / baseValueBy) * baseValueBy - 1,
					Math.floor(baseValueBase / baseValueBy) * baseValueBy,
					Math.floor(baseValueBase / baseValueBy) * baseValueBy + 1,
					Math.ceil((baseValueBase + 1) / baseValueBy) * baseValueBy - 1,
					Math.ceil((baseValueBase + 1) / baseValueBy) * baseValueBy,
					Math.ceil((baseValueBase + 1) / baseValueBy) * baseValueBy + 1,
				].forEach(
					function (valueF, indexF, arrayF) {
						funcPushCandidate(valueF, (valueF >= baseValueBy));
					}
				);
			}

			// 範囲外の数値が含まれる場合は補正する
			desiredMin = funcGetCandidateMin();
			desiredMax = funcGetCandidateMax();
			if (desiredMax > valueMax) {
				baseValueBase = Math.min(valueMax, desiredMin) - (desiredMax - desiredMin);
				continue;
			}

			// 処理終了
			break;

		} while(true);

		candidateInfoArray = candidateInfoArrayWork;
	}

	// OVER条件が指定されている場合
	else if (baseValueOver !== undefined) {

		// 作業用の配列に、候補となる値を収集、範囲外チェックを行って更新
		baseValueBase = baseValueOver;

		do {
			// 作業用配列はループの最初に再確保
			candidateInfoArrayWork = [];

			// 指定の値と、一つ小さい値を、候補に追加
			funcPushCandidate(baseValueBase - 1, false);
			funcPushCandidate(baseValueBase, true);

			// BY条件がある場合
			if (baseValueBy) {

				// (OVER条件値より小さいの最大の倍数値 - 1), (OVER条件値より小さいの最大の倍数値), (OVER条件値より小さいの最大の倍数値 + 1)
				// (OVER条件値以上の最小の倍数値 - 1), (OVER条件値以上の最小の倍数値), (OVER条件値以上の最小の倍数値 + 1)
				// を、候補に追加
				[
					Math.floor((baseValueBase - 1) / baseValueBy) * baseValueBy - 1,
					Math.floor((baseValueBase - 1) / baseValueBy) * baseValueBy,
					Math.floor((baseValueBase - 1) / baseValueBy) * baseValueBy + 1,
					Math.ceil(baseValueBase / baseValueBy) * baseValueBy - 1,
					Math.ceil(baseValueBase / baseValueBy) * baseValueBy,
					Math.ceil(baseValueBase / baseValueBy) * baseValueBy + 1,
				].forEach(
					function (valueF, indexF, arrayF) {
						funcPushCandidate(valueF, (valueF >= baseValueBy));
					}
				);
			}

			// 範囲外の数値が含まれる場合は補正する
			desiredMin = funcGetCandidateMin();
			desiredMax = funcGetCandidateMax();
			if (desiredMin < valueMin) {
				baseValueBase = Math.max(valueMin, desiredMax) + (desiredMax - desiredMin);
				continue;
			}

			// 処理終了
			break;

		} while(true);

		candidateInfoArray = candidateInfoArrayWork;
	}

	// BY条件のみ指定されている場合
	else if (baseValueBy !== undefined) {

		// 作業用の配列に、候補となる値を収集、範囲外チェックを行って更新
		baseValueBase = baseValueBy;

		do {
			// 作業用配列はループの最初に再確保
			candidateInfoArrayWork = [];

			// 指定の値と、一つ小さい値、２倍の値、２倍より一つ大きい値を、候補に追加
			funcPushCandidate(baseValueBase - 1, false);
			funcPushCandidate(baseValueBase, true);
			funcPushCandidate(baseValueBase + baseValueBy, true);
			funcPushCandidate(baseValueBase + baseValueBy + 1, true);

			// 範囲外の数値が含まれる場合は補正する
			desiredMin = funcGetCandidateMin();
			desiredMax = funcGetCandidateMax();
			if (desiredMin < valueMin) {
				baseValueBase = Math.max(valueMin, desiredMax) + (desiredMax - desiredMin);
				baseValueBase = Math.ceil(baseValueBase / baseValueBy) * baseValueBy;
				continue;
			}

			// 処理終了
			break;

		} while(true);

		candidateInfoArray = candidateInfoArrayWork;
	}



	// 範囲外の値を削除する
	for (idx = candidateInfoArray.length - 1; idx >= 0; idx--) {
		if (candidateInfoArray[idx][0] < valueMin) {
			candidateInfoArray.splice(idx, 1);
		}
		else if (candidateInfoArray[idx][0] > valueMax) {
			candidateInfoArray.splice(idx, 1);
		}
	}



	return candidateInfoArray;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　スキル系SP効果用）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param fragmentItem フラグメント
 * @param judgeInfoArray 判定情報配列
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubSkillEffects = function (testConditionArrayBase, fragmentItem) {

	var idx = 0;
	var idxSkill = 0;

	var testConditionArrayExtracted = null;
	var testConditionCloned = null;

	var skillId = 0;
	var skillIdArray = null;
	var skillIdArrayAttackable = null;



	// スキル指定の配列を取得
	skillIdArray = fragmentItem.GetEffectiveSkillIdArray();

	// 指定がなければ処理不要
	if (skillIdArray.length == 0) {
		return testConditionArrayBase;
	}



	// 攻撃可能なスキルのみフィルタリング
	skillIdArrayAttackable = [];
	for (idxSkill = 0; idxSkill < skillIdArray.length; idxSkill++) {
		// TODO: オートスペル系回避用暫定措置
		skillId = CAttackMethodData.GetSkillIdFromFullId(skillIdArray[idxSkill]);
		if ((g_skillManager.GetSkillType(skillId) & CSkillData.TYPE_PHYSICAL) == CSkillData.TYPE_PHYSICAL) {
			skillIdArrayAttackable.push(skillIdArray[idxSkill]);
		}
		else if ((g_skillManager.GetSkillType(skillId) & CSkillData.TYPE_MAGICAL) == CSkillData.TYPE_MAGICAL) {
			skillIdArrayAttackable.push(skillIdArray[idxSkill]);
		}
	}



	// 収集した情報を設定して展開する
	testConditionArrayExtracted = [];

	for (idx = 0; idx < testConditionArrayBase.length; idx++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idx];

		// すべての値の候補を展開していく
		for (idxSkill = 0; idxSkill < skillIdArrayAttackable.length; idxSkill++) {
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetSkill(skillIdArrayAttackable[idxSkill]);
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}

	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　列挙定数系属性共通）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param fragmentItem フラグメント
 * @param enumIdObject 列挙定数定義オブジェクト
 * @param allMeaningIdArray すべてを意味する列挙定数の配列（省略可）
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubEnumAttrCommon = function (testConditionArrayBase, fragmentItem, enumIdObject, allMeaningIdArray) {

	var idx = 0;
	var idxCandidate = 0;

	var testConditionArrayExtracted = null;
	var testConditionCloned = null;

	var effectiveIdArray = null;
	var candidateArray = null;
	var candidateArrayNot = null;
	var candidateArrayFinal = null;



	// 引数の補正
	if (allMeaningIdArray === undefined) {
		allMeaningIdArray = [];
	}

	// 作業用の配列を用意
	candidateArray = [];
	candidateArrayNot = [];



	// 有効指定されているIDの配列を取得
	effectiveIdArray = fragmentItem.GetEffectiveSizeIdArray();

	// 指定がなければ処理不要
	if (effectiveIdArray.length == 0) {
		return testConditionArrayBase;
	}



	// すべてを意味する定数が指定の配列に含まれている場合、すべての定数を候補用の配列に追加する
	for (idx = 0; idx < allMeaningIdArray.length; idx++) {

		if (effectiveIdArray.indexOf(allMeaningIdArray[idx]) >= 0) {

			enumIdObject.For(
				function (idxF, nameF, valueF) {
					candidateArray.push(valueF);
				}
			);

			break;
		}
	}

	// すべてを意味する定数がなかった場合、すべての定数を候補用の配列と候補でない配列に振り分ける
	if (idx >= allMeaningIdArray.length) {

		enumIdObject.For(
			function (idxF, nameF, valueF) {

				// 指定の配列にあれば、候補用の配列に追加
				if (effectiveIdArray.indexOf(valueF)) {
					candidateArray.push(valueF);
				}

				// そうでなければ、候補でない配列に追加
				else {
					candidateArrayNot.push(valueF);
				}
			}
		);
	}

	// 候補用の配列の全要素と、候補でない配列の先頭１要素（なければ無視）を、最終的な候補配列とする
	candidateArrayFinal = candidateArray;
	if (candidateArrayNot.length > 0) {
		candidateArrayFinal.push(candidateArrayNot[0]);
	}



	// 収集した情報を設定して展開する
	testConditionArrayExtracted = [];

	for (idx = 0; idx < testConditionArrayBase.length; idx++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idx];

		// すべての値の候補を展開していく
		for (idxCandidate = 0; idxCandidate < candidateArrayFinal.length; idxCandidate++) {
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetSize(candidateArrayFinal[idxCandidate]);
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}

	return testConditionArrayExtracted;
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　サイズ系SP効果用）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param fragmentItem フラグメント
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubSizeEffects = function (testConditionArrayBase, fragmentItem) {
	return CMigItemDataTest.ExtractFragmentsToConditionArraySubEnumAttrCommon(testConditionArrayBase, fragmentItem, EnumMigSizeId, [MIG_SIZE_ID_ANY, MIG_SIZE_ID_ALL]);
};

/**
 * テスト条件フラグメントの情報を元に、テスト条件配列を展開する（サブ　モンスター系SP効果用）.
 * @param testConditionArrayBase ベースとなるテスト条件配列
 * @param fragmentItem フラグメント
 * @param judgeInfoArray 判定情報配列
 */
CMigItemDataTest.ExtractFragmentsToConditionArraySubMonsterEffects = function (testConditionArrayBase, fragmentItem) {

	var idx = 0;
	var idxMonster = 0;
	var pos = 0;

	var testConditionArrayExtracted = null;
	var testConditionCloned = null;

	var monsterIdArray = null;
	var candidateArray = null;
	var candidateArrayWork = null;



	// モンスター指定の配列を取得
	monsterIdArray = fragmentItem.GetEffectiveMonsterIdArray();

	// 指定がない場合は、空配列を用意しておく（手入力のみ登録させる）
	if (monsterIdArray.length == 0) {
		monsterIdArray = [];
	}

	// 指定のモンスターと、通常の手入力で、成立と不成立パターンを作る
	monsterIdArray.push(MONSTER_ID_MONSTER_TENYURYOKU);

	// 収集した情報を設定して展開する
	testConditionArrayExtracted = [];

	for (idx = 0; idx < testConditionArrayBase.length; idx++) {

		// ベースとなるテスト条件を取得
		testCondition = testConditionArrayBase[idx];

		// すべての値の候補を展開していく
		for (idxMonster = 0; idxMonster < monsterIdArray.length; idxMonster++) {
			testConditionCloned = testCondition.Clone();
			testConditionCloned.SetMonster(monsterIdArray[idxMonster]);
			testConditionArrayExtracted.push(testConditionCloned);
		}
	}

	return testConditionArrayExtracted;
};



/**
 * テスト条件の職業IDを適切なものに補正する.
 * @param testConditionArrayBase テスト条件配列
 * @param fragmentItem アイテム用フラグメント
 */
CMigItemDataTest.ModifyJobIdCondition = function (testConditionArrayBase, fragmentItem) {

	var testConditionArrayWork = null;
	var testConditionArrayModified = null;



	// 作業用に複製
	testConditionArrayModified = [];
	testConditionArrayWork = testConditionArrayBase.slice();

	testConditionArrayWork.forEach(
		function (currentValueF, indexF, arrayF) {
			testConditionArrayModified = testConditionArrayModified.concat(CMigItemDataTest.ModifyJobIdConditionSub(currentValueF, fragmentItem));
		}
	);



	return testConditionArrayModified;
};

/**
 * テスト条件の職業IDを適切なものに補正する（サブ　処理本体）.
 * @param testCondition テスト条件
 * @param fragmentItem アイテム用フラグメント
 * @return 補正されたテスト条件の配列
 */
CMigItemDataTest.ModifyJobIdConditionSub = function (testCondition, fragmentItem) {

	var baseLv = 0;
	var candidateJobIdArray = null;
	var candidateJobIdWork = null;
	var discandidateJobIdWork = null;
	var candidateJobIdArrayLogArray = null;		// デバッグ時の追跡用
	var adjustControlInfoArrayMap = null;		// 引数の testCondition に特定の追加設定が必要な場合に使用する

	var paramValueMax = 0;
	var paramIdCount = 0;
	var jobIdArray = 0;
	var jobSeriesIdArray = 0;
	var skillId = 0;

	var testConditionModified = null;
	var testConditionArrayModified = null;

	var pureParamIdArray = [
		MIG_PARAM_ID_STR,
		MIG_PARAM_ID_AGI,
		MIG_PARAM_ID_VIT,
		MIG_PARAM_ID_INT,
		MIG_PARAM_ID_DEX,
		MIG_PARAM_ID_LUK,
	];



	// 引数の testCondition に特定の追加設定が必要な場合に使用する、追加操作情報のマップ
	// key は職業ID、値は調整操作情報配列（CMigCharaData クラスの AdjustToSpData() 関数を参照のこと）
	adjustControlInfoArrayMap = new Map();



	// デバッグ時の追跡用
	candidateJobIdArrayLogArray = [];

	// 初めにすべての職業IDを候補となる職業IDの配列に追加
	candidateJobIdArray = [];
	EnumJobId.For(
		function (idxF, nameF, valueF) {
			candidateJobIdArray.push(valueF);
		}
	);

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["初期", candidateJobIdArray.slice()]);




	//================================================================================================
	//
	// レベル上限によるフィルタリング（条件のレベルになれない職業を除外）
	//
	//================================================================================================

	baseLv = testCondition.GetParam(MIG_PARAM_ID_BASE_LV);
	if (baseLv !== undefined) {

		candidateJobIdWork = [];

		// 候補となる職業ID配列の各職業IDについて、指定のレベルに到達可能かを判定し、新たな候補となる職業IDの配列を作る
		candidateJobIdArray.forEach(
			function (currentValueF, indexF, arrayF) {
				if (baseLv <= GetBaseLevelMax(currentValueF)) {
					candidateJobIdWork.push(currentValueF);
				}
			}
		);

		// 候補となる職業の配列を更新
		candidateJobIdArray = candidateJobIdWork;
	}

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["Lv上限フィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// ステータス上限によるフィルタリング（条件のステータスまで上げられない職業を除外）
	//
	//================================================================================================

	paramValueMax = 0;
	paramIdCount = 0;

	// 指定されているパラメータの個数と、ベース値の最小値を数える
	pureParamIdArray.forEach(
		function (currentValueF, indexF, arrayF) {

			var paramValue = testCondition.GetParam(currentValueF);

			// パラメータ指定があれば、データを収集
			if (paramValue !== undefined) {
				paramValueMax = Math.max(paramValueMax, paramValue);
				paramIdCount++;
			}
		}
	);

	// 指定がある場合にのみフィルタリング
	if (paramIdCount > 0) {

		candidateJobIdWork = [];

		// 候補となる職業ID配列の各職業IDについて、指定のパラメータ値に到達可能かを判定し、新たな候補となる職業IDの配列を作る
		candidateJobIdArray.forEach(
			function (currentValueF, indexF, arrayF) {
				if (paramValueMax <= GetStatusMax(currentValueF, false)) {
					candidateJobIdWork.push(currentValueF);
				}
			}
		);

		// 候補となる職業の配列を更新
		candidateJobIdArray = candidateJobIdWork;
	}

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["ステ上限フィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// 装備可能職業によるフィルタリング（装備できない職業を除外）
	//
	//================================================================================================

	EnumEquipRegionId.For(
		function (idxF, nameF, valueF) {

			// 装備IDを取得
			var equipIdF = testCondition.GetEquip(valueF);

			// 装備がなければ処理不要
			if (equipIdF === undefined) {
				return;
			}

			// 候補となる職業ID配列の各職業IDについて、指定の装備が装備可能かを判定し、新たな候補となる職業IDの配列を作る
			var candidateJobIdWorkF = [];

			candidateJobIdArray.forEach(
				function (currentValueFF, indexFF, arrayFF) {
					if (IsMatchJobRestrict(equipIdF, currentValueFF)) {
						candidateJobIdWorkF.push(currentValueFF);
					}
				}
			);

			// 候補となる職業の配列を更新
			candidateJobIdArray = candidateJobIdWorkF;
		}
	);

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["装備可能職業フィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// 習得スキルによるフィルタリング（習得できない職業を除外）
	//
	//================================================================================================

	testCondition.ForEachLearned(
		function (valueF, keyF, mapF) {

			// 候補となる職業ID配列の各職業IDについて、指定のスキルが習得可能かを判定し、新たな候補となる職業IDの配列を作る
			var candidateJobIdWorkF = [];

			candidateJobIdArray.forEach(
				function (currentValueFF, indexFF, arrayFF) {
					var learnSkillIdArrayFF = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, currentValueFF).GetLearnSkillIdArray();

					if (learnSkillIdArrayFF.indexOf(keyF) >= 0) {
						candidateJobIdWorkF.push(currentValueFF);
					}
				}
			);

			// 候補となる職業の配列を更新
			candidateJobIdArray = candidateJobIdWorkF;
		}
	);

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["習得スキルフィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// 要求エンチャントによるフィルタリング（指定のエンチャントを付与できる装備が存在しない職業を除外）
	//
	//================================================================================================

	var idxEnchant = 0;
	var idxList = 0;
	var requiredEnchantIdArray = null;
	var enchantTypeQuickLookUpArray = null;
	var enchantTypeInfoArray = null;
	var enchantTypeInfoArrayArray = null;

	enchantTypeQuickLookUpArray = [];
	enchantTypeInfoArrayArray = [];
	requiredEnchantIdArray = fragmentItem.GetRequiredEnchantIdArray();


	function CMigRequiredEnchantTypeSlotInfo (typeId, slotId, cardId) {
		this.typeId = typeId;
		this.slotId = slotId;
		this.cardId = cardId;
	}

	var infoArray = null;
	var enchantTypeLookUpMap = null;
	var enchantTypeLookUpMapArray = null;

	enchantTypeLookUpMapArray = [];

	// 要求エンチャントが付与可能なエンチャントリストを検索し、
	// 当該エンチャントリストが設定されているエンチャントタイプ、および、スロットを特定の上、
	// 『要求エンチャントが付与可能な｛エンチャントタイプ，スロット，カード｝の組』を作る
	// その後、この組を、エンチャントタイプをキーにしてマップ登録し、管理する
	// （いずれも、要求エンチャントごとに用意する）
	// 従って、最終的に、次のような構造ができあがる
	//
	// mapArray = [
	//     map < (enchantTypeId) -> {enchantTypeId, slotId, cardId} >,    // 要求エンチャント１用
	//     map < (enchantTypeId) -> {enchantTypeId, slotId, cardId} >,    // 要求エンチャント２用
	//     ...
	// ];
	//
	for (idxEnchant = 0; idxEnchant < requiredEnchantIdArray.length; idxEnchant++) {

		// 収集した情報を保管する領域を確保
		enchantTypeLookUpMap = new Map();

		// 指定のエンチャントを付与可能なエンチャントリストのIDを特定
		for (idxList = 0; idxList < n_EnchantList.length; idxList++) {

			// 指定のエンチャントが含まれない場合は、次へ
			if (n_EnchantList[idxList].indexOf(requiredEnchantIdArray[idxEnchant]) < 0) {
				continue;
			}

			// 該当のエンチャントリストのIDが設定されているエンチャントタイプのIDを特定
			for (idxType = 0; idxType < n_EnchantType.length; idxType++) {

				// 全スロットを走査
				for (idxSlot = 0; idxSlot < n_EnchantType[idxType].length; idxSlot++) {

					// エンチャントリストIDが一致した場合は、情報配列へ追加
					if (n_EnchantType[idxType][idxSlot] == idxList) {

						infoArray = enchantTypeLookUpMap.get(idxType);

						if (infoArray === undefined) {
							infoArray = [];
							enchantTypeLookUpMap.set(idxType, infoArray);
						}

						infoArray.push(new CMigRequiredEnchantTypeSlotInfo(idxType, idxSlot, requiredEnchantIdArray[idxEnchant]));

						// クイック検索に登録がなければ追加しておく
						if (enchantTypeQuickLookUpArray.indexOf(idxType) < 0) {
							enchantTypeQuickLookUpArray.push(idxType);
						}
					}
				}
			}
		}

		// 情報の配列に追加
		enchantTypeLookUpMapArray.push(enchantTypeLookUpMap);
	}



	// 収集したエンチャントタイプが設定されているアイテムを調べ、それが装着できる装備領域を調査する
	// その後、装備領域をキーとしたマップに、先ほど収集したマップを移行する
	// 従って、最終的に、次のような構造ができあがる
	//
	// mapArray = [
	//     map < (equipRegionId) -> [ {enchantTypeId, slotId, cardId}, ... ] >,    // 要求エンチャント１用
	//     map < (equipRegionId) -> [ {enchantTypeId, slotId, cardId}, ... ] >,    // 要求エンチャント２用
	//     ...
	// ];
	//
	// また、同時に、当該エンチャントタイプが設定されている装備のアイテムIDも保持しておく
	//
	//     map < (equipRegionId) -> map < (enchantTypeid) -> {itemId, itemId, ... } > >
	//
	var idxItem = 0;
	var equipRegionLookUpMapArray = null;
	var equipIdArray = null;
	var candidateEquipMap = null;
	var candidateEquipMapMap = null;

	// 先に、最終的な格納領域を用意しておく
	equipRegionLookUpMapArray = [];
	for (idxEnchant = 0; idxEnchant < enchantTypeLookUpMapArray.length; idxEnchant++) {
		equipRegionLookUpMapArray[idxEnchant] = new Map();
	}

	candidateEquipMapMap = new Map();

	// 全アイテムをループして検査
	for (idxItem = 0; idxItem < ItemObjNew.length; idxItem++) {

		// アイテムデータを取得
		itemData = ItemObjNew[idxItem];

		// エンチャントタイプIDを取得
		enchantTypeId = GetEnchantTypeId(itemData[ITEM_DATA_INDEX_WPNLV]);

		// クイック検索配列に登録がなければ、次へ
		if (enchantTypeQuickLookUpArray.indexOf(enchantTypeId) < 0) {
			continue;
		}

		// 装備領域IDを取得
		equipRegionId = CMigItemDataTest.GetMigEquipRegionIdByOldItemKind(itemData[ITEM_DATA_INDEX_KIND]);

		// 先ほど収集した情報マップ配列から、データを移行する
		for (idxEnchant = 0; idxEnchant < enchantTypeLookUpMapArray.length; idxEnchant++) {

			infoArray = enchantTypeLookUpMapArray[idxEnchant].get(enchantTypeId);

			// 該当があった場合は、新しい情報マップ配列へ、装備領域IDをキーとして登録する
			if (infoArray !== undefined) {

				infoArrayArray = equipRegionLookUpMapArray[idxEnchant].get(equipRegionId);

				if (infoArrayArray === undefined) {
					infoArrayArray = [];
					equipRegionLookUpMapArray[idxEnchant].set(equipRegionId, infoArrayArray);
				}

				infoArrayArray.push(infoArray);
			}
		}

		// 該当アイテムIDを保持
		candidateEquipMap = candidateEquipMapMap.get(equipRegionId);

		if (candidateEquipMap === undefined) {
			candidateEquipMap = new Map();
			candidateEquipMapMap.set(equipRegionId, candidateEquipMap);
		}

		equipIdArray = candidateEquipMap.get(enchantTypeId);

		if (equipIdArray === undefined) {
			equipIdArray = [];
			candidateEquipMap.set(enchantTypeId, equipIdArray)
		}

		equipIdArray.push(itemData[ITEM_DATA_INDEX_ID]);

	}

	// 新しい情報マップ配列を、マップの要素数で昇順ソートする
	equipRegionLookUpMapArray.sort(
		function(a, b) {
			if (a.size < b.size) return -1;
			if (a.size > b.size) return 1;
			return 0;
		}
	);

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["要求エンチャフィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// スキルによるフィルタリング（使用できない職業を除外）
	//
	//================================================================================================

	skillId = testCondition.GetSkill();

	// 候補となる職業ID配列の各職業IDについて、指定のスキルが使用可能かを判定し、新たな候補となる職業IDの配列を作る
	candidateJobIdWork = [];

	// head.js からコピー
	var scrollArray = [			// 攻撃スクロール配列
		USABEL_SKILL_ID_FIRE_BOLT_5
		, USABEL_SKILL_ID_FIRE_BALL_5
		, USABEL_SKILL_ID_FIRE_WALL_5
		, USABEL_SKILL_ID_COLO_BOLT_5
		, USABEL_SKILL_ID_FROST_DIVER_5
		, USABEL_SKILL_ID_LIGHTNING_BOLT_5
		, USABEL_SKILL_ID_EARTH_SPIKE_5
		, USABEL_SKILL_ID_SOUL_STRIKE_5
		, USABEL_SKILL_ID_METEOR_STORM_5
		, USABEL_SKILL_ID_HEAL_10
		, USABEL_SKILL_ID_RESERECTION_BY_YGGDRASILLNO_HA
		, USABEL_SKILL_ID_GRAND_CROSS_10
		, USABEL_SKILL_ID_DEMONIC_FIRE_3
		, USABEL_SKILL_ID_HELL_INFERNO_3
		, USABEL_SKILL_ID_MAGMA_ILLUPTION_3
		, USABEL_SKILL_ID_PSYCHIC_WAVE_3
		, USABEL_SKILL_ID_METALIC_SOUND_3
		, USABEL_SKILL_ID_JUDEX_3
		, USABEL_SKILL_ID_TEIOAPUCHAGI_7
	];

	// 検索するSPIDの配列
	var searchSpIdArray = [
		MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL,
		MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED,
		MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL,
		MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_LEARNED,
		MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_REFINED,
	];

	var ignoreAttrArray = [
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD,
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING,
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB,
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET,
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SPAN,
		MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL,
	];

	var charaDataDmy = null;
	var spTagF = null;



	// 判定用のダミーキャラクターデータを生成する
	charaDataDmy = g_charaDataManager.CreateCharaData();

	// 職業設定
	// 後で設定

	// パラメータ設定
	EnumMigItemParamId.For(
		function (idxF, nameF, valueF) {

			var paramIdF = valueF;
			var paramValueF = testCondition.GetParam(paramIdF);

			if (paramValueF !== undefined) {
				charaDataDmy.SetParam(paramIdF, paramValueF);
			}
		}
	);

	// 装備設定
	EnumMigEquipRegionId.For(
		function (idxF, nameF, valueF) {

			var idxSlotF = 0;

			var cardIdF = 0;

			var equipRegionIdF = valueF;
			var itemIdF = testCondition.GetEquip(equipRegionIdF);
			var cardIdMapF = testCondition.GetCard(equipRegionIdF);
			var refinedF = testCondition.GetRefined(equipRegionIdF);

			if (itemIdF !== undefined) {
				charaDataDmy.ChangeEquip(equipRegionIdF, CONST_DATA_KIND_ITEM, 0, itemIdF, 0);
			}

			if (cardIdMapF !== undefined) {
				cardIdMapF.forEach(
					function (valueFF, keyFF, mapFF) {
						charaDataDmy.ChangeEquip(equipRegionIdF, CONST_DATA_KIND_CARD, keyFF, valueFF, 0);
					}
				);
			}

			if (refinedF !== undefined) {
				charaDataDmy.SetRefined(equipRegionIdF, refinedF);
			}
		}
	);

	// スキル習得レベル設定
	// TODO: 未対応



	candidateJobIdArray.forEach(
		function (currentValueF, indexF, arrayF) {

			var idxScrollF = 0;
			var idxEquipF = 0;
			var idxInfoF = 0;

			var jobIdOldF = 0;
			var equipInfoF = null;
			var equipInfoArrayF = null;
			var itemIdF = 0;
			var itemDataF = null;
			var matcherArrayF = null;
			var modifiableInfoF = null;
			var modifiableInfoArrayF = null;
			var adjustControlInfoArrayF = null;
			var adjustControlInfoArrayWorkF = null;



			// すでに登録済みなら、処理不要
			if (candidateJobIdWork.indexOf(currentValueF) >= 0) {
				return;
			}

			// TODO : 移行実装不足
			// 本来は、クローンスキルなども考慮しなければならないが、
			// 詠唱シミュレータ対応していないため、動作しない
			// 対応したら、攻撃手段を優先して判定のこと

			// 攻撃手段にあるか判定
			//if (g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, currentValueF).GetAttackSkillIdArray().indexOf(skillId) >= 0) {
			//	candidateJobIdWork.push(currentValueF);
			//	return;
			//}

			// 通常攻撃は判定不要
			if (skillId == SKILL_ID_TUZYO_KOGEKI) {
				candidateJobIdWork.push(currentValueF);
				return;
			}

			// 職業で習得可能なスキル
			var learnSkillIdArrayF = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, currentValueF).GetLearnSkillIdArray();

			if (learnSkillIdArrayF.indexOf(skillId) >= 0) {
				candidateJobIdWork.push(currentValueF);
				return;
			}

			// 職業で使用可能なスキル（シビアEXなど、習得にはないが、攻撃手段にはあるもの）
			if (g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, currentValueF).GetAttackSkillIdArray().indexOf(skillId) >= 0) {
				candidateJobIdWork.push(currentValueF);
				return;
			}

			// スクロール系で使用可能になるケース
			for (idxScrollF = 0; idxScrollF < scrollArray.length; idxScrollF++) {
				if (InsertSkill[scrollArray[idxScrollF]][USABLE_SKILL_DATA_INDEX_SKILL_ID] == skillId) {
					candidateJobIdWork.push(currentValueF);
					return
				}
			}



			// ここに来るならば、それ以外の手段



			// 装備等により使用可能かを判定

			// 判定用のダミーキャラクターデータに職業を設定
			jobIdOldF = charaDataDmy.GetJob();
			charaDataDmy.SetJob(currentValueF);

			// 設定した情報で、有効なSPデータを再計算
			charaDataDmy.CalcEffectiveSpData();

			// 検索対象のSPIDを順に検索
			for (idxF = 0; idxF < searchSpIdArray.length; idxF++) {

				spTagF = new CMigEquipableSpTag()
					.SetSpId(searchSpIdArray[idxF])
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, g_skillManager.GetBaseSkillId(skillId))

				// 使用可能になる場合は、処理打ち切り
				if (charaDataDmy.GetSpValue(spTagF, ignoreAttrArray, MIG_EFFECTIVE_SP_CALC_MODE_MAX) > 0) {
					break;
				}
				if (charaDataDmy.GetSetSpValue(spTagF, ignoreAttrArray, MIG_EFFECTIVE_SP_CALC_MODE_MAX) > 0) {
					break;
				}
			}

			// 結果を確認し、候補に追加
			if (idxF < searchSpIdArray.length) {
				if (candidateJobIdWork.indexOf(currentValueF) < 0) {
					candidateJobIdWork.push(currentValueF);
				}
			}

			// 現在の設定状態で使用可能でなかった場合、
			// 特定の条件を満たすことで使用可能にならないかを検査
			else {

				modifiableInfoArrayF = [];

				matcherArrayF = [
					new CMigEquipableSpDataAttributeMatcher([
						new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, [g_skillManager.GetBaseSkillId(skillId)]),
					]),
					new CMigEquipableSpDataAttributeMatcher([
						new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, [g_skillManager.GetBaseSkillId(skillId)]),
					]),
					new CMigEquipableSpDataAttributeMatcher([
						new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, [g_skillManager.GetBaseSkillId(skillId)]),
					]),
					new CMigEquipableSpDataAttributeMatcher([
						new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_LEARNED, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, [g_skillManager.GetBaseSkillId(skillId)]),
					]),
					new CMigEquipableSpDataAttributeMatcher([
						new CMigEquipableSpDataAttributeMatchingCore(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_REFINED, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, [g_skillManager.GetBaseSkillId(skillId)]),
					]),
				];

				// 判定用のダミーデータに設定してある、すべての装備をループ
				equipInfoArrayF = charaDataDmy.GetEquipInfoArray();
				for (idxEquipF = 0; idxEquipF < equipInfoArrayF.length; idxEquipF++) {

					// 装備情報取得
					equipInfoF = equipInfoArrayF[idxEquipF];

					// 装備ID取得
					itemIdF = equipInfoF.GetEquippedId(CONST_DATA_KIND_ITEM);

					// 移行後データが存在する場合のみ、対応できる可能性がある
					if (g_constDataManager.itemDataManager.GetRegisteredIdArray().indexOf(itemIdF) >= 0) {

						// アイテムデータオブジェクトを取得
						itemDataF = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, itemIdF);

						// すべてのSPデータを対象に処理
						itemDataF.ForEachSpData(
							function (valueFF, keyFF, arrayFF) {

								var idxMatcherFF = 0;
								var idxPathFF = 0;

								var spDataPathArrayWorkFF = null;

								// すべての検査候補情報をループ
								for (idxMatcherFF = 0; idxMatcherFF < matcherArrayF.length; idxMatcherFF++) {

									// 検査候補までのSPデータパスの配列を取得
									spDataPathArrayWorkFF = valueFF.GetSpDataPathArrayToAttribute(matcherArrayF[idxMatcherFF]);

									// 調整可能情報に追加
									for (idxPathFF = 0; idxPathFF < spDataPathArrayWorkFF.length; idxPathFF++) {
										modifiableInfoArrayF.push([CONST_DATA_KIND_ITEM, itemIdF, spDataPathArrayWorkFF[idxPathFF]]);
									}
								}
							}
						);
					}
				}

				// 調整可能情報が存在した場合
				for (idxInfoF = 0; idxInfoF < modifiableInfoArrayF.length; idxInfoF++) {

					// 調整可能情報を取得
					modifiableInfoF = modifiableInfoArrayF[idxInfoF];

					// SPデータへの調整を試行
					adjustControlInfoArrayF = charaDataDmy.AdjustToSpData.apply(charaDataDmy, modifiableInfoF);

					// 試行に成功した場合
					if (adjustControlInfoArrayF) {

						// 専用マップにすでに情報配列が登録されている場合は、その配列に結果を結合する
						adjustControlInfoArrayWorkF = adjustControlInfoArrayMap.get(currentValueF);
						if (adjustControlInfoArrayWorkF !== undefined) {
							adjustControlInfoArrayF = adjustControlInfoArrayWorkF.concat(adjustControlInfoArrayF);
						}

						// 専用のマップに、職業IDをキーとして登録する
						adjustControlInfoArrayMap.set(currentValueF, adjustControlInfoArrayF);

						// 候補となる職業に追加
						candidateJobIdWork.push(currentValueF);

						// 処理打ち切り
						break;
					}
				}
			}

			// 職業を戻す
			charaDataDmy.SetJob(jobIdOldF);
		}
	);
	// 候補となる職業の配列を更新
	candidateJobIdArray = candidateJobIdWork;

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["攻撃スキルフィルタ後", candidateJobIdArray.slice()]);



	//================================================================================================
	//
	// 職業制限によるフィルタリング（条件を満たさない職業を除外）
	//
	//================================================================================================

	// 職業系列制限がある場合は、指定されているすべての職業のパターンと、該当しない職業のパターンを生成する
	// 職業系列制限がなく、職業制限がある場合は、指定されている各職業のパターンと、該当しない職業のパターンを生成する



	// 職業系列制限によるフィルタリング（装備できてもSP効果の条件を満たしていない職業を除外）
	// 職業制限によるフィルタリング（装備できてもSP効果の条件を満たしていない職業を除外）

	// 条件指定のマップから、職業系列制限の配列を取得
	// 条件指定のマップから、職業制限の配列を取得
	jobSeriesIdArray = fragmentItem.GetEffectiveJobSeriesIdArray();
	jobIdArray = fragmentItem.GetEffectiveJobIdArray();

	// 職業系列制限がある場合
	if (jobSeriesIdArray.length > 0) {

		// 候補となる職業ID配列の各職業IDについて、指定の職業系列に含まれるかを判定し、新たな候補となる職業IDの配列を作る
		candidateJobIdWork = [];
		discandidateJobIdWork = [];
		candidateJobIdArray.forEach(
			function (currentValueF, indexF, arrayF) {

				var bCandidateF = false;

				if (currentValueF == MIG_JOB_SERIES_ID_ANY) {
					bCandidateF = true;
				}
				else {
					bCandidateF = jobSeriesIdArray.some(
						function (elementFF, indexFF, arrayFF) {
							return (MigGetSeriesedJobIdArray(elementFF).indexOf(currentValueF) >= 0);
						}
					);
				}

				if (bCandidateF) {
					candidateJobIdWork.push(currentValueF);
				}
				else {
					discandidateJobIdWork.push(currentValueF);
				}
			}
		);

		// 候補となる職業の配列を更新
		candidateJobIdArray = candidateJobIdWork;
		if (discandidateJobIdWork.length > 0) {
			candidateJobIdArray.push(discandidateJobIdWork[0]);
		}
	}

	// 職業系列制限がなく、職業制限がある場合
	else if (jobIdArray.length > 0) {

		// 候補となる職業の配列を、作業用に複製
		candidateJobIdWork = candidateJobIdArray.slice();

		// 作業用の配列から、条件に指定されている職業IDを取り除く
		jobIdArray.forEach(
			function (currentValueF, indexF, arrayF) {
				var candidateIndex = candidateJobIdWork.indexOf(currentValueF);
				if (candidateIndex >= 0) {
					candidateJobIdWork.splice(candidateIndex, 1);
				}
			}
		);

		// 条件に指定されているすべての職業IDと、作業用に残っている先頭要素を連結し、候補となる職業の配列とする
		// （作業用に残っている先頭要素は、条件を満たさない職業の代表値）
		candidateJobIdArray = jobIdArray.slice();
		if (candidateJobIdWork.length > 0) {
			candidateJobIdArray.push(candidateJobIdWork[0]);
		}
	}

	// いずれの指定もない場合は、職業は一つでよい
	else {
		if (candidateJobIdArray.length > 1) {
			candidateJobIdArray = candidateJobIdArray.slice(0, 1);
		}
	}

	// デバッグ時の追跡用データに保持
	candidateJobIdArrayLogArray.push(["職業制限フィルタ後", candidateJobIdArray.slice()]);



	// ここまで来れば、候補となる職業IDが確定

	// 条件不成立ケースの場合
	if (testCondition.GetNGFlagSet()) {

		// 条件を満たす職業がなくても問題なし（作成しないテストケース）
		if (candidateJobIdArray.length == 0) {
			WriteConsoleLog("作成しないテストケース（条件不成立ケース、かつ、条件を満たす職業がない）");
			return [];
		}
	}

	else {

		// 条件を満たす職業がなかった場合
		// TODO: どう処理するか検討中
		if (candidateJobIdArray.length == 0) {
			WriteConsoleLog("条件を満たす職業がない");
			alert("条件を満たす職業がない");
		}
	}




	//================================================================================================
	//
	// テスト条件に職業を設定して展開する
	//
	//================================================================================================

	testConditionArrayModified = [];

	candidateJobIdArray.forEach(
		function (valueF, keyF, arrayF) {

			var idxInfoF = 0;

			var adjustControlInfoF = null;
			var adjustControlInfoArrayF = null;
			var equipRegionCardSettingMapF = null;


			// ベースとなる条件を複製
			testConditionModified = testCondition.Clone();

			// 職業を設定
			testConditionModified.SetJob(valueF);

			// 指定の職業の追加設定情報配列を取得
			adjustControlInfoArrayF = adjustControlInfoArrayMap.get(valueF);
			if (adjustControlInfoArrayF === undefined) {
				adjustControlInfoArrayF = [];
			}


			// 指定の職業の追加設定を適用する
			for (idxInfoF = 0; idxInfoF < adjustControlInfoArrayF.length; idxInfoF++) {

				// 追加設定情報を取得
				adjustControlInfoF = adjustControlInfoArrayF[idxInfoF];

				switch (adjustControlInfoF[0]) {

				// パラメータ
				case MIG_CHARA_DATA_ADJUST_CONTROL_SET_PARAM:
					testConditionModified.SetParam(adjustControlInfoF[1][0], adjustControlInfoF[1][1]);
					break;

				// 装備品
				case MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP:

					// アイテムに関するものでなければ、次へ（カードは後で個別処理する）
					if (adjustControlInfoF[1][1] != CONST_DATA_KIND_ITEM) {
						continue;
					}

					testConditionModified.SetEquip(adjustControlInfoF[1][0], adjustControlInfoF[1][3]);
					break;

				// 精錬値
				case MIG_CHARA_DATA_ADJUST_CONTROL_SET_REFINED:
					testConditionModified.SetRefined(adjustControlInfoF[1][0], adjustControlInfoF[1][1]);
					break;

				// 習得スキル
				case MIG_CHARA_DATA_ADJUST_CONTROL_SET_SKLILL_LEARNED:
					testConditionModified.SetLearned(adjustControlInfoF[1][0], adjustControlInfoF[1][1]);
					break;

				}
			}


			// カード設定マップを構築する
			equipRegionCardSettingMapF = new Map();

			EnumMigEquipRegionId.For(
				function (idxFF, nameFF, valueFF) {

					var idxInfoFF = 0;
					var idxSlotFF = 0;

					var cardIdFF = 0;
					var cardSettingInfoFF = null;
					var adjustControlInfoFF = null;

					cardSettingInfoFF = {
						typeId : 0,
						slotMap : new Map()
					};

					// フラグメントで指定されているもの
					for (idxSlotFF = 0; idxSlotFF < CMigEquipInfo.cardCountInEquip; idxSlotFF++) {

						cardIdFF = fragmentItem.GetEquippingCardId(valueFF, idxSlotFF);

						// 設定されていなければ、次へ
						if (cardIdFF === undefined) {
							continue;
						}

						cardSettingInfoFF.slotMap.set(idxSlotFF, cardIdFF);
					}

					// 追加設定で指定されているもの
					// TODO: これ、ここでやるとうまくいかないケースがあるかも
					// この次の処理のエンチャントの適合処理で、設定箇所が競合してしまう可能性がある？
					for (idxInfoFF = 0; idxInfoFF < adjustControlInfoArrayF.length; idxInfoFF++) {

						adjustControlInfoFF = adjustControlInfoArrayF[idxInfoFF];

						// 装備可能品に関するものでなければ、次へ
						if (adjustControlInfoFF[0] != MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP) {
							continue;
						}
						// 装備領域が異なる場合は、次へ
						if (adjustControlInfoFF[1][0] != valueFF) {
							continue;
						}
						// カードに関するものでなければ、次へ
						if (adjustControlInfoFF[1][1] != CONST_DATA_KIND_CARD) {
							continue;
						}

						cardSettingInfoFF.slotMap.set(adjustControlInfoFF[1][2], adjustControlInfoFF[1][3]);
					}

					if (cardSettingInfoFF.slotMap.size > 0) {
						equipRegionCardSettingMapF.set(valueFF, cardSettingInfoFF);
					}
				}
			);

			// この時点で、新しい情報マップ配列には、次のような対応関係で、データが格納されている
			// 　　エンチャントID　１－＊　装備領域ID　１－＊　｛タイプID，スロットID, カードID｝
			// これを基に、装備の候補を検討する
			// １）任意の新しい情報マップを選出する（昇順ソートしているので、要素数が最小のもの）
			// ２）選出した情報マップから、先頭の装備領域IDを取り出す（実際は、順に存在チェック）
			// ３）取り出した装備領域IDに登録されている、先頭の｛タイプID, スロットID, カードID｝を、装備候補に設定する
			// ４）次の情報マップを選出する
			// ５）選出した情報マップから、現在の設定状況に矛盾しないように、装備候補を設定する
			// 　　設定できれば、次の情報マップへ進む
			// 　　設定できなければ、ひとつ前の情報マップへ戻り、別の候補を設定しなおして、再度、同様の手順を進める
			// ６）最終的に、すべての情報マップが設定できれば完了
			ret = CMigItemDataTest.ModifyJobIdConditionSubEnchantRecursive(equipRegionLookUpMapArray, 0, candidateEquipMapMap, equipRegionCardSettingMapF, testConditionModified);

			// エンチャントの組み合わせを満たす方法がなかった場合
			// TODO: どう処理するか検討中
			if (!ret) {
				alert("条件を満たすエンチャントの設定方法がない");
			}

			// 装備の指定がある場合は設定する
			equipRegionCardSettingMapF.forEach(
				function (valueFF, keyFF, mapFF) {

					var idxFF = 0;
					var echantTypeIdFF = 0;
					var equipListFF = null;

					// 指定のエンチャントタイプを持つ装備を検索
					echantTypeIdFF = valueFF.typeId;
					if (echantTypeIdFF != 0) {
						equipListFF = candidateEquipMapMap.get(keyFF).get(echantTypeIdFF);

						// 装備可能なアイテムを選択
						for (idxFF = 0; idxFF < equipListFF.length; idxFF++) {
							if (IsMatchJobRestrict(equipListFF[idxFF], valueF)) {
								testConditionModified.SetEquip(keyFF, equipListFF[idxFF]);
								break;
							}
						}
					}

					// カードを設定
					valueFF.slotMap.forEach(
						function (valueFFF, keyFFF, mapFFF) {
							testConditionModified.SetCard(keyFF, keyFFF, valueFFF);
						}
					)
				}
			);

			// 結果に追加
			testConditionArrayModified.push(testConditionModified);
		}
	);



	return testConditionArrayModified;
};

/**
 * テスト条件の職業IDを適切なものに補正する（サブ　エンチャント用再帰関数）.
 * @param equipRegionLookUpMapArray 装備領域検索マップ
 * @param currentIndex 処理中のインデックス
 * @param candidateEquipMapMap 装備候補のアイテムIDマップ（装備領域単位）
 * @param equipRegionCardSettingMap カード設定状況マップ
 * @param testCondition テスト条件
 * @return 成否
 */
CMigItemDataTest.ModifyJobIdConditionSubEnchantRecursive = function (equipRegionLookUpMapArray, currentIndex, candidateEquipMapMap, equipRegionCardSettingMap, testCondition) {

	var idxRegion = 0;
	var idxArray = 0;
	var idxEquip = 0;
	var ret = null;

	var equipRegion = 0;
	var infoArray = null;
	var infoArrayArray = null;
	var typeSlotInfo = null;
	var equippedItemId = 0;
	var cardSettingInfo = null;
	var equipList = 0;

	var equipRegionList = [
		MIG_EQUIP_REGION_ID_ARMS_RIGHT,
		MIG_EQUIP_REGION_ID_ARMS_LEFT,
		MIG_EQUIP_REGION_ID_HEAD_TOP,
		MIG_EQUIP_REGION_ID_HEAD_MID,
		MIG_EQUIP_REGION_ID_HEAD_UNDER,
		MIG_EQUIP_REGION_ID_SHIELD,
		MIG_EQUIP_REGION_ID_BODY,
		MIG_EQUIP_REGION_ID_SHOULDER,
		MIG_EQUIP_REGION_ID_FOOT,
		MIG_EQUIP_REGION_ID_ACCESSORY_1,
		MIG_EQUIP_REGION_ID_ACCESSORY_2,
		MIG_EQUIP_REGION_ID_COSTUME_HEAD_TOP,
		MIG_EQUIP_REGION_ID_COSTUME_HEAD_MID,
		MIG_EQUIP_REGION_ID_COSTUME_HEAD_UNDER,
	];



	// 最後尾まで行っていれば成功
	if (currentIndex >= equipRegionLookUpMapArray.length) {
		return true;
	}



	for (idxRegion = 0; idxRegion < equipRegionList.length; idxRegion++) {

		// 装備領域を取得
		equipRegion = equipRegionList[idxRegion];

		// 該当の装備領域に対応付けられている候補を取得
		infoArrayArray = equipRegionLookUpMapArray[currentIndex].get(equipRegion);

		// 該当がなければ次へ
		if (infoArrayArray === undefined) {
			continue;
		}

		// 現在の状況に矛盾しないように、候補を設定する

		// 対応付けられている候補の先頭から順に検査し、適合するものを設定する
		for (idxArray = 0; idxArray < infoArrayArray.length; idxArray++) {

			for (idxInfo = 0; idxInfo < infoArrayArray[idxArray].length; idxInfo++) {

				// ｛エンチャントタイプ，スロット, エンチャント｝の組を取得
				typeSlotInfo = infoArrayArray[idxArray][idxInfo];

				// 現在の装備領域に固定装備が設定されている場合、エンチャントタイプIDが一致しなければ、条件不適
				equippedItemId = testCondition.GetEquip(equipRegion);
				if (equippedItemId !== undefined) {
					if (GetEnchantTypeId(ItemObjNew[equippedItemId][ITEM_DATA_INDEX_WPNLV]) != typeSlotInfo.typeId) {
						continue;
					}
				}

				// 現在のスロット状況にエンチャントタイプが既に設定されている場合
				cardSettingInfo = equipRegionCardSettingMap.get(equipRegion);
				if (cardSettingInfo !== undefined) {

					// エンチャントタイプIDが一致しなければ、条件不適
					if (cardSettingInfo.typeId != typeSlotInfo.typeId) {
						continue;
					}

					// 希望のスロットが既に埋まっている場合は、条件不適
					if (cardSettingInfo.slotMap.get(typeSlotInfo.slotId) != undefined) {
						continue;
					}
				}

				// 指定のエンチャントタイプで、条件に指定された職業において、装備可能なアイテムがあるかを判定
				equipList = candidateEquipMapMap.get(equipRegion).get(typeSlotInfo.typeId);
				for (idxEquip = 0; idxEquip < equipList.length; idxEquip++) {
					if (IsMatchJobRestrict(equipList[idxEquip], testCondition.GetJob())) {
						break;
					}
				}

				// 装備可能アイテムがない場合は次へ
				if (idxEquip >= equipList.length) {
					continue;
				}

				// ここまでくれば、候補として問題なし

				// スロット状況が新規の場合は、生成しておく（ないはず）
				if (cardSettingInfo === undefined) {
					cardSettingInfo = {
						typeId : typeSlotInfo.typeId,
						slotMap : new Map()
					};
					equipRegionCardSettingMap.set(equipRegion, cardSettingInfo);
				}

				// 希望のスロットにエンチャントIDを仮設定
				cardSettingInfo.slotMap.set(typeSlotInfo.slotId, typeSlotInfo.cardId);

				// 次のマップへ再起コール
				ret = CMigItemDataTest.ModifyJobIdConditionSubEnchantRecursive(equipRegionLookUpMapArray, currentIndex + 1, equipRegionCardSettingMap, testCondition)

				// 戻り値が成功なら、自身も成功終了
				if (ret) {
					return true;
				}

				// 戻り値が異常なら、仮設定を元に戻して、次の適合検査へのループへ合流
				cardSettingInfo.slotMap.delete(typeSlotInfo.slotId);
				if (cardSettingInfo.slotMap.size == 0) {
					equipRegionCardSettingMap.delete(equipRegion);
				}
			}
		}
	}

	return false;
}















//================================================================================================================================
//
//
// テストケース作成用関数　ここから
//
//
//================================================================================================================================

/**
 * アイテムデータ移行のテストケースの配列を作成する.
 * @param procIndex これから処理するインデックス
 * @param procCount 処理する全体数
 * @param idTarget テスト対象のID
 */
CMigItemDataTest.CreateTestCaseArrayItemDataMigration = function (procIndex, procCount, idTarget) {

	var refId = 0;
	var idActual = 0;

	var testConditionArray = null;
	var testCaseArray = null;

	// 状況ログ
	WriteConsoleLog("テストケースの生成開始（idTarget == " + EnumMigItemId.GetDefinedName(idTarget) + "）");

	// 参照IDを取得
	refId = g_constDataManager.GetRefId(CONST_DATA_KIND_ITEM, idTarget);

	// 参照IDが設定されている場合は、参照先のデータをもとに、テスト条件配列を生成する
	if (refId > 0) {
		idActual = refId;
		WriteConsoleLog("参照ID指定により、条件作成元IDを補正（idActual == " + idActual + "）");
	}
	else {
		idActual = idTarget;
	}

	// テスト条件の配列を作成する
	testConditionArray = CMigItemDataTest.GetTestConditionArrayItemDataMigration(idActual);

	// テストケースの配列を生成する
	testCaseArray = CMigItemDataTest.CreateTestCaseArraySubCommon(procIndex, procCount, testConditionArray);

	// 状況ログ
	WriteConsoleLog("テストケースの生成完了（idTarget == " + EnumMigItemId.GetDefinedName(idTarget) + "）");

	return testCaseArray;
};

/**
 * テストケースの配列を作成する（サブ　共通処理）.
 * @param procIndex これから処理するインデックス
 * @param procCount 処理する全体数
 * @param testConditionArray テスト条件の配列
 * @return テストケースの配列
 */
CMigItemDataTest.CreateTestCaseArraySubCommon = function (procIndex, procCount, testConditionArray) {

	var idx = 0;

	var testCase = null;
	var testCaseArray = null;

	testCaseArray = [];

	for (idx = 0; idx < testConditionArray.length; idx++) {

		// テストケースを作成
		testCase = CMigItemDataTest.CreateTestCase(testConditionArray[idx]);

		// 最終結果に追加
		testCaseArray.push(testCase);

		// 状況ログ
		WriteConsoleLog("テストケース生成成功（" + "case : " + (idx + 1) + " / " + testConditionArray.length + " (file : " + (procIndex + 1) + " / " + procCount + ")）");
	}

	return testCaseArray;
};

/**
 * テストケースを作成する.
 * @param testCondition テスト条件
 * @return テストケース
 */
CMigItemDataTest.CreateTestCase = function (testCondition) {

	var idx = 0;
	var idxSkill = 0;

	var itemIdArmsRight = 0;
	var confAutoBaseLvValueOld = "";
	var testCase = null;
	var selectedArray = null;
	var skillId = 0;
	var monsterId = 0;
	var attackMethodConfArray = null;
	var options = null;
	var valueWork = 0;

	var objSelect = null;

	var funcSelectValue = function (objIdF, objValueF) {

		var idxF = 0;
		var objSelectF = document.getElementById(objIdF);
		var optionsF = objSelectF.options;

		// 指定の値が選択可能かを検査
		for (idxF = 0; idxF < optionsF.length; idxF++) {
			if (optionsF[idxF].value == objValueF) {
				break;
			}
		}

		// 選択できる場合は設定する
		if (idxF < optionsF.length) {
			HtmlSetObjectValueById(objIdF, objValueF);
			HtmlCallFunction(objIdF, "onchange", undefined)
		}

		// そうでなければ、エラーを記録する
		else {
			WriteConsoleLog("選択できないオプション値 @ CMigItemDataTest.Test : (objIdF == " + objIdF + ", objValueF == " + objValueF + ")");
		}
	};

	var funcSelectParam = function (objIdF, paramId) {
		var valueF = 0;
		if ((valueF = testCondition.GetParam(paramId)) !== undefined) {
			funcSelectValue(objIdF, valueF);
		}
	};

	var funcSelectEquip = function (objIdF, equipRegionIdF) {
		var valueF = 0;
		if ((valueF = testCondition.GetEquip(equipRegionIdF)) !== undefined) {
			funcSelectValue(objIdF, valueF);
		}
	};

	var funcSelectCard = function (objIdF, equipRegionIdF) {

		testCondition.ForLoopCard(
			equipRegionIdF,
			function (equipRegionIdFF, slotIdFF, cardIdFF) {
				funcSelectValue(objIdF + "_CARD_" + (slotIdFF + 1), cardIdFF);
			}
		);
	};

	var funcSelectRefined = function (objIdF, equipRegionIdF) {
		var valueF = 0;
		if ((valueF = testCondition.GetRefined(equipRegionIdF)) !== undefined) {
			funcSelectValue(objIdF, valueF);
		}
	};

	var funcSelectLearned = function (valueF, keyF, mapF) {
		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
		var idxF = learnSkillIdArray.indexOf(keyF);
		RefreshSkillColumnHeaderLearned(null, idxF, valueF);
	};



	// テスト結果格納領域を用意
	testCase = new CMigTestCase();



	// 現在のベースレベルの自動調整を保持
	confAutoBaseLvValueOld = document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL").getAttribute("checked") ? "chekced" : "";

	// ベースレベルの自動調整をオフにしておく
	document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL").removeAttribute("checked");



	//--------------------------------
	// 画面部品に設定していく
	//--------------------------------

	_TEST_SETTINGS_APPLYING = true;


	// 職業
	funcSelectValue("OBJID_SELECT_JOB", testCondition.GetJob());


	// レベル
	funcSelectParam("OBJID_SELECT_BASE_LEVEL", MIG_PARAM_ID_BASE_LV);
	funcSelectParam("OBJID_SELECT_JOB_LEVEL", MIG_PARAM_ID_JOB_LV);


	// ステータス
	funcSelectParam("OBJID_SELECT_STATUS_STR", MIG_PARAM_ID_STR);
	funcSelectParam("OBJID_SELECT_STATUS_AGI", MIG_PARAM_ID_AGI);
	funcSelectParam("OBJID_SELECT_STATUS_VIT", MIG_PARAM_ID_VIT);
	funcSelectParam("OBJID_SELECT_STATUS_INT", MIG_PARAM_ID_INT);
	funcSelectParam("OBJID_SELECT_STATUS_DEX", MIG_PARAM_ID_DEX);
	funcSelectParam("OBJID_SELECT_STATUS_LUK", MIG_PARAM_ID_LUK);


	// 武器種別
	itemIdArmsRight = testCondition.GetEquip(MIG_EQUIP_REGION_ID_ARMS_RIGHT);
	if (itemIdArmsRight !== undefined) {
		// TODO: 旧データを参照することもあるので、旧データ配列から取得する
		funcSelectValue("OBJID_ARMS_TYPE_RIGHT", ItemObjNew[itemIdArmsRight][ITEM_DATA_INDEX_KIND]);
	}

	// 素手は適当な装備をつけておく
	if (HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_TYPE_RIGHT", 0) == 0) {
		document.getElementById("OBJID_ARMS_TYPE_RIGHT").selectedIndex = 1;
		HtmlCallFunction("OBJID_ARMS_TYPE_RIGHT", "onchange", [HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_TYPE_RIGHT", 0)]);
		testCondition.SetEquip(MIG_EQUIP_REGION_ID_ARMS_RIGHT, HtmlGetObjectValueByIdAsInteger("OBJID_ARMS_RIGHT", 0));
	}


	// 装備
	funcSelectEquip("OBJID_ARMS_RIGHT", MIG_EQUIP_REGION_ID_ARMS_RIGHT);
	// TODO: 左手未対応
	// funcSelectEquip("OBJID_ARMS_LEFT", MIG_EQUIP_REGION_ID_ARMS_LEFT);
	funcSelectEquip("OBJID_HEAD_TOP", MIG_EQUIP_REGION_ID_HEAD_TOP);
	funcSelectEquip("OBJID_HEAD_MID", MIG_EQUIP_REGION_ID_HEAD_MID);
	funcSelectEquip("OBJID_HEAD_UNDER", MIG_EQUIP_REGION_ID_HEAD_UNDER);
	funcSelectEquip("OBJID_SHIELD", MIG_EQUIP_REGION_ID_SHIELD);
	funcSelectEquip("OBJID_BODY", MIG_EQUIP_REGION_ID_BODY);
	funcSelectEquip("OBJID_SHOULDER", MIG_EQUIP_REGION_ID_SHOULDER);
	funcSelectEquip("OBJID_SHOES", MIG_EQUIP_REGION_ID_FOOT);
	funcSelectEquip("OBJID_ACCESSARY_1", MIG_EQUIP_REGION_ID_ACCESSORY_1);
	funcSelectEquip("OBJID_ACCESSARY_2", MIG_EQUIP_REGION_ID_ACCESSORY_2);


	// カード
	funcSelectCard("OBJID_ARMS_RIGHT", MIG_EQUIP_REGION_ID_ARMS_RIGHT);
	// TODO: 左手未対応
	// funcSelectEquip("OBJID_ARMS_LEFT", MIG_EQUIP_REGION_ID_ARMS_LEFT);
	funcSelectCard("OBJID_HEAD_TOP", MIG_EQUIP_REGION_ID_HEAD_TOP);
	funcSelectCard("OBJID_HEAD_MID", MIG_EQUIP_REGION_ID_HEAD_MID);
	funcSelectCard("OBJID_HEAD_UNDER", MIG_EQUIP_REGION_ID_HEAD_UNDER);
	funcSelectCard("OBJID_SHIELD", MIG_EQUIP_REGION_ID_SHIELD);
	funcSelectCard("OBJID_BODY", MIG_EQUIP_REGION_ID_BODY);
	funcSelectCard("OBJID_SHOULDER", MIG_EQUIP_REGION_ID_SHOULDER);
	funcSelectCard("OBJID_SHOES", MIG_EQUIP_REGION_ID_FOOT);
	funcSelectCard("OBJID_ACCESSARY_1", MIG_EQUIP_REGION_ID_ACCESSORY_1);
	funcSelectCard("OBJID_ACCESSARY_2", MIG_EQUIP_REGION_ID_ACCESSORY_2);


	// 精錬値
	funcSelectRefined("OBJID_ARMS_RIGHT_REFINE", MIG_EQUIP_REGION_ID_ARMS_RIGHT);
	// TODO: 左手未対応
	// funcSelectRefined("OBJID_ARMS_LEFT_REFINE", MIG_EQUIP_REGION_ID_ARMS_LEFT);
	funcSelectRefined("OBJID_HEAD_TOP_REFINE", MIG_EQUIP_REGION_ID_HEAD_TOP);
	funcSelectRefined("OBJID_SHIELD_REFINE", MIG_EQUIP_REGION_ID_SHIELD);
	funcSelectRefined("OBJID_BODY_REFINE", MIG_EQUIP_REGION_ID_BODY);
	funcSelectRefined("OBJID_SHOULDER_REFINE", MIG_EQUIP_REGION_ID_SHOULDER);
	funcSelectRefined("OBJID_SHOES_REFINE", MIG_EQUIP_REGION_ID_FOOT);


	// 習得スキル
	document.getElementById("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX").checked = "checked";
	HtmlCallFunction("OBJID_SKILL_COLUMN_EXTRACT_CHECKBOX", "onchange", undefined);
	testCondition.ForEachLearned(funcSelectLearned);


	// アイテム(食品/他)設定欄を展開表示
	document.getElementById("OBJID_CHECK_A7_SKILLSW").checked = "checked";
	HtmlCallFunction("OBJID_CHECK_A7_SKILLSW", "onclick", []);
	// 攻撃スクロールON
	document.getElementById("OBJID_CHECK_A7_Skill15").checked = "checked";



	// このタイミングで、一度ステータス再計算（ステータス条件で追加される攻撃手段などが追加できない）
	_TEST_SETTINGS_APPLYING = false;
	StAllCalc();
	_TEST_SETTINGS_APPLYING = true;



	// 攻撃手段
	CAttackMethodAreaComponentManager.RebuildControls();

	// 選択候補のID配列を生成する
	attackMethodConfArray = [];0
	skillId = testCondition.GetSkill();

	// 第一候補：通常のスキル（）
	attackMethodConf = new CAttackMethodConf();
	attackMethodConf.SetSkillId(skillId);
	attackMethodConf.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN);
	attackMethodConf.SetSkillLv(g_skillManager.GetMaxLv(skillId));
	attackMethodConfArray.push(attackMethodConf);

	// 第二候補：オートスペル（旧データ）
	attackMethodConf = new CAttackMethodConf();
	attackMethodConf.SetSkillId(skillId);
	attackMethodConf.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL);
	attackMethodConf.SetSkillLv(g_skillManager.GetMaxLv(skillId));
	attackMethodConfArray.push(attackMethodConf);

	// 第三候補：使用可能スキル（旧データ）
	attackMethodConf = new CAttackMethodConf();
	attackMethodConf.SetSkillId(skillId);
	attackMethodConf.SetSourceType(ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL);
	attackMethodConf.SetSkillLv(g_skillManager.GetMaxLv(skillId));
	attackMethodConfArray.push(attackMethodConf);

	// 第三候補：装備等による追加スキル（移行後の方式）
	attackMethodConf = new CAttackMethodConf();
	attackMethodConf.SetSkillId(skillId);
	attackMethodConf.SetSourceType(ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT);
	attackMethodConf.SetSkillLv(g_skillManager.GetMaxLv(skillId));
	attackMethodConfArray.push(attackMethodConf);

	// 候補順に設定を試す
	for (idx = 0; idx < attackMethodConfArray.length; idx++) {

		// 攻撃手段を設定し、成功した場合は、打ち切り
		if (CAttackMethodAreaComponentManager.SetAttackMethodConf(attackMethodConfArray[idx])) {
			break;
		}
	}

	// いずれも設定できなかった場合
	if (idx >= attackMethodConfArray.length) {
		WriteConsoleLog("設定できない攻撃手段 @ CMigItemDataTest.Test : (skillId == " + attackMethodConf.skillId + ")");
	}


	// モンスター
	monsterId = testCondition.GetMonster();

	selectedArray = CMonsterMapAreaComponentManager.ChangeSelect(
		MONSTER_MAP_ID_CATEGORY_ALL,
		MONSTER_MAP_ID_MAP_ALL,
		monsterId,
		false
	);

	if (selectedArray[2] != monsterId) {
		WriteConsoleLog("選択できないモンスター @ CMigItemDataTest.Test : (selectedArray == [ " + selectedArray.join(", ") + " ])");
	}

	// モンスター指定のないテストケース（モンスター手入力）の場合
	// （条件を操作するので手入力を使用する）
	if (monsterId == MONSTER_ID_MONSTER_TENYURYOKU) {

		// モンスター手入力設定欄を展開表示
		document.getElementById("OBJID_CONTROL_CONF2_0_SWITCH").checked = "checked";
		HtmlCallFunction("OBJID_CONTROL_CONF2_0_SWITCH", "onclick", [0]);

		// TODO: 以下、ID が自動付与なので、改造によってはIDが変わる、注意
		// 設定No.1を選択
		funcSelectValue("OBJID_CONTROL_CONF2_0_ID_0", 1);

		// レベル
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_3", 101);
		// HP
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_4", 101);
		// STR～LUK
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_5", 103);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_6", 107);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_7", 109);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_8", 113);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_9", 127);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_10", 131);
		// ATK～MATK
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_11", 55001);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_12", 66103);
		// 射程
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_13", 1);
		// DEF～MDEF
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_14", 211);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_15", 223);
		// BaseExp～JobExp
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_16", 77003);
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_17", 88001);
		// サイズ
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_18", ((testCondition.GetSize() >= 0) ? testCondition.GetSize() : MIG_SIZE_ID_SMALL));
		// 属性
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_19", MIG_ELEMENT_ID_VANITY * 10 + 1);
		// 種族
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_20", MIG_RACE_ID_SOLID);
		// BOSS属性
		HtmlSetObjectValueById("OBJID_CONTROL_CONF2_0_ID_21", MIG_BOSS_ID_NORMAL);

		// 設定値反映
		g_objMobConfInput.ApplyValueChanged(false);
	}

	// 特定のモンスターの場合
	else {

		// おそらく、そんな効果は実装されないと思うが、
		// 特定地域のモンスター、かつ、小型モンスターのような、モンスターをさらに絞り込むケースで、
		// 条件を満たさないものが検出された場合は、alert を表示するようにしておく
		valueWork = testCondition.GetSize();
		if (valueWork >= 0) {
			if (MonsterObjNew[monsterId][MONSTER_DATA_INDEX_SIZE] != valueWork) {
				alert("条件不適合モンスター（monsterId == " + MonsterObjNew[monsterId][MONSTER_DATA_INDEX_NAME] + ", sizeDesired == " + GetSizeText(valueWork) + "）");
			}
		}



		// 一部の敵は減算DEFなどが高すぎて計算結果を検証できないので、
		// 「モンスター状態異常設定」の「エスカ」状態にする

		// モンスター状態異常設定欄を展開表示
		document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_SWITCH").checked = "checked";
		HtmlCallFunction("OBJID_INPUT_MOB_CONF_DEBUF_SWITCH", "onclick", [0]);

		// エスカ
		document.getElementById("OBJID_INPUT_MOB_CONF_DEBUF_21").setAttribute("checked", "checked");

		// 設定値反映
		SyncronizeMobConfDebufSettingsCtrlToVar();
	}


	// 性能カスタマイズ
	// 最低限のダメージが出せるように

	// 性能カスタマイズ（ステータス関連）設定欄を展開表示
	document.getElementById("OBJID_CONTROL_CONF_3_SWITCH").checked = "checked";
	HtmlCallFunction("OBJID_CONTROL_CONF_3_SWITCH", "onclick", [3]);
	// STR、INT
	funcSelectValue("OBJID_CONTROL_CONF_3_ID_7", 100);
	funcSelectValue("OBJID_CONTROL_CONF_3_ID_10", 100);
	// HIT、FLEE
	funcSelectValue("OBJID_CONTROL_CONF_3_ID_13", 100);
	funcSelectValue("OBJID_CONTROL_CONF_3_ID_14", 100);

	// 性能カスタマイズ（攻撃関連）設定欄を展開表示
	document.getElementById("OBJID_CONTROL_CONF_4_SWITCH").checked = "checked";
	HtmlCallFunction("OBJID_CONTROL_CONF_4_SWITCH", "onclick", [4]);
	// 武器ATK～武器Lv
	funcSelectValue("OBJID_CONTROL_CONF_4_ID_1", (200 / 5));
	funcSelectValue("OBJID_CONTROL_CONF_4_ID_2", (200 / 5));
	funcSelectValue("OBJID_CONTROL_CONF_4_ID_3", 4);

/*
	// 詠唱シミュレータ
	if (skillId != SKILL_ID_TUZYO_KOGEKI) {

		// 設定欄を展開表示
		document.getElementById("OBJID_CONTROL_CASTSIM_SWITCH").checked = "checked";
		HtmlCallFunction("OBJID_CONTROL_CASTSIM_SWITCH", "onclick", undefined);

		// 第一スキルに該当スキルを設定
		funcSelectValue("OBJID_CONTROL_CAST_SIM_SKILL_SELECT_0", skillId);

		// 更新ボタン起動
		HtmlCallFunction("OBJID_CONTROL_CASTSIM_REFRESH", "onclick", undefined);
	}
*/



	// 設定終了
	_TEST_SETTINGS_APPLYING = false;



	// 計算ボタン起動
	document.getElementById("OBJID_BUTTON_CALC").onclick();

	// URL出力ボタン起動
	document.getElementById("OBJID_BUTTON_URL_OUT").onclick();



	// ベースレベルの自動調整を元に戻す
	if (confAutoBaseLvValueOld != "") {
		document.getElementById("OBJID_CHECK_AUTO_BASE_LEVEL").setAttribute("checked", "checked");
	}



	// 結果データの設定
	testCase.labelObject = testCondition.GetTestCaseLabel();
	testCase.dataURL = HtmlGetObjectValueById("OBJID_URL_OUT", "");



	// 結果を返す
	return testCase;
};















//================================================================================================================================
//
//
// テストケース実行用関数　ここから
//
//
//================================================================================================================================

/**
 * データ移行テストを実行する.
 * @param dataURL テストするデータのURL
 */
CMigItemDataTest.ExecMigrationTest = function (testLabel, dataURL) {

	var idx = 0;
	var pos = 0;
	var msg = "";

	var testLabelOld = "";
	var testLabelMigrated = "";
	var calcDataTextOld = "";
	var calcDataTextMigrated = "";

	var oldFlagDebug = false;

	var labelDataArrayParam = null;
	var labelDataArrayOld = null;
	var labelDataArrayMigrated = null;

	var funcLabelMatch = function (labelDataArrayParamF, labelDataArrayProcF) {

		var idxF = 0;
		var labelPartParam = "";
		var labelPartProc = "";
		var bMatchedWork = false;

		// 配列長が異なる場合は、不一致
		if (labelDataArrayParamF.length != labelDataArrayProcF.length) {
			return false;
		}

		// 要素単位で比較
		for (idxF = 0; idxF < labelDataArrayParamF.length; idxF++) {

			labelPartParam = labelDataArrayParamF[idxF];
			labelPartProc = labelDataArrayProcF[idxF];

			// 不一致があった場合
			if (labelPartParam != labelPartProc) {

				// 習得条件データの場合で、引数のラベルがレベル０指定、処理ラベルが空白ならば、問題なし
				if (idxF == MIG_TEST_CASE_LABEL_DATA_INDEX_LEARN) {

					// 引数のラベルが、スキル習得条件のレベル０
					if (labelPartParam.charAt(8) == CMigTestCaseLabel.NUMERIC_CHAR_LIST[0]) {

						// 処理ラベルが空白
						if (labelPartProc == CMigTestCaseLabel.CHAR_SPACE.repeat(labelPartProc.length)) {

							// ここに来たら、問題なし
							continue;
						}

					}
				}

				// 特化のデータの場合で、引数のラベルが指定なしならば、問題なし
				else if (idxF == MIG_TEST_CASE_LABEL_DATA_INDEX_SPEC) {

					bMatchedWork = false;

					while (!bMatchedWork) {

						if (labelPartParam.charAt(0) != CMigTestCaseLabel.GetRaceLabel(-1)) {
							if (labelPartParam.charAt(0) != labelPartProc.charAt(0)) {
								break;;
							}
						}

						if (labelPartParam.charAt(1) != CMigTestCaseLabel.GetElementLabel(-1)) {
							if (labelPartParam.charAt(1) != labelPartProc.charAt(1)) {
								break;;
							}
						}

						if (labelPartParam.charAt(2) != CMigTestCaseLabel.GetSizeLabel(-1)) {
							if (labelPartParam.charAt(2) != labelPartProc.charAt(2)) {
								break;;
							}
						}

						if (labelPartParam.charAt(3) != CMigTestCaseLabel.GetBossLabel(-1)) {
							if (labelPartParam.charAt(3) != labelPartProc.charAt(3)) {
								break;;
							}
						}

						if (labelPartParam.charAt(4) != CMigTestCaseLabel.GetPlayerLabel(-1)) {
							if (labelPartParam.charAt(4) != labelPartProc.charAt(4)) {
								break;;
							}
						}

						bMatchedWork = true;
						break;
					}

					if (bMatchedWork) {
						continue;
					}
				}


				// ここに来たら、問題あり
				return false;
			}
		}

		return true;
	};



	// 現在のフラグを保持
	oldFlagDebug = _DEBUG;



	// URL入力にデータURLを設定
	HtmlSetObjectValueById("OBJID_URL_IN", dataURL);



	// 従来の処理方式でテスト
	_DEBUG = false;

	// URL入力ボタン起動
	document.getElementById("OBJID_BUTTON_URL_IN").onclick();

	// テストケースラベルを取得
	testLabelOld = CMigItemDataTest.GetTestCaseLabelFromVariables();

	// 計算データテキストを取得
	calcDataTextOld = CCalcDataTextCreator.CreateCalcDataText(testLabelOld);



	// 移行後の処理方式でテスト
	_DEBUG = true;

	// URL入力ボタン起動
	document.getElementById("OBJID_BUTTON_URL_IN").onclick();

	// テストケースラベルを取得
	testLabelMigrated = CMigItemDataTest.GetTestCaseLabelFromVariables();

	// 計算データテキストを取得
	calcDataTextMigrated = CCalcDataTextCreator.CreateCalcDataText(testLabelMigrated);



	// フラグを復元
	_DEBUG = oldFlagDebug;



	// テストラベル判定
	if (testLabel != "") {

		labelDataArrayParam = CMigTestCaseLabel.SplitLabelText(testLabel);
		labelDataArrayOld = CMigTestCaseLabel.SplitLabelText(testLabelOld);
		labelDataArrayMigrated = CMigTestCaseLabel.SplitLabelText(testLabelMigrated);

		// 引数のラベルと、従来の処理ラベルの比較
		if (!funcLabelMatch(labelDataArrayParam, labelDataArrayOld)) {

			msg = "テストラベル不一致" + "\r\n";
			msg += "Expected : " + testLabel + "\r\n"
			msg += "　!=" + "\r\n"
			msg += "Act(OLD) : " + testLabelOld + "\r\n";

			for (pos = 0; pos < testLabel.length; pos++) {
				if (testLabel[pos] != testLabelOld[pos]) {
					msg += "　at " + pos + "\"" + testLabel[pos] + "\"" + " != " + "\"" + testLabelOld[pos] + "\"" + "\r\n";
				}
			}

			WriteConsoleLog(msg);
		}

		// 引数のラベルと、移行後の処理ラベルの比較
		if (!funcLabelMatch(labelDataArrayParam, labelDataArrayMigrated)) {

			msg = "テストラベル不一致" + "\r\n";
			msg += "Expected : " + testLabel + "\r\n"
			msg += "　!=" + "\r\n"
			msg += "Act(MIG) : " + testLabelMigrated + "\r\n";

			for (pos = 0; pos < testLabel.length; pos++) {
				if (testLabel[pos] != testLabelMigrated[pos]) {
					msg += "　at " + pos + "\"" + testLabel[pos] + "\"" + " != " + "\"" + testLabelMigrated[pos] + "\"" + "\r\n";
				}
			}

			WriteConsoleLog(msg);
		}
	}



	return [calcDataTextOld, calcDataTextMigrated, g_charaDataManager.GetCharaData(MIG_CHARA_MANAGER_ID_MAIN).GetCoverageTree()];
};



/**
 * 現在の設定状況（StAllCalc() で変数に格納されている値）を元に、テストケースラベルを生成する.
 */
CMigItemDataTest.GetTestCaseLabelFromVariables = function () {

	// CMigTestCaseLabel クラスの GetLabel() 関数と対応させること

	var idx = 0;

	var arrayWork = null;
	var monsterId = 0;
	var mobData = null;

	var labelPart = "";
	var labelPartArray = null;

	var noneItemIdArray = [
		ITEM_ID_SUDE,
		ITEM_ID_NOEQUIP_HEAD_TOP,
		ITEM_ID_NOEQUIP_HEAD_MID,
		ITEM_ID_NOEQUIP_HEAD_UNDER,
		ITEM_ID_NOEQUIP_BODY,
		ITEM_ID_NOEQUIP_SHIELD,
		ITEM_ID_NOEQUIP_SHOULDER,
		ITEM_ID_NOEQUIP_SHOES,
		ITEM_ID_NOEQUIP_ACCESSARY,
		ITEM_ID_NOEQUIP_SET,
	];

	var funcGetEquipText = function (equipRegionIdF, itemIdF) {

		// 装備なしの場合は、位置情報出力
		if (noneItemIdArray.indexOf(itemIdF) >= 0) {
			return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}

		return "Ｉ";
	};

	var funcGetRefinedText = function (equipRegionIdF, itemIdF, refinedF) {

		// 装備なしの場合は、位置情報出力
		if ((noneItemIdArray.indexOf(itemIdF) >= 0) || (refinedF < 0)) {
			return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}

		return CMigTestCaseLabel.NUMERIC_CHAR_LIST[refinedF];
	};

	var funcGetCardText = function (equipRegionIdF, cardIdArrayF) {

		var idxF = 0;
		var cardSetFlagF = 0;

		for (idxF = 0; idxF < cardIdArrayF.length; idxF++) {
			if (cardIdArrayF[idxF] != CARD_ID_NONE) {
				cardSetFlagF += 1 << idxF;
			}
		}

		// カードなしの場合は、位置情報出力
		if (cardSetFlagF == 0) {
			return CMigTestCaseLabel.GetEquipRegionPlacer(equipRegionIdF);
		}

		return CMigTestCaseLabel.NUMERIC_CHAR_LIST[cardSetFlagF];
	};

	var funcGetSkillText = function (skillIdF) {

		// TODO: ここ、プレーンネームを保持する仕組み作りたい

		var skillIdOriginF = 0;
		var skillNameF = "";
		var regReplacerF = /\([^)]+\)/;

		skillIdOriginF = CAttackMethodData.GetSkillIdFromFullId(skillIdF);

		skillNameF = g_skillManager.GetSkillName(skillIdOriginF);

		while (regReplacerF.test(skillNameF)) {
			skillNameF = skillNameF.replace(regReplacerF, "");
		}

		return (skillNameF + "　".repeat(8)).slice(0, 8);
	};



	labelPartArray = [];



	// 職業
//	labelPartArray.push((CMigTestCaseLabel.GetJobLabel(n_A_JOB) + "　".repeat(4)).slice(0, 4));
	labelPartArray.push(CMigTestCaseLabel.GetLabelPartJobName(n_A_JOB));


	// パラメータ
/*
	labelPart = "";
	labelPart += (" ".repeat(4) + n_A_BaseLV).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + n_A_JobLV).slice(-2);
	labelPart += " ";
	labelPart += (" ".repeat(4) + SU_STR).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + SU_AGI).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + SU_VIT).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + SU_INT).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + SU_DEX).slice(-3);
	labelPart += "/";
	labelPart += (" ".repeat(4) + SU_LUK).slice(-3);
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(
		CMigTestCaseLabel.GetLabelPartParams(
			n_A_JOB,
			n_A_BaseLV,
			n_A_JobLV,
			SU_STR,
			SU_AGI,
			SU_VIT,
			SU_INT,
			SU_DEX,
			SU_LUK
		)
	);



	// 装備
/*
	labelPart = "";
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ARMS_RIGHT, n_A_Equip[EQUIP_REGION_ID_ARMS]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ARMS_LEFT, n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_TOP, n_A_Equip[EQUIP_REGION_ID_HEAD_TOP]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_MID, n_A_Equip[EQUIP_REGION_ID_HEAD_MID]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_HEAD_UNDER, n_A_Equip[EQUIP_REGION_ID_HEAD_UNDER]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_SHIELD, n_A_Equip[EQUIP_REGION_ID_SHIELD]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_BODY, n_A_Equip[EQUIP_REGION_ID_BODY]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_SHOULDER, n_A_Equip[EQUIP_REGION_ID_SHOULDER]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_FOOT, n_A_Equip[EQUIP_REGION_ID_SHOES]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ACCESSORY_1, n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1]);
	labelPart += funcGetEquipText(MIG_EQUIP_REGION_ID_ACCESSORY_2, n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2]);
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(
		CMigTestCaseLabel.GetLabelPartEquips(
			n_A_Equip[EQUIP_REGION_ID_ARMS],
			n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT],
			n_A_Equip[EQUIP_REGION_ID_HEAD_TOP],
			n_A_Equip[EQUIP_REGION_ID_HEAD_MID],
			n_A_Equip[EQUIP_REGION_ID_HEAD_UNDER],
			n_A_Equip[EQUIP_REGION_ID_SHIELD],
			n_A_Equip[EQUIP_REGION_ID_BODY],
			n_A_Equip[EQUIP_REGION_ID_SHOULDER],
			n_A_Equip[EQUIP_REGION_ID_SHOES],
			n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1],
			n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2]
		)
	);


	// 精錬値
/*
	labelPart = "";
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ARMS_RIGHT, n_A_Equip[EQUIP_REGION_ID_ARMS], n_A_Weapon_ATKplus);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ARMS_LEFT, n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT], n_A_Weapon2_ATKplus);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_TOP, n_A_Equip[EQUIP_REGION_ID_HEAD_TOP], n_A_HEAD_DEF_PLUS);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_MID, n_A_Equip[EQUIP_REGION_ID_HEAD_MID], -1);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_HEAD_UNDER, n_A_Equip[EQUIP_REGION_ID_HEAD_UNDER], -1);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_SHIELD, n_A_Equip[EQUIP_REGION_ID_SHIELD], n_A_SHIELD_DEF_PLUS);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_BODY, n_A_Equip[EQUIP_REGION_ID_BODY], n_A_BODY_DEF_PLUS);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_SHOULDER, n_A_Equip[EQUIP_REGION_ID_SHOULDER], n_A_SHOULDER_DEF_PLUS);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_FOOT, n_A_Equip[EQUIP_REGION_ID_SHOES], n_A_SHOES_DEF_PLUS);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ACCESSORY_1, n_A_Equip[EQUIP_REGION_ID_ACCESSARY_1], -1);
	labelPart += funcGetRefinedText(MIG_EQUIP_REGION_ID_ACCESSORY_2, n_A_Equip[EQUIP_REGION_ID_ACCESSARY_2], -1);
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(
		CMigTestCaseLabel.GetLabelPartRefineds(
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_ARMS]) >= 0) ? undefined : n_A_Weapon_ATKplus),
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_ARMS_LEFT]) >= 0) ? undefined : n_A_Weapon2_ATKplus),
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_HEAD_TOP]) >= 0) ? undefined : n_A_HEAD_DEF_PLUS),
			undefined,
			undefined,
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_SHIELD]) >= 0) ? undefined : n_A_SHIELD_DEF_PLUS),
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_BODY]) >= 0) ? undefined : n_A_BODY_DEF_PLUS),
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_SHOULDER]) >= 0) ? undefined : n_A_SHOULDER_DEF_PLUS),
			((noneItemIdArray.indexOf(n_A_Equip[EQUIP_REGION_ID_SHOES]) >= 0) ? undefined : n_A_SHOES_DEF_PLUS),
			undefined,
			undefined
		)
	);

	// カード
/*
	labelPart = "";
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_ARMS_RIGHT,
		[
			n_A_card[CARD_REGION_ID_ARMS_RIGHT_1],
			n_A_card[CARD_REGION_ID_ARMS_RIGHT_2],
			n_A_card[CARD_REGION_ID_ARMS_RIGHT_3],
			n_A_card[CARD_REGION_ID_ARMS_RIGHT_4],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_ARMS_LEFT,
		[
			n_A_card[CARD_REGION_ID_ARMS_LEFT_1],
			n_A_card[CARD_REGION_ID_ARMS_LEFT_2],
			n_A_card[CARD_REGION_ID_ARMS_LEFT_3],
			n_A_card[CARD_REGION_ID_ARMS_LEFT_4],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_HEAD_TOP,
		[
			n_A_card[CARD_REGION_ID_HEAD_TOP],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_HEAD_MID,
		[
			n_A_card[CARD_REGION_ID_HEAD_MID],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_1],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_2],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_HEAD_UNDER,
		[
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2],
			n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_SHIELD,
		[
			n_A_card[CARD_REGION_ID_SHIELD],
			n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_1],
			n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_2],
			n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_BODY,
		[
			n_A_card[CARD_REGION_ID_BODY],
			n_A_card[CARD_REGION_ID_ENCHANT_BODY_1],
			n_A_card[CARD_REGION_ID_ENCHANT_BODY_2],
			n_A_card[CARD_REGION_ID_ENCHANT_BODY_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_SHOULDER,
		[
			n_A_card[CARD_REGION_ID_SHOULDER],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_1],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_2],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_FOOT,
		[
			n_A_card[CARD_REGION_ID_SHOES],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOES_1],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOES_2],
			n_A_card[CARD_REGION_ID_ENCHANT_SHOES_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_ACCESSORY_1,
		[
			n_A_card[CARD_REGION_ID_ACCESSARY_1],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_1],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_2],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_3],
		]
	);
	labelPart += funcGetCardText(
		MIG_EQUIP_REGION_ID_ACCESSORY_2,
		[
			n_A_card[CARD_REGION_ID_ACCESSARY_2],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_1],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_2],
			n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_3],
		]
	);
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(
		CMigTestCaseLabel.GetLabelPartCards(
			[
				n_A_card[CARD_REGION_ID_ARMS_RIGHT_1],
				n_A_card[CARD_REGION_ID_ARMS_RIGHT_2],
				n_A_card[CARD_REGION_ID_ARMS_RIGHT_3],
				n_A_card[CARD_REGION_ID_ARMS_RIGHT_4],
			],
			[
				n_A_card[CARD_REGION_ID_ARMS_LEFT_1],
				n_A_card[CARD_REGION_ID_ARMS_LEFT_2],
				n_A_card[CARD_REGION_ID_ARMS_LEFT_3],
				n_A_card[CARD_REGION_ID_ARMS_LEFT_4],
			],
			[
				n_A_card[CARD_REGION_ID_HEAD_TOP],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_1],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_2],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_TOP_3],
			],
			[
				n_A_card[CARD_REGION_ID_HEAD_MID],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_1],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_2],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_MID_3],
			],
			[
				CARD_ID_NONE,
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_1],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_2],
				n_A_card[CARD_REGION_ID_ENCHANT_HEAD_UNDER_3],
			],
			[
				n_A_card[CARD_REGION_ID_SHIELD],
				n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_1],
				n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_2],
				n_A_card[CARD_REGION_ID_ENCHANT_SHIELD_3],
			],
			[
				n_A_card[CARD_REGION_ID_BODY],
				n_A_card[CARD_REGION_ID_ENCHANT_BODY_1],
				n_A_card[CARD_REGION_ID_ENCHANT_BODY_2],
				n_A_card[CARD_REGION_ID_ENCHANT_BODY_3],
			],
			[
				n_A_card[CARD_REGION_ID_SHOULDER],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_1],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_2],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOULDER_3],
			],
			[
				n_A_card[CARD_REGION_ID_SHOES],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOES_1],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOES_2],
				n_A_card[CARD_REGION_ID_ENCHANT_SHOES_3],
			],
			[
				n_A_card[CARD_REGION_ID_ACCESSARY_1],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_1],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_2],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_1_3],
			],
			[
				n_A_card[CARD_REGION_ID_ACCESSARY_2],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_1],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_2],
				n_A_card[CARD_REGION_ID_ENCHANT_ACCESSARY_2_3],
			]
		)
	);



	// 習得スキル
	// 昇順にソートしておく
	var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, n_A_JOB).GetLearnSkillIdArray();
	arrayWork = [];
	for (idx = 0; idx < n_A_LearnedSkill.length; idx++) {

		// 設定されていなければ処理なし
		if (n_A_LearnedSkill[idx] == 0) {
			continue;
		}

		arrayWork.push([learnSkillIdArray[idx], n_A_LearnedSkill[idx]]);
	}

/*
	labelPart = "";
	for (idx = 0; idx < arrayWork.length; idx++) {
		labelPart += (funcGetSkillText(arrayWork[idx][0]) + "　".repeat(8)).slice(0, 8);
		labelPart += CMigTestCaseLabel.NUMERIC_CHAR_LIST[arrayWork[idx][1]];
		labelPart += "　";
	}
	if (labelPart == "") {
		labelPart = "　".repeat(10);
	}
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(CMigTestCaseLabel.GetLabelPartLearnedSkills(arrayWork));



	// アクティブスキル
//	labelPartArray.push(funcGetSkillText(n_A_ActiveSkill));
	labelPartArray.push(CMigTestCaseLabel.GetLabelPartActiveSkill(n_A_ActiveSkill));



/*
	// サイズ
	labelPart = "";
	labelPart += "種";
	labelPart += "属";

// TODO: ちょっと未対応
//	labelPart += CMigTestCaseLabel.GetSizeLabel(CCalcDataTextCreator.refMobData[MONSTER_DATA_INDEX_SIZE]);

	labelPartArray.push(labelPart);
*/

	// 敵特性
	// TODO: よい構造ではないが、とりあえず計算データとして収集したところから、補正後のモンスターデータを取得する
	mobData = CCalcDataTextCreator.refMobData;
	labelPartArray.push(
		CMigTestCaseLabel.GetLabelPartSpecializes(
			mobData[MONSTER_DATA_INDEX_ID],
			mobData[MONSTER_DATA_INDEX_RACE],
			mobData[MONSTER_DATA_INDEX_ELEMENT],
			mobData[MONSTER_DATA_INDEX_SIZE],
			mobData[MONSTER_DATA_INDEX_BOSS_TYPE],
			// TODO: プレイヤー属性未対応
			undefined
		)
	);


	// モンスター
/*
	labelPart = "";
	labelPart += (MonsterObjNew[CMonsterMapAreaComponentManager.GetMonsterId()][MONSTER_DATA_INDEX_NAME] + CMigTestCaseLabel.CHAR_SPACE.repeat(8)).slice(0, 8);
	labelPartArray.push(labelPart);
*/
	labelPartArray.push(CMigTestCaseLabel.GetLabelPartMonster(mobData[MONSTER_DATA_INDEX_ID]));



	return (CMigTestCaseLabel.CHAR_OPEN_BRACKET
			+ labelPartArray.join(CMigTestCaseLabel.CHAR_CLOSE_BRACKET + CMigTestCaseLabel.CHAR_OPEN_BRACKET)
			+ CMigTestCaseLabel.CHAR_CLOSE_BRACKET);
};












//================================================================================================================================
//
//
// ユーティリティ関数　ここから
//
//
//================================================================================================================================

CMigItemDataTest.GetEquipRegionIdByOldItemKind = function (itemKind) {

	switch (itemKind) {

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
	case ITEM_KIND_STUFF2HAND:
		return MIG_EQUIP_REGION_ID_ARMS_RIGHT;

	case ITEM_KIND_HEAD_TOP:
		return MIG_EQUIP_REGION_ID_HEAD_TOP;

	case ITEM_KIND_HEAD_MID:
		return MIG_EQUIP_REGION_ID_HEAD_MID;

	case ITEM_KIND_HEAD_UNDER:
		return MIG_EQUIP_REGION_ID_HEAD_UNDER;

	case ITEM_KIND_BODY:
		return MIG_EQUIP_REGION_ID_BODY;

	case ITEM_KIND_SHIELD:
		return MIG_EQUIP_REGION_ID_SHIELD;

	case ITEM_KIND_SHOULDER:
		return MIG_EQUIP_REGION_ID_SHOULDER;

	case ITEM_KIND_FOOT:
		return MIG_EQUIP_REGION_ID_FOOT;

	case ITEM_KIND_ACCESSARY:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case ITEM_KIND_ACCESSARY_ON1:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case ITEM_KIND_ACCESSARY_ON2:
		return MIG_EQUIP_REGION_ID_ACCESSORY_2;

	}

	return -1;
};

CMigItemDataTest.GetMigEquipRegionIdByMigItemKind = function (itemType, itemPosition) {

	switch (itemType) {

	case MIG_ITEM_TYPE_NONE:
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
		return MIG_EQUIP_REGION_ID_ARMS_RIGHT;

	case MIG_ITEM_TYPE_HELM:
		switch (itemPosition) {

		case MIG_ITEM_POSITION_TOP:
		case MIG_ITEM_POSITION_TOP_MID:
		case MIG_ITEM_POSITION_TOP_UNDER:
		case MIG_ITEM_POSITION_TOP_MID_UNDER:
			return MIG_EQUIP_REGION_ID_HEAD_TOP;

		case MIG_ITEM_POSITION_MID:
		case MIG_ITEM_POSITION_MID_UNDER:
			return MIG_EQUIP_REGION_ID_HEAD_MID;

		case MIG_ITEM_POSITION_UNDER:
			return MIG_EQUIP_REGION_ID_HEAD_UNDER;

		}
		break;

	case MIG_ITEM_TYPE_ARMOR:
		return MIG_EQUIP_REGION_ID_BODY;

	case MIG_ITEM_TYPE_SHIELD:
		return MIG_EQUIP_REGION_ID_SHIELD;

	case MIG_ITEM_TYPE_SHOULDER:
		return MIG_EQUIP_REGION_ID_SHOULDER;

	case MIG_ITEM_TYPE_SHOES:
		return MIG_EQUIP_REGION_ID_FOOT;

	case MIG_ITEM_TYPE_ACCESSORY:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case MIG_ITEM_TYPE_ACCESSORY_ON_1:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case MIG_ITEM_TYPE_ACCESSORY_ON_2:
		return MIG_EQUIP_REGION_ID_ACCESSORY_2;

	}

	return -1;
};

CMigItemDataTest.GetMigEquipRegionIdByOldItemKind = function (itemKind) {

	switch (itemKind) {

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
	case ITEM_KIND_STUFF2HAND:
		return MIG_EQUIP_REGION_ID_ARMS_RIGHT;

	case ITEM_KIND_HEAD_TOP:
		return MIG_EQUIP_REGION_ID_HEAD_TOP;

	case ITEM_KIND_HEAD_MID:
		return MIG_EQUIP_REGION_ID_HEAD_MID;

	case ITEM_KIND_HEAD_UNDER:
		return MIG_EQUIP_REGION_ID_HEAD_UNDER;

	case ITEM_KIND_BODY:
		return MIG_EQUIP_REGION_ID_BODY;

	case ITEM_KIND_SHIELD:
		return MIG_EQUIP_REGION_ID_SHIELD;

	case ITEM_KIND_SHOULDER:
		return MIG_EQUIP_REGION_ID_SHOULDER;

	case ITEM_KIND_FOOT:
		return MIG_EQUIP_REGION_ID_FOOT;

	case ITEM_KIND_ACCESSARY:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case ITEM_KIND_ACCESSARY_ON1:
		return MIG_EQUIP_REGION_ID_ACCESSORY_1;

	case ITEM_KIND_ACCESSARY_ON2:
		return MIG_EQUIP_REGION_ID_ACCESSORY_2;

	}

	return -1;
};






