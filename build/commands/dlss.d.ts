import { Command, Client } from "@frasermcc/overcord";
import { Message } from "discord.js";
export default class TestCommand extends Command {
    scaleFactor: number;
    execute(message: Message, client: Client): Promise<void>;
}
//# sourceMappingURL=dlss.d.ts.map