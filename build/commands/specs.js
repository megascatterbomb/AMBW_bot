"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const overcord_1 = require("@frasermcc/overcord");
const si = require('systeminformation');
let TestCommand = class TestCommand extends overcord_1.Command {
    async execute(message, client) {
        const si = require('systeminformation');
        await si.cpu(function (data) {
            let info = "";
            info += ('CPU Information:');
            info += ('\n' + data.manufacturer + " " + data.brand + " @" + data.speed + "GHz "
                + data.physicalCores + "C/" + data.cores + "T");
            message.channel.send(info);
        });
        await si.graphics(function (data) {
            let info = "";
            info += ('GPU Information:');
            data.controllers.forEach(function (controller) {
                info += "\n" + controller.model; //+ " " + Math.round(controller.vram/1024).toString() + "GB";
                // VRAM can't display above 4GB.
            });
            message.channel.send(info);
        });
    }
};
TestCommand = __decorate([
    overcord_1.Alias("specs"),
    overcord_1.Inhibit({ limitBy: "USER", maxUsesPerPeriod: 3, periodDuration: 10 })
], TestCommand);
exports.default = TestCommand;
//# sourceMappingURL=specs.js.map