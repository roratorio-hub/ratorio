
/**
 * 戦闘計算情報クラス.
 */
function CBattleCalcInfo () {

	// スキルID
	this.skillId = 0;

	// スキルレベル
	this.skillLv = 0;

	// 発生率
	this.actRate = 0;

	// 命中率
	this.hitRate = 0;

	// クリティカル率
	this.criRate = 0;

	// 武器ATK（右手[最小, 平均, 最大]、左手[最小, 平均, 最大]）
	this.atkUnitArrayWpn = null;

	// クリティカル武器ATK（右手[最小, 平均, 最大]、左手[最小, 平均, 最大]）
	this.atkUnitArrayCri = null;

	// ウォーグ武器ATK（単一[最小, 平均, 最大]）
	this.atkUnitArrayWug = null;

	// 素手ATK
	this.statusAtk = 0;

	// 修練ATK
	this.masteryAtk = 0;

	// 修練ATK
	this.masteryAtkLeft = 0;

	// 親スキルID
	this.parentSkillId = undefined;

	// オートスペルフラグ
	this.bAutoSpell = false;

	// ダメージ増幅効果
	this.dmgAmpRate = 0;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		var zeroUnit = [0, 0, 0];

		// データを初期化
		this.skillId = 0;
		this.skillLv = 0;
		this.actRate = 0;
		this.hitRate = 0;
		this.criRate = 0;

		this.atkUnitArrayWpn = [
			zeroUnit.slice(),
			zeroUnit.slice(),
		];

		this.atkUnitArrayCri = [
			zeroUnit.slice(),
			zeroUnit.slice(),
		];

		this.atkUnitArrayWug = [
			zeroUnit.slice(),
		];

		this.statusAtk = 0;
		this.masteryAtk = 0;

		this.parentSkillId = undefined;
		this.bAutoSpell = false;
		this.dmgAmpRate = 0;

	}).call(this);



	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var info = null;

		// インスタンス用意
		info = new CBattleCalcInfo();

		// データ複製
		info.skillId = this.skillId;
		info.skillLv = this.skillLv;
		info.actRate = this.actRate;
		info.hitRate = this.hitRate;
		info.criRate = this.criRate;
		info.atkUnitArrayWpn = JSON.parse(JSON.stringify(this.atkUnitArrayWpn));
		info.atkUnitArrayCri = JSON.parse(JSON.stringify(this.atkUnitArrayCri));
		info.atkUnitArrayWug = JSON.parse(JSON.stringify(this.atkUnitArrayWug));
		info.statusAtk = this.statusAtk;
		info.masteryAtk = this.masteryAtk;
		info.parentSkillId = this.parentSkillId;
		info.bAutoSpell = this.bAutoSpell;
		info.dmgAmpRate = this.dmgAmpRate;

		return info;
	};
}





