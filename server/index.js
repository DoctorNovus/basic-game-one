import express from "express";
import path from "path";
import { NetworkGame } from "./NetworkGame/NetworkGame";
import { WebSocketServer } from "ws";
import { Movement } from "./Movement/Movement";

const app = express();
const port = 3000;


app.use(express.static(path.resolve("public")));
app.use(express.static(path.resolve("build")));

const serve = app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
})

const network = new NetworkGame();
const movement = new Movement();

const wss = new WebSocketServer({ server: serve });
wss.on("listening", () => {
    console.log(`WebSocketServer Online.`);
});



wss.on("connection", (ws) => {
    let id = network.generateID(20);
    let data = { id, speed: 5 };

    network.clients.set(ws, data);
    network.send(ws, {
        type: "setID",
        data: {
            id
        }
    });

    console.log(`User Connected: ${id}`);
    network.send(ws, { type: "message", data: `Welcome to the game, User ${id} ` })

    let us = { id, x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100) };
    network.clients.set(ws, us);

    network.sendAll({ type: "createEntity", data: us });

    network.clients.forEach((client, key) => {
        if (key != ws)
            network.send(ws, {
                type: "createEntity",
                data: {
                    id: client.id,
                    x: client.x || 0,
                    y: client.y || 0
                }
            });
    });

    ws.on("message", (message) => {
        let data = JSON.parse(message);
        let dData = data.data;
        let client = network.clients.get(ws);

        switch (data.type) {
            case "playerUp":
                client.playerUp = dData.toggle;
                network.clients.set(ws, client);
                break;

            case "playerLeft":
                client.playerLeft = dData.toggle;
                network.clients.set(ws, client);
                break;

            case "playerDown":
                client.playerDown = dData.toggle;
                network.clients.set(ws, client);
                break;

            case "playerRight":
                client.playerRight = dData.toggle;
                network.clients.set(ws, client);
                break;

            default:
                console.log(`Unknown Data Type: "${data.type}" with data: `, dData);
        }
    });

    ws.on("close", () => {
        let cl = network.clients.get(ws);
        network.sendAll({
            type: "deleteEntity",
            data: {
                id: cl.id
            }
        });

        network.clients.delete(ws);
    });
});

movement.setGameLoop(() => {
    network.clients.forEach((client, key) => {
        if (client.playerUp) {
            client.y -= (client.speed || 5);
            network.sendAll({
                type: "updatePos",
                data: {
                    id: client.id,
                    pos: {
                        x: client.x,
                        y: client.y
                    }
                }
            });
        }

        if (client.playerDown) {
            client.y += (client.speed || 5);
            network.sendAll({
                type: "updatePos",
                data: {
                    id: client.id,
                    pos: {
                        x: client.x,
                        y: client.y
                    }
                }
            });
        }

        if (client.playerLeft) {
            client.x -= (client.speed || 5);
            network.sendAll({
                type: "updatePos",
                data: {
                    id: client.id,
                    pos: {
                        x: client.x,
                        y: client.y
                    }
                }
            });
        }

        if (client.playerRight) {
            client.x += (client.speed || 5);
            network.sendAll({
                type: "updatePos",
                data: {
                    id: client.id,
                    pos: {
                        x: client.x,
                        y: client.y
                    }
                }
            });
        }
    });
});