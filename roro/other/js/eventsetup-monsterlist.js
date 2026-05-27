import { InitMonsterListSelectArea, RefreshMonsterList } from './hmmonsterlist.js';

document.addEventListener('DOMContentLoaded', InitMonsterListSelectArea);

const refreshIds = [
    'OBJID_SELECT_SORT_KEY', 'OBJID_INPUT_DIGIT3', 'OBJID_INPUT_DESC',
    'OBJID_SELECT_QM', 'OBJID_INPUT_DARKNESS', 'OBJID_INPUT_ANTI_BLESS',
    'OBJID_SELECT_RACE', 'OBJID_SELECT_ELEMENT', 'OBJID_SELECT_SIZE',
    'OBJID_INPUT_LOW', 'OBJID_INPUT_HIGH',
];
refreshIds.forEach(id => document.getElementById(id)?.addEventListener('change', RefreshMonsterList));
