"use strict";

let Game = require("../shared/Game");
let Client = require("./Client");
let socketio = require("socket.io");
let ByteBuffer = require("../shared/ByteBuffer");

class GameServer extends Game
{
    constructor(server)
    {
        super();
        this.io = socketio(6699);

        this.io.on("connection", (socket) => { this.clientConnected(socket); });

    }

    clientConnected(socket)
    {
        let client = new Client(socket);

        this._buffer = new ByteBuffer();
        this._buffer.WriteByte(253);
        this._buffer.WriteString("A new client connected");
        this.io.send(this._buffer.GetTrimmedBuffer());
    }
}

module.exports = GameServer;
