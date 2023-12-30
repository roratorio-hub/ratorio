
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



//----------------------------------------------------------------
// 職業データ作成基底クラス
// （各種職業データ作成クラスの基底となるクラス）
//----------------------------------------------------------------

/**
 * 職業データ作成用データ基底クラス.
 */
function CMigJobDataMakeInfo () {

	// ID
	this.id = 0;

	// 名称カナ配列
	this.nameKanaArray = [];

	// ベース経験値テーブルID
	this.baseExpTableId = 0;

	// ジョブ経験値テーブルID
	this.jobExpTableId = 0;

	// 所持限界量補正
	this.weightBonus = 0;

	// 武器種別ASPD配列
	this.weaponAspdArray = [];

	// ジョブボーナス配列
	this.jobBonusArray = [];

	// HP基礎値配列
	this.hpArray = [];

	// SP基礎値配列
	this.spArray = [];

	// 習得スキルID配列
	this.learnSkillIdArray = [];

	// パッシブ持続スキルID配列
	this.passiveSkillIdArray = [];

	// 攻撃スキルID配列
	this.attackSkillIdArray = [];

	// 装備可能装備フラグ配列
	this.equipableEquipFlagArray = [];



	/**
	 * IDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetId = function (value) {
		this.id = value;
		return this;
	};

	/**
	 * 名称カナを追加する.
	 * @param name 名称
	 * @param kana 読み仮名
	 * @return 自身のインスタンス（this）
	 */
	this.AddNameKana = function (name, kana) {
		this.nameKanaArray.push(new CNameKana(name, kana));
		return this;
	};

	/**
	 * ベース経験値テーブルIDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetBaseExpTableId = function (value) {
		this.baseExpTableId = value;
		return this;
	};

	/**
	 * ジョブ経験値テーブルIDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetJobExpTableId = function (value) {
		this.jobExpTableId = value;
		return this;
	};

	/**
	 * 所持限界量補正を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetWeightBonus = function (value) {
		this.weightBonus = value;
		return this;
	};

	/**
	 * 武器種別ASPDを追加する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.AddWeaponAspd = function (weaponType, value) {

		var idx = 0;

		for (idx = 0; idx < this.weaponAspdArray.length; idx++) {

			// 重複は上書き
			if (this.weaponAspdArray[idx][0] == weaponType) {
				this.weaponAspdArray[idx][1] = value;
				return;
			}
		}

		this.weaponAspdArray[idx] = [weaponType, value];
		return this;
	};

	/**
	 * ジョブボーナス配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetJobBonusArray = function (value) {

		var idx = 0;
		var clonedArray = null;

		if (!Array.isArray(value)) {
			return null;
		}

		clonedArray = [];

		for (idx = 0; idx < value.length; idx++) {
			clonedArray.push(value[idx].slice());
		}

		this.jobBonusArray = clonedArray
		return this;
	};

	/**
	 * HP基礎値配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetHpArray = function (value) {
		this.hpArray = value.slice();
		return this;
	};

	/**
	 * SP基礎値配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetSpArray = function (value) {
		this.spArray = value.slice();
		return this;
	};

	/**
	 * 習得スキルID配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetLearnSkillIdArray = function (value) {
		this.learnSkillIdArray = value.slice();
		return this;
	};

	/**
	 * パッシブ持続スキルID配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetPassiveSkillIdArray = function (value) {
		this.passiveSkillIdArray = value.slice();
		return this;
	};

	/**
	 * 攻撃スキルID配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetAttackSkillIdArray = function (value) {
		this.attackSkillIdArray = value.slice();
		return this;
	};

	/**
	 * 装備可能装備フラグ配列を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetEquipableEquipFlagArray = function (value) {
		this.equipableEquipFlagArray = value.slice();
		return this;
	};



	/**
	 * IDを取得する.
	 * @return ID
	 */
	this.GetId = function () {
		return this.id;
	};



	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var arrayDataNameKana = null;
		var arrayDataWork = null;

		arrayData = [];

		arrayData.push(this.id);

		// 名称カナ配列
		arrayDataNameKana = [];
		for (idx = 0; idx < this.nameKanaArray.length; idx++) {
			arrayDataNameKana.push(this.nameKanaArray[idx].ToDat());
		}
		arrayData.push(arrayDataNameKana);

		arrayData.push(this.baseExpTableId);
		arrayData.push(this.jobExpTableId);
		arrayData.push(this.weightBonus);

		// 武器種別ASPD配列
		arrayDataWork = [];
		for (idx = 0; idx < this.weaponAspdArray.length; idx++) {
			arrayDataWork.push(this.weaponAspdArray[idx].slice());
		}
		arrayData.push(arrayDataWork);

		// ジョブボーナス配列
		arrayDataWork = [];
		for (idx = 0; idx < this.jobBonusArray.length; idx++) {
			arrayDataWork.push(this.jobBonusArray[idx].slice());
		}
		arrayData.push(arrayDataWork);

		arrayData.push(this.hpArray.slice());
		arrayData.push(this.spArray.slice());
		arrayData.push(this.learnSkillIdArray.slice());
		arrayData.push(this.passiveSkillIdArray.slice());
		arrayData.push(this.attackSkillIdArray.slice());
		arrayData.push(this.equipableEquipFlagArray.slice());

		return arrayData;
	};
}



