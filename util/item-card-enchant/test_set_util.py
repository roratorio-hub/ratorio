import unittest

from set_util import groupSetList, loadExistingSetMapKeys, buildPartnerMapLines

DESC = '物理・魔法攻撃命中時、一定確率で20秒間、リフレッシュLv1状態になる'


class GroupSetListTest(unittest.TestCase):

    def test_効果が同一のエントリは1つの効果にまとまり条件だけが増える(self):
        set_list = [
            {'entity_list': [{'item_name': '星座の印章(力)'}], 'desc': DESC},
            {'entity_list': [{'item_name': '星座の印章(体力)'}], 'desc': DESC},
            {'entity_list': [{'item_name': '星座の印章'}], 'desc': DESC},
        ]
        groups = groupSetList(set_list)
        self.assertEqual(len(groups), 1)
        info, conditions = groups[0]
        self.assertEqual(info['desc'], DESC)
        self.assertEqual(conditions, [
            [{'item_name': '星座の印章(力)'}],
            [{'item_name': '星座の印章(体力)'}],
            [{'item_name': '星座の印章'}],
        ])

    def test_効果が異なるエントリは別々の効果のまま(self):
        set_list = [
            {'entity_list': [{'card_name': '豪傑'}], 'capabilities': [{'name': 'A', 'value': 1}]},
            {'entity_list': [{'card_name': '真理の解放'}], 'capabilities': [{'name': 'A', 'value': 2}]},
        ]
        groups = groupSetList(set_list)
        self.assertEqual(len(groups), 2)
        self.assertEqual([len(c) for _, c in groups], [1, 1])

    def test_entity_list_any_は候補ごとの条件に展開される(self):
        set_list = [{
            'entity_list_any': [{'card_name': '豪傑'}, {'card_name': '真理の解放'}],
            'capabilities': [{'name': 'A', 'value': 1}],
        }]
        groups = groupSetList(set_list)
        self.assertEqual(len(groups), 1)
        self.assertEqual(groups[0][1], [[{'card_name': '豪傑'}], [{'card_name': '真理の解放'}]])

    def test_entity_list_と_entity_list_any_の併記は全て必要な条件に候補を足す(self):
        set_list = [{
            'entity_list': [{'item_name': 'X'}],
            'entity_list_any': [{'item_name': 'A'}, {'item_name': 'B'}],
            'desc': 'd',
        }]
        _, conditions = groupSetList(set_list)[0]
        self.assertEqual(conditions, [
            [{'item_name': 'X'}, {'item_name': 'A'}],
            [{'item_name': 'X'}, {'item_name': 'B'}],
        ])

    def test_従来の書き方と_entity_list_any_は同じ結果になる(self):
        old_style = [
            {'entity_list': [{'card_name': '豪傑'}], 'desc': 'd'},
            {'entity_list': [{'card_name': '真理の解放'}], 'desc': 'd'},
        ]
        new_style = [{'entity_list_any': [{'card_name': '豪傑'}, {'card_name': '真理の解放'}], 'desc': 'd'}]
        self.assertEqual(groupSetList(old_style)[0][1], groupSetList(new_style)[0][1])

    def test_set_キーの有無は効果の同一判定に影響しない(self):
        # YAML の `- set:` 直後に entity_list を並べた書き方は 'set': None を含む辞書になる
        set_list = [
            {'set': None, 'entity_list': [{'item_name': 'A'}], 'desc': 'd'},
            {'entity_list': [{'item_name': 'B'}], 'desc': 'd'},
        ]
        self.assertEqual(len(groupSetList(set_list)), 1)


class PartnerMapTest(unittest.TestCase):

    def test_定義済みキーを読み取る(self):
        js = ('\tItemIdToSetIdMap[5003] = [2730];\n'
              '\tItemIdToSetIdMap[5004] = ItemIdToSetIdMap[5004].concat([1]);\n'
              '\tCardIdToSetIdMap[1348] = [3672,];\n')
        items, cards = loadExistingSetMapKeys(js)
        self.assertEqual(items, {5003})   # concat だけの行は「定義」に数えない
        self.assertEqual(cards, {1348})

    def test_定義済みのパートナーは_concat_未定義は代入になる(self):
        items, cards = {5003}, {1348}
        partner_sets = {
            ('item', 5003): [3694],
            ('card', 1348): [3685, 3687],
            ('card', 9999): [3686],
        }
        lines = buildPartnerMapLines(partner_sets, items, cards)
        self.assertEqual(lines, [
            'ItemIdToSetIdMap[5003] = ItemIdToSetIdMap[5003].concat([3694]);',
            'CardIdToSetIdMap[1348] = CardIdToSetIdMap[1348].concat([3685,3687]);',
            'CardIdToSetIdMap[9999] = [3686,];',
        ])

    def test_名前未解決のパートナーは出力しない(self):
        lines = buildPartnerMapLines({('item', None): [1], ('item', 5): [2]}, set(), set())
        self.assertEqual(lines, ['ItemIdToSetIdMap[5] = [2,];'])


if __name__ == '__main__':
    unittest.main()
