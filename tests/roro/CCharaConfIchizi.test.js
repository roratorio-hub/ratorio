import '../../roro/m/js/CGlobalConstManager.js';
import '../../roro/m/js/CConfBase.js';
import { describe, it, expect } from 'vitest';
import { CCharaConfIchizi } from '../../roro/m/js/CCharaConfIchizi.js';

describe('CCharaConfIchizi', () => {
    it('CCharaConfIchizi を function として export する', () => {
        expect(typeof CCharaConfIchizi).toBe('function');
    });

    it('window.CCharaConfIchizi が compat ブロックで設定される', () => {
        expect(window.CCharaConfIchizi).toBe(CCharaConfIchizi);
    });
});
