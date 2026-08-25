import { describe, it, expect } from 'vitest';
import { calcReceivedDamage, calcReceivedMagicDamage } from '@ro4/head-received-damage.js';

// ⚠️ 「両方指定されていれば計算を実行する」ケースはここでは検証しない。
// calcReceivedDamage 本体は GetRes/GetMres（hmjob.js）経由で g_objCharaConfCustom* 系
// グローバル10個以上を連鎖的に参照するため、フル計算を通すには本変更の範囲を超える
// セットアップが要る。本変更が触るのは「DOM要素の有無」から「引数の有無」への
// ガード判定の移行のみなので、そこだけを検証する。計算結果の正しさは
// 本番比較の統合テスト（calcx.test.ts 等）が担保する。

/**
 * 被ダメージ計算設定（敵スキル倍率・属性）のDOM直読みを引数化した変更のテスト
 * （残件台帳 B-07）。DOM要素の有無ではなく、呼び出し元が渡す生値の有無で
 * 「設定が無いので計算しない」を判定するようになったことを検証する。
 */
describe('head-received-damage.js: 被ダメージ計算設定は引数で受け取る（DOM非依存）', () => {
    // MONSTER_DATA_EXTRA_INDEX_ATK_MAX/MIN 等の添字にマジックナンバーが使われている
    // 既存コードに合わせ、テストも実データに近い最小限のモンスターデータ配列で代用する。
    const mobData: number[] = new Array(30).fill(0);

    describe('calcReceivedDamage', () => {
        it('skillRatioRaw が未指定（要素なし相当）なら計算せず undefined を返す', () => {
            const result = calcReceivedDamage([], [], mobData, [], null, undefined, '1');
            expect(result).toBeUndefined();
        });

        it('attackElementalRaw が未指定（要素なし相当）なら計算せず undefined を返す', () => {
            const result = calcReceivedDamage([], [], mobData, [], null, '100', undefined);
            expect(result).toBeUndefined();
        });
    });

    describe('calcReceivedMagicDamage', () => {
        it('skillRatioRaw が未指定なら計算せず undefined を返す', () => {
            const result = calcReceivedMagicDamage([], mobData, null, undefined, '1');
            expect(result).toBeUndefined();
        });

        it('attackElementalRaw が未指定なら計算せず undefined を返す', () => {
            const result = calcReceivedMagicDamage([], mobData, null, '100', undefined);
            expect(result).toBeUndefined();
        });
    });
});
