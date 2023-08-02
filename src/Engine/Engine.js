import { Rectangle } from "./Shapes/Rectangle";
import { Movement } from "./Movement/Movement";

class Engine {
    constructor() {
        if (Engine._instance)
            return Engine._instance;

        this.objs = [];
        this._gameLoop = null;

        this._movementEngine = new Movement();

        Engine._instance = this;
    }

    setDisplay(width, height, scale = 1) {
        this.displayWidth = width;
        this.displayHeight = height;
        this.scale = scale;
    }

    get viewPos(){
        return {
            w: window.innerWidth / this.displayWidth,
            h: window.innerHeight / this.displayHeight
        }
    }

    static get instance() {
        return Engine._instance || new Engine();
    }

    handleMovement() {
        this._movementEngine.applyObjects(this.objs);
    }

    setGameLoop(callback) {
        this._gameLoop = callback;
    }

    applyGameLoop() {
        if (this._gameLoop)
            this._gameLoop();

        requestAnimationFrame(Engine.instance.applyGameLoop.bind(Engine.instance));
    }

    addObject(object) {
        this.objs.push(object);
    }

    clear() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }

    move() {
        for (let obj of this.objs) {
            obj.move();
        }
    }

    draw() {
        for (let obj of this.objs) {
            obj.draw(this.ctx);
        }
    }

    applyDisplay(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
    }

    resizeDisplay(canvas) {
        let s1 = window.innerWidth;
        let s2 = window.innerHeight;

        canvas.style.width = `${s1}px`;
        canvas.style.height = `${s2}px`;

        canvas.width = s1;
        canvas.height = s2;
    }
}

Engine = Object.assign(Engine, {
    Shapes: {
        Rectangle: Rectangle
    }
});

export default Engine;