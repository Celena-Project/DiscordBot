import axios from "axios";
import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyCelenaServer } from "../interfaces/IMyCelenaServer";
import { IMyMessage } from "../interfaces/IMyMessage";
import Util from "../Util";
import TimeManager from "./timeManager";
export default class API extends Util{
    run(){

    }
    public static async fetchServers(): Promise<void>{
        My.servers = await this.getServers();
        My.serverTypes = await this.getServerTypes();
        return;
    }
    public static async getServers(): Promise<IMyCelenaServer[]>{
        let servers: IMyCelenaServer[] = [];
        await axios("https://api.celena.tk/api/getserverlist").then(x =>{
            servers = x.data as IMyCelenaServer[];
        })
        return servers;
    }
    public static async getServerTypes(): Promise<[name: string, value: string][]>{
        let servers = await this.getServers();
        let str: [name: string, value: string][] = []; 
        console.log("Получен список серверов");
        servers.forEach(server => {
            str[str.length] = [server.name, `${server.address}_${server.name}`]
        })
        return str;
    }
    static async reloadServer(port: number, save: boolean): Promise<boolean>{
        let status: boolean = false;

        return status;
    }
}