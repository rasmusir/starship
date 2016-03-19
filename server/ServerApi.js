"use strict";

let User = require("./DAL/User");
let Alias = require("./DAL/Alias");
/**
 * The server REST api
 */
class ServerApi
{
    constructor(app)
    {
        this._app = app;

        app.post("/login", this.Login);
        app.post("/register", this.Register);
        app.get("/alias", this.GetAlias);
        app.get("/alias/select/:id", this.SelectAlias);
    }

    Login(req, res)
    {
        User.FindByMail(req.body.email, (err, user) => {
            if (err || user === null)
            {
                res.send({success: false});
            }
            else {
                user.Unlock(req.body.password, (success) => {
                    if (success)
                    {
                        req.session.user = user;
                        return res.send({success: true, id: user.ID, firstname: user.Firstname, lastname: user.Lastname});
                    }
                    res.send({success: false});
                });
            }
        });
    }

    Register(req, res)
    {
        User.FindByMail(req.body.email, (err, user) => {
            if (err)
            {
                res.send({success: false, error: true});
            }
            else {
                if (user === null)
                {
                    let d = req.body;
                    User.Create(d.firstname, d.lastname, "2000-01-01", 0, d.email, d.password, (err, id) => {
                        if (err)
                        {
                            return res.send({success: false, error: true});
                        }
                        res.send({success: true, id: id});
                    });
                }
                else
                {
                    res.send({success: false});
                }

            }
        });
    }

    GetAlias(req, res)
    {
        if (req.session.user)
        {
            Alias.GetByUserID(req.session.user.ID, (err, alias) => {
                if (err)
                {
                    console.error(err);
                    return res.sendStatus(500);
                }

                if (alias == null)
                {
                    return res.send({success: true, alias: null});
                }

                return res.send({success: true, alias: {id: alias.ID, firstname: alias.Firstname, lastname: alias.Lastname}});
            });
        }
        else {
            return res.sendStatus(401);
        }
    }

    SelectAlias(req, res)
    {

    }
}

module.exports = ServerApi;
