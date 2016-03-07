"use strict";

let $ = document.querySelector.bind(document);
/**
 * The baseclass for the box interface
 */
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
    /**
     * Fetches a template from resources/templates to be used inside the Box
     * @param {string}   name     name of the template to fetch
     * @param {Function} callback(err) called when the template has been loaded
     */
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
    /**
     * Sets the size of the Box
     * @param {int} width
     * @param {int} height
     */
    SetSize(width, height)
    {
        this._div.style.width = width + "px";
        this._div.style.height = height + "px";
    }

    /**
     * Sets the size of the Box to perfectly fit the content
     */
    ResizeToContent()
    {
        this._div.style.width = this._content.clientWidth + "px";
        this._div.style.height = this._content.clientHeight + "px";
    }

    Append(child)
    {
        this._div.appendChild(child);
    }
    /**
     * Shows the Box.
     */
    Show()
    {
        $("#interface").appendChild(this._div);
        setTimeout(() => {
            this._div.innerHeight;
            this._div.classList.remove("hide");
        }, 200);
    }
    /**
     * Hides the box
     */
    Hide()
    {
        this._div.classList.add("hide");
    }
    /**
     * Destroyes the box
     * @param {Function} callback called once the box has been destroyed.
     */
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
    /**
     * Destroys the current box. Once the box has been destroyed creates a new {@link Box} of type nextBox
     * @param {Box} nextBox    The {@link Box Boxtype} to open.
     * @param {mixed} ...args the arguments to be passed no the new {@Box}. Comma seperated.
     */
    SwitchBox(Box_, ...args)
    {
        args = args || [];
        this.Destroy(() => {
            new Box_(...args);
        });
    }
}

module.exports = Box;
