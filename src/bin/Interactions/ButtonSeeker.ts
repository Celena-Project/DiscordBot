import {ButtonInteraction} from "discord.js";

export class ButtonSeeker{
    private static readonly _seekers:any = {_: {}};
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
    public static onGlobalClick(buttonName: string, callback: ((interaction: ButtonInteraction) => any)): void{
        if(!this._seekers._[buttonName])
            this._seekers._[buttonName] = [];
        this._seekers._[buttonName].push(callback);
    }
}
