
import { instobject } from "./CBattleCalcResultAll.js";
// === AUTO-GENERATED IMPORTS ===
import { g_skillManager } from "../runtime/global.js";
import { GetArrayMax, GetArrayMin } from "../runtime/util.js";
// === END AUTO-GENERATED IMPORTS ===


/**
 * 戦闘結果クラス.
 */
export function CBattleCalcResult () {

	// スキルID
	this.skillId = 0;

	// スキルレベル
	this.skillLv = 0;

	// 変動詠唱時間
	this.castVary = 0;

	// 固定詠唱時間
	this.castFixed = 0;

	// モーションディレイ
	this.delayMotion = 0;

	// スキルディレイ
	this.delaySkill = 0;

	// 強制ディレイ（固有モーション、コンボ待ち受け）
	this.delayForce = 0;

	// 入力限界ディレイ
	this.delayInput = 0;

	// ダメージ間隔
	this.damageInterval = 0;

	// オブジェクト持続時間
	this.objectLifeTime = 0;

	// 地面設置スキル（継続ダメージ発生スキル）フラグ
	// この結果インスタンスを算出した時点の g_bDefinedDamageIntervals を保持する。
	// 描画はすべての計算完了後に行われるため、グローバル変数を直接参照すると
	// 「最後に計算した結果」の値を見てしまう（追撃・オートスペルがあると誤判定になる）。
	this.bGroundInstallation = false;

	// 武器種不一致等によるスキル使用不可フラグ
	// この結果インスタンスを算出した時点の CS.n_Buki_Muri を保持する（bGroundInstallation と同じ理由）。
	this.bWeaponMismatch = false;

	// ダメージ判定無しフラグ
	// この結果インスタンスを算出した時点の CS.g_bSkillNoDamage を保持する（bGroundInstallation と同じ理由）。
	this.bNoDamage = false;

	// クールタイム
	this.coolTime = 0;

	// 攻撃間隔
	this.attackInterval = 0;

	// 発生率
	this.actRate = 0;

	// スキル発動までに必要なカウンター数
	this.stackLimit = -1;

	// スキルを使用するたびに蓄積されるカウンター数
	this.stackIncrement = 0;

	// 命中率
	this.hitRate = 0;

	// 必中効果
	this.perfectRate = 0;

	// クリティカル率
	this.criRate = 0;

	// ヒット数配列
	this.hitCountArray = null;

	// 分割ヒット数配列
	this.dividedHitCountArray = null;

	// ダメージ配列（通常[最小, 平均, 最大]、クリティカル[,,]）
	this.dmgUnitArray = null;

	// 必中のみダメージ（通常、クリティカル）
	this.dmgPerfectArray = null;

	// 親スキルID
	this.parentSkillId = undefined;

	// オートスペルフラグ
	this.bAutoSpell = false;

	// 子要素配列
	this.childResultArray = null;


	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var zeroUnit = [0, 0, 0];

		// データを初期化
		this.skillId = 0;
		this.skillLv = 0;
		this.castVary = 0;
		this.castFixed = 0;
		this.delayMotion = 0;
		this.delaySkill = 0;
		this.delayForce = 0;
		this.delayInput = 0;
		this.damageInterval = 0;
		this.objectLifeTime = 0;
		this.bGroundInstallation = false;
		this.bWeaponMismatch = false;
		this.bNoDamage = false;
		this.coolTime = 0;
		this.attackInterval = 0;
		this.actRate = 0;
		this.hitRate = 0;
		this.perfectRate = 0;
		this.criRate = 0;
		this.hitCountArray = [];
		this.dividedHitCountArray = [];

		this.dmgUnitArray = [
			zeroUnit.slice(),
			zeroUnit.slice(),
		];

		this.dmgPerfectArray = [];
		this.parentSkillId = undefined;
		this.bAutoSpell = false;
		this.childResultArray = [];

	}).call(this);


	/**
	 * スキル名の取得.
	 * @return スキル名
	 */
	this.GetSkillName = function () {

		var nameWork = "";
		var nameText = "";

		var funcAddName = function (nameF) {
			if (nameText.length > 0) {
				nameText += "（" + nameF + "）";
			}
			else {
				nameText += nameF;
			}
		};


		// 親スキル指定がある場合は、親スキルの名称を追加
		if (this.parentSkillId !== undefined) {
			nameText = g_skillManager.GetSkillPlaneName(this.parentSkillId);
		}

		// オートスペルの場合は表記を追加
		if (this.bAutoSpell) {
			if (this.stackLimit > -1) {
				funcAddName("特殊発動");
			} else {
				funcAddName("オートスペル");
			}
		}

		// スキル本体の名称
		nameWork = g_skillManager.GetSkillPlaneName(this.skillId);
		if (this.bAutoSpell) {
			nameWork += " Lv" + this.skillLv;
		}
		funcAddName(nameWork);


		return nameText;
	};

	/**
	 * 子要素を追加する.
	 * @param resultChild 子要素
	 */
	this.AddChild = function (resultChild) {
		this.childResultArray.push(resultChild.Clone());
	};


	/**
	 * 概算ダメージ回数の取得.
	 * @return 概算ダメージ回数
	 */
	this.GetDamageCountSummary = function () {

		if ((this.objectLifeTime > 0) && (this.damageInterval > 0)) {
			//return Math.floor(this.objectLifeTime / this.damageInterval);
			return Math.ceil(this.objectLifeTime / this.damageInterval);
		}

		return "（計算不能）";
	};


	/**
	 * （内部）概算ダメージの取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算ダメージ（最小）
	 */
	this._GetDamageSummaryKM = function (idxKind, idxMath) {

		var dmg = this.dmgUnitArray[idxKind][idxMath];
		var divHit = this.dividedHitCountArray[idxKind][idxMath];
		var multiHit = this.hitCountArray[idxKind][idxMath];

		if (divHit > 1) {
			dmg /= divHit;
		}
		else {
			divHit = 1;
		}

		if (multiHit > 1) {
		}
		else {
			multiHit = 1;
		}

		return [dmg, divHit, multiHit];
	};

	/**
	 * 概算ダメージ（最小）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMin = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(0, 0)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryMin(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算ダメージ（平均）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAve = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(0, 1)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryAve(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算ダメージ（最大）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMax = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(0, 2)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryMax(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算クリティカルダメージ（最小）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算クリティカルダメージ（最小）
	 */
	this.GetDamageSummaryCriMin = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(1, 0)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryCriMin(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算クリティカルダメージ（平均）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算クリティカルダメージ（平均）
	 */
	this.GetDamageSummaryCriAve = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(1, 1)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryCriAve(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算クリティカルダメージ（最大）の取得.
	 * @param bCollectChild 子要素加算フラグ
	 * @return 概算クリティカルダメージ（最大）
	 */
	this.GetDamageSummaryCriMax = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmgArray = [this._GetDamageSummaryKM(1, 2)];

		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryCriMax(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算クリティカル率の取得.
	 * @return 概算クリティカル率
	 */
	this.GetCriRateSummary = function () {
		return this.criRate;
	};


	/**
	 * 概算ダメージ（一撃最小）の取得.
	 * @param bIgnoreActRate 発生率を無視して計算するフラグ
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMinPerAtk = function (bCollectChild, bIgnoreActRate) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;


		// 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
		if ((!bIgnoreActRate) && (this.actRate < 100)) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
		else if (this.criRate >= 100) {
			dmg = this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]);
		}

		// 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
		else if (this.hitRate < 100) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// 上記以外の場合、通常ダメージの最小ダメージを採用
		else {
			dmg = this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]);
		}


		// 子要素の、最小ダメージを取得し、加算する
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				// 子要素は発生率を考慮する
				ret = this.childResultArray[idx].GetDamageSummaryMinPerAtk(bCollectChild, false);
				dmg += GetArrayMin(ret);
			}
		}

		return [dmg];
	};

	/**
	 * 概算ダメージ（一撃平均）の取得.
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAvePerAtk = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;


		// 通常ダメージ
		dmg += Math.floor(this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) * (100 - this.criRate) / 100 * this.hitRate / 100);

		// クリティカルダメージ
		dmg += Math.floor(this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) * this.criRate / 100);

		// 配列に格納
		dmgArray = [dmg];


		// 子要素
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryAvePerAtk(bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算ダメージ（一撃最大）の取得.
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMaxPerAtk = function (bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;


		// 全最大ダメージを取得
		dmgArray = [];

		// 通常ダメージ
		dmgArray.push(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]));

		// クリティカルダメージ
		dmgArray.push(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]));

		// その中でも最大のダメージを採用する
		dmg = GetArrayMax(dmgArray);


		// 子要素の、最大ダメージを取得し、加算する
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				ret = this.childResultArray[idx].GetDamageSummaryMaxPerAtk(bCollectChild);
				dmg += GetArrayMax(ret);
			}
		}

		return [dmg];
	};


	/**
	 * 概算ダメージ（秒間最小）の取得.
	 * @param bIgnoreActRate 発生率を無視して計算するフラグ
	 * @param bCollectChild 子要素を持つ場合 true 
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMinPerSec = function (castVary, castFixed, attackInterval, bCollectChild, bIgnoreActRate) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;
		var actInterval = 0;

		if (this.bGroundInstallation && !bCollectChild){
			// 子要素を持たない設置スキルの場合
			actInterval = attackInterval;
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合
			actInterval = castVary + castFixed + attackInterval;
		}

		// 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
		if ((!bIgnoreActRate) && (this.actRate < 100)) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
		else if (this.criRate >= 100) {
			dmg = Math.floor(this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]) / actInterval);
		}

		// 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
		else if (this.hitRate < 100) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// 上記以外の場合、通常ダメージの最小ダメージを採用
		else {
			dmg = Math.floor(this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]) / actInterval);
		}

		// 子要素の、最小ダメージを取得し、加算する
		if (bCollectChild) {

			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				// 子要素は発生率を考慮する
				ret = this.childResultArray[idx].GetDamageSummaryMinPerSec(castVary, castFixed, attackInterval, bCollectChild, false);
				dmg += GetArrayMin(ret);
			}
		}

		return [dmg];
	};

	/**
	 * 概算ダメージ（秒間平均）の取得.
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAvePerSec = function (castVary, castFixed, attackInterval, bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;
		var actInterval = 0;

		if (this.bGroundInstallation && !bCollectChild){
			// 子要素を持たない設置スキルの場合
			actInterval = attackInterval;
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合
			actInterval = castVary + castFixed + attackInterval;
		}

		// 通常ダメージ
		dmg += Math.floor((this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) / actInterval) * (100 - this.criRate) / 100 * this.hitRate / 100);

		// クリティカルダメージ
		dmg += Math.floor((this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) / actInterval) * this.criRate / 100);

		// 配列に格納
		dmgArray = [dmg];

		// 子要素
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				ret = this.childResultArray[idx].GetDamageSummaryAvePerSec(castVary, castFixed, attackInterval, bCollectChild);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算ダメージ（秒間最大）の取得.
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMaxPerSec = function (castVary, castFixed, attackInterval, bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;
		var actInterval = 0;

		if (this.bGroundInstallation && !bCollectChild){
			// 子要素を持たない設置スキルの場合
			actInterval = attackInterval;
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合
			actInterval = castVary + castFixed + attackInterval;
		}

		// 全最大ダメージを取得
		dmgArray = [];

		// 通常ダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]) / actInterval));

		// クリティカルダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]) / actInterval));

		// その中でも最大のダメージを採用する
		dmg = GetArrayMax(dmgArray);

		// 子要素の、最大ダメージを取得し、加算する
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				ret = this.childResultArray[idx].GetDamageSummaryMaxPerSec(castVary, castFixed, attackInterval, bCollectChild);
				dmg += GetArrayMax(ret);
			}
		}

		return [dmg];
	};


	/**
	 * 概算ダメージ（秒間最小・実際）の取得.
	 * 1秒間に実際に打てる回数を考慮した計算
	 * @return 概算ダメージ（最小）
	 */
	this.GetDamageSummaryMinPerSecActual = function (castVary, castFixed, attackInterval, bCollectChild, bIgnoreActRate) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgPerHit = 0;
		var hitsPerSecond = this._getHitsPerSecondActual(castVary, castFixed, attackInterval, bCollectChild);

		// 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
		if ((!bIgnoreActRate) && (this.actRate < 100)) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
		else if (this.criRate >= 100) {
			dmgPerHit = this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]);
			dmg = Math.floor(dmgPerHit * hitsPerSecond.min);
		}

		// 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
		else if (this.hitRate < 100) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// 上記以外の場合、通常ダメージの最小ダメージを採用
		else {
			dmgPerHit = this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]);
			dmg = Math.floor(dmgPerHit * hitsPerSecond.min);
		}

		// 子要素の、最小ダメージを取得し、加算する
		if (bCollectChild) {

			for (idx = 0; idx < this.childResultArray.length; idx++) {
				const child = this.childResultArray[idx];
				const grandChildExists = (child.childResultArray.length > 0);
				// 子要素は発生率を考慮する
				ret = child.GetDamageSummaryMinPerSecActual(castVary, castFixed, attackInterval, grandChildExists, false);
				dmg += GetArrayMin(ret);
			}
		}

		return [dmg];
	};

	/**
	 * 概算ダメージ（秒間平均・実際）の取得.
	 * 1秒間に実際に打てる回数を考慮した計算
	 * @return 概算ダメージ（平均）
	 */
	this.GetDamageSummaryAvePerSecActual = function (castVary, castFixed, attackInterval, bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;
		var hitsPerSecond = this._getHitsPerSecondActual(castVary, castFixed, attackInterval, bCollectChild);

		// 通常ダメージ
		dmg += Math.floor((this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) * hitsPerSecond.ave) * (100 - this.criRate) / 100 * this.hitRate / 100);

		// クリティカルダメージ
		dmg += Math.floor((this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) * hitsPerSecond.ave) * this.criRate / 100);

		// 配列に格納
		dmgArray = [dmg];

		// 子要素
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				const child = this.childResultArray[idx];
				const grandChildExists = (child.childResultArray.length > 0);
				// 子要素は発生率を考慮する
				ret = this.childResultArray[idx].GetDamageSummaryAvePerSecActual(castVary, castFixed, attackInterval, grandChildExists, false);
				dmgArray = dmgArray.concat(ret);
			}
		}

		return dmgArray;
	};

	/**
	 * 概算ダメージ（秒間最大・実際）の取得.
	 * 1秒間に実際に打てる回数を考慮した計算
	 * @return 概算ダメージ（最大）
	 */
	this.GetDamageSummaryMaxPerSecActual = function (castVary, castFixed, attackInterval, bCollectChild) {

		var idx = 0;
		var ret = null;

		var dmg = 0;
		var dmgArray = null;
		var hitsPerSecond = this._getHitsPerSecondActual(castVary, castFixed, attackInterval, bCollectChild);

		// 全最大ダメージを取得
		dmgArray = [];

		// 通常ダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]) * hitsPerSecond.max));

		// クリティカルダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]) * hitsPerSecond.max));

		// その中でも最大のダメージを採用する
		dmg = GetArrayMax(dmgArray);

		// 子要素の、最大ダメージを取得し、加算する
        if (bCollectChild) {

			for (idx = 0; idx < this.childResultArray.length; idx++) {
				const child = this.childResultArray[idx];
				const grandChildExists = (child.childResultArray.length > 0);
				ret = child.GetDamageSummaryMaxPerSecActual(castVary, castFixed, attackInterval, grandChildExists);
				dmg += GetArrayMax(ret);
			}
		}

		return [dmg];
	};


	/**
	 * Hit/Secの取得.
	 * 1秒間に実際に打てる回数を計算
	 * @return Hit/Sec
	 */
	this._getHitsPerSecondActual = function (castVary, castFixed, attackInterval, bCollectChild) {

		var hitsMin = 1;
		var hitsMax = 1;
		var hitsAve = 1;

		// 重ね置きシミュレーションの対象は「地面設置スキル」のみ。
		// 追撃の子要素を持つか（bCollectChild）は設置か否かと無関係なので判定に含めない。
		// また持続時間・ダメージ間隔が取れていない場合は instobject の maxhit が 0 になり
		// DPS が無言で 0 になるため、通常スキルと同じ計算にフォールバックする。
		var bSimulateOverlap = (this.bGroundInstallation
			&& (this.objectLifeTime > 0)
			&& (attackInterval > 0));

		if (bSimulateOverlap){
			// instobjectで正確に計算
			var casttime = castVary + castFixed;
			var delay = this.delaySkill;
			var cooltime = this.coolTime;
			var lifetime = this.objectLifeTime / 1000.0;
			var interval = attackInterval;
			// 重複設置ができないスキルは、強制ディレイに持続時間相当の値が入っている
			// （n_Delay[3] = n_Delay[6] のほか、ストームガスト 4500・LoV 3100）。
			// これを設置間隔に含めないと、重ね置き不可のスキルまで重ねて計算してしまう。
			// delayForce の単位はミリ秒（CBattleCalcResultAll.GetOverLifeTime と同じ扱い）。
			// n_Delay[3] には秒単位の代入もあるが、それらはいずれも設置スキルではないため
			// bSimulateOverlap が false になり、ここには到達しない。
			var delayForce = this.delayForce / 1000.0;

			var skillinterval = casttime + Math.max(delay, cooltime, delayForce);
			
			// 十分な範囲の設置物を生成（定常状態を含むため）
			// スキルinterval × 最大ヒット数分の時間で、十分な設置物が揃う
			var simulationTime = Math.max(10.0, lifetime * 2);
			var placements = [];
			var currentTime = 0;
			
			while (currentTime < simulationTime) {
				// この設置物がヒットを開始する時刻
				placements.push({
					startTime: currentTime + casttime
				});

				currentTime += skillinterval;
				if (skillinterval === 0) break; // 無限ループ対策
			}
			
			if (placements.length === 0) {
				// 1秒以内に設置できない場合
				return { min: 0, ave: 0, max: 0 };
			}
			
			// 全ての1秒区間をスライディングウィンドウで調べる
			// 走査は戦闘開始（0秒）から行う。設置物が積み上がるまでの立ち上がり期間も
			// 実際に発生する時間変動であり、重ね置きモードはその変動を評価するための
			// モードなので、定常状態に限定せず評価対象に含める。
			var searchStartTime = 0;
			var searchEndTime = simulationTime - lifetime - 1.0;
			
			var minHitsPerSecond = Infinity;
			var maxHitsPerSecond = 0;
			var sampleCount = 0;
			var totalHitsSum = 0;
			
			// 0.1秒刻みで1秒区間を調べる（精度と速度のバランス）
			// windowStart は加算で進めない。0.1 の累積誤差で窓の開始位置がヒット時刻を
			// わずかに下回り（例 1.0 が 0.9999999999999999）、境界のヒットを二重に数えて
			// 最大値が 1 過大になるため、整数カウンタから毎回算出する。
			for (var windowIdx = 0; ; windowIdx++) {
				var windowStart = searchStartTime + windowIdx * 0.1;
				if (windowStart > searchEndTime) {
					break;
				}
				var windowEnd = windowStart + 1.0;
				var hitsInWindow = 0;
				
				placements.forEach(function(p) {
					// getHitCount は引数の時刻のみで判定するため instobj.now の設定は不要
					var instobj = new instobject();
					instobj.init(0, 999999, p.startTime - casttime, casttime, delay, cooltime, lifetime, interval);
					var hitsAtEnd = instobj.getHitCount(windowEnd);
					var hitsAtStart = instobj.getHitCount(windowStart);

					hitsInWindow += (hitsAtEnd - hitsAtStart);
				});
				
				minHitsPerSecond = Math.min(minHitsPerSecond, hitsInWindow);
				maxHitsPerSecond = Math.max(maxHitsPerSecond, hitsInWindow);
				totalHitsSum += hitsInWindow;
				sampleCount++;
			}
			
			if (minHitsPerSecond === Infinity) {
				hitsMin = hitsAve = hitsMax = 0;
			} else {
				hitsMin = minHitsPerSecond;
				hitsMax = maxHitsPerSecond;
				hitsAve = sampleCount > 0 ? (totalHitsSum / sampleCount) : minHitsPerSecond;
			}
		}
		else {
			// 設置スキルではない場合：従来通り割り算
			var actInterval = castVary + castFixed + attackInterval;
			var hits = actInterval > 0 ? (1 / actInterval) : 1;
			hitsMin = hitsMax = hitsAve = hits;
		}
		
		return { min: hitsMin, ave: hitsAve, max: hitsMax };
	}


	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var idx = 0;

		var result = null;

		// インスタンス用意
		result = new CBattleCalcResult();

		// データ複製
		result.skillId = this.skillId;
		result.skillLv = this.skillLv;
		result.castVary = this.castVary;
		result.castFixed = this.castFixed;
		result.delayMotion = this.delayMotion;
		result.delaySkill = this.delaySkill;
		result.delayForce = this.delayForce;
		result.delayInput = this.delayInput;
		result.damageInterval = this.damageInterval;
		result.objectLifeTime = this.objectLifeTime;
		result.bGroundInstallation = this.bGroundInstallation;
		result.bWeaponMismatch = this.bWeaponMismatch;
		result.bNoDamage = this.bNoDamage;
		result.coolTime = this.coolTime;
		result.attackInterval = this.attackInterval;
		result.actRate = this.actRate;
		result.hitRate = this.hitRate;
		result.perfectRate = this.perfectRate;
		result.criRate = this.criRate;
		result.hitCountArray = this.hitCountArray.slice();
		result.dividedHitCountArray = this.dividedHitCountArray.slice();

		result.dmgUnitArray = JSON.parse(JSON.stringify(this.dmgUnitArray));
		result.dmgPerfectArray = this.dmgPerfectArray.slice();
		result.parentSkillId = this.parentSkillId;
		result.bAutoSpell = this.bAutoSpell;

		// 子要素配列
		for (idx = 0; idx < this.childResultArray.length; idx++) {
			result.childResultArray.push(this.childResultArray[idx].Clone());
		}

		return result;
	};
}


