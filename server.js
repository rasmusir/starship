"use strict";

let express = require("express");
let fs = require("fs");
let bodyparser = require("body-parser");

let app = express();
let server = require("http").createServer(app);

let GameServer = require("./server/GameServer");
let Database = require("./server/DAL/Database");
let User = require("./server/DAL/User");
let Api = require("./server/ServerApi");

app.use(bodyparser.json());
app.use("/resources", express.static("resources"));

let gs = new GameServer(server);
let api = new Api(app);



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
