import Engine from "../Engine";
import Shape from "./Shape";

export class Rectangle extends Shape {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}