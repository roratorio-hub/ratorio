import { describe, it, expect } from 'vitest';
import { generateImage, BuildShadowEquipText, SHADOW_EQUIP_SLOTS } from '@engine/ui/saveimage.js';
import { get as registryGet } from '@engine/runtime/engine-registry.js';
import { CardObjNew } from '@engine/equip/card.dat.js';
import { g_rndOptArray } from '@engine/equip/rndopt.dat.js';
import { RND_OPT_DATA_INDEX_SPID } from '@engine/const/EnumRndOptDataIndex.js';
import { ITEM_SP_STR_PLUS, ITEM_SP_MAXHP_PLUS } from '@engine/const/EnumItemSpId.js';

// メロンウェポン / プレミアメロンシールド / ディザスターイヤリング / オルタネイトアーマー
const ITEM_ID_SHADOW_MELON_WEAPON = 5765;
const ITEM_ID_SHADOW_PREMIUM_MELON_SHIELD = 5772;
const ITEM_ID_SHADOW_DISASTER_EARRING = 5872;
const ITEM_ID_ALTERNATE_ARMOR = 4911;
// エンチャント「Str+3」（メロンウェポンのエンチャント枠1）
const CARD_ID_ENCH_STR_PLUS_3 = 556;

const rndOptIdOf = (spid: number) => g_rndOptArray.findIndex((e: number[]) => e[RND_OPT_DATA_INDEX_SPID] === spid);

/** 画面から抽出したモデルのうち、シャドウ装備に関わる部分だけを持つ最小のモデル。 */
const emptyModel = () => ({
    shadowEquip: { itemId: [] as number[], refined: [] as number[], rndOpt: [] as number[][][] },
    card: [] as number[],
});

describe('saveimage.js', () => {
    // dewindow: window.generateImage は engine-registry へ移行（旧 window 互換テストを置換）。
    // tests/integration/saveimage-output.test.ts が reg.generateImage() で呼ぶ配線を検証する。
    describe('engine-registry 登録', () => {
        it('generateImage が engine-registry に登録されている', () => {
            expect(registryGet('generateImage')).toBe(generateImage);
        });
    });

    describe('BuildShadowEquipText（シャドウ装備の表示テキスト）', () => {
        it('エンチャント枠だけを持つシャドウ装備は、エンチャント名を表示する（メロンウェポン）', () => {
            const slot = SHADOW_EQUIP_SLOTS.armsRight;
            const model = emptyModel();
            model.shadowEquip.itemId[slot.equip] = ITEM_ID_SHADOW_MELON_WEAPON;
            model.shadowEquip.refined[slot.equip] = 0;
            model.shadowEquip.rndOpt[slot.equip] = [[0, 0], [0, 0]];
            model.card[slot.cards[0]] = CARD_ID_ENCH_STR_PLUS_3;

            const text = BuildShadowEquipText(model, slot);

            expect(text).toBe(`[シャドウ] メロンウェポン ( ${CardObjNew[CARD_ID_ENCH_STR_PLUS_3][2]} )`);
        });

        it('エンチャントは左手・アクセサリー(1)の枠からも読まれる（プレミアメロンシールド・ディザスターイヤリング）', () => {
            const model = emptyModel();
            const left = SHADOW_EQUIP_SLOTS.armsLeft;
            const acc1 = SHADOW_EQUIP_SLOTS.accessory1;
            model.shadowEquip.itemId[left.equip] = ITEM_ID_SHADOW_PREMIUM_MELON_SHIELD;
            model.shadowEquip.itemId[acc1.equip] = ITEM_ID_SHADOW_DISASTER_EARRING;
            model.card[left.cards[0]] = CARD_ID_ENCH_STR_PLUS_3;
            model.card[acc1.cards[2]] = CARD_ID_ENCH_STR_PLUS_3;

            expect(BuildShadowEquipText(model, left)).toContain(CardObjNew[CARD_ID_ENCH_STR_PLUS_3][2]);
            expect(BuildShadowEquipText(model, acc1)).toContain(CardObjNew[CARD_ID_ENCH_STR_PLUS_3][2]);
        });

        it('ランダムオプションを持つシャドウ装備は、オプション名と値を表示する（オルタネイトアーマー）', () => {
            const slot = SHADOW_EQUIP_SLOTS.body;
            const model = emptyModel();
            model.shadowEquip.itemId[slot.equip] = ITEM_ID_ALTERNATE_ARMOR;
            model.shadowEquip.rndOpt[slot.equip] = [
                [rndOptIdOf(ITEM_SP_STR_PLUS), 3],
                [rndOptIdOf(ITEM_SP_MAXHP_PLUS), 50],
                [0, 0],
            ];

            expect(BuildShadowEquipText(model, slot)).toBe('オルタネイトアーマー ( STR+ 3, MaxHP+ 50 )');
        });

        it('エンチャントとランダムオプションが両方ある場合は、エンチャント→ランダムオプションの順に並べる', () => {
            const slot = SHADOW_EQUIP_SLOTS.armsRight;
            const model = emptyModel();
            model.shadowEquip.itemId[slot.equip] = ITEM_ID_SHADOW_MELON_WEAPON;
            model.shadowEquip.rndOpt[slot.equip] = [[rndOptIdOf(ITEM_SP_STR_PLUS), 3]];
            model.card[slot.cards[0]] = CARD_ID_ENCH_STR_PLUS_3;

            expect(BuildShadowEquipText(model, slot)).toBe(
                `[シャドウ] メロンウェポン ( ${CardObjNew[CARD_ID_ENCH_STR_PLUS_3][2]}, STR+ 3 )`,
            );
        });

        it('精錬値が1以上なら、装備名の前に「+N 」を付ける', () => {
            const slot = SHADOW_EQUIP_SLOTS.armsRight;
            const model = emptyModel();
            model.shadowEquip.itemId[slot.equip] = ITEM_ID_SHADOW_MELON_WEAPON;
            model.shadowEquip.refined[slot.equip] = 7;

            expect(BuildShadowEquipText(model, slot)).toBe('+7 [シャドウ] メロンウェポン (  )');
        });

        it('未装備の部位は空文字を返す', () => {
            const model = emptyModel();
            for (const slot of Object.values(SHADOW_EQUIP_SLOTS)) {
                expect(BuildShadowEquipText(model, slot)).toBe('');
            }
        });
    });
});
