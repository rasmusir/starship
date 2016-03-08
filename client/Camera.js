"use strict";
/**
 * The camera class
 */
class Camera
{
    constructor()
    {
        this._ratio = window.innerWidth / window.innerHeight;
        this._size = 2;

        let scaleX = this._size * this._ratio;
        let scaleY = this._size;

        this._camera = new THREE.OrthographicCamera(-scaleX, scaleX, scaleY, -scaleY, 1, 1000);
        //this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this._position = this._camera.position;

        this._position.z = 2;
    }
    /**
     * Returns the THREE.Camera currently in use.
     */
    get Camera()
    {
        return this._camera;
    }
    /**
     * Sets the game display size.
     * @param {int} width
     * @param {int} height
     */
    SetScreenSize(width, height)
    {
        this._ratio = width / height;
        let scaleX = this._size * this._ratio;
        let scaleY = this._size;
        this._camera.left = -scaleX;
        this._camera.right = scaleX;
        this._camera.top = scaleY;
        this._camera.bottom = -scaleY;
        this._camera.updateProjectionMatrix();
    }
}

module.exports = Camera;
