import { describe, it, expect, afterEach } from 'vitest';
import { GetAttackMethodOptionValue } from '@engine/battle/attack-method-option.js';
import { CAttackMethodConf } from '@engine/battle/CAttackMethodConf.js';
import { CS } from '@engine/battle/calc-state.js';

// オートスペル計算中は主撃の攻撃手段設定（attackMethodConfArray）がそのまま渡るため、
// GetOptionValue() を素通しするとオートスペル本来のスキルとは無関係な値を読んでしまう
// （エイムドボルト・號砲で実際に倍率欠落が発生した原因）。CS.n_AS_MODE の有無で
// 参照先を切り替えることを確認する。
describe('attack-method-option.js', () => {
    afterEach(() => {
        CS.n_AS_MODE = false;
    });

    it('CS.n_AS_MODE が false のとき、attackMethodConfArray のオプション値を返す', () => {
        const conf = new CAttackMethodConf();
        conf.SetOptionValue(0, 2);
        CS.n_AS_MODE = false;

        expect(GetAttackMethodOptionValue([conf], 0, 999)).toBe(2);
    });

    it('CS.n_AS_MODE が true のとき、attackMethodConfArray の値を無視して既定値を返す', () => {
        const conf = new CAttackMethodConf();
        conf.SetOptionValue(0, 2);
        CS.n_AS_MODE = true;

        expect(GetAttackMethodOptionValue([conf], 0, 999)).toBe(999);
    });

    it('CS.n_AS_MODE が true のとき、範囲外インデックスでも既定値を返す', () => {
        const conf = new CAttackMethodConf();
        CS.n_AS_MODE = true;

        expect(GetAttackMethodOptionValue([conf], 3, 5)).toBe(5);
    });
});
