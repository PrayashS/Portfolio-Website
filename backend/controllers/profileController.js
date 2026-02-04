const Profile = require("../models/Profile");
const cloudinary = require("../config/cloudinary");

exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create({
        name: "Prayash Kumar Shrestha",
        title: "QA Engineer | MSc Computing Student",
        email: "shresthaprayash023@gmail.com",
        phone: "07751899592",
        location: "45 Becknham Rd, London",
        linkedin: "www.linkedin.com/in/prayash-stha023",
        summary:
          "QA Engineer with 2 years of professional experience transitioning into software engineering and test automation.",
        availability: "Up to 20 hours/week",
        graduationDate: "September 2026",
      });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profile = await Profile.findOne();

    if (profile && profile.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(profile.cloudinaryPublicId, {
          resource_type: "raw",
        });
        console.log("Old resume deleted from Cloudinary");
      } catch (err) {
        console.log("Error deleting old resume:", err);
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      {
        resumeUrl: req.file.path,
        resumeFileName: req.file.originalname,
        cloudinaryPublicId: req.file.filename,
      },
      { new: true, upsert: true },
    );

    res.json({
      message: "Resume uploaded successfully",
      resumeUrl: req.file.path,
      fileName: req.file.originalname,
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const profile = await Profile.findOne();

    if (!profile || !profile.cloudinaryPublicId) {
      return res.status(404).json({ message: "No resume found" });
    }

    await cloudinary.uploader.destroy(profile.cloudinaryPublicId, {
      resource_type: "raw",
    });
    console.log("Resume deleted from Cloudinary");

    profile.resumeUrl = null;
    profile.resumeFileName = null;
    profile.cloudinaryPublicId = null;
    await profile.save();

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};
