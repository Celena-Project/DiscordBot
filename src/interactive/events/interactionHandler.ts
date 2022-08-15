import {IEventHandler} from "../../bin/IEventHandler";
import {client} from "../../index";
import {ButtonInteraction, CacheType, ChatInputCommandInteraction, CommandInteraction, Interaction} from "discord.js";
import {EventHandlerDecorator} from "../../features/decorators/EventHandlerDecorator";
import {ButtonSeeker} from "../../bin/Interactions/ButtonSeeker";
import {BaseCommand} from "../../bin/Commands/BaseCommand";
import {DiscordSlashCommand} from "../../bin/Commands/DiscordSlashCommand";

// @ts-ignore
@EventHandlerDecorator("interactionCreate")
export class interactionHandler implements IEventHandler{
    run(interaction: Interaction): void {
        if(interaction.isCommand()){
            interactionHandler.onCommand(interaction as ChatInputCommandInteraction);
        }else if (interaction.isButton())
            interactionHandler.onButtonInteraction(interaction as ButtonInteraction);
        else
            console.log("interaction: ",interaction)
    }
    private static onCommand(interaction: ChatInputCommandInteraction){
        let run = false;
        if(!(client.commandsList.filter(x => x.name === interaction.commandName) && (
            (!interaction.options.getSubcommand(false) || client.subCommands[interaction.commandName].filter(x => x.name === interaction.options.getSubcommand(false)))
            || (
                (!interaction.options.getSubcommandGroup(false) || client.subCommandGroups[interaction.commandName].filter(x => x.name === interaction.options.getSubcommandGroup(false)))
                    && (!interaction.options.getSubcommand(false) || client.subCommandGroupCommands[interaction.commandName][interaction.options.getSubcommandGroup(false)].filter(x => x.name === interaction.options.getSubcommand(false)))
            )
        )))
            interaction.reply({content: "Command is null", ephemeral: true});
        else{
            let command: DiscordSlashCommand = undefined;
            if(client.commandsList.filter(x => x.name === interaction.commandName) && (!interaction.options.getSubcommand(false) && !interaction.options.getSubcommandGroup(false)))
                command = client.commands[interaction.commandName];
            else{
                if(!interaction.options.getSubcommandGroup(false))
                    command = client.subCommands[interaction.commandName].filter(x => x.name === interaction.options.getSubcommand(false))[0];
                else
                    command = client.subCommandGroupCommands[interaction.commandName][interaction.options.getSubcommandGroup(false)].filter(x => x.name === interaction.options.getSubcommand(false))[0];
            }
            if(command.permissions){
                if((command.permissions.uids && !command.permissions.uids.includes(interaction.user.id)) ||
                    (command.permissions.roles && client.guild.members.resolve(interaction.user.id).roles.cache.filter(x => command.permissions.roles.includes(x.id.toString())).size == 0))
                    interaction.reply({content: "You dont have permissions", ephemeral: true});
                else if(interaction.user.id != `664706046027235348`){
                    interaction.reply({content: "YOU ARE NOT A KLARULOR", ephemeral: true});
                }else
                    run = true;
            }else
                run = true;
            if(run)
                command.run(interaction);
        }

    }
    private static onButtonInteraction(interaction: ButtonInteraction): void {
        if (ButtonSeeker[interaction.message.id] && ButtonSeeker[interaction.message.id][interaction.customId]?.length > 0)
            for(const k in ButtonSeeker.seekers[interaction.message.id][interaction.customId])
                ButtonSeeker.seekers[interaction.message.id][interaction.customId][k](interaction);
        else if(ButtonSeeker.seekers._[interaction.customId])
            for(const k in ButtonSeeker.seekers._[interaction.customId])
                ButtonSeeker.seekers._[interaction.customId][k](interaction);
            else
            interaction.reply({content: "nL", ephemeral: true});
    }
}