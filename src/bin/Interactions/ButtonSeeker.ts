import {ButtonInteraction} from "discord.js";

export class ButtonSeeker{
    private static readonly _seekers:any = {};
    public static get seekers(){
        return this._seekers;
    }
    public static onClick(messageId: string, buttonName: string, callback: ((interaction: ButtonInteraction) => any)): void{
        if(!this._seekers[messageId])
            this._seekers[messageId] = {};
        if(!this._seekers[messageId][buttonName])
            this._seekers[messageId][buttonName] = [];
        this._seekers[messageId][buttonName].push(callback);
    }
}
