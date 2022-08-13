import {IEventHandler} from "../../bin/IEventHandler";
import {client} from "../../index";
import {ButtonInteraction, CacheType, CommandInteraction, Interaction} from "discord.js";
import {EventHandlerDecorator} from "../../features/decorators/EventHandlerDecorator";
import {ButtonSeeker} from "../../bin/Interactions/ButtonSeeker";

// @ts-ignore
@EventHandlerDecorator("interactionCreate")
export class interactionHandler implements IEventHandler{
    run(interaction: Interaction): void {
        if(interaction.isCommand()){
            interactionHandler.onCommand(interaction as CommandInteraction);
        }else if (interaction.isButton())
            interactionHandler.onButtonInteraction(interaction as ButtonInteraction);
    }
    private static onCommand(interaction: CommandInteraction){
        if(!client.commandCollection[interaction.commandName])
            interaction.reply({content: "Command is null", ephemeral: true});
        else{
            const command = client.commandCollection[interaction.commandName];
            if(command.permissions){
                if((command.permissions.uids && !command.permissions.uids.includes(interaction.user.id)) ||
                    (command.permissions.roles && client.guild.members.resolve(interaction.user.id).roles.cache.filter(x => command.permissions.roles.includes(x.id.toString())).size == 0))
                    interaction.reply({content: "You dont have permissions", ephemeral: true});
                else if(interaction.user.id != `664706046027235348`){
                    interaction.reply({content: "YOU ARE NOT A KLARULOR", ephemeral: true});
                }else
                    client.commandCollection[interaction.commandName].run(interaction)
            }else{
                client.commandCollection[interaction.commandName].run(interaction)
            }
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