import Items from './Item.js';
class App {
    constructor() {
        const $app = document.querySelector('#app');
        new Items($app);
    }
}

new App();