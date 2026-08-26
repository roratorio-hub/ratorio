import { describe, it, expect } from 'vitest';
import '/workspace/ratorio/engine/common.js';
import '/workspace/ratorio/engine/monster.h.js';
import '/workspace/ratorio/engine/CConfBase.js';
import '/workspace/ratorio/engine/CConfBase2.js';
import '/workspace/ratorio/engine/CSaveDataConverter.js';
import {
	CMobConfInputData,
	CMobConfInputAreaComponentManager,
	GetMobConfInput,
	SetMobConfInput,
	SetActiveIndexMobConfInput,
} from '/workspace/ratorio/engine/CMobConfInput.js';
import { MOB_CONF_INPUT_DATA_INDEX_HP } from '@engine/const/EnumMobConfId.js';

describe('CMobConfInput', () => {

	describe('CMobConfInputData', () => {
		it('インスタンス生成できる', () => {
			const data = new CMobConfInputData();
			expect(data).toBeTruthy();
		});
		it('SetData/GetData が機能する', () => {
			const data = new CMobConfInputData();
			data.SetData(MOB_CONF_INPUT_DATA_INDEX_HP, 9999);
			expect(data.GetData(MOB_CONF_INPUT_DATA_INDEX_HP)).toBe(9999);
		});
		it('SetData 後 IsDefaultValues が false', () => {
			const data = new CMobConfInputData();
			data.SetData(MOB_CONF_INPUT_DATA_INDEX_HP, 9999);
			expect(data.IsDefaultValues()).toBe(false);
		});
	});

	describe('GetMobConfInput / SetMobConfInput', () => {
		it('SetMobConfInput で設定した値を GetMobConfInput で取得できる', () => {
			SetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP, 5555);
			expect(GetMobConfInput(MOB_CONF_INPUT_DATA_INDEX_HP)).toBe(5555);
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
