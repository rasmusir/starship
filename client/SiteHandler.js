"use strict";

let $ = document.querySelector.bind(document);
let AccountHandler = require("./AccountHandler");

let GameClient = require("./GameClient");

class SiteHandler
{
    constructor()
    {
        this.Init();
    }

    get Gamearea() { return this._gamearea; }

    Init()
    {
        this._gamearea = $("#gamearea");

        this._loginbutton = $("#login_button");
        this._loginbutton.onclick = (e) => { this.OnLoginClick(e); };
    }

    StartGame()
    {
        let h = new GameClient(this);
    }

    OnLoginClick(e)
    {
        e.preventDefault();
        if (AccountHandler.Signedin)
        {
            return;
        }

        AccountHandler.Login($("#login_email").value, $("#login_password").value, (success) => {
            if (success)
            {
                this.StartGame();
                $("#loginform").classList.add("away");
                this._gamearea.classList.add("show");
            }
            else
            {
                alert("Email and password does not match.");
            }
        });
    }
}

module.exports = SiteHandler;
