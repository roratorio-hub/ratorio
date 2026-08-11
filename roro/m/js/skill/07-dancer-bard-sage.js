/**
 * スキル定義 07-dancer-bard-sage（SKILL_ID 206–240 / 35 件）
 *
 * CSkillManager.js の Init から機械分割したもの（tests/split-cskillmanager.mjs）。
 * 本文は分割前と1バイトも変えていない。並び順＝ID昇順を保つこと。
 */
import { CSkillData, defineSkill } from '../CSkillData.js';
import { ITEM_KIND_WHIP } from '../const/EnumItemKind.js';
import { ITEM_SP_ELEMENTAL } from '../const/EnumItemSpId.js';
import { GetEquippedTotalSPArrow } from '../foot-bridge.js';
import {
    SKILL_ID_ABRACADABRA, SKILL_ID_ADLIB, SKILL_ID_ADVANCED_BOOK, SKILL_ID_AUTO_MAGICIAN_SPELL, SKILL_ID_CAST_CANCEL,
    SKILL_ID_DANCENO_RENSHU, SKILL_ID_DELUGE, SKILL_ID_DISPELL, SKILL_ID_DRAGONOLOGY, SKILL_ID_EIENNO_KONTON,
    SKILL_ID_ENCORE, SKILL_ID_FLAME_LAUNCHER, SKILL_ID_FREE_CAST, SKILL_ID_FROST_WEAPON, SKILL_ID_FUZIMINO_SIEGFRIED,
    SKILL_ID_HUMMING, SKILL_ID_IKUSADAIKONO_HIBIKI, SKILL_ID_KOMORIUTA, SKILL_ID_KOUNNO_KISS,
    SKILL_ID_LAND_PROTECTOR, SKILL_ID_LIGHTNING_LOADER, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_MAGIC_ROD,
    SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_NJORDNO_UTAGE, SKILL_ID_SCREAM, SKILL_ID_SEISMIC_WEAPON,
    SKILL_ID_SERVICE_FOR_YOU, SKILL_ID_SHINENNO_NAKANI, SKILL_ID_SPELL_BREAKER, SKILL_ID_VIOLENT_GALE,
    SKILL_ID_VOLCANO, SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_YAUCHI, SKILL_ID_ZIBUNKATTENA_DANCE
} from '../skill.dat.js';

export const skills = [
		// ----------------------------------------------------------------
		// ダンスの練習
		// ----------------------------------------------------------------
		// SKILL_ID_DANCENO_RENSHU
		defineSkill(SKILL_ID_DANCENO_RENSHU, function() {
			this.name = "ダンスの練習";
			this.kana = "タンスノレンシユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// 矢撃ち
		// ----------------------------------------------------------------
		// SKILL_ID_YAUCHI
		defineSkill(SKILL_ID_YAUCHI, function() {
			this.name = "矢撃ち";
			this.kana = "ヤウチ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE | CSkillData.TYPE_PHYSICAL;
			this.range = CSkillData.RANGE_LONG;
			this.WeaponCondition = function(weapon) {
				return ITEM_KIND_WHIP === weapon;
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
		// 自分勝手なダンス
		// ----------------------------------------------------------------
		// SKILL_ID_ZIBUNKATTENA_DANCE
		defineSkill(SKILL_ID_ZIBUNKATTENA_DANCE, function() {

			this.name = "自分勝手なダンス";
			this.kana = "シフンカツテナタンス";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// スクリーム
		// ----------------------------------------------------------------
		// SKILL_ID_SCREAM
		defineSkill(SKILL_ID_SCREAM, function() {

			this.name = "スクリーム";
			this.kana = "スクリイム";
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
		// ハミング
		// ----------------------------------------------------------------
		// SKILL_ID_HUMMING
		defineSkill(SKILL_ID_HUMMING, function() {

			this.name = "ハミング";
			this.kana = "ハミンク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20 + 2 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 私を忘れないで…
		// ----------------------------------------------------------------
		// SKILL_ID_WATASHIWO_WASURENAIDE
		defineSkill(SKILL_ID_WATASHIWO_WASURENAIDE, function() {

			this.name = "私を忘れないで…";
			this.kana = "ワタシヲワスレナイテ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 25 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// 幸運のキス
		// ----------------------------------------------------------------
		// SKILL_ID_KOUNNO_KISS
		defineSkill(SKILL_ID_KOUNNO_KISS, function() {

			this.name = "幸運のキス";
			this.kana = "コウウンノキス";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// サービスフォーユー
		// ----------------------------------------------------------------
		// SKILL_ID_SERVICE_FOR_YOU
		defineSkill(SKILL_ID_SERVICE_FOR_YOU, function() {

			this.name = "サービスフォーユー";
			this.kana = "サアヒスフオオユウ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 5 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// アドリブ
		// ----------------------------------------------------------------
		// SKILL_ID_ADLIB
		defineSkill(SKILL_ID_ADLIB, function() {

			this.name = "アドリブ";
			this.kana = "アトリフ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// アンコール
		// ----------------------------------------------------------------
		// SKILL_ID_ENCORE
		defineSkill(SKILL_ID_ENCORE, function() {

			this.name = "アンコール";
			this.kana = "アンコオル";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

		}),

		// ----------------------------------------------------------------
		// 子守歌
		// ----------------------------------------------------------------
		// SKILL_ID_KOMORIUTA
		defineSkill(SKILL_ID_KOMORIUTA, function() {

			this.name = "子守歌";
			this.kana = "コモリウタ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// ニヨルドの宴
		// ----------------------------------------------------------------
		// SKILL_ID_NJORDNO_UTAGE
		defineSkill(SKILL_ID_NJORDNO_UTAGE, function() {

			this.name = "ニヨルドの宴";
			this.kana = "ヒヨルトノウタケ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// 永遠の混沌
		// ----------------------------------------------------------------
		// SKILL_ID_EIENNO_KONTON
		defineSkill(SKILL_ID_EIENNO_KONTON, function() {

			this.name = "永遠の混沌";
			this.kana = "エイエンノコントン";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 30;
			}

		}),

		// ----------------------------------------------------------------
		// 戦太鼓の響き
		// ----------------------------------------------------------------
		// SKILL_ID_IKUSADAIKONO_HIBIKI
		defineSkill(SKILL_ID_IKUSADAIKONO_HIBIKI, function() {

			this.name = "戦太鼓の響き";
			this.kana = "イクサタイコノヒヒキ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ニーベルングの指輪
		// ----------------------------------------------------------------
		// SKILL_ID_NIBELUGENNO_YUBIWA
		defineSkill(SKILL_ID_NIBELUGENNO_YUBIWA, function() {

			this.name = "ニーベルングの指輪";
			this.kana = "ニイヘルンクノユヒワ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35 + 3 * skillLv;
			}

		}),

		// ----------------------------------------------------------------
		// ロキの叫び
		// ----------------------------------------------------------------
		// SKILL_ID_LOKINO_SAKEBI
		defineSkill(SKILL_ID_LOKINO_SAKEBI, function() {

			this.name = "ロキの叫び";
			this.kana = "ロキノサケヒ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 15;
			}

		}),

		// ----------------------------------------------------------------
		// 深淵の中に
		// ----------------------------------------------------------------
		// SKILL_ID_SHINENNO_NAKANI
		defineSkill(SKILL_ID_SHINENNO_NAKANI, function() {

			this.name = "深淵の中に";
			this.kana = "シンエンノナカニ";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

		}),

		// ----------------------------------------------------------------
		// 不死身のジークフリード
		// ----------------------------------------------------------------
		// SKILL_ID_FUZIMINO_SIEGFRIED
		defineSkill(SKILL_ID_FUZIMINO_SIEGFRIED, function() {

			this.name = "不死身のジークフリード";
			this.kana = "フシミノシイクフリイト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 20;
			}

		}),

		// ----------------------------------------------------------------
		// アドバンスドブック
		// ----------------------------------------------------------------
		// SKILL_ID_ADVANCED_BOOK
		defineSkill(SKILL_ID_ADVANCED_BOOK, function() {

			this.name = "アドバンスドブック";
			this.kana = "アトハンストフツク";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// キャストキャンセル
		// ----------------------------------------------------------------
		// SKILL_ID_CAST_CANCEL
		defineSkill(SKILL_ID_CAST_CANCEL, function() {

			this.name = "キャストキャンセル";
			this.kana = "キヤストキヤンセル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

		}),

		// ----------------------------------------------------------------
		// マジックロッド
		// ----------------------------------------------------------------
		// SKILL_ID_MAGIC_ROD
		defineSkill(SKILL_ID_MAGIC_ROD, function() {

			this.name = "マジックロッド";
			this.kana = "マシツクロツト";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 2;
			}

			this.DelayTimeCommon = function(skillLv, charaDataManger) {
				return 1000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 400, 600, 800, 1000, 1200])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// スペルブレイカー
		// ----------------------------------------------------------------
		// SKILL_ID_SPELL_BREAKER
		defineSkill(SKILL_ID_SPELL_BREAKER, function() {

			this.name = "スペルブレイカー";
			this.kana = "スヘルフレイカア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 10;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 700;
			}

		}),

		// ----------------------------------------------------------------
		// フリーキャスト
		// ----------------------------------------------------------------
		// SKILL_ID_FREE_CAST
		defineSkill(SKILL_ID_FREE_CAST, function() {

			this.name = "フリーキャスト";
			this.kana = "フリイキヤスト";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// オートマジシャンスペル
		// ----------------------------------------------------------------
		// SKILL_ID_AUTO_MAGICIAN_SPELL
		defineSkill(SKILL_ID_AUTO_MAGICIAN_SPELL, function() {

			this.name = "(仮)オートマジシャンスペル";
			this.kana = "オオトスヘル";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 35;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 120000, 150000, 180000, 210000, 240000, 270000, 300000, 330000, 360000, 390000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フレイムランチャー
		// ----------------------------------------------------------------
		// SKILL_ID_FLAME_LAUNCHER
		defineSkill(SKILL_ID_FLAME_LAUNCHER, function() {

			this.name = "フレイムランチャー";
			this.kana = "フレイムランチヤア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// フロストウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_FROST_WEAPON
		defineSkill(SKILL_ID_FROST_WEAPON, function() {

			this.name = "フロストウェポン";
			this.kana = "フロストウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ライトニングローダー
		// ----------------------------------------------------------------
		// SKILL_ID_LIGHTNING_LOADER
		defineSkill(SKILL_ID_LIGHTNING_LOADER, function() {

			this.name = "ライトニングローダー";
			this.kana = "ライトニンクロオタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// サイズミックウェポン
		// ----------------------------------------------------------------
		// SKILL_ID_SEISMIC_WEAPON
		defineSkill(SKILL_ID_SEISMIC_WEAPON, function() {

			this.name = "サイズミックウェポン";
			this.kana = "サイスミツクウエホン";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 40;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 3000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 1200000, 1200000, 1200000, 1200000, 1800000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ドラゴノロジー
		// ----------------------------------------------------------------
		// SKILL_ID_DRAGONOLOGY
		defineSkill(SKILL_ID_DRAGONOLOGY, function() {

			this.name = "ドラゴノロジー";
			this.kana = "トラコノロシイ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_PASSIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;
		}),

		// ----------------------------------------------------------------
		// ボルケーノ
		// ----------------------------------------------------------------
		// SKILL_ID_VOLCANO
		defineSkill(SKILL_ID_VOLCANO, function() {

			this.name = "ボルケーノ";
			this.kana = "ホルケエノ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// デリュージ
		// ----------------------------------------------------------------
		// SKILL_ID_DELUGE
		defineSkill(SKILL_ID_DELUGE, function() {

			this.name = "デリュージ";
			this.kana = "テリユウシ";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// バイオレントゲイル
		// ----------------------------------------------------------------
		// SKILL_ID_VIOLENT_GALE
		defineSkill(SKILL_ID_VIOLENT_GALE, function() {

			this.name = "バイオレントゲイル";
			this.kana = "ハイオレントケイル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50 - 2 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 60000, 120000, 180000, 240000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ランドプロテクター
		// ----------------------------------------------------------------
		// SKILL_ID_LAND_PROTECTOR
		defineSkill(SKILL_ID_LAND_PROTECTOR, function() {

			this.name = "ランドプロテクター";
			this.kana = "ラントフロテクタア";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 70 - 4 * skillLv;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 5000;
			}

			this.LifeTime = function(skillLv, charaDataManger) {
				var nLifeTime = ([0, 120000, 165000, 210000, 255000, 300000])[skillLv];
				return nLifeTime;
			}
		}),

		// ----------------------------------------------------------------
		// ディスペル
		// ----------------------------------------------------------------
		// SKILL_ID_DISPELL
		defineSkill(SKILL_ID_DISPELL, function() {

			this.name = "ディスペル";
			this.kana = "テイスヘル";
			this.maxLv = 5;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 1;
			}

			this.CastTimeVary = function(skillLv, charaDataManger) {
				return 2000;
			}

		}),

		// ----------------------------------------------------------------
		// アブラカタブラ
		// ----------------------------------------------------------------
		// SKILL_ID_ABRACADABRA
		defineSkill(SKILL_ID_ABRACADABRA, function() {

			this.name = "アブラカタブラ";
			this.kana = "アフラカタフラ";
			this.maxLv = 10;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 50;
			}

		}),

];
