const mongoose = require("mongoose");

const teacherSubjectSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }] // Array of subjects
});

module.exports = mongoose.model("TeacherSubject", teacherSubjectSchema);
