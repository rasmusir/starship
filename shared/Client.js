"use strict";

class Client
{
    constructor(id)
    {
        this._id = id;
        this._name = "unnamed" + Math.floor(Math.random() * 10);
        this._region;
    }

    get ID()
    {
        return this._id;
    }

    SyncWrite(buffer)
    {
        buffer.WriteShort(this._id);
        buffer.WriteString(this._name);
    }

    Sync(buffer)
    {
        this._id = buffer.ReadShort();
        this._name = buffer.ReadString();
    }
}

module.exports = Client;
