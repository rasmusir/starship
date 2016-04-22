"use strict";

let Vector = require("./Vector");
/**
 * Game object base class
 */
class GameObject
{
    /**
     *
     * @param  {Region} region The region this game object exists in
     */
    constructor(region)
    {
        this.Position = new Vector();
        this._id = NaN;
        this._region = region;
        if (region.Renderer)
        {
            this._gameClient = region._gameClient;
            this._scene = region.Renderer.Scene;
        }
    }

    get ID()
    {
        return this._id;
    }

    get Region()
    {
        return this._region;
    }

    get Renderer()
    {
        return this._region.Renderer;
    }

    get Camera()
    {
        return this._region.Renderer.Camera;
    }

    /**
     * Called when the game object is initialized on the client
     */
    OnClient()
    {

    }

    /**
     * Called when the game object is initialized on the server
     */
    OnServer()
    {

    }
    /**
     * Ticks the game object
     * @param {float} deltaTime
     */
    Tick(deltaTime)
    {

    }

    /**
     * Ticks the game object on the server
     * @param {float} deltaTime
     */
    ServerTick(deltaTime)
    {

    }
    /**
     * Fired when the game object is deleted
     */
    OnDelete()
    {

    }

    /**
     * Fired on the client when the game object is deleted. Use this to remove graphics and client properties only.
     */
    OnClientDelete()
    {

    }
}

module.exports = GameObject;
