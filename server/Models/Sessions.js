const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classNumber: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  teacherLocation: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
