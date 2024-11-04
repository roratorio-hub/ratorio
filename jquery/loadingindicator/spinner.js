/**
 * 使い方：
 * showLoadingIndicator()を呼び出してから実際にレンダリングされるまでの僅かな期間、ブラウザのスレッドを解放する必要があります
 * そのため以下の要領で重い処理とhideLoadingIndicator()を非同期処理として実装してください
 * これにより「スピナー表示命令 → レンダリング → 重い処理 → スピナー非表示命令 → レンダリング」の処理が上手く流れます
 * 
 *      showLoadingIndicator();
 *      setTimeout(() => {
 *           ここに重い処理を書く
 *            hideLoadingIndicator();
 *      }, 0);
 */

// ローディングインジケーターの表示と非表示を管理する関数
function showLoadingIndicator() {
    $('#loadingSpinner').show();
}
function hideLoadingIndicator() {
    $('#loadingSpinner').hide();
}
