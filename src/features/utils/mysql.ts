import { Connection, createConnection } from "mysql2";
import { My } from "../../My";
import Util from "../Util";

export default class Mysql extends Util{
    public static connection: Connection = createConnection({
        host: "clncluster.tk",
        user: "klarulor",
        password: My.config.mysql.password,
        database: "celena"
      });
    run(){
       Mysql.connection.connect(async err => {
            if (err)console.error("Не подключился к MySql \n"+err);
            console.log("Подключился к MYSQL!");
        });
    }
    public static requestRaw(query: string): Promise<any[]> {
        return new Promise(resolve => {
          try {
            console.log(query);
            this.connection.query(query, (err, rows) => {
              if (err) throw err;
              if ((!rows) || !Array.isArray(rows)) return resolve(null);
              return resolve(rows);
            })
          } catch { }
        })
      }
    public static reqQuery(query: string, ...opts): Promise<any> {
        return new Promise(resolve => {
          try{
            console.log(query, opts);
            this.connection.query(query, opts, (err, rows) => {
              if(err) return resolve(null);
              return resolve(rows);
            })
          }catch{}
        })
      }
    public static reqQueryOnce(query, ...opts): any {
        return new Promise(resolve => {
          try{
            console.log(query, opts);
            this.connection.query(query, opts, (err, rows) => {
              if(err) return resolve(null);
              return resolve(rows.toString().length == 0 ? undefined : rows[0]);
            })
          }catch{}
        })
      }
}