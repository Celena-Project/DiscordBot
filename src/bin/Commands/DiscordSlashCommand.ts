import {ChatInputCommandInteraction} from "discord.js";
import {IDiscordCommandPermissionOptions} from "../../features/interfaces/IDiscordCommandPermissionOptions";

export abstract class DiscordSlashCommand {
    public name: string;
    public description: string;
    public permissions: IDiscordCommandPermissionOptions;
    public abstract run(interaction: ChatInputCommandInteraction): void;
}