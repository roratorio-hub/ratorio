import os
import tempfile
import unittest
from unittest import mock

import set_effect_merge as sem

ITEM_TEXT = '''export const ITEM_SET_ID_NAMED = 120;
export const ItemObjNew = [
	[100,100,0,0,0,0,0,0,0,0,"",15,15,0],
	[101,100,0,0,0,0,0,0,0,0,"",15,15,0],	// 下限未満の重複（人間の判断で個別にしているかもしれない）
];
ItemObjNew[110] = [110,100,0,0,0,0,0,0,0,0,"",15,40,80,30,0];
ItemObjNew[111] = [111,100,0,0,0,0,0,0,0,0,"",15,40,80,30,0];
ItemObjNew[112] = [112,100,0,0,0,0,0,0,0,0,"",15,40,80,30,0];
ItemObjNew[113] = [113,100,0,0,0,0,0,0,0,0,"desc [x]",65,70,0];
ItemObjNew[114] = [114,100,0,0,0,0,0,0,0,0,"desc [x]",65,70,0];
ItemObjNew[115] = [115,100,0,0,0,0,0,0,0,0,"",243,3,0];
ItemObjNew[116] = [116,100,0,0,0,0,0,0,0,0,"",243,3,0];
ItemObjNew[117] = [117,100,0,0,0,0,0,0,0,0,"",243,3,0];
ItemObjNew[118] = [118,100,0,0,0,0,0,0,0,0,"",9,9,0];
ItemObjNew[119] = [119,100,0,0,0,0,0,0,0,0,"",9,9,0];
ItemObjNew[120] = [120,100,0,0,0,0,0,0,0,0,"",9,9,0];
ItemObjNew[121] = [121,100,0,0,0,0,0,0,0,0,"",9,9,0];
ItemObjNew[122] = [122,100,0,0,0,0,0,0,0,0,"",12,12,0];
ItemObjNew[123] = [123,100,0,0,0,0,0,0,0,0,"",12,12,0];
ItemObjNew[124] = [124,100,0,0,0,0,0,0,0,0,"",5,5,218,122,0];
'''
CARD_TEXT = '''export const CardObjNew = [
	[200,100,0,"","",15,5,0],
];
CardObjNew[300] = [300,100,0,"","",15,25,0];
CardObjNew[301] = [301,100,0,"","",15,25,0];
CardObjNew[302] = [302,100,0,"","",15,26,0];
'''
ITEMSET_TEXT = '''export const w_SE = [
		[],
		[100,1,2],
		[101,3,4],
	];
	w_SE[10] = [110,1,-5,];
	w_SE[11] = [111,2,-5,];
	w_SE[12] = [112,3,-5,];
	w_SE[13] = [113,4,5,];	// コメント
	w_SE[14] = [114,6,7,];
	w_SE[15] = [115,6,8,];
	w_SE[16] = [-300,6,-9,];
	w_SE[17] = [-301,7,-9,];
	w_SE[18] = [-302,8,-9,];
	w_SE[19] = [116,9,10,];
	w_SE[20] = [118,9,11,];
	w_SE[21] = [119,9,12,];
	w_SE[22] = [122,9,13,];
	w_SE[23] = [123,9,14,];
'''
TIMEITEM_TEXT = '''ITEM_SP_TIME_OBJ[1] = [1,"時限","説明",[[1,119]],382,100,0];
ITEM_SP_TIME_OBJ[2] = [2,"時限","説明",[[2,302],[1,121]],382,100,0];
'''


def make_engine(tmp, item=ITEM_TEXT, card=CARD_TEXT, itemset=ITEMSET_TEXT, timeitem=TIMEITEM_TEXT):
    equip = os.path.join(tmp, 'equip')
    os.makedirs(equip, exist_ok=True)
    for name, text in (('item.dat.js', item), ('card.dat.js', card), ('itemset.dat.js', itemset), ('timeitem.dat.js', timeitem)):
        with open(os.path.join(equip, name), 'w', encoding='utf-8') as f:
            f.write(text)
    return tmp


class ParseTest(unittest.TestCase):
    def test_効果レコードは配列リテラル形式と代入形式の両方を読む(self):
        records = sem.parseEffectRecords(ITEM_TEXT, sem.KIND_ITEM)
        self.assertEqual(records[100], '0,0,0,0,0,0,0,0,"",15,15,0')
        self.assertEqual(records[110], '0,0,0,0,0,0,0,0,"",15,40,80,30,0')
        self.assertEqual(records[113], '0,0,0,0,0,0,0,0,"desc [x]",65,70,0')

    def test_行末のコメントは効果レコードの中身に含まれない(self):
        self.assertEqual(sem.parseEffectRecords(ITEM_TEXT, sem.KIND_ITEM)[101], '0,0,0,0,0,0,0,0,"",15,15,0')

    def test_カード側の効果レコードを読む(self):
        records = sem.parseEffectRecords(CARD_TEXT, sem.KIND_CARD)
        self.assertEqual(records, {200: '0,"","",15,5,0', 300: '0,"","",15,25,0', 301: '0,"","",15,25,0', 302: '0,"","",15,26,0'})

    def test_w_SEは配列リテラル形式と代入形式の効果IDを読む(self):
        effects = [eff for _, eff in sem.parseSetRows(ITEMSET_TEXT)]
        self.assertEqual(effects[:5], [100, 101, 110, 111, 112])
        self.assertIn(-300, effects)

    def test_時限効果の元データを読む(self):
        self.assertEqual(sem.parseTimeSources(TIMEITEM_TEXT), {(sem.KIND_ITEM, 119), (sem.KIND_CARD, 302), (sem.KIND_ITEM, 121)})

    def test_効果が発動しない系の対象を読む(self):
        self.assertEqual(sem.parseInvalidated(ITEM_TEXT), {(sem.KIND_ITEM, 122)})

    def test_生成スクリプトが作る効果レコードの形と一致する(self):
        item = sem.effectPayload(sem.KIND_ITEM, 'a,b', '15,40,')
        card = sem.effectPayload(sem.KIND_CARD, 'a,b', '15,40,')
        self.assertEqual(sem.parseEffectRecords(f'ItemObjNew[7] = [7,100,{item}];', sem.KIND_ITEM)[7], item)
        self.assertEqual(sem.parseEffectRecords(f'CardObjNew[7] = [7,100,{card}];', sem.KIND_CARD)[7], card)


class PlanTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.engine = make_engine(self.tmp.name)
        patcher = mock.patch.dict(sem.MERGE_FROM_EFFECT_ID, {sem.KIND_ITEM: 110, sem.KIND_CARD: 300})
        patcher.start()
        self.addCleanup(patcher.stop)
        self.state = sem.SetEffectState(self.engine)

    def test_下限以上の同一内容は最小のIDに統合する(self):
        plan = sem.planMerges(self.state)
        self.assertEqual(plan[(sem.KIND_ITEM, 111)], (sem.KIND_ITEM, 110))
        self.assertEqual(plan[(sem.KIND_ITEM, 112)], (sem.KIND_ITEM, 110))
        self.assertEqual(plan[(sem.KIND_ITEM, 114)], (sem.KIND_ITEM, 113))
        self.assertNotIn((sem.KIND_ITEM, 110), plan)

    def test_下限未満の既存の重複は統合しない(self):
        plan = sem.planMerges(self.state)
        self.assertNotIn((sem.KIND_ITEM, 101), plan)
        self.assertNotIn((sem.KIND_ITEM, 100), plan)

    def test_w_SEから参照されていない効果レコードは対象にしない(self):
        # 117 は 115・116 と同一内容だが w_SE に出てこない
        plan = sem.planMerges(self.state)
        self.assertNotIn((sem.KIND_ITEM, 117), plan)
        self.assertEqual(plan[(sem.KIND_ITEM, 116)], (sem.KIND_ITEM, 115))

    def test_時限効果の元データ_名前付き定数_効果が発動しない対象は統合しない(self):
        plan = sem.planMerges(self.state)
        # 118〜121 は同一内容。119・121 は時限効果の元データ、120 は名前付き定数（ITEM_SET_ID_NAMED = 120）
        self.assertNotIn((sem.KIND_ITEM, 119), plan)
        self.assertNotIn((sem.KIND_ITEM, 121), plan)
        self.assertNotIn((sem.KIND_ITEM, 120), plan)
        # 122（効果が発動しない対象）と 123 は同一内容だが、122 を保護するので統合は起きない
        self.assertNotIn((sem.KIND_ITEM, 123), plan)
        self.assertNotIn((sem.KIND_ITEM, 122), plan)
        self.assertEqual(self.state.protected_reason[(sem.KIND_ITEM, 119)], '時限効果の元データ')
        self.assertEqual(self.state.protected_reason[(sem.KIND_ITEM, 122)], '「効果が発動しない」の対象')
        self.assertEqual(self.state.protected_reason[(sem.KIND_ITEM, 120)], '名前付き定数')

    def test_カード側も統合し_符号を保つ(self):
        plan = sem.planMerges(self.state)
        self.assertEqual(plan[(sem.KIND_CARD, 301)], (sem.KIND_CARD, 300))
        new_text, _ = sem.applyPlan(self.state, plan)
        self.assertIn('w_SE[17] = [-300,7,-9,];', new_text)

    def test_付け替えは効果IDだけを書き換え_コメントや他の行は変えない(self):
        plan = sem.planMerges(self.state)
        new_text, changed = sem.applyPlan(self.state, plan)
        self.assertIn('w_SE[11] = [110,2,-5,];', new_text)
        self.assertIn('w_SE[14] = [113,6,7,];', new_text)
        self.assertIn('w_SE[13] = [113,4,5,];\t// コメント', new_text)
        self.assertIn('\t\t[101,3,4],', new_text)       # 下限未満は触らない
        self.assertEqual(changed, len(plan_rows(self.state, plan)))
        sem.verifyPlan(self.state, new_text)

    def test_付け替えで効果の中身が変わるとverifyPlanが検出する(self):
        broken = self.state.itemset_text.replace('w_SE[11] = [111,2,-5,];', 'w_SE[11] = [115,2,-5,];')
        with self.assertRaises(ValueError):
            sem.verifyPlan(self.state, broken)

    def test_生成スクリプト用の再利用表は対象のレコードだけを持つ(self):
        table = sem.loadReusableEffects(self.engine)
        self.assertEqual(table[(sem.KIND_ITEM, '0,0,0,0,0,0,0,0,"",15,40,80,30,0')], 110)
        self.assertEqual(table[(sem.KIND_CARD, '0,"","",15,25,0')], 300)
        ids = set(table.values())
        self.assertFalse(ids & {100, 101, 119, 120, 121, 122})


def plan_rows(state, plan):
    return [1 for _, eff in state.rows if ((sem.KIND_ITEM if eff > 0 else sem.KIND_CARD), abs(eff)) in plan]


class RealDataTest(unittest.TestCase):
    def test_実データに統合できる重複が残っていない(self):
        state = sem.SetEffectState()
        self.assertEqual(sem.planMerges(state), {},
                         'セット効果の重複があります。python3 set_effect_merge.py で確認してください')


if __name__ == '__main__':
    unittest.main()
