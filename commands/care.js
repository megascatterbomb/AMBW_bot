const { Message, MessageAttachment } = require("discord.js");

commander = require("./command.js");

function command(message, args) {
    message.channel.send("" , {files: ["./commands/care.jpg"]});
}

module.exports = {
    execute: function (message, args) {
        command(message, args);
    }
}