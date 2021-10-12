import { Connection, createConnection } from "mysql2";
import { My } from "../../My";
import { IMyDiscordUser } from "../interfaces/IMyDiscordUser";
import Util from "../Util";
import Mysql from "./mysql";

export default class TimeManager extends Util{
    run(){

    }
    public static getNowTime(): string{
        let time: string = "";
        const now = ((new Date()).toISOString()).split('T')[1];
        time = `${now.split('.')[0]}`
        return time;
    }
}
