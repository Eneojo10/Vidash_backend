import { Response, Request} from 'express'
import { getInspection, createInspection } from '../db/inspection'



export const getAllInspections = async (req:Request, res: Response) : Promise<any> => {
    try {
        const inspection = await getInspection();
        return res.status(200).json({success: true, data: inspection})
    }catch(error){
        console.error(error);
        return res.status(500).json({ errror: "Internal server error"})
    }
};



export const inspections = async (req: Request, res:Response) : Promise<any> => {
    try {
        const {firstname,lastname,email,location_id,property_id,inquiry_id, information_id} = req.body;

        console.log('Received data:', req.body);

        if(!firstname || !lastname || !email || !location_id || !property_id ||!inquiry_id || !information_id ) {
            return res.status(400).json({ error: "Details required"})
        }

        const newInspections = await createInspection({
            firstname,
            lastname,
            email,
            location_id,
            inquiry_id,
            property_id,
            information_id,
        });
        return res.status(201).json({ success: true, data: newInspections });

    }catch(error) {
        console.error(error)
        return res.status(500).json({errror: "Internal server error"})
    }
}