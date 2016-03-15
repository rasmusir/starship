"use strict";

module.exports = function fill(target, source, targetPrefix)
{
    targetPrefix = targetPrefix || "_";
    for (let p in source)
    {
        if (target[targetPrefix + p] !== undefined)
        {
            target[targetPrefix + p] = source[p];
        }
    }
};
