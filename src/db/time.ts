import mongoose from 'mongoose'


const TimeSchema = new mongoose.Schema({
    time: { type: String},
});

export const TimeModel = mongoose.model('time', TimeSchema)


export const getTime = () => TimeModel.find();
export const createTime = (values: Record<string, any>) =>
    new TimeModel(values).save().then((time) => time.toObject());
