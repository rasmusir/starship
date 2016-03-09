"use strict";

let NetworkObject = require("../NetworkObject");
let Vector = require("../Vector");
let Input = require("../../client/Input");
let ShipMeshBuilder = require("../ShipMeshBuilder");
let Blueprint = require("../Blueprint");

class Ship extends NetworkObject
{
    constructor(region)
    {
        super(region);
        this.Position.X = 1 - Math.random() * 2;
        this.Position.Y = 1 - Math.random() * 2;
        this.color = 0xffffff * Math.random();

        this.t = 0;
        this.speed = Math.random();
        this._target = new Vector();
        this._client = null;
    }

    OnClient()
    {
        let smb = new ShipMeshBuilder();
        let bp = new Blueprint();

        bp.Set(0, 0, 0, 1);
        this._mesh = smb.Build(bp, new Vector(-0.5, -0.5, -0.5));
        this._scene.add(this._mesh);
    }

    OnClientDelete()
    {
        this._scene.remove(this._mesh);
    }

    OnServer()
    {

    }

    Tick()
    {
        super.Tick();
        if (this._client && this._client.ID === this._gameClient.ClientID)
        {
            this.Position.X += Input.Right * 0.05 - Input.Left * 0.05;
            this.Position.Y += Input.Up * 0.05 - Input.Down * 0.05;
        }
        else {
            this.Position.X += (this._target.X - this.Position.X) / 10;
            this.Position.Y += (this._target.Y - this.Position.Y) / 10;
        }

        this._mesh.rotation.x += 0.01;
        this._mesh.rotation.y += 0.01;
        this._mesh.position.set( ...this.Position.ToArray() );
    }

    SyncWrite(buffer)
    {
        super.SyncWrite(buffer);
        buffer.WriteShort(this._client.ID);
        buffer.WriteInt32(this.color);
    }

    Sync(buffer)
    {
        super.Sync(buffer);
        let clientid = buffer.ReadShort();
        this._client = this._region.GetClient(clientid);
        this.color = buffer.ReadInt32();
    }

    Send(buffer)
    {
        if (this._client && this._client.ID === this._gameClient.ClientID)
        {
            super.Send(buffer);
            buffer.WriteVector(this.Position);
        }
    }

    ServerSend(buffer)
    {
        super.ServerSend(buffer);
        buffer.WriteVector(this.Position);
    }

    Receive(buffer)
    {
        let pos = buffer.ReadVector();
        if (!this._client || this._client.ID !== this._gameClient.ClientID)
        {
            this._target = pos;
        }
    }

    ServerReceive(buffer)
    {
        this.Position = buffer.ReadVector();
    }
}

require("../Network").RegisterClass(Ship);
module.exports = Ship;
