const { waitForDebugger } = require("inspector");

commander = require("./command.js");

function command(message, args) {
    let child_process = require('child_process');
    var subprocess = child_process.spawn('node', ['./index.js'], {
        shell: true,
        detached: true
    });
    process.exit(0);
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