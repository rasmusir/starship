"use strict";

let $ = document.querySelector.bind(document);
let AccountHandler = require("./AccountHandler");

let GameClient = require("./GameClient");

let LoginBox = require("./Site/LoginBox");

class SiteHandler
{
    constructor()
    {
        
    }

    get Gamearea() { return this._gamearea; }

    Init()
    {
        this._gamearea = $("#gamearea");

        let lb = new LoginBox();
        lb.StartGame = this.StartGame.bind(this);
    }

    StartGame()
    {
        let h = new GameClient(this);
        this._gamearea.classList.add("show");
    }
}

module.exports = new SiteHandler();
