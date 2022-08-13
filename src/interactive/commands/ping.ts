import {DiscordCommand} from "../../bin/DiscordCommand";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";

@DiscordCommandDecorator
export class PingCommands extends DiscordCommand{
    constructor() {
        super({
            name: "ping",
            description: "Test command",
            permissions:{

            }
        })
    }

    run(interaction: CommandInteraction): void {
        console.log("Test command echo")
        interaction.reply("Pong!");
    }

}