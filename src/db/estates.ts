import mongoose from "mongoose";


const EstateSchema = new mongoose.Schema({
    estates: { type: String, required: true},
});

export const EstateModel = mongoose.model('Estates', EstateSchema);


export const getEstates = () => EstateModel.find();
export const getEstateById = (estate_id: string) => EstateModel.findById(estate_id);
export const createEstate = (values: Record<string, any>) => 
    new EstateModel(values).save().then((estate) => estate.toObject());
export const deleteEstateById = (id: string) => EstateModel.findOneAndDelete({ _id: id});
export const updateEstateById = (id: string, values: Record<string, any>) =>
    EstateModel.findByIdAndUpdate(id, values, { new: true});