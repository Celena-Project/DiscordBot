import { SlashCommandSubcommandGroupBuilder } from "discord.js";
import {IDiscordCommandBasic} from "./BaseCommand";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";
import {SlashCommandSubcommandBuilder} from "@discordjs/builders/dist/interactions/slashCommands/SlashCommandSubcommands";
import {IBaseCommand} from "./IBaseCommand";
import {SlashCommandSubcommandsOnlyBuilder} from "@discordjs/builders/dist/interactions/slashCommands/SlashCommandBuilder";

export class BaseSubCommand implements IBaseCommand{
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
}

interface IBaseSubCommandGroupOptions extends IDiscordCommandBasic{
    command: ((builder: SlashCommandSubcommandBuilder) => any);
}