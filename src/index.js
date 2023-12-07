// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
  path: './env'
})
connectDB()
.then(() => {
  app.listen(process.env.PORT || 9000, () => {
    console.log(`app is listening on ${process.env.PORT}`);
  });

})
.catch(error => console.error(error))









/*
import { express } from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
    app.on("error", (error) => {
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log("APp is listening");
    });
  } catch (error) {
    console.log(error);
  }
})();
*/
