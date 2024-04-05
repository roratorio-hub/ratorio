$(function () {
  const ids = [
    "#OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX",
    "#OBJID_SELECT_FLOATING_INFO_AREA_COUNT",
    "#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE",
    "#OBJID_SELECT_FLOATING_INFO_0", "#OBJID_SELECT_EXTRA_INFO_1",
    "#OBJID_SELECT_FLOATING_INFO_1", "#OBJID_SELECT_EXTRA_INFO_2",
    "#OBJID_SELECT_FLOATING_INFO_2", "#OBJID_SELECT_EXTRA_INFO_3",
    "#OBJID_SELECT_FLOATING_INFO_3", "#OBJID_SELECT_EXTRA_INFO_4",
    "#OBJID_SELECT_FLOATING_INFO_4", "#OBJID_SELECT_EXTRA_INFO_5",
  ]
  let display_status = []
  const bake = () => {
    $.cookie("custom-display", display_status.join(":"), { expires: 365 });
  }
  if ($.cookie("custom-display")) {
    display_status = $.cookie("custom-display").split(":");
    if (~~display_status[0]) {
      $(ids[0]).click();
    }
    for (i = 1; i < display_status.length; i++) {
      $(ids[i]).val(display_status[i]);
      $(ids[i]).trigger("change");
    }
  }
  $(document).on("click", "#OBJID_FLOATING_INFO_AREA_EXTRACT_CHECKBOX", (e) => {
    display_status[0] = $(e.target).prop("checked")?1:0;
    if ($(e.target).prop("checked")) {
      display_status[1] = $("#OBJID_SELECT_FLOATING_INFO_AREA_COUNT").val();
      display_status[2] = $("#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE").val();
    }
    bake();
  });
  $(document).on("change", "#OBJID_SELECT_FLOATING_INFO_AREA_COUNT", (e) => {
    display_status[1] = $(e.target).val();
    display_status = display_status.slice(0,3+2*parseInt($(e.target).val()))
    for (i=3;i<3+2*parseInt($(e.target).val());i++) {
      display_status[i] = $(ids[i]).val() || 0;
    }
    bake();
  });
  $(document).on("change", "#OBJID_SELECT_FLOATING_INFO_AREA_FONT_SIZE", (e) => {
    display_status[2] = $(e.target).val();
    bake();
  });
  for (i = 0; i < 5; i++) {
    const idx = i;
    $(document).on("change", `#OBJID_SELECT_FLOATING_INFO_${i}`, (e) => {
      display_status[3 + 2 * idx] = $(e.target).val();
      display_status[3 + 2 * idx + 1] = $(`#OBJID_SELECT_EXTRA_INFO_${idx + 1}`).val() || 0;
      bake();
    });
    $(document).on("change", `#OBJID_SELECT_EXTRA_INFO_${i + 1}`, (e) => {
      display_status[3 + 2 * idx + 1] = $(e.target).val();
      bake();
    });
  }
});