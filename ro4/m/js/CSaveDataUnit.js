

/**
 * Extended Map class whose 'key' is forced as string.
 */
class SKeyMap extends Map {

	/**
	 * Constructor.
	 */
	constructor () {
		super();
	}

	/**
	 * Removes the specified element from a Map object by key.
	 * @param {string} key The key of the element to remove from the Map object.
	 * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
	 */
	delete (key) {
		return super.delete("" + key);
	}

	/**
	 * Returns a specified element from a Map object.
	 * @param {string} key The key of the element to return from the Map object.
	 * @returns The element associated with the specified key, or undefined if the key can't be found in the Map object.
	 */
	get (key) {
		return super.get("" + key);
	}

	/**
	 * Returns a boolean indicating whether an element with the specified key exists or not.
	 * @param {string} key The key of the element to test for presence in the Map object.
	 * @returns true if an element with the specified key exists in the Map object; otherwise false.
	 */
	has (key) {
		return super.has("" + key);
	}

	/**
	 * Adds or updates an entry in a Map object with a specified key and a value.
	 * @param {string} key The key of the element to add to the Map object.
	 * @param {any} value The value of the element to add to the Map object.
	 * @returns The Map object.
	 */
	set (key, value) {
		return super.set("" + key, value);
	}
}



/**
 * シングルトンのマッピング管理クラス.
 */
class CSingletonMapper extends SKeyMap {

	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();
	}



	/**
	 * シングルトンを登録する.
	 * @param {string} key 登録するキー
	 * @param {Object} value 登録する値
	 * @returns {string} 引数で与えられたキー
	 * @throws {Error} 指定のキーが既に登録済みの場合
	 */
	set (key, value) {

		// 二重登録チェック
		if (this.get(key) !== undefined) {
			throw new Error("Duplicated key.");
		}

		// 登録処理
		super.set(key, value);

		return key;
	}
}

/**
 * マルチバリューのマッピング管理クラス.
 * （同一のkeyに複数の値が設定されうるマップクラス）
 * （複数の値が設定された場合、値は配列でラッピングされて保持、取得される）
 */
class CMultiValueMapper extends SKeyMap {

	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();
	}



	/**
	 * 値を追加する.
	 * @param {string} key 追加するキー
	 * @param {Object} value 追加する値
	 * @returns {string} 引数で与えられたキー
	 * @throws {Error} 指定のキーが既に登録済みの場合
	 */
	add (key, value) {

		// すでに登録されている値を取得する
		const valueNow = this.get(key);

		// すでに登録されている値がある場合
		if (valueNow !== undefined) {

			// 配列化されている場合は、配列に追加する
			if (Array.isArray(valueNow)) {
				valueNow.push(value);
			}

			// 配列化されていない場合は、配列化して登録しなおす
			else {
				super.set(key, [valueNow, value]);
			}
		}

		// まだ登録されていない場合は、そのまま登録する
		else {
			super.set(key, value);
		}

		return key;
	}
}



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
	 * プロパティ名：攻撃間隔.
	 */
	static propNameAttackInterval = "attackInterval";

	/**
	 * プロパティ名：詠唱シミュレータ更新間隔.
	 */
	static propNameCastSimInterval = "castSimInterval";



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



/**
 * セーブデータユニットのタイプ値とクラスの対応を管理するクラス.
 */
class CSaveDataUnitTypeManager {

	/**
	 * タイプ値とクラスの関係を管理するシングルトンマッパ.
	 */
	static #mapper = new CSingletonMapper();

	/**
	 * タイプ値に対応するクラスを登録する.
	 * @param {Object} unitClass クラス定義
	 * @returns {int} クラス定義の中のタイプ値
	 */
	static register (unitClass) {

		// 既に同一のクラスが定義されている場合は、登録しない
		const registered = this.#mapper.get(unitClass.type);
		if (registered == unitClass) {
			return unitClass.type;
		}

		// 登録試行
		try {
			return this.#mapper.set(unitClass.type, unitClass);
		} catch (err) {
			throw new Error("Duplicated 'type' property in SaveDataCore.");
		}
	}

	/**
	 * タイプ値に対応するクラスを取得する.
	 * @param {int|string} type タイプ値
	 * @returns {Object} タイプ値に対応するクラス定義
	 */
	static getUnitClass (type) {
		return this.#mapper.get(type);
	}
}



/**
 * セーブデータプロパティ情報クラス.
 */
class CSaveDataPropInfo {

	/**
	 * プロパティの名称.
	 */
	#propName;

	/**
	 * プロパティのビット長.
	 */
	#propBits;


	/**
	 * コンストラクタ.
	 * @param {string} propName プロパティの名称
	 * @param {int} propBits プロパティのビット長
	 */
	constructor (propName, propBits) {

		// メンバ変数の初期化
		this.#propName = propName;
		this.#propBits = propBits;
	}



	/**
	 * プロパティの名称.
	 */
	get name () {
		return this.#propName;
	}

	/**
	 * プロパティの文字表現長.
	 */
	get bits () {
		return this.#propBits;
	}
}



/**
 * セーブデータユニットクラス：基底.
 */
class CSaveDataUnitBase {

	/**
	 * 処理順に並んだプロパティ名（継承プロパティ含む）.
	 */
	static get propNames () {
		return [
			CSaveDataConst.propNameType,
			CSaveDataConst.propNameVersion,
		];
	}

	/**
	 * 文字表現1文字あたりのビット数.
	 */
	get letterBits () {
		return CSaveDataConverter.letterBitsMIG;
	}



	/**
	 * プロパティ情報のマップ.
	 */
	propInfoMap;

	/**
	 * パースしたデータのマップ.
	 * （パースした整数値はBigIntで保持されているので、適宜Numberへ変換のこと）
	 */
	parsedMap;



	/**
	 * コンストラクタ.
	 */
	constructor () {

		// メンバ変数の初期化
		this.propInfoMap = new CSingletonMapper();
		this.clear();

		// プロパティ定義情報の登録
		this.registerPropInfo(CSaveDataConst.propNameType, this.letterBits * 2);
		this.registerPropInfo(CSaveDataConst.propNameVersion, this.letterBits);
	}

	/**
	 * プロパティ情報を登録する.
	 * @param {string} propName プロパティの名称
	 * @param {int} propBits プロパティのビット長
	 */
	registerPropInfo (propName, propBits) {
		const propInfo = new CSaveDataPropInfo(propName, propBits);
		this.propInfoMap.set(propInfo.name, propInfo);
	}

	/**
	 * パース済みの情報を消去する.
	 */
	clear () {
		this.parsedMap = new CMultiValueMapper();
	}



	/**
	 * 全データをパースする.
	 * （継承先でオーバーライドして個別のデータパース処理を追加する）
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {int} bitOffset 読み取りオフセット（ビット数）
	 * @returns {int} パースしたビット数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parse (dataText, bitOffset) {

		// すべてのプロパティを処理する
		const propNames = this.constructor.propNames;
		let readFlag = (1n << toSafeBigInt(propNames.length)) - 1n;
		for (let idx = 0; idx < propNames.length; readFlag >>= 1n, idx++) {

			// 処理プロパティ名を取得
			const propName = propNames[idx];

			// 読み込みフラグチェック
			if (!(readFlag & 1n)) {
				// フラグが立っていない場合は、ゼロ値を登録して、次へ
				// （ゼロ値を登録しておかないと、コンパクションの繰り返しでデータオフセットが保存できない）
				this.parsedMap.add(propName, 0);
				continue;
			}

			// プロパティ値の読み込み
			bitOffset += this.parseProp(propName, dataText, bitOffset);

			// 処理プロパティ名がパース制御フラグの場合、読み込みフラグを調整する
			if (propName == CSaveDataConst.propNameParseCtrlFlag) {
				readFlag = this.getProp(propName) << 1n;
			}
		}

		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;

		return bitOffset;
	}

	/**
	 * 単一のプロパティをパースする.
	 * @param {string} propName プロパティの名称
	 * @param {string} dataText パース対象データ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {int} パースしたビット数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parseProp (propName, dataText, bitOffset) {

		// 強制文字列化
		dataText = "" + dataText;

		// 指定のプロパティ情報を取得する
		const propInfo = this.propInfoMap.get(propName);
		if (!propInfo) {
			throw new Error("Unknown property (not registered).");
		}

		// プロパティの文字表現長を取得
		const propBits = propInfo.bits;

		// データチェック
		if ((dataText.length * this.letterBits) < (bitOffset + propBits)) {
			throw new Error("Too short data text length to read property.");
		}


		// 前側の残り領域、前側切り出し領域、コア領域、後ろ側のはみ出し領域の大きさを計算
		const prevBits = (this.letterBits - (bitOffset % this.letterBits)) % this.letterBits;
		const spliceBits = Math.min(prevBits, propBits);
		const coreBits = Math.floor((propBits - spliceBits) / this.letterBits) * this.letterBits;
		const extraBits = propBits - coreBits - spliceBits;

		// 前側部分
		let prevValue = 0n;
		if (spliceBits != 0) {

			// 前側の文字を取得し数値へ変換
			const prevChar = dataText.charAt(Math.floor(bitOffset / this.letterBits));
			const prevNum = CSaveDataConverter.ConvertStoNMIG(prevChar);

			// 残り部分のみ取得
			prevValue = (prevNum >> toSafeBigInt(bitOffset % this.letterBits)) & ((1n << toSafeBigInt(spliceBits)) - 1n);
		}

		// コア部分
		let coreValue = 0n;
		if (coreBits != 0) {

			// 該当部分の文字列を取得し数値へ変換
			const posStart = Math.ceil(bitOffset / this.letterBits);
			const posEnd = posStart + (coreBits / this.letterBits);

			const coreText = dataText.slice(posStart, posEnd);
			coreValue = CSaveDataConverter.ConvertStoNMIG(coreText);
		}

		// 後ろ側の文字へはみ出しがある場合
		let extraValue = 0n;
		if (extraBits != 0) {

			// 後ろ側の文字を取得し数値へ変換
			const extraChar = dataText.charAt(Math.floor((bitOffset + propBits) / this.letterBits));
			const extraNum = CSaveDataConverter.ConvertStoNMIG(extraChar);

			// はみ出し部分のみ取得
			extraValue = extraNum & ((1n << toSafeBigInt(extraBits)) - 1n);
		}


		// 最終的な値を合成
		const propValue = extraValue + (coreValue << toSafeBigInt(extraBits)) + (prevValue << toSafeBigInt(extraBits + coreBits));

		// マップへ保存
		this.parsedMap.add(propName, propValue);

		// パースしたビット数を返す
		return propBits;
	}



	/**
	 * パース済みのプロパティを取得する.
	 * （戻り値はBigIntになっているはずなので、適宜Numberへ変換のこと）
	 * @param {string} propName プロパティの名称
	 * @returns {int|undefined} 成功時:パースした数値、失敗時:undefined
	 */
	getProp (propName) {
		return this.parsedMap.get(propName);
	}



	/**
	 * パース済みのプロパティを設定する.
	 * （継承先のクラスで、値の補正などに用いる）
	 * @param {string} propName プロパティの名称
	 * @param {int} value プロパティの値
	 */
	setProp (propName, value) {
		this.parsedMap.set(propName, toSafeBigInt(value));
	}



	/**
	 * URLクエリ文字列として出力する.
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {[string, int]} 処理後の [dataTextWork, bitOffset] の組（配列）
	 * @throws {Error} 変換中に異常が検出された場合
	 */
	encodeToURL (dataTextWork, bitOffset) {
		// この関数はセーブ時のみ呼ばれる
		// ロード時には呼ばれない

		// データユニットのコンパクションを実行
		this.doCompaction();

		// 空のデータユニットの場合は処理なし
		if (this.isEmptyUnit()) {
			return [dataTextWork, bitOffset];
		}

		// 処理するプロパティの配列を取得
		const propNames = this.constructor.propNames;

		// すべてのプロパティを処理する
		let ctrlFlag = (1n << toSafeBigInt(propNames.length)) - 1n;
		const propNameCountMap = new Map();		// propName ごとの読み取り回数マップ
		for (let idx = 0; idx < propNames.length; ctrlFlag >>= 1n, idx++) {

			// 情報取得
			const propName = propNames[idx];
			const propInfoMain = this.propInfoMap.get(propName);
			const propBits = propInfoMain.bits;
			let propValue = undefined;

			// プロパティ名の読み取り回数を取得する
			let propNameReadCount = propNameCountMap.get(propName);
			if (propNameReadCount === undefined) {
				propNameReadCount = 0;
			}

			// 制御フラグが立っていない場合は処理しない
			if (!(ctrlFlag & 1n)) {
				// プロパティ名読み取り回数を更新
				propNameCountMap.set(propName, propNameReadCount + 1);
				continue;
			}

			// 取得したプロパティが制御フラグの場合、制御情報を変更する
			if (propName == CSaveDataConst.propNameParseCtrlFlag) {

				// BigInt のまま処理を進める
				propValue = this.getProp(propName);
				ctrlFlag = propValue << 1n;
			}

			// それ以外の場合は値を取得する
			else {

				propValue = this.getProp(propName);

				// 値が配列の場合は、マルチデータ型（同一プロパティ名に複数の値）なので該当要素を取り出す
				if (Array.isArray(propValue)) {
					propValue = propValue[propNameReadCount];
				}
			}

			// エラーチェック
			if (propValue === undefined) {
				throw new Error("Invalid value.");
			}

			// プロパティ名読み取り回数を更新
			propNameCountMap.set(propName, propNameReadCount + 1);

			// クエリ文字列に追記する
			dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);

			// ビットオフセットを更新
			bitOffset += propBits;
		}

		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;

		return [dataTextWork, bitOffset];
	}

	/**
	 * URLクエリ文字列として出力する.
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @param {BigInt} propValue プロパティの値
	 * @param {int} propBits プロパティのビット数
	 * @returns {string} 処理後の dataTextWork
	 */
	appendToDataText (dataTextWork, bitOffset, propValue, propBits) {

		// BitIntにキャストしておく
		propValue = toSafeBigInt(propValue);

		// 前側の残り領域、前側切り出し領域、コア領域、後ろ側のはみ出し領域の大きさを計算
		const prevBits = (this.letterBits - (bitOffset % this.letterBits)) % this.letterBits;
		const spliceBits = Math.min(prevBits, propBits);
		const coreBits = Math.floor((propBits - spliceBits) / this.letterBits) * this.letterBits;
		const extraBits = propBits - coreBits - spliceBits;

		// 前側の文字の残りがある場合
		if (spliceBits != 0) {

			// 前側の文字を取得し数値へ変換
			const prevChar = dataTextWork.slice(-1);
			const prevNum = floorBigInt32(CSaveDataConverter.ConvertStoNMIG(prevChar));

			// 入れ込む値を計算
			const shiftBits = propBits - spliceBits;
			const shiftedNum = floorBigInt32(propValue >> toSafeBigInt(shiftBits));

			// 前側の値を合成し文字表現へ変換
			const mixedNum = prevNum + (shiftedNum << (this.letterBits - prevBits));
			const mixedChar = CSaveDataConverter.ConvertNtoSMIG(mixedNum, 1);

			// 前側の文字を置換
			dataTextWork = dataTextWork.slice(0, -1) + mixedChar;
		}

		// コア部分
		if (coreBits != 0) {

			// 該当部分の数値を文字列へ変換
			const coreValue = (propValue >> toSafeBigInt(extraBits)) & ((1n << toSafeBigInt(coreBits)) - 1n);
			const coreCharCount = coreBits / this.letterBits;
			const coreText = CSaveDataConverter.ConvertNtoSMIG(coreValue, coreCharCount);

			// クエリ文字列へ追記
			dataTextWork += coreText;
		}

		// 後ろ側の文字へはみ出しがある場合
		if (extraBits != 0) {

			// 該当部分の数値を文字列へ変換
			const extraValue = propValue & ((1n << toSafeBigInt(extraBits)) - 1n);
			const extraText = CSaveDataConverter.ConvertNtoSMIG(extraValue, 1);

			// クエリ文字列へ追記
			dataTextWork += extraText;
		}

		return dataTextWork;
	}


	/**
	 * 旧形式のセーブデータを、新形式のセーブデータに変換する.
	 * （継承先でオーバーライドして使用する）
	 * @param {string} dataTextWork ここまでのデータを示すクエリデータ文字列
	 * @param {int} bitOffset パース開始位置オフセット（ビット数単位）
	 * @returns {[string, int]} 処理後の [dataTextWork, bitOffset] の組（配列）
	 * @param {...any} args 可変長の旧形式のデータ引数（残余引数）
	 */
	convertFromOldFormat (dataTextWork, bitOffset, ...args) {
		// 受け取った残余引数の前に、タイプ値とバージョン番号を追加する
		const argsMerged = [this.constructor.type, this.constructor.version].concat(args);
		// 処理するプロパティの配列を取得
		const propNames = this.constructor.propNames;
		// エラーチェック
		// （データ形式の移行では全指定される想定）
		if (propNames.length != argsMerged.length) {
			throw new Error("Count of arguments is not equal to count of properties.");
		}
		// すべてのプロパティを処理する
		for (let idx = 0; idx < propNames.length; idx++) {
			// 情報取得
			const propName = propNames[idx];
			const propInfo = this.propInfoMap.get(propName);
			const propBits = propInfo.bits;
			const propValue = argsMerged[idx];
			// クエリ文字列に追記する
			dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);
			// ビットオフセットを更新
			bitOffset += propBits;
		}
		// データユニットが中途半端なところで終わらないようパディングする
		bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		return [dataTextWork, bitOffset];
	}



	/**
	 * データのデフォルト値を設定する.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 */
	SetUpAsDefault() {
		this.setProp(CSaveDataConst.propNameType, this.constructor.type);
		this.setProp(CSaveDataConst.propNameVersion, this.constructor.version);
	}

	/**
	 * データのコンパクション（不要データの削除）を行う.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 */
	doCompaction () {
	}

	/**
	 * 共用データコンパクション処理.
	 * （0 より大のデータのみ制御フラグを有効にする）
	 */
	doCompaction_ModifyFlagGT0 () {

		// 対象プロパティ名の配列
		const propNames = this.constructor.propNames;

		// 処理済みプロパティ名の配列
		const propNamesDone = [];

		// 空定義をチェックし、制御フラグを調整する
		let idxCtrlFlag = undefined;
		let idxCompaction = 0;
		let ctrlFlag = 0n;

		// TODO: 構造変えたい
		const asDataArray = [[], [], []];

		for (let idx = 0; idx < propNames.length; idx++) {

			const propName = propNames[idx];

			// 制御フラグの位置までは読み飛ばす
			if (idxCtrlFlag === undefined) {
				if (propName == CSaveDataConst.propNameParseCtrlFlag) {
					idxCtrlFlag = idx;
				}
				continue;
			}

			// プロパティ値を取得
			let propValue = this.getProp(propName);

			// オートスペル系固有処理
			switch (propName) {
				case CSaveDataConst.propNameAutoSpellID: {
					asDataArray[0] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
				case CSaveDataConst.propNameAutoSpellLv: {
					asDataArray[1] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
				case CSaveDataConst.propNameAutoSpellProb: {
					asDataArray[2] = propValue.slice();
					propNamesDone.push(propName);
					continue;
				}
			}

			// プロパティが設定されている場合のみ、コンパクションを行う
			if ((propValue !== undefined) && (propNamesDone.indexOf(propName) == -1)) {

				// 複数の値が設定されているケースも考慮し、単一の値でも配列化して処理する
				if (!Array.isArray(propValue)) {
					propValue = [propValue];
				}

				// 配列を順に走査
				for (let idxVal = 0; idxVal < propValue.length; idxVal++) {

					// 値が 0 より大きければ有効とみなす
					if (propValue[idxVal] > 0n) {
						ctrlFlag |= (1n << toSafeBigInt(idxCompaction));
					}

					idxCompaction++;
				}

				// 処理済みプロパティ名に追加
				propNamesDone.push(propName);
			}

			// プロパティが設定されていない場合は、インデックスだけ増やす
			else {
				idxCompaction++;
			}
		}

		// TODO: 構造変えたい
		// オートスペル固有処理
		if (asDataArray[0].length > 0) {
			ctrlFlag = 0n;
			for (let idx = 0; idx < asDataArray[0].length; idx++) {
				ctrlFlag |= (asDataArray[0][idx] > 0n) ? (1n << toSafeBigInt(3 * idx)) : 0n;
				ctrlFlag |= (asDataArray[1][idx] > 0n) ? (2n << toSafeBigInt(3 * idx)) : 0n;
				ctrlFlag |= (asDataArray[2][idx] > 0n) ? (4n << toSafeBigInt(3 * idx)) : 0n;
			}
		}

		this.setProp(CSaveDataConst.propNameParseCtrlFlag, ctrlFlag);
	}



	/**
	 * ユニットのデータが空であるかを判定する.
	 * （継承先でオーバーライドして個別の処理を追加する）
	 * @returns {boolean} true:空である、false:空でない
	 */
	isEmptyUnit () {
		return true;
	}

	/**
	 * 共用空ユニット判定処理.
	 * （制御フラグが 0 の場合のみ、空であると判定する）
	 * @returns {boolean} true:空である、false:空でない
	 */
	isEmptyUnit_CtrlFlag0 () {

		const propValue = this.getProp(CSaveDataConst.propNameParseCtrlFlag);

		if (propValue === undefined) {
			return true;
		}

		if (propValue != 0n) {
			return false;
		}

		return true;
	}
}



/**
 * セーブデータユニットクラス：バージョン情報.
 */
const SAVE_DATA_UNIT_TYPE_VERSION = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitVersion extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 801;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();
		}



		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			return false;
		}
	}
);



/**
 * セーブデータユニットクラス：キャラクターステータス.
 */
const SAVE_DATA_UNIT_TYPE_CHARA = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitChara extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 802;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameSubAutoAdjustBaseLv,
				CSaveDataConst.propNameSubIgnoreEquipRestrict,

				CSaveDataConst.propNameJobID,
				CSaveDataConst.propNameBaseLv,
				CSaveDataConst.propNameJobLv,

				CSaveDataConst.propNameStStr,
				CSaveDataConst.propNameStAgi,
				CSaveDataConst.propNameStVit,
				CSaveDataConst.propNameStInt,
				CSaveDataConst.propNameStDex,
				CSaveDataConst.propNameStLuk,

				CSaveDataConst.propNameStPow,
				CSaveDataConst.propNameStSta,
				CSaveDataConst.propNameStWis,
				CSaveDataConst.propNameStSpl,
				CSaveDataConst.propNameStCon,
				CSaveDataConst.propNameStCrt,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameSubAutoAdjustBaseLv, 1);
			this.registerPropInfo(CSaveDataConst.propNameSubIgnoreEquipRestrict, 1);

			this.registerPropInfo(CSaveDataConst.propNameJobID, 7);
			this.registerPropInfo(CSaveDataConst.propNameBaseLv, 9);
			this.registerPropInfo(CSaveDataConst.propNameJobLv, 7);

			this.registerPropInfo(CSaveDataConst.propNameStStr, 8);
			this.registerPropInfo(CSaveDataConst.propNameStAgi, 8);
			this.registerPropInfo(CSaveDataConst.propNameStVit, 8);
			this.registerPropInfo(CSaveDataConst.propNameStInt, 8);
			this.registerPropInfo(CSaveDataConst.propNameStDex, 8);
			this.registerPropInfo(CSaveDataConst.propNameStLuk, 8);

			this.registerPropInfo(CSaveDataConst.propNameStPow, 7);
			this.registerPropInfo(CSaveDataConst.propNameStSta, 7);
			this.registerPropInfo(CSaveDataConst.propNameStWis, 7);
			this.registerPropInfo(CSaveDataConst.propNameStSpl, 7);
			this.registerPropInfo(CSaveDataConst.propNameStCon, 7);
			this.registerPropInfo(CSaveDataConst.propNameStCrt, 7);
		}



		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			return false;
		}
	}
);



/**
 * セーブデータユニットクラス：装備可能品.
 * （将来的な持ち替え機能等を見据え、装備位置に依存せず、アイテム単品の性能をまとめて管理する）
 */
const SAVE_DATA_UNIT_TYPE_EQUIPABLE = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitEquipable extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 803;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 2;
		}

		// parse 関数で参照するためのアイテムID変換テーブル
		// 負荷軽減のため必要ないときは null のまま扱う
		static deprecatedItemIdChangeArray = null;

		// オーバーライドされた parse 関数
		parse (dataText, bitOffset) {
			let nextOffset = super.parse(dataText, bitOffset);	// version を識別するために一旦 parse する
			if (this.getProp("version") == 1n) {	// version 1 のセーブデータを version 2 以上のプロパティ定義で読み込むとデータが壊れるので差分修正する
				this.propInfoMap.delete(CSaveDataConst.propNameParseCtrlFlag);	// version 1 → version 2 で parse するプロパティ数が 1 増えているので parse 処理対象数 (ParseCtrlFlag) を一旦消す
				let prop = new CSaveDataPropInfo(CSaveDataConst.propNameParseCtrlFlag, 20); // 処理対象数を 21 → 20 に減らしてから...
				this.propInfoMap.set(CSaveDataConst.propNameParseCtrlFlag, prop);	// ...セットし直す
				this.parsedMap.clear();	// ここまでに parse された結果を破棄する
				nextOffset = super.parse(dataText, bitOffset);	// 処理対象数が 1 減った状態で parse し直せば、プロパティ末尾に追加された propNameTranscendenceCount を無視して parse 処理が正常に終了する
				// --- ↓ 廃止アイテムデータの置換処理 ↓ ---
				if (CSaveDataUnitEquipable.deprecatedItemIdChangeArray == null) {
					// 将来的に version 3 以上で別のアイテムID変換テーブルが必要になった場合は null 判定だけでは誤処理の原因になるので注意
					// version 1 セーブデータを読み込んだ後に、スーパーロードせず別の version 2 セーブデータを読み込む場合など
					CSaveDataUnitEquipable.deprecatedItemIdChangeArray = new Array(5070).fill(0);
					CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(
						4954,	// 5070 -> グレイシアソード
						4955,	// 5071 -> グレイシアスピア
						4956,	// 5072 -> グレイシアアックス
						4957,	// 5073 -> グレイシアワンド
						4958,	// 5074 -> グレイシアカタール
						4959,	// 5075 -> グレイシアナイフ
						4960,	// 5076 -> グレイシアナックル
						4961,	// 5077 -> グレイシアメイス
						4962,	// 5078 -> グレイシアボウ
						4963,	// 5079 -> グレイシアウィップ
						4964,	// 5080 -> グレイシアバイオリン
						4965,	// 5081 -> グレイシアブック
						5010,	// 5082 -> グレイシア風魔手裏剣
						5012,	// 5083 -> グレイシアハンドガン
						5014,	// 5084 -> グレイシアベーシックソード
						5016,	// 5085 -> グレイシアフォックステイル
					);
					CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(...(new Array(21).fill(0))); // 21 = 5107 - 5085 - 1
					CSaveDataUnitEquipable.deprecatedItemIdChangeArray.push(
						4734,	// 5107 -> ウィワートゥス・フィデス・カタール
						4737,	// 5108 -> ウィワートゥス・フィデス・アックス
						4740,	// 5109 -> ウィワートゥス・フィデス・レイピア
						4743,	// 5110 -> ウィワートゥス・フィデス・ワンド
						4746,	// 5111 -> ウィワートゥス・フィデス・ガーディアンスピア
						4749,	// 5112 -> ウィワートゥス・フィデス・バイオリン
						4752,	// 5113 -> ウィワートゥス・フィデス・ナックル
						4755,	// 5114 -> ウィワートゥス・フィデス・マジックブック
						4758,	// 5115 -> ウィワートゥス・フィデス・チェインロープ
						4761,	// 5116 -> ウィワートゥス・フィデス・クロスボウ
						4764,	// 5117 -> ウィワートゥス・フィデス・バリスタ
						4767,	// 5118 -> ウィワートゥス・フィデス・ツーハンドスタッフ
						4770,	// 5119 -> ウィワートゥス・フィデス・ランス
						5024,	// 5120 -> ウィワートゥス・フィデス・スターダストブック
						5027,	// 5121 -> ウィワートゥス・フィデス・ソウルスティック
						5052,	// 5122 -> ウィワートゥス・フィデス・フォックステイル
						5055,	// 5123 -> ウィワートゥス・フィデス・ライフル
						5095,	// 5124 -> ウィワートゥス・フィデス・メイス
						5098,	// 5125 -> ウィワートゥス・フィデス・ダガー
						4300,	// 5126 -> ガーディアンナイツクレイモア
						4301,	// 5127 -> ガーディアンナイツスピア
						4302,	// 5128 -> ガーディアンナイツアックス
						4303,	// 5129 -> ロイヤルクレリックスタッフ
						4304,	// 5130 -> ロイヤルマジシャンワンド
						4305,	// 5131 -> ロイヤルフォックステイル
						4306,	// 5132 -> ロイヤルカタール
						4307,	// 5133 -> ロイヤルマジシャンダガー
						4308,	// 5134 -> ロイヤルナックル
						4309,	// 5135 -> ガーディアンアルケミックスタッフ
						4310,	// 5136 -> ガーディアンナイツアーチャーボウ
						4311,	// 5137 -> ロイヤルウィップ
						4312,	// 5138 -> ロイヤルチェロ
						4313,	// 5139 -> ロイヤルセージブック
						4047,	// 5140 -> 白の騎士団の猫じゃらし
						4431,	// 5141 -> アンティークガトリングガン
						4614,	// 5142 -> トートの書
						4534,	// 5143 -> 輝く白銀の槍
						4654,	// 5144 -> トライアングルディザスター
						4251,	// 5145 -> 朽ちたガーデンナイフ
						4450,	// 5146 -> 魔導師の記憶
						4456,	// 5147 -> 六韜三略
						3120,	// 5148 -> ガーデンオブエデン
						3431,	// 5149 -> 剛勇無双の紋帽子
						3765,	// 5150 -> ファントムオブマスカレード
						4103,	// 5151 -> ゲートオブネザーワールド
						4358,	// 5152 -> 魔狩りの靴
						2936,	// 5153 -> カーリッツバーグ騎士団の鎧
						3273,	// 5154 -> グレータードラクルホーン
						3606,	// 5155 -> 白の騎士団の鎧
						3965,	// 5156 -> パナギアの贈り物
						4231,	// 5157 -> フェアリーオブエデン
						3734,	// 5158 -> アルジャンブランコ
						3723,	// 5159 -> クリムゾンローズスティック
						3717,	// 5160 -> エイミングボウ
						3741,	// 5161 -> エンジンパイルバンカー
						3712,	// 5162 -> リッパークロス
						3709,	// 5163 -> 崇拝の杖
						3736,	// 5164 -> フォートレイジ
						3724,	// 5165 -> サイキックスピアロッド
						3737,	// 5166 -> ブラックサークル
						3727,	// 5167 -> ハートウィップ
						3743,	// 5168 -> ジーンロッド
						3715,	// 5169 -> ラピッドファイア
						3745,	// 5170 -> 光耀錘
					);
				}
				let oldItemID = this.parsedMap.get(CSaveDataConst.propNameItemID);
				if (oldItemID <= 5170) {
					let newItemID = toSafeBigInt(CSaveDataUnitEquipable.deprecatedItemIdChangeArray[oldItemID]);
					if (newItemID != 0n) {
						this.parsedMap.set(CSaveDataConst.propNameItemID, newItemID);		// 廃止された超越アイテムを置き換え
						this.parsedMap.set(CSaveDataConst.propNameTranscendenceCount, 1);	// 超越段階を 0 → 1 へ変更
					}
				}
			} // --- ↑ 廃止アイテムデータの置換処理 ↑ ---
			return nextOffset;
		}

		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameEquipItemDefID,
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameItemID,
				CSaveDataConst.propNameRefinedCount,
				CSaveDataConst.propNameCardCategoryID1,
				CSaveDataConst.propNameCardID1,
				CSaveDataConst.propNameCardCategoryID2,
				CSaveDataConst.propNameCardID2,
				CSaveDataConst.propNameCardCategoryID3,
				CSaveDataConst.propNameCardID3,
				CSaveDataConst.propNameCardCategoryID4,
				CSaveDataConst.propNameCardID4,
				CSaveDataConst.propNameRndOptID1,
				CSaveDataConst.propNameRndOptValue1,
				CSaveDataConst.propNameRndOptID2,
				CSaveDataConst.propNameRndOptValue2,
				CSaveDataConst.propNameRndOptID3,
				CSaveDataConst.propNameRndOptValue3,
				CSaveDataConst.propNameRndOptID4,
				CSaveDataConst.propNameRndOptValue4,
				CSaveDataConst.propNameRndOptID5,
				CSaveDataConst.propNameRndOptValue5,
				CSaveDataConst.propNameTranscendenceCount,	// version 2 で追加
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}

		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameEquipItemDefID, 6);
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 21);
			//this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 20);	// version 1

			this.registerPropInfo(CSaveDataConst.propNameItemID, 14);
			this.registerPropInfo(CSaveDataConst.propNameRefinedCount, 4);
			this.registerPropInfo(CSaveDataConst.propNameCardCategoryID1, 10);
			this.registerPropInfo(CSaveDataConst.propNameCardID1, 12);
			this.registerPropInfo(CSaveDataConst.propNameCardCategoryID2, 10);
			this.registerPropInfo(CSaveDataConst.propNameCardID2, 12);
			this.registerPropInfo(CSaveDataConst.propNameCardCategoryID3, 10);
			this.registerPropInfo(CSaveDataConst.propNameCardID3, 12);
			this.registerPropInfo(CSaveDataConst.propNameCardCategoryID4, 10);
			this.registerPropInfo(CSaveDataConst.propNameCardID4, 12);
			this.registerPropInfo(CSaveDataConst.propNameRndOptID1, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptValue1, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptID2, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptValue2, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptID3, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptValue3, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptID4, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptValue4, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptID5, 9);
			this.registerPropInfo(CSaveDataConst.propNameRndOptValue5, 9);
			this.registerPropInfo(CSaveDataConst.propNameTranscendenceCount, 3);	// version 2 で追加
		}

		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}

		/**
		 * オーバーライドされたメソッド
		 * 旧形式のデータとして与えられる args を当ユニットのプロパティに合わせて
		 * 新形式の文字列表現セーブデータ(dataTextWork)として出力する
		 * このメソッドは「新形式セーブ時」と「旧形式ロード時」のそれぞれから呼び出される
		 */
		convertFromOldFormat (dataTextWork, bitOffset, ...args) {
			// 受け取った残余引数の前に、タイプ値とバージョン番号を追加する
			const argsMerged = [this.constructor.type, this.constructor.version].concat(args);
			// 処理するプロパティの配列を取得
			const propNames = this.constructor.propNames;
			// すべてのプロパティを処理する
			for (let idx = 0; idx < propNames.length; idx++) {
				// 情報取得
				const propName = propNames[idx];
				const propInfo = this.propInfoMap.get(propName);
				let propBits = propInfo.bits;
				let propValue = argsMerged[idx];

				/**
				 * 後方互換性確保
				 */
				if (idx == 25) {
					break;	// version 1 時点で存在した上位 25 個の処理が完了したら終了する
				}
				if (propName == CSaveDataConst.propNameVersion) {
					propValue = 1;	// 旧形式のセーブデータは必ず version 1 未満なので 1 に揃える
				}
				if (propName == CSaveDataConst.propNameParseCtrlFlag) {
					propBits = 20;	// 旧形式のセーブデータのプロパティ数は 20 なので揃える
				}

				// クエリ文字列に追記する
				dataTextWork = this.appendToDataText(dataTextWork, bitOffset, propValue, propBits);
				// ビットオフセットを更新
				bitOffset += propBits;
			}
			// データユニットが中途半端なところで終わらないようパディングする
			bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
			return [dataTextWork, bitOffset];
		}

		/**
		 * オーバーライドされたメソッド
		 * インスタンスを新形式のセーブデータ文字列に変換する
		 * このメソッドはセーブ時のみ呼び出される
		 */
		encodeToURL (dataTextWork, bitOffset) {
			// バージョンを修正
			this.parsedMap.set(CSaveDataConst.propNameVersion, this.constructor.version);
			// コントロールフラグを修正
			const prop = new CSaveDataPropInfo(CSaveDataConst.propNameParseCtrlFlag, this.propInfoMap.size - 5);	// ヘッダ長 5
			this.propInfoMap.delete(CSaveDataConst.propNameParseCtrlFlag);
			this.propInfoMap.set(CSaveDataConst.propNameParseCtrlFlag, prop);

			return super.encodeToURL(dataTextWork, bitOffset);
		}
		
	}
);



/**
 * セーブデータユニットクラス：装備位置.
 * （将来的な持ち替え機能等を見据え、装備位置とアイテム等との対応付けを管理する）
 */
const SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitEquipRegions extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 804;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameDataKind,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameEqpRgnArmsRight,
				CSaveDataConst.propNameEqpRgnArmsLeft,
				CSaveDataConst.propNameEqpRgnShield,
				CSaveDataConst.propNameEqpRgnHeadTop,
				CSaveDataConst.propNameEqpRgnHeadMid,
				CSaveDataConst.propNameEqpRgnHeadUnder,
				CSaveDataConst.propNameEqpRgnBody,
				CSaveDataConst.propNameEqpRgnShoulder,
				CSaveDataConst.propNameEqpRgnFoot,
				CSaveDataConst.propNameEqpRgnAccessory1,
				CSaveDataConst.propNameEqpRgnAccessory2,
				CSaveDataConst.propNameEqpRgnArrow,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameDataKind, 2);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 12);

			this.registerPropInfo(CSaveDataConst.propNameEqpRgnArmsRight, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnArmsLeft, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnShield, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadTop, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadMid, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnHeadUnder, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnBody, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnShoulder, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnFoot, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnAccessory1, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnAccessory2, 6);
			this.registerPropInfo(CSaveDataConst.propNameEqpRgnArrow, 6);
		}

		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：習得スキル.
 */
const SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitLearnedSkills extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 805;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、200個
				...(Array(200).fill(CSaveDataConst.propNameSkillLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 200);
			this.registerPropInfo(CSaveDataConst.propNameSkillLv, 4);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：キャラクターBUFF.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_BUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaBuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 806;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		// TODO: 単純なBUFFレベルではなく、もっと複雑なデータ構造をしているが未対応

		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameArmsElement,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、70個
				...(Array(70).fill(CSaveDataConst.propNameBuffLv)),

			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameArmsElement, 4);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 70);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 8);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {

			// 属性付与が設定されている場合は空でない
			if (this.getProp(CSaveDataConst.propNameArmsElement) !== undefined) {
				return false;
			}

			// それ以外は、共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：自己スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuffSelf extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 807;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、100個
				...(Array(100).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 100);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 6);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：一次職スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuff1st extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 808;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、100個
				...(Array(100).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 100);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 4);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：二次職スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuff2nd extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 809;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、50個
				...(Array(50).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 50);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 4);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：三次職スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuff3rd extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 810;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、100個
				...(Array(100).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 100);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 6);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：四次職スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuff4th extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 811;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、30個
				...(Array(30).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 30);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 4);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：演奏スキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuffMusic extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 812;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		// TODO: 単純なBUFFレベルではなく、もっと複雑なデータ構造をしているが未対応

		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、60個
				// （領域的には61個用意されていたが末尾は使用していなかったので切り捨て）
				...(Array(60).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 60);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 8);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：ギルドスキルBUFF.
 */
const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSkillBuffGuild extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 813;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		// TODO: 単純なBUFFレベルではなく、もっと複雑なデータ構造をしているが未対応

		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、60個
				...(Array(60).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 60);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 10);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：アイテムBUFF.
 */
const SAVE_DATA_UNIT_TYPE_ITEM_BUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitItemBuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 814;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameSubSpeedPot,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、70個
				// （領域的には71個用意されていたが末尾は使用していなかったので切り捨て）
				...(Array(70).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameSubSpeedPot, 2);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 70);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 6);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {

			const propNames = this.constructor.#propNamesSelf.slice();

			// すべてのプロパティがデフォルト値であるかを検査する
			for (let idx = 0; idx < propNames.length; idx++) {

				const propName = propNames[idx];

				/// そもそもパースされたデータがない場合は、デフォルトとみなす
				if (this.getProp(propName) === undefined) {
					continue;
				}

				// デフォルト値であるかの検査
				switch (propName) {
					case CSaveDataConst.propNameOptCode:
						continue;
					case CSaveDataConst.propNameParseCtrlFlag:
						continue;
					case CSaveDataConst.propNameSubSpeedPot:
						if (this.getProp(propName) != 0) {
							break;
						}
						continue;
					default:
						continue;
				}

				// ここに来るならばデフォルトでない値がある
				return false;
			}

			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：時限効果設定.
 */
const SAVE_DATA_UNIT_TYPE_TIME_BUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitTimeBuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 815;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、20個
				...(Array(20).fill(CSaveDataConst.propNameTimeBuffID)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 20);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 20);
			this.registerPropInfo(CSaveDataConst.propNameTimeBuffID, 9);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：オートスペル設定.
 */
const SAVE_DATA_UNIT_TYPE_AUTO_SPELLS = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitAutoSpells extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 816;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {

			// TODO: マジックナンバー
			const unitArray = [];
			for (let idx = 0; idx < 20; idx++) {
				unitArray.push(CSaveDataConst.propNameAutoSpellID);
				unitArray.push(CSaveDataConst.propNameAutoSpellLv);
				unitArray.push(CSaveDataConst.propNameAutoSpellProb);
			}

			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				...unitArray
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 60);
			this.registerPropInfo(CSaveDataConst.propNameAutoSpellID, 9);
			this.registerPropInfo(CSaveDataConst.propNameAutoSpellLv, 4);
			this.registerPropInfo(CSaveDataConst.propNameAutoSpellProb, 7);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：キャラクターDEBUFF.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaDebuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 817;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、50個
				...(Array(50).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 50);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 6);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：性能カスタマイズ（基本）.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaConfBasic extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 818;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameSubInvalidateSettings,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameStMaxHPUpSign,
				CSaveDataConst.propNameStMaxHPUp,
				CSaveDataConst.propNameStMaxHPPlusSign,
				CSaveDataConst.propNameStMaxHPPlus,
				CSaveDataConst.propNameStMaxSPUpSign,
				CSaveDataConst.propNameStMaxSPUp,
				CSaveDataConst.propNameStMaxSPPlusSign,
				CSaveDataConst.propNameStMaxSPPlus,
				CSaveDataConst.propNameStHPRUpSign,
				CSaveDataConst.propNameStHPRUp,
				CSaveDataConst.propNameStSPRUpSign,
				CSaveDataConst.propNameStSPRUp,
				CSaveDataConst.propNameStStrPlusSign,
				CSaveDataConst.propNameStStrPlus,
				CSaveDataConst.propNameStAgiPlusSign,
				CSaveDataConst.propNameStAgiPlus,
				CSaveDataConst.propNameStVitPlusSign,
				CSaveDataConst.propNameStVitPlus,
				CSaveDataConst.propNameStIntPlusSign,
				CSaveDataConst.propNameStIntPlus,
				CSaveDataConst.propNameStDexPlusSign,
				CSaveDataConst.propNameStDexPlus,
				CSaveDataConst.propNameStLukPlusSign,
				CSaveDataConst.propNameStLukPlus,
				CSaveDataConst.propNameStHitPlusSign,
				CSaveDataConst.propNameStHitPlus,
				CSaveDataConst.propNameStFleePlusSign,
				CSaveDataConst.propNameStFleePlus,
				CSaveDataConst.propNameStCriPlusSign,
				CSaveDataConst.propNameStCriPlus,
				CSaveDataConst.propNameStLuckyPlusSign,
				CSaveDataConst.propNameStLuckyPlus,
				CSaveDataConst.propNameStAspdUpSign,
				CSaveDataConst.propNameStAspdUp,
				CSaveDataConst.propNameStAspdPlusSign,
				CSaveDataConst.propNameStAspdPlus,
				CSaveDataConst.propNameStCastDownSign,
				CSaveDataConst.propNameStCastDown,
				CSaveDataConst.propNameStFixedDownSign,
				CSaveDataConst.propNameStFixedDown,
				CSaveDataConst.propNameStDelayDownSign,
				CSaveDataConst.propNameStDelayDown,
				CSaveDataConst.propNameStCostDownSign,
				CSaveDataConst.propNameStCostDown,
				CSaveDataConst.propNameChangeArmsAtk,
				CSaveDataConst.propNameChangeArmsMatk,
				CSaveDataConst.propNameChangeArmsLv,
				CSaveDataConst.propNameStAtkPlusSign,
				CSaveDataConst.propNameStAtkPlus,
				CSaveDataConst.propNameStPerfectAttackUp,
				CSaveDataConst.propNameStWeaponAtkUpSign,
				CSaveDataConst.propNameStWeaponAtkUp,
				CSaveDataConst.propNameStRange,
				CSaveDataConst.propNameStMatkPlusSign,
				CSaveDataConst.propNameStMatkPlus,
				CSaveDataConst.propNameStDefDivPlusSign,
				CSaveDataConst.propNameStDefDivPlus,
				CSaveDataConst.propNameStMdefDivPlusSign,
				CSaveDataConst.propNameStMdefDivPlus,
				CSaveDataConst.propNameStHealUpUsingSign,
				CSaveDataConst.propNameStHealUpUsing,
				CSaveDataConst.propNameStHealUpUsedSign,
				CSaveDataConst.propNameStHealUpUsed,
				CSaveDataConst.propNameStPowPlusSign,
				CSaveDataConst.propNameStPowPlus,
				CSaveDataConst.propNameStStaPlusSign,
				CSaveDataConst.propNameStStaPlus,
				CSaveDataConst.propNameStWisPlusSign,
				CSaveDataConst.propNameStWisPlus,
				CSaveDataConst.propNameStSplPlusSign,
				CSaveDataConst.propNameStSplPlus,
				CSaveDataConst.propNameStConPlusSign,
				CSaveDataConst.propNameStConPlus,
				CSaveDataConst.propNameStCrtPlusSign,
				CSaveDataConst.propNameStCrtPlus,
				CSaveDataConst.propNameStPAtkPlusSign,
				CSaveDataConst.propNameStPAtkPlus,
				CSaveDataConst.propNameStSMatkPlusSign,
				CSaveDataConst.propNameStSMatkPlus,
				CSaveDataConst.propNameStHPlusPlusSign,
				CSaveDataConst.propNameStHPlusPlus,
				CSaveDataConst.propNameStCRatePlusSign,
				CSaveDataConst.propNameStCRatePlus,
				CSaveDataConst.propNameStResPlusSign,
				CSaveDataConst.propNameStResPlus,
				CSaveDataConst.propNameStMresPlusSign,
				CSaveDataConst.propNameStMresPlus,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 87);

			this.registerPropInfo(CSaveDataConst.propNameStMaxHPUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMaxHPUp, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStMaxHPPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMaxHPPlus, CSaveDataConst.propBitsMaxAbs100k);
			this.registerPropInfo(CSaveDataConst.propNameStMaxSPUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMaxSPUp, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStMaxSPPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMaxSPPlus, CSaveDataConst.propBitsMaxAbs100k);
			this.registerPropInfo(CSaveDataConst.propNameStHPRUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHPRUp, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStSPRUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSPRUp, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStStrPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStStrPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStAgiPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAgiPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStVitPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStVitPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStIntPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStIntPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStDexPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStDexPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStLukPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStLukPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStHitPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHitPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStFleePlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStFleePlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStCriPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCriPlus, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStLuckyPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStLuckyPlus, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStAspdUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAspdUp, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStAspdPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAspdPlus, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStCastDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCastDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStFixedDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStFixedDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStDelayDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStDelayDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStCostDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCostDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameChangeArmsAtk, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameChangeArmsMatk, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameChangeArmsLv, 3);
			this.registerPropInfo(CSaveDataConst.propNameStAtkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAtkPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStPerfectAttackUp, 7);
			this.registerPropInfo(CSaveDataConst.propNameStWeaponAtkUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStWeaponAtkUp, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStRange, 5);
			this.registerPropInfo(CSaveDataConst.propNameStMatkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMatkPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStDefDivPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStDefDivPlus, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStMdefDivPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMdefDivPlus, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStHealUpUsingSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHealUpUsing, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStHealUpUsedSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHealUpUsed, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStPowPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPowPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStStaPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStStaPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStWisPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStWisPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStSplPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSplPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStConPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStConPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStCrtPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCrtPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStPAtkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPAtkPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStSMatkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSMatkPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStHPlusPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHPlusPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStCRatePlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCRatePlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs1k);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：性能カスタマイズ（特化）.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaConfSpecialize extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 819;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.instanceKind,
				CSaveDataConst.propNameSubInvalidateSettings,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameSpecDamageSign,
				CSaveDataConst.propNameSpecDamage,
				CSaveDataConst.propNameSpecCriticalDamageSign,
				CSaveDataConst.propNameSpecCriticalDamage,
				CSaveDataConst.propNameSpecMapSign,
				CSaveDataConst.propNameSpecMap,

				CSaveDataConst.propNameSpecRaceSolidSign,
				CSaveDataConst.propNameSpecRaceSolid,
				CSaveDataConst.propNameSpecRaceUndeadSign,
				CSaveDataConst.propNameSpecRaceUndead,
				CSaveDataConst.propNameSpecRaceAnimalSign,
				CSaveDataConst.propNameSpecRaceAnimal,
				CSaveDataConst.propNameSpecRacePlantSign,
				CSaveDataConst.propNameSpecRacePlant,
				CSaveDataConst.propNameSpecRaceInsectSign,
				CSaveDataConst.propNameSpecRaceInsect,
				CSaveDataConst.propNameSpecRaceFishSign,
				CSaveDataConst.propNameSpecRaceFish,
				CSaveDataConst.propNameSpecRaceDemonSign,
				CSaveDataConst.propNameSpecRaceDemon,
				CSaveDataConst.propNameSpecRaceHumanSign,
				CSaveDataConst.propNameSpecRaceHuman,
				CSaveDataConst.propNameSpecRaceAngelSign,
				CSaveDataConst.propNameSpecRaceAngel,
				CSaveDataConst.propNameSpecRaceDragonSign,
				CSaveDataConst.propNameSpecRaceDragon,
				CSaveDataConst.propNameSpecRaceDoramSign,
				CSaveDataConst.propNameSpecRaceDoram,
				CSaveDataConst.propNameSpecRaceAllSign,
				CSaveDataConst.propNameSpecRaceAll,
				CSaveDataConst.propNameSpecRaceHumanNotPlayerSign,
				CSaveDataConst.propNameSpecRaceHumanNotPlayer,

				CSaveDataConst.propNameSpecAttackElementVanitySign,
				CSaveDataConst.propNameSpecAttackElementVanity,
				CSaveDataConst.propNameSpecAttackElementWaterSign,
				CSaveDataConst.propNameSpecAttackElementWater,
				CSaveDataConst.propNameSpecAttackElementEarthSign,
				CSaveDataConst.propNameSpecAttackElementEarth,
				CSaveDataConst.propNameSpecAttackElementFireSign,
				CSaveDataConst.propNameSpecAttackElementFire,
				CSaveDataConst.propNameSpecAttackElementWindSign,
				CSaveDataConst.propNameSpecAttackElementWind,
				CSaveDataConst.propNameSpecAttackElementPoisonSign,
				CSaveDataConst.propNameSpecAttackElementPoison,
				CSaveDataConst.propNameSpecAttackElementHolySign,
				CSaveDataConst.propNameSpecAttackElementHoly,
				CSaveDataConst.propNameSpecAttackElementDarkSign,
				CSaveDataConst.propNameSpecAttackElementDark,
				CSaveDataConst.propNameSpecAttackElementPsycoSign,
				CSaveDataConst.propNameSpecAttackElementPsyco,
				CSaveDataConst.propNameSpecAttackElementUndeadSign,
				CSaveDataConst.propNameSpecAttackElementUndead,
				CSaveDataConst.propNameSpecAttackElementAllSign,
				CSaveDataConst.propNameSpecAttackElementAll,

				CSaveDataConst.propNameSpecMobElementVanitySign,
				CSaveDataConst.propNameSpecMobElementVanity,
				CSaveDataConst.propNameSpecMobElementWaterSign,
				CSaveDataConst.propNameSpecMobElementWater,
				CSaveDataConst.propNameSpecMobElementEarthSign,
				CSaveDataConst.propNameSpecMobElementEarth,
				CSaveDataConst.propNameSpecMobElementFireSign,
				CSaveDataConst.propNameSpecMobElementFire,
				CSaveDataConst.propNameSpecMobElementWindSign,
				CSaveDataConst.propNameSpecMobElementWind,
				CSaveDataConst.propNameSpecMobElementPoisonSign,
				CSaveDataConst.propNameSpecMobElementPoison,
				CSaveDataConst.propNameSpecMobElementHolySign,
				CSaveDataConst.propNameSpecMobElementHoly,
				CSaveDataConst.propNameSpecMobElementDarkSign,
				CSaveDataConst.propNameSpecMobElementDark,
				CSaveDataConst.propNameSpecMobElementPsycoSign,
				CSaveDataConst.propNameSpecMobElementPsyco,
				CSaveDataConst.propNameSpecMobElementUndeadSign,
				CSaveDataConst.propNameSpecMobElementUndead,
				CSaveDataConst.propNameSpecMobElementAllSign,
				CSaveDataConst.propNameSpecMobElementAll,

				CSaveDataConst.propNameSpecSizeSmallSign,
				CSaveDataConst.propNameSpecSizeSmall,
				CSaveDataConst.propNameSpecSizeMediumSign,
				CSaveDataConst.propNameSpecSizeMedium,
				CSaveDataConst.propNameSpecSizeLargeSign,
				CSaveDataConst.propNameSpecSizeLarge,
				CSaveDataConst.propNameSpecSizeAllSign,
				CSaveDataConst.propNameSpecSizeAll,

				CSaveDataConst.propNameSpecBossTypeBossSign,
				CSaveDataConst.propNameSpecBossTypeBoss,
				CSaveDataConst.propNameSpecBossTypeNormalSign,
				CSaveDataConst.propNameSpecBossTypeNormal,
				CSaveDataConst.propNameSpecBossTypeAllSign,
				CSaveDataConst.propNameSpecBossTypeAll,

				CSaveDataConst.propNameSpecRangeShortSign,
				CSaveDataConst.propNameSpecRangeShort,
				CSaveDataConst.propNameSpecRangeLongSign,
				CSaveDataConst.propNameSpecRangeLong,
				CSaveDataConst.propNameSpecRangeAllSign,
				CSaveDataConst.propNameSpecRangeAll,

				CSaveDataConst.propNameSpecPlayerHumanSign,
				CSaveDataConst.propNameSpecPlayerHuman,
				CSaveDataConst.propNameSpecPlayerDoramSign,
				CSaveDataConst.propNameSpecPlayerDoram,
				CSaveDataConst.propNameSpecPlayerAllSign,
				CSaveDataConst.propNameSpecPlayerAll,

				CSaveDataConst.propNameIgnoreDefenceRaceAll,
				CSaveDataConst.propNameKiriEffect,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.instanceKind, 6);
			this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 104);

			this.registerPropInfo(CSaveDataConst.propNameSpecDamageSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecDamage, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecCriticalDamageSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCriticalDamage, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameSpecMapSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMap, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecRaceSolidSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceSolid, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceUndeadSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceUndead, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAnimalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAnimal, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRacePlantSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRacePlant, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceInsectSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceInsect, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceFishSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceFish, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDemonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDemon, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceHuman, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAngelSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAngel, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDragonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDragon, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDoramSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceDoram, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceAll, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanNotPlayerSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRaceHumanNotPlayer, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementVanitySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementVanity, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWaterSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWater, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementEarthSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementEarth, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementFireSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementFire, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWindSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementWind, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPoisonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPoison, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementHolySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementHoly, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementDarkSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementDark, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPsycoSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementPsyco, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementUndeadSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementUndead, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecAttackElementAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementVanitySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementVanity, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWaterSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWater, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementEarthSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementEarth, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementFireSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementFire, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWindSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementWind, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPoisonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPoison, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementHolySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementHoly, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementDarkSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementDark, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPsycoSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementPsyco, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementUndeadSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementUndead, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecMobElementAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecSizeSmallSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeSmall, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeMediumSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeMedium, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeLargeSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeLarge, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecSizeAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeBossSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeBoss, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeNormalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeNormal, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecBossTypeAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecRangeShortSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRangeShort, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRangeLongSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRangeLong, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecRangeAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecRangeAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerHumanSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerHuman, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerDoramSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerDoram, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerAllSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecPlayerAll, CSaveDataConst.propBitsMaxAbs500);

			this.registerPropInfo(CSaveDataConst.propNameIgnoreDefenceRaceAll, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameKiriEffect, 1);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：性能カスタマイズ（スキル）.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaConfSkill extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 820;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameSubInvalidateSettings,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameSkillID,
				CSaveDataConst.propNameSpecDamageUpConditionType,
				CSaveDataConst.propNameSpecDamageUpConditionValue,
				CSaveDataConst.propNameSpecDamageUpSign,
				CSaveDataConst.propNameSpecDamageUp,
				CSaveDataConst.propNameSpecCostSPMinusSign,
				CSaveDataConst.propNameSpecCostSPMinus,
				CSaveDataConst.propNameSpecCostSPDownSign,
				CSaveDataConst.propNameSpecCostSPDown,
				CSaveDataConst.propNameSpecCastTimeMinusSign,
				CSaveDataConst.propNameSpecCastTimeMinus,
				CSaveDataConst.propNameSpecCastTimeDownSign,
				CSaveDataConst.propNameSpecCastTimeDown,
				CSaveDataConst.propNameSpecFixedTimeMinusSign,
				CSaveDataConst.propNameSpecFixedTimeMinus,
				CSaveDataConst.propNameSpecFixedTimeDownSign,
				CSaveDataConst.propNameSpecFixedTimeDown,
				CSaveDataConst.propNameSpecCoolTimeMinusSign,
				CSaveDataConst.propNameSpecCoolTimeMinus,
				CSaveDataConst.propNameSpecCoolTimeDownSign,
				CSaveDataConst.propNameSpecCoolTimeDown,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 21);

			this.registerPropInfo(CSaveDataConst.propNameSkillID, 11);
			this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpConditionType, 4);
			this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpConditionValue, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameSpecDamageUpSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecDamageUp, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameSpecCostSPMinusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCostSPMinus, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameSpecCostSPDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCostSPDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeMinusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeMinus, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCastTimeDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeMinusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeMinus, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecFixedTimeDown, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeMinusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeMinus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeDownSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameSpecCoolTimeDown, CSaveDataConst.propBitsMaxAbs100);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：モンスター設定.
 */
const SAVE_DATA_UNIT_TYPE_MOB = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMob extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 821;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 2;
		}

		// オーバーライドされた parse 関数
		parse (dataText, bitOffset) {
			let nextOffset = super.parse(dataText, bitOffset);
			if (this.getProp("version") == 1n) {
				this.propInfoMap.delete(CSaveDataConst.propNameMonsterID);
				const prop = new CSaveDataPropInfo(CSaveDataConst.propNameMonsterID, 11);
				this.propInfoMap.set(CSaveDataConst.propNameMonsterID, prop);
				this.parsedMap.clear();
				nextOffset = super.parse(dataText, bitOffset);
			}
			return nextOffset;
		}


		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameMonsterMapCategoryID,
				CSaveDataConst.propNameMonsterMapID,
				CSaveDataConst.propNameMonsterID,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameMonsterMapCategoryID, 8);
			this.registerPropInfo(CSaveDataConst.propNameMonsterMapID, 10);
			//this.registerPropInfo(CSaveDataConst.propNameMonsterID, 11);	version 1
			this.registerPropInfo(CSaveDataConst.propNameMonsterID, 16);
		}



		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			return false;
		}
	}
);



/**
 * セーブデータユニットクラス：対プレイヤー設定.
 */
const SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMobConfPlayer extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 822;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameStMaxHP,
				CSaveDataConst.propNameStDefDiv,
				CSaveDataConst.propNameStDefMinus,
				CSaveDataConst.propNameStMdefDiv,
				CSaveDataConst.propNameStMdefMinus,
				CSaveDataConst.propNameStFlee,
				CSaveDataConst.propNameStLucky,
				CSaveDataConst.propNameStBodyElement,
				CSaveDataConst.propNameStResistRaceHumanSign,
				CSaveDataConst.propNameStResistRaceHuman,
				CSaveDataConst.propNameStResistSizeMediumSign,
				CSaveDataConst.propNameStResistSizeMedium,
				CSaveDataConst.propNameStResistRangeLongSign,
				CSaveDataConst.propNameStResistRangeLong,
				CSaveDataConst.propNameStResistElementVanitySign,
				CSaveDataConst.propNameStResistElementVanity,
				CSaveDataConst.propNameStResistElementWaterSign,
				CSaveDataConst.propNameStResistElementWater,
				CSaveDataConst.propNameStResistElementEarthSign,
				CSaveDataConst.propNameStResistElementEarth,
				CSaveDataConst.propNameStResistElementFireSign,
				CSaveDataConst.propNameStResistElementFire,
				CSaveDataConst.propNameStResistElementWindSign,
				CSaveDataConst.propNameStResistElementWind,
				CSaveDataConst.propNameStResistElementPoisonSign,
				CSaveDataConst.propNameStResistElementPoison,
				CSaveDataConst.propNameStResistElementHolySign,
				CSaveDataConst.propNameStResistElementHoly,
				CSaveDataConst.propNameStResistElementDarkSign,
				CSaveDataConst.propNameStResistElementDark,
				CSaveDataConst.propNameStResistElementPsycoSign,
				CSaveDataConst.propNameStResistElementPsyco,
				CSaveDataConst.propNameStResistElementUndeadSign,
				CSaveDataConst.propNameStResistElementUndead,
				CSaveDataConst.propNameStResistBossNormalSign,
				CSaveDataConst.propNameStResistBossNormal,
				CSaveDataConst.propNameStResistMonsterElementAnySign,
				CSaveDataConst.propNameStResistMonsterElementAny,
				CSaveDataConst.propNameStResistPhysicalSign,
				CSaveDataConst.propNameStResistPhysical,
				CSaveDataConst.propNameStResistMagicalSign,
				CSaveDataConst.propNameStResistMagical,
				CSaveDataConst.propNameStResistRaceDoramSign,
				CSaveDataConst.propNameStResistRaceDoram,
				CSaveDataConst.propNameBuffEnergyCoat,
				CSaveDataConst.propNameBuffHansha1,
				CSaveDataConst.propNameBuffHansha2,
				CSaveDataConst.propNameStBaseLv,
				CSaveDataConst.propNameStStrSign,
				CSaveDataConst.propNameStStr,
				CSaveDataConst.propNameStAgiSign,
				CSaveDataConst.propNameStAgi,
				CSaveDataConst.propNameStVitSign,
				CSaveDataConst.propNameStVit,
				CSaveDataConst.propNameStIntSign,
				CSaveDataConst.propNameStInt,
				CSaveDataConst.propNameStDexSign,
				CSaveDataConst.propNameStDex,
				CSaveDataConst.propNameStLukSign,
				CSaveDataConst.propNameStLuk,
				CSaveDataConst.propNameStWeightNow,
				CSaveDataConst.propNameStWeightMax,
				CSaveDataConst.propNameConfBattleArea,
				CSaveDataConst.propNameStResistSizeSmallSign,
				CSaveDataConst.propNameStResistSizeSmall,
				CSaveDataConst.propNameStRace,

				CSaveDataConst.propNameStResPlusSign,
				CSaveDataConst.propNameStResPlus,
				CSaveDataConst.propNameStMresPlusSign,
				CSaveDataConst.propNameStMresPlus,

				CSaveDataConst.propNameStPowSign,
				CSaveDataConst.propNameStPow,
				CSaveDataConst.propNameStStaSign,
				CSaveDataConst.propNameStSta,
				CSaveDataConst.propNameStWisSign,
				CSaveDataConst.propNameStWis,
				CSaveDataConst.propNameStSplSign,
				CSaveDataConst.propNameStSpl,
/*				CSaveDataConst.propNameStConSign,
				CSaveDataConst.propNameStCon,
				CSaveDataConst.propNameStCrtSign,
				CSaveDataConst.propNameStCrt,*/
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			// （旧形式の領域的には52個用意されていたが末尾は使用していなかったので切り捨て）
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 78);

			this.registerPropInfo(CSaveDataConst.propNameStMaxHP, CSaveDataConst.propBitsMaxAbs4M);
			this.registerPropInfo(CSaveDataConst.propNameStDefDiv, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStDefMinus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStMdefDiv, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStMdefMinus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStFlee, CSaveDataConst.propBitsMaxAbs4k);
			this.registerPropInfo(CSaveDataConst.propNameStLucky, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStBodyElement, 6);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceHumanSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceHuman, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeMediumSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeMedium, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistRangeLongSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRangeLong, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementVanitySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementVanity, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWaterSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWater, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementEarthSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementEarth, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementFireSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementFire, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWindSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWind, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPoisonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPoison, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementHolySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementHoly, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementDarkSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementDark, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPsycoSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPsyco, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementUndeadSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementUndead, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistBossNormalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistBossNormal, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAnySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAny, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistPhysicalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistPhysical, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistMagicalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistMagical, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoramSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoram, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameBuffEnergyCoat, 4);
			this.registerPropInfo(CSaveDataConst.propNameBuffHansha1, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameBuffHansha2, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStBaseLv, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStStrSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStStr, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStAgiSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAgi, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStVitSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStVit, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStIntSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStInt, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStDexSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStDex, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStLukSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStLuk, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStWeightNow, 14);
			this.registerPropInfo(CSaveDataConst.propNameStWeightMax, 14);
			this.registerPropInfo(CSaveDataConst.propNameConfBattleArea, 4);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmallSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmall, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStRace, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStPowSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPow, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStStaSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSta, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStWisSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStWis, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStSplSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSpl, CSaveDataConst.propBitsMaxAbs1k);
/*			this.registerPropInfo(CSaveDataConst.propNameStConSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCon, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStCrtSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCrt, CSaveDataConst.propBitsMaxAbs1k);*/
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：対プレイヤー設定2.
 */
const SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2 = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMobConfPlayer2 extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 830;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameStMaxHP,
				CSaveDataConst.propNameStDefDiv,
				CSaveDataConst.propNameStDefMinus,
				CSaveDataConst.propNameStMdefDiv,
				CSaveDataConst.propNameStMdefMinus,
				CSaveDataConst.propNameStFlee,
				CSaveDataConst.propNameStLucky,
				CSaveDataConst.propNameStBodyElement,
				CSaveDataConst.propNameStResistRaceHumanSign,
				CSaveDataConst.propNameStResistRaceHuman,
				CSaveDataConst.propNameStResistSizeMediumSign,
				CSaveDataConst.propNameStResistSizeMedium,
				CSaveDataConst.propNameStResistRangeLongSign,
				CSaveDataConst.propNameStResistRangeLong,
				CSaveDataConst.propNameStResistElementVanitySign,
				CSaveDataConst.propNameStResistElementVanity,
				CSaveDataConst.propNameStResistElementWaterSign,
				CSaveDataConst.propNameStResistElementWater,
				CSaveDataConst.propNameStResistElementEarthSign,
				CSaveDataConst.propNameStResistElementEarth,
				CSaveDataConst.propNameStResistElementFireSign,
				CSaveDataConst.propNameStResistElementFire,
				CSaveDataConst.propNameStResistElementWindSign,
				CSaveDataConst.propNameStResistElementWind,
				CSaveDataConst.propNameStResistElementPoisonSign,
				CSaveDataConst.propNameStResistElementPoison,
				CSaveDataConst.propNameStResistElementHolySign,
				CSaveDataConst.propNameStResistElementHoly,
				CSaveDataConst.propNameStResistElementDarkSign,
				CSaveDataConst.propNameStResistElementDark,
				CSaveDataConst.propNameStResistElementPsycoSign,
				CSaveDataConst.propNameStResistElementPsyco,
				CSaveDataConst.propNameStResistElementUndeadSign,
				CSaveDataConst.propNameStResistElementUndead,
				CSaveDataConst.propNameStResistBossNormalSign,
				CSaveDataConst.propNameStResistBossNormal,
				CSaveDataConst.propNameStResistMonsterElementAnySign,
				CSaveDataConst.propNameStResistMonsterElementAny,
				CSaveDataConst.propNameStResistPhysicalSign,
				CSaveDataConst.propNameStResistPhysical,
				CSaveDataConst.propNameStResistMagicalSign,
				CSaveDataConst.propNameStResistMagical,
				CSaveDataConst.propNameStResistRaceDoramSign,
				CSaveDataConst.propNameStResistRaceDoram,
				CSaveDataConst.propNameBuffEnergyCoat,
				CSaveDataConst.propNameBuffHansha1,
				CSaveDataConst.propNameBuffHansha2,
				CSaveDataConst.propNameStBaseLv,
				CSaveDataConst.propNameStStrSign,
				CSaveDataConst.propNameStStr,
				CSaveDataConst.propNameStAgiSign,
				CSaveDataConst.propNameStAgi,
				CSaveDataConst.propNameStVitSign,
				CSaveDataConst.propNameStVit,
				CSaveDataConst.propNameStIntSign,
				CSaveDataConst.propNameStInt,
				CSaveDataConst.propNameStDexSign,
				CSaveDataConst.propNameStDex,
				CSaveDataConst.propNameStLukSign,
				CSaveDataConst.propNameStLuk,
				CSaveDataConst.propNameStWeightNow,
				CSaveDataConst.propNameStWeightMax,
				CSaveDataConst.propNameConfBattleArea,
				CSaveDataConst.propNameStResistSizeSmallSign,
				CSaveDataConst.propNameStResistSizeSmall,
				CSaveDataConst.propNameStRace,

				CSaveDataConst.propNameStResPlusSign,
				CSaveDataConst.propNameStResPlus,
				CSaveDataConst.propNameStMresPlusSign,
				CSaveDataConst.propNameStMresPlus,
				CSaveDataConst.propNameStPowSign,
				CSaveDataConst.propNameStPow,
				CSaveDataConst.propNameStStaSign,
				CSaveDataConst.propNameStSta,
				CSaveDataConst.propNameStWisSign,
				CSaveDataConst.propNameStWis,
				CSaveDataConst.propNameStSplSign,
				CSaveDataConst.propNameStSpl,
				CSaveDataConst.propNameStConSign,
				CSaveDataConst.propNameStCon,
				CSaveDataConst.propNameStCrtSign,
				CSaveDataConst.propNameStCrt,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			// （旧形式の領域的には52個用意されていたが末尾は使用していなかったので切り捨て）
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 82);

			this.registerPropInfo(CSaveDataConst.propNameStMaxHP, CSaveDataConst.propBitsMaxAbs4M);
			this.registerPropInfo(CSaveDataConst.propNameStDefDiv, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStDefMinus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStMdefDiv, CSaveDataConst.propBitsMaxAbs10k);
			this.registerPropInfo(CSaveDataConst.propNameStMdefMinus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStFlee, CSaveDataConst.propBitsMaxAbs4k);
			this.registerPropInfo(CSaveDataConst.propNameStLucky, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStBodyElement, 6);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceHumanSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceHuman, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeMediumSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeMedium, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistRangeLongSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRangeLong, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementVanitySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementVanity, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWaterSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWater, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementEarthSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementEarth, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementFireSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementFire, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWindSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementWind, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPoisonSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPoison, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementHolySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementHoly, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementDarkSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementDark, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPsycoSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementPsyco, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementUndeadSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistElementUndead, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistBossNormalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistBossNormal, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAnySign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistMonsterElementAny, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistPhysicalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistPhysical, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistMagicalSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistMagical, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoramSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistRaceDoram, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameBuffEnergyCoat, 4);
			this.registerPropInfo(CSaveDataConst.propNameBuffHansha1, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameBuffHansha2, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameStBaseLv, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStStrSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStStr, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStAgiSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStAgi, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStVitSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStVit, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStIntSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStInt, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStDexSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStDex, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStLukSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStLuk, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStWeightNow, 14);
			this.registerPropInfo(CSaveDataConst.propNameStWeightMax, 14);
			this.registerPropInfo(CSaveDataConst.propNameConfBattleArea, 4);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmallSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResistSizeSmall, CSaveDataConst.propBitsMaxAbs200);
			this.registerPropInfo(CSaveDataConst.propNameStRace, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStPowSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPow, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStStaSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSta, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStWisSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStWis, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStSplSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSpl, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStConSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCon, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameStCrtSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCrt, CSaveDataConst.propBitsMaxAbs1k);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：モンスター手入力欄.
 */
const SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMobConfInput extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 823;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameMobLv,
				CSaveDataConst.propNameMobHP,
				CSaveDataConst.propNameStStr,
				CSaveDataConst.propNameStInt,
				CSaveDataConst.propNameStVit,
				CSaveDataConst.propNameStDex,
				CSaveDataConst.propNameStAgi,
				CSaveDataConst.propNameStLuk,
				CSaveDataConst.propNameStAtk,
				CSaveDataConst.propNameStMatk,
				CSaveDataConst.propNameStRange,
				CSaveDataConst.propNameStDefDiv,
				CSaveDataConst.propNameStMdefDiv,
				CSaveDataConst.propNameBaseExp,
				CSaveDataConst.propNameJobExp,
				CSaveDataConst.propNameMobSize,
				CSaveDataConst.propNameMobElement,
				CSaveDataConst.propNameMobRace,
				CSaveDataConst.propNameMobBossType,
				CSaveDataConst.propNameMobGrassType,

				CSaveDataConst.propNameStPow,
				CSaveDataConst.propNameStSta,
				CSaveDataConst.propNameStWis,
				CSaveDataConst.propNameStSpl,
				CSaveDataConst.propNameStCon,
				CSaveDataConst.propNameStCrt,
				CSaveDataConst.propNameStPAtk,
				CSaveDataConst.propNameStSMatk,
				CSaveDataConst.propNameStHPlus,
				CSaveDataConst.propNameStCRate,
				CSaveDataConst.propNameStRes,
				CSaveDataConst.propNameStMres,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 1);
			// （旧形式の領域的には52個用意されていたが末尾は使用していなかったので切り捨て）
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 32);

			this.registerPropInfo(CSaveDataConst.propNameMobLv, CSaveDataConst.propBitsMaxAbs1k);
			this.registerPropInfo(CSaveDataConst.propNameMobHP, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStStr, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStAgi, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStVit, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStInt, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStDex, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStLuk, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStAtk, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStMatk, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStRange, 6);
			this.registerPropInfo(CSaveDataConst.propNameStDefDiv, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameStMdefDiv, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameBaseExp, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameJobExp, CSaveDataConst.propBitsMaxAbs10G);
			this.registerPropInfo(CSaveDataConst.propNameMobSize, 6);
			this.registerPropInfo(CSaveDataConst.propNameMobElement, CSaveDataConst.propBitsMaxAbs100);
			this.registerPropInfo(CSaveDataConst.propNameMobRace, 6);
			this.registerPropInfo(CSaveDataConst.propNameMobBossType, 6);
			this.registerPropInfo(CSaveDataConst.propNameMobGrassType, 6);

			this.registerPropInfo(CSaveDataConst.propNameStPow, 14);
			this.registerPropInfo(CSaveDataConst.propNameStSta, 14);
			this.registerPropInfo(CSaveDataConst.propNameStWis, 14);
			this.registerPropInfo(CSaveDataConst.propNameStSpl, 14);
			this.registerPropInfo(CSaveDataConst.propNameStCon, 14);
			this.registerPropInfo(CSaveDataConst.propNameStCrt, 14);
			this.registerPropInfo(CSaveDataConst.propNameStPAtk, 14);
			this.registerPropInfo(CSaveDataConst.propNameStSMatk, 14);
			this.registerPropInfo(CSaveDataConst.propNameStHPlus, 14);
			this.registerPropInfo(CSaveDataConst.propNameStCRate, 14);
			this.registerPropInfo(CSaveDataConst.propNameStRes, 14);
			this.registerPropInfo(CSaveDataConst.propNameStMres, 14);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {

			const defaultValues = [0n, 1n];
			const propNames = this.constructor.#propNamesSelf.slice();

			// すべてのプロパティがデフォルト値であるかを検査する
			for (let idx = 0; idx < propNames.length; idx++) {

				const propName = propNames[idx];

				/// そもそもパースされたデータがない場合は、デフォルトとみなす
				if (this.getProp(propName) === undefined) {
					continue;
				}

				// デフォルト値であるかの検査
				switch (propName) {
					case CSaveDataConst.propNameOptCode:
						continue;
					case CSaveDataConst.propNameParseCtrlFlag:
						continue;
					case CSaveDataConst.propNameMobLv:
					case CSaveDataConst.propNameMobHP:
					case CSaveDataConst.propNameStStr:
					case CSaveDataConst.propNameStAgi:
					case CSaveDataConst.propNameStVit:
					case CSaveDataConst.propNameStInt:
					case CSaveDataConst.propNameStDex:
					case CSaveDataConst.propNameStLuk:
					case CSaveDataConst.propNameStAtk:
					case CSaveDataConst.propNameStMatk:
					case CSaveDataConst.propNameStRange:
					case CSaveDataConst.propNameStDefDiv:
					case CSaveDataConst.propNameStMdefDiv:
					case CSaveDataConst.propNameBaseExp:
					case CSaveDataConst.propNameJobExp:
						if (defaultValues.indexOf(this.getProp(propName)) == -1) {
							break;
						}
						continue;
					case CSaveDataConst.propNameMobSize:
					case CSaveDataConst.propNameMobRace:
					case CSaveDataConst.propNameMobBossType:
					case CSaveDataConst.propNameMobGrassType:
					case CSaveDataConst.propNameStPow:
					case CSaveDataConst.propNameStSta:
					case CSaveDataConst.propNameStWis:
					case CSaveDataConst.propNameStSpl:
					case CSaveDataConst.propNameStCon:
					case CSaveDataConst.propNameStCrt:
					case CSaveDataConst.propNameStPAtk:
					case CSaveDataConst.propNameStSMatk:
					case CSaveDataConst.propNameStHPlus:
					case CSaveDataConst.propNameStCRate:
					case CSaveDataConst.propNameStRes:
					case CSaveDataConst.propNameStMres:
						if (this.getProp(propName) != 0n) {
							break;
						}
						continue;
					case CSaveDataConst.propNameMobElement:
						if (this.getProp(propName) != 1n) {
							break;
						}
						continue;
					default:
						continue;
				}

				// ここに来るならばデフォルトでない値がある
				return false;
			}

			// ここに来るならば、すべての設定がデフォルトのまま
			return true;
		}
	}
);



/**
 * セーブデータユニットクラス：敵BUFF.
 */
const SAVE_DATA_UNIT_TYPE_MOB_BUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMobBuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 824;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、80個
				// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
				...(Array(80).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 80);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 8);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：敵DEBUFF.
 */
const SAVE_DATA_UNIT_TYPE_MOB_DEBUFF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitMobDebuff extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 825;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				// データは、初期バージョンでは、80個
				// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
				...(Array(80).fill(CSaveDataConst.propNameBuffLv)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 80);
			this.registerPropInfo(CSaveDataConst.propNameBuffLv, 8);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：戦闘結果情報.
 */
const SAVE_DATA_UNIT_TYPE_ATTACK_CONF = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitAttackConf extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 826;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameOptCode,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameAttackSkillID,
				CSaveDataConst.propNameSourceTypeID,
				CSaveDataConst.propNameAttackSkillLv,
				...(Array(5).fill(CSaveDataConst.propNameAttackSkillOption)),
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameOptCode, 6);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 11);

			this.registerPropInfo(CSaveDataConst.propNameAttackSkillID, 11);
			this.registerPropInfo(CSaveDataConst.propNameSourceTypeID, 6);
			this.registerPropInfo(CSaveDataConst.propNameAttackSkillLv, 4);
			this.registerPropInfo(CSaveDataConst.propNameAttackSkillOption, 18);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			return false;
		}
	}
);



/**
 * セーブデータユニットクラス：計算機設定.
 */
const SAVE_DATA_UNIT_TYPE_SETTINGS = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitSettings extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 827;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 2;
		}

		// オーバーライドされた parse 関数
		parse (dataText, bitOffset) {
			// バージョニングできていない古いデータ形式の互換性確保
			if (dataText.length < 7) {
				let nextOffset = super.parse(dataText + "0", bitOffset);
				// 古いバージョンで AttackAutoCalc として使われていたデータを、現行バージョンでは ConfirmDialogSwitch として扱う
				const attach_auto_calc_old = this.parsedMap.get(CSaveDataConst.propNameConfirmDialogSwitch);
				this.parsedMap.set(CSaveDataConst.propNameAttackAutoCalc, attach_auto_calc_old);
				return nextOffset;
			}
			// 以降、通常の互換性確保
			let nextOffset = super.parse(dataText, bitOffset);
			if (this.getProp(CSaveDataConst.propNameVersion) == 1n) {
			}
			// バージョン更新
			this.setProp(CSaveDataConst.propNameVersion, this.constructor.version);
			return nextOffset;
		}

		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameConfirmDialogSwitch, 
				CSaveDataConst.propNameResultDigit3,
				CSaveDataConst.propNameAttackInterval,
				CSaveDataConst.propNameCastSimInterval,
				CSaveDataConst.propNameAttackAutoCalc,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}

		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();
			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 5);
			this.registerPropInfo(CSaveDataConst.propNameConfirmDialogSwitch, 1);
			this.registerPropInfo(CSaveDataConst.propNameResultDigit3, 1);
			this.registerPropInfo(CSaveDataConst.propNameAttackInterval, 6);
			this.registerPropInfo(CSaveDataConst.propNameCastSimInterval, 8);
			this.registerPropInfo(CSaveDataConst.propNameAttackAutoCalc, 8);
		}

		/**
		 * データのデフォルト値を設定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		SetUpAsDefault() {
			super.SetUpAsDefault();
			this.setProp(CSaveDataConst.propNameConfirmDialogSwitch, 0);
			this.setProp(CSaveDataConst.propNameResultDigit3, 0);
			this.setProp(CSaveDataConst.propNameAttackInterval, 14);
			this.setProp(CSaveDataConst.propNameCastSimInterval, 10);
			this.setProp(CSaveDataConst.propNameAttackAutoCalc, 0);
		}

		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			return false;
		}
	}
);


/**
 * セーブデータユニットクラス：性能カスタマイズ（特性ステータス）.
 */
const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitCharaConfSpecBasic extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 828;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameSubInvalidateSettings,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameStPowPlusSign,
				CSaveDataConst.propNameStPowPlus,
				CSaveDataConst.propNameStStaPlusSign,
				CSaveDataConst.propNameStStaPlus,
				CSaveDataConst.propNameStWisPlusSign,
				CSaveDataConst.propNameStWisPlus,
				CSaveDataConst.propNameStSplPlusSign,
				CSaveDataConst.propNameStSplPlus,
				CSaveDataConst.propNameStConPlusSign,
				CSaveDataConst.propNameStConPlus,
				CSaveDataConst.propNameStCrtPlusSign,
				CSaveDataConst.propNameStCrtPlus,
				CSaveDataConst.propNameStPAtkPlusSign,
				CSaveDataConst.propNameStPAtkPlus,
				CSaveDataConst.propNameStSMatkPlusSign,
				CSaveDataConst.propNameStSMatkPlus,
				CSaveDataConst.propNameStHPlusPlusSign,
				CSaveDataConst.propNameStHPlusPlus,
				CSaveDataConst.propNameStCRatePlusSign,
				CSaveDataConst.propNameStCRatePlus,
				CSaveDataConst.propNameStResPlusSign,
				CSaveDataConst.propNameStResPlus,
				CSaveDataConst.propNameStMresPlusSign,
				CSaveDataConst.propNameStMresPlus,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 24);

			this.registerPropInfo(CSaveDataConst.propNameStPowPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPowPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStStaPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStStaPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStWisPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStWisPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStSplPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSplPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStConPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStConPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStCrtPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCrtPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStPAtkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStPAtkPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStSMatkPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStSMatkPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStHPlusPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStHPlusPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStCRatePlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStCRatePlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStResPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStResPlus, CSaveDataConst.propBitsMaxAbs500);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlusSign, 1);
			this.registerPropInfo(CSaveDataConst.propNameStMresPlus, CSaveDataConst.propBitsMaxAbs500);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);



/**
 * セーブデータユニットクラス：矢.
 */
const SAVE_DATA_UNIT_TYPE_EQUIP_ARROW = CSaveDataUnitTypeManager.register(
	class CSaveDataUnitEquipArrow extends CSaveDataUnitBase {

		/**
		 * タイプ値.
		 */
		static get type () {
			return 829;
		}

		/**
		 * バージョン番号.
		 */
		static get version () {
			return 1;
		}



		/**
		 * 処理順に並んだプロパティ名（自身のプロパティのみ）.
		 */
		static get #propNamesSelf () {
			return [
				CSaveDataConst.propNameSubInvalidateSettings,
				CSaveDataConst.propNameParseCtrlFlag,

				CSaveDataConst.propNameArrow,
			];
		}

		/**
		 * 処理順に並んだプロパティ名（継承プロパティ含む）.
		 */
		static get propNames () {
			return super.propNames.concat(this.#propNamesSelf);
		}



		/**
		 * コンストラクタ.
		 */
		constructor () {
			super();

			// プロパティ定義情報の登録
			this.registerPropInfo(CSaveDataConst.propNameSubInvalidateSettings, 1);
			this.registerPropInfo(CSaveDataConst.propNameParseCtrlFlag, 1);

			this.registerPropInfo(CSaveDataConst.propNameArrow, this.letterBits);
		}



		/**
		 * データのコンパクション（不要データの削除）を行う.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 */
		doCompaction () {
			// 共用のフラグ処理を利用
			this.doCompaction_ModifyFlagGT0();
		}

		/**
		 * ユニットのデータが空であるかを判定する.
		 * （継承先でオーバーライドして個別の処理を追加する）
		 * @returns {boolean} true:空である、false:空でない
		 */
		isEmptyUnit () {
			// 共用の判定処理を利用
			return this.isEmptyUnit_CtrlFlag0();
		}
	}
);























/**
 * セーブデータユニットクラス：パース開始用.
 * （他とは異なる特殊な構造、特殊な扱い）
 */
class CSaveDataUnitParse extends CSaveDataUnitBase {

	/**
	 * 許容されるタイプ値の最小値.
	 */
	get #typeValueMin () {
		// 新形式移行時に設定した、旧形式でのバージョン番号に当たる値
		// 文字あたりのデータ量を変更したので、変更後の値を基準に評価する
		return 800;
	}



	/**
	 * パースしたユニットの配列.
	 */
	#parsedUnitArray;

	/**
	 * セーブデータユニットの配列.
	 */
	get saveDataUnitArray () {
		return this.#parsedUnitArray;
	}



	/**
	 * コンストラクタ.
	 */
	constructor () {
		super();

		// メンバ変数の初期化
		this.#parsedUnitArray = [];
	}

	/**
	 * 全データをパースする.
	 * （継承先でオーバーライドして個別のデータパース処理を追加する）
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 * @param {int} bitOffset 読み取りオフセット（ビット数）
	 * @returns {int} パースした文字数
	 * @throws {Error} パース中に異常が検出された場合
	 */
	parse (dataText, bitOffset) {

		// 強制文字列化
		dataText = "" + dataText;

		while (bitOffset < (dataText.length * this.letterBits)) {

			// 基底クラスのパース処理を仮実施
			super.clear();
			super.parse(dataText, bitOffset);

			// パース結果から、ユニットのタイプ値を取得
			const unitType = this.getProp(CSaveDataConst.propNameType);

			// タイプ値が最小値よりも小さい場合は、旧形式のデータと判断して、移行処理に変更する
			if ((bitOffset == 0) && (unitType < this.#typeValueMin)) {
				const translated = this.translateFromOldFormat(dataText);
				return this.parse(translated, bitOffset);
			}

			// ユニットのタイプ値から、ユニットの処理クラスを取得
			const unitClass = CSaveDataUnitTypeManager.getUnitClass(unitType);

			// TODO: デバッグ用
			if (!unitClass) {
				break;
			}

			// ユニットの処理クラスで、パース処理を実施
			const unitInstance = new unitClass();
			bitOffset = unitInstance.parse(dataText, bitOffset);

			// ユニット処理クラスのインスタンスを保持
			unitInstance.doCompaction();
			this.#parsedUnitArray.push(unitInstance);
			
			// データユニットが中途半端なところで終わらないようパディングする
			bitOffset = Math.ceil(bitOffset / this.letterBits) * this.letterBits;
		}

		// オフセット位置はパースしたビット数に一致する
		return bitOffset;
	}

	/**
	 * 旧形式のセーブデータを、新形式のセーブデータに変換する.
	 * （前提として、旧形式の最新の構造には変換してあること）
	 * @param {string} dataText パース対象を含む文字表現データ文字列
	 */
	translateFromOldFormat (dataText) {

		let saveDataUnit = null;
		let dataTextWork = "";
		let bitOffset = 0;

		// 旧形式の文字表現データを、数値の配列にデコード
		const saveDataArrayOld = ConvertDataTextMIG(dataText);


		//--------------------------------
		// バージョン情報
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_VERSION))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset);

		//--------------------------------
		// キャラクターステータス（旧：基本情報＋特性ステータス＋オプション（自動レベル調整））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[11] > 0) ? 1 : 0),
			((GetHigherJobSeriesID(saveDataArrayOld[1]) == JOB_SERIES_ID_SUPERNOVICE) && (saveDataArrayOld[84] > 0) ? 1 : 0),
			saveDataArrayOld[1], saveDataArrayOld[2], saveDataArrayOld[3],
			saveDataArrayOld[4], saveDataArrayOld[5], saveDataArrayOld[6],
			saveDataArrayOld[8], saveDataArrayOld[7], saveDataArrayOld[9],
			saveDataArrayOld[1821], saveDataArrayOld[1822], saveDataArrayOld[1823],
			saveDataArrayOld[1824], saveDataArrayOld[1825], saveDataArrayOld[1826]
		);

		//--------------------------------
		// 装備アイテム（旧：装備アイテム）
		// （装備位置に従った仮のIDを設定）
		//--------------------------------
		for (let idxKind = 0; idxKind < 10; idxKind++) {

			// データ位置補正
			const idxBase = 15 + (6 * idxKind);
			const idxRndOpt = 1260 + (20 * idxKind);
			const idxCardCategory = 1781 + (4 * idxKind);

			// データ変換
			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				(1 + idxKind),
				0,
				((1n << 20n) - 1n),
				saveDataArrayOld[idxBase + 1], saveDataArrayOld[idxBase],
				saveDataArrayOld[idxCardCategory + 0], saveDataArrayOld[idxBase + 2],
				saveDataArrayOld[idxCardCategory + 1], saveDataArrayOld[idxBase + 3],
				saveDataArrayOld[idxCardCategory + 2], saveDataArrayOld[idxBase + 4],
				saveDataArrayOld[idxCardCategory + 3], saveDataArrayOld[idxBase + 5],
				...(saveDataArrayOld.slice(idxRndOpt, idxRndOpt + 10))
			);
		}
		// 矢、衣装も装備アイテム扱いにする
		// 矢
		const arrowIdModified = (GetLowerJobSeriesID(saveDataArrayOld[1]) == JOB_SERIES_ID_GUNSLINGER) ? (ITEM_ID_BULLET_NONE + saveDataArrayOld[12] - 26) : (ITEM_ID_ARROW_NONE + saveDataArrayOld[12]);
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			11,
			0,
			((1n << 20n) - 1n),
			arrowIdModified, 0,
			...(Array(8).fill(0)),
			...(Array(10).fill(0))
		);
		// 衣装
		const costumeIdModified = (saveDataArrayOld[1682] > 0) ? ITEM_ID_ISHO_BEGINNER_BO : ITEM_ID_ISHO_NONE;
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIPABLE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			12,
			0,
			((1n << 20n) - 1n),
			costumeIdModified, 0,
			...(Array(8).fill(0)),
			...(Array(10).fill(0))
		);

		//--------------------------------
		// 装備位置（装備）：（旧：※該当なし新規）
		// （従来から存在するすべての装備個所に仮のIDを設定）
		//--------------------------------
		const isShield = (ItemObjNew[saveDataArrayOld[22]][ITEM_DATA_INDEX_KIND] == ITEM_KIND_SHIELD);
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindItem,
			((1n << 12n) - 1n),
			1, (isShield ? 0 : 2), (isShield ? 2 : 0), 3, 4, 5, 6, 7, 8, 9, 10, 11
		);

		//--------------------------------
		// 装備位置（衣装）：（旧：下段衣装のビギナー帽）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindCostume,
			((1n << 12n) - 1n),
			...(Array(5).fill(0)), 12, ...(Array(6).fill(0))
		);

		//--------------------------------
		// 装備位置（シャドウ）：（旧：※該当なし新規）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.eqpRgnKindShadow,
			((1n << 12n) - 1n),
			...(Array(12).fill(0))
		);

		//--------------------------------
		// 習得スキル（旧：習得スキル）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 200n) - 1n),
			...(saveDataArrayOld.slice(1060, 1060 + 200))
		);

		//--------------------------------
		// キャラクターBUFF（旧：属性付与＋支援スキル８（その他の支援/設定））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[14],
			((1n << 70n) - 1n),
			...(saveDataArrayOld.slice(730, 730 + 70))
		);

		//--------------------------------
		// 自己スキルBUFF（旧：パッシブ持続系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(75, 75 + 100))
		);

		//--------------------------------
		// 一次職スキルBUFF（旧：一次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(175, 175 + 100))
		);

		//--------------------------------
		// 二次職スキルBUFF（旧：二次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 50n) - 1n),
			...(saveDataArrayOld.slice(609, 609 + 50))
		);

		//--------------------------------
		// 三次職スキルBUFF（旧：三次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 100n) - 1n),
			...(saveDataArrayOld.slice(1480, 1480 + 100))
		);

		//--------------------------------
		// 四次職スキルBUFF（旧：四次職支援設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 30n) - 1n),
			...(saveDataArrayOld.slice(1831, 1831 + 30))
		);

		//--------------------------------
		// 演奏スキルBUFF（旧：支援スキル３（演奏/踊り系スキル））
		// （領域的には61個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(448, 448 + 60))
		);

		//--------------------------------
		// ギルドスキルBUFF（旧：支援スキル４（ギルドスキル/ゴスペル/他））
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(509, 509 + 60))
		);

		//--------------------------------
		// アイテムBUFF（旧：速度POT＋支援スキル７（アイテム（食品/他）））
		// （食品データは領域的には71個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ITEM_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[13],
			((1n << 70n) - 1n),
			...(saveDataArrayOld.slice(659, 659 + 70))
		);

		//--------------------------------
		// 時限効果設定（旧：時限効果設定）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_TIME_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 20n) - 1n),
			...(saveDataArrayOld.slice(1751, 1751 + 20))
		);

		//--------------------------------
		// オートスペル設定（旧：オートスペル設定）
		//--------------------------------
		// データ加工
		// TODO: マジックナンバー
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_AUTO_SPELLS))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 60n) - 1n),
			...(saveDataArrayOld.slice(1691, 1691 + 60))
		);

		//--------------------------------
		// キャラクターDEBUFF（旧：キャラクター状態異常）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 50n) - 1n),
			...(saveDataArrayOld.slice(800, 800 + 50))
		);

		//--------------------------------
		// 性能カスタマイズ系の符号付き整数変換
		//--------------------------------
		const saveDataMappingArrayCurrent = CSaveDataMappingManager.GetMappingArray(CURRENT_VERSION);
		const convertedArrayBasic = [];
		for (let idx = 0; idx < g_confDataCustomStatus.length; idx++) {
			// HP/SP領域不足バグ対応
			let converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1580 + idx], saveDataMappingArrayCurrent[1580 + idx]);
//			if ((idx == 2) || (idx == 4)) {
//				converted = 0;
//			}
			convertedArrayBasic.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArrayAtk = [];
		for (let idx = 0; idx < g_confDataCustomAtk.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1610 + idx], saveDataMappingArrayCurrent[1610 + idx]);
			convertedArrayAtk.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArrayDef = [];
		for (let idx = 0; idx < g_confDataCustomDef.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1640 + idx], saveDataMappingArrayCurrent[1640 + idx]);
			convertedArrayDef.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}
		const convertedArraySkill = [];
		for (let idx = 0; idx < g_confDataCustomSkill.length; idx++) {
			const converted = CSaveDataConverter.ConvertUnsignedToSigned(saveDataArrayOld[1660 + idx], saveDataMappingArrayCurrent[1660 + idx]);
			convertedArraySkill.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
		}

		//--------------------------------
		// 性能カスタマイズ（基本）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[1580] > 0) ? 1 : 0),
			((1n << 87n) - 1n),
			...(convertedArrayBasic.slice(1, 1 + 22).flat()),
			convertedArrayAtk[1][1],
			convertedArrayAtk[2][1],
			convertedArrayAtk[3][1],
			...(convertedArrayAtk[4].flat()),
			convertedArrayAtk[11][1],
			...(convertedArrayAtk[24].flat()),
			0,
			...(convertedArrayAtk[13].flat()),
			...(convertedArrayDef[1].flat()),
			...(convertedArrayDef[2].flat()),
			...(convertedArraySkill[2].flat()),
			...(convertedArraySkill[3].flat()),
			...(new Array(24).fill(0)),
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜物理）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackPhysical,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			...(convertedArrayAtk[5].flat()),
			0, 0,
			0, 0,
			...(new Array(22).fill(0)), ...(convertedArrayAtk[6].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayAtk[25].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayAtk[7].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayAtk[8].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[22].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[9].flat()),
			...(new Array(4).fill(0)), 0, 0,
			convertedArrayAtk[12][1],
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜魔法）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackMagical,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			...(convertedArrayAtk[14].flat()),
			0, 0,
			0, 0,
			...(new Array(22).fill(0)), ...(convertedArrayAtk[15].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayAtk[18].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayAtk[16].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayAtk[17].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[23].flat()),
			...(new Array(4).fill(0)), 0, 0,
			...(new Array(4).fill(0)), 0, 0,
			convertedArrayAtk[19][1],
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：攻撃｜すべて）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindAttackAny,
			((saveDataArrayOld[1610] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			0, 0,
			...(convertedArrayAtk[10].flat()),
			...(convertedArrayAtk[21].flat()),
			...(new Array(26).fill(0)),
			...(new Array(22).fill(0)),
			...(new Array(22).fill(0)),
			...(new Array(8).fill(0)),
			...(new Array(6).fill(0)),
			...(new Array(6).fill(0)),
			...(new Array(4).fill(0)), ...(convertedArrayAtk[20].flat()),
			0,
			0
		);

		//--------------------------------
		// 性能カスタマイズ（特化：防御｜すべて）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			CSaveDataConst.specKindDefencekAny,
			((saveDataArrayOld[1640] > 0) ? 1 : 0),
			((1n << 104n) - 1n),

			0, 0,
			0, 0,
			...(convertedArrayDef[9].flat()),
			...(new Array(22).fill(0)), ...(convertedArrayDef[3].flat()), 0, 0,
			...(new Array(20).fill(0)), ...(convertedArrayDef[5].flat()),
			...(new Array(20).fill(0)), ...(convertedArrayDef[4].flat()),
			...(new Array(6).fill(0)), ...(convertedArrayDef[6].flat()),
			...(new Array(4).fill(0)), ...(convertedArrayDef[10].flat()),
			0, 0, ...(convertedArrayDef[7].flat()), 0, 0,
			...(new Array(4).fill(0)), ...(convertedArrayDef[8].flat()),
			0,
			0
		);

		//--------------------------------
		// 性能カスタマイズ（スキル）（旧：性能カスタマイズ系）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			((saveDataArrayOld[1660] > 0) ? 1 : 0),
			((1n << 21n) - 1n),

			// TODO: すべてのスキルを表すダミーのスキルIDに変更のこと
			0,
			((convertedArraySkill[10][1] > 0) ? 1 : 0),
			convertedArraySkill[10][1],
			...(convertedArraySkill[1].flat()),
			...(convertedArraySkill[11].flat()), ...(convertedArraySkill[12].flat()),
			...(convertedArraySkill[5].flat()), ...(convertedArraySkill[4].flat()),
			...(convertedArraySkill[7].flat()), ...(convertedArraySkill[6].flat()),
			...(convertedArraySkill[9].flat()), 0, 0
		);

		//--------------------------------
		// モンスター基本情報（旧：モンスター選択）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			saveDataArrayOld[1771], saveDataArrayOld[1772], saveDataArrayOld[10],
		);

		//--------------------------------
		// 対プレイヤー設定（旧：対プレイヤー設定）
		//--------------------------------
		{
			// 対プレイヤー設定バイアス調整対象インデックス配列
			const BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 = [
				MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
				MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
				MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_STR,
				MOB_CONF_PLAYER_ID_AGI,
				MOB_CONF_PLAYER_ID_VIT,
				MOB_CONF_PLAYER_ID_INT,
				MOB_CONF_PLAYER_ID_DEX,
				MOB_CONF_PLAYER_ID_LUK,
				MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
			];

			const signValueArray = [];
			for (idx = 0; idx < n_B_TAISEI.length; idx++) {

				let converted = saveDataArrayOld[850 + idx];
				if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
					converted = CSaveDataConverter.ConvertUnsignedToSigned(converted, saveDataMappingArrayCurrent[850 + idx]);
				}
				signValueArray.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
			}

			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 78n) - 1n),

				...(Array(78).fill(0)),
/*				signValueArray[0][1],
				signValueArray[1][1],
				signValueArray[2][1],
				signValueArray[3][1],
				signValueArray[4][1],
				signValueArray[5][1],
				signValueArray[6][1],
				signValueArray[7][1],
				...(signValueArray.slice(8, 8 + 18).flat()),
				signValueArray[26][1],
				signValueArray[27][1],
				signValueArray[28][1],
				signValueArray[29][1],
				...(signValueArray.slice(30, 30 + 6).flat()),
				signValueArray[36][1],
				signValueArray[37][1],
				signValueArray[38][1],
				...(signValueArray[39]),
				signValueArray[40][1],
				...(Array(1).fill(0)),
				signValueArray[41][1],
				...(Array(1).fill(0)),
				signValueArray[42][1],
				...(Array(8).fill(0)),*/
			);
		}

		//--------------------------------
		// 対プレイヤー設定（旧：モンスター手入力欄、モンスター手入力欄拡張）
		//--------------------------------
		{
			let stValues = [];
			for (let idxSt = 0; idxSt < 6; idxSt++) {
				if (saveDataArrayOld[975 + idxSt] > 2000) {
					stValues[idxSt] = (100000 * saveDataArrayOld[1460 + idxSt * 2 + 1]) + saveDataArrayOld[1460 + idxSt * 2];
				}
				else {
					stValues[idxSt] = saveDataArrayOld[975 + idxSt];
				}
			}
			let atkValues = [];
			for (let idxSt = 0; idxSt < 2; idxSt++) {
				if (saveDataArrayOld[981 + idxSt] > 99999) {
					atkValues[idxSt] = (100000 * saveDataArrayOld[1472 + idxSt * 2 + 1]) + saveDataArrayOld[1472 + idxSt * 2];
				}
				else {
					atkValues[idxSt] = saveDataArrayOld[981 + idxSt];
				}
			}
			let defValues = [];
			for (let idxSt = 0; idxSt < 2; idxSt++) {
				if (saveDataArrayOld[984 + idxSt] > 99999) {
					defValues[idxSt] = (100000 * saveDataArrayOld[1476 + idxSt * 2 + 1]) + saveDataArrayOld[1476 + idxSt * 2];
				}
				else {
					defValues[idxSt] = saveDataArrayOld[984 + idxSt];
				}
			}
			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 32n) - 1n),
				saveDataArrayOld[973],
				100000 * saveDataArrayOld[993] + saveDataArrayOld[974],
				...stValues,
				...atkValues,
				saveDataArrayOld[983],
				...defValues,
				0,		// BaseExp はバグにより移行不可
				0,		// JobExp はバグにより移行不可
				saveDataArrayOld[988],
				saveDataArrayOld[989],
				saveDataArrayOld[990],
				saveDataArrayOld[991],
				saveDataArrayOld[992],
				...(Array(12).fill(0))
			);
		}

		//--------------------------------
		// 敵BUFF（旧：モンスター状態強化設定）
		// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_BUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 80n) - 1n),
			...(saveDataArrayOld.slice(367, 367 + 80))
		);

		//--------------------------------
		// 敵DEBUFF（旧：モンスター状態異常設定）
		// （領域的には81個用意されていたが末尾は使用していなかったので切り捨て）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_DEBUFF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 80n) - 1n),
			...(saveDataArrayOld.slice(286, 286 + 80))
		);

		//--------------------------------
		// 攻撃手段情報（旧：攻撃手段）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_ATTACK_CONF))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((0x01 << 12) - 1),
			saveDataArrayOld[276], saveDataArrayOld[277], saveDataArrayOld[278],
			saveDataArrayOld[279], saveDataArrayOld[280], saveDataArrayOld[281],
			saveDataArrayOld[282], saveDataArrayOld[283],
		);


		//--------------------------------
		// 性能カスタマイズ（特性ステータス）
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 24n) - 1n),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1862]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1863]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1864]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1865]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1866]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1867]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1868]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1869]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1870]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1871]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1872]),
			...(new Array(1).fill(0)),
			(saveDataArrayOld[1873]),
		);

		//--------------------------------
		// 装備：矢
		//--------------------------------
		saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_EQUIP_ARROW))();
		[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
			0,
			((1n << 1n) - 1n),
			((saveDataArrayOld[12]) + 1),
		);


		//--------------------------------
		// 対プレイヤー設定2
		//--------------------------------
		{
			// 対プレイヤー設定バイアス調整対象インデックス配列
			const BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500 = [
				MOB_CONF_PLAYER_ID_NINGEN_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHUGATA_TAISEI,
				MOB_CONF_PLAYER_ID_ENKYORI_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_MIZU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_CHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_HI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_KAZE_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_DOKU_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_SEI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_YAMI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_NEN_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_FUSHI_ZOKUSEI_TAISEI,
				MOB_CONF_PLAYER_ID_IPPAN_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_ZOKUSEI_MONSTER_TAISEI,
				MOB_CONF_PLAYER_ID_BUTSURI_TAISEI,
				MOB_CONF_PLAYER_ID_MAHOU_TAISEI,
				MOB_CONF_PLAYER_ID_DORAM_KEI_TAISEI,
				MOB_CONF_PLAYER_ID_STR,
				MOB_CONF_PLAYER_ID_AGI,
				MOB_CONF_PLAYER_ID_VIT,
				MOB_CONF_PLAYER_ID_INT,
				MOB_CONF_PLAYER_ID_DEX,
				MOB_CONF_PLAYER_ID_LUK,
				MOB_CONF_PLAYER_ID_KOGATA_TAISEI,
			];

			const signValueArray = [];
			for (idx = 0; idx < n_B_TAISEI.length; idx++) {

				let converted = saveDataArrayOld[1881 + idx];
				if (idx == 0) {
					signValueArray.push([0, converted]);
				}
				else {
					if (BIAS_TARGET_INDEX_ARRAY_CONF_PLAYER_500.indexOf(idx) >= 0) {
						converted = CSaveDataConverter.ConvertUnsignedToSigned(converted, saveDataMappingArrayCurrent[850 + idx]);
					}
					signValueArray.push([((converted < 0) ? 1 : 0), Math.abs(converted)]);
				}
			}

			saveDataUnit = new (CSaveDataUnitTypeManager.getUnitClass(SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2))();
			[dataTextWork, bitOffset] = saveDataUnit.convertFromOldFormat(dataTextWork, bitOffset,
				0,
				((1n << 82n) - 1n),

				signValueArray[0][1],
				signValueArray[1][1],
				signValueArray[2][1],
				signValueArray[3][1],
				signValueArray[4][1],
				signValueArray[5][1],
				signValueArray[6][1],
				signValueArray[7][1],
				...(signValueArray.slice(8, 8 + 18).flat()),
				signValueArray[26][1],
				signValueArray[27][1],
				signValueArray[28][1],
				signValueArray[29][1],
				...(signValueArray.slice(30, 30 + 6).flat()),
				signValueArray[36][1],
				signValueArray[37][1],
				signValueArray[38][1],
				...(signValueArray[39]),
				signValueArray[40][1],
				...(Array(1).fill(0)),
				signValueArray[41][1],
				...(Array(1).fill(0)),
				signValueArray[42][1],
				...(Array(12).fill(0)),
			);
		}


		return dataTextWork;
	}
}
