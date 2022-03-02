import { CommandInteraction, TextChannel } from "discord.js";
import { Command } from "../bin/features/Command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { IMyMessage } from "../features/interfaces/IMyMessage";
import { My } from "../My";
import internal from "stream";


export default class extends Command {
    constructor() {
        super('test', {
            description: "Тест",
            command: new SlashCommandBuilder().setName("test").addStringOption(option => option.setName('id').setDescription("a")).setDescription("TestTest")
        });
    }

   async run(interaction: CommandInteraction) {
//         await (My.celena.channels.resolve(`670351570021646357`) as TextChannel).messages.fetch();
//         console.log((My.celena.channels.resolve(`670351570021646357`) as TextChannel).messages.resolve(`855419199223234561`))
//         let embed = (My.celena.channels.resolve(`670351570021646357`) as TextChannel).messages.resolve(`855419199223234561`).embeds[0];
//         embed.setDescription(`
//         Дорогой участник, на нашем проекте ты сможешь найти все, чтобы хорошо провести время, будь это сервера, голосовые и обычные чаты для игр и приятной беседы.
// **Чтобы найти своих единомышленников или нужную информацию, нажми на иконки игр, расположенные чуть ниже данного сообщения.**
// Также мы позаботились о твоем комфорте и создали канал <#748691780081287239>, который показывает все списки серверов на данный момент. 
// Это поможет быстрее находить нужные сервера и облегчит ориентировку по проекту.
// Не забудь ознакомиться с правилами в  канале <#670357154603073557>
// И приглашай друзей и знакомых по [ссылке](https://discord.gg/Ca53vyNkkk), будет весело!
//         `);
//         (My.celena.channels.resolve(`670351570021646357`) as TextChannel).messages.resolve(`855419199223234561`).edit({embeds: [embed]})
    }



    
    
}
