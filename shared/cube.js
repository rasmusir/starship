"use strict";
let GameObject = require("./GameObject");
let NetworkObject = require("./NetworkObject");

class Cube extends NetworkObject
{
    constructor(region)
    {
        super(region);
        this.size = 1;
    }

    OnClient()
    {
        let geometry = new THREE.BoxGeometry( this.size, this.size, this.size );
        let material = new THREE.MeshNormalMaterial( { color: this.color } );
        this._cube = new THREE.Mesh( geometry, material );
        this._cube.position.set( ...this.Position.ToArray() );


        this._region.Renderer.Scene.add(this._cube);
    }

    OnClientDelete()
    {
        this._region.Renderer.Scene.remove(this._cube);
    }

    Tick(deltaTime)
    {
        this._cube.rotation.y += 0.01;
        this._cube.rotation.x += 0.01;
        this._cube.position.set( ...this.Position.ToArray() );
    }
}

module.exports = Cube;
