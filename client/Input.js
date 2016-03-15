"use strict";
/**
 * It handles all the input from gamepad, touch, keyboard and mouse.
 * @namespace
 * @property {bool} Left Is the player pressing Left?
 * @property {bool} Right Is the player pressing Right?
 */
class Input
{
    constructor()
    {
        let int = window.setInterval(() => {
            let canvas = document.querySelector("canvas");
            if (canvas)
            {
                window.clearInterval(int);
                document.addEventListener("keydown", (event) => {
                    switch (event.keyCode)
                    {
                        case 37: {
                            this.Left = true;
                            break;
                        }
                        case 38: {
                            this.Up = true;
                            break;
                        }
                        case 39: {
                            this.Right = true;
                            break;
                        }
                        case 40: {
                            this.Down = true;
                            break;
                        }
                    }
                });

                document.addEventListener("keyup", (event) => {
                    switch (event.keyCode)
                    {
                        case 37: {
                            this.Left = false;
                            break;
                        }
                        case 38: {
                            this.Up = false;
                            break;
                        }
                        case 39: {
                            this.Right = false;
                            break;
                        }
                        case 40: {
                            this.Down = false;
                            break;
                        }
                    }
                });

                document.addEventListener("mousemove", (event) => {
                    this.MouseX = event.clientX;
                    this.MouseY = event.clientY;
                });
            }
        }, 500);

        this.Left = false;
        this.Right = false;
        this.Up = false;
        this.Down = false;

        this.MouseX = 0;
        this.MouseY = 0;
    }
}

if (process.browser)
{
    module.exports = new Input();
}
else {
    module.exports = null;
}
