import { OnLoadExpTable, RefreshExpTable } from './hmexptable.js';

document.addEventListener('DOMContentLoaded', OnLoadExpTable);
document.getElementById('OBJID_SELECT_TABLE_KIND')?.addEventListener('change', RefreshExpTable);
document.getElementById('OBJID_SELECT_MONSTER')?.addEventListener('change', RefreshExpTable);
document.getElementById('OBJID_INPUT_EXP_RATE')?.addEventListener('change', RefreshExpTable);
