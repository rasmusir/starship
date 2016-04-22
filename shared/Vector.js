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

    Normalize()
    {
        let length = Math.sqrt((this.X * this.X) + (this.Y * this.Y) + (this.Z + this.Z));
        this.X = this.X / length;
        this.Y = this.Y / length;
        this.Z = this.Z / length;
    }

    Add(v)
    {
        this.X += v.X;
        this.Y += v.Y;
        this.Z += v.Z;
    }

    Multiply(v)
    {
        if (v instanceof Vector)
        {
            this.X *= v.X;
            this.Y *= v.Y;
            this.Z *= v.Z;
        }
        else {
            this.X *= v;
            this.Y *= v;
            this.Z *= v;
        }
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
