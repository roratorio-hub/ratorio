/**
 * スキル定義 archer/2b-bard-dancer（27 件 / SKILL_ID 198〜992 の中から職業ツリーで再抽出）
 *
 * 旧 roro/m/js/skill/NN-*.js（SKILL_ID連番分割）を職業ツリー単位へ再分割したもの
 * （tests/split-skill-by-job.mjs）。本文は分割前と1バイトも変えていない。
 * 並び順は不問（CSkillManager.Init() は id で dataArray に格納するため実行順序に依存しない）。
 * 割当根拠は .claude/context/architecture.md 参照。
 */
import { CSkillData, defineSkill } from "../CSkillData.js";
import { ITEM_KIND_MUSICAL, ITEM_KIND_WHIP } from "../../const/EnumItemKind.js";
import { ITEM_SP_ELEMENTAL } from "../../const/EnumItemSpId.js";
import { GetEquippedTotalSPArrow } from "../../bridge/foot-bridge.js";
import {
    SKILL_ID_ADLIB, SKILL_ID_BRAGINO_UTA, SKILL_ID_DANCENO_RENSHU, SKILL_ID_EIENNO_KONTON, SKILL_ID_ENCORE,
    SKILL_ID_FUKYOWAON, SKILL_ID_FUZIMINO_SIEGFRIED, SKILL_ID_GAKKINO_RENSHU, SKILL_ID_HUMMING,
    SKILL_ID_IDUNNNO_RINGO, SKILL_ID_IKUSADAIKONO_HIBIKI, SKILL_ID_KOMORIUTA, SKILL_ID_KOUNNO_KISS,
    SKILL_ID_KUCHIBUE, SKILL_ID_LOKINO_SAKEBI, SKILL_ID_MIWAKUNO_WINK, SKILL_ID_MUSICAL_STRIKE,
    SKILL_ID_NIBELUGENNO_YUBIWA, SKILL_ID_NJORDNO_UTAGE, SKILL_ID_SAMUI_JOKE, SKILL_ID_SCREAM,
    SKILL_ID_SERVICE_FOR_YOU, SKILL_ID_SHINENNO_NAKANI, SKILL_ID_WATASHIWO_WASURENAIDE, SKILL_ID_YAUCHI,
    SKILL_ID_YUHINO_ASSASINCROSS, SKILL_ID_ZIBUNKATTENA_DANCE
} from "../skill.dat.js";

export const skills = [
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
		// 魅惑のウィンク
		// ----------------------------------------------------------------
		// SKILL_ID_MIWAKUNO_WINK
		defineSkill(SKILL_ID_MIWAKUNO_WINK, function() {

			this.name = "魅惑のウィンク";
			this.kana = "ミワクノウインク";
			this.maxLv = 1;
			this.type = CSkillData.TYPE_ACTIVE;
			this.range = CSkillData.RANGE_SHORT;
			this.element = CSkillData.ELEMENT_VOID;

			this.CostFixed = function(skillLv, charaDataManger) {
				return 9999;
			}
		}),

];
