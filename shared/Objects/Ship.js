"use strict";

let NetworkObject = require("../NetworkObject");
let Cube = require("../cube");

class Ship extends Cube
{
    constructor()
    {
        super();
        console.log("Hello, I'm a ship");
        this.Position._x = 0;
        this.color = Math.random() * 0xffffff;
    }

    SyncWrite(buffer)
    {
        super.SyncWrite(buffer);
        buffer.WriteInt32(this.color);
    }

    Sync(buffer)
    {
        super.Sync(buffer);
        this.color = buffer.ReadInt32();
    }
}

require("../Network").RegisterClass(Ship);
module.exports = Ship;
