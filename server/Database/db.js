const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = async () => {
  mongoose.connect(process.env.MONGO_URI);
};

module.exports = db;
