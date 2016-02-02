"use strict";

let ByteBuffer = require("../shared/ByteBuffer");

class Client
{
    constructor(socket)
    {
        this._socket = socket;
        this._buffer = new ByteBuffer();
        this._buffer.WriteByte(254);
        this._buffer.WriteString("Welcome, captain!");
        this._socket.send(this._buffer.GetTrimmedBuffer());
    }
}

module.exports = Client;
