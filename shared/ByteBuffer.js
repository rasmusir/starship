"use strict";

class ByteBuffer
{
    constructor(data)
    {
        if (data !== undefined)
        {
            this._arrayBuffer = data;
        }
        else {
            this._arrayBuffer = new ArrayBuffer(512);
        }
        this._dataView = new DataView(this._arrayBuffer);
        this._position = 0;

    }

    Seek(position)
    {
        this._position = position;
    }

    GetTrimmedBuffer()
    {
        return this._arrayBuffer.slice(0, this._position);
    }

    WriteByte(value)
    {
        this._dataView.setUint8(this._position, value);
        this._position++;
    }

    WriteShort(value)
    {
        this._dataView.setInt16(this._position, value);
        this._position += 2;
    }

    WriteInt32(value)
    {
        this._dataView.setInt32(this._position, value);
        this._position += 4;
    }

    WriteFloat32(value)
    {
        this._dataView.setFloat32(this._position, value);
        this._position += 4;
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
        this._position += 2;
        for (let i = 0; i < enc.byteLength; i++)
        {
            this._dataView.setUint8(this._position + i, enc[i]);
        }
        this._position += enc.byteLength;
    }

    ReadByte()
    {
        let value = this._dataView.getUint8(this._position);
        this._position++;
        return value;
    }

    ReadInt16()
    {
        let value = this._dataView.getInt16(this._position);
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

    ReadString()
    {
        let length = this._dataView.getUint16(this._position);
        this._position += 2;
        let sb = new Uint8Array(this._arrayBuffer, this._position, length);
        this._position += length;

        if (!process.browser)
        {

        }
        else
        {
            let decoder = new TextDecoder("utf-8");
            return decoder.decode(sb);
        }
    }

}

module.exports = ByteBuffer;
