commander = require("./command.js");

waitingFishies = [];

function command(message, args) {
    var interval = 60000;
    if(args[0] == "stop") {
        waitingFishies.forEach(element => {
            clearTimeout(element);
        });
        message.channel.send("Stopped pinging <@252157878318792704>");
        return;
    }
    if(!isNaN(args[1])){
        interval = args[1] * 1000;
    }
    message.channel.send("<@252157878318792704>");
        for(i = 1; i < args[0]; i++) {
        waitingFishies.push(setTimeout(() => {
            message.channel.send("<@252157878318792704>");
        }, i * interval));
    }
}

module.exports = {
    execute: function (message, args) {
        if(commander.restrictToBotOwner(message)) {
            command(message, args);
        } else {
            commander.permissionFailure(message);
        }
    }
}