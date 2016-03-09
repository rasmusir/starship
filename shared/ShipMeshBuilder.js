"use strict";

class ShipMeshBuilder
{
    constructor()
    {

    }

    Build(blueprint, offset, size)
    {
        size = size || 1;
        let cubes = [];
        for (let x = 0; x < blueprint.MaxWidth; x++)
        {
            for (let y = 0; y < blueprint.MaxLength; y++)
            {
                for (let z = 0; z < blueprint.MaxHeight; z++)
                {
                    if (blueprint.Get(x, y, z) !== 0)
                    {
                        cubes.push({vertices: this.Vertices(x + offset.X, y + offset.Y, z + offset.Z, size), normals: this.Normals()});
                    }
                }
            }
        }

        let vertices = new Float32Array(cubes.length * 72);
        let indices = new Uint32Array(cubes.length * 36);
        let normals = new Float32Array(cubes.length * 72);
        let vi = 0;
        let ii = 0;
        let vc = 0;

        cubes.forEach((q) => {
            vertices.set(q.vertices, vi);
            this.Indices(indices, ii, vc);
            normals.set(q.normals, vi);

            vi += q.vertices.length;
            vc += q.vertices.length / 3;
            ii += 36;
        });


        let geometry = new THREE.BufferGeometry();
        geometry.setIndex(new THREE.BufferAttribute(indices, 1));
        geometry.addAttribute("position", new THREE.BufferAttribute(vertices, 3));
        geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
        let mat = new THREE.MeshNormalMaterial({color: 0xff0000, side: THREE.DoubleSided});
        let mesh = new THREE.Mesh(geometry, mat);

        return mesh;
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
