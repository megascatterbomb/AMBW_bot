commander = require("./command.js");

function command(message, args) {
    allargs = args.join(" ");
    result = eval(allargs);
    message.channel.send("`" + result + "`");
    console.log("Result is " + result + "\n");
}

module.exports = {
    execute: function (message, args) {
        if(commander.restrictToBotOwner(message)) {
            command(message, args);
        } else if(args.join("").includes("process.exit")) {
            message.channel.send("Nice try bitch");
        } else {
            commander.permissionFailure(message);
        }
    }
}