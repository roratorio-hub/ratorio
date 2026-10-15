import unittest

from pet_util import (
    loadPetRows, getNextPetId, stripNameMark, checkPetInfo, buildPetRecord, buildWonderBasketSetLines,
)

PET_JS = '''export const PET_ID_NONE = 0;
export const PET_OBJ = [
		[0,"キューペットなし","ア","",0],
		[1,"アリス","アリス","",0],
		[2,"（×）イシス","イシス","<red>※</red>",8000000000000080,1,0],
		[3,"サキュバス","サキユハス","desc [1,"x"] を含む",0],
];
'''


def fake_capability(capability):
    return f"{capability['code']},{capability['value']},"


class PetRowsTest(unittest.TestCase):

    def test_PET_OBJ_の行のIDと名前を順に取得する(self):
        self.assertEqual(loadPetRows(PET_JS), [(0, 'キューペットなし'), (1, 'アリス'), (2, '（×）イシス'), (3, 'サキュバス')])

    def test_PET_OBJ_より前の定数行は拾わない(self):
        js = 'export const X = [\n\t[9,"別の配列"],\n];\n' + PET_JS
        self.assertEqual([i for i, _ in loadPetRows(js)], [0, 1, 2, 3])

    def test_次のIDは行数と一致する(self):
        self.assertEqual(getNextPetId(loadPetRows(PET_JS)), 4)

    def test_欠番があれば例外(self):
        with self.assertRaises(ValueError):
            getNextPetId([(0, 'a'), (2, 'b')])

    def test_順序が崩れていれば例外(self):
        with self.assertRaises(ValueError):
            getNextPetId([(1, 'a'), (0, 'b')])

    def test_効果未確認の目印を外す(self):
        self.assertEqual(stripNameMark('（×）イシス'), 'イシス')
        self.assertEqual(stripNameMark('（△）インキュバス'), 'インキュバス')
        self.assertEqual(stripNameMark('アリス'), 'アリス')


class CheckPetInfoTest(unittest.TestCase):

    def test_正常な定義は通る(self):
        checkPetInfo({'name': 'Sユンケア', 'yomi': 'エスユンケア'}, {'アリス'})

    def test_既存名は例外(self):
        with self.assertRaises(ValueError):
            checkPetInfo({'name': 'アリス', 'yomi': 'アリス'}, {'アリス'})

    def test_卵名のままなら例外(self):
        with self.assertRaises(ValueError):
            checkPetInfo({'name': 'Sユンケアの卵', 'yomi': 'エスユンケアノタマゴ'}, set())
        with self.assertRaises(ValueError):
            checkPetInfo({'name': 'Sユンケア[0]', 'yomi': 'エスユンケア'}, set())

    def test_必須項目の欠落と二重引用符は例外(self):
        with self.assertRaises(ValueError):
            checkPetInfo({'name': 'A'}, set())
        with self.assertRaises(ValueError):
            checkPetInfo({'name': 'A', 'yomi': 'エー', 'desc': 'a"b'}, set())


class BuildPetRecordTest(unittest.TestCase):

    def test_能力なしの行(self):
        self.assertEqual(buildPetRecord(114, {'name': 'A', 'yomi': 'エー'}, fake_capability),
                         '[114,"A","エー","",0],')

    def test_説明文と能力コードが並ぶ(self):
        pet = {'name': 'B', 'yomi': 'ビー', 'desc': 'BaseLv100以上の時、<br>　[X]で受けるダメージ - 50%',
               'capabilities': [{'code': 2000000000000152, 'value': 100}, {'code': 220, 'value': 195}]}
        self.assertEqual(buildPetRecord(115, pet, fake_capability),
                         '[115,"B","ビー","BaseLv100以上の時、<br>　[X]で受けるダメージ - 50%",2000000000000152,100,220,195,0],')

    def test_能力コードが解決できなければ例外(self):
        pet = {'name': 'C', 'yomi': 'シー', 'capabilities': [{'code': None, 'value': 1}]}
        with self.assertRaises(ValueError):
            buildPetRecord(116, pet, fake_capability)


class WonderBasketSetTest(unittest.TestCase):

    def test_セット行は_w_SE_Pet逆引き_バスケットのconcat_の3種類(self):
        lines = buildWonderBasketSetLines(3700, [(114, 'Sユンケア'), (115, 'ナハトズィーガー')])
        self.assertEqual(lines, [
            'w_SE[3700] = [4236,4235,-(ITEM_SET_PET_ID_OFFSET + 114)]; // ワンダーエッグバスケット(4235) + Sユンケア',
            'w_SE[3701] = [4236,4235,-(ITEM_SET_PET_ID_OFFSET + 115)]; // ワンダーエッグバスケット(4235) + ナハトズィーガー',
            'PetIdToSetIdMap[114] = [3700];',
            'PetIdToSetIdMap[115] = [3701];',
            'ItemIdToSetIdMap[4235] = ItemIdToSetIdMap[4235].concat([3700,3701]);',
        ])

    def test_対象ペットが無ければ何も出力しない(self):
        self.assertEqual(buildWonderBasketSetLines(3700, []), [])


if __name__ == '__main__':
    unittest.main()
