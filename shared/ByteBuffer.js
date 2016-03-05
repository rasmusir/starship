"use strict";

let Vector = require("./Vector");

class ByteBuffer
{
    constructor(data)
    {
        if (data !== undefined)
        {
            this._arrayBuffer = data;
        }
        else {
            this._arrayBuffer = new ArrayBuffer(4096);
        }
        this._dataView = new DataView(this._arrayBuffer);
        this._position = 0;

    }

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

    Reset()
    {
        this._position = 0;
    }

    GetTrimmedBuffer()
    {
        return this._arrayBuffer.slice(0, this._position);
    }

    GotData()
    {
        return this._position < this._arrayBuffer.byteLength;
    }

    WriteByte(value)
    {
        this._dataView.setUint8(this._position, value);
        this._moveForward(1);
    }

    WriteShort(value)
    {
        this._dataView.setUint16(this._position, value);
        this._moveForward(2);
    }

    WriteInt32(value)
    {
        this._dataView.setInt32(this._position, value);
        this._moveForward(4);
    }

    WriteFloat32(value)
    {
        this._dataView.setFloat32(this._position, value);
        this._moveForward(4);
    }

    WriteVector(value)
    {
        this._dataView.setFloat32(this._position, value.X);
        this._moveForward(4);
        this._dataView.setFloat32(this._position, value.Y);
        this._moveForward(4);
        this._dataView.setFloat32(this._position, value.Z);
        this._moveForward(4);
    }

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

    ReadByte()
    {
        let value = this._dataView.getUint8(this._position);
        this._position++;
        return value;
    }

    ReadShort()
    {
        let l = this._dataView.byteLength;
        let value = this._dataView.getUint16(this._position);
        this._position += 2;
        return value;
    }

    ReadInt32()
    {
        let value = this._dataView.getInt32(this._position);
        this._position += 4;
        return value;
    }

    ReadFloat32()
    {
        let value = this._dataView.getFloat32(this._position);
        this._position += 4;
        return value;
    }

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
