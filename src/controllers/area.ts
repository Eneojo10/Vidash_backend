import { Response, Request} from 'express';
import { getAreas, createArea } from '../db/area';
// import { AreaModel } from '../db/area';


export const getAllAreas = async (req: Request, res: Response) : Promise<any> => {
    try {
        const area = await getAreas();
        return res.status(200).json({success: true, data: area})
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
        
    }
};




export const createAreas = async (req:Request, res: Response) : Promise<any> => {
    try {
        const {areas} = req.body;

        if(!areas) {
            return res.status(400).json({ error: "Area is required"})
        }

        const newArea = await createArea({areas});
        return res.status(201).json({ success: true, data: newArea});
    }catch(error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error"});
    }

    
};