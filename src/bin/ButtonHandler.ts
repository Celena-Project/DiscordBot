import { ApplicationCommand, ApplicationCommandManager, ButtonInteraction, Collection } from "discord.js";
import glob from "glob";
import path from "node:path";
import { promisify } from "util";
import { My } from "../My";
import { BaseClient } from "./BaseClient";
import { Command } from "./features/Command";

const globify = promisify(glob);


export class ButtonHandler {
    public buttons: Collection<string, (interaction: ButtonInteraction) => {}> = new Collection<string, (interaction: ButtonInteraction) => {}>();// id, method
    public names: Collection<string, (interaction: ButtonInteraction) => {}> = new Collection<string, (interaction: ButtonInteraction) => {}>();
    public subscribe(messageId: string, func: (ButtonInteraction) => any ): void{
        this.buttons[messageId] = func;
    }
    public pressed(interaction: ButtonInteraction): void{
        let n = this.names[interaction.customId];
        if(n != undefined) n(interaction);
        let b = this.buttons[interaction.message.id];
        if(b != undefined) b(interaction);
        

    }
    public subscribeAsName(name: string, func: (ButtonInteraction) => any){
        this.names[name] = func;
    }
}
