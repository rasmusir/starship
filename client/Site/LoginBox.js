"use strict";

let Box = require("./Box");
let AccountHandler = require("../AccountHandler");
let RegisterBox = require("./RegisterBox");
/**
 * A login box
 * @extends Box
 */
class LoginBox extends Box
{
    constructor()
    {
        super();
        this.SetSize(500, 300);
        this.Fetch("login", (err) => {
            if (!err)
            {
                this.$(".login_button").onclick = (e) => { this.OnLoginClick(e); };
                this.$(".register").onclick = (e) => {
                    e.preventDefault();
                    this.SwitchBox(RegisterBox);
                };

                this.Show();
            }
        });
    }

    OnLoginClick(e)
    {
        e.preventDefault();
        if (AccountHandler.Signedin)
        {
            this.Destroy();
            return;
        }

        AccountHandler.Login(this.$(".login_email").value, this.$(".login_password").value, (success) => {
            if (success)
            {
                this.Destroy();
                require("../SiteHandler").StartGame();
            }
            else
            {
                this.Disable();
                let FB = require("./FailBox");
                new FB("Email and password does not match.", "OK.", (fb) => { fb.Destroy(); this.Enable(); });
            }
        });
    }
}

module.exports = LoginBox;
