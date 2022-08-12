import {DiscordCommand} from "../../bin/DiscordCommand";
import {client} from "../../index";
import {Logger} from "../Logger";

export function DiscordCommandDecorator<T extends { new (...args: any[]): {} }>(constructor: T){
    const instance = new class extends constructor{} as DiscordCommand;
    client.pushCommand(instance);
    client.commandCollection[instance.name] = instance;
    Logger.debug(`Initialized command: ${instance.name}`);
}