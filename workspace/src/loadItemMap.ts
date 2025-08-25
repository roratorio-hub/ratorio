import { loadFileAsUint8Array, zstdDecompress } from "./funcZstdLoad";
import { load as loadYAML } from "js-yaml"

// ItemMapの型定義
interface ItemDataParameter {
    id: number; // アイテムID
    displayname: string; // アイテムの表示名
    description: string; // アイテムの説明
    is_card: boolean; // カードアイテムかどうか
    is_enchant: boolean; // エンチャント可能かどうか
    resname: string; // リソース名
    type: string | null; // アイテムタイプ
}

class ItemData {
    parameter: ItemDataParameter;

    constructor(parameter: ItemDataParameter) {
        this.parameter = parameter;
    }
    getId(): number {
        return this.parameter.id;
    }
    getDisplayName(): string {
        return this.parameter.displayname;
    }
    getDescription(): string {
        return this.parameter.description;
    }
    isCard(): boolean {
        return this.parameter.is_card;
    }
    isEnchant(): boolean {
        return this.parameter.is_enchant;
    }
    getResName(): string {
        return this.parameter.resname;
    }
    getType(): string | null {
        return this.parameter.type;
    }
}

export class ItemMap {
    private static itemMap: Record<number, ItemDataParameter> = {};

    /** 全てのアイテムを取得 */
    static getAll(): [number, ItemDataParameter][] {
        return Object.entries(this.itemMap).map(
            ([key, value]) => [Number(key), value] as [number, ItemDataParameter]
        );
    }

    /** id から Item を取得 */
    static getById(id: number): ItemData | undefined {
        const itemParam = this.itemMap[id];
        return itemParam !== undefined ? new ItemData(itemParam) : undefined;
    }

    /** displayname から Item を取得 */
    static getByDisplayName(displayName: string): ItemData | undefined {
        for (const item of Object.values(this.itemMap)) {
            if (item.displayname === displayName) {
                return new ItemData(item);
            }
        }
        return undefined;
    }

    /** アイテムデータをロード */
    static async load(): Promise<void> {
        let compressed = await loadFileAsUint8Array('../../dist/item.yaml.zst');
        let decompressed = await zstdDecompress(compressed);
        let itemLines = new TextDecoder('utf-8').decode(decompressed);
        try {
            // YAMLとしてロード
            this.itemMap = loadYAML(itemLines) as Record<number, ItemDataParameter>;
        } catch (err) {
            console.error('YAML load error:', err);
        }
    }

    /** ロード完了か確認 **/
    static async isLoaded(): Promise<boolean> {
        return Object.keys(this.itemMap).length > 0;
    }
}

(window as any).ItemMap = ItemMap; // グローバルに登録
