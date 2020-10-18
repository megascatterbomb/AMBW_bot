commander = require("./command.js");

function command(message, args) {
    message.channel.send("acir shut the fuck up");
}

module.exports = {
    execute: function (message, args) {
        if(message.author.id == 357675387678883840) { // Acir
            message.channel.send("oi fuck off <@357675387678883840> this command is private property");
        } else {
            command(message, args);
        }
    }
}