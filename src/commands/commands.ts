import { CommandInteraction } from "discord.js";
import { Command } from "../bin/features/command";

import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import Mysql from "../features/utils/mysql";
import { IMyDiscordUser } from "../features/interfaces/IMyDiscordUser";
import { My } from "../My";
import TextConsole from "../features/utils/textConsole";


export default class extends Command {
    constructor() {
        super('commands', {
            description: "Действия с командами",
            command: new SlashCommandBuilder().addSubcommand(new SlashCommandSubcommandBuilder()
                .setName("reload")
                .setDescription("Перезагрузить команды")),
            userPermissions: ["ADMINISTRATOR"]
        });
    }

    async run(interaction: CommandInteraction) {
        switch (interaction.options.getSubcommand(false)) {
            case "reload":
                {
                    TextConsole.addMessage(interaction, "Получение команд с API..");
                    await My.client.commandHandler.deleteAllCommands();
                    TextConsole.addMessage(interaction, "Команды получены. Запуск удаления..");
                    TextConsole.addMessage(interaction, "Команды успешно удалены. Запуск изменения..");
                    await My.client.commandHandler.fetchCommands();
                    TextConsole.addMessage(interaction, "Команды успешно восстановлены.");
                    
                    break;
                } 
                
        }
    }
}