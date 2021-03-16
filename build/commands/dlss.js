"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const overcord_1 = require("@frasermcc/overcord");
const request = require('request');
const fs = require("fs");
const { default: Waifu2x } = require("waifu2x");
let TestCommand = class TestCommand extends overcord_1.Command {
    async execute(message, client) {
        let attachments = message.attachments;
        if (attachments.size == 0) {
            message.channel.send("You must attach a single image to use this function (set the caption to a.dlss <scale>)");
            console.log("User failed to attach image (no attachment found)\n");
            return;
        }
        else if (attachments.size > 1) {
            message.channel.send("This function does not upscale multiple images at once.");
            console.log("User attached multiple images (not supported)\n");
            return;
        }
        let image = attachments.values().next().value;
        let extension = image.name.split(".").slice(-1)[0];
        if (!(image.width > 0)) {
            message.channel.send("Your attachment does not appear to be an image.");
            console.log("User failed to attach image (attachment is not an image)\n");
            return;
        }
        let scalefactor = this.scaleFactor;
        if (scalefactor > 8) {
            scalefactor = 8;
            message.channel.send("Using maximum scale-factor of 8.");
        }
        message.channel.send("Downloading image...");
        console.log("Downloading image...");
        let date = Date.now().toString();
        let fileName = "./workingdir/dlss_image_" + date;
        request.get(image.url)
            .on('error', console.error)
            .pipe(fs.createWriteStream(fileName + "." + extension).on("close", async function () {
            await message.channel.send("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                + (image.height * scalefactor).toString() + ")");
            console.log("Image recieved. Scaling to " + scalefactor + "x resolution (" + (image.width * scalefactor).toString() + "x"
                + (image.height * scalefactor).toString() + ")");
            try {
                await Waifu2x.upscaleImage(fileName + "." + extension, fileName + "-out." + extension, {
                    scale: scalefactor
                });
            }
            catch (err) {
                message.channel.send(err.toString());
                return;
            }
            let fileSize = fs.statSync(fileName + "-out." + extension).size / 1000000.0;
            if (fileSize >= 100) {
                message.channel.send("Output image is greater than 100 MB. Image will not send.");
                return;
            }
            else {
                message.channel.send("Upscaling completed, attempting to upload " + fileSize.toFixed(2) + "MB...");
            }
            let outputImage = fs.readFileSync(fileName + "-out." + extension);
            message.channel.send("", { files: [fileName + "-out." + extension] }).catch(error => {
                console.log("Output image was too large.");
                if (error['code'] === 40005) {
                    message.channel.send("Image was too large to output.");
                }
            }).then(() => {
                fs.unlinkSync(fileName + "-out." + extension);
                fs.unlinkSync(fileName + "." + extension);
            });
        }));
    }
};
__decorate([
    overcord_1.Argument({ type: new overcord_1.IntegerType(), validate: (n) => n <= 8 && n >= 2 }),
    __metadata("design:type", Number)
], TestCommand.prototype, "scaleFactor", void 0);
TestCommand = __decorate([
    overcord_1.Alias("dlss", "upscale"),
    overcord_1.Inhibit({ limitBy: "USER", maxUsesPerPeriod: 1, periodDuration: 10 })
], TestCommand);
exports.default = TestCommand;
//# sourceMappingURL=dlss.js.map