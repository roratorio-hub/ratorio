/**
 * 戦闘結果クラス（全体）.
 */
function CBattleCalcResultAll () {

	//================================================================
	//
	// 基本情報
	//
	//================================================================

	// キャラ情報
	this.charaData = null;

	// 能力情報
	this.specData = null;

	// 攻撃対象情報
	this.mobData = null;





	//================================================================
	//
	//
	//
	//================================================================

	//--------------------------------
	// パッシブ攻撃配列
	//--------------------------------
	this.passiveResultArray = null;

	//--------------------------------
	// アクティブ攻撃配列
	//--------------------------------
	this.activeResultArray = null;

	//--------------------------------
	// 確率追撃攻撃配列（オートスペル等）
	//--------------------------------
	this.appendResultArray = null;





	//================================================================
	//
	// 追加発動系
	//
	//================================================================





	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを初期化
		this.charaData = null;
		this.specData = null;
		this.mobData = null;

		this.passiveResultArray = [];
		this.activeResultArray = [];
		this.appendResultArray = [];

	}).call(this);



	/**
	 * パッシブ攻撃の結果データを追加する.
	 * @param skillIdParent 親となるスキルID（親がない場合は undefined）
	 * @param result パッシブ攻撃の結果データ
	 */
	this.AddPassiveResult = function (skillIdParent, result) {

		var idx = 0;

		if (skillIdParent !== undefined) {

			for (idx = 0; idx < this.passiveResultArray.length; idx++) {

				if (this.passiveResultArray[idx].skillId == skillIdParent) {
					this.passiveResultArray[idx].AddChild(result);
					return;
				}
			}
		}


		this.passiveResultArray.push(result);
	};

	/**
	 * パッシブ攻撃の結果データを取得する.
	 * @param idx インデックス
	 * @return パッシブ攻撃の結果データ
	 */
	this.GetPassiveResult = function (idx) {

		// 範囲チェック
		if ((idx < 0) || (this.passiveResultArray.length <= idx)) {
			return undefined;
		}

		return this.passiveResultArray[idx];
	};

	/**
	 * パッシブ攻撃の結果データ数を取得する.
	 * @param パッシブ攻撃の結果データ
	 */
	this.GetPassiveResultCount = function () {
		return this.passiveResultArray.length;
	};



	/**
	 * アクティブ攻撃の結果データを追加する.
	 * @param skillIdParent 親となるスキルID（親がない場合は undefined）
	 * @param result アクティブ攻撃の結果データ
	 */
	this.AddActiveResult = function (skillIdParent, result) {

		var idx = 0;

		if (skillIdParent !== undefined) {

			for (idx = 0; idx < this.activeResultArray.length; idx++) {

				if (this.activeResultArray[idx].skillId == skillIdParent) {
					this.activeResultArray[idx].AddChild(result);
					return;
				}
			}
		}


		this.activeResultArray.push(result);
	};

	/**
	 * アクティブ攻撃の結果データを取得する.
	 * @param idx インデックス
	 * @return アクティブ攻撃の結果データ
	 */
	this.GetActiveResult = function (idx) {

		// 範囲チェック
		if ((idx < 0) || (this.activeResultArray.length <= idx)) {
			return undefined;
		}

		return this.activeResultArray[idx];
	};

	/**
	 * アクティブ攻撃の結果データ数を取得する.
	 * @param アクティブ攻撃の結果データ
	 */
	this.GetActiveResultCount = function () {
		return this.activeResultArray.length;
	};



	/**
	 * 確率追撃攻撃の結果データを追加する.
	 * @param skillIdParent 親となるスキルID（親がない場合は undefined）
	 * @param result 確率追撃攻撃の結果データ
	 */
	this.AddAppendResult = function (skillIdParent, result) {

		var idx = 0;

		if (skillIdParent !== undefined) {

			for (idx = 0; idx < this.appendResultArray.length; idx++) {

				if (this.appendResultArray[idx].skillId == skillIdParent) {
					this.appendResultArray[idx].AddChild(result);
					return;
				}
			}
		}


		this.appendResultArray.push(result);
	};

	/**
	 * 確率追撃攻撃の結果データを取得する.
	 * @param idx インデックス
	 * @return 確率追撃攻撃の結果データ
	 */
	this.GetAppendResult = function (idx) {

		// 範囲チェック
		if ((idx < 0) || (this.appendResultArray.length <= idx)) {
			return undefined;
		}

		return this.appendResultArray[idx];
	};

	/**
	 * 確率追撃攻撃の結果データ数を取得する.
	 * @param 確率追撃攻撃の結果データ
	 */
	this.GetAppendResultCount = function () {
		return this.appendResultArray.length;
	};




	/**
	 * 攻撃間隔の取得.
	 * @return 概算攻撃間隔
	 */
	this.GetAttackInterval = function () {

		var resultWork = null;

		// パッシブ系列があればそれを採用
		if (this.passiveResultArray.length > 0) {
			return this.passiveResultArray[0].attackInterval;
		}

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			return (resultWork.castVary + resultWork.castFixed + resultWork.attackInterval);
		}


		// 上記以外は、欠損値処理
		return 60 * 60 * 24;
	};



	/**
	 * １HITごとの攻撃間隔の取得.
	 * @return 概算攻撃間隔
	 */
	this.GetHitInterval = function () {

		var resultWork = null;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			return (resultWork.attackInterval);
		}

		// エラーの場合
		return 0;
	};



	/**
	 * スキル１回分のHIT回数の取得.
	 * @return HIT回数
	 */
	this.GetSkillCount = function (atkcnt) {

		var resultWork = null;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			return Math.ceil(atkcnt / (resultWork.objectLifeTime / (resultWork.attackInterval * 1000)));
		}

		// エラーの場合
		return 0;
	};



	/**
	 * 変動＋固定詠唱時間の取得.
	 * @return 概算攻撃間隔
	 */
	this.GetCastTime = function () {

		var resultWork = null;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			return (resultWork.castVary + resultWork.castFixed);
		}


		// 上記以外は、欠損値処理
		return 0;
	};



	/**
	 * オブジェクト維持時間の重複がある場合、重複１箇所で２重にHITする回数の取得.
	 * @return HIT回数
	 */
	this.GetDoubleHitCount = function (atkcnt) {

		var resultWork = null;
		var sklcnt = 0;
		var lifetime = 0;
		var wholetime = 0;
		var cooltime = 0;
		var delay = 0;
		var casttime = 0;
		var doubletime = 0;
		var intvl = 0;
		var doublecount = 0;


		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			sklcnt = this.GetSkillCount(atkcnt);//スキルを発動する回数
			lifetime = resultWork.objectLifeTime;//スキルの持続時間
			casttime = this.GetCastTime() * 1000;
			cooltime = resultWork.coolTime * 1000;
			delay = resultWork.delaySkill * 1000;
			intvl = resultWork.attackInterval * 1000;
			if ((cooltime < lifetime) && (delay < lifetime)) {
				wholetime = (cooltime > delay) ? cooltime : delay;//発動開始から次の発動が可能になるまでの時間
				wholetime += casttime;//次の発動に必要な詠唱時間を加える
				doubletime = lifetime - wholetime;//持続時間から wholetime をひいた値がポジティブなら重複発動する
				if (doubletime > 0) {
					doublecount = Math.floor(doubletime / intvl); //重複発動する回数
					return doublecount;
				}
			}
		}

		// エラーの場合
		return 0;
	};



	/**
	 * 概算ダメージ（一撃最小）の取得.
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMinPerAtk = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;
		var resultWorkArray = null;


		// パッシブ系列はいずれか一つしか発動しないので、最小ダメージを採用する
		resultWorkArray = [];
		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			resultWorkArray.push(GetArrayTotal(resultWork.GetDamageSummaryMinPerAtk(true, true)));
		}
		if (resultWorkArray.length > 0) {
			dmg = GetArrayMin(resultWorkArray);
		}

		// アクティブは最小値を全加算（発動率等は考慮済み）
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayMin(resultWork.GetDamageSummaryMinPerAtk(true, false));
		}

		// 確率追撃は最小値を全加算（発動率等は考慮済み）
		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayMin(resultWork.GetDamageSummaryMinPerAtk(true, false));
		}



		return Math.floor(dmg);
	};

	/**
	 * 概算ダメージ（一撃平均）の取得.
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAvePerAtk = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;



		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerAtk(true)) * resultWork.actRate / 100;
		}

		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerAtk(true)) * resultWork.actRate / 100;
		}

		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerAtk(true)) * resultWork.actRate / 100;
		}


		return Math.floor(dmg);
	};

	/**
	 * 概算ダメージ（一撃最大）の取得.
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMaxPerAtk = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;
		var resultWorkArray = null;


		// パッシブ系列はいずれか一つしか発動しないので、最大ダメージを採用する
		resultWorkArray = [];
		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			resultWorkArray.push(GetArrayTotal(resultWork.GetDamageSummaryMaxPerAtk(true)));
		}
		if (resultWorkArray.length > 0) {
			dmg = GetArrayMax(resultWorkArray);
		}

		// アクティブは全発動を採用
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayMax(resultWork.GetDamageSummaryMaxPerAtk(true));
		}

		// 確率追撃は全発動を採用
		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayMax(resultWork.GetDamageSummaryMaxPerAtk(true));
		}


		return Math.floor(dmg);
	};



	/**
	 * 概算ダメージ（秒間最小）の取得.
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMinPerSec = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;
		var resultWorkArray = null;


		// パッシブ系列はいずれか一つしか発動しないので、最小ダメージを採用する
		resultWorkArray = [];
		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			resultWorkArray.push(GetArrayTotal(resultWork.GetDamageSummaryMinPerSec(0, 0, resultWork.attackInterval, true, true)));
		}
		if (resultWorkArray.length > 0) {
			dmg = GetArrayMin(resultWorkArray);
		}

		// アクティブは最小値を全加算（発動率等は考慮済み）
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayMin(resultWork.GetDamageSummaryMinPerSec(
				resultWork.castVary, resultWork.castFixed, resultWork.attackInterval, true, false));
		}

		// 基本攻撃の攻撃間隔を追加攻撃の攻撃間隔として扱う
		var appendInterval = resultWork.attackInterval;

		// 確率追撃は最小値を全加算（発動率等は考慮済み）
		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayMin(resultWork.GetDamageSummaryMinPerSec(0, 0, appendInterval, true, false));
		}


		return Math.floor(dmg);
	};

	/**
	 * 概算ダメージ（秒間平均）の取得.
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAvePerSec = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;



		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerSec(0, 0, resultWork.attackInterval, true)) * resultWork.actRate / 100;
		}

		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerSec(
				resultWork.castVary, resultWork.castFixed, resultWork.attackInterval, true)) * resultWork.actRate / 100;
		}

		// 基本攻撃の攻撃間隔を追加攻撃の攻撃間隔として扱う
		var appendInterval = resultWork.attackInterval;

		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayTotal(resultWork.GetDamageSummaryAvePerSec(0, 0, appendInterval, true)) * resultWork.actRate / 100;
		}


		return Math.floor(dmg);
	};

	/**
	 * 概算ダメージ（秒間最大）の取得.
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMaxPerSec = function () {

		var idx = 0;

		var dmg = 0;
		var resultWork = null;
		var resultWorkArray = null;


		// パッシブ系列はいずれか一つしか発動しないので、最大ダメージを採用する
		resultWorkArray = [];
		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			resultWork = this.passiveResultArray[idx];
			resultWorkArray.push(GetArrayTotal(resultWork.GetDamageSummaryMaxPerSec(0, 0, resultWork.attackInterval, true)));
		}
		if (resultWorkArray.length > 0) {
			dmg = GetArrayMax(resultWorkArray);
		}

		// アクティブは全発動を採用
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			resultWork = this.activeResultArray[idx];
			dmg += GetArrayMax(resultWork.GetDamageSummaryMaxPerSec(
				resultWork.castVary, resultWork.castFixed, resultWork.attackInterval, true));
		}

		// 基本攻撃の攻撃間隔を追加攻撃の攻撃間隔として扱う
		var appendInterval = resultWork.attackInterval;

		// 確率追撃は全発動を採用
		for (idx = 0; idx < this.appendResultArray.length; idx++) {
			resultWork = this.appendResultArray[idx];
			dmg += GetArrayMax(resultWork.GetDamageSummaryMaxPerSec(0, 0, appendInterval, true));
		}


		return Math.floor(dmg);
	};



	/**
	 * 概算攻撃回数（最小）の取得.
	 * @return 概算攻撃回数（最小）
	 */
	this.GetAttackCountSummaryMin = function () {

		var dmg = this.GetDamageSummaryMaxPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);
	};

	/**
	 * 概算攻撃回数（平均）の取得.
	 * @return 概算攻撃回数（平均）
	 */
	this.GetAttackCountSummaryAve = function () {

		var dmg = this.GetDamageSummaryAvePerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);
	};

	/**
	 * 概算攻撃回数（最大）の取得.
	 * @return 概算攻撃回数（最大）
	 */
	this.GetAttackCountSummaryMax = function () {

		var dmg = this.GetDamageSummaryMinPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);
	};



	/**
	 * 概算攻撃秒数（最小）の取得.
	 * @return 概算攻撃秒数（最小）
	 */
	this.GetAttackSecondSummaryMin = function () {

		var dmg = this.GetDamageSummaryMaxPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
	};

	/**
	 * 概算攻撃秒数（平均）の取得.
	 * @return 概算攻撃秒数（平均）
	 */
	this.GetAttackSecondSummaryAve = function () {

		var dmg = this.GetDamageSummaryAvePerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
	};

	/**
	 * 概算攻撃秒数（最大）の取得.
	 * @return 概算攻撃秒数（最大）
	 */
	this.GetAttackSecondSummaryMax = function () {

		var dmg = this.GetDamageSummaryMinPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}

		return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
	};


	/**
	 * 概算攻撃秒数（最小）の取得（オブジェクト維持時間とHITインターバルのあるスキル用）.
	 * @return 概算攻撃秒数（最小）
	 */
	this.GetAttackSecondSummaryMinInterval = function () {
		var dmg = this.GetDamageSummaryMaxPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}
		if (this.GetHitInterval == 0) {
			return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
		} else {
			var intvl = 0;
			var atkcnt = 0;
			var skillcnt = 0;
			var casttime = 0;
			var dblcnt = 0;

			intvl = this.GetHitInterval();
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか
			casttime = this.GetCastTime();//固定詠唱＋変動詠唱にかかる時間
			dblcnt = this.GetDoubleHitCount(atkcnt);
	
			return (atkcnt * intvl) + (skillcnt * casttime) - (dblcnt * skillcnt * intvl);	
		}
	};

	/**
	 * 概算攻撃秒数（平均）の取得（オブジェクト維持時間とHITインターバルのあるスキル用）.
	 * @return 概算攻撃秒数（平均）
	 */
	this.GetAttackSecondSummaryAveInterval = function () {
		var dmg = this.GetDamageSummaryAvePerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}
		if (this.GetHitInterval == 0) {
			return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
		} else {
			var intvl = 0;
			var atkcnt = 0;
			var skillcnt = 0;
			var casttime = 0;
			var dblcnt = 0;

			intvl = this.GetHitInterval();
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか
			casttime = this.GetCastTime();
			dblcnt = this.GetDoubleHitCount(atkcnt);
	
			return (atkcnt * intvl) + (skillcnt * casttime) - (dblcnt * skillcnt * intvl);
		}
	};

	/**
	 * 概算攻撃秒数（最大）の取得（オブジェクト維持時間とHITインターバルのあるスキル用）.
	 * @return 概算攻撃秒数（最大）
	 */
	this.GetAttackSecondSummaryMaxInterval = function () {
		var dmg = this.GetDamageSummaryMinPerAtk();

		if (dmg <= 0) {
			return "（計測不能）";
		}
		if (this.GetHitInterval == 0) {
			return Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg) * this.GetAttackInterval();
		} else {
			var intvl = 0;
			var atkcnt = 0;
			var skillcnt = 0;
			var casttime = 0;
			var dblcnt = 0;

			intvl = this.GetHitInterval();
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか
			casttime = this.GetCastTime();
			dblcnt = this.GetDoubleHitCount(atkcnt);
	
			return (atkcnt * intvl) + (skillcnt * casttime) - (dblcnt * skillcnt * intvl);
		}
	};



	/**
	 * 概算経験値効率（Base、一撃平均）の取得.
	 * @return 概算経験値効率（Base、一撃平均）
	 */
	this.GetBaseExpPerAtk = function () {

		var cnt = this.GetAttackCountSummaryAve();

		if (isNaN(cnt) || (cnt <= 0)) {
			return "（計測不能）";
		}

		return Math.floor(this.mobData[MONSTER_DATA_INDEX_BASE_EXP] / cnt);
	};

	/**
	 * 概算経験値効率（Job、一撃平均）の取得.
	 * @return 概算経験値効率（Job、一撃平均）
	 */
	this.GetJobExpPerAtk = function () {

		var cnt = this.GetAttackCountSummaryAve();

		if (isNaN(cnt) || (cnt <= 0)) {
			return "（計測不能）";
		}

		return Math.floor(this.mobData[MONSTER_DATA_INDEX_JOB_EXP] / cnt);
	};

	/**
	 * 概算経験値効率（Base、秒間平均）の取得.
	 * @return 概算経験値効率（Base、秒間平均）
	 */
	this.GetBaseExpPerSec = function () {

		var sec = this.GetAttackSecondSummaryAve();

		if (isNaN(sec) || (sec <= 0)) {
			return "（計測不能）";
		}

		return Math.floor(this.mobData[MONSTER_DATA_INDEX_BASE_EXP] / sec);
	};

	/**
	 * 概算経験値効率（Job、秒間平均）の取得.
	 * @return 概算経験値効率（Job、秒間平均）
	 */
	this.GetJobExpPerSec = function () {

		var sec = this.GetAttackSecondSummaryAve();

		if (isNaN(sec) || (sec <= 0)) {
			return "（計測不能）";
		}

		return Math.floor(this.mobData[MONSTER_DATA_INDEX_JOB_EXP] / sec);
	};





	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var idx = 0;

		var result = null;

		// インスタンス用意
		result = new CBattleCalcResultAll();

		// データ複製
		result.charaData = this.charaData;
		result.specData = this.specData;
		result.mobData = this.mobData;

		// パッシブ攻撃配列
		for (idx = 0; idx < this.passiveResultArray.length; idx++) {
			result.passiveResultArray.push(this.passiveResultArray[idx].Clone());
		}

		// アクティブ攻撃配列
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			result.activeResultArray.push(this.activeResultArray[idx].Clone());
		}

		// 確率追撃攻撃配列
		for (idx = 0; idx < this.activeResultArray.length; idx++) {
			result.appendResultArray.push(this.appendResultArray[idx].Clone());
		}

		return result;
	};
}





