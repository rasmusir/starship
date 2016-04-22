"use strict";

let ByteBuffer = require("../shared/ByteBuffer");
let Network = require("../shared/Network");
let Client = require("../shared/Client");

/**
 * ServerClient is created on server to keep track of a client
 * @extends Client
 */
class ServerClient extends Client
{
    /**
     * ServerClient is created with a socket, and and ID to represent the client
     * @param  {Socket} socket Socket the client connected with
     * @param  {int} id     The clients ID
     */
    constructor(socket, id)
    {
        super(id);
        this._socket = socket;
        this._buffer = new ByteBuffer();

    }
    /**
     * Performs a handshake with the client. Used to let the client know we have recognized it's connection.
     */
    Handshake()
    {
        this._buffer.WriteByte(Network.CONNECT);
        this._buffer.WriteShort(this._id);

        this._socket.send(this._buffer.GetTrimmedBuffer());
        this._buffer.Reset();

        this._socket.on("message", (data) => {
            let b = new ByteBuffer(toArrayBuffer(data));
            this.Receive(b);
        });

        //TODO This._socket.on("chat")
    }
    /**
     * Move the client to a region
     * @param {ServerRegion} region A Server region to move the client to
     */
    MoveTo(region)
    {
        region.MoveClient(this);
        this._region = region;
        this._buffer.WriteByte(Network.REGION_CHANGE);
        this._buffer.WriteShort(region.ID);
        region.SyncWrite(this._buffer);
        this._socket.send(this._buffer.GetTrimmedBuffer());
        this._buffer.Reset();
    }

    Receive(b)
    {
        let scrap = false;
        while (b.GotData() && !scrap)
        {
            let command = b.ReadByte();
            switch (command)
            {
                case Network.CLIENT_UPDATE:
                {
                    let rid = b.ReadShort();
                    this._region.ServerReceive(b);
                    break;
                }
                case Network.CLIENT_MESSAGE:
                {
                    console.log("Message from client (" + this.ID + "): " + b.ReadString());
                    break;
                }
                default:{
                    console.error("Uknown command (" + command + ") recceived, scrapping frame.");
                    scrap = true;
                }
            }
        }
    }
}

function toArrayBuffer(buffer) {
    let ab = new ArrayBuffer(buffer.length);
    let view = new Uint8Array(ab);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
}

module.exports = ServerClient;
