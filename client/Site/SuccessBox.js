"use strict";

let Box = require("./Box");
/**
 * A Box styled to indicate that something has succeeded
 * @extends Box
 */
class SuccessBox extends Box
{
    /**
     *
     * @param  {string}   message  The massage to be shown
     * @param  {string}   button   The text the button will contain
     * @param  {Function} callback Will be called when the button has been pressed
     */
    constructor(message, button, callback)
    {
        super();
        this.SetSize(500, 300);
        this._div.classList.add("green");
        this.Fetch("message", (err) => {
            if (!err)
            {
                this.$(".message").innerHTML = message;
                this.$("h1").innerHTML = "Success!";
                this.$("button").innerHTML = button;
                this.$("button").onclick = (e) => {
                    e.preventDefault();
                    callback(this);
                };

                this.Show();
            }
        });
    }
}

module.exports = SuccessBox;
