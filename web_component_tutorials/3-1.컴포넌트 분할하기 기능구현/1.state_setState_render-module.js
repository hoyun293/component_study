import Items from './item.js';
class App {
    constructor() {
        const $app = document.querySelector('#app');
        new Items($app);
    }
}

new App();