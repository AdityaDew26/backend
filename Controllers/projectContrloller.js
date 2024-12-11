import Project from "../models/project.js";

// @desc Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// @desc Create a new project
export const createProject = async (req, res) => {
  const { name, description, image, link } = req.body;
  try {
    const project = await Project.create({ name, description, image, link });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error creating project", error });
  }
};

// @desc Update a project by ID
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, image, link } = req.body;

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { name, description, image, link },
      { new: true } // Return updated document
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ message: "Error updating project", error });
  }
};

// @desc Delete a project by ID
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting project", error });
  }
};
