
/**
 * 戦闘結果クラス.
 */
function CBattleCalcResult () {

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

	// クールタイム
	this.coolTime = 0;

	// 攻撃間隔
	this.attackInterval = 0;

	// 発生率率
	this.actRate = 0;

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
			funcAddName("オートスペル");
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

		if (g_bDefinedDamageIntervals && !bCollectChild){
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

		if (g_bDefinedDamageIntervals && !bCollectChild){
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

		if (g_bDefinedDamageIntervals && !bCollectChild){
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
		var dmgArray = null;
		var actInterval = 0;
		var hitsPerSecond = 1;

		if (g_bDefinedDamageIntervals && !bCollectChild){
			// 子要素を持たない設置スキルの場合：instobjectで正確に計算
			actInterval = attackInterval;
			
			// 1秒以内に発動する全てのスキルのヒット数を計算
			var casttime = castVary + castFixed;
			var delay = this.delaySkill;
			var cooltime = this.coolTime;
			var lifetime = this.objectLifeTime / 1000.0;
			var interval = attackInterval;
			
			// スキル発動間隔を計算
			var maxhit = lifetime / interval;
			var undertime = lifetime - Math.max(delay, cooltime);
			var skillinterval = casttime + (lifetime - (undertime > 0 ? undertime : 0));
			
			hitsPerSecond = 0;
			var currentTime = 0.0;
			
			// 1秒未満に発動する全てのスキルを計算
			while (currentTime < 1.0) {
				var instobj = new instobject();
				instobj.init(0, 999999, currentTime, casttime, delay, cooltime, lifetime, interval);
				instobj.now = 1.0;
				hitsPerSecond += instobj.getHitCount(1.0);
				
				currentTime += skillinterval;
				if (currentTime + casttime > 1.0) break; // 詠唱が1秒を超える場合は終了
			}
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合：従来通り割り算
			actInterval = castVary + castFixed + attackInterval;
			hitsPerSecond = actInterval > 0 ? (Math.floor(1 / actInterval) + 1) : 1;
		}

		// 発生率が 100% 未満の場合、未発生（0 ダメージ）が最小
		if ((!bIgnoreActRate) && (this.actRate < 100)) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// クリティカル率が 100% の場合、クリティカルダメージの最小ダメージを採用
		else if (this.criRate >= 100) {
			dmgPerHit = this.dmgUnitArray[1][0] * Math.max(1, this.hitCountArray[1][0]);
			dmg = Math.floor(dmgPerHit * hitsPerSecond);
		}

		// 上記以外で、命中率が 100% 未満の場合、Miss （0 ダメージ）が最小
		else if (this.hitRate < 100) {
			// 追撃も発生しないので、そのまま return
			return [0];
		}

		// 上記以外の場合、通常ダメージの最小ダメージを採用
		else {
			dmgPerHit = this.dmgUnitArray[0][0] * Math.max(1, this.hitCountArray[0][0]);
			dmg = Math.floor(dmgPerHit * hitsPerSecond);
		}

		// 子要素の、最小ダメージを取得し、加算する
		if (bCollectChild) {

			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				// 子要素は発生率を考慮する
				ret = this.childResultArray[idx].GetDamageSummaryMinPerSecActual(castVary, castFixed, attackInterval, bCollectChild, false);
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
		var actInterval = 0;
		var hitsPerSecond = 1;

		if (g_bDefinedDamageIntervals && !bCollectChild){
			// 子要素を持たない設置スキルの場合：instobjectで正確に計算
			actInterval = attackInterval;
			
			// 1秒以内に発動する全てのスキルのヒット数を計算
			var casttime = castVary + castFixed;
			var delay = this.delaySkill;
			var cooltime = this.coolTime;
			var lifetime = this.objectLifeTime / 1000.0;
			var interval = attackInterval;
			
			// スキル発動間隔を計算
			var maxhit = lifetime / interval;
			var undertime = lifetime - Math.max(delay, cooltime);
			var skillinterval = casttime + (lifetime - (undertime > 0 ? undertime : 0));
			
			hitsPerSecond = 0;
			var currentTime = 0.0;
			
			// 1秒未満に発動する全てのスキルを計算
			while (currentTime < 1.0) {
				var instobj = new instobject();
				instobj.init(0, 999999, currentTime, casttime, delay, cooltime, lifetime, interval);
				instobj.now = 1.0;
				hitsPerSecond += instobj.getHitCount(1.0);
				
				currentTime += skillinterval;
				if (currentTime + casttime > 1.0) break; // 詠唱が1秒を超える場合は終了
			}
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合：従来通り割り算
			actInterval = castVary + castFixed + attackInterval;
			hitsPerSecond = actInterval > 0 ? (Math.floor(1 / actInterval) + 1) : 1;
		}

		// 通常ダメージ
		dmg += Math.floor((this.dmgUnitArray[0][1] * Math.max(1, this.hitCountArray[0][1]) * hitsPerSecond) * (100 - this.criRate) / 100 * this.hitRate / 100);

		// クリティカルダメージ
		dmg += Math.floor((this.dmgUnitArray[1][1] * Math.max(1, this.hitCountArray[1][1]) * hitsPerSecond) * this.criRate / 100);

		// 配列に格納
		dmgArray = [dmg];

		// 子要素
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				ret = this.childResultArray[idx].GetDamageSummaryAvePerSecActual(castVary, castFixed, attackInterval, bCollectChild);
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
		var actInterval = 0;
		var hitsPerSecond = 1;

		if (g_bDefinedDamageIntervals && !bCollectChild){
			// 子要素を持たない設置スキルの場合：instobjectで正確に計算
			actInterval = attackInterval;
			
			// 1秒以内に発動する全てのスキルのヒット数を計算
			var casttime = castVary + castFixed;
			var delay = this.delaySkill;
			var cooltime = this.coolTime;
			var lifetime = this.objectLifeTime / 1000.0;
			var interval = attackInterval;
			
			// スキル発動間隔を計算
			var maxhit = lifetime / interval;
			var undertime = lifetime - Math.max(delay, cooltime);
			var skillinterval = casttime + (lifetime - (undertime > 0 ? undertime : 0));
			
			hitsPerSecond = 0;
			var currentTime = 0.0;
			
			// 1秒未満に発動する全てのスキルを計算
			while (currentTime < 1.0) {
				var instobj = new instobject();
				instobj.init(0, 999999, currentTime, casttime, delay, cooltime, lifetime, interval);
				instobj.now = 1.0;
				hitsPerSecond += instobj.getHitCount(1.0);
				
				currentTime += skillinterval;
				if (currentTime + casttime > 1.0) break; // 詠唱が1秒を超える場合は終了
			}
		}
		else {
			// 子要素を持つ設置スキル（アストラルストライクの初撃など）の場合
			// または設置スキルではない場合：従来通り割り算
			actInterval = castVary + castFixed + attackInterval;
			hitsPerSecond = actInterval > 0 ? (Math.floor(1 / actInterval) + 1) : 1;
		}

		// 全最大ダメージを取得
		dmgArray = [];

		// 通常ダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[0][2] * Math.max(1, this.hitCountArray[0][2]) * hitsPerSecond));

		// クリティカルダメージ
		dmgArray.push(Math.floor(this.dmgUnitArray[1][2] * Math.max(1, this.hitCountArray[1][2]) * hitsPerSecond));

		// その中でも最大のダメージを採用する
		dmg = GetArrayMax(dmgArray);

		// 子要素の、最大ダメージを取得し、加算する
		if (bCollectChild) {
			for (idx = 0; idx < this.childResultArray.length; idx++) {
				if (this.childResultArray.length - 1 == idx) {
					// これ以上の子要素が無い場合
					bCollectChild = false
				}
				ret = this.childResultArray[idx].GetDamageSummaryMaxPerSecActual(castVary, castFixed, attackInterval, bCollectChild);
				dmg += GetArrayMax(ret);
			}
		}

		return [dmg];
	};



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





