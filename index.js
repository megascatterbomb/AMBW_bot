const Discord = require('discord.js');

global.client = new Discord.Client();

const prefix = 'a.';

const testMode = false; // If true, commands will only be executed on the test server.
const testServerID = 574157660488859668;

console.log("AMBW_bot Started");

client.on('message', message => {

    const events = require("./events/event");
    events.executeEvent(message);


    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    console.log("Incoming command from " + message.author.username + " in " + message.channel.name + " on " + message.guild.name);
    if(testMode && message.guild.id != testServerID) {
        console.log("Command was rejected as the bot is in test mode\n");
        message.channel.send("This bot is in test mode and is not accepting commands from this server.");
        return;
    }
    const command = require("./commands/command");
    command.executeCommand(message);
    
});

module.exports = {
    getClient: function() {
        return global.client;
    }
}

// Reads a file in the same dir as index.js containing the key
buffer = require('fs').readFileSync("./key.txt", {encoding: 'utf-8'});
key = buffer.toString();
client.login(key);

