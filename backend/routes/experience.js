const express = require("express");
const router = express.Router();
const {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");
const { auth } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Public route (no rate limit needed)
router.get("/", getAllExperiences);

// Protected routes with rate limiting (100 requests per 15 min)
router.post("/", auth, apiLimiter, createExperience);
router.put("/:id", auth, apiLimiter, updateExperience);
router.delete("/:id", auth, apiLimiter, deleteExperience);

module.exports = router;
