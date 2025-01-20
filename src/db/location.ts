import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
    locations: { type: String},
});

export const LocationModel = mongoose.model('location', LocationSchema);


export const getLocations = () => LocationModel.find();
export const getLocationById = (id: string) => LocationModel.findById(id);
export const createLocation = (value: Record<string, any>) =>
    new LocationModel(value).save().then((location) => location.toObject());
export const deleteLocationById = (id: string) => LocationModel.findByIdAndDelete({ _id: id});
export const updateLocationById = (id: string, values: Record<string, any>) =>
    LocationModel.findByIdAndUpdate(id, values, {new: true});
