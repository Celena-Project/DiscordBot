import { Collection, CommandInteraction, GuildMemberRoleManager, PermissionResolvable } from "discord.js";
import { My } from "../../My";
import { IMyMessage } from "../interfaces/IMyMessage";
import { IMyRecievedMessage } from "../interfaces/IMyRecievedMessage";
import Util from "../Util";
import TimeManager from "./timeManager";

let WebSocketClient = require('websocket').client;
let client = new WebSocketClient();

client.on('connectFailed', () => console.error('Не удалось подключиться к API'))

let _connection: any;
client.on('connect', connection => {
    _connection = connection;
    console.log('Подключился к API');
    connection.on('error', error => console.error("Ошибка API: " + error.toString()));
    connection.on('close', console.warn("Закрыт протокол подключения к API"));
    connection.on('message', message => {
        if (message.type === 'utf8') {
            message(message.utf8Data);
        }
    });
});
let messages: Collection<string, IMyRecievedMessage> = new Collection<string, IMyRecievedMessage>();
function message(message: string): void{
    if(JSON.parse(message).message.isAnswer){
        messages[JSON.parse(message).id] = JSON.parse(message).message;
    }else
    onMessage(message);
}
function onMessage(message: string) {
    let json = JSON.parse(message);
    for(let k in subscribers[json.message.key]){
        let event = subscribers[json.message.key][k];
        event(json.message.value);
    }
}
let subscribers: Collection<string, any[]> = new Collection<string, any[]>();
async function getMessage(id: string): Promise<string>{
    let message: string;
    let interval = setInterval(() => {
        if(messages.has(id)){
            clearInterval(interval);
            return messages[id].message;
        }
    }, 100)
    await setTimeout(() => {}, 5000);
    return message;
}
export default class ApiSocket extends Util{
    run(){
        this.connect();
    }
    public subcribe(key: string, event: any): void{
        if(subscribers[key]?.length == undefined || subscribers[key].length == 0) subscribers[key] = [];
        subscribers[key][subscribers[key].length] = event;
    }
    private connect(): void{
        client.connect('ws://localhost:8080/', 'echo-protocol');
    }
    public sendMessage(key: string, value: any): void{
        this.rec(key, value);
    }
    public async recieveMessage(key: string, value: any): Promise<IMyRecievedMessage>{
        let message: IMyRecievedMessage = {status: false, message: "", isAnswer: false};
        setInterval(() => {
            if(message.status == false){
                message.message = "timeout";
                return message;
            }
        }, 5000);
        message = await this.rec(key, value);
        return message;
    }
    private async rec(key: string, value: any): Promise<IMyRecievedMessage>{
        let message: IMyRecievedMessage = {status: false, message: "", isAnswer: false};
        let id = JSON.stringify({key, value}).hashCode().toString();
        _connection.sendUTF(JSON.stringify({id, message: {key, value}}));
        let data = await getMessage(id);
        message = JSON.parse(data).message;
        return message;
    }
}