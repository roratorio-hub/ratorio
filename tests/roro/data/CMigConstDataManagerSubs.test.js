import { describe, it, expect } from 'vitest';
import { CMigConstDataManagerSubBase } from '../../../roro/m/js/data/CMigConstDataManagerSubBase.js';
import { CMigConstDataManagerSubJob } from '../../../roro/m/js/data/CMigConstDataManagerSubJob.js';
import { CMigConstDataManagerSubState } from '../../../roro/m/js/data/CMigConstDataManagerSubState.js';
import { CMigConstDataManagerSubBuff } from '../../../roro/m/js/data/CMigConstDataManagerSubBuff.js';
import { CMigConstDataManagerSubMonster } from '../../../roro/m/js/data/CMigConstDataManagerSubMonster.js';
import { CMigConstDataManagerSubArrow } from '../../../roro/m/js/data/CMigConstDataManagerSubArrow.js';
import { CMigConstDataManagerSubItem } from '../../../roro/m/js/data/CMigConstDataManagerSubItem.js';
import { CMigConstDataManagerSubCard } from '../../../roro/m/js/data/CMigConstDataManagerSubCard.js';
import { CMigConstDataManagerSubEnchList } from '../../../roro/m/js/data/CMigConstDataManagerSubEnchList.js';
import { CMigConstDataManagerSubRndOpt } from '../../../roro/m/js/data/CMigConstDataManagerSubRndOpt.js';

const subClasses = [
    ['CMigConstDataManagerSubJob', CMigConstDataManagerSubJob],
    ['CMigConstDataManagerSubState', CMigConstDataManagerSubState],
    ['CMigConstDataManagerSubBuff', CMigConstDataManagerSubBuff],
    ['CMigConstDataManagerSubMonster', CMigConstDataManagerSubMonster],
    ['CMigConstDataManagerSubArrow', CMigConstDataManagerSubArrow],
    ['CMigConstDataManagerSubItem', CMigConstDataManagerSubItem],
    ['CMigConstDataManagerSubCard', CMigConstDataManagerSubCard],
    ['CMigConstDataManagerSubEnchList', CMigConstDataManagerSubEnchList],
    ['CMigConstDataManagerSubRndOpt', CMigConstDataManagerSubRndOpt],
];

describe('CMigConstDataManagerSub* クラス群', () => {
    for (const [name, Cls] of subClasses) {
        describe(name, () => {
            it(`${name} を export する`, () => {
                expect(typeof Cls).toBe('function');
            });

            it(`window.${name} が設定される`, () => {
                expect(window[name]).toBe(Cls);
            });

            it(`prototype が CMigConstDataManagerSubBase のインスタンスである`, () => {
                expect(Cls.prototype).toBeInstanceOf(CMigConstDataManagerSubBase);
            });
        });
    }
});
