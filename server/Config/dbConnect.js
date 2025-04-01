const mongoose = require("mongoose");

const mongo_url = process.env.MONGODB_CONN;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongo_url);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

module.exports = dbConnect;
