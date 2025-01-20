import {Response, Request} from 'express';
import { getProperty, createProperty, deletePropertyById, updatePropertyById } from '../db/property';


export const getAllProperties = async (req: Request, res:Response) : Promise<any> => {
    try {
        const property = await getProperty();
        return res.status(200).json({ success: true, data: property})
    }catch(error) {
        console.error(error);
        return res.status(500).json({error: "Internal server error"})
    }
};



export const property = async (req:Request, res:Response) : Promise<any> => {
    try {
        const  {properties} = req.body;
        if(!property) {
            return res.status(400).json({ error: "Internal server error"})
        }

        const newProperty = await createProperty({properties});
        return res.status(201).json({success: true, data: newProperty})
    }catch(error) {
        console.error(error)
        return res.status(500).json({errror: "Internal server error"})
    }
}