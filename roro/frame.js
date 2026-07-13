import { ShowToast } from "./common/js/toast.js";

let last_updated = ""; // last_updatedを初期化

// 背景色切替
window.g_BGColorSwitch = false;
function SwitchBGColor() {
	var index  = 0;
	var objBodies = null;
	var objBody = null;
	window.g_BGColorSwitch = !window.g_BGColorSwitch;
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
if (window.location.hostname !== "roratorio-hub.github.io" || window.location.pathname.split("/")[1] !== "ratorio") {
  sitename += "<br>- 開発デモ版 -"
  formurl += `?entry.1590472346=ラトリオHUB以外から遷移しています`
}

fetch('../date.json')
  .then(response => response.json())
  .then(data => {
    last_updated = data.release_date;
  })
  .catch(() => {
    last_updated = "取得失敗...";
  })
  .finally(() => {
    const templ = `
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
		  <li class="menu-item"><span class="menu-title"><a href="../../ro4/m/calcx-ai.html">計算機(AIラトリオお試し版)</a></span></li>
      <!--<li class="menu-item"><span class="menu-title"><a href="../../roro/other/melonfes2026monsterdrop.html">メロン素材検索</a></span></li>-->
      <li class="menu-item"><span class="menu-title"><a href="../../roro/other/itemlist.html">アイテム一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/cardlist.html">カード一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/petlist.html">ペット一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/monsterlist.html">モンスター一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/exp.html">経験値テーブル</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/jobb.html">JOBボーナス表</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/element.html">属性表</a></span></li>

		  <li class="menu-header"><span>Information</span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/roratorio-hub/ratorio/wiki/introduction" target="_blank">サイト紹介・使い方</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/roratorio-hub/ratorio/issues?q=label%3Aquestion" target="_blank">FAQ</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/orgs/roratorio-hub/projects/1/views/1" target="_blank">今後の予定</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://github.com/roratorio-hub/ratorio/issues?q=label%3Arelease+" target="_blank">更新履歴</a></span></li>
          <li class="menu-item"><span class="menu-title">権利表記 (
            <a href="https://github.com/roratorio-hub/ratorio/blob/master/LICENSE_jp" target="_blank">JP</a> / 
            <a href="https://github.com/roratorio-hub/ratorio/blob/master/LICENSE" target="_blank">EN</a>
          )</span></li>

		  <li class="menu-header" style="padding-top: 10px"><span>Contact Us</span></li>
		      <li class="menu-item"><span class="menu-title"><a href="${formurl}">Googleフォーム</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="https://discord.gg/wcKE7PkQ9x">Discord</a></span></li>

		  <li class="menu-header" style="padding-top: 10px"><span>Link</span></li>
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
`;

    RunOnDomReady(() => {
      document.getElementById("ID_FRAME").insertAdjacentHTML("beforeend", templ);

      document.addEventListener("click", (event) => {
        const objLink = event.target.closest(".sidebar a.local, .update-toast a.local");
        if (!objLink) {
          return;
        }
        document.querySelector(".modal-container iframe").setAttribute("src", objLink.getAttribute("href"));
        document.querySelector(".modal-container").classList.toggle("active");
        event.preventDefault();
      });

      document.querySelector(".modal-close")?.addEventListener("click", () => {
        document.querySelector(".modal-container").classList.toggle("active");
      });

      document.addEventListener("click", (event) => {
        if (!event.target.closest(".modal-body")) {
          document.querySelector(".modal-container").classList.remove("active");
        }
      });

      if (typeof CSaveController !== "undefined") {
        if (CSaveController.isAvailableBrowserStorage(CSaveController.STORAGE_TYPE_LOCALSTORAGE)) {
          const save_updated = localStorage.getItem("last_updated");
          if (save_updated < last_updated) {
            ShowToast({
              heading: "前回アクセス以降に更新があります",
              text: '<span class="update-toast"><a href="https://github.com/roratorio-hub/ratorio/issues?q=label%3Arelease+" target="_blank">更新履歴</a> から詳細を確認してください</span>',
              hideAfter: 5000,
              bgColor: "#00d1b2",
              textColor: "#000",
            });
          }
          localStorage.setItem("last_updated", last_updated);
        }
      }
    });
  });

// DOMContentLoaded が既に発火済みの場合にも対応する
function RunOnDomReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  }
  else {
    callback();
  }
}

if (typeof window !== 'undefined') { Object.assign(window, { SwitchBGColor }); }
