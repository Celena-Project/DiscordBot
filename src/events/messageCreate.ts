import { Point } from "@influxdata/influxdb-client";
import { ButtonInteraction, CommandInteraction, GuildMemberRoleManager, Interaction, Message, PermissionResolvable } from "discord.js"
import { moveSyntheticComments } from "typescript";
import { Event } from "../bin/features/Event"
import Influx from "../features/utils/influx";
import Security from "../features/utils/security";
import { My } from "../My"

export default class MessageCreateEvent extends Event {
    constructor() {
        super('messageCreate', false)
    }
    
    async run(message: (Message<boolean>)) {
        let point = new Point("messages").stringField("channel", message.channel.id).tag("author", message.author.id);
        Influx.writePoint(point);
    }
}

