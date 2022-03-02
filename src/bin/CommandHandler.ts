import { ApplicationCommand, ApplicationCommandManager, ChatInputApplicationCommandData } from "discord.js";
import glob from "glob";
import path from "node-path"
import { promisify } from "util";
import { My } from "../My";
import { Command } from "./features/Command";
const fs = require(`fs`)
const globify = promisify(glob);
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
let commands: ApplicationCommand[] = [];

export class CommandHandler {
    registerCommand(cPath) {

            let rawCommand = require(cPath);
            rawCommand = rawCommand.default;
            const command: Command = new rawCommand();
            const name = cPath.split('/').pop().split('.')[0];
            if(!command.name) command.name = name;
            commands[commands.length] = command.command;
            console.debug(`Инициализированна ${command.global ? "глобальная " : ""}команда: ` + command.name);
            My.client.commands.set(command.name, command);
            

    }
    private rest = new REST({ version: '9' }).setToken(My.config.bot.token);
    async uploadCommands(){
        console.log("Загрузка команд..");
        let er;
        try{
            await this.rest.put(
                Routes.applicationGuildCommands(My.client.user.id, My.celena.id),
                { body: commands },
            );
        }catch(error){
            er = error;
        }
        if(er) console.error("Произошла ошибка во время загрузки команды: ", er);
        else console.success("Загрузка прошла успешно!");
    }
    async fetchCommands() {
        const ccommands = fs.readdirSync(__dirname+ "/../commands").filter(x => x.endsWith(".ts")).map(x => `${__dirname}/../commands/${x}`);
        for await(let command of ccommands) {
            try {
                
                await this.registerCommand(command);
            } catch(e) {
                console.error(e);
            }
        }

        //this.deleteAllCommands();
        this.uploadCommands();
        // revorkeCommands();
    }
    async deleteAllCommands(){
        return new Promise(async res => {
        My.client.guilds.resolve(My.config.celena.id).commands.fetch().then(commands => commands.forEach(cmd => {
            if(!My.config.bot.commands.our.includes(cmd.name)){
                let z: boolean = true;
                commands.forEach(x => {
                    if(x.name == cmd.name)
                        z = true;
                })
                if(!z){
                    cmd.delete();
                    console.log(cmd.name)                        
                }
            }
                res(true);
                
                
        }))
        })
    }
}
