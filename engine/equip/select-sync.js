/**
 * select の値を設定し、表示と change を同期させる。
 *
 * Tom Select 化された select は元 <select> への直接代入では UI が更新されないため、
 * インスタンスがあれば setValue() を使う。setValue() は非 silent で native 'change' を
 * 発火するので、eventsetup.js の native listener / inline onchange / 再初期化リスナーが
 * すべて駆動する（Tom Select は native change しか見ない）。
 *
 * 必ず「値」で指定すること。アクセサリ1と2ではカード候補リストの並び・件数が
 * 一致しないため、selectedIndex でのコピーは index がズレて空選択になる。
 *
 * 実体は equip.js にあったが、hmcard.js との循環 import（equip → hmcard /
 * hmcard → equip）を断ち切るため依存ゼロの葉モジュールへ切り出した。
 *
 * @param {string} selector 対象 select の CSS セレクタ
 * @param {string} value 設定する値
 */
export function setSelectValueSynced(selector, value) {
	const el = document.querySelector(selector);
	if (!el) return;
	if (el.tomselect) {
		el.tomselect.setValue(value);
	} else {
		el.value = value;
		el.dispatchEvent(new Event('change', { bubbles: true }));
	}
}
