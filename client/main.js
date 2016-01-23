"use strict";

var Ship = require("./ship");

class Test
{
    constructor(name)
    {
        this.name = name;
        this.ship = new Ship();
    }
    sayHello()
    {
        console.log("Hello "+this.name);
        this.ship.fly();
    }
}

var t = new Test();
t.sayHello();
