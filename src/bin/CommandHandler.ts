import { ApplicationCommand, ApplicationCommandManager } from "discord.js";
import glob from "glob";
import path from "node:path";
import { promisify } from "util";
import { My } from "../My";
import { BaseClient } from "./baseClient";
import { Command } from "./features/command";

const globify = promisify(glob);
let commands: ApplicationCommand[] = [];

export class CommandHandler {
    registerCommand(cPath) {
        try {
            let rawCommand = require(cPath);
            rawCommand = rawCommand.default;
            const command: Command = new rawCommand();
            const { name } = path.parse(cPath);
            if(!command.name) command.name = name;
            commands[commands.length] = command.command;
            
            if(!command.global) {
                let guild = My.client.guilds.resolve(My.config.celena.id);
                let found = guild.commands.cache.get(name);
                if(!found) {
                    guild.commands.create(command.command);
                }else
                found.edit(command.command);
            }

            console.debug('Загружена команда: ' + command.name);
            My.client.commands.set(command.name, command);
            
        } catch(e) {
            if(e.message.includes('not a constructor')) return console.error(e);
            console.error("Ошибка загрузки команды ", e);
        }
    } 
    async fetchCommands() {
        const ccommands = await globify(path.normalize(path.join(__dirname, `../commands`)) + "/**/*.ts");
        for await(let command of ccommands) {
            try {
                await this.registerCommand(command);
            } catch(e) {
                console.error(e);
            }
        }

        this.deleteAllCommands();
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
