/**
 * StAllCalc の入力を表すプレーンなモデル（リファクタリング計画 Phase 8）。
 *
 * `engine/status/stallcalc-hydrate.js` の `HydrateFromDom()` が `document.calcForm` から
 * 直接読んでいた値のうち、**この hydrate ファイル自身が直接DOMから読んでいる値のみ**を
 * 対象とする。以下は意図的にモデルへ含めない（既存グローバルを直接読む、
 * 「境界の外側の既にhydrate済みの前提」として扱う）:
 *
 * - `n_A_JOB`（職業選択。`InitJobInfo()` 経由、別のUIフローで既にhydrate済み）
 * - `n_Skill{1,4,7,8}SW`（バフパネルの開閉状態。各 `Buff*.js` のクリックハンドラが管理）
 * - `CAttackMethodAreaComponentManager.GetAttackMethodConf()` の戻り値
 *   （攻撃手段コンポーネント自身の内部状態。メソッドを持つオブジェクトで
 *   プレーンなJSON化ができない）
 * - `GetTotalSpecStatus(...)`（性能カスタマイズ欄の合計値。別コンポーネントの集計）
 * - `g_shadowEquipController.getEquippedID/getRefined/getRndOptInfoArray(...)`
 *   （シャドウ装備コンポーネント自身の内部状態）
 *
 * 判定基準: 「hydrate.js が `document.calcForm.X` / `HtmlGetObjectValueById(Id, default)` /
 * `GetStatefullData(Id, default)` を**直接**呼んで得ている値」だけがモデルに入る。
 * 他のマネージャ/コンポーネントの getter 経由で得ている値は、`foot-stallcalc-*` 30モジュール
 * 自身の読むグローバルと同じ扱い（モデルの外側・境界の内側の実装詳細）とする。
 *
 * 装備・カード・衣装欄は既存グローバル（`n_A_Equip` / `n_A_card` / `n_A_costume`）と
 * 同じ「`EnumEquipRegionId.js` 等の定数で添字アクセスする配列」の形を踏襲する
 * （named field に変換すると約45個のカード欄で転記ミスのリスクが上がるため、
 * 既存の添字方式をそのまま流用するほうが安全）。
 */

/** @returns {object} 全フィールドを既定値で埋めたモデル */
export function createEmptyModel() {
    return {
        /** 基本ステータス（A_BaseLV 等） */
        status: {
            baseLv: undefined,     // calcForm.A_BaseLV
            jobLv: undefined,      // calcForm.A_JobLV
            str: undefined,        // calcForm.A_STR
            agi: undefined,        // calcForm.A_AGI
            vit: undefined,        // calcForm.A_VIT
            dex: undefined,        // calcForm.A_DEX
            int: undefined,        // calcForm.A_INT
            luk: undefined,        // calcForm.A_LUK
            speedPot: undefined,   // calcForm.A_SpeedPOT
        },
        /** 武器関連（属性・精錬値等） */
        weapon: {
            type: undefined,                  // calcForm.A_WeaponType
            zokusei: undefined,                // calcForm.A_Weapon_zokusei
            atkPlus: undefined,                // calcForm.A_Weapon_ATKplus
            transcendence: undefined,          // calcForm.A_Weapon_Transcendence
            weapon2AtkPlus: undefined,         // calcForm.A_Weapon2_ATKplus
            weapon2Transcendence: undefined,   // calcForm.A_Weapon2_Transcendence
        },
        /** 各部位の精錬値（+n） */
        defPlus: {
            head: undefined,       // calcForm.A_HEAD_DEF_PLUS
            body: undefined,       // calcForm.A_BODY_DEF_PLUS
            shield: undefined,     // calcForm.A_SHIELD_DEF_PLUS
            shoulder: undefined,   // calcForm.A_SHOULDER_DEF_PLUS
            shoes: undefined,      // calcForm.A_SHOES_DEF_PLUS
        },
        /** 各部位の超越段階 */
        defTranscendence: {
            head: undefined,       // calcForm.A_HEAD_DEF_Transcendence
            shield: undefined,     // calcForm.A_SHIELD_DEF_Transcendence
            body: undefined,       // calcForm.A_BODY_DEF_Transcendence
            shoulder: undefined,   // calcForm.A_SHOULDER_DEF_Transcendence
            shoes: undefined,      // calcForm.A_SHOES_DEF_Transcendence
        },
        /** 矢のID（OBJID_SELECT_ARROW） */
        arrow: undefined,
        /** 装備部位ごとのアイテムID配列（EQUIP_REGION_ID_* で添字アクセス） */
        equip: [],
        /** カード・エンチャント枠ごとのアイテムID配列（CARD_REGION_ID_* で添字アクセス） */
        card: [],
        /** 衣装欄のアイテムID配列（COSTUME_REGION_ID_* で添字アクセス） */
        costume: [],
        /** 職業スキル（パッシブ/持続系。A1欄）。長さは職業ごとに可変 */
        passiveSkill: [],
        /** オートスペル設定（AS_SKILL_ID/LV/PROB が同じ配列の異なるオフセット範囲に入る） */
        autoSpell: [],
        /** ギルドスキル/ゴスペル/他（A4欄）。n_A_PassSkill4 と同じ添字 */
        buff4: Array(36).fill(0),
        /** アイテム・食品他（A7欄）。n_A_PassSkill7 と同じ添字 */
        buff7: Array(53).fill(0),
        /** その他の支援/設定（A8欄）。n_A_PassSkill8 と同じ添字 */
        buff8: Array(28).fill(0),
    };
}
