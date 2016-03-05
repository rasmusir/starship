"use strict";

let API = require("./ClientApi.js");

class AccountHandler
{
    Init()
    {
        this._signedin = false;
        this._firstname = "";
        this._lastname = "";
        this._id = "";
    }

    get Signedin() { return this._signedin; }

    Login(email, password, callback)
    {

        API.Post("/login", {email: email, password: password}, (res) => {
            if (res.success)
            {
                this._signedin = true;
                this._firstname = res.firstname;
                this._lastname = res.lastname;
                this._id = res.id;
            }
            callback(res.success);
        });
    }
}

module.exports = new AccountHandler();
