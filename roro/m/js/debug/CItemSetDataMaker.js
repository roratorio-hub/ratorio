
// デバッグファイル読み込みチェック
DebugFileIncludeCheck();



/**
 * アイテムセットデータ作成クラス.
 */
function CItemSetDataMaker () {

}

/**
 * IDを定義する.
 * @param name 定数名
 * @param value 定数値
 * @return 定数値
 */
CItemSetDataMaker.RegisterId = function (name, value) {
	if (name != "ITEM_SET_ID_UNKNOWN") {
		CGlobalConstManager.DefineEnum("EnumItemSetId", [name], value, undefined);
	}
	return value;
};





//********************************************************************************************************************************
//********************************************************************************************************************************
//****
//**** アイテムセットデータ定義
//****
//********************************************************************************************************************************
//********************************************************************************************************************************

/**
 * データ定義を上書き定義する.
 */
CItemSetDataMaker.OverrideData = function () {

	var __ItemId = function (itemId) { return itemId; };
	var __CardId = function (cardId) { return cardId * -1; };
	var __PetId = function (petId) { return (ITEM_SET_PET_ID_OFFSET + petId) * -1; };

	var itemSetId = 0;
	var itemSetData = null;

	// データ配列オブジェクトを上書き定義していく
	w_SE = new Array();



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_737), __ItemId(ITEM_ID_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_ROD_DEX_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_737), __ItemId(ITEM_ID_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_ROD_INT_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_738), __ItemId(ITEM_ID_288), __ItemId(ITEM_ID_699)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_739), __ItemId(ITEM_ID_300), __ItemId(ITEM_ID_724)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_740), __ItemId(ITEM_ID_323), __ItemId(ITEM_ID_CHINURARETA_TEKKYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_741), __ItemId(ITEM_ID_298), __ItemId(ITEM_ID_726)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ODINNO_SHUKUFUKU_MAGNI_SET), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_661), __ItemId(ITEM_ID_691)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_743), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_703), __ItemId(ITEM_ID_712)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_744), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_704), __ItemId(ITEM_ID_713)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_745), __ItemId(ITEM_ID_667), __ItemId(ITEM_ID_685), __ItemId(ITEM_ID_702), __ItemId(ITEM_ID_711)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_746), __ItemId(ITEM_ID_666), __ItemId(ITEM_ID_701), __ItemId(ITEM_ID_721), __ItemId(ITEM_ID_722)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_747), __ItemId(ITEM_ID_665), __ItemId(ITEM_ID_700), __ItemId(ITEM_ID_719), __ItemId(ITEM_ID_720)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_748), __ItemId(ITEM_ID_664), __ItemId(ITEM_ID_683), __ItemId(ITEM_ID_690), __ItemId(ITEM_ID_698), __ItemId(ITEM_ID_710)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_749), __ItemId(ITEM_ID_VALKYRIE_ARMER), __ItemId(ITEM_ID_VALKYRIE_MANT), __ItemId(ITEM_ID_VALKIRIE_SHOES), __ItemId(ITEM_ID_670)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_750), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_STUFF_OF_SOUL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_750), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_WIZARD_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_751), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_329)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_751), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_342)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_751), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_343)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_752), __ItemId(ITEM_ID_694), __ItemId(ITEM_ID_732)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_753), __ItemId(ITEM_ID_695), __ItemId(ITEM_ID_733)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_754), __ItemId(ITEM_ID_716), __ItemId(ITEM_ID_706)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_755), __ItemId(ITEM_ID_705), __ItemId(ITEM_ID_405)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_755), __ItemId(ITEM_ID_705), __ItemId(ITEM_ID_467)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_755), __ItemId(ITEM_ID_705), __ItemId(ITEM_ID_471)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_756), __ItemId(ITEM_ID_707), __ItemId(ITEM_ID_717)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_757), __ItemId(ITEM_ID_727), __ItemId(ITEM_ID_647)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_763), __ItemId(ITEM_ID_478), __ItemId(ITEM_ID_697)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_ODINNO_SHUKUFUKU_FRIGG_SET), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_663), __ItemId(ITEM_ID_692)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_765), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_662)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_766), __ItemId(ITEM_ID_619), __ItemId(ITEM_ID_731)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_767), __ItemId(ITEM_ID_LONG_HORN), __ItemId(ITEM_ID_692)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_768), __ItemId(ITEM_ID_728), __ItemId(ITEM_ID_729)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_QUILL_PENRING_SMALL_BOOK_PENDANT), __ItemId(ITEM_ID_QUILL_PENRING), __ItemId(ITEM_ID_848)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_814), __ItemId(ITEM_ID_813), __ItemId(ITEM_ID_808)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_818), __ItemId(ITEM_ID_816), __ItemId(ITEM_ID_817)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_824), __ItemId(ITEM_ID_823), __ItemId(ITEM_ID_292)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_854), __ItemId(ITEM_ID_DIABOLOS_ROBE), __ItemId(ITEM_ID_DIABOLOS_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_854), __ItemId(ITEM_ID_DIABOLOS_ARMER), __ItemId(ITEM_ID_DIABOLOS_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_855), __ItemId(ITEM_ID_992), __ItemId(ITEM_ID_LONG_HORN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_855), __ItemId(ITEM_ID_992), __ItemId(ITEM_ID_BATTLE_FOOK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_855), __ItemId(ITEM_ID_992), __ItemId(ITEM_ID_HUNTING_SPEAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_856), __ItemId(ITEM_ID_HOLY_STICK), __ItemId(ITEM_ID_831)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_857), __ItemId(ITEM_ID_DIABOLOS_MANT), __ItemId(ITEM_ID_DIABOLOS_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_858), __ItemId(ITEM_ID_823), __ItemId(ITEM_ID_838), __ItemId(ITEM_ID_837)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_858), __ItemId(ITEM_ID_822), __ItemId(ITEM_ID_838), __ItemId(ITEM_ID_837)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FALCON_BRITZ_LITTLE_FEATHER_HAT), __ItemId(ITEM_ID_1174), __ItemId(ITEM_ID_1358)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_860), __ItemId(ITEM_ID_251), __ItemId(ITEM_ID_307), __ItemId(ITEM_ID_838)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_861), __ItemId(ITEM_ID_RUNA_BOW), __ItemId(ITEM_ID_839)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_862), __ItemId(ITEM_ID_841), __ItemId(ITEM_ID_842)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_971), __ItemId(ITEM_ID_958), __ItemId(ITEM_ID_965), __ItemId(ITEM_ID_968)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_972), __ItemId(ITEM_ID_959), __ItemId(ITEM_ID_965), __ItemId(ITEM_ID_968)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_973), __ItemId(ITEM_ID_960), __ItemId(ITEM_ID_965), __ItemId(ITEM_ID_968)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_974), __ItemId(ITEM_ID_961), __ItemId(ITEM_ID_966), __ItemId(ITEM_ID_969)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_975), __ItemId(ITEM_ID_962), __ItemId(ITEM_ID_966), __ItemId(ITEM_ID_969)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_976), __ItemId(ITEM_ID_963), __ItemId(ITEM_ID_966), __ItemId(ITEM_ID_969)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_977), __ItemId(ITEM_ID_964), __ItemId(ITEM_ID_967), __ItemId(ITEM_ID_970)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_995), __ItemId(ITEM_ID_718), __ItemId(ITEM_ID_994)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_999), __ItemId(ITEM_ID_SPRINT_MAIL), __ItemId(ITEM_ID_998), __ItemId(ITEM_ID_1001)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1004), __ItemId(ITEM_ID_TOZOKUNO_YUBIWA), __ItemId(ITEM_ID_1003)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1006), __ItemId(ITEM_ID_TOZOKUNO_YUBIWA), __ItemId(ITEM_ID_1005)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1008), __ItemId(ITEM_ID_946), __ItemId(ITEM_ID_1007)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1010), __ItemId(ITEM_ID_990), __ItemId(ITEM_ID_1009)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1042), __ItemId(ITEM_ID_198), __ItemId(ITEM_ID_1041)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1053), __ItemId(ITEM_ID_1050), __ItemId(ITEM_ID_1051), __ItemId(ITEM_ID_1052)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1058), __ItemId(ITEM_ID_1055), __ItemId(ITEM_ID_1056), __ItemId(ITEM_ID_1057)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1114), __ItemId(ITEM_ID_GLORIOUS_SUIT), __ItemId(ITEM_ID_GLORIOUS_SHOES), __ItemId(ITEM_ID_GLORIOUS_MUFFLER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_978)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_979)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_980)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_981)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_982)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_983)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1115), __ItemId(ITEM_ID_GLORIOUS_RING), __ItemId(ITEM_ID_984)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1202), __ItemId(ITEM_ID_247), __ItemId(ITEM_ID_1182)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1203), __ItemId(ITEM_ID_1189), __ItemId(ITEM_ID_1192)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1209), __ItemId(ITEM_ID_1208), __ItemId(ITEM_ID_385)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1210), __ItemId(ITEM_ID_1208), __ItemId(ITEM_ID_381)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1211), __ItemId(ITEM_ID_1208), __ItemId(ITEM_ID_805)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1212), __ItemId(ITEM_ID_1208), __ItemId(ITEM_ID_887)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1213), __ItemId(ITEM_ID_1208), __ItemId(ITEM_ID_1037)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1217), __ItemId(ITEM_ID_804), __ItemId(ITEM_ID_1216)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1237), __ItemId(ITEM_ID_1235), __ItemId(ITEM_ID_1236)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1238), __ItemId(ITEM_ID_684), __ItemId(ITEM_ID_1236)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1249), __ItemId(ITEM_ID_251), __ItemId(ITEM_ID_1248)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1253), __ItemId(ITEM_ID_288), __ItemId(ITEM_ID_699), __ItemId(ITEM_ID_1252)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VALENTINE_BO_SANSEIHANO_AKASHI), __ItemId(ITEM_ID_VALENTINE_BO), __ItemId(ITEM_ID_SANSEIHANO_AKASHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VALENTINE_BO_HANTAIHANO_AKASHI), __ItemId(ITEM_ID_VALENTINE_BO), __ItemId(ITEM_ID_HANTAIHANO_AKASHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1263), __ItemId(ITEM_ID_889), __ItemId(ITEM_ID_1262)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1267), __ItemId(ITEM_ID_803), __ItemId(ITEM_ID_1266)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OKAKAN_HANABIRA), __ItemId(ITEM_ID_OKAKAN), __ItemId(ITEM_ID_274)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OKAKAN_SHIROI_HANABIRA), __ItemId(ITEM_ID_OKAKAN), __ItemId(ITEM_ID_794)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OKAKAN_KUSANOHA), __ItemId(ITEM_ID_OKAKAN), __ItemId(ITEM_ID_276)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1323), __ItemId(ITEM_ID_1322), __ItemId(ITEM_ID_PIKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1323), __ItemId(ITEM_ID_1322), __ItemId(ITEM_ID_GRADIUS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1324), __ItemId(ITEM_ID_1322), __ItemId(ITEM_ID_696)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1333), __ItemId(ITEM_ID_1332), __ItemId(ITEM_ID_889)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1336), __ItemId(ITEM_ID_1334), __ItemId(ITEM_ID_1335)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1338), __ItemId(ITEM_ID_1337), __ItemId(ITEM_ID_1005)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1342), __ItemId(ITEM_ID_1341), __ItemId(ITEM_ID_1348)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1370), __ItemId(ITEM_ID_733), __ItemId(ITEM_ID_1369)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1374), __ItemId(ITEM_ID_1359), __ItemId(ITEM_ID_644)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1375), __ItemId(ITEM_ID_1359), __ItemId(ITEM_ID_HOLY_STICK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1376), __ItemId(ITEM_ID_1360), __ItemId(ITEM_ID_146)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1377), __ItemId(ITEM_ID_1360), __ItemId(ITEM_ID_151)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1378), __ItemId(ITEM_ID_1361), __ItemId(ITEM_ID_253)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1379), __ItemId(ITEM_ID_1361), __ItemId(ITEM_ID_GAIKOTSUNO_TUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1379), __ItemId(ITEM_ID_1361), __ItemId(ITEM_ID_936)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1380), __ItemId(ITEM_ID_1362), __ItemId(ITEM_ID_374)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1380), __ItemId(ITEM_ID_1362), __ItemId(ITEM_ID_377)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1383), __ItemId(ITEM_ID_1382), __ItemId(ITEM_ID_732)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1384), __ItemId(ITEM_ID_1382), __ItemId(ITEM_ID_687)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1385), __ItemId(ITEM_ID_1382), __ItemId(ITEM_ID_694)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHUZINNOFUKU_ASHIKUSARI), __ItemId(ITEM_ID_SHUZINNO_FUKU), __ItemId(ITEM_ID_323)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1395), __ItemId(ITEM_ID_TSUGAKU_BAG), __ItemId(ITEM_ID_ACADEMY_BADGE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_WHITE_FEATHER_PIPE_TABACCO), __ItemId(ITEM_ID_WHITE_FEATHER), __ItemId(ITEM_ID_PIPE_TABACCO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1409), __ItemId(ITEM_ID_1402), __CardId(CARD_ID_SHINENNO_KISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNE_BOOTS_CONTINENTAL_GUARDNO_INSHO), __ItemId(ITEM_ID_RUNE_BOOTS), __ItemId(ITEM_ID_845)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1411), __ItemId(ITEM_ID_RUNE_BOOTS), __ItemId(ITEM_ID_846)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1412), __ItemId(ITEM_ID_RUNE_BOOTS), __ItemId(ITEM_ID_847)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1413), __ItemId(ITEM_ID_1404), __ItemId(ITEM_ID_730)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1414), __ItemId(ITEM_ID_1405), __ItemId(ITEM_ID_357)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1417), __ItemId(ITEM_ID_1415), __ItemId(ITEM_ID_1416)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA), __ItemId(ITEM_ID_SAMAYOUMONONO_HAORI), __ItemId(ITEM_ID_1273)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1438), __ItemId(ITEM_ID_1406), __ItemId(ITEM_ID_1437)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1442), __ItemId(ITEM_ID_1440), __ItemId(ITEM_ID_1441)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1446), __ItemId(ITEM_ID_1334), __ItemId(ITEM_ID_1445)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1448), __ItemId(ITEM_ID_252), __ItemId(ITEM_ID_1447)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1449), __ItemId(ITEM_ID_643), __ItemId(ITEM_ID_1447)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1459), __ItemId(ITEM_ID_1458), __ItemId(ITEM_ID_247)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1462), __ItemId(ITEM_ID_1461), __ItemId(ITEM_ID_1147)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1472), __ItemId(ITEM_ID_1439), __ItemId(ITEM_ID_1471)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1490), __ItemId(ITEM_ID_1373), __ItemId(ITEM_ID_1489)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1494), __ItemId(ITEM_ID_1493), __ItemId(ITEM_ID_707), __ItemId(ITEM_ID_717)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1497), __ItemId(ITEM_ID_1496), __ItemId(ITEM_ID_247)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1500), __ItemId(ITEM_ID_1498), __ItemId(ITEM_ID_1499)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1504), __ItemId(ITEM_ID_DATITOZOKUNO_TEKUSARI), __ItemId(ITEM_ID_252)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DAITOZOKUNO_TEKUSARI_SHUZINNO_FUKU), __ItemId(ITEM_ID_DATITOZOKUNO_TEKUSARI), __ItemId(ITEM_ID_SHUZINNO_FUKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DAITOZOKUNO_TEKUSARI_ASHIKUSARI), __ItemId(ITEM_ID_DATITOZOKUNO_TEKUSARI), __ItemId(ITEM_ID_323)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1507), __ItemId(ITEM_ID_DATITOZOKUNO_TEKUSARI), __ItemId(ITEM_ID_CHINURARETA_TEKKYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1509), __ItemId(ITEM_ID_1508), __ItemId(ITEM_ID_1425)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1511), __ItemId(ITEM_ID_1510), __ItemId(ITEM_ID_1492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1513), __ItemId(ITEM_ID_1512), __ItemId(ITEM_ID_1419)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1515), __ItemId(ITEM_ID_1514), __ItemId(ITEM_ID_1443)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1517), __ItemId(ITEM_ID_1516), __ItemId(ITEM_ID_1435)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1519), __ItemId(ITEM_ID_1518), __ItemId(ITEM_ID_1452)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1521), __ItemId(ITEM_ID_1520), __ItemId(ITEM_ID_1391)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1523), __ItemId(ITEM_ID_1522), __ItemId(ITEM_ID_1470)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1530), __ItemId(ITEM_ID_1456), __ItemId(ITEM_ID_1491)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1533), __ItemId(ITEM_ID_1532), __ItemId(ITEM_ID_TSUGAKU_BAG)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1535), __ItemId(ITEM_ID_1534), __ItemId(ITEM_ID_1538), __ItemId(ITEM_ID_1539), __ItemId(ITEM_ID_1540)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1537), __ItemId(ITEM_ID_1536), __ItemId(ITEM_ID_1538), __ItemId(ITEM_ID_1539), __ItemId(ITEM_ID_1540)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1542), __ItemId(ITEM_ID_1541), __ItemId(ITEM_ID_1545), __ItemId(ITEM_ID_1546), __ItemId(ITEM_ID_1547)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1544), __ItemId(ITEM_ID_1543), __ItemId(ITEM_ID_1545), __ItemId(ITEM_ID_1546), __ItemId(ITEM_ID_1547)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1549), __ItemId(ITEM_ID_1548), __ItemId(ITEM_ID_1552), __ItemId(ITEM_ID_1553), __ItemId(ITEM_ID_1554)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1551), __ItemId(ITEM_ID_1550), __ItemId(ITEM_ID_1552), __ItemId(ITEM_ID_1553), __ItemId(ITEM_ID_1554)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1556), __ItemId(ITEM_ID_1555), __ItemId(ITEM_ID_1559), __ItemId(ITEM_ID_1560), __ItemId(ITEM_ID_1561)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1558), __ItemId(ITEM_ID_1557), __ItemId(ITEM_ID_1559), __ItemId(ITEM_ID_1560), __ItemId(ITEM_ID_1561)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1563), __ItemId(ITEM_ID_1562), __ItemId(ITEM_ID_1566), __ItemId(ITEM_ID_1567), __ItemId(ITEM_ID_1568)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1565), __ItemId(ITEM_ID_1564), __ItemId(ITEM_ID_1566), __ItemId(ITEM_ID_1567), __ItemId(ITEM_ID_1568)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1570), __ItemId(ITEM_ID_1569), __ItemId(ITEM_ID_1573), __ItemId(ITEM_ID_1574), __ItemId(ITEM_ID_1575)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1572), __ItemId(ITEM_ID_1571), __ItemId(ITEM_ID_1573), __ItemId(ITEM_ID_1574), __ItemId(ITEM_ID_1575)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_URUZ_PLATE_ARTIFACT), __ItemId(ITEM_ID_URUZ_PLATE), __ItemId(ITEM_ID_URUZ_MANT), __ItemId(ITEM_ID_URUZ_GREAVE), __ItemId(ITEM_ID_URUZ_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1586), __ItemId(ITEM_ID_PEORTH_PLATE), __ItemId(ITEM_ID_PEORTH_MANT), __ItemId(ITEM_ID_PEORTH_GREEVE), __ItemId(ITEM_ID_PEORTH_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1591), __ItemId(ITEM_ID_1590), __ItemId(ITEM_ID_1592), __ItemId(ITEM_ID_1593), __ItemId(ITEM_ID_1594)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NABUNO_CLOTH_ARTIFACT), __ItemId(ITEM_ID_NABUNO_CLOTH), __ItemId(ITEM_ID_NABUNO_HOOD), __ItemId(ITEM_ID_NABUNO_SHOES), __ItemId(ITEM_ID_NABUNO_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1601), __ItemId(ITEM_ID_SHIRAHANO_SUIT), __ItemId(ITEM_ID_1602), __ItemId(ITEM_ID_1603), __ItemId(ITEM_ID_1604)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUROHANO_SUIT_ARTIFACT), __ItemId(ITEM_ID_KUROHANO_SUIT), __ItemId(ITEM_ID_KUROHANO_MANT), __ItemId(ITEM_ID_KUROHANO_BOOTS), __ItemId(ITEM_ID_KUROHANO_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPRINT_GLOVE_SPRINT_RING), __ItemId(ITEM_ID_SPRINT_GLOVE), __ItemId(ITEM_ID_1001)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPRINT_GLOVE_SPRINT_SHOES), __ItemId(ITEM_ID_SPRINT_GLOVE), __ItemId(ITEM_ID_998)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPRINT_GLOVE_SPRINT_MAIL), __ItemId(ITEM_ID_SPRINT_GLOVE), __ItemId(ITEM_ID_SPRINT_MAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1614), __ItemId(ITEM_ID_SPRINT_GLOVE), __ItemId(ITEM_ID_1001), __ItemId(ITEM_ID_998), __ItemId(ITEM_ID_SPRINT_MAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1627), __ItemId(ITEM_ID_1228), __ItemId(ITEM_ID_1626)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1628), __ItemId(ITEM_ID_645), __ItemId(ITEM_ID_1626)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1629), __ItemId(ITEM_ID_473), __ItemId(ITEM_ID_1626)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1631), __ItemId(ITEM_ID_1630), __ItemId(ITEM_ID_330)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1640), __ItemId(ITEM_ID_1402), __ItemId(ITEM_ID_1639)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1649), __ItemId(ITEM_ID_AEGIR_HELM), __ItemId(ITEM_ID_AEGIR_ARMOR), __ItemId(ITEM_ID_AEGIR_MANT), __ItemId(ITEM_ID_AEGIR_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1650), __ItemId(ITEM_ID_1390), __CardId(CARD_ID_254)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1651), __ItemId(ITEM_ID_1390), __CardId(CARD_ID_356)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1652), __ItemId(ITEM_ID_1390), __CardId(CARD_ID_259)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1654), __ItemId(ITEM_ID_TAKOHIKI_HOCHO), __CardId(CARD_ID_254)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1655), __ItemId(ITEM_ID_TAKOHIKI_HOCHO), __CardId(CARD_ID_356)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1656), __ItemId(ITEM_ID_TAKOHIKI_HOCHO), __CardId(CARD_ID_259)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1657), __ItemId(ITEM_ID_TAKOHIKI_HOCHO), __CardId(CARD_ID_254), __CardId(CARD_ID_356), __CardId(CARD_ID_259)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1659), __ItemId(ITEM_ID_MAGICAL_BLADE), __CardId(CARD_ID_428)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1660), __ItemId(ITEM_ID_MAGICAL_BLADE), __CardId(CARD_ID_498)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1662), __ItemId(ITEM_ID_1661), __CardId(CARD_ID_328)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1663), __ItemId(ITEM_ID_1661), __CardId(CARD_ID_617)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1665), __ItemId(ITEM_ID_DAKATSU_DAIZENSHU), __CardId(CARD_ID_34)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1666), __ItemId(ITEM_ID_DAKATSU_DAIZENSHU), __CardId(CARD_ID_SIDEWINDER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1667), __ItemId(ITEM_ID_DAKATSU_DAIZENSHU), __CardId(CARD_ID_34), __CardId(CARD_ID_SIDEWINDER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1669), __ItemId(ITEM_ID_1668), __CardId(CARD_ID_297)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1683), __ItemId(ITEM_ID_1681), __ItemId(ITEM_ID_1682)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GEFENIA_MIZUNO_KOSHO_LACRYMA_STICK), __ItemId(ITEM_ID_LACRYMA_STICK), __ItemId(ITEM_ID_GEFENIA_MIZUNO_KOSHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1691), __ItemId(ITEM_ID_1175), __ItemId(ITEM_ID_1690)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1692), __ItemId(ITEM_ID_CACRAM), __ItemId(ITEM_ID_1690)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1694), __ItemId(ITEM_ID_610), __ItemId(ITEM_ID_1693)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1715), __ItemId(ITEM_ID_834), __ItemId(ITEM_ID_1714)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1756), __ItemId(ITEM_ID_1748), __ItemId(ITEM_ID_BANGUNGOT_BOOTS), __ItemId(ITEM_ID_1752), __ItemId(ITEM_ID_1754)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1786), __ItemId(ITEM_ID_1785), __ItemId(ITEM_ID_385)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1788), __ItemId(ITEM_ID_1787), __ItemId(ITEM_ID_SHINKUNO_BARA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1790), __ItemId(ITEM_ID_936), __ItemId(ITEM_ID_1789)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1792), __ItemId(ITEM_ID_IMPERIAL_FEATHER), __ItemId(ITEM_ID_1341), __ItemId(ITEM_ID_1348)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HASANSHANO_KAMEN_OKANEWO_USHINATTAMONONO_KOKORO), __ItemId(ITEM_ID_HASANSHANO_KAMEN), __ItemId(ITEM_ID_215)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HASANSHANO_KAMEN_OKANEWO_USHINATTAMONONO_KOKORO), __ItemId(ITEM_ID_HASANSHANO_KAMEN), __ItemId(ITEM_ID_1816)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1819), __ItemId(ITEM_ID_ENZINO_BOSHI), __ItemId(ITEM_ID_KIBONO_UWABAKI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1867), __ItemId(ITEM_ID_1865), __ItemId(ITEM_ID_1866)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1886), __ItemId(ITEM_ID_1884), __ItemId(ITEM_ID_1885)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1890), __ItemId(ITEM_ID_1889), __ItemId(ITEM_ID_251)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1929), __ItemId(ITEM_ID_1927), __ItemId(ITEM_ID_1928)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1973), __ItemId(ITEM_ID_1972), __CardId(CARD_ID_105)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1987), __ItemId(ITEM_ID_1992), __ItemId(ITEM_ID_1986)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1989), __ItemId(ITEM_ID_1993), __ItemId(ITEM_ID_1988)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_1991), __ItemId(ITEM_ID_1994), __ItemId(ITEM_ID_1990)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2018), __ItemId(ITEM_ID_KENSENO_OKAN), __CardId(CARD_ID_MISTILTINE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2019), __ItemId(ITEM_ID_KENSENO_OKAN), __CardId(CARD_ID_ORGE_TOOTH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2020), __ItemId(ITEM_ID_KENSENO_OKAN), __CardId(CARD_ID_EXCUTIONER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2021), __ItemId(ITEM_ID_1889), __CardId(CARD_ID_248)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2022), __ItemId(ITEM_ID_1889), __CardId(CARD_ID_248), __CardId(CARD_ID_247)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2023), __ItemId(ITEM_ID_1889), __ItemId(ITEM_ID_1041)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2024), __ItemId(ITEM_ID_1891), __ItemId(ITEM_ID_RUDRANO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2025), __ItemId(ITEM_ID_1892), __CardId(CARD_ID_234)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2026), __ItemId(ITEM_ID_1892), __CardId(CARD_ID_291)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2027), __ItemId(ITEM_ID_1892), __CardId(CARD_ID_234), __CardId(CARD_ID_291)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2028), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_399)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2029), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_318)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2030), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_377)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2031), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_257)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2032), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_300)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2033), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_278)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2034), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_246)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2035), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_227)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2036), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_269)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2037), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_242)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2038), __ItemId(ITEM_ID_1893), __CardId(CARD_ID_373)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2046), __ItemId(ITEM_ID_2039), __ItemId(ITEM_ID_2045)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2048), __ItemId(ITEM_ID_2040), __ItemId(ITEM_ID_2047)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2050), __ItemId(ITEM_ID_2041), __ItemId(ITEM_ID_2049)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2052), __ItemId(ITEM_ID_2051), __ItemId(ITEM_ID_724)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2053), __ItemId(ITEM_ID_2051), __ItemId(ITEM_ID_300)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2055), __ItemId(ITEM_ID_2054), __ItemId(ITEM_ID_724)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2056), __ItemId(ITEM_ID_2054), __ItemId(ITEM_ID_300)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI_ERIOT_CARD), __ItemId(ITEM_ID_KIKAININGYOYO_ZOFUKUSOCHI_KAI), __CardId(CARD_ID_ERIOT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2060), __ItemId(ITEM_ID_KIKAININGYOYO_KASOKUSOCHI_KAI), __CardId(CARD_ID_194)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2062), __ItemId(ITEM_ID_2061), __CardId(CARD_ID_130)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2063), __ItemId(ITEM_ID_2061), __CardId(CARD_ID_128)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2064), __ItemId(ITEM_ID_2061), __CardId(CARD_ID_131)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2065), __ItemId(ITEM_ID_2061), __CardId(CARD_ID_129)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2073), __ItemId(ITEM_ID_2069), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2074), __ItemId(ITEM_ID_2070), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2075), __ItemId(ITEM_ID_2071), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2076), __ItemId(ITEM_ID_2072), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2083), __ItemId(ITEM_ID_KIKAI_SHOKUBUTSU_BO), __ItemId(ITEM_ID_PIPE_TABACCO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2084), __ItemId(ITEM_ID_KIKAI_SHOKUBUTSU_BO), __CardId(CARD_ID_339)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2088), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_524)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2089), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_525)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2090), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_526)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2091), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_527)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2094), __ItemId(ITEM_ID_2093), __ItemId(ITEM_ID_CHIENOONO_YUBIWA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2096), __ItemId(ITEM_ID_2095), __ItemId(ITEM_ID_1000)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2098), __ItemId(ITEM_ID_610), __ItemId(ITEM_ID_2097)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2099), __ItemId(ITEM_ID_610), __ItemId(ITEM_ID_1693), __ItemId(ITEM_ID_2097)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2101), __ItemId(ITEM_ID_2100), __ItemId(ITEM_ID_843)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2103), __ItemId(ITEM_ID_2102), __ItemId(ITEM_ID_1266)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2116), __ItemId(ITEM_ID_2115), __ItemId(ITEM_ID_1822)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2117), __ItemId(ITEM_ID_2115), __ItemId(ITEM_ID_ANSATSUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2122), __ItemId(ITEM_ID_BOSS_BO), __CardId(CARD_ID_658)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2121), __ItemId(ITEM_ID_2120), __CardId(CARD_ID_658)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2126), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2128), __ItemId(ITEM_ID_647), __ItemId(ITEM_ID_2127)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2132), __ItemId(ITEM_ID_2131), __ItemId(ITEM_ID_2130)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2143), __ItemId(ITEM_ID_LIEN_SHOES), __ItemId(ITEM_ID_2203)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2144), __ItemId(ITEM_ID_FROID_SHOES), __ItemId(ITEM_ID_1425)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2145), __ItemId(ITEM_ID_SOL_SHOES), __ItemId(ITEM_ID_1443)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2146), __ItemId(ITEM_ID_CHALEUR_SHOES), __ItemId(ITEM_ID_1419)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2147), __ItemId(ITEM_ID_LEVAIN_SHOES), __ItemId(ITEM_ID_2130)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2148), __ItemId(ITEM_ID_POISON_SHOES), __ItemId(ITEM_ID_1452)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2149), __ItemId(ITEM_ID_LUMIERE_SHOES), __ItemId(ITEM_ID_1470)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2150), __ItemId(ITEM_ID_SOMBRE_SHOES), __ItemId(ITEM_ID_1435)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2151), __ItemId(ITEM_ID_ESPRIT_SHOES), __ItemId(ITEM_ID_1492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2152), __ItemId(ITEM_ID_LAMORT_SHOES), __ItemId(ITEM_ID_1391)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LIEN_SHOES_LIEN_MANT), __ItemId(ITEM_ID_LIEN_SHOES), __ItemId(ITEM_ID_2204)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FROID_SHOES_FROID_MANT), __ItemId(ITEM_ID_FROID_SHOES), __ItemId(ITEM_ID_1508)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOL_SHOES_SOL_MANT), __ItemId(ITEM_ID_SOL_SHOES), __ItemId(ITEM_ID_1514)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHALEUR_SHOES_CHALEUR_MANT), __ItemId(ITEM_ID_CHALEUR_SHOES), __ItemId(ITEM_ID_1512)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LEVAIN_SHOES_LEVAIN_MANT), __ItemId(ITEM_ID_LEVAIN_SHOES), __ItemId(ITEM_ID_2131)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_POISON_SHOES_POISON_MANT), __ItemId(ITEM_ID_POISON_SHOES), __ItemId(ITEM_ID_1518)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LUMIERE_SHOES_LUMIERE_MANT), __ItemId(ITEM_ID_LUMIERE_SHOES), __ItemId(ITEM_ID_1522)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOMBRE_SHOES_SOMBRE_MANT), __ItemId(ITEM_ID_SOMBRE_SHOES), __ItemId(ITEM_ID_1516)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ESPRIT_SHOES_ESPRIT_MANT), __ItemId(ITEM_ID_ESPRIT_SHOES), __ItemId(ITEM_ID_1510)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LAMORT_SHOES_LAMORT_MANT), __ItemId(ITEM_ID_LAMORT_SHOES), __ItemId(ITEM_ID_1520)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2164), __ItemId(ITEM_ID_2163), __CardId(CARD_ID_260)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2165), __ItemId(ITEM_ID_2163), __CardId(CARD_ID_230)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2166), __ItemId(ITEM_ID_2163), __CardId(CARD_ID_350)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2168), __ItemId(ITEM_ID_2167), __CardId(CARD_ID_39)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2171), __ItemId(ITEM_ID_DULLGER), __ItemId(ITEM_ID_2170)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2173), __ItemId(ITEM_ID_2172), __CardId(CARD_ID_169)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2174), __ItemId(ITEM_ID_2172), __CardId(CARD_ID_PITMAN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2175), __ItemId(ITEM_ID_2172), __CardId(CARD_ID_HILLWIND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2176), __ItemId(ITEM_ID_2172), __CardId(CARD_ID_RAUREL_VINDER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2177), __ItemId(ITEM_ID_2172), __CardId(CARD_ID_RED_PHEROS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2179), __ItemId(ITEM_ID_2178), __ItemId(ITEM_ID_727)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2181), __ItemId(ITEM_ID_FURUKU_PINKIRONO_ARE), __CardId(CARD_ID_74)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUKU_PINKIRONO_ARE_SANDAL), __ItemId(ITEM_ID_FURUKU_PINKIRONO_ARE), __ItemId(ITEM_ID_SANDAL), __CardId(CARD_ID_88)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2184), __ItemId(ITEM_ID_876), __ItemId(ITEM_ID_KIROI_SCARF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2184), __ItemId(ITEM_ID_894), __ItemId(ITEM_ID_KIROI_SCARF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2185), __ItemId(ITEM_ID_LONG_MACE), __ItemId(ITEM_ID_KIROI_SCARF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2189), __ItemId(ITEM_ID_TORIKAINO_YOBIKO), __ItemId(ITEM_ID_TORIKAINO_KAGITSUME)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2190), __ItemId(ITEM_ID_TORIKAINO_YOBIKO), __ItemId(ITEM_ID_TORIKAINO_YUMIKAKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TORIKAINO_KAGITSUME_TORIKAINO_YUMIKAKE), __ItemId(ITEM_ID_TORIKAINO_KAGITSUME), __ItemId(ITEM_ID_TORIKAINO_YUMIKAKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2192), __ItemId(ITEM_ID_TORIKAINO_YOBIKO), __ItemId(ITEM_ID_TORIKAINO_KAGITSUME), __ItemId(ITEM_ID_TORIKAINO_YUMIKAKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2199), __ItemId(ITEM_ID_2197), __ItemId(ITEM_ID_2198)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2205), __ItemId(ITEM_ID_2204), __ItemId(ITEM_ID_2203)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2207), __ItemId(ITEM_ID_2206), __CardId(CARD_ID_354)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2208), __ItemId(ITEM_ID_2206), __CardId(CARD_ID_270)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2209), __ItemId(ITEM_ID_2206), __CardId(CARD_ID_104)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2210), __ItemId(ITEM_ID_2206), __CardId(CARD_ID_216)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2225), __ItemId(ITEM_ID_2223), __ItemId(ITEM_ID_2227), __ItemId(ITEM_ID_2229)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2225), __ItemId(ITEM_ID_2224), __ItemId(ITEM_ID_2228), __ItemId(ITEM_ID_2230)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2223), __CardId(CARD_ID_128)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2223), __CardId(CARD_ID_129)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2223), __CardId(CARD_ID_130)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2223), __CardId(CARD_ID_131)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2224), __CardId(CARD_ID_128)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2224), __CardId(CARD_ID_129)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2224), __CardId(CARD_ID_130)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2226), __ItemId(ITEM_ID_2224), __CardId(CARD_ID_131)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PLATINUM_RING_WEDDING_GOODS), __ItemId(ITEM_ID_PLATINUM_RING), __ItemId(ITEM_ID_144), __ItemId(ITEM_ID_280), __ItemId(ITEM_ID_318)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_224)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_193)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_281)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_301)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_181)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_317)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_TATENASHINO_YOROI_REFINE), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_220)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2236), __ItemId(ITEM_ID_2234), __CardId(CARD_ID_190)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TATENASHINO_YOROI_CORNUTUS), __ItemId(ITEM_ID_TATENASHINO_YOROI), __CardId(CARD_ID_132)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TATENASHINO_YOROI_RSX_0806), __ItemId(ITEM_ID_TATENASHINO_YOROI), __CardId(CARD_ID_RSX_0806)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TATENASHINO_YOROI_TATENASHINO_KABUTO), __ItemId(ITEM_ID_TATENASHINO_YOROI), __ItemId(ITEM_ID_1943)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MEDICAL_BOOTS_KAIFUKUNO_HIKARI), __ItemId(ITEM_ID_MEDICAL_BOOTS), __ItemId(ITEM_ID_KAIFUKUNO_HIKARI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2246), __ItemId(ITEM_ID_MEDICAL_BOOTS), __ItemId(ITEM_ID_1359)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2248), __ItemId(ITEM_ID_ANTIMAGIC_SUIT), __ItemId(ITEM_ID_2255)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2249), __ItemId(ITEM_ID_ANTIMAGIC_SUIT), __ItemId(ITEM_ID_2256)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2249), __ItemId(ITEM_ID_2250), __ItemId(ITEM_ID_2255)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2251), __ItemId(ITEM_ID_2250), __ItemId(ITEM_ID_2256)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2254), __ItemId(ITEM_ID_640), __ItemId(ITEM_ID_2253)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PROTECT_FEATHER_HANENO_BERET), __ItemId(ITEM_ID_669), __ItemId(ITEM_ID_PROTECT_FEATHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_ATAMANOSE_FIRIL), __ItemId(ITEM_ID_886), __ItemId(ITEM_ID_FUYUSURU_KENZYONO_ISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_AMISTRL_CAP), __ItemId(ITEM_ID_1270), __ItemId(ITEM_ID_FUYUSURU_KENZYONO_ISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_TARE_LEAF), __ItemId(ITEM_ID_TARE_LEAF), __ItemId(ITEM_ID_FUYUSURU_KENZYONO_ISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUYUSURU_KENZYONO_ISHI_BANIRMIRT_BO), __ItemId(ITEM_ID_758), __ItemId(ITEM_ID_FUYUSURU_KENZYONO_ISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2288), __ItemId(ITEM_ID_1630), __ItemId(ITEM_ID_2287)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2290), __ItemId(ITEM_ID_ZYOO_SUCARABANO_KABUTO), __CardId(CARD_ID_632), __CardId(CARD_ID_633)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2291), __ItemId(ITEM_ID_ZYOO_SUCARABANO_KABUTO), __CardId(CARD_ID_ZYOO_SUCARAB)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2292), __ItemId(ITEM_ID_ZYOO_SUCARABANO_KABUTO), __CardId(CARD_ID_ZYOTE_SUCARAB)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2294), __ItemId(ITEM_ID_695), __ItemId(ITEM_ID_2293)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2295), __ItemId(ITEM_ID_2293), __ItemId(ITEM_ID_733)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2310), __ItemId(ITEM_ID_SANSO_BOMBE), __CardId(CARD_ID_SAMAYOU_MONO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2298), __ItemId(ITEM_ID_SANSO_BOMBE), __CardId(CARD_ID_340)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2299), __ItemId(ITEM_ID_SANSO_BOMBE), __CardId(CARD_ID_346)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HOSHITAMAGO_BADGE_ACADEMY_BADGE), __ItemId(ITEM_ID_HOSHITAMAGO_BADGE), __ItemId(ITEM_ID_ACADEMY_BADGE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2319), __ItemId(ITEM_ID_HOSHITAMAGO_BADGE), __ItemId(ITEM_ID_ACADEMY_SHINNYUSE_BOSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2319), __ItemId(ITEM_ID_HOSHITAMAGO_BADGE), __ItemId(ITEM_ID_ACADEMY_DAIICHISHURYO_BOSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2320), __ItemId(ITEM_ID_HOSHITAMAGO_BADGE), __ItemId(ITEM_ID_ACADEMY_BADGE), __ItemId(ITEM_ID_ACADEMY_SHINNYUSE_BOSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2320), __ItemId(ITEM_ID_HOSHITAMAGO_BADGE), __ItemId(ITEM_ID_ACADEMY_BADGE), __ItemId(ITEM_ID_ACADEMY_DAIICHISHURYO_BOSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2323), __ItemId(ITEM_ID_LAFINE_STUFF), __ItemId(ITEM_ID_LAFINE_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2328), __ItemId(ITEM_ID_2324), __ItemId(ITEM_ID_429)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2329), __ItemId(ITEM_ID_2325), __ItemId(ITEM_ID_427)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2330), __ItemId(ITEM_ID_2326), __ItemId(ITEM_ID_428)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2331), __ItemId(ITEM_ID_2327), __ItemId(ITEM_ID_430)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2328), __ItemId(ITEM_ID_2324), __ItemId(ITEM_ID_605)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2329), __ItemId(ITEM_ID_2325), __ItemId(ITEM_ID_603)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2330), __ItemId(ITEM_ID_2326), __ItemId(ITEM_ID_604)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2331), __ItemId(ITEM_ID_2327), __ItemId(ITEM_ID_606)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2333), __ItemId(ITEM_ID_MOERU_YUMI), __ItemId(ITEM_ID_2332)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2333), __ItemId(ITEM_ID_HYOTENNO_YUMI), __ItemId(ITEM_ID_2332)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2333), __ItemId(ITEM_ID_DAICHINO_YUMI), __ItemId(ITEM_ID_2332)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2333), __ItemId(ITEM_ID_HAYATENO_YUMI), __ItemId(ITEM_ID_2332)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2335), __ItemId(ITEM_ID_GIGANT_AXE), __ItemId(ITEM_ID_GIGANT_HELM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2336), __ItemId(ITEM_ID_GIGANT_SHIELD), __ItemId(ITEM_ID_GIGANT_HELM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GIGANT_RANCE_GIGANT_HELM), __ItemId(ITEM_ID_GIGANT_LANCE), __ItemId(ITEM_ID_GIGANT_HELM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2339), __ItemId(ITEM_ID_SURVIVAL_ROD_DEX_S1), __ItemId(ITEM_ID_SURVIVAL_CIRCLET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2339), __ItemId(ITEM_ID_SURVIVAL_ROD_INT_S1), __ItemId(ITEM_ID_SURVIVAL_CIRCLET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2341), __ItemId(ITEM_ID_ZYARYUNO_YOROI), __ItemId(ITEM_ID_RIDEWORD_BO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2342), __ItemId(ITEM_ID_ZYARYUNO_YOROI), __ItemId(ITEM_ID_VANARGANDNO_KABUTO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2343), __ItemId(ITEM_ID_ZYARYUNO_YOROI), __ItemId(ITEM_ID_SKIN_OF_SHADOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2346), __ItemId(ITEM_ID_2344), __ItemId(ITEM_ID_2345)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2348), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_2347)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2350), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_2349)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2352), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_2351)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2354), __ItemId(ITEM_ID_2087), __ItemId(ITEM_ID_2353)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2356), __ItemId(ITEM_ID_2355), __ItemId(ITEM_ID_MOERU_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2357), __ItemId(ITEM_ID_2355), __ItemId(ITEM_ID_HYOTENNO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2358), __ItemId(ITEM_ID_2355), __ItemId(ITEM_ID_DAICHINO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2359), __ItemId(ITEM_ID_2355), __ItemId(ITEM_ID_HAYATENO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2372), __ItemId(ITEM_ID_2371), __ItemId(ITEM_ID_2377)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2372), __ItemId(ITEM_ID_2374), __ItemId(ITEM_ID_2378)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2381), __ItemId(ITEM_ID_2379), __ItemId(ITEM_ID_2380)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2397), __ItemId(ITEM_ID_RAKUENNO_TORIKAGO), __CardId(CARD_ID_274)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_RAKUENNO_TORIKAGO_EXSIONNO_HANE), __ItemId(ITEM_ID_EXSIONNO_HANE), __ItemId(ITEM_ID_RAKUENNO_TORIKAGO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2401), __ItemId(ITEM_ID_2400), __CardId(CARD_ID_376)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2406), __ItemId(ITEM_ID_1331), __ItemId(ITEM_ID_2405)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2408), __ItemId(ITEM_ID_2407), __CardId(CARD_ID_347)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2409), __ItemId(ITEM_ID_2407), __CardId(CARD_ID_RIDEWORD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2410), __ItemId(ITEM_ID_2407), __CardId(CARD_ID_376)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUISENO_AKAIKUTSU_MORDEN_CARD), __ItemId(ITEM_ID_2407), __CardId(CARD_ID_175)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2415), __ItemId(ITEM_ID_2414), __CardId(CARD_ID_737)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_263)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_265)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_296)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_319)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_329)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_343)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_345)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_355)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_359)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SANDAL_DRAINCARD), __ItemId(ITEM_ID_FURUBITA_SANDAL), __CardId(CARD_ID_360)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2441), __ItemId(ITEM_ID_217), __ItemId(ITEM_ID_APPLAUSE_SANDAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2441), __ItemId(ITEM_ID_608), __ItemId(ITEM_ID_APPLAUSE_SANDAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2442), __ItemId(ITEM_ID_220), __ItemId(ITEM_ID_APPLAUSE_SANDAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2442), __ItemId(ITEM_ID_609), __ItemId(ITEM_ID_APPLAUSE_SANDAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2443), __ItemId(ITEM_ID_APPLAUSE_SANDAL), __CardId(CARD_ID_AMON_RA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIGHLEVEL_ZYUKIHE), __CardId(CARD_ID_ZYUKIHE), __CardId(CARD_ID_ENCHANT_HILEVEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIGHLEVEL_KUMIHO), __CardId(CARD_ID_KUMIHO), __CardId(CARD_ID_ENCHANT_HILEVEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIGHLEVEL_ORCBABY), __CardId(CARD_ID_ORC_BABY), __CardId(CARD_ID_ENCHANT_HILEVEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIGHLEVEL_STING), __CardId(CARD_ID_STING), __CardId(CARD_ID_ENCHANT_HILEVEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIGHLEVEL_APOCALYPSE), __CardId(CARD_ID_APOCALYPSE), __CardId(CARD_ID_ENCHANT_HILEVEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2459), __ItemId(ITEM_ID_2458), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2461), __ItemId(ITEM_ID_2460), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2465), __ItemId(ITEM_ID_EXELION_SUIT), __ItemId(ITEM_ID_EXELION_WING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2466), __CardId(CARD_ID_ENCHANT_E_FIRE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2467), __CardId(CARD_ID_ENCHANT_E_WATER), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2468), __CardId(CARD_ID_ENCHANT_E_GROUND), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2469), __CardId(CARD_ID_ENCHANT_E_WIND), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2470), __CardId(CARD_ID_ENCHANT_R_FIRE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2471), __CardId(CARD_ID_ENCHANT_R_WATER), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2472), __CardId(CARD_ID_ENCHANT_R_GROUND), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2473), __CardId(CARD_ID_ENCHANT_R_WIND), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2474), __CardId(CARD_ID_ENCHANT_C_LIFE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2475), __CardId(CARD_ID_ENCHANT_C_SOUL), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2476), __CardId(CARD_ID_ENCHANT_C_HPR), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2477), __CardId(CARD_ID_ENCHANT_C_SPR), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2478), __CardId(CARD_ID_ENCHANT_A_STR), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2479), __CardId(CARD_ID_ENCHANT_A_INT), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2480), __CardId(CARD_ID_ENCHANT_A_DEF), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2481), __CardId(CARD_ID_ENCHANT_A_AVOID), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2482), __CardId(CARD_ID_ENCHANT_A_ATK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2483), __CardId(CARD_ID_ENCHANT_A_MATK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2484), __CardId(CARD_ID_ENCHANT_A_MAXHP), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2485), __CardId(CARD_ID_ENCHANT_A_MAXSP), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2486), __CardId(CARD_ID_ENCHANT_A_FROZEN), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2487), __CardId(CARD_ID_ENCHANT_A_ASPD), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GURENNO_STOLE_NOROWARETA_ROYAL_KNIGHT), __ItemId(ITEM_ID_GURENNO_STOLE), __CardId(CARD_ID_734)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2493), __ItemId(ITEM_ID_1341), __ItemId(ITEM_ID_2492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2494), __ItemId(ITEM_ID_1348), __ItemId(ITEM_ID_2492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_IMPERIARL_RING_IMPERIAL_FEATHER), __ItemId(ITEM_ID_IMPERIAL_FEATHER), __ItemId(ITEM_ID_2492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2496), __ItemId(ITEM_ID_1341), __ItemId(ITEM_ID_1348), __ItemId(ITEM_ID_IMPERIAL_FEATHER), __ItemId(ITEM_ID_2492)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2500), __ItemId(ITEM_ID_CARDYUINO_MIMI), __CardId(CARD_ID_TENDORIRURION)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD), __ItemId(ITEM_ID_CARDYUINO_MIMI), __ItemId(ITEM_ID_LAFINE_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD_HIBAM), __ItemId(ITEM_ID_CARDYUINO_MIMI), __ItemId(ITEM_ID_LAFINE_SHIELD), __CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD_HIBAM), __ItemId(ITEM_ID_CARDYUINO_MIMI), __ItemId(ITEM_ID_LAFINE_SHIELD), __CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_MIMI_RAFINE_SHIELD_HIBAM), __ItemId(ITEM_ID_CARDYUINO_MIMI), __ItemId(ITEM_ID_LAFINE_SHIELD), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2508), __ItemId(ITEM_ID_2504), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2509), __ItemId(ITEM_ID_2505), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2510), __ItemId(ITEM_ID_2506), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2511), __ItemId(ITEM_ID_2507), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2514), __ItemId(ITEM_ID_SORATOBU_GARAPAGO), __CardId(CARD_ID_262)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2515), __ItemId(ITEM_ID_SORATOBU_GARAPAGO), __CardId(CARD_ID_GRIFFIN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2516), __ItemId(ITEM_ID_SORATOBU_GARAPAGO), __CardId(CARD_ID_79)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2517), __ItemId(ITEM_ID_SORATOBU_GARAPAGO), __CardId(CARD_ID_621)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2518), __ItemId(ITEM_ID_SORATOBU_GARAPAGO), __ItemId(ITEM_ID_TORIKAINO_KAGITSUME)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2520), __ItemId(ITEM_ID_SEISHOKUSHANO_KANGOBO), __ItemId(ITEM_ID_CROCE_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_SARANO_ROBE), __ItemId(ITEM_ID_SARANO_ROBE), __ItemId(ITEM_ID_HEAL_PIERCED), __ItemId(ITEM_ID_TELEPORT_PIERCED)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAL_PIERCED_TELEPORT_PIERCED_KAKUSEI_ROBE), __ItemId(ITEM_ID_KAKUSEI_ROBE), __ItemId(ITEM_ID_HEAL_PIERCED), __ItemId(ITEM_ID_TELEPORT_PIERCED)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2530), __ItemId(ITEM_ID_KAKUSEI_ROBE), __CardId(CARD_ID_BARSLY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_BROOCH), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_PEORTH_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_PLATE), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_PEORTH_PLATE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_MANT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_PEORTH_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_GREEVE), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_PEORTH_GREEVE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_PEORTH_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_PEORTH_PLATE), __ItemId(ITEM_ID_PEORTH_MANT), __ItemId(ITEM_ID_PEORTH_GREEVE), __ItemId(ITEM_ID_PEORTH_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2540), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_KUROHANO_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2541), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_KUROHANO_SUIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2542), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_KUROHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2543), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_KUROHANO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2544), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_KUROHANO_SUIT), __ItemId(ITEM_ID_KUROHANO_MANT), __ItemId(ITEM_ID_KUROHANO_BOOTS), __ItemId(ITEM_ID_KUROHANO_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2545), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1554)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2546), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1552)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2547), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1548)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2547), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1550)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2548), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1553)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_CRYMSON_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1548), __ItemId(ITEM_ID_1552), __ItemId(ITEM_ID_1553), __ItemId(ITEM_ID_1554)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_CRYMSON_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1550), __ItemId(ITEM_ID_1552), __ItemId(ITEM_ID_1553), __ItemId(ITEM_ID_1554)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2550), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1547)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2551), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1545)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2552), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1541)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2552), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1543)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2553), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1546)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_AQUA_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1541), __ItemId(ITEM_ID_1545), __ItemId(ITEM_ID_1546), __ItemId(ITEM_ID_1547)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_AQUA_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1543), __ItemId(ITEM_ID_1545), __ItemId(ITEM_ID_1546), __ItemId(ITEM_ID_1547)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2555), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1540)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2556), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1538)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2557), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1534)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2557), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1536)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2558), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1539)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_GOLDENROD_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1534), __ItemId(ITEM_ID_1538), __ItemId(ITEM_ID_1539), __ItemId(ITEM_ID_1540)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_GOLDENROD_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1536), __ItemId(ITEM_ID_1538), __ItemId(ITEM_ID_1539), __ItemId(ITEM_ID_1540)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2560), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1561)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2561), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1559)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2562), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1555)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2562), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1557)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2563), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1560)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_FOREST_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1555), __ItemId(ITEM_ID_1559), __ItemId(ITEM_ID_1560), __ItemId(ITEM_ID_1561)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_FOREST_ARTIFACT), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_1557), __ItemId(ITEM_ID_1559), __ItemId(ITEM_ID_1560), __ItemId(ITEM_ID_1561)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2565), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_NABUNO_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_CLOTH), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_NABUNO_CLOTH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ULTIMATE_MODE_CHANGER_NABUNO_HOOD), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_NABUNO_HOOD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2568), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_NABUNO_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_2569), __ItemId(ITEM_ID_ULTIMATE_MODE_CHANGER), __ItemId(ITEM_ID_NABUNO_CLOTH), __ItemId(ITEM_ID_NABUNO_HOOD), __ItemId(ITEM_ID_NABUNO_SHOES), __ItemId(ITEM_ID_NABUNO_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_REQUIEM_SUIT), __ItemId(ITEM_ID_REQUIEM_SUIT), __ItemId(ITEM_ID_REQUIEM_MANT), __ItemId(ITEM_ID_REQUIEM_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_REQUIEM_ROBE), __ItemId(ITEM_ID_REQUIEM_ROBE), __ItemId(ITEM_ID_REQUIEM_MANT), __ItemId(ITEM_ID_REQUIEM_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_BONECIRCRET_MANT), __ItemId(ITEM_ID_FURUBITA_BONECIRCRET), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_BALLERINA_MANT), __ItemId(ITEM_ID_FURUBITA_BALLERINA), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_BLAZINGSOUL_MANT), __ItemId(ITEM_ID_FURUBITA_BLAZINGSOUL), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_KAZENO_SASAYAKI_MANT), __ItemId(ITEM_ID_FURUBITA_KAZENO_SASAYAKI), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_MARYOKUSEKI_MANT), __ItemId(ITEM_ID_FURUBITA_MARYOKUSEKI), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_MIDASS_MANT), __ItemId(ITEM_ID_FURUBITA_MIDASS), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_MINSTRELSONG_MANT), __ItemId(ITEM_ID_FURUBITA_MINSTRELSONG), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SHADOWCROWN_MANT), __ItemId(ITEM_ID_FURUBITA_SHADOWCROWN), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_DRIVERBAND_MANT), __ItemId(ITEM_ID_FURUBITA_DRIVERBAND_KIRO), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_DRIVERBAND_MANT), __ItemId(ITEM_ID_FURUBITA_DRIVERBAND_AKA), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_MITRA_MANT), __ItemId(ITEM_ID_FURUBITA_MITRA), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_RUNECIRCRET_MANT), __ItemId(ITEM_ID_FURUBITA_RUNECIRCRET), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_MEISAIUSAGI_MANT), __ItemId(ITEM_ID_FURUBITA_MEISAIUSAGI), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_SHUGONOKANNMURI_MANT), __ItemId(ITEM_ID_FURUBITA_SHUGONOKANNMURI), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TENGUNO_MAKIMONO_KARASUTENGU), __ItemId(ITEM_ID_TENGUNO_MAKIMONO), __ItemId(ITEM_ID_2395)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ESLANNO_SHIRT_BRIEF), __ItemId(ITEM_ID_ESLANNO_SHIRT), __ItemId(ITEM_ID_288)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ESLANNO_SHIRT_DEVILRING), __ItemId(ITEM_ID_ESLANNO_SHIRT), __CardId(CARD_ID_DEVILRING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENSONO_TOWEL_MOERU_YUMI), __ItemId(ITEM_ID_GENSONO_TOWEL), __ItemId(ITEM_ID_MOERU_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENSONO_TOWEL_HYOTENNO_YUMI), __ItemId(ITEM_ID_GENSONO_TOWEL), __ItemId(ITEM_ID_HYOTENNO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENSONO_TOWEL_DAICHINO_YUMI), __ItemId(ITEM_ID_GENSONO_TOWEL), __ItemId(ITEM_ID_DAICHINO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENSONO_TOWEL_HAYATENO_YUMI), __ItemId(ITEM_ID_GENSONO_TOWEL), __ItemId(ITEM_ID_HAYATENO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_A_TOLERANCE), __CardId(CARD_ID_ENCHANT_A_TOLERANCE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_A_HIT), __CardId(CARD_ID_ENCHANT_A_HIT), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_A_FLEE), __CardId(CARD_ID_ENCHANT_A_FLEE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_A_MDEF), __CardId(CARD_ID_ENCHANT_A_MDEF), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_ATK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_MATK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_AVOID), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_MAXHP), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_QUICK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_S_ATK), __CardId(CARD_ID_ENCHANT_S_CRI), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ROSARIONO_KUBIKAZARI_CROCE_STUFF), __ItemId(ITEM_ID_CROCE_STUFF), __ItemId(ITEM_ID_ROSARIONO_KUBIKAZARI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ROSARIONO_KUBIKAZARI_SEISHOKUSHANO_KANGOBO), __ItemId(ITEM_ID_SEISHOKUSHANO_KANGOBO), __ItemId(ITEM_ID_ROSARIONO_KUBIKAZARI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_CHOSISAINO_YUBIWA_DAISHIKYO_1), __ItemId(ITEM_ID_CHOSISAINO_YUBIWA), __CardId(CARD_ID_ENCHANT_DAISHIKYO_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_CHOSISAINO_YUBIWA_DAISHIKYO_2), __ItemId(ITEM_ID_CHOSISAINO_YUBIWA), __CardId(CARD_ID_ENCHANT_DAISHIKYO_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_CHOSISAINO_YUBIWA_DAISEIDO_1), __ItemId(ITEM_ID_CHOSISAINO_YUBIWA), __CardId(CARD_ID_ENCHANT_DAISEIDO_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_CHOSISAINO_YUBIWA_CHIYU_1), __ItemId(ITEM_ID_CHOSISAINO_YUBIWA), __CardId(CARD_ID_ENCHANT_CHIYU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_POROROCA_SHOES_LACRYMA_STICK), __ItemId(ITEM_ID_LACRYMA_STICK), __ItemId(ITEM_ID_POROROCA_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_HOI_ANGELRING), __CardId(CARD_ID_ANGELRING), __ItemId(ITEM_ID_CARDYUINO_HOI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARDYUINO_HOI_LAFINE_STUFF), __ItemId(ITEM_ID_LAFINE_STUFF), __ItemId(ITEM_ID_CARDYUINO_HOI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AOKI_YAKOSEKI_SENEI_1), __ItemId(ITEM_ID_AOKI_YAKOSEKI), __CardId(CARD_ID_ENCHANT_SENEI_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AOKI_YAKOSEKI_SENEI_2), __ItemId(ITEM_ID_AOKI_YAKOSEKI), __CardId(CARD_ID_ENCHANT_SENEI_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_WAKUWAKU_MANT_WAKUWAKU), __ItemId(ITEM_ID_WAKUWAKU_MANT), __CardId(CARD_ID_WAKUWAKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KENTOSHINO_GLOVE_TOSHI_1), __ItemId(ITEM_ID_KENTOSHINO_GLOVE), __CardId(CARD_ID_ENCHANT_TOSHI_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KENTOSHINO_GLOVE_TOSHI_2), __ItemId(ITEM_ID_KENTOSHINO_GLOVE), __CardId(CARD_ID_ENCHANT_TOSHI_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GLORIOUS_EARRING_GLORIOUS_BROACH), __ItemId(ITEM_ID_GLORIOUS_EARRING), __ItemId(ITEM_ID_GLORIOUS_BROACH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_IMUKENO_OSODE_HORN_CARD), __ItemId(ITEM_ID_IMUKENO_OSODE), __CardId(CARD_ID_HORN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ENERGY_SHUGORYU_ZYARYUNO_YOROI), __ItemId(ITEM_ID_ZYARYUNO_YOROI), __CardId(CARD_ID_ENCHANT_ENERGY_SHUGORYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_POWERED_SET), __ItemId(ITEM_ID_POWERED_ARM), __ItemId(ITEM_ID_POWERED_MAIL), __ItemId(ITEM_ID_POWERED_TANK), __ItemId(ITEM_ID_POWERED_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_SET), __ItemId(ITEM_ID_GUARDIAN_BARREL), __ItemId(ITEM_ID_GUARDIAN_UNIT), __ItemId(ITEM_ID_GUARDIAN_ENGINE), __ItemId(ITEM_ID_GUARDIAN_BOOSTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANOIKARI_ORCISH_AXE_ORCISH_SWORD), __CardId(CARD_ID_ENCHANT_YUSHANO_IKARI), __ItemId(ITEM_ID_ORCISH_SWORD), __ItemId(ITEM_ID_ORCISH_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAHITSUZINO_HOKO_CRESCENT_CIZER), __CardId(CARD_ID_ENCHANT_MAHITSUZINO_HOKO), __ItemId(ITEM_ID_CRESCENT_CIZER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG), __CardId(CARD_ID_ENCHANT_MAHITSUZINO_HOKO), __ItemId(ITEM_ID_TEGRYONG)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAHITSUZINO_HOKO_TEGRYONG_S2), __CardId(CARD_ID_ENCHANT_MAHITSUZINO_HOKO), __ItemId(ITEM_ID_TEGRYONG_S2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BIO_PROTECTOR_PIPE_TABACCO), __ItemId(ITEM_ID_BIO_PROTECTOR), __ItemId(ITEM_ID_PIPE_TABACCO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BIO_PROTECTOR_KIKAI_SHOKUBUTSU_BO), __ItemId(ITEM_ID_BIO_PROTECTOR), __ItemId(ITEM_ID_KIKAI_SHOKUBUTSU_BO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BIO_PROTECTOR_KIKAI_SHOKUBUTSU_BO_PIPE_TABACCO), __ItemId(ITEM_ID_BIO_PROTECTOR), __ItemId(ITEM_ID_KIKAI_SHOKUBUTSU_BO), __ItemId(ITEM_ID_PIPE_TABACCO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LOLANO_KUSARITEKKYU_CHINURARETA_TEKKYU), __ItemId(ITEM_ID_LOLANO_KUSARITEKKYU), __ItemId(ITEM_ID_CHINURARETA_TEKKYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIKOWO_TATAESHI_OKEN_HAMETSUWO_MATOISHI_GOKEN), __ItemId(ITEM_ID_EIKOWO_TATAESHI_OKEN), __ItemId(ITEM_ID_HAMETSUWO_MATOISHI_GOKEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_RAKUENNO_TORIKAGO_EXSIONNO_HANE_S2), __ItemId(ITEM_ID_EXSIONNO_HANE_S2), __ItemId(ITEM_ID_RAKUENNO_TORIKAGO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_ROD_DEX_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_ROD_INT_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_CIRCLET), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_CIRCLET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_DEX_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_ROD_DEX_S1), __ItemId(ITEM_ID_SURVIVAL_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_ORB_SURVIVAL_ROD_INT_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_ROD_INT_S1), __ItemId(ITEM_ID_SURVIVAL_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_AXE), __ItemId(ITEM_ID_GIGANT_BOOTS), __ItemId(ITEM_ID_GIGANT_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_BOW), __ItemId(ITEM_ID_GIGANT_BOOTS), __ItemId(ITEM_ID_GIGANT_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_LANCE), __ItemId(ITEM_ID_GIGANT_BOOTS), __ItemId(ITEM_ID_GIGANT_LANCE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GIGANT_BOOTS_GIGANT_SHIELD), __ItemId(ITEM_ID_GIGANT_BOOTS), __ItemId(ITEM_ID_GIGANT_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYU_MANT_DEVILRING_CARD), __ItemId(ITEM_ID_EIYU_MANT), __CardId(CARD_ID_DEVILRING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HIKOSEN_SUIT_HIKOSEN_MANT_HIKOSEN_BOOTS), __ItemId(ITEM_ID_HIKOSEN_SUIT), __ItemId(ITEM_ID_HIKOSEN_MANT), __ItemId(ITEM_ID_HIKOSEN_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PELLROCKNO_SUIT_PELLROCKNO_MANT_PELLROCKNO_BOOTS), __ItemId(ITEM_ID_PELLROCKNO_SUIT), __ItemId(ITEM_ID_PELLROCKNO_MANT), __ItemId(ITEM_ID_PELLROCKNO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PELLROCKNO_BOSHI_HIKOSEN_SET), __ItemId(ITEM_ID_PELLROCKNO_BOSHI), __ItemId(ITEM_ID_HIKOSEN_SUIT), __ItemId(ITEM_ID_HIKOSEN_MANT), __ItemId(ITEM_ID_HIKOSEN_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PELLROCKNO_BOSHI_PELLROCKNO_SET), __ItemId(ITEM_ID_PELLROCKNO_BOSHI), __ItemId(ITEM_ID_PELLROCKNO_SUIT), __ItemId(ITEM_ID_PELLROCKNO_MANT), __ItemId(ITEM_ID_PELLROCKNO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAIN_BO_CHIENOONO_YUBIWA), __ItemId(ITEM_ID_RAIN_BO), __ItemId(ITEM_ID_CHIENOONO_YUBIWA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAIN_BO_PITMAN_CARD), __ItemId(ITEM_ID_RAIN_BO), __CardId(CARD_ID_PITMAN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAIN_BO_HILLWIND_CARD), __ItemId(ITEM_ID_RAIN_BO), __CardId(CARD_ID_HILLWIND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAIN_BO_RAUREL_VINDER_CARD), __ItemId(ITEM_ID_RAIN_BO), __CardId(CARD_ID_RAUREL_VINDER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAIN_BO_RED_PHEROS_CARD), __ItemId(ITEM_ID_RAIN_BO), __CardId(CARD_ID_RED_PHEROS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SABAKINO_KUTSU_HOLY_STICK), __ItemId(ITEM_ID_SABAKINO_KUTSU), __ItemId(ITEM_ID_HOLY_STICK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DAISHINKANNO_TEBUKURO_MARYOKU_1), __ItemId(ITEM_ID_DAISHINKANNO_TEBUKURO), __CardId(CARD_ID_ENCHANT_MARYOKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DAISHINKANNO_TEBUKURO_MARYOKU_2), __ItemId(ITEM_ID_DAISHINKANNO_TEBUKURO), __CardId(CARD_ID_ENCHANT_MARYOKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIZUMIZUSHI_DAIDAI_DAIDAI_BO), __ItemId(ITEM_ID_MIZUMIZUSHI_DAIDAI), __ItemId(ITEM_ID_DAIDAIBO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZYUNO_MAIL_MAZYUNO_MANT_MAZYUNO_BOOTS), __ItemId(ITEM_ID_MAZYUNO_MAIL), __ItemId(ITEM_ID_MAZYUNO_MANT), __ItemId(ITEM_ID_MAZYUNO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLEAFNO_GIRIKO_MEIKYU_1), __ItemId(ITEM_ID_FAIRLEAFNO_GIRIKO), __CardId(CARD_ID_ENCHANT_MEIKYU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLEAFNO_GIRIKO_MEIKYU_2), __ItemId(ITEM_ID_FAIRLEAFNO_GIRIKO), __CardId(CARD_ID_ENCHANT_MEIKYU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINHEBINO_KAWA_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_KYOZINHEBINO_KAWA), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUTTOSURU_KONTONNO_TATE_KAGAYAKU_HENSHIKAKUTAMENTAI), __ItemId(ITEM_ID_FUTTOSURU_KONTONNO_TATE), __ItemId(ITEM_ID_KAGAYAKU_HENSHIKAKUTAMENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINMA_BAPHOMETNO_TSUNO_BLOODY_CROSS), __ItemId(ITEM_ID_SHINMA_BAPHOMETNO_TSUNO), __ItemId(ITEM_ID_BLOODY_CROSS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MATAGINO_KENNATA_EIRI_1), __ItemId(ITEM_ID_MATAGINO_KENNATA), __CardId(CARD_ID_ENCHANT_EIRI_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MATAGINO_KENNATA_EIRI_2), __ItemId(ITEM_ID_MATAGINO_KENNATA), __CardId(CARD_ID_ENCHANT_EIRI_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EINHERJERNO_YOROI_EVIL_DRUID_CARD), __ItemId(ITEM_ID_EINHERJERNO_YOROI), __CardId(CARD_ID_EVIL_DRUID)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EINHERJERNO_YOROI_SEINSHISHANO_MANT), __ItemId(ITEM_ID_EINHERJERNO_YOROI), __ItemId(ITEM_ID_SENSHISHANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_PROCESSOR_PILEBUNKER), __ItemId(ITEM_ID_GUARDIAN_PROCESSOR), __ItemId(ITEM_ID_PILEBUNKER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_UNIT), __ItemId(ITEM_ID_GUARDIAN_PROCESSOR), __ItemId(ITEM_ID_GUARDIAN_UNIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_ENGINE), __ItemId(ITEM_ID_GUARDIAN_PROCESSOR), __ItemId(ITEM_ID_GUARDIAN_ENGINE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BOOSTER), __ItemId(ITEM_ID_GUARDIAN_PROCESSOR), __ItemId(ITEM_ID_GUARDIAN_BOOSTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GUARDIAN_PROCESSOR_GUARDIAN_BARREL), __ItemId(ITEM_ID_GUARDIAN_PROCESSOR), __ItemId(ITEM_ID_GUARDIAN_BARREL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ELDERNO_MITAMA_KISONSARETA_KOSHO_CARD), __ItemId(ITEM_ID_ELDERNO_MITAMA), __CardId(CARD_ID_KISONSARETA_KOSHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKIMAZYUTSUSHINO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_ROBE), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_NYDHOGNO_KAGE_CARD), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __CardId(CARD_ID_NYDHOGNO_KAGE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHOETSUSHANO_ROBE_ZIKU_BOOTS), __ItemId(ITEM_ID_CHOETSUSHANO_ROBE), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI), __ItemId(ITEM_ID_KONGOSEKINO_TATE), __ItemId(ITEM_ID_EIKONO_AKASHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KIRINNO_TSUNO_KOGEKISOKUDO_1), __ItemId(ITEM_ID_KIRINNO_TSUNO), __CardId(CARD_ID_ENCHANT_KOGEKISOKUDO_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KIRINNO_TSUNO_KOGEKISOKUDO_2), __ItemId(ITEM_ID_KIRINNO_TSUNO), __CardId(CARD_ID_ENCHANT_KOGEKISOKUDO_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BOTONO_SCARF_GLASS), __ItemId(ITEM_ID_BOTONO_SCARF), __ItemId(ITEM_ID_GLASS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BOTONO_SCARF_SUNGLASS), __ItemId(ITEM_ID_BOTONO_SCARF), __ItemId(ITEM_ID_SUNGLASS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VIRGO_CROWN_VIRGO), __ItemId(ITEM_ID_VIRGO_CROWN), __CardId(CARD_ID_VIRGO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LEO_DIADEM_LEO), __ItemId(ITEM_ID_LEO_DIADEM), __CardId(CARD_ID_LEO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA), __ItemId(ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU), __CardId(CARD_ID_WORUYAFA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OSUWARI_KYOKO_SHIFUKU_NEKKYOSHINTONO_NECKLACE), __ItemId(ITEM_ID_OSUWARI_KYOKO_SHIFUKU), __ItemId(ITEM_ID_NEKKYOSHINTONO_NECKLACE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OSUWARI_KYOKO_SHIFUKU_KIEL_D01), __ItemId(ITEM_ID_OSUWARI_KYOKO_SHIFUKU), __CardId(CARD_ID_KIEL_D01)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI), __ItemId(ITEM_ID_YUSHANO_KUTSU), __ItemId(ITEM_ID_TATSUZINNO_TSUCHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_TSUCHI_S2), __ItemId(ITEM_ID_YUSHANO_KUTSU), __ItemId(ITEM_ID_TATSUZINNO_TSUCHI_S2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_KEN), __ItemId(ITEM_ID_YUSHANO_KUTSU), __ItemId(ITEM_ID_TATSUZINNO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO), __ItemId(ITEM_ID_YUSHANO_KUTSU), __ItemId(ITEM_ID_TATSUZINNO_ONO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_KUTSU_TATSUZINNO_ONO_S2), __ItemId(ITEM_ID_YUSHANO_KUTSU), __ItemId(ITEM_ID_TATSUZINNO_ONO_S2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_WANRYOKU_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_WANRYOKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_WANRYOKU_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_WANRYOKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_WANRYOKU_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_WANRYOKU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_CHIRYOKU_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_CHIRYOKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_CHIRYOKU_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_CHIRYOKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_CHIRYOKU_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_CHIRYOKU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_ZINSOKU_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_ZINSOKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_ZINSOKU_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_ZINSOKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_ZINSOKU_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_ZINSOKU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_TAIRYOKU_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_TAIRYOKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_TAIRYOKU_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_TAIRYOKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_TAIRYOKU_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_TAIRYOKU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_SHUCHU_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_SHUCHU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_SHUCHU_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_SHUCHU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_SHUCHU_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_SHUCHU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_KOUN_1), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_KOUN_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_KOUN_2), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_KOUN_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZINNO_YUBIWA_MAZINNO_KOUN_3), __ItemId(ITEM_ID_MAZINNO_YUBIWA), __CardId(CARD_ID_MAZINNO_KOUN_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_GERADRIA), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_GERADRIA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_PEORTH_PLATE), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_PEORTH_PLATE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_PEORTH_MANT), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_PEORTH_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_PEORTH_GREEVE), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_PEORTH_GREEVE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_PEORTH_BROOCH), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_PEORTH_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOFUSEKI_PEORTH_SET), __ItemId(ITEM_ID_GOFUSEKI), __ItemId(ITEM_ID_PEORTH_PLATE), __ItemId(ITEM_ID_PEORTH_MANT), __ItemId(ITEM_ID_PEORTH_GREEVE), __ItemId(ITEM_ID_PEORTH_BROOCH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_DAGGER_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_DAGGER), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_BLADE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_BLADE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_CRAYMORE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_CRAYMORE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_SPEAR_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_SPEAR), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_RANCE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_RANCE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_AXE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_AXE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_TWOHAND_AXE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_TWOHAND_AXE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_MACE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_MACE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_WAND_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_WAND), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_STUFF_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_STUFF), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_WING_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_WING), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_KATAR_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_KATAR), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_BOOK_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_BOOK), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_CRAW_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_CRAW), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_VIOLIN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_VIOLIN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_BLADEWHIP_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_BLADEWHIP), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_FUMA_SHURIKEN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_FUMA_SHURIKEN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_HANDGUN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_HANDGUN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_RIFLE_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_RIFLE), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_GATLINGGUN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_GATLINGGUN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_SHOTGUN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_SHOTGUN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_GRENADEGUN_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_GRENADEGUN), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_SHOES_DIVA_ROBE_DIVA_MANT), __ItemId(ITEM_ID_DIVA_ROBE), __ItemId(ITEM_ID_DIVA_MANT), __ItemId(ITEM_ID_DIVA_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_DAGGER_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_DAGGER), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_BLADE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_BLADE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_CRAYMORE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_CRAYMORE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_SPEAR_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_SPEAR), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_RANCE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_RANCE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_AXE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_AXE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_TWOHAND_AXE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_TWOHAND_AXE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_MACE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_MACE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_WAND_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_WAND), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_STUFF_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_STUFF), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_WING_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_WING), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_KATAR_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_KATAR), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_BOOK_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_BOOK), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_CRAW_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_CRAW), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_VIOLIN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_VIOLIN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_BLADEWHIP_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_BLADEWHIP), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_FUMA_SHURIKEN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_FUMA_SHURIKEN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_HANDGUN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_HANDGUN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_RIFLE_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_RIFLE), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_GATLINGGUN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_GATLINGGUN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_SHOTGUN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_SHOTGUN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_GRENADEGUN_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_GRENADEGUN), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_SHOES_MIRRORAGE_ROBE_MIRRORAGE_MANT), __ItemId(ITEM_ID_MIRRORAGE_ROBE), __ItemId(ITEM_ID_MIRRORAGE_MANT), __ItemId(ITEM_ID_MIRRORAGE_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CELINENO_BROACH_CELINENO_RIBBON), __ItemId(ITEM_ID_CELINENO_BROACH), __ItemId(ITEM_ID_CELINENO_RIBBON)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CELINENO_BROACH_MIZUMIZUSHI_BARA), __ItemId(ITEM_ID_CELINENO_BROACH), __ItemId(ITEM_ID_MIZUMIZUSHI_BARA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CELINENO_BROACH_AKURYONO_ITONO_TEBUKURO), __ItemId(ITEM_ID_CELINENO_BROACH), __ItemId(ITEM_ID_AKURYONO_ITONO_TEBUKURO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_CHIKARANO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_SHUNBINNO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_TAIRYOKUNO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_CHIRYOKUNO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_GIKONO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_KOUNNO_ZIKU_BOOTS), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_CHIKARANO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_CHIKARANO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_SHUNBINNO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_SHUNBINNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_TAIRYOKUNO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_TAIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_CHIRYOKUNO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_CHIRYOKUNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_GIKONO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_GIKONO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZIKU_MANT_KOUNNO_ZIKU_BOOTS_S1), __ItemId(ITEM_ID_ZIKU_MANT), __ItemId(ITEM_ID_KOUNNO_ZIKU_BOOTS_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHUGOKISHINO_KUBIKAZARI_IMPERIAL_FEATHER), __ItemId(ITEM_ID_SHUGOKISHINO_KUBIKAZARI), __ItemId(ITEM_ID_IMPERIAL_FEATHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO), __ItemId(ITEM_ID_AKUMASUHAISHANO_KUTSU), __ItemId(ITEM_ID_DATENSHISAINO_ANKOUGAITO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_DATENSHISAINO_ANKOGAITO_KODAIZYUNO_TSUE), __ItemId(ITEM_ID_AKUMASUHAISHANO_KUTSU), __ItemId(ITEM_ID_DATENSHISAINO_ANKOUGAITO), __ItemId(ITEM_ID_KODAIZYUNO_TSUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AKUMASUHAISHANO_KUTSU_BOSOSHITA_MARYOKU), __ItemId(ITEM_ID_AKUMASUHAISHANO_KUTSU), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SEINARU_HAKUI_ARGIOPE), __ItemId(ITEM_ID_SEINARU_HAKUI), __CardId(CARD_ID_ARGIOPE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_AXE), __ItemId(ITEM_ID_KYOZINNO_KAGO), __ItemId(ITEM_ID_GIGANT_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_BOW), __ItemId(ITEM_ID_KYOZINNO_KAGO), __ItemId(ITEM_ID_GIGANT_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOZINNO_KAGO_GIGANT_LANCE), __ItemId(ITEM_ID_KYOZINNO_KAGO), __ItemId(ITEM_ID_GIGANT_LANCE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_AEGIR_HELM), __ItemId(ITEM_ID_AEGIR_RING), __ItemId(ITEM_ID_AEGIR_HELM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_AEGIR_ARMOR), __ItemId(ITEM_ID_AEGIR_RING), __ItemId(ITEM_ID_AEGIR_ARMOR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_AEGIR_MANT), __ItemId(ITEM_ID_AEGIR_RING), __ItemId(ITEM_ID_AEGIR_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_AEGIR_SHOES), __ItemId(ITEM_ID_AEGIR_RING), __ItemId(ITEM_ID_AEGIR_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_AEGIR_FULLSET), __ItemId(ITEM_ID_AEGIR_RING), __ItemId(ITEM_ID_AEGIR_HELM), __ItemId(ITEM_ID_AEGIR_ARMOR), __ItemId(ITEM_ID_AEGIR_MANT), __ItemId(ITEM_ID_AEGIR_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AEGIR_RING_KRAKEN_CARD), __ItemId(ITEM_ID_AEGIR_RING), __CardId(CARD_ID_KRAKEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GARDEN_OF_EDEN_CATHERINE_KARON_MVP_CARD), __ItemId(ITEM_ID_GARDEN_OF_EDEN), __CardId(CARD_ID_CATHERINE_KARON_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_MAZYUNO_MAIL), __ItemId(ITEM_ID_MAZYUNO_YUBIWA), __ItemId(ITEM_ID_MAZYUNO_MAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_MAZYUNO_MANT), __ItemId(ITEM_ID_MAZYUNO_YUBIWA), __ItemId(ITEM_ID_MAZYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_MAZYUNO_BOOTS), __ItemId(ITEM_ID_MAZYUNO_YUBIWA), __ItemId(ITEM_ID_MAZYUNO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOHIONNO_KODACHI_SOHIONNO_HAGOROMO), __ItemId(ITEM_ID_SOHIONNO_KODACHI), __ItemId(ITEM_ID_SOHIONNO_HAGOROMO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOREIZYUTSUSHINO_GAITO_ENRAIMAZYONO_OTSUE), __ItemId(ITEM_ID_KOREIZYUTSUSHINO_GAITO), __ItemId(ITEM_ID_ENRAIMAZYONO_OTSUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KINGS_GUARD_SAVE_THE_KING), __ItemId(ITEM_ID_KINGS_GUARD), __ItemId(ITEM_ID_SAVE_THE_KING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUDONO_KUROI_HANE_RUDONO_ROLLPAPER), __ItemId(ITEM_ID_RUDONO_KUROI_HANE), __ItemId(ITEM_ID_RUDONO_ROLLPAPER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LOLANO_PLATEMAIL_LOLANO_KUSARITEKKYU), __ItemId(ITEM_ID_LOLANO_PLATEMAIL), __ItemId(ITEM_ID_LOLANO_KUSARITEKKYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ELVIRA_BOOTS_ELVIRA_PENDANT), __ItemId(ITEM_ID_ELVIRA_BOOTS), __ItemId(ITEM_ID_ELVIRA_PENDANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURIONI_WING_FURIONI_CARD), __ItemId(ITEM_ID_FURIONI_WING), __CardId(CARD_ID_FURIONI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_ARNORDY_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_ARNORDY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_ANUBIS_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_ANUBIS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_ORC_WARRIOR_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_ORC_WORRIOR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_CARITZBURG_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_KHALITZBURG)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_SKY_PTITE_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_SKY_PTITE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_TARAFROG_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_THARA_FROG)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_BIGFOOT_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_BIGFOOT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_BEARDOLL_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_BEAR_DOLL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_PHENOMENA_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_PHENOMENA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOFUKUNO_TATE_RAFLECIA_CARD), __ItemId(ITEM_ID_KOFUKUNO_TATE), __CardId(CARD_ID_RAFFLESIA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YSF01_PLATE_FULLSET), __ItemId(ITEM_ID_YSF01_PLATE), __ItemId(ITEM_ID_YSF01_MANT), __ItemId(ITEM_ID_YSF01_GREEVE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVID_SHIELD_SHUGEKISHANO_ROBE), __ItemId(ITEM_ID_DIVID_SHIELD), __ItemId(ITEM_ID_SHUGEKISHANO_ROBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVID_SHIELD_MASSHOSHANO_ROBE), __ItemId(ITEM_ID_DIVID_SHIELD), __ItemId(ITEM_ID_MASSHOSHANO_ROBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MASSHOSHANO_ROBE_ENTVAIEN_CARD), __ItemId(ITEM_ID_MASSHOSHANO_ROBE), __CardId(CARD_ID_ENTVAIEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SNIPING_VEIL_IMUKENO_OSODE), __ItemId(ITEM_ID_SNIPING_VEIL), __ItemId(ITEM_ID_IMUKENO_OSODE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SNIPING_VEIL_HORN_CARD), __ItemId(ITEM_ID_SNIPING_VEIL), __CardId(CARD_ID_HORN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYODAIZYUNO_WAKABA_CARDYUINO_MIMI), __ItemId(ITEM_ID_KYODAIZYUNO_WAKABA), __ItemId(ITEM_ID_CARDYUINO_MIMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYODAIZYUNO_WAKABA_TENDORIRURION_CARD), __ItemId(ITEM_ID_KYODAIZYUNO_WAKABA), __CardId(CARD_ID_TENDORIRURION)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MENBRITZ_MANT_MENBRITZ_CARD), __ItemId(ITEM_ID_MENBRITZ_MANT), __CardId(CARD_ID_MENBRITZ)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GODS_SWORD_ONRYOBUSHI_CARD), __ItemId(ITEM_ID_GODS_SWORD), __CardId(CARD_ID_ONRYOBUSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAUROS_CROWN_TAUROS), __ItemId(ITEM_ID_TAUROS_CROWN), __CardId(CARD_ID_TAUROS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CANCER_DIADEM_CANCER), __ItemId(ITEM_ID_CANCER_DIADEM), __CardId(CARD_ID_CANCER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUWAETA_HEARTNO_ACE_GAMBLER_SEAL), __ItemId(ITEM_ID_KUWAETA_HEARTNO_ACE), __ItemId(ITEM_ID_GAMBLER_SEAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_IMPERIAL_GLOVE_IMPERIAL_FEATHER), __ItemId(ITEM_ID_IMPERIAL_GLOVE), __ItemId(ITEM_ID_IMPERIAL_FEATHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_YUSHANO_KUTSU), __ItemId(ITEM_ID_EIYUNO_YUBIWA), __ItemId(ITEM_ID_TATSUZINNO_TSUCHI), __ItemId(ITEM_ID_YUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_TSUCHI_S2_YUSHANO_KUTSU), __ItemId(ITEM_ID_EIYUNO_YUBIWA), __ItemId(ITEM_ID_TATSUZINNO_TSUCHI_S2), __ItemId(ITEM_ID_YUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_KEN_YUSHANO_KUTSU), __ItemId(ITEM_ID_EIYUNO_YUBIWA), __ItemId(ITEM_ID_TATSUZINNO_KEN), __ItemId(ITEM_ID_YUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_YUSHANO_KUTSU), __ItemId(ITEM_ID_EIYUNO_YUBIWA), __ItemId(ITEM_ID_TATSUZINNO_ONO), __ItemId(ITEM_ID_YUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIYUNO_YUBIWA_TATSUZINNO_ONO_S2_YUSHANO_KUTSU), __ItemId(ITEM_ID_EIYUNO_YUBIWA), __ItemId(ITEM_ID_TATSUZINNO_ONO_S2), __ItemId(ITEM_ID_YUSHANO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_SHAKUNETSUNO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_ZYOKANO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_NARAKUNO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_SHAKUNETSUNO_KEN_DIVID_SHIELD), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_SHAKUNETSUNO_KEN), __ItemId(ITEM_ID_DIVID_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_ZYOKANO_KEN_DIVID_SHIELD), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_ZYOKANO_KEN), __ItemId(ITEM_ID_DIVID_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAIKYOKUNO_GOFU_NARAKUNO_KEN_DIVID_SHIELD), __ItemId(ITEM_ID_TAIKYOKUNO_GOFU), __ItemId(ITEM_ID_NARAKUNO_KEN), __ItemId(ITEM_ID_DIVID_SHIELD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_DEX_S1), __ItemId(ITEM_ID_SURVIVAL_SHOES), __ItemId(ITEM_ID_SURVIVAL_ROD_DEX_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ROD_INT_S1), __ItemId(ITEM_ID_SURVIVAL_SHOES), __ItemId(ITEM_ID_SURVIVAL_ROD_INT_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_CIRCLET), __ItemId(ITEM_ID_SURVIVAL_SHOES), __ItemId(ITEM_ID_SURVIVAL_CIRCLET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_MANT), __ItemId(ITEM_ID_SURVIVAL_SHOES), __ItemId(ITEM_ID_SURVIVAL_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SURVIVAL_SHOES_SURVIVAL_ORB), __ItemId(ITEM_ID_SURVIVAL_SHOES), __ItemId(ITEM_ID_SURVIVAL_ORB)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAIHANENO_BOOTS_KUROHANO_SUITS), __ItemId(ITEM_ID_HAIHANENO_BOOTS), __ItemId(ITEM_ID_KUROHANO_SUIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAIHANENO_BOOTS_SHIRAHANO_SUITS), __ItemId(ITEM_ID_HAIHANENO_BOOTS), __ItemId(ITEM_ID_SHIRAHANO_SUIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ANSONINO_FUKU_ANSONI_CARD), __ItemId(ITEM_ID_ANSONINO_FUKU), __CardId(CARD_ID_ANSONI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EIKONO_ROCKRIDGE_BADGE_MEIYONO_ROCKRIDGE_BADGE), __ItemId(ITEM_ID_EIKONO_ROCKRIDGE_BADGE), __ItemId(ITEM_ID_MEIYONO_ROCKRIDGE_BADGE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GREATER_DRACLE_HORN_HUNTERFLY_CARD), __ItemId(ITEM_ID_GREATER_DRACLE_HORN), __CardId(CARD_ID_HUNTERFLY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_CRAYMORE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_GRAVE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_ZYAMADAHAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_WIZARD_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_ARCWAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_HOLYSTICK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_DIVINE_CROSS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_GUILLOTINE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_BASTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_FUMA_SHURIKEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_THIEF_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_HUNTER_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_CROSS_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIEVE_VALLETTA_NIEVE_ARMS), __ItemId(ITEM_ID_NIEVE_VALLETTA), __ItemId(ITEM_ID_NIEVE_RIFLE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLY_CLOTH_JACK_CARD), __ItemId(ITEM_ID_FAIRLY_CLOTH), __CardId(CARD_ID_JACK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLY_CLOTH_DUSTYNESS_CARD), __ItemId(ITEM_ID_FAIRLY_CLOTH), __CardId(CARD_ID_DUSTYNESS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLY_CLOTH_HORD_CARD), __ItemId(ITEM_ID_FAIRLY_CLOTH), __CardId(CARD_ID_HORD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLY_CLOTH_MARTH_CARD), __ItemId(ITEM_ID_FAIRLY_CLOTH), __CardId(CARD_ID_MARTH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FAIRLY_CLOTH_CHOCO_CARD), __ItemId(ITEM_ID_FAIRLY_CLOTH), __CardId(CARD_ID_CHOCO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SCARABA_HIGHHEEL_ELVEN_BOW), __ItemId(ITEM_ID_SCARABA_HIGHHEEL), __ItemId(ITEM_ID_ELVEN_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SCARABA_HIGHHEEL_CARGA_MACE), __ItemId(ITEM_ID_SCARABA_HIGHHEEL), __ItemId(ITEM_ID_CARGA_MACE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SCARABA_HIGHHEEL_DULLGER), __ItemId(ITEM_ID_SCARABA_HIGHHEEL), __ItemId(ITEM_ID_DULLGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SCARABA_HIGHHEEL_LAFINE_STUFF), __ItemId(ITEM_ID_SCARABA_HIGHHEEL), __ItemId(ITEM_ID_LAFINE_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GEMINI_CROWN_GEMINI), __ItemId(ITEM_ID_GEMINI_CROWN), __CardId(CARD_ID_GEMINI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SAGITTARIUS_DIADEM_SAGITTARIUS), __ItemId(ITEM_ID_SAGITTARIUS_DIADEM), __CardId(CARD_ID_SAGITTARIUS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_IGNISEM_CENIA_MVP), __ItemId(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS), __CardId(CARD_ID_IGNISEM_CENIA_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHITENSHINO_UMO_SHITENSHINO_HANAKANMURI), __ItemId(ITEM_ID_SHITENSHINO_UMO), __ItemId(ITEM_ID_SHITENSHINO_HANAKANMURI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_ARMAIA_DUNZE_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_ARMAIA_DUNZE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_VIRUS_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_VIRUS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_ORC_ARCHER_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_ORC_ARCHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_GREEN_IGUANA_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_GREEN_IGUANA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_SIKKOSURUMONO_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_SIKKOSURUMONO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_STEM_WORM_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_STEM_WORM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_TENZYA_SENNIN_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_TENZYA_SENNIN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_DRAGONNO_TAMAGO_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_DRAGONNO_TAMAGO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_WRAITH_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_WRAITH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOIGANO_SHO_RAYDRIC_ARCHER_CARD), __ItemId(ITEM_ID_SOIGANO_SHO), __CardId(CARD_ID_RAYDRIC_ARCHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_OWASHINO_GANKO), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_KUMANO_CHIKARA), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_KOUUNNA_HI), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_KOUUNNA_HI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_KOGAI), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_KOGAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_KOSOKU), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_KOSOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA_BOSOSHITA_MARYOKU), __ItemId(ITEM_ID_TOKIMAZYUTSUSHINO_YUBIWA), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OMOCHANO_YUBIWA_METEOR_STRIKE), __ItemId(ITEM_ID_OMOCHANO_YUBIWA), __ItemId(ITEM_ID_METEOR_STRIKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIVA_FOXTAIL_MEIKYUNO_BAPHOMET), __ItemId(ITEM_ID_DIVA_FOXTAIL), __CardId(CARD_ID_MEIKYUNO_BAPHOMET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MIRRORAGE_FOXTAIL_MEIKYUNO_DRACULA), __ItemId(ITEM_ID_MIRRORAGE_FOXTAIL), __CardId(CARD_ID_MEIKYUNO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DORAM_ARMOR_SET), __ItemId(ITEM_ID_DORAM_SUITS), __ItemId(ITEM_ID_DORAM_CAPE), __ItemId(ITEM_ID_DORAM_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOKYU_DORAM_ARMOR_SET), __ItemId(ITEM_ID_KOKYU_DORAM_SUITS), __ItemId(ITEM_ID_KOKYU_DORAM_CAPE), __ItemId(ITEM_ID_KOKYU_DORAM_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKUSEN_DORAM_ARMOR_SET), __ItemId(ITEM_ID_TOKUSEN_DORAM_SUITS), __ItemId(ITEM_ID_TOKUSEN_DORAM_CAPE), __ItemId(ITEM_ID_TOKUSEN_DORAM_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_KNOCKBACK), __CardId(CARD_ID_ENCHANT_Z_KNOCKBACK), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_IMMORTAL), __CardId(CARD_ID_ENCHANT_Z_IMMORTAL), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_KILLGAIN), __CardId(CARD_ID_ENCHANT_Z_KILLGAIN), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_REINCARNATION), __CardId(CARD_ID_ENCHANT_Z_REINCARNATION), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_NODISPELL), __CardId(CARD_ID_ENCHANT_Z_NODISPELL), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_CLAIRVOYANCE), __CardId(CARD_ID_ENCHANT_Z_CLAIRVOYANCE), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIOTCHIP_Z_CASTFIXED), __CardId(CARD_ID_ENCHANT_Z_CASTFIXED), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KAIMAZYUNO_UROKO_TODO), __ItemId(ITEM_ID_KAIMAZYUNO_UROKO), __CardId(CARD_ID_TODO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SERPENTARIUS_CROWN_SERPENTARIUS), __ItemId(ITEM_ID_SERPENTARIUS_CROWN), __CardId(CARD_ID_SERPENTARIUS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AQUARIUS_DIADEM_AQUARIUS), __ItemId(ITEM_ID_AQUARIUS_DIADEM), __CardId(CARD_ID_AQUARIUS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_HATI_CARD), __ItemId(ITEM_ID_GESSHOKUNO_SOUSHOKU), __CardId(CARD_ID_HATI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ACCELERATOR_CHIP_RIOT_CHIP), __ItemId(ITEM_ID_ACCELERATOR_CHIP), __ItemId(ITEM_ID_RIOTCHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_JULIET_DE_RACHEL), __ItemId(ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO), __ItemId(ITEM_ID_JULIET_DE_RACHEL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_HIMAWARI_SHONEN), __ItemId(ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO), __ItemId(ITEM_ID_HIMAWARI_SHONEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUSHINO_GUNDAN_NINSHIKIHYO_LINDY_HOP), __ItemId(ITEM_ID_FUSHINO_GUNDAN_NINSHIKIHYO), __ItemId(ITEM_ID_LINDY_HOP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BRAVE_SUIT_TAOGUNKA_CARD), __ItemId(ITEM_ID_BRAVE_SUIT), __CardId(CARD_ID_TAOGUNKA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BRAVE_SET), __ItemId(ITEM_ID_BRAVE_SUIT), __ItemId(ITEM_ID_BRAVE_MUFFLER), __ItemId(ITEM_ID_BRAVE_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PROTECT_CLOTH_PROTECT_FEATHER), __ItemId(ITEM_ID_PROTECT_CLOTH), __ItemId(ITEM_ID_PROTECT_FEATHER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RENGOGUN_SHIREKANNNO_MANT_YUSHANO_UNGORIANT_BOOTS), __ItemId(ITEM_ID_RENGOGUN_SHIREKANNNO_MANT), __ItemId(ITEM_ID_YUSHANO_UNGORIANT_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RENGOGUN_SHIREKANNNO_MANT_YUSHANO_GINKOGAWA_BOOTS), __ItemId(ITEM_ID_RENGOGUN_SHIREKANNNO_MANT), __ItemId(ITEM_ID_YUSHANO_GINKOGAWA_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RENGOGUN_SHIREKANNNO_MANT_YUSHANO_NEPENTES_BOOTS), __ItemId(ITEM_ID_RENGOGUN_SHIREKANNNO_MANT), __ItemId(ITEM_ID_YUSHANO_NEPENTES_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KODAI_MORROCNO_SHAWL_OSIRIS_CARD), __ItemId(ITEM_ID_KODAI_MORROCNO_SHAWL), __CardId(CARD_ID_OSIRIS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_DAGGER_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_DAGGER), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_BLADE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_BLADE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_CRAYMORE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_CRAYMORE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_SPEAR_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_SPEAR), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_RANCE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_RANCE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_AXE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_AXE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_TWOHAND_AXE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_TWOHAND_AXE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_MACE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_MACE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_WAND_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_WAND), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_STUFF_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_STUFF), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_WING_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_WING), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_KATAR_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_KATAR), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_BOOK_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_BOOK), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_CRAW_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_CRAW), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_VIOLIN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_VIOLIN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_BLADEWHIP_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_BLADEWHIP), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_FUMA_SHURIKEN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_FUMA_SHURIKEN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_HANDGUN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_HANDGUN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_RIFLE_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_RIFLE), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_GATLINGGUN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_GATLINGGUN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_SHOTGUN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_SHOTGUN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_GRENADEGUN_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_GRENADEGUN), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ABYSS_FOXTAIL_MEIKYUNO_DOPPELGANGER), __ItemId(ITEM_ID_ABYSS_FOXTAIL), __CardId(CARD_ID_MEIKYUNO_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_MUFFLER_IMUKENO_OSODE), __ItemId(ITEM_ID_ILLUSION_MUFFLER), __ItemId(ITEM_ID_IMUKENO_OSODE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_MUFFLER_HORN_CARD), __ItemId(ITEM_ID_ILLUSION_MUFFLER), __CardId(CARD_ID_HORN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_SHOES_ILLUSION_MUFFLER), __ItemId(ITEM_ID_ILLUSION_SHOES), __ItemId(ITEM_ID_ILLUSION_MUFFLER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_STUFF_OF_PUFFY_IMP_CARD), __ItemId(ITEM_ID_STUFF_OF_PUFFY), __CardId(CARD_ID_IMP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_STUFF_OF_PUFFY_SIROMA_CARD), __ItemId(ITEM_ID_STUFF_OF_PUFFY), __CardId(CARD_ID_SIROMA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_STUFF_OF_PUFFY_ELVIRA_CARD), __ItemId(ITEM_ID_STUFF_OF_PUFFY), __CardId(CARD_ID_ELVIRA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_LIBRA_CROWN_LIBRA), __ItemId(ITEM_ID_LIBRA_CROWN), __CardId(CARD_ID_LIBRA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SCORPIO_DIADEM_SCORPIO), __ItemId(ITEM_ID_SCORPIO_DIADEM), __CardId(CARD_ID_SCORPIO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS_DARKLORD_CARD), __ItemId(ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS), __CardId(CARD_ID_DARK_LORD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYUKETSUKINO_SHIMOBE_IKARINO_DRACULA_CARD), __ItemId(ITEM_ID_KYUKETSUKINO_SHIMOBE), __CardId(CARD_ID_IKARINO_DRACULA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_JUDGEMENT_ROBE), __ItemId(ITEM_ID_YUSHANO_BROACH), __ItemId(ITEM_ID_YUSHANO_JUDGEMENT_ROBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_TRADE_MAIL), __ItemId(ITEM_ID_YUSHANO_BROACH), __ItemId(ITEM_ID_YUSHANO_TRADE_MAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_YUSHANO_BROACH_YUSHANO_PLATE), __ItemId(ITEM_ID_YUSHANO_BROACH), __ItemId(ITEM_ID_YUSHANO_PLATE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SESAINO_HAGOROMO_BARSLY_CARD), __ItemId(ITEM_ID_SESAINO_HAGOROMO), __CardId(CARD_ID_BARSLY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FROZVITNIRNO_KUSARI_VANARGANDNO_KABUTO), __ItemId(ITEM_ID_FROZVITNIRNO_KUSARI), __ItemId(ITEM_ID_VANARGANDNO_KABUTO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ENMAZYUNO_HANE_MASTERING_CARD), __ItemId(ITEM_ID_ENMAZYUNO_HANE), __CardId(CARD_ID_MASTERING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KONGOSEKINO_MANT_KONGOSEKINO_KUTSU), __ItemId(ITEM_ID_KONGOSEKINO_MANT), __ItemId(ITEM_ID_KONGOSEKINO_KUTSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_ZYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_TSUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_TSUCHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_YARI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_MUSO_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __ItemId(ITEM_ID_MUSO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MUSONO_YUBIWA_TENCHI_SET), __ItemId(ITEM_ID_MUSONO_YUBIWA), __CardId(CARD_ID_ENCHANT_TENCHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KINGS_MAIL_SAVE_THE_KING), __ItemId(ITEM_ID_KINGS_MAIL), __ItemId(ITEM_ID_SAVE_THE_KING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KINGS_MAIL_KINGS_GUARD), __ItemId(ITEM_ID_KINGS_MAIL), __ItemId(ITEM_ID_KINGS_GUARD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_KORE_ZYUTSUSHINO_GAITO), __ItemId(ITEM_ID_KORE_ZYUTSUSHINO_DRESS), __ItemId(ITEM_ID_KOREIZYUTSUSHINO_GAITO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_ENRAI_MAZYONO_OTSUE), __ItemId(ITEM_ID_KORE_ZYUTSUSHINO_DRESS), __ItemId(ITEM_ID_ENRAIMAZYONO_OTSUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KORE_ZYUTSUSHINO_DRESS_CERIA_ARDE_MVP_CARD), __ItemId(ITEM_ID_KORE_ZYUTSUSHINO_DRESS), __CardId(CARD_ID_CERIA_ARDE_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DWARFNO_HIGE_TSUKINO_GANTAI), __ItemId(ITEM_ID_DWARFNO_HIGE), __ItemId(ITEM_ID_TSUKINO_GANTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUSHIGINA_HATO_WALHALLA_IDOL), __ItemId(ITEM_ID_FUSHIGINA_HATO), __ItemId(ITEM_ID_WALHALLA_IDOL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_KAZENO_SASAYAKI), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_KAZENO_SASAYAKI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_SHADOWCROWN), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_SHADOWCROWN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_SHUGONOKANMURI), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_SHUGONOKANNMURI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_DRIVERBAND), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_DRIVERBAND_KIRO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_DRIVERBAND), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_DRIVERBAND_AKA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BALLERINA), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_BALLERINA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BLAZINGSOUL), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_BLAZINGSOUL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_BONECIRCRET), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_BONECIRCRET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_MARYOKUSEKI), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_MARYOKUSEKI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_MIDAS), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_MIDASS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_MITRA), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_MITRA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_MINSTRELSONG), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_MINSTRELSONG)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_MEISAIUSAGI), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_MEISAIUSAGI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FURUBITA_HAKENTAINO_YUBIWA_FURUBITA_RUNECIRCRET), __ItemId(ITEM_ID_FURUBITA_HAKENTAINO_YUBIWA), __ItemId(ITEM_ID_FURUBITA_RUNECIRCRET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ARIES_DIADEM_ARIES), __ItemId(ITEM_ID_ARIES_DIADEM), __CardId(CARD_ID_ARIES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CAPRICORN_CROWN_CAPRICORN), __ItemId(ITEM_ID_CAPRICORN_CROWN), __CardId(CARD_ID_CAPRICORN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PISCES_CROWN_PISCES), __ItemId(ITEM_ID_PISCES_CROWN), __CardId(CARD_ID_PISCES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HOSHINO_GANTAI_ORC_HERO_CARD), __ItemId(ITEM_ID_HOSHINO_GANTAI), __CardId(CARD_ID_ORC_HERO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUSHOHENO_GANTAI_SEIREN_VIENSER_MVP), __ItemId(ITEM_ID_FUSHOHENO_GANTAI), __CardId(CARD_ID_SEIREN_VIENSER_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD), __ItemId(ITEM_ID_HOROW_SHOES), __CardId(CARD_ID_VERSEVV)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FULL_FORCE_DOPPELGANGER_CARD), __ItemId(ITEM_ID_FULL_FORCE), __CardId(CARD_ID_DOPPELGANGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VESPER_HEAD_GEAR_VESPER_CARD), __ItemId(ITEM_ID_VESPER_HEAD_GEAR), __CardId(CARD_ID_VESPER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VESPER_HEAD_GEAR_VERSEVV_CARD), __ItemId(ITEM_ID_VESPER_HEAD_GEAR), __CardId(CARD_ID_VERSEVV)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BUKYO_KUTSU_SWORD), __ItemId(ITEM_ID_BUKYO_KUTSU), __ItemId(ITEM_ID_SHAKUNETSUNO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BUKYO_KUTSU_SWORD), __ItemId(ITEM_ID_BUKYO_KUTSU), __ItemId(ITEM_ID_NARAKUNO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BUKYO_KUTSU_SWORD), __ItemId(ITEM_ID_BUKYO_KUTSU), __ItemId(ITEM_ID_ZYOKANO_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHUKIOKU_SOCHI_VESPER_HEAD_GEAR), __ItemId(ITEM_ID_SHUKIOKU_SOCHI), __ItemId(ITEM_ID_VESPER_HEAD_GEAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_AKURYONO_ITONO_TEBUKURO), __ItemId(ITEM_ID_CHINURARETA_NINGYONO_DRESS), __ItemId(ITEM_ID_AKURYONO_ITONO_TEBUKURO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHINURARETA_NINGYONO_DRESS_CELINENO_RIBBON), __ItemId(ITEM_ID_CHINURARETA_NINGYONO_DRESS), __ItemId(ITEM_ID_CELINENO_RIBBON)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHISHIKYU_SET), __ItemId(ITEM_ID_SHISHIKYUNO_MAIL), __ItemId(ITEM_ID_SHISHIKYUNO_SHOES), __ItemId(ITEM_ID_SHISHIKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_DAGGER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_BLADE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_CRAYMORE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_SPEAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_RANCE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_TWOHAND_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_MACE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_WAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_WING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_KATAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_BOOK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_CRAW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_VIOLIN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_BLADEWHIP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_FUMA_SHURIKEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_HANDGUN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_RIFLE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_GATLINGGUN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_SHOTGUN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_GRENADEGUN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HEAVENLY_ORDER_ABYSS_ARMS), __ItemId(ITEM_ID_HEAVENLY_ORDER), __ItemId(ITEM_ID_ABYSS_FOXTAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KONGOSEKINO_TATE_EIKONO_AKASHI_S1), __ItemId(ITEM_ID_KONGOSEKINO_TATE), __ItemId(ITEM_ID_EIKONO_AKASHI_S1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_SURVIVAL_STUFF_ILLUSION_SURVIVAL_MANT), __ItemId(ITEM_ID_ILLUSION_SURVIVAL_STUFF), __ItemId(ITEM_ID_ILLUSION_SURVIVAL_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_NEKKETSU_HACHIMAKI_ILLUSION_RENGEKINO_TSUME), __ItemId(ITEM_ID_ILLUSION_NEKKETSU_HACHIMAKI), __ItemId(ITEM_ID_ILLUSION_RENGEKINO_TSUME)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KYOKAIKYU_SET), __ItemId(ITEM_ID_KYOKAIKYUNO_MAIL), __ItemId(ITEM_ID_KYOKAIKYUNO_SHOES), __ItemId(ITEM_ID_KYOKAIKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_RAIN_BO), __ItemId(ITEM_ID_NIZIIRONO_NEKOZYARASHI), __ItemId(ITEM_ID_RAIN_BO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_BLOODY_KNIGHT_CARD), __ItemId(ITEM_ID_NIZIIRONO_NEKOZYARASHI), __CardId(CARD_ID_BLOODY_KNIGHT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_STORM_KNIGHT_CARD), __ItemId(ITEM_ID_NIZIIRONO_NEKOZYARASHI), __CardId(CARD_ID_STORM_KNIGHT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TENBINKYU_SET), __ItemId(ITEM_ID_TENBINKYUNO_MAIL), __ItemId(ITEM_ID_TENBINKYUNO_SHOES), __ItemId(ITEM_ID_TENBINKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_GOIBHNIU_SET), __ItemId(ITEM_ID_ILLUSION_GOIBHNIUNO_KABUTO), __ItemId(ITEM_ID_ILLUSION_GOIBHNIUNO_YOROI), __ItemId(ITEM_ID_ILLUSION_GOIBHNIUNO_KATAKAZARI), __ItemId(ITEM_ID_ILLUSION_GOIBHNIUNO_GUNKA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TENKATSUKYU_SET), __ItemId(ITEM_ID_TENKATSUKYUNO_MAIL), __ItemId(ITEM_ID_TENKATSUKYUNO_SHOES), __ItemId(ITEM_ID_TENKATSUKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KURAMITSUHANOKAMI_KUTSU_BOSOSHITA_MARYOKU), __ItemId(ITEM_ID_KURAMITSUHANOKAMI_KUTSU), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_KTULLANUX), __ItemId(ITEM_ID_OKAMINOKAMINO_HAKOROMO), __CardId(CARD_ID_KTULLANUX)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KINGYUKYU_SET), __ItemId(ITEM_ID_KINGYUKYUNO_MAIL), __ItemId(ITEM_ID_KINGYUKYUNO_SHOES), __ItemId(ITEM_ID_KINGYUKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_DRESS), __ItemId(ITEM_ID_KOREZYUTSUSHINO_TEKAGAMI), __ItemId(ITEM_ID_KORE_ZYUTSUSHINO_DRESS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KOREZYUTSUSHINO_TEKAGAMI_GAITO), __ItemId(ITEM_ID_KOREZYUTSUSHINO_TEKAGAMI), __ItemId(ITEM_ID_KOREIZYUTSUSHINO_GAITO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ARMOR), __ItemId(ITEM_ID_DIAVOLOS_WING), __ItemId(ITEM_ID_DIABOLOS_ARMER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_ROBE), __ItemId(ITEM_ID_DIAVOLOS_WING), __ItemId(ITEM_ID_DIABOLOS_ROBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_MANT), __ItemId(ITEM_ID_DIAVOLOS_WING), __ItemId(ITEM_ID_DIABOLOS_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_BOOTS), __ItemId(ITEM_ID_DIAVOLOS_WING), __ItemId(ITEM_ID_DIABOLOS_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DIAVOLOS_WING_DIAVOLOS_RING), __ItemId(ITEM_ID_DIAVOLOS_WING), __ItemId(ITEM_ID_DIABOLOS_RING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CARNIUM_RING_CARNIUM_EARRING), __ItemId(ITEM_ID_CARNIUM_RING), __ItemId(ITEM_ID_CARNIUM_EARRING)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUWAETA_CHOCO_STICK_CARNIUM_RING), __ItemId(ITEM_ID_KUWAETA_CHOCO_STICK), __ItemId(ITEM_ID_CARNIUM_RING), __ItemId(ITEM_ID_GINNO_KEGAWANO_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUWAETA_CHOCO_STICK_CARNIUM_EARRING), __ItemId(ITEM_ID_KUWAETA_CHOCO_STICK), __ItemId(ITEM_ID_CARNIUM_EARRING), __ItemId(ITEM_ID_GINNO_KEGAWANO_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HOBINKYU_SET), __ItemId(ITEM_ID_HOBINKYUNO_MAIL), __ItemId(ITEM_ID_HOBINKYUNO_SHOES), __ItemId(ITEM_ID_HOBINKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PHANTOM_OF_MASKARADE_MAKENSHI_THANATOSNO_SHINENTAI_CARD), __ItemId(ITEM_ID_PHANTOM_OF_MASKARADE), __CardId(CARD_ID_MAKENSHI_THANATOSNO_SHINENTAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPIRITUAL_CLOTH_ECLIPSE_CARD), __ItemId(ITEM_ID_SPIRITUAL_CLOTH), __CardId(CARD_ID_ECLIPSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPIRITUAL_CLOTH_ORC_ZOMBIE_CARD), __ItemId(ITEM_ID_SPIRITUAL_CLOTH), __CardId(CARD_ID_ORC_ZOMBIE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPIRITUAL_CLOTH_MARIONETTE_CARD), __ItemId(ITEM_ID_SPIRITUAL_CLOTH), __CardId(CARD_ID_MARIONETTE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SPIRITUAL_CLOTH_MIST_CARD), __ItemId(ITEM_ID_SPIRITUAL_CLOTH), __CardId(CARD_ID_MIST)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_KIGENNO_SHO), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_KIGENNO_SHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_KOINNO_TSURUHASHI), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_KOINNO_TSURUHASHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_ZIKEDANNO_YUMI), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_ZIKEIDANNO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_GUITAR), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_DAISHIZENNO_GUITAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_DAISHIZENNO_ROPE), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_DAISHIZENNO_ROPE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_MONOKAGE), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_MONOKAGE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FRONTIER_BOOTS_FUMASHURIKEN_HANAFUBUKI), __ItemId(ITEM_ID_FRONTIER_BOOTS), __ItemId(ITEM_ID_FUMASHURIKEN_HANAFUBUKI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_EUROPA_ROBE_POWERFULL_AMDARAIS_CARD), __ItemId(ITEM_ID_EUROPA_ROBE), __CardId(CARD_ID_POWERFUL_AMDARAIS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAKATSUKYU_SET), __ItemId(ITEM_ID_MAKATSUKYUNO_MAIL), __ItemId(ITEM_ID_MAKATSUKYUNO_SHOES), __ItemId(ITEM_ID_MAKATSUKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUGUTSUNO_UDEWA_DARK_HAND), __ItemId(ITEM_ID_KUGUTSUNO_UDEWA), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SUIRYUSHINNO_UROKO_IKEINO_COELACANTH), __ItemId(ITEM_ID_SUIRYUSHINNO_UROKO), __CardId(CARD_ID_IKEINO_COELACANTH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_DEMONISH_SWORD_ONRYOBUSHI_CARD), __ItemId(ITEM_ID_DEMONISH_SWORD), __CardId(CARD_ID_ONRYOBUSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_KEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_ZYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_TSUE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_TSUCHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_YARI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_ZINRAI_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __ItemId(ITEM_ID_ZINRAI_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINRAINO_YUBIWA_SHIPPU_SET), __ItemId(ITEM_ID_ZINRAINO_YUBIWA), __CardId(CARD_ID_ENCHANT_SHIPPU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOMEIKO_GUNSE), __ItemId(ITEM_ID_GOMEIKO), __ItemId(ITEM_ID_GUNSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHOZYOKYU_SET), __ItemId(ITEM_ID_SHOZYOKYUNO_MAIL), __ItemId(ITEM_ID_SHOZYOKYUNO_SHOES), __ItemId(ITEM_ID_SHOZYOKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GEFFENIA_KORINO_MADOGU_SHINRINO_KAIHO), __ItemId(ITEM_ID_GEFFENIA_KORINO_MADOGU), __CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ARABIAN_MANT_EFREET_CARD), __ItemId(ITEM_ID_ARABIAN_MANT), __CardId(CARD_ID_EFREET)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CIRCUIT_BOARD_OS_IMP_CARD), __ItemId(ITEM_ID_CIRCUIT_BOARD_OS), __CardId(CARD_ID_IMP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CIRCUIT_BOARD_OS_SIROMA_CARD), __ItemId(ITEM_ID_CIRCUIT_BOARD_OS), __CardId(CARD_ID_SIROMA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CIRCUIT_BOARD_OS_ELVIRA_CARD), __ItemId(ITEM_ID_CIRCUIT_BOARD_OS), __CardId(CARD_ID_ELVIRA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIDEWORD_BO_G_DRAIN_HP), __ItemId(ITEM_ID_RIDEWORD_BO), __CardId(CARD_ID_ENCHANT_G_DRAINHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VANARGANDNO_KABUTO_G_DRAIN_HP), __ItemId(ITEM_ID_VANARGANDNO_KABUTO), __CardId(CARD_ID_ENCHANT_G_DRAINHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILUSION_WING_1_SUIT_1), __ItemId(ITEM_ID_ILUSION_WING_1), __ItemId(ITEM_ID_ILUSION_SUIT_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILUSION_WING_2_SUIT_2), __ItemId(ITEM_ID_ILUSION_WING_2), __ItemId(ITEM_ID_ILUSION_SUIT_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RIDEWORD_BO_G_DRAIN_SP), __ItemId(ITEM_ID_RIDEWORD_BO), __CardId(CARD_ID_ENCHANT_G_DRAINSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_VANARGANDNO_KABUTO_G_DRAIN_SP), __ItemId(ITEM_ID_VANARGANDNO_KABUTO), __CardId(CARD_ID_ENCHANT_G_DRAINSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SKIN_OF_SHADOW_G_DRAIN_SP), __ItemId(ITEM_ID_SKIN_OF_SHADOW), __CardId(CARD_ID_ENCHANT_G_DRAINSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OSUWARI_KYOKO_SHIFUKU_R48_85_BESTIA_CARD), __ItemId(ITEM_ID_OSUWARI_KYOKO_SHIFUKU), __CardId(CARD_ID_R48_85_BESTIA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAKUYOKYU_SET), __ItemId(ITEM_ID_HAKUYOKYUNO_MAIL), __ItemId(ITEM_ID_HAKUYOKYUNO_SHOES), __ItemId(ITEM_ID_HAKUYOKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PETALNO_SHIPPO_RISUMIMI_HOOD_BO), __ItemId(ITEM_ID_PETALNO_SHIPPO), __ItemId(ITEM_ID_RISUMIMI_HOODBO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_WIND_GAIL), __ItemId(ITEM_ID_FUCHOWANO_SHINENTAI_SHOES), __ItemId(ITEM_ID_WIND_GAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_SHARP_STAR), __ItemId(ITEM_ID_FUCHOWANO_SHINENTAI_SHOES), __ItemId(ITEM_ID_SHARP_STAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_FALCEN_SHOOTER), __ItemId(ITEM_ID_FUCHOWANO_SHINENTAI_SHOES), __ItemId(ITEM_ID_FALCEN_SHOOTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_FUCHOWANO_SHINENTAI_SHOES_OWASHINO_GANKO), __ItemId(ITEM_ID_FUCHOWANO_SHINENTAI_SHOES), __CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AWL_BARRONNO_MANT_EXCUTIONER_CARD), __ItemId(ITEM_ID_AWL_BARRONNO_MANT), __CardId(CARD_ID_EXCUTIONER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AWL_BARRONNO_MANT_ORGE_TOOTH_CARD), __ItemId(ITEM_ID_AWL_BARRONNO_MANT), __CardId(CARD_ID_ORGE_TOOTH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AWL_BARRONNO_MANT_MISTILTINE_CARD), __ItemId(ITEM_ID_AWL_BARRONNO_MANT), __CardId(CARD_ID_MISTILTINE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOZIKYU_SET), __ItemId(ITEM_ID_SOZIKYUNO_MAIL), __ItemId(ITEM_ID_SOZIKYUNO_SHOES), __ItemId(ITEM_ID_SOZIKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_MORFEUS_SET), __ItemId(ITEM_ID_ILLUSION_MORFEUSNO_ZUKIN), __ItemId(ITEM_ID_ILLUSION_MORFEUSNO_SHAWL), __ItemId(ITEM_ID_ILLUSION_MORFEUSNO_YUBIWA), __ItemId(ITEM_ID_ILLUSION_MORFEUSNO_UDEWA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_TEGRYONG_MAHITSUZINO_HOKO), __ItemId(ITEM_ID_ILLUSION_TEGRYONG), __CardId(CARD_ID_ENCHANT_MAHITSUZINO_HOKO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAITOKUNO_SHINENTAI_SHOES_VORARE), __ItemId(ITEM_ID_HAITOKUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_VORARE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAITOKUNO_SHINENTAI_SHOES_ESTAR), __ItemId(ITEM_ID_HAITOKUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_ESTAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAITOKUNO_SHINENTAI_SHOES_FALTEZAN), __ItemId(ITEM_ID_HAITOKUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_FALTEZAN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAITOKUNO_SHINENTAI_SHOES_BERNA), __ItemId(ITEM_ID_HAITOKUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_BERNA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HAITOKUNO_SHINENTAI_SHOES_KUMNO_CHIKARA), __ItemId(ITEM_ID_HAITOKUNO_SHINENTAI_SHOES), __CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ILLUSION_MILITARY_BOOTS_ILLUSION_WAR_AXE), __ItemId(ITEM_ID_ILLUSION_MILITARY_BOOTS), __ItemId(ITEM_ID_ILLUSION_WAR_AXE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_MAGICAL_CLOTH_SORCERER_CERIA_CARD), __ItemId(ITEM_ID_MAGICAL_CLOTH), __CardId(CARD_ID_SORCERER_CERIA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOGYOKYU_SET), __ItemId(ITEM_ID_SOGYOKYUNO_MAIL), __ItemId(ITEM_ID_SOGYOKYUNO_SHOES), __ItemId(ITEM_ID_SOGYOKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHIKAKU_ZOFUKU_RING_SHINRINO_KAIHO), __ItemId(ITEM_ID_CHIKAKU_ZOFUKU_RING), __CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ZINBAKYU_SET), __ItemId(ITEM_ID_ZINBAKYUNO_MAIL), __ItemId(ITEM_ID_ZINBAKYUNO_SHOES), __ItemId(ITEM_ID_ZINBAKYUNO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RYUGOROSHINO_CHOKEN_RANDGRIS_CARD), __ItemId(ITEM_ID_RYUGOROSHINO_CHOKEN), __CardId(CARD_ID_RANDGRIS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_ORCLORDNO_YOROI_ORCLORD_CARD), __ItemId(ITEM_ID_ORCLORDNO_YOROI), __CardId(CARD_ID_ORCLORD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_WORUYAFA_CARD), __ItemId(ITEM_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU), __CardId(CARD_ID_WORUYAFA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD), __ItemId(ITEM_ID_KAKUSE_HONOIKAZUCHINOOOKAMI_KUTSU), __CardId(CARD_ID_FUINSARETA_WORUYAFA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_HONOIKAZUCHINOOOKAMI_KUTSU_FUINSARETA_WORUYAFA_CARD), __ItemId(ITEM_ID_HONOIKAZUCHINOOOKAMI_KUTSU), __CardId(CARD_ID_FUINSARETA_WORUYAFA)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_ATK), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_ATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_DEF), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_DEF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_HPR), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_HPR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_MATK), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_MATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_MAXHP), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_MAXHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_MAXSP), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_MAXSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_MDEF), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_MDEF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_SPR), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_B_SPR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_DRAINHP), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_G_DRAINHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_DRAINSP), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_G_DRAINSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_LIFE), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_G_LIFE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_SOUL), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_G_SOUL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_ATTRIBUTE), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_ATTRIBUTE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_CAST_FIXED), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_CAST_FIXED)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_CAST_STAT), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_CAST_STAT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_DELAY), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_DELAY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_FATAL), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_FATAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_HEAL), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_HEAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_PLAYER), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_PLAYER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_SHOOTER), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_SHOOTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_SPEED), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_Q_SPEED)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_FATAL_FLASH), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_FATAL_FLASH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_FIRING_SHOT), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_FIRING_SHOT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_LUCKY_STRIKE), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_LUCKY_STRIKE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_OVER_POWER), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_OVER_POWER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_SPELL_BUSTER), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_SPELL_BUSTER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_X_UNLIMIT_VITAL), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_X_UNLIMIT_VITAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU), __ItemId(ITEM_ID_SOLOMONNO_PENDANT), __CardId(CARD_ID_ENCHANT_ZOFUKU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU), __ItemId(ITEM_ID_SOLOMONNO_PENDANT), __CardId(CARD_ID_ENCHANT_ZOFUKU_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU), __ItemId(ITEM_ID_SOLOMONNO_PENDANT), __CardId(CARD_ID_ENCHANT_ZOFUKU_3)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU), __ItemId(ITEM_ID_SOLOMONNO_PENDANT), __CardId(CARD_ID_ENCHANT_ZOFUKU_4)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SOLOMONNO_PENDANT_ZOFUKU), __ItemId(ITEM_ID_SOLOMONNO_PENDANT), __CardId(CARD_ID_ENCHANT_ZOFUKU_5)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PANAGIANO_OKURIMONO_DAISHIKYO_1), __ItemId(ITEM_ID_PANAGIANO_OKURIMONO), __CardId(CARD_ID_ENCHANT_DAISHIKYO_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PANAGIANO_OKURIMONO_DAISHIKYO_2), __ItemId(ITEM_ID_PANAGIANO_OKURIMONO), __CardId(CARD_ID_ENCHANT_DAISHIKYO_2)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PANAGIANO_OKURIMONO_DAISEIDO_1), __ItemId(ITEM_ID_PANAGIANO_OKURIMONO), __CardId(CARD_ID_ENCHANT_DAISEIDO_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_PANAGIANO_OKURIMONO_CHIYU_1), __ItemId(ITEM_ID_PANAGIANO_OKURIMONO), __CardId(CARD_ID_ENCHANT_CHIYU_1)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_429), __CardId(CARD_ID_306), __CardId(CARD_ID_235)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_430), __CardId(CARD_ID_HATI), __CardId(CARD_ID_HATI_BEBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_431), __CardId(CARD_ID_254), __CardId(CARD_ID_259), __CardId(CARD_ID_356)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_432), __CardId(CARD_ID_229), __CardId(CARD_ID_280), __CardId(CARD_ID_352)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_433), __CardId(CARD_ID_291), __CardId(CARD_ID_234)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_434), __CardId(CARD_ID_DARK_LORD), __CardId(CARD_ID_DARK_ILLUSION)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_435), __CardId(CARD_ID_273), __CardId(CARD_ID_98)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_436), __CardId(CARD_ID_274), __CardId(CARD_ID_73)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_437), __CardId(CARD_ID_245), __CardId(CARD_ID_40)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_438), __CardId(CARD_ID_SKELETON), __CardId(CARD_ID_308)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_439), __CardId(CARD_ID_BIGFOOT), __CardId(CARD_ID_276)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_440), __CardId(CARD_ID_50), __CardId(CARD_ID_344)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_441), __CardId(CARD_ID_125), __CardId(CARD_ID_370), __CardId(CARD_ID_393)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_294), __CardId(CARD_ID_WOLF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_341), __CardId(CARD_ID_88)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_ECLIPSE), __CardId(CARD_ID_LUNATIC)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_MASTERING), __CardId(CARD_ID_64)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_BOCAL), __CardId(CARD_ID_68)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_442), __CardId(CARD_ID_TODO), __CardId(CARD_ID_72)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_448), __CardId(CARD_ID_LUDE), __CardId(CARD_ID_212)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_449), __CardId(CARD_ID_248), __CardId(CARD_ID_247)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_450), __CardId(CARD_ID_223), __CardId(CARD_ID_317), __CardId(CARD_ID_347), __CardId(CARD_ID_354), __CardId(CARD_ID_362)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_451), __CardId(CARD_ID_233), __CardId(CARD_ID_SAMAYOU_MONO), __CardId(CARD_ID_391), __CardId(CARD_ID_395), __CardId(CARD_ID_260)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_JOBSET_ACOLYTE), __CardId(CARD_ID_253), __CardId(CARD_ID_RIDEWORD), __CardId(CARD_ID_307), __CardId(CARD_ID_301), __CardId(CARD_ID_270)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_JOBSET_ARCHER), __CardId(CARD_ID_279), __CardId(CARD_ID_224), __CardId(CARD_ID_340), __CardId(CARD_ID_351), __CardId(CARD_ID_230)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_454), __CardId(CARD_ID_337), __CardId(CARD_ID_358), __CardId(CARD_ID_220), __CardId(CARD_ID_346), __CardId(CARD_ID_379), __CardId(CARD_ID_350)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_455), __CardId(CARD_ID_326), __CardId(CARD_ID_376), __CardId(CARD_ID_281), __CardId(CARD_ID_388), __CardId(CARD_ID_216)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_JOBSET_CRUSADER), __CardId(CARD_ID_190), __CardId(CARD_ID_347), __CardId(CARD_ID_354), __CardId(CARD_ID_362)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_457), __CardId(CARD_ID_413), __CardId(CARD_ID_113), __CardId(CARD_ID_SAMAYOU_MONO), __CardId(CARD_ID_391), __CardId(CARD_ID_260)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_458), __CardId(CARD_ID_253), __CardId(CARD_ID_RIDEWORD), __CardId(CARD_ID_181), __CardId(CARD_ID_270)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_459), __CardId(CARD_ID_279), __CardId(CARD_ID_408), __CardId(CARD_ID_224), __CardId(CARD_ID_340), __CardId(CARD_ID_230)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_460), __CardId(CARD_ID_337), __CardId(CARD_ID_193), __CardId(CARD_ID_346), __CardId(CARD_ID_379), __CardId(CARD_ID_350)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_461), __CardId(CARD_ID_326), __CardId(CARD_ID_175), __CardId(CARD_ID_281), __CardId(CARD_ID_388), __CardId(CARD_ID_104)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_496), __CardId(CARD_ID_485), __CardId(CARD_ID_494)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_733), __CardId(CARD_ID_732), __CardId(CARD_ID_734)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_782), __CardId(CARD_ID_779), __CardId(CARD_ID_781)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_783), __CardId(CARD_ID_780), __CardId(CARD_ID_781)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_786), __CardId(CARD_ID_784), __CardId(CARD_ID_785)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_789), __CardId(CARD_ID_787), __CardId(CARD_ID_788)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_879), __CardId(CARD_ID_878), __CardId(CARD_ID_882)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_881), __CardId(CARD_ID_880), __CardId(CARD_ID_882)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_ID_885), __CardId(CARD_ID_884), __CardId(CARD_ID_883)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_OCHITA_DAISHINKAN_HIBAM_ENCHANT_BOSOSHITA_MARYOKU), __CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [__CardId(CARD_SET_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAM_ENCHANT_BOSOSHITA_MARYOKU), __CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KAIKINA_SOSHOKU_TREE_BEAR_DOLL), __CardId(CARD_ID_KAIKINA_SOSHOKU_TREE), __CardId(CARD_ID_BEAR_DOLL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KOZYOKEIBIINNO_TAMASHI_AKAI_LANTHANUM), __CardId(CARD_ID_KOZYOKEIBIINNO_TAMASHI), __ItemId(ITEM_ID_AKAI_LANTHANUM)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KOZYOKEIBIINNO_TAMASHI_PRESENTGA_NAI_YUREI), __CardId(CARD_ID_KOZYOKEIBIINNO_TAMASHI), __CardId(CARD_ID_PRESENTGA_NAI_YUREI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SUTERARETA_KUMANINGYO_BEAR_DOLL), __CardId(CARD_ID_SUTERARETA_KUMANINGYO), __CardId(CARD_ID_BEAR_DOLL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_CELINE_KIMI_AKURYONO_ITONO_TEBUKURO), __CardId(CARD_ID_CELINE_KIMI), __ItemId(ITEM_ID_AKURYONO_ITONO_TEBUKURO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_CELINE_KIMI_CELINENO_RIBBON), __CardId(CARD_ID_CELINE_KIMI), __ItemId(ITEM_ID_CELINENO_RIBBON)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_CELINE_KIMI_NOBLE_CROSS), __CardId(CARD_ID_CELINE_KIMI), __ItemId(ITEM_ID_NOBLE_CROSS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SATSURIKUNO_MAGAN_MAGANNO_AMDARAIS), __CardId(CARD_ID_SATSURIKUNO_MAGAN), __CardId(CARD_ID_MAGANNO_AMDARAIS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_FUMETSUNO_WINDGHOST_FUMETSUNO_NOROWARETA_KISHI), __CardId(CARD_ID_FUMETSUNO_WINDGHOST), __CardId(CARD_ID_FUMETSUNO_NOROWARETA_KISHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_TAIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN_DARK_HAND), __CardId(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEISHIN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ANSOKUNO_NIEVE_SEIMEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_SEIMEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ANSOKUNO_NIEVE_CHIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_ANSOKUNO_NIEVE_CHIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_HI_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_HI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_MIZU_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_MIZU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_KAZE_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_KAZE), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_CHI_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_CHI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_YAMI_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_YAMI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_NEN_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_NEN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EIGONO_NIEVE_DOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_EIGONO_NIEVE_DOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_MUKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_MUKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_FUSHIKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_FUSHIKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_DOBUTSUKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_DOBUTSUKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_SHOKUBUTSUKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_SHOKUBUTSUKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_KONCHUKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_KONCHUKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_GYOKAIKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_GYOKAIKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_AKUMAKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_AKUMAKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_NINGENKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_NINGENKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_TENSHIKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_TENSHIKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_RYUKEI_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_RYUKEI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_WANRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_WANRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_ZINSOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_ZINSOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_TAIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_CHIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_SHUCHU_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_SHUCHU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_CHINO_NIEVE_KOUN_DARK_HAND), __CardId(CARD_ID_ENCHANT_CHINO_NIEVE_KOUN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZINSOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_SHUCHU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_ZYUKUREN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_WANRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_WANRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_CHIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_TAIRYOKU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_MABO_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_MABO), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_RUNE_KNIGHT_SEIREN_RUNE_KNIGHT_SEIREN_MVP), __CardId(CARD_ID_RUNE_KNIGHT_SEIREN), __CardId(CARD_ID_RUNE_KNIGHT_SEIREN_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_WARLOCK_CATHERINE_WARLOCK_CATHERINE_MVP), __CardId(CARD_ID_WARLOCK_CATHERINE), __CardId(CARD_ID_WARLOCK_CATHERINE_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_RANGER_CECIL_RANGER_CECIL_MVP), __CardId(CARD_ID_RANGER_CECIL), __CardId(CARD_ID_RANGER_CECIL_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ARCH_BISHOP_MARGARETTE_ARCH_BISHOP_MARGARETTE_MVP), __CardId(CARD_ID_ARCH_BISHOP_MARGARETTE), __CardId(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_GUILLOTINE_CROSS_ELEMES_GUILLOTINE_CROSS_ELEMES_MVP), __CardId(CARD_ID_GUILLOTINE_CROSS_ELEMES), __CardId(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_MECHANIC_HAWARD_MECHANIC_HAWARD_MVP), __CardId(CARD_ID_MECHANIC_HAWARD), __CardId(CARD_ID_MECHANIC_HAWARD_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ROYAL_GUARD_RANDEL_ROYAL_GUARD_RANDEL_MVP), __CardId(CARD_ID_ROYAL_GUARD_RANDEL), __CardId(CARD_ID_ROYAL_GUARD_RANDEL_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SORCERER_CERIA_SORCERER_CERIA_MVP), __CardId(CARD_ID_SORCERER_CERIA), __CardId(CARD_ID_SORCERER_CERIA_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_MINSTREL_ARFOSIO_MINSTREL_ARFOSIO_MVP), __CardId(CARD_ID_MINSTREL_ARFOSIO), __CardId(CARD_ID_MINSTREL_ARFOSIO_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_WANDERER_TRENTINI_WANDERER_TRENTINI_MVP), __CardId(CARD_ID_WANDERER_TRENTINI), __CardId(CARD_ID_WANDERER_TRENTINI_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_MINSTREL_ARFOSIO_WANDERER_TRENTINI), __CardId(CARD_ID_MINSTREL_ARFOSIO), __CardId(CARD_ID_WANDERER_TRENTINI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SHURA_CHENG_SHURA_CHENG_MVP), __CardId(CARD_ID_SHURA_CHENG), __CardId(CARD_ID_SHURA_CHENG_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SHADOW_CHASER_GARTY_SHADOW_CHASER_GARTY_MVP), __CardId(CARD_ID_SHADOW_CHASER_GARTY), __CardId(CARD_ID_SHADOW_CHASER_GARTY_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_GENETIC_EMUR_GENETIC_EMUR_MVP), __CardId(CARD_ID_GENETIC_EMUR), __CardId(CARD_ID_GENETIC_EMUR_MVP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SMOG_SHURIKATA_VERUSGEAR), __CardId(CARD_ID_SMOG), __CardId(CARD_ID_SHURIKATA_VERUSGEAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_SMOG_TANSAKATA_VERUSGEAR), __CardId(CARD_ID_SMOG), __CardId(CARD_ID_TANSAKATA_VERUSGEAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_DR815_GC109), __CardId(CARD_ID_DR815), __CardId(CARD_ID_GC109)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_MEICHU_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_MEICHU), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_KAIHI_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_KAIHI), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_MEIYONO_NIEVE_KOUN_DARK_HAND), __CardId(CARD_ID_ENCHANT_MEIYONO_NIEVE_KOUN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_GIKO_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_GIKO), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_SHINO_NIEVE_KOUN_DARK_HAND), __CardId(CARD_ID_ENCHANT_SHINO_NIEVE_KOUN), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_FACEWORMNO_YOCHU_FACEWORMNO_TAMAGO), __CardId(CARD_ID_FACEWORMNO_YOCHU), __CardId(CARD_ID_FACEWORMNO_TAMAGO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_PERE_KISSME_PERE_SINGING_PERE_SWING_PERE), __CardId(CARD_ID_PERE_KISSME_PERE), __CardId(CARD_ID_SINGING_PERE_SWING_PERE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_KIZUNO_NIEVE_PLAYER_DARK_HAND), __CardId(CARD_ID_ENCHANT_KIZUNO_NIEVE_PLAYER), __ItemId(ITEM_ID_DARK_HAND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_FUKITSUNA_ASSALT_TURTLE_FUKITSUNA_FREEZE_TURTLE), __CardId(CARD_ID_FUKITSUNA_ASSALT_TURTLE), __CardId(CARD_ID_FUKITSUNA_FREEZE_TURTLE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_EMPEROR), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_EMPEROR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HOUO), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_HOUO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_LOVERS), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_LOVERS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_CHARIOT), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_CHARIOT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_POWER), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_POWER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HARMIT), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_HARMIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_JUSTICE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_JUSTICE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_DEATH), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_DEATH)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_SESSEI), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_SESSEI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_DEVIL), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_DEVIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_STAR), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_STAR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_MOON), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_MOON)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_MAZINNO_SHITO_SHINAIM_MAZINNO_SHITO_AHAT), __CardId(CARD_ID_MAZINNO_SHITO_SHINAIM), __CardId(CARD_ID_MAZINNO_SHITO_AHAT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_FOOL), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_FOOL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_WHEEL_OF_FORTUNE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_WHEEL_OF_FORTUNE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HANGED_MAN), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_HANGED_MAN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_WORLD), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_WORLD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_G_DRAINSP_ENERGY_SHUGORYU), __CardId(CARD_ID_ENCHANT_G_DRAINSP), __CardId(CARD_ID_ENCHANT_ENERGY_SHUGORYU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_R48_85_BESTIA_KIEL_D01), __CardId(CARD_ID_R48_85_BESTIA), __CardId(CARD_ID_KIEL_D01)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_BLACK_KANEIRY_SET), __CardId(CARD_ID_BLACK_KANEIRY), __CardId(CARD_ID_HIPIA_SNIKI), __CardId(CARD_ID_BILLY_COSRLEASE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_OLDOR_SET), __CardId(CARD_ID_OLDOR), __CardId(CARD_ID_FEMON), __CardId(CARD_ID_BLUTO_HAZE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KUROMA_SET), __CardId(CARD_ID_KUROMA), __CardId(CARD_ID_IFODOS), __CardId(CARD_ID_LECHENIE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_FAY_CANAVIAN_SET), __CardId(CARD_ID_FAY_CANAVIAN), __CardId(CARD_ID_YUMEHIME)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_DIO_ANEMOS_SET), __CardId(CARD_ID_DIO_ANEMOS), __CardId(CARD_ID_ARUHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_JUE_SET), __CardId(CARD_ID_JUE), __CardId(CARD_ID_DEWAI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KONTONNO_MANTICE_KONTONNO_KILLER_MANTICE), __CardId(CARD_ID_KONTONNO_MANTICE), __CardId(CARD_ID_KONTONNO_KILLER_MANTICE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_ASPD), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_ASPD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_ATK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_ATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_AVOID), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_AVOID)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_DEF), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_DEF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_FLEE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_FLEE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_FROZEN), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_FROZEN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_HIT), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_HIT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_INT), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_INT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_MATK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_MATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_MAXHP), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_MAXHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_MAXSP), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_MAXSP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_MDEF), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_MDEF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_STR), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_STR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_A_TOLERANCE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_A_TOLERANCE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_C_HPR), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_C_HPR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_C_LIFE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_C_LIFE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_C_SOUL), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_C_SOUL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_C_SPR), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_C_SPR)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_E_FIRE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_E_FIRE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_E_GROUND), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_E_GROUND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_E_WATER), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_E_WATER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_E_WIND), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_E_WIND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_FIRE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_R_FIRE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_GROUND), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_R_GROUND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_WATER), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_R_WATER)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_WIND), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_R_WIND)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_ATK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_ATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_AVOID), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_AVOID)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_CRI), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_CRI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_MATK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_MATK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_MAXHP), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_MAXHP)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_S_QUICK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_S_QUICK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_CASTFIXED), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_CASTFIXED)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_CLAIRVOYANCE), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_CLAIRVOYANCE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_IMMORTAL), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_IMMORTAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_KILLGAIN), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_KILLGAIN)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_KNOCKBACK), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_KNOCKBACK)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_NODISPELL), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_NODISPELL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_EXTREME_Z_REINCARNATION), __CardId(CARD_ID_ENCHANT_EXTREME), __CardId(CARD_ID_ENCHANT_Z_REINCARNATION)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_KUROMUZYO_BO_KAKUSEI_ROBE), __ItemId(ITEM_ID_KUROMUZYO_BO), __ItemId(ITEM_ID_KAKUSEI_ROBE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GOYUMUSONO_TSURANUKI_GOYUMUSONO_MONBOSHI), __ItemId(ITEM_ID_GOYUMUSONO_TSURANUKI), __ItemId(ITEM_ID_GOYUMUSONO_MONBOSHI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_CHIMAZYUNO_HIFU_BOCAL_CARD), __ItemId(ITEM_ID_CHIMAZYUNO_HIFU), __CardId(CARD_ID_BOCAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AOI_HONONO_TSUE_ABYSS_GHOST_CARD), __ItemId(ITEM_ID_AOI_HONONO_TSUE), __CardId(CARD_ID_ICE_GHOST)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_AOI_HONONO_TSUE_ABYSS_GHOST_CARD), __ItemId(ITEM_ID_AOI_HONONO_TSUE), __CardId(CARD_ID_FLAME_GHOST)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAVA_LEATHER_ROBE_SET), __ItemId(ITEM_ID_RAVA_LEATHER_ROBE), __ItemId(ITEM_ID_RAVA_LEATHER_HOOD), __ItemId(ITEM_ID_RAVA_LEATHER_SANDAL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAVA_LEATHER_SUIT_SET), __ItemId(ITEM_ID_RAVA_LEATHER_SUIT), __ItemId(ITEM_ID_RAVA_LEATHER_MUFFLER), __ItemId(ITEM_ID_RAVA_LEATHER_SHOES)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RAVA_LEATHER_ARMOR_SET), __ItemId(ITEM_ID_RAVA_LEATHER_ARMOR), __ItemId(ITEM_ID_RAVA_LEATHER_MANT), __ItemId(ITEM_ID_RAVA_LEATHER_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_GOKETSU), __ItemId(ITEM_ID_SHINRA_BANSHONO_YUBIWA), __CardId(CARD_ID_ENCHANT_GOKETSU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_SHINO_YOKUDO), __ItemId(ITEM_ID_SHINRA_BANSHONO_YUBIWA), __CardId(CARD_ID_ENCHANT_SHINO_YOKUDO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_SHINRINO_KAIHO), __ItemId(ITEM_ID_SHINRA_BANSHONO_YUBIWA), __CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINRA_BANSHONO_YUBIWA_HAO), __ItemId(ITEM_ID_SHINRA_BANSHONO_YUBIWA), __CardId(CARD_ID_ENCHANT_HAO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BOINO_MUFFLER_ARASHINO_YUMI), __ItemId(ITEM_ID_BOINO_MUFFLER), __ItemId(ITEM_ID_ARASHINO_YUMI)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_BOINO_MUFFLER_SCARABA_HIGHHEEL_ELVEN_BOW), __ItemId(ITEM_ID_BOINO_MUFFLER), __ItemId(ITEM_ID_SCARABA_HIGHHEEL), __ItemId(ITEM_ID_ELVEN_BOW)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_POWER_BOOST), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_T_POWER_BOOST)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_MAGIC_BOOST), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_T_MAGIC_BOOST)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ASSAULT), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_T_ASSAULT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_T_ELECTRICITY), __ItemId(ITEM_ID_RUNAWAY_ACCELERATOR), __CardId(CARD_ID_ENCHANT_T_ELECTRICITY)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OZYANO_MAIL_OZYANO_MANT_OZYANO_BOOTS), __ItemId(ITEM_ID_OZYANO_MAIL), __ItemId(ITEM_ID_OZYANO_MANT), __ItemId(ITEM_ID_OZYANO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OZYANO_YUBIWA_OZYANO_MAIL), __ItemId(ITEM_ID_OZYANO_YUBIWA), __ItemId(ITEM_ID_OZYANO_MAIL)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OZYANO_YUBIWA_OZYANO_MANT), __ItemId(ITEM_ID_OZYANO_YUBIWA), __ItemId(ITEM_ID_OZYANO_MANT)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_OZYANO_YUBIWA_OZYANO_BOOTS), __ItemId(ITEM_ID_OZYANO_YUBIWA), __ItemId(ITEM_ID_OZYANO_BOOTS)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_JUSTICE_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_JUSTICE_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_STAR_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_STAR_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_SESSEI_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_SESSEI_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_CHARIOT_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_CHARIOT_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_DEATH_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_DEATH_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_LOVERS_REVERSE), __CardId(CARD_ID_ENCHANT_ARCANA), __CardId(CARD_ID_ARCANA_LOVERS_REVERSE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_TAKANO_MENO_KUBIKAZARI_OWASHINO_GANKO), __ItemId(ITEM_ID_TAKANO_MENO_KUBIKAZARI), __CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__CardId(CARD_SET_ID_KOO_GLOZA_OWASHINO_GANKO), __CardId(CARD_ID_KOO_GLOZA), __CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SEISHIN_KAKUCHO_RING_SHINRINO_KAIHO), __ItemId(ITEM_ID_SEISHIN_KAKUCHO_RING), __CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENMETSUNO_SHINENTAI_SHOES_GRAVITATION_STUFF), __ItemId(ITEM_ID_GENMETSUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_GRAVITATION_STUFF)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENMETSUNO_SHINENTAI_SHOES_PSYCHIC_SPEAR_ROD), __ItemId(ITEM_ID_GENMETSUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_PSYCHIC_SPEAR_ROD)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENMETSUNO_SHINENTAI_SHOES_STUFF_OF_MIRACLE), __ItemId(ITEM_ID_GENMETSUNO_SHINENTAI_SHOES), __ItemId(ITEM_ID_STUFF_OF_MIRACLE)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_GENMETSUNO_SHINENTAI_SHOES_BOSOSHITA_MARYOKU), __ItemId(ITEM_ID_GENMETSUNO_SHINENTAI_SHOES), __CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [__ItemId(ITEM_SET_ID_SHINPANNO_TENBIN_SHINRINO_KAIHO), __ItemId(ITEM_ID_SHINPANNO_TENBIN), __CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SENKO_KOSOKU),
		__CardId(CARD_ID_ENCHANT_SENKO),
		__CardId(CARD_ID_ENCHANT_KOSOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KYOGO_KUMANO_CHIKARA),
		__CardId(CARD_ID_ENCHANT_KYOGO),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_TENKYU_OWASHINO_GANKO),
		__CardId(CARD_ID_ENCHANT_TENKYU),
		__CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINREKI_BOSOSHITA_MARYOKU),
		__CardId(CARD_ID_ENCHANT_SHINREKI),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOTAI_KOGAI),
		__CardId(CARD_ID_ENCHANT_GOTAI),
		__CardId(CARD_ID_ENCHANT_KOGAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HAKUUN_KOUNNA_HI),
		__CardId(CARD_ID_ENCHANT_HAKUUN),
		__CardId(CARD_ID_ENCHANT_KOUUNNA_HI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MUKIRYOKUNO_SHINENTAI_SHOES_KOYOSUI),
		__ItemId(ITEM_ID_MUKIRYOKUNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_KOYOSUI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MUKIRYOKUNO_SHINENTAI_SHOES_TOSHINNO_BANTAGE),
		__ItemId(ITEM_ID_MUKIRYOKUNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_TOSHINNO_BANTAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MUKIRYOKUNO_SHINENTAI_SHOES_MORYU_TOKO),
		__ItemId(ITEM_ID_MUKIRYOKUNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_MORYU_TOKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MUKIRYOKUNO_SHINENTAI_SHOES_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_MUKIRYOKUNO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KOKUO_SCHMIDTNO_SEIFUKU_MANT),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_SEIFUKU),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_KTULLANUX),
		__ItemId(ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO),
		__CardId(CARD_ID_KTULLANUX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX),
		__ItemId(ITEM_ID_KAKUSEI_OKAMINOKAMINO_HAKOROMO),
		__CardId(CARD_ID_FUINSARETA_KTULLANUX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_OKAMINOKAMINO_HAKOROMO_FUINSARETA_KTULLANUX),
		__ItemId(ITEM_ID_OKAMINOKAMINO_HAKOROMO),
		__CardId(CARD_ID_FUINSARETA_KTULLANUX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TSUIGEKISHANO_RING_KOSOKU),
		__ItemId(ITEM_ID_TSUIGEKISHANO_RING),
		__CardId(CARD_ID_ENCHANT_KOSOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_MAGICAL_SET),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_HEART_WHIP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_MAGICAL_SET),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_BLACK_CIRCLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_PHYSICAL_SET),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_ATNTIC_CHERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_PHYSICAL_SET),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_SCARLET_RIBBON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_OWASHINO_GANKO),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_YUZYUFUDANNO_SHINENTAI_SHOES_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_YUZYUFUDANNO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_RING_OF_PAZUZU_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_RING_OF_PAZUZU),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GOMANNO_SHINENTAI_SHOES_ARGIAN_BLANCO),
		__ItemId(ITEM_ID_GOMANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_ARGIAN_BLANCO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOMANNO_SHINENTAI_SHOES_FORT_RAGE),
		__ItemId(ITEM_ID_GOMANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_FORT_RAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOMANNO_SHINENTAI_SHOES_HARBEST),
		__ItemId(ITEM_ID_GOMANNO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_HARBEST)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GOMANNO_SHINENTAI_SHOES_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_GOMANNO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FLAME_BIRD),
		__ItemId(ITEM_ID_FUSHICHONO_NEKOZYARASHI),
		__ItemId(ITEM_ID_FLAME_BIRD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_MUTANT_DRAGON_CARD),
		__ItemId(ITEM_ID_FUSHICHONO_NEKOZYARASHI),
		__CardId(CARD_ID_MUTANT_DRAGON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_BOITATA_CARD),
		__ItemId(ITEM_ID_FUSHICHONO_NEKOZYARASHI),
		__CardId(CARD_ID_BOITATA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAKARINO_TATE_ALICE_CARD),
		__ItemId(ITEM_ID_MAKARINO_TATE),
		__CardId(CARD_ID_ALICE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAKARINO_TATE_GASTER_CARD),
		__ItemId(ITEM_ID_MAKARINO_TATE),
		__CardId(CARD_ID_GASTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAKARINO_TATE_OLDOR_CARD_SET),
		__ItemId(ITEM_ID_MAKARINO_TATE),
		__CardId(CARD_ID_OLDOR),
		__CardId(CARD_ID_FEMON),
		__CardId(CARD_ID_BLUTO_HAZE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_EMPEROR_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_EMPEROR_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_POWER_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_POWER_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_DEVIL_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_DEVIL_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_MOON_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_MOON_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_WHEEL_OF_FORTUNE_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_WHEEL_OF_FORTUNE_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_WORLD_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_WORLD_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_SOHION),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_SOHION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_LOLA),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_LOLA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_ELVIRA),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_ELVIRA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_RUDO),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_RUDO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_SHOGUN_DAEHYON),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_SHOGUN_DAEHYON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_KYOSHINZYA_PYURIEL),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_KYOSHINZYA_PYURIEL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_MUZIHINA_GIOIA),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_MUZIHINA_GIOIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_MOZYANO_SHUGOSHA_KADES),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_MOZYANO_SHUGOSHA_KADES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_KOO_GLOZA_OWASHINO_GANKO),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINSONO_O_SHINSONO_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_SHINSONO_O),
		__CardId(CARD_ID_SHINSONO_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GATE_OF_NEZAR_WORLD_FENRIR_CARD),
		__ItemId(ITEM_ID_GATE_OF_NEZAR_WORLD),
		__CardId(CARD_ID_FENRIR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KACCHU_TSURANUKI),
		__ItemId(ITEM_ID_GOYUMUSONO_KACCHU),
		__ItemId(ITEM_ID_GOYUMUSONO_TSURANUKI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KACCHU_MONBOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_KACCHU),
		__ItemId(ITEM_ID_GOYUMUSONO_MONBOSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_AC_B44_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_HR_S55_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_MH_P89_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_ULTIO_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_ELECTRIC_FOX_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_CANNON_RAPIER_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_KOKUSHOKU_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_CIRCUIT_BOARD_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_SUFEAL_HOLE_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_VIRTUAL_BOW_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_BURNING_KNUCKLE_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_BEAM_CRAYMORE_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_BOOSTER_LANCE_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_BLASTY_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_MOISURA_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_COL_CORE_HEADPHONE_OS_ARMS),
		__ItemId(ITEM_ID_COL_CORE_HEADPHONE),
		__ItemId(ITEM_ID_RUTIS_STICK_OS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SAMAYOUMONONO_HAORI_KASA_PET),
		__ItemId(ITEM_ID_SAMAYOUMONONO_HAORI),
		__ItemId(ITEM_ID_1273),
		__PetId(PET_ID_SAMAYOUMONO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GERHERT_VON_DEVILCH_PET),
		__ItemId(ITEM_ID_GERHERT_VON_DEVILCH),
		__PetId(PET_ID_DEVILCH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAKCIMILIAN_VON_BEBE_PET),
		__ItemId(ITEM_ID_MAKCIMILIAN_VON_BEBE),
		__PetId(PET_ID_SAVAGE_BEBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ELNST_VON_VOLF_PET),
		__ItemId(ITEM_ID_ELNST_VON_VOLF),
		__PetId(PET_ID_KO_DESSERT_WOLF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ICE_VON_FREEZINGER_PET),
		__ItemId(ITEM_ID_ICE_VON_FREEZINGER),
		__PetId(PET_ID_ALICE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_STAHL_VON_KAISER_61_PET),
		__ItemId(ITEM_ID_STAHL_VON_KAISER_61),
		__PetId(PET_ID_JIRTUS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_DEVILCH_HEADPHONE_PET),
		__ItemId(ITEM_ID_DEVILCH_HEADPHONE),
		__PetId(PET_ID_DEVILCH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MIZUMIZUSHI_DAIDAI_PET),
		__ItemId(ITEM_ID_MIZUMIZUSHI_DAIDAI),
		__PetId(PET_ID_MOCHIRING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TSUKIUSAGINO_BOSHI_PET),
		__ItemId(ITEM_ID_TSUKIUSAGINO_BOSHI),
		__PetId(PET_ID_MOCHIRING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_AGUED_FIRO),
		__ItemId(ITEM_ID_SAISENO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_AGUED_FIRO),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_JUDGEMENT_SLASHER),
		__ItemId(ITEM_ID_SAISENO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_JUDGEMENT_SLASHER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_RIPPER_CROSS),
		__ItemId(ITEM_ID_SAISENO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_RIPPER_CROSS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_REPENT_SLASHER),
		__ItemId(ITEM_ID_SAISENO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_REPENT_SLASHER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SAISENO_SHINENTAI_SHOES_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_SAISENO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_POLLUX_SET),
		__ItemId(ITEM_ID_POLLUX_ROBE),
		__ItemId(ITEM_ID_POLLUX_MANT),
		__ItemId(ITEM_ID_POLLUX_SHOES),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_PROCYON_SET),
		__ItemId(ITEM_ID_PROCYON_ROBE),
		__ItemId(ITEM_ID_PROCYON_MANT),
		__ItemId(ITEM_ID_PROCYON_SHOES),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_DARKLORD_CARD),
		__ItemId(ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS),
		__CardId(CARD_ID_DARK_LORD),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD),
		__ItemId(ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS),
		__CardId(CARD_ID_FUINSARETA_DARK_LORD),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_KAKUSE_TOKUSHU_KANKYO_KATSUDOYO_BOOTS),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_TOKUSHU_KANKYO_KATSUDOYO_BOOTS_FUINSARETA_DARKLORD_CARD),
		__ItemId(ITEM_ID_TOKUSHUKANNKYO_KATSUDOYO_BOOTS),
		__CardId(CARD_ID_FUINSARETA_DARK_LORD),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_FUINSARETA_DARKLORD_DARK_ILLUSION),
		__CardId(CARD_ID_FUINSARETA_DARK_LORD),
		__CardId(CARD_ID_DARK_ILLUSION),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAMARAGAN_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_MAMARAGAN),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_A_REFLECT),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_A_REFLECT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_A_SP_COST),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_A_SP_COST)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_STR),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_STR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_AGI),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_AGI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_VIT),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_VIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_INT),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_INT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_DEX),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_DEX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_B_LUK),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_B_LUK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_E_DARKNESS),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_E_DARKNESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_E_POISON),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_E_POISON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_E_SAINT),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_E_SAINT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_E_UNDEAD),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_E_UNDEAD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_CRI),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_G_CRI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_G_GUIDED),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_G_GUIDED)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_CONFUSE),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_CONFUSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_CURSE),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_CURSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_FEAR),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_FEAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_IGNITION),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_IGNITION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_PETRIFACTION),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_PETRIFACTION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_SILENCE),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_SILENCE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_P_SLEEP),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_P_SLEEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_BOSS),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_Q_BOSS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_NORMAL),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_Q_NORMAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_FATAL_FLASH),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_FATAL_FLASH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_FIRING_SHOT),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_FIRING_SHOT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_LUCKY_STRIKE),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_LUCKY_STRIKE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_OVER_POWER),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_OVER_POWER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_SPELL_BUSTER),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_SPELL_BUSTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_S_UNLIMIT_VITAL),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_S_UNLIMIT_VITAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_DARKNESS),
		__CardId(CARD_ID_ENCHANT_EXTREME),
		__CardId(CARD_ID_ENCHANT_R_DARKNESS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_SAINT),
		__CardId(CARD_ID_ENCHANT_EXTREME),
		__CardId(CARD_ID_ENCHANT_R_SAINT),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_TELEKINESIS),
		__CardId(CARD_ID_ENCHANT_EXTREME),
		__CardId(CARD_ID_ENCHANT_R_TELEKINESIS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXTREME_R_UNDEAD),
		__CardId(CARD_ID_ENCHANT_EXTREME),
		__CardId(CARD_ID_ENCHANT_R_UNDEAD),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_KENKYU_ZYOSHU_ZIDO_NINGYO_TOKUSE_ALNOLDI),
		__CardId(CARD_ID_KENKYU_ZYOSHU_ZIDO_NINGYO),
		__CardId(CARD_ID_TOKUSE_ALNOLDI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_KENKYU_ZYOSHU_ZIDO_NINGYO_DRY_RAFFLESIA),
		__CardId(CARD_ID_KENKYU_ZYOSHU_ZIDO_NINGYO),
		__CardId(CARD_ID_DRY_RAFFLESIA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_BLUE_ARIES_RED_ARIES),
		__CardId(CARD_ID_BLUE_ARIES),
		__CardId(CARD_ID_RED_ARIES),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SCALL_RING_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_SCALL_RING),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_STR),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_STR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_AGI),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_AGI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_VIT),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_VIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_INT),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_INT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_DEX),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_DEX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HAURVATAT_SPECIAL_LUK),
		__ItemId(ITEM_ID_HAURVATAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_LUK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_IGNISEM_CENIA_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_IGNISEM_CENIA_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_ELEMES_GAIL_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ELEMES_GAIL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_CATHERINE_KARON_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_CATHERINE_KARON_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_SEIREN_VIENSER_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SEIREN_VIENSER_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_CECIL_DIMON_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_CECIL_DIMON_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_HAWARD_ALTIZEN_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_HAWARD_ALTIZEN_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_MARGARETTE_SORIN_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MARGARETTE_SORIN_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_ARFOSIO_BASIL_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ARFOSIO_BASIL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_EMUR_PURAMEL_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_EMUR_PURAMEL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_GERTIE_UH_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GERTIE_UH_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_CERIA_ARDE_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_CERIA_ARDE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_CHENG_RIU_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_CHENG_RIU_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_TRENTINI_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_TRENTINI_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_RANDEL_RORENCE_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RANDEL_RORENCE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_ARCH_BISHOP_MARGARETTE_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_WARLOCK_CATHERINE_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WARLOCK_CATHERINE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_GUILLOTINE_CROSS_ELEMES_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_MECHANIC_HAWARD_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MECHANIC_HAWARD_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_RUNE_KNIGHT_SEIREN_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RUNE_KNIGHT_SEIREN_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_RANGER_CECIL_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RANGER_CECIL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_GENETIC_EMUR_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GENETIC_EMUR_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_SHADOW_CHASER_GARTY_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHADOW_CHASER_GARTY_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_SHURA_CHENG_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHURA_CHENG_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_SORCERER_CERIA_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SORCERER_CERIA_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_MINSTREL_ARFOSIO_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MINSTREL_ARFOSIO_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_ROYAL_GUARD_RANDEL_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ROYAL_GUARD_RANDEL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_WANDERER_TRENTINI_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WANDERER_TRENTINI_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WARLOCK_CATHERINE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MECHANIC_HAWARD_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RUNE_KNIGHT_SEIREN_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RANGER_CECIL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GENETIC_EMUR_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHADOW_CHASER_GARTY_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHURA_CHENG_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SORCERER_CERIA_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MINSTREL_ARFOSIO_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ROYAL_GUARD_RANDEL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_EIYU_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WANDERER_TRENTINI_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ARCH_BISHOP_MARGARETTE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WARLOCK_CATHERINE_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GUILLOTINE_CROSS_ELEMES_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MECHANIC_HAWARD_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RUNE_KNIGHT_SEIREN_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_RANGER_CECIL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_GENETIC_EMUR_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHADOW_CHASER_GARTY_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SHURA_CHENG_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_SORCERER_CERIA_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_MINSTREL_ARFOSIO_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_ROYAL_GUARD_RANDEL_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_SATSUINO_ONNEN_SEITAI_MVP_DISEFFECT),
		__ItemId(ITEM_ID_SURVIVAL_MANT),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_WANDERER_TRENTINI_MVP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FAIRY_OF_EDEN_GARDEN_OF_EDEN),
		__ItemId(ITEM_ID_FAIRY_OF_EDEN),
		__ItemId(ITEM_ID_GARDEN_OF_EDEN),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FAIRY_OF_EDEN_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_FAIRY_OF_EDEN),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FAIRY_OF_EDEN_SHINRINO_MAHOTSUKAI),
		__ItemId(ITEM_ID_FAIRY_OF_EDEN),
		__CardId(CARD_ID_SHINRINO_MAHOTSUKAI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_UORYAFA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_EDOGA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ORC_HERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_CHIEL_D01)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_SWEET_DROPPS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_PEKUSOZIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_FURIONI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_STATUS_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_DARK_LORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ANGELING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_NIFL_LEON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_SUTERARETA_KUMA_NINGYO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ANCIENT_MOMMY)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_SHINENNO_KISHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_SIZE_ALL_10),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_KOKA_NIGHTMARE_TERROR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ELLIOT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ELLISA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_ELLISEL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_OSENSARETA_SAMAYOUMONO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_CAT_NINE_TAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_CHIBI_KANRISHA_ALPHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_HIORC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_METARURA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_MASTERING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_HODOREMLIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_GROUND_DELETER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WANDER_EGG_BASKET_DEF_150),
		__ItemId(ITEM_ID_WANDER_EGG_BASKET),
		__PetId(PET_ID_DARK_ILLUSION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI),
		__ItemId(ITEM_ID_CRYSTAL_BLADE_NECKLACE),
		__CardId(CARD_ID_ENCHANT_KYOGEKI_1),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI),
		__ItemId(ITEM_ID_CRYSTAL_BLADE_NECKLACE),
		__CardId(CARD_ID_ENCHANT_KYOGEKI_2),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI),
		__ItemId(ITEM_ID_CRYSTAL_BLADE_NECKLACE),
		__CardId(CARD_ID_ENCHANT_KYOGEKI_3),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI),
		__ItemId(ITEM_ID_CRYSTAL_BLADE_NECKLACE),
		__CardId(CARD_ID_ENCHANT_KYOGEKI_4),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_CRYSTAL_BLADE_NECKLACE_KYOGEKI),
		__ItemId(ITEM_ID_CRYSTAL_BLADE_NECKLACE),
		__CardId(CARD_ID_ENCHANT_KYOGEKI_5),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_NICHTS_DEVILRING),
		__CardId(CARD_ID_ENCHANT_NICHTS),
		__CardId(CARD_ID_DEVILRING),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAITEI_SHINDENNO_ZAIHO_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_KAITEI_SHINDENNO_ZAIHO),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAITEI_SHINDENNO_ZAIHO_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_KAITEI_SHINDENNO_ZAIHO_CARD_ENCHANTABLE),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_RING_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_FUSHICHONO_RING),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_RING_KUMANO_CHIKARA_IMPERIAL_ACCESSARY),
		__ItemId(ITEM_ID_FUSHICHONO_RING),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_IMPERIAL_GLOVE),
		__ItemId(ITEM_ID_IMPERIAL_FEATHER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_DAKITSUKI_SYAMNEKO_SENZAI_KAIHO_SUMMONER),
		__ItemId(ITEM_ID_DAKITSUKI_SYAMNEKO),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_SUMMONER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SHITSUBONO_SHINENTAI_SHOES_CRYMSON_ROSE_STICK),
		__ItemId(ITEM_ID_SHITSUBONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_CRYMSON_ROSE_STICK),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHITSUBONO_SHINENTAI_SHOES_SUHAINO_TSUE),
		__ItemId(ITEM_ID_SHITSUBONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_SUHAINO_TSUE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHITSUBONO_SHINENTAI_SHOES_DUST_GRAVE),
		__ItemId(ITEM_ID_SHITSUBONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_DUST_GRAVE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHITSUBONO_SHINENTAI_SHOES_POENITENTIA),
		__ItemId(ITEM_ID_SHITSUBONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_POENITENTIA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHITSUBONO_SHINENTAI_SHOES_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_SHITSUBONO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_BOSONO_SHINENTAI_SHOES_ENGINE_PILE_VANKER),
		__ItemId(ITEM_ID_BOSONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_ENGINE_PILE_VANKER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_BOSONO_SHINENTAI_SHOES_GOLDEN_RENCH),
		__ItemId(ITEM_ID_BOSONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_GOLDEN_RENCH),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_BOSONO_SHINENTAI_SHOES_MAXY_SPANA),
		__ItemId(ITEM_ID_BOSONO_SHINENTAI_SHOES),
		__ItemId(ITEM_ID_MAXY_SPANA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_BOSONO_SHINENTAI_SHOES_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_BOSONO_SHINENTAI_SHOES),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ANULUS_IRA_HAO),
		__ItemId(ITEM_ID_ANULUS_IRA),
		__CardId(CARD_ID_ENCHANT_HAO),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ZYASPER_RING_KUMANO_CHIKARA),
		__ItemId(ITEM_ID_ZYASPER_RING),
		__CardId(CARD_ID_ENCHANT_KUMANO_CHIKARA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WHITE_LILIUM_ROBE_AMENHOTEP),
		__ItemId(ITEM_ID_WHITE_LILIUM_ROBE),
		__CardId(CARD_ID_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_WHITE_LILIUM_ROBE_AMENHOTEP),
		__ItemId(ITEM_ID_KAKUSE_WHITE_LILIUM_ROBE),
		__CardId(CARD_ID_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SUHAINO_YUBIWA_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_SUHAINO_YUBIWA),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_RUNAWAY_ACCELERATOR_Q_RANGE),
		__ItemId(ITEM_ID_RUNAWAY_ACCELERATOR),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_Q_RANGE_YOZINBONO_SCARF),
		__ItemId(ITEM_ID_YOZINBONO_SCARF),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_Q_RANGE_SHIKKOSHANO_MANT),
		__ItemId(ITEM_ID_SHIKKOSHANO_MANT),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_Q_RANGE_YOICHINO_KATAKAE),
		__ItemId(ITEM_ID_YOICHINO_KATAKAE),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_Q_RANGE_ILLUSION_MUFFLER),
		__ItemId(ITEM_ID_ILLUSION_MUFFLER),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_Q_RANGE_SNIPING_VEIL),
		__ItemId(ITEM_ID_SNIPING_VEIL),
		__CardId(CARD_ID_ENCHANT_Q_RANGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_Q_RANGE_HORN),
		__CardId(CARD_ID_ENCHANT_Q_RANGE),
		__CardId(CARD_ID_HORN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ALPHA_CORE_SHINRA_BANSHO),
		__ItemId(ITEM_ID_ALPHA_CORE),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ALPHA_CORE_SHINRA_BANSHO),
		__ItemId(ITEM_ID_ALPHA_CORE_CARD_ENCHANTABLE),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRA_BANSHO_SHINO_YOKUDO),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO),
		__CardId(CARD_ID_ENCHANT_SHINO_YOKUDO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRA_BANSHO_SHINRINO_KAIHO),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRA_BANSHO_GOKETSU),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRA_BANSHO_HAO),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO),
		__CardId(CARD_ID_ENCHANT_HAO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ZYUSATSUNO_AMDARAIS_DARAKUNO_MAGAN),
		__CardId(CARD_ID_ZYUSATSUNO_AMDARAIS),
		__CardId(CARD_ID_DARAKUNO_MAGAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TATSUINUNO_UDEWA_GOKETSU),
		__ItemId(ITEM_ID_TATSUINUNO_UDEWA),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_METAL_PICK_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_METAL_PICK),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SAITANNO_HOKAN_LAFINE_SHIELD),
		__ItemId(ITEM_ID_SAITANNO_HOKAN),
		__ItemId(ITEM_ID_LAFINE_SHIELD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_MAZYUNO_ARMORS),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_MAIL),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_MANT),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA),
		__ItemId(ITEM_ID_KAKUSE_SHINENNO_ONO_YUBIWA),
		__CardId(CARD_ID_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_SHINSONO_KOO_GLOZA),
		__ItemId(ITEM_ID_KAKUSE_SHINENNO_ONO_YUBIWA),
		__CardId(CARD_ID_SHINSONO_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINENNO_ONO_YUBIWA_KOO_GLOZA_OWASHINO_GANKO),
		__ItemId(ITEM_ID_KAKUSE_SHINENNO_ONO_YUBIWA),
		__CardId(CARD_ID_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_OWASHINO_GANKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_KAKUSE_MAZYUNO_MAIL),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_YUBIWA),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_KAKUSE_MAZYUNO_MANT),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_YUBIWA),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAZYUNO_YUBIWA_KAKUSE_MAZYUNO_BOOTS),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_YUBIWA),
		__ItemId(ITEM_ID_KAKUSE_MAZYUNO_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_EIKOWO_TATAESHI_OKEN_KAKUSE_HAMETSUWO_MATOISHI_GOKEN),
		__ItemId(ITEM_ID_KAKUSE_EIKOWO_TATAESHI_OKEN),
		__ItemId(ITEM_ID_KAKUSE_HAMETSUWO_MATOISHI_GOKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HARMIT_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_HARMIT_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_FOOL_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_FOOL_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HOUO_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_HOUO_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HANGED_MAN_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_HANGED_MAN_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HIGH_PRIESTESS),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_HIGH_PRIESTESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_HIGH_PRIESTESS_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_HIGH_PRIESTESS_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_TOWER),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_TOWER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ARCANA_ARCANA_TOWER_REVERSE),
		__CardId(CARD_ID_ENCHANT_ARCANA),
		__CardId(CARD_ID_ARCANA_TOWER_REVERSE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_MONBOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_MIKOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_MONBOSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_TSURANUKI),
		__ItemId(ITEM_ID_GOYUMUSONO_MIKOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_TSURANUKI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOYUMUSONO_KACCHU),
		__ItemId(ITEM_ID_GOYUMUSONO_MIKOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_KACCHU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_MIKOSHI_GOKETSU),
		__ItemId(ITEM_ID_GOYUMUSONO_MIKOSHI),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_OMEGA_CORE_SHINRA_BANSHO),
		__ItemId(ITEM_ID_OMEGA_CORE),
		__CardId(CARD_ID_ENCHANT_SHINRA_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_HYPOCRISIES_EDGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_AVARITIA_METAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_LUXURIA_PIERCE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_PRIDE_STONE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_WRATH_WHEEL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_SUPERBIA_STRING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_GULARUSION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_PIGRITIA_RHYTHM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_LUST_POINTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_LUST_SHUTTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_LUST_CRASHER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_LUST_BOOM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_HYPOCRISY_MACHINE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_INVIDIA_BANDLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_WRATH_LECK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_GULATIEES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_PRIDE_STEAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_GLUTTONY_STICK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_SLOTH_TEXT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_SLOTH_BIBLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_GREED_WAND)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_ADICTION_PLANTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_IRA_FIST)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_PIGRITIA_WAVE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_PIGRITIA_SPARK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONS_FAMILIA_TAIZAI_ARMS),
		__ItemId(ITEM_ID_DEMONS_FAMILIA),
		__ItemId(ITEM_ID_ENVY_BLANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_GUARDIAN_KNIGHTS_SPEAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_GUARDIAN_KNIGHTS_AXE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_CLERIC_STUFF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_MAGICIAN_WAND)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_FOXTAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_MAGICIAN_DAGGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_KNUCKLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_GUARDIAN_ALCHEMIC_STUFF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_CELLO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_WHIP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_SAGE_BOOK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_SHIRONO_KISHIDANNO_NEKOZYARASHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_KUCHITA_GARDEN_KNIFE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_MADOSHINO_KIOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_RIKUTO_SANRYAKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_KAGAYAKU_HAKUGINNO_YARI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_TOTONO_SHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;




	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS_2HAND),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_GUARDIAN_KNIGHTS_CRYMORE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS_2HAND),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ROYAL_KATAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS_2HAND),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_GUARDIAN_KNIGHTS_ARCHER_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS_2HAND),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_ANTIQUE_GATLINGGUN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_ROYAL_ARMS_2HAND),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__ItemId(ITEM_ID_TRIANGLE_DISASTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ONO_KAMUI_NOROIWO_NOMIKONDA_O),
		__CardId(CARD_ID_ENCHANT_ONO_KAMUI),
		__CardId(CARD_ID_NOROIWO_NOMIKONDA_O)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ARASHINO_YUMI),
		__ItemId(ITEM_ID_GRACE_RAINSTORM_SUIT),
		__ItemId(ITEM_ID_ARASHINO_YUMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_ELVEN_BOW_SCARABA_HIGHHEEL),
		__ItemId(ITEM_ID_GRACE_RAINSTORM_SUIT),
		__ItemId(ITEM_ID_ELVEN_BOW),
		__ItemId(ITEM_ID_SCARABA_HIGHHEEL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_RAINSTORM_SUIT_BOINO_MUFFLER),
		__ItemId(ITEM_ID_GRACE_RAINSTORM_SUIT),
		__ItemId(ITEM_ID_BOINO_MUFFLER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_PSYCHIC_ROBE_FURUBITA_KAZENO_SASAYAKI),
		__ItemId(ITEM_ID_GRACE_PSYCHIC_ROBE),
		__ItemId(ITEM_ID_FURUBITA_KAZENO_SASAYAKI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_RING_OF_CERYNEIA_GOKETSU),
		__ItemId(ITEM_ID_RING_OF_CERYNEIA),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_PARACELSUS_GLOVE_HAO),
		__ItemId(ITEM_ID_PARACELSUS_GLOVE),
		__CardId(CARD_ID_ENCHANT_HAO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_MORRIGAN_SET),
		__ItemId(ITEM_ID_ILLUSION_MORRIGANNO_HELM),
		__ItemId(ITEM_ID_ILLUSION_MORRIGANNO_MANT),
		__ItemId(ITEM_ID_ILLUSION_MORRIGANNO_BELT),
		__ItemId(ITEM_ID_ILLUSION_MORRIGANNO_PENDANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_SHINKAINO_PHEN_SHINKAINO_STRAUF),
		__CardId(CARD_ID_SHINKAINO_PHEN),
		__CardId(CARD_ID_SHINKAINO_STRAUF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_PREMIUM_MELON_HEADPHONE_ARCANA),
		__ItemId(ITEM_ID_PREMIUM_MELON_HEADPHONE),
		__CardId(CARD_ID_ENCHANT_ARCANA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KIRAKIRA_NYANNYAN_CHOKER_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_KIRAKIRA_NYANNYAN_CHOKER),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_OKEANOSNO_KAGO_SHIPPU),
		__ItemId(ITEM_ID_OKEANOSNO_KAGO),
		__CardId(CARD_ID_ENCHANT_SHIPPU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_CULTIVATION_COAT_FURUBITA_MIDASSNO_SASAYAKI),
		__ItemId(ITEM_ID_GRACE_CULTIVATION_COAT),
		__ItemId(ITEM_ID_FURUBITA_MIDASS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GRACE_CULTIVATION_COAT_JEJECAP),
		__ItemId(ITEM_ID_GRACE_CULTIVATION_COAT),
		__ItemId(ITEM_ID_JEJECAP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_FULL_FORCE_DOPPELGANGER_CARD),
		__ItemId(ITEM_ID_KAKUSE_FULL_FORCE),
		__CardId(CARD_ID_DOPPELGANGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD),
		__ItemId(ITEM_ID_KAKUSE_FULL_FORCE),
		__CardId(CARD_ID_FUINSARETA_DOPPELGANGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_FULL_FORCE_FUINSARETA_DOPPELGANGER_CARD),
		__ItemId(ITEM_ID_FULL_FORCE),
		__CardId(CARD_ID_FUINSARETA_DOPPELGANGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_ORCLORD_CARD),
		__ItemId(ITEM_ID_KAKUSE_ORCLORDNO_YOROI),
		__CardId(CARD_ID_ORCLORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD),
		__ItemId(ITEM_ID_KAKUSE_ORCLORDNO_YOROI),
		__CardId(CARD_ID_FUINSARETA_ORCLORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD),
		__ItemId(ITEM_ID_KAKUSE_HOROW_SHOES),
		__CardId(CARD_ID_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_HOROW_SHOES_FUINSARETA_VERSEVV_CARD),
		__ItemId(ITEM_ID_KAKUSE_HOROW_SHOES),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD),
		__ItemId(ITEM_ID_KAKUSE_HOROW_SHOES),
		__CardId(CARD_ID_VERSEVV),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_HOROW_SHOES_FUINSARETA_VERSEVV_CARD),
		__ItemId(ITEM_ID_HOROW_SHOES),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOROW_SHOES_VERSEVV_CARD_FUINSARETA_VERSEVV_CARD),
		__ItemId(ITEM_ID_HOROW_SHOES),
		__CardId(CARD_ID_VERSEVV),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FURIONI_WING_FUINSARETA_FURIONI_CARD),
		__ItemId(ITEM_ID_FURIONI_WING),
		__CardId(CARD_ID_FUINSARETA_FURIONI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ZYOO_SUCARABANO_KABUTO_FUINSARETA_ZYOO_SUCARAB),
		__ItemId(ITEM_ID_ZYOO_SUCARABANO_KABUTO),
		__CardId(CARD_ID_FUINSARETA_ZYOO_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_PHANTOM_OF_MASKARADE_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI_CARD),
		__ItemId(ITEM_ID_PHANTOM_OF_MASKARADE),
		__CardId(CARD_ID_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_HOSHINO_GANTAI_FUINSARETA_ORC_HERO_CARD),
		__ItemId(ITEM_ID_HOSHINO_GANTAI),
		__CardId(CARD_ID_FUINSARETA_ORC_HERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ZYOO_SUCARABANO_KABUTO_FUINSARETA_ZYOTE_SUCARAB),
		__ItemId(ITEM_ID_ZYOO_SUCARABANO_KABUTO),
		__CardId(CARD_ID_FUINSARETA_ZYOTE_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAHOSEKINO_ONKE_FUINSARETA_MISTRESS),
		__ItemId(ITEM_ID_MAHOSEKINO_ONKE),
		__CardId(CARD_ID_FUINSARETA_MISTRESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ORCLORDNO_YOROI_FUINSARETA_ORCLORD_CARD),
		__ItemId(ITEM_ID_ORCLORDNO_YOROI),
		__CardId(CARD_ID_FUINSARETA_ORCLORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WHITE_LILIUM_ROBE_FUINSARETA_AMENHOTEP),
		__ItemId(ITEM_ID_WHITE_LILIUM_ROBE),
		__CardId(CARD_ID_FUINSARETA_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_WHITE_LILIUM_ROBE_FUINSARETA_AMENHOTEP),
		__ItemId(ITEM_ID_KAKUSE_WHITE_LILIUM_ROBE),
		__CardId(CARD_ID_FUINSARETA_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_NAMONAKI_KENNSHINO_BOOTS_FUINSARETA_IGNISEM_CENIA_MVP),
		__ItemId(ITEM_ID_NAMONAKI_KENNSHINO_BOOTS),
		__CardId(CARD_ID_FUINSARETA_IGNISEM_CENIA_MVP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ARABIAN_MANT_FUINSARETA_EFREET_CARD),
		__ItemId(ITEM_ID_ARABIAN_MANT),
		__CardId(CARD_ID_FUINSARETA_EFREET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_VESPER_HEAD_GEAR_FUINSARETA_VERSEVV_CARD),
		__ItemId(ITEM_ID_VESPER_HEAD_GEAR),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KODAI_MORROCNO_SHAWL_FUINSARETA_OSIRIS_CARD),
		__ItemId(ITEM_ID_KODAI_MORROCNO_SHAWL),
		__CardId(CARD_ID_FUINSARETA_OSIRIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KYUKETSUKINO_SHIMOBE_FUINSARETA_IKARINO_DRACULA_CARD),
		__ItemId(ITEM_ID_KYUKETSUKINO_SHIMOBE),
		__CardId(CARD_ID_FUINSARETA_IKARINO_DRACULA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FFF_JITTER_BUG),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FFF_JITTER_BUG)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_S_J_EARNEST_WOLF),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_S_J_EARNEST_WOLF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_AMDARAIS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_AMDARAIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_OSEN_SARETA_DARK_LORD),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_OSEN_SARETA_DARK_LORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_OSEN_SARETA_BURINARANEA),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_OSEN_SARETA_BURINARANEA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_KISHI_SAKRAY),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_KISHI_SAKRAY)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_KOKA_MUSPERKOLE),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_KOKA_MUSPERKOLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_SASOINO_MAGAN),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_SASOINO_MAGAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_SATSURIKUNO_MAGAN),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_SATSURIKUNO_MAGAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_SARANO_GENEI),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_SARANO_GENEI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_SHINIGAMI_ANKOU),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_SHINIGAMI_ANKOU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_ZYUSATSUNO_AMDARAIS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ZYUSATSUNO_AMDARAIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_ZYUSATSUNO_HIMERMEZ),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ZYUSATSUNO_HIMERMEZ)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_ZYOO_FACEWORM),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ZYOO_FACEWORM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_ZETSUBONO_KAMI_MOROCC),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ZETSUBONO_KAMI_MOROCC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_DARAKUNO_MAGAN),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_DARAKUNO_MAGAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NYDHOGNO_KAGE),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_NYDHOGNO_KAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_NOROIWO_NOMIKONDA_O),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_NOROIWO_NOMIKONDA_O)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_BIJOU),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_BIJOU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FENRIR),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FENRIR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_BOSOSHITA_SENCHO_PERLOCK),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_BOSOSHITA_SENCHO_PERLOCK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_MAKENSHI_THANATOSNO_SHINENTAI),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_MAKENSHI_THANATOSNO_SHINENTAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_MAGANNO_AMDARAIS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_MAGANNO_AMDARAIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_MAZINNO_KYOEI),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_MAZINNO_KYOEI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_MORS_NECROMANCER),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_MORS_NECROMANCER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_DARK_LORD),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FUINSARETA_OSEN_SARETA_DARK_LORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_OSEN_SARETA_BURINARANEA),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FUINSARETA_OSEN_SARETA_BURINARANEA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_KOKA_MUSPERKOLE),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FUINSARETA_KOKA_MUSPERKOLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EIYUNO_GAIKA_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_WORUYAFA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_WORUYAFA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_EDDGA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_EDDGA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_ORC_HERO),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_ORC_HERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_ORCLORD),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_ORCLORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_OSIRIS),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_OSIRIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_DOPPELGANGER),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_DOPPELGANGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_DRAKE),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_DRAKE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_BAPHOMET),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_BAPHOMET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FURIONI),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FURIONI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_MAYA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_MAYA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_MISTRESS),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_MISTRESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_WORUYAFA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_WORUYAFA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_EDDGA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_EDDGA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_ORC_HERO),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_ORC_HERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_ORCLORD),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_ORCLORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_OSIRIS),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_OSIRIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_DOPPELGANGER),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_DOPPELGANGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_DRAKE),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_DRAKE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_BAPHOMET),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_BAPHOMET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_FURIONI),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_FURIONI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_MAYA),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_MAYA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_FUINSARETA_MISTRESS),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_FUINSARETA_MISTRESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_ATLOS),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_ATLOS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_EFREET),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_EFREET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_VERSEVV),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_OCHITA_DAISHINKAN_HIBAM_ENCHANT_BOSOSHITA_MARYOKU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_KTULLANUX),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_KTULLANUX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_GROOM_UNDERNIGHT),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_ATLOS),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_ATLOS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_EFREET),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_EFREET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_VERSEVV),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_OCHITA_DAISHINKAN_HIBAM_ENCHANT_BOSOSHITA_MARYOKU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_KTULLANUX),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_KTULLANUX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_FUINSARETA_GROOM_UNDERNIGHT),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI),
		__CardId(CARD_ID_FUINSARETA_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_AMENHOTEP),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_IKARINO_UORUYAFA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_IKARINO_UORUYAFA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_IKARINO_DRACULA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_IKARINO_DRACULA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_INISHIENO_WOOTANG_GUARD),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_INISHIENO_WOOTANG_GUARD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_INISHIENO_TAOGUNKA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_INISHIENO_TAOGUNKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_KAGAYAKU_BEARDOLL),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_KAGAYAKU_BEARDOLL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_KAKUSEI_KUTORURANUCKS),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_KAKUSEI_KUTORURANUCKS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_KYORANSHITA_BOKENSHA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_KYORANSHITA_BOKENSHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_KONTONNO_ACOLYTE),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_KONTONNO_ACOLYTE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_KONTONNO_BAPHOMET),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_KONTONNO_BAPHOMET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_ZYOO_SUCARAB),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_ZYOO_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_ZYOTE_SUCARAB),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_ZYOTE_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_SHINKAINO_KRAKEN),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_SHINKAINO_KRAKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_SHINKAINO_DEVIAS),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_SHINKAINO_DEVIAS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_SHINRINO_MAHOTSUKAI),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_SHINRINO_MAHOTSUKAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_TIME_HOLDER),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_TIME_HOLDER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_TAMASHINO_HAHEN),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_TAMASHINO_HAHEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUKITSUNA_SOLID_TURTLE),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUKITSUNA_SOLID_TURTLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUKITSUNA_TURTLE_G),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUKITSUNA_TURTLE_G)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_BOMI),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_BOMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_AMENHOTEP),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_AMENHOTEP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_IKARINO_UORUYAFA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_IKARINO_UORUYAFA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_IKARINO_DRACULA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_IKARINO_DRACULA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_INISHIENO_WOOTANG_GUARD),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_INISHIENO_WOOTANG_GUARD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_INISHIENO_TAOGUNKA),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_INISHIENO_TAOGUNKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_KAKUSEI_KUTORURANUCKS),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_KAKUSEI_KUTORURANUCKS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_KAGAYAKU_BEARDOLL),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_KAGAYAKU_BEARDOLL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_KONTONNO_BAPHOMET),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_KONTONNO_BAPHOMET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_SHINKAINO_KRAKEN),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_SHINKAINO_KRAKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_ZYOO_SUCARAB),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_ZYOO_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_ZYOTE_SUCARAB),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_ZYOTE_SUCARAB)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_TIME_HOLDER),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_TIME_HOLDER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_FUKITSUNA_TURTLE_G),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_FUKITSUNA_TURTLE_G)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YAKUSAINO_MASHO_FUINSARETA_BOMI),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_FUINSARETA_BOMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SATSUINO_ONNEN_FUINSARETA_IGNISEM_CENIA_MVP),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
		__CardId(CARD_ID_FUINSARETA_IGNISEM_CENIA_MVP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_AKURYONO_UMEKIGOE_OCHITA_DAISHINKAN_HIBAMU),
		__ItemId(ITEM_ID_AKURYONO_UMEKIGOE),
		__CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AKURYONO_UMEKIGOE_OCHITA_DAISHINKAN_HIBAMU_HOZYONO_MEGAMI),
		__ItemId(ITEM_ID_AKURYONO_UMEKIGOE),
		__CardId(CARD_ID_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AKURYONO_UMEKIGOE_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU),
		__ItemId(ITEM_ID_AKURYONO_UMEKIGOE),
		__CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AKURYONO_UMEKIGOE_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU_HOZYONO_MEGAMI),
		__ItemId(ITEM_ID_AKURYONO_UMEKIGOE),
		__CardId(CARD_ID_FUINSARETA_OCHITA_DAISHINKAN_HIBAMU),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AKURYONO_UMEKIGOE_BOSOSHITA_MARYOKU),
		__ItemId(ITEM_ID_AKURYONO_UMEKIGOE),
		__CardId(CARD_ID_ENCHANT_BOSOSHITA_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_SEIFUKU),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_SEIFUKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_MANT),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_KYOGO_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_KYOGO_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_GOTAI_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_GOTAI_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_SHINREKI_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_SHINREKI_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_SENKO_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_SENKO_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_TENKYU_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_TENKYU_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GUARDIAN_HELM_KOKUO_SCHMIDTNO_HAKUUN_KISHO),
		__ItemId(ITEM_ID_GUARDIAN_HELM),
		__ItemId(ITEM_ID_KOKUO_SCHMIDTNO_HAKUUN_KISHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_ARGIAN_BLANCO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_ATNTIC_CHERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_ESTAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_ENGINE_PILE_VANKER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_COOL_RANT_INJECTION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_CRYMSON_ROSE_STICK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_KOYOSUI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_GOLDEN_RENCH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_PSYCHIC_SPEAR_ROD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_GENE_ROD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_SHARK_KNIFE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_SCARLET_RIBBON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_DUST_GRAVE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_TOSHINNO_BANTAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_HEART_WHIP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_HARBEST)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_FALTEZAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_FORT_RAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_PLATINUM_DUGGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_BLACK_CIRCLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_POENITENTIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_VOLTYGENE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_MORYU_TOKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_RUCIS_FRAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V2),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_JUDGEMENT_SLASHER),
		__ItemId(ITEM_ID_REPENT_SLASHER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_AGUED_FIRO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_WIND_GAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_VORARE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_AIMING_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_GRAVITATION_STUFF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_SHARP_STAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_SUHAINO_TSUE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_STUFF_OF_MIRACLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_FALCEN_SHOOTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_BERNA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_MAXY_SPANA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_RAPID_FIRE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__ItemId(ITEM_ID_RIPPER_CROSS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI_SATSUINO_ONNEN),
		__CardId(CARD_ID_ENCHANT_RISETO_KIOKUNO_ZANSHI),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MILITARY_GLOVE_HAO),
		__ItemId(ITEM_ID_MILITARY_GLOVE),
		__CardId(CARD_ID_ENCHANT_HAO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KYOKUGENNO_MARYOKU_KAKUSE_EIKOWO_TATAESHI_OKEN),
		__CardId(CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU),
		__ItemId(ITEM_ID_KAKUSE_EIKOWO_TATAESHI_OKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KYOKUGENNO_MARYOKU_KAKUSE_HAMETSUWO_MATOISHI_GOKEN),
		__CardId(CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU),
		__ItemId(ITEM_ID_KAKUSE_HAMETSUWO_MATOISHI_GOKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KYOKUGENNO_MARYOKU_KAKUSE_KONO_SOZIN),
		__CardId(CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU),
		__ItemId(ITEM_ID_KAKUSE_KONO_SOZIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAHOSEKINO_ONKE_MISTRESS),
		__ItemId(ITEM_ID_MAHOSEKINO_ONKE),
		__CardId(CARD_ID_MISTRESS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TRAVELER_RING_GOKETSU),
		__ItemId(ITEM_ID_TRAVELER_RING),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ONRYO_KAIINO_MIMI_AKUMANO_TE),
		__ItemId(ITEM_ID_ONRYO_KAIINO_MIMI),
		__ItemId(ITEM_ID_AKUMANO_TE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_OKENO_EIKO),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__CardId(CARD_ID_ENCHANT_OKENO_EIKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_ARTIS_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_ARTIS_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_ANIMAL_ROBE),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_ANIMAL_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_GATLING_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_GATLING_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_CULTIVATION_COAT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_CULTIVATION_COAT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_CRUCIFORM_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_CRUCIFORM_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_CONFIDENCIAL_MAIL),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_CONFIDENCIAL_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_PSYCHIC_ROBE),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_PSYCHIC_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_SCULL_ROBE),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_SCULL_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_TENCHI_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_TENCHI_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_PUNISHMENT_ROBE),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_PUNISHMENT_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_HOLY_ROBE),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_HOLY_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_MAGMA_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_MAGMA_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_MENUS_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_MENUS_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_NOBLESSE_OBLIGE_GRACE_RAINSTORM_SUIT),
		__ItemId(ITEM_ID_NOBLESSE_OBLIGE),
		__ItemId(ITEM_ID_GRACE_RAINSTORM_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MEMENTO_MORI_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MEMENTO_MORI),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_SHOES_MAIL),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_SHOES),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_RING_MAIL),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_RING),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_RING_SHOES),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_RING),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_GLOVE_MAIL),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_GLOVE),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_GLOVE_SHOES),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_GLOVE),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLUSION_SPRINT_GLOVE_RING),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_GLOVE),
		__ItemId(ITEM_ID_ILLUSION_SPRINT_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HASAI_STR_10),
		__CardId(CARD_ID_ENCHANT_HASAI),
		__CardId(CARD_ID_ENCHANT_STR_10),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_MAZIN_INT_10),
		__CardId(CARD_ID_ENCHANT_MAZIN),
		__CardId(CARD_ID_ENCHANT_INT_10),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_MAZIMENA_BITATA_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_MAZIMENA_BITATA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_MAZIMENA_ANDRENO_YOCHU_GUNYAGUNYASHITA_ARINO_TAMAGO),
		__CardId(CARD_ID_GUNYAGUNYASHITA_ARINO_TAMAGO),
		__CardId(CARD_ID_MAZIMENA_ANDRENO_YOCHU),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_MUKUCHINA_MAYA_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO),
		__CardId(CARD_ID_MUKUCHINA_MAYA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ASMODEUSNO_TSUBASA_ZYASPER_CIRCLET),
		__ItemId(ITEM_ID_ASMODEUSNO_TSUBASA),
		__ItemId(ITEM_ID_ZYASPER_CIRCLET)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GORGONNO_HANAKANMURI_AEGIS_SYSTEM),
		__ItemId(ITEM_ID_GORGONNO_HANAKANMURI),
		__ItemId(ITEM_ID_AEGIS_SYSTEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ARAMAZDNO_TENKE_KIGENNO_O),
		__ItemId(ITEM_ID_ARAMAZDNO_TENKE),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_ARMOR_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_ARMOR),
		__CardId(CARD_ID_ENCHANT_Q_BOSS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_ARMOR_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_ARMOR),
		__CardId(CARD_ID_ENCHANT_Q_NORMAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_ARMOR_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_ARMOR),
		__CardId(CARD_ID_ENCHANT_Q_PLAYER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_LEG_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_LEG),
		__CardId(CARD_ID_ENCHANT_Q_BOSS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_LEG_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_LEG),
		__CardId(CARD_ID_ENCHANT_Q_NORMAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_LEG_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_LEG),
		__CardId(CARD_ID_ENCHANT_Q_PLAYER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_WING_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_WING),
		__CardId(CARD_ID_ENCHANT_Q_BOSS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_WING_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_WING),
		__CardId(CARD_ID_ENCHANT_Q_NORMAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_U_POWER_WING_ENCHANT_Q_BOSS_NORMAL_PLAYER),
		__CardId(CARD_ID_ENCHANT_U_POWER_WING),
		__CardId(CARD_ID_ENCHANT_Q_PLAYER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_DARKNESS),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_DARKNESS),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_FIRE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_FIRE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_GROUND),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_GROUND),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_POISON),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_POISON),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_SAINT),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_SAINT),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_UNDEAD),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_UNDEAD),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_WATER),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_WATER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_E_WIND),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_E_WIND),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_CRI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_DRAINHP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_DRAINSP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_GUIDED),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_LIFE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_G_SERIES),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_G_SOUL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_CONFUSE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_CONFUSE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_CURSE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_CURSE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_FEAR),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_FEAR),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_IGNITION),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_IGNITION),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_PETRIFACTION),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_PETRIFACTION),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_SILENCE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_SILENCE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_P_SLEEP),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_P_SLEEP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_ATK),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_ATK),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_AVOID),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_AVOID),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_CRI),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_CRI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_FATAL_FLASH),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_FATAL_FLASH),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_FIRING_SHOT),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_FIRING_SHOT),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_LUCKY_STRIKE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_LUCKY_STRIKE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_MATK),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_MATK),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_MAXHP),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_MAXHP),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_OVER_POWER),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_OVER_POWER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_QUICK),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_QUICK),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_SPELL_BUSTER),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_SPELL_BUSTER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_S_UNLIMIT_VITAL),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_S_UNLIMIT_VITAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_FATAL_FLASH),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_FATAL_FLASH),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_FIRING_SHOT),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_FIRING_SHOT),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_LUCKY_STRIKE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_LUCKY_STRIKE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_OVER_POWER),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_OVER_POWER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_SPELL_BUSTER),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_SPELL_BUSTER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_X_UNLIMIT_VITAL),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_X_UNLIMIT_VITAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_Z_CLAIRVOYANCE),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_Z_CLAIRVOYANCE),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_Z_IMMORTAL),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_Z_IMMORTAL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_Z_KNOCKBACK),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_Z_KNOCKBACK),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_Z_NODISPELL),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_Z_NODISPELL),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_EXAM_ENCHANT_Z_REINCARNATION),
		__CardId(CARD_ID_ENCHANT_EXAM),
		__CardId(CARD_ID_ENCHANT_Z_REINCARNATION),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAGIC_CELESTIAL_GLOBE_ZODIAC),
		__ItemId(ITEM_ID_MAGIC_CELESTIAL_GLOBE),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KIGENNO_O_OGONCHU),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O),
		__CardId(CARD_ID_OGONCHU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_YESTERDAY_ONCE_MORE_KIGENNO_O),
		__ItemId(ITEM_ID_YESTERDAY_ONCE_MORE),
		__CardId(CARD_ID_ENCHANT_KIGENNO_O)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_VALKYRIE_CURSE_BRIGHT_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_VALKYRIE_CURSE_BRIGHT),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_VALKYRIE_CURSE_BRIGHT_YAKUSAINO_MASHO),
		__ItemId(ITEM_ID_VALKYRIE_CURSE_BRIGHT),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_AXE),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_AXE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KYOKAIKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KYOKAIKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SWORD),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_SWORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_KINGYUKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_KINGYUKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MACE),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_MACE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHISHIKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHISHIKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_DEVINE_CROSS),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_DEVINE_CROSS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SHOZYOKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SHOZYOKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_HUNTER_BOW),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_HUNTER_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_ZINBAKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_ZINBAKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_STUFF_OF_SOUL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_STUFF_OF_SOUL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOGYOKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOGYOKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_VIOLIN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_VIOLIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_ROPE),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_ROPE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_SOZIKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_SOZIKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_KATAR),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_KATAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENKATSUKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENKATSUKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_KRASNAYA),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_KRASNAYA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_TENBINKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_TENBINKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SPEAR),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_SPEAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HAKUYOKYUNO_SHIELD),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HAKUYOKYUNO_SHIELD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_DAGGER),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_DAGGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_ROBE),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_PROCYON_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_PROCYON_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_STUFF),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_STUFF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_HOBINKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_HOBINKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_BOOK),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_BOOK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_CROWN),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_CROWN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_ROBE),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_POLLUX_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_POLLUX_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_THIEF_BOW),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_THIEF_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_DIADEM),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_DIADEM)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MAIL),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_MAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_MANT),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZODIAC_MAKATSUKYUNO_RING),
		__CardId(CARD_ID_ENCHANT_ZODIAC),
		__ItemId(ITEM_ID_MAKATSUKYUNO_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_REQUIESCAT_IN_PACE_SATSUINO_ONNEN),
		__ItemId(ITEM_ID_REQUIESCAT_IN_PACE),
		__CardId(CARD_ID_ENCHANT_SATSUINO_ONNEN),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_STORM_KNIGHT),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_STORM_KNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_TURTLE_GENERAL),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_TURTLE_GENERAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_DRACULA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_DRACULA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_LORD_OF_DEATH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_LORD_OF_DEATH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_VESPER),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_VESPER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KIEL_D01),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_KIEL_D01)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_PHARAOH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_PHARAOH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_RSX_0806),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_RSX_0806)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_DATAL_ZAURUS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_DATAL_ZAURUS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_HATI),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_HATI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_AMON_RA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_AMON_RA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_DARK_LORD),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_DARK_LORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_DARK_LORD),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_DARK_LORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_BOITATA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_BOITATA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_ONRYOBUSHI),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_ONRYOBUSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_PEKUSOZIN),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_PEKUSOZIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KOKUDAO),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_KOKUDAO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_GOPINICH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_GOPINICH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_TAOGUNKA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_TAOGUNKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_BAKONAWA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_BAKONAWA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_BYONGUNGO),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_BYONGUNGO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_BUWAYA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_BUWAYA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_REYAC),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_REYAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_LADYTANIE),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_LADYTANIE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_PEKUSOZIN),
		__ItemId(ITEM_ID_IKOKUNO_DENTO_BOSHI),
		__CardId(CARD_ID_PEKUSOZIN),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKOKUNO_DENTO_BOSHI_FUINSARTA_PEKUSOZIN),
		__ItemId(ITEM_ID_IKOKUNO_DENTO_BOSHI),
		__CardId(CARD_ID_FUINSARETA_PEKUSOZIN),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SHIHAISHANO_ROBE_TAOGUNKA),
		__ItemId(ITEM_ID_SHIHAISHANO_ROBE),
		__CardId(CARD_ID_TAOGUNKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHIHAISHANO_ROBE_FUINSARETA_TAOGUNKA),
		__ItemId(ITEM_ID_SHIHAISHANO_ROBE),
		__CardId(CARD_ID_FUINSARETA_TAOGUNKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHIHAISHANO_ROBE_TAOGUNKA),
		__ItemId(ITEM_ID_KAKUSE_SHIHAISHANO_ROBE),
		__CardId(CARD_ID_TAOGUNKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHIHAISHANO_ROBE_FUINSARETA_TAOGUNKA),
		__ItemId(ITEM_ID_KAKUSE_SHIHAISHANO_ROBE),
		__CardId(CARD_ID_FUINSARETA_TAOGUNKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TATENASHINO_YOROI_FUINSARETA_RSX_0806),
		__ItemId(ITEM_ID_TATENASHINO_YOROI),
		__CardId(CARD_ID_FUINSARETA_RSX_0806),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_RSX_0806),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_RSX_0806)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_APPLAUSE_SANDAL_FUINSARETA_AMON_RA),
		__ItemId(ITEM_ID_APPLAUSE_SANDAL),
		__CardId(CARD_ID_FUINSARETA_AMON_RA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_AMON_RA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_AMON_RA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_VESPER_HEAD_GEAR_FUINSARETA_VESPER),
		__ItemId(ITEM_ID_VESPER_HEAD_GEAR),
		__CardId(CARD_ID_FUINSARETA_VESPER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_VESPER),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_VESPER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GODS_SWORD_FUINSARETA_ONRYO_BUSHI),
		__ItemId(ITEM_ID_GODS_SWORD),
		__CardId(CARD_ID_FUINSARETA_ONRYO_BUSHI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DEMONISH_SWORD_FUINSARETA_ONRYO_BUSHI),
		__ItemId(ITEM_ID_DEMONISH_SWORD),
		__CardId(CARD_ID_FUINSARETA_ONRYO_BUSHI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_ONRYO_BUSHI),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_ONRYO_BUSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_OSUWARI_KYOKO_SHIFUKU_FUINSARETA_KIEL_D_01),
		__ItemId(ITEM_ID_OSUWARI_KYOKO_SHIFUKU),
		__CardId(CARD_ID_FUINSARETA_KIEL_D_01),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_KIEL_D_01),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_KIEL_D_01)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_R48_85_BESTIA_FUINSARETA_KIEL_D01),
		__CardId(CARD_ID_R48_85_BESTIA),
		__CardId(CARD_ID_FUINSARETA_KIEL_D_01)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_KOKUDAO),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_KOKUDAO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_GOPINICH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_GOPINICH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_NIZIIRONO_NEKOZYARASHI_FUINSARETA_STORM_KNIGHT),
		__ItemId(ITEM_ID_NIZIIRONO_NEKOZYARASHI),
		__CardId(CARD_ID_FUINSARETA_STORM_KNIGHT),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_STORM_KNIGHT),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_STORM_KNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_TURTLE_GENERAL),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_TURTLE_GENERAL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_BRAVE_SUIT_FUINSARETA_TAOGUNKA_CARD),
		__ItemId(ITEM_ID_BRAVE_SUIT),
		__CardId(CARD_ID_FUINSARETA_TAOGUNKA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_TAOGUNKA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_TAOGUNKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_DATAL_ZAURUS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_DATAL_ZAURUS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_DRACULA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_DRACULA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GESSHOKUNO_SOUSHOKU_FUINSARETA_HATI),
		__ItemId(ITEM_ID_GESSHOKUNO_SOUSHOKU),
		__CardId(CARD_ID_FUINSARETA_HATI),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_HATI_BEBE_FUINSARETA_HATI),
		__CardId(CARD_ID_HATI_BEBE),
		__CardId(CARD_ID_FUINSARETA_HATI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_HATI),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_HATI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_PHARAOH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_PHARAOH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_PEKUSOZIN),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_PEKUSOZIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FUSHICHONO_NEKOZYARASHI_FUINSARETA_BOITATA),
		__ItemId(ITEM_ID_FUSHICHONO_NEKOZYARASHI),
		__CardId(CARD_ID_FUINSARETA_BOITATA),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_BOITATA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_BOITATA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_LADYTANIE),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_LADYTANIE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_REYAC),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_REYAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_FUINSARETA_LORD_OF_DEATH),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_FUINSARETA_LORD_OF_DEATH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KANZYUKU_KYOKUGENNO_MARYOKU),
		__CardId(CARD_ID_ENCHANT_KANZYUKU),
		__CardId(CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KANZYUKU_MELORING),
		__CardId(CARD_ID_ENCHANT_KANZYUKU),
		__CardId(CARD_ID_MELORING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_KANZYUKU_DAMELORING),
		__CardId(CARD_ID_ENCHANT_KANZYUKU),
		__CardId(CARD_ID_DAMELORING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_DRAGON_SCALE_ARMORS),
		__ItemId(ITEM_ID_DRAGON_SCALE_PLATE),
		__ItemId(ITEM_ID_DRAGON_SCALE_HOOD),
		__ItemId(ITEM_ID_DRAGON_SCALE_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SHISAI_ARMORS),
		__ItemId(ITEM_ID_SHISAINO_ROBE),
		__ItemId(ITEM_ID_SHISAINO_MANT),
		__ItemId(ITEM_ID_SHISAINO_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_HARVEST_FESTIVAL_HOZYONO_MEGAMI),
		__ItemId(ITEM_ID_HARVEST_FESTIVAL),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_JEWGOLIANT),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_JEWGOLIANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_REGINLEIF),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_REGINLEIF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_BONE_DETAL_ZAURUS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_BONE_DETAL_ZAURUS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_INGRID),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_INGRID)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_HASONSHITA_THANATOSNO_KIOKU_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_HASONSHITA_THANATOSNO_KIOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_TENCHI_HOKAI_MAKENSHI_THANATOSNO_SHINENTAI),
		__CardId(CARD_ID_ENCHANT_TENCHI_HOKAI),
		__CardId(CARD_ID_MAKENSHI_THANATOSNO_SHINENTAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_TENCHI_HOKAI_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI),
		__CardId(CARD_ID_ENCHANT_TENCHI_HOKAI),
		__CardId(CARD_ID_FUINSARETA_MAKENSHI_THANATOSNO_SHINENTAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_TENCHI_HOKAI_HASONSHITA_THANATOSNO_KIOKU),
		__CardId(CARD_ID_ENCHANT_TENCHI_HOKAI),
		__CardId(CARD_ID_HASONSHITA_THANATOSNO_KIOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_CROW_BARON_CROW_DUKE),
		__CardId(CARD_ID_CROW_BARON),
		__CardId(CARD_ID_CROW_DUKE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SINFUL_RUBY_RING_ZYASPER_RING),
		__ItemId(ITEM_ID_SINFUL_RUBY_RING),
		__ItemId(ITEM_ID_ZYASPER_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_CUTIE),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_CUTIE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_CELINE_KIMI),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_CELINE_KIMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_EL_A17T),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_EL_A17T)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_MIGUEL),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_MIGUEL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_RED_PEPPER_KAPPA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_RED_PEPPER_KAPPA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_VENOM_CHEMERA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_VENOM_CHEMERA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_EABLE),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_EABLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_SILVA_PAPIRIA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_SILVA_PAPIRIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_BOSS_PITAYA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_BOSS_PITAYA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_SWEETY),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_SWEETY)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_CHARLESTON_3GO),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_CHARLESTON_3GO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_R48_85_BESTIA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_R48_85_BESTIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_T_W_O),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_T_W_O)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_RANDGRIS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_RANDGRIS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_R001_BESTIA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_R001_BESTIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_GRAN_PAPILIA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_GRAN_PAPILIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_RED_PEPPER_LAMBDA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_RED_PEPPER_LAMBDA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_SHINO_DAIMAZYO),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_SHINO_DAIMAZYO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_LUDE_GAL_GHOST_CUBE),
		__CardId(CARD_ID_LUDE_GAL),
		__CardId(CARD_ID_GHOST_CUBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SYMBOL_OF_EDEN_GARDEN_OF_EDEN),
		__ItemId(ITEM_ID_SYMBOL_OF_EDEN),
		__ItemId(ITEM_ID_GARDEN_OF_EDEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SYMBOL_OF_EDEN_FAIRY_OF_EDEN),
		__ItemId(ITEM_ID_SYMBOL_OF_EDEN),
		__ItemId(ITEM_ID_FAIRY_OF_EDEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SYMBOL_OF_EDEN_SHINRINO_KAIHO),
		__ItemId(ITEM_ID_SYMBOL_OF_EDEN),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_STARLY_SKY_TWIN_PRIME_OKENO_EIKO),
		__ItemId(ITEM_ID_STARLY_SKY_TWIN_PRIME),
		__CardId(CARD_ID_ENCHANT_OKENO_EIKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_LITTLE_ABYSS_DRAGON_KYOKUGENNO_MARYOKU),
		__ItemId(ITEM_ID_LITTLE_ABYSS_DRAGON),
		__CardId(CARD_ID_ENCHANT_KYOKUGENNO_MARYOKU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_EIS_SPINNE_HYOKETSU_TAISE),
		__ItemId(ITEM_ID_EIS_SPINNE),
		__CardId(CARD_ID_ENCHANT_HYOKETSU_TAISE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_EIS_SPINNE_REITO_TAISE),
		__ItemId(ITEM_ID_EIS_SPINNE),
		__CardId(CARD_ID_ENCHANT_REITO_TAISE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_EIS_SPINNE_BRINARANEA),
		__ItemId(ITEM_ID_EIS_SPINNE),
		__CardId(CARD_ID_BRINARANEA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_STR),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_STR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_AGI),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_AGI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_VIT),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_VIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_INT),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_INT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_DEX),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_DEX)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_AMURTAT_SPECIAL_LUK),
		__ItemId(ITEM_ID_AMURTAT),
		__CardId(CARD_ID_ENCHANT_SPECIAL_LUK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GRAY_WOLF_MAGICAL_SET),
		__ItemId(ITEM_ID_GRAY_WOLF_ROBE),
		__ItemId(ITEM_ID_GRAY_WOLF_SHOES),
		__ItemId(ITEM_ID_GRAY_WOLF_MUFFLER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GRAY_WOLF_PHYSICAL_SET),
		__ItemId(ITEM_ID_GRAY_WOLF_SUITS),
		__ItemId(ITEM_ID_GRAY_WOLF_BOOTS),
		__ItemId(ITEM_ID_GRAY_WOLF_MANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GRAY_WOLF_MAGICAL_ACCESSORY_SET),
		__ItemId(ITEM_ID_GRAY_WOLF_EARING),
		__ItemId(ITEM_ID_GRAY_WOLF_NECKLACE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GRAY_WOLF_PHYSICAL_ACCESSORY_SET),
		__ItemId(ITEM_ID_GRAY_WOLF_RING),
		__ItemId(ITEM_ID_GRAY_WOLF_PENDANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_KATAR),
		__ItemId(ITEM_ID_VIVATUS_FIDES_KATAR),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_AXE),
		__ItemId(ITEM_ID_VIVATUS_FIDES_AXE),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_RAPIER),
		__ItemId(ITEM_ID_VIVATUS_FIDES_RAPIER),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_WAND),
		__ItemId(ITEM_ID_VIVATUS_FIDES_WAND),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_GUARDIAN_SPEAR),
		__ItemId(ITEM_ID_VIVATUS_FIDES_GUARDIAN_SPEAR),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_VIOLIN),
		__ItemId(ITEM_ID_VIVATUS_FIDES_VIOLIN),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_KNUCKLE),
		__ItemId(ITEM_ID_VIVATUS_FIDES_KNUCKLE),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_MAGIC_BOOK),
		__ItemId(ITEM_ID_VIVATUS_FIDES_MAGIC_BOOK),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_CHAIN_ROPE),
		__ItemId(ITEM_ID_VIVATUS_FIDES_CHAIN_ROPE),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_CROSS_BOW),
		__ItemId(ITEM_ID_VIVATUS_FIDES_CROSS_BOW),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_BALLISTA),
		__ItemId(ITEM_ID_VIVATUS_FIDES_BALLISTA),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_TWO_HAND_STUFF),
		__ItemId(ITEM_ID_VIVATUS_FIDES_TWO_HAND_STUFF),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_HOZYONO_MEGAMI_VIVATUS_FIDES_LANCE),
		__ItemId(ITEM_ID_VIVATUS_FIDES_LANCE),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ARCH_MAGE_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ARCH_MAGE_1),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ELEMENTAL_MASTER_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ELEMENTAL_MASTER_1),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_CARDINAL_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_1),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_ABYSS_CHASER_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ABYSS_CHASER_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_INQUISITOR_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_IMPERIAL_GUARD_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_IMPERIAL_GUARD_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_WIND_HAWK_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CROSS_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_SHADOW_CROSS_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_DRAGON_KNIGHT_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_DRAGON_KNIGHT_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_TROUBADOUR_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_TROUBADOUR_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_TROUVERE_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_TROUVERE_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_BIOLO_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_BIOLO_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_MEISTER_1),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_MEISTER_1),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_SHURAN),
		__CardId(CARD_ID_SHURAN),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_BURNING_FANG),
		__CardId(CARD_ID_BURNING_FANG),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_HOZYONO_MEGAMI_DEMI_FREYA),
		__CardId(CARD_ID_DEMI_FREYA),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ALTERNATE_CLIP_MEIKYUNO_MEIKYUNO_VERSEVV),
		__ItemId(ITEM_ID_ALTERNATE_CLIP),
		__CardId(CARD_ID_MEIKYUNO_VERSEVV)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_CARDINAL_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_2),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_DANGEKI_STR_7),
		__CardId(CARD_ID_ENCHANT_DANGEKI),
		__CardId(CARD_ID_ENCHANT_STR_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_DANGEKI_INT_7),
		__CardId(CARD_ID_ENCHANT_ZANMA),
		__CardId(CARD_ID_ENCHANT_INT_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SUITS),
		__ItemId(ITEM_ID_TOKUSEN_DORAM_SUITS),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_CAPE),
		__ItemId(ITEM_ID_TOKUSEN_DORAM_CAPE),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_TOKUSEN_DORAM_SHOES),
		__ItemId(ITEM_ID_TOKUSEN_DORAM_SHOES),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_DAKITSUKI_SYAMNEKO),
		__ItemId(ITEM_ID_DAKITSUKI_SYAMNEKO),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_KUSANO_NECKLACE),
		__ItemId(ITEM_ID_SHINSENNA_KUSANO_NECKLACE),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_KAWAII_KUSANO_NECKLACE),
		__ItemId(ITEM_ID_KAWAII_KUSANO_NECKLACE),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_MARYOKUNO_KUSANO_NECKLACE),
		__ItemId(ITEM_ID_MARYOKUNO_KUSANO_NECKLACE),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_HIKARUEDANO_OMAMORI),
		__ItemId(ITEM_ID_HIKARUEDANO_OMAMORI),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_SHINSENNA_MAGURONO_OMAMORI),
		__ItemId(ITEM_ID_SHINSENNA_MAGURONO_OMAMORI),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_ENCHANT_ZODIAC_POCCHARI_MIMIZUNO_OMAMORI),
		__ItemId(ITEM_ID_POCCHARI_MIMIZUNO_OMAMORI),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_KAKUSE_SHIHAISHANO_ROBE),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_KAKUSE_SHIHAISHANO_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_SUITS_SET),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_SUITS),
		__ItemId(ITEM_ID_GRAY_WOLF_MANT),
		__ItemId(ITEM_ID_GRAY_WOLF_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_ROBE_SET),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_ROBE),
		__ItemId(ITEM_ID_GRAY_WOLF_MUFFLER),
		__ItemId(ITEM_ID_GRAY_WOLF_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_PENDANT),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_PENDANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_RING),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_RING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_EARING),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_EARING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_GRAY_WOLF_NECKLACE),
		__ItemId(ITEM_ID_WILD_BEAST),
		__ItemId(ITEM_ID_GRAY_WOLF_NECKLACE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_STR_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_STR_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_AGI_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_AGI_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_VIT_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_VIT_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_INT_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_INT_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_DEX_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_DEX_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_LUK_7),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_LUK_7)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_POW_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_POW_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_STA_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_STA_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_WIS_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_WIS_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_SPL_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_SPL_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CON_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_CON_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CRT_3),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_CRT_3)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_DEF_300),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_DEF_300)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_MDEF_30),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_MDEF_30)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_LUCKY_25),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_LUCKY_25)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_ASPD_10),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_ASPD_10P)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CAST_TIME_15),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_CAST_TIME_15)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_DELAY_TIME_15),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_SKILL_DELAY_15)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_PHYSICAL_DAMAGE_20),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_PHYSICAL_DAMAGE_20)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_MAGICAL_DAMAGE_20),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_MAGICAL_DAMAGE_20)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_IGNORE_DEF_50),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_IGNORE_DEF_50)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_IGNORE_MDEF_50),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_IGNORE_MDEF_50)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_UNINTERRUPTABLE),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_UNINTERRUPTABLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_WILD_BEAST_WOLF_ORB_CAST_FIXED_50),
		__ItemId(ITEM_ID_WILD_BEAST),
		__CardId(CARD_ID_ENCHANT_WOLF_ORB_CAST_FIXED_50)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ARCH_MAGE_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ARCH_MAGE_2),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MEMORIAL_CLOTH_GREED_EISHO_100),
		__ItemId(ITEM_ID_MEMORIAL_CLOTH),
		__CardId(CARD_ID_ENCHANT_GREED_EISHO_100)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_ILLEGAL_CHIP_CHISHIKINO_TANKYUSHA),
		__ItemId(ITEM_ID_ILLEGAL_CHIP),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_DRAGON_KNIGHT_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_DRAGON_KNIGHT_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_BIOLO_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_BIOLO_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ETAINO_SHIRENAI_SEMETAI_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA),
		__CardId(CARD_ID_ETAINO_SHIRENAI_SEMETAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_HENI_CHIMERA_THE_ONE),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_HENI_CHIMERA_THE_ONE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_CHIKARANO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_SHUCHUNO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_TAIRYOKUNO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_MARYOKUNO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_SOMENO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MICHINARU_BOOTS_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MICHINARU_SOZONO_BOOTS),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FORCE_CONDENSER_ANTI_CONJUROR_SUIT),
		__ItemId(ITEM_ID_FORCE_CONDENSER),
		__ItemId(ITEM_ID_ANTI_CONJUROR_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_FORCE_CONDENSER_MAGIC_PROTECTOR_ROBE),
		__ItemId(ITEM_ID_FORCE_CONDENSER),
		__ItemId(ITEM_ID_MAGIC_PROTECTOR_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MENTAL_CONDENSER_ANTI_CONJUROR_SUIT),
		__ItemId(ITEM_ID_MENTAL_CONDENSER),
		__ItemId(ITEM_ID_ANTI_CONJUROR_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MENTAL_CONDENSER_MAGIC_PROTECTOR_ROBE),
		__ItemId(ITEM_ID_MENTAL_CONDENSER),
		__ItemId(ITEM_ID_MAGIC_PROTECTOR_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SOSESEKINO_AMULET_YUENNARU_TENZYONO_MIYAKO),
		__ItemId(ITEM_ID_SOSESEKINO_AMULET),
		__CardId(CARD_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ELEMENTAL_MASTER_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ELEMENTAL_MASTER_2),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_CARDINAL_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_3),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO),
		__CardId(CARD_ID_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO_SHINSONO_KOO_GLOZA),
		__CardId(CARD_ID_ENCHANT_YUENNARU_TENZYONO_MIYAKO),
		__CardId(CARD_ID_SHINSONO_KOO_GLOZA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_URUNO_UDEWA_GOKETSU),
		__ItemId(ITEM_ID_URUNO_UDEWA),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_SHADOW_CROSS_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_SHADOW_CROSS_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_ABYSS_CHASER_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ABYSS_CHASER_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_WIND_HAWK_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_IMPERIAL_GUARD_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_IMPERIAL_GUARD_2),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SHINPOSHANO_ROBE_GROOM_UNDERNIGHT),
		__ItemId(ITEM_ID_SHINPOSHANO_ROBE),
		__CardId(CARD_ID_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_SHINPOSHANO_ROBE_FUINSARETA_GROOM_UNDERNIGHT),
		__ItemId(ITEM_ID_SHINPOSHANO_ROBE),
		__CardId(CARD_ID_FUINSARETA_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINPOSHANO_ROBE_GROOM_UNDERNIGHT),
		__ItemId(ITEM_ID_KAKUSE_SHINPOSHANO_ROBE),
		__CardId(CARD_ID_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINPOSHANO_ROBE_FUINSARETA_GROOM_UNDERNIGHT),
		__ItemId(ITEM_ID_KAKUSE_SHINPOSHANO_ROBE),
		__CardId(CARD_ID_FUINSARETA_GROOM_UNDERNIGHT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_KAKUSE_SHINPOSHANO_ROBE_HOZYONO_MEGAMI),
		__ItemId(ITEM_ID_KAKUSE_SHINPOSHANO_ROBE),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_LIGHTNING_SAVAGE_YAKUSAINO_MASHO),
		__ItemId(ITEM_ID_LIGHTNING_SAVAGE),
		__CardId(CARD_ID_ENCHANT_YAKUSAINO_MASHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAGIC_BARRIER_CLOTH_ANTI_CONJUROR_SUIT),
		__ItemId(ITEM_ID_MAGIC_BARRIER_CLOTH),
		__ItemId(ITEM_ID_ANTI_CONJUROR_SUIT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAGIC_BARRIER_CLOTH_MAGIC_PROTECTOR_ROBE),
		__ItemId(ITEM_ID_MAGIC_BARRIER_CLOTH),
		__ItemId(ITEM_ID_MAGIC_PROTECTOR_ROBE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_MAGIC_BARRIER_CLOTH_EIYUNO_GAIKA),
		__ItemId(ITEM_ID_MAGIC_BARRIER_CLOTH),
		__CardId(CARD_ID_ENCHANT_EIYUNO_GAIKA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_ARGIAN_BLANCO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_ATNTIC_CHERO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_ESTAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_ENGINE_PILE_VANKER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_COOL_RANT_INJECTION)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_CRYMSON_ROSE_STICK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_KOYOSUI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_GOLDEN_RENCH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_PSYCHIC_SPEAR_ROD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_GENE_ROD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_SHARK_KNIFE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_SCARLET_RIBBON)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_DUST_GRAVE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_TOSHINNO_BANTAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_HEART_WHIP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_HARBEST)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_FALTEZAN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_FORT_RAGE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_PLATINUM_DUGGER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_BLACK_CIRCLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_POENITENTIA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_VOLTYGENE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_MORYU_TOKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_RUCIS_FRAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_AGUED_FIRO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_WIND_GAIL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_VORARE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_AIMING_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_GRAVITATION_STUFF)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_SHARP_STAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_SUHAINO_TSUE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_STUFF_OF_MIRACLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_FALCEN_SHOOTER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_BERNA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_MAXY_SPANA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_RAPID_FIRE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V1),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_RIPPER_CROSS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V2),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_JUDGEMENT_SLASHER),
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_ZOFUKUSARETA_ENBO_SHINEN_ARMS_V3),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_REPENT_SLASHER)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_AXE),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_GUARDIAN_SPEAR),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_CHAIN_ROPE),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_KNUCKLE),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_VIOLIN),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_MAGIC_BOOK),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_RAPIER),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V1),
		__ItemId(ITEM_ID_VIVATUS_FIDES_WAND),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V2),
		__ItemId(ITEM_ID_VIVATUS_FIDES_KATAR),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V2),
		__ItemId(ITEM_ID_VIVATUS_FIDES_CROSS_BOW),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V2),
		__ItemId(ITEM_ID_VIVATUS_FIDES_BALLISTA),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V2),
		__ItemId(ITEM_ID_VIVATUS_FIDES_TWO_HAND_STUFF),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_VIVATUS_ARMS_V2),
		__ItemId(ITEM_ID_VIVATUS_FIDES_LANCE),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_INORINO_BANSHO_DEMI_FREYA),
		__CardId(CARD_ID_DEMI_FREYA),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_BIG_EGGRING),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_BIG_EGGRING)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_HENINO_COELACANTH),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_HENINO_COELACANTH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_BOGYAKUNO_COELACANTH),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_BOGYAKUNO_COELACANTH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_ANKOKUNO_COELACANTH),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_ANKOKUNO_COELACANTH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_IKEINO_COELACANTH),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_IKEINO_COELACANTH)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_ENTVAIEN),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_ENTVAIEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_TORYO_TAKO),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_TORYO_TAKO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_NAHT_ZEEGAR),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_NAHT_ZEEGAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SAIHATENO_SHIHAISHA_KRAKEN),
		__CardId(CARD_ID_ENCHANT_SAIHATENO_SHIHAISHA),
		__CardId(CARD_ID_KRAKEN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_MONBOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_KOTE),
		__ItemId(ITEM_ID_GOYUMUSONO_MONBOSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_TSURANUKI),
		__ItemId(ITEM_ID_GOYUMUSONO_KOTE),
		__ItemId(ITEM_ID_GOYUMUSONO_TSURANUKI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_KACCHU),
		__ItemId(ITEM_ID_GOYUMUSONO_KOTE),
		__ItemId(ITEM_ID_GOYUMUSONO_KACCHU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KOTE_GOYUMUSONO_MIKOSHI),
		__ItemId(ITEM_ID_GOYUMUSONO_KOTE),
		__ItemId(ITEM_ID_GOYUMUSONO_MIKOSHI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_GOYUMUSONO_KOTE_GOKETSU),
		__ItemId(ITEM_ID_GOYUMUSONO_KOTE),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_CONCECRATE_FADES_AUREOLA_HOZYONO_MEGAMI),
		__ItemId(ITEM_ID_CONCECRATE_FADES_AUREOLA),
		__CardId(CARD_ID_ENCHANT_HOZYONO_MEGAMI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_DVINE_PHONENIXX_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_DVINE_PHONENIXX),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_DVINE_PHONENIXX_CHISHIKINO_TANKYUSHA),
		__ItemId(ITEM_ID_DVINE_PHONENIXX),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_MAJESTY_OF_YGGDRASILL_FATIH_OF_YGGDRASILL),
		__ItemId(ITEM_ID_MAJESTY_OF_YGGDRASILL),
		__ItemId(ITEM_ID_FACE_OF_YGGDRASILL)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_WONDERER_GRYM_REAPER_ZOFUKUSARETA_ENBO),
		__ItemId(ITEM_ID_WONDERER_GRYM_REAPER),
		__CardId(CARD_ID_ENCHANT_ZOFUKUSARETA_ENBO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_DRAGON_KNIGHT_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_DRAGON_KNIGHT_3),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ARCH_MAGE_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ARCH_MAGE_3),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_SWORD)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_SPEAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_AXE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_WAND)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_KATAR)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_KNIFE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_KNUCLE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_MACE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_BOW)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_WHIP)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_VIOLIN)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;

	itemSetData = [
		__ItemId(ITEM_SET_ID_IKYONO_TOKATSUSHA_GRACEA_ARMS),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_GRACEA_BOOK)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SETSUKA_ARMORS_PHYSICAL),
		__ItemId(ITEM_ID_SEKKANO_MAIL),
		__ItemId(ITEM_ID_SEKKANO_MANT),
		__ItemId(ITEM_ID_SEKKANO_BOOTS)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SETSUKA_ARMORS_MAGICAL),
		__ItemId(ITEM_ID_SEKKANO_ROBE),
		__ItemId(ITEM_ID_SEKKANO_MUFFLER),
		__ItemId(ITEM_ID_SEKKANO_SHOES)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SETSUKA_ACCESSARIES_PHYSICAL),
		__ItemId(ITEM_ID_SEKKANO_RING),
		__ItemId(ITEM_ID_SEKKANO_PENDANT)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SETSUKA_ACCESSARIES_MAGICAL),
		__ItemId(ITEM_ID_SEKKANO_EARRING),
		__ItemId(ITEM_ID_SEKKANO_NECKLACE)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_AQUILA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_AQUILA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_IKYONO_TOKATSUSHA_ULTRA_LIMACINA),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA),
		__CardId(CARD_ID_ULTRA_LIMACINA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_CHISHIKINO_TANKYUSHA_S_JUNCEA),
		__CardId(CARD_ID_ENCHANT_CHISHIKINO_TANKYUSHA),
		__CardId(CARD_ID_S_JUNCEA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_ABYSS_CHASER_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ABYSS_CHASER_3),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_WIND_HAWK_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_WIND_HAWK_3),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_KAIHO_CARDINAL_4),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_4),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_CARDINAL_5),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_CARDINAL_5),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_BIOLO_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_BIOLO_3),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SETONO_ONCHO_IKYONO_TOKATSUSHA),
		__ItemId(ITEM_ID_SETONO_ONCHO),
		__CardId(CARD_ID_ENCHANT_IKYONO_TOKATSUSHA)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_GOKETSU_SENZAI_KAIHO_INQUISITOR_2),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_INQUISITOR_2),
		__CardId(CARD_ID_ENCHANT_GOKETSU)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__CardId(CARD_SET_ID_ENCHANT_SHINRINO_KAIHO_SENZAI_ELEMENTAL_MASTER_3),
		__CardId(CARD_ID_ENCHANT_SENZAI_KAIHO_ELEMENTAL_MASTER_3),
		__CardId(CARD_ID_ENCHANT_SHINRINO_KAIHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_TOE_SIDE_DIAMOND_BOOTS_TENCHI_HOKAI),
		__ItemId(ITEM_ID_TOE_SIDE_DIAMOND_BOOTS),
		__CardId(CARD_ID_ENCHANT_TENCHI_HOKAI)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_GISHINNO_EVIL_EYE_INORINO_BANSHO),
		__ItemId(ITEM_ID_GISHINNO_EVIL_EYE),
		__CardId(CARD_ID_ENCHANT_INORINO_BANSHO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_COSMIC_CONNECTION_ZODIAC),
		__ItemId(ITEM_ID_COSMIC_CONNECTION),
		__CardId(CARD_ID_ENCHANT_ZODIAC)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;



	itemSetData = [
		__ItemId(ITEM_SET_ID_SCREAMING_GHOST_PARTY_KOKUYOKUNO_SHITO),
		__ItemId(ITEM_ID_SCREAMING_GHOST_PARTY),
		__CardId(CARD_ID_ENCHANT_KOKUYOKUNO_SHITO)
	];
	w_SE[itemSetId] = itemSetData;
	itemSetId++;














};



/**
 * ＩＤマップ定義を上書き定義する.
 */
CItemSetDataMaker.OverrideIdToSetIdMap = function () {

	var idx = 0;
	var idxData = 0;

	var itemSetData = null;
	var memberId = 0;
	var dataId = 0;
	var idMapItem = null;
	var idMapCard = null;
	var idMapPet = null;



	//----------------------------------------------------------------
	// アイテムIDからセットIDを検索するマップ定義部
	//----------------------------------------------------------------

	// 当該日付時点では存在しないデータなので、データ定義から作成
	idMapItem = new Array();
	idMapCard = new Array();
	idMapPet = new Array();
	for (idx = 0; idx < w_SE.length; idx++) {

		itemSetData = w_SE[idx];

		for (idxData = 1; idxData < itemSetData.length; idxData++) {

			// メンバー指定IDを取得
			memberId = itemSetData[idxData];

			// データIDを特定
			dataId = Math.abs(memberId);

			// アイテム指定の場合
			if (memberId > 0) {
				// 新規要素の場合は配列を用意
				if (!idMapItem[dataId]) {
					idMapItem[dataId] = new Array();
				}
				// 未登録の場合のみ、追加
				if (idMapItem[dataId].indexOf(idx) < 0) {
					idMapItem[dataId].push(idx);
				}
			}

			// カード指定の場合
			else if (memberId < (ITEM_SET_PET_ID_OFFSET * -1)) {

				dataId -= ITEM_SET_PET_ID_OFFSET;

				// 新規要素の場合は配列を用意
				if (!idMapPet[dataId]) {
					idMapPet[dataId] = new Array();
				}
				// 未登録の場合のみ、追加
				if (idMapPet[dataId].indexOf(idx) < 0) {
					idMapPet[dataId].push(idx);
				}
			}

			// カード指定の場合
			else {
				// 新規要素の場合は配列を用意
				if (!idMapCard[dataId]) {
					idMapCard[dataId] = new Array();
				}
				// 未登録の場合のみ、追加
				if (idMapCard[dataId].indexOf(idx) < 0) {
					idMapCard[dataId].push(idx);
				}
			}
		}
	}

	ItemIdToSetIdMap = idMapItem;
	CardIdToSetIdMap = idMapCard;
	PetIdToSetIdMap = idMapPet;
};



// データ上書き
if (_DATA_CREATE_MODE) {
	CItemSetDataMaker.OverrideData();
	CItemSetDataMaker.OverrideIdToSetIdMap();
}
