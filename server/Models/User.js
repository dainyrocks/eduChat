const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postCaption: { type: String, required: true },
  postImageUri: { type: String },
  postVideoUri: { type: String },
  likes: { type: Number, default: 0 },
  postTime: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  passcode: { type: String },
  avatarUri: { type: String, required: true },
  branch: { type: String, required: true },
  enrollment: { type: String, required: true },
  semester: { type: String, required: true },
  type: {
    type: String,
    default: "student",
    required: true,
  },
  posts: [postSchema],
});

module.exports = mongoose.model("Students", userSchema);
