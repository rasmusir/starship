"use strict";

let Camera = require("./Camera");

/**
 * Renderer
 * @class
 */
class Renderer
{
    constructor()
    {
        this._scene = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer();
        document.body.appendChild(this._renderer.domElement);
        window.addEventListener("resize", () => { this._onResize(); });

        this._camera = new Camera();

        this._onResize();
    }

    get Scene()
    {
        return this._scene;
    }

    Animate(callback)
    {
        this._onRender(callback);
    }

    _onResize()
    {
        this._renderer.setSize(window.innerWidth, window.innerHeight);
        this._camera.SetScreenSize(window.innerWidth, window.innerHeight);
    }

    _onRender(callback)
    {
        callback();
        requestAnimationFrame( () => { this._onRender(callback); });
        this._renderer.render(this._scene, this._camera.Camera);
    }
}

module.exports = Renderer;
