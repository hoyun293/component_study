class Component {
    constructor($target){
        this.$target = $target;
        this.state = null;
        this.initialize();
        this.render();
    }
    render(){
        this.$target.innerHTML = this.template();
        this.setEvent();
    }
    setState(newState){
        this.state = { ...this.state, ...newState };
        this.render();
    }
}

class App extends Component {
    initialize(){
        this.state = { items: ['item1', 'item2']};
    }

    template(){
        const { items } = this.state;
        return `
            <ul>
                ${items.map(item => `<li>~${item}~</li>`).join('')}
            </ul>
            <button>add</button>
        `;
    }

    setEvent(){
        this.$target.querySelector('button').addEventListener('click', () => {
            const { items } = this.state;
            this.setState({ items: [ ...items, `item${items.length + 1}`]});
        });
    }
}

new App(document.querySelector('#app'));