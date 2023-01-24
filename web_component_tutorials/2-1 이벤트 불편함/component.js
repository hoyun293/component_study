export default class Component {
    constructor($target) {
        this.$target = $target;
        this.state = null;
        this.initialize();
        this.render();
    }

    render() {
        this.$target.innerHTML = this.template();
        this.setEvent();
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.render();
    }
}