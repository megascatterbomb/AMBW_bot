"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const overcord_1 = require("@frasermcc/overcord");
let TestCommand = class TestCommand extends overcord_1.Command {
    async execute(message, client) {
        let acirUserID = "357675387678883840";
        if (message.author.id == acirUserID) {
            message.channel.send("Oi <@" + acirUserID + "> fuck off this command is private property");
            return;
        }
        message.channel.send("acir shut the fuck up");
    }
};
TestCommand = __decorate([
    overcord_1.Alias("acir"),
    overcord_1.Inhibit({ limitBy: "USER", maxUsesPerPeriod: 3, periodDuration: 10 })
], TestCommand);
exports.default = TestCommand;
//# sourceMappingURL=acir.js.map