/**
 * スキル定義 summoner/5-spirit-handler（18 件 / SKILL_ID 1205〜1304 の中から職業ツリーで再抽出）
 *
 * roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { GetTotalSpecStatus } from "../../hmjob-bridge.js";
import { n_A_BaseLV } from "../../ro4-state.js";
import { CSkillData, defineSkill } from "../../CSkillData.js";
import { MIG_PARAM_ID_POW, MIG_PARAM_ID_SPL } from "../../const/EnumMigItemParamId.js";
import { LearnedSkillSearch, UsedSkillSearch } from "../../skill-search-bridge.js";
import {
    SKILL_ID_CHUL_HO_BATTERING, SKILL_ID_DEER_BREEZE, SKILL_ID_DEER_CANON, SKILL_ID_HYUN_ROK_SPIRIT_POWER,
    SKILL_ID_MARIN_FESTIVAL, SKILL_ID_NYANTOMO_KAMESETSU, SKILL_ID_NYANTOMO_KENROKU, SKILL_ID_NYANTOMO_TEKKO,
    SKILL_ID_NYAN_BRESSING, SKILL_ID_RAINBOW_HORN, SKILL_ID_RURTLE_RAMPAGE, SKILL_ID_SAND_FESTIVAL,
    SKILL_ID_SANREI_ITTAI, SKILL_ID_SPIRIT_MASTERY, SKILL_ID_TIGER_HOWLING, SKILL_ID_TIGER_SLASH,
    SKILL_ID_TIGER_STRIKE, SKILL_ID_TURTLE_SPRINKLER
} from "../../skill.dat.js";

export const skills = [
		// ----------------------------------------------------------------
		// スピリットマスタリー
		// ----------------------------------------------------------------
		// SKILL_ID_SPIRIT_MASTERY
		defineSkill(SKILL_ID_SPIRIT_MASTERY, function() {

			this.name = "スピリットマスタリー";
			this.kana = "スヒリツトマスタリイ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 三霊一体
		// ----------------------------------------------------------------
		// SKILL_ID_SANREI_ITTAI
		defineSkill(SKILL_ID_SANREI_ITTAI, function() {
			this.name = "三霊一体";
			this.kana = "サンレイイツタイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 10 + 20 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// にゃんブレッシング
		// ----------------------------------------------------------------
		// SKILL_ID_NYAN_BRESSING
		defineSkill(SKILL_ID_NYAN_BRESSING, function() {

			this.name = "にゃんブレッシング";
			this.kana = "ニヤンフレツシンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 50;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 0;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 3000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 70000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 60 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// マリンフェスティバル
		// ----------------------------------------------------------------
		// SKILL_ID_MARIN_FESTIVAL
		defineSkill(SKILL_ID_MARIN_FESTIVAL, function() {

			this.name = "マリンフェスティバル";
			this.kana = "マリンフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// サンドフェスティバル
		// ----------------------------------------------------------------
		// SKILL_ID_SAND_FESTIVAL
		defineSkill(SKILL_ID_SAND_FESTIVAL, function() {
			this.name = "サンドフェスティバル";
			this.kana = "サントフエステイハル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 1000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// タイガースラッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_SLASH
		defineSkill(SKILL_ID_TIGER_SLASH, function() {
			this.name = "タイガースラッシュ";
			this.kana = "タイカアスラツシユ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.dispHitCount = 2;
			this.Power = function(skillLv, charaData, option) {
				let ratio = 0;
				const state_sanrei_ittai = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0;
				const state_tekko = Math.max(UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO),LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO)) > 0;
				if (state_sanrei_ittai || state_tekko) {
					ratio = 5800 + 500 * skillLv;
					ratio += 200 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					ratio = 4400 + 400 * skillLv;
					ratio += 160 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// POW補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_POW);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);				
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				const state_sanrei_ittai = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0;
				const state_tekko = Math.max(UsedSkillSearch(SKILL_ID_NYANTOMO_TEKKO),LearnedSkillSearch(SKILL_ID_NYANTOMO_TEKKO)) > 0;
				if (state_sanrei_ittai || state_tekko) {
					return this._CriActRate100(skillLv, charaData, specData, mobData);
				}
				return 0;
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		// ----------------------------------------------------------------
		// タイガーハウリング
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_HOWLING
		defineSkill(SKILL_ID_TIGER_HOWLING, function() {
			this.name = "タイガーハウリング";
			this.kana = "タイカアハウリンク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 800 + (skillLv-1)*200;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2000 + (skillLv-1)*500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 10 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// タイガーストライク
		// ----------------------------------------------------------------
		// SKILL_ID_TIGER_STRIKE
		defineSkill(SKILL_ID_TIGER_STRIKE, function() {
			this.name = "タイガーストライク";
			this.kana = "タイカアストライク";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;
			this.CriActRate = (skillLv, charaData, specData, mobData) => {
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 170;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 600 + 200 * skillLv;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// にゃん友 -鉄虎-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_TEKKO
		defineSkill(SKILL_ID_NYANTOMO_TEKKO, function() {

			this.name = "にゃん友 -鉄虎-";
			this.kana = "ニヤントモテツコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// にゃん友 -賢鹿-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_KENROKU
		defineSkill(SKILL_ID_NYANTOMO_KENROKU, function() {

			this.name = "にゃん友 -賢鹿-";
			this.kana = "ニヤントモケンロク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ディアーキャノン
		// ----------------------------------------------------------------
		// SKILL_ID_DEER_CANON
		defineSkill(SKILL_ID_DEER_CANON, function() {
			this.name = "ディアーキャノン";
			this.kana = "テイアアキヤノン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = function(option, mobData, parentSkillId) {
				const rainbow_horn = option.GetOptionValue(0);
				return rainbow_horn;
			}
			this.Power = function(skillLv, charaData, option, mobData, weapon, parentSkillId) {
				let ratio = 0;
				const condition_powerup = UsedSkillSearch(SKILL_ID_SANREI_ITTAI) > 0
										|| UsedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0
										|| LearnedSkillSearch(SKILL_ID_NYANTOMO_KENROKU) > 0;
				if (condition_powerup) {
					// 強化状態
					ratio = 6400 + 800 * skillLv;
					ratio += 350 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				} else {
					// 通常時
					ratio = 4350 + 750 * skillLv;
					ratio += 280 * Math.max(LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY), UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				}
				// SPL補正
				ratio += 5 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);
				// ベースレベル補正
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return 110;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// ディアーブリーズ
		// ----------------------------------------------------------------
		// SKILL_ID_DEER_BREEZE
		defineSkill(SKILL_ID_DEER_BREEZE, function() {
			this.name = "ディアーブリーズ";
			this.kana = "テイアアフリイス";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;
			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500 + 1000 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {
				return 2000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 3000;
			}
		}),

		// ----------------------------------------------------------------
		// レインボーホーン
		// ----------------------------------------------------------------
		// SKILL_ID_RAINBOW_HORN
		defineSkill(SKILL_ID_RAINBOW_HORN, function() {
			this.name = "レインボーホーン";
			this.kana = "レインボーホーン";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 230;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
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
				if (skillLv == 7) {
					return 0;
				}
				return 10000;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 120 * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// タートルスプリンクラー
		// ----------------------------------------------------------------
		// SKILL_ID_TURTLE_SPRINKLER
		defineSkill(SKILL_ID_TURTLE_SPRINKLER, function() {
			this.name = "タートルスプリンクラー";
			this.kana = "タートルスプリンクラー";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 210;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 3000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 0;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
		}),

		// ----------------------------------------------------------------
		// タートルランページ
		// ----------------------------------------------------------------
		// SKILL_ID_RURTLE_RAMPAGE
		defineSkill(SKILL_ID_RURTLE_RAMPAGE, function() {
			this.name = "タートルランページ";
			this.kana = "タートルランページ";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 190;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 4000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 4500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {		// 持続時間
				return [0, 1, 1, 2, 2, 3, 3, 4][skillLv] * 1000;
			}
		}),

		// ----------------------------------------------------------------
		// にゃん友 -亀設-
		// ----------------------------------------------------------------
		// SKILL_ID_NYANTOMO_KAMESETSU
		defineSkill(SKILL_ID_NYANTOMO_KAMESETSU, function() {

			this.name = "にゃん友 -亀設-";
			this.kana = "ニヤントモカメセツ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		/** タイガーバトリング */
		// SKILL_ID_CHUL_HO_BATTERING
		defineSkill(SKILL_ID_CHUL_HO_BATTERING, function() {
			this.name = "タイガーバトリング";
			this.kana = "タイガーバトリング";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;			
			this.element = CSkillData.ELEMENT_VOID;
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const spirit_mastery_lv = Math.max(UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY), LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				ratio += 1475 + 325 * skillLv;
				ratio += 15 * GetTotalSpecStatus(MIG_PARAM_ID_POW);	// Pow係数未検証
				ratio += 75 * spirit_mastery_lv;	// 修練係数未検証
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 600 + 200 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 1500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

		/** ディアースピリットパワー */
		// SKILL_ID_HYUN_ROK_SPIRIT_POWER
		defineSkill(SKILL_ID_HYUN_ROK_SPIRIT_POWER, function() {
			this.name = "ディアースピリットパワー";
			this.kana = "ディアースピリットパワー";
			this.maxLv = 7;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;			
			this.element = function(option) {
				const rainbow_horn_lv = option.GetOptionValue(0);
				return rainbow_horn_lv;
			}
			this.Power = function(skillLv, charaData, option) {       // スキル倍率
				let ratio = 0;
				const spirit_mastery_lv = Math.max(UsedSkillSearch(SKILL_ID_SPIRIT_MASTERY), LearnedSkillSearch(SKILL_ID_SPIRIT_MASTERY));
				ratio += 2650 + 650 * skillLv;
				ratio += 30 * GetTotalSpecStatus(MIG_PARAM_ID_SPL);	// Spl係数未検証
				ratio += 180 * spirit_mastery_lv;	// 修練係数未検証
				return Math.floor(ratio * n_A_BaseLV / 100);
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 170;
			}
			this.CostAP = function(skillLv, charaDataManger) {          // 消費AP
				return 0;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return -500 + 1000 * skillLv;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 500;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 500 + 500 * skillLv;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 500;
			}
			this.LifeTime = function(skillLv, charaDataManger) {        // 持続時間
				return 0;
			}
			this.CriActRate = (skillLv, charaData, specData, mobData) => {              // クリティカル発生率
				return 0;
				//return this._CriActRate100(skillLv, charaData, specData, mobData);
			}
			this.CriDamageRate = (skillLv, charaData, specData, mobData) => {           // クリティカルダメージ倍率
				return 0;
				//return this._CriDamageRate100(skillLv, charaData, specData, mobData) / 2;
			}
		}),

];
