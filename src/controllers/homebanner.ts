import { Response, Request } from 'express';
import { getHome, createHomebanner } from '../db/homebanner';
import cloudinary from './cloudinary';
import upload from '../middleware/multer';
import { HomebannerModel } from '../db/homebanner';
import { EstateModel } from '../db/estates';

// Route to get the most recent posts
export const getRecent = async (req: Request, res: Response): Promise<any> => {
    try {
        const home = await getHome({ sort: { createdAt: -1 }, limit: 3 });
        return res.status(200).json({ success: true, data: home });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const createBanner = async (req: Request, res: Response): Promise<any> => {
    try {
    
        const { description, size, features, nav_id, estate_id,property_name } = req.body;
        const file = req.file;

        
        if (!file) {
            return res.status(400).json({ error: "Image file required" });
        }

        
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'banner',
        });

        
        const bannerData = {
            description,
            size,
            property_name,
            features,
            estate_id,
            nav_id,
            imageUrl: uploadResult.secure_url, 
            createdAt: new Date(),
        };

        
        const newBanner = await createHomebanner(bannerData);

        
        return res.status(201).json({ success: true, data: newBanner });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getBannersByNavId = async (req: Request, res: Response): Promise<any> => {
    try {
        const { nav_id } = req.params;
        console.log(nav_id);
        
        
        // if (!nav_id) {
        //     return res.status(400).json({ error: "nav_id is required" });
        // }

        
        const banners = await HomebannerModel.find({ nav_id: nav_id });

        
        if (banners.length === 0) {
            return res.status(404).json({ success: false, message: "No banners found for the given nav_id" });
        }

        
        return res.status(200).json({ success: true, data: banners });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
export const getBannersByEstateId = async (req: Request, res: Response): Promise<any> => {
    try {
        const  { estate_id } = req.params;
        console.log(estate_id);
        // const estate = await EstateModel
        
        
        const banners = await HomebannerModel.find({ estate_id: estate_id }); 
        
        if (banners.length === 0) {
            return res.status(404).json({ success: false, message: "No banners found for the given nav" });
        }

        
        return res.status(200).json({ success: true, data: banners });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getBannerById = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        // console.log("Received ID:", id);

        
        if (!id) {
            return res.status(400).json({ error: "Banner ID is required" });
        }

            console.log(id);
            
        const banner = await HomebannerModel.findById(id );
        console.log(banner);
        
        
        if (!banner) {
            return res.status(404).json({ success: false, message: "Banner not found" });
        }

    
        return res.status(200).json({ success: true, data: banner });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};





export const createBannerWithUpload = [upload.single('image'), createBanner];
