"use strict";

/**
 * A 3D Vector
 */
class Vector
{
    /**
     * You can construct the vector with no arguments or the XYZ components
     * @param {float} [x]
     * @param {float} [y]
     * @param {float} [z]
     */
    constructor(x, y, z)
    {
        this.X = x || 0;
        this.Y = y || 0;
        this.Z = z || 0;
    }

    /**
     * Returns an array containing the X Y and Z component. (in that order)
     */
    ToArray()
    {
        return [this.X, this.Y, this.Z];
    }
}

module.exports = Vector;
