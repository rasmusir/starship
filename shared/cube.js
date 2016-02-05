"use strict";
let GameObject = require("./GameObject");
let NetworkObject = require("./NetworkObject");

class Cube extends NetworkObject
{
    constructor()
    {
        super();
        this.size = 1;
        this.color = 0x00ff00;
    }

    OnClient(id, region)
    {
        super.OnClient(id);

        let geometry = new THREE.BoxGeometry( this.size, this.size, this.size );
        let material = new THREE.MeshPhongMaterial( { color: this.color } );
        this._cube = new THREE.Mesh( geometry, material );
        this._cube.position.set( ...this.Position.ToArray() );


        region.Renderer.Scene.add(this._cube);
    }

    Tick(deltaTime)
    {
        this._cube.rotation.y += 0.01;
        this._cube.rotation.x += 0.01;
    }
}

module.exports = Cube;
