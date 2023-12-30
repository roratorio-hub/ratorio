
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();





//----------------------------------------------------------------
// 矢データ作成用データクラス
//----------------------------------------------------------------

/**
 * 矢データ作成クラス.
 */
function CMigArrowMakeData () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.id = 0;
		this.refId = -1;
		this.officialId = 0;
		this.nameKanaArray = [];
		this.slot = 0;
		this.staticData = new CMigEquipableStaticData();
		this.spDataArray = [];
		this.explainArray = [];
		this.noteArray = [];

	}).call(this);

}
CMigArrowMakeData.prototype = new CMigEquipableDataMakeInfo();





// TODO: 属性自動矢は未登録
// 最近の装備にセット効果があるので、その部分も自動で切り替わるようにしたいが、
// セット効果の説明文などに出てしまうので、別途、調整しなければならない
// →いっそ、表示されたほうが、利用者にはわかりやすい？
// 　←でも、アイテム定義からの自動設定だと、表示できないかも？
// 　　←属性自動矢側にだけ定義すれば、アイテム説明には出せる可能性
// 　　　←重複判定とか大丈夫か？



// データ作成モードなら、本番データを上書き
// ↓パーサ出力結果ファイルの内容は、ここ以降をすべて置換↓
if (_DATA_CREATE_MODE) {		// _DATA_CREATE_MODE



(function () {

	// データ追加対象データ配列取得
	var dataArray = g_constDataManager.arrowDataManager.sourceArray;



	// パーサにより変換（2021/12/19）
	dataArray[MIG_ARROW_ID_NONE] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_NONE)
		.SetOfficialId(-1)
		.AddNameKana("なし", "ナシ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 0)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("矢／弾の装備なし")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_YA)
		.SetOfficialId(1750)
		.AddNameKana("矢", "ヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 25)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_ZINRAI_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_FISH)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_WATER)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MUSO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_ANIMAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_PLANT)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_WIND)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_EARTH)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_IPPEKI_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_SOLID)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_DEMON)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_FIRE)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_RYORAN_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_INSECT)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_HUMAN)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_DISEFFECT_TARGET, MIG_DISEFFECT_TARGET_ID_PLAYER)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_WATER)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_MONSTER, MIG_ELEMENT_ID_EARTH)
				.SetValue(15)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_TETSUNO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_TETSUNO_YA)
		.SetOfficialId(1770)
		.AddNameKana("鉄の矢", "テツノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("鉄で作られていてふつうの矢より強力だ")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_KOTETSUNO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_KOTETSUNO_YA)
		.SetOfficialId(1753)
		.AddNameKana("鋼鉄の矢", "コウテツノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("鋼鉄から作られた矢。高い攻撃力を持っている。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_ORIDEOKONNO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_ORIDEOKONNO_YA)
		.SetOfficialId(1765)
		.AddNameKana("オリデオコンの矢", "オリデオコンノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 50)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_RUDRANO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(50)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("オリデオコンで作られた")
		.AddExplain("とても強力な矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_KARYUDONO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_KARYUDONO_YA)
		.SetOfficialId(1774)
		.AddNameKana("狩人の矢", "カリュウドノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 35)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HUNTER_BOW)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(50)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("狩人たちが使っていた")
		.AddExplain("荒いが丈夫な作りの矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_ELFNO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_ELFNO_YA)
		.SetOfficialId(1773)
		.AddNameKana("エルフの矢", "エルフノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 45)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, MIG_ITEM_ID_ELVEN_BOW)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(50)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("森を守っていた古代の")
		.AddExplain("妖精たちが使っていた矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SUISHONO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SUISHONO_YA)
		.SetOfficialId(1754)
		.AddNameKana("水晶の矢", "スイショウノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WATER)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK, 0)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(25)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_2355)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(20)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_CANCEL_EFFECT_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_FROZEN)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_GENSONO_TOWEL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 1)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_BY)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_ARROW_STORM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_SEVERE_RAINSTORM)
					.SetValue(5)
					.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
				)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HYOTENNO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_SCARF)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_MUFFLER)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, MIG_ITEM_ID_BOINO_MUFFLER)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, MIG_ELEMENT_ID_WATER)
				.SetValue(-75)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("青い水晶から作られた矢。")
		.AddExplain("水の力が宿っている。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_GANSEKINO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_GANSEKINO_YA)
		.SetOfficialId(1756)
		.AddNameKana("岩石の矢", "ガンセキノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_EARTH)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK, 0)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(25)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_CERTAIN)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_STONE)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_2355)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(20)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_CANCEL_EFFECT_STATE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW, MIG_ARROW_ID_GANSEKINO_YA)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_STONE)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_GENSONO_TOWEL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 1)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_BY)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_ARROW_STORM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_SEVERE_RAINSTORM)
					.SetValue(5)
					.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
				)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_DAICHINO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_SCARF)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_MUFFLER)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, MIG_ITEM_ID_BOINO_MUFFLER)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, MIG_ELEMENT_ID_EARTH)
				.SetValue(-75)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("硬い岩石で作られた矢。")
		.AddExplain("大地の力が宿っている。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_HONOONO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_HONOONO_YA)
		.SetOfficialId(1752)
		.AddNameKana("炎の矢", "ホノオノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_FIRE)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK, 0)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(25)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_2355)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(20)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, MIG_ELEMENT_ID_FIRE)
				.SetValue(10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_GENSONO_TOWEL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 1)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_BY)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_ARROW_STORM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_SEVERE_RAINSTORM)
					.SetValue(5)
					.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
				)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_MOERU_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_SCARF)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_MUFFLER)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, MIG_ITEM_ID_BOINO_MUFFLER)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, MIG_ELEMENT_ID_FIRE)
				.SetValue(-75)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("火の力を持っている")
		.AddExplain("魔法の矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_KAZENO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_KAZENO_YA)
		.SetOfficialId(1755)
		.AddNameKana("風の矢", "カゼノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WIND)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_MATK, 0)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(25)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_CERTAIN)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_FUZIN)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL, 5)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_PURE_PARAM)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_INT)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 40)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_OVER)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_AUTO_SPELL_PROB_UP)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_FUZIN)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_LEVEL, 5)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_2355)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_BY_ATTACK)
				.SetValue(20)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_CANCEL_EFFECT_AUTO_SPELL)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ARROW, MIG_ARROW_ID_KAZENO_YA)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_FUZIN)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ALL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_GENSONO_TOWEL)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 1)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_BY)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_ARROW_STORM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_SKILL, SKILL_ID_SEVERE_RAINSTORM)
					.SetValue(5)
					.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
				)
			)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_ITEM_REFINED)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_HAYATENO_YUMI)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_BASE, 10)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_BORDER_FLAG, MIG_BORDER_FLAG_ID_EQUAL)
				.AddChild(
					new CMigEquipableSpData()
					.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_PARAM)
					.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PARAM, MIG_PARAM_ID_ASPD)
					.SetValue(1)
				)
			)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_CONDITION_ID_EQUIP_WITH_ONE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_SCARF)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, ITEM_ID_NIZIIRONO_MUFFLER)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ITEM, MIG_ITEM_ID_BOINO_MUFFLER)
			.AddChild(
				new CMigEquipableSpData()
				.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_RECEIVE_DAMAGE)
				.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_ELEMENT_ATTACK, MIG_ELEMENT_ID_WIND)
				.SetValue(-75)
				.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
			)
		)
		.AddExplain("風の力を持っている")
		.AddExplain("魔法の矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SABITA_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SABITA_YA)
		.SetOfficialId(1762)
		.AddNameKana("錆びた矢", "サビタヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_POISON)
		)
		.AddExplain("古くて錆びてしまった矢")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_GINNO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_GINNO_YA)
		.SetOfficialId(1751)
		.AddNameKana("銀の矢", "ギンノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_HOLY)
		)
		.AddExplain("銀で作られた矢")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_HAMAYA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_HAMAYA)
		.SetOfficialId(1766)
		.AddNameKana("破魔矢", "ハマヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 50)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_HOLY)
		)
		.AddExplain("破魔矢")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SEINARU_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SEINARU_YA)
		.SetOfficialId(1772)
		.AddNameKana("聖なる矢", "セイナルヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 50)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_HOLY)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_ATTACK_DAMAGE_OLD)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_RACE, MIG_RACE_ID_DEMON)
			.SetValue(5)
			.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_VALUE_UNIT, MIG_VALUE_UNIT_ID_PERCENT)
		)
		.AddExplain("邪悪な気配を絶つ性質の金属に、聖水の祝福を加えた矢。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_KAGEYA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_KAGEYA)
		.SetOfficialId(1767)
		.AddNameKana("影矢", "カゲヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_DARK)
		)
		.AddExplain("影で形成されている暗黒の矢")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_MUKEINO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_MUKEINO_YA)
		.SetOfficialId(1757)
		.AddNameKana("無形の矢", "ムケイノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_PSYCO)
		)
		.AddExplain("実体がない輝く矢。どのように飛ぶのかわからないがよく飛ぶ。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SURUDOI_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SURUDOI_YA)
		.SetOfficialId(1764)
		.AddNameKana("鋭い矢", "スルドイヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 10)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("矢先にギザギザがついている鋭い矢。攻撃時、クリティカル確率が上がる。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_CURSE_ARROW] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_CURSE_ARROW)
		.SetOfficialId(1761)
		.AddNameKana("カースアロー", "カースアロー")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("誰かの呪いがかけられている矢。低確率で対象を呪い状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SILENCE_ARROW] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SILENCE_ARROW)
		.SetOfficialId(1769)
		.AddNameKana("サイレンスアロー", "サイレンスアロー")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("言葉を出せなくなる毒が塗られている矢。低確率で対象を沈黙状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SLEEP_ARROW] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SLEEP_ARROW)
		.SetOfficialId(1768)
		.AddNameKana("スリープアロー", "スリープアロー")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("対象を深い眠りに誘う矢。低確率で対象を睡眠状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_FLASH_ARROW] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_FLASH_ARROW)
		.SetOfficialId(1760)
		.AddNameKana("フラッシュアロー", "フラッシュアロー")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
		)
		.AddExplain("目標に近づくとまばゆい光を発する矢。低確率で対象を暗黒状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_KORINO_YA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_KORINO_YA)
		.SetOfficialId(1759)
		.AddNameKana("氷の矢", "コオリノヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WATER)
		)
		.AddExplain("氷の気をまとっている矢。低確率で対象を氷化状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_DOKUYA] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_DOKUYA)
		.SetOfficialId(1763)
		.AddNameKana("毒矢", "ドクヤ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ARROW)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 1)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.3")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_POISON)
		)
		.AddExplain("矢先に毒が塗られている矢。低確率で対象を毒状態にする。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_BULLET)
		.SetOfficialId(13200)
		.AddNameKana("バレット", "バレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 25)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("金属で作られた、銃の弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_BLOOD_BULLET_C] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_BLOOD_BULLET_C)
		.SetOfficialId(13222)
		.AddNameKana("ブラッドバレットC", "ブラッドバレットＣ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 30)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.1")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
			.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_CERTAIN)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_BLEEDING)
		)
		.AddExplain("赤黒く光っており、")
		.AddExplain("まるで血の塊のような弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_AP_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_AP_BULLET)
		.SetOfficialId(13215)
		.AddNameKana("APバレット", "ＡＰバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 50)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_VANITY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("アーマーピアシング弾とも")
		.AddExplain("呼ばれる貫通力が高い弾。")
		.AddExplain("分厚い装甲を貫くものでは")
		.AddExplain("ないので注意。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_ICE_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_ICE_BULLET)
		.SetOfficialId(13230)
		.AddNameKana("アイスバレット", "アイスバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 20)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WATER)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("氷の力が宿った弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_FREEZING_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_FREEZING_BULLET)
		.SetOfficialId(13217)
		.AddNameKana("フリージングバレット", "フリージングバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WATER)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("弾頭に特殊な混合物が")
		.AddExplain("埋め込まれた弾。")
		.AddExplain("命中すると炸裂し、")
		.AddExplain("一瞬で凍りつく。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_MAGICAL_STONE_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_MAGICAL_STONE_BULLET)
		.SetOfficialId(13219)
		.AddNameKana("マジカルストーンバレット", "マジカルストーンバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_EARTH)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("弾頭に特殊な混合物が")
		.AddExplain("埋め込まれた弾。")
		.AddExplain("命中すると炸裂し、")
		.AddExplain("急速に固まる。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_FLARE_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_FLARE_BULLET)
		.SetOfficialId(13228)
		.AddNameKana("フレアバレット", "フレアバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 20)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_FIRE)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("炎の力が宿った弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_BLAZE_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_BLAZE_BULLET)
		.SetOfficialId(13216)
		.AddNameKana("ブレイズバレット", "ブレイズバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_FIRE)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("弾頭に少量の混合物が")
		.AddExplain("埋め込まれた弾。")
		.AddExplain("命中すると炸裂し、")
		.AddExplain("勢いよく燃える。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_LIGHTNING_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_LIGHTNING_BULLET)
		.SetOfficialId(13229)
		.AddNameKana("ライトニングバレット", "ライトニングバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 20)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WIND)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("稲妻の力が宿った弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_ELECTRIC_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_ELECTRIC_BULLET)
		.SetOfficialId(13218)
		.AddNameKana("エレクトリックバレット", "エレクトリックバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_WIND)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("弾頭に特殊な混合物が")
		.AddExplain("埋め込まれた弾。")
		.AddExplain("命中すると炸裂し、")
		.AddExplain("電撃を放つ。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_POISON_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_POISON_BULLET)
		.SetOfficialId(13231)
		.AddNameKana("ポイズンバレット", "ポイズンバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 20)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_POISON)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
			.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_CERTAIN)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_POISON)
		)
		.AddExplain("猛毒が仕込まれた弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SILVER_BULLET_C] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SILVER_BULLET_C)
		.SetOfficialId(13221)
		.AddNameKana("シルバーバレットC", "シルバーバレットＣ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 15)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_HOLY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddExplain("神聖な力が込められた弾。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_SUNCTFIED_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_SUNCTFIED_BULLET)
		.SetOfficialId(13220)
		.AddNameKana("サンクタファイドバレット", "サンクタファイドバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 40)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_HOLY)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 100)
		)
		.AddExplain("聖水で清められた")
		.AddExplain("シルバーバレット。")
		.AddExplain("さまざまな能力が")
		.AddExplain("向上している。")
		.ToArrayData()
	;



	// パーサにより変換（2022/01/21）
	dataArray[MIG_ARROW_ID_BLIND_BULLET] = new CMigArrowMakeData()
		.SetId(MIG_ARROW_ID_BLIND_BULLET)
		.SetOfficialId(13232)
		.AddNameKana("ブラインドバレット", "ブラインドバレット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_BULLET)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ATK, 20)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, "0.2")
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_ELEMENT, MIG_ELEMENT_ID_DARK)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_REQUIRED_LEVEL, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_STATE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_METHOD, MIG_METHOD_ID_PHYSICAL_LONG)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TIMING, MIG_TIMING_ID_HITTED)
			.SetAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_PROB, MIG_PROB_ID_CERTAIN)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_TARGET, MIG_TARGET_ID_ENEMY)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_BLIND)
		)
		.AddExplain("黒煙が仕込まれた弾。")
		.ToArrayData()
	;






})();



}		// _DATA_CREATE_MODE