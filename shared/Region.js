"use strict";

let Network = require("./Network");

class Region
{
    constructor(renderer, id, client)
    {
        client = client || false;
        this._id = id || null;
        this._objects = new Map();
        this._currId = 0;
        this._isClient = !client;
        this._renderer = renderer || null;

        if (renderer)
        {
            let light = new THREE.DirectionalLight( 0xffffff, 0.5);
            let alight = new THREE.AmbientLight( 0x404040 );
            light.position.set( 0, 1, 2);
            this.Renderer.Scene.add(light);
            this.Renderer.Scene.add(alight);
        }
    }

    get Renderer()
    {
        return this._renderer;
    }

    get ID()
    {
        return this._id;
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
            object.OnServer(this._currId, this);
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

    SyncWrite(buffer)
    {
        buffer.WriteShort(this._objects.size);
        this._objects.forEach( (object, id) => {
            buffer.WriteShort(object.NETWORKID);
            buffer.WriteInt32(object.NetworkID);
            object.SyncWrite(buffer);
        });
    }

    Sync(buffer)
    {
        let count = buffer.ReadShort();
        for (let i = 0; i < count; i++)
        {
            let C = Network.Class(buffer.ReadShort());
            let object = new C();
            object._networkID = buffer.ReadInt32();
            object.Sync(buffer);
            this.Add(object);
        }
    }
}

module.exports = Region;
