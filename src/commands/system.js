// import { CommandInteraction } from "discord.js";
// import { Command } from "../bin/features/Command";

// import { SlashCommandBuilder } from "@discordjs/builders";
// import API from "../features/utils/api";
// import { My } from "../My";
// import TextConsole from "../features/utils/textConsole";

// export default class extends Command {
    
//     constructor() {
//         super('system', {
//             description: "Управление Celena",
//             command: new SlashCommandBuilder()
//             .addSubcommandGroup(g => 
//                 g.setName("servers")
//                 .setDescription("Сервера")
//                 .addSubcommand(c => 
//                     c.setName("reload")
//                     .setDescription("Перезагрузить сервер")
//                     .addStringOption(x => x.setName("server").setDescription("Сервера")
//                     .addChoices(My.serverTypes)
//                     .setRequired(true))
//                     .addBooleanOption(o =>
//                         o.setName("save")
//                         .setDescription("Безопасная перезагрузка")
//                         .setRequired(false)))),
//             userPermissions: ["ADMINISTRATOR"],
//             subcommands: true
//         });
//     }

//    async run(interaction: CommandInteraction) {
//        switch(interaction.options.getSubcommandGroup(false)){
//            case "servers": {
//                switch(interaction.options.getSubcommand(false)){
//                    case "reload":{
//                       this.reloadServer(interaction);
//                    }break;
//                }
//            }break;
//        }
//     }
//     private async reloadServer(interaction: CommandInteraction): Promise<void>{
//         let port: number = parseInt(interaction.options.get("server").value.toString().split("_")[0].split(":")[1]);
//         let status = await API.reloadServer(port, interaction.options.getBoolean("save") || false);
//         if(!status) return interaction.reply("Не удалось перезагрузить сервер");
//         interaction.reply("Сервер успешно ушёл на перезагрузку");
//     }
// }