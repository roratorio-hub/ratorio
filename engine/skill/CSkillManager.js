import { CSkillData } from "./CSkillData.js";
import { skills as skills_swordman_1_swordman } from "./swordman/1-swordman.js";
import { skills as skills_swordman_2a_knight } from "./swordman/2a-knight.js";
import { skills as skills_swordman_2b_crusader } from "./swordman/2b-crusader.js";
import { skills as skills_swordman_3a_lord_knight } from "./swordman/3a-lord-knight.js";
import { skills as skills_swordman_3b_paladin } from "./swordman/3b-paladin.js";
import { skills as skills_swordman_4a_rune_knight } from "./swordman/4a-rune-knight.js";
import { skills as skills_swordman_4b_royal_guard } from "./swordman/4b-royal-guard.js";
import { skills as skills_swordman_5a_dragon_knight } from "./swordman/5a-dragon-knight.js";
import { skills as skills_swordman_5b_imperial_guard } from "./swordman/5b-imperial-guard.js";
import { skills as skills_magician_1_magician } from "./magician/1-magician.js";
import { skills as skills_magician_2a_wizard } from "./magician/2a-wizard.js";
import { skills as skills_magician_2b_sage } from "./magician/2b-sage.js";
import { skills as skills_magician_3a_high_wizard } from "./magician/3a-high-wizard.js";
import { skills as skills_magician_3b_professor } from "./magician/3b-professor.js";
import { skills as skills_magician_4a_warlock } from "./magician/4a-warlock.js";
import { skills as skills_magician_4b_sorcerer } from "./magician/4b-sorcerer.js";
import { skills as skills_magician_5a_arch_mage } from "./magician/5a-arch-mage.js";
import { skills as skills_magician_5b_elemental_master } from "./magician/5b-elemental-master.js";
import { skills as skills_archer_1_archer } from "./archer/1-archer.js";
import { skills as skills_archer_2a_hunter } from "./archer/2a-hunter.js";
import { skills as skills_archer_2b_bard_dancer } from "./archer/2b-bard-dancer.js";
import { skills as skills_archer_3a_sniper } from "./archer/3a-sniper.js";
import { skills as skills_archer_3b_clown_gypsy } from "./archer/3b-clown-gypsy.js";
import { skills as skills_archer_4a_ranger } from "./archer/4a-ranger.js";
import { skills as skills_archer_4b_minstrel_wanderer } from "./archer/4b-minstrel-wanderer.js";
import { skills as skills_archer_5a_windhawk } from "./archer/5a-windhawk.js";
import { skills as skills_archer_5b_troubadour_trouvere } from "./archer/5b-troubadour-trouvere.js";
import { skills as skills_merchant_1_merchant } from "./merchant/1-merchant.js";
import { skills as skills_merchant_2a_blacksmith } from "./merchant/2a-blacksmith.js";
import { skills as skills_merchant_2b_alchemist } from "./merchant/2b-alchemist.js";
import { skills as skills_merchant_3a_whitesmith } from "./merchant/3a-whitesmith.js";
import { skills as skills_merchant_3b_creator } from "./merchant/3b-creator.js";
import { skills as skills_merchant_4a_mechanic } from "./merchant/4a-mechanic.js";
import { skills as skills_merchant_4b_genetic } from "./merchant/4b-genetic.js";
import { skills as skills_merchant_5a_meister } from "./merchant/5a-meister.js";
import { skills as skills_merchant_5b_biolo } from "./merchant/5b-biolo.js";
import { skills as skills_thief_1_thief } from "./thief/1-thief.js";
import { skills as skills_thief_2a_assassin } from "./thief/2a-assassin.js";
import { skills as skills_thief_2b_rogue } from "./thief/2b-rogue.js";
import { skills as skills_thief_3a_assassin_cross } from "./thief/3a-assassin-cross.js";
import { skills as skills_thief_3b_chaser } from "./thief/3b-chaser.js";
import { skills as skills_thief_4a_guillotine_cross } from "./thief/4a-guillotine-cross.js";
import { skills as skills_thief_4b_shadow_chaser } from "./thief/4b-shadow-chaser.js";
import { skills as skills_thief_5a_shadow_cross } from "./thief/5a-shadow-cross.js";
import { skills as skills_thief_5b_abyss_chaser } from "./thief/5b-abyss-chaser.js";
import { skills as skills_acolyte_1_acolyte } from "./acolyte/1-acolyte.js";
import { skills as skills_acolyte_2a_priest } from "./acolyte/2a-priest.js";
import { skills as skills_acolyte_2b_monk } from "./acolyte/2b-monk.js";
import { skills as skills_acolyte_3a_high_priest } from "./acolyte/3a-high-priest.js";
import { skills as skills_acolyte_3b_champion } from "./acolyte/3b-champion.js";
import { skills as skills_acolyte_4a_arch_bishop } from "./acolyte/4a-arch-bishop.js";
import { skills as skills_acolyte_4b_sura } from "./acolyte/4b-sura.js";
import { skills as skills_acolyte_5a_cardinal } from "./acolyte/5a-cardinal.js";
import { skills as skills_acolyte_5b_inquisitor } from "./acolyte/5b-inquisitor.js";
import { skills as skills_taekwon_1_taekwon } from "./taekwon/1-taekwon.js";
import { skills as skills_taekwon_2a_star_gladiator } from "./taekwon/2a-star-gladiator.js";
import { skills as skills_taekwon_2b_soul_linker } from "./taekwon/2b-soul-linker.js";
import { skills as skills_taekwon_4a_star_emperor } from "./taekwon/4a-star-emperor.js";
import { skills as skills_taekwon_4b_soul_reaper } from "./taekwon/4b-soul-reaper.js";
import { skills as skills_taekwon_5a_sky_emperor } from "./taekwon/5a-sky-emperor.js";
import { skills as skills_taekwon_5b_soul_ascetic } from "./taekwon/5b-soul-ascetic.js";
import { skills as skills_ninja_1_ninja } from "./ninja/1-ninja.js";
import { skills as skills_ninja_4_kagerou_oboro } from "./ninja/4-kagerou-oboro.js";
import { skills as skills_ninja_5_shinkiro_shiranui } from "./ninja/5-shinkiro-shiranui.js";
import { skills as skills_gunslinger_1_gunslinger } from "./gunslinger/1-gunslinger.js";
import { skills as skills_gunslinger_4_rebellion } from "./gunslinger/4-rebellion.js";
import { skills as skills_gunslinger_5_night_watch } from "./gunslinger/5-night-watch.js";
import { skills as skills_druid_1_druid } from "./druid/1-druid.js";
import { skills as skills_druid_2_karnos } from "./druid/2-karnos.js";
import { skills as skills_druid_5_alitea } from "./druid/5-alitea.js";
import { skills as skills_novice_1_super_novice } from "./novice/1-super-novice.js";
import { skills as skills_novice_5_hyper_novice } from "./novice/5-hyper-novice.js";
import { skills as skills_summoner_1_summoner } from "./summoner/1-summoner.js";
import { skills as skills_summoner_5_spirit_handler } from "./summoner/5-spirit-handler.js";
import { skills as skills_other_spirit } from "./other/spirit.js";
import { skills as skills_other_homunculus } from "./other/homunculus.js";
import { skills as skills_other_common } from "./other/common.js";

export { CSkillData } from "./CSkillData.js";
export { RegisterUsedSkillSearch, RegisterLearnedSkillSearch } from "../bridge/skill-search-bridge.js";

// === AUTO-GENERATED IMPORTS ===
import "../runtime/common.js";
import "../data/mig.itemsp.h.js";
import "../item.h.js";
// === END AUTO-GENERATED IMPORTS ===

/**
 * 各スキルの情報を一元管理するマネージャークラス.
 * メンバメソッドの GetXXX( ) を通じて
 * 各スキルのパラメータを取得できる.
 *
 * ⚠ skill オブジェクトは engine/skill/ 配下のモジュールレベルシングルトンであり、
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

	const ALL_SKILLS = [...skills_swordman_1_swordman, ...skills_swordman_2a_knight, ...skills_swordman_2b_crusader, ...skills_swordman_3a_lord_knight, ...skills_swordman_3b_paladin, ...skills_swordman_4a_rune_knight, ...skills_swordman_4b_royal_guard, ...skills_swordman_5a_dragon_knight, ...skills_swordman_5b_imperial_guard, ...skills_magician_1_magician, ...skills_magician_2a_wizard, ...skills_magician_2b_sage, ...skills_magician_3a_high_wizard, ...skills_magician_3b_professor, ...skills_magician_4a_warlock, ...skills_magician_4b_sorcerer, ...skills_magician_5a_arch_mage, ...skills_magician_5b_elemental_master, ...skills_archer_1_archer, ...skills_archer_2a_hunter, ...skills_archer_2b_bard_dancer, ...skills_archer_3a_sniper, ...skills_archer_3b_clown_gypsy, ...skills_archer_4a_ranger, ...skills_archer_4b_minstrel_wanderer, ...skills_archer_5a_windhawk, ...skills_archer_5b_troubadour_trouvere, ...skills_merchant_1_merchant, ...skills_merchant_2a_blacksmith, ...skills_merchant_2b_alchemist, ...skills_merchant_3a_whitesmith, ...skills_merchant_3b_creator, ...skills_merchant_4a_mechanic, ...skills_merchant_4b_genetic, ...skills_merchant_5a_meister, ...skills_merchant_5b_biolo, ...skills_thief_1_thief, ...skills_thief_2a_assassin, ...skills_thief_2b_rogue, ...skills_thief_3a_assassin_cross, ...skills_thief_3b_chaser, ...skills_thief_4a_guillotine_cross, ...skills_thief_4b_shadow_chaser, ...skills_thief_5a_shadow_cross, ...skills_thief_5b_abyss_chaser, ...skills_acolyte_1_acolyte, ...skills_acolyte_2a_priest, ...skills_acolyte_2b_monk, ...skills_acolyte_3a_high_priest, ...skills_acolyte_3b_champion, ...skills_acolyte_4a_arch_bishop, ...skills_acolyte_4b_sura, ...skills_acolyte_5a_cardinal, ...skills_acolyte_5b_inquisitor, ...skills_taekwon_1_taekwon, ...skills_taekwon_2a_star_gladiator, ...skills_taekwon_2b_soul_linker, ...skills_taekwon_4a_star_emperor, ...skills_taekwon_4b_soul_reaper, ...skills_taekwon_5a_sky_emperor, ...skills_taekwon_5b_soul_ascetic, ...skills_ninja_1_ninja, ...skills_ninja_4_kagerou_oboro, ...skills_ninja_5_shinkiro_shiranui, ...skills_gunslinger_1_gunslinger, ...skills_gunslinger_4_rebellion, ...skills_gunslinger_5_night_watch, ...skills_druid_1_druid, ...skills_druid_2_karnos, ...skills_druid_5_alitea, ...skills_novice_1_super_novice, ...skills_novice_5_hyper_novice, ...skills_summoner_1_summoner, ...skills_summoner_5_spirit_handler, ...skills_other_spirit, ...skills_other_homunculus, ...skills_other_common];

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
