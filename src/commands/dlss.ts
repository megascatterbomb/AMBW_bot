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
import fs from 'fs';
const { default: Waifu2x } = require("waifu2x");
const imageMin = require("imagemin-overwrite");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

@Alias("dlss", "upscale")
@Inhibit({ limitBy: "USER", maxUsesPerPeriod: 1, periodDuration: 10 })
export default class TestCommand extends Command {
    @Argument({ type: new IntegerType(), validate: (n: number) => n <= 8 && n >= 2 })
    scaleFactor!: number;
    async execute(message: Message, client: Client) {
        let attachments = message.attachments;
        if(attachments.size == 0) {
            message.channel.send("You must attach a single image to use this function (set the caption to a.dlss <scale>)");
            return;
        } else if (attachments.size > 1) {
            message.channel.send("This function does not upscale multiple images at once.");
            return;
        }
        let image = attachments.values().next().value;
        let extension = image.name.split(".").slice(-1)[0];

        if(!(image.width > 0)) {
            message.channel.send("Your attachment does not appear to be an image.");
            return;
        } 

        let scalefactor: number = this.scaleFactor;

        if(scalefactor > 8) {
            scalefactor = 8;
            message.channel.send("Using maximum scale-factor of 8.");
        }
        
        message.channel.send("Downloading image...");

        let date: string = Date.now().toString();

        let fileName: string = "./workingdir/dlss_image_" + date;
        let inFile: string = fileName + "." + extension;
        let outFile: string = fileName + "-out." + extension;

        await request.get(image.url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(inFile));

        await message.channel.send("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                        + (image.height * scalefactor).toString()  + ")");
        try {
            await Waifu2x.upscaleImage(inFile, outFile, {
                scale: scalefactor
            });
        } catch(err) {
            message.channel.send(err.toString());
            return;
        }
        let fileSize: string = (fs.statSync(outFile).size / 1000000.0).toFixed(2);
        message.channel.send("Upscaling completed, attempting to upload "+ fileSize + "MB...");
        let uploadAttempts: number = 0;
        while(true) {
            uploadAttempts++;
            try {
                await message.channel.send("", {files: [outFile]});
            } catch (error) {
                if(error['code'] === 40005 && uploadAttempts <= 5) {
                    fileSize = (fs.statSync(outFile).size / 1000000.0).toFixed(2);
                    await message.channel.send("Image was too large to output ("+fileSize+"MB). Compressing... (Attempt "+uploadAttempts+"/5)");
                    
                    const files = await imageMin([outFile], {
                        plugins: [
                            imageminJpegtran(),
                            imageminPngquant({
                                quality: [0.3, 0.75]

                            })
                        ]
                    }); 
                    continue;
                } else {
                    message.channel.send("Upload failed. Operation cancelled.");
                    break;
                }
            }
            break;
        }
        fs.unlinkSync(outFile);
        fs.unlinkSync(inFile);
    }
}