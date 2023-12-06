import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import { v2 as cloudinary } from "cloudinary";
import { response } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (fileLocationPath) => { 
  try {
    if(!fileLocationPath) return null;
    cloudinary.uploader.upload(fileLocationPath, {
      resource_type: "auto"
    })
    //file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(fileLocationPath) //remove locally saved temporary file as upload opearation failed
    return null;
  }
};

export {uploadOnCloudinary}