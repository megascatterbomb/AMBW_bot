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
import { CpuInfo } from "os";
import { Systeminformation } from "systeminformation";
const si = require('systeminformation');

@Alias("specs")
@Inhibit({ limitBy: "USER", maxUsesPerPeriod: 3, periodDuration: 10 })
export default class TestCommand extends Command {
    async execute(message: Message, client: Client) {
        const si = require('systeminformation');

        await si.cpu(function(data: Systeminformation.CpuData) {
            let info: string = "";
            info += ('CPU Information:');
            info += ('\n' + data.manufacturer + " " + data.brand + " @" + data.speed + "GHz " 
                    + data.physicalCores + "C/" + data.cores + "T");
            
            message.channel.send(info);
        });
        
        await si.graphics(function(data: Systeminformation.GraphicsData) {
            let info: string = "";
            info += ('GPU Information:');
            data.controllers.forEach(function(controller) {
                info += "\n" + controller.model; //+ " " + Math.round(controller.vram/1024).toString() + "GB";
                // VRAM can't display above 4GB.
            });
            message.channel.send(info);
        });
    }
}