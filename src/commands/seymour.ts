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

@Alias("seymour")
@Inhibit({ limitBy: "USER", maxUsesPerPeriod: 3, periodDuration: 10 })
export default class TestCommand extends Command {
    async execute(message: Message, client: Client) {
        message.channel.send("Contacting David Seymour...")
        message.channel.send("" , {files: ["./resources/seymour.mp4"]});
    }
}