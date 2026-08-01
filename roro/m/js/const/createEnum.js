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
 * members / pseudo は [name, value] の配列。旧 enumArray / pseudoArray に対応する。
 */
export function createEnum(enumName, members, pseudo = []) {
    const container = {
        /** 列挙名（旧 managementMap のキー） */
        enumName,

        /** 列挙定数の件数（旧: enumArray.length を返す getter） */
        get Count() {
            return members.length;
        },

        /** 疑似定数の件数 */
        get PseudoCount() {
            return pseudo.length;
        },

        /**
         * 列挙定数をループ処理する.
         * @param {(idx: number, name: string, value: number|bigint) => void} funcProc
         * @param {string[]} [skipNameArray] 処理を飛ばす定義名の配列
         */
        For(funcProc, skipNameArray) {
            for (let idx = 0; idx < members.length; idx++) {
                const [name, value] = members[idx];
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
            for (let idx = 0; idx < pseudo.length; idx++) {
                const [name, value] = pseudo[idx];
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
            for (const [name, v] of members) if (v == value) return name;
            return '';
        },

        /**
         * 値から疑似定数名を引く.
         * @return 定数名。該当なしは空文字列
         */
        GetDefinedPseudoName(value) {
            for (const [name, v] of pseudo) if (v == value) return name;
            return '';
        },

        /**
         * 定数名から値を引く.
         * @return 定数値。該当なしは undefined（旧実装と同じ）
         */
        GetDefinedValue(name) {
            for (const [n, v] of members) if (n == name) return v;
            return undefined;
        },

        /**
         * 定数名から疑似定数値を引く.
         * @return 定数値。該当なしは undefined
         */
        GetDefinedPseudoValue(name) {
            for (const [n, v] of pseudo) if (n == name) return v;
            return undefined;
        },
    };

    return Object.freeze(container);
}
