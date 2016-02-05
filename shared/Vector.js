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
        this.X = x || 0;
        this.Y = y || 0;
        this.Z = z || 0;
    }

    ToArray()
    {
        return [this.X, this.Y, this.Z];
    }
}

module.exports = Vector;
