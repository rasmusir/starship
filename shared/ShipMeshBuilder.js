"use strict";

class ShipMeshBuilder
{
    constructor()
    {

    }

    Build(blueprint, center, size, callback)
    {
        size = size || 1;

        let worker = new Worker("/resources/scripts/ShipBuilderWorker.js");

        worker.onmessage = (e) => {
            let data = e.data;
            let geometry = new THREE.BufferGeometry();
            geometry.setIndex(new THREE.BufferAttribute(data.indices, 1));
            geometry.addAttribute("position", new THREE.BufferAttribute(data.vertices, 3));
            geometry.addAttribute("normal", new THREE.BufferAttribute(data.normals, 3));
            let mat = new THREE.MeshNormalMaterial({color: 0xff0000, side: THREE.DoubleSided});
            let mesh = new THREE.Mesh(geometry, mat);

            callback(data.err, mesh);
        };

        worker.postMessage({do: "build", width: blueprint.MaxWidth, height: blueprint.MaxHeight, length: blueprint.MaxLength, blueprintData: blueprint._parts, size: size, center: center});
    }

    Vertices(x, y, z, s)
    {
        s = s || 1;
        return [
            x, y, z,
            x + s, y, z,
            x, y + s, z,
            x + s, y + s, z,

            x, y + s, z + s,
            x, y + s, z,
            x + s, y + s, z,
            x + s, y + s, z + s,

            x + s, y + s, z + s, x + s , y + s, z, x + s, y, z, x + s, y, z + s,
            x + s, y, z + s, x + s, y, z, x, y, z, x, y, z + s,
            x, y, z + s, x, y, z, x, y + s, z, x, y + s, z + s,
            x, y, z + s, x, y + s, z + s, x + s, y + s, z + s, x + s, y, z + s,

        ];
    }

    Normals()
    {
        return [
            0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1,
            0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
            1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
            0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
            -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1
        ];
    }

    Indices(indices, indexOffset, vertexOffset)
    {
        let vo = vertexOffset - 1;
        indices.set([
            vo + 3, vo + 2, vo + 1,
            vo + 2, vo + 3, vo + 4,

            vo + 7, vo + 6, vo + 5,
            vo + 8, vo + 7, vo + 5,

            vo + 11, vo + 10, vo + 9,
            vo + 12, vo + 11, vo + 9,

            vo + 15, vo + 14, vo + 13,
            vo + 16, vo + 15, vo + 13,

            vo + 19, vo + 18, vo + 17,
            vo + 20, vo + 19, vo + 17,

            vo + 23, vo + 22, vo + 21,
            vo + 24, vo + 23, vo + 21,
        ], indexOffset);

    }
}

module.exports = ShipMeshBuilder;
