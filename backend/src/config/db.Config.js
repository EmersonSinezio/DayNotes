const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI não definida no .env");
}

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set("strictQuery", true);
const mongooseOptions = {
  serverSelectionTimeoutMS: 15000,
  socketTimeoutMS: 30000,
  ssl: true,
  tlsAllowInvalidCertificates: false,
};

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  try {
    cached.promise = mongoose
      .connect(MONGODB_URI, mongooseOptions)
      .then((mongoose) => {
        return mongoose;
      });

    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw new Error("Falha na conexão com o MongoDB");
  }

  return cached.conn;
};
module.exports = { mongoose, connectDB };
