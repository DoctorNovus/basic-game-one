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

// engine.addObject(player);
// engine.addObject(rect1);

Movement.instance.on("keydown", (e) => {
    switch (e.key) {
        case "w":
            Engine.instance.send({
                type: "playerUp", data: {
                    toggle: true
                }
            });
            break;

        case "a":
            Engine.instance.send({
                type: "playerLeft", data: {
                    toggle: true
                }
            });
            break;

        case "s":
            Engine.instance.send({
                type: "playerDown", data: {
                    toggle: true
                }
            });
            break;

        case "d":
            Engine.instance.send({
                type: "playerRight", data: {
                    toggle: true
                }
            });
            break;
    }
});

Movement.instance.on("keyup", (e) => {
    switch (e.key) {
        case "w":
            Engine.instance.send({
                type: "playerUp", data: {
                    toggle: false
                }
            });
            break;

        case "a":
            Engine.instance.send({
                type: "playerLeft", data: {
                    toggle: false
                }
            });
            break;

        case "s":
            Engine.instance.send({
                type: "playerDown", data: {
                    toggle: false
                }
            });
            break;

        case "d":
            Engine.instance.send({
                type: "playerRight", data: {
                    toggle: false
                }
            });
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
