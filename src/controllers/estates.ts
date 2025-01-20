import { Response, Request} from 'express';
import { getEstates, getEstateById, createEstate, deleteEstateById, updateEstateById } from '../db/estates';



export const getAllEstates = async (req: Request, res: Response): Promise<any> => {
    try {
        const estates = await getEstates(); 
        return res.status(200).json({ success: true, data: estates });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const estates = async (req:Request,res:Response) : Promise<any> => {
    try {
        const { estates } = req.body; 

        // Validation check
        if (!estates) {
            return res.status(400).json({ error: "Name and location are required" });
        }

        const newEstate = await createEstate({ estates }); 
        return res.status(201).json({ success: true, data: newEstate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

