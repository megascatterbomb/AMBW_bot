commander = require("./command.js");


async function command(message, args) {

    const si = require('systeminformation');

    await si.cpu(function(data) {
        info = "";
        info += ('CPU Information:');
        info += ('\n' + data.manufacturer + " " + data.brand + " @" + data.speed + "GHz " 
                + data.physicalCores + "C/" + data.cores + "T");
        
        message.channel.send(info);
    });
    
    await si.graphics(function(data) {
        info = "";
        info += ('GPU Information:');
        data.controllers.forEach(function(controller) {
            info += "\n" + controller.model; //+ " " + Math.round(controller.vram/1024).toString() + "GB";
            // VRAM can't display above 4GB.
        });
        
        message.channel.send(info);
    });
}

module.exports = {
    execute: function (message, args) {
         command(message, args);
    }
}