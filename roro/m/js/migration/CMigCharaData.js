



// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//----------------------------------------------------------------
// 計算モード定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMigEffectiveSpCalcMode",
	[
		"MIG_EFFECTIVE_SP_CALC_MODE_SUM",
		"MIG_EFFECTIVE_SP_CALC_MODE_MAX",
		"MIG_EFFECTIVE_SP_CALC_MODE_MIN",
	],
	0,
	1
);

//----------------------------------------------------------------
// 装備操作ID定義
//----------------------------------------------------------------

CGlobalConstManager.DefineEnum(
	"EnumMigCharaDataAdjustControl",
	[
		"MIG_CHARA_DATA_ADJUST_CONTROL_SET_PARAM",
		"MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP",
		"MIG_CHARA_DATA_ADJUST_CONTROL_SET_REFINED",
		"MIG_CHARA_DATA_ADJUST_CONTROL_SET_SKLILL_LEARNED",
	],
	0,
	1
);










//================================================================================================================================
//================================================================================================================================
//
//
// キャラクターデータクラス
//
//
//================================================================================================================================
//================================================================================================================================

/**
 * キャラクターデータクラス.
 * @param refConstDataManagerC 参照する定義済みデータマネージャ
 */
function CMigCharaData (refConstDataManagerC) {

	// 参照する定義済みデータマネージャ
	this.refConstDataManager = null;

	// 職業ID
	this.jobId = 0;

	// パラメータのマップ
	this.paramMap = null;

	// 装備情報配列
	this.equipInfoArray = [];

	// 有効なアイテムSPマップ
	this.effectiveItemSpMap = null;

	// 有効なアイテムSPマップ（集中力向上等の計算に含まれる、アイテムの無条件効果のみのマップ）
	this.effectiveItemSpMapPlane = null;

	// 有効なアイテムSPマップ（セット用）
	this.effectiveItemSpMapSet = null;

	// カバレッジツリー
	// （収集しない場合は、null のまま）
	this.coverageTree = null;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// 初期化
		this.refConstDataManager = refConstDataManagerC;
		this.jobId = JOB_ID_NOVICE;
		this.paramMap = new Map();
		this.equipInfoArray = [];
		for (idx = 0; idx < EnumMigEquipRegionId.Count; idx++) {
			this.equipInfoArray.push(new CMigEquipInfo());
		}
		this.effectiveItemSpMap = new CMigEffectiveItemSpMap();
		this.effectiveItemSpMapPlane = new CMigEffectiveItemSpMap();
		this.effectiveItemSpMapSet = new CMigEffectiveItemSpMap();

	}).call(this);



	/**
	 * 職業を設定する.
	 * @param jobId 職業ID
	 */
	this.SetJob = function (jobId) {
		this.jobId = jobId;
	};

	/**
	 * 職業を取得する.
	 * @return 職業ID
	 */
	this.GetJob = function () {
		return this.jobId;
	};



	/**
	 * パラメータを設定する.
	 * @param paramId パラメータID
	 * @param value 値
	 */
	this.SetParam = function (paramId, value) {
		this.paramMap.set(paramId, value);
	};

	/**
	 * パラメータを取得する.
	 * @param paramId パラメータID
	 * @return パラメータの値
	 */
	this.GetParam = function (paramId) {
		return this.paramMap.get(paramId);
	};



	/**
	 * スキル習得レベルを設定する.
	 * @param skillId スキルID
	 * @param skillLv スキルレベル
	 * @return 習得レベル（習得していない場合は、0）
	 */
	this.SetSkillLearned = function (skillId, skillLv) {
		// TODO: データ移行過渡処理
		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, this.GetJob()).GetLearnSkillIdArray();
		var objectIndex = learnSkillIdArray.indexOf(skillId);
		if (objectIndex >= 0) {
			RefreshSkillColumnHeaderLearned(null, objectIndex, skillLv);
		}
	};

	/**
	 * スキル習得レベルを取得する.
	 * @param skillId スキルID
	 * @return 習得レベル（習得していない場合は、0）
	 */
	this.GetSkillLearned = function (skillId) {
		// TODO: データ移行過渡処理
		return LearnedSkillSearch(skillId);
	};



	/**
	 * 装備を変更する.
	 * @param equipRegionId 装備領域ID
	 * @param dataKind 設定先のデータ種別
	 * @param slotId 設定先のスロットID
	 * @param dataId 設定するデータID
	 * @param dataValue 設定する値（省略可）
	 */
	this.ChangeEquip = function (equipRegionId, dataKind, slotId, dataId, dataValue) {
		this.equipInfoArray[equipRegionId].ChangeEquip(dataKind, slotId, dataId, dataValue);
	};

	/**
	 * 装備情報配列を取得する（通常の機能では使用しない、デバッグ系用）.
	 * @return 装備情報配列
	 */
	this.GetEquipInfoArray = function () {
		return this.equipInfoArray;
	};



	/**
	 * 精錬値を設定する.
	 * @param equipRegionId 装備領域ID
	 * @param refined 精錬値
	 */
	this.SetRefined = function (equipRegionId, refined) {
		this.equipInfoArray[equipRegionId].SetRefined(refined);
	};

	/**
	 * 精錬値を取得する（アイテム指定）.
	 * @param itemId アイテムID
	 * @return 精錬値（装備されていない場合は、0）
	 */
	this.GetItemRefined = function (itemId) {

		var idx = 0;

		for (idx = 0; idx < this.equipInfoArray.length; idx++) {

			// アイテムIDが一致しなければ、次へ
			if (this.equipInfoArray[idx].GetEquippedId(CONST_DATA_KIND_ITEM) != itemId) {
				continue;
			}

			return this.equipInfoArray[idx].GetRefined();
		}

		return 0;
	};



	/**
	 * カバレッジツリーを取得する.
	 * @return カバレッジツリー
	 */
	this.GetCoverageTree = function () {
		return this.coverageTree;
	};



	/**
	 * 有効なSPデータを計算する.
	 */
	this.CalcEffectiveSpData = function () {

		var idx = 0;

		var effectiveItemSpMap = null;
		var effectiveItemSpMapPlane = null;
		var effectiveItemSpMapSet = null;
		var coverageTree = null;

		// マップ用意
		effectiveItemSpMap = new CMigEffectiveItemSpMap();
		effectiveItemSpMapPlane = new CMigEffectiveItemSpMap();
		effectiveItemSpMapSet = new CMigEffectiveItemSpMap();

		// カバレッジ収集フラグが設定されている場合のみ、インスタンスを用意する
		if (_ENABLE_MIGRATION_COVERAGE) {
			coverageTree = new CMigSpPatternCoverageTree();
		}

		// 全ての装備をループ
		for (idx = 0; idx < this.equipInfoArray.length; idx++) {
			this.CalcEffectiveSpDataSubEquip(this.equipInfoArray[idx], effectiveItemSpMap, effectiveItemSpMapPlane, effectiveItemSpMapSet, coverageTree);
		}

		// 自身の有効なSPデータ情報の配列を更新する
		this.effectiveItemSpMap = effectiveItemSpMap;
		this.effectiveItemSpMapPlane = effectiveItemSpMapPlane;
		this.effectiveItemSpMapSet = effectiveItemSpMapSet;
		this.coverageTree = coverageTree;
	};

	/**
	 * 有効なSPデータを計算する（サブ　EquipInfo単位）.
	 * @param equipInfo 装備情報
	 * @param effectiveItemSpMap 有効なアイテムSPマップ
	 * @param effectiveItemSpMapPlane 有効なアイテムSPマップ（アイテムの無条件効果のみ）
	 * @param effectiveItemSpMapSet 有効なアイテムSPマップ（セット用）
	 * @param coverageTree カバレッジツリー
	 */
	this.CalcEffectiveSpDataSubEquip = function (equipInfo, effectiveItemSpMap, effectiveItemSpMapPlane, effectiveItemSpMapSet, coverageTree) {

		var refThis = this;

		var itemId = null;
		var itemData = null;
		var setInfo = null;

		// アイテムID取得
		itemId = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

		// アイテムデータ取得
		itemData = this.refConstDataManager.GetDataObject(CONST_DATA_KIND_ITEM, itemId);

		if (!itemData) {
			return;
		}

		setInfo = new CMigEquipSetInfo();

		// SPデータをループ処理
		itemData.ForEachSpData(
			function (valueF, indexF, arrayF) {
				refThis.CalcEffectiveSpDataSubItemSpData(itemId, valueF, true, setInfo.Clone(), 1, effectiveItemSpMap, effectiveItemSpMapPlane, effectiveItemSpMapSet, coverageTree);
			}
		);
	};

	/**
	 * 有効なSPデータを計算する（サブ　装備可能品SPデータ用再帰関数）.
	 * @param itemId アイテムID
	 * @param spData SPデータ
	 * @param bPlane ここまでの呼び出しが無条件状態であるかのフラグ
	 * @param setInfo 装備セットの識別情報
	 * @param effectiveCount 有効倍率
	 * @param effectiveItemSpMap 有効なアイテムSPマップ
	 * @param effectiveItemSpMapPlane 有効なアイテムSPマップ（アイテムの無条件効果のみ）
	 * @param effectiveItemSpMapSet 有効なアイテムSPマップ（セット用）
	 * @param coverageTree カバレッジツリー
	 */
	this.CalcEffectiveSpDataSubItemSpData = function (itemId, spData, bPlane, setInfo, effectiveCount, effectiveItemSpMap, effectiveItemSpMapPlane, effectiveItemSpMapSet, coverageTree) {

		var idx = 0;
		var idxEquip = 0;
		var idxSlot = 0;

		var spid = 0;
		var value = 0;
		var flag = 0;
		var idArray = null;
		var jobIdArray = null;
		var itemIdArray = null;
		var cardIdArray = null;
		var total = 0;
		var refined = 0;

		var effectiveCountThis = 0;

		var spTagWork = null;
		var valueInfo = null;
		var equipInfo = null;

		var children = null;
		var coverageTreeChild = null;



		// SPIDに応じて処理
		spid = spData.GetSpId();
		switch (spid) {



		// ベースレベル条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_BASE_LEVEL:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionBaseLevel(spData, setInfo);
			break;

		// 純粋なパラメータ条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_PURE_PARAM:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionPureParam(spData, setInfo);
			break;

		// アイテム精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED_OLD:

			// TODO: _OLD系への対応がまだ。暗黙で自身のアイテムを参照するように対応のこと。

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionItemRefined(spData, setInfo);
			break;

		// アイテム装備領域精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_EQUIP_REGION_REFINED:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionItemEquipRegionRefined(spData, setInfo);
			break;

		// アイテム系列精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_TYPE_REFINED:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionItemTypeRefined(spData, setInfo);
			break;

		// スキル習得条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL_V2:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionSkillLearned(spData, setInfo);
			break;

		// 職業が装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_JOB_EQUIPPING:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionJobEquipping(spData, setInfo);
			break;

		// いずれかと共に装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionEquipWithOne(CONST_DATA_KIND_ITEM, itemId, spData, setInfo);
			break;

		// すべてを同時に装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL_V2:

			// プレーンフラグを落とし、有効倍率を計算
			bPlane = false;
			effectiveCountThis = this.GetEffectiveCountConditionEquipWithAll(CONST_DATA_KIND_ITEM, itemId, spData, setInfo);
			break;



		// 未対応
		case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ONE:
		case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ALL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_KILL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_KILL_RACE:
		case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_USED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_HITTED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_USED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_DISARMED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_TIME_EFFECT:

			// プレーンフラグは落とす
			bPlane = false;

			break;

		// SP条件以外は判定不要
		default:
			effectiveCountThis = 1;

			// 値情報を生成
			valueInfo = new CMigEffectiveValueInfo();
			valueInfo.setInfo = setInfo.Clone();
			valueInfo.value = spData.GetValue();
			if (valueInfo.value === null) {
				valueInfo.value = 1;
			}
			valueInfo.mutliply = effectiveCount * effectiveCountThis;

			// 有効なSPマップに登録

			// セットではない場合
			if (!setInfo.IsSetDetected()) {

				// 通常の有効なSPマップへ登録
				effectiveItemSpMap.AddEquipableSpData(spData.GetSpTag(), valueInfo);

				// プレーンフラグが真ならば、プレーン用の有効なSPマップにも登録する
				if (bPlane) {

					spTagWork = spData.GetSpTag();

					// ただし、『全ステータス上昇』効果については、
					// 特定のアイテム以外は、プレーン対象外なので、その選別を行う
					if (spid == MIG_EQUIPABLE_SP_EFFECT_ID_PARAM) {

						// 特定のアイテムに含まれなければ、『全ステータス上昇』効果の定義を除去する
						if (g_effectivePlaneItemIdArray.indexOf(itemId) < 0) {
							spTagWork = spTagWork.Clone();
							spTagWork.RemoveAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ALL_STATUS);
						}
					}

					// マップに登録
					effectiveItemSpMapPlane.AddEquipableSpData(spTagWork, valueInfo);
				}
			}

			// セットの場合
			else {

				// すでに同一のセットが設定されていないかを検索する
				valueInfoArray = effectiveItemSpMapSet.GetItemSpDataArray(spData.GetSpTag());

				if (valueInfoArray) {

					// 取得した値情報の配列を全走査
					for (idx = 0; idx < valueInfoArray.length; idx++) {
						if (valueInfoArray[idx].setInfo.IsEqual(valueInfo.setInfo)) {
							break;
						}
					}

					// すでに設定されている場合は、有効カウントを 0 にして、処理打ち切り
					if (idx < valueInfoArray.length) {
						effectiveCountThis = 0;
						break;
					}
				}

				// ここに来るならば、登録可能

				// セット用の有効なSPマップへ登録
				effectiveItemSpMapSet.AddEquipableSpData(spData.GetSpTag(), valueInfo);
			}

			// カバレッジデータを生成
			if (coverageTree) {
				coverageTreeChild = new CMigSpPatternCoverageTree();
				coverageTreeChild.SetSpTag(spData.GetSpTag());
				coverageTreeChild.SetParent(coverageTree);
				coverageTreeChild.AddValue(valueInfo.value);
			}
		}



		// 有効なSPデータでない場合は、処理打ち切り
		if (effectiveCountThis == 0) {
			return;
		}



		// カバレッジツリーを用意
		// （将来的に、SP効果の階層構造もありうるかもしれないので、インスタンスの有無を判定する）
		if (coverageTree) {
			if (!coverageTreeChild) {
				coverageTreeChild = new CMigSpPatternCoverageTree();
				coverageTreeChild.SetSpTag(spData.GetSpTag());
				coverageTreeChild.SetParent(coverageTree);

				// 値としては、有効倍率を記録しておく
				coverageTreeChild.AddValue(effectiveCountThis);
			}
		}

		// 子要素を処理
		children = spData.GetChildren();
		for (idx = 0; idx < children.length; idx++) {
			this.CalcEffectiveSpDataSubItemSpData(itemId, children[idx], bPlane, setInfo.Clone(), effectiveCount * effectiveCountThis, effectiveItemSpMap, effectiveItemSpMapPlane, effectiveItemSpMapSet, coverageTreeChild);
		}

		// 有効なデータがあった場合のみ、親のカバレッジツリーに追加
		if (coverageTree) {
			if (coverageTreeChild.IsValid()) {
				coverageTree.AddCoverageTree(coverageTreeChild.GetSpTag(), coverageTreeChild);
			}
		}
	};

	/**
	 * SP条件の成立を検査する（ベースレベル条件用）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionBaseLevel = function (spData, setInfo) {

		var borderBase = 0;
		var borderFlag = 0;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag]]);
		}

		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);

		// 境界フラグに応じて分岐
		switch (borderFlag) {

		case MIG_BORDER_FLAG_ID_EQUAL:
			if (this.GetParam(MIG_PARAM_ID_BASE_LV) == borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_UNDER:
			if (this.GetParam(MIG_PARAM_ID_BASE_LV) <= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_OVER:
			if (this.GetParam(MIG_PARAM_ID_BASE_LV) >= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_BY:
			if (this.GetParam(MIG_PARAM_ID_BASE_LV) >= borderBase) {
				funcAddInfo();
				return Math.floor(this.GetParam(MIG_PARAM_ID_BASE_LV) / borderBase);
			}
			break;
		}

		return 0;
	};

	/**
	 * SP条件の成立を検査する（純粋なパラメータ条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionPureParam = function (spData, setInfo) {

		var idx = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var paramIdArray = null;
		var paramValueTotal = 0;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag], paramIdArray.slice()]);
		}

		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
		paramIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM);

		// 該当パラメータを合算
		paramValueTotal = 0;
		for (idx = 0; idx < paramIdArray.length; idx++) {
			paramValueTotal += this.GetParam(paramIdArray[idx]);
		}

		// 境界フラグに応じて分岐
		switch (borderFlag) {

		case MIG_BORDER_FLAG_ID_EQUAL:
			if (paramValueTotal == borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_UNDER:
			if (paramValueTotal <= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_OVER:
			if (paramValueTotal >= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_BY:
			if (paramValueTotal >= borderBase) {
				funcAddInfo();
				return Math.floor(paramValueTotal / borderBase);
			}
			break;
		}

		return 0;
	};

	/**
	 * SP条件の成立を検査する（アイテム精錬値条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionItemRefined = function (spData, setInfo) {

		var idx = 0;
		var idxEquip = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var itemIdArray = null;
		var refinedTotal = 0;
		var effectiveCount = 0;
		var equipInfo = null;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag], itemIdArray.slice()]);
		}



		// TODO: 未対応
		// （合計が○○以上と、すべてが○○以上の違いが？）
		// （現状は、すべてが○○以上）



		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
		itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);

		// 計算用変数初期化
		effectiveCount = -1;
		refinedTotal = 0;					// BY条件用

		// すべての指定のアイテムを走査
		for (idx = 0; idx < itemIdArray.length; idx++) {

			// すべての装備情報をループ
			for (idxEquip = 0; idxEquip < this.equipInfoArray.length; idxEquip++) {

				// 装備情報を取得
				equipInfo = this.equipInfoArray[idxEquip];

				// 指定のアイテムでなければ、次へ
				if (equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM) != itemIdArray[idx]) {
					continue;
				}

				// 初めて該当条件の判定に来た場合
				if (effectiveCount < 0) {
					effectiveCount = 1;
				}

				// 境界フラグに応じて分岐
				// （条件を満たさない場合に、倍率を０に補正する）
				switch (borderFlag) {

				case MIG_BORDER_FLAG_ID_EQUAL:
					if (equipInfo.refined != borderBase) {
						effectiveCount = 0;
					}
					break;

				case MIG_BORDER_FLAG_ID_NOT:
					if (equipInfo.refined == borderBase) {
						effectiveCount = 0;
					}
					break;

				case MIG_BORDER_FLAG_ID_UNDER:
					if (equipInfo.refined > borderBase) {
						effectiveCount = 0;
					}
					break;

				case MIG_BORDER_FLAG_ID_OVER:
					if (equipInfo.refined < borderBase) {
						effectiveCount = 0;
					}
					break;

				case MIG_BORDER_FLAG_ID_BY:
					if (equipInfo.refined < borderBase) {
						effectiveCount = 0;
					}
					else {
						refinedTotal += Math.floor(equipInfo.refined / borderBase);
					}
					break;

				default:
					// プログラム漏れ
					effectiveCount = 0;
				}
			}
		}

		// 一度も条件を満たさなかった場合、条件不成立にする
		if (effectiveCount < 0) {
			effectiveCount = 0;
		}

		// BY条件のみ、値を補正
		if (borderFlag == MIG_BORDER_FLAG_ID_BY) {
			effectiveCount *= refinedTotal;
		}

		// セット情報追記
		if (effectiveCount > 0) {
			funcAddInfo();
		}

		return effectiveCount;
	};

	/**
	 * SP条件の成立を検査する（アイテム装備領域精錬値条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionItemEquipRegionRefined = function (spData, setInfo) {

		var idx = 0;
		var idxEquip = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var regionIdArray = null;
		var refinedTotal = 0;
		var effectiveCount = 0;
		var equipInfo = null;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag], regionIdArray.slice()]);
		}



		// TODO: 未対応
		// （合計が○○以上と、すべてが○○以上の違いが？）
		// （現状は、すべてが○○以上）



		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
		regionIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_EQUIP_REGION);

		// 計算用変数初期化
		effectiveCount = 1;
		refinedTotal = 0;					// BY条件用

		// すべての指定の装備領域を走査
		for (idx = 0; idx < regionIdArray.length; idx++) {

			// 装備情報を取得
			equipInfo = this.equipInfoArray[regionIdArray[idx]];

			// 境界フラグに応じて分岐
			// （条件を満たさない場合に、倍率を０に補正する）
			switch (borderFlag) {

			case MIG_BORDER_FLAG_ID_EQUAL:
				if (equipInfo.refined != borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_NOT:
				if (equipInfo.refined == borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_UNDER:
				if (equipInfo.refined > borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_OVER:
				if (equipInfo.refined < borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_BY:
				if (equipInfo.refined < borderBase) {
					effectiveCount = 0;
				}
				else {
					refinedTotal += Math.floor(equipInfo.refined / borderBase);
				}
				break;
			}
		}

		// BY条件のみ、値を補正
		if (borderFlag == MIG_BORDER_FLAG_ID_BY) {
			effectiveCount *= refinedTotal;
		}

		// セット情報追記
		if (effectiveCount > 0) {
			funcAddInfo();
		}

		return effectiveCount;
	};

	/**
	 * SP条件の成立を検査する（アイテム系列精錬値条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionItemTypeRefined = function (spData, setInfo) {

		var idx = 0;
		var idxEquip = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var regionIdArray = null;
		var typeIdArray = null;
		var itemData = null;
		var itemType = 0;
		var refinedTotal = 0;
		var effectiveCount = 0;
		var equipInfo = null;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag], typeIdArray.slice()]);
		}



		// TODO: 未対応
		// （合計が○○以上と、すべてが○○以上の違いが？）
		// （現状は、すべてが○○以上）



		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
		typeIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_TYPE);

		// すべての装備領域を取得
		regionIdArray = [];
		EnumMigEquipRegionId.For(
			function (idxF, nameF, valueF) {
				regionIdArray.push(valueF);
			}
		);

		// 計算用変数初期化
		effectiveCount = 1;
		refinedTotal = 0;					// BY条件用

		// すべての装備領域を走査
		for (idx = 0; idx < regionIdArray.length; idx++) {

			// 装備情報を取得
			equipInfo = this.equipInfoArray[regionIdArray[idx]];

			// 装備がなければ、次へ
			if (!equipInfo.itemInfo) {
				continue;
			}

			// アイテムデータ取得
			itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipInfo.itemInfo.GetDataId()) ;

			// TODO: 以降過渡期処理
			// アイテム系列取得
			if (itemData) {
				itemType = itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_NONE);
			}
			else {
				switch (ItemObjNew[equipInfo.itemInfo.GetDataId()][ITEM_DATA_INDEX_KIND]) {
				case ITEM_KIND_NONE:
					itemType = MIG_ITEM_TYPE_NONE;
					break;
				case ITEM_KIND_KNIFE:
					itemType = MIG_ITEM_TYPE_KNIFE;
					break;
				case ITEM_KIND_SWORD:
					itemType = MIG_ITEM_TYPE_SWORD;
					break;
				case ITEM_KIND_SWORD_2HAND:
					itemType = MIG_ITEM_TYPE_SWORD_2HAND
					break;
				case ITEM_KIND_SPEAR:
					itemType = MIG_ITEM_TYPE_SPEAR;
					break;
				case ITEM_KIND_SPEAR_2HAND:
					itemType = MIG_ITEM_TYPE_SPEAR_2HAND;
					break;
				case ITEM_KIND_AXE:
					itemType = MIG_ITEM_TYPE_AXE;
					break;
				case ITEM_KIND_AXE_2HAND:
					itemType = MIG_ITEM_TYPE_AXE_2HAND;
					break;
				case ITEM_KIND_CLUB:
					itemType = MIG_ITEM_TYPE_MACE;
					break;
				case ITEM_KIND_STUFF:
					itemType = MIG_ITEM_TYPE_STUFF;
					break;
				case ITEM_KIND_BOW:
					itemType = MIG_ITEM_TYPE_BOW;
					break;
				case ITEM_KIND_KATAR:
					itemType = MIG_ITEM_TYPE_KATAR;
					break;
				case ITEM_KIND_BOOK:
					itemType = MIG_ITEM_TYPE_BOOK;
					break;
				case ITEM_KIND_FIST:
					itemType = MIG_ITEM_TYPE_FIST;
					break;
				case ITEM_KIND_MUSICAL:
					itemType = MIG_ITEM_TYPE_MUSICAL;
					break;
				case ITEM_KIND_WHIP:
					itemType = MIG_ITEM_TYPE_WHIP;
					break;
				case ITEM_KIND_FUMA:
					itemType = MIG_ITEM_TYPE_FUMA;
					break;
				case ITEM_KIND_HANDGUN:
					itemType = MIG_ITEM_TYPE_HANDGUN;
					break;
				case ITEM_KIND_RIFLE:
					itemType = MIG_ITEM_TYPE_RIFLE;
					break;
				case ITEM_KIND_SHOTGUN:
					itemType = MIG_ITEM_TYPE_SHOTGUN;
					break;
				case ITEM_KIND_GATLINGGUN:
					itemType = MIG_ITEM_TYPE_GATLINGGUN;
					break;
				case ITEM_KIND_GRENADEGUN:
					itemType = MIG_ITEM_TYPE_GRENADEGUN;
					break;
				case ITEM_KIND_STUFF2HAND:
					itemType = MIG_ITEM_TYPE_STUFF_2HAND;
					break;
				case ITEM_KIND_HEAD_TOP:
					itemType = MIG_ITEM_TYPE_HELM;
					break;
				case ITEM_KIND_BODY:
					itemType = MIG_ITEM_TYPE_ARMOR;
					break;
				case ITEM_KIND_SHIELD:
					itemType = MIG_ITEM_TYPE_SHIELD;
					break;
				case ITEM_KIND_SHOULDER:
					itemType = MIG_ITEM_TYPE_SHOULDER;
					break;
				case ITEM_KIND_FOOT:
					itemType = MIG_ITEM_TYPE_SHOES;
					break;

				// 精錬不能部位は対象外
				case ITEM_KIND_HEAD_MID:
				case ITEM_KIND_HEAD_UNDER:
				case ITEM_KIND_ACCESSARY:
				case ITEM_KIND_ACCESSARY_ON1:
				case ITEM_KIND_ACCESSARY_ON2:

				default:
					itemType = MIG_ITEM_TYPE_ETC;
					break;
				}
			}

			// 指定の系列に含まれない場合は、次へ
			if (typeIdArray.indexOf(itemType) < 0) {
				continue;
			}

			// 境界フラグに応じて分岐
			// （条件を満たさない場合に、倍率を０に補正する）
			switch (borderFlag) {

			case MIG_BORDER_FLAG_ID_EQUAL:
				if (equipInfo.refined != borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_NOT:
				if (equipInfo.refined == borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_UNDER:
				if (equipInfo.refined > borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_OVER:
				if (equipInfo.refined < borderBase) {
					effectiveCount = 0;
				}
				break;

			case MIG_BORDER_FLAG_ID_BY:
				if (equipInfo.refined < borderBase) {
					effectiveCount = 0;
				}
				else {
					refinedTotal += Math.floor(equipInfo.refined / borderBase);
				}
				break;
			}
		}

		// BY条件のみ、値を補正
		if (borderFlag == MIG_BORDER_FLAG_ID_BY) {
			effectiveCount *= refinedTotal;
		}

		// セット情報追記
		if (effectiveCount > 0) {
			funcAddInfo();
		}

		return effectiveCount;
	};

	/**
	 * SP条件の成立を検査する（スキル習得条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionSkillLearned = function (spData, setInfo) {

		var idx = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var skillIdArray = null;
		var learnedTotal = 0;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [[borderBase, borderFlag], skillIdArray.slice()]);
		}

		// データを取得
		borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
		borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
		skillIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);

		// スキルの習得レベルを合算
		learnedTotal = 0;
		for (idx = 0; idx < skillIdArray.length; idx++) {
			learnedTotal += this.GetSkillLearned(skillIdArray[idx]);
		}

		// 境界フラグに応じて分岐
		switch (borderFlag) {

		case MIG_BORDER_FLAG_ID_EQUAL:
			if (learnedTotal == borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_NOT:
			if (learnedTotal != borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_UNDER:
			if (learnedTotal <= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_OVER:
			if (learnedTotal >= borderBase) {
				funcAddInfo();
				return 1;
			}
			break;

		case MIG_BORDER_FLAG_ID_BY:
			if (learnedTotal >= borderBase) {
				funcAddInfo();
				return Math.floor(learnedTotal / borderBase);
			}
			break;
		}

		return 0;
	};

	/**
	 * SP条件の成立を検査する（職業が装備時条件）.
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionJobEquipping = function (spData, setInfo) {

		var idx = 0;

		var jobSeriesIdArray = null;
		var jobIdArray = null;

		var funcAddInfo = function () {
			setInfo.AddInfo(spData.GetSpId(), [jobIdArray.slice()]);
		}

		// データを取得
		jobSeriesIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_JOB_SERIES);

		// 職業指定を全ループ
		for (idx = 0; idx < jobSeriesIdArray.length; idx++) {

			// 指定の職業系統に含まれる職業IDの配列を取得
			jobIdArray = MigGetSeriesedJobIdArray(jobSeriesIdArray[idx]);

			// 自身に設定されている職業IDが配列に含まれる場合
			if (jobIdArray.indexOf(this.jobId) >= 0) {
				funcAddInfo();
				return 1;
			}
		}

		return 0;
	};

	/**
	 * SP条件の成立を検査する（いずれかと共に装備時条件）.
	 * @param dataKind 処理中のデータのデータ種別
	 * @param dataId 処理中のデータのデータID
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionEquipWithOne = function (dataKind, dataId, spData, setInfo) {

		var idx = 0;
		var idxEquip = 0;
		var idxSlot = 0;

		var itemIdArray = null;
		var cardIdArray = null;
		var arrowIdArray = null;
		var equipInfo = null;

		var funcAddInfo = function () {

			var itemIdArrayF = [];
			var cardIdArrayF = [];
			var arrowIdArrayF = [];

			switch (dataKind) {
			case CONST_DATA_KIND_ITEM:
				itemIdArrayF.push(dataId);
				break;
			case CONST_DATA_KIND_CARD:
				cardIdArrayF.push(dataId);
				break;
			case CONST_DATA_KIND_ARROW:
				arrowIdArrayF.push(dataId);
				break;
			}

			if (itemIdArray) {
				itemIdArrayF = itemIdArrayF.concat(itemIdArray.slice());
			}

			if (cardIdArray) {
				cardIdArrayF = cardIdArrayF.concat(cardIdArray.slice());
			}

			if (arrowIdArray) {
				arrowIdArrayF = arrowIdArrayF.concat(arrowIdArray.slice());
			}

			setInfo.AddInfo(spData.GetSpId(), [itemIdArrayF, cardIdArrayF, arrowIdArrayF]);
			setInfo.SetFlagSetDetected(true);
		}
		var funcFailedSet = function () {
			setInfo.SetFlagSetDetected(false);
		}

		// データを取得
		itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);
		cardIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);
		arrowIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);

		// 全ての装備をループ
		for (idxEquip = 0; idxEquip < this.equipInfoArray.length; idxEquip++) {

			// 装備情報を取得
			equipInfo = this.equipInfoArray[idxEquip];

			// アイテムの指定がある場合
			if (itemIdArray !== undefined) {

				// すべての指定のアイテムを走査
				for (idx = 0; idx < itemIdArray.length; idx++) {

					// 指定のアイテムがあった場合は、その時点で成立として return
					if (itemIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM)) {
						funcAddInfo();
						return 1;
					}
				}
			}

			// カードの指定がある場合
			if (cardIdArray !== undefined) {

				// 全てのカードスロットをループ
				for (idxSlot = 0; idxSlot < CMigEquipInfo.cardCountInEquip; idxSlot++) {

					// すべての指定のカードを走査
					for (idx = 0; idx < cardIdArray.length; idx++) {

						// 指定のカードがあった場合は、その時点で成立として return
						if (cardIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_CARD, idxSlot)) {
							funcAddInfo();
							return 1;
						}
					}
				}
			}

			// 矢の指定がある場合
			if (arrowIdArray !== undefined) {

				// すべての指定の矢を走査
				for (idx = 0; idx < arrowIdArray.length; idx++) {

					// 指定の矢があった場合は、その時点で成立として return
					if (arrowIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_ARROW)) {
						funcAddInfo();
						return 1;
					}
				}
			}
		}

		// ここまで来たら不成立

		funcFailedSet();

		return 0;
	};

	/**
	 * SP条件の成立を検査する（すべてを同時に装備時条件）.
	 * @param dataKind 処理中のデータのデータ種別
	 * @param dataId 処理中のデータのデータID
	 * @param spData SPデータ
	 * @param setInfo 装備セットの識別情報
	 * @return 1以上:成立の倍率、0:成立していない
	 */
	this.GetEffectiveCountConditionEquipWithAll = function (dataKind, dataId, spData, setInfo) {

		var idx = 0;
		var idxEquip = 0;
		var idxSlot = 0;

		var itemIdArray = null;
		var cardIdArray = null;
		var arrowIdArray = null;
		var equipInfo = null;

		var funcAddInfo = function () {

			var itemIdArrayF = [];
			var cardIdArrayF = [];
			var arrowIdArrayF = [];

			switch (dataKind) {
			case CONST_DATA_KIND_ITEM:
				itemIdArrayF.push(dataId);
				break;
			case CONST_DATA_KIND_CARD:
				cardIdArrayF.push(dataId);
				break;
			case CONST_DATA_KIND_ARROW:
				arrowIdArrayF.push(dataId);
				break;
			}

			if (itemIdArray) {
				itemIdArrayF = itemIdArrayF.concat(itemIdArray.slice());
			}

			if (cardIdArray) {
				cardIdArrayF = cardIdArrayF.concat(cardIdArray.slice());
			}

			if (arrowIdArray) {
				arrowIdArrayF = arrowIdArrayF.concat(arrowIdArray.slice());
			}

			setInfo.AddInfo(spData.GetSpId(), [itemIdArrayF, cardIdArrayF, arrowIdArrayF]);
			setInfo.SetFlagSetDetected(true);
		}
		var funcFailedSet = function () {
			setInfo.SetFlagSetDetected(false);
		}

		// データを取得
		itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);
		cardIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_CARD);
		arrowIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);

		// アイテムの検査
		if (itemIdArray !== undefined) {

			// すべての指定のアイテムを走査
			for (idx = 0; idx < itemIdArray.length; idx++) {

				// 全ての装備をループ
				for (idxEquip = 0; idxEquip < this.equipInfoArray.length; idxEquip++) {

					// 装備情報を取得
					equipInfo = this.equipInfoArray[idxEquip];

					// 指定のアイテムがあった場合は、処理打ち切り
					if (itemIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM)) {
						break;
					}
				}

				// 指定のアイテムがなかった場合は、その時点で不成立として return
				if (idxEquip >= this.equipInfoArray.length) {
					funcFailedSet();
					return 0;
				}
			}
		}

		// カードの検査
		if (cardIdArray !== undefined) {

			// すべての指定のカードを走査
			for (idx = 0; idx < cardIdArray.length; idx++) {

				// 全ての装備をループ
				for (idxEquip = 0; idxEquip < this.equipInfoArray.length; idxEquip++) {

					// 装備情報を取得
					equipInfo = this.equipInfoArray[idxEquip];

					// 全てのカードスロットをループ
					for (idxSlot = 0; idxSlot < CMigEquipInfo.cardCountInEquip; idxSlot++) {

						// 指定のカードがあった場合は、処理打ち切り
						if (cardIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_CARD, idxSlot)) {
							break;
						}
					}

					// 指定のカードがあった場合は、処理打ち切り
					if (idxSlot < CMigEquipInfo.cardCountInEquip) {
						break;
					}
				}

				// 指定のカードがなかった場合は、その時点で不成立として return
				if (idxEquip >= this.equipInfoArray.length) {
					funcFailedSet();
					return 0;
				}
			}
		}

		// 矢の検査
		if (arrowIdArray !== undefined) {

			// すべての指定の矢を走査
			for (idx = 0; idx < arrowIdArray.length; idx++) {

				// 全ての装備をループ
				for (idxEquip = 0; idxEquip < this.equipInfoArray.length; idxEquip++) {

					// 装備情報を取得
					equipInfo = this.equipInfoArray[idxEquip];

					// 指定の矢があった場合は、処理打ち切り
					if (arrowIdArray[idx] == equipInfo.GetEquippedId(CONST_DATA_KIND_ARROW)) {
						break;
					}
				}

				// 指定のアイテムがなかった場合は、その時点で不成立として return
				if (idxEquip >= this.equipInfoArray.length) {
					funcFailedSet();
					return 0;
				}
			}
		}

		// ここまで来たら成立している

		funcAddInfo();

		return 1
	};



	/**
	 * 装備ATKの合計値を取得する（右手）.
	 * @return 合算されたATKの値
	 */
	this.GetEquipAtkRight = function () {

		var equipId = 0;
		var itemData = null;
		var valueSum = 0;

		valueSum = 0;

		// 装備中のIDを取得
		equipId = this.equipInfoArray[MIG_EQUIP_REGION_ID_ARMS_RIGHT].GetEquippedId(CONST_DATA_KIND_ITEM);

		// TODO: ここオブジェクト化いる？
		// アイテムデータ取得
		itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

		// TODO: 移行時処理　本来は分岐しないはず
		if (!itemData) {
			itemData = ItemObjNew[equipId];
			if (ITEM_KIND_NONE <= itemData[ITEM_DATA_INDEX_KIND]) {
				if (itemData[ITEM_DATA_INDEX_KIND] <= ITEM_KIND_STUFF2HAND) {
					valueSum += itemData[ITEM_DATA_INDEX_POWER];
				}
			}
		}
		else {
			valueSum += itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 0);
		}

		return valueSum;
	};

	/**
	 * 装備ATKの合計値を取得する（左手）.
	 * @return 合算されたATKの値
	 */
	this.GetEquipAtkLeft = function () {

		var equipId = 0;
		var itemData = null;
		var valueSum = 0;

		valueSum = 0;

		// 装備中のIDを取得
		equipId = this.equipInfoArray[MIG_EQUIP_REGION_ID_ARMS_LEFT].GetEquippedId(CONST_DATA_KIND_ITEM);

		// TODO: ここオブジェクト化いる？
		// アイテムデータ取得
		itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

		// TODO: 移行時処理　本来は分岐しないはず
		if (!itemData) {
			itemData = ItemObjNew[equipId];
			if (ITEM_KIND_NONE <= itemData[ITEM_DATA_INDEX_KIND]) {
				if (itemData[ITEM_DATA_INDEX_KIND] <= ITEM_KIND_STUFF2HAND) {
					valueSum += itemData[ITEM_DATA_INDEX_POWER];
				}
			}
		}
		else {
			valueSum += itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 0);
		}

		return valueSum;
	};



	/**
	 * 装備MATKの合計値を取得する.
	 * @return 合算されたMATKの値
	 */
	this.GetEquipMatk = function () {

		var idx = 0;
		var idxSp = 0;

		var equipId = 0;
		var itemData = null;
		var valueSum = 0;

		valueSum = 0;

		// 自身の装備の配列を走査して、値を合算する
		for (idx = 0; idx < this.equipInfoArray.length; idx++) {

			// 装備中のIDを取得
			equipId = this.equipInfoArray[idx].GetEquippedId(CONST_DATA_KIND_ITEM);

			// TODO: ここオブジェクト化いる？
			// アイテムデータ取得
			itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

			// TODO: 移行時処理　本来は分岐しないはず
			if (!itemData) {
				itemData = ItemObjNew[equipId];
				for (idxSp = ITEM_DATA_INDEX_SPBEGIN; (idxSp + 1) < itemData.length; idxSp += 2) {
					if (itemData[idxSp] == ITEM_SP_MATK_PLUS) {
						valueSum += itemData[idxSp + 1];
					}
				}
			}
			else {
				valueSum += itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_MATK, 0);
			}
		}

		return valueSum;
	};



	/**
	 * 装備DEFの合計値を取得する.
	 * @return 合算されたDEFの値
	 */
	this.GetEquipDef = function () {

		var idx = 0;

		var equipId = 0;
		var itemData = null;
		var valueSum = 0;

		valueSum = 0;

		// 自身の装備の配列を走査して、値を合算する
		for (idx = 0; idx < this.equipInfoArray.length; idx++) {

			// 装備中のIDを取得
			equipId = this.equipInfoArray[idx].GetEquippedId(CONST_DATA_KIND_ITEM);

			// TODO: ここオブジェクト化いる？
			// アイテムデータ取得
			itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

			// TODO: 移行時処理　本来は分岐しないはず
			if (!itemData) {
				itemData = ItemObjNew[equipId];
				if (ITEM_KIND_HEAD_TOP <= itemData[ITEM_DATA_INDEX_KIND]) {
					if (itemData[ITEM_DATA_INDEX_KIND] <= ITEM_KIND_ACCESSARY_ON2) {
						valueSum += itemData[ITEM_DATA_INDEX_POWER];
					}
				}
			}
			else {
				valueSum += itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_DEF, 0);
			}
		}

		return valueSum;
	};



	/**
	 * 装備MDEFの合計値を取得する.
	 * @return 合算されたDEFの値
	 */
	this.GetEquipMdef = function () {

		var idx = 0;

		var equipId = 0;
		var itemData = null;
		var valueSum = 0;

		valueSum = 0;

		// 自身の装備の配列を走査して、値を合算する
		for (idx = 0; idx < this.equipInfoArray.length; idx++) {

			// 装備中のIDを取得
			equipId = this.equipInfoArray[idx].GetEquippedId(CONST_DATA_KIND_ITEM);

			// TODO: ここオブジェクト化いる？
			// アイテムデータ取得
			itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

			// TODO: 移行時処理　本来は分岐しないはず
			if (!itemData) {
				// SP扱い
			}
			else {
				valueSum += itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_MDEF, 0);
			}
		}

		return valueSum;
	};



	/**
	 * 攻撃属性を取得する.
	 * @return 攻撃属性のID（指定なしの場合は、undefined）
	 */
	this.GetEquipAttackElement = function () {

		var equipInfo = null;
		var elementId = undefined;

		// 二刀流での持ち替えは左手を対象に行われるため、左手を優先判定にする

		// 左手装備を判定
		equipInfo = this.equipInfoArray[MIG_EQUIP_REGION_ID_ARMS_LEFT];
		elementId = equipInfo.GetElement(true);
		if (elementId !== undefined) {
			return elementId;
		}

		// 右手装備を判定
		equipInfo = this.equipInfoArray[MIG_EQUIP_REGION_ID_ARMS_RIGHT];
		elementId = equipInfo.GetElement(true);
		if (elementId !== undefined) {
			return elementId;
		}

		// ここまで来たら属性指定なし
		return undefined;
	};



	/**
	 * 防御属性を取得する.
	 * @return 防御属性のID（指定なしの場合は、undefined）
	 */
	this.GetEquipDefenseElement = function () {

		var equipInfo = null;
		var elementId = undefined;

		// 鎧装備を判定
		equipInfo = this.equipInfoArray[MIG_EQUIP_REGION_ID_BODY];
		elementId = equipInfo.GetElement(false);
		if (elementId !== undefined) {
			return elementId;
		}

		// ここまで来たら属性指定なし
		return undefined;
	};



	/**
	 * 装備の破損可否を取得する.
	 * @param equipRegionId 装備領域ID
	 * @return 破損可否
	 */
	this.GetBreakable = function (equipRegionId) {

		var equipId = 0;
		var itemData = null;

		try {
			equipId = this.equipInfoArray[equipRegionId].GetEquippedId(CONST_DATA_KIND_ITEM);
		}
		catch (err) {
			return 0;
		}

		// TODO: ここオブジェクト化いる？
		// アイテムデータ取得
		itemData = g_constDataManager.GetDataObject(CONST_DATA_KIND_ITEM, equipId);

		return ((itemData) ? itemData.GetStaticDataOf(MIG_EQUIPABLE_SP_STATIC_ID_BREAKABLE, MIG_ITEM_BREAKABLE_YES) : 0);
	};



	/**
	 * SP値を取得する.
	 * @param spTag SPタグ
	 * @param ignoreAttrArray 無視する属性IDの配列
	 * @param calcMode 計算モード
	 * @return 合算されたSP効果の値
	 */
	this.GetSpValue = function (spTag, ignoreAttrArray, calcMode) {
		return this.effectiveItemSpMap.GetValue(spTag, ignoreAttrArray, calcMode);
	};

	/**
	 * SP値を取得する（集中力向上等の計算に含まれる、アイテムの無条件効果のみ）.
	 * @param spTag SPタグ
	 * @param ignoreAttrArray 無視する属性IDの配列
	 * @param calcMode 計算モード
	 * @return 合算されたSP効果の値
	 */
	this.GetPlaneSpValue = function (spTag, ignoreAttrArray, calcMode) {
		return this.effectiveItemSpMapPlane.GetValue(spTag, ignoreAttrArray, calcMode);
	};

	/**
	 * SP値を取得する（セット用）.
	 * @param spTag SPタグ
	 * @param ignoreAttrArray 無視する属性IDの配列
	 * @param calcMode 計算モード
	 * @return 合算されたSP効果の値
	 */
	this.GetSetSpValue = function (spTag, ignoreAttrArray, calcMode) {
		return this.effectiveItemSpMapSet.GetValue(spTag, ignoreAttrArray, calcMode);
	};

	/**
	 * SP属性を列挙する（使用可能スキルのスキルIDとレベルの列挙などに使用する）.
	 * @param spTag SPタグ
	 * @param collectAttrArray 収集する属性IDの配列
	 * @param ignoreAttrArray 無視する属性IDの配列（null可、remark も参照）
	 * @return 収集する属性IDに対応する値に倍率を加えた配列の配列
	 * @remark 『収集する属性IDの配列』に指定されたIDは、自動的に『無視する属性IDの配列』に追加される
	 * @remark 戻り値は、collectAttrArray の指定に従って、例えば次のようになる
	 * @remark 　collectAttrArray : [MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL]
	 * @remark 　return : [ [[13],[10]], [1]], [[15, 21], [1, 1]  ], [1,3,2] ]
	 * @remark 　         [ [[ID],[Lv]],[倍]], [[ID1,ID2],[Lv1,Lv2]], [倍1,倍2,倍3] ]
	 * @remark 　（このように、属性の値（IDやLvの部分）自体が配列の場合もあるので注意）
	 * @remark 　なお、倍率をこのように格納するのは、下記の理由による
	 * @remark 　　『まったく同じSP条件・効果が、複数の装備箇所に存在する場合で、
	 * @remark 　　　精錬値によって使用できるレベルが変わるような場合に、
	 * @remark 　　　各精錬値に基づいて算出されたレベルの情報を無損失で取得する』
	 */
	this.EnumSpAttributes = function (spTag, collectAttrArray, ignoreAttrArray) {
		return this.effectiveItemSpMap.EnumAttributes(spTag, collectAttrArray, ignoreAttrArray);
	};





	/**
	 * 指定のSPデータに適合するように装備を調整する（通常の処理では使用しない、データテスト用）.
	 * @param dataKind SPデータのデータ元の種別（アイテム、カード等）
	 * @param dataId SPデータのデータ元のID（アイテムID、カードID等）
	 * @param spData SPデータ
	 * @return 調整成功時は調整操作情報配列、失敗時は null
	 */
	this.AdjustToSpData = function (dataKind, dataId, spData) {

		var idx = 0;
		var idxRegion = 0;
		var idxSlot = 0;

		var bEquipped = false;
		var equipableRegionInfoArray = null;

		var candidateRegionIdArray = null;
		var equipInfo = 0;
		var itemIdEquipped = 0;
		var cardIdEquipped = 0;
		var cardKindTarget = 0;
		var enchantTypeId = 0;
		var enchantTypeData = null;
		var enchantListId = 0;
		var enchantListData = null;

		var adjustControlInfoArray = null;



		// データ元のデータが設定されているかを検査
		bEquipped = false;
		equipableRegionInfoArray = [];

		switch (dataKind) {

		case CONST_DATA_KIND_ITEM:

			// 指定のアイテムを装備できない場合、その時点で調整不能（現状は、すべてが○○以上）
			if (!IsMatchJobRestrict(dataId, this.GetJob())) {
				break;
			}

			// 設定可能な装備領域の配列を取得する
			candidateRegionIdArray = MigGetEquipRegionByItemKind(dataId, this.GetJob());

			// 全ての装備領域をループ
			for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

				// 装備情報を取得
				equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

				// 装備されているアイテムIDを取得
				itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

				// 指定のアイテムがあった場合
				if (itemIdEquipped == dataId) {

					// フラグを立てて、処理打ち切り
					bEquipped = true;
					break;
				}

				// 何のデータも設定されていない場合
				else if (itemIdEquipped == 0) {

					// 設定可能候補に追加しておく
					equipableRegionInfoArray.push([candidateRegionIdArray[idxRegion], 0]);
				}
			}

			break;

		case CONST_DATA_KIND_CARD:

			// 設定可能な装備領域の配列を取得する
			candidateRegionIdArray = MigGetEquipRegionByItemCard(dataId, this.GetJob());

			// 指定のカードのカード種別を取得
			// TODO: データ移行過渡処理
			// 旧データから取得
			cardKindTarget = CardObjNew[dataId][CARD_DATA_INDEX_KIND];

			// 全ての装備領域をループ
			for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

				// 装備情報を取得
				equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

				// 装備されているアイテムIDを取得
				itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

				// エンチャント情報を取得する
				// TODO: データ移行過渡処理
				// すべて、旧方式のデータから取得している
				enchantTypeId = GetEnchantTypeId(ItemObjNew[itemIdEquipped][ITEM_DATA_INDEX_WPNLV]);
				enchantTypeData = n_EnchantType[enchantTypeId];

				// 全てのカードスロットをループ
				candidateSlotIdArray = [];
				for (idxSlot = 0; idxSlot < CMigEquipInfo.cardCountInEquip; idxSlot++) {

					// 装着されているカードIDを取得
					cardIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_CARD, idxSlot);

					// 指定のデータがあった場合
					if (cardIdEquipped == dataId) {

						// フラグを立てて、処理打ち切り
						bEquipped = true;
						break;
					}

					// 何も設定されていないスロットの場合
					else if (cardIdEquipped == 0) {

						// エンチャントリストIDを取得
						enchantListId = enchantTypeData[idxSlot];

						// カード種別がエンチャントの場合
						if (cardKindTarget == CARD_KIND_ENCHANT) {

							// 該当スロットが、エンチャント枠の場合
							if (enchantListId != 0) {

								// エンチャントリストデータを取得
								enchantListData = n_EnchantList[enchantListId];

								// 指定のカードがエンチャントリストに含まれるならば、設定可能候補に追加しておく
								if (enchantListData.indexOf(dataId) >= 0) {
									equipableRegionInfoArray.push([candidateRegionIdArray[idxRegion], idxSlot]);
								}
							}
						}

						// それ以外の場合
						else {

							// 該当スロットが、カード枠の場合、設定可能候補に追加しておく
							if (enchantListId == 0) {
								equipableRegionInfoArray.push([candidateRegionIdArray[idxRegion], idxSlot]);
							}
						}
					}
				}

				// データが見つかっていれば、処理打ち切り
				if (bEquipped) {
					break;
				}
			}
		}



		// データ元がすでに装備されている場合
		if (bEquipped) {

			// 処理本体の呼び出し
			return this.AdjustToSpDataSub(spData);
		}



		// データ元が装備されていない場合

		// 設定可能候補を順に設定して試行する
		for (idx = 0; idx < equipableRegionInfoArray.length; idx++) {

			// 装備を変更
			this.ChangeEquip(equipableRegionInfoArray[idx][0], dataKind, equipableRegionInfoArray[idx][1], dataId);

			// 処理本体の呼び出し
			adjustControlInfoArray = this.AdjustToSpDataSub(spData);

			// 処理本体の呼び出し（再帰処理）
			if (adjustControlInfoArray) {
				// 成功した場合は、そのまま戻り値として返す
				return adjustControlInfoArray;
			}

			// 失敗した場合は、装備を元に戻す（元々、何も装備されていない前提）
			this.ChangeEquip(equipableRegionInfoArray[idx][0], dataKind, equipableRegionInfoArray[idx][1], 0);
		}



		// ここまで来たら、失敗
		return null;
	};

	/**
	 * 指定のSPデータに適合するように装備を調整する（サブ　処理本体）.
	 * @param spData SPデータ
	 * @return 調整成功時は調整操作情報配列、失敗時は null
	 */
	this.AdjustToSpDataSub = function (spData) {

		var idx = 0;
		var idxItem = 0;
		var idxEquip = 0;
		var idxRegion = 0;
		var idxSlot = 0;

		var borderBase = 0;
		var borderFlag = 0;
		var paramIdArray = null;
		var equipInfo = null;
		var itemIdTarget = 0;
		var itemIdEquipped = 0;
		var itemIdArray = null;
		var regionIdArray = null;
		var typeIdArray = null;
		var cardIdTarget = 0;
		var cardKindTarget = 0;
		var cardIdEquipped = 0;
		var cardIdArray = null;
		var arrowIdTarget = 0;
		var arrowIdEquipped = 0;
		var arrowIdArray = null;
		var enchantTypeId = 0;
		var enchantTypeData = null;
		var skillIdTarget = 0;
		var skillIdArray = null;

		var valueWork = 0;
		var arrayWork = null;
		var valueToBorder = 0;
		var candidateValue = 0;
		var candidateIdValueArray = null;
		var candidateRegionIdArray = null;

		var effectiveCount = 0;
		var childArray = null;

		var adjustControlInfoArray = null;
		var adjustControlInfoArrayWork = null;

		var funcWork = null;



		var learnSkillIdArray = g_constDataManager.GetDataObject(CONST_DATA_KIND_JOB, this.GetJob()).GetLearnSkillIdArray();



		// 調整操作情報配列（戻り値）を用意
		adjustControlInfoArray = [];



		//----------------------------------------------------------------
		// 指定のSPデータが、すでに条件を満たしていないか検査
		//----------------------------------------------------------------
		switch (spData.GetSpId()) {

		// ベースレベル条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_BASE_LEVEL:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionBaseLevel(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);

				// 境界フラグに応じて分岐
				switch (borderFlag) {

				case MIG_BORDER_FLAG_ID_UNDER:
					// 基本的に条件を満たす最低値に設定している前提なので、以下条件は調整できない
					break;

				case MIG_BORDER_FLAG_ID_EQUAL:
				case MIG_BORDER_FLAG_ID_OVER:
				case MIG_BORDER_FLAG_ID_BY:

					// 職業ごとの最低レベルの場合に限り、設定の変更を許可する
					if (this.GetParam(MIG_PARAM_ID_BASE_LV) == GetBaseLevelMin(this.GetJob())) {

						// 調整操作情報を追加
						adjustControlInfoArray.push([
							MIG_CHARA_DATA_ADJUST_CONTROL_SET_PARAM,
							[
								MIG_PARAM_ID_BASE_LV,
								borderBase,
							],
						]);

						// 有効フラグを調整
						effectiveCount = 1;
					}
					break;
				}
			}

			break;



		// 純粋なパラメータ条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_PURE_PARAM:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionPureParam(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
				paramIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM);

				// 境界フラグに応じて分岐
				switch (borderFlag) {

				case MIG_BORDER_FLAG_ID_UNDER:
					// 基本的に条件を満たす最低値に設定している前提なので、以下条件は調整できない
					break;

				case MIG_BORDER_FLAG_ID_EQUAL:
				case MIG_BORDER_FLAG_ID_OVER:
				case MIG_BORDER_FLAG_ID_BY:

					// 指定されているパラメータのうち、初期値のものに限り、調整を試みる
					candidateIdValueArray = [];
					valueToBorder = borderBase;

					// すべての指定されているパラメータをループ
					for (idx = 0; idx < paramIdArray.length; idx++) {

						// 初期値のものに限り調整
						if (this.GetParam(paramIdArray[idx]) == 1) {

							// TODO: 養子のテストは未対応

							// 設定すべき値を算出
							candidateValue = Math.min(valueToBorder, GetStatusMax(this.GetJob(), false));
							candidateIdValueArray.push([paramIdArray[idx], candidateValue]);

							// 残りの調整値を計算
							valueToBorder -= candidateValue;

							// 調整が完了したら処理打ち切り
							if (valueToBorder == 0) {
								break;
							}
						}
					}

					// 調整ができた場合のみ、候補のデータを適用する
					if (valueToBorder == 0) {

						// 調整操作情報を追加
						for (idx = 0; idx < candidateIdValueArray.length; idx++) {
							adjustControlInfoArray.push([
								MIG_CHARA_DATA_ADJUST_CONTROL_SET_PARAM,
								[
									candidateIdValueArray[idx][0],
									candidateIdValueArray[idx][1],
								],
							]);
						}

						// 有効フラグを調整
						effectiveCount = 1;
					}
					break;
				}
			}

			break;



		// アイテム精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED_OLD:

			// TODO: _OLD系への対応がまだ。暗黙で自身のアイテムを参照するように対応のこと。


			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionItemRefined(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// TODO: 未対応
				// （合計が○○以上と、すべてが○○以上の違いが？）
				// （現状は、すべてが○○以上）

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
				itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);

				// すべての指定のアイテムを走査
				for (idx = 0; idx < itemIdArray.length; idx++) {

					// 指定のアイテムIDを取得
					itemIdTarget = itemIdArray[idx];

					// 指定のアイテムを装備できない場合、その時点で調整不能（現状は、すべてが○○以上）
					if (!IsMatchJobRestrict(itemIdTarget, this.GetJob())) {
						break;
					}

					// 設定可能な装備領域の配列を取得する
					candidateRegionIdArray = MigGetEquipRegionByItemKind(itemIdTarget, this.GetJob());

					// すべての装備位置候補をループ
					for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

						// 装備情報を取得
						equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

						// 装備されているアイテムIDを取得
						itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

						// 境界フラグが、未装備時条件の場合
						if (borderFlag == MIG_BORDER_FLAG_ID_NOT) {

							// 指定のアイテムが装備されている場合は、調整不能
							// （必要だから装備されているわけで、外す調整はできない）
							if (equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM) == itemIdTarget) {
								return null;
							}
						}

						// 上記以外の場合
						else {
							// 何も装備されていなければ、指定のアイテムを装備する
							if (itemIdEquipped == 0) {

								// equipInfo は操作せず、変数の変更にとどめること
								itemIdEquipped = itemIdTarget;

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_ITEM,
										0,
										itemIdTarget,
									],
								]);
							}

							// 指定のアイテムが装備されていれば、調整を行って、処理打ち切り
							if (itemIdEquipped == itemIdTarget) {

								// 境界フラグに応じて分岐
								switch (borderFlag) {

								case MIG_BORDER_FLAG_ID_UNDER:
									// 基本的に条件を満たす最低値に設定している前提なので、以下条件は調整できない
									// （新規に装備を設定した場合は、0 になっているはずなので、それ未満にはできない）
									break;

								case MIG_BORDER_FLAG_ID_EQUAL:
								case MIG_BORDER_FLAG_ID_OVER:
								case MIG_BORDER_FLAG_ID_BY:
									adjustControlInfoArray.push([
										MIG_CHARA_DATA_ADJUST_CONTROL_SET_REFINED,
										[
											candidateRegionIdArray[idxRegion],
											borderBase,
										],
									]);
									break;
								}

								break;
							}
						}
					}

					// 指定のアイテムがどこにも装備できない、されていない場合は、調整不能
					if (idxRegion >= candidateRegionIdArray.length) {
						return null;
					}
				}

				// ここまで来れば、調整成功

				// 有効フラグを調整
				effectiveCount = 1;
			}

			break;



		// アイテム装備領域精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_EQUIP_REGION_REFINED:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionItemEquipRegionRefined(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// TODO: 未対応
				// （合計が○○以上と、すべてが○○以上の違いが？）
				// （現状は、すべてが○○以上）

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
				regionIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_EQUIP_REGION);

				// すべての指定のアイテムを走査
				for (idx = 0; idx < regionIdArray.length; idx++) {

					// 装備情報を取得
					equipInfo = this.equipInfoArray[regionIdArray[idx]];

					// 装備されているアイテムIDを取得
					itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

					// 何も装備されていない場合に限り、調整可能とする
					if (itemIdEquipped == 0) {

						// 適当なアイテムを装備する
						// TODO: 旧データID使用
						switch (regionIdArray[idx]) {

						// 右手武器
						case MIG_EQUIP_REGION_ID_ARMS_RIGHT:

							// 設定候補アイテムIDの配列を用意
							itemIdArray = [
								ITEM_ID_KNIFE,
								ITEM_ID_ROD,
								ITEM_ID_BOOK,
								ITEM_ID_BRANCH,
								ITEM_ID_SHOSHINSHAYO_NEKOZYARASHI,		// 精錬可能な最弱装備
							];

							// 設定候補をすべてループ
							for (idxItem = 0; idxItem < itemIdArray.length; idxItem++) {

								// 指定のアイテムを装備できる場合、それを対象として、処理打ち切り
								if (IsMatchJobRestrict(itemIdTarget, this.GetJob())) {
									itemIdTarget = itemIdArray[idxItem];
									break;
								}

							}

							// いずれも装備できない場合（テコンキッド）は、調整不能
							if (idxItem >= itemIdArray.length) {
								return null;
							}
							break;

						// TODO: 左手未対応
						// case MIG_EQUIP_REGION_ID_ARMS_LEFT:

						case MIG_EQUIP_REGION_ID_HEAD_TOP:
							itemIdTarget = ITEM_ID_HAT;
							break;

						// TODO: 二刀流時未対応
						case MIG_EQUIP_REGION_ID_SHIELD:
							itemIdTarget = ITEM_ID_GUARD;
							break;

						case MIG_EQUIP_REGION_ID_BODY:
							itemIdTarget = ITEM_ID_COTTON_SHIRTS;
							break;

						case MIG_EQUIP_REGION_ID_SHOULDER:
							itemIdTarget = ITEM_ID_HOOD;
							break;

						case MIG_EQUIP_REGION_ID_FOOT:
							itemIdTarget = ITEM_ID_SANDAL;
							break;

						// 上記以外は、精錬できない領域
						default:
							return null;
						}

						// equipInfo は操作せず、変数の変更にとどめること
						itemIdEquipped = itemIdTarget;

						// 調整操作情報を追加
						adjustControlInfoArray.push([
							MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
							[
								regionIdArray[idxRegion],
								CONST_DATA_KIND_ITEM,
								0,
								itemIdTarget,
							],
						]);
					}

					// 何らかのアイテムが装備されている場合は、調整不能
					else {
						return null;
					}
				}

				// ここまで来れば、調整成功

				// 有効フラグを調整
				effectiveCount = 1;
			}

			break;



		// アイテム系列精錬値条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_TYPE_REFINED:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionItemTypeRefined(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// TODO: 未対応
				// （合計が○○以上と、すべてが○○以上の違いが？）
				// （現状は、すべてが○○以上）

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
				typeIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_TYPE);

				// アイテム系列ごとに、未装備の場合に設定する装備を決定
				// TODO: 旧データID使用
				arrayWork = [];

				arrayWork[MIG_ITEM_TYPE_KNIFE] = ITEM_ID_KNIFE;
				arrayWork[MIG_ITEM_TYPE_SWORD] = ITEM_ID_SWORD;
				arrayWork[MIG_ITEM_TYPE_SWORD_2HAND] = ITEM_ID_KATANA;
				arrayWork[MIG_ITEM_TYPE_SPEAR] = ITEM_ID_JAVELIN;
				arrayWork[MIG_ITEM_TYPE_SPEAR_2HAND] = ITEM_ID_GISARM;
				arrayWork[MIG_ITEM_TYPE_AXE] = ITEM_ID_AXE;
				arrayWork[MIG_ITEM_TYPE_AXE_2HAND] = ITEM_ID_BLOOD_AXE;
				arrayWork[MIG_ITEM_TYPE_MACE] = ITEM_ID_MACE;
				arrayWork[MIG_ITEM_TYPE_STUFF] = ITEM_ID_ROD;
				arrayWork[MIG_ITEM_TYPE_STUFF_2HAND] = ITEM_ID_WIZARD_STUFF;
				arrayWork[MIG_ITEM_TYPE_BOW] = ITEM_ID_BOW;
				arrayWork[MIG_ITEM_TYPE_KATAR] = ITEM_ID_JUR;
				arrayWork[MIG_ITEM_TYPE_BOOK] = ITEM_ID_BOOK;
				arrayWork[MIG_ITEM_TYPE_FIST] = ITEM_ID_BUGNUG;
				arrayWork[MIG_ITEM_TYPE_MUSICAL] = ITEM_ID_VIOLIN;
				arrayWork[MIG_ITEM_TYPE_WHIP] = ITEM_ID_ROPE;
				arrayWork[MIG_ITEM_TYPE_FUMA] = ITEM_ID_FUMA_SHURIKEN_DAISHARIN;
				arrayWork[MIG_ITEM_TYPE_HANDGUN] = ITEM_ID_SIX_SHOOTER;
				arrayWork[MIG_ITEM_TYPE_RIFLE] = ITEM_ID_BRANCH;
				arrayWork[MIG_ITEM_TYPE_SHOTGUN] = ITEM_ID_ROLLING_STONE;
				arrayWork[MIG_ITEM_TYPE_GATLINGGUN] = ITEM_ID_DRIFTER;
				arrayWork[MIG_ITEM_TYPE_GRENADEGUN] = ITEM_ID_DESTROYER;

				arrayWork[MIG_ITEM_TYPE_HELM] = ITEM_ID_HAT;
				arrayWork[MIG_ITEM_TYPE_ARMOR] = ITEM_ID_COTTON_SHIRTS;
				arrayWork[MIG_ITEM_TYPE_SHIELD] = ITEM_ID_GUARD;
				arrayWork[MIG_ITEM_TYPE_SHOULDER] = ITEM_ID_HOOD;
				arrayWork[MIG_ITEM_TYPE_SHOES] = ITEM_ID_SANDAL;
				// アクセサリーは精錬不能なので不要

				// 設定調整用関数
				funcWork = function (refThisF, regionIdF) {

					var equipInfoF = null;

					// すでに調整済みなら、処理不要
					if (itemIdTarget >= 0) {
						return itemIdTarget;
					}

					// 装備情報を取得
					equipInfoF = refThisF.equipInfoArray[valueF];

					// 装備が設定されている場合は、調整不能
					if (equipInfoF.itemInfo) {
						return -1;
					}

					// ドラムの場合
					if (refThisF.GetJob() == MIG_JOB_ID_SUMMONER) {
						if (value == MIG_EQUIP_REGION_ID_ARMS_RIGHT) {
							itemIdTarget = ITEM_ID_SHOSHINSHAYO_NEKOZYARASHI;

							// 装備できない場合は、対象をクリア
							if (!IsMatchJobRestrict(itemIdTarget, refThisF.GetJob())) {
								itemIdTarget = -1;
							}
						}
					}

					// 共通一般処理
					if (itemIdTarget < 0) {
						itemIdTarget = arrayWork[typeIdArray[idx]];

						// 装備できない場合は、対象をクリア
						if (!IsMatchJobRestrict(itemIdTarget, refThisF.GetJob())) {
							itemIdTarget = -1;
						}
					}

					// 装備可能なアイテムがあれば、調整操作情報を追加
					if (itemIdTarget >= 0) {
						adjustControlInfoArray.push([
							MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
							[
								valueF,
								CONST_DATA_KIND_ITEM,
								0,
								itemIdTarget,
							],
						]);
					}

					return itemIdTarget;
				};

				// すべての指定のアイテム系列を走査
				for (idx = 0; idx < typeIdArray.length; idx++) {

					// タイプで分岐
					regionIdArray = [];

					// アクセサリーは精錬不能なので個別処理不要
					switch (typeIdArray[idx]) {

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

						// 右手武器検査
						if (funcWork(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT) >= 0) {
							break;
						}

						// 二刀流可能職業なら、左手も検査
						if (IsDualArmsJob(this.GetJob())) {
							funcWork(this, MIG_EQUIP_REGION_ID_ARMS_LEFT);
						}
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
						// 右手のみ検査
						funcWork(this, MIG_EQUIP_REGION_ID_ARMS_RIGHT);
						break;

					case MIG_ITEM_TYPE_HELM:
						funcWork(this, MIG_EQUIP_REGION_ID_HEAD_TOP);
						break;

					case MIG_ITEM_TYPE_ARMOR:
						funcWork(this, MIG_EQUIP_REGION_ID_BODY);
						break;

					case MIG_ITEM_TYPE_SHIELD:
						funcWork(this, MIG_EQUIP_REGION_ID_SHIELD);
						break;

					case MIG_ITEM_TYPE_SHOULDER:
						funcWork(this, MIG_EQUIP_REGION_ID_SHOULDER);
						break;

					case MIG_ITEM_TYPE_SHOES:
						funcWork(this, MIG_EQUIP_REGION_ID_FOOT);
						break;

					}

					// 装備設定できた場合は、処理打ち切り
					if (itemIdTarget >= 0) {
						break;
					}
				}

				// この時点で調整配列が空の場合は、調整不能
				if (adjustControlInfoArray.length == 0) {
					return null;
				}

				// ここまで来れば、調整成功

				// 有効フラグを調整
				effectiveCount = 1;
			}

			break;



		// スキル習得条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_LEARNED_LEVEL_V2:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionSkillLearned(spData);

			// 満たしていない場合は調整
			if (effectiveCount == 0) {

				// データを取得
				borderBase = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE);
				borderFlag = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG);
				skillIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL);

				// 境界フラグに応じて分岐
				switch (borderFlag) {

				case MIG_BORDER_FLAG_ID_UNDER:
					// 基本的に条件を満たす最低値に設定している前提なので、以下条件は調整できない
					break;

				case MIG_BORDER_FLAG_ID_EQUAL:
				case MIG_BORDER_FLAG_ID_OVER:
				case MIG_BORDER_FLAG_ID_BY:

					// 指定されている習得スキルのうち、初期値のものに限り、調整を試みる
					candidateIdValueArray = [];
					valueToBorder = borderBase;

					// すべての指定されている習得スキルをループ
					for (idx = 0; idx < skillIdArray.length; idx++) {

						// 指定されている習得スキルのIDを取得
						skillIdTarget = skillIdArray[idx];

						// そもそも習得できない場合は、次へ
						if (learnSkillIdArray.indexOf(skillIdTarget) < 0) {
							continue;
						}

						// 初期値のものに限り調整
						if (this.GetSkillLearned(skillIdTarget) == 0) {

							// 設定すべき値を算出
							candidateValue = Math.min(valueToBorder, GetStatusMax(this.GetJob(), false));
							candidateIdValueArray.push([skillIdTarget, candidateValue]);

							// 残りの調整値を計算
							valueToBorder -= candidateValue;

							// 調整が完了したら処理打ち切り
							if (valueToBorder == 0) {
								break;
							}
						}
					}

					// 調整ができた場合のみ、候補のデータを適用する
					if (valueToBorder == 0) {

						// 調整操作情報を追加
						for (idx = 0; idx < candidateIdValueArray.length; idx++) {
							adjustControlInfoArray.push([
								MIG_CHARA_DATA_ADJUST_CONTROL_SET_SKLILL_LEARNED,
								[
									candidateIdValueArray[idx][0],
									candidateIdValueArray[idx][1],
								],
							]);
						}

						// 有効フラグを調整
						effectiveCount = 1;
					}
					break;
				}
			}

			break;



		// 職業が装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_JOB_EQUIPPING:

			// 職業は調整できない
			effectiveCount = 0;
			break;



		// いずれかと共に装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionEquipWithOne(spData);

			// 満たしていない場合は調整（アイテム）
			if (effectiveCount == 0) {

				// データを取得
				itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);

				// すべての指定のアイテムを走査
				if (itemIdArray) {
					for (idx = 0; idx < itemIdArray.length; idx++) {

						// 指定のアイテムIDを取得
						itemIdTarget = itemIdArray[idx];

						// 指定のアイテムを装備できない場合、次へ
						if (IsMatchJobRestrict(itemIdTarget, this.GetJob())) {
							continue;
						}

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = MigGetEquipRegionByItemKind(itemIdTarget, this.GetJob());

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されているアイテムIDを取得
							itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

							// 何も装備されていなければ、指定のアイテムを装備する
							if (itemIdEquipped == 0) {

								// equipInfo は操作せず、変数の変更にとどめること
								itemIdEquipped = itemIdTarget;

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_ITEM,
										0,
										itemIdTarget,
									],
								]);
							}

							// 指定のアイテムが装備されていれば、処理打ち切り
							if (itemIdEquipped == itemIdTarget) {

								// 条件成立検査の処理の関係上、未装備以外でここに来ることはありえないはず

								// 有効フラグを調整
								effectiveCount = 1;
								break;
							}
						}

						// 調整が完了していれば、処理打ち切り
						if (effectiveCount > 0) {
							break;
						}
					}
				}
			}

			// 満たしていない場合は調整（カード）
			if (effectiveCount == 0) {

				// データを取得
				cardIdArray = spData.GetAttribute(MIG_CARD_SP_ATTRIBUTE_ID_CARD);

				// すべての指定のカードを走査
				if (cardIdArray) {
					for (idx = 0; idx < cardIdArray.length; idx++) {

						// 指定のカードIDを取得
						cardIdTarget = cardIdArray[idx];

						// 指定のカードのカード種別を取得
						// TODO: データ移行過渡処理
						// 旧データから取得
						cardKindTarget = CardObjNew[cardIdTarget][CARD_DATA_INDEX_KIND];

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = MigGetEquipRegionByCardKind(cardIdTarget, this.GetJob());

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されているアイテムIDを取得
							itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

							// エンチャント情報を取得する
							// TODO: データ移行過渡処理
							// すべて、旧方式のデータから取得している
							enchantTypeId = GetEnchantTypeId(ItemObjNew[itemIdEquipped][ITEM_DATA_INDEX_WPNLV]);
							enchantTypeData = n_EnchantType[enchantTypeId];

							// 全てのカードスロットをループ
							for (idxSlot = 0; idxSlot < CMigEquipInfo.cardCountInEquip; idxSlot++) {

								// すでに何かが装着されている場合は、次へ
								if (equipInfo.GetEquippedId(CONST_DATA_KIND_CARD, idxSlot) != 0) {
									continue;
								}

								// TODO: データ移行過渡処理
								// すべて旧種別定数で判定している

								// エンチャントリストIDを取得
								enchantListId = enchantTypeData[idxSlot];

								// カード種別がエンチャントの場合
								if (cardKindTarget == CARD_KIND_ENCHANT) {

									// 該当スロットが、カード枠の場合は、次へ
									if (enchantListId == 0) {
										continue;
									}

									// エンチャントリストデータを取得
									enchantListData = n_EnchantList[enchantListId];

									// 指定のカードがエンチャントリストに含まれない場合は、次へ
									if (enchantListData.indexOf(cardIdTarget) < 0) {
										continue;
									}
								}

								// それ以外の場合
								else {

									// 該当スロットが、エンチャント枠の場合は、次へ
									if (enchantListId != 0) {
										continue;
									}
								}

								// ここまで来れば、当該スロットに設定可能

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_CARD,
										idxSlot,
										cardIdTarget,
									],
								]);

								// 有効フラグを調整
								effectiveCount = 1;

								// 処理打ち切り
								break;
							}
						}

						// 調整が完了していれば、処理打ち切り
						if (effectiveCount > 0) {
							break;
						}
					}
				}
			}

			// 満たしていない場合は調整（矢）
			if (effectiveCount == 0) {

				// データを取得
				arrowIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);

				// すべての指定の矢を走査
				if (arrowIdArray) {
					for (idx = 0; idx < arrowIdArray.length; idx++) {

						// 指定の矢IDを取得
						arrowIdTarget = arrowIdArray[idx];

						// 指定の矢を装備できない場合、次へ
						if (IsMatchJobRestrictArrow(arrowIdTarget, this.GetJob())) {
							continue;
						}

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = [MIG_EQUIP_REGION_ID_ARROW];

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されているアイテムIDを取得
							arrowIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ARROW);

							// 何も装備されていなければ、指定のアイテムを装備する
							if (arrowIdEquipped == 0) {

								// equipInfo は操作せず、変数の変更にとどめること
								arrowIdEquipped = arrowIdTarget;

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_ARROW,
										0,
										arrowIdTarget,
									],
								]);
							}

							// 指定のアイテムが装備されていれば、処理打ち切り
							if (arrowIdEquipped == arrowIdTarget) {

								// 条件成立検査の処理の関係上、未装備以外でここに来ることはありえないはず

								// 有効フラグを調整
								effectiveCount = 1;
								break;
							}
						}

						// 調整が完了していれば、処理打ち切り
						if (effectiveCount > 0) {
							break;
						}
					}
				}
			}

			break;



		// すべてを同時に装備時条件
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL_V2:

			// 条件成立検査
			effectiveCount = this.GetEffectiveCountConditionEquipWithAll(spData);

			// 満たしていない場合は調整（アイテム）
			if (effectiveCount == 0) {

				// データを取得
				itemIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM);

				// すべての指定のアイテムを走査
				if (itemIdArray) {
					for (idx = 0; idx < itemIdArray.length; idx++) {

						// 指定のアイテムIDを取得
						itemIdTarget = itemIdArray[idx];

						// 指定のアイテムを装備できない場合、その時点で調整不能
						if (IsMatchJobRestrict(itemIdTarget, this.GetJob())) {
							return null;
						}

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = MigGetEquipRegionByItemKind(itemIdTarget, this.GetJob());

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されているアイテムIDを取得
							itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

							// 何も装備されていなければ、指定のアイテムを装備する
							if (itemIdEquipped == 0) {

								// equipInfo は操作せず、変数の変更にとどめること
								itemIdEquipped = itemIdTarget;

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_ITEM,
										0,
										itemIdTarget,
									],
								]);
							}

							// 指定のアイテムが装備されていれば、処理打ち切り
							if (itemIdEquipped == itemIdTarget) {

								// 有効フラグを調整
								effectiveCount = 1;
								break;
							}
						}

						// 指定の装備が設定できていない場合は、その時点で調整不能
						if (effectiveCount == 0) {
							return null;
						}
					}
				}
			}

			// 満たしていない場合は調整（カード）
			if (effectiveCount == 0) {

				// データを取得
				cardIdArray = spData.GetAttribute(MIG_CARD_SP_ATTRIBUTE_ID_CARD);

				// すべての指定のカードを走査
				if (cardIdArray) {
					for (idx = 0; idx < cardIdArray.length; idx++) {

						// 指定のカードIDを取得
						cardIdTarget = cardIdArray[idx];

						// 指定のカードのカード種別を取得
						// TODO: データ移行過渡処理
						// 旧データから取得
						cardKindTarget = CardObjNew[cardIdTarget][CARD_DATA_INDEX_KIND];

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = MigGetEquipRegionByCardKind(cardIdTarget, this.GetJob());

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されているアイテムIDを取得
							itemIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ITEM);

							// エンチャント情報を取得する
							// TODO: データ移行過渡処理
							// すべて、旧方式のデータから取得している
							enchantTypeId = GetEnchantTypeId(ItemObjNew[itemIdEquipped][ITEM_DATA_INDEX_WPNLV]);
							enchantTypeData = n_EnchantType[enchantTypeId];

							// 全てのカードスロットをループ
							for (idxSlot = 0; idxSlot < CMigEquipInfo.cardCountInEquip; idxSlot++) {

								// すでに何かが装着されている場合は、次へ
								if (equipInfo.GetEquippedId(CONST_DATA_KIND_CARD, idxSlot) != 0) {
									continue;
								}

								// TODO: データ移行過渡処理
								// すべて旧種別定数で判定している

								// エンチャントリストIDを取得
								enchantListId = enchantTypeData[idxSlot];

								// カード種別がエンチャントの場合
								if (cardKindTarget == CARD_KIND_ENCHANT) {

									// 該当スロットが、カード枠の場合は、次へ
									if (enchantListId == 0) {
										continue;
									}

									// エンチャントリストデータを取得
									enchantListData = n_EnchantList[enchantListId];

									// 指定のカードがエンチャントリストに含まれない場合は、次へ
									if (enchantListData.indexOf(cardIdTarget) < 0) {
										continue;
									}
								}

								// それ以外の場合
								else {

									// 該当スロットが、エンチャント枠の場合は、次へ
									if (enchantListId != 0) {
										continue;
									}
								}

								// ここまで来れば、当該スロットに設定可能

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_CARD,
										idxSlot,
										cardIdTarget,
									],
								]);

								// 有効フラグを調整
								effectiveCount = 1;

								// 処理打ち切り
								break;
							}
						}

						// 指定のカードが設定できていない場合は、その時点で調整不能
						if (effectiveCount == 0) {
							return null;
						}
					}
				}
			}

			// 満たしていない場合は調整（矢）
			if (effectiveCount == 0) {

				// データを取得
				arrowIdArray = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW);

				// すべての指定の矢を走査
				if (arrowIdArray) {
					for (idx = 0; idx < arrowIdArray.length; idx++) {

						// 指定の矢IDを取得
						arrowIdTarget = arrowIdArray[idx];

						// 指定の矢を装備できない場合、その時点で調整不能
						if (IsMatchJobRestrictArrow(arrowIdTarget, this.GetJob())) {
							return null;
						}

						// 設定可能な装備領域の配列を取得する
						candidateRegionIdArray = MigGetEquipRegionByItemKind(arrowIdTarget, this.GetJob());

						// すべての装備位置候補をループ
						for (idxRegion = 0; idxRegion < candidateRegionIdArray.length; idxRegion++) {

							// 装備情報を取得
							equipInfo = this.equipInfoArray[candidateRegionIdArray[idxRegion]];

							// 装備されている矢IDを取得
							arrowIdEquipped = equipInfo.GetEquippedId(CONST_DATA_KIND_ARROW);

							// 何も装備されていなければ、指定の矢を装備する
							if (arrowIdEquipped == 0) {

								// equipInfo は操作せず、変数の変更にとどめること
								arrowIdEquipped = arrowIdTarget;

								// 調整操作情報を追加
								adjustControlInfoArray.push([
									MIG_CHARA_DATA_ADJUST_CONTROL_SET_EQUIP,
									[
										candidateRegionIdArray[idxRegion],
										CONST_DATA_KIND_ARROW,
										0,
										arrowIdTarget,
									],
								]);
							}

							// 指定の矢が装備されていれば、処理打ち切り
							if (arrowIdEquipped == arrowIdTarget) {

								// 有効フラグを調整
								effectiveCount = 1;
								break;
							}
						}

						// 指定の装備が設定できていない場合は、その時点で調整不能
						if (effectiveCount == 0) {
							return null;
						}
					}
				}
			}

			break;



		// 未対応
		case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ONE:
		case MIG_EQUIPABLE_SP_CONDITION_ID_PET_WITH_ALL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_KILL:
		case MIG_EQUIPABLE_SP_CONDITION_ID_KILL_RACE:
		case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_USED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_SKILL_HITTED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_USED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_DISARMED:
		case MIG_EQUIPABLE_SP_CONDITION_ID_TIME_EFFECT:

		case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_AS_REFINED:
		case MIG_EQUIPABLE_SP_EFFECT_ID_USABLE_SKILL_INCREASE_LEVEL:
		case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_LEARNED:
		case MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_AS_REFINED:



		// 上記以外は、調整の必要なし
		default:
			effectiveCount = 1;
			break;
		}



		//----------------------------------------------------------------
		// 調整できなかった場合は、失敗で終了
		//----------------------------------------------------------------
		if (effectiveCount == 0) {
			return null;
		}



		//----------------------------------------------------------------
		// 子要素の調整
		//----------------------------------------------------------------

		// SPデータの子要素配列を取得
		childArray = spData.GetChildren();

		// すべての子要素に対して、調整を行う
		for (idx = 0; idx < childArray.length; idx++) {

			// 子要素を呼び出し
			adjustControlInfoArrayWork = this.AdjustToSpDataSub(childArray[idx]);

			// 調整に失敗していたら、その時点で、失敗終了
			if (!adjustControlInfoArrayWork) {
				return null;
			}

			// 成功している場合は、自身の調整操作情報配列に追加
			adjustControlInfoArray = adjustControlInfoArray.concat(adjustControlInfoArrayWork);
		}



		//----------------------------------------------------------------
		// ここまでくれば、子要素も含めて、すべて調整に成功している
		//----------------------------------------------------------------

		return adjustControlInfoArray;
	};


}





