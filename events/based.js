prob = 5;

eventHandler = require("./event.js");

module.exports = {
    execute: function (message) {
        if(eventHandler.probability(prob)) {
            message.channel.send("https://www.youtube.com/watch?v=mp8nG6iWrnw");
        }
    }
}