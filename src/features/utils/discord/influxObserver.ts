import { ClientUser, GuildMemberRoleManager, MessageEmbed, PermissionResolvable, TextBasedChannel, TextChannel, VoiceChannel, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/EventHandler";
import { My } from "../../../My";
import Util from "../../Util";
import axios from "axios";
import { InfluxWriter } from "../influx";
import { Point } from "@influxdata/influxdb-client";
export default class Nsfw extends Util {
    private writer: InfluxWriter = new InfluxWriter("MINUTE", 1, true);
    run() {
        setInterval(() => {
            this.voiceObserve();
            this.memberObserve();
        }, 60000)
    }
    /// Basic
    private memberObserve(): void{
        My.celena.members.fetch().then(x => {
            this.writer.addPoint(new Point("members").tag("guild", "default").intField("members", x.size).intField("online", x.filter(z => !z.user.bot && z.presence && z.presence.status && z.presence.status != "offline").size)) 
        })
    }
    /// <Basic
    /// VOICE
    private voiceObserve(): void{
        let channels = [];
            My.celena.channels.cache.forEach(x => {
                if(x.type == "GUILD_VOICE"){
                   if((x as VoiceChannel).members.size > 0){
                       channels.push({name: x.name, id: x.id, members: x.members.size})
                   }
                }
            })
            channels.forEach(x => {
                this.writer.addPoint(new Point("voice-active").tag("id", x.id).stringField("name", x.name).intField("members", x.members));
            })
    }
    /// <VOICE
}