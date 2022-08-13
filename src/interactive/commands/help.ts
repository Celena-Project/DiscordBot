import {BaseCommand} from "../../bin/Commands/BaseCommand";
import {CommandInteraction, EmbedBuilder} from "discord.js";
import {client} from "../../index";
//import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";

//@DiscordCommandDecorator
export default class HelpCommand extends BaseCommand{
    constructor() {
        super("help", {
            description: "Help command can help u"
        });
    }

    run(interaction: CommandInteraction): void {
        const embed = new EmbedBuilder();
        embed.setTitle("Avaliable discord commands");
        for(const k in client.commands){
            const mC = client.commands[k];
            //console.log
        }
        console.log(client.commands[1].command.toJSON())

    }

}