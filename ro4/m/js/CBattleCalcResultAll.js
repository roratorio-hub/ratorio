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
	 * オブジェクト維持時間を返す.
	 * @return 概算攻撃間隔
	 */
	this.GetLifeTime = function () {
		var resultWork = null;
		var lifetime = 0;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			lifetime = resultWork.objectLifeTime;//スキルの持続時間

			return (lifetime / 1000);
		}

		// エラーの場合
		return 0;
	};


	
	/**
	 * ディレイまたはクールタイムがオブジェクト維持時間より小さい場合に、その時間を返す.
	 * @return 概算攻撃間隔
	 */
	this.GetUnderLifeTime = function () {
		var resultWork = null;
		var lifetime = 0;
		var cooltime = 0;
		var delay = 0;
		var undertime = 0;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			lifetime = resultWork.objectLifeTime;//スキルの持続時間
			cooltime = resultWork.coolTime * 1000;
			delay = resultWork.delaySkill * 1000;

			if (cooltime > delay) {
				undertime = (cooltime < lifetime) ? lifetime - cooltime : 0;
			} else {
				undertime = (delay < lifetime) ? lifetime - delay : 0;
			}
			return (undertime / 1000);
		}

		// エラーの場合
		return 0;
	};



	/**
	 * ディレイまたはクールタイムがオブジェクト維持時間より大きい場合に、その時間を返す.
	 * @return 概算攻撃間隔
	 */
	this.GetOverLifeTime = function () {
		var resultWork = null;
		var lifetime = 0;
		var cooltime = 0;
		var delay = 0;
		var overtime = 0;

		// アクティブ系列があればそれを採用
		if (this.activeResultArray.length > 0) {
			resultWork = this.activeResultArray[0];
			lifetime = resultWork.objectLifeTime;//スキルの持続時間
			cooltime = resultWork.coolTime * 1000;
			delay = resultWork.delaySkill * 1000;

			if (cooltime > delay) {
				overtime = (cooltime > lifetime) ? cooltime - lifetime : 0;
			} else {
				overtime = (delay > lifetime) ? delay - lifetime : 0;
			}
			return (overtime / 1000);
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
			var overtime = 0;
			var lifetime = 0;
			var hitcnt = 0;
			var fullcnt = 0;
			var amarihit = 0;
			var reduce = 0;
			var ret = 0;

			intvl = this.GetHitInterval();//HITごとのインターバル時間
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか。１スキル分全てHITしない分の回数も含む。
			casttime = this.GetCastTime();//固定詠唱＋変動詠唱にかかる時間
			overtime = this.GetOverLifeTime();
			lifetime = this.GetLifeTime();
			hitcnt = Math.ceil(lifetime / intvl);//１スキル分のHIT回数
			fullcnt = Math.floor(atkcnt / hitcnt);//１スキル分全部HITするスキル使用回数
			amarihit = atkcnt - fullcnt * hitcnt;//最後のスキル使用分で１スキル分全部HITしないHIT回数
			reduce = this.GetUnderLifeTime();//オブジェクト維持時間よりディレイ・CT時間が短い場合その時間
			//スキル１回で倒した場合
			if (skillcnt <= 1) {
				return casttime + (amarihit * intvl);
			}
			//（詠唱時間＋１スキル分HIT時間＋オブジェクト維持時間を超えるディレイまたはクールタイム）×（HITフル使用のスキル使用回数）
			//スキルn回でちょうど倒した場合は、fullcnt を１回分減らし、 amarihit を hitcnt と同じ（全部HIT）にする
			if (skillcnt == fullcnt) {
				ret = (casttime + lifetime + overtime) * (fullcnt - 1);
				amarihit = hitcnt;
			} else {
				ret = (casttime + lifetime + overtime) * fullcnt;
			}
			//オブジェクト維持時間が完了してから次の詠唱が始まる場合
			if (overtime > 0) {
				ret += (casttime + (amarihit * intvl));
				return ret;
			}
			//オブジェクト維持時間が完了する前に次の詠唱が始まる場合
			if (reduce < casttime) {
				// reduce 時間より詠唱時間が長い場合
				ret -= reduce * ((skillcnt > 1) ? (skillcnt - 1) : 0);
				ret += ((casttime - reduce) + (amarihit * intvl));
			} else {
				// reduce 時間が詠唱時間より長い場合
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より長ければ、最後に発動したスキルの分は加えない（前に発動したスキルより先に終わるため）。
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より短ければ、（詠唱時間＋（HITフルでないHIT回数×インターバル））- reduce 時間分だけ加える。
				ret -= reduce * ((skillcnt > 2) ? (skillcnt - 2) : 0);
				ret += (((casttime + (amarihit * intvl)) - reduce) > 0) ? ((casttime + (amarihit * intvl)) - reduce) : 0;
			}
			return ret;
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
			var overtime = 0;
			var lifetime = 0;
			var hitcnt = 0;
			var fullcnt = 0;
			var amarihit = 0;
			var reduce = 0;
			var ret = 0;

			intvl = this.GetHitInterval();
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか。１スキル分全てHITしない分の回数も含む。
			casttime = this.GetCastTime();
			overtime = this.GetOverLifeTime();
			lifetime = this.GetLifeTime();
			hitcnt = Math.ceil(lifetime / intvl);//１スキル分のHIT回数
			fullcnt = Math.floor(atkcnt / hitcnt);//１スキル分全部HITするスキル使用回数
			amarihit = atkcnt - fullcnt * hitcnt;//最後のスキル使用分で１スキル分全部HITしないHIT回数
			reduce = this.GetUnderLifeTime();//オブジェクト維持時間よりディレイ・CT時間が短い場合その時間
			//スキル１回で倒した場合
			if (skillcnt <= 1) {
				return casttime + (amarihit * intvl);
			}
			//（詠唱時間＋１スキル分HIT時間＋オブジェクト維持時間を超えるディレイまたはクールタイム）×（HITフル使用のスキル使用回数）
			//スキルn回でちょうど倒した場合は、fullcnt を１回分減らし、 amarihit を hitcnt と同じ（全部HIT）にする
			if (skillcnt == fullcnt) {
				ret = (casttime + lifetime + overtime) * (fullcnt - 1);
				amarihit = hitcnt;
			} else {
				ret = (casttime + lifetime + overtime) * fullcnt;
			}
			//オブジェクト維持時間が完了してから次の詠唱が始まる場合
			if (overtime > 0) {
				ret += (casttime + (amarihit * intvl));
				return ret;
			}
			//オブジェクト維持時間が完了する前に次の詠唱が始まる場合
			if (reduce < casttime) {
				// reduce 時間より詠唱時間が長い場合
				ret -= reduce * ((skillcnt > 1) ? (skillcnt - 1) : 0);
				ret += ((casttime - reduce) + (amarihit * intvl));
			} else {
				// reduce 時間が詠唱時間より長い場合
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より長ければ、最後に発動したスキルの分は加えない（前に発動したスキルより先に終わるため）。
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より短ければ、（詠唱時間＋（HITフルでないHIT回数×インターバル））- reduce 時間分だけ加える。
				ret -= reduce * ((skillcnt > 2) ? (skillcnt - 2) : 0);
				ret += (((casttime + (amarihit * intvl)) - reduce) > 0) ? ((casttime + (amarihit * intvl)) - reduce) : 0;
			}
			return ret;
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
			var overtime = 0;
			var lifetime = 0;
			var hitcnt = 0;
			var fullcnt = 0;
			var amarihit = 0;
			var reduce = 0;
			var ret = 0;

			intvl = this.GetHitInterval();
			atkcnt = Math.ceil(this.mobData[MONSTER_DATA_INDEX_HP] / dmg);//必要攻撃回数
			skillcnt = this.GetSkillCount(atkcnt);//スキルを何回発動するか。１スキル分全てHITしない分の回数も含む。
			casttime = this.GetCastTime();
			overtime = this.GetOverLifeTime();
			lifetime = this.GetLifeTime();
			hitcnt = Math.ceil(lifetime / intvl);//１スキル分のHIT回数
			fullcnt = Math.floor(atkcnt / hitcnt);//１スキル分全部HITするスキル使用回数
			amarihit = atkcnt - fullcnt * hitcnt;//最後のスキル使用分で１スキル分全部HITしないHIT回数
			reduce = this.GetUnderLifeTime();//オブジェクト維持時間よりディレイ・CT時間が短い場合その時間
			//スキル１回で倒した場合
			if (skillcnt <= 1) {
				return casttime + (amarihit * intvl);
			}
			//（詠唱時間＋１スキル分HIT時間＋オブジェクト維持時間を超えるディレイまたはクールタイム）×（HITフル使用のスキル使用回数）
			//スキルn回でちょうど倒した場合は、fullcnt を１回分減らし、 amarihit を hitcnt と同じ（全部HIT）にする
			if (skillcnt == fullcnt) {
				ret = (casttime + lifetime + overtime) * (fullcnt - 1);
				amarihit = hitcnt;
			} else {
				ret = (casttime + lifetime + overtime) * fullcnt;
			}
			//オブジェクト維持時間が完了してから次の詠唱が始まる場合
			if (overtime > 0) {
				ret += (casttime + (amarihit * intvl));
				return ret;
			}
			//オブジェクト維持時間が完了する前に次の詠唱が始まる場合
			if (reduce < casttime) {
				// reduce 時間より詠唱時間が長い場合
				ret -= reduce * ((skillcnt > 1) ? (skillcnt - 1) : 0);
				ret += ((casttime - reduce) + (amarihit * intvl));
			} else {
				// reduce 時間が詠唱時間より長い場合
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より長ければ、最後に発動したスキルの分は加えない（前に発動したスキルより先に終わるため）。
				// reduce 時間が（詠唱時間＋（HITフルでないHIT回数×インターバル））より短ければ、（詠唱時間＋（HITフルでないHIT回数×インターバル））- reduce 時間分だけ加える。
				ret -= reduce * ((skillcnt > 2) ? (skillcnt - 2) : 0);
				ret += (((casttime + (amarihit * intvl)) - reduce) > 0) ? ((casttime + (amarihit * intvl)) - reduce) : 0;
			}
			return ret;
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





