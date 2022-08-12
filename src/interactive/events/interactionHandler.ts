import {IEventHandler} from "../../bin/IEventHandler";
import {client} from "../../index";
import {CacheType, CommandInteraction, Interaction} from "discord.js";
import {EventHandlerDecorator} from "../../features/decorators/EventHandlerDecorator";

// @ts-ignore
@EventHandlerDecorator("interactionCreate")
export class interactionHandler implements IEventHandler{
    run(interaction: Interaction): void {
        if(interaction.isCommand()){
            this.onCommand(interaction as CommandInteraction);
        }
    }
    private onCommand(interaction: CommandInteraction){
        if(!client.commandCollection[interaction.commandName])
            interaction.reply({content: "Command is null", ephemeral: true});
        else{
            const command = client.commandCollection[interaction.commandName];
            if(command.permissions){
                if((command.permissions.uids && !command.permissions.uids.includes(interaction.user.id)) ||
                    (command.permissions.roles && client.guild.members.resolve(interaction.user.id).roles.cache.filter(x => command.permissions.roles.includes(x.id.toString())).size == 0))
                    interaction.reply({content: "You dont have permissions", ephemeral: true});
                else{
                }
            }else{
                console.log("invoking")
                client.commandCollection[interaction.commandName].run(interaction)
            }
        }
    }
}