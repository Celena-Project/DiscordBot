import { GuildMemberRoleManager, MessageEmbed, PermissionResolvable, TextBasedChannel, TextChannel, VoiceState } from "discord.js";
import { EventHandler } from "../../../bin/EventHandler";
import { My } from "../../../My";
import Util from "../../Util";
import axios from "axios";
export default class Nsfw extends Util {
    run() {
        // try {
        //     let channel = My.celena.channels.resolve(`670353917506486303`) as TextChannel;
        //     setInterval(function () {
        //         axios('https://nekobot.xyz/api/image?type=hentai')
        //             .then(res => JSON.parse(res.data)())
        //             .then((out: any) => {
        //                 const embed = new MessageEmbed()
        //                     .setColor("RANDOM")
        //                     .setTimestamp()
        //                     .setImage(out.message)

        //                 channel.send({embeds: [embed]});
        //             });
        //     }, 300000);
        // } catch { }
    }
}