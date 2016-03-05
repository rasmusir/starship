"use strict";

class Input
{
    constructor()
    {
        window.addEventListener("load", () => {
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
                }
            });
        }, 100);

        this.Left = false;
        this.Right = false;
        this.Up = false;
        this.Down = false;
    }
}
if (process.browser)
{
    module.exports = new Input();
}
else {
    module.exports = null;
}
