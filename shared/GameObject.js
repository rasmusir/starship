"use strict";

let Vector = require("./Vector");

class GameObject
{
    constructor()
    {
        this.Position = new Vector();
        this._clientId = NaN;
        this._serverId = NaN;
    }

    OnClient(id)
    {
        this._clientId = id;
    }

    OnServer(id)
    {
        this._serverId = id;
    }

    Tick(deltaTime, isClient)
    {

    }
}

module.exports = GameObject;
