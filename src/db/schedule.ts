import mongoose from "mongoose";

const ScheduleSchema = new mongoose.Schema({
    message: { type: String, required: true, trim: true },
    tour_id: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time_id: { type: String },
    email: { type: String, required: true, trim: true, match: /.+\@.+\..+/ },
    name: { type: String, required: true, trim: true },
    phone: { type: Number, required: true, minlength: 10 },
});

export const ScheduleModel = mongoose.model('schedule', ScheduleSchema);

export const getSchedule = () => ScheduleModel.find();
export const createSchedule = (values: Record<string, any>) =>
    new ScheduleModel(values).save().then((schedule) => schedule.toObject());
