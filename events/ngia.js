const { Message, MessageAttachment } = require("discord.js");

eventHandler = require("./event.js");

module.exports = {
    execute: function (message) {
            message.channel.send("", {files: ["./events/ngia.png"]});
    }
}