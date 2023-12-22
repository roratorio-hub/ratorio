


//----------------------------------------------------------------
// 攻撃手段の種別
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumAttackMethodSource",
	[
		"ATTACK_METHOD_SOURCE_TYPE_JOB_LEARN",
		"ATTACK_METHOD_SOURCE_TYPE_USABLE_SKILL",
		"ATTACK_METHOD_SOURCE_TYPE_AUTO_SPELL",
		"ATTACK_METHOD_BY_MIG_EQUIPABLE_SP_EFFECT",
	],
	0,
	1
);





/**
 * 攻撃手段設定クラス.
 */
function CAttackMethodConf () {

	// スキルID
	this.skillId = 0;

	// 攻撃手段ソース種別
	this.sourceType = 0;

	// スキルレベル
	this.skillLv = 0;

	// オプション値配列
	this.optionValueArray = [];



	/**
	 * スキルIDを設定する.
	 * @param skillId スキルID
	 */
	this.SetSkillId = function (skillId) {
		this.skillId = parseInt(skillId, 10);
	};

	/**
	 * スキルIDを取得する.
	 * @return スキルID
	 */
	this.GetSkillId = function () {
		return this.skillId;
	};



	/**
	 * 攻撃手段ソース種別を設定する.
	 * @param sourceType 攻撃手段ソース種別
	 */
	this.SetSourceType = function (sourceType) {
		this.sourceType = sourceType;
	};

	/**
	 * 攻撃手段ソース種別を取得する.
	 * @return 攻撃手段ソース種別
	 */
	this.GetSourceType = function () {
		return this.sourceType;
	};



	/**
	 * スキルレベルを設定する.
	 * @param skillId スキルレベル
	 */
	this.SetSkillLv = function (skillLv) {
		this.skillLv = parseInt(skillLv, 10);
	};

	/**
	 * スキルレベルを取得する.
	 * @return スキルレベル
	 */
	this.GetSkillLv = function () {
		return this.skillLv;
	};



	/**
	 * オプション値を設定する.
	 * @param optionIndex 設定するインデックス
	 * @param optionValue オプション値
	 */
	this.SetOptionValue = function (optionIndex, optionValue) {
		this.optionValueArray[optionIndex] = parseInt(optionValue, 10);
	};

	/**
	 * オプション値を取得する.
	 * @param optionIndex 取得するインデックス
	 * @return オプション値（インデックスが範囲外の場合は、0）
	 */
	this.GetOptionValue = function (optionIndex) {
		return ((optionIndex < this.optionValueArray.length) ? this.optionValueArray[optionIndex] : 0);
	};

	/**
	 * オプション値の数を取得する.
	 * @return オプション値の数
	 */
	this.GetOptionValueCount = function () {
		return this.optionValueArray.length;
	};

	/**
	 * オプション値を配列で直接設定する.
	 * @param optionValueArray オプション値配列
	 */
	this.SetOptionValueArray = function (optionValueArray) {

		var idx = 0;

		this.optionValueArray = optionValueArray.slice();

		// 念のため、すべての要素を整数に変換しておく
		for (idx = 0; idx < this.optionValueArray.length; idx++) {
			this.optionValueArray[idx] = parseInt(this.optionValueArray[idx], 10);
		}

	};

	/**
	 * オプション値を配列で直接取得する.
	 * @param return オプション値配列
	 */
	this.GetOptionValueArray = function () {
		return this.optionValueArray;
	};



	/**
	 * 複製する.
	 * @return 複製されたインスタンス
	 */
	this.Clone = function () {

		var attackMethodConf = null;

		// インスタンス用意
		attackMethodConf = new CAttackMethodConf();

		// データ複製
		attackMethodConf.SetSkillId(this.GetSkillId());
		attackMethodConf.SetSourceType(this.GetSourceType());
		attackMethodConf.SetSkillLv(this.GetSkillLv());
		attackMethodConf.SetOptionValueArray(this.GetOptionValueArray().slice());

		return attackMethodConf;
	};
}





