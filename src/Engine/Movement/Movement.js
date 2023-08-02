export class Movement {
    constructor() {
        if (Movement._instance)
            return Movement._instance;

        this.events = {};

        Movement._instance = this;
    }

    static get instance() {
        return Movement._instance || new Movement();
    }

    on(event, callback) {
        this.events[event] = callback;
        window.addEventListener(event, this.events[event]);
    }

    off(event) {
        delete this.events[event];
        window.removeEventListener(event);
    }
}