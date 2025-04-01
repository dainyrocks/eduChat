const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  semester: { type: String, required: true },
  branch: { type: String, required: true },
  type: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
    required: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
