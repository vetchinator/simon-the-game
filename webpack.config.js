const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    esModule: false,
                    outputPath: 'audio',
                }
            },
            {
                test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                use: [ { loader: 'url-loader' } ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: './src/public/index.html',
        }),
        new VueLoaderPlugin(),
        new CopyPlugin ({
            patterns: [
                {
                from: 'src/public/img/*.png',
                to: '[path][name].[ext]'
                },
                {
                    from: 'src/public/sounds/*.mp3',
                    to: '[path][name].[ext]'
                },
            ]
        })
    ],

    devServer: {
        historyApiFallback: true
    }
}