import { Client } from "@frasermcc/overcord";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
(async () => {
    const client = new Client({ defaultCommandPrefix: "a.", owners: [], disableMentions: "everyone" });
    await client.registry.recursivelyRegisterCommands(path.join(__dirname, "/commands"));
    client.login(process.env.YOUR_TOKEN);
})();