const express = require("express");
const { addSubject } = require("../Controllers/SubjectController");
const router = express.Router();

router.post("/add-subject", addSubject);

module.exports = router;
