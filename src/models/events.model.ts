import mongoose,{Schema} from "mongoose";
const eventSchema=new Schema(
    {
        id:Number,
        type:String,
        uid:Number,
        name:String,
        tagline:String,
        schedule:Date,
        description:String,
        images:
        [
            {
                type:String
            }
        ],
        moderator:String,
        category:String,
        sub_category:String,
        rigor_rank:Number,
        attendees:
        [
            {
                type:Number
            }
        ]
    });
    export =mongoose.model('evetns',eventSchema);