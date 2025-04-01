const express = require("express");
const {
  addSampleUsers,
  getUsersWithPosts,
  singleUserData,
  searchUser,
  fetchDataBySemBranch,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/add-sample", addSampleUsers);
router.get("/users-with-posts", getUsersWithPosts);
router.get("/single-user-data/:userId", singleUserData);
router.get("/profile-search", searchUser);
router.post("/get-Student-Data", fetchDataBySemBranch);

module.exports = router;
