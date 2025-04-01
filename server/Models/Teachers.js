const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const postSchema = new mongoose.Schema({
  postCaption: { type: String },
  postImageUri: { type: String },
  postVideoUri: { type: String },
  likes: { type: Number, default: 0 },
  postTime: { type: Date, default: Date.now },
});

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  branch: [{ type: String }],
  designation: { type: String, required: true },
  username: { type: String, unique: true },
  password: { type: String },
  passcode: { type: String },
  avatarUri: { type: String },
  type: {
    type: String,
    enum: ["teacher", "hod", "principal", "admin"],
    default: "teacher",
  },
  semester: [{ type: String }],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  posts: [postSchema],
});

teacherSchema.pre("save", async function (next) {
  if (!this.username) {
    this.username =
      this.name.toLowerCase().replace(/\s+/g, "") +
      Math.floor(1000 + Math.random() * 9000);
  }
  if (!this.password) {
    const randomPassword = Math.random().toString(36).slice(-8);
    this.password = await bcrypt.hash(randomPassword, 10);
  }
  if (!this.passcode) {
    this.passcode = Math.random().toString(36).slice(-6).toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Teacher", teacherSchema);
