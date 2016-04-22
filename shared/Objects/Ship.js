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
        this._speed = 0;
        this._velocity = new Vector();
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
        //Do we own this ship?
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

            if (Input.Mouse1Down)
            {
                let dir = new Vector(mpos.x - this.Position.X, mpos.y - this.Position.Y, 0);
                this._speed = Math.min(this._speed + 0.01, 1);
                dir.Normalize();
                dir.Multiply(0.01);
                this._velocity.Add(dir);
            }
            else {
                this._velocity.Multiply(0.9);
            }
            //this.Position.X = 0;
            //this.Position.Y = 0;
            this.Region.Space.StarOffset.X = this.Position.X;
            this.Region.Space.StarOffset.Y = this.Position.Y;
            this.Position.X += this._velocity.X;
            this.Position.Y += this._velocity.Y;
            this.Camera.LookAt(this.Position.X, this.Position.Y);
        }
        else {
            this.Position.X += this._velocity.X;
            this.Position.Y += this._velocity.Y;
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
            buffer.WriteVector(this._velocity);
            buffer.WriteVector(this.Position);
        }
    }

    ServerSend(buffer)
    {
        super.ServerSend(buffer);
        buffer.WriteVector(this._velocity);
        buffer.WriteVector(this.Position);
    }

    Receive(buffer)
    {
        let vel = buffer.ReadVector();
        let pos = buffer.ReadVector();
        if (!this._client || this._client.ID !== this._gameClient.ClientID)
        {
            this._velocity = vel;
            //this.Position = pos;
        }
    }

    ServerReceive(buffer)
    {
        this._velocity = buffer.ReadVector();
        buffer.ReadVector();
        //this.Position = buffer.ReadVector();
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
