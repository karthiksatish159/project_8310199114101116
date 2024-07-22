require('dotenv').config();
import express,{Express,NextFunction,Request,Response} from "express";
import { MongooseConnection } from "./config/db.setup";
import basicAuth from 'express-basic-auth';
import swaggerui from 'swagger-ui-express';
import YAML from 'yamljs';
import fs from 'fs';
const app:Express=express();
const port:number=3500||Number(process.env.PORT);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
/** MongoDB connection setup*/
const dbConnect=new MongooseConnection("db");
dbConnect.connect().then(()=>{console.log('database connected')}).catch((err)=>{console.log(err)});
//* @swagger setup
const file=fs.readFileSync('src/api.yaml','utf-8');
const swaggerDocument=YAML.parse(file);

app.use('/api-docs',basicAuth({
        challenge: true, // Sends a 401 Unauthorized response if authentication fails
        realm:"events app",
        authorizer: myAuthorizer
    }),swaggerui.serve,swaggerui.setup(swaggerDocument)
)

function myAuthorizer(username:string,password:string):boolean {
      const userMatches=basicAuth.safeCompare(username,(process.env.SWAGGER_USER as string));
      const passwordMatches =basicAuth.safeCompare(password,(process.env.SWAGGER_PASSWORD as string));
      return userMatches && passwordMatches;
}
app.get('/',(req:Request,res:Response)=>
{
    res.send("<h1>Hello</h1>");
});
//* @routes
app.use('/api/v3/app/',require('./routes/event.routes'));
app.listen(port,():void=> {
    console.log(`The server is running on ${port}`);
})