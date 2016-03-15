"use strict";

class Blueprint
{
    constructor()
    {
        this._maxWidth = 20;
        this._maxLength = 20;
        this._maxHeight = 1;
        this._parts = new Int8Array(this._maxHeight * this._maxWidth * this._maxLength);
    }

    get MaxWidth()
    {
        return this._maxWidth;
    }

    get MaxLength()
    {
        return this._maxLength;
    }

    get MaxHeight()
    {
        return this._maxHeight;
    }

    Set(x, y, z, part)
    {
        this._parts[x + y * this._maxWidth + z * this._maxWidth * this._maxLength] = part;
    }

    Get(x, y, z)
    {
        return this._parts[x + y * this._maxWidth + z * this._maxWidth * this._maxLength];
    }
}

module.exports = Blueprint;
