import { OnLoadPetList, RefreshPetListTable } from './hmpetlist.js';

document.addEventListener('DOMContentLoaded', OnLoadPetList);
document.getElementById('F_CONDITION')?.addEventListener('change', RefreshPetListTable);
