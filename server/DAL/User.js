"use strict";

let db = require("./Database.js");
let bc = require("bcrypt-nodejs");
let fill = require("./Fill");
let SALT_WORK_FACTOR = 10;

/**
 * The User class represents a user from the databse
 */
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
    /**
     * The user ID
     */
    get ID() { return this._id; }
    /**
     * The user's firstname
     */
    get Firstname() { return this._firstname; }
    /**
     * The user's lastname
     */
    get Lastname() { return this._lastname; }

    /**
     * Performs a password test.
     * @param {string}   password the password to unlock with
     * @param {Function} callback(bool) returns wether the test was a success
     */
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

    /**
     * Finds a user by an email address
     * @param {string}   mail     the email to search for
     * @param {Function} callback(err,user) returns the user, or null if no user was found
     */
    static FindByMail(mail, callback)
    {
        db.db.query('SELECT * FROM users WHERE email="' + mail + '" LIMIT 1', (err, rows) => {
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
    /**
     * Finds a user by firstname or lastname.
     * @param {string}   name     the name to search for
     * @param {Function} callback(err,user[]) returns the users, or null if no user was found
     */
    static Find(name)
    {
        db.db.query('SELECT * FROM users WHERE firstname LIKE "' + name + '" OR lastname LIKE "' + name + '" LIMIT 20', (err, rows) => {
            if (err)
            {
                return callback(err);
            }
            if (rows.length === 0)
            {
                return callback(null, null);
            }

            let users = [];
            rows.forEach((r) => {
                let u = new User();
                fill(u, r);
                users.push(u);
            });

            return callback(null, users);
        });
    }
    /**
     * Create a new user and put her in the databse
     * @param {string}   firstname The user's firstname
     * @param {string}   lastname  The user's firstname
     * @param {string}   birthday  The user's birthday formatted as DD-MM-YYYY
     * @param {int}      sex       The user's sex, 0 for male and 1 for female
     * @param {string}   email     The user's email
     * @param {string}   password  The user's desired password
     * @param {Function} callback(err,userID)  Returns the new users ID on success.
     */
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

                db.db.query("INSERT INTO users SET ?", { firstname: firstname, lastname: lastname, birthday: birthday, sex: sex, email: email, password: hash }, (err, res) => {
                    if (err)
                    {
                        return callback(err);
                    }
                    return callback(null, res.insertId);
                });
            });
        });
    }

    /**
     * Create's the user table
     */
    static CreateTable(callback)
    {
        db.db.query(`
            CREATE TABLE IF NOT EXISTS 'users' (
              'id' int(10) unsigned NOT NULL AUTO_INCREMENT,
              'firstname' varchar(20) NOT NULL,
              'lastname' varchar(20) NOT NULL,
              'birthday date DEFAULT NULL,
              'sex' tinyint(20) unsigned NOT NULL,
              'joindate' timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
              'lastonline' datetime NOT NULL,
              'email' varchar(45) NOT NULL,
              'password' char(60) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
              PRIMARY KEY ('id'),
              UNIQUE KEY 'id' ('id')
            ) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;
        `, (err, res) => {
            if (err)
            {
                return callback(err);
            }
            callback(null);
        });
    }
}


module.exports = User;
