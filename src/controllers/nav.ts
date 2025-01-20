import { Response, Request} from 'express';
import { getNav, getNavById,createNav,deleteNavById,updateNavById } from '../db/nav';

export const getAllNavs = async (req: Request, res: Response): Promise<any> => {
    try {
        const navs = await getNav();
        return res.status(200).json({ success: true, data: navs});

    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"});
        
    }
    
};

export const navigations = async (req:Request,res:Response) : Promise<any> => {
    try {
        const { navigations } = req.body; 

        // Validation check
        if (!navigations) {
            return res.status(400).json({ error: "Name and location are required" });
        }

        const newEstate = await createNav({ navigations }); 
        return res.status(201).json({ success: true, data: newEstate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};