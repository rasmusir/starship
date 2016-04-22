"use strict";

let Box = require("../Site/Box");

class Chat extends Box
{
    constructor(socket)
    {
        super();

        this.Fetch("Interface/chat", (err) => {

            this.div = this.$("div");
            this.input = this.$("input");

            this.input.addEventListener("keydown", this._handleEnter.bind(this));

            socket.on("chat", this._handleMessage.bind(this));
            this.socket = socket;
            if (!err)
            {
                this.Show();
                this.ResizeToContent();
            }
        });
    }

    _handleEnter(e)
    {
        if (e.keyCode === 13 && this.input.value.length > 0)
        {
            e.preventDefault();
            this.socket.emit("chat", {message:this.input.value});
            this.input.value = "";
        }
    }

    _handleMessage(data)
    {
        this.Write(data.message, data.color, data.sender, "red");
    }

    Write(text, color, prefix, prefixColor)
    {
        let nDiv = document.createElement("div");
        if (prefix)
        {
            let pSpan = document.createElement("span");
            pSpan.appendChild(document.createTextNode(prefix + " "));
            pSpan.style.color = prefixColor;
            nDiv.appendChild(pSpan);
        }
        let span = document.createElement("span");
        span.appendChild(document.createTextNode(text));
        span.style.color = color;
        nDiv.appendChild(span);
        this.div.appendChild(nDiv);
        this.div.scrollTop = this.div.scrollHeight;
    }
}

module.exports = Chat;
