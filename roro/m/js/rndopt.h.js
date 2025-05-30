
//----------------------------------------------------------------
// データの要素番号
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumRndOptDataIndex",
	[
		"RND_OPT_DATA_INDEX_ID",
		"RND_OPT_DATA_INDEX_SPID",
		"RND_OPT_DATA_INDEX_MIN",
		"RND_OPT_DATA_INDEX_MAX",
		"RND_OPT_DATA_INDEX_STEP",
		"RND_OPT_DATA_INDEX_SPECIAL_FLAG",
	],
	0,
	1
);



//----------------------------------------------------------------
// 特殊フラグ
//----------------------------------------------------------------
CGlobalConstManager.DefineEnum(
	"EnumRndOptSpecialFlag",
	[
		"RND_OPT_SPECIAL_FLAG_NONE",
		"RND_OPT_SPECIAL_FLAG_ONOFF",
	],
	0,
	1
);



/**
 * ランダムオプションの表示名を取得する.
 * @param spid SPID
 : @return ランダムオプションの表示名
 */
function GetRndOptDispName(spid) {
	switch (spid) {

	case ITEM_SP_NONE:
		return "オプションなし";

	case ITEM_SP_STR_PLUS:
		return "STR+";
	case ITEM_SP_AGI_PLUS:
		return "AGI+";
	case ITEM_SP_VIT_PLUS:
		return "VIT+";
	case ITEM_SP_INT_PLUS:
		return "INT+";
	case ITEM_SP_DEX_PLUS:
		return "DEX+";
	case ITEM_SP_LUK_PLUS:
		return "LUK+";
	case ITEM_SP_ALLSTATUS_PLUS:
		return "全基本ステ+";

	case ITEM_SP_HIT_PLUS:
		return "Hit+";
	case ITEM_SP_FLEE_PLUS:
		return "Flee+";
	case ITEM_SP_CRI_PLUS:
		return "Cri+";
	case ITEM_SP_LUCKY_PLUS:
		return "完全回避+";
	case ITEM_SP_ASPD_UP:
		return "ASPD％";
	case ITEM_SP_ASPD_PLUS:
		return "ASPD+";

	case ITEM_SP_MAXHP_PLUS:
		return "MaxHP+";
	case ITEM_SP_MAXHP_UP:
		return "MaxHP％";
	case ITEM_SP_MAXSP_PLUS:
		return "MaxSP+";
	case ITEM_SP_MAXSP_UP:
		return "MaxSP％";

	case ITEM_SP_HPR_UP:
		return "HP回復力％";
	case ITEM_SP_SPR_UP:
		return "SP回復力％";

	case ITEM_SP_ATK_PLUS:
		return "Atk+";
	case ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON:
		return "Matk+";
	case ITEM_SP_DEF_PLUS:
		return "Def+";
	case ITEM_SP_MDEF_PLUS:
		return "Mdef+";

	case ITEM_SP_SKILL_CAST_TIME:
		return "詠唱時間-";
	case ITEM_SP_SKILL_DELAY_DOWN:
		return "ディレイ-";
	case ITEM_SP_CRITICAL_DAMAGE_UP:
		return "クリティカルダメージ％";

	case ITEM_SP_LONGRANGE_DAMAGE_UP:
		return "遠距離ダメージ％";
	case ITEM_SP_RESIST_LONGRANGE:
		return "遠距離耐性％";

	case ITEM_SP_HEAL_UP_USING:
		return "ヒール回復ＵＰ％";
	case ITEM_SP_HEAL_UP_USED:
		return "ヒール被回復ＵＰ％";

	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID:
		return "物理UP－種族(無形)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD:
		return "物理UP－種族(不死)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL:
		return "物理UP－種族(動物)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT:
		return "物理UP－種族(植物)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT:
		return "物理UP－種族(昆虫)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH:
		return "物理UP－種族(魚類)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON:
		return "物理UP－種族(悪魔)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN:
		return "物理UP－種族(人間)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL:
		return "物理UP－種族(天使)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON:
		return "物理UP－種族(竜族)";

	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
		return "物理UP－敵属性(無)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER:
		return "物理UP－敵属性(水)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
		return "物理UP－敵属性(地)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
		return "物理UP－敵属性(火)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND:
		return "物理UP－敵属性(風)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON:
		return "物理UP－敵属性(毒)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
		return "物理UP－敵属性(聖)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK:
		return "物理UP－敵属性(闇)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
		return "物理UP－敵属性(念)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
		return "物理UP－敵属性(不死)";

	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL:
		return "物理UP－サイズ(小)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM:
		return "物理UP－サイズ(中)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE:
		return "物理UP－サイズ(大)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS:
		return "物理UP－敵級(一般)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS:
		return "物理UP－敵級(ボス)";

	case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL:
		return "物理UP－対人(すべて)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN:
		return "物理UP－対人(人間)";
	case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM:
		return "物理UP－対人(ドラム)";

	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID:
		return "魔法UP－種族(無形)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD:
		return "魔法UP－種族(不死)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL:
		return "魔法UP－種族(動物)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT:
		return "魔法UP－種族(植物)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT:
		return "魔法UP－種族(昆虫)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH:
		return "魔法UP－種族(魚類)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON:
		return "魔法UP－種族(悪魔)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN:
		return "魔法UP－種族(人間)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL:
		return "魔法UP－種族(天使)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON:
		return "魔法UP－種族(竜族)";

	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
		return "魔法UP－敵属性(無)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER:
		return "魔法UP－敵属性(水)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
		return "魔法UP－敵属性(地)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
		return "魔法UP－敵属性(火)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND:
		return "魔法UP－敵属性(風)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON:
		return "魔法UP－敵属性(毒)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
		return "魔法UP－敵属性(聖)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK:
		return "魔法UP－敵属性(闇)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
		return "魔法UP－敵属性(念)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
		return "魔法UP－敵属性(不死)";

	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL:
		return "魔法UP－サイズ(小)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM:
		return "魔法UP－サイズ(中)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE:
		return "魔法UP－サイズ(大)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS:
		return "魔法UP－敵級(一般)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_BOSS:
		return "魔法UP－敵級(ボス)";

	case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL:
		return "魔法UP－対人(すべて)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN:
		return "魔法UP－対人(人間)";
	case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM:
		return "魔法UP－対人(ドラム)";

	case ITEM_SP_CRITICAL_UP_RACE_SOLID:
		return "クリUP－種族(無形)";
	case ITEM_SP_CRITICAL_UP_RACE_UNDEAD:
		return "クリUP－種族(不死)";
	case ITEM_SP_CRITICAL_UP_RACE_ANIMAL:
		return "クリUP－種族(動物)";
	case ITEM_SP_CRITICAL_UP_RACE_PLANT:
		return "クリUP－種族(植物)";
	case ITEM_SP_CRITICAL_UP_RACE_INSECT:
		return "クリUP－種族(昆虫)";
	case ITEM_SP_CRITICAL_UP_RACE_FISH:
		return "クリUP－種族(魚類)";
	case ITEM_SP_CRITICAL_UP_RACE_DEMON:
		return "クリUP－種族(悪魔)";
	case ITEM_SP_CRITICAL_UP_RACE_HUMAN:
		return "クリUP－種族(人間)";
	case ITEM_SP_CRITICAL_UP_RACE_ANGEL:
		return "クリUP－種族(天使)";
	case ITEM_SP_CRITICAL_UP_RACE_DRAGON:
		return "クリUP－種族(竜族)";

	case ITEM_SP_IGNORE_DEF_RACE_SOLID:
		return "DEF無視－種族(無形)";
	case ITEM_SP_IGNORE_DEF_RACE_UNDEAD:
		return "DEF無視－種族(不死)";
	case ITEM_SP_IGNORE_DEF_RACE_ANIMAL:
		return "DEF無視－種族(動物)";
	case ITEM_SP_IGNORE_DEF_RACE_PLANT:
		return "DEF無視－種族(植物)";
	case ITEM_SP_IGNORE_DEF_RACE_INSECT:
		return "DEF無視－種族(昆虫)";
	case ITEM_SP_IGNORE_DEF_RACE_FISH:
		return "DEF無視－種族(魚類)";
	case ITEM_SP_IGNORE_DEF_RACE_DEMON:
		return "DEF無視－種族(悪魔)";
	case ITEM_SP_IGNORE_DEF_RACE_HUMAN:
		return "DEF無視－種族(人間)";
	case ITEM_SP_IGNORE_DEF_RACE_ANGEL:
		return "DEF無視－種族(天使)";
	case ITEM_SP_IGNORE_DEF_RACE_DRAGON:
		return "DEF無視－種族(竜族)";
	case ITEM_SP_IGNORE_DEF_NOTBOSS:
		return "DEF無視－敵級(一般)";
	case ITEM_SP_IGNORE_DEF_BOSS:
		return "DEF無視－敵級(ボス)";

	case ITEM_SP_IGNORE_MDEF_RACE_SOLID:
		return "MDEF無視－種族(無形)";
	case ITEM_SP_IGNORE_MDEF_RACE_UNDEAD:
		return "MDEF無視－種族(不死)";
	case ITEM_SP_IGNORE_MDEF_RACE_ANIMAL:
		return "MDEF無視－種族(動物)";
	case ITEM_SP_IGNORE_MDEF_RACE_PLANT:
		return "MDEF無視－種族(植物)";
	case ITEM_SP_IGNORE_MDEF_RACE_INSECT:
		return "MDEF無視－種族(昆虫)";
	case ITEM_SP_IGNORE_MDEF_RACE_FISH:
		return "MDEF無視－種族(魚類)";
	case ITEM_SP_IGNORE_MDEF_RACE_DEMON:
		return "MDEF無視－種族(悪魔)";
	case ITEM_SP_IGNORE_MDEF_RACE_HUMAN:
		return "MDEF無視－種族(人間)";
	case ITEM_SP_IGNORE_MDEF_RACE_ANGEL:
		return "MDEF無視－種族(天使)";
	case ITEM_SP_IGNORE_MDEF_RACE_DRAGON:
		return "MDEF無視－種族(竜族)";
	case ITEM_SP_IGNORE_MDEF_NOTBOSS:
		return "MDEF無視－敵級(一般)";
	case ITEM_SP_IGNORE_MDEF_BOSS:
		return "MDEF無視－敵級(ボス)";

	case ITEM_SP_RESIST_RACE_SOLID:
		return "耐性－種族(無形)";
	case ITEM_SP_RESIST_RACE_UNDEAD:
		return "耐性－種族(不死)";
	case ITEM_SP_RESIST_RACE_ANIMAL:
		return "耐性－種族(動物)";
	case ITEM_SP_RESIST_RACE_PLANT:
		return "耐性－種族(植物)";
	case ITEM_SP_RESIST_RACE_INSECT:
		return "耐性－種族(昆虫)";
	case ITEM_SP_RESIST_RACE_FISH:
		return "耐性－種族(魚類)";
	case ITEM_SP_RESIST_RACE_DEMON:
		return "耐性－種族(悪魔)";
	case ITEM_SP_RESIST_RACE_HUMAN:
		return "耐性－種族(人間)";
	case ITEM_SP_RESIST_RACE_ANGEL:
		return "耐性－種族(天使)";
	case ITEM_SP_RESIST_RACE_DRAGON:
		return "耐性－種族(竜族)";

	case ITEM_SP_RESIST_ELM_VANITY:
		return "耐性－属性攻撃(無)";
	case ITEM_SP_RESIST_ELM_WATER:
		return "耐性－属性攻撃(水)";
	case ITEM_SP_RESIST_ELM_EARTH:
		return "耐性－属性攻撃(地)";
	case ITEM_SP_RESIST_ELM_FIRE:
		return "耐性－属性攻撃(火)";
	case ITEM_SP_RESIST_ELM_WIND:
		return "耐性－属性攻撃(風)";
	case ITEM_SP_RESIST_ELM_POISON:
		return "耐性－属性攻撃(毒)";
	case ITEM_SP_RESIST_ELM_HOLY:
		return "耐性－属性攻撃(聖)";
	case ITEM_SP_RESIST_ELM_DARK:
		return "耐性－属性攻撃(闇)";
	case ITEM_SP_RESIST_ELM_PSYCO:
		return "耐性－属性攻撃(念)";
	case ITEM_SP_RESIST_ELM_UNDEAD:
		return "耐性－属性攻撃(不死)";

	case ITEM_SP_RESIST_MONSTER_ELM_VANITY:
		return "耐性－属性敵(無)";
	case ITEM_SP_RESIST_MONSTER_ELM_WATER:
		return "耐性－属性敵(水)";
	case ITEM_SP_RESIST_MONSTER_ELM_EARTH:
		return "耐性－属性敵(地)";
	case ITEM_SP_RESIST_MONSTER_ELM_FIRE:
		return "耐性－属性敵(火)";
	case ITEM_SP_RESIST_MONSTER_ELM_WIND:
		return "耐性－属性敵(風)";
	case ITEM_SP_RESIST_MONSTER_ELM_POISON:
		return "耐性－属性敵(毒)";
	case ITEM_SP_RESIST_MONSTER_ELM_HOLY:
		return "耐性－属性敵(聖)";
	case ITEM_SP_RESIST_MONSTER_ELM_DARK:
		return "耐性－属性敵(闇)";
	case ITEM_SP_RESIST_MONSTER_ELM_PSYCO:
		return "耐性－属性敵(念)";
	case ITEM_SP_RESIST_MONSTER_ELM_UNDEAD:
		return "耐性－属性敵(不死)";

	case ITEM_SP_RESIST_SIZE_SMALL:
		return "耐性－サイズ(小)";
	case ITEM_SP_RESIST_SIZE_MEDIUM:
		return "耐性－サイズ(中)";
	case ITEM_SP_RESIST_SIZE_LARGE:
		return "耐性－サイズ(大)";
	case ITEM_SP_RESIST_NOTBOSS:
		return "耐性－敵級(一般)";
	case ITEM_SP_RESIST_BOSS:
		return "耐性－敵級(ボス)";

	case ITEM_SP_RESIST_PLAYER_ALL:
		return "耐性－対人(すべて)";
	case ITEM_SP_RESIST_PLAYER_HUMAN:
		return "耐性－対人(人間)";
	case ITEM_SP_RESIST_PLAYER_DORAM:
		return "耐性－対人(ドラム)";

	case ITEM_SP_USE_ENCHANT_ELM_CONF:
		return "※属性付与で設定";
	case ITEM_SP_NOT_IMPLEMENTED:
		return "※未対応";

	case ITEM_SP_UNBREAKABLE:
		return "破壊不可";

	case ITEM_SP_COST_DOWN:
		return "消費SP減少";

	case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
		return "物理UP－種族(人間/非ﾌﾟﾚｲﾔｰ)";

	case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
		return "魔法UP－種族(人間/非ﾌﾟﾚｲﾔｰ)";

	case ITEM_SP_SIZE_PERFECTION:
		return "サイズ補正100%";

	case ITEM_SP_POW_PLUS:
		return "POW+";
	case ITEM_SP_STA_PLUS:
		return "STA+";
	case ITEM_SP_WIS_PLUS:
		return "WIS+";
	case ITEM_SP_SPL_PLUS:
		return "SPL+";
	case ITEM_SP_CON_PLUS:
		return "CON+";
	case ITEM_SP_CRT_PLUS:
		return "CRT+";
	case ITEM_SP_ALL_SPECS_PLUS:
		return "全特性ステ+";

	case ITEM_SP_P_ATK_PLUS:
		return "P.Atk+";
	case ITEM_SP_S_MATK_PLUS:
		return "S.Matk+";
	case ITEM_SP_H_PLUS_PLUS:
		return "H.Plus+";
	case ITEM_SP_C_RATE_PLUS:
		return "C.Rate+";
	case ITEM_SP_RES_PLUS:
		return "Res+";
	case ITEM_SP_MRES_PLUS:
		return "Mres+";

	}

	return "";
}



g_rndOptArray = new Array();

