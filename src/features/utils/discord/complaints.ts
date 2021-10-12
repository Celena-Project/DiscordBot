import { Collection, GuildChannel, GuildMemberRoleManager, Message, MessageEmbed, MessageManager, MessageReaction, PartialMessageReaction, PartialUser, PermissionResolvable, TextBasedChannels, TextChannel, User, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/eventHandler";
import { My } from "../../../My";
import Util from "../../Util";
const games: any = {
    "<:scplogo:670379761402511365>": "SCP:SL",
    "<:game_Mine:670378872251875348>": "Minecraft",
    "<:se_sehelmet:670381281678196737>": "SpaceEngineers"
}
const MAXIMUM_COMPLAINTS: number = 5;
export default class Complaints extends Util{
    run(){
        My.client.on(`messageReactionAdd`, (reaction, user) => this.messageReactionAdd(reaction, user));
        My.client.on(`messageCreate`, message => this.onMesasge(message));
        My.client.on(`channelCreate`, channel => this.onChannelCreate(channel));
        this.checkMessage();
    }
    private onChannelCreate(channel: GuildChannel): void{
        if(channel.parentId == My.config.celena.complaints.categoryId){
            (channel as TextChannel).send(`<@${channel.name.split("-")[1]}>, ожидайте ответа от <@&838406787077242960>`);
            (channel as TextChannel).send("Если вы хотите закрыть жалобу, пропишите `$close`");
        }
    }
    private onMesasge(message: Message): void{
        if((message.channel as TextChannel).parentId == My.config.celena.complaints.categoryId && message.content == "$close"){
            message.channel.delete();
        }
    }
    private async checkMessage(): Promise<void>{
        await (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannels).messages.fetch();
        let messages: Collection<string, Message> = (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannels).messages.cache;
        if(messages.size == 0){
            this.createEmbed();
        }
    }
    private createEmbed(): void{
        let embed: MessageEmbed = new MessageEmbed();
        embed.setTitle("Жалобы");
        embed.description = `Если вы хотите подать жалобу, нажмите на опредлённую реакцию.`
        for(let k in games){
            embed.description += "\n"+games[k]+"-"+k;
        }
        (My.celena.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannels).send({embeds: [embed]});
    }
    private messageReactionAdd(reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser): void{
        if(reaction.message.id == (My.client.channels.resolve(My.config.celena.complaints.createChannelId) as TextBasedChannels).messages.cache.first().id){
            if(this.canCreateComps(user.id))
            this.createComp(user.id, games[reaction.emoji.toString()]);
            else
            user.send({embeds: [new MessageEmbed().setTitle("Жалобы").setDescription('У вас уже есть жалобы')]});
            reaction.users.remove(user.id);
        }
    }
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