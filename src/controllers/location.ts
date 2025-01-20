import { Response, Request } from 'express';
import { getLocations, createLocation, deleteLocationById, updateLocationById } from '../db/location';



export const getAllLocations = async (req: Request, res:Response) : Promise<any> => {
    try {
        const location = await getLocations();
        return res.status(200).json({success: true, data: location});
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"});
    }
};


export const locations = async (req:Request, res: Response) : Promise<any> => {
    try {
        const {locations} = req.body;

        if(!locations) {
            return res.status(400).json({ error: "Locations is required"})
        }

        const newLocations = await createLocation({locations});
        return res.status(201).json({ success: true, data: newLocations});
    }catch(error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error"});
    }

    
};