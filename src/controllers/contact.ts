import { Response, Request} from 'express';
import { getContacts, createContact, deleteContactById, updateContactById } from '../db/contact';

export const getAllContact = async (req:Request, res: Response): Promise<any> => {
    try {
        const contact = await getContacts();
        return res.status(200).json({ success: true, data: contact});
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"});
    }
};

export const contact = async (req: Request, res: Response): Promise<any> => {
    try {
        // Extract fields from the request body
        const { fName, lName, email, phone_no, message } = req.body;

        
        const contactData = {
            fName,
            lName,
            email,
            phone_no,
            message,
            createdAt: new Date(), 
        };

        // Save the contact data to the database
        const newContact = await createContact(contactData);

        // Return a success response
        return res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        console.error(error);

        // Return an error response
        return res.status(500).json({ error: "Internal server error" });
    }
};