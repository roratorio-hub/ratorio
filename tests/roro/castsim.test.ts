import { describe, it, expect } from 'vitest';
import {
    SprintfTimeStrCastSim,
} from '@roro/castsim.js';

describe('castsim.js', () => {
    describe('SprintfTimeStrCastSim', () => {
        it('1000ms → "1.00"', () => { expect(SprintfTimeStrCastSim(1000)).toBe('1.00'); });
        it('500ms → "0.50"', () => { expect(SprintfTimeStrCastSim(500)).toBe('0.50'); });
        it('0ms → "0.00"', () => { expect(SprintfTimeStrCastSim(0)).toBe('0.00'); });
        it('1500ms → "1.50"', () => { expect(SprintfTimeStrCastSim(1500)).toBe('1.50'); });
        it('1234ms → "1.23"', () => { expect(SprintfTimeStrCastSim(1234)).toBe('1.23'); });
    });
});
