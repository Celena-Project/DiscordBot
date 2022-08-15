import {BaseCommand} from "../../bin/Commands/BaseCommand";
import {CommandInteraction, EmbedBuilder} from "discord.js";
import {client} from "../../index";
import {createTracing} from "trace_events";
import {DiscordSlashCommand} from "../../bin/Commands/DiscordSlashCommand";
//import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";
let embed: EmbedBuilder = undefined;
//@DiscordCommandDecorator
export default class HelpCommand extends BaseCommand{
    constructor() {
        super("help", {
            description: "Help command can help u"
        });
    }

    run(interaction: CommandInteraction): void {
        if(!embed)
            embed = createEmbed();
        interaction.reply({content: "", embeds: [embed]})

    }

}

function createEmbed(): EmbedBuilder{
    const commands: { [key: string]: DiscordSlashCommand } = {};
    for(const k in client.commandsList){
        const command = client.commandsList[k];
        if(!client.subCommands[command.name] && !client.subCommandGroups[command.name])
            commands[command.name] = command;
        else{
            if(client.subCommands[command.name]){
                for(const j in client.subCommands[command.name]){
                    commands[`${command.name} ${client.subCommands[command.name][j].name}`] = client.subCommands[command.name][j];
                }
            }
            if(client.subCommandGroups[command.name]){
                for(const j in client.subCommandGroups[command.name]){
                    for(const z in client.subCommandGroupCommands[command.name][j]){
                        commands[`${command.name} ${client.subCommands[command.name][j].name} ${client.subCommandGroupCommands[command.name][j][z].name}`]
                            = client.subCommandGroupCommands[command.name][j][z]
                    }
                }
            }
        }
    }
    const embed = new EmbedBuilder();
    embed.setTitle(`Avaliable commands`);
    for(const k in commands){
        embed.addFields([{
            name: `/${k}`,
            value: "```"+commands[k].description+"```"
        }])
    }
    return embed;
}