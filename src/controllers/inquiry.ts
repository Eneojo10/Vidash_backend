import { Response, Request} from 'express';
import { getInquiries, createInquiry,deleteInquiryById,updateInquiryById } from '../db/inquiry';


export const getAllInquiries = async (req: Request, res: Response): Promise<any> => {
    try {
        const inquiry = await getInquiries();
        return res.status(200).json({ success: true, data: inquiry})
    }catch(error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error"})
    }
};



export const inquiries = async (req:Request, res:Response) : Promise<any> => {
    try {
        const {inquiries} = req.body;

        if(!inquiries) {
            return res.status(400).json({ error: "inquiry is required"})
        }

        const newInquiries = await createInquiry({ inquiries});
        return res.status(201).json({ success: true, data: newInquiries});
    }catch(error) {
        console.error(error);
        return res.status(500).json({error: "Internal server error"})
    }
};