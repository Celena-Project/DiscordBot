import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyMessage } from "../interfaces/IMyMessage";
import Util from "../Util";
import TimeManager from "./timeManager";

export default class MyMath extends Util{
    run(){

    }
    public static RoundWithoutDec(number: number): number{
        return parseInt(`${number.toString().split(".")[0]}`); 
    }
}