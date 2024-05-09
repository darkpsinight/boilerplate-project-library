const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas: ", error.message);
  }
}

connectToDatabase();

module.exports = mongoose.connection;
