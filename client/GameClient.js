"use strict";

let Game = require("../shared/Game");
let Renderer = require("./Renderer");
let Cube = require("../shared/cube");
let Ship = require("../shared/Objects/Ship");
let ClientRegion = require("./ClientRegion");
let Vector = require("../shared/Vector");
let ByteBuffer = require("../shared/ByteBuffer");
let Network = require("../shared/Network");
let Interface = require("./Interface/Interface");

/**
* Base Game class
* @class
* @extends Game
*/
class GameClient extends Game
{
    constructor(siteHandler)
    {
        super();

        let i = new Interface();


        let socket = io(":6699");
        this._socket = socket;

        socket.on("connect", () => {
            socket.on("message", (data) => {
                let buffer = new ByteBuffer(data);
                this._handleData(buffer);
            });

            window.onbeforeunload = () => {
                socket.disconnect();
            };
        });


        let renderer = new Renderer(siteHandler);

        this._region = new ClientRegion(0, renderer, this);
        this.clientID = -1;

        this._buffer = new ByteBuffer();

        renderer.Animate( () => { this.Tick(); });
    }

    _handleData(buffer)
    {
        let scrap = false;
        while (buffer.GotData() && !scrap)
        {
            switch (buffer.ReadByte())
            {
                case Network.REGION_CHANGE:
                {
                    let regionID = buffer.ReadShort();
                    this._region.ChangeState(regionID);
                    this._region.Sync(buffer);
                    break;
                }
                case Network.REGION_TICK:
                {
                    let regionID = buffer.ReadShort();
                    this._region.Receive(buffer);
                    break;
                }
                case Network.REGION_CREATE_OBJECT:
                {
                    let regionID = buffer.ReadShort();
                    let object = new (Network.Class(buffer.ReadShort()))(this._region);
                    let networkid = buffer.ReadShort();
                    object._networkID = networkid;
                    object.Sync(buffer);
                    this._region.Add(object);

                    break;
                }
                case Network.REGION_DELETE_OBJECT:
                {
                    let regionID = buffer.ReadShort();
                    let objectID = buffer.ReadShort();
                    this._region.Delete(this._region.FindByNetworkID(objectID));

                    break;
                }
                case Network.CONNECT:
                {
                    console.log("Signed in!");
                    this.ClientID = buffer.ReadShort();

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

    /**
     * Ticks the game client
     * @param {float} deltaTime
     */
    Tick(deltaTime)
    {
        this._region.Tick(deltaTime);

        this._region.Send(this._buffer);

        this._socket.send(this._buffer.GetTrimmedBuffer());
        this._buffer.Reset();
    }
}

module.exports = GameClient;
