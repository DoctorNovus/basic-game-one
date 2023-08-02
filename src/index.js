import Engine from "./Engine/Engine";
import Entity from "./Engine/Entity/Entity";
import Player from "./Engine/Entity/Player";
import { Movement } from "./Engine/Movement/Movement";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let engine = Engine.instance;
engine.setDisplay(1920, 1080, 4);

engine.applyDisplay(canvas, ctx);
engine.resizeDisplay(canvas);

let player = new Player(10, 10, 25, 25, "rectangle");
let rect1 = new Entity(10, 10, 25, 25, "rectangle");
rect1.setColor("red");

engine.addObject(player);
engine.addObject(rect1);

Movement.instance.on("keydown", (e) => {
    switch (e.key) {
        case "w":
            player.moveUp();
            break;

        case "a":
            player.moveLeft();
            break;

        case "s":
            player.moveDown();
            break;

        case "d":
            player.moveRight();
            break;
    }
});

Movement.instance.on("keyup", (e) => {
    switch (e.key) {
        case "w":
            player.stopUp();
            break;

        case "a":
            player.stopLeft();
            break;

        case "s":
            player.stopDown();
            break;

        case "d":
            player.stopRight();
            break;
    }
});

engine.setGameLoop(() => {
    engine.clear();
    engine.move();
    engine.draw();
});

requestAnimationFrame(Engine.instance.applyGameLoop.bind(engine));

window.addEventListener("resize", () => {
    engine.resizeDisplay(canvas);
});

console.log(engine);