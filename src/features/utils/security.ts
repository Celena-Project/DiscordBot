import { CommandInteraction, GuildMemberRoleManager, Interaction, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import Util from "../Util";

export default class Security extends Util{
    run(){

    }
    static checkPermissions(userid: string, permissions: PermissionResolvable[]): boolean{
        let flag: boolean;
                if(!flag){
                    (My.client.guilds.resolve(My.config.celena.id).members.resolve(userid).roles as GuildMemberRoleManager).cache.forEach(x => {
                        permissions.forEach(xx => {
                            if(x.permissions.has((xx as PermissionResolvable)))
                                flag = true;
                        })
                    });
                }
        return flag;
    }
    private static DONT_HAVE_PERMISSIONS: string = "У вас недостаточно прав для выполнения данной команды";
    public static responeWithoutPermissions(interaction: CommandInteraction): void{
        interaction.reply({content: this.DONT_HAVE_PERMISSIONS, ephemeral: true});
    }
}