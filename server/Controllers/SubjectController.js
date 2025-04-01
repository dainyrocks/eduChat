const mongoose = require("mongoose");
const Subject = require("../Models/Subjects");

const addSubject = async (req, res) => {
  try {
    const { name, semester, branch } = req.body;
    const subject = new Subject({ name, semester, branch });
    await subject.save();
    res.status(201).json({ message: "Subject added successfully!", subject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addSubject };
