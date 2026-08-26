import { w_SE } from "./itemset.dat.js";
import { GetItemSetMemberText } from "./itemset-bridge.js";
// === AUTO-GENERATED IMPORTS ===
import "./monster.h.js";
import "./skill.h.js";
import "./usableskill.h.js";
import { toSafeBigInt } from '../roro/common/js/util.js';
import { AutoSpellSkill } from "./autospell.dat.js";
import { GetAutoSpellTriggerText } from "./autospell.h.js";
import { CardObjNew } from "./card.dat.js";
import { GetElementText, GetRaceText, GetSizeText, GetStateText } from "./common.js";
import { ItemObjNew } from "./item.dat.js";
import { MonsterObjNew } from "./monster.dat.js";
import { SkillObjNew } from "./skill.dat.js";
import { InsertSkill } from "./usableskill.dat.js";
import { PARAM_DEX, PARAM_VIT } from "./const/EnumParamId.js";
import { RACE_ID_HUMAN } from "./const/EnumRaceId.js";
import { AUTO_SPELL_DATA_INDEX_PROBABLY, AUTO_SPELL_DATA_INDEX_SKILL_ID, AUTO_SPELL_DATA_INDEX_SKILL_LEVEL, AUTO_SPELL_DATA_INDEX_TRIGGER } from "./const/EnumAutoSpellDataIndex.js";
import { CARD_DATA_INDEX_KIND, CARD_DATA_INDEX_NAME } from "./const/EnumCardDataIndex.js";
import { CARD_KIND_SET } from "./const/EnumCardKind.js";
import {
    ITEM_EQPFLG_4TH, ITEM_EQPFLG_4TH_ACOLYTE, ITEM_EQPFLG_4TH_BLADE_USER, ITEM_EQPFLG_4TH_BOOK_USER, ITEM_EQPFLG_4TH_BOW_USER, ITEM_EQPFLG_4TH_EXCLUDE_CAT,
    ITEM_EQPFLG_4TH_HAMMER_USER, ITEM_EQPFLG_4TH_ROD_USER_EXCLUDE_NOVICE, ITEM_EQPFLG_4TH_SWORDMAN, ITEM_EQPFLG_4TH_SWORDMAN_MERCHANT, ITEM_EQPFLG_4TH_SWORDMAN_MERCHANT_ALITEA, ITEM_EQPFLG_4TH_THIEF,
    ITEM_EQPFLG_ABYSS_CHASER, ITEM_EQPFLG_ALITEA, ITEM_EQPFLG_ARCBISHOP, ITEM_EQPFLG_ARCH_MAGE, ITEM_EQPFLG_BIOLO, ITEM_EQPFLG_CARDINAL,
    ITEM_EQPFLG_DRAGON_KNIGHT, ITEM_EQPFLG_ELEMENTAL_MASTER, ITEM_EQPFLG_GENETIC, ITEM_EQPFLG_GLTCROSS, ITEM_EQPFLG_HYPER_NOVICE, ITEM_EQPFLG_IGNORE_NOVICE_SERIES,
    ITEM_EQPFLG_IMPERIAL_GUARD, ITEM_EQPFLG_INQUISITOR, ITEM_EQPFLG_MAJO_NO_HOUKI, ITEM_EQPFLG_MECHANIC, ITEM_EQPFLG_MEISTER, ITEM_EQPFLG_MINSTREL,
    ITEM_EQPFLG_MINSTREL_WANDERER, ITEM_EQPFLG_NIGHT_WATCH, ITEM_EQPFLG_NONE, ITEM_EQPFLG_RANGER, ITEM_EQPFLG_ROYALGUARD, ITEM_EQPFLG_RUNEKNIGHT,
    ITEM_EQPFLG_SERIES_3RD_EX2ND, ITEM_EQPFLG_SERIES_ACOLYTE, ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER, ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER, ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT, ITEM_EQPFLG_SERIES_ALCHEMIST,
    ITEM_EQPFLG_SERIES_ARCHER, ITEM_EQPFLG_SERIES_ARCHER_ROGUE, ITEM_EQPFLG_SERIES_ASSASIN, ITEM_EQPFLG_SERIES_ASSASIN_CROSS, ITEM_EQPFLG_SERIES_ASSASIN_PRIEST, ITEM_EQPFLG_SERIES_BARD,
    ITEM_EQPFLG_SERIES_BLACKSMITH, ITEM_EQPFLG_SERIES_CHAMPION, ITEM_EQPFLG_SERIES_CHASER, ITEM_EQPFLG_SERIES_CREATOR, ITEM_EQPFLG_SERIES_CROWN, ITEM_EQPFLG_SERIES_CRUSADER,
    ITEM_EQPFLG_SERIES_DANCER, ITEM_EQPFLG_SERIES_DRUID, ITEM_EQPFLG_SERIES_GUNSLINGER, ITEM_EQPFLG_SERIES_HIGH_PRIEST, ITEM_EQPFLG_SERIES_HIGH_WIZARD, ITEM_EQPFLG_SERIES_HUNTER,
    ITEM_EQPFLG_SERIES_HUNTER_ROGUE, ITEM_EQPFLG_SERIES_KENSEI, ITEM_EQPFLG_SERIES_KNIGHT, ITEM_EQPFLG_SERIES_LOAR_KNIGHT, ITEM_EQPFLG_SERIES_LOWER_OF_ACOLYTE, ITEM_EQPFLG_SERIES_LOWER_OF_ARCHER,
    ITEM_EQPFLG_SERIES_LOWER_OF_MAGICIAN_LINKER, ITEM_EQPFLG_SERIES_LOWER_OF_MARCHANT, ITEM_EQPFLG_SERIES_LOWER_OF_NOVICE, ITEM_EQPFLG_SERIES_LOWER_OF_SWORDMAN, ITEM_EQPFLG_SERIES_LOWER_OF_THIEF, ITEM_EQPFLG_SERIES_MAGICIAN_LINKER,
    ITEM_EQPFLG_SERIES_MARCHANT, ITEM_EQPFLG_SERIES_MONK, ITEM_EQPFLG_SERIES_NINJA, ITEM_EQPFLG_SERIES_NOVICE, ITEM_EQPFLG_SERIES_PALADIN, ITEM_EQPFLG_SERIES_PRIEST,
    ITEM_EQPFLG_SERIES_PROFESSOR, ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY, ITEM_EQPFLG_SERIES_ROGUE, ITEM_EQPFLG_SERIES_SAGE, ITEM_EQPFLG_SERIES_SNIPER, ITEM_EQPFLG_SERIES_SOUL_LINKER,
    ITEM_EQPFLG_SERIES_SUMMONER, ITEM_EQPFLG_SERIES_SUPER_NOVICE, ITEM_EQPFLG_SERIES_SWORDMAN, ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT, ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT_DRUID, ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT,
    ITEM_EQPFLG_SERIES_THIEF_NINJA, ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE, ITEM_EQPFLG_SERIES_UPPER_OF_ANY, ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER, ITEM_EQPFLG_SERIES_UPPER_OF_GUNSLINGER, ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER,
    ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT, ITEM_EQPFLG_SERIES_UPPER_OF_NINJA, ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN, ITEM_EQPFLG_SERIES_UPPER_OF_THIEF, ITEM_EQPFLG_SERIES_WHITESMITH, ITEM_EQPFLG_SERIES_WIZARD_LINKER,
    ITEM_EQPFLG_SERIES_ZYPSY, ITEM_EQPFLG_SHADOWCHASER, ITEM_EQPFLG_SHADOW_CROSS, ITEM_EQPFLG_SHINKIRO_SHIRANUI, ITEM_EQPFLG_SHURA, ITEM_EQPFLG_SKY_EMPEROR,
    ITEM_EQPFLG_SOUL_ASCETIC, ITEM_EQPFLG_SOURCERER, ITEM_EQPFLG_SPIRIT_HANDLER, ITEM_EQPFLG_TAEGWON, ITEM_EQPFLG_TROUBADOUR, ITEM_EQPFLG_TROUBADOUR_TROUVERE,
    ITEM_EQPFLG_TROUVERE, ITEM_EQPFLG_TYPE_BACKLER, ITEM_EQPFLG_TYPE_BEGINNER, ITEM_EQPFLG_TYPE_BOOK, ITEM_EQPFLG_TYPE_BOOTS, ITEM_EQPFLG_TYPE_DOFRENO_ONO,
    ITEM_EQPFLG_TYPE_GOOGLE, ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC, ITEM_EQPFLG_TYPE_KOZAN_HELMET, ITEM_EQPFLG_TYPE_MAJESTIC_GOAT, ITEM_EQPFLG_TYPE_MANT, ITEM_EQPFLG_TYPE_MIRROR_SHIELD,
    ITEM_EQPFLG_TYPE_ONEHAND_AXE, ITEM_EQPFLG_TYPE_RENDO, ITEM_EQPFLG_TYPE_SENTO_GREEVE, ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR, ITEM_EQPFLG_TYPE_SILKROBE, ITEM_EQPFLG_WANDERER,
    ITEM_EQPFLG_WARLOCK, ITEM_EQPFLG_WIND_HAWK,
} from "./const/EnumEquipFlag.js";
import { ITEM_DATA_INDEX_KIND, ITEM_DATA_INDEX_NAME, ITEM_DATA_INDEX_SPBEGIN } from "./const/EnumItemDataIndex.js";
import {
    ITEM_KIND_ACCESSORY, ITEM_KIND_ACCESSORY_ON1, ITEM_KIND_ACCESSORY_ON2, ITEM_KIND_AXE, ITEM_KIND_AXE_2HAND, ITEM_KIND_BODY,
    ITEM_KIND_BOOK, ITEM_KIND_BOW, ITEM_KIND_CLUB, ITEM_KIND_FIST, ITEM_KIND_FOOT, ITEM_KIND_FUMA,
    ITEM_KIND_GATLINGGUN, ITEM_KIND_GRENADEGUN, ITEM_KIND_HANDGUN, ITEM_KIND_HEAD_MID, ITEM_KIND_HEAD_TOP, ITEM_KIND_HEAD_UNDER,
    ITEM_KIND_KATAR, ITEM_KIND_KNIFE, ITEM_KIND_MUSICAL, ITEM_KIND_NONE, ITEM_KIND_RIFLE, ITEM_KIND_SET,
    ITEM_KIND_SHADOW_ACCESSORY_ON1, ITEM_KIND_SHADOW_ACCESSORY_ON2, ITEM_KIND_SHADOW_ARMS_LEFT, ITEM_KIND_SHADOW_ARMS_RIGHT, ITEM_KIND_SHADOW_BODY, ITEM_KIND_SHADOW_FOOT,
    ITEM_KIND_SHIELD, ITEM_KIND_SHOTGUN, ITEM_KIND_SHOULDER, ITEM_KIND_SPEAR, ITEM_KIND_SPEAR_2HAND, ITEM_KIND_STUFF,
    ITEM_KIND_SWORD, ITEM_KIND_SWORD_2HAND, ITEM_KIND_WHIP,
} from "./const/EnumItemKind.js";
import {
    ITEM_SP_AGI_PLUS, ITEM_SP_AGI_PLUS_FOR_SET, ITEM_SP_ALLSTATUS_PLUS, ITEM_SP_ALLSTATUS_PLUS_FOR_SET, ITEM_SP_ALL_SPECS_PLUS, ITEM_SP_APPEND_STATE_BLEEDING,
    ITEM_SP_APPEND_STATE_BLIND, ITEM_SP_APPEND_STATE_BREAK_ACCESSORY, ITEM_SP_APPEND_STATE_BREAK_ARMOR, ITEM_SP_APPEND_STATE_BREAK_HELM, ITEM_SP_APPEND_STATE_BREAK_SHIELD, ITEM_SP_APPEND_STATE_BREAK_SHOES,
    ITEM_SP_APPEND_STATE_BREAK_SHOULDER, ITEM_SP_APPEND_STATE_BREAK_WEAPON, ITEM_SP_APPEND_STATE_CONFUSE, ITEM_SP_APPEND_STATE_CURSED, ITEM_SP_APPEND_STATE_FROZEN, ITEM_SP_APPEND_STATE_POISON,
    ITEM_SP_APPEND_STATE_SILENCE, ITEM_SP_APPEND_STATE_SLEEP, ITEM_SP_APPEND_STATE_STONE, ITEM_SP_APPEND_STATE_STUN, ITEM_SP_ARMS_ELEMENT, ITEM_SP_ASPD_PLUS,
    ITEM_SP_ASPD_UP, ITEM_SP_ATK_PLUS, ITEM_SP_ATK_PLUS_GVGTE, ITEM_SP_ATK_UP, ITEM_SP_AUTO_SPELL, ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED,
    ITEM_SP_BASE_LV_BY_1_OFFSET, ITEM_SP_BASE_LV_OVER_170_OFFSET, ITEM_SP_BODY_ELEMENT, ITEM_SP_CON_PLUS, ITEM_SP_COST_DOWN, ITEM_SP_CRITICAL_DAMAGE_UP,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANGEL, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANIMAL, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DEMON, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DRAGON, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_FISH, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_INSECT, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_PLANT, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_SOLID, ITEM_SP_CRITICAL_DAMAGE_UP_RACE_UNDEAD, ITEM_SP_CRITICAL_UP_RACE_ANGEL, ITEM_SP_CRITICAL_UP_RACE_ANIMAL,
    ITEM_SP_CRITICAL_UP_RACE_DEMON, ITEM_SP_CRITICAL_UP_RACE_DRAGON, ITEM_SP_CRITICAL_UP_RACE_FISH, ITEM_SP_CRITICAL_UP_RACE_HUMAN, ITEM_SP_CRITICAL_UP_RACE_INSECT, ITEM_SP_CRITICAL_UP_RACE_PLANT,
    ITEM_SP_CRITICAL_UP_RACE_SOLID, ITEM_SP_CRITICAL_UP_RACE_UNDEAD, ITEM_SP_CRI_PLUS, ITEM_SP_CRT_PLUS, ITEM_SP_C_RATE_PLUS, ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL,
    ITEM_SP_DAMAGE_UP_GROUP_COBOLD, ITEM_SP_DAMAGE_UP_GROUP_GOBLIN, ITEM_SP_DAMAGE_UP_GROUP_GOLEM, ITEM_SP_DAMAGE_UP_GROUP_ORC, ITEM_SP_DEF_DIVIDE_PENARTY, ITEM_SP_DEF_PLUS,
    ITEM_SP_DEF_UP, ITEM_SP_DEX_PLUS, ITEM_SP_DEX_PLUS_FOR_SET, ITEM_SP_DMY, ITEM_SP_ELEMENTAL, ITEM_SP_END,
    ITEM_SP_EQUIPMENT_LOCATION_ACCESSORY, ITEM_SP_EQUIPMENT_LOCATION_BODY, ITEM_SP_EQUIPMENT_LOCATION_HEAD_MID, ITEM_SP_EQUIPMENT_LOCATION_SHOES, ITEM_SP_EQUIPMENT_LOCATION_SHOULDER, ITEM_SP_EXP_UP_ALL,
    ITEM_SP_EXP_UP_RACE_ANGEL, ITEM_SP_EXP_UP_RACE_ANIMAL, ITEM_SP_EXP_UP_RACE_DEMON, ITEM_SP_EXP_UP_RACE_DRAGON, ITEM_SP_EXP_UP_RACE_FISH, ITEM_SP_EXP_UP_RACE_HUMAN,
    ITEM_SP_EXP_UP_RACE_INSECT, ITEM_SP_EXP_UP_RACE_PLANT, ITEM_SP_EXP_UP_RACE_SOLID, ITEM_SP_EXP_UP_RACE_UNDEAD, ITEM_SP_FLEE_PLUS, ITEM_SP_HEAL_DAMAGE_UP,
    ITEM_SP_HEAL_UP_USED, ITEM_SP_HEAL_UP_USING, ITEM_SP_HEAL_UP_USING_GVGTE, ITEM_SP_HEAL_UP_USING_ONLY_HEAL, ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES, ITEM_SP_HIT_PLUS,
    ITEM_SP_HPR_UP, ITEM_SP_H_PLUS_PLUS, ITEM_SP_IGNORE_DEF_ALL, ITEM_SP_IGNORE_DEF_BOSS, ITEM_SP_IGNORE_DEF_NOTBOSS, ITEM_SP_IGNORE_DEF_RACE_ALL,
    ITEM_SP_IGNORE_DEF_RACE_ANGEL, ITEM_SP_IGNORE_DEF_RACE_ANIMAL, ITEM_SP_IGNORE_DEF_RACE_DEMON, ITEM_SP_IGNORE_DEF_RACE_DRAGON, ITEM_SP_IGNORE_DEF_RACE_FISH, ITEM_SP_IGNORE_DEF_RACE_HUMAN,
    ITEM_SP_IGNORE_DEF_RACE_INSECT, ITEM_SP_IGNORE_DEF_RACE_PLANT, ITEM_SP_IGNORE_DEF_RACE_SOLID, ITEM_SP_IGNORE_DEF_RACE_UNDEAD, ITEM_SP_IGNORE_MDEF_ALL, ITEM_SP_IGNORE_MDEF_BOSS,
    ITEM_SP_IGNORE_MDEF_NOTBOSS, ITEM_SP_IGNORE_MDEF_RACE_ALL, ITEM_SP_IGNORE_MDEF_RACE_ANGEL, ITEM_SP_IGNORE_MDEF_RACE_ANIMAL, ITEM_SP_IGNORE_MDEF_RACE_DEMON, ITEM_SP_IGNORE_MDEF_RACE_DRAGON,
    ITEM_SP_IGNORE_MDEF_RACE_FISH, ITEM_SP_IGNORE_MDEF_RACE_HUMAN, ITEM_SP_IGNORE_MDEF_RACE_INSECT, ITEM_SP_IGNORE_MDEF_RACE_PLANT, ITEM_SP_IGNORE_MDEF_RACE_SOLID, ITEM_SP_IGNORE_MDEF_RACE_UNDEAD,
    ITEM_SP_IGNORE_MRES_RACE_ALL, ITEM_SP_IGNORE_RES_RACE_ALL, ITEM_SP_INT_PLUS, ITEM_SP_INT_PLUS_FOR_SET, ITEM_SP_INVALIDATE_CARD_SP, ITEM_SP_INVALIDATE_ITEM_SP,
    ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET, ITEM_SP_KIRI_EFFECT, ITEM_SP_KOZYOSEN_TE_RENTAL_ITEM, ITEM_SP_LEARNED_SKILL_EFFECT, ITEM_SP_LEARN_SKILL, ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED,
    ITEM_SP_LONGRANGE_CRI_PLUS, ITEM_SP_LONGRANGE_DAMAGE_UP, ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW, ITEM_SP_LUCKY_PLUS, ITEM_SP_LUK_PLUS, ITEM_SP_LUK_PLUS_FOR_SET,
    ITEM_SP_MAGICAL_DAMAGE_UP, ITEM_SP_MAGICAL_DAMAGE_UP_BOSS, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY, ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER, ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND,
    ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS, ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM, ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID, ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM, ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL, ITEM_SP_MATK_PLUS_GVGTE, ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON, ITEM_SP_MATK_PLUS_TYPE_WEAPON, ITEM_SP_MAXHP_PLUS,
    ITEM_SP_MAXHP_PLUS_GVGTE, ITEM_SP_MAXHP_UP, ITEM_SP_MAXSP_PLUS, ITEM_SP_MAXSP_PLUS_GVGTE, ITEM_SP_MAXSP_UP, ITEM_SP_MDEF_PLUS,
    ITEM_SP_MDEF_UP, ITEM_SP_MRES_PLUS, ITEM_SP_NEVER_CAST_CANCEL, ITEM_SP_NEVER_KNOCK_BACK, ITEM_SP_PENETRATE_DEF, ITEM_SP_PENETRATE_DEF_RACE_ANGEL,
    ITEM_SP_PENETRATE_DEF_RACE_ANIMAL, ITEM_SP_PENETRATE_DEF_RACE_DEMON, ITEM_SP_PENETRATE_DEF_RACE_DRAGON, ITEM_SP_PENETRATE_DEF_RACE_FISH, ITEM_SP_PENETRATE_DEF_RACE_HUMAN, ITEM_SP_PENETRATE_DEF_RACE_INSECT,
    ITEM_SP_PENETRATE_DEF_RACE_PLANT, ITEM_SP_PENETRATE_DEF_RACE_SOLID, ITEM_SP_PENETRATE_DEF_RACE_UNDEAD, ITEM_SP_PERFECT_ATTACK_UP, ITEM_SP_PET_FRIENDLY_OVER_HIGH, ITEM_SP_PET_FRIENDLY_OVER_HIGHEST,
    ITEM_SP_PHYSICAL_DAMAGE_UP, ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER, ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND, ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET,
    ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM, ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID, ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_ALL, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM, ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL, ITEM_SP_POW_PLUS, ITEM_SP_PURE_STR_90_OFFSET, ITEM_SP_PURE_STR_BY_10_OFFSET, ITEM_SP_PURE_STR_BY_30_OFFSET,
    ITEM_SP_P_ATK_PLUS, ITEM_SP_REFINE_BY_1_OFFSET, ITEM_SP_REFINE_OVER_1_OFFSET, ITEM_SP_REFLECT_PHYSICAL_DAMAGE, ITEM_SP_RESIST_BOSS, ITEM_SP_RESIST_ELM_ALL,
    ITEM_SP_RESIST_ELM_DARK, ITEM_SP_RESIST_ELM_EARTH, ITEM_SP_RESIST_ELM_FIRE, ITEM_SP_RESIST_ELM_HOLY, ITEM_SP_RESIST_ELM_POISON, ITEM_SP_RESIST_ELM_PSYCO,
    ITEM_SP_RESIST_ELM_UNDEAD, ITEM_SP_RESIST_ELM_VANITY, ITEM_SP_RESIST_ELM_WATER, ITEM_SP_RESIST_ELM_WIND, ITEM_SP_RESIST_FROZEN_GVGTE, ITEM_SP_RESIST_LONGRANGE,
    ITEM_SP_RESIST_MAGIC, ITEM_SP_RESIST_MONSTER_ELM_ALL, ITEM_SP_RESIST_MONSTER_ELM_DARK, ITEM_SP_RESIST_MONSTER_ELM_EARTH, ITEM_SP_RESIST_MONSTER_ELM_FIRE, ITEM_SP_RESIST_MONSTER_ELM_HOLY,
    ITEM_SP_RESIST_MONSTER_ELM_POISON, ITEM_SP_RESIST_MONSTER_ELM_PSYCO, ITEM_SP_RESIST_MONSTER_ELM_UNDEAD, ITEM_SP_RESIST_MONSTER_ELM_VANITY, ITEM_SP_RESIST_MONSTER_ELM_WATER, ITEM_SP_RESIST_MONSTER_ELM_WIND,
    ITEM_SP_RESIST_NOTBOSS, ITEM_SP_RESIST_PLAYER_ALL, ITEM_SP_RESIST_PLAYER_DORAM, ITEM_SP_RESIST_PLAYER_HUMAN, ITEM_SP_RESIST_RACE_ALL, ITEM_SP_RESIST_RACE_ANGEL,
    ITEM_SP_RESIST_RACE_ANIMAL, ITEM_SP_RESIST_RACE_DEMON, ITEM_SP_RESIST_RACE_DRAGON, ITEM_SP_RESIST_RACE_FISH, ITEM_SP_RESIST_RACE_HUMAN, ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_RESIST_RACE_INSECT, ITEM_SP_RESIST_RACE_PLANT, ITEM_SP_RESIST_RACE_SOLID, ITEM_SP_RESIST_RACE_UNDEAD, ITEM_SP_RESIST_SIZE_LARGE, ITEM_SP_RESIST_SIZE_MEDIUM,
    ITEM_SP_RESIST_SIZE_SMALL, ITEM_SP_RESIST_STATE_BLEEDING, ITEM_SP_RESIST_STATE_BLIND, ITEM_SP_RESIST_STATE_BREAK_ACCESSORY, ITEM_SP_RESIST_STATE_BREAK_ARMOR, ITEM_SP_RESIST_STATE_BREAK_HELM,
    ITEM_SP_RESIST_STATE_BREAK_SHIELD, ITEM_SP_RESIST_STATE_BREAK_SHOES, ITEM_SP_RESIST_STATE_BREAK_SHOULDER, ITEM_SP_RESIST_STATE_BREAK_WEAPON, ITEM_SP_RESIST_STATE_CONFUSE, ITEM_SP_RESIST_STATE_CURSED,
    ITEM_SP_RESIST_STATE_FROZEN, ITEM_SP_RESIST_STATE_NEW_CONFLAGRATION, ITEM_SP_RESIST_STATE_NEW_CRYSTALLIZATION, ITEM_SP_RESIST_STATE_NEW_HIGHLYPOISONOUS, ITEM_SP_RESIST_STATE_NEW_JETBLACK, ITEM_SP_RESIST_STATE_NEW_LETHARGY,
    ITEM_SP_RESIST_STATE_NEW_MELANCHOLY, ITEM_SP_RESIST_STATE_NEW_RAPIDCOOLING, ITEM_SP_RESIST_STATE_NEW_STILLNESS, ITEM_SP_RESIST_STATE_NEW_TORRENT, ITEM_SP_RESIST_STATE_NEW_UNHAPPINESS, ITEM_SP_RESIST_STATE_POISON,
    ITEM_SP_RESIST_STATE_R_CHARMED, ITEM_SP_RESIST_STATE_R_CHILLED, ITEM_SP_RESIST_STATE_R_DEEPSLEEP, ITEM_SP_RESIST_STATE_R_FEAR, ITEM_SP_RESIST_STATE_R_FRENZY, ITEM_SP_RESIST_STATE_R_ICED,
    ITEM_SP_RESIST_STATE_R_IGNITION, ITEM_SP_RESIST_STATE_SILENCE, ITEM_SP_RESIST_STATE_SLEEP, ITEM_SP_RESIST_STATE_STONE, ITEM_SP_RESIST_STATE_STUN, ITEM_SP_RES_PLUS,
    ITEM_SP_SET_DEFINITION, ITEM_SP_SHORTRANGE_DAMAGE_UP, ITEM_SP_SIZE_PERFECTION, ITEM_SP_SKILL_CAST_MINUS_OFFSET, ITEM_SP_SKILL_CAST_TIME, ITEM_SP_SKILL_CAST_TIME_OFFSET,
    ITEM_SP_SKILL_COOL_MINUS_OFFSET, ITEM_SP_SKILL_COST_MINUS_OFFSET, ITEM_SP_SKILL_COST_SCALING_OFFSET, ITEM_SP_SKILL_DAMAGE_OFFSET, ITEM_SP_SKILL_DELAY_DOWN, ITEM_SP_SKILL_FIXED_MINUS,
    ITEM_SP_SKILL_FIXED_MINUS_OFFSET, ITEM_SP_SKILL_FIXED_TIME_OFFSET, ITEM_SP_SPECIAL_RANGE, ITEM_SP_SPL_PLUS, ITEM_SP_SPR_UP, ITEM_SP_STA_PLUS,
    ITEM_SP_STR_PLUS, ITEM_SP_STR_PLUS_FOR_SET, ITEM_SP_STUFF2HAND, ITEM_SP_S_MATK_PLUS, ITEM_SP_TRANSCENDENCE_1, ITEM_SP_UNBREAKABLE,
    ITEM_SP_UNREFINABLE, ITEM_SP_VIT_PLUS, ITEM_SP_VIT_PLUS_FOR_SET, ITEM_SP_WEAPON_ATK_UP, ITEM_SP_WIS_PLUS,
} from "./const/EnumItemSpId.js";
import { MONSTER_DATA_INDEX_NAME } from "./const/EnumMonsterDataIndex.js";
import { SKILL_DATA_INDEX_NAME } from "./const/EnumSkillDataIndex.js";
import { STATE_R_ID_CHILLED } from "./const/EnumStateId.js";
import { USABLE_SKILL_DATA_INDEX_SKILL_ID, USABLE_SKILL_DATA_INDEX_SKILL_LEVEL } from "./const/EnumUsableSkillDataIndex.js";
// === END AUTO-GENERATED IMPORTS ===
// C-6: engine-registry（mig.job.h.js との循環 import 回避）
import { get as registryGet } from "./engine-registry.js";

/**
 * アイテムの種別名を取得する.
 * @param kindId 種別ＩＤ
 * @return 種別名
 */
export function GetItemKindNameText(kindId) {
	switch (kindId) {
		case ITEM_KIND_NONE:
			return "素手";
		case ITEM_KIND_KNIFE:
			return "短剣";
		case ITEM_KIND_SWORD:
			return "片手剣";
		case ITEM_KIND_SWORD_2HAND:
			return "両手剣";
		case ITEM_KIND_SPEAR:
			return "片手槍";
		case ITEM_KIND_SPEAR_2HAND:
			return "両手槍";
		case ITEM_KIND_AXE:
			return "片手斧";
		case ITEM_KIND_AXE_2HAND:
			return "両手斧";
		case ITEM_KIND_CLUB:
			return "鈍器";
		case ITEM_KIND_STUFF:
			return "杖";
		case ITEM_KIND_BOW:
			return "弓";
		case ITEM_KIND_KATAR:
			return "カタール";
		case ITEM_KIND_BOOK:
			return "本";
		case ITEM_KIND_FIST:
			return "ナックル";
		case ITEM_KIND_MUSICAL:
			return "楽器";
		case ITEM_KIND_WHIP:
			return "鞭";
		case ITEM_KIND_FUMA:
			return "風魔手裏剣";
		case ITEM_KIND_HANDGUN:
			return "ハンドガン";
		case ITEM_KIND_RIFLE:
			return "ライフル";
		case ITEM_KIND_SHOTGUN:
			return "ショットガン";
		case ITEM_KIND_GATLINGGUN:
			return "ガトリングガン";
		case ITEM_KIND_GRENADEGUN:
			return "グレネードガン";
		case ITEM_KIND_HEAD_TOP:
			return "頭上段";
		case ITEM_KIND_HEAD_MID:
			return "頭中段";
		case ITEM_KIND_HEAD_UNDER:
			return "頭下段";
		case ITEM_KIND_BODY:
			return "鎧";
		case ITEM_KIND_SHIELD:
			return "盾";
		case ITEM_KIND_SHOULDER:
			return "肩にかける物";
		case ITEM_KIND_FOOT:
			return "靴";
		case ITEM_KIND_ACCESSORY:
			return "アクセサリ";
		case ITEM_KIND_ACCESSORY_ON1:
			return "アクセサリ(1)";
		case ITEM_KIND_ACCESSORY_ON2:
			return "アクセサリ(2)";
		case ITEM_KIND_SHADOW_ARMS_RIGHT:
			return "シャドウウェポン";
		case ITEM_KIND_SHADOW_ARMS_LEFT:
			return "シャドウシールド";
		case ITEM_KIND_SHADOW_BODY:
			return "シャドウアーマー";
		case ITEM_KIND_SHADOW_FOOT:
			return "シャドウシューズ";
		case ITEM_KIND_SHADOW_ACCESSORY_ON1:
			return "シャドウアクセサリ(1)";
		case ITEM_KIND_SHADOW_ACCESSORY_ON2:
			return "シャドウアクセサリ(2)";
	}
	return "不明";
}

/*
 * DEXベース武器かを判定する.
 * @param itemKind アイテム種別
 * @return true:DEXベース、false:STRベース
 */
export function IsDexBasedArms (itemKind) {

	switch (itemKind) {

	// DEXベース武器
	case ITEM_KIND_BOW:
	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		return true;
	}

	return false;
}

/*
 * 過剰精錬ATKが適用される武器かを判定する.
 * @param itemKind アイテム種別
 * @return true:適用される、false:適用されない
 */
export function IsEffectiveExceededRefinedAtkArms (itemKind) {

	// 基本的には、STRベースの武器のみ適用
	// ただし、楽器と鞭は、DEXベースだが適用される


	// STRベース武器の場合
	if (!IsDexBasedArms(itemKind)) {
		return true;
	}


	// DEXベース武器の例外
	switch (itemKind) {

	case ITEM_KIND_MUSICAL:
	case ITEM_KIND_WHIP:
		return true;
	}


	return false;
}

/*
 * 銃系列武器かを判定する.
 * @param itemKind アイテム種別
 * @return true:銃系列、false:銃以外
 */
export function IsGunSeriesArms (itemKind) {

	switch (itemKind) {

	// 銃系列武器
	case ITEM_KIND_HANDGUN:
	case ITEM_KIND_RIFLE:
	case ITEM_KIND_SHOTGUN:
	case ITEM_KIND_GATLINGGUN:
	case ITEM_KIND_GRENADEGUN:
		return true;
	}

	return false;
}

/**
 * 職業制限テキストを取得する.
 * @param eqpflg 装備フラグ
 * @return 職業制限テキスト
 */
export function GetJobRestrictText(eqpflg) {

	switch (eqpflg) {
		case ITEM_EQPFLG_NONE:
			return "すべての職業";

		case ITEM_EQPFLG_IGNORE_NOVICE_SERIES:
			return "ノービスを除く、すべての職業";

		case ITEM_EQPFLG_SERIES_NOVICE:
			return "ノービス系";
		case ITEM_EQPFLG_SERIES_SWORDMAN:
			return "ソードマン系";
		case ITEM_EQPFLG_SERIES_THIEF_NINJA:
			return "シーフ・忍者系";
		case ITEM_EQPFLG_SERIES_ACOLYTE:
			return "アコライト系";
		case ITEM_EQPFLG_SERIES_ARCHER:
			return "アーチャー系";
		case ITEM_EQPFLG_SERIES_MAGICIAN_LINKER:
			return "マジシャン・ソウルリンカー系";
		case ITEM_EQPFLG_SERIES_MARCHANT:
			return "マーチャント系";
	// 57 は欠番
		case ITEM_EQPFLG_SERIES_NINJA:
			return "忍者系";
		case ITEM_EQPFLG_SERIES_GUNSLINGER:
			return "ガンスリンガー系";

		case ITEM_EQPFLG_SERIES_UPPER_OF_SWORDMAN:
			return "ソードマン系の二次職、転生二次職、三次職";
		case ITEM_EQPFLG_SERIES_UPPER_OF_THIEF:
			return "シーフ系の二次職、転生二次職、三次職";
		case ITEM_EQPFLG_SERIES_UPPER_OF_ACOLYTE:
			return "アコライト系の二次職、転生二次職、三次職";
		case ITEM_EQPFLG_SERIES_UPPER_OF_ARCHER:
			return "アーチャー系の二次職、転生二次職、三次職";
		case ITEM_EQPFLG_SERIES_UPPER_OF_MAGICIAN_LINKER:
			return "マジシャン・ソウルリンカー系の二次職、転生二次職、三次職";
		case ITEM_EQPFLG_SERIES_UPPER_OF_MARCHANT:
			return "マーチャント系の二次職、転生二次職、三次職";
	// 67 は欠番
		case ITEM_EQPFLG_SERIES_UPPER_OF_NINJA:
			return "影狼・朧";
		case ITEM_EQPFLG_SERIES_UPPER_OF_GUNSLINGER:
			return "リベリオン";

		case ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT:
			return "ソードマン・マーチャント系";
		case ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT_DRUID:
			return "ソードマン・マーチャント・ドルイド系";
		case ITEM_EQPFLG_TYPE_SILKROBE:
			return "ソードマン・アコライト・マジシャン・マーチャント系";
		case ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT:
			return "ソードマン・シーフ・マーチャント系";
		case ITEM_EQPFLG_SERIES_ACOLYTE_MARCHANT:
			return "アコライト・マーチャント系";
		case ITEM_EQPFLG_TYPE_BACKLER:
			return "ソードマン・シーフ・アコライト・マーチャント・バード・ダンサー系";
		case ITEM_EQPFLG_TYPE_GOOGLE:
			return "ソードマン・シーフ・アーチャー・マーチャント系";
		case ITEM_EQPFLG_SERIES_ARCHER_ROGUE:
			return "アーチャー・ローグ系";
		case ITEM_EQPFLG_SERIES_ACOLYTE_MAGICIAN_LINKER:
			return "アコライト・マジシャン・ソウルリンカー系";
		case ITEM_EQPFLG_TYPE_KOZAN_HELMET:
			return "ソードマン・シーフ・アコライト・マーチャント系";
		case ITEM_EQPFLG_SERIES_UPPER_OF_ANY:
			return "二次職、転生二次職、三次職、拡張二次職";
		case ITEM_EQPFLG_TYPE_RENDO:
			return "シーフのみ・ハンター・ローグ系";
		case ITEM_EQPFLG_SERIES_ASSASIN_PRIEST:
			return "アサシン・プリースト系";
		case ITEM_EQPFLG_SERIES_REINCARNATED_OF_ANY:
			return "転生二次職、三次職（転生）";
		case ITEM_EQPFLG_TYPE_BOOTS:
			return "ソードマン・シーフ・アーチャー・マーチャント・テコンのみ・拳聖のみ・ガンスリンガー系";
		case ITEM_EQPFLG_TYPE_MANT:
			return "ソードマン・シーフ・マーチャント・テコンのみ・拳聖のみ系";
		case ITEM_EQPFLG_TYPE_SHARP_HEAD_GEAR:
			return "ソードマン・シーフ・アコライト・マーチャント・テコンのみ・拳聖のみ系";
		case ITEM_EQPFLG_TYPE_MAJESTIC_GOAT:
			return "ソードマン・マーチャント・テコンのみ・拳聖のみ系";
		case ITEM_EQPFLG_TYPE_MIRROR_SHIELD:
			return "ソードマン・テコンのみ・拳聖のみ系";
		case ITEM_EQPFLG_SERIES_HUNTER_ROGUE:
			return "ハンター・ローグ系";
		case ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER:
			return "アコライト・アーチャー・マジシャン・ソウルリンカー系";
		case ITEM_EQPFLG_TYPE_ONEHAND_AXE:
			return "ノービス・ソードマン・マーチャント・アサシン・ドルイド系";
		case ITEM_EQPFLG_TYPE_SENTO_GREEVE:
			return "ソードマン・シーフ・マーチャント・拳聖・忍者系";
		case ITEM_EQPFLG_TYPE_DOFRENO_ONO:
			return "ソードマン・マーチャント・ギロチンクロス・スーパーノービス＋系";
		case ITEM_EQPFLG_SERIES_3RD_EX2ND:
			return "三次職、拡張二次職系";
		case ITEM_EQPFLG_TYPE_KOJOSEN_TE_MAGIC:
			return "ノービス・アコライト・マジシャン・ソウルリンカー系";
		case ITEM_EQPFLG_TYPE_BOOK:
			return "プリースト・セージ・拳聖系";
		case ITEM_EQPFLG_TYPE_BEGINNER:
			return "ノービスのみ・非転生一次職・非転生二次職系";

		case ITEM_EQPFLG_SERIES_LOWER_OF_NOVICE:
			return "ノービス・ノービスハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_SWORDMAN:
			return "ソードマン・ソードマンハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_THIEF:
			return "シーフ・シーフハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_ACOLYTE:
			return "アコライト・アコライトハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_ARCHER:
			return "アーチャー・アーチャーハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_MAGICIAN_LINKER:
			return "マジシャン・マジシャンハイ";
		case ITEM_EQPFLG_SERIES_LOWER_OF_MARCHANT:
			return "マーチャント・マーチャントハイ";
		case ITEM_EQPFLG_SERIES_KNIGHT:
			return "ナイト系";
		case ITEM_EQPFLG_SERIES_ASSASIN:
			return "アサシン系";
		case ITEM_EQPFLG_SERIES_PRIEST:
			return "プリースト系";
		case ITEM_EQPFLG_SERIES_HUNTER:
			return "ハンター系";
		case ITEM_EQPFLG_SERIES_WIZARD_LINKER:
			return "ウィザード・ソウルリンカー系";
		case ITEM_EQPFLG_SERIES_BLACKSMITH:
			return "ブラックスミス系";
		case ITEM_EQPFLG_SERIES_CRUSADER:
			return "クルセイダー系";
		case ITEM_EQPFLG_SERIES_ROGUE:
			return "ローグ系";
		case ITEM_EQPFLG_SERIES_MONK:
			return "モンク系";
		case ITEM_EQPFLG_SERIES_BARD:
			return "バード系";
		case ITEM_EQPFLG_SERIES_DANCER:
			return "ダンサー系";
		case ITEM_EQPFLG_SERIES_SAGE:
			return "セージ系";
		case ITEM_EQPFLG_SERIES_ALCHEMIST:
			return "アルケミスト系";
		case ITEM_EQPFLG_SERIES_SUPER_NOVICE:
			return "スーパーノービス系";
		case ITEM_EQPFLG_SERIES_LOAR_KNIGHT:
			return "ロードナイト系";
		case ITEM_EQPFLG_SERIES_ASSASIN_CROSS:
			return "アサシンクロス系";
		case ITEM_EQPFLG_SERIES_HIGH_PRIEST:
			return "ハイプリースト系";
		case ITEM_EQPFLG_SERIES_SNIPER:
			return "スナイパー系";
		case ITEM_EQPFLG_SERIES_HIGH_WIZARD:
			return "ハイウィザード系";
		case ITEM_EQPFLG_SERIES_WHITESMITH:
			return "ホワイトスミス系";
		case ITEM_EQPFLG_SERIES_PALADIN:
			return "パラディン系";
		case ITEM_EQPFLG_SERIES_CHASER:
			return "チェイサー系";
		case ITEM_EQPFLG_SERIES_CHAMPION:
			return "チャンピオン系";
		case ITEM_EQPFLG_SERIES_CROWN:
			return "クラウン系";
		case ITEM_EQPFLG_SERIES_ZYPSY:
			return "ジプシー系";
		case ITEM_EQPFLG_SERIES_PROFESSOR:
			return "プロフェッサー系";
		case ITEM_EQPFLG_SERIES_CREATOR:
			return "クリエイター系";
		case ITEM_EQPFLG_SERIES_DRUID:
			return "ドルイド系";

		case ITEM_EQPFLG_TAEGWON:
			return "テコンキッド";
		case ITEM_EQPFLG_SERIES_KENSEI:
			return "拳聖";
		case ITEM_EQPFLG_SERIES_SOUL_LINKER:
			return "ソウルリンカー";
	// 144 は欠番（58を使用）
	// 145 は欠番（59を使用）

		case ITEM_EQPFLG_RUNEKNIGHT:
			return "ルーンナイト";
		case ITEM_EQPFLG_GLTCROSS:
			return "ギロチンクロス";
		case ITEM_EQPFLG_ARCBISHOP:
			return "アークビショップ";
		case ITEM_EQPFLG_RANGER:
			return "レンジャー";
		case ITEM_EQPFLG_WARLOCK:
			return "ウォーロック";
		case ITEM_EQPFLG_MECHANIC:
			return "メカニック";
		case ITEM_EQPFLG_ROYALGUARD:
			return "ロイヤルガード";
		case ITEM_EQPFLG_SHADOWCHASER:
			return "シャドウチェイサー";
		case ITEM_EQPFLG_SHURA:
			return "修羅";
		case ITEM_EQPFLG_MINSTREL:
			return "ミンストレル";
		case ITEM_EQPFLG_WANDERER:
			return "ワンダラー";
		case ITEM_EQPFLG_SOURCERER:
			return "ソーサラー";
		case ITEM_EQPFLG_GENETIC:
			return "ジェネティック";

		case ITEM_EQPFLG_MINSTREL_WANDERER:
			return "ミンストレル・ワンダラー";

		case ITEM_EQPFLG_SERIES_SUMMONER:
			return "サモナー";

		case 1000 + ITEM_EQPFLG_NONE:
			return "転生職";
		case 1000 + ITEM_EQPFLG_IGNORE_NOVICE_SERIES:
			return "転生1次職 上位2次職 3次職 4次職";
		case 1000 + ITEM_EQPFLG_SERIES_SWORDMAN:
			return "転生ソードマン系";
		case 1000 + ITEM_EQPFLG_SERIES_THIEF_NINJA:
			return "転生シーフ系";
		case 1000 + ITEM_EQPFLG_SERIES_ACOLYTE:
			return "転生アコライト系";
		case 1000 + ITEM_EQPFLG_SERIES_ARCHER:
			return "転生アーチャー系";
		case 1000 + ITEM_EQPFLG_SERIES_MAGICIAN_LINKER:
			return "転生マジシャン系";
		case 1000 + ITEM_EQPFLG_SERIES_MARCHANT:
			return "転生マーチャント系";
		case 1000 + ITEM_EQPFLG_SERIES_ACOLYTE_ARCHER_MAGICIAN_LINKER:
			return "転生マジシャン系 転生アーチャー系 転生アコライト系";
		case 1000 + ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT:
			return "転生ソードマン系 転生マーチャント系";
		case 1000 + ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT:
			return "転生ソードマン系 転生マーチャント系 転生シーフ系";
		case 1000 + ITEM_EQPFLG_SERIES_UPPER_OF_ANY:
			return "上位2次職 3次職 4次職";

		case 2000 + ITEM_EQPFLG_SERIES_SWORDMAN_MARCHANT:
			return "3次職ソードマン系 3次職マーチャント系";
		case 2000 + ITEM_EQPFLG_IGNORE_NOVICE_SERIES:
			return "3次職ソードマン系 3次職アコライト系 3次職マーチャント系";
		case 2000 + ITEM_EQPFLG_SERIES_SWORDMAN:
			return "3次職ソードマン系";
		case 2000 + ITEM_EQPFLG_SERIES_THIEF_NINJA:
			return "3次職シーフ系";
		case 2000 + ITEM_EQPFLG_SERIES_ACOLYTE:
			return "3次職アコライト系";
		case 2000 + ITEM_EQPFLG_SERIES_ARCHER:
			return "3次職アーチャー系";
		case 2000 + ITEM_EQPFLG_SERIES_MAGICIAN_LINKER:
			return "3次職マジシャン系";
		case 2000 + ITEM_EQPFLG_SERIES_MARCHANT:
			return "3次職マーチャント系";
		case 2000 + ITEM_EQPFLG_SERIES_SWORDMAN_THIEF_MARCHANT:
			return "3次職ソードマン系 3次職マーチャント系 3次職シーフ系";
		case 2000 + ITEM_EQPFLG_SERIES_ARCHER_ROGUE:
			return "3次職アーチャー系 3次職シャドウチェイサー系";
		case 2000 + ITEM_EQPFLG_NONE:
			return "3次職 4次職";

		case ITEM_EQPFLG_4TH:
			return "4次職 拡張4次職";
		case ITEM_EQPFLG_4TH_THIEF:
			return "4次職シーフ系";
		case ITEM_EQPFLG_DRAGON_KNIGHT:
			return "ドラゴンナイト";
		case ITEM_EQPFLG_SHADOW_CROSS:
			return "シャドウクロス";
		case ITEM_EQPFLG_CARDINAL:
			return "カーディナル";
		case ITEM_EQPFLG_WIND_HAWK:
			return "ウィンドホーク";
		case ITEM_EQPFLG_ARCH_MAGE:
			return "アークメイジ";
		case ITEM_EQPFLG_MEISTER:
			return "マイスター";
		case ITEM_EQPFLG_IMPERIAL_GUARD:
			return "インペリアルガード";
		case ITEM_EQPFLG_INQUISITOR:
			return "インクイジター";
		case ITEM_EQPFLG_TROUBADOUR:
			return "トルバドゥール";
		case ITEM_EQPFLG_TROUVERE:
			return "トルヴェール";
		case ITEM_EQPFLG_ELEMENTAL_MASTER:
			return "エレメンタルマスター";
		case ITEM_EQPFLG_BIOLO:
			return "バイオロ";
		case ITEM_EQPFLG_SKY_EMPEROR:
			return "天帝";
		case ITEM_EQPFLG_SOUL_ASCETIC:
			return "ソウルアセティック";
		case ITEM_EQPFLG_NIGHT_WATCH:
			return "ナイトウォッチ";
		case ITEM_EQPFLG_SPIRIT_HANDLER:
			return "スピリットハンドラー";
		case ITEM_EQPFLG_ALITEA:
			return "アリテア";
		case ITEM_EQPFLG_ABYSS_CHASER:
			return "アビスチェイサー";
		case ITEM_EQPFLG_SHINKIRO_SHIRANUI:
			return "蜃気楼 不知火";
		case ITEM_EQPFLG_HYPER_NOVICE:
			return "ハイパーノービス";
		case ITEM_EQPFLG_MAJO_NO_HOUKI:
			return "ハイパーノービス 4次職マジシャン系 4次職アコライト系 ソウルアセティック";
		case ITEM_EQPFLG_TROUBADOUR_TROUVERE:
			return "トルバドゥール トルヴェール"
		case ITEM_EQPFLG_4TH_THIEF:
			return "4次職シーフ系";
		case ITEM_EQPFLG_4TH_EXCLUDE_CAT:
			return "4次職 天帝 ソウルアセティック 蜃気楼 不知火 ナイトウォッチ ハイパーノービス";
		case ITEM_EQPFLG_4TH_SWORDMAN_MERCHANT:
			return "4次職ソードマン系 4次職マーチャント系";
		case ITEM_EQPFLG_4TH_BLADE_USER:
			return "ハイパーノービス 4次職ソードマン系 4次職マジシャン系 4次職アーチャー系 4次職シーフ系 4次職マーチャント系 ソウルアセティック 蜃気楼 不知火";
		case ITEM_EQPFLG_4TH_SWORDMAN:
			return "4次職ソードマン系";
		case ITEM_EQPFLG_4TH_BOOK_USER:
			return "カーディナル エレメンタルマスター 天帝";
		case ITEM_EQPFLG_4TH_ROD_USER_EXCLUDE_NOVICE:
			return "4次職マジシャン系 4次職アコライト系 ソウルアセティック";
		case ITEM_EQPFLG_4TH_ACOLYTE:
			return "4次職アコライト系";
		case ITEM_EQPFLG_4TH_HAMMER_USER:
			return "ハイパーノービス 4次職ソードマン系 4次職アコライト系 4次職マーチャント系";
		case ITEM_EQPFLG_4TH_BOW_USER:
			return "4次職アーチャー系 アビスチェイサー";
		case ITEM_EQPFLG_4TH_SWORDMAN_MERCHANT_ALITEA:
			return "4次職ソードマン系 4次職マーチャント系 アリテア";
	}
	return "不明";
}

/**
 * STRペナルティ回避STRを取得する.
 * @param atk 武器ATK
 * @param wpnlv 武器レベル
 * @returns ペナルティ回避STR
 */
export function GetStrPenaltyAvoidStr(atk, wpnlv) {
	var penaValue = Math.floor(atk * 2 / 3);
	var wlvBonus = 4 / (Math.floor(wpnlv) % 10);
	var needStr = Math.ceil(Math.sqrt(penaValue / wlvBonus)) * 10;

	return needStr;
}

/**
 * エンチャントタイプIDを取得する.
 * @param wpnlv 武器レベル（当該データに合成しているので）
 * @returns エンチャントタイプID
 */
export function GetEnchantTypeId(wpnlv) {
	return Math.floor(wpnlv / 10) % 10000;
}

/**
 * ランダムオプションタイプIDを取得する.
 * @param wpnlv 武器レベル（当該データに合成しているので）
 * @returns ランダムオプションタイプID
 */
export function GetRndOptTypeId(wpnlv) {
	return Math.floor(wpnlv / 10 / 10000);
}

/**
 * スロット数テキストを取得する.
 * @param slotValue スロット定義値
 * @returns スロット数テキスト
 */
export function GetSlotText(slotValue) {

	var slotValueWork = 0;
	var slotText = "";

	// スロット定義値を小数点以下切り捨てで取得
	slotValueWork = Math.floor(slotValue);

	// スロット定義値が 0 より大きい間処理
	while (slotValueWork > 0) {

		// 第二条件以降は、先に中黒を追加
		if (slotText.length > 0) {
			slotText += "・";
		}

		// スロット数を追記
		slotText += (slotValueWork % 10);

		// スロット定義値を減算
		slotValueWork = (slotValueWork - (slotValueWork % 10)) / 10;
	}

	// 定義が取得できていない場合は、0 に設定
	if (slotText.length == 0) {
		slotText = "0";
	}

	return slotText;
}

/**
 * 最大スロット数を取得する.
 * @param slotValue スロット定義値
 * @returns 最大スロット数
 */
export function GetMaxSlot(slotValue) {

	var slotValueWork = 0;
	var slotCount = 0;
	var slotMax = 0;

	// スロット定義値を小数点以下切り捨てで取得
	slotValueWork = Math.floor(slotValue);

	// スロット定義値が 0 より大きい間処理
	while (slotValueWork > 0) {

		// スロット数を切り出し
		slotCount = slotValueWork % 10;

		// 最大値を更新
		slotMax = Math.max(slotMax, slotCount);

		// スロット定義値を減算
		slotValueWork = (slotValueWork - slotCount) / 10;
	}

	return slotMax;
}

// TODO: 削除予定
export function GetItemSP(itemId, spid) {

	var idx = 0;
	var itemData = ItemObjNew[itemId];

	for (idx = 0; ; idx++) {
		if (ITEM_SP_END == itemData[ITEM_DATA_INDEX_SPBEGIN + idx * 2]) {
			break;
		}
		if (spid == itemData[ITEM_DATA_INDEX_SPBEGIN + idx * 2]) {
			return itemData[ITEM_DATA_INDEX_SPBEGIN + idx * 2 + 1];
		}
	}

	return 0;
}

/**
 * アイテム説明テキストを取得する.
 * @param spId SPID (BigInt の場合と Int の場合がある)
 * @param spValue SP値
 * @return 説明テキスト
 */
export function GetItemExplainText(spId, spValue) {
	var idx = 0;

	let condTextEquipmentLocation = "";
	let condTextTranscendence = "";
	var condTextFriendlyOver = "";
	var condTextBaseLvOver = "";
	var condTextBaseLvBy = "";
	var condTextJobRestrict = "";
	var condTextPureStatus = "";
	var condTextRefineOver = "";
	var condTextRefineBy = "";
	var sign = "";
	var skillName = "";
	var funcWork = null;
	var idArrayWork = null;
	var textWork = "";
	var textInfoArray = null;
	var statusName = ["Str", "Agi", "Vit", "Int", "Dex", "Luk",];
	var spStatusName = ["Pow", "Sta", "Wis", "Spl", "Con", "Crt"];

	// 戻り値用テキスト配列
	textInfoArray = new Array();

	// 『純粋な○○が△△上がる度に』条件
	let baseFlag = toSafeBigInt(ITEM_SP_PURE_STR_BY_30_OFFSET);
	if (spId >= baseFlag) {
		// BigInt の場合、小数点以下は自動的に切り捨てられる
		var pureStatusBy = parseInt(spId / baseFlag);
		if (1 <= pureStatusBy && pureStatusBy <= 6) {
			// 論理的に_BY_10_OFFSETとは同時にセットされないはずなので上書きする
			condTextPureStatus += "純粋な" + statusName[pureStatusBy - 1] +  "が30上がる度に、";
		}
		spId = parseInt(spId % baseFlag);
	}

	// 「〇〇に装備時」条件
	let equipmentLocation = 0;
	baseFlag = toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_BODY);
	if (spId >= baseFlag) {
		// BigInt の場合、小数点以下は自動的に切り捨てられる
		equipmentLocation = spId / baseFlag;
		switch (equipmentLocation) {
            case toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_BODY) / baseFlag:  
                condTextEquipmentLocation = "鎧";  
                break;  
            case toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_SHOULDER) / baseFlag:  
                condTextEquipmentLocation = "肩にかける物";  
                break;  
            case toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_SHOES) / baseFlag:  
                condTextEquipmentLocation = "靴";  
                break;
            case toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_ACCESSORY) / baseFlag:  
                condTextEquipmentLocation = "アクセサリー";  
                break;  
            case toSafeBigInt(ITEM_SP_EQUIPMENT_LOCATION_HEAD_MID) / baseFlag:  
                condTextEquipmentLocation = "兜中段";  
                break;  
		}
		condTextEquipmentLocation += "に装備時、";
		spId = parseInt(spId % baseFlag);
	}

	// 『超越段階が◯以上のとき』条件
	let transcendenceOver = 0;
	baseFlag = toSafeBigInt(ITEM_SP_TRANSCENDENCE_1);
	if (spId >= baseFlag) {
		// BigInt の場合、小数点以下は自動的に切り捨てられる
		transcendenceOver = spId / baseFlag;
		// BigInt と str はそのまま結合できる
		condTextTranscendence = "超越段階が" + transcendenceOver + "以上の時、";
		spId = parseInt(spId % baseFlag);
	}

	// ----------- ここから下は int 型 ---------------
	var friendlyOver = 0;
	var friendlyOverEffecct = 0;

	// 「親密度が極めて親しい以上のとき」条件
	friendlyOver = Math.floor(spId / ITEM_SP_PET_FRIENDLY_OVER_HIGHEST);
	if (friendlyOver > 0) {
		friendlyOverEffecct = spId % ITEM_SP_PET_FRIENDLY_OVER_HIGHEST;
		condTextFriendlyOver = "親密度が「極めて親しい」以上の場合、追加で";
		spId = friendlyOverEffecct;
	}

	// 『親密度が親しい以上の時』条件
	friendlyOver = Math.floor(spId / ITEM_SP_PET_FRIENDLY_OVER_HIGH);
	if (friendlyOver > 0) {
		friendlyOverEffecct = spId % ITEM_SP_PET_FRIENDLY_OVER_HIGH;
		condTextFriendlyOver = "親密度が「親しい」以上の場合、追加で";
		spId = friendlyOverEffecct;
	}

	/*
	switch (friendlyOver) {
	case 1:
		condTextFriendlyOver = "親密度が「逃亡寸前」以上の場合、追加で";
		break;
	case 2:
		condTextFriendlyOver = "親密度が「疎々しい」以上の場合、追加で";
		break;
	case 3:
		condTextFriendlyOver = "親密度が「気まずい」以上の場合、追加で";
		break;
	case 4:
		condTextFriendlyOver = "親密度が「普通」以上の場合、追加で";
		break;
	}
	spId = friendlyOverEffecct;
	*/

	// 『BaseLvが○以上の時』条件
	var baseLvOver = Math.floor(spId / ITEM_SP_BASE_LV_OVER_170_OFFSET);
	var baseLvOverEffecct = spId % ITEM_SP_BASE_LV_OVER_170_OFFSET;
	switch (baseLvOver) {
	case 1:
		condTextBaseLvOver = "BaseLvが170以上の時、追加で";
		break;
	case 2:
		condTextBaseLvOver = "BaseLvが100以上の時、追加で";
		break;
	case 3:
		condTextBaseLvOver = "BaseLvが99以下の時、追加で";
		break;
	case 4:
		condTextBaseLvOver = "BaseLvが175以上の時、追加で";
		break;
	case 5:
		condTextFriendlyOver = "BaseLvが250以上の時、追加で";
		break;
	case 6:
		condTextFriendlyOver = "BaseLvが260以上の時、追加で";
		break;
	case 7:
		condTextFriendlyOver = "BaseLvが165以上の時、追加で";
		break;
	}
	spId = baseLvOverEffecct;

	// 『BaseLvが○上がる度に』条件
	var baseLvBy = Math.floor(spId / ITEM_SP_BASE_LV_BY_1_OFFSET);
	var baseLvByEffecct = spId % ITEM_SP_BASE_LV_BY_1_OFFSET;
	if (baseLvBy > 0) {
		condTextBaseLvBy = "BaseLvが" + baseLvBy + "上がる度に追加で";
	}
	spId = baseLvByEffecct;

	// 職業限定
	var jobRestrict = Math.floor(spId / ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET) - 1;
	if (jobRestrict >= 0) {
		condTextJobRestrict += registryGet('GetJobName')(jobRestrict) + "系が装備時、";
	}
	spId = spId % ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET;

	// 『純粋な○○が△△以上の時』条件
	var pureStatus = Math.floor(spId / ITEM_SP_PURE_STR_90_OFFSET);
	var pureStatusEffect = spId % ITEM_SP_PURE_STR_90_OFFSET;
	if (1 <= pureStatus && pureStatus <= 6) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 1] +  "が90以上の時、";
	}
	else if (49 <= pureStatus && pureStatus <= 54) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 49] +  "が100以上の時、";
	}
	else if (7 <= pureStatus && pureStatus <= 12) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 7] +  "が108以上の時、";
	}
	else if (13 <= pureStatus && pureStatus <= 18) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 13] +  "が120以上の時、";
	}
	else if (19 <= pureStatus && pureStatus <= 24) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 19] +  "が125以上の時、";
	}
	else if (25 <= pureStatus && pureStatus <= 30) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 25] +  "が110以上の時、";
	}
	else if (31 <= pureStatus && pureStatus <= 36) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 31] +  "が80以上の時、";
	}
	else if (37 <= pureStatus && pureStatus <= 42) {
		condTextPureStatus += "純粋な" + statusName[pureStatus - 37] +  "が130以上の時、";
	}
	else if (43 <= pureStatus && pureStatus <= 48) {
		condTextPureStatus += "純粋な" + spStatusName[pureStatus - 43] +  "が100以上の時、";
	}
	else if (55 <= pureStatus && pureStatus <= 60) {
		condTextPureStatus += "純粋な" + spStatusName[pureStatus - 55] +  "が50以上の時、";
	}
	else if (61 <= pureStatus && pureStatus <= 66) {
		condTextPureStatus += "純粋な" + spStatusName[pureStatus - 61] +  "が110以上の時、";
	}
	spId = pureStatusEffect;

	// 『純粋な○○が△△上がる度に』条件
	var pureStatusBy = Math.floor(spId / ITEM_SP_PURE_STR_BY_10_OFFSET);
	var pureStatusByEffect = spId % ITEM_SP_PURE_STR_BY_10_OFFSET;
	if (1 <= pureStatusBy && pureStatusBy <= 6) {
		condTextPureStatus += "純粋な" + statusName[pureStatusBy - 1] +  "が10上がる度に、";
	}
	else if (7 == pureStatusBy) {
		condTextPureStatus += "純粋な" + statusName[PARAM_DEX] +  "が1上がる度に、";
	}
	else if (8 == pureStatusBy) {
		condTextPureStatus += "純粋な" + statusName[PARAM_VIT] +  "が1上がる度に、";
	}
	spId = pureStatusByEffect;

	// 『精錬値が○以上の時』条件
	var refineOver = Math.floor(spId / ITEM_SP_REFINE_OVER_1_OFFSET);
	var refineOverEffect = spId % ITEM_SP_REFINE_OVER_1_OFFSET;
	if (refineOver > 0) {
		condTextRefineOver = "精錬値が" + refineOver + "以上の時、";
	}
	spId = refineOverEffect;

	// 『精錬値が○上がる度に』条件
	var refineBy = Math.floor(spId / ITEM_SP_REFINE_BY_1_OFFSET);
	var refineByEffecct = spId % ITEM_SP_REFINE_BY_1_OFFSET;
	if (refineBy > 0) {
		condTextRefineBy = "精錬値が" + refineBy + "上がる度に追加で";
	}
	spId = refineByEffecct;


	// 条件文字列の組み立て
	textInfoArray.push([
		"",
		condTextEquipmentLocation
		+ condTextTranscendence 
		+ condTextFriendlyOver 
		+ condTextJobRestrict 
		+ condTextBaseLvOver 
		+ condTextRefineOver 
		+ condTextPureStatus 
		+ condTextRefineBy 
		+ condTextBaseLvBy
	]);

	sign = (spValue < 0) ? " " : " + ";

	// アイテムSPの説明
	switch (spId) {

		case ITEM_SP_DMY:
			textInfoArray.push(["", ""]);
			break;

		case ITEM_SP_STR_PLUS:
			textInfoArray.push(["", "STR" + sign + spValue]);
			break;

		case ITEM_SP_AGI_PLUS:
			textInfoArray.push(["", "AGI" + sign + spValue]);
			break;

		case ITEM_SP_VIT_PLUS:
			textInfoArray.push(["", "VIT" + sign + spValue]);
			break;

		case ITEM_SP_INT_PLUS:
			textInfoArray.push(["", "INT" + sign + spValue]);
			break;

		case ITEM_SP_DEX_PLUS:
			textInfoArray.push(["", "DEX" + sign + spValue]);
			break;

		case ITEM_SP_LUK_PLUS:
			textInfoArray.push(["", "LUK" + sign + spValue]);
			break;

		case ITEM_SP_ALLSTATUS_PLUS:
			textInfoArray.push(["", "全ての基本ステータス" + sign + spValue]);
			break;

		case ITEM_SP_HIT_PLUS:
			textInfoArray.push(["", "Hit" + sign + spValue]);
			break;

		case ITEM_SP_FLEE_PLUS:
			textInfoArray.push(["", "Flee" + sign + spValue]);
			break;

		case ITEM_SP_CRI_PLUS:
			textInfoArray.push(["", "Cri" + sign + spValue]);
			break;

		case ITEM_SP_LUCKY_PLUS:
			textInfoArray.push(["", "完全回避" + sign + spValue]);
			break;

		case ITEM_SP_ASPD_UP:
			textInfoArray.push(["", "攻撃速度" + sign + spValue +"%"]);
			break;

		case ITEM_SP_MAXHP_PLUS:
			textInfoArray.push(["", "MaxHP" + sign + spValue]);
			break;

		case ITEM_SP_MAXSP_PLUS:
			textInfoArray.push(["", "MaxSP" + sign + spValue]);
			break;

		case ITEM_SP_MAXHP_UP:
			textInfoArray.push(["", "MaxHP" + sign + spValue +"%"]);
			break;

		case ITEM_SP_MAXSP_UP:
			textInfoArray.push(["", "MaxSP" + sign + spValue +"%"]);
			break;

		case ITEM_SP_ATK_PLUS:
			textInfoArray.push(["", "ATK" + sign + spValue]);
			break;

		case ITEM_SP_DEF_PLUS:
			textInfoArray.push(["", "DEF" + sign + spValue]);
			break;

		case ITEM_SP_MDEF_PLUS:
			textInfoArray.push(["", "MDEF" + sign + spValue]);
			break;

		case ITEM_SP_ELEMENTAL:
			textInfoArray.push(["", GetElementText(spValue) +"属性武器"]);
			break;

		case ITEM_SP_PENETRATE_DEF:
			if(spValue == 1) {
				textInfoArray.push(["", "敵の防御力を無視する(Boss属性は無視できない)"]);
			}
			else {
				textInfoArray.push(["", "敵の防御力を無視する(Boss属性の防御力も無視できる)"]);
			}
			break;

		case ITEM_SP_KIRI_EFFECT:
			textInfoArray.push(["", "相手の防御力が高いほど与えるダメージが増加"]);
			break;

		case ITEM_SP_DEF_DIVIDE_PENARTY:
			textInfoArray.push(["", "自キャラクターの防御力1/"+ spValue + ""]);
			break;

		case ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW:
			textInfoArray.push(["", "弓装備時、遠距離物理攻撃で与えるダメージ"+ sign + spValue +"%"]);
			break;

		case ITEM_SP_LONGRANGE_DAMAGE_UP:
			textInfoArray.push(["", "遠距離物理攻撃で与えるダメージ"+ sign + spValue +"%"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS:
			textInfoArray.push(["", "BOSS属性モンスターに与える物理ダメージ"+ spValue +"%"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE:
			textInfoArray.push(["", GetSizeText(spId - ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL) + "のモンスターに与える物理ダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID) + "形のモンスターに与える物理ダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
			textInfoArray.push(["", GetElementText(spId - ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY) + "属性モンスターに与える物理ダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_RESIST_RACE_SOLID:
		case ITEM_SP_RESIST_RACE_UNDEAD:
		case ITEM_SP_RESIST_RACE_ANIMAL:
		case ITEM_SP_RESIST_RACE_PLANT:
		case ITEM_SP_RESIST_RACE_INSECT:
		case ITEM_SP_RESIST_RACE_FISH:
		case ITEM_SP_RESIST_RACE_DEMON:
		case ITEM_SP_RESIST_RACE_HUMAN:
		case ITEM_SP_RESIST_RACE_ANGEL:
		case ITEM_SP_RESIST_RACE_DRAGON:
			if (spValue > 0) {
				textInfoArray.push(["", GetRaceText(spId - ITEM_SP_RESIST_RACE_SOLID) + "形モンスターから受けるダメージ" + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", GetRaceText(spId - ITEM_SP_RESIST_RACE_SOLID) + "形モンスターから受けるダメージ" + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_RESIST_ELM_VANITY:
		case ITEM_SP_RESIST_ELM_WATER:
		case ITEM_SP_RESIST_ELM_EARTH:
		case ITEM_SP_RESIST_ELM_FIRE:
		case ITEM_SP_RESIST_ELM_WIND:
		case ITEM_SP_RESIST_ELM_POISON:
		case ITEM_SP_RESIST_ELM_HOLY:
		case ITEM_SP_RESIST_ELM_DARK:
		case ITEM_SP_RESIST_ELM_PSYCO:
		case ITEM_SP_RESIST_ELM_UNDEAD:
			textInfoArray.push(["", GetElementText(spId - ITEM_SP_RESIST_ELM_VANITY) + "属性攻撃に対する耐性" + sign + spValue + "%"]);
			break;

		case ITEM_SP_CRITICAL_DAMAGE_UP:
			textInfoArray.push(["", "クリティカル攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_REFLECT_PHYSICAL_DAMAGE:
			textInfoArray.push(["", "敵の近距離物理攻撃を" + spValue + "%反射"]);
			break;

		case ITEM_SP_LONGRANGE_CRI_PLUS:
			textInfoArray.push(["", "遠距離物理攻撃時、Cri + " + spValue + ""]);
			break;

		case ITEM_SP_SKILL_CAST_TIME:
			textInfoArray.push(["", "変動詠唱時間" + sign + spValue + "%"]);
			break;

		case ITEM_SP_SKILL_DELAY_DOWN:
			if (spValue > 0) {
				textInfoArray.push(["", "スキル後のディレイ" + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "スキル後のディレイ" + (spValue * -1) + "%増加"]);
			}
			break;

		case ITEM_SP_HPR_UP:
			textInfoArray.push(["", "HP自然回復力" + sign + spValue + "%"]);
			break;

		case ITEM_SP_SPR_UP:
			textInfoArray.push(["", "SP自然回復力" + sign + spValue + "%"]);
			break;

		case ITEM_SP_RESIST_BOSS:
			textInfoArray.push(["", `ボスモンスターから受けるダメージ ${spValue}% ${sign === " + " ? "減少": "増加"}`]);
			break;

		case ITEM_SP_RESIST_LONGRANGE:
			textInfoArray.push(["", "遠距離攻撃に対する耐性" + sign + spValue + "%"]);
			break;

		case ITEM_SP_RESIST_NOTBOSS:
			textInfoArray.push(["", `一般モンスターから受けるダメージ ${spValue}% ${sign === " + " ? "減少": "増加"}`]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP:
			textInfoArray.push(["", "物理攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;
		
		case ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL:
			textInfoArray.push(["", "命中物理攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_DAMAGE_UP_GROUP_GOBLIN:
			textInfoArray.push(["", "ゴブリン系に対するダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_DAMAGE_UP_GROUP_COBOLD:
			textInfoArray.push(["", "コボルド系に対するダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_DAMAGE_UP_GROUP_ORC:
			textInfoArray.push(["", "オーク系に対するダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_DAMAGE_UP_GROUP_GOLEM:
			textInfoArray.push(["", "ゴーレム系に対するダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_WEAPON_ATK_UP:
			textInfoArray.push(["", "武器攻撃力" + sign + spValue + "%"]);
			break;

		case ITEM_SP_PERFECT_ATTACK_UP:
			textInfoArray.push(["", `必中攻撃 + ${spValue}%`]);
			break;

		case ITEM_SP_ATK_UP:
			textInfoArray.push(["", "ATK" + sign + spValue + "%"]);
			break;

		case ITEM_SP_MATK_PLUS_TYPE_WEAPON:
			textInfoArray.push(["", `武器のMatk : ${spValue}`]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP:
			textInfoArray.push(["", "魔法攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_SET_DEFINITION:
			break;

		case ITEM_SP_HEAL_UP_USING:
			textInfoArray.push(["", "ヒール系スキルを使用した時の回復量" + sign + spValue + "%"]);
			break;

		case ITEM_SP_HEAL_UP_USED:
			textInfoArray.push(["", "ヒール系スキルを受けた時の回復量" + sign + spValue + "%"]);
			break;

		case ITEM_SP_HEAL_DAMAGE_UP:
			textInfoArray.push(["", "不死へのヒールダメージ" + sign + spValue + "%(ハイネスとサンクに効果なし)"]);
			break;

		case ITEM_SP_HEAL_UP_USING_ONLY_HEAL:
			textInfoArray.push(["", "[ヒール]を使用した時の回復量" + sign + spValue + "%"]);
			break;

		case ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES:
			textInfoArray.push(["", "[ヒール][ハイネスヒール][コルセオヒール][サンクチュアリ]を使用した時の回復量" + sign + spValue + "%"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_BOSS:
			textInfoArray.push(["", "BOSS属性モンスターに与える魔法ダメージ" + spValue + "%"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL:
		case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM:
		case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE:
			textInfoArray.push(["", GetSizeText(spId - ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL) + "のモンスターに与える魔法ダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON:
			textInfoArray.push(["", "Matk" + sign + spValue + ""]);
			break;

		case ITEM_SP_ASPD_PLUS:
			textInfoArray.push(["", "ASPD" + sign + spValue + ""]);
			break;

		case ITEM_SP_COST_DOWN:
			if (spValue > 0) {
				textInfoArray.push(["", "スキル使用時の消費SP -" + spValue + "%"]);
			}
			else {
				textInfoArray.push(["red", "スキル使用時の消費SP + "+ (-1 * spValue) + "%"]);
			}
			break;

		case ITEM_SP_EXP_UP_ALL:
			textInfoArray.push(["", "全てのモンスターを倒した時に獲得する経験値" + sign + spValue + "%"]);
			break;

		case ITEM_SP_DEF_UP:
			textInfoArray.push(["", "自キャラクターのDef " + sign + spValue + "%"]);
			break;

		case ITEM_SP_MDEF_UP:
			textInfoArray.push(["", "自キャラクターのMdef " + sign + spValue + "%"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
			textInfoArray.push(["", GetRaceText(RACE_ID_HUMAN) + "形のモンスターに与える物理ダメージ" + sign + spValue + "%（プレイヤーを除く）"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER:
			textInfoArray.push(["", GetRaceText(RACE_ID_HUMAN) + "形のモンスターに与える魔法ダメージ" + sign + spValue + "%（プレイヤーを除く）"]);
			break;

		case ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER:
			if (spValue > 0) {
				textInfoArray.push(["", GetRaceText(RACE_ID_HUMAN) + "形モンスターから受けるダメージ" + spValue + "%減少（プレイヤーを除く）"]);
			}
			else {
				textInfoArray.push(["", GetRaceText(RACE_ID_HUMAN) + "形モンスターから受けるダメージ" + (-1 * spValue) + "%増加（プレイヤーを除く）"]);
			}
			break;

		case ITEM_SP_SKILL_FIXED_MINUS:
			if(spValue > 0) {
				textInfoArray.push(["", "固定詠唱時間 " + (spValue / 1000) + "秒減少"]);
			}
			else {
				textInfoArray.push(["", "固定詠唱時間 " + (-1 * spValue / 1000) + "秒増加"]);
			}
			break;

		case ITEM_SP_CRITICAL_UP_RACE_SOLID:
		case ITEM_SP_CRITICAL_UP_RACE_UNDEAD:
		case ITEM_SP_CRITICAL_UP_RACE_ANIMAL:
		case ITEM_SP_CRITICAL_UP_RACE_PLANT:
		case ITEM_SP_CRITICAL_UP_RACE_INSECT:
		case ITEM_SP_CRITICAL_UP_RACE_FISH:
		case ITEM_SP_CRITICAL_UP_RACE_DEMON:
		case ITEM_SP_CRITICAL_UP_RACE_HUMAN:
		case ITEM_SP_CRITICAL_UP_RACE_ANGEL:
		case ITEM_SP_CRITICAL_UP_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_CRITICAL_UP_RACE_SOLID) + "形に対してクリティカル" + sign + spValue + ""]);
			break;

		case ITEM_SP_EXP_UP_RACE_SOLID:
		case ITEM_SP_EXP_UP_RACE_UNDEAD:
		case ITEM_SP_EXP_UP_RACE_ANIMAL:
		case ITEM_SP_EXP_UP_RACE_PLANT:
		case ITEM_SP_EXP_UP_RACE_INSECT:
		case ITEM_SP_EXP_UP_RACE_FISH:
		case ITEM_SP_EXP_UP_RACE_DEMON:
		case ITEM_SP_EXP_UP_RACE_HUMAN:
		case ITEM_SP_EXP_UP_RACE_ANGEL:
		case ITEM_SP_EXP_UP_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_EXP_UP_RACE_SOLID) + "形のモンスターを倒した時に獲得する経験値" + sign + spValue + "%"]);
			break;

		case ITEM_SP_APPEND_STATE_POISON:
		case ITEM_SP_APPEND_STATE_STUN:
		case ITEM_SP_APPEND_STATE_FROZEN:
		case ITEM_SP_APPEND_STATE_CURSED:
		case ITEM_SP_APPEND_STATE_BLIND:
		case ITEM_SP_APPEND_STATE_SLEEP:
		case ITEM_SP_APPEND_STATE_SILENCE:
		case ITEM_SP_APPEND_STATE_CONFUSE:
		case ITEM_SP_APPEND_STATE_BLEEDING:
		case ITEM_SP_APPEND_STATE_STONE:
		case ITEM_SP_APPEND_STATE_BREAK_WEAPON:
		case ITEM_SP_APPEND_STATE_BREAK_HELM:
		case ITEM_SP_APPEND_STATE_BREAK_ARMOR:
		case ITEM_SP_APPEND_STATE_BREAK_SHIELD:
		case ITEM_SP_APPEND_STATE_BREAK_SHOULDER:
		case ITEM_SP_APPEND_STATE_BREAK_SHOES:
		case ITEM_SP_APPEND_STATE_BREAK_ACCESSORY:
			textInfoArray.push(["", "物理攻撃時、" + spValue + "%の確率で敵を" + GetStateText(spId - ITEM_SP_APPEND_STATE_POISON) + "にする"]);
			break;


		case ITEM_SP_RESIST_STATE_POISON:
		case ITEM_SP_RESIST_STATE_STUN:
		case ITEM_SP_RESIST_STATE_FROZEN:
		case ITEM_SP_RESIST_STATE_CURSED:
		case ITEM_SP_RESIST_STATE_BLIND:
		case ITEM_SP_RESIST_STATE_SLEEP:
		case ITEM_SP_RESIST_STATE_SILENCE:
		case ITEM_SP_RESIST_STATE_CONFUSE:
		case ITEM_SP_RESIST_STATE_BLEEDING:
		case ITEM_SP_RESIST_STATE_STONE:
		case ITEM_SP_RESIST_STATE_BREAK_WEAPON:
		case ITEM_SP_RESIST_STATE_BREAK_HELM:
		case ITEM_SP_RESIST_STATE_BREAK_ARMOR:
		case ITEM_SP_RESIST_STATE_BREAK_SHIELD:
		case ITEM_SP_RESIST_STATE_BREAK_SHOULDER:
		case ITEM_SP_RESIST_STATE_BREAK_SHOES:
		case ITEM_SP_RESIST_STATE_BREAK_ACCESSORY:
			textInfoArray.push(["", "状態異常 " + GetStateText(spId - ITEM_SP_RESIST_STATE_POISON) + " に対する耐性 + " + spValue + "%"]);
			break;
		
		case ITEM_SP_RESIST_STATE_R_CHILLED:
		case ITEM_SP_RESIST_STATE_R_ICED:
		case ITEM_SP_RESIST_STATE_R_IGNITION:
		case ITEM_SP_RESIST_STATE_R_FEAR:
		case ITEM_SP_RESIST_STATE_R_DEEPSLEEP:
		case ITEM_SP_RESIST_STATE_R_CHARMED:
		case ITEM_SP_RESIST_STATE_R_FRENZY:
		case ITEM_SP_RESIST_STATE_NEW_LETHARGY:
		case ITEM_SP_RESIST_STATE_NEW_JETBLACK:
		case ITEM_SP_RESIST_STATE_NEW_HIGHLYPOISONOUS:
		case ITEM_SP_RESIST_STATE_NEW_TORRENT:
		case ITEM_SP_RESIST_STATE_NEW_MELANCHOLY:
		case ITEM_SP_RESIST_STATE_NEW_STILLNESS:
		case ITEM_SP_RESIST_STATE_NEW_CONFLAGRATION:
		case ITEM_SP_RESIST_STATE_NEW_RAPIDCOOLING:
		case ITEM_SP_RESIST_STATE_NEW_CRYSTALLIZATION:
		case ITEM_SP_RESIST_STATE_NEW_UNHAPPINESS:
			textInfoArray.push(["", "状態異常 " + GetStateText(spId - ITEM_SP_RESIST_STATE_R_CHILLED + STATE_R_ID_CHILLED) + " に対する耐性 + " + spValue + "%"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL:
		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON:
			textInfoArray.push(["", "魔法攻撃で、" + GetRaceText(spId - ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID) + "形モンスターに与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_PENETRATE_DEF_RACE_SOLID:
		case ITEM_SP_PENETRATE_DEF_RACE_UNDEAD:
		case ITEM_SP_PENETRATE_DEF_RACE_ANIMAL:
		case ITEM_SP_PENETRATE_DEF_RACE_PLANT:
		case ITEM_SP_PENETRATE_DEF_RACE_INSECT:
		case ITEM_SP_PENETRATE_DEF_RACE_FISH:
		case ITEM_SP_PENETRATE_DEF_RACE_DEMON:
		case ITEM_SP_PENETRATE_DEF_RACE_HUMAN:
		case ITEM_SP_PENETRATE_DEF_RACE_ANGEL:
		case ITEM_SP_PENETRATE_DEF_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_PENETRATE_DEF_RACE_SOLID) + "形のモンスターの物理防御力無視"]);
			break;

		case ITEM_SP_RESIST_SIZE_SMALL:
		case ITEM_SP_RESIST_SIZE_MEDIUM:
		case ITEM_SP_RESIST_SIZE_LARGE:
			if (spValue > 0) {
				textInfoArray.push(["", GetSizeText(spId - ITEM_SP_RESIST_SIZE_SMALL) + "モンスターから受けるダメージ" + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", GetSizeText(spId - 190) + "モンスターから受けるダメージ" + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_UNREFINABLE:
			textInfoArray.push(["red", "精錬不可能"]);
			break;

		case ITEM_SP_UNBREAKABLE:
			textInfoArray.push(["", "絶対に損傷しない"]);
			break;

		case ITEM_SP_STUFF2HAND:
			textInfoArray.push(["", "両手杖"]);
			break;

		case ITEM_SP_RESIST_MAGIC:
			if(spValue > 0) {
				textInfoArray.push(["", "魔法攻撃で受けるダメージ" + "-" + spValue + "%"]);
			}
			else {
				textInfoArray.push(["", "魔法攻撃で受けるダメージ" + "+" + (0 - spValue) + "%"]);
			}
			break;

		case ITEM_SP_SPECIAL_RANGE:
			textInfoArray.push(["", "射程距離 " + spValue + ""]);
			break;

		case ITEM_SP_BODY_ELEMENT:
			textInfoArray.push(["", "自キャラの防御属性が" + GetElementText(spValue) + "属性になる"]);
			break;

		case ITEM_SP_LEARNED_SKILL_EFFECT:
			skillName = SkillObjNew[spValue][SKILL_DATA_INDEX_NAME];
			skillName = skillName.replace(/\([^)]*\)/g, "");
			skillName = skillName.replace(/\<[^>]*\>/g, "");
			textInfoArray.push(["green", "【習得スキル設定対象】"]);
			textInfoArray.push(["green", "（" + skillName + "）"]);
			textInfoArray.push(["", ""]);
			break;

		case ITEM_SP_SHORTRANGE_DAMAGE_UP:
			textInfoArray.push(["", "近接物理攻撃で与えるダメージ"+ sign + spValue +"%"]);
			break;

		case ITEM_SP_STR_PLUS_FOR_SET:
			textInfoArray.push(["", "STR" + sign + spValue]);
			break;

		case ITEM_SP_AGI_PLUS_FOR_SET:
			textInfoArray.push(["", "AGI" + sign + spValue]);
			break;

		case ITEM_SP_VIT_PLUS_FOR_SET:
			textInfoArray.push(["", "VIT" + sign + spValue]);
			break;

		case ITEM_SP_INT_PLUS_FOR_SET:
			textInfoArray.push(["", "INT" + sign + spValue]);
			break;

		case ITEM_SP_DEX_PLUS_FOR_SET:
			textInfoArray.push(["", "DEX" + sign + spValue]);
			break;

		case ITEM_SP_LUK_PLUS_FOR_SET:
			textInfoArray.push(["", "LUK" + sign + spValue]);
			break;

		case ITEM_SP_ALLSTATUS_PLUS_FOR_SET:
			textInfoArray.push(["", "全ての基本ステータス" + sign + spValue]);
			break;

		case ITEM_SP_INVALIDATE_ITEM_SP:
			if (ItemObjNew[spValue][ITEM_DATA_INDEX_KIND] == ITEM_KIND_SET) {

				idArrayWork = new Array();

				for (idx = 0; idx < w_SE.length; idx++) {
					if (w_SE[idx][0] == spValue) {
						idArrayWork.push(idx);
					}
				}

				textWork = "[" + GetItemSetMemberText(idArrayWork[0]) + "]セット";
				for (idx = 1; idx < idArrayWork.length; idx++) {
					textWork += "および";
					textInfoArray.push(["", textWork]);

					textWork = "[" + GetItemSetMemberText(idArrayWork[idx]) + "]セット";
				}
				textWork += " の効果が発動しない";

				textInfoArray.push(["", textWork]);
			}
			else {
				textInfoArray.push(["", "[" + ItemObjNew[spValue][ITEM_DATA_INDEX_NAME] + "]" + " の効果が発動しない"]);
			}
			break;

		case ITEM_SP_INVALIDATE_CARD_SP:
			if (CardObjNew[spValue][CARD_DATA_INDEX_KIND] == CARD_KIND_SET) {

				idArrayWork = new Array();

				for (idx = 0; idx < w_SE.length; idx++) {
					if (w_SE[idx][0] == (0 - spValue)) {
						idArrayWork.push(idx);
					}
				}

				textWork = "[" + GetItemSetMemberText(idArrayWork[0]) + "]セット";
				for (idx = 1; idx < idArrayWork.length; idx++) {
					textWork += "および";
					textInfoArray.push(["", textWork]);

					textWork = "[" + GetItemSetMemberText(idArrayWork[idx]) + "]セット";
				}
				textWork += " の効果が発動しない";

				textInfoArray.push(["", textWork]);
			}
			else {
				textInfoArray.push(["", "[" + CardObjNew[spValue][CARD_DATA_INDEX_NAME] + "]カード" + " の効果が発動しない"]);
			}
			break;

		case ITEM_SP_LEARN_SKILL:
			textInfoArray.push(["", "スキル[" + SkillObjNew[InsertSkill[spValue][USABLE_SKILL_DATA_INDEX_SKILL_ID]][SKILL_DATA_INDEX_NAME] + "]Lv " + InsertSkill[spValue][USABLE_SKILL_DATA_INDEX_SKILL_LEVEL] + " 使用可能"]);
			break;

		case ITEM_SP_AUTO_SPELL:

			if (AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_PROBABLY] == 0) {
				textWork = "一定";
			}
			else {
				textWork = AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_PROBABLY] + "%の";
			}

			textInfoArray.push(["", GetAutoSpellTriggerText(AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_TRIGGER]) + "、"
				+ textWork + "確率でオートスペル[" + SkillObjNew[AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_SKILL_ID]][SKILL_DATA_INDEX_NAME] + "]Lv " + AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_SKILL_LEVEL] + "発動"]);

			break;

		case ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED:
			textInfoArray.push(["", "スキル[" + SkillObjNew[InsertSkill[spValue][USABLE_SKILL_DATA_INDEX_SKILL_ID]][SKILL_DATA_INDEX_NAME] + "] 使用可能（装備品の条件により使用可能Lvは変わります）"]);
			break;

		case ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED:

			if (AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_PROBABLY] == 0) {
				textWork = "一定";
			}
			else {
				textWork = AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_PROBABLY] + "%の";
			}

			textInfoArray.push(["", GetAutoSpellTriggerText(AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_TRIGGER]) + "、"
				+ textWork + "確率でオートスペル[" + SkillObjNew[AutoSpellSkill[spValue][AUTO_SPELL_DATA_INDEX_SKILL_ID]][SKILL_DATA_INDEX_NAME] + "] 発動（装備品の条件により発動Lvは変わります）"]);

			break;

		case ITEM_SP_SIZE_PERFECTION:
			textInfoArray.push(["", "全てのモンスターに対し、サイズによる武器ダメージのペナルティが発生しない"]);
			break;

		case ITEM_SP_ARMS_ELEMENT:
			textInfoArray.push(["", "180分間、武器に" + GetElementText(spValue) + "属性を付与"]);
			break;

		case ITEM_SP_POW_PLUS:
			textInfoArray.push(["", "Pow" + sign + spValue]);
			break;
		case ITEM_SP_STA_PLUS:
			textInfoArray.push(["", "Sta" + sign + spValue]);
			break;
		case ITEM_SP_WIS_PLUS:
			textInfoArray.push(["", "Wis" + sign + spValue]);
			break;
		case ITEM_SP_SPL_PLUS:
			textInfoArray.push(["", "Spl" + sign + spValue]);
			break;
		case ITEM_SP_CON_PLUS:
			textInfoArray.push(["", "Con" + sign + spValue]);
			break;
		case ITEM_SP_CRT_PLUS:
			textInfoArray.push(["", "Crt" + sign + spValue]);
			break;
		case ITEM_SP_ALL_SPECS_PLUS:
			textInfoArray.push(["", "全ての特性ステータス" + sign + spValue]);
			break;

		case ITEM_SP_KOZYOSEN_TE_RENTAL_ITEM:
			textInfoArray.push(["", "------------------"]);
			textInfoArray.push(["green", "攻城戦TE専用のレンタルアイテム。レンタル後、24時間で自動消滅する。"]);
			textInfoArray.push(["green", "攻城戦TEの砦内で以下の効果が追加される。"]);
			textInfoArray.push(["green", "※計算機ではプレイヤーに対する効果はヒドラCやタラCと倍率加算しています。"]);
			textInfoArray.push(["green", "※計算機ではモンスター選択欄一番下の[プレイヤー]を選択すると効果があります。"]);
			textInfoArray.push(["green", "※計算機でもモンスターに対しては効果ありません。"]);
			textInfoArray.push(["", "------------------"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL:
			textInfoArray.push(["", "物理攻撃時、プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL:
			textInfoArray.push(["", "魔法攻撃時、プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_RESIST_PLAYER_ALL:
			if (spValue > 0) {
				textInfoArray.push(["", "プレイヤーから受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "プレイヤーから受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_ATK_PLUS_GVGTE:
			textInfoArray.push(["", "ATK" + sign + spValue + "。"]);
			break;

		case ITEM_SP_MATK_PLUS_GVGTE:
			textInfoArray.push(["", "MATK" + sign + spValue + "。"]);
			break;

		case ITEM_SP_MAXHP_PLUS_GVGTE:
			textInfoArray.push(["", "MaxHP" + sign + spValue + "。"]);
			break;

		case ITEM_SP_MAXSP_PLUS_GVGTE:
			textInfoArray.push(["", "MaxSP" + sign + spValue + "。"]);
			break;

		case ITEM_SP_HEAL_UP_USING_GVGTE:
			textInfoArray.push(["", "[ヒール][ハイネスヒール][コルセオヒール][サンクチュアリ][ポーションピッチャー]を使用した時の回復量" + sign + spValue + "%"]);
			break;

		case ITEM_SP_RESIST_FROZEN_GVGTE:
			textInfoArray.push(["", "状態異常 凍結 に対する耐性 +" + spValue + "%"]);
			break;

		case ITEM_SP_P_ATK_PLUS:
			textInfoArray.push(["", "P.Atk" + sign + spValue]);
			break;
		case ITEM_SP_S_MATK_PLUS:
			textInfoArray.push(["", "S.Matk" + sign + spValue]);
			break;
		case ITEM_SP_H_PLUS_PLUS:
			textInfoArray.push(["", "H.Plus" + sign + spValue]);
			break;
		case ITEM_SP_C_RATE_PLUS:
			textInfoArray.push(["", "C.Rate" + sign + spValue]);
			break;
		case ITEM_SP_RES_PLUS:
			textInfoArray.push(["", "Res" + sign + spValue]);
			break;
		case ITEM_SP_MRES_PLUS:
			textInfoArray.push(["", "Mres" + sign + spValue]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_ALL:
			textInfoArray.push(["", "物理攻撃時、小・中・大型モンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL:
			textInfoArray.push(["", "物理攻撃時、全ての種族のモンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL:
			textInfoArray.push(["", "物理攻撃時、全ての属性のモンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_RESIST_RACE_ALL:
			if (spValue > 0) {
				textInfoArray.push(["", "全ての種族のモンスターから受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "全ての種族のモンスターから受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_RESIST_ELM_ALL:
			if (spValue > 0) {
				textInfoArray.push(["", "全ての属性攻撃で受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "全ての属性攻撃で受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL:
			textInfoArray.push(["", "魔法攻撃時、小・中・大型モンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL:
			textInfoArray.push(["", "魔法攻撃時、全ての種族のモンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS:
			textInfoArray.push(["", "物理攻撃時、一般モンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS:
			textInfoArray.push(["", "魔法攻撃時、一般モンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL:
			textInfoArray.push(["", "魔法攻撃時、全ての属性のモンスターに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL:
			textInfoArray.push(["", "全ての属性魔法攻撃で与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_RESIST_MONSTER_ELM_ALL:
			if (spValue > 0) {
				textInfoArray.push(["", "全ての属性モンスターから受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "全ての属性モンスターから受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM:
			textInfoArray.push(["", "物理攻撃時、ドラム形プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM:
			textInfoArray.push(["", "魔法攻撃時、ドラム形プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_RESIST_PLAYER_DORAM:
			if (spValue > 0) {
				textInfoArray.push(["", "ドラム形プレイヤーから受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "ドラム形プレイヤーから受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN:
			textInfoArray.push(["", "物理攻撃時、人間形プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN:
			textInfoArray.push(["", "魔法攻撃時、人間形プレイヤーに与えるダメージ" + sign + spValue + "%。"]);
			break;

		case ITEM_SP_RESIST_PLAYER_HUMAN:
			if (spValue > 0) {
				textInfoArray.push(["", "人間形プレイヤーから受けるダメージ " + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", "人間形プレイヤーから受けるダメージ " + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO:
		case ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD:
			textInfoArray.push(["", GetElementText(spId - ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY) + "属性物理攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_IGNORE_DEF_ALL:
			textInfoArray.push(["", "モンスターのDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_DEF_NOTBOSS:
			textInfoArray.push(["", "一般モンスターのDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_DEF_BOSS:
			textInfoArray.push(["", "ボスモンスターのDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_DEF_RACE_ALL:
			textInfoArray.push(["", "全ての種族のDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_RES_RACE_ALL:
			textInfoArray.push(["", "全ての種族のResを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MDEF_ALL:
			textInfoArray.push(["", "モンスターのMDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MDEF_NOTBOSS:
			textInfoArray.push(["", "一般モンスターのMDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MDEF_BOSS:
			textInfoArray.push(["", "ボスモンスターのMDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MDEF_RACE_ALL:
			textInfoArray.push(["", "全ての種族のMDEFを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MRES_RACE_ALL:
			textInfoArray.push(["", "全ての種族のMresを " + sign + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_DEF_RACE_SOLID:
		case ITEM_SP_IGNORE_DEF_RACE_UNDEAD:
		case ITEM_SP_IGNORE_DEF_RACE_ANIMAL:
		case ITEM_SP_IGNORE_DEF_RACE_PLANT:
		case ITEM_SP_IGNORE_DEF_RACE_INSECT:
		case ITEM_SP_IGNORE_DEF_RACE_FISH:
		case ITEM_SP_IGNORE_DEF_RACE_DEMON:
		case ITEM_SP_IGNORE_DEF_RACE_HUMAN:
		case ITEM_SP_IGNORE_DEF_RACE_ANGEL:
		case ITEM_SP_IGNORE_DEF_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_IGNORE_DEF_RACE_SOLID) + "形のDEFを " + spValue + "% 無視"]);
			break;

		case ITEM_SP_IGNORE_MDEF_RACE_SOLID:
		case ITEM_SP_IGNORE_MDEF_RACE_UNDEAD:
		case ITEM_SP_IGNORE_MDEF_RACE_ANIMAL:
		case ITEM_SP_IGNORE_MDEF_RACE_PLANT:
		case ITEM_SP_IGNORE_MDEF_RACE_INSECT:
		case ITEM_SP_IGNORE_MDEF_RACE_FISH:
		case ITEM_SP_IGNORE_MDEF_RACE_DEMON:
		case ITEM_SP_IGNORE_MDEF_RACE_HUMAN:
		case ITEM_SP_IGNORE_MDEF_RACE_ANGEL:
		case ITEM_SP_IGNORE_MDEF_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_IGNORE_MDEF_RACE_SOLID) + "形のMDEFを " + spValue + "% 無視"]);
			break;

		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_SOLID:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_UNDEAD:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANIMAL:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_PLANT:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_INSECT:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_FISH:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DEMON:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_HUMAN:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANGEL:
		case ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DRAGON:
			textInfoArray.push(["", GetRaceText(spId - ITEM_SP_CRITICAL_DAMAGE_UP_RACE_SOLID) + "形へのクリティカルダメージ +" + spValue + "%"]);
			break;

		case ITEM_SP_RESIST_MONSTER_ELM_VANITY:
		case ITEM_SP_RESIST_MONSTER_ELM_WATER:
		case ITEM_SP_RESIST_MONSTER_ELM_EARTH:
		case ITEM_SP_RESIST_MONSTER_ELM_FIRE:
		case ITEM_SP_RESIST_MONSTER_ELM_WIND:
		case ITEM_SP_RESIST_MONSTER_ELM_POISON:
		case ITEM_SP_RESIST_MONSTER_ELM_HOLY:
		case ITEM_SP_RESIST_MONSTER_ELM_DARK:
		case ITEM_SP_RESIST_MONSTER_ELM_PSYCO:
		case ITEM_SP_RESIST_MONSTER_ELM_UNDEAD:
			if (spValue > 0) {
				textInfoArray.push(["", GetElementText(spId - ITEM_SP_RESIST_MONSTER_ELM_VANITY) + "属性モンスターから受けるダメージ" + spValue + "%減少"]);
			}
			else {
				textInfoArray.push(["", GetElementText(spId - ITEM_SP_RESIST_MONSTER_ELM_VANITY) + "属性モンスターから受けるダメージ" + (-1 * spValue) + "%増加"]);
			}
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO:
		case ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD:
			textInfoArray.push(["", GetElementText(spId - ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY) + "属性魔法攻撃で与えるダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO:
		case ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD:
			textInfoArray.push(["", GetElementText(spId - ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY) + "属性モンスターに与える魔法ダメージ" + sign + spValue + "%"]);
			break;

		case ITEM_SP_NEVER_CAST_CANCEL:
			textInfoArray.push(["","詠唱が中断されない"]);
			break;
		case ITEM_SP_NEVER_KNOCK_BACK:
			textInfoArray.push(["","絶対にノックバックしない"]);
			break;			
		default:

			if (ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET <= spId && spId < ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET + 1000) {
				textInfoArray.push(["", "物理攻撃時、["+ MonsterObjNew[spId - ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET][MONSTER_DATA_INDEX_NAME] + "]に与えるダメージ " + sign + spValue + "%"]);
			}

			else if (ITEM_SP_SKILL_DAMAGE_OFFSET <= spId && spId < ITEM_SP_SKILL_DAMAGE_OFFSET + 2000) {
				textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_DAMAGE_OFFSET][SKILL_DATA_INDEX_NAME] + "]で与えるダメージ" + sign + spValue + "%"]);
			}

			else if (ITEM_SP_SKILL_CAST_TIME_OFFSET <= spId && spId < ITEM_SP_SKILL_CAST_TIME_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_CAST_TIME_OFFSET][SKILL_DATA_INDEX_NAME] + "]の変動詠唱時間 - " + spValue + "%"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_CAST_TIME_OFFSET][SKILL_DATA_INDEX_NAME] + "]の変動詠唱時間 + " + (-1 * spValue) + "%"]);
				}
			}

			else if (ITEM_SP_SKILL_CAST_MINUS_OFFSET <= spId && spId < ITEM_SP_SKILL_CAST_MINUS_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_CAST_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の変動詠唱時間 - " + (spValue / 1000) + "秒"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_CAST_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の変動詠唱時間 + " + (-1 * spValue / 1000) + "秒"]);
				}
			}

			else if (ITEM_SP_SKILL_FIXED_TIME_OFFSET <= spId && spId < ITEM_SP_SKILL_FIXED_TIME_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_FIXED_TIME_OFFSET][SKILL_DATA_INDEX_NAME] + "]の固定詠唱時間 - " + spValue + "%"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_FIXED_TIME_OFFSET][SKILL_DATA_INDEX_NAME] + "]の固定詠唱時間 + " + (-1 * spValue) + "%"]);
				}
			}

			else if (ITEM_SP_SKILL_FIXED_MINUS_OFFSET <= spId && spId < ITEM_SP_SKILL_FIXED_MINUS_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_FIXED_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の固定詠唱時間 - " + (spValue / 1000) + "秒"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_FIXED_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の固定詠唱時間 + " + (-1 * spValue / 1000) + "秒"]);
				}
			}

			else if (ITEM_SP_SKILL_COOL_MINUS_OFFSET <= spId && spId < ITEM_SP_SKILL_COOL_MINUS_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COOL_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の再使用待機時間 - " + (spValue / 1000) + "秒"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COOL_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の再使用待機時間 + " + (-1 * spValue / 1000) + "秒"]);
				}
			}

			else if (ITEM_SP_SKILL_COST_SCALING_OFFSET <= spId && spId < ITEM_SP_SKILL_COST_SCALING_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COST_SCALING_OFFSET][SKILL_DATA_INDEX_NAME] + "]の消費SP " + spValue + "%増加"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COST_SCALING_OFFSET][SKILL_DATA_INDEX_NAME] + "]の消費SP " + (-1 * spValue) + "%減少"]);
				}
			}

			else if (ITEM_SP_SKILL_COST_MINUS_OFFSET <= spId && spId < ITEM_SP_SKILL_COST_MINUS_OFFSET + 2000){
				if(spValue > 0) {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COST_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の消費SP " + spValue + "減少"]);
				}
				else {
					textInfoArray.push(["", "["+ SkillObjNew[spId - ITEM_SP_SKILL_COST_MINUS_OFFSET][SKILL_DATA_INDEX_NAME] + "]の消費SP " + (-1 * spValue) + "増加"]);
				}
			}
	}


	return textInfoArray;
}


