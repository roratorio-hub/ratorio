import { describe, it, expect } from 'vitest';
import {
    IsUnconfirmedHP,
    IsUnconfirmedSP,
    UpdateCharaDataHtml,
} from '../../roro/m/js/hmchara.js';

describe('hmchara', () => {
    it('全関数を export する', () => {
        expect(typeof IsUnconfirmedHP).toBe('function');
        expect(typeof IsUnconfirmedSP).toBe('function');
        expect(typeof UpdateCharaDataHtml).toBe('function');
    });

    it('window compat ブロックで主要関数が window に設定される', () => {
        expect(window.IsUnconfirmedHP).toBe(IsUnconfirmedHP);
        expect(window.IsUnconfirmedSP).toBe(IsUnconfirmedSP);
        expect(window.UpdateCharaDataHtml).toBe(UpdateCharaDataHtml);
    });
});
