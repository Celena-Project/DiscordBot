import { GuildMemberRoleManager, PermissionResolvable, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/EventHandler";
import { My } from "../../../My";
import Util from "../../Util";

export default class VoiceRooms extends Util{
    run(){
        My.client.on('voiceStateUpdate', (oldState, newState) => this.voiceChannelUpdate(oldState, newState));
    }
    private voiceChannelUpdate(oldState: VoiceState, newState: VoiceState): void{
        if(newState?.channelId == My.config.celena.voice.voiceRooms.createChannelId)
            this.createChannel(newState.member.id);
        if(oldState?.channel?.parentId == My.config.celena.voice.voiceRooms.categoryId && oldState?.channelId != My.config.celena.voice.voiceRooms.createChannelId)
            if(oldState.channel.members.size == 0)
                oldState.channel.delete();
    }
    private createChannel(userid: string): void{
        My.celena.channels.create(My.client.users.resolve(userid).tag, {
            type: `GUILD_VOICE`,
            parent: My.config.celena.voice.voiceRooms.categoryId,
            permissionOverwrites: [
              {
                 id: My.config.celena.id, //Права для роли @everyone
                 allow: ["VIEW_CHANNEL"]
              },
              {
                id: userid, //Права для создателя канала
                allow: ["VIEW_CHANNEL", "MANAGE_CHANNELS"]
              }
            ]
          }).then(ch => My.celena.members.resolve(userid).voice.setChannel(ch));
    }
    
}