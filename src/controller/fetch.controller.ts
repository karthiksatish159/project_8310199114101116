import { Request,Response } from "express";
import eventsModel from "../models/events.model";

export class Fetch
{
    async fetchEvents(req:Request,res:Response)
    {
        const {id,type,limit,page}=req.query;
        try {
            if(id)
            {
                const event=await eventsModel.findOne({id:Number(id)});
                res.json({event});
            }
            else
            {
                const skip:number=Number(limit)*(Number(page)-1);
                const events=await eventsModel.find({type:type}).skip(skip).limit(Number(limit));
                res.json({events});
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('server error!');   
        }
    }
}