"use strict";

let Game = require("../shared/Game");
let ServerClient = require("./ServerClient");
let socketio = require("socket.io");
let ServerRegion = require("./ServerRegion");
let Ship = require("../shared/Objects/Ship");
let Nanotimer = require("nanotimer");
/**
 * The game server.
 * @extends Game
 */
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

        let timer = new Nanotimer();
        timer.setInterval(() => { this.ServerTick(); }, "", "100m", function (err) {

        });

    }
    
    ServerTick(deltaTime)
    {
        this._regions.forEach( (region) => {
            region.Tick(deltaTime);
            region.ServerSend(this.io);
        });
    }
    /**
     * Called when a new socket has been opened.
     * @param  {Socket} socket The socket that connected
     */
    clientConnected(socket)
    {
        let client = new ServerClient(socket, this._clients.length);
        client.Handshake();
        this._clients.push(client);
        client.MoveTo(this._regions[0]);
        let s = new Ship(this._regions[0]);
        s._client = client;
        this._regions[0].Add(s);
    }
}

module.exports = GameServer;
