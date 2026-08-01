/**
 * 列挙型コンテナを生成する（依存ゼロの葉モジュール）.
 *
 * 旧 CGlobalConstManager.DefineEnum は
 *   Function(name + " = " + value + ";")()
 * でグローバルへ定数を生やしつつ、列挙マネージャ（EnumXxx）も同時にグローバル化していた。
 * 定数側は const/EnumXxx.js の `export const` へ移したため、ここではマネージャ側だけを再現する。
 *
 * 実装しているのは **実際に使われている 4 つ** だけ:
 *   Count / For / GetDefinedName / GetDefinedValue
 * 旧実装の挙動（緩い比較 `==`、見つからない場合の "" と undefined）をそのまま保つ。
 *
 * members / pseudo は定数名をキーにしたオブジェクト。旧 enumArray / pseudoArray に対応する。
 * 呼び出し側は宣言済みの const をショートハンドで渡すこと:
 *
 *   export const ELM_ID_WATER = 1;
 *   export const EnumElmId = createEnum('EnumElmId', { ELM_ID_WATER }, { ELM_ID_COUNT });
 *
 * こう書くと名前も値も一度しか書かないので、定数宣言との食い違いが起こり得ない。
 * 綴りを誤れば未定義識別子として即 ReferenceError になり、
 * 値の取り違えがサイレントなデータ破壊に化けることを防げる。
 *
 * 列挙の順序は Object.entries の挿入順（= 記述順）で決まる。For の idx と
 * GetDefinedName の先勝ちがこの順序に依存するため、並べ替えは挙動を変える。
 */
export function createEnum(enumName, members, pseudo = {}) {
    const memberEntries = Object.entries(members);
    const pseudoEntries = Object.entries(pseudo);

    const container = {
        /** 列挙名（旧 managementMap のキー） */
        enumName,

        /** 列挙定数の件数（旧: enumArray.length を返す getter） */
        get Count() {
            return memberEntries.length;
        },

        /** 疑似定数の件数 */
        get PseudoCount() {
            return pseudoEntries.length;
        },

        /**
         * 列挙定数をループ処理する.
         * @param {(idx: number, name: string, value: number|bigint) => void} funcProc
         * @param {string[]} [skipNameArray] 処理を飛ばす定義名の配列
         */
        For(funcProc, skipNameArray) {
            for (let idx = 0; idx < memberEntries.length; idx++) {
                const [name, value] = memberEntries[idx];
                if (skipNameArray != undefined && skipNameArray.indexOf(name) >= 0) continue;
                funcProc(idx, name, value);
            }
        },

        /**
         * 疑似定数をループ処理する.
         * @param {(idx: number, name: string, value: number|bigint) => void} funcProc
         * @param {string[]} [skipNameArray]
         */
        PseudoFor(funcProc, skipNameArray) {
            for (let idx = 0; idx < pseudoEntries.length; idx++) {
                const [name, value] = pseudoEntries[idx];
                if (skipNameArray != undefined && skipNameArray.indexOf(name) >= 0) continue;
                funcProc(idx, name, value);
            }
        },

        /**
         * 値から定数名を引く.
         * @return 定数名。該当なしは空文字列（旧実装と同じ）
         */
        GetDefinedName(value) {
            // 旧実装は `==` の緩い比較。BigInt と Number の比較が成立していたため踏襲する。
            for (const [name, v] of memberEntries) if (v == value) return name;
            return '';
        },

        /**
         * 値から疑似定数名を引く.
         * @return 定数名。該当なしは空文字列
         */
        GetDefinedPseudoName(value) {
            for (const [name, v] of pseudoEntries) if (v == value) return name;
            return '';
        },

        /**
         * 定数名から値を引く.
         * @return 定数値。該当なしは undefined（旧実装と同じ）
         */
        GetDefinedValue(name) {
            for (const [n, v] of memberEntries) if (n == name) return v;
            return undefined;
        },

        /**
         * 定数名から疑似定数値を引く.
         * @return 定数値。該当なしは undefined
         */
        GetDefinedPseudoValue(name) {
            for (const [n, v] of pseudoEntries) if (n == name) return v;
            return undefined;
        },
    };

    return Object.freeze(container);
}
