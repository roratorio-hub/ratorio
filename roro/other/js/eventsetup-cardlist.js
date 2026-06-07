import { OnLoadCardList, RefreshCardListTable, OnChangeKindRestrict, OnChangeShowEnchantInfo } from './hmcardlist.js';

document.addEventListener('DOMContentLoaded', OnLoadCardList);
document.getElementById('OBJID_SELECT_CARD_KIND')?.addEventListener('change', OnChangeKindRestrict);
document.getElementById('F_CONDITION')?.addEventListener('change', RefreshCardListTable);
document.querySelector('[name="F_SORT"]')?.addEventListener('change', RefreshCardListTable);
document.getElementById('OBJID_INPUT_SHOW_ENCHANT_INFO')?.addEventListener('change', OnChangeShowEnchantInfo);
