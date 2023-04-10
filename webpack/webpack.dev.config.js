/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const path = require('path');
const webpackConfiguration = require('./webpack.config');

module.exports = (env, argv) => {
    return merge(webpackConfiguration(env, argv), {
        mode: 'development',
        devtool: 'eval-source-map',
        devServer: {
            watchContentBase: true,
            publicPath: '/',
            open: true,
            compress: true,
            overlay: true,
            hot: false,
            liveReload: true,
        },
        plugins: [],
        target: ['web', 'es5'],
    });
};
