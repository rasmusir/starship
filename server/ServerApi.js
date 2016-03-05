"use strict";

let User = require("./DAL/User");

class ServerApi
{
    constructor(app)
    {
        this._app = app;

        app.post("/login", this.Login);
    }

    Login(req, res)
    {
        User.FindByMail(req.body.email, (err, user) => {
            if (err)
            {
                res.send(JSON.stringify({success: false}));
            }
            else {
                user.Unlock(req.body.password, (success) => {
                    if (success)
                    {
                        return res.send(JSON.stringify({success: true, id: user.ID, firstname: user.Firstname, lastname: user.Lastname}));
                    }
                    res.send(JSON.stringify({success: false}));
                });
            }
        });
    }
}

module.exports = ServerApi;
