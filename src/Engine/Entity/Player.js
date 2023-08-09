import Entity from "./Entity";

export default class Player extends Entity {
    constructor(id, x, y, width, height, sprite) {
        super(x, y, width, height, sprite);
        this.id = id;
    }
}