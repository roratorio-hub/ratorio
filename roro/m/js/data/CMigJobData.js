
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumMigJobDataIndex",
	[
		"MIG_JOB_DATA_INDEX_ID",

		"MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY",

		"MIG_JOB_DATA_INDEX_BASE_EXP_TABLE_ID",
		"MIG_JOB_DATA_INDEX_JOB_EXP_TABLE_ID",
		"MIG_JOB_DATA_INDEX_WEIGHT_BONUS",

		"MIG_JOB_DATA_INDEX_WEAPON_ASPD_ARRAY",
		"MIG_JOB_DATA_INDEX_JOB_BONUS_ARRAY",

		"MIG_JOB_DATA_INDEX_HP_ARRAY",
		"MIG_JOB_DATA_INDEX_SP_ARRAY",

		"MIG_JOB_DATA_INDEX_LEARN_SKILL_ID_ARRAY",
		"MIG_JOB_DATA_INDEX_PASSIVE_SKILL_ID_ARRAY",
		"MIG_JOB_DATA_INDEX_ATTACK_SKILL_ID_ARRAY",
		"MIG_JOB_DATA_INDEX_EQUIPABLE_EQUIP_FLAG_ARRAY",
	],
	0,
	1
);





/**
 * 職業データクラス.
 * @param dataArrayC 設定するデータ配列
 */
function CMigJobData (dataArrayC) {

	// データ配列
	this.dataArray = null;

	// 名称カナ配列
	this.nameKanaArray = null;





	/**
	 * イニシャライザ.
	 */
	(function () {

		var idx = 0;

		// データ配列を設定
		this.dataArray = dataArrayC;

		// 名称カナ情報を設定
		this.nameKanaArray = [];

		for (idx = 0; idx < this.dataArray[MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY].length; idx++) {
			this.nameKanaArray[idx] = new CNameKana(
				this.dataArray[MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY][idx][0],
				this.dataArray[MIG_JOB_DATA_INDEX_NAME_KANA_ARRAY][idx][1]
			);
		}

	}).call(this);





	/**
	 * IDを取得する.
	 * @return ID
	 */
	this.GetId = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_ID];
	};

	/**
	 * 名称カナ配列を取得する.
	 * @return 名称カナ配列
	 */
	this.GetNameKanaArray = function () {
		return this.nameKanaArray;
	};

	/**
	 * ベース経験値テーブルIDを取得する.
	 * @return ベース経験値テーブルID
	 */
	this.GetBaseExpTableId = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_BASE_EXP_TABLE_ID];
	};

	/**
	 * ジョブ経験値テーブルIDを取得する.
	 * @return ジョブ経験値テーブルID
	 */
	this.GetJobExpTableId = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_JOB_EXP_TABLE_ID];
	};

	/**
	 * 所持限界量補正を取得する.
	 * @return 所持限界量補正
	 */
	this.GetWeightBonus = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_WEIGHT_BONUS];
	};

	/**
	 * 武器種別ASPDを取得する.
	 * @param wpnType 武器種別
	 * @return 数値:武器種別ASPD、undefined:装備不可
	 */
	this.GetWeaponAspd = function (wpnType) {

		var idx = 0;

		var wpnAspdArray = null;


		// 情報配列を取得
		wpnAspdArray = this.dataArray[MIG_JOB_DATA_INDEX_WEAPON_ASPD_ARRAY];

		// 配列を走査
		for (idx = 0; idx < wpnAspdArray.length; idx++) {
			if (wpnAspdArray[idx][0] == wpnType) {
				return wpnAspdArray[idx][1];
			}
		}

		// ここまで来たら定義なし
		return undefined;
	};

	/**
	 * ジョブボーナスを取得する.
	 * @param jobLv ジョブレベル
	 * @return パラメータごとのジョブボーナス配列
	 */
	this.GetJobBonus = function (jobLv) {

		var idx = 0;

		var jobBonusInfoArray = null;
		var paramArray = [
			// 基本ステータス
			0, 0, 0, 0, 0, 0,
			// 特性ステータス
			0, 0, 0, 0, 0, 0,
		];


		// 情報配列を取得
		jobBonusInfoArray = this.dataArray[MIG_JOB_DATA_INDEX_JOB_BONUS_ARRAY];


		// ジョブ補正の適用
		for (idx = 0; idx < jobBonusInfoArray.length; idx++) {

			// 上昇配列のレベル指定が、指定のジョブレベルを超えたら抜ける
			if (jobBonusInfoArray[idx][0] > jobLv) {
				break;
			}

			// 指定のパラメタを上昇させる
			paramArray[ jobBonusInfoArray[idx][1] ]++;
		}


		return paramArray;
	};

	/**
	 * HP基礎値を取得する.
	 * @param baseLv ベースレベル
	 * @return HP基礎値
	 */
	this.GetHPBase = function (baseLv) {

		var lvOffset = baseLv - Math.max(1, GetBaseLevelMin(this.GetId()));

		return this.dataArray[MIG_JOB_DATA_INDEX_HP_ARRAY][lvOffset];
	};

	/**
	 * SP基礎値を取得する.
	 * @param baseLv ベースレベル
	 * @return HP基礎値
	 */
	this.GetSPBase = function (baseLv) {

		var lvOffset = baseLv - Math.max(1, GetBaseLevelMin(this.GetId()));

		return this.dataArray[MIG_JOB_DATA_INDEX_SP_ARRAY][lvOffset];
	};

	/**
	 * 習得スキルID配列を取得する.
	 * @return 習得スキルID配列
	 */
	this.GetLearnSkillIdArray = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_LEARN_SKILL_ID_ARRAY].slice();
	};

	/**
	 * パッシブ持続スキルID配列を取得する.
	 * @return パッシブ持続スキルID配列
	 */
	this.GetPassiveSkillIdArray = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_PASSIVE_SKILL_ID_ARRAY].slice();
	};

	/**
	 * 攻撃スキルID配列を取得する.
	 * @return 攻撃スキルID配列
	 */
	this.GetAttackSkillIdArray = function () {
		return this.dataArray[MIG_JOB_DATA_INDEX_ATTACK_SKILL_ID_ARRAY].slice();
	};



	/**
	 * 指定の装備フラグが装備可能かを判定する.
	 * @return 攻撃スキルID配列
	 */
	this.IsEquipableEquipFlag = function (eqpFlag) {
		return (this.dataArray[MIG_JOB_DATA_INDEX_EQUIPABLE_EQUIP_FLAG_ARRAY].indexOf(eqpFlag) >= 0);
	};





}
