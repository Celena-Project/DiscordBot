import { Client, Collection, Intents } from "discord.js";
import { UtilManager } from "../features/UtilManager";
import API from "../features/utils/api";
import TextTools from "../features/utils/textTools";
import { My } from "../My";
import { ButtonHandler } from "./ButtonHandler";
import { CommandHandler } from "./CommandHandler";
import { EventHandler } from "./EventHandler";
import { Command } from "./features/Command";
const Discord = require(`discord.js`)
export class BaseClient extends Client {
    public commands: Collection<string, Command>;
    public commandHandler: CommandHandler = new CommandHandler();
    public EventHandler: EventHandler = new EventHandler();
    public buttonHandler: ButtonHandler = new ButtonHandler();
    constructor(token) {
        super({intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILD_PRESENCES]})
       // console.log(TextTools.createTable(["a", "b", "c"], [["112", "223", "334"], ["115", "226", "337"]]))
        this.token = token;
        this.commands = new Collection();
        My.client = this;
        this.on('ready', this.ready);
    }
    

    async ready () {
        console.log('Запустился за ', this.user.tag);
        My.celena = My.client.guilds.resolve(My.config.celena.id);
        await UtilManager.init();
        //await API.fetchServers();
        await this.EventHandler.fetchEvents();
        await this.commandHandler.fetchCommands();
        await this.guilds.resolve(My.config.celena.id).members.fetch();
        setTimeout(() => console.success("SYSTEM WORKS"), 100);
    }
     

    async init(token = this.token) {
        console.log("Авторизация..")
        return super.login(token);
    }
}