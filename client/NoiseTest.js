"use strict";

let Alea = require("alea");
let Simplex = require("simplex-noise");
let Box = require("./site/Box.js");

class NoiseTest
{
    constructor()
    {
        let b = new Box();
        b.SetSize(128, 128);
        b.Fetch("noisetest", (err) => {
            if (!err)
            {
                b._div.classList.add("nomargin");

                this._canvas = b.$("canvas");

                b.Show();

                this.GenerateNoise();
            }
        });
        this.b = b;
    }

    GenerateNoise(offsetX, offsetY, seed)
    {
        offsetX = offsetX || 0;
        offsetY = offsetY || 0;
        seed = seed || Math.random();

        let ctx = this._canvas.getContext("2d");
        let width = 128;
        let height = 128;
        this._canvas.width = width;
        this._canvas.height = height;
        let imgdata = ctx.getImageData(0, 0, width, height);
        let data = imgdata.data;
        let simplex = new Simplex(new Alea(seed));

        let gen = (offsetX, offsetY) => {
            offsetX = offsetX;
            offsetY = offsetY;
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    let v = 0;
                    for (let i = 1; i <= 5; i++)
                    {
                        v += (simplex.noise2D((x + offsetX) / 100 * (i * i), (y + offsetY) / 100 * (i * i)) * 0.5 + 0.5) * (1 / (i * i));
                    }
                    v = (v - 0.15);
                    v = ((v * 10 + 0.5) >> 1) << 1;
                    v = (v / 10) * 255;

                    data[(x + y * width) * 4 + 0] = v;
                    data[(x + y * width) * 4 + 1] = v;
                    data[(x + y * width) * 4 + 2] = v;
                    data[(x + y * width) * 4 + 3] = 255;
                }
            }
            ctx.putImageData(imgdata, 0, 0);
        };

        gen(offsetX, offsetY);
        this.b.OnMove = gen;

    }
}

module.exports = NoiseTest;
