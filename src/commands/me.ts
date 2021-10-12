import { CommandInteraction, MessageEmbed } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { My } from "../My";
import sql from "../features/utils/sql";
import Mysql from "../features/utils/mysql";


export default class extends Command {
    constructor() {
        super('me', {
            description: "Узнать информацию о себе",
        });
    }

    async run(interaction: CommandInteraction) {
        let embed = new MessageEmbed();
        let user = My.client.users.resolve(interaction.user.id);
        let discordUser = await sql.getUser(user.id);
        let webUser = await Mysql.reqQueryOnce("SELECT * FROM data_users WHERE discordid = ? LIMIT 1", user.id);
        embed.setTitle(`Информация о ${interaction.member.user.username}`)
        embed.setThumbnail(interaction.user.avatarURL());
        embed.addField("Discord",
         `Аккаунт создан: <t:${Math.round(user.createdTimestamp / 1000)}:R>
          Дата входа в дискорд Celena: <t:${Math.round(My.celena.members.resolve(user.id).joinedTimestamp / 1000)}:R>
          Уровень в дискорде: ${discordUser.lvl}
          Монет в дискорде: ${discordUser.coins}`);
        embed.addField("WebSite", webUser?.id <= 1 ? "Вы не привязали свой дискорд в аккаунт" :
        `ID: ${webUser.id}
        Nickname: ${webUser.username}
        Права: ${webUser.permissions}`);
        interaction.reply({embeds: [embed]});
    }
}