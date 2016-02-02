"use strict";

let express = require("express");
let fs = require("fs");
let app = express();
let GameServer = require("./server/GameServer");
let server = require("http").createServer(app);
let gs = new GameServer(server);

app.use("/resources", express.static("resources"));

app.get("/", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        if (err)
        {
            throw err;
        }
        res.send(data.toString());
    });
});


server.listen(8080);
