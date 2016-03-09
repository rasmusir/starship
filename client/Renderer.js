"use strict";

let Camera = require("./Camera");

/**
 * Renderer
 */
class Renderer
{
    /**
     *
     * @param  {SiteHandler} sitehandler the current site handler
     */
    constructor(sitehandler)
    {
        this._scene = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        sitehandler.Gamearea.appendChild(this._renderer.domElement);
        window.addEventListener("resize", () => { this._onResize(); });

        this._camera = new Camera();
        this._onResize();

        this.stats = require("./SiteHandler").stats;
    }
    /**
     * The current Three.js Scene object.
     */
    get Scene()
    {
        return this._scene;
    }
    /**
     * Starts the scene animation
     * @param {Function} callback a function that will be called before every frame renders
     */
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
        this.stats.begin();
        callback();
        this._renderer.render(this._scene, this._camera.Camera);
        this.stats.end();
        requestAnimationFrame( () => { this._onRender(callback); });
    }
}

module.exports = Renderer;
