// import { property } from 'controllers/property'
import mongoose from 'mongoose'


const InspectionSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'location' },  // Reference to Location collection
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: 'properties' },  // Reference to Property collection
    inquiry_id: { type: mongoose.Schema.Types.ObjectId, ref: 'inquiry' },    // Reference to Inquiry collection
    information_id: { type: mongoose.Schema.Types.ObjectId, ref: 'information' } // Reference to Information collection
});


export const InspectionModel = mongoose.model('Inspections', InspectionSchema);


export const getInspection = () => InspectionModel.find();
export const createInspection = (values: Record<string, any>) => 
    new InspectionModel(values).save().then((inspection) => inspection.toObject());

export const getTotalInspection = () => InspectionModel.countDocuments();