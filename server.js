"use strict";

let express = require("express");
let fs = require("fs");
var app = express();

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

app.listen(8080);
