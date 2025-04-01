const mongoose = require("mongoose");
const Teacher = require("../Models/Teachers");
const Subject = require("../Models/Subjects");
const fs = require("fs");
const csv = require("csv-parser");

const addTeacher = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Please upload a CSV file" });
    }
    const results = [];
    const filePath = req.file.path;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if ((row.usrename, row.subjects, row.designation)) {
          const subjects = row.subjects
            .split(",") // Split multiple IDs
            .map((id) => id.trim()) // Trim spaces
            .filter((id) => mongoose.Types.ObjectId.isValid(id));
          if (subjects.length > 0) {
            results.push({
              name: row.name,
              subjects,
              designation: row.designation,
            });
          }
        }
      })
      .on("end", async () => {
        try {
          const teachers = await Promise.all(
            results.map(async (teacherData) => {
              const subjectObjectIds = teacherData.subjects.map(
                (id) => new mongoose.Types.ObjectId(id)
              );
              const subjects = await Subject.find({
                _id: { $in: subjectObjectIds },
              });
              if (subjects.length !== subjectObjectIds.length) {
                throw new Error(`One or more Subject IDs are invalid`);
              }

              const branches = [...new Set(subjects.map((sub) => sub.branch))];
              const semesters = [
                ...new Set(subjects.map((sub) => sub.semester)),
              ];
              const teacher = new Teacher({
                name: teacherData.name,
                branch: branches,
                semester: semesters,
                designation: teacherData.designation,
                subjects: subjectObjectIds,
              });
              return await teacher.save();
            })
          );

          fs.unlinkSync(filePath);
          res
            .status(201)
            .json({ message: "Teachers added successfully", teachers });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const fetchAllTeacher = async (req, res) => {
  try {
    const teachers = await Teacher.find().populate("subjects", "name");
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchById = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).populate("subjects", "name");

    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ data: teacher, success: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Invalid ID format or server error", success: false });
  }
};

module.exports = { addTeacher, fetchAllTeacher, fetchById };
