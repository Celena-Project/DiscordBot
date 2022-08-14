// import {BaseCommand} from "../../../bin/Commands/BaseCommand";
// import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";
// import {BaseSubCommand} from "../../../bin/Commands/BaseSubCommand";
// import {SlashCommandSubcommandBuilder} from "@discordjs/builders/dist/interactions/slashCommands/SlashCommandSubcommands";
// //import {DiscordCommandDecorator} from "../../features/decorators/DiscordCommandDecorator";
//
// //@DiscordCommandDecorator
// export default class PingCommands extends BaseSubCommand{
//     constructor() {
//         const command = ((builder: SlashCommandSubcommandBuilder) => {
//         });
//         //command.addSubcommand(x => x.setName("test").setDescription("pi")).addSubcommandGroup(x => x.addSubcommand());
//         super("subping", {
//             description: "Test Subcommand",
//             command,
//             permissions:{
//
//             }
//         })
//     }
//
//     run(interaction: ChatInputCommandInteraction): void {
//         console.log("Test command echo")
//         interaction.reply("Pong pong pong!");
//     }
//
// }