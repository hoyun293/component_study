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
}