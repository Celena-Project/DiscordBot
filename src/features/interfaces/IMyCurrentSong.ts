import { Interaction } from "discord.js";

export interface IMyCurrentSong{
    title: string;
    duration: number;
    secondDuration: number;
    startTimestamp: number;
    interaction: Interaction;
    queue: any;
}