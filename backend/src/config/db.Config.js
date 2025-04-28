const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
mongoose.Promise = global.Promise;

// Conecta ao MongoDB
const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  });
};

module.exports = {
  mongoose,
  connectDB,
};
