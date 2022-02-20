const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(svg|png|gif|eot|woff|ttf)$/,
                type: "asset/inline",
                resourceQuery: /inline/,
                use: [
                    'url-loader'
                ]
            }
        ]
    }
}