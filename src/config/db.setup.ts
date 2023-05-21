import mongoose from "mongoose";
export class MongooseConnection
{
    constructor(private database_name:string){}
    async connect():Promise<boolean>
    {
        return new Promise<boolean>(async(resolve,reject)=>{
            try {
                await mongoose.connect(String(process.env.DB_URL)+this.database_name);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        })
    }
}