/**
 * セーブデータユニット関連定数クラス.
 */
class CSaveDataConst {

	/**
	 * プロパティ名：タイプ値.
	 */
	static propNameType = "type";

	/**
	 * プロパティ名：バージョン番号.
	 */
	static propNameVersion = "version";

	/**
	 * プロパティ名：データ種別.
	 */
	static propNameDataKind = "dataKind";

	/**
	 * プロパティ名：パース制御フラグ.
	 * （読み取る後続プロパティ数を制御する）
	 * （JavaScriptのBigIntで処理するため、とてつもなく大きな整数でも使用可能）
	 */
	static propNameParseCtrlFlag = "parseCtrlFlag";

	/**
	 * プロパティ名：オプションコード.
	 */
	static propNameOptCode = "optCode";



	/**
	 * プロパティ名：職業ID.
	 */
	static propNameJobID = "jobID";

	/**
	 * プロパティ名：ベースレベル.
	 */
	static propNameBaseLv = "baseLv";

	/**
	 * プロパティ名：ジョブレベル.
	 */
	static propNameJobLv = "jobLv";

	/**
	 * プロパティ名：基本ステータス（Str）（符号）.
	 */
	static propNameStStrSign = "stStrSign";

	/**
	 * プロパティ名：基本ステータス（Str）.
	 */
	static propNameStStr = "stStr";

	/**
	 * プロパティ名：基本ステータス（Agi）（符号）.
	 */
	static propNameStAgiSign = "stAgiSign";

	/**
	 * プロパティ名：基本ステータス（Agi）.
	 */
	static propNameStAgi = "stAgi";

	/**
	 * プロパティ名：基本ステータス（Vit）（符号）.
	 */
	static propNameStVitSign = "stVitSign";

	/**
	 * プロパティ名：基本ステータス（Vit）.
	 */
	static propNameStVit = "stVit";

	/**
	 * プロパティ名：基本ステータス（Int）（符号）.
	 */
	static propNameStIntSign = "stIntSign";

	/**
	 * プロパティ名：基本ステータス（Int）.
	 */
	static propNameStInt = "stInt";

	/**
	 * プロパティ名：基本ステータス（Dex）（符号）.
	 */
	static propNameStDexSign = "stDexSign";

	/**
	 * プロパティ名：基本ステータス（Dex）.
	 */
	static propNameStDex = "stDex";

	/**
	 * プロパティ名：基本ステータス（Luk）（符号）.
	 */
	static propNameStLukSign = "stLukSign";

	/**
	 * プロパティ名：基本ステータス（Luk）.
	 */
	static propNameStLuk = "stLuk";

	/**
	 * プロパティ名：特性ステータス（Pow）（符号）.
	 */
	static propNameStPowSign = "stPowSign";

	/**
	 * プロパティ名：特性ステータス（Pow）.
	 */
	static propNameStPow = "stPow";

	/**
	 * プロパティ名：特性ステータス（Sta）（符号）.
	 */
	static propNameStStaSign = "stStaSign";

	/**
	 * プロパティ名：特性ステータス（Sta）.
	 */
	static propNameStSta = "stSta";

	/**
	 * プロパティ名：特性ステータス（Wis）（符号）.
	 */
	static propNameStWisSign = "stWisSign";

	/**
	 * プロパティ名：特性ステータス（Wis）.
	 */
	static propNameStWis = "stWis";

	/**
	 * プロパティ名：特性ステータス（Spl）（符号）.
	 */
	static propNameStSplSign = "stSplSign";

	/**
	 * プロパティ名：特性ステータス（Spl）.
	 */
	static propNameStSpl = "stSpl";

	/**
	 * プロパティ名：特性ステータス（Con）（符号）.
	 */
	static propNameStConSign = "stConSign";

	/**
	 * プロパティ名：特性ステータス（Con）.
	 */
	static propNameStCon = "stCon";

	/**
	 * プロパティ名：特性ステータス（Crt）（符号）.
	 */
	static propNameStCrtSign = "stCrtSign";

	/**
	 * プロパティ名：特性ステータス（Crt）.
	 */
	static propNameStCrt = "stCrt";

	/**
	 * サブプロパティ名：BaseLv自動調整.
	 */
	static propNameSubAutoAdjustBaseLv = "autoAdjustBaseLv";

	/**
	 * サブプロパティ名：装備制限解除.
	 */
	static propNameSubIgnoreEquipRestrict = "ignoreEquipRestrict";

	/**
	 * プロパティ名：矢.
	 */
	static propNameArrow = "equipArrow";



	/**
	 * プロパティ名：装備定義ID.
	 * （作成した装備情報を識別するID。装備位置などから参照される）
	 */
	static propNameEquipItemDefID = "equipItemDefID";

	/**
	 * プロパティ名：アイテムID.
	 */
	static propNameItemID = "itemID";

	/**
	 * プロパティ名：精錬値.
	 */
	static propNameRefinedCount = "refinedCount";

	/**
	 * プロパティ名：超越段階.
	 */
	static propNameTranscendenceCount = "transcendenceCount";
	
	/**
	 * プロパティ名：カードカテゴリID（第1スロット）.
	 */
	static propNameCardCategoryID1 = "cardCategoryID1";

	/**
	 * プロパティ名：カードID（第1スロット）.
	 */
	static propNameCardID1 = "cardID1";

	/**
	 * プロパティ名：カードカテゴリID（第2スロット）.
	 */
	static propNameCardCategoryID2 = "cardCategoryID2";

	/**
	 * プロパティ名：カードID（第2スロット）.
	 */
	static propNameCardID2 = "cardID2";

	/**
	 * プロパティ名：カードカテゴリID（第3スロット）.
	 */
	static propNameCardCategoryID3 = "cardCategoryID3";

	/**
	 * プロパティ名：カードID（第3スロット）.
	 */
	static propNameCardID3 = "cardID3";

	/**
	 * プロパティ名：カードカテゴリID（第4スロット）.
	 */
	static propNameCardCategoryID4 = "cardCategoryID4";

	/**
	 * プロパティ名：カードID（第4スロット）.
	 */
	static propNameCardID4 = "cardID4";

	/**
	 * プロパティ名：ランダムオプションID（第1スロット）.
	 */
	static propNameRndOptID1 = "rndOptID1";

	/**
	 * プロパティ名：ランダムオプション数値（第1スロット）.
	 */
	static propNameRndOptValue1 = "rndOptValue1";

	/**
	 * プロパティ名：ランダムオプションID（第2スロット）.
	 */
	static propNameRndOptID2 = "rndOptID2";

	/**
	 * プロパティ名：ランダムオプション数値（第2スロット）.
	 */
	static propNameRndOptValue2 = "rndOptValue2";

	/**
	 * プロパティ名：ランダムオプションID（第3スロット）.
	 */
	static propNameRndOptID3 = "rndOptID3";

	/**
	 * プロパティ名：ランダムオプション数値（第3スロット）.
	 */
	static propNameRndOptValue3 = "rndOptValue3";

	/**
	 * プロパティ名：ランダムオプションID（第4スロット）.
	 */
	static propNameRndOptID4 = "rndOptID4";

	/**
	 * プロパティ名：ランダムオプション数値（第4スロット）.
	 */
	static propNameRndOptValue4 = "rndOptValue4";

	/**
	 * プロパティ名：ランダムオプションID（第5スロット）.
	 */
	static propNameRndOptID5 = "rndOptID5";

	/**
	 * プロパティ名：ランダムオプション数値（第5スロット）.
	 */
	static propNameRndOptValue5 = "rndOptValue5";



	/**
	 * プロパティ名：装備位置（右手武器）.
	 */
	static propNameEqpRgnArmsRight = "eqpRgnItemArmsRight";

	/**
	 * プロパティ名：装備位置（左手武器）.
	 */
	static propNameEqpRgnArmsLeft = "eqpRgnItemArmsLeft";

	/**
	 * プロパティ名：装備位置（盾）.
	 */
	static propNameEqpRgnShield = "eqpRgnItemShield";

	/**
	 * プロパティ名：装備位置（頭上段）.
	 */
	static propNameEqpRgnHeadTop = "eqpRgnItemHeadTop";

	/**
	 * プロパティ名：装備位置（頭中段）.
	 */
	static propNameEqpRgnHeadMid = "eqpRgnItemHeadMid";

	/**
	 * プロパティ名：装備位置（頭下段）.
	 */
	static propNameEqpRgnHeadUnder = "eqpRgnItemHeadUnder";

	/**
	 * プロパティ名：装備位置（体）.
	 */
	static propNameEqpRgnBody = "eqpRgnItemBody";

	/**
	 * プロパティ名：装備位置（肩）.
	 */
	static propNameEqpRgnShoulder = "eqpRgnItemShoulder";

	/**
	 * プロパティ名：装備位置（足）.
	 */
	static propNameEqpRgnFoot = "eqpRgnItemFoot";

	/**
	 * プロパティ名：装備位置（アクセ1）.
	 */
	static propNameEqpRgnAccessory1 = "eqpRgnItemAccessory1";

	/**
	 * プロパティ名：装備位置（アクセ2）.
	 */
	static propNameEqpRgnAccessory2 = "eqpRgnItemAccessory2";

	/**
	 * プロパティ名：装備位置（矢）.
	 */
	static propNameEqpRgnArrow = "eqpRgnItemArrow";



	/**
	 * プロパティ名：属性付与.
	 */
	static propNameArmsElement = "armsElement";



	/**
	 * プロパティ名：スキルレベル.
	 */
	static propNameSkillID = "skillID";

	/**
	 * プロパティ名：スキルレベル.
	 */
	static propNameSkillLv = "skillLv";

	/**
	 * プロパティ名：BUFFレベル.
	 */
	static propNameBuffLv = "buffLv";



	/**
	 * プロパティ名：段階的ポーション類.
	 */
	static propNameStagingPots = "stagingPots";

	/**
	 * サブプロパティ名：速度ポーション.
	 */
	static propNameSubSpeedPot = "speedPot";

	/**
	 * サブプロパティ名：HP増加ポーション.
	 */
	static propNameSubHPPot = "hpPot";

	/**
	 * サブプロパティ名：SP増加ポーション.
	 */
	static propNameSubSPPot = "spPot";

	/**
	 * サブプロパティ名：戦闘薬.
	 */
	static propNameSubBattlePot = "battlePot";



	/**
	 * プロパティ名：時限効果ID.
	 */
	static propNameTimeBuffID = "timeBuffID";

	/**
	 * サブプロパティ名：クイックOFF.
	 */
	static propNameSubQuickOff = "quickOff";



	/**
	 * プロパティ名：オートスペルID.
	 */
	static propNameAutoSpellID = "autoSpellID";

	/**
	 * プロパティ名：オートスペルレベル.
	 */
	static propNameAutoSpellLv = "autoSpellLv";

	/**
	 * プロパティ名：オートスペル発動率.
	 */
	static propNameAutoSpellProb = "autoSpellProb";



	/**
	 * プロパティ名：MaxHP+%（符号）.
	 */
	static propNameStMaxHPUpSign = "stMaxHPUpSign";

	/**
	 * プロパティ名：MaxHP+%.
	 */
	static propNameStMaxHPUp = "stMaxHPUp";

	/**
	 * プロパティ名：MaxHP+（符号）.
	 */
	static propNameStMaxHPPlusSign = "stMaxHPPlusSign";

	/**
	 * プロパティ名：MaxHP+.
	 */
	static propNameStMaxHPPlus = "stMaxHPPlus";

	/**
	 * プロパティ名：MaxSP+%（符号）.
	 */
	static propNameStMaxSPUpSign = "stMaxSPUpSign";

	/**
	 * プロパティ名：MaxSP+%.
	 */
	static propNameStMaxSPUp = "stMaxSPUp";

	/**
	 * プロパティ名：MaxSP+（符号）.
	 */
	static propNameStMaxSPPlusSign = "stMaxSPPlusSign";

	/**
	 * プロパティ名：MaxSP+.
	 */
	static propNameStMaxSPPlus = "stMaxSPPlus";

	/**
	 * プロパティ名：HP自然回復力+%（符号）.
	 */
	static propNameStHPRUpSign = "stHPRUpSign";

	/**
	 * プロパティ名：HP自然回復力+%.
	 */
	static propNameStHPRUp = "stHPRUp";

	/**
	 * プロパティ名：SP自然回復力+%（符号）.
	 */
	static propNameStSPRUpSign = "stSPRUpSign";

	/**
	 * プロパティ名：SP自然回復力+%.
	 */
	static propNameStSPRUp = "stSPRUp";

	/**
	 * プロパティ名：基本ステータス（Str）（符号）.
	 */
	static propNameStStrPlusSign = "stStrPlusSign";

	/**
	 * プロパティ名：基本ステータス（Str）.
	 */
	static propNameStStrPlus = "stStrPlus";

	/**
	 * プロパティ名：基本ステータス（Agi）（符号）.
	 */
	static propNameStAgiPlusSign = "stAgiPlusSign";

	/**
	 * プロパティ名：基本ステータス（Agi）.
	 */
	static propNameStAgiPlus = "stAgiPlus";

	/**
	 * プロパティ名：基本ステータス（Vit）（符号）.
	 */
	static propNameStVitPlusSign = "stVitPlusSign";

	/**
	 * プロパティ名：基本ステータス（Vit）.
	 */
	static propNameStVitPlus = "stVitPlus";

	/**
	 * プロパティ名：基本ステータス（Int）（符号）.
	 */
	static propNameStIntPlusSign = "stIntPlusSign";

	/**
	 * プロパティ名：基本ステータス（Int）.
	 */
	static propNameStIntPlus = "stIntPlus";

	/**
	 * プロパティ名：基本ステータス（Dex）（符号）.
	 */
	static propNameStDexPlusSign = "stDexPlusSign";

	/**
	 * プロパティ名：基本ステータス（Dex）.
	 */
	static propNameStDexPlus = "stDexPlus";

	/**
	 * プロパティ名：基本ステータス（Luk）（符号）.
	 */
	static propNameStLukPlusSign = "stLukPlusSign";

	/**
	 * プロパティ名：基本ステータス（Luk）.
	 */
	static propNameStLukPlus = "stLukPlus";

	/**
	 * プロパティ名：補助ステータス（Hit）（符号）.
	 */
	static propNameStHitPlusSign = "stHitPlusSign";

	/**
	 * プロパティ名：補助ステータス（Hit）.
	 */
	static propNameStHitPlus = "stHitPlus";

	/**
	 * プロパティ名：補助ステータス（Flee）（符号）.
	 */
	static propNameStFleePlusSign = "stFleePlusSign";

	/**
	 * プロパティ名：補助ステータス（Flee）.
	 */
	static propNameStFleePlus = "stFleePlus";

	/**
	 * プロパティ名：補助ステータス（Cri）（符号）.
	 */
	static propNameStCriPlusSign = "stCriPlusSign";

	/**
	 * プロパティ名：補助ステータス（Cri）.
	 */
	static propNameStCriPlus = "stCriPlus";

	/**
	 * プロパティ名：補助ステータス（完全回避）（符号）.
	 */
	static propNameStLuckyPlusSign = "stLuckyPlusSign";

	/**
	 * プロパティ名：補助ステータス（完全回避）.
	 */
	static propNameStLuckyPlus = "stLuckyPlus";

	/**
	 * プロパティ名：補助ステータス（ASPD+%）（符号）.
	 */
	static propNameStAspdUpSign = "stAspdUpSign";

	/**
	 * プロパティ名：補助ステータス（ASPD+%）.
	 */
	static propNameStAspdUp = "stAspdUp";

	/**
	 * プロパティ名：補助ステータス（ASPD+）（符号）.
	 */
	static propNameStAspdPlusSign = "stAspdPlusSign";

	/**
	 * プロパティ名：補助ステータス（ASPD+）.
	 */
	static propNameStAspdPlus = "stAspdPlus";

	/**
	 * プロパティ名：変動詠唱時間短縮（符号）.
	 */
	static propNameStCastDownSign = "stCastDownSign";

	/**
	 * プロパティ名：変動詠唱時間短縮.
	 */
	static propNameStCastDown = "stCastDown";

	/**
	 * プロパティ名：固定詠唱時間短縮（符号）.
	 */
	static propNameStFixedDownSign = "stFixedDownSign";

	/**
	 * プロパティ名：固定詠唱時間短縮.
	 */
	static propNameStFixedDown = "stFixedDown";

	/**
	 * プロパティ名：ディレイ時間短縮（符号）.
	 */
	static propNameStDelayDownSign = "stDelayDownSign";

	/**
	 * プロパティ名：ディレイ時間短縮.
	 */
	static propNameStDelayDown = "stDelayDown";

	/**
	 * プロパティ名：消費SP減少（符号）.
	 */
	static propNameStCostDownSign = "stCostDownSign";

	/**
	 * プロパティ名：消費SP減少.
	 */
	static propNameStCostDown = "stCostDown";

	/**
	 * プロパティ名：武器ATK変更.
	 */
	static propNameChangeArmsAtk = "changeArmsAtk";

	/**
	 * プロパティ名：武器MATK変更.
	 */
	static propNameChangeArmsMatk = "changeArmsMatk";

	/**
	 * プロパティ名：武器Lv変更.
	 */
	static propNameChangeArmsLv = "changeArmsLv";

	/**
	 * プロパティ名：補助ステータス（Atk）（符号）.
	 */
	static propNameStAtkPlusSign = "stAtkPlusSign";

	/**
	 * プロパティ名：補助ステータス（Atk）.
	 */
	static propNameStAtkPlus = "stAtkPlus";

	/**
	 * プロパティ名：必中攻撃+%.
	 */
	static propNameStPerfectAttackUp = "stPerfectAttackUp";

	/**
	 * プロパティ名：武器攻撃力+%（符号）.
	 */
	static propNameStWeaponAtkUpSign = "stPerfectAttackSign";

	/**
	 * プロパティ名：武器攻撃力+%.
	 */
	static propNameStWeaponAtkUp = "stPerfectAttack";

	// TODO: 計算組み込み未対応
	/**
	 * プロパティ名：射程変更.
	 */
	static propNameStRange = "stRange";

	/**
	 * プロパティ名：補助ステータス（Matk）（符号）.
	 */
	static propNameStMatkPlusSign = "stMatkPlusSign";

	/**
	 * プロパティ名：補助ステータス（Matk）.
	 */
	static propNameStMatkPlus = "stMatkPlus";

	/**
	 * プロパティ名：補助ステータス（除算Def）（符号）.
	 */
	static propNameStDefDivPlusSign = "stDefDivPlusSign";

	/**
	 * プロパティ名：補助ステータス（除算Def）.
	 */
	static propNameStDefDivPlus = "stDefDivPlus";

	/**
	 * プロパティ名：補助ステータス（除算Mdef）（符号）.
	 */
	static propNameStMdefDivPlusSign = "stMdefDivPlusSign";

	/**
	 * プロパティ名：補助ステータス（除算Mdef）.
	 */
	static propNameStMdefDivPlus = "stMdefDivPlus";

	/**
	 * プロパティ名：ヒール系を使用したときの回復力+%（符号）.
	 */
	static propNameStHealUpUsingSign = "stHealUpUsingSign";

	/**
	 * プロパティ名：ヒール系を使用したときの回復力+%.
	 */
	static propNameStHealUpUsing = "stHealUpUsing";

	/**
	 * プロパティ名：ヒール系を受けたときの回復力+%（符号）.
	 */
	static propNameStHealUpUsedSign = "stHealUpUsedSign";

	/**
	 * プロパティ名：ヒール系を受けたときの回復力+%.
	 */
	static propNameStHealUpUsed = "stHealUpUsed";

	// TODO: 計算組み込み未対応
	/**
	 * プロパティ名：特性ステータス（Pow）（符号）.
	 */
	static propNameStPowPlusSign = "stPowPlusSign";
	/**
	 * プロパティ名：特性ステータス（Pow）.
	 */
	static propNameStPowPlus = "stPowPlus";

	/**
	 * プロパティ名：特性ステータス（Sta）（符号）.
	 */
	static propNameStStaPlusSign = "stStaPlusSign";

	/**
	 * プロパティ名：特性ステータス（Sta）.
	 */
	static propNameStStaPlus = "stStaPlus";

	/**
	 * プロパティ名：特性ステータス（Wis）（符号）.
	 */
	static propNameStWisPlusSign = "stWisPlusSign";

	/**
	 * プロパティ名：特性ステータス（Wis）.
	 */
	static propNameStWisPlus = "stWisPlus";

	/**
	 * プロパティ名：特性ステータス（Spl）（符号）.
	 */
	static propNameStSplPlusSign = "stSplPlusSign";

	/**
	 * プロパティ名：特性ステータス（Spl）.
	 */
	static propNameStSplPlus = "stSplPlus";

	/**
	 * プロパティ名：特性ステータス（Con）（符号）.
	 */
	static propNameStConPlusSign = "stConPlusSign";

	/**
	 * プロパティ名：特性ステータス（Con）.
	 */
	static propNameStConPlus = "stConPlus";

	/**
	 * プロパティ名：特性ステータス（Crt）（符号）.
	 */
	static propNameStCrtPlusSign = "stCrtPlusSign";

	/**
	 * プロパティ名：特性ステータス（Crt）.
	 */
	static propNameStCrtPlus = "stCrtPlus";

	/**
	 * プロパティ名：特性ステータス（PAtk）（符号）.
	 */
	static propNameStPAtkPlusSign = "stPAtkPlusSign";

	/**
	 * プロパティ名：特性ステータス（PAtk）.
	 */
	static propNameStPAtkPlus = "stPAtkPlus";

	/**
	 * プロパティ名：特性ステータス（SMatk）（符号）.
	 */
	static propNameStSMatkPlusSign = "stSMatkPlusSign";

	/**
	 * プロパティ名：特性ステータス（SMatk）.
	 */
	static propNameStSMatkPlus = "stSMatkPlus";

	/**
	 * プロパティ名：特性ステータス（HPlus）（符号）.
	 */
	static propNameStHPlusPlusSign = "stHPlusPlusSign";

	/**
	 * プロパティ名：特性ステータス（HPlus）.
	 */
	static propNameStHPlusPlus = "stHPlusPlus";

	/**
	 * プロパティ名：特性ステータス（CRate）（符号）.
	 */
	static propNameStCRatePlusSign = "stCRatePlusSign";

	/**
	 * プロパティ名：特性ステータス（CRate）.
	 */
	static propNameStCRatePlus = "stCRatePlus";

	/**
	 * プロパティ名：特性ステータス（Res）（符号）.
	 */
	static propNameStResPlusSign = "stResPlusSign";

	/**
	 * プロパティ名：特性ステータス（Res）.
	 */
	static propNameStResPlus = "stResPlus";

	/**
	 * プロパティ名：特性ステータス（Mres）（符号）.
	 */
	static propNameStMresPlusSign = "stMresPlusSign";

	/**
	 * プロパティ名：特性ステータス（Mres）.
	 */
	static propNameStMresPlus = "stMresPlus";

	/**
	 * サブプロパティ名：設定無効化.
	 */
	static propNameSubInvalidateSettings = "invalidateSettings";



	/**
	 * 特化種別（攻撃:10／防御:20｜物理:1／魔法:2／すべて:3）.
	 */
	static instanceKind = "instanceKind";

	/**
	 * プロパティ名：特化（ダメージ）（符号）.
	 */
	static propNameSpecDamageSign = "specDamageSign";

	/**
	 * プロパティ名：特化（ダメージ）.
	 */
	static propNameSpecDamage = "specDamage";

	/**
	 * プロパティ名：特化（クリティカルダメージ）（符号）.
	 */
	static propNameSpecCriticalDamageSign = "specCriticalDamageSign";

	/**
	 * プロパティ名：特化（クリティカルダメージ）.
	 */
	static propNameSpecCriticalDamage = "specCriticalDamage";

	/**
	 * プロパティ名：特化（マップ）（符号）.
	 */
	static propNameSpecMapSign = "specMapSign";

	/**
	 * プロパティ名：特化（マップ）.
	 */
	static propNameSpecMap = "specMap";

	/**
	 * プロパティ名：特化（種族：無形）（符号）.
	 */
	static propNameSpecRaceSolidSign = "specRaceSolidSign";

	/**
	 * プロパティ名：特化（種族：無形）.
	 */
	static propNameSpecRaceSolid = "specRaceSolid";

	/**
	 * プロパティ名：特化（種族：不死）（符号）.
	 */
	static propNameSpecRaceUndeadSign = "specRaceUndeadSign";

	/**
	 * プロパティ名：特化（種族：不死）.
	 */
	static propNameSpecRaceUndead = "specRaceUndead";

	/**
	 * プロパティ名：特化（種族：動物）（符号）.
	 */
	static propNameSpecRaceAnimalSign = "specRaceAnimalSign";

	/**
	 * プロパティ名：特化（種族：動物）.
	 */
	static propNameSpecRaceAnimal = "specRaceAnimal";

	/**
	 * プロパティ名：特化（種族：植物）（符号）.
	 */
	static propNameSpecRacePlantSign = "specRacePlantSign";

	/**
	 * プロパティ名：特化（種族：植物）.
	 */
	static propNameSpecRacePlant = "specRacePlant";

	/**
	 * プロパティ名：特化（種族：昆虫）（符号）.
	 */
	static propNameSpecRaceInsectSign = "specRaceInsectSign";

	/**
	 * プロパティ名：特化（種族：昆虫）.
	 */
	static propNameSpecRaceInsect = "specRaceInsect";

	/**
	 * プロパティ名：特化（種族：魚介）（符号）.
	 */
	static propNameSpecRaceFishSign = "specRaceFishSign";

	/**
	 * プロパティ名：特化（種族：魚介）.
	 */
	static propNameSpecRaceFish = "specRaceFish";

	/**
	 * プロパティ名：特化（種族：悪魔）（符号）.
	 */
	static propNameSpecRaceDemonSign = "specRaceDemonSign";

	/**
	 * プロパティ名：特化（種族：悪魔）.
	 */
	static propNameSpecRaceDemon = "specRaceDemon";

	/**
	 * プロパティ名：特化（種族：人間）（符号）.
	 */
	static propNameSpecRaceHumanSign = "specRaceHumanSign";

	/**
	 * プロパティ名：特化（種族：人間）.
	 */
	static propNameSpecRaceHuman = "specRaceHuman";

	/**
	 * プロパティ名：特化（種族：天使）（符号）.
	 */
	static propNameSpecRaceAngelSign = "specRaceAngelSign";

	/**
	 * プロパティ名：特化（種族：天使）.
	 */
	static propNameSpecRaceAngel = "specRaceAngel";

	/**
	 * プロパティ名：特化（種族：竜）（符号）.
	 */
	static propNameSpecRaceDragonSign = "specRaceDragonSign";

	/**
	 * プロパティ名：特化（種族：竜）.
	 */
	static propNameSpecRaceDragon = "specRaceDragon";

	/**
	 * プロパティ名：特化（種族：ドラム）（符号）.
	 */
	static propNameSpecRaceDoramSign = "specRaceDoramSign";

	/**
	 * プロパティ名：特化（種族：ドラム）.
	 */
	static propNameSpecRaceDoram = "specRaceDoram";

	/**
	 * プロパティ名：特化（種族：すべて）（符号）.
	 */
	static propNameSpecRaceAllSign = "specRaceAllSign";

	/**
	 * プロパティ名：特化（種族：すべて）.
	 */
	static propNameSpecRaceAll = "specRaceAll";

	/**
	 * プロパティ名：特化（種族：人間（プレイヤー除く））（符号）.
	 */
	static propNameSpecRaceHumanNotPlayerSign = "specRaceHumanNotPlayerSign";

	/**
	 * プロパティ名：特化（種族：人間（プレイヤー除く））.
	 */
	static propNameSpecRaceHumanNotPlayer = "specRaceHumanNotPlayer";

	/**
	 * プロパティ名：特化（攻撃属性：無）（符号）.
	 */
	static propNameSpecAttackElementVanitySign = "specAttackElementVanitySign";

	/**
	 * プロパティ名：特化（攻撃属性：無）.
	 */
	static propNameSpecAttackElementVanity = "specAttackElementVanity";

	/**
	 * プロパティ名：特化（攻撃属性：水）（符号）.
	 */
	static propNameSpecAttackElementWaterSign = "specAttackElementWaterSign";

	/**
	 * プロパティ名：特化（攻撃属性：水）.
	 */
	static propNameSpecAttackElementWater = "specAttackElementWater";

	/**
	 * プロパティ名：特化（攻撃属性：地）（符号）.
	 */
	static propNameSpecAttackElementEarthSign = "specAttackElementEarthSign";

	/**
	 * プロパティ名：特化（攻撃属性：地）.
	 */
	static propNameSpecAttackElementEarth = "specAttackElementEarth";

	/**
	 * プロパティ名：特化（攻撃属性：火）（符号）.
	 */
	static propNameSpecAttackElementFireSign = "specAttackElementFireSign";

	/**
	 * プロパティ名：特化（攻撃属性：火）.
	 */
	static propNameSpecAttackElementFire = "specAttackElementFire";

	/**
	 * プロパティ名：特化（攻撃属性：風）（符号）.
	 */
	static propNameSpecAttackElementWindSign = "specAttackElementWindSign";

	/**
	 * プロパティ名：特化（攻撃属性：風）.
	 */
	static propNameSpecAttackElementWind = "specAttackElementWind";

	/**
	 * プロパティ名：特化（攻撃属性：毒）（符号）.
	 */
	static propNameSpecAttackElementPoisonSign = "specAttackElementPoisonSign";

	/**
	 * プロパティ名：特化（攻撃属性：毒）.
	 */
	static propNameSpecAttackElementPoison = "specAttackElementPoison";

	/**
	 * プロパティ名：特化（攻撃属性：聖）（符号）.
	 */
	static propNameSpecAttackElementHolySign = "specAttackElementHolySign";

	/**
	 * プロパティ名：特化（攻撃属性：聖）.
	 */
	static propNameSpecAttackElementHoly = "specAttackElementHoly";

	/**
	 * プロパティ名：特化（攻撃属性：闇）（符号）.
	 */
	static propNameSpecAttackElementDarkSign = "specAttackElementDarkSign";

	/**
	 * プロパティ名：特化（攻撃属性：闇）.
	 */
	static propNameSpecAttackElementDark = "specAttackElementDark";

	/**
	 * プロパティ名：特化（攻撃属性：念）（符号）.
	 */
	static propNameSpecAttackElementPsycoSign = "specAttackElementPsycoSign";

	/**
	 * プロパティ名：特化（攻撃属性：念）.
	 */
	static propNameSpecAttackElementPsyco = "specAttackElementPsyco";

	/**
	 * プロパティ名：特化（攻撃属性：不死）（符号）.
	 */
	static propNameSpecAttackElementUndeadSign = "specAttackElementUndeadSign";

	/**
	 * プロパティ名：特化（攻撃属性：不死）.
	 */
	static propNameSpecAttackElementUndead = "specAttackElementUndead";

	/**
	 * プロパティ名：特化（攻撃属性：すべて）（符号）.
	 */
	static propNameSpecAttackElementAllSign = "specAttackElementAllSign";

	/**
	 * プロパティ名：特化（攻撃属性：すべて）.
	 */
	static propNameSpecAttackElementAll = "specAttackElementAll";

	/**
	 * プロパティ名：特化（敵属性：無）（符号）.
	 */
	static propNameSpecMobElementVanitySign = "specMobElementVanitySign";

	/**
	 * プロパティ名：特化（敵属性：無）.
	 */
	static propNameSpecMobElementVanity = "specMobElementVanity";

	/**
	 * プロパティ名：特化（敵属性：水）（符号）.
	 */
	static propNameSpecMobElementWaterSign = "specMobElementWaterSign";

	/**
	 * プロパティ名：特化（敵属性：水）.
	 */
	static propNameSpecMobElementWater = "specMobElementWater";

	/**
	 * プロパティ名：特化（敵属性：地）（符号）.
	 */
	static propNameSpecMobElementEarthSign = "specMobElementEarthSign";

	/**
	 * プロパティ名：特化（敵属性：地）.
	 */
	static propNameSpecMobElementEarth = "specMobElementEarth";

	/**
	 * プロパティ名：特化（敵属性：火）（符号）.
	 */
	static propNameSpecMobElementFireSign = "specMobElementFireSign";

	/**
	 * プロパティ名：特化（敵属性：火）.
	 */
	static propNameSpecMobElementFire = "specMobElementFire";

	/**
	 * プロパティ名：特化（敵属性：風）（符号）.
	 */
	static propNameSpecMobElementWindSign = "specMobElementWindSign";

	/**
	 * プロパティ名：特化（敵属性：風）.
	 */
	static propNameSpecMobElementWind = "specMobElementWind";

	/**
	 * プロパティ名：特化（敵属性：毒）（符号）.
	 */
	static propNameSpecMobElementPoisonSign = "specMobElementPoisonSign";

	/**
	 * プロパティ名：特化（敵属性：毒）.
	 */
	static propNameSpecMobElementPoison = "specMobElementPoison";

	/**
	 * プロパティ名：特化（敵属性：聖）（符号）.
	 */
	static propNameSpecMobElementHolySign = "specMobElementHolySign";

	/**
	 * プロパティ名：特化（敵属性：聖）.
	 */
	static propNameSpecMobElementHoly = "specMobElementHoly";

	/**
	 * プロパティ名：特化（敵属性：闇）（符号）.
	 */
	static propNameSpecMobElementDarkSign = "specMobElementDarkSign";

	/**
	 * プロパティ名：特化（敵属性：闇）.
	 */
	static propNameSpecMobElementDark = "specMobElementDark";

	/**
	 * プロパティ名：特化（敵属性：念）（符号）.
	 */
	static propNameSpecMobElementPsycoSign = "specMobElementPsycoSign";

	/**
	 * プロパティ名：特化（敵属性：念）.
	 */
	static propNameSpecMobElementPsyco = "specMobElementPsyco";

	/**
	 * プロパティ名：特化（敵属性：不死）（符号）.
	 */
	static propNameSpecMobElementUndeadSign = "specMobElementUndeadSign";

	/**
	 * プロパティ名：特化（敵属性：不死）.
	 */
	static propNameSpecMobElementUndead = "specMobElementUndead";

	/**
	 * プロパティ名：特化（敵属性：すべて）（符号）.
	 */
	static propNameSpecMobElementAllSign = "specMobElementAllSign";

	/**
	 * プロパティ名：特化（敵属性：すべて）.
	 */
	static propNameSpecMobElementAll = "specMobElementAll";

	/**
	 * プロパティ名：特化（サイズ：小型）（符号）.
	 */
	static propNameSpecSizeSmallSign = "specSizeSmallSign";

	/**
	 * プロパティ名：特化（サイズ：小型）.
	 */
	static propNameSpecSizeSmall = "specSizeSmall";

	/**
	 * プロパティ名：特化（サイズ：中型）（符号）.
	 */
	static propNameSpecSizeMediumSign = "specSizeMediumSign";

	/**
	 * プロパティ名：特化（サイズ：中型）.
	 */
	static propNameSpecSizeMedium = "specSizeMedium";

	/**
	 * プロパティ名：特化（サイズ：大型）（符号）.
	 */
	static propNameSpecSizeLargeSign = "specSizeLargeSign";

	/**
	 * プロパティ名：特化（サイズ：大型）.
	 */
	static propNameSpecSizeLarge = "specSizeLarge";

	/**
	 * プロパティ名：特化（サイズ：すべて）（符号）.
	 */
	static propNameSpecSizeAllSign = "specSizeAllSign";

	/**
	 * プロパティ名：特化（サイズ：すべて）.
	 */
	static propNameSpecSizeAll = "specSizeAll";

	/**
	 * プロパティ名：特化（ボス属性：ボス）（符号）.
	 */
	static propNameSpecBossTypeBossSign = "specBossTypeBossSign";

	/**
	 * プロパティ名：特化（ボス属性：ボス）.
	 */
	static propNameSpecBossTypeBoss = "specBossTypeBoss";

	/**
	 * プロパティ名：特化（ボス属性：一般）（符号）.
	 */
	static propNameSpecBossTypeNormalSign = "specBossTypeNormalSign";

	/**
	 * プロパティ名：特化（ボス属性：一般）.
	 */
	static propNameSpecBossTypeNormal = "specBossTypeNormal";

	/**
	 * プロパティ名：特化（ボス属性：すべて）（符号）.
	 */
	static propNameSpecBossTypeAllSign = "specBossTypeAllSign";

	/**
	 * プロパティ名：特化（ボス属性：すべて）.
	 */
	static propNameSpecBossTypeAll = "specBossTypeAll";

	/**
	 * プロパティ名：特化（射程：近距離）（符号）.
	 */
	static propNameSpecRangeShortSign = "specRangeShortSign";

	/**
	 * プロパティ名：特化（射程：近距離）.
	 */
	static propNameSpecRangeShort = "specRangeShort";

	/**
	 * プロパティ名：特化（射程：遠距離）（符号）.
	 */
	static propNameSpecRangeLongSign = "specRangeLongSign";

	/**
	 * プロパティ名：特化（射程：遠距離）.
	 */
	static propNameSpecRangeLong = "specRangeLong";

	/**
	 * プロパティ名：特化（射程：すべて）（符号）.
	 */
	static propNameSpecRangeAllSign = "specRangeAllSign";

	/**
	 * プロパティ名：特化（射程：すべて）.
	 */
	static propNameSpecRangeAll = "specRangeAll";

	/**
	 * プロパティ名：特化（プレイヤー：人間）（符号）.
	 */
	static propNameSpecPlayerHumanSign = "specPlayerHumanSign";

	/**
	 * プロパティ名：特化（プレイヤー：人間）.
	 */
	static propNameSpecPlayerHuman = "specPlayerHuman";

	/**
	 * プロパティ名：特化（プレイヤー：ドラム）（符号）.
	 */
	static propNameSpecPlayerDoramSign = "specPlayerDoramSign";

	/**
	 * プロパティ名：特化（プレイヤー：ドラム）.
	 */
	static propNameSpecPlayerDoram = "specPlayerDoram";

	/**
	 * プロパティ名：特化（プレイヤー：すべて）（符号）.
	 */
	static propNameSpecPlayerAllSign = "specPlayerAllSign";

	/**
	 * プロパティ名：特化（プレイヤー：すべて）.
	 */
	static propNameSpecPlayerAll = "specPlayerAll";

	/**
	 * プロパティ名：防御無視（種族：すべて）.
	 */
	static propNameIgnoreDefenceRaceAll = "ignoreDefenceRaceAll";

	/**
	 * プロパティ名：錐効果.
	 */
	static propNameKiriEffect = "kiriEffect";



	/**
	 * プロパティ名：ダメージ上昇条件タイプ.
	 */
	static propNameSpecDamageUpConditionType = "specDamageUpConditionType";

	/**
	 * プロパティ名：ダメージ上昇条件値.
	 */
	static propNameSpecDamageUpConditionValue = "specDamageUpConditionValue";

	/**
	 * プロパティ名：ダメージ上昇量（符号）.
	 */
	static propNameSpecDamageUpSign = "specDamageUpSign";

	/**
	 * プロパティ名：ダメージ上昇量.
	 */
	static propNameSpecDamageUp = "specDamageUp";

	/**
	 * プロパティ名：消費SP減少（－）（符号）.
	 */
	static propNameSpecCostSPMinusSign = "specCostSPMinusSign";

	/**
	 * プロパティ名：消費SP減少（－）.
	 */
	static propNameSpecCostSPMinus = "specCostSPMinus";

	/**
	 * プロパティ名：消費SP減少（％）（符号）.
	 */
	static propNameSpecCostSPDownSign = "specCostSPDownSign";

	/**
	 * プロパティ名：消費SP減少（％）.
	 */
	static propNameSpecCostSPDown = "specCostSPDown";

	/**
	 * プロパティ名：変動詠唱時間減少（－）（符号）.
	 */
	static propNameSpecCastTimeMinusSign = "specCastTimeMinusSign";

	/**
	 * プロパティ名：変動詠唱時間減少（－）.
	 */
	static propNameSpecCastTimeMinus = "specCastTimeMinus";

	/**
	 * プロパティ名：変動詠唱時間減少（％）（符号）.
	 */
	static propNameSpecCastTimeDownSign = "specCastTimeDownSign";

	/**
	 * プロパティ名：変動詠唱時間減少（％）.
	 */
	static propNameSpecCastTimeDown = "specCastTimeDown";

	/**
	 * プロパティ名：固定詠唱時間減少（－）（符号）.
	 */
	static propNameSpecFixedTimeMinusSign = "specFixedTimeMinusSign";

	/**
	 * プロパティ名：固定詠唱時間減少（－）.
	 */
	static propNameSpecFixedTimeMinus = "specFixedTimeMinus";

	/**
	 * プロパティ名：固定詠唱時間減少（％）（符号）.
	 */
	static propNameSpecFixedTimeDownSign = "specFixedTimeDownSign";

	/**
	 * プロパティ名：固定詠唱時間減少（％）.
	 */
	static propNameSpecFixedTimeDown = "specFixedTimeDown";

	/**
	 * プロパティ名：クールタイム減少（－）（符号）.
	 */
	static propNameSpecCoolTimeMinusSign = "specCoolTimeMinusSign";

	/**
	 * プロパティ名：クールタイム減少（－）.
	 */
	static propNameSpecCoolTimeMinus = "specCoolTimeMinus";

	/**
	 * プロパティ名：クールタイム減少（％）（符号）.
	 */
	static propNameSpecCoolTimeDownSign = "specCoolTimeDownSign";

	/**
	 * プロパティ名：クールタイム減少（％）.
	 */
	static propNameSpecCoolTimeDown = "specCoolTimeDown";



	/**
	 * プロパティ名：MaxHP.
	 */
	static propNameStMaxHP = "stMaxHP";

	/**
	 * プロパティ名：除算DEF.
	 */
	static propNameStDefDiv = "stDefDiv";

	/**
	 * プロパティ名：減算DEF.
	 */
	static propNameStDefMinus = "stDefMinus";

	/**
	 * プロパティ名：除算MDEF.
	 */
	static propNameStMdefDiv = "stMdefDiv";

	/**
	 * プロパティ名：減算MDEF.
	 */
	static propNameStMdefMinus = "stMdefMinus";

	/**
	 * プロパティ名：FLEE.
	 */
	static propNameStFlee = "stFlee";

	/**
	 * プロパティ名：完全回避.
	 */
	static propNameStLucky = "stLucky";

	/**
	 * プロパティ名：防御属性.
	 */
	static propNameStBodyElement = "stBodyElement";

	/**
	 * プロパティ名：人間形耐性（符号）.
	 */
	static propNameStResistRaceHumanSign = "stResistRaceHumanSign";

	/**
	 * プロパティ名：人間形耐性.
	 */
	static propNameStResistRaceHuman = "stResistRaceHuman";

	/**
	 * プロパティ名：中型耐性（符号）.
	 */
	static propNameStResistSizeMediumSign = "stResistSizeMediumSign";

	/**
	 * プロパティ名：中型耐性.
	 */
	static propNameStResistSizeMedium = "stResistSizeMedium";

	/**
	 * プロパティ名：遠距離耐性（符号）.
	 */
	static propNameStResistRangeLongSign = "stResistRangeLongSign";

	/**
	 * プロパティ名：遠距離耐性.
	 */
	static propNameStResistRangeLong = "stResistRangeLong";

	/**
	 * プロパティ名：属性耐性（無）（符号）.
	 */
	static propNameStResistElementVanitySign = "stResistElementVanitySign";

	/**
	 * プロパティ名：属性耐性（無）.
	 */
	static propNameStResistElementVanity = "stResistElementVanity";

	/**
	 * プロパティ名：属性耐性（水）（符号）.
	 */
	static propNameStResistElementWaterSign = "stResistElementWaterSign";

	/**
	 * プロパティ名：属性耐性（水）.
	 */
	static propNameStResistElementWater = "stResistElementWater";

	/**
	 * プロパティ名：属性耐性（地）（符号）.
	 */
	static propNameStResistElementEarthSign = "stResistElementEarthSign";

	/**
	 * プロパティ名：属性耐性（地）.
	 */
	static propNameStResistElementEarth = "stResistElementEarth";

	/**
	 * プロパティ名：属性耐性（火）（符号）.
	 */
	static propNameStResistElementFireSign = "stResistElementFireSign";

	/**
	 * プロパティ名：属性耐性（火）.
	 */
	static propNameStResistElementFire = "stResistElementFire";

	/**
	 * プロパティ名：属性耐性（風）（符号）.
	 */
	static propNameStResistElementWindSign = "stResistElementWindSign";

	/**
	 * プロパティ名：属性耐性（風）.
	 */
	static propNameStResistElementWind = "stResistElementWind";

	/**
	 * プロパティ名：属性耐性（毒）（符号）.
	 */
	static propNameStResistElementPoisonSign = "stResistElementPoisonSign";

	/**
	 * プロパティ名：属性耐性（毒）.
	 */
	static propNameStResistElementPoison = "stResistElementPoison";

	/**
	 * プロパティ名：属性耐性（聖）（符号）.
	 */
	static propNameStResistElementHolySign = "stResistElementHolySign";

	/**
	 * プロパティ名：属性耐性（聖）.
	 */
	static propNameStResistElementHoly = "stResistElementHoly";

	/**
	 * プロパティ名：属性耐性（闇）（符号）.
	 */
	static propNameStResistElementDarkSign = "stResistElementDarkSign";

	/**
	 * プロパティ名：属性耐性（闇）.
	 */
	static propNameStResistElementDark = "stResistElementDark";

	/**
	 * プロパティ名：属性耐性（念）（符号）.
	 */
	static propNameStResistElementPsycoSign = "stResistElementPsycoSign";

	/**
	 * プロパティ名：属性耐性（念）.
	 */
	static propNameStResistElementPsyco = "stResistElementPsyco";

	/**
	 * プロパティ名：属性耐性（不死）（符号）.
	 */
	static propNameStResistElementUndeadSign = "stResistElementUndeadSign";

	/**
	 * プロパティ名：属性耐性（不死）.
	 */
	static propNameStResistElementUndead = "stResistElementUndead";

	/**
	 * プロパティ名：一般モンスター耐性（符号）.
	 */
	static propNameStResistBossNormalSign = "stResistBossNormalSign";

	/**
	 * プロパティ名：一般モンスター耐性.
	 */
	static propNameStResistBossNormal = "stResistBossNormal";

	/**
	 * プロパティ名：属性モンスター耐性（符号）.
	 */
	static propNameStResistMonsterElementAnySign = "stResistMonsterElementAnySign";

	/**
	 * プロパティ名：属性モンスター耐性.
	 */
	static propNameStResistMonsterElementAny = "stResistMonsterElementAny";

	/**
	 * プロパティ名：物理耐性（符号）.
	 */
	static propNameStResistPhysicalSign = "stResistPhysicalSign";

	/**
	 * プロパティ名：物理耐性.
	 */
	static propNameStResistPhysical = "stResistPhysical";

	/**
	 * プロパティ名：魔法耐性（符号）.
	 */
	static propNameStResistMagicalSign = "stResistMagicalSign";

	/**
	 * プロパティ名：魔法耐性.
	 */
	static propNameStResistMagical = "stResistMagical";

	/**
	 * プロパティ名：ドラム形耐性（符号）.
	 */
	static propNameStResistRaceDoramSign = "stResistRaceDoramSign";

	/**
	 * プロパティ名：ドラム形耐性.
	 */
	static propNameStResistRaceDoram = "stResistRaceDoram";

	/**
	 * プロパティ名：エナジーコート.
	 */
	static propNameBuffEnergyCoat = "buffEnergyCoat";

	/**
	 * プロパティ名：反射1（詳細不明）.
	 */
	static propNameBuffHansha1 = "buffHansha1";

	/**
	 * プロパティ名：反射2（詳細不明）.
	 */
	static propNameBuffHansha2 = "buffHansha2";

	/**
	 * プロパティ名：BaseLv.
	 */
	static propNameStBaseLv = "stBaseLv";

	/**
	 * プロパティ名：所持重量（現在）.
	 */
	static propNameStWeightNow = "stWeightNow";

	/**
	 * プロパティ名：所持重量（最大）.
	 */
	static propNameStWeightMax = "stWeightMax";

	/**
	 * プロパティ名：戦闘エリア.
	 */
	static propNameConfBattleArea = "confBattleArea";

	/**
	 * プロパティ名：小型耐性（符号）.
	 */
	static propNameStResistSizeSmallSign = "stResistSizeSmallSign";

	/**
	 * プロパティ名：小型耐性.
	 */
	static propNameStResistSizeSmall = "stResistSizeSmall";

	/**
	 * プロパティ名：種族.
	 */
	static propNameStRace = "stRace";



	/**
	 * プロパティ名：MobLv.
	 */
	static propNameMobLv = "mobLv";

	/**
	 * プロパティ名：MobHP.
	 */
	static propNameMobHP = "mobHP";

	/**
	 * プロパティ名：補助ステータス（Atk）.
	 */
	static propNameStAtk = "stAtk";

	/**
	 * プロパティ名：補助ステータス（Matk）.
	 */
	static propNameStMatk = "stMatk";

	/**
	 * プロパティ名：補助ステータス（射程）.
	 */
	static propNameStRange = "stRange";

	/**
	 * プロパティ名：補助ステータス（除算Def）.
	 */
	static propNameStDefDiv = "stDefDiv";

	/**
	 * プロパティ名：補助ステータス（除算Mdef）.
	 */
	static propNameStMdefDiv = "stMdefDiv";

	/**
	 * プロパティ名：BaseExp.
	 */
	static propNameBaseExp = "baseExp";

	/**
	 * プロパティ名：JobExp.
	 */
	static propNameJobExp = "jobExp";

	/**
	 * プロパティ名：サイズ.
	 */
	static propNameMobSize = "mobSize";

	/**
	 * プロパティ名：属性.
	 */
	static propNameMobElement = "mobElement";

	/**
	 * プロパティ名：種族.
	 */
	static propNameMobRace = "mobRace";

	/**
	 * プロパティ名：ボス属性.
	 */
	static propNameMobBossType = "mobBossType";

	/**
	 * プロパティ名：草属性.
	 */
	static propNameMobGrassType = "mobGrassType";

	/**
	 * プロパティ名：特性ステータス（PAtk）.
	 */
	static propNameStPAtk = "stPAtk";

	/**
	 * プロパティ名：特性ステータス（SMatk）.
	 */
	static propNameStSMatk = "stSMatk";

	/**
	 * プロパティ名：特性ステータス（HPlus）.
	 */
	static propNameStHPlus = "stHPlus";

	/**
	 * プロパティ名：特性ステータス（CRate）.
	 */
	static propNameStCRate = "stCRate";

	/**
	 * プロパティ名：特性ステータス（Res）.
	 */
	static propNameStRes = "stRes";

	/**
	 * プロパティ名：特性ステータス（Mres）.
	 */
	static propNameStMres = "stMres";



	/**
	 * プロパティ名：攻撃スキルID.
	 */
	static propNameAttackSkillID = "attackSkillID";

	/**
	 * プロパティ名：攻撃スキルソース（自己習得、オートスペル等）.
	 */
	static propNameSourceTypeID = "sourceTypeID";

	/**
	 * プロパティ名：攻撃スキルレベル.
	 */
	static propNameAttackSkillLv = "attackSkillLv";

	/**
	 * プロパティ名：攻撃スキルオプション設定.
	 */
	static propNameAttackSkillOption = "attackSkillOption";

	/**
	 * プロパティ名：モンスター地域ID.
	 */
	static propNameMonsterMapCategoryID = "monsterMapCategoryID";

	/**
	 * プロパティ名：モンスターマップID.
	 */
	static propNameMonsterMapID = "monsterMapID";

	/**
	 * プロパティ名：モンスターID.
	 */
	static propNameMonsterID = "monsterID";

	/**
	 * プロパティ名：攻撃方法変更時自動計算.
	 */
	static propNameAttackAutoCalc = "attackAutoCalc";

	/**
	 * プロパティ名：確認ダイアログ有効化スイッチ
	 */
	static propNameConfirmDialogSwitch = "confirmDialogSwitch";

	/**
	 * プロパティ名：戦闘結果3桁区切り.
	 */
	static propNameResultDigit3 = "resultDigit3";

	/**
	 * プロパティ名：ステータスポイント上限設定.
	 */
	static propNamePointCap = "pointCap";

	/**
	 * プロパティ名：DPS計算設定設定.
	 */
	static propNameDPSActual = "DPSActual";

	/**
	 * プロパティ名：攻撃間隔.
	 */
	static propNameAttackInterval = "attackInterval";

	/**
	 * プロパティ名：詠唱シミュレータ更新間隔.
	 */
	static propNameCastSimInterval = "castSimInterval";

	/**
	 * プロパティ名：カスタム表示スイッチ
	 */
	static propNameFloatingInfoAreaSwitch = "floatingInfoAreaSwitch";

	/**
	 * プロパティ名：カスタム表示生成数
	 */
	static propNameFloatingInfoAreaCount = "floatingInfoAreaCount";

	/**
	 * プロパティ名：カスタム表示文字サイズ
	 */
	static propNameFloatingInfoAreaFontSize = "floatingInfoAreaFontSize";

	/**
	 * プロパティ名：カスタム表示１カテゴリ名
	 */
	static propNameFloatingInfo1CategoryName = "floatingInfo1CategoryName";

	/**
	 * プロパティ名：カスタム表示１情報名
	 */
	static propNameFloatingInfo1InfoName = "floatingInfo1InfoName";

	/**
	 * プロパティ名：カスタム表示２カテゴリ名
	 */
	static propNameFloatingInfo2CategoryName = "floatingInfo2CategoryName";

	/**
	 * プロパティ名：カスタム表示２情報名
	 */
	static propNameFloatingInfo2InfoName = "floatingInfo2InfoName";

	/**
	 * プロパティ名：カスタム表示３カテゴリ名
	 */
	static propNameFloatingInfo3CategoryName = "floatingInfo3CategoryName";

	/**
	 * プロパティ名：カスタム表示３情報名
	 */
	static propNameFloatingInfo3InfoName = "floatingInfo3InfoName";

	/**
	 * プロパティ名：カスタム表示４カテゴリ名
	 */
	static propNameFloatingInfo4CategoryName = "floatingInfo4CategoryName";

	/**
	 * プロパティ名：カスタム表示４情報名
	 */
	static propNameFloatingInfo4InfoName = "floatingInfo4InfoName";

	/**
	 * プロパティ名：カスタム表示５カテゴリ名
	 */
	static propNameFloatingInfo5CategoryName = "floatingInfo5CategoryName";

	/**
	 * プロパティ名：カスタム表示５情報名
	 */
	static propNameFloatingInfo5InfoName = "floatingInfo5InfoName";

	/**
	 * プロパティ名：カスタム表示6カテゴリ名
	 */
	static propNameFloatingInfo6CategoryName = "floatingInfo6CategoryName";

	/**
	 * プロパティ名：カスタム表示6情報名
	 */
	static propNameFloatingInfo6InfoName = "floatingInfo6InfoName";

	/**
	 * プロパティ名：カスタム表示7カテゴリ名
	 */
	static propNameFloatingInfo7CategoryName = "floatingInfo7CategoryName";

	/**
	 * プロパティ名：カスタム表示7情報名
	 */
	static propNameFloatingInfo7InfoName = "floatingInfo7InfoName";

	/**
	 * プロパティ名：アイテム情報スイッチ
	 */
	static propNameItemInfoSwitch = "itemInfoSwitch";

	/**
	 * プロパティ名：アイテム情報自動表示スイッチ
	 */
	static propNameItemInfoAutoSwitch = "itemInfoAutoSwitch";

	/**
	 * プロパティ名：アイテム情報時限効果スイッチ
	 */
	static propNameItemInfoTimeEffectSwitch = "itemInfoTimeEffectSwitch";

	/**
	 * プロパティ値：装備位置種別（アイテム）.
	 */
	static eqpRgnKindItem = 1;

	/**
	 * プロパティ値：装備位置種別（衣装）.
	 */
	static eqpRgnKindCostume = 2;

	/**
	 * プロパティ値：装備位置種別（シャドウ装備）.
	 */
	static eqpRgnKindShadow = 3;



	/**
	 * プロパティ値：特化種別（攻撃｜物理）.
	 */
	static specKindAttackPhysical = 11;

	/**
	 * プロパティ値：特化種別（攻撃｜魔法）.
	 */
	static specKindAttackMagical = 12;

	/**
	 * プロパティ値：特化種別（攻撃｜すべて）.
	 */
	static specKindAttackAny = 13;

	/**
	 * プロパティ値：特化種別（防御｜すべて）.
	 */
	static specKindDefencekAny = 23;



	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 100）.
	 */
	static propBitsMaxAbs100 = 7;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 200）.
	 */
	static propBitsMaxAbs200 = 8;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 500）.
	 */
	static propBitsMaxAbs500 = 9;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 1k）.
	 */
	static propBitsMaxAbs1k = 10;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 4k）.
	 */
	static propBitsMaxAbs4k = 12;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 10k）.
	 */
	static propBitsMaxAbs10k = 14;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 100k）.
	 */
	static propBitsMaxAbs100k = 17;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 4M）.
	 */
	static propBitsMaxAbs4M = 22;

	/**
	 * プロパティ値：性能カスタマイズ項目ビット数（MaxAbs == 10G）.
	 */
	static propBitsMaxAbs10G = 34;

}
// 定数を凍結
Object.freeze(CSaveDataConst);
