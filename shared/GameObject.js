"use strict";

let Vector = require("./Vector");

class GameObject
{
    constructor()
    {
        this.Position = new Vector();
        this._id = NaN;
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
}

module.exports = GameObject;
