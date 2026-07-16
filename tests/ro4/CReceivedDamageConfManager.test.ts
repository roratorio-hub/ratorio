import { describe, it, expect, beforeEach } from 'vitest';
import { CReceivedDamageConfManager } from '@ro4/CReceivedDamageConfManager.js';

const STORAGE_NAME = CReceivedDamageConfManager.STORAGE_NAME;

// head.js の被ダメージ計算設定欄と同じ構成の画面部品を生成する
function buildControls() {
    const mkRatio = (id: string) => {
        const input = document.createElement('input');
        input.id = id;
        input.setAttribute('type', 'number');
        input.setAttribute('min', '100');
        input.setAttribute('max', '60000');
        input.value = '100';
        document.body.appendChild(input);
        return input;
    };
    const mkElement = (id: string, values: number[]) => {
        const sel = document.createElement('select');
        sel.id = id;
        for (const v of values) {
            const opt = document.createElement('option');
            opt.value = String(v);
            sel.appendChild(opt);
        }
        document.body.appendChild(sel);
        return sel;
    };
    return {
        physRatio: mkRatio('OBJID_ENEMY_SKILL_RATIO'),
        physElem: mkElement('OBJID_ENEMY_SKILL_ELEMENT', [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
        magRatio: mkRatio('OBJID_ENEMY_MAGIC_SKILL_RATIO'),
        magElem: mkElement('OBJID_ENEMY_MAGIC_SKILL_ELEMENT', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    };
}

describe('CReceivedDamageConfManager', () => {

    beforeEach(() => {
        localStorage.clear();
        document.body.innerHTML = '';
    });

    it('保存した値を再構築後の画面部品へ復元する（ラウンドトリップ）', () => {
        let c = buildControls();
        c.physRatio.value = '1500';
        c.physElem.value = '3';
        c.magRatio.value = '250';
        c.magElem.value = '7';
        CReceivedDamageConfManager.SaveFromControls();

        // DOM再構築（初期値に戻る）を再現
        document.body.innerHTML = '';
        c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();

        expect(c.physRatio.value).toBe('1500');
        expect(c.physElem.value).toBe('3');
        expect(c.magRatio.value).toBe('250');
        expect(c.magElem.value).toBe('7');
    });

    it('保存データがない場合は画面部品の初期値を変更しない', () => {
        const c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();
        expect(c.physRatio.value).toBe('100');
        expect(c.physElem.value).toBe('-1');
        expect(c.magElem.value).toBe('0');
    });

    it('壊れたJSONが保存されていても例外にならず初期値のまま', () => {
        localStorage.setItem(STORAGE_NAME, '{broken json!!');
        const c = buildControls();
        expect(() => CReceivedDamageConfManager.RestoreToControls()).not.toThrow();
        expect(c.physRatio.value).toBe('100');
    });

    it('バージョンが一致しない保存データは無視する', () => {
        localStorage.setItem(STORAGE_NAME, JSON.stringify({ version: 999, physicalRatio: 5000 }));
        const c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();
        expect(c.physRatio.value).toBe('100');
    });

    it('範囲外の倍率は min / max 属性の範囲へクランプして復元する', () => {
        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            version: CReceivedDamageConfManager.VERSION,
            physicalRatio: 999999,
            magicalRatio: 1,
        }));
        const c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();
        expect(c.physRatio.value).toBe('60000');
        expect(c.magRatio.value).toBe('100');
    });

    it('選択肢に存在しない属性値は復元せず初期選択のまま', () => {
        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            version: CReceivedDamageConfManager.VERSION,
            physicalElement: '42',
            magicalElement: '5',
        }));
        const c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();
        expect(c.physElem.value).toBe('-1');    // 不正値 → 初期選択のまま
        expect(c.magElem.value).toBe('5');      // 正常値 → 復元される
    });

    it('BindPersistence 後は change イベントで localStorage へ保存される', () => {
        const c = buildControls();
        CReceivedDamageConfManager.RestoreToControls();
        CReceivedDamageConfManager.BindPersistence();

        c.physRatio.value = '3000';
        c.physRatio.dispatchEvent(new Event('change'));

        const saved = JSON.parse(localStorage.getItem(STORAGE_NAME)!);
        expect(saved.physicalRatio).toBe(3000);
    });

    it('画面に存在しない項目の保存値は上書きされず維持される', () => {
        let c = buildControls();
        c.magElem.value = '8';
        CReceivedDamageConfManager.SaveFromControls();

        // 魔法属性の select が存在しない画面で保存しても、保存済みの値は残る
        document.body.innerHTML = '';
        c = buildControls();
        c.magElem.remove();
        c.physRatio.value = '2000';
        CReceivedDamageConfManager.SaveFromControls();

        const saved = JSON.parse(localStorage.getItem(STORAGE_NAME)!);
        expect(saved.physicalRatio).toBe(2000);
        expect(saved.magicalElement).toBe('8');
    });

    it('空欄の倍率は保存せず、保存済みの値を維持する', () => {
        const c = buildControls();
        c.physRatio.value = '1200';
        CReceivedDamageConfManager.SaveFromControls();

        c.physRatio.value = '';
        CReceivedDamageConfManager.SaveFromControls();

        const saved = JSON.parse(localStorage.getItem(STORAGE_NAME)!);
        expect(saved.physicalRatio).toBe(1200);
    });
});
