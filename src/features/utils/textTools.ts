import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyMessage } from "../interfaces/IMyMessage";
import { IMyTimeColor } from "../interfaces/IMyTimeColon";
import Util from "../Util";
import MyMath from "./myMath";
import TimeManager from "./timeManager";
import { table } from 'table';
export default class TextTools extends Util{
    run(){

    }
   public static calculateBar(elements: number = 10, proccent: number): string{
       let bar: string = "";
       proccent = Math.round(proccent);
       let filed = Math.round(elements * (proccent / 100));
       for(let i = 0; i <= elements; i++){
           if(i == 0 && filed >= 1){
               bar += "**";
           }
           bar += i <= filed ? "=" : "-";
           if(i == filed){
            bar += "**";
        }
       }
       return `【${bar}】`;
   }
   public static convertMillisToColon(millis: number, needToString: boolean = true): IMyTimeColor | string{
       let leftSeconds = Math.round(millis/1000);
       let hours = MyMath.RoundWithoutDec(leftSeconds / 60 / 60);
       leftSeconds -= hours*60*60;
       let minutes = MyMath.RoundWithoutDec(leftSeconds / 60);
       leftSeconds -= minutes*60;
       return needToString ? `${this.convertNumberToNormalNumber(hours)}:${this.convertNumberToNormalNumber(minutes)}:${this.convertNumberToNormalNumber(leftSeconds)}` : {seconds: leftSeconds, minutes, hours};
   }
   public static convertNumberToNormalNumber(number: number | string): number | string{
        return parseInt(number.toString().length == 1 ? "0" + number : number.toString());
   }
   public static createTable(parms: string[], elements: any /* {[]} */): string{
       let data = [["*"]];
       parms.forEach(x => data[0][data[0].length] = x);
       let counter: number = 0; 
       for(let k in elements){
           data[data.length] = [];
           counter++;
                data[data.length-1][data[data.length-1].length] = counter.toString();
           for(let kk in elements[k]){
               data[data.length-1][data[data.length-1].length] = elements[k][kk];
           }
       }
       return "\n"+table(data);
   }
   
}