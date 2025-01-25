const last_updated = "2025/01/25 18:30";

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

// オリジナル版とFork版の判定
let sitename = "ROラトリオHub"
let formurl = "https://docs.google.com/forms/d/e/1FAIpQLSfP7hZkIInuBIvlDKf3L66fQ4DGzP3DUAbGPeTwTc3B-y7AKg/viewform"
if (window.location.hostname !== "roratorio-hub.github.io") {
  sitename += "<br>- 開発デモ版 -"
  formurl += `?entry.1590472346=ラトリオHUB以外から遷移しています`
}

templ = `
<aside id="sidebar" class="sidebar">
  <div class="sidebar-layout">
    <div class="sidebar-header">
      <div class="sidebar-logo">
        <div>RH</div>
        <h5>${sitename}</h5>
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
		  <li class="menu-item"><span class="menu-title"><a href="${formurl}">Googleフォーム</a></span></li>
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
  $(document).on("click", ".sidebar a.local, .update-toast a.local", (event)=>{
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
  if (typeof CSaveController !== "undefined") {
    if (CSaveController.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
      const save_updated = localStorage.getItem("last_updated");
      if (save_updated < last_updated) {
        $.toast({
          heading: "前回アクセス以降に更新があります",
          text: '<span class="update-toast"><a href="../../information/history/index.html" class="local">更新履歴</a> から詳細を確認してください</span>',
          icon: "info",
          hideAfter: 5000,
          position: 'bottom-center',
          showHideTransition: 'slide',
          bgColor: "#00d1b2",
          textColor: "#000",
          loader: false,
        });
      }
      localStorage.setItem("last_updated", last_updated);
    }
  }
})
