"""セット効果レコード（type 100）の重複を検出し、1つにまとめる。

セット効果は「効果レコード（item.dat.js / card.dat.js の type 100）」と、
それを発動させる条件「w_SE（itemset.dat.js）」に分かれている。画面のセット説明は効果レコードごとに
「A + B または A + C … を同時に装備した時」と1ブロックにまとまるため、同じ効果なのに別レコードが
あると別ブロックに分裂する。

- 生成スクリプト（item_craft.py / card_craft.py）は loadReusableEffects() で同じ内容の効果レコードを再利用する
- 統合できる重複が残っていないかは `python3 set_effect_merge.py --check` で確認する（`--apply` で w_SE の参照先を寄せる）

統合の対象は MERGE_FROM_EFFECT_ID 以降に追加した効果レコードだけ。それ未満（既存）は、見た目が同じでも
人間の判断で個別に定義しているものがありうるため、検出も統合も再利用もしない。

重複していたレコード自体は削除できない（ItemObjNew / CardObjNew は添字＝ID の配列で、
欠番があると装備一覧の走査が落ちる）。重複を作らないよう、生成時に再利用する。

統合しない効果レコード:
- 時限効果の元データ（timeitem.dat.js）から参照されている（統合すると別のセットにも時限効果が付く）
- 「効果が発動しない」系の能力（218 / 219）の値として参照されている
- item.dat.js / card.dat.js の名前付き定数が指している
"""

import os
import re
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ENGINE_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, '..', '..', 'engine'))

KIND_ITEM = 'item'
KIND_CARD = 'card'

# 統合の対象にする効果レコードの最小ID（2026-10-24 のセッションで最初に追加したもの）。
# これ以降に追加される効果レコードは自動的に対象になる
MERGE_FROM_EFFECT_ID = {KIND_ITEM: 5805, KIND_CARD: 4562}

# type 100 の行。ItemObjNew[ID] = [...] 形式と、配列リテラル内の [...], 形式の両方
_RE_EFFECT = {
    KIND_ITEM: re.compile(r'^\s*(?:ItemObjNew\[(\d+)\]\s*=\s*)?\[(\d+),100,(.*?)\]\s*[,;]?\s*(?://.*)?$'),
    KIND_CARD: re.compile(r'^\s*(?:CardObjNew\[(\d+)\]\s*=\s*)?\[(\d+),100,(.*?)\]\s*[,;]?\s*(?://.*)?$'),
}
_RE_CONST = re.compile(r'^export const \w+\s*=\s*(\d+)\s*;')
_RE_WSE_ASSIGN = re.compile(r'^(\s*w_SE\[\d+\]\s*=\s*\[\s*)(-?\d+)(\s*,.*)$')
_RE_WSE_LITERAL_START = re.compile(r'^\s*export const w_SE\s*=\s*\[\s*$')
_RE_WSE_LITERAL_ROW = re.compile(r'^(\s*\[\s*)(-?\d+)(\s*,.*)$')
_RE_TIME_SOURCES = re.compile(r'\[\[\d+,\d+\](?:,\[\d+,\d+\])*\]')


def _read(path):
    with open(path, encoding='utf-8') as f:
        return f.read()


def parseEffectRecords(text, kind):
    """type 100 の効果レコードを {ID: 中身（"[ID,100," の後ろから末尾の "]" の前まで）} で返す"""
    records = {}
    for line in text.split('\n'):
        m = _RE_EFFECT[kind].match(line)
        if m:
            records[int(m.group(2))] = m.group(3)
    return records


def parseSetRows(text):
    """itemset.dat.js の w_SE の行を [(行番号, 効果ID（符号つき）)] で返す。

    効果IDは 正=アイテム側 / 負=カード側。配列リテラル形式（export const w_SE = [ ... ]）と
    代入形式（w_SE[n] = [...]）の両方を拾う
    """
    rows = []
    in_literal = False
    for index, line in enumerate(text.split('\n')):
        if _RE_WSE_LITERAL_START.match(line):
            in_literal = True
            continue
        if in_literal:
            if re.match(r'^\s*\]\s*;', line):
                in_literal = False
                continue
            m = _RE_WSE_LITERAL_ROW.match(line)
            if m:
                rows.append((index, int(m.group(2))))
            continue
        m = _RE_WSE_ASSIGN.match(line)
        if m:
            rows.append((index, int(m.group(2))))
    return rows


def parseTimeSources(text):
    """timeitem.dat.js の元データ（[[1,ID],[2,ID]]）が指す効果レコードを {(種別, ID)} で返す"""
    result = set()
    for chunk in _RE_TIME_SOURCES.findall(text):
        for src_kind, src_id in re.findall(r'\[(\d+),(\d+)\]', chunk):
            result.add((KIND_ITEM if src_kind == '1' else KIND_CARD, int(src_id)))
    return result


def parseInvalidated(text):
    """「効果が発動しない」系の能力（218=アイテム側 / 219=カード側）の値として参照されている効果を返す"""
    result = set()
    for line in text.split('\n'):
        if '"' not in line:
            continue
        tail = line[line.rindex('"') + 1:]
        numbers = [int(t) for t in (s.strip().rstrip('n') for s in tail.split(',')) if re.fullmatch(r'-?\d+', t)]
        for code, value in zip(numbers[0::2], numbers[1::2]):
            if code == 0:
                break
            if code % 100000 == 218:
                result.add((KIND_ITEM, value))
            elif code % 100000 == 219:
                result.add((KIND_CARD, value))
    return result


class SetEffectState:
    """現在のデータから、効果レコード・参照・保護対象を読み取った状態"""

    def __init__(self, engine_dir=ENGINE_DIR):
        equip = os.path.join(engine_dir, 'equip')
        self.item_text = _read(os.path.join(equip, 'item.dat.js'))
        self.card_text = _read(os.path.join(equip, 'card.dat.js'))
        self.itemset_path = os.path.join(equip, 'itemset.dat.js')
        self.itemset_text = _read(self.itemset_path)
        self.timeitem_text = _read(os.path.join(equip, 'timeitem.dat.js'))

        self.effects = {
            KIND_ITEM: parseEffectRecords(self.item_text, KIND_ITEM),
            KIND_CARD: parseEffectRecords(self.card_text, KIND_CARD),
        }
        self.rows = parseSetRows(self.itemset_text)
        # w_SE から参照されている効果レコード
        self.used = {(KIND_ITEM if eff > 0 else KIND_CARD, abs(eff)) for _, eff in self.rows}

        self.protected_reason = {}
        for key in parseTimeSources(self.timeitem_text):
            self.protected_reason.setdefault(key, '時限効果の元データ')
        for text in (self.item_text, self.card_text):
            for key in parseInvalidated(text):
                self.protected_reason.setdefault(key, '「効果が発動しない」の対象')
        for text, kind in ((self.item_text, KIND_ITEM), (self.card_text, KIND_CARD)):
            for line in text.split('\n'):
                m = _RE_CONST.match(line)
                if m and int(m.group(1)) in self.effects[kind]:
                    self.protected_reason.setdefault((kind, int(m.group(1))), '名前付き定数')

    def isTarget(self, kind, effect_id):
        """統合・再利用の対象か（MERGE_FROM_EFFECT_ID 以降で、参照されていて、保護されていない）"""
        return (effect_id >= MERGE_FROM_EFFECT_ID[kind]
                and (kind, effect_id) in self.used
                and (kind, effect_id) not in self.protected_reason
                and effect_id in self.effects[kind])

    def payload(self, kind, effect_id):
        return self.effects[kind].get(effect_id)


def _groups(state):
    groups = {}
    for kind, effect_id in sorted(state.used, key=lambda k: k[1]):
        if state.isTarget(kind, effect_id):
            groups.setdefault((kind, state.payload(kind, effect_id)), []).append(effect_id)
    return groups


def planMerges(state):
    """重複している効果レコードの統合計画 {(種別, 旧ID): (種別, 残すID)} を返す（残すIDは最小のID）"""
    plan = {}
    for (kind, _), ids in _groups(state).items():
        for effect_id in ids[1:]:
            plan[(kind, effect_id)] = (kind, ids[0])
    return plan


def loadReusableEffects(engine_dir=ENGINE_DIR):
    """生成スクリプト用: {(種別, 中身): ID}。同じ内容のセット効果を新規に作らず再利用するための表"""
    return {key: ids[0] for key, ids in _groups(SetEffectState(engine_dir)).items()}


def effectPayload(kind, description, capability_records):
    """生成スクリプトが作る効果レコードの中身（parseEffectRecords と同じ形）"""
    if kind == KIND_ITEM:
        return f'0,0,0,0,0,0,0,0,"{description}",{capability_records}0'
    return f'0,"","{description}",{capability_records}0'


def applyPlan(state, plan):
    """itemset.dat.js の w_SE の効果IDを付け替えた全文と、付け替えた行数を返す（書き込みは呼び出し側）"""
    lines = state.itemset_text.split('\n')
    changed = 0
    for index, effect in state.rows:
        kind = KIND_ITEM if effect > 0 else KIND_CARD
        target = plan.get((kind, abs(effect)))
        if target is None:
            continue
        new_effect = target[1] if effect > 0 else -target[1]
        m = _RE_WSE_ASSIGN.match(lines[index]) or _RE_WSE_LITERAL_ROW.match(lines[index])
        lines[index] = m.group(1) + str(new_effect) + m.group(3)
        changed += 1
    return '\n'.join(lines), changed


def verifyPlan(state, new_text):
    """付け替え前後で、全てのセットの効果の中身が変わっていないことを確認する。問題があれば ValueError"""
    after = parseSetRows(new_text)
    if len(after) != len(state.rows):
        raise ValueError('w_SE の行数が変わっています')
    for (index_b, eff_b), (index_a, eff_a) in zip(state.rows, after):
        kind_b = KIND_ITEM if eff_b > 0 else KIND_CARD
        kind_a = KIND_ITEM if eff_a > 0 else KIND_CARD
        if index_b != index_a or kind_b != kind_a or state.payload(kind_b, abs(eff_b)) != state.payload(kind_a, abs(eff_a)):
            raise ValueError(f'{index_b + 1}行目: 効果の中身が変わります（{eff_b} → {eff_a}）')


def main(argv):
    state = SetEffectState()
    plan = planMerges(state)

    by_keep = {}
    for old, new in plan.items():
        by_keep.setdefault(new, []).append(old[1])
    print(f'統合できる重複（ID が {MERGE_FROM_EFFECT_ID} 以降）: {len(by_keep)} グループ・付け替える効果レコード {len(plan)} 件')
    for (kind, keep), olds in sorted(by_keep.items()):
        print(f'  {kind} {keep} ← {sorted(olds)}  {state.payload(kind, keep)[:70]}')

    if '--apply' in argv and plan:
        new_text, changed = applyPlan(state, plan)
        verifyPlan(state, new_text)
        with open(state.itemset_path, 'w', encoding='utf-8') as f:
            f.write(new_text)
        print(f'itemset.dat.js の w_SE を {changed} 行付け替えた（重複していたレコードは参照されなくなるだけで残る）')
        return 0
    if '--check' in argv:
        return 1 if plan else 0
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
