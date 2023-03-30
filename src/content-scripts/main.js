console.log('content-scripts are called! ^^');
// import { createApp } from 'vue';
// import App from './App.vue';
// // import { useProxy } from "./utils/proxy";

// (function (fn) {
//     var d = document;
//     d.readyState == 'loading'
//         ? d.addEventListener('DOMContentLoaded', fn)
//         : fn();
// })(function () {
//     const div = document.createElement('div');
//     div.setAttribute('id', 'shDataRoot');
//     document.querySelector('body').appendChild(div);
//     const shApp = createApp(App).mount(div);
// });

let element = document.querySelector('body');
element.insertAdjacentHTML('afterend', '<div id="opr-tools-ext"></div>');

import { createApp } from 'vue'; // <-- don't forget to import h
import App from './App';

createApp(App).mount('#opr-tools-ext');
