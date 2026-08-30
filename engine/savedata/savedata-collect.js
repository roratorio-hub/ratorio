/**
 * 状態から直接セーブデータユニット配列を組み立てる（残件台帳 B-11 Phase A）。
 *
 * `CSaveDataManager.encodeToURL()` は現在、最新形式のセーブを作るのに旧形式の保存処理
 * （`SaveSystem()` → 旧形式文字列 → `translateFromOldFormat()`）を経由している。
 * `buildSaveDataUnitsFromState()` はその迂回を経ずに、DOM/グローバルから各ユニットを
 * 直接組み立てる。移植はユニット型ごとに段階的に進める（Phase A1〜A4）。
 *
 * 既存の `CSaveDataManager#collectDataEquipable()` 等（装備・シャドウ装備・プレイヤー状態異常）
 * と同型のパターンを、翻訳経由だった残りの型へ広げたもの。
 */

/**
 * 現在この関数が組み立てるユニット型の集合（Phase 進行に応じて増える）。
 * 差分オラクル（`savedata-collect.test.ts` / `tests/integration/savedata-collect.test.ts`）が
 * 「この Phase までに移植済みの型だけを比較する」ために参照する。
 */
export const MIGRATED_SAVE_DATA_UNIT_TYPES = Object.freeze([]);

/**
 * 状態からセーブデータユニット配列を直接組み立てる.
 * @returns {Array} `MIGRATED_SAVE_DATA_UNIT_TYPES` に含まれる型のユニット配列
 */
export function buildSaveDataUnitsFromState() {
    // Phase A1 以降、型ごとに #collectXxx() 相当の関数をここへ追加していく。
    return [];
}
