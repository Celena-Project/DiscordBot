import {BaseClient} from "./bin/BaseClient";
import * as fs from "fs";
import {Logger} from "./features/Logger";
export const client: BaseClient = new BaseClient();

const folders = [
    'interactive/commands',
    'interactive/events'
];

(() => {
    client.run();
    initializeFolders();
})();


function initializeFolders(): void{
    folders.forEach(x => {
        const path = __dirname + `/${x}`;
        const files = fs.readdirSync(path);
        //console.log(files);
        Logger.debug(`Initialized folder: ${x}`);
        for(const k in files){
            require(`${path}/${files[k]}`);
        }
    })
}

// function getFiles(path: string): string[]{
//     const files: string[] = [];
//     const objects = fs.readdirSync(path);
//     for(const k in objects){
//         let s = false;
//         const f = `${path}/${objects[k]}`;
//         try{
//             fs.readFileSync(f);
//             files.push(f);
//             s = true;
//
//         }catch{}
//         if(!s){
//             getFiles(f).forEach(x => files.push(x));
//         }
//     }
//     return files;
// }