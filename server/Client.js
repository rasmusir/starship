"use strict";

let ByteBuffer = require("../shared/ByteBuffer");
let Network = require("../shared/Network");

class Client
{
    constructor(socket, id)
    {
        this._id = id;

        this._socket = socket;
        this._buffer = new ByteBuffer();
        this._buffer.WriteByte(Network.CONNECT);
        this._buffer.WriteString("Welcome, captain!");

        this._socket.send(this._buffer.GetTrimmedBuffer());
    }

    MoveTo(region)
    {
        region.MoveClient(this);
        this._buffer.WriteByte(Network.REGION_CHANGE);
        this._buffer.WriteShort(region.ID);
        region.SyncWrite(this._buffer);
        this._socket.send(this._buffer.GetTrimmedBuffer());
    }
}

module.exports = Client;
