import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { parse as JSONCparser } from "jsonc-parser";

// ItemMapの型定義
export interface ItemData {
    id: number; // アイテムID
    displayname: string; // アイテムの表示名
    description: string; // アイテムの説明
    is_card: boolean; // カードアイテムかどうか
    is_enchant: boolean; // エンチャント可能かどうか
    resname: string; // リソース名
    type: string | null; // アイテムタイプ
}

export class ItemMap {
    private static itemMap: Record<number, ItemData> = {};

    /** 全てのアイテムを取得 */
    static getAll(): [number, ItemData][] {
        return Object.entries(this.itemMap).map(
            ([key, value]) => [Number(key), value] as [number, ItemData]
        );
    }

    /** id から Item を取得 */
    static getById(id: number): ItemData | undefined {
        return this.itemMap[id];
    }

    /** displayname から Item を取得 */
    static getByDisplayName(displayName: string): ItemData | undefined {
        for (const item of Object.values(this.itemMap)) {
            if (item.displayname === displayName) {
                return item;
            }
        }
        return undefined;
    }

    /** アイテムデータをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../ro4/m/json/item.jsonc.zst');
        let decompressed = await zstdDecompress(compressed);
        let itemLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            // JSONCとしてパース
            this.itemMap = JSONCparser(itemLines);
        } catch (err) {
            console.error('JSONC parse error:', err);
        }
    }
}

// 初期ロード
ItemMap.load();
