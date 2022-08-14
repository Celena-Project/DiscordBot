import { SlashCommandSubcommandGroupBuilder } from "discord.js";
import {IDiscordCommandBasic} from "./BaseCommand";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";
import {IBaseCommand} from "./IBaseCommand";

export class BaseSubCommandGroup{
    public readonly name: string;
    public readonly description: string;
    public readonly command: ((builder: SlashCommandSubcommandGroupBuilder) => any);
    constructor(name: string, opts: IBaseSubCommandGroupOptions) {
        this.name = name;
        this.description = opts.description ?? "._.";
        this.command= opts.command;
    }
}

interface IBaseSubCommandGroupOptions extends IDiscordCommandBasic{
    command: ((builder: SlashCommandSubcommandGroupBuilder) => any);
}