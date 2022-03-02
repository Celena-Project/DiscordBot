import "./features/global"
import "./features/console"
console.log("Инициализация..");
import { My } from "./My";
const fs = require(`fs`);
My.config = require("../data/config.json");
import { BaseClient } from "./bin/BaseClient";
process.on(`uncaughtException`, e => console.error(e));
process.on(`unhandledRejection`, e => console.error(e));
const client = new BaseClient(My.config.bot.token);
client.init();