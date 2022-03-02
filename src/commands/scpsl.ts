import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { IMyScpUser } from "../features/interfaces/IMyScpuser";
import Mysql from "../features/utils/mysql";
import TextTools from "../features/utils/textTools";


export default class extends Command {
    constructor() {
        super('scpsl', {
            description: "Инструмент для работы с SCP:SL",
            command: new SlashCommandBuilder()
                .addSubcommand(x =>
                    x.setName("list")
                    .setDescription("Получить данные")
                    .addStringOption(o => 
                        o.setName("object")
                        .setDescription("о ком")
                        .addChoice("players", "об игроках")
                        .addChoice("admins", "об персонале")
                        .setRequired(true)))
                .addSubcommand(x => 
                    x.setName("clear")
                    .setDescription("Очистить")
                    .addStringOption(o =>
                        o.setName("object")
                        .setDescription("что")
                        .addChoice("admin-time", "время у персонала")
                        .addChoice("time", "время у всех")
                        .addChoice("lvl", "уровни")
                        .setRequired(true)))
                .addSubcommand(x =>
                    x.setName("update")
                    .setDescription("Обновить пользователя")
                    .addStringOption(o =>
                        o.setName("user")
                        .setDescription("steamid64")
                        .setRequired(true))
                    .addStringOption(o =>
                        o.setName("part")
                        .setDescription("Что именно вы хотите изменить")
                        .addChoice("уровень", "lvl")
                        .addChoice("опыт", "xp")
                        .addChoice("права", "role")
                        .addChoice("префикс", "rankName")
                        .addChoice("цвет роли", "rankColor")
                        .setRequired(true))
                    .addStringOption(o =>
                        o.setName("value")
                        .setDescription("Новое значение")
                        .setRequired(true))),
            userPermissions: ["ADMINISTRATOR"]
        });
    }
   public ELEMENTS_IN_SCP_PLAYER: string[] = ["SteamId", "Права", "Префикс", "Цвет ролм", "Уровень", "Опыт", "Время", "Первый заход", "Последний заход"]
   async run(interaction: CommandInteraction) {
       switch(interaction.options.getSubcommand(false)){
           case "list":{
               let users: IMyScpUser[] = await Mysql.requestRaw(`SELECT * FROM scpsl_players ${interaction.options.get("object").value == "об игроках" ? "":"WHERE role != 'player'" }`);
                   let items: any = [];
                   users.forEach(x => {
                       items[items.length] = [];
                       //console.log(items, items[items.length], items.length)
                       items[items.length -1][0] = x.uid;
                       items[items.length -1][1] = x.role;
                       items[items.length -1][2] = x.rankName;
                       items[items.length -1][3] = x.rankColor;
                       items[items.length -1][4] = x.lvl;
                       items[items.length -1][5] = x.xp;
                       items[items.length -1][6] = x.times;
                       items[items.length -1][7] = x.firstJoin;
                       items[items.length -1][8] = x.lastJoin;
                   })
                   let table = TextTools.createTable(this.ELEMENTS_IN_SCP_PLAYER, items);
                   let attachment = new MessageAttachment(Buffer.from(table), interaction.options.get("object").name+".txt");
                   interaction.reply({files: [attachment]});
           }break;
           case "clear":{
               let value = interaction.options.get("object").value;
                if(value == "время у персонала") Mysql.reqQuery("UPDATE scpsl_players SET times = '{}' WHERE role != 'player'");
                if(value == "время у всех") Mysql.reqQuery("UPDATE scpsl_players SET times = '{}' WHERE role = 'player'");
                if(value == "уровни") Mysql.reqQuery("UPDATE scpsl_players SET lvl = 1");
                interaction.reply("Успешно");
           }break;
           case "update":{
            let key = interaction.options.get("part").value.toString();
            Mysql.reqQueryOnce("UPDATE scpsl_players SET ? = ? WHERE uid = ?", key, interaction.options.get("value").value, interaction.options.get("user"));
            interaction.reply(`Успешно изменилось значение у ${interaction.options.get("user").value} ${interaction.options.get("part").value} на ${interaction.options.get("value").value}`);
           }break;
       }
    }
}