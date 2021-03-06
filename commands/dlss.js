const commander = require("./command.js");
const fetcher = require('node-fetch');
const request = require('request');
const fs = require("fs");
const { default: Waifu2x } = require("waifu2x");
const { Message, DiscordAPIError } = require("discord.js");
const resolve = require("path").resolve;

async function command(message, args) {

    attachments = message.attachments;
    if(attachments.size == 0) {
        message.channel.send("You must attach a single image to use this function (set the caption to a.dlss <scale>)");
        console.log("User failed to attach image (no attachment found)\n");
        return;
    } else if (attachments.size > 1) {
        message.channel.send("This function does not upscale multiple images at once.");
        console.log("User attached multiple images (not supported)\n");
        return;
    }
    image = attachments.values().next().value;
    extension = image.name.split(".").slice(-1)[0];

    if(!image.width > 0) {
        message.channel.send("Your attachment does not appear to be an image.");
        console.log("User failed to attach image (attachment is not an image)\n");
        return;
    } 

    var scalefactor = 2;
    if(args[0]) {
        scalefactor = args.slice(-1);
        if(scalefactor > 8 && message.author.id != 193950601271443456) {
            scalefactor = 8;
            message.channel.send("Using maximum scale-factor of 8.");
        }
    }
    message.channel.send("Downloading image...");
    console.log("Downloading image...");

    date = Date.now().toString();

    fileName = "./commands/tempdir/dlss_image";

    request.get(image.url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(fileName + "." + extension).on("close", async function(){
            await message.channel.send("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                            + (image.height * scalefactor).toString()  + ")");
            console.log("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
            + (image.height * scalefactor).toString()  + ")");
            try {
                Waifu2x.upscaleImage(fileName + "." + extension, fileName + "-out." + extension, {
                    scale: scalefactor
                });
            } catch(err) {
                message.channel.send(err.toString());
                return;
            }
            fileSize = fs.statSync(fileName + "-out." + extension).size / 1000000.0;
            if (fileSize >= 100) {
                message.channel.send("Output image is greater than 100 MB. Image will not send.");
                return;
            } else {
                message.channel.send("Upscaling completed, attempting to upload "+ fileSize.toFixed(2) + "MB...");
            }
            outputImage = fs.readFileSync(fileName + "-out." + extension); 
            message.channel.send("", {files: [fileName + "-out." + extension]}).catch(error => {
                console.log("Output image was too large.");
                if(error['code'] === 40005) {
                    message.channel.send("Image was too large to output.");
                }
            });
        }));
}


module.exports = {
    execute: function (message, args) {
        command(message, args);
    }
}
