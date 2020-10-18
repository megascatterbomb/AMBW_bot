const { Message, MessageAttachment } = require("discord.js");

commander = require("./command.js");

function command(message, args) {
    message.channel.send("Contacting David Seymour...")
    message.channel.send("" , {files: ["./commands/seymour.mp4"]});
}

module.exports = {
    execute: function (message, args) {
        command(message, args);
    }
}