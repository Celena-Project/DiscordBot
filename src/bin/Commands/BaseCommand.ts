import {ApplicationCommand, ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";
import {IBaseCommand} from "./IBaseCommand";


export abstract class BaseCommand implements IBaseCommand{
    protected constructor(name: string, opts: IDiscordCommandOptions) {
        this.name = name;
        this.description = opts.description ?? "._.";
        this.command = (opts.command ?? new SlashCommandBuilder()).setName(name).setDescription(this.description);
        this.guildCommand = opts.isGuildCommand;
        this.permissions = opts.permissions;

    }

    public readonly name: string;
    public readonly description: string;
    public readonly command: SlashCommandBuilder;
    public readonly guildCommand: boolean;
    public readonly permissions: IDiscordCommandPermissionOptions
    public abstract run(interaction: ChatInputCommandInteraction): void;
}


interface IDiscordCommandOptions extends IDiscordCommandBasic{
    command?: SlashCommandBuilder;
    isGuildCommand?: boolean;
}

export interface IDiscordCommandBasic{
    description?: string;
    permissions?: IDiscordCommandPermissionOptions;
}