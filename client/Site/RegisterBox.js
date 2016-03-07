"use strict";

let Box = require("./Box");
let AccountHandler = require("../AccountHandler");


class RegisterBox extends Box
{
    constructor()
    {
        super();
        this.StartGame = null;
        this.Fetch("register", (err) => {

            if (!err)
            {
                this._button = this.$(".button");
                this._button.onclick = (e) => {
                    this.OnRegisterClick(e);
                };

                this.$(".login").onclick = (e) => {
                    e.preventDefault();
                    this.SwitchBox(require("./LoginBox"));
                };

                this.Show();
            }

            this.ResizeToContent();
        });
    }

    OnRegisterClick(e)
    {
        e.preventDefault();
        if (AccountHandler.Signedin)
        {
            return;
        }

        let data = {
            firstname: this.$(".firstname").value,
            lastname: this.$(".lastname").value,
            email: this.$(".email").value,
            password: this.$(".password").value,
            repeatpassword: this.$(".repeat_password").value
        };

        if (!this.Validate(data))
        {
            return;
        }

        AccountHandler.Register(data, (success) => {
            if (success)
            {
                this.SwitchBox(require("./SuccessBox"), "Congratulations on your new account! All you have to do now is sign in and start playing!", "Login", (sb) => {
                    sb.SwitchBox(require("./LoginBox"));
                });
            }
            else
            {
                this.$(".error").innerHTML = ("Email is already registered.");
            }
        });
    }

    Validate(data)
    {
        if (data.firstname.length < 2)
        {
            this.$(".error").innerHTML = "Firstname must be at least two symbols";
            return false;
        }
        if (data.lastname.length < 2)
        {
            this.$(".error").innerHTML = "Lastname must be at least two symbols";
            return false;
        }
        if (!this.ValidateEmail(data.email))
        {
            this.$(".error").innerHTML = "Must be a valid email";
            return false;
        }
        if (data.password.length < 6)
        {
            this.$(".error").innerHTML = "Password must be at least 6 characters long";
            return false;
        }
        if (data.password !== data.repeatpassword)
        {
            this.$(".error").innerHTML = "Passwords do not match";
            return false;
        }

        this.$(".error").innerHTML = " ";
        return true;
    }

    ValidateEmail(email)
    {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}

module.exports = RegisterBox;
