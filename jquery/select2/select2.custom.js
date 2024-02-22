select2_mode = true;
function ChangeSlect2Mode() {
    select2_mode = !select2_mode;
    LoadSelect2();
}

const SEARCHABLE_SELECT_LIST = [
    '#OBJID_SELECT_JOB',
    '#OBJID_ARMS_RIGHT',
    '#OBJID_ARMS_RIGHT_CARD_1',
    '#OBJID_ARMS_RIGHT_CARD_2',
    '#OBJID_ARMS_RIGHT_CARD_3',
    '#OBJID_ARMS_RIGHT_CARD_4',
    '#OBJID_ARMS_LEFT',
    '#OBJID_ARMS_LEFT_CARD_1',
    '#OBJID_ARMS_LEFT_CARD_2',
    '#OBJID_ARMS_LEFT_CARD_3',
    '#OBJID_ARMS_LEFT_CARD_4',
    '#OBJID_HEAD_TOP',
    '#OBJID_HEAD_TOP_CARD_1',
    '#OBJID_HEAD_MID',
    '#OBJID_HEAD_MID_CARD_1',
    '#OBJID_HEAD_UNDER',
    '#OBJID_SHIELD',
    '#OBJID_SHIELD_CARD_1',
    '#OBJID_BODY',
    '#OBJID_BODY_CARD_1',
    '#OBJID_SHOULDER',
    '#OBJID_SHOULDER_CARD_1',
    '#OBJID_SHOES',
    '#OBJID_SHOES_CARD_1',
    '#OBJID_ACCESSARY_1',
    '#OBJID_ACCESSARY_1_CARD_1',
    '#OBJID_ACCESSARY_1_CARD_4',
    '#OBJID_ACCESSARY_2',
    '#OBJID_ACCESSARY_2_CARD_1',
    '#OBJID_ACCESSARY_2_CARD_4',
];
$.fn.select2.defaults.set("dropdownAutoWidth", "true");
$.fn.select2.defaults.set("width", "auto");
$.fn.select2.defaults.set("minimumResultsForSearch", "12");

function LoadSelect2() {
    SEARCHABLE_SELECT_LIST.forEach((select_id) => {
        $(select_id).select2();
        // Select2が無効化されている場合は職を除く全ての検索機能をOFFにする
        if (!select2_mode) {
            if (select_id != '#OBJID_SELECT_JOB') {
                $(select_id).select2('destroy');
            }
        }
        else {
            // 同一スロットがカードとエンチャントに利用される場合があるので、スロットの状態によって検索機能をON/OFFする
            var isEnchant = $(select_id + ' option:contains(エンチャントなし)').length > 0;
            if (isEnchant) {
                $(select_id).select2('destroy');
            };
        }
    });
};

// 以下のエレメントの状態が変化した時に select2 の UI を更新する
// UI に異常がある場合はここで適切なエレメントが指定されているかチェックして下さい
const INIT_TRIGGER_LIST = [
    '#OBJID_SELECT_JOB',
    '#OBJID_ARMS_RIGHT',
    '#OBJID_ARMS_LEFT',
    '#OBJID_HEAD_TOP',
    '#OBJID_HEAD_MID',
    '#OBJID_HEAD_UNDER',
    '#OBJID_SHIELD',
    '#OBJID_BODY',
    '#OBJID_SHOULDER',
    '#OBJID_SHOES',
    '#OBJID_ACCESSARY_1',
    '#OBJID_ACCESSARY_2',
];

$(function(){
    $(INIT_TRIGGER_LIST.join(',')).on("select2:select", ()=>{
        LoadSelect2();
    })
});

$(document).ready(function() {
    $('.OBJID_MONSTER_MAP_CATEGORY').select2();
    $('.OBJID_MONSTER_MAP_MAP').select2();
    $('.OBJID_MONSTER_MAP_MONSTER').select2();
});
