// const contentScripts = require('./webpack/content-script');
// const popup = require('./webpack/popup');

const { resolve } = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // eslint-disable-line
const HtmlPlugin = require('html-webpack-plugin'); // eslint-disable-line
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // eslint-disable-line
const { VueLoaderPlugin } = require('vue-loader');
var webpack = require('webpack');
const pkg = require('../package.json');
const manifestTemplate = require('../templates/manifest.json');

module.exports = (env, argv) => {
    let entry = {};
    entry['content_scripts/main'] = `./src/content_scripts/main.js`;
    entry['popup/js/index'] = `./src/popup/main.js`;

    return {
        entry,

        output: {
            path: resolve(__dirname, '../dist'),
            filename: '[name].js',
            clean: true,
            publicPath: 'auto',
        },

        resolve: {
            extensions: ['.js', '.ts', '.vue', '.scss', '.css'],
            alias: {
                '@': resolve(__dirname, '../src'),
            },
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.ts$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'vue-style-loader!css-loader!sass-loader',
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                        },
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(png|jpg|svg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]?[hash]',
                    },
                },
            ],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: './templates/manifest.json',
                        to: 'manifest.json',
                        transform: () => {
                            manifestTemplate.version = pkg.version;

                            return Buffer.from(
                                JSON.stringify(manifestTemplate, null, 2)
                            );
                        },
                    },
                    {
                        from: './static',
                        to: 'static',
                    },
                ],
            }),
            new HtmlPlugin({
                template: resolve(__dirname, '../templates/popup.html'),
                filename: 'popup/index.html',
                chunks: ['popup/js/index'],
            }),
            new VueLoaderPlugin(),

            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),
        ],
    };
};
