"use strict";

let Game = require("../shared/Game");
let Renderer = require("./Renderer");
let Ship = require("../shared/Ship");
let Region = require("../shared/Region");
let Vector = require("../shared/Vector");

/**
* Base Game class
* @class
* @extends Game
*/
class GameClient extends Game
{
    constructor(test)
    {
        super();
        let renderer = new Renderer();

        this._region = new Region(renderer);
        let debugShip = new Ship();

        this._region.Add(debugShip);

        renderer.Animate( () => { this.Tick(); });
    }

    Tick(deltaTime)
    {
        this._region.Tick(deltaTime);
    }
}

module.exports = GameClient;
