import mongoose from "mongoose";


const InformationSchema = new mongoose.Schema({
    information: { type: String, required: true},
});

export const InformationModel = mongoose.model('information', InformationSchema);


export const getInfo = () => InformationModel.find();
export const getInfoById = (id: string) => InformationModel.findById(id);
export const createInfo = (values: Record<string, any>) => 
    new InformationModel(values).save().then((information) => information.toObject());
export const deleteInfoById = (id: string) => InformationModel.findOneAndDelete({ _id: id});
export const updateInfoById = (id: string, values: Record<string, any>) =>
    InformationModel.findByIdAndUpdate(id, values, { new: true});