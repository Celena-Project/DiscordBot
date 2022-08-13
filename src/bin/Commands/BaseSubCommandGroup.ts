import { SlashCommandSubcommandGroupBuilder } from "discord.js";
import {IDiscordCommandBasic} from "./BaseCommand";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";
import {IBaseCommand} from "./IBaseCommand";

export class BaseSubCommandGroup implements IBaseCommand{
    public readonly name: string;
    public readonly description: string;
    public readonly command: ((builder: SlashCommandSubcommandGroupBuilder) => any);
    public readonly permissions: IDiscordCommandPermissionOptions;
    constructor(name: string, opts: IBaseSubCommandGroupOptions) {
        this.name = name;
        this.description = opts.description ?? "._.";
        this.command= opts.command;
        this.permissions = opts.permissions;
    }
}

interface IBaseSubCommandGroupOptions extends IDiscordCommandBasic{
    command: ((builder: SlashCommandSubcommandGroupBuilder) => any);
}