/**
 * スキル定義 magician/5a-arch-mage（19 件 / SKILL_ID 1053〜1318 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from '../../../../../ro4/m/js/hmjob-bridge.js';
import { n_A_BaseLV } from '../../../../../ro4/m/js/ro4-state.js';
import { CSkillData, defineSkill } from '../../CSkillData.js';
import { MIG_PARAM_ID_SPL } from '../../const/EnumMigItemParamId.js';
import { UsedSkillSearch } from '../../skill-search-bridge.js';
import {
    SKILL_ID_ALL_BLOOM, SKILL_ID_ASTRAL_STRIKE, SKILL_ID_CLIMAX, SKILL_ID_CRYMSON_ARROW, SKILL_ID_CRYSTAL_IMPACT,
    SKILL_ID_DEADLY_PROJECTION, SKILL_ID_DESTRACTIVE_HURRICANE, SKILL_ID_ENERGY_CONVERSION,
    SKILL_ID_FLORAL_FLARE_ROAD, SKILL_ID_FROZEN_SLASH, SKILL_ID_MYSTERY_ILLUSION, SKILL_ID_RAIN_OF_CRYSTAL,
    SKILL_ID_ROCK_DOWN, SKILL_ID_RYOTETUSE_SHUREN, SKILL_ID_SOUL_VULKUN_STRIKE, SKILL_ID_STORM_CANNON,
    SKILL_ID_STRATUM_TREAMER, SKILL_ID_TORNADE_STORM, SKILL_ID_VIOLENT_QUAKE, SKILL_ID_CLIMAX_HURRICANE_STATE
} from '../../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// デッドリープロジェクション
		// ----------------------------------------------------------------
		// SKILL_ID_DEADLY_PROJECTION
		defineSkill(SKILL_ID_DEADLY_PROJECTION, function() {
			this.name = "デッドリープロジェクション";
			this.kana = "テツトリイフロシエクシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_UNDEAD;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 160;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 5000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {
				return 5000 + 1000 * skillLv;
			}
		}),

		// ----------------------------------------------------------------
		// ディストラクティブハリケーン
		// ----------------------------------------------------------------
		// SKILL_ID_DESTRACTIVE_HURRICANE
		defineSkill(SKILL_ID_DESTRACTIVE_HURRICANE, function() {
			this.name = "ディストラクティブハリケーン";
			this.kana = "テイストラクテイフハリケエン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_CLIMAX) == 4) {
					return 0;
				}
				if (parentSkillId === undefined) {
					// 初段ＨＩＴの場合
					ratio = 4500 + 4500 * skillLv;
					ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					ratio = Math.floor(ratio * n_A_BaseLV / 100);
				} else {
					// クライマックスLv1 追撃の場合
					// SPL補正とベースレベル補正は乗らない
					ratio = 5000;
				}
				return ratio;
			}			
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// クライマックスハリケーン状態
		// ----------------------------------------------------------------
		// SKILL_ID_CLIMAX_HURRICANE_STATE
		defineSkill(SKILL_ID_CLIMAX_HURRICANE_STATE, function() {

			this.name = "クライマックスハリケーン状態";
			this.kana = "クライマツクスハリケエンシヨウタイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// レインオブクリスタル
		// ----------------------------------------------------------------
		// SKILL_ID_RAIN_OF_CRYSTAL
		defineSkill(SKILL_ID_RAIN_OF_CRYSTAL, function() {
			this.name = "レインオブクリスタル";
			this.kana = "レインオフクリスタル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 270;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 4000;
			}
		}),

		// ----------------------------------------------------------------
		// ミステリーイリュージョン
		// ----------------------------------------------------------------
		// SKILL_ID_MYSTERY_ILLUSION
		defineSkill(SKILL_ID_MYSTERY_ILLUSION, function() {
			this.name = "ミステリーイリュージョン";
			this.kana = "ミステリイイリユウシヨン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_DARK;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				// 基本倍率
				ratio = 1000 + 400 * skillLv;
				// SPL補正
				ratio += 10 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 450;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// バイオレントクエイク
		// ----------------------------------------------------------------
		// SKILL_ID_VIOLENT_QUAKE
		defineSkill(SKILL_ID_VIOLENT_QUAKE, function() {
			this.name = "バイオレントクエイク";
			this.kana = "ハイオレントクエイク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.ground_installation = true;
			this.damageInterval = 300;
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (UsedSkillSearch(SKILL_ID_CLIMAX) == 4) {
					return 0;
				}
				// 基本倍率
				ratio = 6000 + 600 * skillLv;
				// SPL補正
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 410;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ソウルバルカンストライク
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_VULKUN_STRIKE
		defineSkill(SKILL_ID_SOUL_VULKUN_STRIKE, function() {
			this.name = "ソウルバルカンストライク";
			this.kana = "ソウルハルカンストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_PSYCO;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 330;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ストラタムトレマー
		// ----------------------------------------------------------------
		// SKILL_ID_STRATUM_TREAMER
		defineSkill(SKILL_ID_STRATUM_TREAMER, function() {
			this.name = "ストラタムトレマー";
			this.kana = "ストラタムトレマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 340;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// オールブルーム
		// ----------------------------------------------------------------
		// SKILL_ID_ALL_BLOOM
		defineSkill(SKILL_ID_ALL_BLOOM, function() {
			this.name = "オールブルーム";
			this.kana = "オオルフルウム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.ground_installation = function(option) {
				const NotClimax5 = UsedSkillSearch(SKILL_ID_CLIMAX) != 5;
				const groundDamage = option.GetOptionValue(0) == 0;
				return NotClimax5 || groundDamage;
			}
			this.damageInterval = function(skillLv) {
				const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
				return climaxLv == 1 ? 150: 300;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				const climaxLv = UsedSkillSearch(SKILL_ID_CLIMAX);
				const additionalDamage = option.GetOptionValue(0) == 1;
				if (climaxLv == 4) {
					return 0;
				}
				if (climaxLv == 5 && additionalDamage) {
					// 追撃ダメージ
					return 50000 + 10000 * skillLv;
				} else {
					// 設置ダメージ
					let ratio = 0;
					ratio = 6000 + 600 * skillLv;
					ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
					return Math.floor(ratio * n_A_BaseLV / 100);
				}
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 450;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// クリスタルインパクト
		// ----------------------------------------------------------------
		// SKILL_ID_CRYSTAL_IMPACT
		defineSkill(SKILL_ID_CRYSTAL_IMPACT, function() {
			this.name = "クリスタルインパクト";
			this.kana = "クリスタルインハクト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.hitCount = function(skillLv, option, weapon, parentSkillId) {
				const climax2 = (UsedSkillSearch(SKILL_ID_CLIMAX) == 2);
				const firstDamage = (parentSkillId == undefined);
				return (firstDamage && climax2) ? 2: 1;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				if (parentSkillId == undefined) {
					// 初撃
					ratio = 4500 + 4500 * skillLv;
					ratio += 90 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				} else {
					// 追撃
					ratio = 1500;
					ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				}
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 300 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// トルネードストーム
		// ----------------------------------------------------------------
		// SKILL_ID_TORNADE_STORM
		defineSkill(SKILL_ID_TORNADE_STORM, function() {
			this.name = "トルネードストーム";
			this.kana = "トルネエトストオム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// フローラルフレアロード
		// ----------------------------------------------------------------
		// SKILL_ID_FLORAL_FLARE_ROAD
		defineSkill(SKILL_ID_FLORAL_FLARE_ROAD, function() {
			this.name = "フローラルフレアロード";
			this.kana = "フロオラルフレアロオト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 380;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 2500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 3000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// クライマックス
		// ----------------------------------------------------------------
		// SKILL_ID_CLIMAX
		defineSkill(SKILL_ID_CLIMAX, function() {
			this.name = "クライマックス";
			this.kana = "クライマツクス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 610;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 20 + 10 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// アストラルストライク
		// ----------------------------------------------------------------
		// SKILL_ID_ASTRAL_STRIKE
		defineSkill(SKILL_ID_ASTRAL_STRIKE, function() {
			this.name = "アストラルストライク";
			this.kana = "アストラルストライク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 680;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 16000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500 + 100 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 5000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// ロックダウン
		// ----------------------------------------------------------------
		// SKILL_ID_ROCK_DOWN
		defineSkill(SKILL_ID_ROCK_DOWN, function() {
			this.name = "ロックダウン";
			this.kana = "ロツクタウン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_EARTH;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// ストームキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_STORM_CANNON
		defineSkill(SKILL_ID_STORM_CANNON, function() {
			this.name = "ストームキャノン";
			this.kana = "ストオムキヤノン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WIND;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// クリムゾンアロー
		// ----------------------------------------------------------------
		// SKILL_ID_CRYMSON_ARROW
		defineSkill(SKILL_ID_CRYMSON_ARROW, function() {
			this.name = "クリムゾンアロー";
			this.kana = "クリムソンアロオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_FIRE;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 360;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// フローズンスラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_FROZEN_SLASH
		defineSkill(SKILL_ID_FROZEN_SLASH, function() {
			this.name = "フローズンスラッシュ";
			this.kana = "フロオスンスラツシユ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_WATER;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 330;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1400 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 4000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

		// ----------------------------------------------------------------
		// 両手杖修練
		// ----------------------------------------------------------------
		// SKILL_ID_RYOTETUSE_SHUREN
		defineSkill(SKILL_ID_RYOTETUSE_SHUREN, function() {
			this.name = "両手杖修練";
			this.kana = "リヨウテツエシユウレン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** エナジーコンバージョン */
		// SKILL_ID_ENERGY_CONVERSION
		defineSkill(SKILL_ID_ENERGY_CONVERSION, function() {
			this.name = "エナジーコンバージョン";
			this.kana = "エナジーコンバージョン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return skillLv;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 0;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
		}),

];
