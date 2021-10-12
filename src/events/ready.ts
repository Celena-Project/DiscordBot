import { Interaction } from "discord.js"
import { Event } from "../bin/features/Event"
import { My } from "../My"

export default class interactionCreateEvent extends Event {
    constructor() {
        super('ready', false)
    }
    
   async run() {
       console.log()
    }
}