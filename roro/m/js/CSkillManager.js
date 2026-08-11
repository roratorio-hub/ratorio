import { CSkillData } from './CSkillData.js';
import { skills as skills_01_novice_swordman_thief_acolyte } from './skill/01-novice-swordman-thief-acolyte.js';
import { skills as skills_02_archer_mage_merchant } from './skill/02-archer-mage-merchant.js';
import { skills as skills_03_knight_assassin_priest } from './skill/03-knight-assassin-priest.js';
import { skills as skills_04_hunter_wizard } from './skill/04-hunter-wizard.js';
import { skills as skills_05_blacksmith_crusader } from './skill/05-blacksmith-crusader.js';
import { skills as skills_06_rogue_monk_bard } from './skill/06-rogue-monk-bard.js';
import { skills as skills_07_dancer_bard_sage } from './skill/07-dancer-bard-sage.js';
import { skills as skills_08_alchemist_transcend_hi } from './skill/08-alchemist-transcend-hi.js';
import { skills as skills_09_transcend_extra } from './skill/09-transcend-extra.js';
import { skills as skills_10_transcend_taekwon } from './skill/10-transcend-taekwon.js';
import { skills as skills_11_star_gladiator_soul_linker } from './skill/11-star-gladiator-soul-linker.js';
import { skills as skills_12_soul_linker_ninja } from './skill/12-soul-linker-ninja.js';
import { skills as skills_13_gunslinger } from './skill/13-gunslinger.js';
import { skills as skills_14_rune_knight_guillotine_cross } from './skill/14-rune-knight-guillotine-cross.js';
import { skills as skills_15_arch_bishop } from './skill/15-arch-bishop.js';
import { skills as skills_16_ranger } from './skill/16-ranger.js';
import { skills as skills_17_warlock } from './skill/17-warlock.js';
import { skills as skills_18_mechanic } from './skill/18-mechanic.js';
import { skills as skills_19_royal_guard_shadow_chaser } from './skill/19-royal-guard-shadow-chaser.js';
import { skills as skills_20_sura } from './skill/20-sura.js';
import { skills as skills_21_minstrel_wanderer } from './skill/21-minstrel-wanderer.js';
import { skills as skills_22_sorcerer } from './skill/22-sorcerer.js';
import { skills as skills_23_elemental_spirit } from './skill/23-elemental-spirit.js';
import { skills as skills_24_genetic } from './skill/24-genetic.js';
import { skills as skills_25_kagerou_oboro } from './skill/25-kagerou-oboro.js';
import { skills as skills_26_third_class_extra } from './skill/26-third-class-extra.js';
import { skills as skills_27_rebellion } from './skill/27-rebellion.js';
import { skills as skills_28_legacy_class_extra } from './skill/28-legacy-class-extra.js';
import { skills as skills_29_doram_summoner } from './skill/29-doram-summoner.js';
import { skills as skills_30_star_emperor } from './skill/30-star-emperor.js';
import { skills as skills_31_soul_reaper } from './skill/31-soul-reaper.js';
import { skills as skills_32_dragon_knight_shadow_cross_cardinal } from './skill/32-dragon-knight-shadow-cross-cardinal.js';
import { skills as skills_33_wind_hawk_arch_mage } from './skill/33-wind-hawk-arch-mage.js';
import { skills as skills_34_meister_imperial_guard_abyss_chaser } from './skill/34-meister-imperial-guard-abyss-chaser.js';
import { skills as skills_35_inquisitor_troubadour } from './skill/35-inquisitor-troubadour.js';
import { skills as skills_36_elemental_master_biolo } from './skill/36-elemental-master-biolo.js';
import { skills as skills_37_sky_emperor_soul_ascetic } from './skill/37-sky-emperor-soul-ascetic.js';
import { skills as skills_38_night_watch_spirit_handler } from './skill/38-night-watch-spirit-handler.js';
import { skills as skills_39_shinkiro_shiranui } from './skill/39-shinkiro-shiranui.js';
import { skills as skills_40_fourth_class_extra } from './skill/40-fourth-class-extra.js';
import { skills as skills_41_dr } from './skill/41-dr.js';
import { skills as skills_42_kr } from './skill/42-kr.js';
import { skills as skills_43_at } from './skill/43-at.js';

export { CSkillData } from './CSkillData.js';
export { RegisterUsedSkillSearch, RegisterLearnedSkillSearch } from './skill-search-bridge.js';

// === AUTO-GENERATED IMPORTS ===
import './common.js';
import './data/mig.itemsp.h.js';
import './item.h.js';
// === END AUTO-GENERATED IMPORTS ===

/**
 * 各スキルの情報を一元管理するマネージャークラス.
 * メンバメソッドの GetXXX( ) を通じて
 * 各スキルのパラメータを取得できる.
 *
 * ⚠ skill オブジェクトは roro/m/js/skill/ 配下のモジュールレベルシングルトンであり、
 * 複数の CSkillManager インスタンス間で共有される（生成タイミングも new CSkillManager() 時
 * ではなく各グループモジュール評価時）。構築後に書き換えないこと。
 */
export function CSkillManager() {

	this.dataArray = new Array();

	/**
	 * 呼び出し元である親スキルのIDを取得する。呼び出し元が存在しない場合は自分自身のスキルIDを返す。
	 * @param {Number} skillId 
	 * @returns {Number} スキルID
	 */
	this.GetBaseSkillId = function(skillId) {
		if (this.dataArray[skillId].refId >= 0) {
			return this.dataArray[skillId].refId;
		}

		return this.dataArray[skillId].id;
	}

	this.GetSkillName = function(skillId) {
		return this.dataArray[skillId].name;
	}

	this.GetSkillPlaneName = function(skillId) {

		var name = this.GetSkillName(skillId);
		var regReplacer = /\([^)]+\)/;

		while (regReplacer.test(name)) {
			name = name.replace(regReplacer, "");
		}

		return name;
	}

	this.GetSkillIdByName = function (name) {
		var idx = 0;
		var regKanaChange = null;
		var nameChanged = "";
		for (idx = 0; idx < this.dataArray.length; idx++) {
			if (this.dataArray[idx].name.replace(/\([^)]+\)/g, "") == name) {
				return this.dataArray[idx].id;
			}
		}
		// TODO: 「ヘスペルスリット」などで、「へ」が片仮名ではなく平仮名になっていたりする問題への対応（公式のバグ）
		// 引数で渡された名称に、平仮名の「へ」がある場合、片仮名に変換して再検索する
		regKanaChange = new RegExp("(?:へ|ぺ|べ)");
		if (regKanaChange.test(name)) {

			nameChanged = name.replace("へ", "ヘ").replace("ぺ", "ペ").replace("べ", "ベ");

			for (idx = 0; idx < this.dataArray.length; idx++) {
				if (this.dataArray[idx].name.replace(/\([^)]+\)/g, "") == nameChanged) {
					return this.dataArray[idx].id;
				}
			}
		}
		return -1;
	}

	this.GetSkillKana = function(skillId) {
		return this.dataArray[skillId].kana;
	}

	this.GetMaxLv = function(skillId) {
		return this.dataArray[skillId].maxLv;
	}

	/**
	 * スキル毎に設定された合成タイプ値を返す関数。
	 * 合成タイプ値は複数のタイプ値の合算値でありビット論理積により分離して利用する。
	 * 例： 138 = 2:TYPE_ACTIVE + 8:TYPE_MAGICAL + 128:TYPE_DIVHIT_FORMULA
	 * @param {*} skillId 
	 * @returns 
	 */
	this.GetSkillType = function(skillId) {
		return this.dataArray[skillId].type;
	}

	/**
	 * スキルの有効射程カテゴリを取得する
	 * @param {Number} skillId 
	 * @param {Number} weapon 武器種
	 * @returns 	[ CSkillData.RANGE_SHORT (default) | CSkillData.RANGE_LONG | CSkillData.RANGE_MAGIC | CSkillData.RANGE_SPECIAL ]
	 */
	this.GetSkillRange = function(skillId, weapon) {
		if (typeof this.dataArray[skillId].range === "function") {
			return this.dataArray[skillId].range(weapon);
		} else {
			return this.dataArray[skillId].range;
		}
	}

	/**
	 * スキルの攻撃属性を取得する
	 * @param {Number} skillId
	 * @param {CAttackMethodConf} option
	 * @param {Array} mobData
	 * @param {Number} parentSkillId 追撃ダメージを持つスキルの呼び出し元スキルID
	 * @returns CSkillData.ELEMENT_FORCE_VANITY (default)
	 * 			| CSkillData.ELEMENT_VOID
	 *			| CSkillData.ELEMENT_FORCE_WATER
	 *			| CSkillData.ELEMENT_FORCE_EARTH
	 *			| CSkillData.ELEMENT_FORCE_FIRE
	 *			| CSkillData.ELEMENT_FORCE_WIND
	 *			| CSkillData.ELEMENT_FORCE_POISON
	 *			| CSkillData.ELEMENT_FORCE_HOLY
	 *			| CSkillData.ELEMENT_FORCE_DARK
	 *			| CSkillData.ELEMENT_FORCE_PSYCO
	 *			| CSkillData.ELEMENT_FORCE_UNDEAD
	 *			| CSkillData.ELEMENT_SPECIAL
	 */
	this.GetElement = function(skillId, option, mobData, parentSkillId) {
		if (typeof this.dataArray[skillId].element === "function") {
			return this.dataArray[skillId].element(option, mobData, parentSkillId);
		} else {
			return this.dataArray[skillId].element;
		}
	}

	/**
	 * スキルデータに強制属性が定義されている場合のみ、その属性ＩＤを返す.
	 * 戻り値は ELM_ID_VANITY 〜 ELM_ID_UNDEAD と同じ値なので、
	 * そのまま n_A_Weapon_zokusei に代入できる.
	 *
	 * ELEMENT_VOID（強制属性なし）と ELEMENT_SPECIAL（複合属性）は
	 * どちらも CSkillData.ELEMENT_VOID にまとめて返す.
	 *
	 * 属性が option 依存の関数になっているスキル（アドラムス、鹿砲、玄鹿の霊力など）は、
	 * そのスキル自身の攻撃手段設定が無ければ正しく評価できない.
	 * オートスペルのように option を用意できない呼び出し側は option に null を渡すこと.
	 * その場合は判定不能として CSkillData.ELEMENT_VOID を返す（option.GetOptionValue の
	 * TypeError も同時に防ぐ）.
	 *
	 * @param {Number} skillId
	 * @param {CAttackMethodConf} option 攻撃手段設定. 用意できない場合は null
	 * @param {Array} mobData
	 * @param {Number} parentSkillId 追撃ダメージを持つスキルの呼び出し元スキルID
	 * @returns {Number} 強制属性ID、または CSkillData.ELEMENT_VOID
	 */
	this.GetForcedElement = function(skillId, option, mobData, parentSkillId) {
		if (typeof this.dataArray[skillId].element === "function") {
			if ((option === null) || (option === undefined)) {
				return CSkillData.ELEMENT_VOID;
			}
		}
		var elmWork = this.GetElement(skillId, option, mobData, parentSkillId);
		if ((CSkillData.ELEMENT_FORCE_VANITY <= elmWork) && (elmWork <= CSkillData.ELEMENT_FORCE_UNDEAD)) {
			return elmWork;
		}
		return CSkillData.ELEMENT_VOID;
	}

	/**
	 * 装備中の武器種で使用できるスキルかどうか判定する.
	 * @param {Number} weapon 
	 * @returns {boolean}
	 */
	this.MatchWeaponCondition = function(skillId, weapon) {
		return this.dataArray[skillId].WeaponCondition(weapon);
	}

	/**
	 * スキル倍率を取得する
	 * @param {Number} skillId 
	 * @param {Number} skillLv 
	 * @param {Array} charaDataManger 
	 * @param {CAttackMethodConf} option 
	 * @param {Array} mobData
	 * @param {Number} weapon
	 * @param {Number} parentSkillId 追撃ダメージを持つスキルの呼び出し元スキルID
	 * @returns {Number} スキル倍率％
	 */
	this.GetPower = function(skillId, skillLv, charaDataManger, option, mobData, weapon, parentSkillId) {
		return this.dataArray[skillId].Power(skillLv, charaDataManger, option, mobData, weapon, parentSkillId);
	}

	/**
	 * スキルのヒット数を取得する.
	 * 各スキルの Switch-Case ブロックでオーバーライドされていない場合は 1 が返される.
	 * @param {Number} skillId 
	 * @param {Number} skillLv 
	 * @param {CAttackMethodConf} option 
	 * @param {Number} weapon
	 * @param {Number} parentSkillId
	 * @returns {Number}
	 */
	this.GetHitCount = function(skillId, skillLv, option, weapon, parentSkillId) {
		if (typeof this.dataArray[skillId].hitCount === "function") {
			return this.dataArray[skillId].hitCount(skillLv, option, weapon, parentSkillId);
		} else {
			return this.dataArray[skillId].hitCount;
		}

	}

	/**
	 * スキルの分割ヒット数を取得する. オーバーライドされていない場合は0が返される.
	 * @param {Number} skillId 
	 * @param {Array} charaData
	 * @param {Array} option
	 * @param {Number} parentSkillId
	 * @param {*} skillLv 
	 * @returns 
	 */
	this.GetDividedHitCount = function(skillId, skillLv, charaData, option, parentSkillId) {
		if (typeof this.dataArray[skillId].dispHitCount === "function") {
			return this.dataArray[skillId].dispHitCount(skillLv, charaData, option, parentSkillId);
		} else {
			return this.dataArray[skillId].dispHitCount;
		}
	}

	this.GetCostVary = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CostVary(skillLv, charaDataManger);
	}

	this.GetCostFixed = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CostFixed(skillLv, charaDataManger);
	}

	this.GetCostAP = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CostAP(skillLv, charaDataManger);
	}

	this.GetCastTimeVary = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeVary(skillLv, charaDataManger);
	}

	this.GetCastTimeFixed = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeFixed(skillLv, charaDataManger);
	}

	this.GetCastTimeForce = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CastTimeForce(skillLv, charaDataManger);
	}

	this.GetDelayTimeCommon = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].DelayTimeCommon(skillLv, charaDataManger);
	}

	this.GetCoolTime = function(skillId, skillLv, charaDataManger) {
		return this.dataArray[skillId].CoolTime(skillLv, charaDataManger);
	}

	/**
	 * スキルの効果時間を返す. オーバーライドされていない場合は 0 が返される.
	 * 設置スキルの場合はオブジェクト生存時間として用いられる.
	 * @param {*} skillId 
	 * @param {*} skillLv 
	 * @param {*} charaDataManger 
	 * @returns 
	 */
	this.GetLifeTime = function(skillId, skillLv, charaDataManger) {
		if (typeof this.dataArray[skillId].LifeTime === "function") {
			return this.dataArray[skillId].LifeTime(skillLv, charaDataManger);
		} else {
			return this.dataArray[skillId].LifeTime;
		}
	}
	/**
	 * 地面設置スキルのダメージ発生間隔をミリ秒で取得する.
	 * @param {Number} skillId 
	 * @param {Number} skillLv 
	 * @returns 
	 */
	this.GetDamageInterval = function(skillId, skillLv) {
		if (typeof this.dataArray[skillId].damageInterval === "function") {
			return this.dataArray[skillId].damageInterval(skillLv);
		} else {
			return this.dataArray[skillId].damageInterval;
		}
	}

	/**
	 * クリティカルするスキルの場合、trueを返す
	 * @param {Number} skillId 
	 * @param {Number} skillLv 
	 * @param {*} charaData 
	 * @param {*} specData 
	 * @param {*} mobData 
	 * @returns {Boolean} 
	 */
	this.IsEnableCritical = function(skillId, skillLv, charaData, specData, mobData) {
		return (this.dataArray[skillId].CriActRate(skillLv, charaData, specData, mobData) > 0);
	}

	this.GetCriActRate = function(skillId, skillLv, charaData, specData, mobData, option, weapon) {
		return this.dataArray[skillId].CriActRate(skillLv, charaData, specData, mobData, option, weapon);
	}

	this.CriDamageRate = function(skillId, skillLv, charaData, specData, mobData) {
		return this.dataArray[skillId].CriDamageRate(skillLv, charaData, specData, mobData);
	}

	/**
	 * 地面設置スキルか否かを判定する. オーバーライドされない場合は false を返す.
	 * @param {Number} skillId 
	 * @returns {boolean}
	 */
	this.IsGroundInstallation = function(skillId, option) {
		if (typeof this.dataArray[skillId].ground_installation === "function") {
			return this.dataArray[skillId].ground_installation(option);
		} else {
			return this.dataArray[skillId].ground_installation;
		}
	}

	/**
	 * スキルを発動させるために必要なカウンター上限を返す. オーバーライドされない場合は -1 を返す.
	 * @param {Number} skillId 
	 * @returns {Number}
	 */
	this.GetStackLimit = function(skillId) {
		return this.dataArray[skillId].StackLimit;
	}

	/**
	 * スキルを1回使用するごとに蓄積するカウンターの数を返す. オーバーライドされない場合は 0 を返す.
	 * @param {Number} skillId 
	 * @returns {Number}
	 */
	this.GetStackIncrement = function(skillId) {
		return this.dataArray[skillId].StackIncrement;
	}

	this.GetDataCount = function() {
		return this.dataArray.length;
	}

	const ALL_SKILLS = [...skills_01_novice_swordman_thief_acolyte, ...skills_02_archer_mage_merchant, ...skills_03_knight_assassin_priest, ...skills_04_hunter_wizard, ...skills_05_blacksmith_crusader, ...skills_06_rogue_monk_bard, ...skills_07_dancer_bard_sage, ...skills_08_alchemist_transcend_hi, ...skills_09_transcend_extra, ...skills_10_transcend_taekwon, ...skills_11_star_gladiator_soul_linker, ...skills_12_soul_linker_ninja, ...skills_13_gunslinger, ...skills_14_rune_knight_guillotine_cross, ...skills_15_arch_bishop, ...skills_16_ranger, ...skills_17_warlock, ...skills_18_mechanic, ...skills_19_royal_guard_shadow_chaser, ...skills_20_sura, ...skills_21_minstrel_wanderer, ...skills_22_sorcerer, ...skills_23_elemental_spirit, ...skills_24_genetic, ...skills_25_kagerou_oboro, ...skills_26_third_class_extra, ...skills_27_rebellion, ...skills_28_legacy_class_extra, ...skills_29_doram_summoner, ...skills_30_star_emperor, ...skills_31_soul_reaper, ...skills_32_dragon_knight_shadow_cross_cardinal, ...skills_33_wind_hawk_arch_mage, ...skills_34_meister_imperial_guard_abyss_chaser, ...skills_35_inquisitor_troubadour, ...skills_36_elemental_master_biolo, ...skills_37_sky_emperor_soul_ascetic, ...skills_38_night_watch_spirit_handler, ...skills_39_shinkiro_shiranui, ...skills_40_fourth_class_extra, ...skills_41_dr, ...skills_42_kr, ...skills_43_at];

	this.Init = function() {
		// 旧 util/skill/verify_skill_ids.py（採番とマーカーの照合）を実行時不変条件に置き換えたもの。
		// 明示IDになったので「採番のズレ」は起きないが、ID重複・欠番は起こりうる。
		for (const skillData of ALL_SKILLS) {
			if (this.dataArray[skillData.id] !== undefined) {
				throw new Error(`スキルIDが重複しています: ${skillData.id} (${skillData.name})`);
			}
			this.dataArray[skillData.id] = skillData;
		}
		for (let idx = 0; idx < ALL_SKILLS.length; idx++) {
			if (this.dataArray[idx] === undefined) throw new Error(`スキルIDに欠番があります: ${idx}`);
		}
	}
	// 初期化
	this.Init();

}
