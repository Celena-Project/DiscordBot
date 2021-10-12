import glob from "glob";
import path from "path";
import { promisify } from "util";
import Util from "./Util";
import fs from "fs";
const globify = promisify(glob);
export class UtilManager {
    static async init() {
        let utils: string[] = [];
        utils = await globify(path.normalize(path.join(__dirname, `./utils`)) + "/**/*.ts");
        fs.readdirSync(__dirname+`/utils/`).forEach(async x => {
            if(!x.endsWith(".ts")){
                let files: any = await globify(path.normalize(path.join(__dirname, `./utils/`+x)) + "/**/*.ts");
                utils[utils.length] = files;
            }
        })
        utils.map(this.register);
    }
    static register(path: string) {
        try {
            let file = require(path);
            file = file.default;
            let util: Util = new file();
            util.run();
            console.debug('Загружена утилита: ' + path.split('/')[path.split('/').length-1]);

        } catch (e) {
            if (e.message.includes('not a constructor')) return;
            console.error("Ошибка загрузки утилиты ", e);
        }
    }
}