/**
 * roro/m/js配下のJavaScriptファイルをテストするためのラッパー
 * 依存関係を適切にロードし、TypeScriptから利用可能にする
 */

// グローバルスコープの型定義
declare global {
    // CGlobalConstManager関連
    function CGlobalConstManager(): void;
    namespace CGlobalConstManager {
        function DefineEnum(enumName: string, names: string[], firstValue?: number, stepValue?: number): void;
        function DefinePseudoEnum(enumName: string, names: string[], firstValue?: number, stepValue?: number): void;
    }

    // CInstanceManager関連
    function CInstanceManager(): void;

    // Enum値（common.jsで定義される定数）
    let CONST_DATA_KIND_NONE: number;
    let CONST_DATA_KIND_ITEM: number;
    let CONST_DATA_KIND_CARD: number;
    let CONST_DATA_KIND_COSTUME: number;
    let CONST_DATA_KIND_ITEM_SET: number;
    let CONST_DATA_KIND_ENCHANT_TYPE: number;
    let CONST_DATA_KIND_ENCHANT_LIST: number;
    let CONST_DATA_KIND_TIME_ITEM: number;
    let CONST_DATA_KIND_ITEM_PACK: number;
    let CONST_DATA_KIND_SKILL: number;
    let CONST_DATA_KIND_USABLE_SKILL: number;
    let CONST_DATA_KIND_AUTO_SPELL: number;
    let CONST_DATA_KIND_ARROW: number;
    let CONST_DATA_KIND_MONSTER: number;
    let CONST_DATA_KIND_MONSTER_GROUP: number;
    let CONST_DATA_KIND_MONSTER_MAP: number;
    let CONST_DATA_KIND_PET: number;
    let CONST_DATA_KIND_RND_OPT_TYPE: number;
    let CONST_DATA_KIND_RND_OPT_LIST: number;
    let CONST_DATA_KIND_RND_OPT: number;
    let CONST_DATA_KIND_CHANGE_LOG: number;
    let CONST_DATA_KIND_ALIAS: number;
    let CONST_DATA_KIND_STATE: number;
    let CONST_DATA_KIND_BUFF: number;
    let CONST_DATA_KIND_CHARA: number;
    let CONST_DATA_KIND_JOB: number;

    // パラメータID
    let PARAM_STR: number;
    let PARAM_AGI: number;
    let PARAM_VIT: number;
    let PARAM_INT: number;
    let PARAM_DEX: number;
    let PARAM_LUK: number;
    let PARAM_COUNT: number;

    // 種族ID
    let RACE_ID_SOLID: number;
    let RACE_ID_UNDEAD: number;
    let RACE_ID_ANIMAL: number;
    let RACE_ID_PLANT: number;
    let RACE_ID_INSECT: number;
    let RACE_ID_FISH: number;
    let RACE_ID_DEMON: number;
    let RACE_ID_HUMAN: number;
    let RACE_ID_ANGEL: number;
    let RACE_ID_DRAGON: number;
    let RACE_ID_COUNT: number;
    let RACE_ID_ANY: number;

    // 属性ID
    let ELM_ID_VANITY: number;
    let ELM_ID_WATER: number;
    let ELM_ID_EARTH: number;
    let ELM_ID_FIRE: number;
    let ELM_ID_WIND: number;
    let ELM_ID_POISON: number;
    let ELM_ID_HOLY: number;
    let ELM_ID_DARK: number;
    let ELM_ID_PSYCO: number;
    let ELM_ID_UNDEAD: number;
    let ELM_ID_COUNT: number;
    let ELM_ID_ANY: number;

    // サイズID
    let SIZE_ID_SMALL: number;
    let SIZE_ID_MEDIUM: number;
    let SIZE_ID_LARGE: number;
    let SIZE_ID_COUNT: number;
    let SIZE_ID_ANY: number;

    // 状態異常ID
    let STATE_ID_POISON: number;
    let STATE_ID_STUN: number;
    let STATE_ID_FROZEN: number;
    let STATE_ID_CURSED: number;
    let STATE_ID_BLIND: number;
    let STATE_ID_SLEEP: number;
    let STATE_ID_SILENCE: number;
    let STATE_ID_CONFUSE: number;
    let STATE_ID_BLEEDING: number;
    let STATE_ID_STONE: number;
    let STATE_ID_BREAK_WEAPON: number;
    let STATE_ID_BREAK_HEAD: number;
    let STATE_ID_BREAK_BODY: number;
    let STATE_ID_BREAK_SHIELD: number;
    let STATE_ID_BREAK_SHOULDER: number;
    let STATE_ID_BREAK_FOOT: number;
    let STATE_ID_BREAK_ACCESSARY: number;
    let STATE_R_ID_CHILLED: number;
    let STATE_R_ID_ICED: number;
    let STATE_R_ID_IGNITION: number;
    let STATE_R_ID_FEAR: number;
    let STATE_R_ID_DEEPSLEEP: number;
    let STATE_R_ID_CHARMED: number;
    let STATE_R_ID_FRENZY: number;
    let STATE_R_ID_HOWLING: number;
    let STATE_NEW_ID_LETHARGY: number;
    let STATE_NEW_ID_JETBLACK: number;
    let STATE_NEW_ID_HIGHLYPOISONOUS: number;
    let STATE_NEW_ID_TORRENT: number;
    let STATE_NEW_ID_MELANCHOLY: number;
    let STATE_NEW_ID_STILLNESS: number;
    let STATE_NEW_ID_CONFLAGRATION: number;
    let STATE_NEW_ID_RAPIDCOOLING: number;
    let STATE_NEW_ID_CRYSTALLIZATION: number;
    let STATE_NEW_ID_UNHAPPINESS: number;

    // 親密度ID
    let FRIENDLITY_ID_AUTO: number;
    let FRIENDLITY_ID_RUNAWAY: number;
    let FRIENDLITY_ID_LOWEST: number;
    let FRIENDLITY_ID_LOW: number;
    let FRIENDLITY_ID_NORMAL: number;
    let FRIENDLITY_ID_HIGH: number;
    let FRIENDLITY_ID_HIGHEST: number;

    // common.jsで定義される関数
    function GetConstDataKindText(kindId: number): string;
    function GetParamText(paramId: number): string;
    function GetRaceText(raceId: number): string;
    function GetElementText(elmId: number): string;
    function GetMonsterElementText(monsterElmId: number): string;
    function GetSizeText(sizeId: number): string;
    function GetStateText(stateId: number): string;
    function GetFriendlityText(friendlityId: number): string;
}

export { };
