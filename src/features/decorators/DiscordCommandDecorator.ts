import {DiscordCommand} from "../../bin/DiscordCommand";

function DiscordCommandDecorator<T extends { new (...args: any[]): {} }>(constructor: T){
    const instance = new class extends constructor{} as DiscordCommand;
}