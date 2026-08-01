/**
 * dump / verify 実行時に https スタブローダーを登録する。
 * 使い方: node --import ./util/enum/register-loader.mjs util/enum/dump-enum-values.mjs
 */
import { register } from 'node:module';
register('./https-stub-loader.mjs', import.meta.url);
