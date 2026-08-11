/**
 * スキル定義 29-doram-summoner（SKILL_ID 902–943 / 42 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import {
    MOB_CONF_PLAYER_ID_SENTO_AREA, MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM, n_B_TAISEI
} from '../mobconfplayer.js';
import {
    SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_ARCLOUSE_DASH, SKILL_ID_CARROT_BEAT, SKILL_ID_CHATTERING,
    SKILL_ID_DAICHINO_CHIKARA, SKILL_ID_DAICHINO_TAMASHI, SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER,
    SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO, SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS,
    SKILL_ID_DORAM_KIHON_SKILL, SKILL_ID_EBI_PARTY, SKILL_ID_EBI_ZANMAI, SKILL_ID_GROOMING, SKILL_ID_HIKKAKU,
    SKILL_ID_INUHAKKA_METEOR, SKILL_ID_INUHAKKA_SHOWER, SKILL_ID_KAKURERU, SKILL_ID_KAMITSUKU, SKILL_ID_KEIKAI,
    SKILL_ID_MAGURO_SHIELD, SKILL_ID_MATATABINO_NEKKO, SKILL_ID_MATATABI_LANCE, SKILL_ID_MURENO_CHIKARA,
    SKILL_ID_MYAUMYAU, SKILL_ID_NODOWO_NARASU, SKILL_ID_NYAN_GRASS, SKILL_ID_NYAN_JAMP, SKILL_ID_NYAN_TAMASHI,
    SKILL_ID_OTORO, SKILL_ID_PIKKI_TSUKI, SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_SAVAGENO_TAMASHI,
    SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI, SKILL_ID_SEIMEINO_CHIKARA, SKILL_ID_SEIMEINO_TAMASHI,
    SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, SKILL_ID_SHINSENNA_EBI, SKILL_ID_SOUL_ATTACK, SKILL_ID_TAROUNO_KIZU,
    SKILL_ID_UMINO_CHIKARA, SKILL_ID_UMINO_TAMASHI, SKILL_ID_UZUKUMARU
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// ドラム基本スキル
		// ----------------------------------------------------------------
		// SKILL_ID_DORAM_KIHON_SKILL
		defineSkill(SKILL_ID_DORAM_KIHON_SKILL, function() {

			this.name = "ドラム基本スキル";
			this.kana = "トラムキホンスキル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// かみつく
		// ----------------------------------------------------------------
		// SKILL_ID_KAMITSUKU
		defineSkill(SKILL_ID_KAMITSUKU, function() {

			this.name = "かみつく";
			this.kana = "かみつく";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 500;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// かくれる
		// ----------------------------------------------------------------
		// SKILL_ID_KAKURERU
		defineSkill(SKILL_ID_KAKURERU, function() {

			this.name = "かくれる";
			this.kana = "かくれる";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 5;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 500;
			}

		}),

		// ----------------------------------------------------------------
		// ひっかく
		// ----------------------------------------------------------------
		// SKILL_ID_HIKKAKU
		defineSkill(SKILL_ID_HIKKAKU, function() {

			this.name = "ひっかく";
			this.kana = "ひつかく";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 400 + 200 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// うずくまる
		// ----------------------------------------------------------------
		// SKILL_ID_UZUKUMARU
		defineSkill(SKILL_ID_UZUKUMARU, function() {

			this.name = "うずくまる";
			this.kana = "うすくまる";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {

				// 特定の戦闘エリアでの補正
				switch (n_B_TAISEI[MOB_CONF_PLAYER_ID_SENTO_AREA]) {

				case MOB_CONF_PLAYER_ID_SENTO_AREA_YE_COLOSSEUM:
					return 1500;

				}

				return 0;
			}

		}),

		// ----------------------------------------------------------------
		// ニャンジャンプ
		// ----------------------------------------------------------------
		// SKILL_ID_NYAN_JAMP
		defineSkill(SKILL_ID_NYAN_JAMP, function() {

			this.name = "ニャンジャンプ";
			this.kana = "ニヤンシヤンフ";
			this.maxLv = 3;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// にゃん魂
		// ----------------------------------------------------------------
		// SKILL_ID_NYAN_TAMASHI
		defineSkill(SKILL_ID_NYAN_TAMASHI, function() {

			this.name = "にゃん魂";
			this.kana = "にやんたましい";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ソウルアタック
		// ----------------------------------------------------------------
		// SKILL_ID_SOUL_ATTACK
		defineSkill(SKILL_ID_SOUL_ATTACK, function() {

			this.name = "ソウルアタック";
			this.kana = "ソウルアタツク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 新鮮なエビ
		// ----------------------------------------------------------------
		// SKILL_ID_SHINSENNA_EBI
		defineSkill(SKILL_ID_SHINSENNA_EBI, function() {

			this.name = "新鮮なエビ";
			this.kana = "シンセンナエヒ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エビ三昧
		// ----------------------------------------------------------------
		// SKILL_ID_EBI_ZANMAI
		defineSkill(SKILL_ID_EBI_ZANMAI, function() {

			this.name = "エビ三昧";
			this.kana = "エヒサンマイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 100;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 大トロ
		// ----------------------------------------------------------------
		// SKILL_ID_OTORO
		defineSkill(SKILL_ID_OTORO, function() {

			this.name = "大トロ";
			this.kana = "オオトロ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 500 : 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv <= 2) ? 0 : 500;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// マグロシールド
		// ----------------------------------------------------------------
		// SKILL_ID_MAGURO_SHIELD
		defineSkill(SKILL_ID_MAGURO_SHIELD, function() {

			this.name = "マグロシールド";
			this.kana = "マクロシイルト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 海の力
		// ----------------------------------------------------------------
		// SKILL_ID_UMINO_CHIKARA
		defineSkill(SKILL_ID_UMINO_CHIKARA, function() {

			this.name = "海の力";
			this.kana = "ウミノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// シーフード系習得レベル合計
		// ----------------------------------------------------------------
		// SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI
		defineSkill(SKILL_ID_SEAFOOD_KEI_SHUTOKU_LEVEL_GOKEI, function() {

			this.name = "シーフード系習得レベル合計";
			this.kana = "シイフウトケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// グルーミング
		// ----------------------------------------------------------------
		// SKILL_ID_GROOMING
		defineSkill(SKILL_ID_GROOMING, function() {

			this.name = "グルーミング";
			this.kana = "クルウミンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// のどを鳴らす
		// ----------------------------------------------------------------
		// SKILL_ID_NODOWO_NARASU
		defineSkill(SKILL_ID_NODOWO_NARASU, function() {

			this.name = "のどを鳴らす";
			this.kana = "ノトヲナラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// エビパーティー
		// ----------------------------------------------------------------
		// SKILL_ID_EBI_PARTY
		defineSkill(SKILL_ID_EBI_PARTY, function() {

			this.name = "エビパーティー";
			this.kana = "エヒハアテイイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// 海の魂
		// ----------------------------------------------------------------
		// SKILL_ID_UMINO_TAMASHI
		defineSkill(SKILL_ID_UMINO_TAMASHI, function() {

			this.name = "海の魂";
			this.kana = "ウミノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// マタタビランス
		// ----------------------------------------------------------------
		// SKILL_ID_MATATABI_LANCE
		defineSkill(SKILL_ID_MATATABI_LANCE, function() {

			this.name = "マタタビランス";
			this.kana = "マタタヒランス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// マタタビの根っこ
		// ----------------------------------------------------------------
		// SKILL_ID_MATATABINO_NEKKO
		defineSkill(SKILL_ID_MATATABINO_NEKKO, function() {

			this.name = "マタタビの根っこ";
			this.kana = "マタタヒノネツコ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 3) ? 1000 : (2500 - 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : -500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// イヌハッカメテオ
		// ----------------------------------------------------------------
		// SKILL_ID_INUHAKKA_METEOR
		defineSkill(SKILL_ID_INUHAKKA_METEOR, function() {

			this.name = "イヌハッカメテオ";
			this.kana = "イヌハツカメテオ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_MAGICAL;
			this.range = CSkillData.RANGE_MAGIC;
			this.element = CSkillData.ELEMENT_SPECIAL;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.Power = function(skillLv, charaDataManger) {
				return 700;
			}

			this.hitCount = function(skillLv, charaDataManger) {
				return -1;
			}

			this.dispHitCount = function(skillLv, charaDataManger) {
				return 7;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 1000 - 500 * Math.floor(skillLv / 2);
			}

		}),

		// ----------------------------------------------------------------
		// (×)イヌハッカシャワー
		// ----------------------------------------------------------------
		// SKILL_ID_INUHAKKA_SHOWER
		defineSkill(SKILL_ID_INUHAKKA_SHOWER, function() {

			this.name = "(×)イヌハッカシャワー";
			this.kana = "イヌハツカシヤワア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 80;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 6000, 4000, 2000, 1000, 0 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 大地の力
		// ----------------------------------------------------------------
		// SKILL_ID_DAICHINO_CHIKARA
		defineSkill(SKILL_ID_DAICHINO_CHIKARA, function() {

			this.name = "大地の力";
			this.kana = "タイチノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// プラント系習得レベル合計
		// ----------------------------------------------------------------
		// SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI
		defineSkill(SKILL_ID_PLANT_KEI_SHUTOKU_LEVEL_GOKEI, function() {

			this.name = "プラント系習得レベル合計";
			this.kana = "フラントケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// チャタリング
		// ----------------------------------------------------------------
		// SKILL_ID_CHATTERING
		defineSkill(SKILL_ID_CHATTERING, function() {

			this.name = "チャタリング";
			this.kana = "チヤタリンク";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ミャウミャウ
		// ----------------------------------------------------------------
		// SKILL_ID_MYAUMYAU
		defineSkill(SKILL_ID_MYAUMYAU, function() {

			this.name = "ミャウミャウ";
			this.kana = "ミヤウミヤウ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 180;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// ニャングラス
		// ----------------------------------------------------------------
		// SKILL_ID_NYAN_GRASS
		defineSkill(SKILL_ID_NYAN_GRASS, function() {

			this.name = "ニャングラス";
			this.kana = "ニヤンクラス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 140;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 1000 : (-500 + 500 * skillLv);
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 1000 : 0;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 6000, 4000, 2000, 1000, 0 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 3000;
			}

		}),

		// ----------------------------------------------------------------
		// 大地の魂
		// ----------------------------------------------------------------
		// SKILL_ID_DAICHINO_TAMASHI
		defineSkill(SKILL_ID_DAICHINO_TAMASHI, function() {

			this.name = "大地の魂";
			this.kana = "タイチノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ピッキ突き
		// ----------------------------------------------------------------
		// SKILL_ID_PIKKI_TSUKI
		defineSkill(SKILL_ID_PIKKI_TSUKI, function() {

			this.name = "ピッキ突き";
			this.kana = "ヒツキツキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return -500 + 500 * skillLv;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アクラウスダッシュ
		// ----------------------------------------------------------------
		// SKILL_ID_ARCLOUSE_DASH
		defineSkill(SKILL_ID_ARCLOUSE_DASH, function() {

			this.name = "アクラウスダッシュ";
			this.kana = "アクラウスタツシュ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

		}),

		// ----------------------------------------------------------------
		// タロウの傷
		// ----------------------------------------------------------------
		// SKILL_ID_TAROUNO_KIZU
		defineSkill(SKILL_ID_TAROUNO_KIZU, function() {

			this.name = "タロウの傷";
			this.kana = "タロウノキス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 90;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 15000;
			}

		}),

		// ----------------------------------------------------------------
		// キャロットビート
		// ----------------------------------------------------------------
		// SKILL_ID_CARROT_BEAT
		defineSkill(SKILL_ID_CARROT_BEAT, function() {

			this.name = "キャロットビート";
			this.kana = "キヤロツトヒイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolArray = [ 2000, 1500, 1500, 1000, 500 ];

				return coolArray[skillLv - 1];
			}

		}),

		// ----------------------------------------------------------------
		// 生命の力
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEINO_CHIKARA
		defineSkill(SKILL_ID_SEIMEINO_CHIKARA, function() {

			this.name = "生命の力";
			this.kana = "セイメイノチカラ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// アニマル系習得レベル合計
		// ----------------------------------------------------------------
		// SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI
		defineSkill(SKILL_ID_ANIMAL_KEI_SHUTOKU_LEVEL_GOKEI, function() {

			this.name = "アニマル系習得レベル合計";
			this.kana = "アニマルケイシユウトクレヘルコウケイ";
			this.maxLv = 50;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 警戒
		// ----------------------------------------------------------------
		// SKILL_ID_KEIKAI
		defineSkill(SKILL_ID_KEIKAI, function() {

			this.name = "警戒";
			this.kana = "ケイカイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 150;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return (skillLv == 1) ? 240000 : (210000 - 30000 * skillLv);
			}

		}),

		// ----------------------------------------------------------------
		// 群れの力
		// ----------------------------------------------------------------
		// SKILL_ID_MURENO_CHIKARA
		defineSkill(SKILL_ID_MURENO_CHIKARA, function() {

			this.name = "群れの力";
			this.kana = "ムレノチカラ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

			this.CastTimeFixed = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return (skillLv == 5) ? 3000 : (-500 + 500 * skillLv);
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				var coolArray = [ 3000, 2000, 1500, 500, 0 ];

				return coolArray[skillLv - 1];
			}

		}),

		// ----------------------------------------------------------------
		// サベージの魂
		// ----------------------------------------------------------------
		// SKILL_ID_SAVAGENO_TAMASHI
		defineSkill(SKILL_ID_SAVAGENO_TAMASHI, function() {

			this.name = "サベージの魂";
			this.kana = "サヘエシノタマシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 60;
			}

			this.Power = function(skillLv, charaDataManger) {
				return -1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return (skillLv <= 3) ? 1000 : 2000;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				var delayArray = [ 0, 500, 1000, 1000, 1500 ];

				return delayArray[skillLv - 1];
			}

			this.CoolTime = function(skillLv, charaDataManger) {
				return 2500 - 500 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 生命の魂
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEINO_TAMASHI
		defineSkill(SKILL_ID_SEIMEINO_TAMASHI, function() {

			this.name = "生命の魂";
			this.kana = "セイメイノタマシイ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)
		// ----------------------------------------------------------------
		// SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO
		defineSkill(SKILL_ID_DAICHINO_TAMASHI_KOKA_MATATABINO_NEKKO, function() {

			this.name = "大地の魂効果(ﾏﾀﾀﾋﾞの根っこ使用後のMATK＋)";
			this.kana = "タイチノタマシイコウカマタタヒノネツコシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)
		// ----------------------------------------------------------------
		// SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER
		defineSkill(SKILL_ID_DAICHINO_TAMASHI_KOKA_INUHAKKA_SHOWER, function() {

			this.name = "大地の魂効果(ｲﾇﾊｯｶｼｬﾜｰ使用後の完全回避＋)";
			this.kana = "タイチノタマシイコウカイヌハツカシヤワアシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 大地の魂効果(ニャングラス使用後のMATK＋)
		// ----------------------------------------------------------------
		// SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS
		defineSkill(SKILL_ID_DAICHINO_TAMASHI_KOKA_NYAN_GRASS, function() {

			this.name = "大地の魂効果(ニャングラス使用後のMATK＋)";
			this.kana = "タイチノタマシイコウカニヤンクラスシヨウコ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 生命の魂効果(残りHP)
		// ----------------------------------------------------------------
		// SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP
		defineSkill(SKILL_ID_SEIMEINO_TAMASHI_KOKA_NOKORI_HP, function() {

			this.name = "生命の魂効果(残りHP)";
			this.kana = "セイメイノタマシイコウカノコリヒツトホイント";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

];
