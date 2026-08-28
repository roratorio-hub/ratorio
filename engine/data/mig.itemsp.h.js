// === AUTO-GENERATED IMPORTS ===
import "../runtime/common.js";
import "../item.h.js";
import { CardObjNew } from "../card.dat.js";
import { ItemObjNew } from "../item.dat.js";
import { IsDualArmsJob } from "./mig.job.h.js";
import {
         MIG_JOB_ID_ACOLYTE,
         MIG_JOB_ID_ALCHEMIST,
         MIG_JOB_ID_ARCBISHOP,
         MIG_JOB_ID_ARCHER,
         MIG_JOB_ID_ASSASIN,
         MIG_JOB_ID_ASSASINCROSS,
         MIG_JOB_ID_BARD,
         MIG_JOB_ID_BLACKSMITH,
         MIG_JOB_ID_CHAMPION,
         MIG_JOB_ID_CHASER,
         MIG_JOB_ID_CREATOR,
         MIG_JOB_ID_CROWN,
         MIG_JOB_ID_CRUSADER,
         MIG_JOB_ID_DANCER,
         MIG_JOB_ID_GENETIC,
         MIG_JOB_ID_GILOTINCROSS,
         MIG_JOB_ID_GUNSLINGER,
         MIG_JOB_ID_HIGHPRIEST,
         MIG_JOB_ID_HIGHWIZARD,
         MIG_JOB_ID_HI_ACOLYTE,
         MIG_JOB_ID_HI_ARCHER,
         MIG_JOB_ID_HI_MAGICIAN,
         MIG_JOB_ID_HI_MARCHANT,
         MIG_JOB_ID_HI_NOVICE,
         MIG_JOB_ID_HI_SWORDMAN,
         MIG_JOB_ID_HI_THIEF,
         MIG_JOB_ID_HUNTER,
         MIG_JOB_ID_KAGERO,
         MIG_JOB_ID_KNIGHT,
         MIG_JOB_ID_LORDKNIGHT,
         MIG_JOB_ID_MAGICIAN,
         MIG_JOB_ID_MARCHANT,
         MIG_JOB_ID_MECHANIC,
         MIG_JOB_ID_MINSTREL,
         MIG_JOB_ID_MONK,
         MIG_JOB_ID_NINJA,
         MIG_JOB_ID_NOVICE,
         MIG_JOB_ID_OBORO,
         MIG_JOB_ID_PALADIN,
         MIG_JOB_ID_PRIEST,
         MIG_JOB_ID_PROFESSOR,
         MIG_JOB_ID_RANGER,
         MIG_JOB_ID_REBELLION,
         MIG_JOB_ID_ROGUE,
         MIG_JOB_ID_ROYALGUARD,
         MIG_JOB_ID_RUNEKNIGHT,
         MIG_JOB_ID_SAGE,
         MIG_JOB_ID_SHADOWCHASER,
         MIG_JOB_ID_SHURA,
         MIG_JOB_ID_SNIPER,
         MIG_JOB_ID_SORCERER,
         MIG_JOB_ID_SOULLINKER,
         MIG_JOB_ID_SOUL_REAPER,
         MIG_JOB_ID_STARGRADIATOR,
         MIG_JOB_ID_STAR_EMPEROR,
         MIG_JOB_ID_SUMMONER,
         MIG_JOB_ID_SUPERNOVICE,
         MIG_JOB_ID_SUPERNOVICE_PLUS,
         MIG_JOB_ID_SWORDMAN,
         MIG_JOB_ID_TAEGWON,
         MIG_JOB_ID_THIEF,
         MIG_JOB_ID_WANDERER,
         MIG_JOB_ID_WARLOCK,
         MIG_JOB_ID_WHITESMITH,
         MIG_JOB_ID_WIZARD,
         MIG_JOB_ID_ZYPSY,
} from "./mig.job.id.js";
import { CMigEquipableSpTag } from "./CMigEquipableSpTag.js";
// === END AUTO-GENERATED IMPORTS ===
import { MIG_BORDER_FLAG_ID_BY, MIG_BORDER_FLAG_ID_EQUAL, MIG_BORDER_FLAG_ID_NOT, MIG_BORDER_FLAG_ID_OVER, MIG_BORDER_FLAG_ID_UNDER } from "../const/EnumMigBorderFlagId.js";


// 移行後は common などに移動するもの

export const MIG_SKILL_ID_ANY = -1;
export const MIG_ITEM_ID_ANY = -1;
export const MIG_CARD_ID_ANY = -1;
export const MIG_ARROW_ID_ANY = -1;
export const MIG_COSTUME_ID_ANY = -1;

// 移行後は不要になるはずのもの

/**
 * 汎用エラーテキストを取得する.
 * @param text 判定対象テキスト
 * @return true:エラーを示すテキスト、false:正常なテキスト
 */
export function MigGetGeneralErrorText() {
	return "エラー";
}

/**
 * 境界値フラグのテキストを取得する.
 * @param flagId 境界値フラグID
 * @param bShort 短縮形フラグ
 * @return 境界値フラグのテキスト
 */
export function MigGetBorderFlagText(flagId, bShort) {

	switch (flagId) {

	case MIG_BORDER_FLAG_ID_EQUAL:
		return (bShort ? "" : "の時");

	case MIG_BORDER_FLAG_ID_NOT:
		return (bShort ? "未習得" : "未習得の時");

	case MIG_BORDER_FLAG_ID_UNDER:
		return ("以下" + (bShort ? "" : "の時"));

	case MIG_BORDER_FLAG_ID_OVER:
		return ("以上" + (bShort ? "" : "の時"));

	case MIG_BORDER_FLAG_ID_BY:
		return (bShort ? "毎" : "上がる毎に");

	}

	return MigGetGeneralErrorText();
}


