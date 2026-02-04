const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: String,
    github: String,
    summary: { type: String, required: true },
    availability: String,
    graduationDate: String,
    resumeUrl: String,
    resumeFileName: String,
    cloudinaryPublicId: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Profile", ProfileSchema);
