import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import {
    MOB_CONF_DEBUF_LIMIT,
    n_B_IJYOU,
    MobConfDebufOBJ,
    MOB_CONF_DEBUF_DATA_INDEX_ID,
    MOB_CONF_DEBUF_DATA_INDEX_TEXT,
    MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE,
    MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE,
    MOB_CONF_DEBUF_DATA_INDEX_MIN_VALUE,
    MOB_CONF_DEBUF_DATA_INDEX_MAX_VALUE,
    MOB_CONF_DEBUF_ID_PROVOKE,
    MOB_CONF_DEBUF_ID_QUAGMIRE,
    MOB_CONF_DEBUF_ID_DOKU,
    MOB_CONF_DEBUF_ID_KURAYAMI,
    MOB_CONF_DEBUF_ID_TOUKETSU,
    MOB_CONF_DEBUF_ID_BLESSING,
    MOB_CONF_DEBUF_ID_LEX_AETERNA,
    MOB_CONF_DEBUF_ID_STUN,
    MOB_CONF_DEBUF_ID_SUIMIN,
    MOB_CONF_DEBUF_ID_SEKIKA,
    MOB_CONF_DEBUF_ID_NOROI,
    MOB_CONF_DEBUF_ID_SOKUDO_GENSHO,
    MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS,
    MOB_CONF_DEBUF_ID_STRIP_WEAPON,
    MOB_CONF_DEBUF_ID_STRIP_SHIELD,
    MOB_CONF_DEBUF_ID_STRIP_ARMOR,
    MOB_CONF_DEBUF_ID_STRIP_HELM,
    MOB_CONF_DEBUF_ID_SPIDER_WEB,
    MOB_CONF_DEBUF_ID_MIND_BREAKER,
    MOB_CONF_DEBUF_ID_WATASHIWO_WASURENAIDE,
    MOB_CONF_DEBUF_ID_EIENNNO_KONTON,
    MOB_CONF_DEBUF_ID_ESKA,
    MOB_CONF_DEBUF_ID_ESKU,
    MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE,
    MOB_CONF_DEBUF_ID_FLYING,
    MOB_CONF_DEBUF_ID_VENOM_IMPRESS,
    MOB_CONF_DEBUF_ID_ENERVATION,
    MOB_CONF_DEBUF_ID_GROOMY,
    MOB_CONF_DEBUF_ID_RAGENESS,
    MOB_CONF_DEBUF_ID_WEEKNESS,
    MOB_CONF_DEBUF_ID_UNLUCKY,
    MOB_CONF_DEBUF_ID_ORATIO,
    MOB_CONF_DEBUF_ID_HAKKA,
    MOB_CONF_DEBUF_ID_SURPRISE_ATTACK_EFFECT,
    MOB_CONF_DEBUF_ID_HYOKETSU,
    MOB_CONF_DEBUF_ID_REITO,
    MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT,
    MOB_CONF_DEBUF_ID_ANALYSE,
    MOB_CONF_DEBUF_ID_WATER_BARRIER,
    MOB_CONF_DEBUF_ID_MAHI,
    MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI,
    MOB_CONF_DEBUF_ID_STRIP_ACCESSORY,
    MOB_CONF_DEBUF_ID_INUHAKKA_SHOWER,
    MOB_CONF_DEBUF_ID_NYAN_GRASS,
    MOB_CONF_DEBUF_ID_TARONO_KIZU,
    MOB_CONF_DEBUF_ID_KAITO,
    MOB_CONF_DEBUF_ID_SHIRYO_HYOI,
    MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF,
    MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS,
    MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF,
    MOB_CONF_DEBUF_ID_QUAKE_DEBUFF,
    MOB_CONF_DEBUF_ID_SEIYU_SENREI_DEBUFF,
    MOB_CONF_DEBUF_ID_SOUND_BLEND,
    MOB_CONF_DEBUF_ID_JACK_FROST_NOVA,
    MOB_CONF_DEBUF_ID_CLIMAX_QUAKE,
    MOB_CONF_DEBUF_ID_CLIMAX_BLOOM,
    MOB_CONF_DEBUF_ID_TOXIN_OF_MANDARA,
    BuildUpMobConfDebufSelectArea,
    SyncronizeMobConfDebufSettingsVarToCtrl,
    SyncronizeMobConfDebufSettingsCtrlToVar,
    OnClickMobConfDebufSwitch,
    OnChangeMobConfDebuf,
    RefreshMobConfDebufSelectAreaHeader,
    RefreshMobConfDebufControlCSS,
} from '@roro/mobconfdebuf.js';

describe('mobconfdebuf.js', () => {
    describe('エクスポート確認（定数）', () => {
        it('MOB_CONF_DEBUF_LIMIT が 80', () => { expect(MOB_CONF_DEBUF_LIMIT).toBe(80); });
        it('n_B_IJYOU が配列', () => { expect(Array.isArray(n_B_IJYOU)).toBe(true); });
        it('MobConfDebufOBJ が配列', () => { expect(Array.isArray(MobConfDebufOBJ)).toBe(true); });
        it('DATA_INDEX_ID = 0', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_ID).toBe(0); });
        it('DATA_INDEX_TEXT = 1', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_TEXT).toBe(1); });
        it('DATA_INDEX_CONTROL_TYPE = 2', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_CONTROL_TYPE).toBe(2); });
        it('DATA_INDEX_DEFAULT_VALUE = 3', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_DEFAULT_VALUE).toBe(3); });
        it('DATA_INDEX_MIN_VALUE = 4', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_MIN_VALUE).toBe(4); });
        it('DATA_INDEX_MAX_VALUE = 5', () => { expect(MOB_CONF_DEBUF_DATA_INDEX_MAX_VALUE).toBe(5); });
        it('MOB_CONF_DEBUF_ID_PROVOKE = 0', () => { expect(MOB_CONF_DEBUF_ID_PROVOKE).toBe(0); });
        it('MOB_CONF_DEBUF_ID_QUAGMIRE = 1', () => { expect(MOB_CONF_DEBUF_ID_QUAGMIRE).toBe(1); });
        it('MOB_CONF_DEBUF_ID_DOKU = 2', () => { expect(MOB_CONF_DEBUF_ID_DOKU).toBe(2); });
        it('MOB_CONF_DEBUF_ID_KURAYAMI = 3', () => { expect(MOB_CONF_DEBUF_ID_KURAYAMI).toBe(3); });
        it('MOB_CONF_DEBUF_ID_TOUKETSU = 4', () => { expect(MOB_CONF_DEBUF_ID_TOUKETSU).toBe(4); });
        it('MOB_CONF_DEBUF_ID_BLESSING = 5', () => { expect(MOB_CONF_DEBUF_ID_BLESSING).toBe(5); });
        it('MOB_CONF_DEBUF_ID_LEX_AETERNA = 6', () => { expect(MOB_CONF_DEBUF_ID_LEX_AETERNA).toBe(6); });
        it('MOB_CONF_DEBUF_ID_STUN = 7', () => { expect(MOB_CONF_DEBUF_ID_STUN).toBe(7); });
        it('MOB_CONF_DEBUF_ID_SUIMIN = 8', () => { expect(MOB_CONF_DEBUF_ID_SUIMIN).toBe(8); });
        it('MOB_CONF_DEBUF_ID_SEKIKA = 9', () => { expect(MOB_CONF_DEBUF_ID_SEKIKA).toBe(9); });
        it('MOB_CONF_DEBUF_ID_NOROI = 10', () => { expect(MOB_CONF_DEBUF_ID_NOROI).toBe(10); });
        it('MOB_CONF_DEBUF_ID_SOKUDO_GENSHO = 11', () => { expect(MOB_CONF_DEBUF_ID_SOKUDO_GENSHO).toBe(11); });
        it('MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS = 12', () => { expect(MOB_CONF_DEBUF_ID_SIGNUM_CRUCIS).toBe(12); });
        it('MOB_CONF_DEBUF_ID_STRIP_WEAPON = 13', () => { expect(MOB_CONF_DEBUF_ID_STRIP_WEAPON).toBe(13); });
        it('MOB_CONF_DEBUF_ID_STRIP_SHIELD = 14', () => { expect(MOB_CONF_DEBUF_ID_STRIP_SHIELD).toBe(14); });
        it('MOB_CONF_DEBUF_ID_STRIP_ARMOR = 15', () => { expect(MOB_CONF_DEBUF_ID_STRIP_ARMOR).toBe(15); });
        it('MOB_CONF_DEBUF_ID_STRIP_HELM = 16', () => { expect(MOB_CONF_DEBUF_ID_STRIP_HELM).toBe(16); });
        it('MOB_CONF_DEBUF_ID_SPIDER_WEB = 17', () => { expect(MOB_CONF_DEBUF_ID_SPIDER_WEB).toBe(17); });
        it('MOB_CONF_DEBUF_ID_MIND_BREAKER = 18', () => { expect(MOB_CONF_DEBUF_ID_MIND_BREAKER).toBe(18); });
        it('MOB_CONF_DEBUF_ID_WATASHIWO_WASURENAIDE = 19', () => { expect(MOB_CONF_DEBUF_ID_WATASHIWO_WASURENAIDE).toBe(19); });
        it('MOB_CONF_DEBUF_ID_EIENNNO_KONTON = 20', () => { expect(MOB_CONF_DEBUF_ID_EIENNNO_KONTON).toBe(20); });
        it('MOB_CONF_DEBUF_ID_ESKA = 21', () => { expect(MOB_CONF_DEBUF_ID_ESKA).toBe(21); });
        it('MOB_CONF_DEBUF_ID_ESKU = 22', () => { expect(MOB_CONF_DEBUF_ID_ESKU).toBe(22); });
        it('MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE = 23', () => { expect(MOB_CONF_DEBUF_ID_ELEMENTAL_CHANGE).toBe(23); });
        it('MOB_CONF_DEBUF_ID_FLYING = 24', () => { expect(MOB_CONF_DEBUF_ID_FLYING).toBe(24); });
        it('MOB_CONF_DEBUF_ID_VENOM_IMPRESS = 25', () => { expect(MOB_CONF_DEBUF_ID_VENOM_IMPRESS).toBe(25); });
        it('MOB_CONF_DEBUF_ID_ENERVATION = 26', () => { expect(MOB_CONF_DEBUF_ID_ENERVATION).toBe(26); });
        it('MOB_CONF_DEBUF_ID_GROOMY = 27', () => { expect(MOB_CONF_DEBUF_ID_GROOMY).toBe(27); });
        it('MOB_CONF_DEBUF_ID_RAGENESS = 28', () => { expect(MOB_CONF_DEBUF_ID_RAGENESS).toBe(28); });
        it('MOB_CONF_DEBUF_ID_WEEKNESS = 29', () => { expect(MOB_CONF_DEBUF_ID_WEEKNESS).toBe(29); });
        it('MOB_CONF_DEBUF_ID_UNLUCKY = 30', () => { expect(MOB_CONF_DEBUF_ID_UNLUCKY).toBe(30); });
        it('MOB_CONF_DEBUF_ID_ORATIO = 31', () => { expect(MOB_CONF_DEBUF_ID_ORATIO).toBe(31); });
        it('MOB_CONF_DEBUF_ID_HAKKA = 32', () => { expect(MOB_CONF_DEBUF_ID_HAKKA).toBe(32); });
        it('MOB_CONF_DEBUF_ID_SURPRISE_ATTACK_EFFECT = 33', () => { expect(MOB_CONF_DEBUF_ID_SURPRISE_ATTACK_EFFECT).toBe(33); });
        it('MOB_CONF_DEBUF_ID_HYOKETSU = 34', () => { expect(MOB_CONF_DEBUF_ID_HYOKETSU).toBe(34); });
        it('MOB_CONF_DEBUF_ID_REITO = 35', () => { expect(MOB_CONF_DEBUF_ID_REITO).toBe(35); });
        it('MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT = 36', () => { expect(MOB_CONF_DEBUF_ID_DARK_CRAW_EFFECT).toBe(36); });
        it('MOB_CONF_DEBUF_ID_ANALYSE = 37', () => { expect(MOB_CONF_DEBUF_ID_ANALYSE).toBe(37); });
        it('MOB_CONF_DEBUF_ID_WATER_BARRIER = 38', () => { expect(MOB_CONF_DEBUF_ID_WATER_BARRIER).toBe(38); });
        it('MOB_CONF_DEBUF_ID_MAHI = 39', () => { expect(MOB_CONF_DEBUF_ID_MAHI).toBe(39); });
        it('MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI = 40', () => { expect(MOB_CONF_DEBUF_ID_RAKUIN_ZYOTAI).toBe(40); });
        it('MOB_CONF_DEBUF_ID_STRIP_ACCESSORY = 41', () => { expect(MOB_CONF_DEBUF_ID_STRIP_ACCESSORY).toBe(41); });
        it('MOB_CONF_DEBUF_ID_INUHAKKA_SHOWER = 42', () => { expect(MOB_CONF_DEBUF_ID_INUHAKKA_SHOWER).toBe(42); });
        it('MOB_CONF_DEBUF_ID_NYAN_GRASS = 43', () => { expect(MOB_CONF_DEBUF_ID_NYAN_GRASS).toBe(43); });
        it('MOB_CONF_DEBUF_ID_TARONO_KIZU = 44', () => { expect(MOB_CONF_DEBUF_ID_TARONO_KIZU).toBe(44); });
        it('MOB_CONF_DEBUF_ID_KAITO = 45', () => { expect(MOB_CONF_DEBUF_ID_KAITO).toBe(45); });
        it('MOB_CONF_DEBUF_ID_SHIRYO_HYOI = 46', () => { expect(MOB_CONF_DEBUF_ID_SHIRYO_HYOI).toBe(46); });
        it('MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF = 47', () => { expect(MOB_CONF_DEBUF_ID_ADORAMUS_DEBUFF).toBe(47); });
        it('MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS = 48', () => { expect(MOB_CONF_DEBUF_ID_MARSH_OF_ABYSS).toBe(48); });
        it('MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF = 49', () => { expect(MOB_CONF_DEBUF_ID_EARTH_DRIVE_DEBUFF).toBe(49); });
        it('MOB_CONF_DEBUF_ID_QUAKE_DEBUFF = 50', () => { expect(MOB_CONF_DEBUF_ID_QUAKE_DEBUFF).toBe(50); });
        it('MOB_CONF_DEBUF_ID_SEIYU_SENREI_DEBUFF = 51', () => { expect(MOB_CONF_DEBUF_ID_SEIYU_SENREI_DEBUFF).toBe(51); });
        it('MOB_CONF_DEBUF_ID_SOUND_BLEND = 52', () => { expect(MOB_CONF_DEBUF_ID_SOUND_BLEND).toBe(52); });
        it('MOB_CONF_DEBUF_ID_JACK_FROST_NOVA = 53', () => { expect(MOB_CONF_DEBUF_ID_JACK_FROST_NOVA).toBe(53); });
        it('MOB_CONF_DEBUF_ID_CLIMAX_QUAKE = 54', () => { expect(MOB_CONF_DEBUF_ID_CLIMAX_QUAKE).toBe(54); });
        it('MOB_CONF_DEBUF_ID_CLIMAX_BLOOM = 55', () => { expect(MOB_CONF_DEBUF_ID_CLIMAX_BLOOM).toBe(55); });
        it('MOB_CONF_DEBUF_ID_TOXIN_OF_MANDARA = 56', () => { expect(MOB_CONF_DEBUF_ID_TOXIN_OF_MANDARA).toBe(56); });
        it('BuildUpMobConfDebufSelectArea が関数', () => { expect(typeof BuildUpMobConfDebufSelectArea).toBe('function'); });
        it('SyncronizeMobConfDebufSettingsVarToCtrl が関数', () => { expect(typeof SyncronizeMobConfDebufSettingsVarToCtrl).toBe('function'); });
        it('SyncronizeMobConfDebufSettingsCtrlToVar が関数', () => { expect(typeof SyncronizeMobConfDebufSettingsCtrlToVar).toBe('function'); });
        it('OnClickMobConfDebufSwitch が関数', () => { expect(typeof OnClickMobConfDebufSwitch).toBe('function'); });
        it('OnChangeMobConfDebuf が関数', () => { expect(typeof OnChangeMobConfDebuf).toBe('function'); });
        it('RefreshMobConfDebufSelectAreaHeader が関数', () => { expect(typeof RefreshMobConfDebufSelectAreaHeader).toBe('function'); });
        it('RefreshMobConfDebufControlCSS が関数', () => { expect(typeof RefreshMobConfDebufControlCSS).toBe('function'); });
    });

    describe('window互換確認', () => {
        it('window.n_B_IJYOU が配列', () => { expect(Array.isArray((window as any).n_B_IJYOU)).toBe(true); });
        it('window.MOB_CONF_DEBUF_ID_PROVOKE = 0', () => { expect((window as any).MOB_CONF_DEBUF_ID_PROVOKE).toBe(0); });
    });

    describe('MobConfDebufOBJ 初期化確認', () => {
        it('n_B_IJYOU が長さ MOB_CONF_DEBUF_LIMIT の配列', () => { expect(n_B_IJYOU.length).toBe(MOB_CONF_DEBUF_LIMIT); });
    });
});
