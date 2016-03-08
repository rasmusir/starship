"use strict";

let API = require("./ClientApi.js");
/**
 * The AccountHandler. Use it to login and Register.
 * @namespace
 */
class AccountHandler
{
    Init()
    {
        this._signedin = false;
        this._firstname = "";
        this._lastname = "";
        this._id = "";
    }
    /**
     * Are you currently logged in?
     */
    get Signedin() { return this._signedin; }
    /**
     * Try to perform a login
     * @param {string}   email    Email to login with
     * @param {string}   password Password to login with
     * @param {Function} callback({bool}success) returns true or false depending on success
     */
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
    /**
     * Try to register an account.
     * <br>The data object should contain:
     * <br>
         <br>&nbsp;firstname: string,
         <br>&nbsp;lastname: string,
         <br>&nbsp;email: string,
         <br>&nbsp;password: string
        <br>
     * @param {object}   data     the data you want to register with.
     * @param {Function} callback({bool}success) returns true or false depending on success
     */
    Register(data, callback)
    {

        API.Post("/register", data, (res) => {
            callback(res.success);
        });
    }
}

module.exports = new AccountHandler();
