"use strict";

let Game = require("../shared/Game");

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
        this._scene = new THREE.Scene();
        this._camera = new THREE.OrthographicCamera();
        this._renderer = new THREE.WebGLRenderer();
        this._renderer.setSize(window.innerWidth,window.innerHeight);
    }
}

module.exports = GameClient;
var foo=asd;
