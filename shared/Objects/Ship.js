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
        this._region = region;
        this.Position.X = 1 - Math.random() * 2;
        this.Position.Y = 1 - Math.random() * 2;
        this.color = 0xffffff * Math.random();

        this.t = 0;
        this._speed = Math.random();
        this._target = new Vector();
        this._client = null;
    }

    OnClient()
    {
        let smb = new ShipMeshBuilder();
        let bp = new Blueprint();

        bp.Set(3, 0, 0, 1);
        bp.Set(4, 0, 0, 1);
        bp.Set(3, 1, 0, 1);
        bp.Set(4, 1, 0, 1);
        bp.Set(3, 2, 0, 1);
        bp.Set(4, 2, 0, 1);
        bp.Set(3, 3, 0, 1);
        bp.Set(4, 3, 0, 1);
        bp.Set(3, 4, 0, 1);
        bp.Set(4, 4, 0, 1);
        bp.Set(3, 5, 0, 1);
        bp.Set(4, 5, 0, 1);

        bp.Set(0, 5, 0, 1);
        bp.Set(1, 5, 0, 1);
        bp.Set(2, 5, 0, 1);
        bp.Set(0, 6, 0, 1);
        bp.Set(1, 6, 0, 1);
        bp.Set(2, 6, 0, 1);
        bp.Set(0, 7, 0, 1);
        bp.Set(1, 7, 0, 1);
        bp.Set(2, 7, 0, 1);

        bp.Set(5, 5, 0, 1);
        bp.Set(6, 5, 0, 1);
        bp.Set(7, 5, 0, 1);
        bp.Set(5, 6, 0, 1);
        bp.Set(6, 6, 0, 1);
        bp.Set(7, 6, 0, 1);
        bp.Set(5, 7, 0, 1);
        bp.Set(6, 7, 0, 1);
        bp.Set(7, 7, 0, 1);

        smb.Build(bp, new Vector(4, 4, 0.5), 1, (err, mesh) => {
            this._mesh = mesh;
            this._mesh.scale.set(0.05, 0.05, 0.05);
            this._scene.add(this._mesh);
        });
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
            let mpos = getXY(Input.MouseX, Input.MouseY, this._region._renderer.Camera._camera);

            if (this._mesh)
            {

                let deltaX = mpos.x - this._mesh.position.x;
                let deltaY = mpos.y - this._mesh.position.y;

                let ang = Math.atan2(deltaY, deltaX);

                this._mesh.rotation.z = ang + Math.PI / 2;
            }

            //this.Position.X -= (this.Position.X - mpos.x) / 10;//+= Input.Right * 0.05 - Input.Left * 0.05;
            //this.Position.Y -= (this.Position.Y - mpos.y) / 10;//+= Input.Up * 0.05 - Input.Down * 0.05;
        }
        else {
            this.Position.X += (this._target.X - this.Position.X) / 10;
            this.Position.Y += (this._target.Y - this.Position.Y) / 10;
        }
        if (this._mesh)
        {

            this._mesh.position.set(...this.Position.ToArray()); //.set( ...this.Position.ToArray() );
        }
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

function getXY(cX, cY, camera)
{
    let raycaster = new THREE.Raycaster();
    let planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let mv = new THREE.Vector2( (cX / window.innerWidth) * 2 - 1, -(cY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(mv, camera);
    let pos = raycaster.ray.intersectPlane(planeZ);

    return pos;
}

require("../Network").RegisterClass(Ship);
module.exports = Ship;
