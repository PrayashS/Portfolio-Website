const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  uploadResume,
  deleteResume,
} = require("../controllers/profileController");
const { auth, login } = require("../middleware/auth");
const { loginLimiter, apiLimiter } = require("../middleware/rateLimiter");
const upload = require("../middleware/upload");

// Public route (no rate limit needed for viewing)
router.get("/", getProfile);

// Login route with STRICT rate limiting (5 attempts per 15 min)
router.post("/login", loginLimiter, login);

// Protected routes with general API rate limiting (100 requests per 15 min)
router.put("/", auth, apiLimiter, updateProfile);
router.post(
  "/upload-resume",
  auth,
  apiLimiter,
  upload.single("resume"),
  uploadResume,
);
router.delete("/delete-resume", auth, apiLimiter, deleteResume);

module.exports = router;
