import mongoose from 'mongoose';


const AreaSchema = new mongoose.Schema({
    areas: { type: String},
});

export const AreaModel = mongoose.model('areas', AreaSchema)


export const getAreas = () => AreaModel.find();
export const createArea = (values: Record<string, any>) =>
    new AreaModel(values).save().then((area) => area.toObject());