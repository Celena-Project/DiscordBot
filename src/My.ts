import { Guild } from "discord.js";
import { BaseClient } from "./bin/BaseClient";
import { IMyCelenaServer } from "./features/interfaces/IMyCelenaServer";

export class My {
    static client: BaseClient;
    static config: any;
    static celena: Guild;
    static servers: IMyCelenaServer[];
    static serverTypes: [name: string, value: string][];
}