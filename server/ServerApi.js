"use strict";

let User = require("./DAL/User");

class ServerApi
{
    constructor(app)
    {
        this._app = app;

        app.post("/login", this.Login);
        app.post("/register", this.Register);
    }

    Login(req, res)
    {
        User.FindByMail(req.body.email, (err, user) => {
            if (err || user === null)
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

    Register(req, res)
    {
        User.FindByMail(req.body.email, (err, user) => {
            if (err)
            {
                res.send(JSON.stringify({success: false, error: true}));
            }
            else {
                if (user === null)
                {
                    let d = req.body;
                    User.Create(d.firstname, d.lastname, "2000-01-01", 0, d.email, d.password, (err, id) => {
                        if (err)
                        {
                            return res.send(JSON.stringify({success: false, error: true}));
                        }
                        res.send(JSON.stringify({success: true, id: id}));
                    });
                }
                else
                {
                    res.send(JSON.stringify({success: false}));
                }

            }
        });
    }
}

module.exports = ServerApi;
