"use strict";

let GameObject = require("./GameObject");
let ByteBuffer = require("./byteBuffer");

class NetworkObject extends GameObject
{
    constructor(region)
    {
        super(region);
        this._networkID;
    }

    get NetworkID()
    {
        return this._networkID;
    }

    Send(buffer)
    {
        buffer.WriteShort(this.NetworkID);
    }

    Receive(buffer)
    {

    }

    ServerSend(buffer)
    {
        buffer.WriteShort(this.NetworkID);
    }

    ServerReceive(buffer)
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
