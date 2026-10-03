#!/usr/bin/env python3
"""capability_patch.py

既存のアイテム・カード・エンチャントのレコードへ能力を追記する。
新規登録（item_craft.py / card_craft.py）と違い、レコード全体は作り直さず、
`0]` の直前へ「足りない能力」だけを挿入する。使い方は capability_patch.README.md を参照。

    python3 capability_patch.py inspect ハルピュイア
    python3 capability_patch.py apply --dry-run
    python3 capability_patch.py apply
    python3 capability_patch.py verify
"""

from __future__ import annotations

import argparse
import os
import re
import sys
from collections import defaultdict
from dataclasses import dataclass, field

import yaml

import craft_util as cu

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ENGINE_DIR = os.path.normpath(os.path.join(SCRIPT_DIR, '..', '..', 'engine'))
PATCH_YAML = os.path.join(SCRIPT_DIR, '能力追加.yaml')

DESC_INDEX = {'item': 10, 'card': 4}
NAME_INDEX = {'item': 8, 'card': 2}
SET_RECORD_TYPE = 100
KIND_LABEL = {'item': 'item', 'card': 'card'}

# スキルIDを加算して使う能力（engine/const/EnumItemSpId.js の ITEM_SP_SKILL_*_OFFSET）
FAMILY_BASES = (5000, 7000, 9000, 11000, 13000, 19000, 21000, 23000)
SKILL_ID_SPAN = 2000

ALLOWED_KEYS = {
    'name', 'value', 'skill', 'skills', 'per_lv', 'at_lv', 'per_refine', 'at_refine',
    'per_status_10', 'per_status_30', 'at_status_100', 'at_status_110', 'at_status_130',
    'at_sp_status_100', 'at_sp_status_110', 'at_sp_status_50',
    'at_transcendence', 'at_equip_location', 'job_restrict',
}
ENTITY_KEYS = ('item_name', 'card_name', 'item_id', 'card_id')


class PatchError(Exception):
    """入力・データの問題。1件でも起きたら何も書き込まない。"""


# ---------------------------------------------------------------------------
# レコード行の解析
# ---------------------------------------------------------------------------
@dataclass
class Tok:
    start: int      # 行内の絶対位置（直前のカンマの次）。前後の空白を含む
    end: int
    text: str


RE_RECORD = re.compile(r'^\s*(?:(?:ItemObjNew|CardObjNew)\[(\d+)\]\s*=\s*)?(\[)(\d+),')
RE_TAIL = re.compile(r'^[,;]?\s*(?://.*)?$')
RE_CODE = re.compile(r'^\d+n?$')
RE_INT = re.compile(r'^-?\d+$')


def tokenize_array(line: str, p: int):
    """line[p] == '[' から対応する ']' までを、文字列リテラルを考慮して要素に分割する。

    戻り値: (Tok のリスト, 閉じ括弧の位置)。閉じていない・入れ子があるときは (None, -1)。
    """
    depth = 0
    in_str = False
    esc = False
    cur = p + 1
    toks: list[Tok] = []
    for i in range(p, len(line)):
        c = line[i]
        if in_str:
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == '"':
                in_str = False
            continue
        if c == '"':
            in_str = True
        elif c == '[':
            depth += 1
            if depth > 1:
                return None, -1
        elif c == ']':
            depth -= 1
            if depth == 0:
                toks.append(Tok(cur, i, line[cur:i]))
                return toks, i
        elif c == ',' and depth == 1:
            toks.append(Tok(cur, i, line[cur:i]))
            cur = i + 1
    return None, -1


@dataclass
class Cap:
    code: int
    value: int


@dataclass
class Rec:
    kind: str
    lineno: int
    id: int
    toks: list
    close: int
    problem: str | None = None

    @property
    def rtype(self) -> int:
        return int(self.toks[1].text)

    @property
    def desc_idx(self) -> int:
        return DESC_INDEX[self.kind]

    def string_at(self, i: int):
        """i 番目の要素が文字列リテラルならその中身、そうでなければ None。"""
        t = self.toks[i].text.strip() if i < len(self.toks) else ''
        if len(t) >= 2 and t[0] == '"' and t[-1] == '"':
            return t[1:-1]
        return None

    @property
    def name(self):
        return self.string_at(NAME_INDEX[self.kind])

    @property
    def desc(self) -> str:
        return self.string_at(self.desc_idx) or ''

    @property
    def caps(self) -> list[Cap]:
        body = self.toks[self.desc_idx + 1:-1]
        return [Cap(int(body[i].text.strip().rstrip('n')), int(body[i + 1].text.strip()))
                for i in range(0, len(body), 2)]

    @property
    def terminator(self) -> Tok:
        return self.toks[-1]


def parse_record_line(line: str, kind: str, lineno: int):
    m = RE_RECORD.match(line)
    if not m:
        return None
    toks, close = tokenize_array(line, m.start(2))
    if toks is None or not RE_TAIL.match(line[close + 1:].rstrip('\n')):
        return None
    rec = Rec(kind, lineno, int(m.group(3)), toks, close)
    if m.group(1) and int(m.group(1)) != rec.id:
        rec.problem = f'行頭の添字 [{m.group(1)}] と先頭要素 {rec.id} が一致しない'
        return rec
    di = DESC_INDEX[kind]
    if len(toks) < di + 2:
        rec.problem = '要素数が足りない'
    elif toks[-1].text.strip() != '0':
        rec.problem = '末尾が 0 で終わっていない'
    elif rec.string_at(di) is None and toks[di].text.strip() != '0':
        rec.problem = '説明文の位置が文字列でも 0 でもない'
    else:
        body = toks[di + 1:-1]
        if len(body) % 2:
            rec.problem = '能力コードと値の組が奇数個'
        elif not all(RE_CODE.match(body[i].text.strip()) and RE_INT.match(body[i + 1].text.strip())
                     for i in range(0, len(body), 2)):
            rec.problem = '能力コード・値が整数として読めない'
    return rec


def parse_records(text: str, kind: str):
    lines = text.split('\n')
    return lines, [r for r in (parse_record_line(ln, kind, i) for i, ln in enumerate(lines)) if r]


# ---------------------------------------------------------------------------
# セット定義（itemset.dat.js の w_SE）
# ---------------------------------------------------------------------------
@dataclass
class SetDef:
    rec_id: int          # セットレコードID（item は正、card は負）
    base: int            # 本体ID（同上の符号規則）
    partners: list
    lineno: int


RE_SET_PREFIXED = re.compile(r'^\s*w_SE\[\d+\]\s*=\s*\[(-?\d+(?:\s*,\s*-?\d+)+)\s*,?\s*\]\s*;')
RE_SET_LITERAL = re.compile(r'^\s*\[(-?\d+(?:\s*,\s*-?\d+)+)\s*,?\s*\]\s*,?\s*(?://.*)?$')


def parse_sets(text: str) -> list[SetDef]:
    lines = text.split('\n')
    start = next((i for i, ln in enumerate(lines) if re.match(r'^\s*export const w_SE\s*=\s*\[', ln)), None)
    end = next((i for i in range(start + 1, len(lines)) if re.match(r'^\s*\]\s*;', lines[i])), len(lines)) if start is not None else -1
    sets = []
    for i, ln in enumerate(lines):
        m = RE_SET_PREFIXED.match(ln)
        if not m and start is not None and start < i < end:
            m = RE_SET_LITERAL.match(ln)
        if m:
            nums = [int(x) for x in m.group(1).replace(' ', '').split(',')]
            if len(nums) >= 3:
                sets.append(SetDef(nums[0], nums[1], nums[2:], i))
    return sets


# ---------------------------------------------------------------------------
# スキル名テーブル
# ---------------------------------------------------------------------------
class SkillTable:
    RE_LINE = re.compile(r'^\s*\[(\d+),\d+,"((?:\([^)"]*\))?)([^"]+)"')

    def __init__(self, skill_text: str):
        self.by_name: dict[str, list[int]] = defaultdict(list)
        self.by_id: dict[int, str] = {}
        for ln in skill_text.split('\n'):
            m = self.RE_LINE.match(ln)
            if m:
                sid = int(m.group(1))
                self.by_name[m.group(3)].append(sid)
                self.by_id.setdefault(sid, m.group(3))

    def resolve(self, name: str) -> int:
        ids = self.by_name.get(name)
        if not ids:
            raise PatchError(f'スキル「{name}」は skill.dat.js にありません')
        if len(set(ids)) > 1:
            raise PatchError(f'スキル名「{name}」が複数あります（ID {sorted(set(ids))}）')
        return ids[0]


# ---------------------------------------------------------------------------
# 能力コードの組み立て・分解
# ---------------------------------------------------------------------------
CAP_NAME_BY_CODE: dict[int, str] = {}
for _n, _c in cu.CAPABILITY_DICT.items():
    CAP_NAME_BY_CODE.setdefault(int(_c), _n)

FAMILY_NAMES = {n for n, c in cu.CAPABILITY_DICT.items() if int(c) in FAMILY_BASES}

_CONDITION_TABLES = {
    'per_status_10': cu.PER_STATUS_10_CODE,
    'per_status_30': cu.PER_STATUS_30_CODE,
    'at_status_100': cu.AT_STATUS_100_CODE,
    'at_status_110': cu.AT_STATUS_110_CODE,
    'at_status_130': cu.AT_STATUS_130_CODE,
    'at_sp_status_100': cu.AT_SP_STATUS_100_CODE,
    'at_sp_status_110': cu.AT_SP_STATUS_110_CODE,
    'at_sp_status_50': cu.AT_SP_STATUS_50_CODE,
    'at_equip_location': cu.AT_EQUIP_LOCATION_CODE,
    'job_restrict': cu.RESTRICT_JOB_CODE,
    'at_lv': cu.AT_BASE_LV_CODE,
}
_AT_STATUS_KEYS = ('at_status_100', 'at_status_110', 'at_status_130',
                   'at_sp_status_100', 'at_sp_status_110', 'at_sp_status_50')


def split_family(cap_code: int):
    for base in FAMILY_BASES:
        if base <= cap_code < base + SKILL_ID_SPAN:
            return base, cap_code - base
    return None, None


def _to_int(cap: dict, key: str) -> int:
    try:
        return int(cap[key])
    except (TypeError, ValueError):
        raise PatchError(f'{key} が整数ではありません: {cap[key]!r}')


def encode_cap(cap: dict, skills: SkillTable):
    """YAML の能力1件（スキルは1つに展開済み）→ (能力コード int, 値 int, BigInt か)。"""
    unknown = set(cap) - ALLOWED_KEYS
    if unknown:
        raise PatchError(f'未対応のキー {sorted(unknown)}（{cap.get("name")}）')
    name = cap.get('name')
    if name not in cu.CAPABILITY_DICT:
        raise PatchError(f'能力名「{name}」は 発動能力コード.yaml にありません')
    if 'value' not in cap:
        raise PatchError(f'「{name}」に value がありません')
    _to_int(cap, 'value')
    for key in ('per_lv', 'per_refine', 'at_refine', 'at_transcendence'):
        if key in cap:
            _to_int(cap, key)
    for key, table in _CONDITION_TABLES.items():
        if key in cap:
            k = _to_int(cap, key) if key == 'at_lv' else cap[key]
            if k not in table:
                raise PatchError(f'{key} の値 {cap[key]!r} は未定義です（{sorted(table)}）')
    if sum(k in cap for k in _AT_STATUS_KEYS) > 1:
        raise PatchError(f'at_status_* は1つしか指定できません（{name}）')

    skill_id = 0
    plain = {k: v for k, v in cap.items() if k != 'skill'}
    if name in FAMILY_NAMES:
        if 'skill' not in cap:
            raise PatchError(f'「{name}」にはスキル名（skill）が必要です')
        skill_id = skills.resolve(cap['skill'])
    elif 'skill' in cap:
        raise PatchError(f'「{name}」+ skill は未対応です（スキルIDを加算する能力のみ対応）')

    code_str, value_str, _ = cu.buildCapabilityRecord(plain).split(',')
    big = code_str.endswith('n')
    return int(code_str.rstrip('n')) + skill_id, int(value_str), big


def decode_code(code: int, skills: SkillTable | None = None) -> dict:
    """能力コード → 条件・能力名・スキル名の dict（YAML の能力と同じキー）。"""
    s = str(code).zfill(19)
    out: dict = {}
    cap_code = int(s[14:19])
    base, skill_id = split_family(cap_code)
    if base is not None:
        out['name'] = CAP_NAME_BY_CODE.get(base, f'?{base}')
        out['skill'] = (skills.by_id.get(skill_id) if skills else None) or f'?ID{skill_id}'
    else:
        out['name'] = CAP_NAME_BY_CODE.get(cap_code, f'?コード{cap_code}')

    def rev(table, v):
        return next((k for k, x in table.items() if x == v), f'?{v}')

    if int(s[4:6]):
        out['per_lv'] = int(s[4:6])
    if int(s[3]):
        out['at_lv'] = rev(cu.AT_BASE_LV_CODE, int(s[3]))
    if int(s[11:13]):
        out['at_refine'] = int(s[11:13])
    if int(s[13]):
        out['per_refine'] = int(s[13])
    if int(s[2]):
        out['at_transcendence'] = int(s[2])
    if int(s[1]):
        out['at_equip_location'] = rev(cu.AT_EQUIP_LOCATION_CODE, int(s[1]))
    if int(s[6:8]):
        out['job_restrict'] = rev(cu.RESTRICT_JOB_CODE, int(s[6:8]))
    if int(s[10]):
        out['per_status_10'] = rev(cu.PER_STATUS_10_CODE, int(s[10]))
    if int(s[0]):
        out['per_status_30'] = rev(cu.PER_STATUS_30_CODE, int(s[0]))
    at_status = int(s[8:10])
    if at_status:
        for key in _AT_STATUS_KEYS:
            hit = next((k for k, x in _CONDITION_TABLES[key].items() if x == at_status), None)
            if hit:
                out[key] = hit
                break
        else:
            out['?at_status'] = at_status
    return out


def line_key(code: int) -> tuple:
    """同じ「行」（条件が同じで同種の能力）を表すキー。スキルIDは含めない。"""
    cap_code = code % 100000
    base, _ = split_family(cap_code)
    return code // 100000, base if base is not None else cap_code


_ENUM_NAMES: dict[int, str] | None = None


def enum_name(cap_code: int) -> str | None:
    """発動能力コード.yaml に無いコードを engine/const/EnumItemSpId.js の定数名で補う（表示専用）。"""
    global _ENUM_NAMES
    if _ENUM_NAMES is None:
        _ENUM_NAMES = {}
        path = os.path.join(ENGINE_DIR, 'const', 'EnumItemSpId.js')
        if os.path.exists(path):
            for ln in read_text(path).split('\n'):
                m = re.match(r'^export const (ITEM_SP_[A-Z0-9_]+)\s*=\s*(\d+)\s*;', ln)
                if m:
                    _ENUM_NAMES.setdefault(int(m.group(2)), m.group(1))
    return _ENUM_NAMES.get(cap_code)


def format_cap_yaml(code: int, value: int, skills: SkillTable | None, indent: str = '') -> str:
    d = decode_code(code, skills)
    name = d.pop('name')
    if name.startswith('?コード'):
        const = enum_name(int(name[4:]))
        name = f'{name}（{const}）' if const else name
    parts = [f'name: {name}']
    if 'skill' in d:
        parts.append(f'skill: {d.pop("skill")}')
    parts.append(f'value: {value}')
    parts.extend(f'{k}: {v}' for k, v in d.items())
    return indent + '- ' + f'\n{indent}  '.join(parts)


# ---------------------------------------------------------------------------
# データ全体
# ---------------------------------------------------------------------------
class Dat:
    def __init__(self, item_text: str, card_text: str, itemset_text: str, skill_text: str,
                 timeitem_text: str = ''):
        self.texts = {'item': item_text, 'card': card_text}
        self.lines = {}
        self.recs = {}
        self.by_id = {}
        self.by_name = {}
        for kind in ('item', 'card'):
            lines, recs = parse_records(self.texts[kind], kind)
            self.lines[kind] = lines
            self.recs[kind] = recs
            by_id = defaultdict(list)
            by_name = defaultdict(list)
            for r in recs:
                by_id[r.id].append(r)
                if not r.problem and r.rtype != SET_RECORD_TYPE and r.name:
                    by_name[r.name].append(r)
            self.by_id[kind] = by_id
            self.by_name[kind] = by_name
        self.sets = parse_sets(itemset_text)
        self.skills = SkillTable(skill_text)
        self.timeitem_text = timeitem_text
        self._consts = None

    # -- 解決 ---------------------------------------------------------------
    def resolve_entity(self, spec: dict, what: str):
        keys = [k for k in ENTITY_KEYS if k in spec]
        if len(keys) != 1:
            raise PatchError(f'{what}: {ENTITY_KEYS} のどれか1つだけを指定してください: {spec}')
        key = keys[0]
        kind = key.split('_')[0]
        if key.endswith('_name'):
            cands = self.by_name[kind].get(spec[key], [])
            if not cands:
                raise PatchError(f'{what}: {kind} に「{spec[key]}」が見つかりません')
        else:
            cands = self.by_id[kind].get(int(spec[key]), [])
            if not cands:
                raise PatchError(f'{what}: {kind} ID {spec[key]} が見つかりません')
        if len(cands) > 1:
            lines = [r.lineno + 1 for r in cands]
            raise PatchError(f'{what}: {kind}「{spec[key]}」が複数あります（行 {lines}）')
        rec = cands[0]
        if rec.problem:
            raise PatchError(f'{what}: {kind} {rec.id}（行 {rec.lineno + 1}）を読めません: {rec.problem}')
        return rec

    @staticmethod
    def signed(rec: Rec) -> int:
        return rec.id if rec.kind == 'item' else -rec.id

    def rec_by_signed(self, sid: int):
        kind = 'item' if sid > 0 else 'card'
        cands = self.by_id[kind].get(abs(sid), [])
        return cands[0] if len(cands) == 1 else None

    def display(self, sid: int) -> str:
        rec = self.rec_by_signed(sid)
        kind = 'item' if sid > 0 else 'card'
        nm = rec.name if rec and rec.name else '(名前なし)'
        return f'{kind}:{abs(sid)} {nm}'

    def find_set(self, base: Rec, partner_specs: list):
        partners = sorted(self.signed(self.resolve_entity(p, 'set_with')) for p in partner_specs)
        base_id = self.signed(base)
        hits = [s for s in self.sets if s.base == base_id and sorted(s.partners) == partners]
        if len(hits) != 1:
            near = [s for s in self.sets if s.base == base_id]
            hint = '; '.join(f'セット{s.rec_id}=[{", ".join(self.display(x) for x in s.partners)}]' for s in near)
            raise PatchError(f'セット条件に一致する w_SE が {len(hits)} 件です。'
                             f'本体 {self.display(base_id)} のセット: {hint or "なし"}')
        rec = self.rec_by_signed(hits[0].rec_id)
        if rec is None or rec.problem:
            raise PatchError(f'セットレコード {hits[0].rec_id} を読めません')
        return rec, hits[0]

    # -- ITEM_ID_* / CARD_ID_* 定数 -----------------------------------------
    def const_names(self, kind: str, rec_id: int) -> list[str]:
        if self._consts is None:
            self._consts = {'item': defaultdict(list), 'card': defaultdict(list)}
            for k, prefix in (('item', 'ITEM_ID_'), ('card', 'CARD_ID_')):
                pat = re.compile(r'^export const (' + prefix + r'[A-Za-z0-9_]+)\s*=\s*(\d+)\s*;')
                for ln in self.lines[k]:
                    m = pat.match(ln)
                    if m:
                        self._consts[k][int(m.group(2))].append(m.group(1))
        return self._consts[kind].get(rec_id, [])


def scan_const_usage(engine_dir: str, names: list[str]) -> dict:
    """定数名の使用箇所（データファイル *.dat.js 以外）を {name: ['相対パス:行', ...]} で返す。"""
    if not names:
        return {}
    pat = re.compile(r'\b(' + '|'.join(re.escape(n) for n in names) + r')\b')
    found = defaultdict(list)
    for root, _, files in os.walk(engine_dir):
        for fn in files:
            if not fn.endswith('.js') or fn.endswith('.dat.js'):
                continue
            path = os.path.join(root, fn)
            with open(path, encoding='utf-8') as f:
                for i, ln in enumerate(f, 1):
                    for m in pat.finditer(ln):
                        found[m.group(1)].append(f'{os.path.relpath(path, engine_dir)}:{i}')
    return dict(found)


# ---------------------------------------------------------------------------
# 計画（1エントリぶん）
# ---------------------------------------------------------------------------
@dataclass
class Edit:
    kind: str
    lineno: int
    start: int
    end: int
    text: str


@dataclass
class EntryResult:
    label: str
    target: str
    edits: list = field(default_factory=list)
    added: list = field(default_factory=list)
    skipped: list = field(default_factory=list)
    conflicts: list = field(default_factory=list)
    newlines: list = field(default_factory=list)
    warns: list = field(default_factory=list)
    desc_change: tuple | None = None

    @property
    def changed(self) -> bool:
        return bool(self.added) or self.desc_change is not None

    @property
    def status(self) -> str:
        if self.conflicts:
            return '要確認(値の食い違い)'
        return '追加' if self.changed else '変更なし'


def expand_caps(entry: dict) -> list[dict]:
    out = []
    for cap in entry.get('capabilities') or []:
        names = cap.get('skills')
        if names is not None:
            if 'skill' in cap:
                raise PatchError(f'skill と skills は同時に指定できません: {cap.get("name")}')
            base = {k: v for k, v in cap.items() if k != 'skills'}
            out.extend({**base, 'skill': s} for s in names)
        else:
            out.append(dict(cap))
    return out


def plan_entry(dat: Dat, entry: dict, engine_dir: str | None = None) -> EntryResult:
    keys = [k for k in ENTITY_KEYS if k in entry]
    if len(keys) != 1:
        raise PatchError(f'対象は {ENTITY_KEYS} のどれか1つだけを指定してください: {list(entry)}')
    base = dat.resolve_entity({keys[0]: entry[keys[0]]}, '対象')
    label = f'{entry[keys[0]]}'
    target, target_label = base, f'{base.kind} {base.id}'
    if entry.get('set_with'):
        target, sdef = dat.find_set(base, entry['set_with'])
        partners = ', '.join(dat.display(x) for x in sdef.partners)
        target_label = f'{base.kind} {base.id} のセット[{partners}] → {target.kind} {target.id}'
        label += ' + ' + '/'.join(str(next(iter(p.values()))) for p in entry['set_with'])
    res = EntryResult(label, target_label)

    existing = target.caps
    existing_pairs = {(c.code, c.value) for c in existing}
    existing_codes = {c.code for c in existing}
    existing_lines = {line_key(c.code) for c in existing}

    seen_codes = set()
    insert = ''
    for cap in expand_caps(entry):
        code, value, big = encode_cap(cap, dat.skills)
        if code in seen_codes:
            raise PatchError(f'同じ能力が YAML 内で重複しています: {cap}')
        seen_codes.add(code)
        text = f'{code}{"n" if big else ""},{value},'
        shown = format_cap_yaml(code, value, dat.skills).replace('\n  ', ' / ').lstrip('- ')
        if (code, value) in existing_pairs:
            res.skipped.append(shown)
        elif code in existing_codes:
            old = next(c.value for c in existing if c.code == code)
            res.conflicts.append(f'{shown}（既存の値 {old}。書き換えない）')
        else:
            insert += text
            res.added.append(shown)
            if line_key(code) not in existing_lines:
                res.newlines.append(shown)

    if insert:
        pos = target.terminator.start
        res.edits.append(Edit(target.kind, target.lineno, pos, pos, insert))

    if entry.get('desc') is not None:
        new_desc = str(entry['desc'])
        if '"' in new_desc or '\n' in new_desc or '\\' in new_desc:
            raise PatchError('desc に " \\ 改行は使えません')
        if new_desc != target.desc:
            tok = target.toks[target.desc_idx]
            lead = len(tok.text) - len(tok.text.lstrip())
            trail = len(tok.text) - len(tok.text.rstrip())
            res.edits.append(Edit(target.kind, target.lineno, tok.start + lead, tok.end - trail,
                                  f'"{new_desc}"'))
            res.desc_change = (target.desc, new_desc)

    if engine_dir:
        names = dat.const_names(base.kind, base.id)
        for n, places in scan_const_usage(engine_dir, names).items():
            res.warns.append(f'{n} が dat 以外のコードで使われています（効果が二重に効く恐れ）: '
                             + ', '.join(places[:5]) + (' ほか' if len(places) > 5 else ''))
    return res


def apply_edits(lines: list[str], edits: list[Edit]) -> list[str]:
    out = list(lines)
    for e in sorted(edits, key=lambda e: (e.lineno, e.start), reverse=True):
        ln = out[e.lineno]
        out[e.lineno] = ln[:e.start] + e.text + ln[e.end:]
    return out


# ---------------------------------------------------------------------------
# 読み込み・書き込み
# ---------------------------------------------------------------------------
def dat_paths(engine_dir: str) -> dict:
    return {
        'item': os.path.join(engine_dir, 'equip', 'item.dat.js'),
        'card': os.path.join(engine_dir, 'equip', 'card.dat.js'),
        'itemset': os.path.join(engine_dir, 'equip', 'itemset.dat.js'),
        'skill': os.path.join(engine_dir, 'skill', 'skill.dat.js'),
        'timeitem': os.path.join(engine_dir, 'equip', 'timeitem.dat.js'),
    }


def read_text(path: str) -> str:
    with open(path, encoding='utf-8', newline='') as f:
        return f.read()


def load_dat(engine_dir: str) -> Dat:
    p = dat_paths(engine_dir)
    return Dat(read_text(p['item']), read_text(p['card']), read_text(p['itemset']),
               read_text(p['skill']), read_text(p['timeitem']))


def load_patch(path: str) -> list[dict]:
    with open(path, encoding='utf-8') as f:
        cfg = yaml.safe_load(f) or {}
    entries = cfg.get('patch_list')
    if not isinstance(entries, list) or not entries:
        raise PatchError(f'{path} に patch_list がありません')
    return entries


def plan_all(dat: Dat, entries: list[dict], engine_dir: str | None):
    results, errors, seen = [], [], set()
    for i, entry in enumerate(entries, 1):
        try:
            res = plan_entry(dat, entry, engine_dir)
            key = res.target
            if key in seen:
                raise PatchError(f'同じレコードが複数のエントリで指定されています（{key}）')
            seen.add(key)
            results.append(res)
        except PatchError as e:
            name = next((entry[k] for k in ENTITY_KEYS if isinstance(entry, dict) and k in entry), '?')
            errors.append(f'#{i} {name}: {e}')
    return results, errors


def print_results(results: list[EntryResult], verbose: bool = False) -> None:
    for r in results:
        print(f'[{r.label}] {r.target}  → {r.status}')
        for s in r.added:
            print(f'    + {s}')
        if verbose:
            for s in r.skipped:
                print(f'    = {s}（登録済み）')
        elif r.skipped:
            print(f'    = 登録済み {len(r.skipped)}件')
        for s in r.conflicts:
            print(f'    ! {s}')
        for s in r.newlines:
            print(f'    * 新しい行（同じ条件の同種の能力が未登録）: {s}')
        if r.desc_change:
            print(f'    ~ 説明文: {r.desc_change[0]!r} → {r.desc_change[1]!r}')
        for s in r.warns:
            print(f'    ⚠ {s}')
    n_add = sum(len(r.added) for r in results)
    n_conf = sum(len(r.conflicts) for r in results)
    n_desc = sum(1 for r in results if r.desc_change)
    n_changed = sum(1 for r in results if r.changed)
    print(f'--- {len(results)}件中 {n_changed}件を変更（能力 +{n_add}、説明文 {n_desc}件）、'
          f'値の食い違い {n_conf}件、変更なし {sum(1 for r in results if not r.changed)}件 ---')


# ---------------------------------------------------------------------------
# コマンド
# ---------------------------------------------------------------------------
def cmd_inspect(args) -> int:
    dat = load_dat(args.engine_dir)
    if args.target.isdigit():
        if not args.kind:
            raise PatchError('ID で指定するときは --kind item|card も指定してください')
        recs = [dat.resolve_entity({f'{args.kind}_id': int(args.target)}, '対象')]
    else:
        recs = [r for k in ((args.kind,) if args.kind else ('item', 'card'))
                for r in dat.by_name[k].get(args.target, [])]
        if not recs:
            raise PatchError(f'「{args.target}」が見つかりません')
    paths = dat_paths(args.engine_dir)
    for rec in recs:
        print_record(dat, rec, os.path.relpath(paths[rec.kind], os.getcwd()))
        base_id = dat.signed(rec)
        for s in dat.sets:
            if s.base != base_id:
                continue
            srec = dat.rec_by_signed(s.rec_id)
            print(f'\n  == セット [{", ".join(dat.display(x) for x in s.partners)}] ==')
            if srec:
                print_record(dat, srec, os.path.relpath(paths[srec.kind], os.getcwd()), indent='  ')
        print_timeitems(dat, rec, [dat.rec_by_signed(s.rec_id) for s in dat.sets if s.base == base_id])
        names = dat.const_names(rec.kind, rec.id)
        for n, places in scan_const_usage(args.engine_dir, names).items():
            print(f'\n  ⚠ {n} は dat 以外のコードで使われています: ' + ', '.join(places[:5]))
    return 0


def print_record(dat: Dat, rec: Rec, path: str, indent: str = '') -> None:
    title = f'{rec.kind} {rec.id}' + (f' 「{rec.name}」' if rec.name else '') + f'  ({path}:{rec.lineno + 1})'
    print(f'{indent}{title}')
    print(f'{indent}  type: {rec.rtype}')
    print(f'{indent}  desc: {rec.desc!r}')
    if rec.problem:
        print(f'{indent}  ! 読めないレコード: {rec.problem}')
        return
    print(f'{indent}  capabilities:')
    for c in rec.caps:
        print(format_cap_yaml(c.code, c.value, dat.skills, indent + '    '))


def print_timeitems(dat: Dat, rec: Rec, set_recs: list) -> None:
    srcs = {(1 if rec.kind == 'item' else 2, rec.id)}
    srcs |= {(1 if r.kind == 'item' else 2, r.id) for r in set_recs if r}
    pat = re.compile(r'^\s*ITEM_SP_TIME_OBJ\[(\d+)\]\s*=\s*\[\d+,"([^"]*)","([^"]*)",(\[\[.*?\]\]),(.*)0\];')
    for ln in dat.timeitem_text.split('\n'):
        m = pat.match(ln)
        if m and any((int(a), int(b)) in srcs for a, b in re.findall(r'\[(\d+),(\d+)\]', m.group(4))):
            print(f'\n  時限効果 {m.group(1)}「{m.group(2)}」: {m.group(3)}')


def cmd_apply(args) -> int:
    dat = load_dat(args.engine_dir)
    entries = load_patch(args.yaml)
    results, errors = plan_all(dat, entries, args.engine_dir)
    print_results(results, args.verbose)
    if errors:
        print('\nエラー（何も書き込みません）:', file=sys.stderr)
        for e in errors:
            print('  ' + e, file=sys.stderr)
        return 2
    edits = defaultdict(list)
    for r in results:
        for e in r.edits:
            edits[e.kind].append(e)
    new_texts = {k: '\n'.join(apply_edits(dat.lines[k], edits[k])) if edits[k] else dat.texts[k]
                 for k in ('item', 'card')}
    # 書き込み前に、結果を読み直して全部入っていることを確かめる
    p = dat_paths(args.engine_dir)
    check = Dat(new_texts['item'], new_texts['card'], read_text(p['itemset']), read_text(p['skill']))
    again, again_errors = plan_all(check, entries, None)
    if again_errors or any(r.changed for r in again):
        print('\n追記後の再検証に失敗したため書き込みません:', file=sys.stderr)
        for e in again_errors:
            print('  ' + e, file=sys.stderr)
        for r in again:
            if r.changed:
                print(f'  {r.label}: まだ足りません {r.added} {r.desc_change}', file=sys.stderr)
        return 3
    if args.report:
        write_report(args.report, results)
    if args.dry_run:
        print('\n(--dry-run: 書き込みなし)')
        return 0
    for kind in ('item', 'card'):
        if edits[kind]:
            with open(p[kind], 'w', encoding='utf-8', newline='') as f:
                f.write(new_texts[kind])
            print(f'書き込み: {os.path.relpath(p[kind], os.getcwd())}（{len(edits[kind])}箇所）')
    return 0


def cmd_verify(args) -> int:
    dat = load_dat(args.engine_dir)
    results, errors = plan_all(dat, load_patch(args.yaml), None)
    bad = [r for r in results if r.changed]
    for r in bad:
        print(f'[未反映] {r.label}: 足りない能力 {r.added} 説明文 {r.desc_change}')
    for r in results:
        for c in r.conflicts:
            print(f'[値の食い違い] {r.label}: {c}')
    for e in errors:
        print(f'[エラー] {e}')
    ok = not bad and not errors
    print(f'--- verify: {len(results)}件中 未反映 {len(bad)}件、エラー {len(errors)}件 ---')
    return 0 if ok else 1


def write_report(path: str, results: list[EntryResult]) -> None:
    with open(path, 'w', encoding='utf-8') as f:
        f.write('| 対象 | 状態 | 追加 | 登録済み | 備考 |\n|---|---|---|---|---|\n')
        for r in results:
            notes = [*(f'食い違い: {c}' for c in r.conflicts), *r.warns]
            if r.desc_change:
                notes.append('説明文を更新')
            f.write(f'| {r.label} | {r.status} | {len(r.added)} | {len(r.skipped)} | {" / ".join(notes)} |\n')


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description='既存レコードへ能力を追記する')
    p.add_argument('--engine-dir', default=ENGINE_DIR, help='engine ディレクトリ')
    sub = p.add_subparsers(dest='cmd', required=True)
    pi = sub.add_parser('inspect', help='レコードを YAML 書式で表示する')
    pi.add_argument('target', help='名前、または ID（--kind 必須）')
    pi.add_argument('--kind', choices=['item', 'card'])
    for name, helptext in (('apply', '能力追加.yaml の内容を追記する'), ('verify', '宣言した能力が全部入っているか確認する')):
        sp = sub.add_parser(name, help=helptext)
        sp.add_argument('--yaml', default=PATCH_YAML)
        if name == 'apply':
            sp.add_argument('--dry-run', action='store_true')
            sp.add_argument('--report', help='結果の表（markdown）の出力先')
            sp.add_argument('-v', '--verbose', action='store_true', help='登録済みの能力も1件ずつ表示する')
    return p


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    try:
        return {'inspect': cmd_inspect, 'apply': cmd_apply, 'verify': cmd_verify}[args.cmd](args)
    except PatchError as e:
        print(f'エラー: {e}', file=sys.stderr)
        return 2


if __name__ == '__main__':
    raise SystemExit(main())
