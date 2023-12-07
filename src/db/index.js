import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );
    console.log(`Mongo connected !! DB HOST: ${conn.connection.host}`)
  } catch (error) {
    console.log("Mongo connection error", error);
    process.exit(1);
  }
};

export default connectDB;
