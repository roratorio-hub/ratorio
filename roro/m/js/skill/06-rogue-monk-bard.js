/**
 * スキル定義 06-rogue-monk-bard（SKILL_ID 167–205 / 39 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CCharaConfNizi } from '../CCharaConfNizi.js';
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ITEM_KIND_MUSICAL } from '../const/EnumItemKind.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../mobconfplayer.js';
import {
    SKILL_ID_ASHURA_HAOKEN, SKILL_ID_BACK_STAB, SKILL_ID_BAKURETSU_HADO, SKILL_ID_BRAGINO_UTA, SKILL_ID_CLEANER,
    SKILL_ID_CLONE_SKILL, SKILL_ID_COMPULSION_DISCOUNT, SKILL_ID_FLAG_GRAPHITY, SKILL_ID_FUKYOWAON,
    SKILL_ID_GAKKINO_RENSHU, SKILL_ID_GANGSTAR_PARADISE, SKILL_ID_GRAPHITY, SKILL_ID_HAKKEI, SKILL_ID_IBUKI,
    SKILL_ID_IDUNNNO_RINGO, SKILL_ID_INTIMIDATE, SKILL_ID_KIDATSU, SKILL_ID_KIKO, SKILL_ID_KONGO, SKILL_ID_KUCHIBUE,
    SKILL_ID_MIKIRI, SKILL_ID_MORYUKEN, SKILL_ID_MUSICAL_STRIKE, SKILL_ID_RENDASHO, SKILL_ID_SAMUI_JOKE,
    SKILL_ID_SANDANSHO, SKILL_ID_SHIDAN, SKILL_ID_SHIRAHADORI, SKILL_ID_SNATCHER, SKILL_ID_STEAL_COIN,
    SKILL_ID_STRIP_ARMER, SKILL_ID_STRIP_HELM, SKILL_ID_STRIP_SHIELD, SKILL_ID_STRIP_WEAPON,
    SKILL_ID_SURPRISE_ATTACK, SKILL_ID_TEKKEN, SKILL_ID_TUNNEL_DRIVE, SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_ZANEI
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// スナッチャー
		// ----------------------------------------------------------------
		// SKILL_ID_SNATCHER
		defineSkill(SKILL_ID_SNATCHER, function() {

			this.name = "スナッチャー";
			this.kana = "スナツチヤア";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// スティールコイン
		// ----------------------------------------------------------------
		// SKILL_ID_STEAL_COIN
		defineSkill(SKILL_ID_STEAL_COIN, function() {

			this.name = "スティールコイン";
			this.kana = "ステイイルコイン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// バックスタブ
		// ----------------------------------------------------------------
		// SKILL_ID_BACK_STAB
		defineSkill(SKILL_ID_BACK_STAB, function() {

			this.name = "バックスタブ";
			this.kana = "ハツクスタフ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 16;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 300 + 40 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// トンネルドライブ
		// ----------------------------------------------------------------
		// SKILL_ID_TUNNEL_DRIVE
		defineSkill(SKILL_ID_TUNNEL_DRIVE, function() {

			this.name = "トンネルドライブ";
			this.kana = "トンネルトライフ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// サプライズアタック
		// ----------------------------------------------------------------
		// SKILL_ID_SURPRISE_ATTACK
		defineSkill(SKILL_ID_SURPRISE_ATTACK, function() {

			this.name = "サプライズアタック";
			this.kana = "サフライスアタツク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 80 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_WEAPON
		defineSkill(SKILL_ID_STRIP_WEAPON, function() {

			this.name = "ストリップウェポン";
			this.kana = "ストリツフウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップシールド
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_SHIELD
		defineSkill(SKILL_ID_STRIP_SHIELD, function() {

			this.name = "ストリップシールド";
			this.kana = "ストリツフシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップアーマー
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_ARMER
		defineSkill(SKILL_ID_STRIP_ARMER, function() {

			this.name = "ストリップアーマー";
			this.kana = "ストリツフアアマア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ストリップヘルム
		// ----------------------------------------------------------------
		// SKILL_ID_STRIP_HELM
		defineSkill(SKILL_ID_STRIP_HELM, function() {

			this.name = "ストリップヘルム";
			this.kana = "ストリツフヘルム";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 3000;

				}

				return 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 10000;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// インティミデイト
		// ----------------------------------------------------------------
		// SKILL_ID_INTIMIDATE
		defineSkill(SKILL_ID_INTIMIDATE, function() {

			this.name = "インティミデイト";
			this.kana = "インテイミテイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 3 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 30 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// グラフィティ
		// ----------------------------------------------------------------
		// SKILL_ID_GRAPHITY
		defineSkill(SKILL_ID_GRAPHITY, function() {

			this.name = "グラフィティ";
			this.kana = "クラフイテイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// フラッググラフィティ
		// ----------------------------------------------------------------
		// SKILL_ID_FLAG_GRAPHITY
		defineSkill(SKILL_ID_FLAG_GRAPHITY, function() {

			this.name = "フラッググラフィティ";
			this.kana = "フラツククラフイテイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// クリーナー
		// ----------------------------------------------------------------
		// SKILL_ID_CLEANER
		defineSkill(SKILL_ID_CLEANER, function() {

			this.name = "クリーナー";
			this.kana = "クリイナア";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

		}),

		// ----------------------------------------------------------------
		// ギャングスターパラダイス
		// ----------------------------------------------------------------
		// SKILL_ID_GANGSTAR_PARADISE
		defineSkill(SKILL_ID_GANGSTAR_PARADISE, function() {

			this.name = "ギャングスターパラダイス";
			this.kana = "キヤンクスタアハラタイス";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// コンパルションディスカウント
		// ----------------------------------------------------------------
		// SKILL_ID_COMPULSION_DISCOUNT
		defineSkill(SKILL_ID_COMPULSION_DISCOUNT, function() {

			this.name = "コンパルションディスカウント";
			this.kana = "コンハルシヨンテイスカウント";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// クローンスキル
		// ----------------------------------------------------------------
		// SKILL_ID_CLONE_SKILL
		defineSkill(SKILL_ID_CLONE_SKILL, function() {

			this.name = "クローンスキル";
			this.kana = "クロオンスキル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 鉄拳
		// ----------------------------------------------------------------
		// SKILL_ID_TEKKEN
		defineSkill(SKILL_ID_TEKKEN, function() {

			this.name = "鉄拳";
			this.kana = "テツケン";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 息吹
		// ----------------------------------------------------------------
		// SKILL_ID_IBUKI
		defineSkill(SKILL_ID_IBUKI, function() {

			this.name = "息吹";
			this.kana = "イフキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 気功(気弾数)
		// ----------------------------------------------------------------
		// SKILL_ID_KIKO
		defineSkill(SKILL_ID_KIKO, function() {

			this.name = "気功(気弾数)";
			this.kana = "キコウキタンスウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 8;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 気奪
		// ----------------------------------------------------------------
		// SKILL_ID_KIDATSU
		defineSkill(SKILL_ID_KIDATSU, function() {

			this.name = "気奪";
			this.kana = "キタツ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// 三段掌
		// ----------------------------------------------------------------
		// SKILL_ID_SANDANSHO
		defineSkill(SKILL_ID_SANDANSHO, function() {

			this.name = "三段掌";
			this.kana = "サンタンシヨウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 連打掌
		// ----------------------------------------------------------------
		// SKILL_ID_RENDASHO
		defineSkill(SKILL_ID_RENDASHO, function() {

			this.name = "連打掌";
			this.kana = "レンタシヨウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 250 + 50 * skillLv;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 4;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 1000 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 猛龍拳
		// ----------------------------------------------------------------
		// SKILL_ID_MORYUKEN
		defineSkill(SKILL_ID_MORYUKEN, function() {

			this.name = "猛龍拳";
			this.kana = "モウリユウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_IRREGULAR_BATTLE_TIME;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 1 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 450 + 50 * skillLv;
			}

			this.DelayTimeForceMotion = function(skillLv, charaDataManger) {
				return 700 - (4 * charaDataManger.GetCharaAgi())
						- (2 * charaDataManger.GetCharaDex());
			}

		}),

		// ----------------------------------------------------------------
		// 残影
		// ----------------------------------------------------------------
		// SKILL_ID_ZANEI
		defineSkill(SKILL_ID_ZANEI, function() {

			this.name = "残影";
			this.kana = "サンエイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 14;
			}

		}),

		// ----------------------------------------------------------------
		// 見切り
		// ----------------------------------------------------------------
		// SKILL_ID_MIKIRI
		defineSkill(SKILL_ID_MIKIRI, function() {

			this.name = "見切り";
			this.kana = "ミキリ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 指弾(Hit数=気功)
		// ----------------------------------------------------------------
		// SKILL_ID_SHIDAN
		defineSkill(SKILL_ID_SHIDAN, function() {

			this.name = "指弾(Hit数=気功)";
			this.kana = "シタン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 125 + 25 * skillLv;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return kidan;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				var kidan = 0;

				// 気弾数
				kidan = this.CountOfKidan(charaDataManger);

				// 補正
				if (kidan > skillLv) {
					kidan = skillLv;
				}

				return 1000 + 1000 * kidan;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

			this.CountOfKidan = function(charaDataManger) {
				var kidan = 0;

				// モンク系の自己支援
				kidan = charaDataManger.UsedSkillSearch(SKILL_ID_KIKO);

				// 気功転移等による二次職支援
				if (kidan == 0) {
					kidan = charaDataManger
							.GetCharaConfNizi(CCharaConfNizi.CONF_ID_KIKO);
				}

				return kidan;
			}

		}),

		// ----------------------------------------------------------------
		// 発勁
		// ----------------------------------------------------------------
		// SKILL_ID_HAKKEI
		defineSkill(SKILL_ID_HAKKEI, function() {

			this.name = "発勁";
			this.kana = "ハツケイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 6 + 4 * skillLv;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 100 + 75 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 白刃取り
		// ----------------------------------------------------------------
		// SKILL_ID_SHIRAHADORI
		defineSkill(SKILL_ID_SHIRAHADORI, function() {

			this.name = "白刃取り";
			this.kana = "シラハトリ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// 爆裂波動
		// ----------------------------------------------------------------
		// SKILL_ID_BAKURETSU_HADO
		defineSkill(SKILL_ID_BAKURETSU_HADO, function() {

			this.name = "爆裂波動";
			this.kana = "ハクレツハトウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// 金剛
		// ----------------------------------------------------------------
		// SKILL_ID_KONGO
		defineSkill(SKILL_ID_KONGO, function() {

			this.name = "金剛";
			this.kana = "コンコウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 200;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

		}),

		// ----------------------------------------------------------------
		// 阿修羅覇凰拳(SP調整可)
		// ----------------------------------------------------------------
		// SKILL_ID_ASHURA_HAOKEN
		defineSkill(SKILL_ID_ASHURA_HAOKEN, function() {

			this.name = "阿修羅覇凰拳(SP調整可)";
			this.kana = "アシユラハオウケン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL
					| CSkillData.TYPE_100HIT;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;

			this.CostVary = function(skillLv, charaDataManger) {
				return 100;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 4500 - 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 楽器の練習
		// ----------------------------------------------------------------
		// SKILL_ID_GAKKINO_RENSHU
		defineSkill(SKILL_ID_GAKKINO_RENSHU, function() {
			this.name = "楽器の練習";
			this.kana = "カツキノレンシユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ミュージカルストライク
		// ----------------------------------------------------------------
		// SKILL_ID_MUSICAL_STRIKE
		defineSkill(SKILL_ID_MUSICAL_STRIKE, function() {
			this.name = "(×)ミュージカルストライク";
			this.kana = "ミユウシカルストライク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.WeaponCondition = function(weapon) {
				return ITEM_KIND_MUSICAL === weapon;
			}
			this.element = function(option) {
				return GetEquippedTotalSPArrow(ITEM_SP_ELEMENTAL);
			}
			this.CostFixed = function(skillLv, charaDataManger) {
				return -1 + 2 * skillLv;
			}
			this.Power = function(skillLv, charaDataManger) {
				return 110 + 40 * skillLv;
			}
			this.hitCount = function(skillLv, option) {
				return 2;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1500;
			}

		}),

		// ----------------------------------------------------------------
		// 不協和音
		// ----------------------------------------------------------------
		// SKILL_ID_FUKYOWAON
		defineSkill(SKILL_ID_FUKYOWAON, function() {
			this.name = "(×)不協和音";
			this.kana = "フキヨウワオン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_FORCE_VANITY;
			this.WeaponCondition = function(weapon) {
				return ITEM_KIND_MUSICAL === weapon;
			}
			this.Power = function(skillLv, charaData) {       // スキル倍率
				return 110 + 50 * skillLv;	// TODO: 本当はJob補正があるはず
			}
			this.CostFixed = function(skillLv, charaDataManger) {       // 消費SP
				return 32 + 3 * skillLv;
			}
			this.CastTimeVary = function(skillLv, charaDataManger) {    // 変動詠唱
				return 1000;
			}
			this.CastTimeFixed = function(skillLv, charaDataManger) {   // 固定詠唱
				return 1000;
			}
			this.DelayTimeCommon = function(skillLv, charaDataManger) { // ディレイ
				return 2000;
			}
			this.CoolTime = function(skillLv, charaDataManger) {        // クールタイム
				return 5000;
			}
		}),

		// ----------------------------------------------------------------
		// 寒いジョーク
		// ----------------------------------------------------------------
		// SKILL_ID_SAMUI_JOKE
		defineSkill(SKILL_ID_SAMUI_JOKE, function() {

			this.name = "寒いジョーク";
			this.kana = "サムイシヨオク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10 + 2 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 4000;
			}

		}),

		// ----------------------------------------------------------------
		// 口笛
		// ----------------------------------------------------------------
		// SKILL_ID_KUCHIBUE
		defineSkill(SKILL_ID_KUCHIBUE, function() {

			this.name = "口笛";
			this.kana = "クチフエ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 4 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 夕陽のアサシンクロス
		// ----------------------------------------------------------------
		// SKILL_ID_YUHINO_ASSASINCROSS
		defineSkill(SKILL_ID_YUHINO_ASSASINCROSS, function() {

			this.name = "夕陽のアサシンクロス";
			this.kana = "ユウヒノアサシンクロス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ブラギの詩
		// ----------------------------------------------------------------
		// SKILL_ID_BRAGINO_UTA
		defineSkill(SKILL_ID_BRAGINO_UTA, function() {

			this.name = "ブラギの詩";
			this.kana = "フラキノウタ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// イドゥンの林檎
		// ----------------------------------------------------------------
		// SKILL_ID_IDUNNNO_RINGO
		defineSkill(SKILL_ID_IDUNNNO_RINGO, function() {

			this.name = "イドゥンの林檎";
			this.kana = "イトウンノリンコ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		}),

];
