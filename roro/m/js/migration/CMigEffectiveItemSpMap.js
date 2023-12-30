
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();




function CMigEffectiveValueInfo () {

	// セットを示すラベル
	this.setInfo = null;

	// 値
	this.value = 0;

	// 倍率
	this.mutliply = 0;



	/**
	 * 値を取得する.
	 * @return 値
	 */
	this.GetValue = function () {
		return this.value * this.mutliply;
	};
}




/**
 * 有効なアイテムSPマップクラス.
 */
function CMigEffectiveItemSpMap () {

	// マップ
	this.effectiveMap = null;



	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// 初期化
		this.effectiveMap = new Map();

	}).call(this);



	/**
	 * 有効な装備可能品SPデータを追加する.
	 * @param spTag SPタグ
	 * @param valueInfo 値情報
	 */
	this.AddEquipableSpData = function (spTag, valueInfo) {

		var bAdded = false;

		// 登録済みを検査
		bAdded = false;
		this.effectiveMap.forEach(
			function (valueF, keyF, mapF) {
				if (keyF.IsEqual(spTag, null, false)) {
					valueF.push(valueInfo);
					bAdded = true;
				}
			}
		);

		// 新規の場合は追加
		if (!bAdded) {
			this.effectiveMap.set(spTag, [valueInfo]);
		}
	};



	/**
	 * 有効な装備可能品SPデータを取得する.
	 * @param spTag SPタグ
	 * @return 値情報の配列
	 */
	this.GetItemSpDataArray = function (spTag) {

		var foundArray = null;

		// 登録済みを検査
		foundArray = undefined;
		this.effectiveMap.forEach(
			function (valueF, keyF, mapF) {
				if (keyF.IsEqual(spTag, null, false)) {
					foundArray = valueF;
				}
			}
		);

		return foundArray;
	};



	/**
	 * 値を取得する.
	 * @param spTag SPタグ
	 * @param ignoreAttrArray 無視する属性IDの配列
	 * @param 計算モード
	 * @return 値
	 */
	this.GetValue = function (spTag, ignoreAttrArray, calcMode) {

		var value = 0;

		value = 0;

		this.effectiveMap.forEach(
			function (valueF, keyF, mapF) {

				var idxF = 0;

				if (keyF.IsEqual(spTag, ignoreAttrArray, false)) {

					switch (calcMode) {

					case MIG_EFFECTIVE_SP_CALC_MODE_SUM:
						for (idxF = 0; idxF < valueF.length; idxF++) {
							value += valueF[idxF].GetValue();
						}
						break;

					case MIG_EFFECTIVE_SP_CALC_MODE_MAX:
						for (idxF = 0; idxF < valueF.length; idxF++) {
							value = Math.max(value, valueF[idxF].GetValue());
						}
						break;

					case MIG_EFFECTIVE_SP_CALC_MODE_MIN:
						for (idxF = 0; idxF < valueF.length; idxF++) {
							value = Math.min(value, valueF[idxF].GetValue());
						}
						break;
					}
				}
			}
		);

		return value;
	};



	/**
	 * 属性を列挙する（使用可能スキルのスキルIDとレベルの列挙などに使用する）.
	 * @param spTag SPタグ
	 * @param collectAttrArray 収集する属性IDの配列
	 * @param ignoreAttrArray 無視する属性IDの配列（null可、remark も参照）
	 * @return 収集する属性IDに対応する値に倍率を加えた配列の配列
	 * @remark 『収集する属性IDの配列』に指定されたIDは、自動的に『無視する属性IDの配列』に追加される
	 * @remark 戻り値は、collectAttrArray の指定に従って、例えば次のようになる
	 * @remark 　collectAttrArray : [MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL]
	 * @remark 　return : [ [[13],[10]], [1]], [[15, 21], [1, 1]  ], [1,3,2] ]
	 * @remark 　         [ [[ID],[Lv]],[倍]], [[ID1,ID2],[Lv1,Lv2]], [倍1,倍2,倍3] ]
	 * @remark 　（このように、属性の値（IDやLvの部分）自体が配列の場合もあるので注意）
	 * @remark 　なお、倍率をこのように格納するのは、下記の理由による
	 * @remark 　　『まったく同じSP条件・効果が、複数の装備箇所に存在する場合で、
	 * @remark 　　　精錬値によって使用できるレベルが変わるような場合に、
	 * @remark 　　　各精錬値に基づいて算出されたレベルの情報を無損失で取得する』
	 */
	this.EnumAttributes = function (spTag, collectAttrArray, ignoreAttrArray) {

		var idx = 0;

		var dataArrayArray = null;



		// 引数の補正（収集する属性IDを、無視する属性IDに追加）
		if (collectAttrArray.length > 0) {

			if (!ignoreAttrArray) {
				ignoreAttrArray = [];
			}

			ignoreAttrArray = ignoreAttrArray.concat(collectAttrArray);
		}

		// 結果用配列を用意
		dataArrayArray = [];

		// マップ内のすべての要素を検索して列挙
		this.effectiveMap.forEach(
			function (valueF, keyF, mapF) {

				var idxF = 0;

				var dataArrayF = null;
				var dataArraySubF = null;

				if (keyF.IsEqual(spTag, ignoreAttrArray, false)) {

					dataArrayF = [];

					// まずは、指定された属性のデータを追記する
					// collectAttrArray に指定された ID の順にループ処理するので、
					// 例えば、collectAttrArray が
					// 　[MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL]
					// という指定なら、
					// dataArrayF[0] にスキルIDの配列、dataArrayF[1] にスキルレベルの配列が入る
					// （スキルIDもスキルレベルも、元々が配列データなので、配列として入る）
					// （元のデータが単一値なら、dataArrayF[**] に入るのも単一値になる）
					for (idxF = 0; idxF < collectAttrArray.length; idxF++) {
						dataArrayF.push(keyF.GetAttribute(collectAttrArray[idxF]));
					}

					// 最後に dataArrayF の末尾に、倍率の配列を追加する
					// 倍率は 引数 valueF (CMigEffectiveValueInfo のインスタンス配列) に格納された、
					// 各インスタンスの mutliply 属性に記録されている
					// valueF は配列なので、ループ処理ですべての mutliply を配列データにして追記する
					dataArraySubF = [];
					for (idxF = 0; idxF < valueF.length; idxF++) {
						dataArraySubF.push(valueF[idxF].mutliply);
					}
					dataArrayF.push(dataArraySubF);

					// 最終結果に追記する
					dataArrayArray.push(dataArrayF);
				}
			}
		);

		// 結果を返す
		return dataArrayArray;
	};

}





