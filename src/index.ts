require('dotenv').config();
import express,{Express,Request,Response} from "express";
import { MongooseConnection } from "./config/db.setup";
const app:Express=express();
const port:number=3500||Number(process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/** MongoDB connection setup*/
const dbConnect=new MongooseConnection("db");
dbConnect.connect().then(()=>{console.log('database connected')}).catch((err)=>{console.log(err)});
app.get('/',(req:Request,res:Response)=>
{
    res.send("<h1>Hello</h1>");
});
//* @routes
app.use('/api/v3/app/',require('./routes/event.routes'));
app.listen(port,():void=>
{
    console.log(`The server is running on ${port}`);
})