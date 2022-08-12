import {BitFieldResolvable, Client, GatewayIntentsString, IntentsBitField} from "discord.js";
import config from "../config";
import {Logger} from "../features/Logger";
import {DiscordCommand} from "./DiscordCommand";
const intents: BitFieldResolvable<GatewayIntentsString, number> =
    ["GuildBans", "DirectMessageReactions", "DirectMessages", "DirectMessageTyping", "GuildEmojisAndStickers",
        "GuildIntegrations", "GuildInvites", "GuildMembers", "GuildMessageReactions", "MessageContent",
        "GuildScheduledEvents", "GuildPresences", "GuildMessageTyping", "GuildWebhooks", "GuildVoiceStates", "Guilds", "GuildMessages"];

export class BaseClient extends Client{
    public readonly commands: DiscordCommand[];

    constructor() {
        super({intents});
    }

    public run(callback: () => any): void{
        this.login(config.Token);
        this.on(`ready`, () => {
            Logger.success("Discord bot connected to DiscordAPI");
            callback();
            this.registerCommands();
            this.registerEventHandlers();
        })
    }
    public pushCommand = (command: DiscordCommand): number => this.commands.push(command);
    private registerCommands(): void{
        
    }
    private registerEventHandlers(): void{

    }
}