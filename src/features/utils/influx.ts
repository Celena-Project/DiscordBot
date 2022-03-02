import { My } from "../../My";
import Util from "../Util";
import { ServerResponse } from "http";
var os = require("os");
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
const CURRENT_BUCKET = "discord";
// You can generate an API token from the "API Tokens Tab" in the UI
const token = 'le-tcQNhjerXoT54phVkUy6JFaJlbzhQxWCpoGH6tPZb2QJxL4Lswb4Jok1UMq89dRSZsn396BVWRtgFFmL6JA=='
const org = 'celena'
let client: InfluxDB;
let writeApi: WriteApi;
export default class Influx extends Util{
    run(){
        //client = new InfluxDB({url: 'http://celena.pw:8086', token: token, writeOptions: {flushInterval: 1000}});
        //writeApi = client.getWriteApi(org, CURRENT_BUCKET);
        this.startAliveLoop();
        console.success("Успешно подключился к Influx");
    }
    public static writePoint(point: Point): void{
        //writeApi.writePoint(point)
        //console.log(point)
    }
    public static writePoints(points: Point[]): void{
        //writeApi.writePoints(points)
        //console.log(points)
    }
    private startAliveLoop(): void{
        // client.getWriteApi(org, "status").writePoint(new Point(CURRENT_BUCKET).booleanField("alive", true));
        // setInterval(() => {
        //     client.getWriteApi(org, "status").writePoint(new Point(CURRENT_BUCKET).booleanField("alive", true));
        // }, 60000);
        
    }
}
// NATIVE
export class InfluxWriter{
    private timingType: UploadTiming;
    private timingCount: number;
    private sync: boolean;
    private queue: Point[] = [];
    constructor(type: UploadTiming, count: number = 1, sync: boolean = true){
        this.timingType = type;
        this.timingCount = count;
        this.sync = sync;

        this.start();
    }
    public addPoint(point: Point): void{
        this.queue.push(point);
    }
    private start(): void{
        let awaitMills = 0;
        if(this.sync){
            let current = new Date(Date.now());
            switch(this.timingType){
                case "SECOND":{
                    awaitMills = (current.getMilliseconds() == 0 ? 0 : 1000 - current.getMilliseconds()) * this.timingCount;
                }
                case "MINUTE":{
                    awaitMills = 
                    (current.getMilliseconds() == 0 ? 0 : (1000 - current.getMilliseconds())  * this.timingCount)
                    + (current.getSeconds() == 0 ? 0 : (60 - current.getSeconds())  * this.timingCount) * 1000;
                }
                case "HOUR":{
                    awaitMills = 
                    (current.getMilliseconds() == 0 ? 0 :  (1000 - current.getMilliseconds())  * this.timingCount)
                    + (current.getSeconds() == 0 ? 0 : (60 - current.getSeconds()) * 1000 * this.timingCount);
                    + (current.getMinutes() == 0 ? 0 : (60 - current.getMinutes()) * 1000 * this.timingCount);
                }
            }
        }
        awaitMills == 0 ? 0 : awaitMills - 1000;
        let delay = (this.timingType == "SECOND" ? 1000 : this.timingType == "MINUTE" ? 60000 : this.timingType == "HOUR" ? 3600000 : 86400000) * this.timingCount;
        console.log(awaitMills, delay)
        setTimeout(() => {
            setInterval(() => {
                for(let k in this.queue){
                    Influx.writePoint(this.queue[k]);
                }
                this.queue = [];
            }, delay)
        }, awaitMills);
    }
}
export type UploadTiming = "SECOND" | "MINUTE" | "HOUR" | "DAY"