"use strict";

let Region = require("../shared/Region");
let Blueprint = require("../shared/Blueprint");
let ShipMeshBuilder = require("../shared/ShipMeshBuilder");
let Vector = require("../shared/Vector");

/**
 * A region on the clientside
 */
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

    Tick(dt)
    {
        super.Tick(dt);

        if (this.mesh)
        {
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.01;
        }
    }

    /**
     * The current {@link Renderer} in use by the region
     */
    get Renderer()
    {
        return this._renderer;
    }
    /**
     * Changes the state of the region.
     * @param {int} id
     */
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

    Delete(object)
    {
        object.OnClientDelete();
        super.Delete(object);
    }
}

module.exports = ClientRegion;
