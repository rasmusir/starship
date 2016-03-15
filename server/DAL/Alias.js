"use strict";

class Alias
{
    constructor()
    {
        this._id;
        this._firstname;
        this._lastname;
    }

    /**
     * The alias ID
     */
    get ID() { return this._id; }
    /**
     * The alias firstname
     */
    get Firstname() { return this._firstname; }
    /**
     * The alias lastname
     */
    get Lastname() { return this._lastname; }

    GetByUserID()
    {

    }

    Get(id)
    {
        db.query('SELECT * FROM aliases WHERE id="' + id + '" LIMIT 1', (err, rows) => {
            if (err)
            {
                return callback(err);
            }
            if (rows.length === 0)
            {
                return callback(null, null);
            }
            let alias = new Alias();
            fill(alias, rows[0]);
            return callback(null, alias);
        });
    }

    /**
     * Finds an alias by firstname or lastname.
     * @param {string}   name     the name to search for
     * @param {Function} callback(err,user[]) returns the aliases, or null if no alias was found
     */
    static Find(name)
    {
        db.query('SELECT * FROM aliases WHERE firstname LIKE "' + name + '" OR lastname LIKE "' + name + '" LIMIT 20', (err, rows) => {
            if (err)
            {
                return callback(err);
            }
            if (rows.length === 0)
            {
                return callback(null, null);
            }

            let aliases = [];
            rows.forEach((r) => {
                let a = new Alias();
                fill(a, r);
                users.push(a);
            });

            return callback(null, aliases);
        });
    }

    Create(userID)
    {
        db.query("INSERT INTO aliases SET ?", { firstname: firstname, lastname: lastname, userid: userID}, (err, res) => {
            if (err)
            {
                return callback(err);
            }
            return callback(null, res.insertId);
        });
    }

}

moudle.exports = Alias;
