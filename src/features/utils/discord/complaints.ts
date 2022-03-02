import { ButtonInteraction, Collection, GuildChannel, GuildMemberRoleManager, Message, MessageActionRow, MessageButton, MessageEmbed, MessageManager, MessageReaction, PartialMessageReaction, PartialUser, PermissionResolvable, TextBasedChannel, TextChannel, User, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/EventHandler";
import { My } from "../../../My";
import Util from "../../Util";
const games: any = {
    "<:scplogo:670379761402511365>": "SCP:SL",
    "<:game_Mine:670378872251875348>": "Minecraft",
    "<:se_sehelmet:670381281678196737>": "SpaceEngineers"
}
const MAXIMUM_COMPLAINTS: number = 5;
export default class Complaints extends Util{
    async run(){
        My.client.on(`messageCreate`, message => this.onMesasge(message));
        My.client.on(`channelCreate`, channel => this.onChannelCreate(channel));
        (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannel).messages.fetch().then(x => {
            if(x.size == 0 || x.filter(z => z.author.id === My.client.user.id).size == 0){
                this.createEmbed();
            }
            
        });
        (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannel).messages.fetch().then(x => {
            x.forEach(c => {
                if(c.author.id == My.client.user.id){
                    My.client.buttonHandler.subscribe(c.id, z => this.onClicked(z));
                }
            })
            
        });
        
        My.client.buttonHandler.subscribeAsName("close-comp-channel", z => this.onTryClose(z));
    }
    private onChannelCreate(channel: GuildChannel): void{
        if(channel.parentId == My.config.celena.complaints.categoryId){
            let row: MessageActionRow = new MessageActionRow();
            row.addComponents(new MessageButton().setCustomId(`close-comp-channel`).setLabel("Закрыть тикет").setStyle("SECONDARY"));
            (channel as TextChannel).send({content: `<@${channel.name.split("-")[1]}>, ожидайте ответа от <@&838406787077242960>`, components: [row]});
        }
    }
    private onMesasge(message: Message): void{
        if((message.channel as TextChannel).parentId == My.config.celena.complaints.categoryId && message.content == "$close"){
            message.channel.delete();
        }
    }
    private createEmbed(): void{
        let embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Жалобы");
        embed.description = `Если вы хотите подать жалобу, нажмите на опредлённую реакцию.`
        let row: MessageActionRow = new MessageActionRow();
        for(let k in games){
            embed.description += "\n"+games[k]+"-"+k;
            row.addComponents(new MessageButton().setCustomId(`vote-game-compaints-${games[k]}`).setLabel(games[k]).setStyle("SUCCESS"));
        }
        
        
        (My.celena.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannel).send({embeds: [embed], components: [row]});
    }
    private onTryClose(z: ButtonInteraction): void{
        if((z.channel as TextChannel).parent.id == My.config.celena.complaints.categoryId){
            z.channel.delete();
        }
        z.deferUpdate();
    }
    private onClicked(z: ButtonInteraction): void{

        if(this.canCreateComps(z.member.user.id)){
            this.createComp(z.user.id, (z.component as MessageButton).label);
            z.deferUpdate();
        }else{
            z.reply({ephemeral: true, embeds: [new MessageEmbed().setTitle("Жалобы").setDescription('У вас уже есть жалобы')]});
        }



    }
    // private messageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void{
    //     if(reaction.message.id == (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannels).messages.cache.first().id){
    //         if(this.canCreateComps(user.id))
    //         this.createComp(user.id, games[reaction.emoji.toString()]);
    //         else
    //         user.send({embeds: [new MessageEmbed().setTitle("Жалобы").setDescription('У вас уже есть жалобы')]});
    //         reaction.users.remove(user.id);
    //     }
    // }
    private canCreateComps(userid: string): boolean{
        let flag: boolean = false;
        let complaints: number = 0;
        My.celena.channels.cache.filter(x => x.parentId == My.config.celena.complaints.categoryId).forEach(x => {
            if(x.name.includes(userid))
                complaints++;
        })
        return complaints < MAXIMUM_COMPLAINTS;
    }
    private createComp(userid: string, game: string){
        My.celena.channels.create(`${game}---${userid}---${Date.now()}`, {parent: My.config.celena.complaints.categoryId,
            permissionOverwrites: [{
                id: My.config.celena.id,
                deny: ['MANAGE_MESSAGES', `VIEW_CHANNEL`],
            },
            {
                id: userid,
                allow: ['SEND_MESSAGES', `VIEW_CHANNEL`]
            },
            {
                id: `838406787077242960`,
                allow: ['SEND_MESSAGES', 'MANAGE_MESSAGES', `VIEW_CHANNEL`]
            }]
        })
    }
}