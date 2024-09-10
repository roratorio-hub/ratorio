


/*


	アイテムをドロップする効果などに対応するため、
	旧方式では定義されていなかった、装備以外のアイテムを仮定義するファイル


*/










if (_DATA_CREATE_MODE) {		// _DATA_CREATE_MODE



(function () {

	// データ追加対象データ配列取得
	var dataArray = g_constDataManager.itemDataManager.sourceArray;

	// TODO: 将来的に何らかの対応が必要
	var itemId = 10000;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_DIAMOND_1_CARAT", itemId))
		.SetOfficialId(730)
		.AddNameKana("ダイヤモンド１カラット", "ダイヤモンド１カラット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 10)
		)
		.AddExplain("透明な、玲瓏たる光を出す宝石。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_DIAMOND_2_CARAT", itemId))
		.SetOfficialId(731)
		.AddNameKana("ダイヤモンド２カラット", "ダイヤモンド２カラット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 10)
		)
		.AddExplain("透明な、玲瓏たる光を出す宝石。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_DIAMOND_3_CARAT", itemId))
		.SetOfficialId(732)
		.AddNameKana("ダイヤモンド３カラット", "ダイヤモンド３カラット")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 10)
		)
		.AddExplain("透明な、玲瓏たる光を出す宝石。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_ELVIRA_CANDY", itemId))
		.SetOfficialId(23044)
		.AddNameKana("エルヴィラキャンディ", "エルヴィラキャンディ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_CURE_STATE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_ZYUBAKUZIN)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_SLOW_CAST)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_MENTAL_SHOCK)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_FATAL_WOUND)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_TENTO)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_ICED)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_USE_COOL_TIME)
			.SetValue(60000)
		)
		.AddExplain("誰が作っているか分からない")
		.AddExplain("エルヴィラの見た目をした")
		.AddExplain("キャンディ。")
		.AddExplain("ソーダ味のように見えるが")
		.AddExplain("実際はミント味。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_ELVIRA_CANDY_YE", itemId))
		.SetOfficialId(12677)
		.AddNameKana("エルヴィラキャンディ(YE)", "エルヴィラキャンディワイイー")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 1)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_CURE_STATE)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_ZYUBAKUZIN)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_SLOW_CAST)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_MENTAL_SHOCK)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_FATAL_WOUND)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_TENTO)
			.AddAttribute(MIG_EQUIPABLE_SP_ATTRIBUTE_ID_STATE, MIG_STATE_ID_ICED)
		)
		.AddEquipableSpData(
			new CMigEquipableSpData()
			.SetSpId(MIG_EQUIPABLE_SP_EFFECT_ID_USE_COOL_TIME)
			.SetValue(5000)
		)
		.AddExplain("誰が作っているか分からない")
		.AddExplain("エルヴィラの見た目をした")
		.AddExplain("キャンディ。")
		.AddExplain("ソーダ味のように見えるが")
		.AddExplain("実際はミント味。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_MADO_GEAR_NENRYO", itemId))
		.SetOfficialId(6146)
		.AddNameKana("魔導ギア燃料", "マドウギアネンリョウ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 3)
		)
		.AddExplain("多くの")
		.AddExplain("魔導ギアスキルで")
		.AddExplain("使用される燃料。")
		.AddExplain("強烈なスキルな程、")
		.AddExplain("大量の燃料を")
		.AddExplain("消費する。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_ICE_CREAM", itemId))
		.SetOfficialId(536)
		.AddNameKana("アイスクリーム", "アイスクリーム")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 8)
		)
		.AddExplain("冷たいアイスクリーム。冷たすぎで、たくさん食べたら凍ってしまうかも……")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_RED_SLIM_POTION", itemId))
		.SetOfficialId(545)
		.AddNameKana("レッドスリムポーション", "レッドスリムポーション")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 2)
		)
		.AddExplain("赤ポーションと同じ効能だがすごく軽い。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_YELLOW_SLIM_POTION", itemId))
		.SetOfficialId(546)
		.AddNameKana("イエロースリムポーション", "イエロースリムポーション")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 3)
		)
		.AddExplain("黄ポーションと同じ効能だがすごく軽い。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_WHITE_SLIM_POTION", itemId))
		.SetOfficialId(547)
		.AddNameKana("ホワイトスリムポーション", "ホワイトスリムポーション")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 5)
		)
		.AddExplain("白ポーションと同じ効能だがすごく軽い。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_NIKU", itemId))
		.SetOfficialId(517)
		.AddNameKana("にく", "ニク")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 15)
		)
		.AddExplain("良く焼いた肉。美味そう。少量のHPを回復する事ができる。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_SEISUI", itemId))
		.SetOfficialId(523)
		.AddNameKana("聖水", "セイスイ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 3)
		)
		.AddExplain("聖霊に使うための祝福を与えた水。呪いを治療する事ができる。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_NOROWARETA_MIZU", itemId))
		.SetOfficialId(12020)
		.AddNameKana("呪われた水", "ノロワレタミズ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 3)
		)
		.AddExplain("紫色で暗い気配が漂う")
		.AddExplain("呪われた水。")
		.AddExplain("―――――――――――――")
		// TODO: 下記の効果、パース結果を登録してない
		.AddExplain("3分間、武器に")
		.AddExplain("闇属性を付与する")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_YOKONO_HAKO", itemId))
		.SetOfficialId(12033)
		.AddNameKana("陽光の箱", "ヨウコウノハコ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 20)
		)
		.AddExplain("30秒間隠れた敵を発見できるようになる。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_TOMARANAI_SHINZO", itemId))
		.SetOfficialId(929)
		.AddNameKana("止まらない心臓", "トマラナイシンゾウ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 1)
		)
		.AddExplain("不死の力を持っていて、止めなければずっと動き続ける心臓。収集品商人に売る事ができる。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_ALCOHOL", itemId))
		.SetOfficialId(970)
		.AddNameKana("アルコール", "アルコール")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 3)
		)
		.AddExplain("変な匂いがする液体。蒸発するから密閉された場所で保管する方がいい。火を付けることができ、水には溶けない物を溶かすこともできる。")
		.ToArrayData()
	;



	// 手動仮登録
	itemId++;
	dataArray[itemId] = new CMigItemMakeData()
		.SetId(g_constDataManager.itemDataManager.RegisterId("MIG_ITEM_ID_ELDERNO_EDA", itemId))
		.SetOfficialId(7939)
		.AddNameKana("エルダーの枝", "エルダーノエダ")
		.SetSlot(0)
		.SetEquipableStaticData(
			new CMigEquipableStaticData()
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_TYPE, MIG_ITEM_TYPE_ETC)
			.SetAttribute(MIG_EQUIPABLE_SP_STATIC_ID_WEIGHT, 1)
		)
		.AddExplain("聖なる場所に生える")
		.AddExplain("高齢の木から得た")
		.AddExplain("小さな枝。")
		.ToArrayData()
	;





})();



}		// _DATA_CREATE_MODE