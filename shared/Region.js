"use strict";

let Network = require("./Network");
let NetworkObject = require("./NetworkObject");
let GameObject = require("./GameObject");
let ByteBuffer = require("./ByteBuffer");
let Client = require("./Client");

/**
 * Represents a region in the game
 */

class Region
{
    /**
     *
     * @param  {int} id
     * @param  {bool} isClient is the region on the client side?
     */
    constructor(id, isClient)
    {
        this._id = id || null;
        this._objects = new Map();
        this._networkObjects = new Map();
        this._currId = 0;
        this._isClient = isClient;
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
        if (!(object instanceof GameObject))
        {
            throw new Error(object + " is not a GameObject");
        }
        if (this._isClient)
        {
            if (object instanceof NetworkObject && object.NetworkID != NaN)
            {
                this._networkObjects.set(object.NetworkID, object);
            }
            object.OnClient(this._currId, this);
        }
        else
        {
            console.log("Hello " + this._currId);
            if (object instanceof NetworkObject)
            {
                object._networkID = this._currId;
                object._id = this._currId;
            }
            object.OnServer();
        }
        this._objects.set(this._currId, object);
        this._currId++;
    }
    /**
     * Removes an object to the region
     * @param {GameObject} object
     */
    Delete(object)
    {
        object.OnDelete();
        this._objects.delete(object.ID);
        if (object instanceof NetworkObject && object.NetworkID != NaN)
        {
            this._networkObjects.delete(object.NetworkID);
        }
    }
    /**
     * Gets an object in the region from the ID
     * @param {int} ID The id of the object
     */
    Find(id)
    {
        return this._objects.get(id);
    }

   FindByNetworkID(id)
   {
       return this._networkObjects.get(id);
   }

    /**
     * Ticks the region
     * @param {float} deltaTime
     */
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
    /**
     * Synchronizes the region with the [buffer]
     * @param {ByteBuffer} buffer
     */
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
    /**
     * Sends the region object changes to the [buffer]
     * @param {ByteBuffer} buffer
     */
    Send(buffer)
    {
        let b = buffer;
        b.WriteByte(Network.CLIENT_UPDATE);
        b.WriteShort(this.ID);
        this._objects.forEach( (object, id) => {
            object.Send(b);
        });
    }
    /**
     * Receives the region object changes from the [buffer]
     * @param {ByteBuffer} buffer
     */
    Receive(b)
    {
        while (b.GotData())
        {
            let id = b.ReadShort();
            this._networkObjects.get(id).Receive(b);
        }
    }
}

module.exports = Region;
