
/**
 * セーブデータユニットクラス：バージョン情報.
 */
window.SAVE_DATA_UNIT_TYPE_VERSION = CSaveDataUnitTypeManager.register(CSaveDataUnitVersion);

/**
 * セーブデータユニットクラス：キャラクターステータス.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA = CSaveDataUnitTypeManager.register(CSaveDataUnitChara);

/**
 * セーブデータユニットクラス：装備可能品.
 * （将来的な持ち替え機能等を見据え、装備位置に依存せず、アイテム単品の性能をまとめて管理する）
 */
window.SAVE_DATA_UNIT_TYPE_EQUIPABLE = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipable);

/**
 * セーブデータユニットクラス：装備位置.
 * （将来的な持ち替え機能等を見据え、装備位置とアイテム等との対応付けを管理する）
 */
window.SAVE_DATA_UNIT_TYPE_EQUIP_REGIONS = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipRegions);

/**
 * セーブデータユニットクラス：習得スキル.
 */
window.SAVE_DATA_UNIT_TYPE_LEARNED_SKILLS = CSaveDataUnitTypeManager.register(CSaveDataUnitLearnedSkills);

/**
 * セーブデータユニットクラス：キャラクターBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaBuff);

/**
 * セーブデータユニットクラス：自己スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_SELF = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffSelf);

/**
 * セーブデータユニットクラス：一次職スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_1ST = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff1st);

/**
 * セーブデータユニットクラス：二次職スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_2ND = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff2nd);

/**
 * セーブデータユニットクラス：三次職スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_3RD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff3rd);

/**
 * セーブデータユニットクラス：四次職スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_4TH = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuff4th);

/**
 * セーブデータユニットクラス：演奏スキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_MUSIC = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffMusic);

/**
 * セーブデータユニットクラス：ギルドスキルBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_SKILL_BUFF_GUILD = CSaveDataUnitTypeManager.register(CSaveDataUnitSkillBuffGuild);

/**
 * セーブデータユニットクラス：アイテムBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_ITEM_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitItemBuff);

/**
 * セーブデータユニットクラス：時限効果設定.
 */
window.SAVE_DATA_UNIT_TYPE_TIME_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitTimeBuff);

/**
 * セーブデータユニットクラス：オートスペル設定.
 */
window.SAVE_DATA_UNIT_TYPE_AUTO_SPELLS = CSaveDataUnitTypeManager.register(CSaveDataUnitAutoSpells);

/**
 * セーブデータユニットクラス：キャラクターDEBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaDebuff);

/**
 * セーブデータユニットクラス：性能カスタマイズ（基本）.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_CONF_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfBasic);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特化）.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPECIALIZE = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecialize);

/**
 * セーブデータユニットクラス：性能カスタマイズ（スキル）.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_CONF_SKILL = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSkill);

/**
 * セーブデータユニットクラス：モンスター設定.
 */
window.SAVE_DATA_UNIT_TYPE_MOB = CSaveDataUnitTypeManager.register(CSaveDataUnitMob);

/**
 * セーブデータユニットクラス：対プレイヤー設定.
 */
window.SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer);

/**
 * セーブデータユニットクラス：対プレイヤー設定2.
 */
window.SAVE_DATA_UNIT_TYPE_MOB_CONF_PLAYER2 = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfPlayer2);

/**
 * セーブデータユニットクラス：モンスター手入力欄.
 */
window.SAVE_DATA_UNIT_TYPE_MOB_CONF_INPUT = CSaveDataUnitTypeManager.register(CSaveDataUnitMobConfInput);

/**
 * セーブデータユニットクラス：敵BUFF.
 */
window.SAVE_DATA_UNIT_TYPE_MOB_BUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobBuff);

/**
 * セーブデータユニットクラス：敵DEBUFF.
 */
window.SAVE_DATA_UNIT_TYPE_MOB_DEBUFF = CSaveDataUnitTypeManager.register(CSaveDataUnitMobDebuff);

/**
 * セーブデータユニットクラス：戦闘結果情報.
 */
window.SAVE_DATA_UNIT_TYPE_ATTACK_CONF = CSaveDataUnitTypeManager.register(CSaveDataUnitAttackConf);

/**
 * セーブデータユニットクラス：計算機設定.
 */
window.SAVE_DATA_UNIT_TYPE_SETTINGS = CSaveDataUnitTypeManager.register(CSaveDataUnitSettings);

/**
 * セーブデータユニットクラス：性能カスタマイズ（特性ステータス）.
 */
window.SAVE_DATA_UNIT_TYPE_CHARA_CONF_SPEC_BASIC = CSaveDataUnitTypeManager.register(CSaveDataUnitCharaConfSpecBasic);

/**
 * セーブデータユニットクラス：矢.
 */
window.SAVE_DATA_UNIT_TYPE_EQUIP_ARROW = CSaveDataUnitTypeManager.register(CSaveDataUnitEquipArrow);

