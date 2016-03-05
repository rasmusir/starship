"use strict";

let Vector = require("./Vector");

class GameObject
{
    constructor(region)
    {
        this.Position = new Vector();
        this._id = NaN;
        this._region = region;
        if (region)
        {
            this._gameClient = region._gameClient;
        }
    }

    OnClient()
    {

    }

    OnServer()
    {

    }

    Tick(deltaTime)
    {

    }

    ServerTick(deltaTime)
    {

    }

    Delete()
    {

    }
}

module.exports = GameObject;
