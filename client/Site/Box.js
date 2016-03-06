"use strict";

let $ = document.querySelector.bind(document);

class Box
{
    constructor()
    {
        this._div = document.createElement("div");
        this._div.classList.add("box");
        //this._div.classList.add("hide");

        this._content = document.createElement("div");
        this._content.classList.add("content");

        this._div.appendChild(this._content);
        this.$ = this._content.querySelector.bind(this._content);
    }

    Fetch(name, callback)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "/resources/templates/" + name + ".html");
        xhr.onload = () => {
            this._content.innerHTML = xhr.responseText;
            if (callback)
            {
                callback(null);
            }
        };
        xhr.onerror = () => {
            callback(new Error(xhr.error));
        };
        xhr.send();
    }

    SetSize(width, height)
    {
        this._div.style.width = width + "px";
        this._div.style.height = height + "px";
    }

    ResizeToContent()
    {
        this._div.style.width = this._content.clientWidth + "px";
        this._div.style.height = this._content.clientHeight + "px";
    }

    Append(child)
    {
        this._div.appendChild(child);
    }

    Show()
    {
        $("#interface").appendChild(this._div);
        setTimeout(() => {
            this._div.innerHeight;
            this._div.classList.remove("hide");
        }, 200);
    }

    Hide()
    {
        this._div.classList.add("hide");
    }

    Destroy(callback)
    {
        let destroy = () => {
            this._div.parentElement.removeChild(this._div);
            this._div.removeEventListener("animationend", destroy);
            if (callback)
            {
                callback();
            }
        };

        this._div.addEventListener("animationend", destroy );
        this._div.classList.add("hide");
    }

    SwitchBox(Box_, ...args)
    {
        args = args || [];
        this.Destroy(() => {
            new Box_(...args);
        });
    }
}

module.exports = Box;
