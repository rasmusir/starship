"use strict";

let Box = require("./Box");
let AccountHandler = require("../AccountHandler");

/**
 * An alias creation box
 * @extends Box
 */
class AliasCreationBox extends Box
{
    constructor()
    {
        super();
        this.StartGame = null;
        this.Fetch("createalias", (err) => {

            if (!err)
            {

                this.Show();
            }

            this.ResizeToContent();
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
}

module.exports = AliasCreationBox;
