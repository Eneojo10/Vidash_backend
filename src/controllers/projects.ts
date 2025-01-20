import { Request, Response } from "express";
import {
    getProjects,
    getProjectById,
    createProject,
    deleteProjectById,
    updateProjectById,
} from "../db/projects";

// Get All Projects
export const fetchProjects = async (_req: Request, res: Response) => {
    try {
        const projects = await getProjects();
        return res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch projects" });
    }
};

// Create a New Project
export const addProject = async (req: Request, res: Response) => {
    try {
        const { image, title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        const project = await createProject({ image, title, description });
        return res.status(201).json(project);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to create project" });
    }
};

// Update a Project
export const editProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProject = await updateProjectById(id, updates);

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update project" });
    }
};

// Delete a Project
export const removeProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedProject = await deleteProjectById(id);

        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete project" });
    }
};
