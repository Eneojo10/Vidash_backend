import { Response, Request} from 'express'
import { getInspection, createInspection, getTotalInspection} from '../db/inspection'
import { InspectionModel } from '../db/inspection'  
import { LocationModel } from 'db/location';
import { InquiryModel } from 'db/inquiry';
import { InformationModel } from 'db/information';
import { PropertyModel } from 'db/property';
import mongoose from 'mongoose';



export const getAllInspections = async (req: Request, res: Response): Promise<any> => {
    try {
        const inspectionsRaw = await InspectionModel.find();
        console.log("Raw Inspections Data:", inspectionsRaw); // Log data before populating

        const inspections = await InspectionModel.find()
            .populate("location_id")
            .populate("property_id")
            .populate("inquiry_id")
            .populate("information_id");

        console.log("Populated Inspections Data:", inspections); // Log after populating

        return res.status(200).json({ success: true, data: inspections });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};





export const getTotalInspectionCount = async (req: Request, res: Response): Promise<any> => {
    try {
        const total = await getTotalInspection();
        return res.status(200).json({ success: true, total });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const inspections = async (req: Request, res: Response): Promise<any> => {
    try {
        const { firstname, lastname, email, location_id, property_id, inquiry_id, information_id } = req.body;

        console.log('Received data:', req.body);  // Log received request data

        if (!firstname || !lastname || !email || !location_id || !property_id || !inquiry_id || !information_id) {
            return res.status(400).json({ error: "Details required" });
        }

        // Ensure IDs are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(location_id) || 
            !mongoose.Types.ObjectId.isValid(property_id) ||
            !mongoose.Types.ObjectId.isValid(inquiry_id) ||
            !mongoose.Types.ObjectId.isValid(information_id)) {
            return res.status(400).json({ error: "Invalid ObjectId format for one of the fields" });
        }

        const newInspection = await createInspection({
            firstname,
            lastname,
            email,
            location_id: new mongoose.Types.ObjectId(location_id),
            property_id: new mongoose.Types.ObjectId(property_id),
            inquiry_id: new mongoose.Types.ObjectId(inquiry_id),
            information_id: new mongoose.Types.ObjectId(information_id),
        });
        
        console.log('Saved data:', newInspection); // Log saved data

        return res.status(201).json({ success: true, data: newInspection });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
