import "./features/global"
import "./features/console"
console.log("Инициализация..");
import { My } from "./My";
import config from "./config"
My.config = config
import { BaseClient } from "./bin/BaseClient";
process.on(`uncaughtException`, e => console.error(e));
process.on(`unhandledRejection`, e => console.error(e));
const client = new BaseClient(config.bot.token);
client.init();