import { Response, Request} from 'express';
import { getInfo, createInfo } from '../db/information';



export const getAllInfo = async (req: Request, res:Response) : Promise<any> => {
    try {
        const info = await getInfo();
        return res.status(200).json({ success: true, data: info})
    }catch(error) {
        return res.status(500).json({ error: "Internal server error"})
    }
};



export const info = async (req: Request, res:Response) : Promise<any> => {
    try {
        const {information} = req.body;

        if(!information) {
            return res.status(400).json({ error: "Details needed"})
        }

        const newInfo = await createInfo({information});
        return res.status(201).json({ success: true, data: newInfo});
    }catch(error) {
        console.error(error)
    }
}