export default class Shape {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }
}