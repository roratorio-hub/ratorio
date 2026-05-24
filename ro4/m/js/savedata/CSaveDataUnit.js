import { CSaveDataUnitTypeManager } from './CSaveDataUnitTypeManager.js';
import { CSaveDataUnitVersion } from './CSaveDataUnitVersion.js';
import { CSaveDataUnitChara } from './CSaveDataUnitChara.js';
import { CSaveDataUnitEquipable } from './CSaveDataUnitEquipable.js';
import { CSaveDataUnitEquipRegions } from './CSaveDataUnitEquipRegions.js';
import { CSaveDataUnitLearnedSkills } from './CSaveDataUnitLearnedSkills.js';
import { CSaveDataUnitCharaBuff } from './CSaveDataUnitCharaBuff.js';
import { CSaveDataUnitSkillBuffSelf } from './CSaveDataUnitSkillBuffSelf.js';
import { CSaveDataUnitSkillBuff1st } from './CSaveDataUnitSkillBuff1st.js';
import { CSaveDataUnitSkillBuff2nd } from './CSaveDataUnitSkillBuff2nd.js';
import { CSaveDataUnitSkillBuff3rd } from './CSaveDataUnitSkillBuff3rd.js';
import { CSaveDataUnitSkillBuff4th } from './CSaveDataUnitSkillBuff4th.js';
import { CSaveDataUnitSkillBuffMusic } from './CSaveDataUnitSkillBuffMusic.js';
import { CSaveDataUnitSkillBuffGuild } from './CSaveDataUnitSkillBuffGuild.js';
import { CSaveDataUnitItemBuff } from './CSaveDataUnitItemBuff.js';
import { CSaveDataUnitTimeBuff } from './CSaveDataUnitTimeBuff.js';
import { CSaveDataUnitAutoSpells } from './CSaveDataUnitAutoSpells.js';
import { CSaveDataUnitCharaDebuff } from './CSaveDataUnitCharaDebuff.js';
import { CSaveDataUnitCharaConfBasic } from './CSaveDataUnitCharaConfBasic.js';
import { CSaveDataUnitCharaConfSpecialize } from './CSaveDataUnitCharaConfSpecialize.js';
import { CSaveDataUnitCharaConfSkill } from './CSaveDataUnitCharaConfSkill.js';
import { CSaveDataUnitMob } from './CSaveDataUnitMob.js';
import { CSaveDataUnitMobConfPlayer } from './CSaveDataUnitMobConfPlayer.js';
import { CSaveDataUnitMobConfPlayer2 } from './CSaveDataUnitMobConfPlayer2.js';
import { CSaveDataUnitMobConfInput } from './CSaveDataUnitMobConfInput.js';
import { CSaveDataUnitMobBuff } from './CSaveDataUnitMobBuff.js';
import { CSaveDataUnitMobDebuff } from './CSaveDataUnitMobDebuff.js';
import { CSaveDataUnitAttackConf } from './CSaveDataUnitAttackConf.js';
import { CSaveDataUnitSettings } from './CSaveDataUnitSettings.js';
import { CSaveDataUnitCharaConfSpecBasic } from './CSaveDataUnitCharaConfSpecBasic.js';
import { CSaveDataUnitEquipArrow } from './CSaveDataUnitEquipArrow.js';


/**
 * セーブデータユニットクラス：バージョン情報.
 */
export const SAVE_DATA_UNIT_TYPE_VERSION = CSaveDataUnitTypeManager.register(CSaveDataUnitVersion);

/**
 * セーブデータユニットクラス：キャラクターステータス.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA = CSaveDataUnitTypeManager.register(CSaveDataUnitChara);

/**
 * セーブデータユニットクラス：装備可能品.
 * （将来的な持ち替え機能等を見据え、装備位置に依存せず、アイテム単品の性能をまとめて管理する）
 */
export const SAVE_DATA_UNIT_TYPE_EQUIPABLE = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipable);

/**
 * セーブデータユニットクラス：装備位置.
 * （将来的な持ち替え機能等を見据え、装備位置とアイテム等との対応付けを管理する）
 */
export const SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipRegions);

/**
 * セーブデータユニットクラス：習得スキル.
 */
export const SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS = CSaveDataUnitTypeManager.register(CSaveDataUnitLearnedSkills);

/**
 * セーブデータユニットクラス：キャラクターBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaBuff);

/**
 * セーブデータユニットクラス：自己スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffSelf);

/**
 * セーブデータユニットクラス：一次職スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff1st);

/**
 * セーブデータユニットクラス：二次職スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff2nd);

/**
 * セーブデータユニットクラス：三次職スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff3rd);

/**
 * セーブデータユニットクラス：四次職スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff4th);

/**
 * セーブデータユニットクラス：演奏スキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffMusic);

/**
 * セーブデータユニットクラス：ギルドスキルBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffGuild);

/**
 * セーブデータユニットクラス：アイテムBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_ITEM_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitItemBuff);

/**
 * セーブデータユニットクラス：時限効果設定.
 */
export const SAVE_DATA_UNIT_TYPE_TIME_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitTimeBuff);

/**
 * セーブデータユニットクラス：オートスペル設定.
 */
export const SAVE_DATA_UNIT_TYPE_AUTO_SPELLS = CSaveDataUnitTypeManager.register(CSaveDataUnitAutoSpells);

/**
 * セーブデータユニットクラス：キャラクターDEBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaDebuff);

/**
 * セーブデータユニットクラス：性能カスタマイズ（基本）.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfBasic);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特化）.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecialize);

/**
 * セーブデータユニットクラス：性能カスタマイズ（スキル）.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSkill);

/**
 * セーブデータユニットクラス：モンスター設定.
 */
export const SAVE_DATA_UNIT_TYPE_MOB = CSaveDataUnitTypeManager.register(CSaveDataUnitMob);

/**
 * セーブデータユニットクラス：対プレイヤー設定.
 */
export const SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer);

/**
 * セーブデータユニットクラス：対プレイヤー設定2.
 */
export const SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2 = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer2);

/**
 * セーブデータユニットクラス：モンスター手入力欄.
 */
export const SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfInput);

/**
 * セーブデータユニットクラス：敵BUFF.
 */
export const SAVE_DATA_UNIT_TYPE_MOB_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobBuff);

/**
 * セーブデータユニットクラス：敵DEBUFF.
 */
export const SAVE_DATA_UNIT_TYPE_MOB_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobDebuff);

/**
 * セーブデータユニットクラス：戦闘結果情報.
 */
export const SAVE_DATA_UNIT_TYPE_ATTACK_CONF = CSaveDataUnitTypeManager.register(CSaveDataUnitAttackConf);

/**
 * セーブデータユニットクラス：計算機設定.
 */
export const SAVE_DATA_UNIT_TYPE_SETTINGS = CSaveDataUnitTypeManager.register(CSaveDataUnitSettings);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特性ステータス）.
 */
export const SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecBasic);

/**
 * セーブデータユニットクラス：矢.
 */
export const SAVE_DATA_UNIT_TYPE_EQUIP_ARROW = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipArrow);
