import { Rectangle } from "../Shapes/Rectangle";

export default class Entity {
    constructor(x, y, width, height, sprite) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        if (typeof sprite == Object)
            this.sprite = sprite;
        else {
            if (sprite == "rectangle")
                this.sprite = new Rectangle(x, y, width, height, "white");
        }

        this.movements = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        this.speed = 5;
    }

    setColor(color){
        this.color = color;
        this.sprite.color = color;
    }

    move() {
        if (this.movements.up)
            this.y -= this.speed;

        if (this.movements.down)
            this.y += this.speed;

        if (this.movements.left)
            this.x -= this.speed;

        if (this.movements.right)
            this.x += this.speed;

        this.sprite.setPos(this.x, this.y);
    }

    moveUp() {
        this.movements.up = true;
    }

    moveDown() {
        this.movements.down = true;
    }

    moveLeft() {
        this.movements.left = true;
    }

    moveRight() {
        this.movements.right = true;
    }

    stopUp() {
        this.movements.up = false;
    }

    stopDown() {
        this.movements.down = false;
    }

    stopLeft() {
        this.movements.left = false;
    }

    stopRight() {
        this.movements.right = false;
    }

    draw(ctx) {
        this.sprite.draw(ctx);
    }
}