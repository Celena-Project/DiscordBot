import { CommandInteraction } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { IMyDiscordUser } from "../features/interfaces/IMyDiscordUser";
import sql from "../features/utils/sql";


export default class extends Command {
    constructor() {
        super('lvl', {
            description: "Узнать свой уровень",
        });
    }

   async run(interaction: CommandInteraction) {
       let user: IMyDiscordUser = await sql.getUser(interaction.user.id);
       interaction.reply(`Уровень равен: ${user.lvl}-му`);
    }
}