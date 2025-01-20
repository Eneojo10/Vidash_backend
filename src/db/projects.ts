import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    image: { type: String },
    title: { type: String, required: true },
    description: { type: String },
});

// Create the Project Model
export const ProjectModel = mongoose.model('Project', ProjectSchema);

// Helper Functions for Database Operations
export const getProjects = () => ProjectModel.find();
export const getProjectById = (id: string) => ProjectModel.findById(id);
export const createProject = (values: Record<string, any>) =>
    new ProjectModel(values).save().then((project) => project.toObject());
export const deleteProjectById = (id: string) => ProjectModel.findOneAndDelete({ _id: id });
export const updateProjectById = (id: string, values: Record<string, any>) =>
    ProjectModel.findByIdAndUpdate(id, values, { new: true });
