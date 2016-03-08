"use strict";

let Vector = require("./Vector");
/**
 * A simple bytebuffer
 */
class ByteBuffer
{
    /**
     *
     * @param  {ArrayBuffer} [buffer] an ArrayBuffer to initialize the ByteBuffer with
     */
    constructor(buffer)
    {
        if (buffer !== undefined)
        {
            this._arrayBuffer = buffer;
        }
        else {
            this._arrayBuffer = new ArrayBuffer(4096);
        }
        this._dataView = new DataView(this._arrayBuffer);
        this._position = 0;

    }

    /**
     * Move the buffer head
     * @param {int} position Position in the buffer
     */
    Seek(position)
    {
        this._position = position;
    }

    _moveForward(count)
    {
        if (this._position + 16 > this._dataView.byteLength)
        {
            let newbuffer = new ArrayBuffer(this._arrayBuffer.byteLength * 2);
            let uint8 = new Uint8Array(newbuffer);
            uint8.set(new Uint8Array(this._dataView.buffer));

            this._arrayBuffer = uint8.buffer;
            this._dataView = new DataView(this._arrayBuffer);
        }

        this._position += count;
    }

    /**
     * Moves the buffer head back to the begining of the buffer
     */
    Reset()
    {
        this._position = 0;
    }
    /**
     * Trimms the buffer to the current position and returns the trimmed buffer
     * @return {ArrayBuffer} The trimmed buffer
     */
    GetTrimmedBuffer()
    {
        return this._arrayBuffer.slice(0, this._position);
    }
    /**
     * Are we at the end of the buffer?
     * @return {bool}
     */
    GotData()
    {
        return this._position < this._arrayBuffer.byteLength;
    }

    /**
     * Writes a byte to the buffer
     * @param {Uint8} value
     */
    WriteByte(value)
    {
        this._dataView.setUint8(this._position, value);
        this._moveForward(1);
    }
    /**
     * Writes a short to the buffer
     * @param {Uint16} value
     */
    WriteShort(value)
    {
        this._dataView.setUint16(this._position, value);
        this._moveForward(2);
    }
    /**
     * Writes an int to the buffer
     * @param {int} value
     */
    WriteInt32(value)
    {
        this._dataView.setInt32(this._position, value);
        this._moveForward(4);
    }
    /**
     * Writes a float to the buffer
     * @param {float} value
     */
    WriteFloat32(value)
    {
        this._dataView.setFloat32(this._position, value);
        this._moveForward(4);
    }
    /**
     * Writes a vector to the buffer
     * @param {Vector} vector
     */
    WriteVector(value)
    {
        this._dataView.setFloat32(this._position, value.X);
        this._moveForward(4);
        this._dataView.setFloat32(this._position, value.Y);
        this._moveForward(4);
        this._dataView.setFloat32(this._position, value.Z);
        this._moveForward(4);
    }
    /**
     * Writes a string to the buffer
     * @param {string} string
     */
    WriteString(string)
    {
        let enc = null;
        if (!process.browser)
        {
            enc = new Buffer(string, "utf8");
        }
        else {
            let te = new TextEncoder("utf-8");
            enc = te.encode(string);
        }
        this._dataView.setUint16(this._position, enc.byteLength);
        this._moveForward(2);
        for (let i = 0; i < enc.byteLength; i++)
        {
            this._dataView.setUint8(this._position + i, enc[i]);
        }
        this._moveForward(enc.byteLength);
    }

    /**
     * Reads a byte from the buffer
     * @return {Uint8}
     */
    ReadByte()
    {
        let value = this._dataView.getUint8(this._position);
        this._position++;
        return value;
    }
    /**
     * Reads a short from the buffer
     * @return {Uint16}
     */
    ReadShort()
    {
        let l = this._dataView.byteLength;
        let value = this._dataView.getUint16(this._position);
        this._position += 2;
        return value;
    }

    /**
     * Reads an int from the buffer
     * @return {int}
     */
    ReadInt32()
    {
        let value = this._dataView.getInt32(this._position);
        this._position += 4;
        return value;
    }

    /**
     * Reads a float from the buffer
     * @return {float}
     */
    ReadFloat32()
    {
        let value = this._dataView.getFloat32(this._position);
        this._position += 4;
        return value;
    }

    /**
     * Reads a vector from the buffer
     * @return {Vector}
     */
    ReadVector()
    {
        let x = this._dataView.getFloat32(this._position);
        this._position += 4;
        let y = this._dataView.getFloat32(this._position);
        this._position += 4;
        let z = this._dataView.getFloat32(this._position);
        this._position += 4;
        return new Vector(x, y, z);
    }

    /**
     * Reads a string from the buffer
     * @return {string}
     */
    ReadString()
    {
        let length = this._dataView.getUint16(this._position);
        this._position += 2;
        let sb = new Uint8Array(this._arrayBuffer, this._position, length);
        this._position += length;

        if (!process.browser)
        {
            return (new Buffer(sb)).toString("utf8");
        }
        else
        {
            let decoder = new TextDecoder("utf-8");
            return decoder.decode(sb);
        }
    }

}

module.exports = ByteBuffer;
