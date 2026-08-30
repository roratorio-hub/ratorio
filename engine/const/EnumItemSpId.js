/**
 * EnumItemSpId の定数定義.
 *
 * このファイルが値の一次情報。直接編集してよい（旧・自動生成方式は廃止）。
 *
 * **既存の定数値を変えるとセーブデータとアイテムデータの解釈が壊れる。**
 * 追加は末尾に足すこと（途中への挿入は後続の値をずらす）。
 * 区切りコメント（列挙定数 / 疑似定数）は検証が種別判定に使うため残すこと。
 * コンテナ併設ファイルでは createEnum の引数にも同じ定数名を追加する。
 *
 * 変更したら node util/enum/verify-enum-values.mjs を通すこと。
 */
import { createEnum } from "./createEnum.js";

// ---- 列挙定数 ----
export const ITEM_SP_NONE                                     = 0;
export const ITEM_SP_STR_PLUS                                 = 1;
export const ITEM_SP_AGI_PLUS                                 = 2;
export const ITEM_SP_VIT_PLUS                                 = 3;
export const ITEM_SP_INT_PLUS                                 = 4;
export const ITEM_SP_DEX_PLUS                                 = 5;
export const ITEM_SP_LUK_PLUS                                 = 6;
export const ITEM_SP_ALLSTATUS_PLUS                           = 7;
export const ITEM_SP_HIT_PLUS                                 = 8;
export const ITEM_SP_FLEE_PLUS                                = 9;
export const ITEM_SP_CRI_PLUS                                 = 10;
export const ITEM_SP_LUCKY_PLUS                               = 11;
export const ITEM_SP_ASPD_UP                                  = 12;
export const ITEM_SP_MAXHP_PLUS                               = 13;
export const ITEM_SP_MAXSP_PLUS                               = 14;
export const ITEM_SP_MAXHP_UP                                 = 15;
export const ITEM_SP_MAXSP_UP                                 = 16;
export const ITEM_SP_ATK_PLUS                                 = 17;
export const ITEM_SP_DEF_PLUS                                 = 18;
export const ITEM_SP_MDEF_PLUS                                = 19;
export const ITEM_SP_ELEMENTAL                                = 20;
export const ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW             = 21;
export const ITEM_SP_PENETRATE_DEF                            = 22;
export const ITEM_SP_KIRI_EFFECT                              = 23;
export const ITEM_SP_DEF_DIVIDE_PENARTY                       = 24;
export const ITEM_SP_LONGRANGE_DAMAGE_UP                      = 25;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS                  = 26;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL            = 27;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM           = 28;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE            = 29;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID            = 30;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD           = 31;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL           = 32;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT            = 33;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT           = 34;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH             = 35;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON            = 36;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN            = 37;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL            = 38;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON           = 39;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY    = 40;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER     = 41;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH     = 42;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE      = 43;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND      = 44;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON    = 45;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY      = 46;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK      = 47;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO     = 48;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD    = 49;
export const ITEM_SP_RESIST_RACE_SOLID                        = 50;
export const ITEM_SP_RESIST_RACE_UNDEAD                       = 51;
export const ITEM_SP_RESIST_RACE_ANIMAL                       = 52;
export const ITEM_SP_RESIST_RACE_PLANT                        = 53;
export const ITEM_SP_RESIST_RACE_INSECT                       = 54;
export const ITEM_SP_RESIST_RACE_FISH                         = 55;
export const ITEM_SP_RESIST_RACE_DEMON                        = 56;
export const ITEM_SP_RESIST_RACE_HUMAN                        = 57;
export const ITEM_SP_RESIST_RACE_ANGEL                        = 58;
export const ITEM_SP_RESIST_RACE_DRAGON                       = 59;
export const ITEM_SP_RESIST_ELM_VANITY                        = 60;
export const ITEM_SP_RESIST_ELM_WATER                         = 61;
export const ITEM_SP_RESIST_ELM_EARTH                         = 62;
export const ITEM_SP_RESIST_ELM_FIRE                          = 63;
export const ITEM_SP_RESIST_ELM_WIND                          = 64;
export const ITEM_SP_RESIST_ELM_POISON                        = 65;
export const ITEM_SP_RESIST_ELM_HOLY                          = 66;
export const ITEM_SP_RESIST_ELM_DARK                          = 67;
export const ITEM_SP_RESIST_ELM_PSYCO                         = 68;
export const ITEM_SP_RESIST_ELM_UNDEAD                        = 69;
export const ITEM_SP_CRITICAL_DAMAGE_UP                       = 70;
export const ITEM_SP_REFLECT_PHYSICAL_DAMAGE                  = 71;
export const ITEM_SP_LONGRANGE_CRI_PLUS                       = 72;
export const ITEM_SP_SKILL_CAST_TIME                          = 73;
export const ITEM_SP_SKILL_DELAY_DOWN                         = 74;
export const ITEM_SP_HPR_UP                                   = 75;
export const ITEM_SP_SPR_UP                                   = 76;
export const ITEM_SP_RESIST_BOSS                              = 77;
export const ITEM_SP_RESIST_LONGRANGE                         = 78;
export const ITEM_SP_RESIST_NOTBOSS                           = 79;
export const ITEM_SP_PHYSICAL_DAMAGE_UP                       = 80;
export const ITEM_SP_DAMAGE_UP_GROUP_GOBLIN                   = 81;
export const ITEM_SP_DAMAGE_UP_GROUP_COBOLD                   = 82;
export const ITEM_SP_DAMAGE_UP_GROUP_ORC                      = 83;
export const ITEM_SP_DAMAGE_UP_GROUP_GOLEM                    = 84;
export const ITEM_SP_WEAPON_ATK_UP                            = 85;
export const ITEM_SP_PERFECT_ATTACK_UP                        = 86;
export const ITEM_SP_ATK_UP                                   = 87;
export const ITEM_SP_MATK_PLUS_TYPE_WEAPON                    = 88;
export const ITEM_SP_MAGICAL_DAMAGE_UP                        = 89;
export const ITEM_SP_SET_DEFINITION                           = 90;
export const ITEM_SP_HEAL_UP_USING                            = 91;
export const ITEM_SP_HEAL_UP_USED                             = 92;
export const ITEM_SP_HEAL_DAMAGE_UP                           = 93;
export const ITEM_SP_HEAL_UP_USING_ONLY_HEAL                  = 94;
export const ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES           = 95;
export const ITEM_SP_MAGICAL_DAMAGE_UP_BOSS                   = 96;
export const ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL             = 97;
export const ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM            = 98;
export const ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE             = 99;
export const ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON                = 100;
export const ITEM_SP_ASPD_PLUS                                = 101;
export const ITEM_SP_COST_DOWN                                = 102;
export const ITEM_SP_EXP_UP_ALL                               = 103;
export const ITEM_SP_DEF_UP                                   = 104;
export const ITEM_SP_MDEF_UP                                  = 105;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER = 106;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER  = 107;
export const ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER             = 108;
export const ITEM_SP_SKILL_FIXED_MINUS                        = 109;
export const ITEM_SP_CRITICAL_UP_RACE_SOLID                   = 110;
export const ITEM_SP_CRITICAL_UP_RACE_UNDEAD                  = 111;
export const ITEM_SP_CRITICAL_UP_RACE_ANIMAL                  = 112;
export const ITEM_SP_CRITICAL_UP_RACE_PLANT                   = 113;
export const ITEM_SP_CRITICAL_UP_RACE_INSECT                  = 114;
export const ITEM_SP_CRITICAL_UP_RACE_FISH                    = 115;
export const ITEM_SP_CRITICAL_UP_RACE_DEMON                   = 116;
export const ITEM_SP_CRITICAL_UP_RACE_HUMAN                   = 117;
export const ITEM_SP_CRITICAL_UP_RACE_ANGEL                   = 118;
export const ITEM_SP_CRITICAL_UP_RACE_DRAGON                  = 119;
export const ITEM_SP_EXP_UP_RACE_SOLID                        = 120;
export const ITEM_SP_EXP_UP_RACE_UNDEAD                       = 121;
export const ITEM_SP_EXP_UP_RACE_ANIMAL                       = 122;
export const ITEM_SP_EXP_UP_RACE_PLANT                        = 123;
export const ITEM_SP_EXP_UP_RACE_INSECT                       = 124;
export const ITEM_SP_EXP_UP_RACE_FISH                         = 125;
export const ITEM_SP_EXP_UP_RACE_DEMON                        = 126;
export const ITEM_SP_EXP_UP_RACE_HUMAN                        = 127;
export const ITEM_SP_EXP_UP_RACE_ANGEL                        = 128;
export const ITEM_SP_EXP_UP_RACE_DRAGON                       = 129;
export const ITEM_SP_APPEND_STATE_POISON                      = 130;
export const ITEM_SP_APPEND_STATE_STUN                        = 131;
export const ITEM_SP_APPEND_STATE_FROZEN                      = 132;
export const ITEM_SP_APPEND_STATE_CURSED                      = 133;
export const ITEM_SP_APPEND_STATE_BLIND                       = 134;
export const ITEM_SP_APPEND_STATE_SLEEP                       = 135;
export const ITEM_SP_APPEND_STATE_SILENCE                     = 136;
export const ITEM_SP_APPEND_STATE_CONFUSE                     = 137;
export const ITEM_SP_APPEND_STATE_BLEEDING                    = 138;
export const ITEM_SP_APPEND_STATE_STONE                       = 139;
export const ITEM_SP_APPEND_STATE_BREAK_WEAPON                = 140;
export const ITEM_SP_APPEND_STATE_BREAK_HELM                  = 141;
export const ITEM_SP_APPEND_STATE_BREAK_ARMOR                 = 142;
export const ITEM_SP_APPEND_STATE_BREAK_SHIELD                = 143;
export const ITEM_SP_APPEND_STATE_BREAK_SHOULDER              = 144;
export const ITEM_SP_APPEND_STATE_BREAK_SHOES                 = 145;
export const ITEM_SP_APPEND_STATE_BREAK_ACCESSORY             = 146;
export const ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL               = 147;
export const ITEM_SP_PHYSICAL_RESIST_SIZE_MEDIUM              = 148;
export const ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE               = 149;
export const ITEM_SP_RESIST_STATE_POISON                      = 150;
export const ITEM_SP_RESIST_STATE_STUN                        = 151;
export const ITEM_SP_RESIST_STATE_FROZEN                      = 152;
export const ITEM_SP_RESIST_STATE_CURSED                      = 153;
export const ITEM_SP_RESIST_STATE_BLIND                       = 154;
export const ITEM_SP_RESIST_STATE_SLEEP                       = 155;
export const ITEM_SP_RESIST_STATE_SILENCE                     = 156;
export const ITEM_SP_RESIST_STATE_CONFUSE                     = 157;
export const ITEM_SP_RESIST_STATE_BLEEDING                    = 158;
export const ITEM_SP_RESIST_STATE_STONE                       = 159;
export const ITEM_SP_RESIST_STATE_BREAK_WEAPON                = 160;
export const ITEM_SP_RESIST_STATE_BREAK_HELM                  = 161;
export const ITEM_SP_RESIST_STATE_BREAK_ARMOR                 = 162;
export const ITEM_SP_RESIST_STATE_BREAK_SHIELD                = 163;
export const ITEM_SP_RESIST_STATE_BREAK_SHOULDER              = 164;
export const ITEM_SP_RESIST_STATE_BREAK_SHOES                 = 165;
export const ITEM_SP_RESIST_STATE_BREAK_ACCESSORY             = 166;
export const ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL             = 167;
export const ITEM_SP_RESERVED_168                             = 168;
export const ITEM_SP_RESERVED_169                             = 169;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID             = 170;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD            = 171;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL            = 172;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT             = 173;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT            = 174;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH              = 175;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON             = 176;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN             = 177;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL             = 178;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON            = 179;
export const ITEM_SP_PENETRATE_DEF_RACE_SOLID                 = 180;
export const ITEM_SP_PENETRATE_DEF_RACE_UNDEAD                = 181;
export const ITEM_SP_PENETRATE_DEF_RACE_ANIMAL                = 182;
export const ITEM_SP_PENETRATE_DEF_RACE_PLANT                 = 183;
export const ITEM_SP_PENETRATE_DEF_RACE_INSECT                = 184;
export const ITEM_SP_PENETRATE_DEF_RACE_FISH                  = 185;
export const ITEM_SP_PENETRATE_DEF_RACE_DEMON                 = 186;
export const ITEM_SP_PENETRATE_DEF_RACE_HUMAN                 = 187;
export const ITEM_SP_PENETRATE_DEF_RACE_ANGEL                 = 188;
export const ITEM_SP_PENETRATE_DEF_RACE_DRAGON                = 189;
export const ITEM_SP_RESIST_SIZE_SMALL                        = 190;
export const ITEM_SP_RESIST_SIZE_MEDIUM                       = 191;
export const ITEM_SP_RESIST_SIZE_LARGE                        = 192;
export const ITEM_SP_UNREFINABLE                              = 193;
export const ITEM_SP_UNBREAKABLE                              = 194;
export const ITEM_SP_STUFF2HAND                               = 195;
export const ITEM_SP_RESIST_MAGIC                             = 196;
export const ITEM_SP_SPECIAL_RANGE                            = 197;
export const ITEM_SP_BODY_ELEMENT                             = 198;
export const ITEM_SP_LEARNED_SKILL_EFFECT                     = 199;
export const ITEM_SP_RESERVED_200                             = 200;
export const ITEM_SP_STR_PLUS_PLANE                           = 201;
export const ITEM_SP_AGI_PLUS_PLANE                           = 202;
export const ITEM_SP_VIT_PLUS_PLANE                           = 203;
export const ITEM_SP_INT_PLUS_PLANE                           = 204;
export const ITEM_SP_DEX_PLUS_PLANE                           = 205;
export const ITEM_SP_LUK_PLUS_PLANE                           = 206;
export const ITEM_SP_RESERVED_207                             = 207;
export const ITEM_SP_RESERVED_208                             = 208;
export const ITEM_SP_RESERVED_209                             = 209;
export const ITEM_SP_SHORTRANGE_DAMAGE_UP                     = 210;
export const ITEM_SP_STR_PLUS_FOR_SET                         = 211;
export const ITEM_SP_AGI_PLUS_FOR_SET                         = 212;
export const ITEM_SP_VIT_PLUS_FOR_SET                         = 213;
export const ITEM_SP_INT_PLUS_FOR_SET                         = 214;
export const ITEM_SP_DEX_PLUS_FOR_SET                         = 215;
export const ITEM_SP_LUK_PLUS_FOR_SET                         = 216;
export const ITEM_SP_ALLSTATUS_PLUS_FOR_SET                   = 217;
export const ITEM_SP_INVALIDATE_ITEM_SP                       = 218;
export const ITEM_SP_INVALIDATE_CARD_SP                       = 219;
export const ITEM_SP_LEARN_SKILL                              = 220;
export const ITEM_SP_AUTO_SPELL                               = 221;
export const ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED            = 222;
export const ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED             = 223;
export const ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL                = 224;
export const ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL                 = 225;
export const ITEM_SP_USE_ENCHANT_ELM_CONF                     = 226;
export const ITEM_SP_NOT_IMPLEMENTED                          = 227;
export const ITEM_SP_SIZE_PERFECTION                          = 228;
export const ITEM_SP_ARMS_ELEMENT                             = 229;
export const ITEM_SP_POW_PLUS                                 = 230;
export const ITEM_SP_STA_PLUS                                 = 231;
export const ITEM_SP_WIS_PLUS                                 = 232;
export const ITEM_SP_SPL_PLUS                                 = 233;
export const ITEM_SP_CON_PLUS                                 = 234;
export const ITEM_SP_CRT_PLUS                                 = 235;
export const ITEM_SP_ALL_SPECS_PLUS                           = 236;
export const ITEM_SP_RESERVED_237                             = 237;
export const ITEM_SP_RESERVED_238                             = 238;
export const ITEM_SP_RESERVED_239                             = 239;
export const ITEM_SP_KOZYOSEN_TE_RENTAL_ITEM                  = 240;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL            = 241;
export const ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL             = 242;
export const ITEM_SP_RESIST_PLAYER_ALL                        = 243;
export const ITEM_SP_ATK_PLUS_GVGTE                           = 244;
export const ITEM_SP_MATK_PLUS_GVGTE                          = 245;
export const ITEM_SP_MAXHP_PLUS_GVGTE                         = 246;
export const ITEM_SP_MAXSP_PLUS_GVGTE                         = 247;
export const ITEM_SP_HEAL_UP_USING_GVGTE                      = 248;
export const ITEM_SP_RESIST_FROZEN_GVGTE                      = 249;
export const ITEM_SP_P_ATK_PLUS                               = 250;
export const ITEM_SP_S_MATK_PLUS                              = 251;
export const ITEM_SP_H_PLUS_PLUS                              = 252;
export const ITEM_SP_C_RATE_PLUS                              = 253;
export const ITEM_SP_RES_PLUS                                 = 254;
export const ITEM_SP_MRES_PLUS                                = 255;
export const ITEM_SP_RESERVED_256                             = 256;
export const ITEM_SP_RESERVED_257                             = 257;
export const ITEM_SP_RESERVED_258                             = 258;
export const ITEM_SP_RESERVED_259                             = 259;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_ALL              = 260;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL              = 261;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL       = 262;
export const ITEM_SP_RESIST_RACE_ALL                          = 263;
export const ITEM_SP_RESIST_ELM_ALL                           = 264;
export const ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL               = 265;
export const ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL               = 266;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS               = 267;
export const ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS                = 268;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL        = 269;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL                = 270;
export const ITEM_SP_RESIST_MONSTER_ELM_ALL                   = 271;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM          = 272;
export const ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM           = 273;
export const ITEM_SP_RESIST_PLAYER_DORAM                      = 274;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN          = 275;
export const ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN           = 276;
export const ITEM_SP_RESIST_PLAYER_HUMAN                      = 277;
export const ITEM_SP_RESERVED_278                             = 278;
export const ITEM_SP_RESERVED_279                             = 279;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY            = 280;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER             = 281;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH             = 282;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE              = 283;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND              = 284;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON            = 285;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY              = 286;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK              = 287;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO             = 288;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD            = 289;
export const ITEM_SP_IGNORE_DEF_ALL                           = 290;
export const ITEM_SP_IGNORE_DEF_NOTBOSS                       = 291;
export const ITEM_SP_IGNORE_DEF_BOSS                          = 292;
export const ITEM_SP_IGNORE_DEF_RACE_ALL                      = 293;
export const ITEM_SP_IGNORE_RES_RACE_ALL                      = 294;
export const ITEM_SP_IGNORE_MDEF_ALL                          = 295;
export const ITEM_SP_IGNORE_MDEF_NOTBOSS                      = 296;
export const ITEM_SP_IGNORE_MDEF_BOSS                         = 297;
export const ITEM_SP_IGNORE_MDEF_RACE_ALL                     = 298;
export const ITEM_SP_IGNORE_MRES_RACE_ALL                     = 299;
export const ITEM_SP_IGNORE_DEF_RACE_SOLID                    = 300;
export const ITEM_SP_IGNORE_DEF_RACE_UNDEAD                   = 301;
export const ITEM_SP_IGNORE_DEF_RACE_ANIMAL                   = 302;
export const ITEM_SP_IGNORE_DEF_RACE_PLANT                    = 303;
export const ITEM_SP_IGNORE_DEF_RACE_INSECT                   = 304;
export const ITEM_SP_IGNORE_DEF_RACE_FISH                     = 305;
export const ITEM_SP_IGNORE_DEF_RACE_DEMON                    = 306;
export const ITEM_SP_IGNORE_DEF_RACE_HUMAN                    = 307;
export const ITEM_SP_IGNORE_DEF_RACE_ANGEL                    = 308;
export const ITEM_SP_IGNORE_DEF_RACE_DRAGON                   = 309;
export const ITEM_SP_IGNORE_MDEF_RACE_SOLID                   = 310;
export const ITEM_SP_IGNORE_MDEF_RACE_UNDEAD                  = 311;
export const ITEM_SP_IGNORE_MDEF_RACE_ANIMAL                  = 312;
export const ITEM_SP_IGNORE_MDEF_RACE_PLANT                   = 313;
export const ITEM_SP_IGNORE_MDEF_RACE_INSECT                  = 314;
export const ITEM_SP_IGNORE_MDEF_RACE_FISH                    = 315;
export const ITEM_SP_IGNORE_MDEF_RACE_DEMON                   = 316;
export const ITEM_SP_IGNORE_MDEF_RACE_HUMAN                   = 317;
export const ITEM_SP_IGNORE_MDEF_RACE_ANGEL                   = 318;
export const ITEM_SP_IGNORE_MDEF_RACE_DRAGON                  = 319;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_SOLID            = 320;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_UNDEAD           = 321;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANIMAL           = 322;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_PLANT            = 323;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_INSECT           = 324;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_FISH             = 325;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DEMON            = 326;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_HUMAN            = 327;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANGEL            = 328;
export const ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DRAGON           = 329;
export const ITEM_SP_RESIST_MONSTER_ELM_VANITY                = 330;
export const ITEM_SP_RESIST_MONSTER_ELM_WATER                 = 331;
export const ITEM_SP_RESIST_MONSTER_ELM_EARTH                 = 332;
export const ITEM_SP_RESIST_MONSTER_ELM_FIRE                  = 333;
export const ITEM_SP_RESIST_MONSTER_ELM_WIND                  = 334;
export const ITEM_SP_RESIST_MONSTER_ELM_POISON                = 335;
export const ITEM_SP_RESIST_MONSTER_ELM_HOLY                  = 336;
export const ITEM_SP_RESIST_MONSTER_ELM_DARK                  = 337;
export const ITEM_SP_RESIST_MONSTER_ELM_PSYCO                 = 338;
export const ITEM_SP_RESIST_MONSTER_ELM_UNDEAD                = 339;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY             = 340;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER              = 341;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH              = 342;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE               = 343;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND               = 344;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON             = 345;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY               = 346;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK               = 347;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO              = 348;
export const ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD             = 349;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY     = 350;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER      = 351;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH      = 352;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE       = 353;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND       = 354;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON     = 355;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY       = 356;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK       = 357;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO      = 358;
export const ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD     = 359;
export const ITEM_SP_RESIST_STATE_R_CHILLED                   = 360;
export const ITEM_SP_RESIST_STATE_R_ICED                      = 361;
export const ITEM_SP_RESIST_STATE_R_IGNITION                  = 362;
export const ITEM_SP_RESIST_STATE_R_FEAR                      = 363;
export const ITEM_SP_RESIST_STATE_R_DEEPSLEEP                 = 364;
export const ITEM_SP_RESIST_STATE_R_CHARMED                   = 365;
export const ITEM_SP_RESIST_STATE_R_FRENZY                    = 366;
export const ITEM_SP_RESIST_STATE_R_RESERVED_367              = 367;
export const ITEM_SP_RESIST_STATE_R_RESERVED_368              = 368;
export const ITEM_SP_RESIST_STATE_R_RESERVED_369              = 369;
export const ITEM_SP_RESIST_STATE_NEW_LETHARGY                = 370;
export const ITEM_SP_RESIST_STATE_NEW_JETBLACK                = 371;
export const ITEM_SP_RESIST_STATE_NEW_HIGHLYPOISONOUS         = 372;
export const ITEM_SP_RESIST_STATE_NEW_TORRENT                 = 373;
export const ITEM_SP_RESIST_STATE_NEW_MELANCHOLY              = 374;
export const ITEM_SP_RESIST_STATE_NEW_STILLNESS               = 375;
export const ITEM_SP_RESIST_STATE_NEW_CONFLAGRATION           = 376;
export const ITEM_SP_RESIST_STATE_NEW_RAPIDCOOLING            = 377;
export const ITEM_SP_RESIST_STATE_NEW_CRYSTALLIZATION         = 378;
export const ITEM_SP_RESIST_STATE_NEW_UNHAPPINESS             = 379;
export const ITEM_SP_NEVER_CAST_CANCEL                        = 380;
export const ITEM_SP_NEVER_KNOCK_BACK                         = 381;

// ---- 疑似定数（旧 DefinePseudoEnum） ----
export const ITEM_SP_DMY                                      = -1;
export const ITEM_SP_END                                      = 0;
export const ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET        = 1000;
export const ITEM_SP_SKILL_DAMAGE_OFFSET                      = 5000;
export const ITEM_SP_SKILL_CAST_TIME_OFFSET                   = 7000;
export const ITEM_SP_SKILL_CAST_MINUS_OFFSET                  = 9000;
export const ITEM_SP_SKILL_FIXED_TIME_OFFSET                  = 11000;
export const ITEM_SP_SKILL_FIXED_MINUS_OFFSET                 = 13000;
export const ITEM_SP_RESERVED_15000                           = 15000;
export const ITEM_SP_RESERVED_17000                           = 17000;
export const ITEM_SP_SKILL_COOL_MINUS_OFFSET                  = 19000;
export const ITEM_SP_SKILL_COST_SCALING_OFFSET                = 21000;
export const ITEM_SP_SKILL_COST_MINUS_OFFSET                  = 23000;
export const ITEM_SP_REFINE_BY_1_OFFSET                       = 100000;
export const ITEM_SP_REFINE_BY_2_OFFSET                       = 200000;
export const ITEM_SP_REFINE_BY_3_OFFSET                       = 300000;
export const ITEM_SP_REFINE_BY_4_OFFSET                       = 400000;
export const ITEM_SP_REFINE_BY_5_OFFSET                       = 500000;
export const ITEM_SP_REFINE_BY_6_OFFSET                       = 600000;
export const ITEM_SP_REFINE_BY_7_OFFSET                       = 700000;
export const ITEM_SP_REFINE_BY_8_OFFSET                       = 800000;
export const ITEM_SP_REFINE_BY_9_OFFSET                       = 900000;
export const ITEM_SP_REFINE_OVER_1_OFFSET                     = 1000000;
export const ITEM_SP_REFINE_OVER_2_OFFSET                     = 2000000;
export const ITEM_SP_REFINE_OVER_3_OFFSET                     = 3000000;
export const ITEM_SP_REFINE_OVER_4_OFFSET                     = 4000000;
export const ITEM_SP_REFINE_OVER_5_OFFSET                     = 5000000;
export const ITEM_SP_REFINE_OVER_6_OFFSET                     = 6000000;
export const ITEM_SP_REFINE_OVER_7_OFFSET                     = 7000000;
export const ITEM_SP_REFINE_OVER_8_OFFSET                     = 8000000;
export const ITEM_SP_REFINE_OVER_9_OFFSET                     = 9000000;
export const ITEM_SP_REFINE_OVER_10_OFFSET                    = 10000000;
export const ITEM_SP_PURE_STR_BY_10_OFFSET                    = 100000000;
export const ITEM_SP_PURE_AGI_BY_10_OFFSET                    = 200000000;
export const ITEM_SP_PURE_VIT_BY_10_OFFSET                    = 300000000;
export const ITEM_SP_PURE_INT_BY_10_OFFSET                    = 400000000;
export const ITEM_SP_PURE_DEX_BY_10_OFFSET                    = 500000000;
export const ITEM_SP_PURE_LUK_BY_10_OFFSET                    = 600000000;
export const ITEM_SP_PURE_DEX_BY_1_OFFSET                     = 700000000;
export const ITEM_SP_PURE_VIT_BY_1_OFFSET                     = 800000000;
export const ITEM_SP_PURE_STR_90_OFFSET                       = 1000000000;
export const ITEM_SP_PURE_AGI_90_OFFSET                       = 2000000000;
export const ITEM_SP_PURE_VIT_90_OFFSET                       = 3000000000;
export const ITEM_SP_PURE_INT_90_OFFSET                       = 4000000000;
export const ITEM_SP_PURE_DEX_90_OFFSET                       = 5000000000;
export const ITEM_SP_PURE_LUK_90_OFFSET                       = 6000000000;
export const ITEM_SP_PURE_STR_108_OFFSET                      = 7000000000;
export const ITEM_SP_PURE_AGI_108_OFFSET                      = 8000000000;
export const ITEM_SP_PURE_VIT_108_OFFSET                      = 9000000000;
export const ITEM_SP_PURE_INT_108_OFFSET                      = 10000000000;
export const ITEM_SP_PURE_DEX_108_OFFSET                      = 11000000000;
export const ITEM_SP_PURE_LUK_108_OFFSET                      = 12000000000;
export const ITEM_SP_PURE_STR_120_OFFSET                      = 13000000000;
export const ITEM_SP_PURE_AGI_120_OFFSET                      = 14000000000;
export const ITEM_SP_PURE_VIT_120_OFFSET                      = 15000000000;
export const ITEM_SP_PURE_INT_120_OFFSET                      = 16000000000;
export const ITEM_SP_PURE_DEX_120_OFFSET                      = 17000000000;
export const ITEM_SP_PURE_LUK_120_OFFSET                      = 18000000000;
export const ITEM_SP_PURE_STR_125_OFFSET                      = 19000000000;
export const ITEM_SP_PURE_AGI_125_OFFSET                      = 20000000000;
export const ITEM_SP_PURE_VIT_125_OFFSET                      = 21000000000;
export const ITEM_SP_PURE_INT_125_OFFSET                      = 22000000000;
export const ITEM_SP_PURE_DEX_125_OFFSET                      = 23000000000;
export const ITEM_SP_PURE_LUK_125_OFFSET                      = 24000000000;
export const ITEM_SP_PURE_STR_110_OFFSET                      = 25000000000;
export const ITEM_SP_PURE_AGI_110_OFFSET                      = 26000000000;
export const ITEM_SP_PURE_VIT_110_OFFSET                      = 27000000000;
export const ITEM_SP_PURE_INT_110_OFFSET                      = 28000000000;
export const ITEM_SP_PURE_DEX_110_OFFSET                      = 29000000000;
export const ITEM_SP_PURE_LUK_110_OFFSET                      = 30000000000;
export const ITEM_SP_PURE_STR_80_OFFSET                       = 31000000000;
export const ITEM_SP_PURE_AGI_80_OFFSET                       = 32000000000;
export const ITEM_SP_PURE_VIT_80_OFFSET                       = 33000000000;
export const ITEM_SP_PURE_INT_80_OFFSET                       = 34000000000;
export const ITEM_SP_PURE_DEX_80_OFFSET                       = 35000000000;
export const ITEM_SP_PURE_LUK_80_OFFSET                       = 36000000000;
export const ITEM_SP_PURE_STR_130_OFFSET                      = 37000000000;
export const ITEM_SP_PURE_AGI_130_OFFSET                      = 38000000000;
export const ITEM_SP_PURE_VIT_130_OFFSET                      = 39000000000;
export const ITEM_SP_PURE_INT_130_OFFSET                      = 40000000000;
export const ITEM_SP_PURE_DEX_130_OFFSET                      = 41000000000;
export const ITEM_SP_PURE_LUK_130_OFFSET                      = 42000000000;
export const ITEM_SP_PURE_POW_100_OFFSET                      = 43000000000;
export const ITEM_SP_PURE_STA_100_OFFSET                      = 44000000000;
export const ITEM_SP_PURE_WIS_100_OFFSET                      = 45000000000;
export const ITEM_SP_PURE_SPL_100_OFFSET                      = 46000000000;
export const ITEM_SP_PURE_CON_100_OFFSET                      = 47000000000;
export const ITEM_SP_PURE_CRT_100_OFFSET                      = 48000000000;
export const ITEM_SP_PURE_STR_100_OFFSET                      = 49000000000;
export const ITEM_SP_PURE_AGI_100_OFFSET                      = 50000000000;
export const ITEM_SP_PURE_VIT_100_OFFSET                      = 51000000000;
export const ITEM_SP_PURE_INT_100_OFFSET                      = 52000000000;
export const ITEM_SP_PURE_DEX_100_OFFSET                      = 53000000000;
export const ITEM_SP_PURE_LUK_100_OFFSET                      = 54000000000;
export const ITEM_SP_PURE_POW_50_OFFSET                       = 55000000000;
export const ITEM_SP_PURE_STA_50_OFFSET                       = 56000000000;
export const ITEM_SP_PURE_WIS_50_OFFSET                       = 57000000000;
export const ITEM_SP_PURE_SPL_50_OFFSET                       = 58000000000;
export const ITEM_SP_PURE_CON_50_OFFSET                       = 59000000000;
export const ITEM_SP_PURE_CRT_50_OFFSET                       = 60000000000;
export const ITEM_SP_PURE_POW_110_OFFSET                      = 61000000000;
export const ITEM_SP_PURE_STA_110_OFFSET                      = 62000000000;
export const ITEM_SP_PURE_WIS_110_OFFSET                      = 63000000000;
export const ITEM_SP_PURE_SPL_110_OFFSET                      = 64000000000;
export const ITEM_SP_PURE_CON_110_OFFSET                      = 65000000000;
export const ITEM_SP_PURE_CRT_110_OFFSET                      = 66000000000;
export const ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET               = 100000000000;
export const ITEM_SP_JOB_RESTRICT_MONK_OFFSET                 = 1600000000000;
export const ITEM_SP_JOB_RESTRICT_RUNE_KNIGHT_OFFSET          = 4700000000000;
export const ITEM_SP_JOB_RESTRICT_GUILLOTINE_CROSS_OFFSET     = 4800000000000;
export const ITEM_SP_JOB_RESTRICT_ARCBISHOP_OFFSET            = 4900000000000;
export const ITEM_SP_JOB_RESTRICT_RANGER_OFFSET               = 5000000000000;
export const ITEM_SP_JOB_RESTRICT_WARLOCK_OFFSET              = 5100000000000;
export const ITEM_SP_JOB_RESTRICT_MECHANIC_OFFSET             = 5200000000000;
export const ITEM_SP_JOB_RESTRICT_ROYALGUARD_OFFSET           = 5300000000000;
export const ITEM_SP_JOB_RESTRICT_SHADOWCHASER_OFFSET         = 5400000000000;
export const ITEM_SP_JOB_RESTRICT_SHURA_OFFSET                = 5500000000000;
export const ITEM_SP_JOB_RESTRICT_MINSTREL_OFFSET             = 5600000000000;
export const ITEM_SP_JOB_RESTRICT_WANDERER_OFFSET             = 5700000000000;
export const ITEM_SP_JOB_RESTRICT_SORCERER_OFFSET             = 5800000000000;
export const ITEM_SP_JOB_RESTRICT_GENETIC_OFFSET              = 5900000000000;
export const ITEM_SP_JOB_RESTRICT_KAGERO                      = 6000000000000;
export const ITEM_SP_JOB_RESTRICT_OBORO                       = 6100000000000;
export const ITEM_SP_JOB_RESTRICT_SUPERNOVICE_PLUS            = 6200000000000;
export const ITEM_SP_JOB_RESTRICT_REBELLION                   = 6300000000000;
export const ITEM_SP_JOB_RESTRICT_SUMMONER                    = 6400000000000;
export const ITEM_SP_JOB_RESTRICT_STAR_EMPEROR_OFFSET         = 6500000000000;
export const ITEM_SP_JOB_RESTRICT_SOUL_REAPER_OFFSET          = 6600000000000;
export const ITEM_SP_BASE_LV_BY_1_OFFSET                      = 10000000000000;
export const ITEM_SP_BASE_LV_BY_2_OFFSET                      = 20000000000000;
export const ITEM_SP_BASE_LV_BY_3_OFFSET                      = 30000000000000;
export const ITEM_SP_BASE_LV_BY_4_OFFSET                      = 40000000000000;
export const ITEM_SP_BASE_LV_BY_5_OFFSET                      = 50000000000000;
export const ITEM_SP_BASE_LV_BY_6_OFFSET                      = 60000000000000;
export const ITEM_SP_BASE_LV_BY_7_OFFSET                      = 70000000000000;
export const ITEM_SP_BASE_LV_BY_8_OFFSET                      = 80000000000000;
export const ITEM_SP_BASE_LV_BY_9_OFFSET                      = 90000000000000;
export const ITEM_SP_BASE_LV_BY_10_OFFSET                     = 100000000000000;
export const ITEM_SP_BASE_LV_BY_20_OFFSET                     = 200000000000000;
export const ITEM_SP_BASE_LV_BY_99_OFFSET                     = 990000000000000;
export const ITEM_SP_BASE_LV_OVER_170_OFFSET                  = 1000000000000000;
export const ITEM_SP_BASE_LV_OVER_100_OFFSET                  = 2000000000000000;
export const ITEM_SP_BASE_LV_UNDER_99_OFFSET                  = 3000000000000000;
export const ITEM_SP_BASE_LV_OVER_175_OFFSET                  = 4000000000000000;
export const ITEM_SP_BASE_LV_OVER_250_OFFSET                  = 5000000000000000;
export const ITEM_SP_BASE_LV_OVER_260_OFFSET                  = 6000000000000000;
export const ITEM_SP_BASE_LV_OVER_165_OFFSET                  = 7000000000000000;
export const ITEM_SP_PET_FRIENDLY_OVER_HIGH                   = 8000000000000000;
export const ITEM_SP_PET_FRIENDLY_OVER_HIGHEST                = 9000000000000000;
export const ITEM_SP_TRANSCENDENCE_1                          = 10000000000000000n;
export const ITEM_SP_TRANSCENDENCE_2                          = 20000000000000000n;
export const ITEM_SP_TRANSCENDENCE_3                          = 30000000000000000n;
export const ITEM_SP_TRANSCENDENCE_4                          = 40000000000000000n;
export const ITEM_SP_EQUIPMENT_LOCATION_BODY                  = 100000000000000000n;
export const ITEM_SP_EQUIPMENT_LOCATION_SHOULDER              = 200000000000000000n;
export const ITEM_SP_EQUIPMENT_LOCATION_SHOES                 = 300000000000000000n;
export const ITEM_SP_EQUIPMENT_LOCATION_ACCESSORY             = 400000000000000000n;
export const ITEM_SP_EQUIPMENT_LOCATION_HEAD_MID              = 500000000000000000n;
export const ITEM_SP_PURE_STR_BY_30_OFFSET                    = 1000000000000000000n;
export const ITEM_SP_PURE_AGI_BY_30_OFFSET                    = 2000000000000000000n;
export const ITEM_SP_PURE_VIT_BY_30_OFFSET                    = 3000000000000000000n;
export const ITEM_SP_PURE_INT_BY_30_OFFSET                    = 4000000000000000000n;
export const ITEM_SP_PURE_DEX_BY_30_OFFSET                    = 5000000000000000000n;
export const ITEM_SP_PURE_LUK_BY_30_OFFSET                    = 6000000000000000000n;

/** 列挙型コンテナ（Count / For / GetDefinedName / GetDefinedValue）。 */
export const EnumItemSpId = createEnum('EnumItemSpId', {
    ITEM_SP_NONE,
    ITEM_SP_STR_PLUS,
    ITEM_SP_AGI_PLUS,
    ITEM_SP_VIT_PLUS,
    ITEM_SP_INT_PLUS,
    ITEM_SP_DEX_PLUS,
    ITEM_SP_LUK_PLUS,
    ITEM_SP_ALLSTATUS_PLUS,
    ITEM_SP_HIT_PLUS,
    ITEM_SP_FLEE_PLUS,
    ITEM_SP_CRI_PLUS,
    ITEM_SP_LUCKY_PLUS,
    ITEM_SP_ASPD_UP,
    ITEM_SP_MAXHP_PLUS,
    ITEM_SP_MAXSP_PLUS,
    ITEM_SP_MAXHP_UP,
    ITEM_SP_MAXSP_UP,
    ITEM_SP_ATK_PLUS,
    ITEM_SP_DEF_PLUS,
    ITEM_SP_MDEF_PLUS,
    ITEM_SP_ELEMENTAL,
    ITEM_SP_LONGRANGE_DAMAGE_UP_ONLY_BOW,
    ITEM_SP_PENETRATE_DEF,
    ITEM_SP_KIRI_EFFECT,
    ITEM_SP_DEF_DIVIDE_PENARTY,
    ITEM_SP_LONGRANGE_DAMAGE_UP,
    ITEM_SP_PHYSICAL_DAMAGE_UP_BOSS,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_SMALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_MEDIUM,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_SOLID,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_UNDEAD,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANIMAL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_PLANT,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_INSECT,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_FISH,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DEMON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ANGEL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_DRAGON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WATER,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_WIND,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_POISON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_HOLY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_DARK,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_PSYCO,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD,
    ITEM_SP_RESIST_RACE_SOLID,
    ITEM_SP_RESIST_RACE_UNDEAD,
    ITEM_SP_RESIST_RACE_ANIMAL,
    ITEM_SP_RESIST_RACE_PLANT,
    ITEM_SP_RESIST_RACE_INSECT,
    ITEM_SP_RESIST_RACE_FISH,
    ITEM_SP_RESIST_RACE_DEMON,
    ITEM_SP_RESIST_RACE_HUMAN,
    ITEM_SP_RESIST_RACE_ANGEL,
    ITEM_SP_RESIST_RACE_DRAGON,
    ITEM_SP_RESIST_ELM_VANITY,
    ITEM_SP_RESIST_ELM_WATER,
    ITEM_SP_RESIST_ELM_EARTH,
    ITEM_SP_RESIST_ELM_FIRE,
    ITEM_SP_RESIST_ELM_WIND,
    ITEM_SP_RESIST_ELM_POISON,
    ITEM_SP_RESIST_ELM_HOLY,
    ITEM_SP_RESIST_ELM_DARK,
    ITEM_SP_RESIST_ELM_PSYCO,
    ITEM_SP_RESIST_ELM_UNDEAD,
    ITEM_SP_CRITICAL_DAMAGE_UP,
    ITEM_SP_REFLECT_PHYSICAL_DAMAGE,
    ITEM_SP_LONGRANGE_CRI_PLUS,
    ITEM_SP_SKILL_CAST_TIME,
    ITEM_SP_SKILL_DELAY_DOWN,
    ITEM_SP_HPR_UP,
    ITEM_SP_SPR_UP,
    ITEM_SP_RESIST_BOSS,
    ITEM_SP_RESIST_LONGRANGE,
    ITEM_SP_RESIST_NOTBOSS,
    ITEM_SP_PHYSICAL_DAMAGE_UP,
    ITEM_SP_DAMAGE_UP_GROUP_GOBLIN,
    ITEM_SP_DAMAGE_UP_GROUP_COBOLD,
    ITEM_SP_DAMAGE_UP_GROUP_ORC,
    ITEM_SP_DAMAGE_UP_GROUP_GOLEM,
    ITEM_SP_WEAPON_ATK_UP,
    ITEM_SP_PERFECT_ATTACK_UP,
    ITEM_SP_ATK_UP,
    ITEM_SP_MATK_PLUS_TYPE_WEAPON,
    ITEM_SP_MAGICAL_DAMAGE_UP,
    ITEM_SP_SET_DEFINITION,
    ITEM_SP_HEAL_UP_USING,
    ITEM_SP_HEAL_UP_USED,
    ITEM_SP_HEAL_DAMAGE_UP,
    ITEM_SP_HEAL_UP_USING_ONLY_HEAL,
    ITEM_SP_HEAL_UP_USING_ONLY_HEAL_SERIES,
    ITEM_SP_MAGICAL_DAMAGE_UP_BOSS,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_SMALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_MEDIUM,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_LARGE,
    ITEM_SP_MATK_PLUS_TYPE_NOT_WEAPON,
    ITEM_SP_ASPD_PLUS,
    ITEM_SP_COST_DOWN,
    ITEM_SP_EXP_UP_ALL,
    ITEM_SP_DEF_UP,
    ITEM_SP_MDEF_UP,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_RESIST_RACE_HUMAN_NOT_PLAYER,
    ITEM_SP_SKILL_FIXED_MINUS,
    ITEM_SP_CRITICAL_UP_RACE_SOLID,
    ITEM_SP_CRITICAL_UP_RACE_UNDEAD,
    ITEM_SP_CRITICAL_UP_RACE_ANIMAL,
    ITEM_SP_CRITICAL_UP_RACE_PLANT,
    ITEM_SP_CRITICAL_UP_RACE_INSECT,
    ITEM_SP_CRITICAL_UP_RACE_FISH,
    ITEM_SP_CRITICAL_UP_RACE_DEMON,
    ITEM_SP_CRITICAL_UP_RACE_HUMAN,
    ITEM_SP_CRITICAL_UP_RACE_ANGEL,
    ITEM_SP_CRITICAL_UP_RACE_DRAGON,
    ITEM_SP_EXP_UP_RACE_SOLID,
    ITEM_SP_EXP_UP_RACE_UNDEAD,
    ITEM_SP_EXP_UP_RACE_ANIMAL,
    ITEM_SP_EXP_UP_RACE_PLANT,
    ITEM_SP_EXP_UP_RACE_INSECT,
    ITEM_SP_EXP_UP_RACE_FISH,
    ITEM_SP_EXP_UP_RACE_DEMON,
    ITEM_SP_EXP_UP_RACE_HUMAN,
    ITEM_SP_EXP_UP_RACE_ANGEL,
    ITEM_SP_EXP_UP_RACE_DRAGON,
    ITEM_SP_APPEND_STATE_POISON,
    ITEM_SP_APPEND_STATE_STUN,
    ITEM_SP_APPEND_STATE_FROZEN,
    ITEM_SP_APPEND_STATE_CURSED,
    ITEM_SP_APPEND_STATE_BLIND,
    ITEM_SP_APPEND_STATE_SLEEP,
    ITEM_SP_APPEND_STATE_SILENCE,
    ITEM_SP_APPEND_STATE_CONFUSE,
    ITEM_SP_APPEND_STATE_BLEEDING,
    ITEM_SP_APPEND_STATE_STONE,
    ITEM_SP_APPEND_STATE_BREAK_WEAPON,
    ITEM_SP_APPEND_STATE_BREAK_HELM,
    ITEM_SP_APPEND_STATE_BREAK_ARMOR,
    ITEM_SP_APPEND_STATE_BREAK_SHIELD,
    ITEM_SP_APPEND_STATE_BREAK_SHOULDER,
    ITEM_SP_APPEND_STATE_BREAK_SHOES,
    ITEM_SP_APPEND_STATE_BREAK_ACCESSORY,
    ITEM_SP_PHYSICAL_RESIST_SIZE_SMALL,
    ITEM_SP_PHYSICAL_RESIST_SIZE_MEDIUM,
    ITEM_SP_PHYSICAL_RESIST_SIZE_LARGE,
    ITEM_SP_RESIST_STATE_POISON,
    ITEM_SP_RESIST_STATE_STUN,
    ITEM_SP_RESIST_STATE_FROZEN,
    ITEM_SP_RESIST_STATE_CURSED,
    ITEM_SP_RESIST_STATE_BLIND,
    ITEM_SP_RESIST_STATE_SLEEP,
    ITEM_SP_RESIST_STATE_SILENCE,
    ITEM_SP_RESIST_STATE_CONFUSE,
    ITEM_SP_RESIST_STATE_BLEEDING,
    ITEM_SP_RESIST_STATE_STONE,
    ITEM_SP_RESIST_STATE_BREAK_WEAPON,
    ITEM_SP_RESIST_STATE_BREAK_HELM,
    ITEM_SP_RESIST_STATE_BREAK_ARMOR,
    ITEM_SP_RESIST_STATE_BREAK_SHIELD,
    ITEM_SP_RESIST_STATE_BREAK_SHOULDER,
    ITEM_SP_RESIST_STATE_BREAK_SHOES,
    ITEM_SP_RESIST_STATE_BREAK_ACCESSORY,
    ITEM_SP_DAMAGE_UP_EXCLUDING_CRITICAL,
    ITEM_SP_RESERVED_168,
    ITEM_SP_RESERVED_169,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_SOLID,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_UNDEAD,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANIMAL,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_PLANT,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_INSECT,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_FISH,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DEMON,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ANGEL,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_DRAGON,
    ITEM_SP_PENETRATE_DEF_RACE_SOLID,
    ITEM_SP_PENETRATE_DEF_RACE_UNDEAD,
    ITEM_SP_PENETRATE_DEF_RACE_ANIMAL,
    ITEM_SP_PENETRATE_DEF_RACE_PLANT,
    ITEM_SP_PENETRATE_DEF_RACE_INSECT,
    ITEM_SP_PENETRATE_DEF_RACE_FISH,
    ITEM_SP_PENETRATE_DEF_RACE_DEMON,
    ITEM_SP_PENETRATE_DEF_RACE_HUMAN,
    ITEM_SP_PENETRATE_DEF_RACE_ANGEL,
    ITEM_SP_PENETRATE_DEF_RACE_DRAGON,
    ITEM_SP_RESIST_SIZE_SMALL,
    ITEM_SP_RESIST_SIZE_MEDIUM,
    ITEM_SP_RESIST_SIZE_LARGE,
    ITEM_SP_UNREFINABLE,
    ITEM_SP_UNBREAKABLE,
    ITEM_SP_STUFF2HAND,
    ITEM_SP_RESIST_MAGIC,
    ITEM_SP_SPECIAL_RANGE,
    ITEM_SP_BODY_ELEMENT,
    ITEM_SP_LEARNED_SKILL_EFFECT,
    ITEM_SP_RESERVED_200,
    ITEM_SP_STR_PLUS_PLANE,
    ITEM_SP_AGI_PLUS_PLANE,
    ITEM_SP_VIT_PLUS_PLANE,
    ITEM_SP_INT_PLUS_PLANE,
    ITEM_SP_DEX_PLUS_PLANE,
    ITEM_SP_LUK_PLUS_PLANE,
    ITEM_SP_RESERVED_207,
    ITEM_SP_RESERVED_208,
    ITEM_SP_RESERVED_209,
    ITEM_SP_SHORTRANGE_DAMAGE_UP,
    ITEM_SP_STR_PLUS_FOR_SET,
    ITEM_SP_AGI_PLUS_FOR_SET,
    ITEM_SP_VIT_PLUS_FOR_SET,
    ITEM_SP_INT_PLUS_FOR_SET,
    ITEM_SP_DEX_PLUS_FOR_SET,
    ITEM_SP_LUK_PLUS_FOR_SET,
    ITEM_SP_ALLSTATUS_PLUS_FOR_SET,
    ITEM_SP_INVALIDATE_ITEM_SP,
    ITEM_SP_INVALIDATE_CARD_SP,
    ITEM_SP_LEARN_SKILL,
    ITEM_SP_AUTO_SPELL,
    ITEM_SP_LEARN_SKILL_LEVEL_UNSPECIFIED,
    ITEM_SP_AUTO_SPELL_LEVEL_UNSPECIFIED,
    ITEM_SP_LEARN_SKILL_HIDDEN_DETAIL,
    ITEM_SP_AUTO_SPELL_HIDDEN_DETAIL,
    ITEM_SP_USE_ENCHANT_ELM_CONF,
    ITEM_SP_NOT_IMPLEMENTED,
    ITEM_SP_SIZE_PERFECTION,
    ITEM_SP_ARMS_ELEMENT,
    ITEM_SP_POW_PLUS,
    ITEM_SP_STA_PLUS,
    ITEM_SP_WIS_PLUS,
    ITEM_SP_SPL_PLUS,
    ITEM_SP_CON_PLUS,
    ITEM_SP_CRT_PLUS,
    ITEM_SP_ALL_SPECS_PLUS,
    ITEM_SP_RESERVED_237,
    ITEM_SP_RESERVED_238,
    ITEM_SP_RESERVED_239,
    ITEM_SP_KOZYOSEN_TE_RENTAL_ITEM,
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_ALL,
    ITEM_SP_RESIST_PLAYER_ALL,
    ITEM_SP_ATK_PLUS_GVGTE,
    ITEM_SP_MATK_PLUS_GVGTE,
    ITEM_SP_MAXHP_PLUS_GVGTE,
    ITEM_SP_MAXSP_PLUS_GVGTE,
    ITEM_SP_HEAL_UP_USING_GVGTE,
    ITEM_SP_RESIST_FROZEN_GVGTE,
    ITEM_SP_P_ATK_PLUS,
    ITEM_SP_S_MATK_PLUS,
    ITEM_SP_H_PLUS_PLUS,
    ITEM_SP_C_RATE_PLUS,
    ITEM_SP_RES_PLUS,
    ITEM_SP_MRES_PLUS,
    ITEM_SP_RESERVED_256,
    ITEM_SP_RESERVED_257,
    ITEM_SP_RESERVED_258,
    ITEM_SP_RESERVED_259,
    ITEM_SP_PHYSICAL_DAMAGE_UP_SIZE_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_RACE_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_ELM_ALL,
    ITEM_SP_RESIST_RACE_ALL,
    ITEM_SP_RESIST_ELM_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_SIZE_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_RACE_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_NOTBOSS,
    ITEM_SP_MAGICAL_DAMAGE_UP_NOTBOSS,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_ALL,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_ALL,
    ITEM_SP_RESIST_MONSTER_ELM_ALL,
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_DORAM,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_DORAM,
    ITEM_SP_RESIST_PLAYER_DORAM,
    ITEM_SP_PHYSICAL_DAMAGE_UP_PLAYER_HUMAN,
    ITEM_SP_MAGICAL_DAMAGE_UP_PLAYER_HUMAN,
    ITEM_SP_RESIST_PLAYER_HUMAN,
    ITEM_SP_RESERVED_278,
    ITEM_SP_RESERVED_279,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_VANITY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WATER,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_EARTH,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_FIRE,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_WIND,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_POISON,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_HOLY,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_DARK,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_PSYCO,
    ITEM_SP_PHYSICAL_DAMAGE_UP_ELM_UNDEAD,
    ITEM_SP_IGNORE_DEF_ALL,
    ITEM_SP_IGNORE_DEF_NOTBOSS,
    ITEM_SP_IGNORE_DEF_BOSS,
    ITEM_SP_IGNORE_DEF_RACE_ALL,
    ITEM_SP_IGNORE_RES_RACE_ALL,
    ITEM_SP_IGNORE_MDEF_ALL,
    ITEM_SP_IGNORE_MDEF_NOTBOSS,
    ITEM_SP_IGNORE_MDEF_BOSS,
    ITEM_SP_IGNORE_MDEF_RACE_ALL,
    ITEM_SP_IGNORE_MRES_RACE_ALL,
    ITEM_SP_IGNORE_DEF_RACE_SOLID,
    ITEM_SP_IGNORE_DEF_RACE_UNDEAD,
    ITEM_SP_IGNORE_DEF_RACE_ANIMAL,
    ITEM_SP_IGNORE_DEF_RACE_PLANT,
    ITEM_SP_IGNORE_DEF_RACE_INSECT,
    ITEM_SP_IGNORE_DEF_RACE_FISH,
    ITEM_SP_IGNORE_DEF_RACE_DEMON,
    ITEM_SP_IGNORE_DEF_RACE_HUMAN,
    ITEM_SP_IGNORE_DEF_RACE_ANGEL,
    ITEM_SP_IGNORE_DEF_RACE_DRAGON,
    ITEM_SP_IGNORE_MDEF_RACE_SOLID,
    ITEM_SP_IGNORE_MDEF_RACE_UNDEAD,
    ITEM_SP_IGNORE_MDEF_RACE_ANIMAL,
    ITEM_SP_IGNORE_MDEF_RACE_PLANT,
    ITEM_SP_IGNORE_MDEF_RACE_INSECT,
    ITEM_SP_IGNORE_MDEF_RACE_FISH,
    ITEM_SP_IGNORE_MDEF_RACE_DEMON,
    ITEM_SP_IGNORE_MDEF_RACE_HUMAN,
    ITEM_SP_IGNORE_MDEF_RACE_ANGEL,
    ITEM_SP_IGNORE_MDEF_RACE_DRAGON,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_SOLID,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_UNDEAD,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANIMAL,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_PLANT,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_INSECT,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_FISH,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DEMON,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_HUMAN,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_ANGEL,
    ITEM_SP_CRITICAL_DAMAGE_UP_RACE_DRAGON,
    ITEM_SP_RESIST_MONSTER_ELM_VANITY,
    ITEM_SP_RESIST_MONSTER_ELM_WATER,
    ITEM_SP_RESIST_MONSTER_ELM_EARTH,
    ITEM_SP_RESIST_MONSTER_ELM_FIRE,
    ITEM_SP_RESIST_MONSTER_ELM_WIND,
    ITEM_SP_RESIST_MONSTER_ELM_POISON,
    ITEM_SP_RESIST_MONSTER_ELM_HOLY,
    ITEM_SP_RESIST_MONSTER_ELM_DARK,
    ITEM_SP_RESIST_MONSTER_ELM_PSYCO,
    ITEM_SP_RESIST_MONSTER_ELM_UNDEAD,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_VANITY,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WATER,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_EARTH,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_FIRE,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_WIND,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_POISON,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_HOLY,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_DARK,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_PSYCO,
    ITEM_SP_MAGICAL_DAMAGE_UP_ELM_UNDEAD,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_VANITY,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WATER,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_EARTH,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_FIRE,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_WIND,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_POISON,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_HOLY,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_DARK,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_PSYCO,
    ITEM_SP_MAGICAL_DAMAGE_UP_MONSTER_ELM_UNDEAD,
    ITEM_SP_RESIST_STATE_R_CHILLED,
    ITEM_SP_RESIST_STATE_R_ICED,
    ITEM_SP_RESIST_STATE_R_IGNITION,
    ITEM_SP_RESIST_STATE_R_FEAR,
    ITEM_SP_RESIST_STATE_R_DEEPSLEEP,
    ITEM_SP_RESIST_STATE_R_CHARMED,
    ITEM_SP_RESIST_STATE_R_FRENZY,
    ITEM_SP_RESIST_STATE_R_RESERVED_367,
    ITEM_SP_RESIST_STATE_R_RESERVED_368,
    ITEM_SP_RESIST_STATE_R_RESERVED_369,
    ITEM_SP_RESIST_STATE_NEW_LETHARGY,
    ITEM_SP_RESIST_STATE_NEW_JETBLACK,
    ITEM_SP_RESIST_STATE_NEW_HIGHLYPOISONOUS,
    ITEM_SP_RESIST_STATE_NEW_TORRENT,
    ITEM_SP_RESIST_STATE_NEW_MELANCHOLY,
    ITEM_SP_RESIST_STATE_NEW_STILLNESS,
    ITEM_SP_RESIST_STATE_NEW_CONFLAGRATION,
    ITEM_SP_RESIST_STATE_NEW_RAPIDCOOLING,
    ITEM_SP_RESIST_STATE_NEW_CRYSTALLIZATION,
    ITEM_SP_RESIST_STATE_NEW_UNHAPPINESS,
    ITEM_SP_NEVER_CAST_CANCEL,
    ITEM_SP_NEVER_KNOCK_BACK,
}, {
    ITEM_SP_DMY,
    ITEM_SP_END,
    ITEM_SP_PHYSICAL_DAMAGE_UP_MONSTER_OFFSET,
    ITEM_SP_SKILL_DAMAGE_OFFSET,
    ITEM_SP_SKILL_CAST_TIME_OFFSET,
    ITEM_SP_SKILL_CAST_MINUS_OFFSET,
    ITEM_SP_SKILL_FIXED_TIME_OFFSET,
    ITEM_SP_SKILL_FIXED_MINUS_OFFSET,
    ITEM_SP_RESERVED_15000,
    ITEM_SP_RESERVED_17000,
    ITEM_SP_SKILL_COOL_MINUS_OFFSET,
    ITEM_SP_SKILL_COST_SCALING_OFFSET,
    ITEM_SP_SKILL_COST_MINUS_OFFSET,
    ITEM_SP_REFINE_BY_1_OFFSET,
    ITEM_SP_REFINE_BY_2_OFFSET,
    ITEM_SP_REFINE_BY_3_OFFSET,
    ITEM_SP_REFINE_BY_4_OFFSET,
    ITEM_SP_REFINE_BY_5_OFFSET,
    ITEM_SP_REFINE_BY_6_OFFSET,
    ITEM_SP_REFINE_BY_7_OFFSET,
    ITEM_SP_REFINE_BY_8_OFFSET,
    ITEM_SP_REFINE_BY_9_OFFSET,
    ITEM_SP_REFINE_OVER_1_OFFSET,
    ITEM_SP_REFINE_OVER_2_OFFSET,
    ITEM_SP_REFINE_OVER_3_OFFSET,
    ITEM_SP_REFINE_OVER_4_OFFSET,
    ITEM_SP_REFINE_OVER_5_OFFSET,
    ITEM_SP_REFINE_OVER_6_OFFSET,
    ITEM_SP_REFINE_OVER_7_OFFSET,
    ITEM_SP_REFINE_OVER_8_OFFSET,
    ITEM_SP_REFINE_OVER_9_OFFSET,
    ITEM_SP_REFINE_OVER_10_OFFSET,
    ITEM_SP_PURE_STR_BY_10_OFFSET,
    ITEM_SP_PURE_AGI_BY_10_OFFSET,
    ITEM_SP_PURE_VIT_BY_10_OFFSET,
    ITEM_SP_PURE_INT_BY_10_OFFSET,
    ITEM_SP_PURE_DEX_BY_10_OFFSET,
    ITEM_SP_PURE_LUK_BY_10_OFFSET,
    ITEM_SP_PURE_DEX_BY_1_OFFSET,
    ITEM_SP_PURE_VIT_BY_1_OFFSET,
    ITEM_SP_PURE_STR_90_OFFSET,
    ITEM_SP_PURE_AGI_90_OFFSET,
    ITEM_SP_PURE_VIT_90_OFFSET,
    ITEM_SP_PURE_INT_90_OFFSET,
    ITEM_SP_PURE_DEX_90_OFFSET,
    ITEM_SP_PURE_LUK_90_OFFSET,
    ITEM_SP_PURE_STR_108_OFFSET,
    ITEM_SP_PURE_AGI_108_OFFSET,
    ITEM_SP_PURE_VIT_108_OFFSET,
    ITEM_SP_PURE_INT_108_OFFSET,
    ITEM_SP_PURE_DEX_108_OFFSET,
    ITEM_SP_PURE_LUK_108_OFFSET,
    ITEM_SP_PURE_STR_120_OFFSET,
    ITEM_SP_PURE_AGI_120_OFFSET,
    ITEM_SP_PURE_VIT_120_OFFSET,
    ITEM_SP_PURE_INT_120_OFFSET,
    ITEM_SP_PURE_DEX_120_OFFSET,
    ITEM_SP_PURE_LUK_120_OFFSET,
    ITEM_SP_PURE_STR_125_OFFSET,
    ITEM_SP_PURE_AGI_125_OFFSET,
    ITEM_SP_PURE_VIT_125_OFFSET,
    ITEM_SP_PURE_INT_125_OFFSET,
    ITEM_SP_PURE_DEX_125_OFFSET,
    ITEM_SP_PURE_LUK_125_OFFSET,
    ITEM_SP_PURE_STR_110_OFFSET,
    ITEM_SP_PURE_AGI_110_OFFSET,
    ITEM_SP_PURE_VIT_110_OFFSET,
    ITEM_SP_PURE_INT_110_OFFSET,
    ITEM_SP_PURE_DEX_110_OFFSET,
    ITEM_SP_PURE_LUK_110_OFFSET,
    ITEM_SP_PURE_STR_80_OFFSET,
    ITEM_SP_PURE_AGI_80_OFFSET,
    ITEM_SP_PURE_VIT_80_OFFSET,
    ITEM_SP_PURE_INT_80_OFFSET,
    ITEM_SP_PURE_DEX_80_OFFSET,
    ITEM_SP_PURE_LUK_80_OFFSET,
    ITEM_SP_PURE_STR_130_OFFSET,
    ITEM_SP_PURE_AGI_130_OFFSET,
    ITEM_SP_PURE_VIT_130_OFFSET,
    ITEM_SP_PURE_INT_130_OFFSET,
    ITEM_SP_PURE_DEX_130_OFFSET,
    ITEM_SP_PURE_LUK_130_OFFSET,
    ITEM_SP_PURE_POW_100_OFFSET,
    ITEM_SP_PURE_STA_100_OFFSET,
    ITEM_SP_PURE_WIS_100_OFFSET,
    ITEM_SP_PURE_SPL_100_OFFSET,
    ITEM_SP_PURE_CON_100_OFFSET,
    ITEM_SP_PURE_CRT_100_OFFSET,
    ITEM_SP_PURE_STR_100_OFFSET,
    ITEM_SP_PURE_AGI_100_OFFSET,
    ITEM_SP_PURE_VIT_100_OFFSET,
    ITEM_SP_PURE_INT_100_OFFSET,
    ITEM_SP_PURE_DEX_100_OFFSET,
    ITEM_SP_PURE_LUK_100_OFFSET,
    ITEM_SP_PURE_POW_50_OFFSET,
    ITEM_SP_PURE_STA_50_OFFSET,
    ITEM_SP_PURE_WIS_50_OFFSET,
    ITEM_SP_PURE_SPL_50_OFFSET,
    ITEM_SP_PURE_CON_50_OFFSET,
    ITEM_SP_PURE_CRT_50_OFFSET,
    ITEM_SP_PURE_POW_110_OFFSET,
    ITEM_SP_PURE_STA_110_OFFSET,
    ITEM_SP_PURE_WIS_110_OFFSET,
    ITEM_SP_PURE_SPL_110_OFFSET,
    ITEM_SP_PURE_CON_110_OFFSET,
    ITEM_SP_PURE_CRT_110_OFFSET,
    ITEM_SP_JOB_RESTRICT_NOVICE_OFFSET,
    ITEM_SP_JOB_RESTRICT_MONK_OFFSET,
    ITEM_SP_JOB_RESTRICT_RUNE_KNIGHT_OFFSET,
    ITEM_SP_JOB_RESTRICT_GUILLOTINE_CROSS_OFFSET,
    ITEM_SP_JOB_RESTRICT_ARCBISHOP_OFFSET,
    ITEM_SP_JOB_RESTRICT_RANGER_OFFSET,
    ITEM_SP_JOB_RESTRICT_WARLOCK_OFFSET,
    ITEM_SP_JOB_RESTRICT_MECHANIC_OFFSET,
    ITEM_SP_JOB_RESTRICT_ROYALGUARD_OFFSET,
    ITEM_SP_JOB_RESTRICT_SHADOWCHASER_OFFSET,
    ITEM_SP_JOB_RESTRICT_SHURA_OFFSET,
    ITEM_SP_JOB_RESTRICT_MINSTREL_OFFSET,
    ITEM_SP_JOB_RESTRICT_WANDERER_OFFSET,
    ITEM_SP_JOB_RESTRICT_SORCERER_OFFSET,
    ITEM_SP_JOB_RESTRICT_GENETIC_OFFSET,
    ITEM_SP_JOB_RESTRICT_KAGERO,
    ITEM_SP_JOB_RESTRICT_OBORO,
    ITEM_SP_JOB_RESTRICT_SUPERNOVICE_PLUS,
    ITEM_SP_JOB_RESTRICT_REBELLION,
    ITEM_SP_JOB_RESTRICT_SUMMONER,
    ITEM_SP_JOB_RESTRICT_STAR_EMPEROR_OFFSET,
    ITEM_SP_JOB_RESTRICT_SOUL_REAPER_OFFSET,
    ITEM_SP_BASE_LV_BY_1_OFFSET,
    ITEM_SP_BASE_LV_BY_2_OFFSET,
    ITEM_SP_BASE_LV_BY_3_OFFSET,
    ITEM_SP_BASE_LV_BY_4_OFFSET,
    ITEM_SP_BASE_LV_BY_5_OFFSET,
    ITEM_SP_BASE_LV_BY_6_OFFSET,
    ITEM_SP_BASE_LV_BY_7_OFFSET,
    ITEM_SP_BASE_LV_BY_8_OFFSET,
    ITEM_SP_BASE_LV_BY_9_OFFSET,
    ITEM_SP_BASE_LV_BY_10_OFFSET,
    ITEM_SP_BASE_LV_BY_20_OFFSET,
    ITEM_SP_BASE_LV_BY_99_OFFSET,
    ITEM_SP_BASE_LV_OVER_170_OFFSET,
    ITEM_SP_BASE_LV_OVER_100_OFFSET,
    ITEM_SP_BASE_LV_UNDER_99_OFFSET,
    ITEM_SP_BASE_LV_OVER_175_OFFSET,
    ITEM_SP_BASE_LV_OVER_250_OFFSET,
    ITEM_SP_BASE_LV_OVER_260_OFFSET,
    ITEM_SP_BASE_LV_OVER_165_OFFSET,
    ITEM_SP_PET_FRIENDLY_OVER_HIGH,
    ITEM_SP_PET_FRIENDLY_OVER_HIGHEST,
    ITEM_SP_TRANSCENDENCE_1,
    ITEM_SP_TRANSCENDENCE_2,
    ITEM_SP_TRANSCENDENCE_3,
    ITEM_SP_TRANSCENDENCE_4,
    ITEM_SP_EQUIPMENT_LOCATION_BODY,
    ITEM_SP_EQUIPMENT_LOCATION_SHOULDER,
    ITEM_SP_EQUIPMENT_LOCATION_SHOES,
    ITEM_SP_EQUIPMENT_LOCATION_ACCESSORY,
    ITEM_SP_EQUIPMENT_LOCATION_HEAD_MID,
    ITEM_SP_PURE_STR_BY_30_OFFSET,
    ITEM_SP_PURE_AGI_BY_30_OFFSET,
    ITEM_SP_PURE_VIT_BY_30_OFFSET,
    ITEM_SP_PURE_INT_BY_30_OFFSET,
    ITEM_SP_PURE_DEX_BY_30_OFFSET,
    ITEM_SP_PURE_LUK_BY_30_OFFSET,
});
