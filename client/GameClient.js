"use strict";

let Game = require("../shared/Game");
let Renderer = require("./Renderer");
let Ship = require("../shared/Ship");
let Region = require("../shared/Region");
let Vector = require("../shared/Vector");
let ByteBuffer = require("../shared/ByteBuffer");

/**
* Base Game class
* @class
* @extends Game
*/
class GameClient extends Game
{
    constructor(test)
    {
        super();

        let socket = io(":6699");

        socket.on("connect", () => {
            socket.on("message", (data) => {
                let buffer = new ByteBuffer(data);
                this._handleData(buffer);
            });
        });


        let renderer = new Renderer();

        this._region = new Region(renderer);
        let debugShip = new Ship();

        this._region.Add(debugShip);

        renderer.Animate( () => { this.Tick(); });
    }

    _handleData(buffer)
    {
        switch (buffer.ReadByte())
        {
            case 254:
            {
                console.log("Signed in!");
                console.log("Server message: " + buffer.ReadString());
                break;
            }
            case 253:
            {
                console.log("Server message: " + buffer.ReadString());
                break;
            }
            default:{
                console.error("Uknown command recceived, scrapping frame.");
            }
        }
    }

    Tick(deltaTime)
    {
        this._region.Tick(deltaTime);
    }
}

module.exports = GameClient;
