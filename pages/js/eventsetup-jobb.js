import { OnLoadJobBonusTable, RefreshJobBonusTable } from './jobb.js';

document.addEventListener('DOMContentLoaded', OnLoadJobBonusTable);
document.getElementById('OBJID_SELECT_JOB')?.addEventListener('change', RefreshJobBonusTable);
