import { Request,Response,NextFunction } from "express"
import { validationResult ,body} from "express-validator"
export const validationData=(req:Request,res:Response,next:NextFunction)=>
    {
        const errors=validationResult(req);
        if(!errors.isEmpty())
        {
            return res.status(400).json({errors: errors.array() });
        }
        next();
    };
export const addEvent=
                    [
                        body('type').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('name').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('tagline').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('schedule').isISO8601(),
                        body('description').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('image').custom((value,{req}):boolean=>
                        {
                        
                            if(!req.file)
                            {
                                return false;
                            }
                            const allowedFileTypes = ['image/jpeg', 'image/png']
                            return (allowedFileTypes.includes(req.file.mimetype));
                        }).withMessage('invalid type'),
                        body('moderator').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('category').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('sub_category').matches(/^[a-zA-Z\s]+$/).withMessage("please provide valid values with in lphabetic characters"),
                        body('rigor_rank').isNumeric()
                    ]