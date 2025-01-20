import { Response, Request} from "express"
import { getTime, createTime } from "../db/time"



export const getAllTime = async (req: Request, res: Response) : Promise<any> => {
    try {
        const time = await getTime();
        return res.status(200).json({success: true, data: time})
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
        
    }
};


export const time = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { time } = req.body;


        if(!time) {
            return res.status(400).json({ error: "Details required"});
        }
        

        const newTime = await createTime({ time});
        return res.status(201).json({ success: true, data: newTime});
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"})
        
    }
};