import chalk from "chalk";

const globalPrefix = (() => {
    let t = new Date();
    let y = `${relevantNumber(t.getHours())}:${relevantNumber(t.getMinutes())}:${relevantNumber(t.getSeconds())}`;

    return chalk.cyan(`[${y}]`);
});




export class Logger{
    public static success(...args: any[]): void{
        const prefix = chalk.hex('#00b894')(`[SUCCESS]`);
        console.log(`${globalPrefix()} ${prefix} ${args}`);
    }
    public static log(...args: any[]): void{
        const prefix = chalk.hex('#0984e3')(`[LOG]`);
        console.log(`${globalPrefix()} ${prefix} ${args}`);
    }
    public static debug(...args: any[]): void{
        const prefix = chalk.hex('#82907B')(`[DEBUG]`);
        console.log(`${globalPrefix()} ${prefix} ${args}`);
    }
    public static error(...args: any[]): void{
        const prefix = chalk.hex('#ff4757')(`[ERROR]`);
        console.log(`${globalPrefix()} ${prefix} ${args}`);
    }
    public static warn(...args: any[]): void{
        const prefix = chalk.hex('#ffa502')(`[WARN]`);
        console.log(`${globalPrefix()} ${prefix} ${args}`);
    }

}


function relevantNumber(num: number) {
    return `${num}`.length == 1 ? `0${num}` : `${num}`;
}
