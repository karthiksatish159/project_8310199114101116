import { Request,Response } from "express";
import eventsModel from "../models/events.model";
import { refineData, updateTheDocument } from "../service/update.service";
export class Update
{
    async updateEvent(req:Request,res:Response)
    {
        try 
        {
            const {id}=req.params;
            const updateData=refineData(req.body);
            const  document=await eventsModel.findOne({id:Number(id)});
            if(!document)
            {
                res.status(404).json({status:"not updated"});
            }
            else
            {
                 updateTheDocument(document,updateData);
                 if(document)
                 {
                    await document.save()
                    res.json({status:"updated"});
                 }
                 else
                 {
                    res.status(404).json({status:"not updated"});
                 }
            }
        } catch (error) 
        {
            res.status(500).send("server error !");
        }
    }
}