"use strict";

let API = require("./ClientApi.js");
/**
 * The AccountHandler. Use it to login and Register.
 * @namespace
 */
class AliasHandler
{
    Init()
    {
        this._userid = false;
        this._firstname = "";
        this._lastname = "";
        this._id = "";
    }

    /**
     * Try to perform a login
     * @param {string}   email    Email to login with
     * @param {string}   password Password to login with
     * @param {Function} callback({bool}success) returns true or false depending on success
     */
    Activate(email, password, callback)
    {

        API.Post("/alias", {email: email, password: password}, (res) => {
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
    /**
     * Try to create an alias.
     * <br>The data object should contain:
     * <br>
         <br>&nbsp;firstname: string
         <br>&nbsp;lastname: string
         <br>&nbsp;userid: string
        <br>
     * @param {object}   data     the data you want to create an alias with.
     * @param {Function} callback({bool}success) returns true or false depending on success
     */
    Create(data, callback)
    {

        API.Post("/alias/register", data, (res) => {
            callback(res.success);
        });
    }
}

module.exports = new AliasHandler();
