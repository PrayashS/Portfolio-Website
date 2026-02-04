const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
app.use("/api/profile", require("./routes/profile"));
app.use("/api/experience", require("./routes/experience"));
app.use("/api/projects", require("./routes/project"));
app.use("/api/skills", require("./routes/skill"));
// REMOVED: app.use('/api/contact', require('./routes/contact'));

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Portfolio API Running" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
