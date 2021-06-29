const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;

AFRAME.registerSystem('state-devtools', {
    init: function() {
        if (!reduxDevTools) {
            console.warn('aframe-state-component-devtools: Redux DevTools not found. Is the extension active?')
            return;
        }

        this.onRenderStart = this.onRenderStart.bind(this);
        this.updateState = this.updateState.bind(this);

        const { el } = this;
        if (el.renderStarted) {
            this.onRenderStart();
        } else {
            el.addEventListener("renderstart", this.onRenderStart);
        }
    },

    onRenderStart: function() {
        const { el } = this;

        el.removeEventListener("renderstart", this.onRenderStart);
        el.addEventListener("stateupdate", e => this.updateState(e.detail.action));

        this.updateState('init');
    },

    updateState: function(event) {
        reduxDevTools.send(event, this.el.systems.state.state);
    }
});
