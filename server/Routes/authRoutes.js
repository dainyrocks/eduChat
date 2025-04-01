const express = require("express");
const authenticateToken = require("../Middlewares/authMiddleware");
const {
  loginUser,
  storePasscode,
  verifyPasscode,
  checkingPasscode,
  teacherLogin,
  teacherPasswordChange,
  teacherPasscodeCheck,
  teacherPasscodeVerify,
  teacherPasscodeStore,
} = require("../Controllers/AuthController");

const router = express.Router();

router.post("/user-login", loginUser);
router.post("/teacher-login", teacherLogin);
router.post(
  "/teacher-password-change",
  authenticateToken,
  teacherPasswordChange
);
router.post("/store-passcode", storePasscode);
router.post("/teacher-passcode-store", teacherPasscodeStore);
router.post("/verify-passcode", verifyPasscode);
router.post("/teacher-passcode-verify", teacherPasscodeVerify);
router.get("/check-passcode", checkingPasscode);
router.get("/teacher-passcode-check", teacherPasscodeCheck);

module.exports = router;
