const path = require('path');

module.exports = {
    mode: 'production',
    entry: './bootstrap.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                // 拡張子 .ts の場合
                test: /\.ts$/,
                // TypeScript をコンパイルする
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        // 拡張子を配列で指定
        extensions: [
            '.ts',
            '.js',
        ],
    },
    optimization: {
        minimize: true,
    },
};