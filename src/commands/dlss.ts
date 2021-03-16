import {
    Alias,
    Inhibit,
    Permit,
    Command,
    Argument,
    BooleanType,
    IntegerType,
    UnionType,
    FloatType,
    Client,
} from "@frasermcc/overcord";
import { Message } from "discord.js";
import { stringify } from "querystring";
const request = require('request');
const fs = require("fs");
const { default: Waifu2x } = require("waifu2x");

@Alias("dlss", "upscale")
@Inhibit({ limitBy: "USER", maxUsesPerPeriod: 1, periodDuration: 10 })
export default class TestCommand extends Command {
    @Argument({ type: new IntegerType(), validate: (n) => n <= 8 && n >= 2 })
    scaleFactor!: number;
    async execute(message: Message, client: Client) {
        let attachments = message.attachments;
        if(attachments.size == 0) {
            message.channel.send("You must attach a single image to use this function (set the caption to a.dlss <scale>)");
            console.log("User failed to attach image (no attachment found)\n");
            return;
        } else if (attachments.size > 1) {
            message.channel.send("This function does not upscale multiple images at once.");
            console.log("User attached multiple images (not supported)\n");
            return;
        }
        let image = attachments.values().next().value;
        let extension = image.name.split(".").slice(-1)[0];

        if(!(image.width > 0)) {
            message.channel.send("Your attachment does not appear to be an image.");
            console.log("User failed to attach image (attachment is not an image)\n");
            return;
        } 

        let scalefactor: number = this.scaleFactor;

        if(scalefactor > 8) {
            scalefactor = 8;
            message.channel.send("Using maximum scale-factor of 8.");
        }
        
        message.channel.send("Downloading image...");
        console.log("Downloading image...");

        let date: string = Date.now().toString();

        let fileName: string = "./workingdir/dlss_image_" + date;

        request.get(image.url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(fileName + "." + extension).on("close", async function(){
                await message.channel.send("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                                + (image.height * scalefactor).toString()  + ")");
                console.log("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                + (image.height * scalefactor).toString()  + ")");
                try {
                    await Waifu2x.upscaleImage(fileName + "." + extension, fileName + "-out." + extension, {
                        scale: scalefactor
                    });
                } catch(err) {
                    message.channel.send(err.toString());
                    return;
                }
                let fileSize: number = fs.statSync(fileName + "-out." + extension).size / 1000000.0;
                if (fileSize >= 100) {
                    message.channel.send("Output image is greater than 100 MB. Image will not send.");
                    return;
                } else {
                    message.channel.send("Upscaling completed, attempting to upload "+ fileSize.toFixed(2) + "MB...");
                }
                let outputImage = fs.readFileSync(fileName + "-out." + extension); 
                message.channel.send("", {files: [fileName + "-out." + extension]}).catch(error => {
                    console.log("Output image was too large.");
                    if(error['code'] === 40005) {
                        message.channel.send("Image was too large to output.");
                    }
                }).then(() => {
                    fs.unlinkSync(fileName + "-out." + extension);
                    fs.unlinkSync(fileName + "." + extension);
                });
            }));
    }
}