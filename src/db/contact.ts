import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
    fName: { type: String},
    lName: { type: String},
    email: { type: String},
    phone_no: { type: String},
    message: { type: String},
});


export const ContactModel = mongoose.model('contact', ContactSchema);


export const getContacts = () => ContactModel.find();
export const getContactById = (id: string) => ContactModel.findById(id);
export const createContact = (value: Record<string, any>) =>
    new ContactModel(value).save().then((contact) => contact.toObject());
export const deleteContactById = (id: string) => ContactModel.findOneAndDelete({ _id: id});
export const updateContactById = (id: string, values: Record<string, any>) =>
    ContactModel.findByIdAndUpdate(id, values, {new: true});