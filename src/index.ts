import {DiscordCommand} from "./bin/DiscordCommand";
import {ApplicationCommand, CommandInteraction, SlashCommandBuilder} from "discord.js";

function testFunc<T extends { new (...args: any[]): {} }>(constructor: T){
    let newVar = new class extends constructor{} as DiscordCommand;

}

@testFunc
class Human extends DiscordCommand{
    constructor() {
        super(
            "testCommand",
            "Idk",
            new SlashCommandBuilder());
    }
    run(interaction: CommandInteraction): void {

    }

}