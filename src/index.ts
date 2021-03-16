import { Client } from "@frasermcc/overcord";
import path from "path";
import dotenv from "dotenv";
import fs from 'fs';
dotenv.config();
(async () => {
    let workingDirPath = "./workingdir";
    // Clear working dir on startup.
    fs.rmdirSync(workingDirPath, {recursive: true});
    fs.mkdirSync(workingDirPath);
})();
(async () => {
    const client = new Client({ defaultCommandPrefix: "a.", owners: [], disableMentions: "everyone" });
    await client.registry.recursivelyRegisterCommands(path.join(__dirname, "/commands"));
    client.login(process.env.YOUR_TOKEN);
})();
