"use strict";
let GameObject = require("./GameObject");

class Ship extends GameObject
{
    constructor()
    {
        super();
        this.size = 5;
    }

    OnClient(id, region)
    {
        super.OnClient(id);

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
        this._cube = new THREE.Mesh( geometry, material );

        let light = new THREE.DirectionalLight( 0xffffff, 0.5);
        var alight = new THREE.AmbientLight( 0x404040 );
        light.position.set( 0, 1, 2);

        region.Renderer.Scene.add(this._cube);
        region.Renderer.Scene.add(light);
        region.Renderer.Scene.add(alight);
    }

    Tick(deltaTime, isClient)
    {
        if (isClient)
        {
            this._cube.rotation.y += 0.01;
            this._cube.rotation.x += 0.01;
        }
    }
}

module.exports = Ship;
