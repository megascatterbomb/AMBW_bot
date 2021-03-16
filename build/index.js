"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const overcord_1 = require("@frasermcc/overcord");
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(async () => {
    const client = new overcord_1.Client({ defaultCommandPrefix: "a.", owners: [], disableMentions: "everyone" });
    await client.registry.recursivelyRegisterCommands(path_1.default.join(__dirname, "/commands"));
    client.login(process.env.YOUR_TOKEN);
})();
//# sourceMappingURL=index.js.map