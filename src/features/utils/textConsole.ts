import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyMessage } from "../interfaces/IMyMessage";
import Util from "../Util";
import TimeManager from "./timeManager";

export default class TextConsole extends Util{
    run(){

    }
    private static _Iterations: Collection<string /*token*/, IMyMessage[]> = new Collection<string /*token*/, IMyMessage[]>();
    public static addMessage(interaction: CommandInteraction, message: string, needToAddTime: boolean = true): void{
        if(this._Iterations[interaction.token] == undefined)
        this._Iterations[interaction.token] = [];
        this._Iterations[interaction.token][this._Iterations[interaction.token].length] = {message, time: needToAddTime ? TimeManager.getNowTime() : undefined};
        this.updateMessage(interaction);
    }
    private static updateMessage(interaction: CommandInteraction): void{
        let message: string = "";
        this._Iterations[interaction.token].forEach(element => {
            message +=`\n${element.time ? `[${element.time}]` : ""} ${element.message}`;
        });
        if(interaction.replied)
            interaction.editReply("```log\n"+message+"```");
        else
            interaction.reply("```log\n"+message+"```");
    }
}