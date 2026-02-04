const express = require("express");
const router = express.Router();
const { sendContactEmail } = require("../utils/emailService");
const { apiLimiter } = require("../middleware/rateLimiter");

// Rate limit contact form to prevent spam (100 requests per 15 min)
router.post("/send", apiLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send email
    await sendContactEmail(name, email, message);

    res.json({
      success: true,
      message: "Message sent successfully! I will get back to you soon.",
    });
  } catch (error) {
    console.error("Contact route error:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message. Please try again or email directly.",
    });
  }
});

module.exports = router;
