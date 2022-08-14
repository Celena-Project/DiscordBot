import {ChatInputCommandInteraction, SlashCommandSubcommandGroupBuilder} from "discord.js";
import {IDiscordCommandBasic} from "./BaseCommand";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";
import {SlashCommandSubcommandBuilder} from "@discordjs/builders/dist/interactions/slashCommands/SlashCommandSubcommands";
import {DiscordSlashCommand} from "./DiscordSlashCommand";
import {SlashCommandSubcommandsOnlyBuilder} from "@discordjs/builders/dist/interactions/slashCommands/SlashCommandBuilder";

export abstract class BaseSubCommand implements DiscordSlashCommand{
    public readonly name: string;
    public readonly description: string;
    public readonly command: ((builder: SlashCommandSubcommandBuilder) => any);
    public readonly permissions: IDiscordCommandPermissionOptions;
    constructor(name: string, opts: IBaseSubCommandGroupOptions) {
        this.name = name;
        this.description = opts.description ?? "._.";
        this.command= opts.command;
        this.permissions = opts.permissions;
    }

    public abstract run(interaction: ChatInputCommandInteraction): void;
}

interface IBaseSubCommandGroupOptions extends IDiscordCommandBasic{
    command: ((builder: SlashCommandSubcommandBuilder) => any);
}