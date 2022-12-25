export default class Component {
    constructor($target) {
        this.$target = $target;
        this.state = null;
        this.initialize();
        this.render();
        this.setEvent();
    }

    render() {
        this.$target.innerHTML = this.template();
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.render();
    }

    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);

        this.$target.addEventListener(eventType, event => {
            if(!isTarget(event.target)) return false;
            callback(event);
        });
    }
}