const contentScripts = require('./webpack/content-script');
const popup = require('./webpack/popup');

module.exports = [contentScripts, popup];
