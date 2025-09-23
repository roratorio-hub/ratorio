import { loadFileAsUint8Array, zstdDecompress } from "./funcZstd";
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
    slot: number | undefined; // スロット数
}

export class ItemData {
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
    getSlot(): number | undefined {
        return this.parameter.slot;
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
            } else {
                //名前の揺らぎ考慮
                if (displayName.match(/[\+\-]/) && item.displayname === displayName.replace(/\+/g, ' + ').replace(/\-/g, ' - ')) {
                    return new ItemData(item);
                }
            }
        }
        return undefined;
    }

    /* migId から Id を取得 */
    static findItemByMigIdFromItem(migId: number): ItemData | undefined {
        const itemObject = ItemObjNew[migId];
        if (!itemObject) return undefined;
        const displayName = itemObject[8] as string;
        return this.getByDisplayName(displayName);
    }

    /* migId から Id を取得 */
    static findItemByMigIdFromCardOrEnchant(migId: number, is_enchant: boolean = false): ItemData | undefined {
        const itemObject = CardObjNew[migId];
        if (!itemObject) {
            console.warn(`Item not found for migId: ${migId}`);
            return undefined;
        }
        let displayName = itemObject[2] as string;
        if (is_enchant === false && displayName.match(/カード/) === null) {
            displayName += 'カード';
        } else {
            displayName = displayName.replace(/^(Special)(.+)$/, '$1 $2'); //間にスペース
            displayName = displayName.replace(/^(Extra)(.+)$/, '$1 $2'); //間にスペース
        }
        return this.getByDisplayName(displayName);
    }

    /** アイテムデータをロード */
    static async load(): Promise<void> {
        const compressed = await loadFileAsUint8Array('../../dist/item.yaml.zst');
        const itemLines = await zstdDecompress(compressed) || "";
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
