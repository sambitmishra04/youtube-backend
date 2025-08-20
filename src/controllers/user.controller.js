import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"  // to check if user already exists : made through mogoose: can contact directly with mongoDB :: it will call mongo
import { uploadOnCLoudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//! logic building is dividing task into steps and solve each
const registerUser = asyncHandler( async (req, res) => {
   // get user details from frontend (using postman here) => all fields expect watch history and refresh token not needed at time of registration
   // validation - not empty ,correct format, etc(also done on frontend, better to also do on backend)
   // check if user already exists: username, email checking
   // check for images,check for avartar : these files taken at registration
   // upload them to cloudinary, avatar check uploaded(multer and cloudinary) :: and get the url
   // create user object(since mongo is noSQL) - create entry in db
   // remove password(although it is encrypted) and refresh token field from response returned( it has the whole created entry all fields)
   // check for user creation
   // return res else err


   // note: user details: req.body() has data from json/form. not has data from url
   const {fullName, email, username, password} = req.body // the fields are written in the user model
   console.log("email: ", email) // to test


   //! validation
   /*
   if (fullName === "") {
      // using self made ApiError util
      throw new ApiError(400, "fullname is required") // parameteres passed as we wriiten in util can check  
   }
   checking each field with if-else is lenghty(but it will work)
   */   
   if (
      // make an array and use array methods with it
      [fullName, email, username, password].some( (field) => field?.trim() === "")
      // return true if any one field is empty
   ) {
      throw new ApiError(400, "All fields are required")
   }
   //todo: add other validations like checking format of email, @ included or not
   //note: in production , there is separate files for validation


   //! user already exists
   const existedUser = User.findOne({
      //? operators
      $or: [{ username }, { email }]
   }) // returns the first document with matching username or email

   if (existedUser) { // user exists already
      throw new ApiError(409, "USer with email or username already exists")
   }
   

   //! image file
   const avatarLocalPath = req.files?.avatar[0]?.path
   const coverImageLocalPath = req.files?.coverImage[0]?.path

   if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
   }
   //todo: console.log(files) and othersfor study
   // avatar[0] first property has .path(gives multer uploaded path)
   // injected by multer middleware
   // files may not be available: chain optionally(?) better practice


   //! upload to cloudinary
   // takes local path: takes time to upload so await(dont proceed unless uploaded)

   const avatar = await uploadOnCLoudinary(avatarLocalPath)
   const coverImage = await uploadOnCLoudinary(coverImageLocalPath)

   //! check files 
   if (!avatar) {
       throw new ApiError(400, "Avatar file is required")
   }


   //! object entry to DB
   const user = await User.create({ // await as takes time
      fullName,
      avatar: avatar.url, // just save the url in db
      coverImage: coverImage?.url || "", // this field is not mandatory optional chainign: we also didnt pre validate it like avatar
      email,
      password,
      username: username.toLowerCase()
   })
   // any error on creation will be handled by asyncHandler util


   //! check if user was indeed created 
   //! also remove password and refreshToken
   const createdUser = await User.findById(user._id).select(  // auto-generated field by mongo _id
      "-password -refreshToken"
   ) // kya kya nhi chahiye with - at front


   //! check user created
   if (! createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user")
   }

   //! return response
   return res.status(201).json(
      new ApiResponse(200, createdUser, "User registered successfully")
   )

   

})

export {registerUser}