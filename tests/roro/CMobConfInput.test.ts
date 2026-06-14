import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/roro/m/js/CGlobalConstManager.js';
import '/workspace/ratorio/roro/m/js/common.js';
import '/workspace/ratorio/roro/m/js/monster.h.js';
import '/workspace/ratorio/roro/m/js/CConfBase.js';
import '/workspace/ratorio/roro/m/js/CConfBase2.js';
import '/workspace/ratorio/roro/m/js/CSaveDataConverter.js';
import {
	CMobConfInputData,
	CMobConfInputAreaComponentManager,
	GetMobConfInput,
	SetMobConfInput,
	SetActiveIndexMobConfInput,
} from '/workspace/ratorio/roro/m/js/CMobConfInput.js';

describe('CMobConfInput', () => {

	describe('DefineEnum定数', () => {
		it('MOB_CONF_INPUT_DATA_INDEX_PROTECT が 0', () => expect((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_PROTECT).toBe(0));
		it('MOB_CONF_INPUT_DATA_INDEX_NAME が 1', () => expect((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_NAME).toBe(1));
		it('MOB_CONF_INPUT_DATA_INDEX_HP が 3', () => expect((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP).toBe(3));
		it('MOB_CONF_INPUT_COUNT が 20', () => expect((globalThis as any).MOB_CONF_INPUT_COUNT).toBe(20));
		it('MOB_CONF_INPUT_VERSION が 29', () => expect((globalThis as any).MOB_CONF_INPUT_VERSION).toBe(29));
	});

	describe('CMobConfInputData', () => {
		it('インスタンス生成できる', () => {
			const data = new CMobConfInputData();
			expect(data).toBeTruthy();
		});
		it('SetData/GetData が機能する', () => {
			const data = new CMobConfInputData();
			data.SetData((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP, 9999);
			expect(data.GetData((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP)).toBe(9999);
		});
		it('SetData 後 IsDefaultValues が false', () => {
			const data = new CMobConfInputData();
			data.SetData((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP, 9999);
			expect(data.IsDefaultValues()).toBe(false);
		});
	});

	describe('GetMobConfInput / SetMobConfInput', () => {
		it('SetMobConfInput で設定した値を GetMobConfInput で取得できる', () => {
			SetMobConfInput((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP, 5555);
			expect(GetMobConfInput((globalThis as any).MOB_CONF_INPUT_DATA_INDEX_HP)).toBe(5555);
		});
		it('SetActiveIndexMobConfInput が呼び出し可能', () => {
			expect(() => SetActiveIndexMobConfInput(0)).not.toThrow();
		});
		it('SetActiveIndexMobConfInput に範囲外の値を渡しても throw しない', () => {
			expect(() => SetActiveIndexMobConfInput(-1)).not.toThrow();
			expect(() => SetActiveIndexMobConfInput(9999)).not.toThrow();
		});
	});

	describe('CMobConfInputAreaComponentManager static', () => {
		it('InputModifyCodeInOutCommon が呼び出し可能', () => {
			expect(() => CMobConfInputAreaComponentManager.InputModifyCodeInOutCommon(null, null)).not.toThrow();
		});
	});

});
