import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import * as ItemDat from '@engine/equip/item.dat.js';
import * as CardDat from '@engine/equip/card.dat.js';
import { w_SE } from '@engine/equip/itemset.dat.js';
import { ITEM_SP_TIME_OBJ } from '@engine/equip/timeitem.dat.js';
import { ITEM_DATA_INDEX_SPBEGIN } from '@engine/const/EnumItemDataIndex.js';
import { CARD_DATA_INDEX_SPBEGIN } from '@engine/const/EnumCardDataIndex.js';

type Kind = 'item' | 'card';

const ITEM_SP_INVALIDATE_ITEM_SP = 218;
const ITEM_SP_INVALIDATE_CARD_SP = 219;

/** 統合の対象にする効果レコードの最小ID。util/item-card-enchant/set_effect_merge.py の MERGE_FROM_EFFECT_ID と同じ値を使う. */
function mergeFromEffectId(): Record<Kind, number> {
    const source = readFileSync(join(__dirname, '../../util/item-card-enchant/set_effect_merge.py'), 'utf-8');
    const match = /MERGE_FROM_EFFECT_ID = \{KIND_ITEM: (\d+), KIND_CARD: (\d+)\}/.exec(source);
    expect(match, 'set_effect_merge.py の MERGE_FROM_EFFECT_ID を読み取れる').not.toBeNull();
    return { item: Number(match![1]), card: Number(match![2]) };
}

/** 意図的に個別の効果レコードにしているもの（'item:123' / 'card:123'）。人間が判断して追加する. */
const INTENTIONALLY_SEPARATE = new Set<string>([]);

/** 対象の効果レコードのうち、中身が同一のものをグループにして返す（2件以上のグループだけ）. */
function findDuplicateEffects(args: {
    payloads: Map<string, string>;           // 'item:123' → 中身
    used: Set<string>;                       // w_SE から参照されている効果
    protectedKeys: Set<string>;              // 統合してはいけない効果
    from: Record<Kind, number>;
}): string[][] {
    const groups = new Map<string, string[]>();
    for (const key of args.used) {
        const [kind, id] = key.split(':') as [Kind, string];
        if (Number(id) < args.from[kind] || args.protectedKeys.has(key) || INTENTIONALLY_SEPARATE.has(key)) {
            continue;
        }
        const payload = args.payloads.get(key);
        if (payload === undefined) {
            continue;
        }
        const groupKey = `${kind}|${payload}`;
        groups.set(groupKey, (groups.get(groupKey) ?? []).concat(key));
    }
    return [...groups.values()].filter((ids) => ids.length > 1);
}

const rowPayload = (row: any[]) => row.slice(1).map((v) => String(v)).join(',');

function collectPayloads(): Map<string, string> {
    const payloads = new Map<string, string>();
    (ItemDat.ItemObjNew as any[]).forEach((row) => row?.[1] === 100 && payloads.set(`item:${row[0]}`, rowPayload(row)));
    (CardDat.CardObjNew as any[]).forEach((row) => row?.[1] === 100 && payloads.set(`card:${row[0]}`, rowPayload(row)));
    return payloads;
}

function collectUsed(): Set<string> {
    const used = new Set<string>();
    (w_SE as any[]).forEach((row) => {
        if (row && row.length > 1) {
            used.add(`${row[0] > 0 ? 'item' : 'card'}:${Math.abs(row[0])}`);
        }
    });
    return used;
}

function collectProtected(payloads: Map<string, string>): Set<string> {
    const keys = new Set<string>();
    // 時限効果の元データ（[[1, アイテム側の効果ID], [2, カード側の効果ID]]）
    (ITEM_SP_TIME_OBJ as any[]).forEach((row) => {
        for (const [srcKind, srcId] of row?.[3] ?? []) {
            keys.add(`${srcKind === 1 ? 'item' : 'card'}:${srcId}`);
        }
    });
    // 「効果が発動しない」系の能力の対象
    const scan = (rows: any[], spBegin: number) => rows.forEach((row) => {
        if (!row) return;
        for (let i = spBegin; row[i] !== undefined && row[i] !== 0; i += 2) {
            const code = Number(BigInt(row[i]) % 100000n);
            if (code === ITEM_SP_INVALIDATE_ITEM_SP) keys.add(`item:${row[i + 1]}`);
            if (code === ITEM_SP_INVALIDATE_CARD_SP) keys.add(`card:${row[i + 1]}`);
        }
    });
    scan(ItemDat.ItemObjNew as any[], ITEM_DATA_INDEX_SPBEGIN);
    scan(CardDat.CardObjNew as any[], CARD_DATA_INDEX_SPBEGIN);
    // 名前付き定数（ITEM_SET_ID_* など）が指している効果
    for (const [kind, mod] of [['item', ItemDat], ['card', CardDat]] as const) {
        for (const value of Object.values(mod)) {
            if (typeof value === 'number' && payloads.has(`${kind}:${value}`)) keys.add(`${kind}:${value}`);
        }
    }
    return keys;
}

describe('findDuplicateEffects（検出ロジック）', () => {
    const base = {
        payloads: new Map([['item:10', 'A'], ['item:11', 'A'], ['item:12', 'A'], ['item:13', 'B'], ['item:5', 'A'], ['item:6', 'A'], ['card:10', 'A']]),
        used: new Set(['item:10', 'item:11', 'item:12', 'item:13', 'item:5', 'item:6', 'card:10']),
        protectedKeys: new Set<string>(),
        from: { item: 10, card: 10 } as Record<Kind, number>,
    };

    it('下限以上で中身が同一の効果レコードをグループにする（種別が違えば別）', () => {
        expect(findDuplicateEffects(base)).toEqual([['item:10', 'item:11', 'item:12']]);
    });

    it('下限未満の重複（既存）は検出しない', () => {
        expect(findDuplicateEffects(base).flat()).not.toContain('item:5');
    });

    it('保護された効果レコードと、w_SE から参照されていない効果レコードは除く', () => {
        const result = findDuplicateEffects({ ...base, protectedKeys: new Set(['item:12']), used: new Set([...base.used].filter((k) => k !== 'item:11')) });
        expect(result).toEqual([]);
    });
});

describe('セット効果レコードの重複', () => {
    it('本セッション以降に追加した効果レコードに、同一内容のものが複数ない（あれば set_effect_merge.py の生成時再利用の漏れ）', () => {
        const payloads = collectPayloads();
        const duplicates = findDuplicateEffects({
            payloads,
            used: collectUsed(),
            protectedKeys: collectProtected(payloads),
            from: mergeFromEffectId(),
        });
        expect(duplicates).toEqual([]);
    });
});
