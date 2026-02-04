const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { auth } = require("../middleware/auth");
const { apiLimiter } = require("../middleware/rateLimiter");

// Public route (no rate limit needed)
router.get("/", getAllProjects);

// Protected routes with rate limiting (100 requests per 15 min)
router.post("/", auth, apiLimiter, createProject);
router.put("/:id", auth, apiLimiter, updateProject);
router.delete("/:id", auth, apiLimiter, deleteProject);

module.exports = router;
