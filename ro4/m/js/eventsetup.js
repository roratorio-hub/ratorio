import {
    OnClickLoadSaveData, OnClickSaveSaveData, OnClickDeleteSaveData,
    OnClickClipboardSaveData, OnClickUrlOutMIG, OnClickUrlInMIG,
    OnClickConfirmDialogSwitch,
} from './saveload.js';
import { OnChangeBaseLV, OnChangeStatus, OnChangeJob } from './hmjob.js';
import { AutoCalc } from './head.js';
import { CAttackMethodAreaComponentManager } from './CAttackMethodAreaComponentManager.js';
import { CSaveController } from './CSaveController.js';
import { Click_PassSkillSW } from './BuffJobSpecificSelf.js';
import { Click_Skill4SW } from './BuffGuildAndGospel.js';
import { Click_Skill7SW } from './BuffItemAndFood.js';
import { Click_Skill8SW } from './BuffOtherCategory.js';
import { StAllCalc } from '../../../roro/m/js/foot.js';
import {
    copyAccs, OnChangeArmsTypeRight, OnChangeRefined, OnChangeEquip,
} from '../../../roro/m/js/equip.js';
import { OnClickQuickControlSW } from '../../../roro/m/js/quickcontrol.js';
import { OnClickSlotModeButton } from '../../../roro/m/js/slotpager.js';
import {
    HtmlCopyToClipboardById, HtmlSetObjectValueById,
} from '../../../roro/common/js/util.js';

function wire(id, event, handler) {
    document.getElementById(id)?.addEventListener(event, handler);
}

// セーブ/ロード
wire('OBJID_BUTTON_LOAD_SAVE_DATA_MIG',   'click', OnClickLoadSaveData);
wire('OBJID_BUTTON_SAVE_SAVE_DATA_MIG',   'click', OnClickSaveSaveData);
wire('OBJID_BUTTON_DELETE_SAVE_DATA_MIG', 'click', OnClickDeleteSaveData);
wire('OBJID_BUTTON_DEBUG_SAVE_DATA_MIG',  'click', OnClickClipboardSaveData);
wire('OBJID_BUTTON_URL_OUT_MIG',          'click', OnClickUrlOutMIG);
wire('OBJID_BUTTON_COPY_URL_OUT_MIG',     'click', () => HtmlCopyToClipboardById('OBJID_INPUT_URL_OUT_MIG'));
wire('OBJID_BUTTON_URL_IN_MIG',           'click', OnClickUrlInMIG);
wire('OBJID_BUTTON_CLEAR_URL_IN_MIG',     'click', () => HtmlSetObjectValueById('OBJID_INPUT_URL_IN_MIG', ''));
wire('OBJID_BUTTON_EXPORT_ALL_DATA_MIG',  'click', () => CSaveController.exportAllCharaData());
wire('OBJID_BUTTON_IMPORT_ALL_DATA_MIG',  'click', () => CSaveController.importAllCharaData());
wire('OBJID_SWITCH_CONFIRM_DIALOG',       'click', OnClickConfirmDialogSwitch);
wire('OBJID_BUTTON_OPT_IN_SAVEDATA',      'click', () => optInSavedata());

// クイック設定・スロット切替
wire('OBJID_QUICK_CONTROL_EXTRACT_CHECKBOX', 'click', OnClickQuickControlSW);
wire('OBJID_SLOT_MODE_BUTTON',               'click', () => OnClickSlotModeButton());

// アクセサリコピー
wire('OBJID_ACCESSORY_1_COPY', 'click', () => copyAccs(1, 2));
wire('OBJID_ACCESSORY_2_COPY', 'click', () => copyAccs(2, 1));

// スキルスイッチ（name 属性のみのもの）
document.querySelector('[name="A1_SKILLSW"]')?.addEventListener('click', Click_PassSkillSW);
document.querySelector('[name="A4_SKILLSW"]')?.addEventListener('click', Click_Skill4SW);
document.querySelector('[name="A8_SKILLSW"]')?.addEventListener('click', Click_Skill8SW);
wire('OBJID_CHECK_A7_SKILLSW', 'click', Click_Skill7SW);

// BaseLV・JobLV・職業・ステータス
wire('OBJID_SELECT_BASE_LEVEL', 'change', OnChangeBaseLV);
wire('OBJID_SELECT_JOB_LEVEL',  'change', () => { StAllCalc(); AutoCalc(); });
wire('OBJID_SELECT_JOB',        'change', e => OnChangeJob(e.target.value));

const statusIds = [
    'OBJID_SELECT_STATUS_STR', 'OBJID_SELECT_STATUS_AGI', 'OBJID_SELECT_STATUS_VIT',
    'OBJID_SELECT_STATUS_INT', 'OBJID_SELECT_STATUS_DEX', 'OBJID_SELECT_STATUS_LUK',
    'OBJID_SELECT_STATUS_POW', 'OBJID_SELECT_STATUS_STA', 'OBJID_SELECT_STATUS_WIS',
    'OBJID_SELECT_STATUS_SPL', 'OBJID_SELECT_STATUS_CON', 'OBJID_SELECT_STATUS_CRT',
];
statusIds.forEach(id => wire(id, 'change', OnChangeStatus));

// スピードポーション・武器タイプ
wire('OBJID_SPEED_POT',       'change', () => { StAllCalc(); AutoCalc(); });
wire('OBJID_ARMS_TYPE_RIGHT', 'change', e => { OnChangeArmsTypeRight(e.target.value); StAllCalc(); AutoCalc(); });

// 精錬 (refine): OnChangeRefined + AutoCalc
const refineIds = [
    'OBJID_ARMS_RIGHT_REFINE', 'OBJID_ARMS_LEFT_REFINE',
    'OBJID_HEAD_TOP_REFINE', 'OBJID_SHIELD_REFINE',
    'OBJID_BODY_REFINE', 'OBJID_SHOULDER_REFINE', 'OBJID_SHOES_REFINE',
];
refineIds.forEach(id => wire(id, 'change', () => { OnChangeRefined(); AutoCalc(); }));

// 超越 (transcendence): StAllCalc + AutoCalc
const transcendenceIds = [
    'OBJID_ARMS_RIGHT_TRANSCENDENCE', 'OBJID_ARMS_LEFT_TRANSCENDENCE',
    'OBJID_HEAD_TOP_TRANSCENDENCE', 'OBJID_SHIELD_TRANSCENDENCE',
    'OBJID_BODY_TRANSCENDENCE', 'OBJID_SHOULDER_TRANSCENDENCE', 'OBJID_SHOES_TRANSCENDENCE',
];
transcendenceIds.forEach(id => wire(id, 'change', () => { StAllCalc(); AutoCalc(); }));

// 武器属性付与
wire('OBJID_SELECT_ARMS_ELEMENT', 'change', AutoCalc);

// 装備選択: OnChangeEquip + AutoCalc
const equipWithAutoCalc = [
    ['OBJID_ARMS_RIGHT',   'EQUIP_REGION_ID_ARMS'],
    ['OBJID_ARMS_LEFT',    'EQUIP_REGION_ID_ARMS_LEFT'],
    ['OBJID_HEAD_TOP',     'EQUIP_REGION_ID_HEAD_TOP'],
    ['OBJID_HEAD_MID',     'EQUIP_REGION_ID_HEAD_MID'],
    ['OBJID_HEAD_UNDER',   'EQUIP_REGION_ID_HEAD_UNDER'],
    ['OBJID_SHIELD',       'EQUIP_REGION_ID_SHIELD'],
    ['OBJID_BODY',         'EQUIP_REGION_ID_BODY'],
    ['OBJID_SHOULDER',     'EQUIP_REGION_ID_SHOULDER'],
    ['OBJID_SHOES',        'EQUIP_REGION_ID_SHOES'],
    ['OBJID_ACCESSORY_1',  'EQUIP_REGION_ID_ACCESSORY_1'],
    ['OBJID_ACCESSORY_2',  'EQUIP_REGION_ID_ACCESSORY_2'],
];
equipWithAutoCalc.forEach(([id, regionName]) => {
    wire(id, 'change', e => { OnChangeEquip(window[regionName], parseInt(e.target.value)); AutoCalc(); });
});

// シャドウ装備選択: OnChangeEquip のみ
const shadowEquip = [
    ['OBJID_SHADOW_WEAPON',     'EQUIP_REGION_ID_SHADOW_ARMS_RIGHT'],
    ['OBJID_SHADOW_SHIELD',     'EQUIP_REGION_ID_SHADOW_ARMS_LEFT'],
    ['OBJID_SHADOW_BODY',       'EQUIP_REGION_ID_SHADOW_BODY'],
    ['OBJID_SHADOW_SHOESE',     'EQUIP_REGION_ID_SHADOW_FOOT'],
    ['OBJID_SHADOW_ACCESSORY1', 'EQUIP_REGION_ID_SHADOW_ACCESSORY_1'],
    ['OBJID_SHADOW_ACCESSORY2', 'EQUIP_REGION_ID_SHADOW_ACCESSORY_2'],
];
shadowEquip.forEach(([id, regionName]) => {
    wire(id, 'change', e => OnChangeEquip(window[regionName], parseInt(e.target.value)));
});

// 攻撃設定
wire('OBJID_CHECK_DIGIT3',                  'change', () => CAttackMethodAreaComponentManager.OnChangeDigit3());
wire('OBJID_INPUT_ATTACK_METHOD_AUTO_CALC', 'change', () => CAttackMethodAreaComponentManager.OnChangeAutoCalc());
wire('OBJID_SELECT_ACTIVE_INTERVAL',        'change', () => CAttackMethodAreaComponentManager.OnChangeAttackInterval());
wire('OBJID_SELECT_CASTSIM_INTERVAL',       'change', () => CAttackMethodAreaComponentManager.OnChangeCastSimInterval());
wire('OBJID_CHECK_POINT_CAP',               'change', () => CAttackMethodAreaComponentManager.OnChangePointCap());
wire('OBJID_CHECK_DPS_ACTUAL',              'change', () => CAttackMethodAreaComponentManager.OnChangeDpsActual());
