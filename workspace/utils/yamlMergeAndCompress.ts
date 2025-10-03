import { mergeItem } from "./itemUtil";
import { mergeJob } from "./jobUtil";
import { mergeSkill } from "./skillUtil";

/**
 * CLI:
 *   npx ts-node --project tsconfig.node.json utils/yamlMergeAndCompress.ts
 */
async function main(): Promise<void> {
    await mergeSkill();
    await mergeJob();
    await mergeItem();
}

main().catch((e) => {
    console.error(e);
    // @ts-ignore: suppress not found module
    process.exit(1);
});

// YAMLオプションを定義（Pythonの represent_str に相当）
export const yamlOptions = {
    styles: {
        '!!str': (str: string) => {
            if (str.includes('\n')) {
                return '|'; // 改行を含む文字列を | スタイルでダンプ
            }
            return null; // デフォルトスタイル
        }
    },
    replacer: (key: string, value: any) => {
        if (typeof value === 'string' && value.includes('\n')) {
            // 行末のスペースを削除（Pythonの re.sub(' +\n| +$', '\n', instance) に相当）
            return value.replace(/ +\n/g, '\n').replace(/ +$/g, '\n');
        }
        return value;
    }
};
