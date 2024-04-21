/**
* 計算機の状態を LocalStorage にセーブ、あるいはロードする
* config.html から設定を変更し calcx.html で設定を反映させるので両方の html から当 js を参照すること
*/
$(function () {
    // グローバル変数の初期化 (0 or 1)
    g_op_simple_battle_view = ~~localStorage.getItem("op_simple_battle_view");

    // --------------------------------
    // 本体側の処理
    // --------------------------------
    if (g_op_simple_battle_view === 1) {
        $('#OBJID_DIV_BATTLE_RESULT_TINY').show();
        $('#OBJID_DIV_RESIST_ELEMENT_TINY').show();
    }

    // --------------------------------
    // オプション画面(IFrame)側の処理
    // --------------------------------
    // 設定のロード
    if (g_op_simple_battle_view === 1) {
        $("#OBJID_OPTION_SIMPLE_BATTLE_VIEW").click();
    }
    // 各設定のチェックボックスにイベントハンドラを追加
    $(document).on("click", "#OBJID_OPTION_SIMPLE_BATTLE_VIEW", (e) => {
        g_op_simple_battle_view = $(e.target).prop("checked")? 1: 0;
        localStorage.setItem("op_simple_battle_view", g_op_simple_battle_view);
        if (g_op_simple_battle_view === 1) {
            window.parent.$('#OBJID_DIV_BATTLE_RESULT_TINY').show();
            window.parent.$('#OBJID_DIV_RESIST_ELEMENT_TINY').show();
        }
        else {
            window.parent.$('#OBJID_DIV_BATTLE_RESULT_TINY').hide();
            window.parent.$('#OBJID_DIV_RESIST_ELEMENT_TINY').hide();
        }
    });
});