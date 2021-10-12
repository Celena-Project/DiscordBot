import { Client, Collection } from "discord.js";
import { UtilManager } from "../features/utilManager";
import API from "../features/utils/api";
import TextTools from "../features/utils/textTools";
import { My } from "../My";
import { ButtonHandler } from "./ButtonHandler";
import { CommandHandler } from "./commandHandler";
import { EventHandler } from "./eventHandler";
import { Command } from "./features/command";
const Discord = require(`discord.js`)
export class BaseClient extends Client {
    public commands: Collection<string, Command>;
    public commandHandler: CommandHandler = new CommandHandler();
    public eventHandler: EventHandler = new EventHandler();
    public buttonHandler: ButtonHandler = new ButtonHandler();
    constructor(token) {
        super({intents: ["DIRECT_MESSAGES", 'DIRECT_MESSAGE_REACTIONS', "GUILDS", "GUILD_INTEGRATIONS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"]})
       // console.log(TextTools.createTable(["a", "b", "c"], [["112", "223", "334"], ["115", "226", "337"]]))
        this.token = token;
        this.commands = new Collection();
        My.client = this;
        this.on('ready', this.#ready.bind(this));
    }
    

    async #ready () {
        console.log('Запустился за ', this.user.tag);
        await UtilManager.init();
        await API.fetchServers();
        await this.eventHandler.fetchEvents();
        await this.commandHandler.fetchCommands();
        await this.guilds.resolve(My.config.celena.id).members.fetch();
        My.celena = My.client.guilds.resolve(My.config.celena.id);
        setTimeout(() => console.success("SYSTEM WORKS"), 100);
    }
     

    async init(token = this.token) {
        console.log("Авторизация..")
        return super.login(token);
    }
}