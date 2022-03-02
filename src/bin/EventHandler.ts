import { Collection } from "discord.js";
import glob from "glob";
import path from "path";
import { promisify } from "util";
import { My } from "../My";
const globify = promisify(glob);

export class EventHandler{
    registerEvent = (cPath) => {
        let rawEvent = require(cPath);
        rawEvent = rawEvent.default;
        const event = new rawEvent();
        const { name } = path.parse(cPath);
        if(!event.name) event.name = name;

        console.debug('Загружен ивент: ' + event.name);
        My.client[event.once](event.name, (...args) => event.run(args[0]));
    }
  fetchEvents = async () => {
    console.warn("TRYING")
    const events = await globify(path.normalize(path.join(__dirname, `../events`)) + "/**/*.ts");
    
    events.map(this.registerEvent);
  }
  
}
