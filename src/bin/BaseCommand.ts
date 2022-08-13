import {ApplicationCommand, CommandInteraction, SlashCommandBuilder} from "discord.js";


export abstract class BaseCommand {
    protected constructor(name: string, opts: DiscordCommandOptions) {
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
    public readonly permissions: DiscordCommandPermissionOptions
    public abstract run(interaction: CommandInteraction): void;
}


interface DiscordCommandOptions{
    description?: string;
    command?: SlashCommandBuilder;
    permissions?: DiscordCommandPermissionOptions;
    isGuildCommand?: boolean;
}
interface DiscordCommandPermissionOptions{
    roles?: string[];
    uids?: string[];
    onlyKlar?: boolean;
}