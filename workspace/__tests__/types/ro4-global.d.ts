/**
 * ro4/m/js配下のJavaScriptファイルをテストするためのラッパー
 * 依存関係を適切にロードし、TypeScriptから利用可能にする
 */

// グローバルスコープの型定義
declare global {
    // global.jsで定義される定数
    const TIME_ITEM_CONF_COUNT: number;
    const CUSTOM_CONF_STATUS_LIMIT: number;
    const CUSTOM_CONF_ATK_LIMIT: number;
    const CUSTOM_CONF_DEF_LIMIT: number;
    const CUSTOM_CONF_SKILL_LIMIT: number;
    const CUSTOM_CONF_SPEC_LIMIT: number;

    // global.jsで定義される変数
    let g_confDataIchizi: any;
    let g_confDataNizi: any;
    let g_confDataSanzi: any;
    let g_confDataYozi: any;
    let g_confDataDebuff: any;
    let g_objCharaConfIchizi: any;
    let g_objCharaConfNizi: any;
    let g_objCharaConfSanzi: any;
    let g_objCharaConfYozi: any;
    let g_objCharaConfDebuff: any;
    let g_timeItemConf: any[];
    let g_timeItemConfEffective: any[];
    let g_timeItemConfAllEffective: number;
    let g_skillManager: any;
    let n_Nitou: boolean;
    let n_NitouCalc: boolean;
    let g_VariableCastTimeRate: number;
    let costDownForDisp: number;
    let g_constDataManager: any;
    let g_charaData: any;
    let g_confDataCustomStatus: number[];
    let g_confDataCustomAtk: number[];
    let g_confDataCustomDef: number[];
    let g_confDataCustomSkill: number[];
    let g_confDataCustomSpecStatus: number[];
    let g_confDataCustomStatusMIG: any;
    let g_confDataSpecMIG: any;
    let g_confDataCustomSkillMIG: any;
    let g_confDataCustomSpecStatusMIG: any;

    // global.jsで定義される関数
    function ResetConfDataAllMIG(bAsOnLoad: boolean): void;
    function __DIG3(value: number): string;

    // ユーティリティ関数（roroから継承）
    function MallocArray(count: number, initialValue: any): any[];
    function DivideDigits3(value: number): string;
    function HtmlGetObjectCheckedById(id: string, defaultValue: boolean): boolean;

    // head.jsで定義される変数
    let SaveDataAll: string[];
    let SaveNameAll: string[];
    let n_SiegeMode: boolean;
    let n_A_BaseLV: number;
    let n_Enekyori: boolean;
    let wLAch: boolean;
    let TyouEnkakuSousa3dan: boolean;
    let str_bSUBname: string;
    let str_bSUB: string;
    let cast_kotei: boolean;
    let n_PerfectHIT_DMG: number;
    let n_Delay: number[];
    let wDelay: number;

    // CSkillManager（roro/m/jsから参照）
    class CSkillManager {
        constructor();
    }

    // CMigConstDataManager（roro/m/jsから参照される可能性）
    class CMigConstDataManager {
        constructor();
    }

    // Buff系ファイル
    const BUFF_CONF_GUILD_LIMIT: number;
    let n_A_PassSkill4: any;
    let n_Skill4SW: boolean;

    // calcautospell.js
    const AUTO_SPELL_SETTING_COUNT: number;
    const AUTO_SPELL_SKILL_COUNT_MAX: number;
    let AUTO_SPELL_PROB_ARRAY: any;
    const OBJID_OFFSET_AS_SKILL_ID: number;
    const OBJID_OFFSET_AS_SKILL_LV: number;
    const OBJID_OFFSET_AS_SKILL_PROB: number;
    let n_AS_SKILL: any;
    let n_AS_DMG: any;
    let n_AS_DMG_OverHP: any;
    function AS_Calc(charaData: any, specData: any, mobData: any, attackMethodConfArray: any, battleCalcInfo: any): any;

    // Battle関連クラス
    class CBattleCalcInfo {
        constructor();
    }

    class CBattleCalcResult {
        constructor();
    }

    class CBattleCalcResultAll {
        constructor();
    }

    class CAttackMethodAreaComponentManager {
        constructor();
    }

    class CMonsterMapAreaComponentManager {
        constructor();
    }

    // Save関連クラス
    class CSaveController {
        constructor();
    }

    class CSaveDataManager {
        constructor();
    }

    class CShadowEquipController {
        constructor();
    }

    class CEnchSearch {
        constructor();
    }

    class CModalWindow {
        constructor();
    }
}

export { };
