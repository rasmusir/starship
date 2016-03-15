"use strict";

let Box = require("../Site/Box");

class Interface extends Box
{
    constructor()
    {
        super();
        this._div.classList.add("nomargin");
        this._div.classList.add("notop");
        this._div.style.width = "100%";
        this._div.style.top = "25px";
        this._div.style.height = "50px";
        this.Fetch("Interface/interface", (err) => {

            this.$("button.findUser").onclick = () => { this.FindUser(); };

            if (!err)
            {
                this.Show();
            }
        });
    }

    FindUser()
    {
        let SB = require("../Site/SuccessBox");
        new SB("Find user!", "Close", (sb) => { sb.Destroy(); });
    }
}

module.exports = Interface;
