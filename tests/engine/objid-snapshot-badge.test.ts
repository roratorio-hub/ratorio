import { describe, it, expect } from 'vitest';
import { stripUnmeasuredBadge } from '../helpers/objid-snapshot.js';

describe('stripUnmeasuredBadge（スナップショットから「(×)」を取り除く）', () => {
    it('値の途中に連結されている「(×)」を全て取り除く', () => {
        const out = stripUnmeasuredBadge({
            OBJID_TD_ATTACK_METHOD_ROOT: '烈火気弾(×)第零撃：破天撃アースドライブ(×)ターンアンデッド',
        });
        expect(out.OBJID_TD_ATTACK_METHOD_ROOT).toBe('烈火気弾第零撃：破天撃アースドライブターンアンデッド');
    });

    it('キーに含まれる「(×)」も取り除く', () => {
        const out = stripUnmeasuredBadge({ 'battle:(×)ネイチャーレイジ > 平均': '100' });
        expect(out).toEqual({ 'battle:ネイチャーレイジ > 平均': '100' });
    });

    it('他の印（(△)(仮)(？)）は取り除かない', () => {
        const out = stripUnmeasuredBadge({ a: '(△)アイストーテム(仮)ジョイントビート(？)ブラストマイン' });
        expect(out.a).toBe('(△)アイストーテム(仮)ジョイントビート(？)ブラストマイン');
    });

    it('スキル名の増減・改名は取り除いた後も差分として残る', () => {
        const prod = stripUnmeasuredBadge({ a: '(×)ファントムダガー' });
        expect(stripUnmeasuredBadge({ a: 'ファントムダガー' })).toEqual(prod);
        expect(stripUnmeasuredBadge({ a: 'ファントムダガーII' })).not.toEqual(prod);
        expect(stripUnmeasuredBadge({ a: '' })).not.toEqual(prod);
    });

    it('元のオブジェクトを書き換えない', () => {
        const src = { a: '(×)ファントムダガー' };
        stripUnmeasuredBadge(src);
        expect(src.a).toBe('(×)ファントムダガー');
    });
});
