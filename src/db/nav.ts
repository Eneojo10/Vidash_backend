import mongoose from "mongoose";

// Define the schema
const NavSchema = new mongoose.Schema({
    navigations: { type: String, required: true },
});

export const NavModel = mongoose.model('Nav', NavSchema);


export const getNav = async () => {
    return await NavModel.find();
};


export const getNavById = async (id: string) => {
    return await NavModel.findById(id);
};

export const getNavvById = (nav_id: string) => NavModel.findById(nav_id);
export const createNav = async (values: Record<string, any>) => {
    const nav = new NavModel(values);
    return await nav.save();
};
export const deleteNavById = async (id: string) => {
    return await NavModel.findOneAndDelete({ _id: id });
};


export const updateNavById = async (id: string, value: Record<string, any>) => {
    return await NavModel.findByIdAndUpdate(id, value, { new: true });
};
