import { CommandInteraction } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import Mysql from "../features/utils/mysql";
import { IMyDiscordUser } from "../features/interfaces/IMyDiscordUser";
import sql from "../features/utils/sql";
import Security from "../features/utils/security";


export default class extends Command {
    constructor() {
        super('money', {
            description: "Проверить баланс",
            command: new SlashCommandBuilder()
            .addSubcommand(new SlashCommandSubcommandBuilder()
                .setName("pay")
                .setDescription("Перевести монеты")
                .addUserOption(xx => xx.setName("user")
                    .setDescription("Получатель")
                    .setRequired(true))
                .addIntegerOption(xx => xx.setName("count")
                    .setDescription("Количество монет")
                    .setRequired(true))
                .addBooleanOption(x => x.setName("web")
                    .setDescription("Вы должны бли привязать дискорд на сайт").setRequired(false)))
            .addSubcommand(new SlashCommandSubcommandBuilder().setName("get").setDescription("get money"))
            .addSubcommand(new SlashCommandSubcommandBuilder().setName("set").setDescription("Установить значение")
                .addUserOption(xx => xx.setName("user")
                    .setDescription("Ключ")
                    .setRequired(true))
                .addIntegerOption(xx => xx.setName("value")
                    .setDescription("Новое значение")
                    .setRequired(true)))
        });
    }

    async run(interaction: CommandInteraction) {
        const data: IMyDiscordUser = await Mysql.reqQueryOnce("SELECT coins FROM discord_users WHERE userid = ? LIMIT 1", interaction.user.id);
        switch (interaction.options.getSubcommand(false)) {
            case "get":
                {
                    if (interaction.options.getBoolean("web") || true)
                        interaction.reply(`Баланс в дискорде равен ${data.coins} монет`);

                    break;
                } 
                case "pay":
                    if(data.coins >= interaction.options.getInteger("count")){
                        let reciever: IMyDiscordUser = await sql.getUser(interaction.options.getUser('user').id);
                        sql.updateUser("coins", interaction.user.id, -interaction.options.getInteger("count"), false);
                        sql.updateUser("coins", interaction.options.getUser("user").id, interaction.options.getInteger("count"), false);
                        interaction.reply(`Вы успешно перевели ${interaction.options.getUser("user").tag} ${interaction.options.getInteger("count")} монет`)
                    }else{
                        interaction.reply("У вас недостаточно монет для перевода")
                    }
                break;
                case "set":
                    {
                        if(Security.checkPermissions(interaction.user.id, ["ADMINISTRATOR"])){
                            sql.updateUser("coins", interaction.options.getUser("user").id, interaction.options.getInteger("value"), true);
                            interaction.reply(`Значение в ${interaction.options.getInteger("value")} монет установленно для ${interaction.options.getUser("user")}`);
                        }else
                        Security.responeWithoutPermissions(interaction);
                    }
                    break;
                
        }
    }
}