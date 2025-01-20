import mongoose from "mongoose";


const TourSchema = new mongoose.Schema({
    tour: { type: String}
});


export const TourModel = mongoose.model('tour', TourSchema)


export const getTour = async () => TourModel.find();
export const createTour = (values: Record<string, any>) =>
    new TourModel(values).save().then((tour) => tour.toObject());