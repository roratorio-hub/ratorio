const last_updated = "2024/01/21 09:00";
/*
function SetMainMenuFrame(){

	var bModeXX = false;
	var objRoot = null;
	var objDiv = null;
	var objDivGrp = null;
	var objSpan = null;
	var objA = null;
	var objInput = null;
	var objHr = null;

	objRoot = document.getElementById("ID_FRAME");

	// 特殊モード指定の判定
	if (!objRoot) {
		objRoot = document.getElementById("ID_FRAME_MODE_XX");

		if (!objRoot) {
			return;
		}
		bModeXX = true;
	}

	objDiv = document.createElement("div");
	objDiv.setAttribute("style", "font-size : small; text-align : center; line-height: 2;");
	objRoot.appendChild(objDiv);

	//----------------------------------------------------------------
	//
	// タイトルグループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "padding: 0 0 0.5em;");
	objDiv.appendChild(objDivGrp);

	//--------------------------------
	// タイトル
	//--------------------------------
	objA = document.createElement("div");
//  objA.setAttribute("href", "../main/main.html");
	objA.setAttribute("style", "text-decoration: none; color: black; font-size: larger;");
	objA.appendChild(document.createTextNode("ROラトリオHub"));
	objDivGrp.appendChild(objA);
//	objDivGrp.appendChild(document.createElement("br"));





	//----------------------------------------------------------------
	// 区切り線
	//----------------------------------------------------------------
	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin: 0");
	objDiv.appendChild(objHr);






	//----------------------------------------------------------------
	//
	// 安定版計算機グループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "padding: 0 0 0.5em;");
	objDiv.appendChild(objDivGrp);

	//--------------------------------
	// ラベル
	//--------------------------------
	objDivGrp.appendChild(document.createTextNode("－ 安定版 －"));
	objDivGrp.appendChild(document.createElement("br"));



	// ２面表示の場合は、解除するメニューにして、以降を表示させない
	if (bModeXX) {

		//--------------------------------
		// ２面表示解除
		//--------------------------------
		objA = document.createElement("a");
		objDivGrp.appendChild(objA);
		objDivGrp.appendChild(document.createElement("br"));
		objA.setAttribute("href", "../main/main.html");
		objA.appendChild(document.createTextNode("２面表示解除"));
		objA.appendChild(document.createElement("br"));
		objA.appendChild(document.createTextNode("(メインページ)"));



		//----------------------------------------------------------------
		// 区切り線
		//----------------------------------------------------------------
		objHr = document.createElement("hr");
		objHr.setAttribute("style", "margin: 0");
		objDiv.appendChild(objHr);



		//----------------------------------------------------------------
		//
		// その他グループ
		//
		//----------------------------------------------------------------
		objDivGrp = document.createElement("div");
		objDivGrp.setAttribute("style", "padding: 0 0 0.5em;");
		objDiv.appendChild(objDivGrp);

		//--------------------------------
		// ラベル
		//--------------------------------
		objDivGrp.appendChild(document.createElement("br"));

		//--------------------------------
		// 背景色切り替え
		//--------------------------------
		objInput = document.createElement("input");
		objDivGrp.appendChild(objInput);
		objDivGrp.appendChild(document.createElement("br"));
		objInput.setAttribute("type", "button");
		objInput.setAttribute("value", "背景色切替");
		objInput.setAttribute("onclick", "SwitchBGColor()");

		return;
	}



	//--------------------------------
	// 総合計算機
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../m/calcx.html");
	objA.appendChild(document.createTextNode("総合計算機"));

	//--------------------------------
	// 余白
	//--------------------------------
	objDivGrp.appendChild(document.createTextNode("　"));

	//--------------------------------
	// ヘルプ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../howtouse/howtouse_calc.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("？"));


	//--------------------------------
	// 改行
	//--------------------------------
	objDivGrp.appendChild(document.createElement("br"));


	//--------------------------------
	// ２面表示
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../m/calcxx.html");
	objA.appendChild(document.createTextNode("２面表示"));

	//--------------------------------
	// 余白
	//--------------------------------
	objDivGrp.appendChild(document.createTextNode("　"));

	//--------------------------------
	// ヘルプ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../howtouse/howtouse_calcxx.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("？"));





	//----------------------------------------------------------------
	// 区切り線
	//----------------------------------------------------------------
	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin: 0");
	objDiv.appendChild(objHr);





	//----------------------------------------------------------------
	//
	// 次世代板計算機グループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "padding: 0 0 0.5em;");
	objDiv.appendChild(objDivGrp);

	//--------------------------------
	// ラベル
	//--------------------------------
	objDivGrp.appendChild(document.createTextNode("－ 次世代版 －"));
	objDivGrp.appendChild(document.createElement("br"));


	//--------------------------------
	// 総合計算機
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../ro4/m/calcx.html");
	objA.appendChild(document.createTextNode("総合計算機"));

	//--------------------------------
	// 余白
	//--------------------------------
	objDivGrp.appendChild(document.createTextNode("　"));

	//--------------------------------
	// ヘルプ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../howtouse/howtouse_calc_ro4.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("？"));





	//----------------------------------------------------------------
	// 区切り線
	//----------------------------------------------------------------
	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin: 0");
	objDiv.appendChild(objHr);





	//----------------------------------------------------------------
	//
	// データ一覧グループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 3em;");
	objDiv.appendChild(objDivGrp);


	//--------------------------------
	// アイテム一覧
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/itemlist.html");
	objA.appendChild(document.createTextNode("アイテム一覧"));

	//--------------------------------
	// カード一覧
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/cardlist.html");
	objA.appendChild(document.createTextNode("カード一覧"));

	//--------------------------------
	// モンスター一覧
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/monsterlist.html");
	objA.appendChild(document.createTextNode("モンスター一覧"));

	//--------------------------------
	// 経験値テーブル
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/exp.html");
	objA.appendChild(document.createTextNode("経験値テーブル"));

	//--------------------------------
	// Jobボーナス表
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/jobb.html");
	objA.appendChild(document.createTextNode("Jobボーナス表"));

	//--------------------------------
	// 属性表
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../other/element.html");
	objA.appendChild(document.createTextNode("属性表"));





	//----------------------------------------------------------------
	//
	// Ｑ＆Ａグループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 3em;");
	objDiv.appendChild(objDivGrp);


	//--------------------------------
	// 本家メモ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../data/memo1.html");
	objA.appendChild(document.createTextNode("本家メモ"));

	//--------------------------------
	// 本家Ｑ＆Ａ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../form/qa2.html");
	objA.appendChild(document.createTextNode("本家Ｑ＆Ａ"));

	//--------------------------------
	// 避難所Ｑ＆Ａ
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../form/qaHinanjo.html");
	objA.appendChild(document.createTextNode("避難所Ｑ＆Ａ"));

	//--------------------------------
	// 過去の問合せ回答
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../form/qaAnswer.html");
	objA.appendChild(document.createTextNode("過去の問合せ回答"));





	//----------------------------------------------------------------
	//
	// その他グループ
	//
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 3em;");
	objDiv.appendChild(objDivGrp);


	//--------------------------------
	// 更新履歴
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../kousin/kousin.html");
	objA.appendChild(document.createTextNode("更新履歴"));

	//--------------------------------
	// 投稿フォーム
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objDivGrp.appendChild(document.createElement("br"));
	objA.setAttribute("href", "../form/form.html");
	objA.appendChild(document.createTextNode("投稿フォーム"));


	//----------------------------------------------------------------
	// Information
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 0.5em;");
	objDiv.appendChild(objDivGrp);

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../information/index.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("このサイトについて"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../information/todo.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("今後の予定"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../information/history/index.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("更新履歴"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../information/wanted/index.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("情報提供のお願い"));

	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin-top: 10");
	objDiv.appendChild(objHr);

	//----------------------------------------------------------------
	// Contact Us
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 0.5em;");
	objDiv.appendChild(objDivGrp);

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../../information/response/index.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("Q&A"));
	objDivGrp.appendChild(document.createElement("br"));
	
	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin-top: 10");
	objDiv.appendChild(objHr);

	//--------------------------------
	// Link
	//--------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 1.0em;");
	objDiv.appendChild(objDivGrp);

	objDivGrp.appendChild(document.createTextNode("－ 外部リンク －"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "https://github.com/roratorio-hub/ratorio");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("Github"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "https://discord.gg/wcKE7PkQ9x");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("Discord"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "https://roratorio-hinanjo.net/roro/main/main.html");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("ROラトリオ避難所"));
	objDivGrp.appendChild(document.createElement("br"));

	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "http://roratorio.2-d.jp/ro/");
	objA.setAttribute("target", "_blank");
	objA.appendChild(document.createTextNode("ROラトリオ"));
	objDivGrp.appendChild(document.createElement("br"));

	objHr = document.createElement("hr");
	objHr.setAttribute("style", "margin-top: 10");
	objDiv.appendChild(objHr);

	//----------------------------------------------------------------
	// 更新日時表示
	//----------------------------------------------------------------
	objDivGrp = document.createElement("div");
	objDivGrp.setAttribute("style", "margin-top: 0.5em;");
	objDiv.appendChild(objDivGrp);

	objDivGrp.appendChild(document.createTextNode("更新日時"));
	objDivGrp.appendChild(document.createElement("br"));
	objDivGrp.appendChild(document.createTextNode("2024/01/10 13:00"));
	objDivGrp.appendChild(document.createElement("br"));

	//--------------------------------
	// ダウンロード
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../download/download.html");
	objA.appendChild(document.createTextNode("ダウンロード"));
	objDivGrp.appendChild(document.createElement("br"));

	//--------------------------------
	// ミラクル計算機
	//--------------------------------
	objA = document.createElement("a");
	objDivGrp.appendChild(objA);
	objA.setAttribute("href", "../other/miracle.html");
	objA.appendChild(document.createTextNode("ミラクル計算機"));
	objDivGrp.appendChild(document.createElement("br"));

	objInput = document.createElement("input");
	objDivGrp.appendChild(objInput);
	objDivGrp.appendChild(document.createElement("br"));
	objInput.setAttribute("type", "button");
	objInput.setAttribute("value", "背景色切替");
	objInput.setAttribute("onclick", "SwitchBGColor()");
	objInput.setAttribute("style", "margin-top: 3em;");
}
*/

g_BGColorSwitch = false;

// 背景色切替
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

// SetMainMenuFrame();

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
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/cardlist.html">カード一覧</a></span></li>
		  <li class="menu-item"><span class="menu-title"><a href="../../roro/other/itemlist.html">アイテム一覧</a></span></li>

		  <li class="menu-header"><span>Information</span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/index.html" class="local">このサイトについて</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/todo.html" class="local">今後の予定</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/history/index.html" class="local">更新履歴</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/alert/index.html" class="local">不具合のお知らせ</a></span></li>
          <li class="menu-item"><span class="menu-title"><a href="../../information/wanted/index.html" class="local">情報提供のお願い</a></span></li>

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
