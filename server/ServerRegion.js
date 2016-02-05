"use strict";

let Region = require("../shared/Region");

class ServerRegion extends Region
{
    constructor(id)
    {
        super(null, id, true);
        this._clients = [];
    }

    MoveClient(client)
    {
        if (!this._clients[client.id])
        {
            this._clients[client.id] = client;
        }
    }
}

module.exports = ServerRegion;
