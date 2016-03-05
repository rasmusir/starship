"use strict";

let Region = require("../shared/Region");

class ClientRegion extends Region
{
    constructor(id, renderer, gameClient)
    {
        super(id, true);
        this._gameClient = gameClient;
        this._renderer = renderer || null;
        let light = new THREE.DirectionalLight( 0xffffff, 0.5);
        let alight = new THREE.AmbientLight( 0x404040 );
        light.position.set( 0, 1, 2);
        this.Renderer.Scene.add(light);
        this.Renderer.Scene.add(alight);
    }

    get Renderer()
    {
        return this._renderer;
    }

    ChangeState(id)
    {
        this._id = id;
        this.Renderer.Scene.children = [];

        this._objects = new Map();
        this._currId = 0;

        let light = new THREE.DirectionalLight( 0xffffff, 0.5);
        let alight = new THREE.AmbientLight( 0x404040 );
        light.position.set( 0, 1, 2);
        this.Renderer.Scene.add(light);
        this.Renderer.Scene.add(alight);
    }
}

module.exports = ClientRegion;
