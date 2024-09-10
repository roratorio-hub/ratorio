
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



//----------------------------------------------------------------
// 装備可能品データ作成基底クラス
// （各種装備可能品データ作成クラスの基底となるクラス）
//----------------------------------------------------------------

/**
 * 装備可能品データ作成用データ基底クラス.
 */
function CMigEquipableDataMakeInfo () {

	// ID
	this.id = 0;

	// 参照先ID
	this.refId = -1;

	// 公式ID
	this.officialId = 0;

	// 名称カナ配列
	this.nameKanaArray = [];

	// スロット
	this.slot = 0;

	// 固定情報
	this.staticData = new CMigEquipableStaticData();

	// SPデータ配列
	this.spDataArray = [];

	// 説明文配列
	this.explainArray = [];

	// 備考配列（ゲーム内に存在しないもの）
	this.noteArray = [];



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
	 * 参照先IDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetRefId = function (value) {
		this.refId = value;
		return this;
	};

	/**
	 * 公式IDを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetOfficialId = function (value) {
		this.officialId = value;
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
	 * スロットを設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetSlot = function (value) {
		this.slot = value;
		return this;
	};

	/**
	 * 固定情報を設定する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.SetEquipableStaticData = function (value) {
		this.staticData = value;
		return this;
	};

	/**
	 * SPデータを追加する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.AddEquipableSpData = function (value) {
		this.spDataArray.push(value);
		return this;
	};

	/**
	 * SPデータを指定の位置に挿入する.
	 * @param pos 挿入する位置
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 * @remark パーサによるコード生成では使用せず、手動による調整でのみ使用する
	 */
	this.InsertEquipableSpData = function (pos, value) {
		this.spDataArray.splice(pos, 0, value);
		return this;
	};

	/**
	 * 説明を追加する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.AddExplain = function (value) {
		this.explainArray.push(value);
		return this;
	};

	/**
	 * 備考（ゲーム内に存在しないもの）を追加する.
	 * @param value 値
	 * @return 自身のインスタンス（this）
	 */
	this.AddNote = function (value) {
		this.noteArray.push(value);
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
	 * 参照先IDを取得する.
	 * @return 参照先ID
	 */
	this.GetRefId = function () {
		return this.refId;
	};

	/**
	 * スロットを取得する.
	 * @return 名称
	 */
	this.GetSlot = function () {
		return this.slot;
	};

	/**
	 * 固定情報を取得する.
	 * @return 固定情報
	 */
	this.GetStaticData = function () {
		return this.staticData;
	};

	/**
	 * SPデータ配列を取得する.
	 * @return SPデータ配列
	 */
	this.GetSPDataArray = function () {
		return this.spDataArray;
	};



	/**
	 * 正規化する.
	 * @return 配列データ
	 */
	this.Normalize = function () {

		var idx = 0;

		var dataType = 0;
		var spData = null;
		var attrData = null;
		var value = 0;

		// 旧方式の書き方などで、適切に設定できてないものを補正する



		//----------------------------------------------------------------
		// 武器において、SPデータとして記述されている杖型MATKの補正
		//----------------------------------------------------------------

		dataType = this.staticData.GetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE);

		// 武器の場合のみ処理
		if (MigIsArmsItemType(dataType)) {

			// 固定情報にない場合のみ処理
			if (this.staticData.GetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK) === undefined) {

				// トップレベルのSPデータで、最初に見つかったMATK上昇効果を、採用する
				for (idx = 0; idx < this.spDataArray.length; idx++) {

					// SPデータ取得
					spData = this.spDataArray[idx];

					// SPIDが違う場合は次へ
					if (spData.GetSpId() != MIG_EQUIPABLE_SP_EFFECT_ID_PARAM) {
						continue;
					}

					// MATK上昇効果が設定されているかを検査
					attrData = spData.GetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM);

					if (attrData === undefined) {
						continue;
					}

					if (!Array.isArray(attrData)) {
						continue;
					}

					if (attrData.indexOf(MIG_PARAM_ID_MATK) < 0) {
						continue;
					}

					// ここまで来れば、MATK上昇効果が設定されている

					// 値取得
					value = spData.GetValue();

					// 固定情報の追加
					this.staticData.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK, value);

					// SPデータの補正
					if (attrData.length > 1) {
						attrData.splice(attrData.indexOf(MIG_PARAM_ID_MATK), 1);
						spData.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, attrData);
					}
					else {
						this.spDataArray.splice(idx, 1);
					}

					// 処理終了
					break;
				}
			}
		}

	};


	/**
	 * 配列データ化する.
	 * @return 配列データ
	 */
	this.ToArrayData = function () {

		var idx = 0;

		var arrayData = null;
		var arrayDataNameKana = null;
		var arrayDataSpData = null;

		// 配列化前に正規化
		this.Normalize();

		arrayData = [];

		arrayData.push(this.id);
		arrayData.push(this.refId);
		arrayData.push(this.officialId);
		arrayData.push(this.slot);

		// 名称カナ配列
		arrayDataNameKana = [];
		for (idx = 0; idx < this.nameKanaArray.length; idx++) {
			arrayDataNameKana.push(this.nameKanaArray[idx].ToDat());
		}
		arrayData.push(arrayDataNameKana);

		// 固定情報
		arrayData.push(this.staticData.ToArrayData());

		// SPデータ配列
		arrayDataSpData = [];
		for (idx = 0; idx < this.spDataArray.length; idx++) {
			arrayDataSpData.push(this.spDataArray[idx].ToArrayData());
		}
		arrayData.push(arrayDataSpData);

		// 説明文
		// 現状、出力なし

		// 備考配列
		arrayData.push(this.noteArray.slice());

		return arrayData;
	};
}



