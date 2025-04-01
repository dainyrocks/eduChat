const express = require("express");
const { uploadImage } = require("../Controllers/postUploadController");
const router = express.Router();

router.post("/postUpload", uploadImage);

module.exports = router;