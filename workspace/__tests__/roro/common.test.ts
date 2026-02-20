/**
 * roro/m/js/common.js のユニットテスト
 *
 * このテストは現状コードを網羅的にテストすることを目的としています。
 * テスト対象のJavaScriptファイルは一切変更せず、TypeScriptラッパーを通じてテストします。
 */

/// <reference path="../types/roro-common.d.ts" />
import { describe, it, expect, beforeAll } from 'vitest';
import { setupRoroTestEnvironment } from '../helpers/roroScriptLoader';

describe('roro/m/js/common.js', () => {

    beforeAll(() => {
        // テスト環境のセットアップ（依存ファイルのロード）
        setupRoroTestEnvironment();
    });

    describe('GetConstDataKindText', () => {
        it('アイテムデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ITEM)).toBe('アイテム');
        });

        it('カードデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_CARD)).toBe('カード');
        });

        it('矢データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ARROW)).toBe('矢');
        });

        it('衣装データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_COSTUME)).toBe('衣装');
        });

        it('アイテムセットデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ITEM_SET)).toBe('アイテムセット');
        });

        it('エンチャントタイプデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ENCHANT_TYPE)).toBe('エンチャントタイプ');
        });

        it('エンチャントリストデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ENCHANT_LIST)).toBe('エンチャントリスト');
        });

        it('時限アイテムデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_TIME_ITEM)).toBe('時限アイテム');
        });

        it('アイテムパックデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ITEM_PACK)).toBe('アイテムパック');
        });

        it('スキルデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_SKILL)).toBe('スキル');
        });

        it('使用可能スキルデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_USABLE_SKILL)).toBe('使用可能スキル');
        });

        it('オートスペルデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_AUTO_SPELL)).toBe('オートスペル');
        });

        it('モンスターデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_MONSTER)).toBe('モンスター');
        });

        it('モンスターグループデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_MONSTER_GROUP)).toBe('モンスターグループ');
        });

        it('モンスターマップデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_MONSTER_MAP)).toBe('モンスターマップ');
        });

        it('ペットデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_PET)).toBe('ペット');
        });

        it('ランダムオプションタイプデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_RND_OPT_TYPE)).toBe('ランダムオプションタイプ');
        });

        it('ランダムオプションリストデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_RND_OPT_LIST)).toBe('ランダムオプションリスト');
        });

        it('ランダムオプションデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_RND_OPT)).toBe('ランダムオプション');
        });

        it('更新履歴データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_CHANGE_LOG)).toBe('更新履歴');
        });

        it('エイリアスデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_ALIAS)).toBe('エイリアス');
        });

        it('状態異常データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_STATE)).toBe('状態異常');
        });

        it('バフデータ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_BUFF)).toBe('バフ');
        });

        it('キャラ基本データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_CHARA)).toBe('キャラ基本データ');
        });

        it('職業データ種別のテキストを返す', () => {
            expect(GetConstDataKindText(CONST_DATA_KIND_JOB)).toBe('職業データ');
        });

        it('不正なデータ種別IDで「不明」を返す', () => {
            expect(GetConstDataKindText(999)).toBe('不明');
        });
    });

    describe('GetParamText', () => {
        it('STRパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_STR)).toBe('STR');
        });

        it('AGIパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_AGI)).toBe('AGI');
        });

        it('VITパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_VIT)).toBe('VIT');
        });

        it('INTパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_INT)).toBe('INT');
        });

        it('DEXパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_DEX)).toBe('DEX');
        });

        it('LUKパラメータのテキストを返す', () => {
            expect(GetParamText(PARAM_LUK)).toBe('LUK');
        });

        it('不正なパラメータIDでエラーテキストを返す', () => {
            expect(GetParamText(999)).toBe('エラー');
        });
    });

    describe('GetRaceText', () => {
        it('無形種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_SOLID)).toBe('無形');
        });

        it('不死種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_UNDEAD)).toBe('不死');
        });

        it('動物種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_ANIMAL)).toBe('動物');
        });

        it('植物種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_PLANT)).toBe('植物');
        });

        it('昆虫種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_INSECT)).toBe('昆虫');
        });

        it('魚類種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_FISH)).toBe('魚類');
        });

        it('悪魔種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_DEMON)).toBe('悪魔');
        });

        it('人間種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_HUMAN)).toBe('人間');
        });

        it('天使種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_ANGEL)).toBe('天使');
        });

        it('竜族種族のテキストを返す', () => {
            expect(GetRaceText(RACE_ID_DRAGON)).toBe('竜族');
        });

        it('不正な種族IDでエラーテキストを返す', () => {
            expect(GetRaceText(999)).toBe('エラー');
        });
    });

    describe('GetElementText', () => {
        it('無属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_VANITY)).toBe('無');
        });

        it('水属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_WATER)).toBe('水');
        });

        it('地属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_EARTH)).toBe('地');
        });

        it('火属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_FIRE)).toBe('火');
        });

        it('風属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_WIND)).toBe('風');
        });

        it('毒属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_POISON)).toBe('毒');
        });

        it('聖属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_HOLY)).toBe('聖');
        });

        it('闇属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_DARK)).toBe('闇');
        });

        it('念属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_PSYCO)).toBe('念');
        });

        it('不死属性のテキストを返す', () => {
            expect(GetElementText(ELM_ID_UNDEAD)).toBe('不死');
        });

        it('不正な属性IDでエラーテキストを返す', () => {
            expect(GetElementText(999)).toBe('エラー');
        });
    });

    describe('GetMonsterElementText', () => {
        it('無属性レベル1のテキストを返す', () => {
            expect(GetMonsterElementText(1)).toBe('無1');
        });

        it('水属性レベル2のテキストを返す', () => {
            expect(GetMonsterElementText(12)).toBe('水2');
        });

        it('火属性レベル3のテキストを返す', () => {
            expect(GetMonsterElementText(33)).toBe('火3');
        });

        it('地属性レベル4のテキストを返す', () => {
            expect(GetMonsterElementText(24)).toBe('地4');
        });

        it('風属性レベル1のテキストを返す', () => {
            expect(GetMonsterElementText(41)).toBe('風1');
        });
    });

    describe('GetSizeText', () => {
        it('小型サイズのテキストを返す', () => {
            expect(GetSizeText(SIZE_ID_SMALL)).toBe('小型');
        });

        it('中型サイズのテキストを返す', () => {
            expect(GetSizeText(SIZE_ID_MEDIUM)).toBe('中型');
        });

        it('大型サイズのテキストを返す', () => {
            expect(GetSizeText(SIZE_ID_LARGE)).toBe('大型');
        });

        it('不正なサイズIDでエラーテキストを返す', () => {
            expect(GetSizeText(999)).toBe('エラー');
        });
    });

    describe('GetStateText', () => {
        it('毒状態異常のテキストを返す', () => {
            expect(GetStateText(STATE_ID_POISON)).toBe('毒');
        });

        it('スタン状態異常のテキストを返す', () => {
            expect(GetStateText(STATE_ID_STUN)).toBe('スタン');
        });

        it('凍結状態異常のテキストを返す', () => {
            expect(GetStateText(STATE_ID_FROZEN)).toBe('凍結');
        });

        it('呪い状態異常のテキストを返す', () => {
            expect(GetStateText(STATE_ID_CURSED)).toBe('呪い');
        });
    });

    describe('GetFriendlityText', () => {
        it('親密度「未設定(親しい扱い)」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_AUTO)).toBe('未設定(親しい扱い)');
        });

        it('親密度「逃亡寸前」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_RUNAWAY)).toBe('逃亡寸前');
        });

        it('親密度「疎々しい」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_LOWEST)).toBe('疎々しい');
        });

        it('親密度「気まずい」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_LOW)).toBe('気まずい');
        });

        it('親密度「普通」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_NORMAL)).toBe('普通');
        });

        it('親密度「親しい」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_HIGH)).toBe('親しい');
        });

        it('親密度「きわめて親しい」のテキストを返す', () => {
            expect(GetFriendlityText(FRIENDLITY_ID_HIGHEST)).toBe('きわめて親しい');
        });
    });

    describe('定数の定義確認', () => {
        it('パラメータID定数が正しく定義されている', () => {
            expect(typeof PARAM_STR).toBe('number');
            expect(typeof PARAM_AGI).toBe('number');
            expect(typeof PARAM_VIT).toBe('number');
            expect(typeof PARAM_INT).toBe('number');
            expect(typeof PARAM_DEX).toBe('number');
            expect(typeof PARAM_LUK).toBe('number');
        });

        it('種族ID定数が正しく定義されている', () => {
            expect(typeof RACE_ID_SOLID).toBe('number');
            expect(typeof RACE_ID_UNDEAD).toBe('number');
            expect(typeof RACE_ID_ANIMAL).toBe('number');
            expect(typeof RACE_ID_PLANT).toBe('number');
            expect(typeof RACE_ID_INSECT).toBe('number');
            expect(typeof RACE_ID_FISH).toBe('number');
            expect(typeof RACE_ID_DEMON).toBe('number');
            expect(typeof RACE_ID_HUMAN).toBe('number');
            expect(typeof RACE_ID_ANGEL).toBe('number');
            expect(typeof RACE_ID_DRAGON).toBe('number');
        });

        it('属性ID定数が正しく定義されている', () => {
            expect(typeof ELM_ID_VANITY).toBe('number');
            expect(typeof ELM_ID_WATER).toBe('number');
            expect(typeof ELM_ID_EARTH).toBe('number');
            expect(typeof ELM_ID_FIRE).toBe('number');
            expect(typeof ELM_ID_WIND).toBe('number');
            expect(typeof ELM_ID_POISON).toBe('number');
            expect(typeof ELM_ID_HOLY).toBe('number');
            expect(typeof ELM_ID_DARK).toBe('number');
            expect(typeof ELM_ID_PSYCO).toBe('number');
            expect(typeof ELM_ID_UNDEAD).toBe('number');
        });

        it('サイズID定数が正しく定義されている', () => {
            expect(typeof SIZE_ID_SMALL).toBe('number');
            expect(typeof SIZE_ID_MEDIUM).toBe('number');
            expect(typeof SIZE_ID_LARGE).toBe('number');
        });
    });
});
