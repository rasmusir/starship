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
        if (region)
        {
            this._gameClient = region._gameClient;
        }
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
     * Removes the game object
     */
    Delete()
    {

    }
}

module.exports = GameObject;
