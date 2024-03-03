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
    '.OBJID_MONSTER_MAP_CATEGORY',
    '.OBJID_MONSTER_MAP_MAP',
    '.OBJID_MONSTER_MAP_MONSTER',
];

// Select2 オプション設定
$.fn.select2.defaults.set("dropdownAutoWidth", "true");
$.fn.select2.defaults.set("width", "auto");
$.fn.select2.defaults.set("minimumResultsForSearch", "12");

/**
 * 指定されたSelect2オブジェクトを上下キーで選択を切り替えられるようにカスタマイズする
 * @param {*} select_id 
 */
function CustomizeSelect2Specify(select_id) {
    $('#select2-' + select_id.slice(1) + '-container').parent().on('keydown', function(e) {
        var current_id = $(select_id).prop('selectedIndex');
        var optionsCount = $(select_id + ' option').length;
        switch (e.which) {
            case 38:    // KEY_UP
            case 40:    // KEY_DOWN
            case 36:    // HOME
            case 35:    // END
                e.preventDefault();
                if (e.which == 38) {
                    $(select_id).prop('selectedIndex', Math.max(0, current_id - 1));
                }
                if (e.which == 40) {
                    $(select_id).prop('selectedIndex', Math.min(optionsCount - 1, current_id + 1));
                }
                if (e.which == 36) {
                    $(select_id).prop('selectedIndex', 0);
                }
                if (e.which == 35) {
                    $(select_id).prop('selectedIndex', optionsCount - 1);
                }
                $(select_id).trigger('change');
                // 装備の場合はセットできるカードの選択欄を再生成する
                if (select_id.indexOf("CARD") == -1) {
                    LoadSelect2Specify(select_id + '_CARD_1');
                    LoadSelect2Specify(select_id + '_CARD_2');
                    LoadSelect2Specify(select_id + '_CARD_3');
                    LoadSelect2Specify(select_id + '_CARD_4');
                }
        }
    });
}

/**
 * 指定した id/class を持つ select タグを select2 にアップデートする
 * @param {*} select_id 
 */
function LoadSelect2Specify(select_id) {
    $(select_id).select2();
    // 同一スロットがカードとエンチャントに利用される場合があるので、スロットの状態によって検索機能をON/OFFする
    var isEnchant = $(select_id + ' option:contains(エンチャントなし)').length > 0;
    if (isEnchant) {
        $(select_id).select2('destroy');
    }
    // 装備とカードの場合はイベントハンドラを追加する
    else if (
        select_id != '#OBJID_SELECT_JOB'
        && select_id != '.OBJID_MONSTER_MAP_CATEGORY'
        && select_id != '.OBJID_MONSTER_MAP_MAP'
        && select_id != '.OBJID_MONSTER_MAP_MONSTER'
        ) {
        CustomizeSelect2Specify(select_id);
    }
};

// 指定された全てのオブジェクトをSELECT2に切替
// 画面初期化時などに呼ばれる
function LoadSelect2() {
    SEARCHABLE_SELECT_LIST.forEach((select_id) => {
        LoadSelect2Specify(select_id);
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

// モンスター情報に Select2 を適用
/*
$(document).ready(function() {
    $('.OBJID_MONSTER_MAP_CATEGORY').select2();
    $('.OBJID_MONSTER_MAP_MAP').select2();
    $('.OBJID_MONSTER_MAP_MONSTER').select2();
});
*/