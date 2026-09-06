/**
 * calcx.html のエンジンエントリ。ここに並ぶ import が engine/ 全体の読み込み起点になる。
 * 個々の依存関係は各モジュールの import が表現しているので、ここには「根」だけを置く。
 */

// データ構築が副作用のモジュール。他モジュールからは定数を数個 import されているだけで、
// その import が将来消えるとデータ投入ごと落ちるため、ここで明示的に読む。
import "../data/mig.job.dat.js";
import "../data/mig.enchlist.dat.js";

// Shell: DOM 配線・描画
import "../ui/eventsetup.js";
import "../ui/saveimage.js";

// DOM読み書きゼロの計算API（engine-registry へ自己登録する）
import "../runtime/calc-headless.js";
