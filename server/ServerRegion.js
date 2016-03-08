"use strict";

let Region = require("../shared/Region");
let ByteBuffer = require("../shared/ByteBuffer");
let Network = require("../shared/Network");

/**
 * A server region.
 * @extends Region
 */
class ServerRegion extends Region
{
    constructor(id)
    {
        super(id, false);
        this._buffer = new ByteBuffer();
    }
    /**
     * Moves a client to this region
     * @param {Client} client Client to move
     */
    MoveClient(client)
    {
        if (!this._clients.has(client.ID))
        {
            this._clients.set(client.ID, client);
        }
    }

    ServerSend(io)
    {
        let b = this._buffer;
        b.WriteByte(Network.REGION_TICK);
        b.WriteShort(this.ID);
        this._objects.forEach( (object, id) => {
            object.ServerSend(b);
        });

        io.send(b.GetTrimmedBuffer());
        b.Reset();
    }

    ServerReceive(b)
    {
        while (b.GotData())
        {
            let id = b.ReadShort();
            this._objects.get(id).ServerReceive(b);
        }
    }

    Add(object)
    {
        super.Add(object);
        this._buffer.WriteByte(Network.REGION_CREATE_OBJECT);
        this._buffer.WriteShort(this.ID);
        this._buffer.WriteShort(object.NETWORKID);
        this._buffer.WriteShort(object.NetworkID);
        object.SyncWrite(this._buffer);
    }

    SyncWrite(buffer)
    {
        buffer.WriteShort(this._clients.size);
        this._clients.forEach( (client, id) => {
            client.SyncWrite(buffer);
        });

        buffer.WriteShort(this._objects.size);
        this._objects.forEach( (object, id) => {
            buffer.WriteShort(object.NETWORKID);
            buffer.WriteInt32(object.NetworkID);
            object.SyncWrite(buffer);
        });
    }
}

module.exports = ServerRegion;
