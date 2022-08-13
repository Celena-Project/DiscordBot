import {BaseCommand} from "../../bin/BaseCommand";
import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";

@DiscordCommandDecorator
export class PingCommands extends BaseCommand{
    constructor() {
        const command = new SlashCommandBuilder();
        command.addSubcommand(x => x.setName("test").setDescription("pi"));
        super("ping", {
            description: "Test command",
            command,
            permissions:{

            }
        })
    }

    run(interaction: ChatInputCommandInteraction): void {
        console.log("Test command echo")
        interaction.reply("Pong!");
    }

}