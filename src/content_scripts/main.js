console.log('content-scripts are called! ^^');

let element = document.querySelector('body');
element.insertAdjacentHTML('afterend', '<div id="opr-tools-ext"></div>');

import { createApp } from 'vue'; // <-- don't forget to import h
import App from './App';

createApp(App).mount('#opr-tools-ext');
