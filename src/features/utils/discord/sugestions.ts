import { ButtonInteraction, Collection, GuildMemberRoleManager, Message, MessageActionRow, MessageButton, MessageEmbed, PermissionResolvable, TextChannel, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/EventHandler";
import { My } from "../../../My";
import Util from "../../Util";
import File from "../file";
export default class Suggestions extends Util{
    run(){
       My.client.on(`messageCreate`, message => Suggestions.onMessage(message));
       My.client.buttonHandler.subscribeAsName("suggestions-vote-yes", z => Suggestions.onClicked(true, z));
       My.client.buttonHandler.subscribeAsName("suggestions-vote-no", z => Suggestions.onClicked(false, z));
       My.client.buttonHandler.subscribeAsName("suggestions-create-thread", z => Suggestions.createThreat(z));
    }
    private static createThreat(z: ButtonInteraction): void{
        (My.celena.channels.resolve(z.channelId) as TextChannel).messages.fetch().then(x => {
            let message = x.filter(c => c.id == z.message.id).first();
            let rows = message.components;
            let components = rows[0].components;
            if(components.length == 3){
                rows[0].components = [components[0], components[1]];
                message.edit({components: rows, embeds: message.embeds});
                message.startThread({name: message.embeds[0].description.substring(0, 30), autoArchiveDuration: "MAX", })
            }
        })
        z.deferUpdate();
    }    
    private static onMessage(message: Message): void{
        if(My.config.celena.sugestions.channelId == message.channelId && message.channel.isText() && !message.channel.isThread()) {
            if(message.author.id == My.client.user.id){
                if(message.embeds && message.embeds.length > 0){
                    
                }
            }else{
                let embed = new MessageEmbed()
                .setAuthor({name: message.author.tag, iconURL: message.author.avatarURL()})
                .setTitle(" ")
                .setDescription(`${message.content}`)
                message.delete();
                let row: MessageActionRow = new MessageActionRow();
                row.addComponents(new MessageButton().setCustomId("suggestions-vote-yes").setLabel("👍 0").setStyle("SUCCESS"));
                row.addComponents(new MessageButton().setCustomId("suggestions-vote-no").setLabel("👎 0").setStyle("DANGER"));
                row.addComponents(new MessageButton().setCustomId("suggestions-create-thread").setLabel("Открыть тред").setStyle("SECONDARY"));
                message.channel.send({embeds: [embed], components: [row]});
            }
            
        }
       
    }
    private static onClicked(isAgree: boolean, z: ButtonInteraction): void{
        console.log("a1")
        if(z.channelId != My.config.celena.sugestions.channelId) return;
        let suggestions = File.Read("sugestions.json");
        if(suggestions[z.message.id] == undefined) suggestions[z.message.id] = [];
        let users = suggestions[z.message.id] as IMyVotePlayer[]; 
        if(users.filter(x => x.id == z.member.user.id).length > 0){
            for(let k in users){
                if(users[k].id == z.member.user.id){
                    users[k].voteType = isAgree ? "YES" : "NO";
                }
            }
        }else{
            suggestions[z.message.id].push({id: z.member.user.id, voteType: isAgree ? "YES" : "NO"});
        }

        File.Write("sugestions.json", suggestions);
        let agree: number = 0;
        let deny: number = 0;
        for(let k in users){
            if(users[k].voteType == "YES") agree++;
            else deny++;
        }
        (My.celena.channels.resolve(z.channelId) as TextChannel).messages.fetch().then(x => {
                let c = x.filter(f => f.id == z.message.id).first(); 
                let components = c.components;
                for(let kk in components){
                    if(components[kk].type == "ACTION_ROW"){
                        let row: MessageActionRow = components[kk] as MessageActionRow;
                        for(let rI in row.components){
                            if(row.components[rI].customId == "suggestions-vote-yes"){
                                let oldLabel = (row.components[rI] as MessageButton).label;
                                ((components[kk] as MessageActionRow).components[rI] as MessageButton).label = `${oldLabel.split(' ')[0]} ${agree}`
                            }else if(row.components[rI].customId == "suggestions-vote-no"){
                                let oldLabel = (row.components[rI] as MessageButton).label;
                                ((components[kk] as MessageActionRow).components[rI] as MessageButton).label = `${oldLabel.split(' ')[0]} ${deny}`
                            }
                        }
                    }
                }
                
            z.channel.messages.fetch().then(o => {
                let message = o.filter(mes => mes.author.id == My.client.user.id && mes.id == z.message.id).first();
                //console.log(message)
                message.edit({embeds: c.embeds, components});
            })
        })
        z.deferUpdate();
    }
}
interface IMyVotePlayer{
    id: string,
    voteType: "YES" | "NO"
}