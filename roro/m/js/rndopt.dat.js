(function () {

	g_rndOptArray = [
		[0,0,0,0,1,0],
		[1,1,0,200,1,0],
		[2,2,0,200,1,0],
		[3,3,0,200,1,0],
		[4,4,0,200,1,0],
		[5,5,0,200,1,0],
		[6,6,0,200,1,0],
		[7,7,0,200,1,0],
		[8,8,0,200,1,0],
		[9,9,0,200,1,0],
		[10,10,0,200,1,0],	// "ITEM_SP_CRI_PLUS",		10 CRI		固定値上昇
		[11,11,0,200,1,0],	// "ITEM_SP_LUCKY_PLUS",	11 完全回避	固定値上昇
		[12,12,0,200,1,0],	// "ITEM_SP_ASPD_UP",		12 ASPD		％上昇
		[13,101,0,200,1,0],	// "ITEM_SP_ASPD_PLUS",		101 ASPD上昇 (加算)
		[14,13,0,200,1,0],
		[15,15,0,200,1,0],
		[16,14,0,200,1,0],
		[17,16,0,200,1,0],
		[18,75,0,200,1,0],
		[19,76,0,200,1,0],
		[20,17,0,200,1,0],	// 17  "ITEM_SP_ATK_PLUS"
		[21,100,0,200,1,0],	// 100 "ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON",	100 MATK上昇 (杖型ではない)
		[22,18,0,200,1,0],
		[23,19,0,200,1,0],
		[24,73,0,200,1,0],	// "ITEM_SP_SKILL_CAST_TIME",			 73 詠唱時間
		[25,74,0,200,1,0],	// "ITEM_SP_SKILL_DELAY_DOWN",			 74 ディレイ
		[26,70,0,200,1,0],  // "ITEM_SP_CRITICAL_DAMAGE_UP",		 70 クリティカルダメージ増加
		[27,25,0,200,1,0],
		[28,78,0,200,1,0],
		[29,91,0,200,1,0],
		[30,92,0,200,1,0],
		[31,30,0,200,1,0],
		[32,31,0,200,1,0],
		[33,32,0,200,1,0],
		[34,33,0,200,1,0],
		[35,34,0,200,1,0],
		[36,35,0,200,1,0],
		[37,36,0,200,1,0],
		[38,37,0,200,1,0],
		[39,38,0,200,1,0],
		[40,39,0,200,1,0],
		[41,40,0,200,1,0],
		[42,41,0,200,1,0],
		[43,42,0,200,1,0],
		[44,43,0,200,1,0],
		[45,44,0,200,1,0],
		[46,45,0,200,1,0],
		[47,46,0,200,1,0],
		[48,47,0,200,1,0],
		[49,48,0,200,1,0],
		[50,49,0,200,1,0],
		[51,27,0,200,1,0],
		[52,28,0,200,1,0],
		[53,29,0,200,1,0],
		[54,267,0,200,1,0],
		[55,26,0,200,1,0],
		[56,241,0,200,1,0],
		[57,275,0,200,1,0],
		[58,272,0,200,1,0],
		[59,170,0,200,1,0],
		[60,171,0,200,1,0],
		[61,172,0,200,1,0],
		[62,173,0,200,1,0],
		[63,174,0,200,1,0],
		[64,175,0,200,1,0],
		[65,176,0,200,1,0],
		[66,177,0,200,1,0],
		[67,178,0,200,1,0],
		[68,179,0,200,1,0],
		[69,350,0,200,1,0],
		[70,351,0,200,1,0],
		[71,352,0,200,1,0],
		[72,353,0,200,1,0],
		[73,354,0,200,1,0],
		[74,355,0,200,1,0],
		[75,356,0,200,1,0],
		[76,357,0,200,1,0],
		[77,358,0,200,1,0],
		[78,359,0,200,1,0],
		[79,97,0,200,1,0],
		[80,98,0,200,1,0],
		[81,99,0,200,1,0],
		[82,268,0,200,1,0],
		[83,96,0,200,1,0],
		[84,242,0,200,1,0],
		[85,276,0,200,1,0],
		[86,273,0,200,1,0],
		[87,110,0,200,1,0],
		[88,111,0,200,1,0],
		[89,112,0,200,1,0],
		[90,113,0,200,1,0],
		[91,114,0,200,1,0],
		[92,115,0,200,1,0],
		[93,116,0,200,1,0],
		[94,117,0,200,1,0],
		[95,118,0,200,1,0],
		[96,119,0,200,1,0],
		[97,300,0,200,1,0],
		[98,301,0,200,1,0],
		[99,302,0,200,1,0],
		[100,303,0,200,1,0],
		[101,304,0,200,1,0],
		[102,305,0,200,1,0],
		[103,306,0,200,1,0],
		[104,307,0,200,1,0],
		[105,308,0,200,1,0],
		[106,309,0,200,1,0],
		[107,291,0,200,1,0],
		[108,292,0,200,1,0],
		[109,310,0,200,1,0],
		[110,311,0,200,1,0],
		[111,312,0,200,1,0],
		[112,313,0,200,1,0],
		[113,314,0,200,1,0],
		[114,315,0,200,1,0],
		[115,316,0,200,1,0],
		[116,317,0,200,1,0],
		[117,318,0,200,1,0],
		[118,319,0,200,1,0],
		[119,296,0,200,1,0],
		[120,297,0,200,1,0],
		[121,50,0,200,1,0],
		[122,51,0,200,1,0],
		[123,52,0,200,1,0],
		[124,53,0,200,1,0],
		[125,54,0,200,1,0],
		[126,55,0,200,1,0],
		[127,56,0,200,1,0],
		[128,57,0,200,1,0],
		[129,108,0,200,1,0],
		[130,58,0,200,1,0],
		[131,59,0,200,1,0],
		[132,60,0,200,1,0], // 60 "ITEM_SP_RESIST_ELM_VANITY
		[133,61,0,200,1,0], // 61 "ITEM_SP_RESIST_ELM_WATER"
		[134,62,0,200,1,0], // 62 "ITEM_SP_RESIST_ELM_EARTH" 
		[135,63,0,200,1,0], // 63 "ITEM_SP_RESIST_ELM_FIRE"
		[136,64,0,200,1,0], // 64 "ITEM_SP_RESIST_ELM_WIND"
		[137,65,0,200,1,0], // 65 "ITEM_SP_RESIST_ELM_POISON"
		[138,66,0,200,1,0], // 66 "ITEM_SP_RESIST_ELM_HOLY"
		[139,67,0,200,1,0], // 67 "ITEM_SP_RESIST_ELM_DARK"
		[140,68,0,200,1,0], // 68 "ITEM_SP_RESIST_ELM_PSYCO"
		[141,69,0,200,1,0], // 69 "ITEM_SP_RESIST_ELM_UNDEAD"
		[142,330,0,200,1,0],
		[143,331,0,200,1,0],
		[144,332,0,200,1,0],
		[145,333,0,200,1,0],
		[146,334,0,200,1,0],
		[147,335,0,200,1,0],
		[148,336,0,200,1,0],
		[149,337,0,200,1,0],
		[150,338,0,200,1,0],
		[151,339,0,200,1,0],
		[152,190,0,200,1,0],
		[153,191,0,200,1,0],
		[154,192,0,200,1,0],
		[155,79,0,200,1,0],
		[156,77,0,200,1,0],
		[157,243,0,200,1,0],
		[158,277,0,200,1,0],
		[159,274,0,200,1,0],
		[160,226,1,1,1,0],
		[161,227,1,1,1,0],
		[162,194,0,1,1,0],
		[163,102,0,200,1,0], // "ITEM_SP_COST_DOWN",		102	消費SP減少
		[164,1,0,20,1,0],
		[165,2,0,20,1,0],
		[166,3,0,20,1,0],
		[167,4,0,20,1,0],
		[168,5,0,20,1,0],
		[169,6,0,20,1,0],
		[170,15,0,10,1,0],
		[171,16,0,10,1,0],
		[172,17,0,50,1,0],
		[173,100,0,50,1,0],
		[174,18,0,100,1,0],
		[175,19,0,10,1,0],
		[176,61,0,5,1,0],
		[177,62,0,5,1,0],
		[178,63,0,5,1,0],
		[179,64,0,5,1,0],
		[180,8,0,50,1,0],
		[181,9,0,50,1,0],
		[182,30,0,20,1,0],
		[183,31,0,20,1,0],
		[184,32,0,20,1,0],
		[185,33,0,20,1,0],
		[186,34,0,20,1,0],
		[187,35,0,20,1,0],
		[188,36,0,20,1,0],
		[189,106,0,20,1,0],
		[190,38,0,20,1,0],
		[191,39,0,20,1,0],
		[192,170,0,20,1,0],
		[193,171,0,20,1,0],
		[194,172,0,20,1,0],
		[195,173,0,20,1,0],
		[196,174,0,20,1,0],
		[197,175,0,20,1,0],
		[198,176,0,20,1,0],
		[199,107,0,20,1,0],
		[200,178,0,20,1,0],
		[201,179,0,20,1,0],
		[202,12,0,20,1,0],
		[203,91,0,20,1,0],
		[204,73,0,20,1,0],
		[205,74,0,20,1,0],
		[206,27,0,20,1,0],
		[207,28,0,20,1,0],
		[208,29,0,20,1,0],
		[209,97,0,20,1,0],
		[210,98,0,20,1,0],
		[211,99,0,20,1,0],
		[212,91,0,60,1,0],
		[213,10,0,10,1,0],
		[214,74,0,15,1,0],
		[215,102,0,20,1,0],
		[216,228,1,1,1,1],
		[217,1,0,10,1,0],
		[218,2,0,10,1,0],
		[219,3,0,10,1,0],
		[220,4,0,10,1,0],
		[221,5,0,10,1,0],
		[222,6,0,10,1,0],
		[223,15,0,20,1,0],
		[224,16,0,20,1,0],
		[225,12,0,10,1,0],
		[226,11,0,10,1,0],
		[227,73,0,10,1,0],
		[228,74,0,10,1,0],
		[229,102,0,10,1,0],
		[230,17,0,100,1,0],
		[231,100,0,100,1,0],
		[232,11,0,20,1,0],
		[233,27,0,30,1,0],
		[234,28,0,30,1,0],
		[235,29,0,30,1,0],
		[236,97,0,30,1,0],
		[237,98,0,30,1,0],
		[238,99,0,30,1,0],
		[239,230,0,10,1,0],
		[240,231,0,10,1,0],
		[241,232,0,10,1,0],
		[242,233,0,10,1,0],
		[243,234,0,10,1,0],
		[244,235,0,10,1,0],
		[245,12,0,15,1,0],
		[246,73,0,15,1,0],
		[247,1,0,3,1,0],
		[248,2,0,3,1,0],
		[249,3,0,3,1,0],
		[250,4,0,3,1,0],
		[251,5,0,3,1,0],
		[252,6,0,3,1,0],
		[253,75,0,20,1,0],
		[254,76,0,20,1,0],
		[255,13,0,500,1,0],
		[256,14,0,5,1,0],
		[257,250,0,3,1,0],
		[258,251,0,3,1,0],
		[259,252,0,5,1,0],
		[260,253,0,3,1,0],
		[261,254,0,15,1,0],
		[262,255,0,15,1,0],
		[263,91,0,20,1,0],	// オルタネイトアーマー の ヒール回復量増加(91)
		[264,18,0,50,1,0],
		[265,10,0,15,1,0],
		[266,70,0,15,1,0],
		[267,11,0,3,1,0],
		[268,230,0,3,1,0],
		[269,231,0,3,1,0],
		[270,232,0,3,1,0],
		[271,233,0,3,1,0],
		[272,234,0,3,1,0],
		[273,235,0,3,1,0],
	];

})();
