import { Response, Request } from "express";
import { getTour, createTour } from "../db/tour";


export const getAllTours = async (req: Request, res: Response) : Promise<any> => {
    try {
        const tour = await getTour();
        return res.status(200).json({success: true, data: tour})
    }catch(error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"});
        
    }
};



export const tours = async (req: Request, res: Response) : Promise<any> => {
    try {
        const { tour } = req.body;


        if(!tour) {
            return res.status(400).json({ error: "Details required"});
        }
        

        const newTour = await createTour({ tour});
        return res.status(201).json({ success: true, data: newTour});
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"})
        
    }
};