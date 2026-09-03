/**
 * セーブデータ組み立ての入力を表すプレーンなモデル（残件台帳 B-33 B2）.
 *
 * `extractSaveModelFromState()`（`savedata-collect.js`）が DOM/グローバル/コンポーネントから
 * 一括で読み取って埋め、`buildSaveDataUnits(model)`（同ファイル）がこのモデルから
 * `CSaveDataUnit*` 配列を組み立てる。DOM・`document.getElementById`・コンポーネントの
 * メソッド呼び出しはすべて抽出側に閉じ込め、モデル自体はプレーンな値のみを持つ
 * （配列は抽出時点のスナップショット。ライブ配列への参照は保持しない）。
 *
 * `engine/runtime/calc-model.js`（B-09 が確立した `StAllCalcCore()` の入力閉包）とは
 * **別モデル**。両者の対応は B4 の `toCalcModel()` で繋ぐ（このファイルの形は変更しない）。
 */

/** @returns {object} 全フィールドを既定値で埋めたセーブモデル */
export function createEmptySaveModel() {
    return {
        /** 職業ID（MigID。OBJID_SELECT_JOB） */
        jobId: undefined,

        // ---- キャラクターステータス ----
        /** 自動レベル調整のON/OFF（OBJID_CHECK_AUTO_BASE_LEVEL） */
        autoAdjustBaseLv: undefined,
        /** ベースレベル（OBJID_SELECT_BASE_LEVEL） */
        baseLv: undefined,
        /** ジョブレベル（OBJID_SELECT_JOB_LEVEL） */
        jobLv: undefined,
        /** classic 6ステータス（OBJID_SELECT_STATUS_*） */
        statStr: undefined, statAgi: undefined, statVit: undefined,
        statInt: undefined, statDex: undefined, statLuk: undefined,
        /** 特性ステータス（OBJID_SELECT_STATUS_*） */
        statPow: undefined, statSta: undefined, statWis: undefined,
        statSpl: undefined, statCon: undefined, statCrt: undefined,
        /** 右手武器属性（OBJID_SELECT_ARMS_ELEMENT） */
        armsElement: undefined,
        /** 速度ポーション（OBJID_SPEED_POT） */
        speedPot: undefined,
        /** 矢のID（n_A_Arrow。+1オフセットは組み立て側で行う） */
        arrow: undefined,

        // ---- スキル・バフ設定欄 ----
        /** 習得スキルLv配列（n_A_LearnedSkillのスナップショット） */
        learnedSkill: [],
        /** 職固有自己支援（A1欄。n_A_PassSkillのスナップショット） */
        passiveSkillSelf: [],
        /** 現在の職業のパッシブスキル数（切り詰め幅の決定に使う） */
        passiveSkillSelfCount: undefined,
        /** 演奏/踊り系（機能削除済み。n_A_PassSkill3のスナップショット） */
        passiveSkillMusic: [],
        /** ギルドスキル/ゴスペル/他（A4欄。n_A_PassSkill4のスナップショット） */
        passiveSkillGuild: [],
        /** オートスペル設定（生配列。n_A_PassSkill5のスナップショット。ID/Lv/Probが
         *  OBJID_OFFSET_AS_SKILL_*オフセットで同一配列に格納されたまま） */
        autoSpellRaw: [],
        /** アイテム（食品/他。A7欄。n_A_PassSkill7のスナップショット） */
        passiveSkillItem: [],
        /** その他の支援/設定（A8欄。n_A_PassSkill8のスナップショット） */
        passiveSkillOther: [],
        /** 一〜四次職支援設定欄（g_confDataIchizi等のスナップショット） */
        confIchizi: [], confNizi: [], confSanzi: [], confYozi: [],
        /** 時限効果設定欄（g_timeItemConfのスナップショット） */
        timeItemConf: [],

        // ---- 性能カスタマイズ ----
        /** g_confDataCustomStatus/Atk/Def/Skill/SpecStatusのスナップショット */
        confCustomStatus: [], confCustomAtk: [], confCustomDef: [],
        confCustomSkill: [], confCustomSpecStatus: [],

        // ---- モンスター ----
        /** 選択中のモンスターカテゴリ/マップ/モンスターID（CMonsterMapAreaComponentManager） */
        mobCategoryId: undefined, mobMapId: undefined, mobMonsterId: undefined,
        /** 対プレイヤー設定2（n_B_TAISEIのスナップショット） */
        mobConfTaisei: [],
        /** モンスター手入力欄（GetMobConfInput()の20項目のスナップショット） */
        mobConfInput: {
            lv: undefined, hp: undefined, str: undefined, int: undefined, vit: undefined,
            dex: undefined, agi: undefined, luk: undefined, atk: undefined, matk: undefined,
            range: undefined, def: undefined, mdef: undefined, baseExp: undefined, jobExp: undefined,
            size: undefined, element: undefined, race: undefined, bossType: undefined, grassType: undefined,
        },
        /** 敵状態強化（n_B_KYOUKAのスナップショット） */
        mobConfKyouka: [],
        /** 敵状態異常（n_B_IJYOUのスナップショット） */
        mobConfIjyou: [],

        // ---- 攻撃手段 ----
        /** g_attackMethodBridge.getAttackMethodConf() の値をプレーンな値へ展開したもの
         *  （コンポーネント未構築時は skillId/sourceType/skillLv が全て0・optionsが全て0埋め） */
        attackMethodSkillId: undefined,
        attackMethodSourceType: undefined,
        attackMethodSkillLv: undefined,
        attackMethodOptions: [],

        // ---- 装備・プレイヤー状態異常 ----
        /** 装備・シャドウ装備・プレイヤー状態異常設定欄（旧 CSaveDataManager#collectData*() が
         *  DOM/グローバルから直接読んでいたもの。B-33 B2-2で統合） */
        equip: {
            /** 装備部位11件（衣装を除く）。各要素は下記の形。列挙順は
             *  MIG_EQUIP_REGION_ID_*（旧#collectDataEquipable()と同じ ARMS_RIGHT〜ACCESSORY_2 順）。
             *  ```
             *  { eqpRgnId, itemId, refine, transcendence,
             *    rndOpt: [{kind, value}, ×5],
             *    cardCategoryIds: [c1,c2,c3,c4] | null,
             *    cardIds: [id1,id2,id3,id4] }
             *  ```
             */
            itemRegions: [],
            /** シャドウ装備6件。各要素は下記の形。列挙順は EQUIP_REGION_ID_SHADOW_*
             *  （旧#collectDataShadowEquips()と同じ ARMS_RIGHT〜ACCESSORY_2 順。頭防具・肩は非対応）。
             *  ```
             *  { eqpRgnId, itemId, refine,
             *    rndOpt: [{kind, value}, ×5],
             *    cardIds: [id2,id3,id4] }  // Slot1にはカードを挿せないため無し
             *  ```
             */
            shadowRegions: [],
            /** プレイヤー状態異常設定欄（g_confDataDebuffのスナップショット） */
            debuff: [],
        },
    };
}
