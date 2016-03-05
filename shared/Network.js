"use strict";

let classes = [];

let Network = {
    CLIENT_UPDATE : 1,
    CLIENT_MESSAGE: 2,
    REGION_CHANGE : 100,
    REGION_TICK : 101,
    REGION_CREATE_OBJECT : 102,
    REGION_DELETE_OBJECT : 102,
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
