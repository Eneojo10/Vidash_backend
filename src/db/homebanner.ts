import mongoose from "mongoose";

const HomebannerSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true},
    description: { type: String, required: true},
    size: { type: String},
    features: { type: String},
    estate_id: { type: String, required:true},
    property_name: { type: String},
    nav_id: { type: String, required: true},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const HomebannerModel = mongoose.model('homebanner', HomebannerSchema);


export const getHome = async (options: { sort?: Record<string, any>; limit?: number } = {}) => {
    const { sort = {}, limit = 10 } = options; 
    return HomebannerModel.find().sort(sort).limit(limit);
};
export const getHomebannerByEstateId = (estate_id: string) => 
    HomebannerModel.find({ estate_id }).sort({ createdAt: -1 }); // Sort by createdAt if needed

export const getHomebannersByNavId = (nav_id: string) => HomebannerModel.find({ nav_id}).sort({ createdAt: -1});
export const getHomebannerById = (id: string) => HomebannerModel.findById(id);
export const createHomebanner = (values: Record<string, any>) =>
    new HomebannerModel(values).save().then((banner) => banner.toObject());
export const deleteHomebannereById = (id: string) => HomebannerModel.findOneAndDelete({ _id: id});
export const updateHomebannerById = (id: string, values: Record<string, any>) =>
    HomebannerModel.findByIdAndUpdate(id, values, { new: true});