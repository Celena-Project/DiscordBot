import {client, getDirectoryElements, getFiles} from "../index";
import {BaseCommand} from "./Commands/BaseCommand";
import {Logger} from "../features/Logger";
import {BaseSubCommand} from "./Commands/BaseSubCommand";
import {IBaseCommand} from "./Commands/IBaseCommand";
import {BaseSubCommandGroup} from "./Commands/BaseSubCommandGroup";

const path = __dirname + "/../interactive/commands";
export function registerCommands(): void{
    const elms = getDirectoryElements(path);
    const commands: { [key: string]: BaseCommand } = {};
    const subCommands: { [key: string]: BaseSubCommand[] } = {};
    const subCommandGroups: { [key: string]: BaseSubCommandGroup[] } = {};
    const subCommandGroupCommands: { [key: string]: { [key: string]: BaseSubCommand[] } } = {};
    for(const k in elms.files){
        const link = require(`${path}/${elms.files[k]}`);
        const instance = new link.default() as BaseCommand;
        commands[instance.name] = instance;
    }
    for(const k in elms.directories){
        const dir = elms.directories[k];
        const dirElms = getDirectoryElements(`${path}/${dir}`);
        for(const j in dirElms.files){
            const link = require(`${path}/${elms.directories[k]}/${dir}`);
            const instance = new link.default();
            const baseInfo = instance as IBaseCommand;
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
        for(const j in dirElms.directories){
            const dDir = dirElms.directories[j];
            const dirElmsFiles = getDirectoryElements(`${path}/${dir}/${dDir}`);
            for(const p in dirElmsFiles){
                const dirElmsCurFile = dirElmsFiles[p];
                const link = require(`${path}/${elms.directories[k]}/${dirElms.directories[j]}/${dDir}/${dirElmsCurFile}`);
                const instance = new link.default();
                if(!subCommandGroupCommands[dir][dDir])
                    subCommandGroupCommands[dir][dDir] = []
                subCommandGroupCommands[dir][dDir].push(instance);

            }
        }
    }
}