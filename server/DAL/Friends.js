"use strict";

let db = require("./Database.js");
let fill = require("./Fill");

class Friends
{
    static Fetch(aliasID)
    {
        let friends = [];
        db.query("SELECT * FROM aliases a LEFT JOIN friends f ON a.id = f.idb WHERE f.ida = " + aliasID, (err, rows) => {

        });
    }

    static Add(aliasID, friendID)
    {

    }
}

module.exports = Friends;
