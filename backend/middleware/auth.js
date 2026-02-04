const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Middleware to verify JWT token
const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No authentication token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Login function with bcrypt password verification
const login = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    // Compare provided password with hashed password from environment
    const isValid = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH,
    );

    if (isValid) {
      // Create JWT token with 7 day expiration
      const token = jwt.sign(
        { admin: true, timestamp: Date.now() },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({
        token,
        message: "Login successful",
        expiresIn: "7d",
      });
    } else {
      // Don't reveal whether username or password was wrong
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = { auth, login };
