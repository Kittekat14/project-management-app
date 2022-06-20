const { cyan } = require("colors");
const mongoose = require("mongoose");

// connecting to MongoDB database over mongoose + using color package for console.log
const connectDB = async () => {
  const con = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${con.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
