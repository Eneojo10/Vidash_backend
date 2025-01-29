import mongoose from 'mongoose';


const SiteSchema = new mongoose.Schema({
    header: { type: String},
    description: { type: String},
    imageUrl: { type: String},
    property_location: { type: String},
    property_name: { type: String},
    area_id: { type: String},
    overview: { type: String},
    features: { type: String},
    ongoing: { type: Number},
    completed: { type: Number},
    residential: { type: Number},
    commercial: { type: Number},
    apartment: { type: Number},
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export const SiteModel = mongoose.model('site', SiteSchema);

export const getAllSite = async ()=> SiteModel.find();
export const getAllSiteById = (id: string) => SiteModel.findById(id);
export const createSite = (values: Record<string, any>) =>
    new SiteModel(values).save().then((site) => site.toObject());