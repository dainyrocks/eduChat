const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const Teachers = require("../Models/Teachers");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ success: true, token, userId: user._id, userType: user.type });
  } catch (error) {
    res.status(501).json("Login error:", error);
  }
};

const teacherLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Teachers.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password." });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({
        message: "Wrong password, try again and reset password",
        success: false,
      });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ success: true, token, userId: user._id, userType: user.type });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const teacherPasswordChange = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const loggedInUserId = req.headers["userid"];

    const user = await Teachers.findOne({ _id: loggedInUserId });
    if (!user) {
      return res.status(410).json({
        message: "Id not found",
        success: false,
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(410).json({
        message: "New password cannot be the same as the current password",
        success: false,
      });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();
    res.status(203).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const storePasscode = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { passcode } = req.body;

    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const user = await User.findById(userId);

    if (user) {
      user.passcode = hashedPasscode;
      await user.save();
    }
    return res
      .status(201)
      .json({ success: true, message: "Passcode Generated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Error storing passcode" });
  }
};

const teacherPasscodeStore = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { passcode } = req.body;

    const hashedPasscode = await bcrypt.hash(passcode, 10);
    const user = await Teachers.findById(userId);

    if (user) {
      user.passcode = hashedPasscode;
      await user.save();
    }
    return res
      .status(201)
      .json({ success: true, message: "Passcode Generated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Error storing passcode" });
  }
};

const verifyPasscode = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { passcode } = req.body;
    const user = await User.findById(userId);

    if (user) {
      isPasscodeEqual = await bcrypt.compare(passcode, user.passcode);
      if (isPasscodeEqual) {
        res.status(200).json({ success: true, message: "Passcode verified" });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Passcode Verifying Failed" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Error verifying passcode" });
  }
};

const teacherPasscodeVerify = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const { passcode } = req.body;
    const user = await Teachers.findById(userId);

    if (user) {
      isPasscodeEqual = await bcrypt.compare(passcode, user.passcode);
      if (isPasscodeEqual) {
        res.status(200).json({ success: true, message: "Passcode verified" });
      } else {
        res
          .status(200)
          .json({ success: false, message: "Passcode Verifying Failed" });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Error verifying passcode" });
  }
};

const checkingPasscode = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const user = await User.findById(userId);

    if (user.passcode) {
      return res
        .status(200)
        .json({ success: true, message: "Passcode exists" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No passcode stored" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking passcode" });
  }
};

const teacherPasscodeCheck = async (req, res) => {
  try {
    const userId = req.headers.userid;
    const user = await Teachers.findById(userId);

    if (user.passcode) {
      return res
        .status(200)
        .json({ success: true, message: "Passcode exists" });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "No passcode stored" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error checking passcode" });
  }
};

module.exports = {
  loginUser,
  teacherLogin,
  teacherPasswordChange,
  storePasscode,
  teacherPasscodeStore,
  verifyPasscode,
  teacherPasscodeVerify,
  checkingPasscode,
  teacherPasscodeCheck,
};
