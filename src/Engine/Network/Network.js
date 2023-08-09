import Engine from "../Engine";
import Player from "../Entity/Player";

export class Network {
    constructor(url) {
        this.url = url;
        this.ws = new WebSocket(`ws://${url}`);
        this.ws.onmessage = (message) => {
            let data = JSON.parse(message.data);
            let dData;
            if (data.data)
                dData = data.data;

            switch (data.type) {
                case "message":
                    console.log(`[MESSAGE] ${data.data}`);
                    break;

                case "setID":
                    Engine.instance.playerID = dData.id;
                    console.log(`Set Player ID to ${dData.id}`);
                    break;

                case "createEntity":
                    let createdEntity = new Player(dData.id, dData.x, dData.y, 25, 25, "rectangle");
                    Engine.instance.addObject(createdEntity);
                    console.log(`[SERVER] User ${dData.id} connected.`);
                    break;

                case "updatePos":
                    let target = Engine.instance.objs.find(i => i.id == dData.id);
                    target.x = dData.pos.x;
                    target.y = dData.pos.y;
                    break;

                case "deleteEntity":
                    let target2 = Engine.instance.objs.find(i => i.id == dData.id);
                    Engine.instance.objs.splice(Engine.instance.objs.indexOf(target2), 1);
                    console.log(`[SERVER] User ${dData.id} disconnected.`);
                    break;

                default:
                    console.log("Unknown Message Type: ", data);
                    break;
            }
        }
    }
}