"use strict";

class ClientApi
{
    Post(url, data, callback)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("content-type", "application/json");

        xhr.onload = () => {
            callback(JSON.parse(xhr.responseText));
        };

        xhr.send(JSON.stringify(data));
    }
}

module.exports = new ClientApi();
