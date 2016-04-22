"use strict";
/**
 * The camera class
 */
class Camera
{
    constructor()
    {
        this._ratio = window.innerWidth / window.innerHeight;
        this._size = 4;

        let scaleX = this._size * this._ratio;
        let scaleY = this._size;

        this._camera = new THREE.OrthographicCamera(-scaleX, scaleX, scaleY, -scaleY, 0.1, 1000);
        //this._camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        this._position = this._camera.position;
        this._angle = 90;

        let rad = (this._angle / 180) * Math.PI;

        this._position.z = Math.cos(45) * 50;
        this._position.y = -Math.sin(rad) * 50;
        this._position.x = Math.sin(rad) * 50;
        this._camera.up = new THREE.Vector3(0, 0, 1);
        this._camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
    /**
     * Returns the THREE.Camera currently in use.
     */
    get Camera()
    {
        return this._camera;
    }

    LookAt(x, y)
    {
        let rad = (this._angle / 180) * Math.PI;
        this._position.x = x + Math.cos(rad) * 50;
        this._position.y = y - Math.sin(rad) * 50;
        this._camera.lookAt(new THREE.Vector3(x, y, 0));
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
