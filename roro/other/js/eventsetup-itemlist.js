import {
    OnLoadItemList, BuildUpItemList,
    OnChangeKindRestrict, OnChangeJobRestrict, OnChnageShowSP,
    OnChangeSortCondition, OnChangeSlotRestrict, OnChangeShowEnchantInfo,
    OnChangePackageRestrict,
} from './hmitemlist.js';

document.addEventListener('DOMContentLoaded', OnLoadItemList);
document.getElementById('OBJID_SELECT_ITEM_KIND')?.addEventListener('change', OnChangeKindRestrict);
document.getElementById('OBJID_SELECT_JOB_RESTRICT')?.addEventListener('change', OnChangeJobRestrict);
document.getElementById('F_CONDITION')?.addEventListener('change', BuildUpItemList);
document.getElementById('OBJID_SELECT_SORT_ATTR')?.addEventListener('change', OnChangeSortCondition);
document.getElementById('OBJID_INPUT_SHOW_SP')?.addEventListener('change', OnChnageShowSP);
document.getElementById('OBJID_INPUT_SORT_DESC')?.addEventListener('change', OnChangeSortCondition);
document.getElementById('OBJID_INPUT_SLOT_RESTRICT')?.addEventListener('change', OnChangeSlotRestrict);
document.getElementById('OBJID_INPUT_SHOW_ENCHANT_INFO')?.addEventListener('change', OnChangeShowEnchantInfo);
document.getElementById('OBJID_SELECT_PACKAGE')?.addEventListener('change', OnChangePackageRestrict);
