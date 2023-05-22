import { Request,Response } from "express";
import eventsModel from "../models/events.model";
export class Delete
{
    async EventById(req:Request,res:Response)
    {   
        try 
        {
            const {id}=req.params;
            if(!id)
            {
                res.status(404).json({status:"not deleted"});
            }    
            else
            {
                const data=await eventsModel.findOneAndDelete({id:Number(id)});
                if(!data)
                {
                    res.status(404).json({status:"not deleted"});
                }
                else
                {
                    res.json({status:true});
                }
            }
        } catch (error) {
            res.status(500).send("server error!");
        }
    }
}