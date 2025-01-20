import mongoose from "mongoose";


const PropertySchema = new mongoose.Schema({
    properties: { type: String, required: true},
});

export const PropertyModel = mongoose.model('properties', PropertySchema);


export const getProperty = () => PropertyModel.find();
export const getPropertyById = (id: string) => PropertyModel.findById(id);
export const createProperty = (values: Record<string, any>) => 
    new PropertyModel(values).save().then((property) => property.toObject());
export const deletePropertyById = (id: string) => PropertyModel.findOneAndDelete({ _id: id});
export const updatePropertyById = (id: string, values: Record<string, any>) =>
    PropertyModel.findByIdAndUpdate(id, values, { new: true});