const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "portfolio-resumes",
    allowed_formats: ["pdf", "doc", "docx"],
    resource_type: "raw",
    public_id: (req, file) => {
      return "resume-" + Date.now();
    },
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());

    if (extname) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, DOC, and DOCX files allowed!"));
    }
  },
});

module.exports = upload;
