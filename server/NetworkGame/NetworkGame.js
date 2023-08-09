export class NetworkGame {
    constructor() {
        this.clients = new Map();
    }

    generateID(length) {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.";

        let id = "";

        for (let i = 0; i < length; i++) {
            let random = (chars.split(""))[Math.floor(Math.random() * chars.length)];
            id += random;
        }

        return id;
    }

    send(ws, data) {
        ws.send(JSON.stringify(data));
    }

    sendAll(data) {
        this.clients.forEach((client, key) => {
            this.send(key, data);
        });
    }
}