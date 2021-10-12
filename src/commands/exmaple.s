import { CommandInteraction } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder } from "@discordjs/builders";


export default class extends Command {
    constructor() {
        super('test', {
            description: "Тест",
            command: new SlashCommandBuilder().addStringOption(option => option.setName('id').setDescription("a"))
        });
    }

    async run(interaction: CommandInteraction) {
       
    }
}