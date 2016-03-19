"use strict";

let mysql = require("mysql");
let connected = false;

let db;
let conf = {
    database : "sql7109450",
    user : "sql7109450",
    password : "d5A99UeSWD",
    host : "sql7.freemysqlhosting.net"
};

let ex = {query: null};

function handleDisconnect() {
    db = mysql.createConnection(conf);
    ex.query = db.query.bind(db);
    db.connect( (err) => {
        if (err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    db.on('error', (err) => {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST')
        {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = ex;
