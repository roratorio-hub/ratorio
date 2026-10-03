import io
import os
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout

import capability_patch as cp

SKILL_TEXT = '''export const SkillObjNew = [
	[1046,5,"ホークブーメラン","WH_HAWKBOOMERANG"],
	[1291,5,"ワイルドウォーク","WH_WILD_WALK"],
	[1405,5,"(×)フラグメントボルト","WH_FRAGMENT_BOLT"],
	[2000,5,"重複","A"],
	[2001,5,"重複","B"],
];
'''

ITEM_TEXT = '''export const ITEM_ID_TEST_ARMOR = 100;
export const ItemObjNew = [
	[100,60,162,100,0,1,100,200,"テストアーマー","テスト","",243,7,100000000006046,1,0],
	[101,100,0,0,0,0,0,0,0,0,"",0],
	[102,60,162,100,0,1,100,200,"スペース","ス", "",243, 7,0],
	// [199,60,162,100,0,1,100,200,"コメント","コ","",0],
];
ItemObjNew[103] = [103,60,162,100,0,1,100,200,"後置","ゴ","",0];
'''

CARD_TEXT = '''export const CARD_ID_TEST_ENCHANT = 10;
export const CardObjNew = [
	[10,99,"テスト潜在","テスト","",0],
	[11,100,0,,"",20100,100,0],
	[12,99,"相手",,"",0],
	[13,99,"別カード","ベツ","説明, カンマ入り [x]",262,15,0],
	[20,100,0,"","古い説明",0],
	[15,100,0,"","",0],
	[16,99,"逆相手",,"",0],
];
CardObjNew[14] = [14,100,0,"","",0];
'''

ITEMSET_TEXT = '''export const w_SE = [
	[],
	[-11,-10,-12],
	[-20,-13,-12],
];
w_SE[5] = [101,100,-12,];
w_SE[6] = [-15,-16,100,];
ItemIdToSetIdMap[100] = [5,];
'''

TIMEITEM_TEXT = '''export const ITEM_SP_TIME_OBJ = [
[0,"装備/カードの時限性補助効果","なし",[[0,0]],0],
[1,"アイシラカード","詠唱-50%、FLEE+30",[[2,472]],9,30,0],
];
ITEM_SP_TIME_OBJ[5] = [5,"テスト時限","20秒間、[ワイルドウォーク]の消費SP -3",[[2,11]],24291,3,0];
ITEM_SP_TIME_OBJ[6] = [6,"二つ目","説明",[[2,11],[1,100]],0];
ITEM_SP_TIME_OBJ[7] = [7,"アイテム側","説明",[[1,101]],0];
'''


class TokenizeTest(unittest.TestCase):
    def test_空要素と空白とカンマ入り文字列を正しく区切る(self):
        line = '\t[2123,99,"王家の栄光",,"物理, 魔法 [x] \\"q\\"", 262,15,0],'
        rec = cp.parse_record_line(line, 'card', 0)
        self.assertEqual(rec.id, 2123)
        self.assertEqual(rec.name, '王家の栄光')
        self.assertEqual(rec.toks[3].text, '')
        self.assertEqual(rec.desc, '物理, 魔法 [x] \\"q\\"')
        self.assertEqual([(c.code, c.value) for c in rec.caps], [(262, 15)])

    def test_BigInt接尾辞つきの能力コードを読める(self):
        rec = cp.parse_record_line('[5,99,"x","y","",30000000005669n,1,0],', 'card', 0)
        self.assertEqual(rec.caps[0].code, 30000000005669)

    def test_レコードでない行とコメント行は読まない(self):
        for line in ('export const ItemObjNew = [', '// [1,2,3]', 'ItemIdToSetIdMap[5] = [1,2];', '];', ''):
            self.assertIsNone(cp.parse_record_line(line, 'item', 0))

    def test_壊れたレコードはproblemが付く(self):
        rec = cp.parse_record_line('[5,99,"x","y","",243,0],', 'card', 0)
        self.assertIn('奇数', rec.problem)
        rec = cp.parse_record_line('[5,99,"x","y","",243,1],', 'card', 0)
        self.assertIn('0 で終わ', rec.problem)

    def test_時限効果の出所が入れ子の配列でも読める(self):
        rec = cp.parse_record_line('ITEM_SP_TIME_OBJ[5] = [5,"名","説明, x",[[2,11],[1,100]],24291,3,0];', 'time', 0)
        self.assertIsNone(rec.problem)
        self.assertEqual(rec.sources, [(2, 11), (1, 100)])
        self.assertEqual(rec.name, '名')
        self.assertEqual([(c.code, c.value) for c in rec.caps], [(24291, 3)])

    def test_入れ子の配列は時限効果以外では読まない(self):
        self.assertIsNone(cp.parse_record_line('[5,99,"x","y","",[1,2],0],', 'card', 0))

    def test_説明文が数値0の旧形式も読める(self):
        rec = cp.parse_record_line('[5,99,"x","y",0,243,1,0],', 'card', 0)
        self.assertIsNone(rec.problem)
        self.assertEqual(rec.desc, '')


class CodecTest(unittest.TestCase):
    skills = cp.SkillTable(SKILL_TEXT)

    def roundtrip(self, cap):
        code, value, big = cp.encode_cap(cap, self.skills)
        back = cp.decode_code(code, self.skills)
        self.assertEqual(value, int(cap['value']))
        self.assertEqual({**back, 'value': value}, cap)
        return code, big

    def test_スキル系能力はスキルIDを加算する(self):
        code, _ = self.roundtrip({'name': 'スキルダメージ増加', 'skill': 'ホークブーメラン', 'value': 1, 'per_lv': 10})
        self.assertEqual(code, 100000000006046)
        code, _ = self.roundtrip({'name': 'スキル消費SP固定値減少', 'skill': 'ワイルドウォーク', 'value': 3})
        self.assertEqual(code, 24291)

    def test_接頭辞つきスキル名は接頭辞なしで引ける(self):
        code, _ = self.roundtrip({'name': 'スキル固定詠唱ミリ秒減少', 'skill': 'フラグメントボルト', 'value': 500})
        self.assertEqual(code, 13000 + 1405)

    def test_条件キーは全て往復できる(self):
        base = {'name': 'MAXSP増加', 'value': 5}
        for extra in ({'per_lv': 10}, {'at_lv': 99}, {'at_lv': 250}, {'at_refine': 9}, {'per_refine': 2},
                      {'at_transcendence': 3}, {'at_equip_location': '靴'}, {'job_restrict': 'RANGER'},
                      {'per_status_10': 'INT'}, {'per_status_30': 'DEX'}, {'at_status_110': 'VIT'},
                      {'at_status_130': 'LUK'}, {'at_status_100': 'STR'}, {'at_sp_status_50': 'POW'},
                      {'at_sp_status_110': 'CRT'}, {'at_sp_status_100': 'SPL'},
                      {'per_lv': 10, 'at_refine': 9}):
            with self.subTest(extra=extra):
                self.roundtrip({**base, **extra})

    def test_BigIntが必要な条件では接尾辞nが付く(self):
        _, big = self.roundtrip({'name': 'MAXSP増加', 'value': 5, 'at_equip_location': '靴'})
        self.assertTrue(big)
        _, big = self.roundtrip({'name': 'MAXSP増加', 'value': 5, 'at_refine': 9})
        self.assertFalse(big)

    def test_不正な入力はエラーにする(self):
        bad = [
            {'name': '存在しない能力', 'value': 1},
            {'name': 'スキルダメージ増加', 'skill': '存在しないスキル', 'value': 1},
            {'name': 'スキルダメージ増加', 'skill': '重複', 'value': 1},
            {'name': 'スキルダメージ増加', 'value': 1},
            {'name': 'MAXSP増加', 'skill': 'ホークブーメラン', 'value': 1},
            {'name': 'MAXSP増加', 'value': 1, 'at_refin': 9},
            {'name': 'MAXSP増加', 'value': 1, 'at_lv': 7},
            {'name': 'MAXSP増加', 'value': 1, 'per_status_10': 'XXX'},
            {'name': 'MAXSP増加', 'value': 1, 'at_status_100': 'STR', 'at_status_110': 'STR'},
            {'name': 'MAXSP増加'},
            {'name': 'MAXSP増加', 'value': 'abc'},
        ]
        for cap in bad:
            with self.subTest(cap=cap), self.assertRaises(cp.PatchError):
                cp.encode_cap(cap, self.skills)


def make_dat():
    return cp.Dat(ITEM_TEXT, CARD_TEXT, ITEMSET_TEXT, SKILL_TEXT, TIMEITEM_TEXT)


def cap(skill, value=1, **kw):
    return {'name': 'スキルダメージ増加', 'skill': skill, 'value': value, **kw}


class PlanTest(unittest.TestCase):
    def apply(self, dat, entries):
        results, errors = cp.plan_all(dat, entries, None)
        self.assertEqual(errors, [])
        edits = {'item': [], 'card': [], 'time': []}
        for r in results:
            for e in r.edits:
                edits[e.kind].append(e)
        return results, {k: '\n'.join(cp.apply_edits(dat.lines[k], v)) for k, v in edits.items()}

    def test_足りない能力だけをレコード末尾の0の直前に足す(self):
        dat = make_dat()
        entry = {'item_name': 'テストアーマー', 'capabilities': [
            cap('ホークブーメラン', 1, per_lv=10), cap('ワイルドウォーク', 1, per_lv=10)]}
        results, new = self.apply(dat, [entry])
        self.assertEqual(len(results[0].skipped), 1)
        self.assertEqual(len(results[0].added), 1)
        old_lines, new_lines = ITEM_TEXT.split('\n'), new['item'].split('\n')
        diff = [i for i, (a, b) in enumerate(zip(old_lines, new_lines)) if a != b]
        self.assertEqual(diff, [2])
        self.assertEqual(new_lines[2], old_lines[2][:-3] + '100000000006291,1,0],')

    def test_二度流しても結果が変わらない(self):
        entry = {'item_name': 'テストアーマー', 'capabilities': [cap('ワイルドウォーク', 1, per_lv=10)]}
        _, new = self.apply(make_dat(), [entry])
        again = cp.Dat(new['item'], CARD_TEXT, ITEMSET_TEXT, SKILL_TEXT)
        results, _ = cp.plan_all(again, [entry], None)
        self.assertFalse(results[0].changed)

    def test_同じ能力で値が違うときは報告だけで書き換えない(self):
        entry = {'item_name': 'テストアーマー', 'capabilities': [cap('ホークブーメラン', 2, per_lv=10)]}
        results, new = self.apply(make_dat(), [entry])
        self.assertEqual(len(results[0].conflicts), 1)
        self.assertIn('既存の値 1', results[0].conflicts[0])
        self.assertEqual(new['item'], ITEM_TEXT)
        self.assertEqual(results[0].status, '要確認(値の食い違い)')

    def test_skillsでまとめて書ける(self):
        entry = {'item_name': 'スペース', 'capabilities': [
            {'name': 'スキル消費SP固定値減少', 'skills': ['ホークブーメラン', 'ワイルドウォーク'], 'value': 3}]}
        _, new = self.apply(make_dat(), [entry])
        self.assertIn('243, 7,24046,3,24291,3,0]', new['item'])

    def test_新しい行かどうかを区別する(self):
        entry = {'item_name': 'テストアーマー', 'capabilities': [
            cap('ワイルドウォーク', 1, per_lv=10), cap('ワイルドウォーク', 5, at_refine=7)]}
        results, _ = self.apply(make_dat(), [entry])
        self.assertEqual(len(results[0].added), 2)
        self.assertEqual(len(results[0].newlines), 1)
        self.assertIn('at_refine: 7', results[0].newlines[0])

    def test_セットを指定するとセットレコード側へ足す(self):
        entry = {'card_name': 'テスト潜在', 'set_with': [{'card_name': '相手'}],
                 'capabilities': [{'name': 'スキル固定詠唱ミリ秒減少', 'skill': 'フラグメントボルト', 'value': 500}]}
        results, new = self.apply(make_dat(), [entry])
        self.assertIn('card 11', results[0].target)
        self.assertIn('[11,100,0,,"",20100,100,14405,500,0]', new['card'])

    def test_アイテム本体のセットも解決できる(self):
        entry = {'item_name': 'テストアーマー', 'set_with': [{'card_name': '相手'}],
                 'capabilities': [cap('ワイルドウォーク', 1)]}
        results, new = self.apply(make_dat(), [entry])
        self.assertIn('item 101', results[0].target)
        self.assertIn('[101,100,0,0,0,0,0,0,0,0,"",6291,1,0]', new['item'])

    def test_セットは本体と相手の位置が逆でも見つかる(self):
        # w_SE[6] は card 16 が本体の位置、item 100 が相手の位置にある
        entry = {'item_name': 'テストアーマー', 'set_with': [{'card_name': '逆相手'}],
                 'capabilities': [cap('ワイルドウォーク', 1)]}
        results, new = self.apply(make_dat(), [entry])
        self.assertIn('card 15', results[0].target)
        self.assertIn('[15,100,0,"","",6291,1,0]', new['card'])

    def test_同じ組み合わせのセットが複数あると曖昧としてエラー(self):
        dup = ITEMSET_TEXT.replace('w_SE[6] = [-15,-16,100,];', 'w_SE[6] = [-15,-12,100,];')
        dat = cp.Dat(ITEM_TEXT, CARD_TEXT, dup, SKILL_TEXT)
        _, errors = cp.plan_all(dat, [{'item_name': 'テストアーマー', 'set_with': [{'card_name': '相手'}],
                                       'capabilities': [cap('ワイルドウォーク')]}], None)
        self.assertEqual(len(errors), 1)
        self.assertIn('2 件', errors[0])

    def test_time_effectを指定すると時限効果の側へ能力を足す(self):
        entry = {'card_name': 'テスト潜在', 'set_with': [{'card_name': '相手'}], 'time_effect': 'テスト時限',
                 'capabilities': [{'name': 'スキル消費SP固定値減少', 'skills': ['ワイルドウォーク', 'ホークブーメラン'], 'value': 3}]}
        results, new = self.apply(make_dat(), [entry])
        self.assertEqual(len(results[0].skipped), 1)
        self.assertEqual(len(results[0].added), 1)
        self.assertIn('時限効果 5', results[0].target)
        self.assertIn('[[2,11]],24291,3,24046,3,0];', new['time'])
        self.assertEqual(new['card'], CARD_TEXT)      # セットレコード側は変えない

    def test_時限効果の説明と対象の説明文を一度に差し替える(self):
        entry = {'card_name': 'テスト潜在', 'set_with': [{'card_name': '相手'}], 'time_effect': 'テスト時限',
                 'time_explain': '新説明', 'desc': 'セット説明'}
        results, new = self.apply(make_dat(), [entry])
        self.assertEqual(results[0].explain_change, ('20秒間、[ワイルドウォーク]の消費SP -3', '新説明'))
        self.assertIn('"新説明",[[2,11]]', new['time'])
        self.assertIn('[11,100,0,,"セット説明",20100,100,0]', new['card'])

    def test_time_explainはtime_effectなしだとエラー(self):
        _, errors = cp.plan_all(make_dat(), [{'card_name': 'テスト潜在', 'time_explain': 'x'}], None)
        self.assertEqual(len(errors), 1)

    def test_時限効果が複数あって名前も指定しないとエラー(self):
        entry = {'card_name': 'テスト潜在', 'set_with': [{'card_name': '相手'}], 'time_effect': True,
                 'capabilities': [cap('ワイルドウォーク')]}
        _, errors = cp.plan_all(make_dat(), [entry], None)
        self.assertEqual(len(errors), 1)
        self.assertIn('2 件', errors[0])

    def test_時限効果が無い対象に指定するとエラー(self):
        entry = {'card_name': '別カード', 'time_effect': True, 'capabilities': [cap('ワイルドウォーク')]}
        _, errors = cp.plan_all(make_dat(), [entry], None)
        self.assertEqual(len(errors), 1)
        self.assertIn('0 件', errors[0])

    def test_説明文を差し替える(self):
        entry = {'card_name': 'テスト潜在', 'set_with': [{'card_name': '相手'}], 'desc': '新しい説明'}
        results, new = self.apply(make_dat(), [entry])
        self.assertEqual(results[0].desc_change, ('', '新しい説明'))
        self.assertIn('[11,100,0,,"新しい説明",20100,100,0]', new['card'])

    def test_数値0の説明文も文字列に置き換えられる(self):
        dat = cp.Dat('', 'export const CardObjNew = [\n\t[5,99,"x","y",0,243,1,0],\n];', '', SKILL_TEXT)
        results, errors = cp.plan_all(dat, [{'card_name': 'x', 'desc': 'd'}], None)
        self.assertEqual(errors, [])
        self.assertEqual(cp.apply_edits(dat.lines['card'], results[0].edits)[1], '\t[5,99,"x","y","d",243,1,0],')

    def test_カンマ入り説明文のレコードの末尾へ足せる(self):
        entry = {'card_name': '別カード', 'capabilities': [cap('ワイルドウォーク', 4)]}
        _, new = self.apply(make_dat(), [entry])
        self.assertIn('"説明, カンマ入り [x]",262,15,6291,4,0]', new['card'])

    def test_エラーケース(self):
        dat = make_dat()
        cases = [
            {'item_name': '存在しない', 'capabilities': []},
            {'card_name': 'テストアーマー'},
            {'item_name': 'テストアーマー', 'card_name': '相手'},
            {'card_name': 'テスト潜在', 'set_with': [{'card_name': '別カード'}], 'capabilities': []},
            {'item_id': 100, 'capabilities': [cap('重複')]},
            {'item_id': 100, 'capabilities': [cap('ワイルドウォーク'), cap('ワイルドウォーク')]},
        ]
        for entry in cases:
            with self.subTest(entry=entry):
                _, errors = cp.plan_all(dat, [entry], None)
                self.assertEqual(len(errors), 1)

    def test_同じレコードを二度指定するとエラー(self):
        e = {'item_name': 'テストアーマー', 'capabilities': [cap('ワイルドウォーク')]}
        _, errors = cp.plan_all(make_dat(), [e, e], None)
        self.assertEqual(len(errors), 1)

    def test_コメント行のレコードは対象にならない(self):
        _, errors = cp.plan_all(make_dat(), [{'item_name': 'コメント', 'capabilities': []}], None)
        self.assertEqual(len(errors), 1)


class CommandTest(unittest.TestCase):
    """一時ディレクトリに作った engine を相手に apply / verify を通しで動かす。"""

    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        root = self.tmp.name
        for rel, text in (('equip/item.dat.js', ITEM_TEXT), ('equip/card.dat.js', CARD_TEXT),
                          ('equip/itemset.dat.js', ITEMSET_TEXT), ('skill/skill.dat.js', SKILL_TEXT),
                          ('equip/timeitem.dat.js', TIMEITEM_TEXT),
                          ('battle/use.js', 'if (EquipNumSearch(ITEM_ID_TEST_ARMOR)) {}\n')):
            os.makedirs(os.path.dirname(os.path.join(root, rel)), exist_ok=True)
            with open(os.path.join(root, rel), 'w', encoding='utf-8') as f:
                f.write(text)
        self.yaml = os.path.join(root, 'patch.yaml')

    def tearDown(self):
        self.tmp.cleanup()

    def write_yaml(self, body):
        with open(self.yaml, 'w', encoding='utf-8') as f:
            f.write(body)

    def run_cli(self, *argv):
        out, err = io.StringIO(), io.StringIO()
        with redirect_stdout(out), redirect_stderr(err):
            code = cp.main(['--engine-dir', self.tmp.name, *argv])
        return code, out.getvalue(), err.getvalue()

    def item_text(self):
        with open(os.path.join(self.tmp.name, 'equip/item.dat.js'), encoding='utf-8') as f:
            return f.read()

    OK_YAML = '''patch_list:
  - item_name: テストアーマー
    capabilities:
      - name: スキルダメージ増加
        skill: ワイルドウォーク
        value: 1
        per_lv: 10
'''

    def test_dry_runは書き込まない(self):
        self.write_yaml(self.OK_YAML)
        code, out, _ = self.run_cli('apply', '--yaml', self.yaml, '--dry-run')
        self.assertEqual(code, 0)
        self.assertEqual(self.item_text(), ITEM_TEXT)
        self.assertIn('ワイルドウォーク', out)

    def test_applyのあとverifyが通り_定数の使用箇所を警告する(self):
        self.write_yaml(self.OK_YAML)
        self.assertEqual(self.run_cli('verify', '--yaml', self.yaml)[0], 1)
        code, out, _ = self.run_cli('apply', '--yaml', self.yaml)
        self.assertEqual(code, 0)
        self.assertIn('ITEM_ID_TEST_ARMOR', out)
        self.assertIn('battle/use.js:1', out)
        self.assertIn('100000000006291,1,0]', self.item_text())
        self.assertEqual(self.run_cli('verify', '--yaml', self.yaml)[0], 0)

    def test_1件でもエラーなら何も書き込まない(self):
        self.write_yaml(self.OK_YAML + '''  - item_name: 存在しない
    capabilities: []
''')
        code, _, err = self.run_cli('apply', '--yaml', self.yaml)
        self.assertEqual(code, 2)
        self.assertIn('存在しない', err)
        self.assertEqual(self.item_text(), ITEM_TEXT)

    def test_時限効果もapplyで書き込まれverifyが通る(self):
        self.write_yaml('''patch_list:
  - card_name: テスト潜在
    set_with: [{card_name: 相手}]
    time_effect: テスト時限
    time_explain: 新説明
    capabilities:
      - {name: スキル消費SP固定値減少, skill: ホークブーメラン, value: 3}
''')
        self.assertEqual(self.run_cli('verify', '--yaml', self.yaml)[0], 1)
        code, out, _ = self.run_cli('apply', '--yaml', self.yaml)
        self.assertEqual(code, 0)
        with open(os.path.join(self.tmp.name, 'equip/timeitem.dat.js'), encoding='utf-8') as f:
            text = f.read()
        self.assertIn('"新説明",[[2,11]],24291,3,24046,3,0];', text)
        self.assertEqual(self.run_cli('verify', '--yaml', self.yaml)[0], 0)

    def test_inspectは時限効果も表示する(self):
        code, out, _ = self.run_cli('inspect', 'テスト潜在')
        self.assertEqual(code, 0)
        self.assertIn('時限効果 5 「テスト時限」', out)
        self.assertIn('skill: ワイルドウォーク', out)

    def test_inspectはYAML書式で表示する(self):
        code, out, _ = self.run_cli('inspect', 'テストアーマー')
        self.assertEqual(code, 0)
        self.assertIn('skill: ホークブーメラン', out)
        self.assertIn('per_lv: 10', out)
        self.assertIn('セット [card:12 相手]', out)


if __name__ == '__main__':
    unittest.main()
