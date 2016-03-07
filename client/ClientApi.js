"use strict";
/**
 * The client api class. Communicates with {@link ServerAPi}
 * @namepsace
 */
class ClientApi
{
    /**
     * Makes a POST request to the server. Sends an object as json to the server.
     * @param {string}   url      url to post to
     * @param {object}   data     data to send to the server
     * @param {Function} callback({object}data) the response data
     */
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
