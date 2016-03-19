"use strict";

let $ = document.querySelector.bind(document);
let topZ = 101;
let currentDragged = null, offsetX, offsetY;

window.addEventListener("mouseup", (e) => {
    if (currentDragged)
    {
        currentDragged = null;
    }
});

window.addEventListener("mousemove", (e) => {
    if (currentDragged)
    {
        e.preventDefault();
        currentDragged._move(e.clientX, e.clientY);
    }
});

/**
 * The baseclass for the box interface
 */
class Box
{
    constructor()
    {
        this._div = document.createElement("div");
        this._div.classList.add("box");
        this._top = document.createElement("div");
        this._top.classList.add("top");
        this._disabler = document.createElement("div");
        this._disabler.classList.add("disabler");

        this._div.classList.add("show");

        this._top.onmousedown = (e) => { e.preventDefault(); this._pickUp(e.clientX, e.clientY); };
        this._div.onmousedown = (e) => { if (!this._disabled) { this._moveToFront(); } };

        this._div.style.zIndex = topZ;
        topZ++;

        this._content = document.createElement("div");
        this._content.classList.add("content");

        this._div.appendChild(this._top);
        this._div.appendChild(this._content);
        this.$ = this._content.querySelector.bind(this._content);
        this._div.appendChild(this._disabler);

        this._disabled = false;
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
        this._div.style.height = (this._content.clientHeight + this._top.clientHeight) + "px";
    }

    _pickUp(x, y)
    {
        currentDragged = this;
        offsetX = x - this._div.offsetLeft;
        offsetY = y - this._div.offsetTop;
    }

    _move(x, y)
    {
        this._div.style.left = Math.max((x - offsetX), this._div.clientWidth / 2) + "px";
        this._div.style.top = Math.max((y - offsetY), this._div.clientHeight / 2) + "px";
    }

    _moveToFront()
    {
        this._div.style.zIndex = topZ;
        topZ++;
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

            let destroy = () => {
                this._div.removeEventListener("animationend", destroy);
                this._div.classList.remove("show");
            };

            this._div.addEventListener("animationend", destroy );
            this._div.classList.add("show");
        }, 200);
    }
    /**
     * Hides the box
     */
    Hide()
    {
        this._div.classList.add("hide");
        this._div.classList.remove("show");
    }

    /**
     * Flashes the box
     */
    Flash()
    {

        let destroy = () => {
            this._div.removeEventListener("animationend", destroy);
            this._div.classList.remove("flash");
        };

        this._div.addEventListener("animationend", destroy );
        this._div.classList.add("flash");
    }

    Disable()
    {
        this._div.classList.add("disabled");
        this._disabled = true;
    }

    Enable()
    {
        this._div.classList.remove("disabled");
        this._disabled = false;
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
        this._div.classList.remove("show");
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
