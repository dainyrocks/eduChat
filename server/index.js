const express = require("express");
const app = express();
require("dotenv").config();
const bodyparser = require("body-parser");
const cors = require("cors");
const dbConnect = require("./Config/dbConnect");
const usersRoutes = require("./Routes/userRoutes");
const postUploadRoutes = require("./Routes/postUploadRoutes");
const authRoutes = require("./Routes/authRoutes");
const teacherRoutes = require("./Routes/teacherRoutes");
const subjectRoutes = require("./Routes/subjectRoutes");
const sessionRoutes = require("./Routes/sessionRoutes");

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("Pong");
});

dbConnect();

app.use(bodyparser.json());
app.use(cors());

app.use("/api", usersRoutes);
app.use("/api", postUploadRoutes);
app.use("/api", authRoutes);
app.use("/api", teacherRoutes);
app.use("/api", subjectRoutes);
app.use("/api", sessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
