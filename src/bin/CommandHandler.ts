import {client, getDirectoryElements, getFiles} from "../index";
import {BaseCommand} from "./Commands/BaseCommand";
import {Logger} from "../features/Logger";
import {BaseSubCommand} from "./Commands/BaseSubCommand";
import {DiscordSlashCommand} from "./Commands/DiscordSlashCommand";
import {BaseSubCommandGroup} from "./Commands/BaseSubCommandGroup";

const path = __dirname + "/../interactive/commands";
export function registerCommands(): void{
    const elms = getDirectoryElements(path);
    const commands: { [key: string]: BaseCommand } = {};
    const subCommands: { [key: string]: BaseSubCommand[] } = {};
    const subCommandGroups: { [key: string]: BaseSubCommandGroup[] } = {};
    const subCommandGroupCommands: { [key: string]: { [key: string]: BaseSubCommand[] } } = {};
    //Parsing
    for(const k in elms.files){
        const link = require(`${path}/${elms.files[k]}`);
        if(link){
            const instance = new link.default() as BaseCommand;
            commands[instance.name] = instance;
        }
    }
    for(const k in elms.directories){
        const dir = elms.directories[k];
        const dirElms = getDirectoryElements(`${path}/${dir}`);
        for(const j in dirElms.files){
            const link = require(`${path}/${elms.directories[k]}/${dirElms.files[j]}`);
            if(link.default){
                const instance = new link.default();
                if(link.default.toString().split('\n')[0].split('.')[1].split(' {')[0] === "BaseSubCommand") { // Is sub command
                    if(!subCommands[dir])
                        subCommands[dir] = [];
                    subCommands[dir].push(instance);
                }else{
                    console.log(link.default.toString().split('\n')[0].split('.')[1].split(' {')[0])
                    if(!subCommandGroups[dir])
                        subCommandGroups[dir] = [];
                    subCommandGroups[dir].push(instance);
                }
            }
        }
        for(const j in dirElms.directories){
            const dDir = dirElms.directories[j];
            const dirElmsFiles = getDirectoryElements(`${path}/${dir}/${dDir}`);
            for(const p in dirElmsFiles){
                const dirElmsCurFile = dirElmsFiles[p];
                const link = require(`${path}/${elms.directories[k]}/${dirElms.directories[j]}/${dDir}/${dirElmsCurFile}`);
                if(link){
                    const instance = new link.default();
                    if(!subCommandGroupCommands[dir][dDir])
                        subCommandGroupCommands[dir][dDir] = []
                    subCommandGroupCommands[dir][dDir].push(instance);
                }

            }
        }
    }
    // Implementation
    for(const k in commands){
        const curCommand = commands[k];
        client.commands[curCommand.name] = curCommand;
        if(!subCommands[curCommand.name] && !subCommandGroups[curCommand.name])
            Logger.debug(`Loaded command: ${curCommand.name}`);
        for(const j in subCommands[curCommand.name]){
            const curSubCommand = subCommands[curCommand.name][j];
            curCommand.command.addSubcommand(x => {
                subCommands[curCommand.name][j].command(x);
                x.setName(curSubCommand.name);
                x.setDescription(curSubCommand.description);
                return x;
            });
            if(!client.subCommands[curCommand.name]) client.subCommands[curCommand.name] = [];
            client.subCommands[curCommand.name][j] = curSubCommand;
            Logger.debug(`Loaded command: ${curCommand.name}:${curSubCommand.name}`);
        }
        for(const j in subCommandGroups[curCommand.name]){
            const curSubCommandGroup = subCommandGroups[curCommand.name][j];

            if(!client.subCommandGroups[curCommand.name][j]) client.subCommandGroups[curCommand.name] = [];
            client.subCommandGroups[curCommand.name][j] = curSubCommandGroup;
            Logger.debug(`Loaded command: ${curCommand.name}:${curSubCommandGroup.name}`);

            curCommand.command.addSubcommandGroup(x => {
                curSubCommandGroup.command(x);
                x.setName(curSubCommandGroup.name);
                x.setDescription(curSubCommandGroup.description);
                for(const p in subCommandGroupCommands[curCommand.name][curSubCommandGroup.name]){
                    const curSubCommandGroupCommand = subCommandGroupCommands[curCommand.name][curSubCommandGroup.name][j];
                    x.addSubcommand(z => {
                        curSubCommandGroupCommand.command(z);
                        z.setName(curSubCommandGroupCommand.name);
                        z.setDescription(curSubCommandGroupCommand.description);
                        return z;
                    });
                    if(!client.subCommandGroupCommands[curCommand.name][j][p]) client.subCommandGroupCommands[curCommand.name][j] = [];
                    client.subCommandGroupCommands[curCommand.name][j][p] = curSubCommandGroupCommand;
                    Logger.debug(`Loaded command: ${curCommand.name}:${curSubCommandGroup.name}:${curSubCommandGroupCommand.name}`);
                }
                return x;
            });
        }
        client.commandsList.push(curCommand);
    }
}