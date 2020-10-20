var commandList = new Map();
commandList.set("eval", "eval");
commandList.set("dlss", "dlss");
commandList.set("acir", "acir");
commandList.set("upscale", "dlss");
commandList.set("seymour", "seymour");
commandList.set("care", "care");

const prefix = 'a.';

module.exports = {
    executeCommand: function (message) {
        try {

            args = message.content.slice(prefix.length).trimStart().split(/ +/);
            command = args.shift().toLowerCase();
            
            if(commandList.has(command)) {
                console.log("Command is " + command + " Args: \"" + args.join(" ") + "\"");
                var commandFile = require("./" + command);
                commandFile.execute(message, args);

            } else {
                message.channel.send("That's not a command");
                console.log("Command \"" + command + "\" is invalid");
                return;
            }
        } catch(err) {
            message.channel.send("An error occured while executing the command.\n`" + err + "`");
            if(message.author.id == 193950601271443456) {
                message.author.send("Stack trace from your command:```\n" + err.stack + "\n```");
            }
            
        }
        
    },
    restrictToBotOwner: function (message) {
        return message.author.id == 193950601271443456;
    },
    permissionFailure: function (message) {
        message.channel.send("You don't have permission to execute this command");
    }
}


