// import { ButtonInteraction, CommandInteraction, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
// import { Command } from "../bin/features/Command";

// import { SlashCommandBuilder } from "@discordjs/builders";
// import { My } from "../My";
// import { IMyCurrentSong } from "../features/interfaces/IMyCurrentSong";
// import TextTools from "../features/utils/textTools";
// import Security from "../features/utils/security";
// const { Player } = require("discord-player");
// const player = new Player(My.client);

// // add the trackStart event so when a song will be played this message will be sent
// player.on("trackStart", (queue, track) => songStarted(queue, track));
// player.on(`trackEnd`, (queue, track) => songEnded(queue, track));
// player.on(`debug`, (z, message) => console.debug(message));
// player.on(`error`, (z ,er) => console.error(er));
// My.client.buttonHandler.subscribeAsName("stop", z => stopDOP(z));
// export default class extends Command {
//     constructor() {
//         super('music', {
//             description: "Музыка",
//             command: new SlashCommandBuilder()
//             .addSubcommand(x =>
//                 x.setName("play")
//                 .setDescription("Проигрыать музыку")
//                 .addStringOption(q =>
//                     q.setName("url")
//                     .setDescription("Ссылка на ютуб")
//                     .setRequired(true)))
//         });
//     }
//    async run(interaction: CommandInteraction) {
//        switch(interaction.options.getSubcommand(false)){
//            case "play":{
//                console.log(My.celena.members.resolve(interaction.user.id).voice.channelId)
//                if(My.celena.members.resolve(interaction.user.id).voice.channelId != undefined){
//                 play(interaction);
//                }else
//                 interaction.reply({content: "Вы не находитесь в голосовм канале", ephemeral: true});
//            }
//            break;
//        }
//     }
    
// }
// let embed: MessageEmbed = new MessageEmbed();
// function edit(interaction: CommandInteraction): void {
//     embed.setTitle(currentSong.title);
//     let text: string;
//     let proccent: number = Math.round((((Date.now() - currentSong.startTimestamp) / 1000) / ((parseInt(currentSong.duration.toString().split(":")[0])*60) + parseInt(currentSong.duration.toString().split(":")[1]))) * 100);
//     text = `${proccent}%\n${TextTools.calculateBar(50, proccent)}\nОсталось до конца: ${TextTools.convertMillisToColon(currentSong.secondDuration*1000 - (Date.now() - currentSong.startTimestamp), true)}`;
//     embed.setDescription(text);
//     interaction.editReply({embeds: [embed]});
// }
// function songStarted(queue, track): void {
//     editInterval = setInterval(() => edit(queue.metadata.interaction), 2000);
    
// }
// function stopDOP(interaction: ButtonInteraction): void {
//     //console.log(interaction);
//     if(Security.checkPermissions(interaction.user.id, ["ADMINISTRATOR"])){
//         if(musicIsPlaying){
//             currentSong.queue.stop();
//             stop();
//         }
//     }
//     else interaction.reply({content: "Идёшь нахуй по причине: конченный долбоёб", ephemeral: true});
// }
// async function songEnded(queue: any, track: any): Promise<void>{
//     stop();
// }
// async function stop(): Promise<void> {
//     clearInterval(editInterval);
//     musicIsPlaying = false;
//     //console.log(currentSong.interaction, currentSong.interaction as CommandInteraction)
//     await (currentSong.interaction as CommandInteraction).editReply({embeds: [new MessageEmbed().setTitle('Успешно').setDescription("Проиграло")], components: []});
//     clear();
// }
// function clear(): void{
//     currentSong = {
//         title: "",
//         duration: 0,
//         secondDuration: 0,
//         startTimestamp: 0,
//         interaction: undefined,
//         queue: undefined
//     };
// }
// let editInterval: NodeJS.Timer;
// let musicIsPlaying: boolean = false;
// let currentSong: IMyCurrentSong = {
//     title: "",
//     duration: 0,
//     secondDuration: 0,
//     startTimestamp: 0,
//     interaction: undefined,
//     queue: undefined
// };
// async function play(interaction: CommandInteraction): Promise<void>{
//     if(musicIsPlaying){
//         return interaction.reply({content: "Музыка уже играет", ephemeral: true});
//     }
//     const query = interaction.options.get("url").value;
//     const queue = player.createQueue(interaction.guild, {
//         metadata: {
//             interaction,
//             channel: interaction.channel
//         }
//     });
//     console.log("arar")
//     // verify vc connection
//     try {
//         console.log(My.celena.members.resolve(interaction.user.id).voice.channelId, `s`)
//         if (!queue.connection) await queue.connect(My.celena.members.resolve(interaction.user.id).voice.channelId);
//     } catch (e){
//         console.error(e);
//         queue.destroy();
//         return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
//     }

//     await interaction.deferReply();
//     const track = await player.search(query, {
//         requestedBy: interaction.user
//     }).then(x => x.tracks[0]);
//     if (!track) interaction.followUp({ content: `❌ | Track **${query}** not found!` });
//     else{
//         currentSong.duration = track.duration;
//         currentSong.title = track.title;
//         currentSong.interaction = interaction;
//         currentSong.startTimestamp = Date.now();
//         currentSong.secondDuration = `${track.duration}`.split(':').length == 3 ?
//         parseInt(`${track.duration}`.split(':')[0]) * 60*60+ parseInt(`${track.duration}`.split(':')[1])*60 + parseInt(`${track.duration}`.split(':')[0])
//         : `${track.duration}`.split(':').length == 2 ? parseInt(`${track.duration}`.split(':')[1])*60 + parseInt(`${track.duration}`.split(':')[0])
//         : parseInt(`${track.duration}`);
//         console.log(track.duration)
//         queue.play(track);
//         currentSong.queue = queue;
//         let row: MessageActionRow = new MessageActionRow();
//         row.addComponents(new MessageButton().setCustomId("stop").setLabel("Остановить").setStyle("DANGER"));
//         interaction.followUp({ content: null,components: [row] , embeds: [new MessageEmbed().setTitle("Ожидание..").setDescription(currentSong.title).setColor('AQUA')]});
//         musicIsPlaying = true;
//     }
// }
