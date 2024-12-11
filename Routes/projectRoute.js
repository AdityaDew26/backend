import express from "express";
import { getProjects,createProject,updateProject,deleteProject } from "../Controllers/projectContrloller.js";

const router = express.Router();

// CRUD Routes
router.get("/", getProjects); // Get all projects
router.post("/", createProject); // Create a new project
router.put("/:id", updateProject); // Update a project by ID
router.delete("/:id", deleteProject); // Delete a project by ID

export default router;
