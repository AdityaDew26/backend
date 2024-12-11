import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/300x200",
  },
  link: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
