// import { property } from 'controllers/property'
import mongoose from 'mongoose'


const InspectionSchema = new mongoose.Schema({
    firstname: { type: String, required:true},
    lastname: { type: String, required: true},
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
    location_id: { type: String},
    property_id: { type: String},
    inquiry_id: { type: String},
    information_id: { type: String},
});


export const InspectionModel = mongoose.model('Inspections', InspectionSchema);


export const getInspection = () => InspectionModel.find();
export const createInspection = (values: Record<string, any>) => 
    new InspectionModel(values).save().then((inspection) => inspection.toObject());