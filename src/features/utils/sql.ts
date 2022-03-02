import { Connection, createConnection } from "mysql2";
import { My } from "../../My";
import { IMyDiscordUser } from "../interfaces/IMyDiscordUser";
import Util from "../Util";
import Mysql from "./mysql";

export default class sql extends Util{
    run(){

    }
    static async getUser(userid: string): Promise<IMyDiscordUser>{
        return new Promise(async res => {
            let data: IMyDiscordUser = await Mysql.reqQueryOnce("SELECT * FROM discord_users WHERE userid = ? LIMIT 1", userid);
            if(!data){
                this.createUser(userid);
                let newUser: IMyDiscordUser = {userid, xp: 0, lvl: 1, axp: 0, warn: 0, coins: 0}; 
                res(newUser);      
            }
            res(data);
        })
    }
    static async createUser(userid: string): Promise<void>{
        return new Promise(async res => {
            await Mysql.reqQueryOnce("INSERT INTO discord_users (userid) VALUES (?)", userid);
            res();
        })
    }
    static async updateUser(type: string, userid: string, value: number, isNewValue = true, updateOneUser: boolean = true): Promise<void>{
        await Mysql.reqQueryOnce(`UPDATE discord_users SET ${type.toLocaleLowerCase()} = ${isNewValue ? value : `${type.toLocaleLowerCase()} + ${value}`} WHERE userid = ? ${updateOneUser ? "LIMIT 1" : ""}`, userid);
    }
    
}
