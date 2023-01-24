import Component from "./Component.js";

export default class Items extends Component {
    initialize() {
        this.state = {items: ['item1', 'item2']};
    }

    template() {
        const {items} = this.state;
        return `
            <ul>
                ${items.map(item => `<li>${item}</li>`).join('')}
            </ul>
            <button>add</button>
        `;
    }

    setEvent() {
        this.$target.querySelector('button').addEventListener('click', () => {
            const {items} = this.state;
            this.setState({items: [...items, `item${items.length + 1}`]});
        });
    }
}
