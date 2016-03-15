"use strict";

self.addEventListener("message", (e) => {
    let data = e.data;
    if (data.do === "build")
    {
        let w = data.width;
        let h = data.height;
        let l = data.length;
        let bpd = data.blueprintData;
        let size = data.size;
        let offset = data.center;

        let cubes = [];

        for (let x = 0; x < w; x++)
        {
            for (let y = 0; y < l; y++)
            {
                for (let z = 0; z < h; z++)
                {
                    if (bpd[(x) + (y * w) + (z * w * l)] !== 0)
                    {
                        cubes.push({vertices: Vertices(x - offset.X, y - offset.Y, z - offset.Z, size), normals: Normals()});
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
            Indices(indices, ii, vc);
            normals.set(q.normals, vi);

            vi += q.vertices.length;
            vc += q.vertices.length / 3;
            ii += 36;
        });

        postMessage({err:null, vertices:vertices, indices: indices, normals: normals});
        self.close();
    }
});

function Vertices(x, y, z, s)
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

function Normals()
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

function Indices(indices, indexOffset, vertexOffset)
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
