"use strict";

let db = require("./Database.js");
let bc = require("bcrypt-nodejs");
let SALT_WORK_FACTOR = 10;

class User
{
    constructor()
    {
        this._id = null;
        this._firstname = null;
        this._lastname = null;
        this._birthday = null;
        this._sex = null;
        this._joindate = null;
        this._lastonline = null;
        this._email = null;
        this._password = null;
    }

    get ID() { return this._id; }
    get Firstname() { return this._firstname; }
    get Lastname() { return this._lastname; }

    Unlock(password, callback)
    {
        bc.compare(password, this._password, (err, res) => {
            if (err)
            {
                return callback(false);
            }
            callback(res);
        });
    }

    static Get(id)
    {

    }

    static FindByMail(mail, callback)
    {
        db.query('SELECT * FROM users WHERE email="' + mail + '" LIMIT 1', (err, rows) => {
            if (err)
            {
                return callback(err);
            }
            if (rows.length === 0)
            {
                return callback(null, null);
            }
            let user = new User();
            fill(user, rows[0]);
            return callback(null, user);
        });
    }

    static Find(name)
    {

    }

    static Create(firstname, lastname, birthday, sex, email, password, callback)
    {
        bc.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            if (err)
            {
                return callback(err);
            }

            bc.hash(password, salt, (data) => { console.log("progress: " + data); }, (err, hash) => {
                if (err)
                {
                    return callback(err);
                }

                db.query("INSERT INTO users SET ?", { firstname: firstname, lastname: lastname, birthday: birthday, sex: sex, email: email, password: hash }, (err, res) => {
                    if (err)
                    {
                        return callback(err);
                    }
                    return callback(null, res.insertId);
                });
            });
        });
    }
}

function fill(target, source)
{
    for (let p in source)
    {
        if (target["_" + p] !== undefined)
        {
            target["_" + p] = source[p];
        }
    }
}

module.exports = User;
