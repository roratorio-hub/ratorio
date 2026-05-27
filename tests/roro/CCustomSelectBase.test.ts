import { describe, it, expect } from 'vitest';
import { CCustomSelectBase } from '@roro/CCustomSelectBase.js';

describe('CCustomSelectBase.js', () => {
    describe('エクスポート確認', () => {
        it('CCustomSelectBase が関数（コンストラクタ）', () => {
            expect(typeof CCustomSelectBase).toBe('function');
        });
    });

    describe('インスタンス初期値確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CCustomSelectBase(); });
        it('instanceIdName が空文字', () => expect(obj.instanceIdName).toBe(''));
        it('extractTitle が空文字', () => expect(obj.extractTitle).toBe(''));
        it('selectedDataId が 0', () => expect(obj.selectedDataId).toBe(0));
        it('selectedSortId が 0', () => expect(obj.selectedSortId).toBe(0));
        it('bExtracted が false', () => expect(obj.bExtracted).toBe(false));
        it('bDispHelp が false', () => expect(obj.bDispHelp).toBe(false));
        it('objRoot が null', () => expect(obj.objRoot).toBeNull());
        it('onChangeSelectDataExtraHandllerArray が空配列', () => {
            expect(obj.onChangeSelectDataExtraHandllerArray).toEqual([]);
        });
    });

    describe('インスタンスメソッド存在確認', () => {
        let obj: any;
        beforeEach(() => { obj = new CCustomSelectBase(); });
        const methods = [
            'Initialize', 'GetRootObject', 'GetSelectedDataId', 'ChangeSelectedDataId',
            'ChangeExtractState', 'AddOnChangeSelectDataExtraHandller', 'ResetSelect',
            'GetHandlerScriptOnChangeSelectData', 'GetHandlerScriptOnChangeExtractSwitch',
            'GetHandlerScriptOnClickHelpButton', 'GetHandlerScriptOnClickCloseButton',
            'GetHandlerScriptOnChangeSelectSort', 'GetHandlerScriptOnInputInputSearch',
            'GetHandlerScriptOnChangeSearchResult', 'GetHandlerScriptOnDblClickSearchResult',
            'GetHandlerScriptOnClickApplyButton',
            'CreateSelectData', 'CreateSelectDataSub',
            'CreateExtractSwitch', 'CreateHelpButton', 'CreateCloseButton',
            'CreateSelectSort', 'CreateSelectSortSub',
            'CreateInputSearch', 'CreateInputSearchSub',
            'CreateSearchResult', 'CreateSearchResultSub',
            'CreateApplyButton', 'CreateApplyButtonSub',
            'RebuildSelectData', 'RebuildSelectDataSub',
            'RebuildExtractSwitch', 'RebuildExtractArea',
            'RebuildHelpButton', 'RebuildHelpArea', 'RebuildHelpAreaSub',
            'RebuildHelpAreaSubDefault', 'RebuildHelpAreaSubCreateExplainTable',
            'RebuildCloseButton',
            'RebuildSelectSort', 'RebuildSelectSortSub',
            'RebuildInputSearch', 'RebuildInputSearchSub',
            'RebuildSearchResult', 'RebuildSearchResultSub',
            'RebuildApplyButton', 'RebuildApplyButtonSub',
            'OnChangeSelectData', 'OnChangeSelectDataSub',
            'OnChangeExtractSwitch',
            'OnClickHelpButton',
            'OnClickCloseButton',
            'OnChangeSelectSort', 'OnChangeSelectSortSub',
            'OnInputInputSearch', 'OnInputInputSearchSub',
            'OnChangeSearchResult', 'OnChangeSearchResultSub',
            'OnDblClickSearchResult', 'OnDblClickSearchResultSub',
            'OnClickApplyButton', 'OnClickApplyButtonSub',
            'ApplySearchResult', 'ApplySearchResultSub',
        ];
        for (const m of methods) {
            it(`インスタンスメソッド ${m} が関数`, () => {
                expect(typeof obj[m]).toBe('function');
            });
        }
    });

    describe('静的プロパティ・メソッド確認', () => {
        it('instanceMap が Map', () => {
            expect(CCustomSelectBase.instanceMap).toBeInstanceOf(Map);
        });
        const staticMethods = [
            'RegisterInstance', 'CreateKanaSearchRegExp',
            'OnChangeSelectData', 'OnChangeExtractSwitch',
            'OnClickHelpButton', 'OnClickCloseButton',
            'OnChangeSelectSort', 'OnInputInputSearch',
            'OnChangeSearchResult', 'OnDblClickSearchResult',
            'OnClickApplyButton',
        ];
        for (const m of staticMethods) {
            it(`静的メソッド ${m} が関数`, () => {
                expect(typeof (CCustomSelectBase as any)[m]).toBe('function');
            });
        }
    });

    describe('window互換確認', () => {
        it('window.CCustomSelectBase が設定されている', () => {
            expect((window as any).CCustomSelectBase).toBe(CCustomSelectBase);
        });
    });
});
