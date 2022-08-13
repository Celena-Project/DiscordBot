// import {BaseCommand} from "../../bin/BaseCommand";
// import {client} from "../../index";
// import {Logger} from "../Logger";
//
// export function DiscordCommandDecorator<T extends { new (...args: any[]): {} }>(constructor: T){
//     const instance = new class extends constructor{} as BaseCommand;
//     client.pushCommand(instance);
//     client.commandCollection[instance.name] = instance;
//     Logger.debug(`Initialized command: ${instance.name}`);
// }