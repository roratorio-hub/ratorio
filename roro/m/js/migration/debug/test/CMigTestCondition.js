
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

//----------------------------------------------------------------
// SP条件種別定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMigTestSpConditionJudgeType",
	[
		"MIG_TEST_SP_CONDITION_JUDGE_TYPE_NOT",
		"MIG_TEST_SP_CONDITION_JUDGE_TYPE_UNDER",
		"MIG_TEST_SP_CONDITION_JUDGE_TYPE_OVER",
		"MIG_TEST_SP_CONDITION_JUDGE_TYPE_BY",
	],
	0,
	1
);















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
 * テスト条件クラス（キャラクター用フラグメント）.
 */
function CMigTestConditionFragmentChara () {

	// 継承定義は、クラス本体の次に記述
}
CMigTestConditionFragmentChara.prototype = new CMigCharaData(g_constDataManager);





/**
 * テスト条件クラス（アイテム用フラグメント）.
 */
function CMigTestConditionFragmentItem () {

	// 装着するアイテムIDのマップ
	this.equippingItemIdMap = new Map();

	// 装着するカードIDマップのマップ
	this.equippingCardIdMapMap = new Map();

	// パラメータ条件用の、判定ベース配列のマップ
	this.judgeBaseArrayMapParam = new Map();

	// 精錬値条件用の、判定ベース配列のマップ
	this.judgeBaseArrayMapRefined = new Map();

	// スキル習得レベル条件用の、判定ベース配列のマップ
	this.judgeBaseArrayMapLearned = new Map();

	// 職業制限条件用の、有効な職業IDの配列
	this.effectiveJobIdArray = [];

	// 職業系列制限条件用の、有効な職業IDの配列
	this.effectiveJobSeriesIdArray = [];

	// 要求されたエンチャントIDの配列
	this.requiredEnchantIdArray = [];

	// 効果を受けるスキルIDの配列
	this.effectiveSkillIdArray = [];

	// 効果を受けるサイズIDの配列
	this.effectiveSizeIdArray = [];

	// 効果を受けるモンスターIDの配列
	this.effectiveMonsterIdArray = [];



	/**
	 * 装着するアイテムIDを設定する.
	 * @param equipRegionId 装備領域ID
	 * @param itemId アイテムID
	 */
	this.SetEquippingItemId = function (equipRegionId, itemId) {
		this.equippingItemIdMap.set(equipRegionId, itemId);
	};

	/**
	 * 装着するアイテムIDを取得する.
	 * @param equipRegionId 装備領域ID
	 * @return アイテムID
	 */
	this.GetEquippingItemId = function (equipRegionId) {
		return this.equippingItemIdMap.get(equipRegionId);
	};



	/**
	 * 装着するカードIDを設定する.
	 * @param equipRegionId 装備領域ID
	 * @param slotId スロットID
	 * @param cardId カードID
	 */
	this.SetEquippingCardId = function (equipRegionId, slotId, cardId) {

		var cardIdMap = null;

		cardIdMap = this.equippingCardIdMapMap.get(equipRegionId);

		if (cardIdMap === undefined) {
			cardIdMap = new Map();
			this.equippingCardIdMapMap.set(equipRegionId, cardIdMap);
		}

		cardIdMap.set(slotId, cardId);
	};

	/**
	 * 装着するカードIDを取得する.
	 * @param equipRegionId 装備領域ID
	 * @param slotId スロットID
	 * @return カードID
	 */
	this.GetEquippingCardId = function (equipRegionId, slotId) {

		var cardIdMap = null;

		cardIdMap = this.equippingCardIdMapMap.get(equipRegionId);

		if (cardIdMap) {
			return cardIdMap.get(slotId);
		}

		return undefined;
	};



	/**
	 * 装着する矢IDを設定する.
	 * @param equipRegionId 装備領域ID
	 * @param arrowId 矢ID
	 * @remarks 現状、アイテム扱い
	 */
	this.SetEquippingArrowId = function (equipRegionId, arrowId) {
		this.equippingItemIdMap.set(equipRegionId, arrowId);
	};

	/**
	 * 装着する矢IDを取得する.
	 * @param equipRegionId 装備領域ID
	 * @return 矢ID
	 * @remarks 現状、アイテム扱い
	 */
	this.GetEquippingArrowId = function (equipRegionId) {
		return this.equippingItemIdMap.get(equipRegionId);
	};




	/**
	 * パラメータ条件用の、判定ベース配列を設定する.
	 * @param paramId パラメータID
	 * @param judgeBaseArray 判定ベース配列
	 */
	this.SetJudgeBaseArrayParam = function (paramId, judgeBaseArray) {
		this.judgeBaseArrayMapParam.set(paramId, judgeBaseArray);
	};

	/**
	 * パラメータ条件用の、判定ベース配列を取得する.
	 * @param paramId パラメータID
	 * @return 判定ベース配列
	 */
	this.GetJudgeBaseArrayParam = function (paramId) {
		return this.judgeBaseArrayMapParam.get(paramId);
	};



	/**
	 * 精錬値条件用の、判定ベース配列を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param judgeBaseArray 判定ベース配列
	 */
	this.SetJudgeBaseArrayRefined = function (equipRegionId, judgeBaseArray) {
		this.judgeBaseArrayMapRefined.set(equipRegionId, judgeBaseArray);
	};

	/**
	 * 精錬値条件用の、判定ベース配列を取得する.
	 * @param equipRegionId 装備領域ID
	 * @return 判定ベース配列
	 */
	this.GetJudgeBaseArrayRefined = function (equipRegionId) {
		return this.judgeBaseArrayMapRefined.get(equipRegionId);
	};



	/**
	 * スキル習得レベル条件用の、判定ベース配列を設定する.
	 * @param skillId スキルID
	 * @param judgeBaseArray 判定ベース配列
	 */
	this.SetJudgeBaseArrayLearned = function (skillId, judgeBaseArray) {
		this.judgeBaseArrayMapLearned.set(skillId, judgeBaseArray);
	};

	/**
	 * スキル習得レベル条件用の、判定ベース配列を取得する.
	 * @param skillId スキルID
	 * @return 判定ベース配列
	 */
	this.GetJudgeBaseArrayLearned = function (skillId) {
		return this.judgeBaseArrayMapLearned.get(skillId);
	};

	/**
	 * スキル習得レベル条件用の、判定ベース配列をループする.
	 * @param funcCallback コールバック関数（引数は、(value, key, map)）
	 */
	this.ForEachJudgeBaseArrayLearned = function (funcCallback) {
		this.judgeBaseArrayMapLearned.forEach(funcCallback);
	};



	/**
	 * 職業制限条件用の、有効な職業IDを追加する.
	 * @param jobId 職業ID
	 */
	this.AddEffectiveJobId = function (jobId) {
		this.effectiveJobIdArray.push(jobId);
	};

	/**
	 * 職業制限条件用の、有効な職業ID配列を取得する.
	 * @param jobId 職業ID
	 */
	this.GetEffectiveJobIdArray = function () {
		return this.effectiveJobIdArray;
	};

	/**
	 * 職業制限条件用の、有効な職業IDをループする.
	 * @param funcCallback コールバック関数（引数は、(currentValue, index, array)）
	 */
	this.ForEachEffectiveJobIdArray = function (funcCallback) {
		return this.effectiveJobIdArray.forEach(funcCallback);
	};



	/**
	 * 職業系列制限条件用の、有効な職業系列IDを追加する.
	 * @param jobSeriesId 職業系列ID
	 */
	this.AddEffectiveJobSeriesId = function (jobSeriesId) {
		this.effectiveJobSeriesIdArray.push(jobSeriesId);
	};

	/**
	 * 職業系列制限条件用の、有効な職業系列ID配列を取得する.
	 * @param jobSeriesId 職業系列ID
	 */
	this.GetEffectiveJobSeriesIdArray = function () {
		return this.effectiveJobSeriesIdArray;
	};

	/**
	 * 職業系列制限条件用の、有効な職業系列IDをループする.
	 * @param funcCallback コールバック関数（引数は、(currentValue, index, array)）
	 */
	this.ForEachEffectiveJobSeriesIdArray = function (funcCallback) {
		return this.effectiveJobSeriesIdArray.forEach(funcCallback);
	};



	/**
	 * 要求されるエンチャントIDを追加する.
	 * @param cardId エンチャントID（実態はカードID）
	 */
	this.AddRequiredEnchantId = function (cardId) {
		this.requiredEnchantIdArray.push(cardId);
	};

	/**
	 * 要求されるエンチャントID配列を取得する.
	 * @return エンチャントID（実態はカードID）
	 */
	this.GetRequiredEnchantIdArray = function () {
		return this.requiredEnchantIdArray;
	};

	/**
	 * 要求されるエンチャントIDをループする.
	 * @param funcCallback コールバック関数（引数は、(currentValue, index, array)）
	 */
	this.ForEachRequiredEnchantIdArray = function (funcCallback) {
		return this.requiredEnchantIdArray.forEach(funcCallback);
	};



	/**
	 * 効果を受けるスキルIDを追加する.
	 * @param skillId スキルID
	 */
	this.AddEffectiveSkillId = function (skillId) {
		this.effectiveSkillIdArray.push(skillId);
	};

	/**
	 * 効果を受けるスキルIDの配列を取得する.
	 * @param skillId スキルID
	 */
	this.GetEffectiveSkillIdArray = function () {
		return this.effectiveSkillIdArray;
	};



	/**
	 * 効果を受けるサイズIDを追加する.
	 * @param sizeId サイズID
	 */
	this.AddEffectiveSizeId = function (sizeId) {
		this.effectiveSizeIdArray.push(sizeId);
	};

	/**
	 * 効果を受けるサイズIDの配列を取得する.
	 * @param skillId サイズID
	 */
	this.GetEffectiveSizeIdArray = function () {
		return this.effectiveSizeIdArray;
	};



	/**
	 * 効果を受けるモンスターIDを追加する.
	 * @param monsterId モンスターID
	 */
	this.AddEffectiveMonsterId = function (monsterId) {
		this.effectiveMonsterIdArray.push(monsterId);
	};

	/**
	 * 効果を受けるモンスターIDの配列を取得する.
	 * @param skillId モンスターID
	 */
	this.GetEffectiveMonsterIdArray = function () {
		return this.effectiveMonsterIdArray;
	};



	/**
	 * 効果を受ける属性を追加する（属性SPIDで実際に呼び出す関数を分岐させる、呼び出しの共通処理化目的の関数）.
	 * @param attrId 属性SPID
	 * @param attrValue 属性SP値
	 */
	this.AddEffectiveAttribute = function (attrId, attrValue) {

		switch (attrId) {

		case MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL:
			this.AddEffectiveSkillId(attrValue);
			break;

		case MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SIZE:
			this.AddEffectiveSizeId(attrValue);
			break;

		}

	};




	/**
	 * フラグメントの内容が完全に同一かを判定する.
	 */
	this.IsEqual = function (fragmentItem) {

		var bMatched = false;

		var funcMatcherCommon = function (judgeBaseArrayMapF, valueF, keyF) {

			var bMatchedF = false;
			var valueTargetF = null;

			valueTargetF = judgeBaseArrayMapF.get(keyF);

			if (valueTargetF !== undefined) {
				if (Array.isArray(valueF) && Array.isArray(valueTargetF)) {
					if (valueF.join("##") == valueTargetF.join("##")) {
						bMatchedF = true;
					}
				}
				else {
					if (valueF == valueTargetF) {
						bMatchedF = true;
					}
				}
			}

			bMatched &= bMatchedF;
		};

		var funcMatcherMap = function (judgeBaseArrayMapF, valueF, keyF) {

			var idxF = 0;
			var bMatchedF = false;
			var valueTargetF = null;

			valueTargetF = judgeBaseArrayMapF.get(keyF);

			if (valueTargetF !== undefined) {
				if (valueTargetF.size == valueF.size) {

					bMatchedF = true;

					valueTargetF.forEach(
						function (valueFF, keyFF, mapFF) {
							bMatchedF &= (valueFF == valueF.get(keyFF));
						}
					);
				}
			}

			bMatched &= bMatchedF;
		};

		var funcMatcherEquippingItem = function (valueF, keyF) {
			funcMatcherCommon(fragmentItem.equippingItemIdMap, valueF, keyF);
		};

		var funcMatcherEquippingCard = function (valueF, keyF) {
			funcMatcherMap(fragmentItem.equippingCardIdMapMap, valueF, keyF);
		};

		var funcMatcherParam = function (valueF, keyF) {
			funcMatcherCommon(fragmentItem.judgeBaseArrayMapParam, valueF, keyF);
		};

		var funcMatcherRefined = function (valueF, keyF) {
			funcMatcherCommon(fragmentItem.judgeBaseArrayMapRefined, valueF, keyF);
		};

		var funcMatcherLearned = function (valueF, keyF) {
			funcMatcherCommon(fragmentItem.judgeBaseArrayMapLearned, valueF, keyF);
		};

		var funcMatcherEffectiveJob = function (currentValueF, indexF, arrayF) {
			(fragmentItem.effectiveJobIdArray.indexOf(currentValueF) >= 0);
		};

		var funcMatcherEffectiveJobSeries = function (currentValueF, indexF, arrayF) {
			(fragmentItem.effectiveJobSeriesIdArray.indexOf(currentValueF) >= 0);
		};

		var funcMatcherRequiredEnchant = function (currentValueF, indexF, arrayF) {
			(fragmentItem.requiredEnchantIdArray.indexOf(currentValueF) >= 0);
		};

		var funcMatcherEffectiveSkill = function (currentValueF, indexF, arrayF) {
			(fragmentItem.effectiveSkillIdArray.indexOf(currentValueF) >= 0);
		};

		var funcMatcherEffectiveSize = function (currentValueF, indexF, arrayF) {
			(fragmentItem.effectiveSizeIdArray.indexOf(currentValueF) >= 0);
		};

		var funcMatcherEffectiveMonster = function (currentValueF, indexF, arrayF) {
			(fragmentItem.effectiveMonsterSizeIdArray.indexOf(currentValueF) >= 0);
		};



		// 装着するアイテムIDのマップに関するチェック

		// 要素数の一致検査
		if (this.equippingItemIdMap.size != fragmentItem.equippingItemIdMap.size) {
			return false;
		}

		// 自身のマップの内容が、引数のマップにも含まれていることの検査
		bMatched = true;
		this.equippingItemIdMap.forEach(funcMatcherEquippingItem);
		if (!bMatched) {
			return false;
		}



		// 装着するカードIDのマップに関するチェック

		// 要素数の一致検査
		if (this.equippingCardIdMapMap.size != fragmentItem.equippingCardIdMapMap.size) {
			return false;
		}

		// 自身のマップの内容が、引数のマップにも含まれていることの検査
		bMatched = true;
		this.equippingCardIdMapMap.forEach(funcMatcherEquippingCard);
		if (!bMatched) {
			return false;
		}



		// パラメータ条件用の、判定ベース配列のマップに関するチェック

		// 要素数の一致検査
		if (this.judgeBaseArrayMapParam.size != fragmentItem.judgeBaseArrayMapParam.size) {
			return false;
		}

		// 自身のマップの内容が、引数のマップにも含まれていることの検査
		bMatched = true;
		this.judgeBaseArrayMapParam.forEach(funcMatcherParam);
		if (!bMatched) {
			return false;
		}



		// 精錬値条件用の、判定ベース配列のマップに関するチェック

		// 要素数の一致検査
		if (this.judgeBaseArrayMapRefined.size != fragmentItem.judgeBaseArrayMapRefined.size) {
			return false;
		}

		// 自身のマップの内容が、引数のマップにも含まれていることの検査
		bMatched = true;
		this.judgeBaseArrayMapRefined.forEach(funcMatcherRefined);
		if (!bMatched) {
			return false;
		}



		// スキル習得レベル条件用の、判定ベース配列のマップに関するチェック

		// 要素数の一致検査
		if (this.judgeBaseArrayMapLearned.size != fragmentItem.judgeBaseArrayMapLearned.size) {
			return false;
		}

		// 自身のマップの内容が、引数のマップにも含まれていることの検査
		bMatched = true;
		this.judgeBaseArrayMapLearned.forEach(funcMatcherLearned);
		if (!bMatched) {
			return false;
		}



		// 職業制限条件用の、有効な職業IDの配列に関するチェック

		// 要素数の一致検査
		if (this.effectiveJobIdArray.length != fragmentItem.effectiveJobIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.effectiveJobIdArray.every(funcMatcherEffectiveJob)) {
			return false;
		}



		// 職業系列制限条件用の、有効な職業系列IDの配列に関するチェック

		// 要素数の一致検査
		if (this.effectiveJobSeriesIdArray.length != fragmentItem.effectiveJobSeriesIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.effectiveJobSeriesIdArray.every(funcMatcherEffectiveJobSeries)) {
			return false;
		}



		// 要求されるエンチャントIDの配列に関するチェック

		// 要素数の一致検査
		if (this.requiredEnchantIdArray.length != fragmentItem.requiredEnchantIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.requiredEnchantIdArray.every(funcMatcherRequiredEnchant)) {
			return false;
		}



		// 効果を受けるスキルIDの配列に関するチェック

		// 要素数の一致検査
		if (this.effectiveSkillIdArray.length != fragmentItem.effectiveSkillIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.effectiveSkillIdArray.every(funcMatcherEffectiveSkill)) {
			return false;
		}



		// 効果を受けるサイズIDの配列に関するチェック

		// 要素数の一致検査
		if (this.effectiveSizeIdArray.length != fragmentItem.effectiveSizeIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.effectiveSizeIdArray.every(funcMatcherEffectiveSize)) {
			return false;
		}



		// 効果を受けるモンスターIDの配列に関するチェック

		// 要素数の一致検査
		if (this.effectiveMonsterIdArray.length != fragmentItem.effectiveMonsterIdArray.length) {
			return false;
		}

		// 自身の配列の内容が、引数の配列にも含まれていることの検査
		if (!this.effectiveMonsterIdArray.every(funcMatcherEffectiveMonster)) {
			return false;
		}



		return true;
	};



	/**
	 * オブジェクトを複製する.
	 * @return 複製されたオブジェクト
	 */
	this.Clone = function () {

		var objNew = new CMigTestConditionFragmentItem();

		// 装着するアイテムIDのマップを転写
		this.equippingItemIdMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.equippingItemIdMap.set(keyF, valueF);
			}
		);

		// 装着するカードIDのマップを転写
		this.equippingCardIdMapMap.forEach(
			function (valueF, keyF, mapF) {

				var mapClonedF = null;

				mapClonedF = new Map();

				valueF.forEach(
					function (valueFF, keyFF, mapFF) {
						mapClonedF.set(keyFF, valueFF);
					}
				);

				objNew.equippingCardIdMapMap.set(keyF, mapClonedF);
			}
		);

		// パラメータ条件用の、判定ベース配列のマップを転写
		this.judgeBaseArrayMapParam.forEach(
			function (valueF, keyF, mapF) {
				objNew.judgeBaseArrayMapParam.set(keyF, valueF);
			}
		);

		// 精錬値条件用の、判定ベース配列のマップを転写
		this.judgeBaseArrayMapRefined.forEach(
			function (valueF, keyF, mapF) {
				objNew.judgeBaseArrayMapRefined.set(keyF, valueF);
			}
		);

		// スキル習得レベル条件用の、判定ベース配列のマップを転写
		this.judgeBaseArrayMapLearned.forEach(
			function (valueF, keyF, mapF) {
				objNew.judgeBaseArrayMapLearned.set(keyF, valueF);
			}
		);

		// 職業制限条件用の、有効な職業IDの配列を複製
		objNew.effectiveJobIdArray = this.effectiveJobIdArray.slice();

		// 職業系列制限条件用の、有効な職業IDの配列を複製
		objNew.effectiveJobSeriesIdArray = this.effectiveJobSeriesIdArray.slice();

		// 効果を受けるスキルIDの配列を複製
		objNew.effectiveSkillIdArray = this.effectiveSkillIdArray.slice();

		// 効果を受けるサイズIDの配列を複製
		objNew.effectiveSizeIdArray = this.effectiveSizeIdArray.slice();

		// 効果を受けるモンスターIDの配列を複製
		objNew.effectiveMonsterIdArray = this.effectiveMonsterIdArray.slice();

		return objNew;
	};

}





/**
 * テスト条件クラス.
 */
function CMigTestCondition () {

	// テストケースラベル
	this.testCaseLabel = new CMigTestCaseLabel();

	// 職業ID
	this.jobId = JOB_ID_NOVICE;

	// アイテムIDのマップ
	this.itemIdMap = new Map();

	// カードIDマップのマップ（装備領域単位）
	this.cardIdMapMap = new Map();

	// パラメータ設定のマップ
	this.paramMap = new Map();

	// 精錬値設定のマップ
	this.refinedMap = new Map();

	// スキル習得レベル設定のマップ
	this.learnedMap = new Map();

	// スキルID
	this.skillId = SKILL_ID_TUZYO_KOGEKI;

	// サイズID
	this.sizeId = -1;

	// モンスターID
	this.monsterId = MONSTER_ID_MONSTER_TENYURYOKU;

	// 条件不成立フラグ（装備セット用）
	this.bNGFlagSet = undefined;			// 判定の都合上、初期値は undefined にしておくこと



	/**
	 * テストケースラベルを取得する.
	 * @return テストケースラベル
	 */
	this.GetTestCaseLabel = function () {
		return this.testCaseLabel;
	};



	/**
	 * 職業を設定する.
	 * @param jobId 職業ID
	 */
	this.SetJob = function (jobId) {
		this.jobId = jobId;
		this.testCaseLabel.SetJob(jobId);
	};

	/**
	 * 職業を取得する.
	 * @return 職業ID
	 */
	this.GetJob = function () {
		return this.jobId;
	};



	/**
	 * 装備しているアイテムIDの値を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param itemId アイテムID
	 */
	this.SetEquip = function (equipRegionId, itemId) {

		var refinableRegionArray = [
			MIG_EQUIP_REGION_ID_ARMS_RIGHT,
			MIG_EQUIP_REGION_ID_ARMS_LEFT,
			MIG_EQUIP_REGION_ID_HEAD_TOP,
			MIG_EQUIP_REGION_ID_SHIELD,
			MIG_EQUIP_REGION_ID_BODY,
			MIG_EQUIP_REGION_ID_SHOULDER,
			MIG_EQUIP_REGION_ID_FOOT
		];

		// 装備の設定
		this.itemIdMap.set(equipRegionId, itemId);
		this.testCaseLabel.SetItem(equipRegionId, itemId);

		// 精錬値の自動補正
		if (refinableRegionArray.indexOf(equipRegionId) >= 0) {
			if (!this.refinedMap.has(equipRegionId)) {
				this.SetRefined(equipRegionId, 0);
			}
		}
	};

	/**
	 * 装備しているアイテムIDの値を取り除くする.
	 * @param equipRegionId 装備領域ID
	 */
	this.RemoveEquip = function (equipRegionId) {

		// 装備の除去
		this.itemIdMap.delete(equipRegionId);
		this.testCaseLabel.RemoveItem(equipRegionId);

		// 精錬値の自動補正
		this.refinedMap.delete(equipRegionId);
	};

	/**
	 * 装備しているアイテムIDの値を取得する.
	 * @param equipRegionId 装備領域ID
	 * @return アイテムID
	 */
	this.GetEquip = function (equipRegionId) {
		return this.itemIdMap.get(equipRegionId);
	};



	/**
	 * 装備しているカードID配列を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param slotId スロットID
	 * @param cardId カードID配列
	 */
	this.SetCard = function (equipRegionId, slotId, cardId) {

		var cardIdMap = null;

		cardIdMap = this.cardIdMapMap.get(equipRegionId);

		if (cardIdMap === undefined) {
			cardIdMap = new Map();
			this.cardIdMapMap.set(equipRegionId, cardIdMap);
		}

		cardIdMap.set(slotId, cardId);

		this.testCaseLabel.SetCard(equipRegionId, slotId, cardId);
	};

	/**
	 * 装備しているカードID配列を取得する.
	 * @param equipRegionId 装備領域ID
	 * @param slotId スロットID
	 * @return カードID配列
	 */
	this.GetCard = function (equipRegionId, slotId) {

		var cardIdMap = null;

		cardIdMap = this.cardIdMapMap.get(equipRegionId);

		if (cardIdMap) {
			return cardIdMap.get(slotId);
		}

		return undefined;
	};

	/**
	 * 装備しているカードID配列をループ処理する.
	 * @param equipRegionId 装備領域ID
	 * @param funcProc 処理関数（引数は、equipRegionId, slotId, cardId）
	 */
	this.ForLoopCard = function (equipRegionId, funcProc) {

		var thisArg = this;
		var cardIdMap = null;

		// 装備領域のカードマップを取得
		cardIdMap = thisArg.cardIdMapMap.get(equipRegionId);

		// 存在しなければ、次へ
		if (cardIdMap === undefined) {
			return;
		}

		cardIdMap.forEach(
			function (valueF, keyF, mapF) {
				funcProc(equipRegionId, keyF, valueF);
			}
		);
	};



	/**
	 * パラメータの値を設定する.
	 * @param paramId パラメータID
	 * @param value 値
	 */
	this.SetParam = function (paramId, value) {
		this.paramMap.set(paramId, value);
		this.testCaseLabel.SetParam(paramId, value);
	};

	/**
	 * パラメータの値を取得する.
	 * @param paramId パラメータID
	 * @return 値
	 */
	this.GetParam = function (paramId) {
		return this.paramMap.get(paramId);
	};



	/**
	 * 精錬値の値を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param value 値
	 */
	this.SetRefined = function (equipRegionId, value) {
		this.refinedMap.set(equipRegionId, value);
		this.testCaseLabel.SetRefined(equipRegionId, value);
	};

	/**
	 * 精錬値の値を取得する.
	 * @param equipRegionId 装備領域ID
	 * @param 値
	 */
	this.GetRefined = function (equipRegionId) {
		return this.refinedMap.get(equipRegionId);
	};



	/**
	 * スキル習得レベルの値を設定する.
	 * @param skillId スキルID
	 * @param value 値
	 */
	this.SetLearned = function (skillId, value) {
		this.learnedMap.set(skillId, value);
		this.testCaseLabel.SetLearned(skillId, value);
	};

	/**
	 * スキル習得レベルの値を取得する.
	 * @param skillId スキルID
	 * @param 値
	 */
	this.GetLearned = function (skillId) {
		return this.learnedMap.get(skillId);
	};

	/**
	 * スキル習得レベルの値をループする.
	 * @param funcCallback コールバック関数（引数は、(value, key, map)）
	 */
	this.ForEachLearned = function (funcCallback) {
		return this.learnedMap.forEach(funcCallback);
	};



	/**
	 * スキルを設定する.
	 * @param skillId スキルID
	 */
	this.SetSkill = function (skillId) {
		this.skillId = skillId;
		this.testCaseLabel.SetActiveSkill(skillId);
	};

	/**
	 * スキルを取得する.
	 * @return スキルID
	 */
	this.GetSkill = function () {
		return this.skillId;
	};



	/**
	 * サイズを設定する.
	 * @param sizeId サイズID
	 */
	this.SetSize = function (sizeId) {
		this.sizeId = sizeId;
		this.testCaseLabel.SetSize(sizeId);
	};

	/**
	 * サイズを取得する.
	 * @return サイズID
	 */
	this.GetSize = function () {
		return this.sizeId;
	};



	/**
	 * モンスターを設定する.
	 * @param monsterId モンスターID
	 */
	this.SetMonster = function (monsterId) {
		this.monsterId = monsterId;
		this.testCaseLabel.SetMonster(monsterId);
	};

	/**
	 * モンスターを取得する.
	 * @return モンスターID
	 */
	this.GetMonster = function () {
		return this.monsterId;
	};



	/**
	 * 条件不成立フラグ（装備セット用）を設定する.
	 * @param bNGFlagSet 条件不成立フラグ（装備セット用）
	 */
	this.SetNGFlagSet = function (bNGFlagSet) {
		this.bNGFlagSet = bNGFlagSet;
	};

	/**
	 * 条件不成立フラグ（装備セット用）を取得する.
	 * @return 条件不成立フラグ（装備セット用）
	 */
	this.GetNGFlagSet = function () {
		if (this.bNGFlagSet === undefined) {
			return false;
		}

		return this.bNGFlagSet;
	};





	/**
	 * オブジェクトを複製する.
	 */
	this.Clone = function () {

		var objNew = new CMigTestCondition();

		// 変数の転写
		objNew.jobId = this.jobId;
		objNew.skillId = this.skillId;
		objNew.sizeId = this.sizeId;
		objNew.monsterId = this.monsterId;
		objNew.bNGFlagSet = this.bNGFlagSet;

		// テストケースラベルを複製
		objNew.testCaseLabel = this.testCaseLabel.Clone();

		// アイテムIDのマップを転写
		this.itemIdMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.itemIdMap.set(keyF, valueF);
			}
		);

		// カードIDマップのマップを転写
		this.cardIdMapMap.forEach(
			function (valueF, keyF, mapF) {

				var mapClonedF = null;

				mapClonedF = new Map();

				valueF.forEach(
					function (valueFF, keyFF, mapFF) {
						mapClonedF.set(keyFF, valueFF);
					}
				);

				objNew.cardIdMapMap.set(keyF, mapClonedF);
			}
		);

		// パラメータ設定のマップを転写
		this.paramMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.paramMap.set(keyF, valueF);
			}
		);

		// 精錬値設定のマップを転写
		this.refinedMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.refinedMap.set(keyF, valueF);
			}
		);

		// スキル習得レベル設定のマップを転写
		this.learnedMap.forEach(
			function (valueF, keyF, mapF) {
				objNew.learnedMap.set(keyF, valueF);
			}
		);

		return objNew;
	};
}
