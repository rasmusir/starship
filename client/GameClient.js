"use strict";

let Game = require("../shared/Game");
let Renderer = require("./Renderer");
let Cube = require("../shared/cube");
let Ship = require("../shared/Objects/Ship");
let Region = require("../shared/Region");
let Vector = require("../shared/Vector");
let ByteBuffer = require("../shared/ByteBuffer");
let Network = require("../shared/Network");

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

        renderer.Animate( () => { this.Tick(); });
    }

    _handleData(buffer)
    {
        let scrap = false;
        while (buffer.GotData() && !scrap)
        {
            switch (buffer.ReadByte())
            {
                case Network.OBJECT_CREATE:
                {
                    let object = new (Network.Class(buffer.ReadShort()));

                    this._region.Add(object);

                    break;
                }
                case Network.REGION_CHANGE:
                {
                    let regionID = buffer.ReadShort();
                    this._region.Sync(buffer);
                    break;
                }
                case Network.CONNECT:
                {
                    console.log("Signed in!");
                    console.log("Server message: " + buffer.ReadString());
                    break;
                }
                case Network.SERVER_MESSAGE:
                {
                    console.log("Server message: " + buffer.ReadString());
                    break;
                }
                default:{
                    console.error("Uknown command recceived, scrapping frame.");
                    scrap = true;
                }
            }
        }
    }

    Tick(deltaTime)
    {
        this._region.Tick(deltaTime);
    }
}

module.exports = GameClient;
