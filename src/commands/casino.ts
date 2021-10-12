import { CommandInteraction } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder } from "@discordjs/builders";
import { IMyDiscordUser } from "../features/interfaces/IMyDiscordUser";
import sql from "../features/utils/sql";


export default class extends Command {
    constructor() {
        super('casino', {
            description: "Тест",
            command: new SlashCommandBuilder().addIntegerOption(option => option.setName('bet').setDescription("Ставка").setRequired(true))
        });
    }
    private addToQueue(interation: CommandInteraction): void{
        let interval = setInterval(() => {
            if(!this.casinoIsRunning){
                this.rotate(interation);
                clearInterval(interval);
            }
              
        }, 2000);
    }
    private casinoIsRunning: boolean = false;
    async run(interaction: CommandInteraction) {
        if(this.casinoIsRunning){
            interaction.deferReply();
            this.addToQueue(interaction);
            return;
        }
        interaction.reply("Кручу рулетку.");
        this.rotate(interaction);
    }
    private async rotate(interaction: CommandInteraction): Promise<void>{
        this.casinoIsRunning = true;
        let user: IMyDiscordUser = await sql.getUser(interaction.user.id);
        let bet: number = interaction.options.getInteger("bet");
        if(user.coins < bet) return interaction.reply(`Вам не хватает ${bet - user.coins} монет для ставки`);
        if(interaction.replied || (!interaction.replied && interaction.deferred))
            interaction.editReply("Кручу рулетку.");
            
        setTimeout(() => interaction.editReply("Кручу рулетку.."), 500);
        setTimeout(() => interaction.editReply("Кручу рулетку..."), 1000);
        setTimeout(() => interaction.editReply("Кручу рулетку...."), 1500);
        setTimeout(() => {
            let newBalance: number;
            if(Math.random() <= 0.5){
                // Подфартило
                newBalance = (user.coins - bet) + (bet * 1.25);
                interaction.editReply(`Поздравляю! Вы выйграли ${bet * 1.25} монет`);
            }else{
                newBalance = user.coins - bet;
                interaction.editReply(`Сожалею. Вы проиграли`);
            }
            sql.updateUser("coins", interaction.user.id, newBalance, true);
            this.casinoIsRunning = false;
        }, 2000);
    }
}