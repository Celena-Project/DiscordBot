import {ApplicationCommand, CommandInteraction, SlashCommandBuilder} from "discord.js";


export abstract class DiscordCommand{
    constructor(name: string, description: string, command: SlashCommandBuilder, isGuildCommand: boolean = true) {
        this.name = name;
        this.description = description;
        this.command = command;
        this.guildCommand = isGuildCommand;

    }

    public readonly name: string;
    public readonly description: string;
    public readonly command: SlashCommandBuilder;
    public readonly guildCommand: boolean;
    public abstract run(interaction: CommandInteraction): void;
}