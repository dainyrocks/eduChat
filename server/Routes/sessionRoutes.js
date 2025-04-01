const express = require("express");
const { SessionStart } = require("../Controllers/SessionController");
const router = express.Router();

router.post('/session-start', SessionStart)

module.exports = router;