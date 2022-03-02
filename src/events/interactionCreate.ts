import { Point } from "@influxdata/influxdb-client";
import { ButtonInteraction, CommandInteraction, GuildMemberRoleManager, Interaction, PermissionResolvable } from "discord.js"
import { Event } from "../bin/features/Event"
import Influx from "../features/utils/influx";
import Security from "../features/utils/security";
import { My } from "../My"

export default class interactionCreateEvent extends Event {
    constructor() {
        super('interactionCreate', false)
    }
    
   async run(interaction: Interaction) {
       if(interaction.type)
        if(interaction.type == 'APPLICATION_COMMAND'){
            let point = new Point("commands").tag("channel", interaction.channel.id).stringField("command", (interaction as CommandInteraction).commandName);
            Influx.writePoint(point);
            let command = My.client.commands.get(interaction.isCommand() ? interaction.commandName : null);   
                if((command.userPermissions && command.userPermissions.length > 0) ? await Security.checkPermissions(interaction.user.id, command.userPermissions) : true){
                        console.debug(`${interaction.user.tag}   |   ${(interaction as CommandInteraction).commandName} | ${JSON.stringify((interaction as CommandInteraction).options.data)}`);
                        command.run(interaction);
                    }
                else
                    Security.responeWithoutPermissions(interaction as CommandInteraction);
        }else if(interaction.isButton()){
            My.client.buttonHandler.pressed(interaction as ButtonInteraction);
        }
    }
    
}