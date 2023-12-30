
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();

// データ移行ファイル読み込みチェック
MigrationFileIncludeCheck();



//----------------------------------------------------------------
// 状態異常データ作成クラス
//----------------------------------------------------------------

/**
 * 状態異常データ作成クラス.
 */
function CMigStateMakeData () {

	/**
	 * 無名イニシャライザ.
	 */
	(function () {

		// データを設定
		this.id = 0;
		this.nameKanaArray = [];
		this.noteArray = [];

	}).call(this);

}
CMigStateMakeData.prototype = new CMigKeywordMakeData();





// データ作成モードなら、本番データを上書き
if (_DATA_CREATE_MODE) {

	(function () {

		var dataArray = null;

		// 配列を上書き
		g_constDataManager.stateDataManager.sourceArray = [];

		// データ追加対象データ配列取得
		dataArray = g_constDataManager.stateDataManager.sourceArray;



		// 以下、データ定義
		// （IDを自動採番にしているので、順序変更や挿入は行わないこと）

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_POISON", -1))
			.AddNameKana("毒", "ドク")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_STUN", -1))
			.AddNameKana("スタン", "スタン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_FROZEN", -1))
			.AddNameKana("凍結", "トウケツ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_CURSED", -1))
			.AddNameKana("呪い", "ノロイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BLIND", -1))
			.AddNameKana("暗黒", "アンコク")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_SLEEP", -1))
			.AddNameKana("睡眠", "スイミン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_SILENCE", -1))
			.AddNameKana("沈黙", "チンモク")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_CONFUSE", -1))
			.AddNameKana("混乱", "コンラン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BLEEDING", -1))
			.AddNameKana("出血", "シュッケツ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_STONE", -1))
			.AddNameKana("石化", "セキカ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_WEAPON", -1))
			.AddNameKana("武器破壊", "ブキハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_HEAD", -1))
			.AddNameKana("兜破壊", "カブトハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_BODY", -1))
			.AddNameKana("鎧破壊", "ヨロイハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_SHIELD", -1))
			.AddNameKana("盾破壊", "タテハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_SHOULDER", -1))
			.AddNameKana("肩破壊", "カタハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_FOOT", -1))
			.AddNameKana("靴破壊", "クツハカイ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_BREAK_ACCESSAOY", -1))
			.AddNameKana("アクセサリ破壊", "アクセサリハカイ")
			.ToArrayData()
		);

		// TODO: 移行過渡期の処理
		// ここまでは、旧方式にも存在するデータ。ID変更不可
		// 以降は、新方式で追加したデータ。初回リリースまでは、調整可

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_SEVERE_POISON", -1))
			.AddNameKana("猛毒", "モウドク")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_STONE_GOING", -1))
			.AddNameKana("石化進行中", "セキカシンコウチュウ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_HALLUCINATION", -1))
			.AddNameKana("幻覚", "ゲンカク")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_IGNITION", -1))
			.AddNameKana("発火", "ハッカ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_ICED", -1))
			.AddNameKana("氷結", "ヒョウケツ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_FEAR", -1))
			.AddNameKana("恐怖", "キョウフ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_DEEP_SLEEP", -1))
			.AddNameKana("深い眠り", "フカイネムリ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_CHILLED", -1))
			.AddNameKana("冷凍", "レイトウ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_CHARM", -1))
			.AddNameKana("魅了", "ミリョウ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_FRENZY", -1))
			.AddNameKana("狂乱", "キョウラン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_IN_PRISON", -1))
			.AddNameKana("インプリズン", "インプリズン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_SEALING_MAGIC", -1))
			.AddNameKana("魔力封印", "マリョクフウイン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MENTAL_SHOCK", -1))
			.AddNameKana("精神衝撃", "セイシンショウゲキ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_FATAL_WOUND", -1))
			.AddNameKana("致命的な傷", "チメイテキナキズ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_SLOW_CAST", -1))
			.AddNameKana("スローキャスト", "スローキャスト")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_PRESSURE", -1))
			.AddNameKana("威圧", "イアツ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_ENERVATION", -1))
			.AddNameKana("マスカレード:エナベーション", "マスカレード　エナベーション")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_GLOOMY", -1))
			.AddNameKana("マスカレード:グルーミー", "マスカレード　グルーミー")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_IGNORANCE", -1))
			.AddNameKana("マスカレード:イグノアランス", "マスカレード　イグノアランス")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_LAZINESS", -1))
			.AddNameKana("マスカレード:レイジーネス", "マスカレード　レイジーネス")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_WEAKNESS", -1))
			.AddNameKana("マスカレード:ウイークネス", "マスカレード　ウイークネス")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MASQUERADE_UNLUCKY", -1))
			.AddNameKana("マスカレード:アンラッキー", "マスカレード　アンラッキー")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_PARALYZE", -1))
			.AddNameKana("パラライズ", "パラライズ")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_PYREXIA", -1))
			.AddNameKana("パイクレシア", "パイクレシア")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_DEATH_HURT", -1))
			.AddNameKana("デスハート", "デスハート")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_LEECHES_END", -1))
			.AddNameKana("リーチエンド", "リーチエンド")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_VENOM_BLEED", -1))
			.AddNameKana("ベナムブリード", "ベナムブリード")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_MAGIC_MUSHROOM", -1))
			.AddNameKana("マジックマッシュルーム", "マジックマッシュルーム")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_TOXIN", -1))
			.AddNameKana("トキシン", "トキシン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_OBLIVION_CURSE", -1))
			.AddNameKana("オブリビオンカース", "オブリビオンカース")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_ZYUBAKUZIN", -1))
			.AddNameKana("呪縛陣", "ジュバクジン")
			.ToArrayData()
		);

		dataArray.push(new CMigStateMakeData()
			.SetId(g_constDataManager.stateDataManager.RegisterId("MIG_STATE_ID_TENTO", -1))
			.AddNameKana("転倒", "テントウ")
			.ToArrayData()
		);


	})();

}		// _DATA_CREATE_MODE


