"use strict";

let Box = require("../Site/Box");

class Chat extends Box
{
    constructor()
    {
        super();

        this.Fetch("Interface/chat", (err) => {

            if (!err)
            {
                this.Show();
            }
        });
    }
}

module.exports = Chat;
