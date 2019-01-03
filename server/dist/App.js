"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sio = require("socket.io");
class App {
    constructor() {
        this.socket = sio.listen(3000);
        console.log(`SocketIO listening on ${this.socket.path()}`);
        this.socket.on('connection', client => {
            console.log("new client");
        });
    }
}
exports.default = new App();
//# sourceMappingURL=App.js.map