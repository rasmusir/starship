"use strict";

let GameObject = require("./GameObject");
let ByteBuffer = require("./byteBuffer");

class NetworkObject extends GameObject
{
    constructor()
    {
        super();
        this._networkID;
    }

    get NetworkID()
    {
        return this._networkID;
    }

    Send(buffer)
    {

    }

    Receive(buffer)
    {

    }

    SyncWrite(buffer)
    {
        buffer.WriteVector(this.Position);
    }

    Sync(buffer)
    {
        this.Position = buffer.ReadVector();
    }
}

module.exports = NetworkObject;
