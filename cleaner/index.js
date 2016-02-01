"use strict";


var fs = require("fs");
var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

var current = 0;
var keep = true;
var justfound = false;
var isComment = false;
var text = "";

rl.on("line", (line) => {

    if (/@server/i.test(line))
    {
        keep = false;
        justfound = true;
    }

    if (!keep)
    {
        for (let i = 0; i<line.length; i++)
        {
            if (line.substr(i, 2) === "/*")
            {
                i++;
                isComment = true;
                continue;
            }
            if (line.substr(i, 2) === "*/")
            {
                i++;
                isComment = false;
            }
            if (!isComment && line.charAt(i) === "{")
            {
                justfound = false;
                current++;
                continue;
            }
            else if (!isComment && line.charAt(i) === "}")
            {
                justfound = false;
                current--;
                continue;
            }
        }
    }

    if (keep && !justfound)
    {
        console.log(line);
    }
    else if (current === 0 && !keep && !justfound) {
        keep = true;
    }
});
