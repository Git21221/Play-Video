// import express from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user data from frontend
  const { fullName, username, email, password } = req.body;
  console.log(req.files);
  //validation - not empty
  if (
    [fullName, username, email, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "Must fill all field");
  }
  //check if user already exist (username / email)
  if (
    await User.findOne({
      $or: [{ username }, { email }],
    })
  ) {
    throw new apiError(409, "user already exists with same username or email");
  }
  //check for cover images, check for avater
  const avaterLocalPath = req.files?.avater[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avaterLocalPath) {
    throw new apiError(400, "Avater is required");
  }
  //upload to cloudinary
  const avater = await uploadOnCloudinary(avaterLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!avater) throw new apiError(400, "Avater is required");
  //create user object - create entry in DB
  const user = await User.create({
    fullName,
    avater: avater.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  //remove password and refreshToken field from response

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //check for user creation
  if (!createdUser)
    throw new apiError(500, "something went wrong while registration");
  //return res
  return res
    .status(201)
    .json(new apiResponse(200, createdUser, "User created successfully"));
});

export { registerUser };
