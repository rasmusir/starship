"use strict";

let express = require("express");
let fs = require("fs");
var app = express();

app.use(express.static("static"));

app.get("/", function(req, res){
    fs.readFile("index.html", function(err, data) {
        if (err)
        {
            throw err;
        }
        res.send(data.toString());
    });
});

app.listen(8080);