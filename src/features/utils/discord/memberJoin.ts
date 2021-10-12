import { GuildMember, GuildMemberRoleManager, MessageEmbed, PartialGuildMember, PermissionResolvable, TextBasedChannels, TextChannel, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/eventHandler";
import { My } from "../../../My";
import Util from "../../Util";
import axios from "axios";
import sql from "../sql";
export default class MemberJoin extends Util {
    run() {
        My.client.on(`guildMemberAdd`, member => this.onJoin(member));
        My.client.on(`guildMemberRemove`, member => this.onLeave(member));
    }
    private onJoin(member: GuildMember){
        console.log(`Нв сервер зашёл: `+member.user.tag);
        let embed = new MessageEmbed()
        .setColor("#12D62D")
        .setTitle(`На сервер зашёл `)
        .setDescription(`  ${member.user.tag}
        <@${member.user.id}>` )
        .setTimestamp()
        .setImage(member.user.avatarURL());
        (My.celena.channels.resolve(My.config.celena.log.channels.joinChannelId) as TextChannel).send({embeds: [embed]});
        sql.getUser(member.id);
    }
    private onLeave(member: GuildMember | PartialGuildMember){
        console.log(`С сервер ушёл: `+member.user.tag);
        let embed = new MessageEmbed()
        .setColor("#D61212")
        .setTitle(`С сервера ушёл `)
        .setDescription(`  ${member.user.tag}
        <@${member.user.id}>` )
        .setTimestamp()
        .setImage(member.user.avatarURL());
        (My.celena.channels.resolve(My.config.celena.log.channels.joinChannelId) as TextChannel).send({embeds: [embed]});
    }
}