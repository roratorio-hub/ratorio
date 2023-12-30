
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * ペットデータ作成クラス.
 */
function CPetDataMaker () {

}

//================================================================
//アイテムデータ定義用ダミー関数
//（可読性を高める目的で使用する）
//================================================================
CPetDataMaker.PetName = function (value) { return value; };
CPetDataMaker.PetKana = function (value) { return value; };
CPetDataMaker.PetDetail = function (value) { return value; };

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CPetDataMaker.RegisterId = function (name, value) {
	if (name != "PET_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumPetId", [name], value, undefined);
	}
	return value;
};



/**
 * データ定義を上書き定義する.
 */
CPetDataMaker.OverrideData = function () {

	var petId = 0;
	var petData = null;

	// データ配列オブジェクトを上書き定義していく
	PET_OBJ = new Array();



	// キューペットなし
	CPetDataMaker.RegisterId("PET_ID_NONE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("キューペットなし"),
		CPetDataMaker.PetKana("ア"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// アリス
	CPetDataMaker.RegisterId("PET_ID_ALICE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("アリス"),
		CPetDataMaker.PetKana("アリス"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// イシス
	CPetDataMaker.RegisterId("PET_ID_ISIS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）イシス"),
		CPetDataMaker.PetKana("イシス"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAGICAL_DAMAGE_UP, -1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// インキュバス
	CPetDataMaker.RegisterId("PET_ID_INCUBUS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）インキュバス"),
		CPetDataMaker.PetKana("インキユハス"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_UP, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// インプ
	CPetDataMaker.RegisterId("PET_ID_IMP", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("インプ"),
		CPetDataMaker.PetKana("インフ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_ELM_FIRE, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ウィスパー
	CPetDataMaker.RegisterId("PET_ID_WHISPER", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ウィスパー"),
		CPetDataMaker.PetKana("ウイスハア"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_FLEE_PLUS, 7,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_DEF_PLUS, -3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// オークウォリアー
	CPetDataMaker.RegisterId("PET_ID_ORC_WARRIOR", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）オークウォリアー"),
		CPetDataMaker.PetKana("オオクウオリアア"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_DEF_PLUS, -3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// カブキ忍者
	CPetDataMaker.RegisterId("PET_ID_KABUKI_NINJA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）カブキ忍者"),
		CPetDataMaker.PetKana("カフキニンシヤ"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AGI_PLUS, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// クリスマスゴブリン
	CPetDataMaker.RegisterId("PET_ID_CHIRISTMAS_GOBLIN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）クリスマスゴブリン"),
		CPetDataMaker.PetKana("クリスマスコフリン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 30,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_STATE_FROZEN, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ゴーレム
	CPetDataMaker.RegisterId("PET_ID_GOLEM", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ゴーレム"),
		CPetDataMaker.PetKana("コオレム"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 100,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_FLEE_PLUS, -5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 子デザートウルフ
	CPetDataMaker.RegisterId("PET_ID_KO_DESSERT_WOLF", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("子デザートウルフ"),
		CPetDataMaker.PetKana("コテサアトウルフ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ゴブリンリーダー
	CPetDataMaker.RegisterId("PET_ID_GOBLIN_LEADER", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ゴブリンリーダー"),
		CPetDataMaker.PetKana("コフリンリイタア"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// サキュバス
	CPetDataMaker.RegisterId("PET_ID_SUCUBUS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）サキュバス"),
		CPetDataMaker.PetKana("サキユハス"),
		CPetDataMaker.PetDetail("親密度が「親しい」以上の場合、追加で一定確率[2%]で与ダメージの5%をHPとして吸収<br><red>※実際のゲーム内では、ペット単体で発揮される特殊効果は存在しない可能性あり。</red><br><red>　（セット効果は存在する）</red>"),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// サベージベベ
	CPetDataMaker.RegisterId("PET_ID_SAVAGE_BEBE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("サベージベベ"),
		CPetDataMaker.PetKana("サヘエシヘヘ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ジルタス
	CPetDataMaker.RegisterId("PET_ID_JIRTUS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ジルタス"),
		CPetDataMaker.PetKana("シルタス"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、ペット単体で発揮される特殊効果は存在しない可能性あり。</red><br><red>　（セット効果は存在する）</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, 2,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// スチールチョンチョン
	CPetDataMaker.RegisterId("PET_ID_STEAL_CHONGCHONG", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）スチールチョンチョン"),
		CPetDataMaker.PetKana("スチイルチヨンチヨン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_FLEE_PLUS, 6,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AGI_PLUS, -1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// スポア
	CPetDataMaker.RegisterId("PET_ID_SPORE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）スポア"),
		CPetDataMaker.PetKana("スホア"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_HIT_PLUS, 5,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, -2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// スモーキー
	CPetDataMaker.RegisterId("PET_ID_SMOKY", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）スモーキー"),
		CPetDataMaker.PetKana("スモオキイ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AGI_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_LUCKY_PLUS, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ソヒー
	CPetDataMaker.RegisterId("PET_ID_SOPHIE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ソヒー"),
		CPetDataMaker.PetKana("ソヒイ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_STR_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_DEX_PLUS, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// チュンイー
	CPetDataMaker.RegisterId("PET_ID_CHUNG_EAH", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("チュン・イー"),
		CPetDataMaker.PetKana("チユンイイ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_DEF_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_RACE_HUMAN, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// チョンチョン
	CPetDataMaker.RegisterId("PET_ID_CHONGCHONG", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）チョンチョン"),
		CPetDataMaker.PetKana("チヨンチヨン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AGI_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_FLEE_PLUS, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// デビルチ
	CPetDataMaker.RegisterId("PET_ID_DEVILCH", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("デビルチ"),
		CPetDataMaker.PetKana("テヒルチ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// デュラハン
	CPetDataMaker.RegisterId("PET_ID_DULAHAN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）デュラハン"),
		CPetDataMaker.PetKana("テユラハン"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_CRITICAL_DAMAGE_UP, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 天仙娘々
	CPetDataMaker.RegisterId("PET_ID_TENSEN_NYANGNYANG", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("天仙娘々"),
		CPetDataMaker.PetKana("テンセンニヤンニヤン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_PLUS, 30,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_SPR_UP, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ドケビ
	CPetDataMaker.RegisterId("PET_ID_DOKEBI", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ドケビ"),
		CPetDataMaker.PetKana("トケヒ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAGICAL_DAMAGE_UP, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP, -1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ドロップス
	CPetDataMaker.RegisterId("PET_ID_DROPPS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ドロップス"),
		CPetDataMaker.PetKana("トロツフス"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_HIT_PLUS, 3,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ナイトメアテラー
	CPetDataMaker.RegisterId("PET_ID_NIGHTMARE_TERROR", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ナイトメアテラー"),
		CPetDataMaker.PetKana("ナイトメアテラア"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_STATE_SLEEP, 100,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// バフォメット.Jr
	CPetDataMaker.RegisterId("PET_ID_BAPHOMET_JR", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("バフォメット.Jr"),
		CPetDataMaker.PetKana("ハフオメツトシユニア"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ハンターフライ
	CPetDataMaker.RegisterId("PET_ID_HUNTERFLY", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ハンターフライ"),
		CPetDataMaker.PetKana("ハンタアフライ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_LUCKY_PLUS, 2,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_FLEE_PLUS, -5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ピッキ
	CPetDataMaker.RegisterId("PET_ID_PIKKI", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ピッキ"),
		CPetDataMaker.PetKana("ヒツキ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_STR_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// プティット
	CPetDataMaker.RegisterId("PET_ID_GROUND_PETIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("グラウンドプティット"),
		CPetDataMaker.PetKana("クラウントフテイツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// フレイムシューター
	CPetDataMaker.RegisterId("PET_ID_FLAME_SHOOTER", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）フレイムシューター"),
		CPetDataMaker.PetKana("フレイムシユウタア"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_ELM_FIRE, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ペコペコ
	CPetDataMaker.RegisterId("PET_ID_PEKOPEKO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ペコペコ"),
		CPetDataMaker.PetKana("ヘコヘコ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 150,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_PLUS, -10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ポイズンスポア
	CPetDataMaker.RegisterId("PET_ID_POISON_SPORE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ポイズンスポア"),
		CPetDataMaker.PetKana("ホイスンスホア"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_STR_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_INT_PLUS, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ポポリン
	CPetDataMaker.RegisterId("PET_ID_POPORING", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ポポリン"),
		CPetDataMaker.PetKana("ホホリン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_LUK_PLUS, 2,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_STATE_POISON, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ポリン
	CPetDataMaker.RegisterId("PET_ID_PORING", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ポリン"),
		CPetDataMaker.PetKana("ホリン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_LUK_PLUS, 2,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_CRI_PLUS, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ボンゴン
	CPetDataMaker.RegisterId("PET_ID_BONGGONG", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ボンゴン"),
		CPetDataMaker.PetKana("ホンコン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_VIT_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_STATE_STUN, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// マリオネット
	CPetDataMaker.RegisterId("PET_ID_MARIONET", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）マリオネット"),
		CPetDataMaker.PetKana("マリオネツト"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_SPR_UP, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 雅人形
	CPetDataMaker.RegisterId("PET_ID_MIYABI_NINGYO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("雅人形"),
		CPetDataMaker.PetKana("ミヤヒニンキヨウ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_INT_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_SKILL_CAST_TIME, -3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ミョグェ
	CPetDataMaker.RegisterId("PET_ID_MYOGUE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ミョグェ"),
		CPetDataMaker.PetKana("ミヨクエ"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_PLUS, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ムナック
	CPetDataMaker.RegisterId("PET_ID_MUNAC", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ムナック"),
		CPetDataMaker.PetKana("ムナツク"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_INT_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_DEF_PLUS, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// メデューサ
	CPetDataMaker.RegisterId("PET_ID_MEDUSA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）メデューサ"),
		CPetDataMaker.PetKana("メテユウサ"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_VIT_PLUS, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_STATE_STONE, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// モチリン
	CPetDataMaker.RegisterId("PET_ID_MOCHIRING", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）モチリン"),
		CPetDataMaker.PetKana("モチリン"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、ペット単体で発揮される特殊効果は存在しない可能性あり。</red><br><red>　（セット効果は存在する）</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_RACE_SOLID, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_UP, -1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ヨーヨー
	CPetDataMaker.RegisterId("PET_ID_YOYO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ヨーヨー"),
		CPetDataMaker.PetKana("ヨオヨオ"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_CRI_PLUS, 3,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_LUK_PLUS, -1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// リーフキャット
	CPetDataMaker.RegisterId("PET_ID_LEAFCAT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）リーフキャット"),
		CPetDataMaker.PetKana("リイフキヤツト"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_RACE_ANIMAL, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ルナティック
	CPetDataMaker.RegisterId("PET_ID_RUNATIC", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ルナティック"),
		CPetDataMaker.PetKana("ルナテイツク"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_CRI_PLUS, 2,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ロッカー
	CPetDataMaker.RegisterId("PET_ID_ROCKER", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（×）ロッカー"),
		CPetDataMaker.PetKana("ロツカア"),
		CPetDataMaker.PetDetail("<red>※実際のゲーム内では、特殊効果は存在しない可能性あり。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_HPR_UP, 5,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 25,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ロリルリ
	CPetDataMaker.RegisterId("PET_ID_LOLIRURI", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("（△）ロリルリ"),
		CPetDataMaker.PetKana("ロリルリ"),
		CPetDataMaker.PetDetail("<red>※特殊効果は恐らく存在するが、アイテム説明に記載なし。</red>"),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_UP, 3,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AUTO_SPELL, AS_ID_HEAL_1_BY_ANY_DAMAGE,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ドモヴォイ
	CPetDataMaker.RegisterId("PET_ID_DOMOVOY", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ドモヴォイ"),
		CPetDataMaker.PetKana("トモウオイ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_RESIST_RACE_HUMAN, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 彷徨う者
	CPetDataMaker.RegisterId("PET_ID_SAMAYOUMONO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("彷徨う者"),
		CPetDataMaker.PetKana("サマヨウモノ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ASPD_UP, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_ASPD_UP, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ティクバラン
	CPetDataMaker.RegisterId("PET_ID_TIKBARAN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ティクバラン"),
		CPetDataMaker.PetKana("テイクハラン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_MDEF_PLUS, 3,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET + MONSTER_ID_BUWAYANO_KAGE, 10,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET + MONSTER_ID_BAKONAWA, 10,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET + MONSTER_ID_BYONGUNGO, 10,
		ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET + MONSTER_ID_BUWAYA, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ルビリット
	CPetDataMaker.RegisterId("PET_ID_RUBYRIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ルビリット"),
		CPetDataMaker.PetKana("ルヒリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_ATK_PLUS, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// サファリット
	CPetDataMaker.RegisterId("PET_ID_SAPPHARIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("サファリット"),
		CPetDataMaker.PetKana("サフアリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 100,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_MAXHP_PLUS, 100,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エメリット
	CPetDataMaker.RegisterId("PET_ID_EMERIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エメリット"),
		CPetDataMaker.PetKana("エメリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXHP_PLUS, 50,
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_PLUS, 25,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_MAXHP_PLUS, 50,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_MAXSP_PLUS, 25,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// トパリット
	CPetDataMaker.RegisterId("PET_ID_TOPARIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("トパリット"),
		CPetDataMaker.PetKana("トハリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MAXSP_PLUS, 50,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_MAXSP_PLUS, 50,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// アメリット
	CPetDataMaker.RegisterId("PET_ID_AMERIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("アメリット"),
		CPetDataMaker.PetKana("アメリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 10,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_MATK_PLUS_TYPE_NOTSTUFF, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ミスリット
	CPetDataMaker.RegisterId("PET_ID_MYTHRIT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ミスリット"),
		CPetDataMaker.PetKana("ミスリツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_ALLSTATUS_PLUS_FOR_SET, 1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_ALLSTATUS_PLUS_FOR_SET, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// たまドラ
	CPetDataMaker.RegisterId("PET_ID_TAMADORA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("たまドラ"),
		CPetDataMaker.PetKana("タマトラ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_PET_FRIENDLY_OVER_HIGH + ITEM_SP_AUTO_SPELL, AS_ID_HEAL_1,
		ITEM_SP_PET_FRIENDLY_OVER_HIGHEST + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_HEAL_1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// スウィートドロップス
	CPetDataMaker.RegisterId("PET_ID_SWEET_DROPPS", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("スウィートドロップス"),
		CPetDataMaker.PetKana("スウイイトトロツフス"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAXHP_UP, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_HPR_UP, 100,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ハイオーク
	CPetDataMaker.RegisterId("PET_ID_HIORC", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ハイオーク"),
		CPetDataMaker.PetKana("ハイオオク"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// オークヒーロー
	CPetDataMaker.RegisterId("PET_ID_ORC_HERO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("オークヒーロー"),
		CPetDataMaker.PetKana("オオクヒイロオ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_REFLECT_PHYSICAL_DAMAGE, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_MAGNUM_BREAK_3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// メタルラ
	CPetDataMaker.RegisterId("PET_ID_METARURA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("メタルラ"),
		CPetDataMaker.PetKana("メタルラ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_METALIC_SOUND, 20,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// マスターリング
	CPetDataMaker.RegisterId("PET_ID_MASTERING", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("マスターリング"),
		CPetDataMaker.PetKana("マスタアリンク"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エンジェリング
	CPetDataMaker.RegisterId("PET_ID_ANGELING", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エンジェリング"),
		CPetDataMaker.PetKana("エンシエリンク"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ペクソジン
	CPetDataMaker.RegisterId("PET_ID_PEKUSOZIN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ペクソジン"),
		CPetDataMaker.PetKana("ヘクソシン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_IGNORE_MDEF_RACE_ALL, 50,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_BLESSING_10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// キャットナインテイル
	CPetDataMaker.RegisterId("PET_ID_CAT_NINE_TAIL", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("キャットナインテイル"),
		CPetDataMaker.PetKana("キヤツトナインテイル"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 月夜花
	CPetDataMaker.RegisterId("PET_ID_UORYAFA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("月夜花"),
		CPetDataMaker.PetKana("ウオルヤフア"),
		CPetDataMaker.PetDetail("BaseLv100以上の時、物理攻撃命中時、一定確率で敵に与えたダメージの3%をSPとして吸収"),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_SIGHT_1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ニブルレオン
	CPetDataMaker.RegisterId("PET_ID_NIFL_LEON", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ニブルレオン"),
		CPetDataMaker.PetKana("ニフルレオン"),
		CPetDataMaker.PetDetail("BaseLv100以上の時、物理攻撃でモンスターを倒した時、HP + 100 , SP + 10"),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 捨てられたクマ人形
	CPetDataMaker.RegisterId("PET_ID_SUTERARETA_KUMA_NINGYO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("捨てられたクマ人形"),
		CPetDataMaker.PetKana("ステラレタクマニンキヨウ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ちび管理者ベータ
	CPetDataMaker.RegisterId("PET_ID_CHIBI_KANRISHA_BETA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ちび管理者ベータ"),
		CPetDataMaker.PetKana("チヒカンリシヤヘエタ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ちび管理者アルファ
	CPetDataMaker.RegisterId("PET_ID_CHIBI_KANRISHA_ALPHA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ちび管理者アルファ"),
		CPetDataMaker.PetKana("チヒカンリシヤアルフア"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_FIRE_DANCE, 20,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ワイルドローズ
	CPetDataMaker.RegisterId("PET_ID_WILD_ROSE", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ワイルドローズ"),
		CPetDataMaker.PetKana("ワイルトロオス"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 汚染された彷徨う者
	CPetDataMaker.RegisterId("PET_ID_OSENSARETA_SAMAYOUMONO", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("汚染された彷徨う者"),
		CPetDataMaker.PetKana("オセンサレタサマヨウモノ"),
		CPetDataMaker.PetDetail("BaseLv100以上の時、[クリティカルスラッシュ]で受けるダメージ - 50%"),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エリオット
	CPetDataMaker.RegisterId("PET_ID_ELLIOT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エリオット"),
		CPetDataMaker.PetKana("エリオツト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// キエル-D-01
	CPetDataMaker.RegisterId("PET_ID_CHIEL_D01", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("キエル-D-01"),
		CPetDataMaker.PetKana("キエルテイ０１"),
		CPetDataMaker.PetDetail("BaseLv100以上の時、絶対にノックバックしない"),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_CHEMICAL_WEAPON_CHARGE_5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エリセル
	CPetDataMaker.RegisterId("PET_ID_ELLISEL", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エリセル"),
		CPetDataMaker.PetKana("エリセル"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_CRITICAL_DAMAGE_UP, 10,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エリザ
	CPetDataMaker.RegisterId("PET_ID_ELLISA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エリザ"),
		CPetDataMaker.PetKana("エリサ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エドガ
	CPetDataMaker.RegisterId("PET_ID_EDOGA", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エドガ"),
		CPetDataMaker.PetKana("エトカ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_SOKUDO_ZOKA_10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_SIZE_PERFECTION, 1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// フリオニ
	CPetDataMaker.RegisterId("PET_ID_FURIONI", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("フリオニ"),
		CPetDataMaker.PetKana("フリオニ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_GREED_1,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PURE_DEX_BY_1_OFFSET + ITEM_SP_MAXHP_PLUS, 50,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PURE_DEX_BY_1_OFFSET + ITEM_SP_DEF_PLUS, 3,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// グレムリン
	CPetDataMaker.RegisterId("PET_ID_GLEMRIN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("グレムリン"),
		CPetDataMaker.PetKana("クレムリン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ホドレムリン
	CPetDataMaker.RegisterId("PET_ID_HODOREMLIN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ホドレムリン"),
		CPetDataMaker.PetKana("ホトレムリン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_ACID_DEMONSTRATION, 20,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// グルームアンダーナイト
	CPetDataMaker.RegisterId("PET_ID_GROOM_UNDERNIGHT", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("グルームアンダーナイト"),
		CPetDataMaker.PetKana("クルウムアンタアナイト"),
		CPetDataMaker.PetDetail("BaseLv100以上の時、一部のダメージを反射する効果で受けるダメージ - 10%(計算機未対応)"),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_VOLCANO_5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// グラウンドデリーター
	CPetDataMaker.RegisterId("PET_ID_GROUND_DELETER", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("グラウンドデリーター"),
		CPetDataMaker.PetKana("クラウントテリイタア"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON, 5,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON, 5,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ゴブリン長男
	CPetDataMaker.RegisterId("PET_ID_GOBLIN_CHONAN", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ゴブリン長男"),
		CPetDataMaker.PetKana("コフリンチヨウナン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// マミー
	CPetDataMaker.RegisterId("PET_ID_MOMMY", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("マミー"),
		CPetDataMaker.PetKana("マミイ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// エンシェントマミー
	CPetDataMaker.RegisterId("PET_ID_ANCIENT_MOMMY", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("エンシェントマミー"),
		CPetDataMaker.PetKana("エンシエントマミイ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_FLEE_PLUS, 50,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 深淵の騎士
	CPetDataMaker.RegisterId("PET_ID_SHINENNO_KISHI", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("深淵の騎士"),
		CPetDataMaker.PetKana("シンエンノキシ"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_GOSPEL_1,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PURE_AGI_BY_10_OFFSET + ITEM_SP_MDEF_PLUS, 3,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_PURE_AGI_BY_10_OFFSET + ITEM_SP_PERFECT_ATTACK_UP, 2,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ダークプリースト
	CPetDataMaker.RegisterId("PET_ID_DARK_PRIEST", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ダークプリースト"),
		CPetDataMaker.PetKana("タアクフリイスト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ダークイリュージョン
	CPetDataMaker.RegisterId("PET_ID_DARK_ILLUSION", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ダークイリュージョン"),
		CPetDataMaker.PetKana("タアクイリユウシヨン"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_SKILL_DAMAGE_OFFSET + SKILL_ID_METEOR_STORM, 20,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// ダークロード
	CPetDataMaker.RegisterId("PET_ID_DARK_LORD", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("ダークロード"),
		CPetDataMaker.PetKana("タアクロオト"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, 10,
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_LEARN_SKILL, USABEL_SKILL_ID_GANBANTEIN_1,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;



	// 硬化ナイトメアテラー
	CPetDataMaker.RegisterId("PET_ID_KOKA_NIGHTMARE_TERROR", petId);
	petData = [
		petId,
		CPetDataMaker.PetName("硬化ナイトメアテラー"),
		CPetDataMaker.PetKana("コウカナイトメアテラア"),
		CPetDataMaker.PetDetail(""),
		ITEM_SP_BASE_LV_OVER_100_OFFSET + ITEM_SP_CRI_PLUS, 20,
		ITEM_SP_END
	];
	PET_OBJ[petId] = petData;
	petId++;




};



// データ上書き
if (_DATA_CREATE_MODE) {
	CPetDataMaker.OverrideData();
}
