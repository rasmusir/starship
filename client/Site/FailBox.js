"use strict";

let Box = require("./Box");

class FailBox extends Box
{
    constructor(message, button, callback)
    {
        super();
        this.SetSize(500, 300);
        this._div.classList.add("red");
        this.Fetch("message", (err) => {
            if (!err)
            {
                this.$(".message").innerHTML = message;
                this.$("h1").innerHTML = "Failure!";
                this.$("button").innerHTML = button;
                this.$("button").onclick = (e) => {
                    e.preventDefault();
                    callback(this);
                };

                this.Show();
            }
        });
    }
}

module.exports = FailBox;
