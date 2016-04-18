"use strict";

let NetworkObject = require("./NetworkObject");
let Input = require("../client/Input");

class ShipEditor extends NetworkObject
{
    constructor(region)
    {
        super(region);
    }

    OnClient()
    {
        /*
        let grid2 = new THREE.GridHelper( 100, 1 );
        grid2.setColors( 0xffffff, 0x222222 );
        this._region.Scene.add( grid2 );

        let grid = new THREE.GridHelper( 100, 10 );
        grid.setColors( 0x444444, 0x444444 );
        this._region.Scene.add( grid );
        */

        let geometry = new THREE.Geometry();
        geometry.vertices.push( new THREE.Vector3( 0, 0, 0) );
        let material = new THREE.PointsMaterial({size: 10, sizeAttenuation: false});
        this._point = new THREE.Points(geometry, material);

        this._shape = new THREE.Shape();

        this._region.Scene.add(this._point);

        this._first = true;
        this._click = false;
        this._count = 0;
    }

    Tick()
    {
        let pos = getXY(Input.MouseX, Input.MouseY, this._region._renderer.Camera._camera);
        pos.x = Math.round(pos.x);
        pos.y = Math.round(pos.y);
        this._point.position.x = pos.x;
        this._point.position.y = pos.y;

        if (Input.Mouse1Down)
        {
            if (!this._click)
            {
                console.log(pos);
                if (this._first)
                {
                    this._shape.moveTo(pos.x, pos.y, 0);
                    this._first = false;
                }
                else
                {
                    this._shape.lineTo(pos.x, pos.y, 0);
                }
                this._count++;

                if (this._count >= 2)
                {
                    let points = this._shape.createPointsGeometry();
                    let line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: 0x00ffff, linewidth: 5 } ) );
                    if (this._current)
                    {
                        this._region.Scene.remove(this._current);
                    }
                    this._region.Scene.add(line);
                    this._current = line;
                }
            }
            this._click = true;
        }
        else {
            this._click = false;
        }

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

module.exports = ShipEditor;
