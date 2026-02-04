const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["Basic", "Intermediate", "Advanced", "Learning"],
      default: "Intermediate",
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Skill", SkillSchema);
