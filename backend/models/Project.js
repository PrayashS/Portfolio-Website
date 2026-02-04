const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    role: String,
    technologies: [String],
    highlights: [String],
    githubLink: String,
    liveLink: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", ProjectSchema);
