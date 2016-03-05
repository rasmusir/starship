"use strict";

let Network = require("./Network");
let NetworkObject = require("./NetworkObject");
let ByteBuffer = require("./ByteBuffer");
let Client = require("./Client");

class Region
{
    constructor(id, client)
    {
        this._id = id || null;
        this._objects = new Map();
        this._currId = 0;
        this._isClient = client;
        this._clients = new Map();
    }

    get ID()
    {
        return this._id;
    }

    GetClient(id)
    {
        return this._clients.get(id);
    }

    /**
     * Add an object to the region
     * @param {GameObject} object
     */
    Add(object)
    {
        if (this._isClient)
        {
            object.OnClient(this._currId, this);
        }
        else
        {
            if (object instanceof NetworkObject)
            {
                object._networkID = this._currId;
            }
            object.OnServer();
        }

        this._objects.set(this._currId, object);
        this._currId++;
    }

    Delete(object)
    {
        if (this._isClient)
        {
            object.Delete();
            this._objects.delete(object.ID);
        }
        else
        {
            if (object instanceof NetworkObject)
            {
                object.ServerDelete();
                this._objects.delete(object.ID);
            }
        }

        this._objects.set(this._currId, object);
        this._currId++;
    }

    Tick(deltaTime)
    {
        this._objects.forEach( (object, id) => {
            if (this._isClient)
            {
                object.Tick(deltaTime);
            }
            else
            {
                object.ServerTick(deltaTime);
            }
        });
    }

    Sync(buffer)
    {
        let clientcount = buffer.ReadShort();
        for (let i = 0; i < clientcount; i++)
        {
            let client = new Client();
            client.Sync(buffer);
            this._clients.set(client.ID, client);
        }
        let count = buffer.ReadShort();
        for (let i = 0; i < count; i++)
        {
            let C = Network.Class(buffer.ReadShort());
            let object = new C(this);
            object._networkID = buffer.ReadInt32();
            object.Sync(buffer);
            this.Add(object);
        }
    }

    Send(buffer)
    {
        let b = buffer;
        b.WriteByte(Network.CLIENT_UPDATE);
        b.WriteShort(this.ID);
        this._objects.forEach( (object, id) => {
            object.Send(b);
        });
    }

    Receive(b)
    {
        while (b.GotData())
        {
            let id = b.ReadShort();
            this._objects.get(id).Receive(b);
        }
    }
}

module.exports = Region;
