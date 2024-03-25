const last_updated = "2024/03/25 23:00";

// 背景色切替
g_BGColorSwitch = false;
function SwitchBGColor() {
	var index  = 0;
	var objBodies = null;
	var objBody = null;
	g_BGColorSwitch = !g_BGColorSwitch;
	objBodies = document.getElementsByTagName("body");
	for (index = 0; index < objBodies.length; index++) {
		objBody = objBodies[index];
		if (g_BGColorSwitch) {
			objBody.setAttribute("class", "CLS_BODY_ALTERNATIVE");
		}
		else {
			objBody.removeAttribute("class");
		}
	}
}

templ = `
<aside id="sidebar" class="sidebar">
  <a id="btn-collapse" class="sidebar-collapser">&lt;</a>
  <div class="sidebar-layout">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div>RH</div>
        <h5>ROラトリオHub</h5>
      </div>
    </div>
    <div class="sidebar-content">
      <nav class="menu">
        <ul>
		  <li class="menu-header"><span>Main</span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../ro4/m/calcx.html">計算機</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/itemlist.html">アイテム一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/cardlist.html">カード一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/monsterlist.html">モンスター一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/exp.html">経験値テーブル</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/jobb.html">JOBボーナス表</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/element.html">属性表</a></span></li>

		  <li class="menu-header"><span>Information</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/index.html" class="local">このサイトについて</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/todo.html" class="local">今後の予定</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/history/index.html" class="local">更新履歴</a></span></li>
          <!--<li class="menu-item"><span class="menu-title"><a href="../../information/alert/index.html" class="local">不具合のお知らせ</a></span></li>-->
          <li class="menu-item"><span class="menu-title"><a href="../../information/wanted/index.html" class="local">[募集] スキル情報</a></span></li>

		  <li class="menu-header" style="padding-top: 10px"><span>Contact Us</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/response/index.html" class="local">Q&amp;A</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="https://forms.gle/Ai6ghaDT2tV89AVW8"">Googleフォーム</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://discord.gg/wcKE7PkQ9x">Discord</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/roratorio-hub/ratorio">Github</a></span></li>

		  <li class="menu-header" style="padding-top: 10px"><span>Link</span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://roratorio-hinanjo.net/roro/main/main.html">ROラトリオ避難所</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="http://roratorio.2-d.jp/ro/">ROラトリオ</a></span></li>

		  <li class="menu-header" style="padding-top: 20px"><span>Updated</span></li>
          <li class="menu-item"><span class="menu-title">${last_updated}</span></li>
        </ul>
      </nav>
    </div>
		<input type="button" value="背景色切替" onclick="SwitchBGColor()" style="margin-top: 3em;">
		</div>
</aside>
<div class="modal-container">
  <div class="modal-body">
    <button type="button" class="modal-close">close</button>
    <div class="modal-content">
      <iframe></iframe>
    </div>
  </div>
</div>
`

$(function(){
  $("#ID_FRAME").append(templ);
  $(".sidebar-collapser").on("click", ()=>{
    $btn = $(".sidebar-collapser")
    $btn.toggleClass("collapsed");
    $(".side").toggleClass("collapsed");
    if ($btn.hasClass("collapsed")) {
      $(".sidebar-layout").hide()
      $btn.text(">")
    }else{
      $(".sidebar-layout").show()
      $btn.text("<")
    }
  })
  $(".sidebar a.local").on("click", (event)=>{
    $('.modal-container iframe').attr("src",$(event.target).attr("href"));
    $('.modal-container').toggleClass("active");
    return false;
  })
  $(".modal-close").on("click", ()=>{
    $('.modal-container').toggleClass("active");
  })
  $(document).on('click',function(e) {
    if(!$(e.target).closest('.modal-body').length) {
      $('.modal-container').removeClass('active');
    }
  });
})
