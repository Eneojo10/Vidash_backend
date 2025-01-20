import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
    inquiries: { type: String},
});

export const InquiryModel = mongoose.model('inquiry', InquirySchema);


export const getInquiries = () => InquiryModel.find();
export const getInquiryById = (id: string) => InquiryModel.findById(id);
export const createInquiry = (value: Record<string, any>) =>
    new InquiryModel(value).save().then((inquiry) => inquiry.toObject());
export const deleteInquiryById = (id: string) => InquiryModel.findByIdAndDelete({ _id: id});
export const updateInquiryById = (id: string, values: Record<string, any>) =>
    InquiryModel.findByIdAndUpdate(id, values, {new: true});
