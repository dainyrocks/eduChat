const express = require("express");
const {
  addTeacher,
  fetchAllTeacher,
  fetchById,
} = require("../Controllers/TeacherController");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/add-teacher", upload.single("file"), addTeacher);
router.get("/fetachAllTeacher", fetchAllTeacher);
router.get("/teachers/:id", fetchById);

module.exports = router;
