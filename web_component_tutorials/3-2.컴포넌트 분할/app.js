import Component from "./component.js";
import Items from './item.js';
import ItemAppender from './itemappender.js';
import ItemFilter from './itemFilter.js';


export default class App extends Component {
    get filteredItems() {
        const {isFilter, items} = this.state;
        return items.filter(({active}) => (isFilter === 1 && active) ||
            (isFilter === 2 && !active) ||
            (isFilter === 0));
    }

    initialize() {
        this.state = {
            isFilter: 0,
            items: [
                {
                    seq: 1,
                    contents: 'item1',
                    active: false,
                },
                {
                    seq: 2,
                    contents: 'item2',
                    active: true
                }
            ]
        };
    }

    template() {
        return `
            <header data-component="item-appender"></header>
            <main data-component="items"></main>
            <footer data-component="item-filter"></footer>
        `;
    }

    mounted() {

        const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
        const $items = this.$target.querySelector('[data-component="items"]');
        const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

        new ItemAppender($itemAppender, {
            addItem: this.addItem.bind(this)
        });

        new Items($items, {
            filteredItems: this.filteredItems,
            deleteItem: this.deleteItem.bind(this),
            toggleItem: this.toggleItem.bind(this)
        });

        new ItemFilter($itemFilter, {
            filterItem: this.filterItem.bind(this)
        });
    }



    addItem(contents) {
        const {items} = this.state;
        const seq = Math.max(...items.map(e => e.seq)) + 1;
        const active = false;
        this.setState({
            items: [
                ...items,
                {seq, contents, active}
            ]
        });
    }

    deleteItem(seq) {
        const items = [...this.state.items];
        items.splice(items.findIndex(e => e.seq === seq), 1);
        this.setState({items});
    }

    toggleItem(seq) {
        const items = [...this.state.items];
        const index = items.findIndex(e => e.seq === seq);
        items[index].active = !items[index].active;
        this.setState({items});
    }

    filterItem(isFilter) {
        this.setState({isFilter});
    }
}