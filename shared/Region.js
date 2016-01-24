"use strict";

class Region
{
    constructor(renderer)
    {
        this._clientList = new Map();
        this._currId = 0;
        this._serverList = new Map();
        this._isClient = true;
        this._renderer = renderer || null;
    }

    get Renderer()
    {
        return this._renderer;
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
            this._clientList.set(this._currId, object);
        }
        else
        {
            object.OnServer(this._currId, this);
            this._serverList.set(this._currId, object);
        }

        this._currId++;
    }

    Tick(deltaTime)
    {
        this._clientList.forEach( (object, id) => {
            object.Tick(deltaTime, this._isClient);
        });
    }
}

module.exports = Region;
