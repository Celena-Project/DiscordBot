import { CommandInteraction, MessageEmbed, TextChannel } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { My } from "../My";
import { MessageChannel } from "worker_threads";


export default class extends Command {
    constructor() {
        super('embed', {
            description: "Отправить эмбед",
            command: new SlashCommandBuilder()
            .addChannelOption(x =>
                x.setName("channel")
                .setDescription("Канал")
                .setRequired(true))
            .addStringOption(x => 
                x.setName("title")
                .setDescription("Оглавление")
                .setRequired(true))
            .addStringOption(x =>
                x.setName("hex")
                .setDescription("Цвет в HEX")
                .setRequired(true))
            .addStringOption(x =>
                x.setName("description")
                .setDescription("Описание")
                .setRequired(true)),
            userPermissions: ["ADMINISTRATOR"]
        });
    }

   async run(interaction: CommandInteraction) {
       (My.celena.channels.resolve(interaction.options.getChannel("channel").id) as TextChannel).send({embeds: [new MessageEmbed()
        .setTitle(interaction.options.getString("title"))
        .setDescription(interaction.options.getString("description"))
        .setColor(`#${interaction.options.getString("hex")}`)]})
        interaction.reply("Успешно");
    }
}