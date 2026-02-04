const express = require("express");
const router = express.Router();
const {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");
const { auth } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Public route (no rate limit needed)
router.get("/", getAllSkills);

// Protected routes with rate limiting (100 requests per 15 min)
router.post("/", auth, apiLimiter, createSkill);
router.put("/:id", auth, apiLimiter, updateSkill);
router.delete("/:id", auth, apiLimiter, deleteSkill);

module.exports = router;
