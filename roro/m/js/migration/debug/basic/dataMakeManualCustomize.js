
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





/*

	パース機能を使ってパースするのが難しいために、手動で調整するデータ
	（アイテム説明文の形式が古すぎて、個別対応が必要なケースなど）

*/







// データ作成モードなら、本番データを上書き
if (_DATA_CREATE_MODE) {		// _DATA_CREATE_MODE

(function () {

	var funcInsertSpData = function (dataKindF, dataIdF, insertInfoArrayArrayF) {

		var idxF = 0;

		switch (dataKindF) {

		case CONST_DATA_KIND_ARROW:
			for (idxF = 0; idxF < insertInfoArrayArrayF.length; idxF++) {
				g_constDataManager.arrowDataManager.sourceArray[dataIdF] =
					new CMigArrowMakeData(g_constDataManager.arrowDataManager.sourceArray[dataIdF])
					.InsertEquipableSpData(
						insertInfoArrayArrayF[idxF][0], insertInfoArrayArrayF[idxF][1]
					)
					.ToArrayData()
				;
			}
			break;
		}

	};




	//================================================================
	// 矢データ
	//================================================================

	// 鋭い矢のクリティカル率補正
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_SURUDOI_YA,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ITEM_TYPE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM_TYPE, MIG_ITEM_TYPE_BOW)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_CRI)
					.SetValue(20)
				)
			],
		]
	);

	// カースアローの状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_SURUDOI_YA,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_CURSED)
			],
		]
	);

	// サイレンスアローの状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_SILENCE_ARROW,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_SILENCE)
			],
		]
	);

	// スリープアローの状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_SLEEP_ARROW,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_SLEEP)
			],
		]
	);

	// フラッシュアローの状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_FLASH_ARROW,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_BLIND)
			],
		]
	);

	// 氷の矢の状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_KORINO_YA,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_FROZEN)
			],
		]
	);

	// 毒矢の状態異常付与効果追加
	funcInsertSpData(
		CONST_DATA_KIND_ARROW,
		MIG_ARROW_ID_DOKUYA,
		[
			[
				0,
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_LOW)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_POISON)
			],
		]
	);







})();

}		// _DATA_CREATE_MODE