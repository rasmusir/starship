"use strict";

let GameObject = require("../GameObject");
let Input = require("../../client/Input");
let Vector = require("../Vector");

class Space extends GameObject
{
    constructor(region)
    {
        super(region);
    }

    OnClient()
    {
        this.StarOffset = new Vector();
        this._count = 1000;
        let alphas = new Float32Array( this._count ); // 1 values per vertex
        let sizes = new Float32Array( this._count ); // 1 values per vertex
        let vertices = new Float32Array( this._count * 3 ); // 1 values per vertex
        let geometry = new THREE.BufferGeometry();
        /*
        let material = new THREE.PointsMaterial({
            color: 0x555555,
            size: 1,
            sizeAttenuation: false
        });
        */
        let material = require("../../client/Shaders/PointCloudShader");
        material.uniforms = {
            color: {type:"c", value: 0xff0000},
            mPos: {type:"v4", value: new THREE.Vector4(0, 0, 0, 0)},
            texture1: { type: "t", value: THREE.ImageUtils.loadTexture( "resources/textures/star.png" ) }
        };
        this.m = material;


        this._offset = [];

        for (let i = 0; i < this._count; i++)
        {
            let x = Math.random() * this._region._renderer.Camera._size * 2 * this._region._renderer.Camera._ratio;
            let y = Math.random() * this._region._renderer.Camera._size * 2;
            let z = 0.3 + Math.pow(Math.random(), 120) * 0.9;
            if (z < 0.9) { z = 0.4; };
            sizes[i] = 1;
            alphas[i] = z;

            this._offset.push(new THREE.Vector3(x, y, z));
            vertices[i * 3] = x;
            vertices[i * 3 + 1] = y;
            vertices[i * 3 + 2] = z;
        }

        geometry.addAttribute("size", new THREE.BufferAttribute(sizes, 1));
        geometry.addAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
        geometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));

        this._particleSystem = new THREE.Points(geometry, material);
        this._region._renderer.Camera._camera.add(this._particleSystem);

        this._particleSystem.position.x = -this._region._renderer.Camera._size * this._region._renderer.Camera._ratio;
        this._particleSystem.position.y = -this._region._renderer.Camera._size;

        this._particleSystem.position.z = -100;
    }

    Tick()
    {
        let maxx = this._region._renderer.Camera._size * 2 * this._region._renderer.Camera._ratio;
        let maxy = this._region._renderer.Camera._size * 2;

        this.m.uniforms.mPos.value = new THREE.Vector4(this.StarOffset.X, this.StarOffset.Y, maxx, maxy);
    }
}

module.exports = Space;
