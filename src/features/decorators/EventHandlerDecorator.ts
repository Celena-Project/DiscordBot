import {DiscordCommand} from "../../bin/DiscordCommand";
import {client} from "../../index";
import {ClientEvents} from "discord.js";
import {IEventHandler} from "../../bin/IEventHandler";
import {Logger} from "../Logger";

export function EventHandlerDecorator(event: string){
    return <T extends { new (...args: any[]): {} }>(constructor: T) => {
        Logger.debug(`${constructor.name} subscribed for ${event}`)
        const instance = new class extends constructor{} as IEventHandler;
        client.on(event, instance.run);
    }
}