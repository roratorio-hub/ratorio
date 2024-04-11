/**
 * 計算機の状態をCookieにセーブ、あるいはロードする
 */
$(function () {

  /**
   * ----------------------------------------
   * カスタム表示の処理
   * ----------------------------------------
   */
  const custom_display_ids = [
    "#OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX",
    "#OBJID_SELECT_FLOATING_INFO_AREA_COUNT",
    "#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE",
    "#OBJID_SELECT_FLOATING_INFO_0", "#OBJID_SELECT_EXTRA_INFO_1",
    "#OBJID_SELECT_FLOATING_INFO_1", "#OBJID_SELECT_EXTRA_INFO_2",
    "#OBJID_SELECT_FLOATING_INFO_2", "#OBJID_SELECT_EXTRA_INFO_3",
    "#OBJID_SELECT_FLOATING_INFO_3", "#OBJID_SELECT_EXTRA_INFO_4",
    "#OBJID_SELECT_FLOATING_INFO_4", "#OBJID_SELECT_EXTRA_INFO_5",
  ]
  let custom_display_status = [];
  const bake_custom_display = () => {
    $.cookie("custom-display", custom_display_status.join(":"), { expires: 365 });
  }
  if ($.cookie("custom-display")) {
    custom_display_status = $.cookie("custom-display").split(":");
    if (~~custom_display_status[0]) {
      $(custom_display_ids[0]).click();
    }
    for (i = 1; i < custom_display_status.length; i++) {
      $(custom_display_ids[i]).val(custom_display_status[i]);
      $(custom_display_ids[i]).trigger("change");
    }
  }
  $(document).on("click", "#OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX", (e) => {
    custom_display_status[0] = $(e.target).prop("checked")?1:0;
    if ($(e.target).prop("checked")) {
      custom_display_status[1] = $("#OBJID_SELECT_FLOATING_INFO_AREA_COUNT").val();
      custom_display_status[2] = $("#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE").val();
    }
    bake_custom_display();
  });
  $(document).on("change", "#OBJID_SELECT_FLOATING_INFO_AREA_COUNT", (e) => {
    custom_display_status[1] = $(e.target).val();
    custom_display_status = custom_display_status.slice(0,3+2*parseInt($(e.target).val()))
    for (i=3;i<3+2*parseInt($(e.target).val());i++) {
      custom_display_status[i] = $(custom_display_ids[i]).val() || 0;
    }
    bake_custom_display();
  });
  $(document).on("change", "#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE", (e) => {
    custom_display_status[2] = $(e.target).val();
    bake_custom_display();
  });
  for (i = 0; i < 5; i++) {
    const idx = i;
    $(document).on("change", `#OBJID_SELECT_FLOATING_INFO_${i}`, (e) => {
      custom_display_status[3 + 2 * idx] = $(e.target).val();
      custom_display_status[3 + 2 * idx + 1] = $(`#OBJID_SELECT_EXTRA_INFO_${idx + 1}`).val() || 0;
      bake_custom_display();
    });
    $(document).on("change", `#OBJID_SELECT_EXTRA_INFO_${i + 1}`, (e) => {
      custom_display_status[3 + 2 * idx + 1] = $(e.target).val();
      bake_custom_display();
    });
  }

  /** 
   * ----------------------------------------
   * アイテム情報の処理
   * ----------------------------------------
   */
  const item_info_ids = [
    "#OBJID_ITEM_INFO_EXTRACT_CHECKBOX",
    "#OBJID_CHECK_ITEM_INFO_AUTO_FLAG",
    "#OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG",
  ];
  let item_info_status = [];
  // アイテム情報の状態をCookieにセーブする
  const bake_item_info = () => {
    $.cookie("item_info", item_info_status.join(":"), { expires: 365 });
  }
  // Cookieからアイテム情報の状態をロードする
  if ($.cookie("item_info")) {
    item_info_status = $.cookie("item_info").split(":");
    for (i = 0; i < item_info_status.length; i++) {
      // ロードされた状態がチェック済み かつ 現在の状態が未チェックの場合
      if (item_info_status[i] === "1" && !$(item_info_ids[i]).prop("checked")) {
        $(item_info_ids[i]).click();
      }
      // ロードされた状態が未チェック かつ 現在の状態がチェック済みの場合
      else if (item_info_status[i] === "0" && $(item_info_ids[i]).prop("checked")) {
        $(item_info_ids[i]).click();
      }
    }
  }
  // イベントリスナー追加 1
  $(document).on("click", "#OBJID_ITEM_INFO_EXTRACT_CHECKBOX", (e) => {
    item_info_status[0] = $(e.target).prop("checked")?1:0;
    item_info_status[1] = $("#OBJID_CHECK_ITEM_INFO_AUTO_FLAG").prop("checked")?1:0;
    item_info_status[2] = $("#OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG").prop("checked")?1:0;
    bake_item_info();
  });
  // イベントリスナー追加 2
  $(document).on("click", "#OBJID_CHECK_ITEM_INFO_AUTO_FLAG", (e) => {
    item_info_status[0] = 1;
    item_info_status[1] = $(e.target).prop("checked")?1:0;
    item_info_status[2] = $("#OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG").prop("checked")?1:0;
    bake_item_info();
  });
  // イベントリスナー追加 3
  $(document).on("click", "#OBJID_CHECK_ITEM_INFO_APPLY_AUTO_FOCUS_FLAG", (e) => {
    item_info_status[0] = 1;
    item_info_status[1] = $("#OBJID_CHECK_ITEM_INFO_AUTO_FLAG").prop("checked")?1:0;
    item_info_status[2] = $(e.target).prop("checked")?1:0;
    bake_item_info();
  });

});