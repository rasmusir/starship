"use strict";

let classes = [];

let Network = {
    OBJECT_CREATE : 1,
    REGION_CHANGE : 100,
    SERVER_MESSAGE : 253,
    CONNECT : 254,
    SERVER_CLOSING : 255
};

Network.RegisterClass = function (Class) {
    Class.NETWORKID = classes.length;
    classes.push(Class);
};

Network.Class = function (id) {
    return classes[id];
};

module.exports = Network;
