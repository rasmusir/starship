"use strict";

let Game = require("../shared/Game");
let Client = require("./Client");
let socketio = require("socket.io");
let ServerRegion = require("./ServerRegion");
let Ship = require("../shared/Objects/Ship");

class GameServer extends Game
{
    constructor(server)
    {
        super();

        this._clients = [];

        this.io = socketio(6699);
        this.io.on("connection", (socket) => { this.clientConnected(socket); });

        this._regions = [];
        this._regions.push(new ServerRegion(57));

        this._regions[0].Add(new Ship());
        let s = new Ship();
        s.Position.X = 1;
        this._regions[0].Add(s);
    }

    clientConnected(socket)
    {
        let client = new Client(socket, this._clients.length);
        this._clients.push(client);

        client.MoveTo(this._regions[0]);
    }
}

module.exports = GameServer;
