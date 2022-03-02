import { ApplicationCommand, Interaction, PermissionResolvable } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export class Command {
  public name: string;
  public description: string;
  public userPermissions: PermissionResolvable[];
  public command: ApplicationCommand;
  public global: boolean;
  public subcommand: boolean;
  constructor(name, options) {
    this.name = name;
    this.description = options.description || '';
    this.userPermissions = options.userPermissions || [];
    this.command = options.command?.setName(name).setDescription(this.description) || new SlashCommandBuilder().setName(name).setDescription(this.description);
    this.global = options.global || false;
    this.subcommand = options.subcommands || false;
    if(this.subcommand == true){
      this.command.options = this.command.options.map(x => {
       if(x.type == undefined) x.type = "SUB_COMMAND_GROUP";
       if(x.type == undefined)x.type = "SUB_COMMAND";
        return x;
      })
    }else 
    this.command.options = this.command.options.map(x => {
      if(x.type == undefined)x.type = "SUB_COMMAND";
      return x;
    })
  }

  run(interaction: Interaction) {
    throw new TypeError('Command doesnt have functional');
  }
}
