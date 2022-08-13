import {BaseCommand} from "../../bin/Commands/BaseCommand";
import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
//import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";

//@DiscordCommandDecorator
export default class PingCommands extends BaseCommand{
    constructor() {
        const command = new SlashCommandBuilder();
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