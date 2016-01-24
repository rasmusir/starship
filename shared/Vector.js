"use strict";

/**
 * A 3D Vector
 * @param  {float} x
 * @param  {float} y
 * @param  {float} z
 */
class Vector
{
    /**
     * A 3D Vector
     * @param  {float} x
     * @param  {float} y
     * @param  {float} z
     */
    constructor(x, y, z)
    {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;
    }

    /**
     * X component
     */
    get X()
    {
        return this._x;
    }

    /**
     * Y component
     */
    get Y()
    {
        return this._y;
    }

    /**
     * Z component
     */
    get Z()
    {
        return this._z;
    }
}

module.exports = Vector;
