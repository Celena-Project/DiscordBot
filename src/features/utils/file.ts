import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyMessage } from "../interfaces/IMyMessage";
import Util from "../Util";
import TimeManager from "./timeManager";
import * as fs from 'fs';
export default class File extends Util{
    run(){

    }
    public static Write(fileName: string, data: any): void{
        let text: string = typeof(data) == "object" ? JSON.stringify(data) : data;
        console.log(__dirname+ "/../../../data/storage/"+fileName)
        fs.writeFileSync(__dirname+ "/../../../data/storage/"+fileName, text);
    }
    public static Read(fileName: string): any {
        console.log(__dirname+ "/../../../data/storage/"+fileName)
        let text: string = fs.readFileSync(__dirname+ "/../../../data/storage/"+fileName).toString();
        console.log(JSON.parse(text))
        return JSON.parse(text);
    }
}