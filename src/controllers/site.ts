import { Request, Response} from 'express';
import { createSite, getAllSite } from '../db/site';
import cloudinary from './cloudinary';
import upload from '../middleware/multer';
import { SiteModel } from '../db/site'
import { AreaModel } from '../db/area';




export const getSite = async (req: Request, res:Response) : Promise<any> => {
    try {
        const site = await getAllSite();
        return res.status(200).json({success: true, data: site});
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"});
    }
};

export const getAreaByName = async (req: Request, res: Response): Promise<any> => {
    try {
        const { areaName } = req.params; 

        
        const area = await AreaModel.findOne({ areas: areaName });
        if (!area) {
            return res.status(404).json({ success: false, message: 'Area not found' });
        }

        
        const posts = await SiteModel.find({ area_id: area._id });
        if (posts.length === 0) {
            return res.status(404).json({ success: false, message: 'No posts found for this area' });
        }

        return res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getTotalPostsByAreaName = async (req: Request, res: Response): Promise<any> => {
    try {
        const { areaName } = req.params; 

        // Find the area by name.
        const area = await AreaModel.findOne({ areas: areaName });
        if (!area) {
            return res.status(404).json({ success: false, message: 'Area not found' });
        }

        // Count posts (banners) using the area_id.
        const totalPosts = await SiteModel.countDocuments({ area_id: area._id });

        return res.status(200).json({ success: true, total: totalPosts, area: name });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSiteById = async (req: Request, res:Response) : Promise<any> => {
    try {
        
        const {id} = req.params;

        if(!id) {
            return res.status(400).json({ error: "Site ID is required"});
        }
        console.log(id);

        const site = await SiteModel.findById(id);
        console.log(site);

        if(!site) {
            return res.status(404).json({ success: false, message: "Site not found"});
        }

        return res.status(200).json({ success: true, data: site});
        
        
    }catch(error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"})
        
    }
};


export const sites = async (req:Request, res: Response) : Promise<any> => {
    try {
        const {header, description, features, property_location, property_name, area_id, ongoing, overview, completed, residential, commercial, apartment} = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Image file required"});
        }

        

        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder:'banner',
        });

        const bannerData = {
            header,
            description,
            property_location,
            property_name,
            area_id,
            features,
            ongoing,
            overview,
            residential,
            completed,
            apartment,
            commercial,
            imageUrl: uploadResult.secure_url,
            createdAt: new Date(),
        };

        const newBanner = await createSite(bannerData);

        return res.status(201).json({ success: true, data: newBanner});
        
    }catch(error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error"});
    }

    
};


export const createBannerWithUpload = [upload.single('image'), createSite];