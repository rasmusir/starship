"use strict";

let Alea = require("alea");
let Simplex = require("simplex-noise");
let GameObject = require("../GameObject");


class Terrain extends GameObject
{
    constructor(region, offsetX, offsetY)
    {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        super(region);
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._z = [];
        this._seed = 1;
        this._simplex = new Simplex(new Alea(this._seed));
    }

    OnClient()
    {
        let width = 256;
        let height = 256;

        let sizeX = 8;
        let sizeY = 8;

        let offsetX = this._offsetX * width;
        let offsetY = this._offsetY * height;

        let localScaleX = sizeX / width;
        let localScaleY = sizeY / height;

        let freqX = 20;
        let freqY = 20;

        //let geometry = new THREE.PlaneBufferGeometry( sizeX, sizeY, width, height );
        let geometry = new THREE.BufferGeometry();
        //geometry.rotateX( -Math.PI / 2 );

        let vertices = new Float32Array(18 * width * height );
        let normals = new Float32Array(18 * width * height );
        let colors = new Float32Array(18 * width * height );
        //let colors = new Float32Array(geometry.attributes.position.array.length);

        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {

                let fillColors = (ind, z) =>
                {
                    for (let i = 0; i < 9; i += 3)
                    {
                        if (z <= 0.6)
                        {
                            colors[ind + i] = 1;
                            colors[ind + i + 1] = 0.2 + Math.random() / 50;
                            colors[ind + i + 2] = 0;
                        }
                        else {
                            colors[ind + i] = 0.6;
                            colors[ind + i + 1] = 0.3;
                            colors[ind + i + 2] = 0.1;
                        }
                    }
                };

                let index = (x + y * width) * 18;
                let z = 0;
                // FIRST TRIANGLE, WOUND CW
                vertices[index] = x * localScaleX;
                vertices[index + 1] = y * localScaleY;
                vertices[index + 2] = this.GetHeight(x + offsetX, y + offsetY);

                vertices[index + 3] = (x + 1) * localScaleX;
                vertices[index + 4] = y * localScaleY;
                vertices[index + 5] = this.GetHeight(x + offsetX + 1, y + offsetY);

                vertices[index + 6] = x * localScaleX;
                vertices[index + 7] = (y + 1) * localScaleY;
                vertices[index + 8] = this.GetHeight(x + offsetX, y + offsetY + 1);

                z = (vertices[index + 2] + vertices[index + 5] + vertices[index + 8]) / 3;
                fillColors(index, z);

                // SECOND TRIANGLE, WOUND CW
                index += 9;
                vertices[index] = (x + 1) * localScaleX;
                vertices[index + 1] = y * localScaleY;
                vertices[index + 2] = this.GetHeight(x + offsetX + 1, y + offsetY);

                vertices[index + 3] = (x + 1) * localScaleX;
                vertices[index + 4] = (y + 1) * localScaleY;
                vertices[index + 5] = this.GetHeight(x + offsetX + 1, y + offsetY + 1);

                vertices[index + 6] = x * localScaleX;
                vertices[index + 7] = (y + 1) * localScaleY;
                vertices[index + 8] = this.GetHeight(x + offsetX, y + offsetY + 1);

                z = (vertices[index + 2] + vertices[index + 5] + vertices[index + 8]) / 3;

                fillColors(index, z);

                /*
                let r, g, b;
                let sn = (simplex.noise2D(x + offsetX, y + offsetY) + 1) / 2 + 0.5;
                r = sn;
                g = sn;
                b = sn;

                colors[index] = r;
                colors[index + 1] = g;
                colors[index + 2] = b;
                */
            }
        }



        geometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
        geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));

        //geometry.computeBoundingSphere();
        geometry.computeFaceNormals();
        geometry.computeVertexNormals();

        //let mat = new THREE.MeshBasicMaterial({side: THREE.DoubleSided, color: 0xffffff}); //, vertexColors: THREE.FaceColors});
        let material = new THREE.MeshPhongMaterial( {
            color: 0xffffff, vertexColors: THREE.VertexColors
        } );
        let mesh = new THREE.Mesh( geometry, material );
        mesh.position.x = (this._offsetX * sizeX - (sizeX / 2));
        mesh.position.y = (this._offsetY * sizeY - (sizeY / 2));
        this._scene.add( mesh );
    }

    GetNoise(x, y, freqX, freqY, count)
    {
        count = count || 2;
        //return 0;
        if (this._z[x] && this._z[x][y])
        {
            return this._z[x][y];
        }
        else {
            if (!this._z[x])
            {
                this._z[x] = [];
            }
            this._z[x][y] = 0;
            for (let i = 1; i <= count; i++)
            {
                this._z[x][y] += (this._simplex.noise2D(x / freqX * (i * i), y / freqY * (i * i)) * 0.5 + 0.5) * (1 / (i * i));
            }
            return this._z[x][y];
        }
    }

    GetHeight(x, y)
    {
        let z = this.GetNoise(x, y, 100, 100);

        if (z < 0.6)
        {
            z = 0.51;
        }

        return z;
    }
}

module.exports = Terrain;
