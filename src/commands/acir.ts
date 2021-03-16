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

@Alias("acir")
@Inhibit({ limitBy: "USER", maxUsesPerPeriod: 3, periodDuration: 10 })
export default class TestCommand extends Command {
    async execute(message: Message, client: Client) {

        let acirUserID: string = "357675387678883840";

        if(message.author.id == acirUserID) {
            message.channel.send("Oi <@" + acirUserID + "> fuck off this command is private property");
            return;
        }

        message.channel.send("acir shut the fuck up");
    }
}
