import { CommandInteraction, PermissionResolvable, PermissionString } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder } from "@discordjs/builders";

export default class extends Command {
    constructor() {
        super('clear', {
            description: "Очистить сообщения в чате",
            command: new SlashCommandBuilder().addIntegerOption(option => option.setName('count').setDescription("Количество сообщений").setRequired(true)),
            userPermissions: ["MANAGE_MESSAGES"]
        });
    }
   async run(interaction: CommandInteraction) {
       let deleted: number = 0;
       (await interaction.channel.messages.fetch()).forEach(x => {
           if(++deleted <= interaction.options.getInteger("count"))
           x.delete(); 
       }); 
       interaction.reply(`Успешно удалились ${interaction.options.getInteger(`count`)} сообщений`);
    }
}