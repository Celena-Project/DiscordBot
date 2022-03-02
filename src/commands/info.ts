import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder } from "@discordjs/builders";

export default class extends Command {
    constructor() {
        super('info', {
            description: "Информация о сервере",
        });
    }

   async run(interaction: CommandInteraction) {
       let embed: MessageEmbed = new MessageEmbed();
       embed.setTitle("Info about Celena");
       embed.setDescription(`Название сервера: ${interaction.guild.name}
       Количество участников: ${interaction.guild.memberCount}
       Владелец: <@${interaction.guild.ownerId}>
       Дата создания: <t:${Math.round(interaction.guild.createdTimestamp / 1000)}:R> (Старый дискорд был создан 19.09.2019)

       `);
       interaction.reply({embeds: [embed]});
    }
}