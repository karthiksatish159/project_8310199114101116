import { Request,Response } from "express";
import eventsModel from "../models/events.model";
export class Add
{
    async addEvent(req:Request,res:Response)
    {
        try 
        {
           const ids=await eventsModel.find().count();
           const newEvent=await eventsModel.create(
                {id:ids+1,
                 type:req.body.type,
                 name:req.body.name,
                 tagline:req.body.tagline,
                 schedule:req.body.schedule,
                 description:req.body.description,
                 images:req.file?.buffer.toString('base64'),
                 moderator:req.body.moderator,
                 category:req.body.category,
                 sub_category:req.body.sub_category,
                 rigor_rank:req.body.rigor_rank,
                });
            await newEvent.save();
            res.json({id:ids+1});
        } catch (error) 
        {
            console.log(error)
            res.status(500).send('server error !');
        }
    }
}