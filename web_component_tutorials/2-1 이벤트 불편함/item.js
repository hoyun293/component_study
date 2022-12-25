import Component from "./Component.js";

export default class Items extends Component {
    initialize() {
        this.state = {items: ['item1', 'item2'], count: 2};
    }

    template() {
        const {items} = this.state;
        return `
            <ul>
                ${items.map((item, key) =>
            `<li>
                    ${item}
                    <button class="deleteBtn" data-index="${key}">삭제</button>
                </li>`).join('')}
            </ul>
            <button class="addBtn">add</button>
        `;
    }

    setEvent() {
        this.$target.querySelector('.addBtn').addEventListener('click', () => {
            const {items, count} = this.state;
            this.setState({items: [...items, `item${count + 1}`], count: count + 1});
        });

        this.$target.querySelectorAll('.deleteBtn').forEach(deleteBtn =>
            deleteBtn.addEventListener('click', ({target}) => {
                const items = [...this.state.items];
                items.splice(target.dataset.index, 1);
                this.setState({items: items, count: this.state.count - 1});
            }));
    }
}
