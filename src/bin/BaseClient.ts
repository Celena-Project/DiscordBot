import {BitFieldResolvable, Client, GatewayIntentsString, Guild, IntentsBitField} from "discord.js";
import config from "../config";
import {Logger} from "../features/Logger";
import {DiscordCommand} from "./DiscordCommand";
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const intents: BitFieldResolvable<GatewayIntentsString, number> =
    ["GuildBans", "DirectMessageReactions", "DirectMessages", "DirectMessageTyping", "GuildEmojisAndStickers",
        "GuildIntegrations", "GuildInvites", "GuildMembers", "GuildMessageReactions", "MessageContent",
        "GuildScheduledEvents", "GuildPresences", "GuildMessageTyping", "GuildWebhooks", "GuildVoiceStates", "Guilds", "GuildMessages"];
const clientId = '671449832694480926';
const guildId = '670351103384354826';

export class BaseClient extends Client{
    public readonly commands: DiscordCommand[] = [];
    public readonly commandCollection: any = {};
    private _guild: Guild;
    public get guild(){
        return this._guild;
    }

    constructor() {
        super({intents})
    }

    public run(callback?: () => any): void{
        this.on(`ready`, () => {
            Logger.success("Connected to DiscordAPI");
            callback?.call(null);
            this.registerCommands();
            this.registerEventHandlers();
            this._guild = this.guilds.resolve(guildId);
        });
        this.login(config.token);
    }
    public pushCommand = (command: DiscordCommand): number => this.commands.push(command);
    private async registerCommands(): Promise<void>{
        const dataCommands = this.commands.map(x => x.command.toJSON());
        const rest = new REST({ version: '10' }).setToken(config.token);
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: dataCommands },
        );
    }
    private registerEventHandlers(): void{

    }
}