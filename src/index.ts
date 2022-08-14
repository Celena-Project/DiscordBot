import {BaseClient} from "./bin/BaseClient";
import * as fs from "fs";
import {Logger} from "./features/Logger";
import {registerCommands} from "./bin/CommandHandler";
export const client: BaseClient = new BaseClient();

const folders = [
   // 'interactive/commands',
    'interactive/events'
];
const init = () => {
    initializeFolders();
    registerCommands();
    client.run();
};



function initializeFolders(): void{
    folders.forEach(x => {
        // const path = __dirname + `/${x}`;
        // const files = fs.readdirSync(path);
        // //console.log(files);
        // Logger.debug(`Initialized folder: ${x}`);
        // for(const k in files){
        //     require(`${path}/${files[k]}`);
        // }
        const files = getFiles(`${__dirname}/${x}`);
    })
}

export function getFiles(path: string): string[]{
    const files: string[] = [];
    const objects = fs.readdirSync(path);
    for(const k in objects){
        let s = false;
        const f = `${path}/${objects[k]}`;
        try{
            fs.readFileSync(f);
            files.push(f);
            s = true;

        }catch{}
        if(!s){
            getFiles(f).forEach(x => files.push(x));
        }
    }
    return files;
}
export function getDirectoryElements(path: string): IDirectoryElements{
    const res = {files: [], directories: []} as IDirectoryElements;
    const objects = fs.readdirSync(path);
    for(const k in objects){
        let s = false;
        try{
            fs.readFileSync(`${path}/${objects[k]}`);
            s = true;

        }catch{}
        if(s)
            res.files.push(objects[k]);
        else
            res.directories.push(objects[k]);
    }
    return res;
}
interface IDirectoryElements{
    files: string[];
    directories: string[]
}


init();

