const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpackConfiguration = require('./webpack.config');
const webpack = require('webpack');

module.exports = (env, argv) => {
    return merge(webpackConfiguration(env, argv), {
        mode: 'production',
        devtool: false,
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        format: {
                            comments: false,
                        },
                        compress: {
                            drop_console: true,
                        },
                    },
                    extractComments: false,
                }),
                new CssMinimizerPlugin(),
            ],
            splitChunks: {
                chunks: 'async',
            },
        },
        plugins: [],
        target: ['web', 'es5'],
    });
};
