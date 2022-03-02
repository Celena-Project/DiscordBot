import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder } from "@discordjs/builders";


export default class extends Command {
    constructor() {
        super('avatar', {
            description: "Получить аватарку",
            command: new SlashCommandBuilder().addUserOption(option => option.setName('user').setDescription("Пользователь, у которого вы украдёте аватарку"))
        });
    }

   async run(interaction: CommandInteraction) {
       let embed: MessageEmbed = new MessageEmbed();
       embed.setTitle(interaction.options.getUser("user").tag);
       embed.setImage(interaction.options.getUser("user").displayAvatarURL());
       interaction.reply({ embeds: [embed] });
    }
}