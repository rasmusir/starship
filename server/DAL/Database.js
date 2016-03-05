"use strict";

let mysql = require("mysql");
let connected = false;

let db = mysql.createConnection({
    database : "sql7109450",
    user : "sql7109450",
    password : "d5A99UeSWD",
    host : "sql7.freemysqlhosting.net"
});

module.exports = db;
