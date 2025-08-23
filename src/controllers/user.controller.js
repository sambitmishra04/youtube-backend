import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"  // to check if user already exists : made through mogoose: can contact directly with mongoDB :: it will call mongo
import { uploadOnCLoudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// separate method for tokens
const generateAceessAndRefreshTokens = async(userId) => {  // our internal method, not web request handler so asunc handler util not required
   try {
      const user = await User.findById(userId) // find user
      const accessToken = user.generateAceessToken()
      const refreshToken = user.generatRefreshToken()

      user.refreshToken = refreshToken // injecting refresh token to the user object, ie save to db
      await user.save({validateBeforeSave: false}) // save to db but dont validate all fields (we add only one field here, mongo wont save usually as we have given other fields as reuired also)

      return {accessToken, refreshToken}

   } catch (error) {
      throw new ApiError(500, "Something went wrong while generating refresh and access token") // 500 as our own internal server error
   }
}

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
   const existedUser = await User.findOne({ //must await everytimetalk with db
      //? operators
      $or: [{ username }, { email }]
   }) // returns the first document with matching username or email

   if (existedUser) { // user exists already
      throw new ApiError(409, "USer with email or username already exists")
   }

//   console.log(req.files)
   

   //! image file
   const avatarLocalPath = req.files?.avatar[0]?.path
  // const coverImageLocalPath = req.files?.coverImage[0]?.path

   let coverImageLocalPath
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
   }

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

//! login
const loginUser = asyncHandler(async (req,res) => {
   // req body -> data
   // username or email
   // find the user
   // password check
   // access and refresh token generate
   // send tokens through secure cookies

   //! req body
   const {email, username, password} = req.body

   //! username or email
   if (!username || !email) { // atleast one of these must be given by the user(login from either one of them)
      throw new ApiError(400, "username or email is required")
   }

   //! find user
   const user = await User.findOne({ // finds the first entry and return
      $or: [ {username}, {email}] // mongo operators => find users based on username or email basis.whatever found first returned
   })   

   if (!user) { // user nhi mila
      throw new ApiError(404, "User does not exist")
   }

   //! password check
   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials")
   }

   //! tokens
   //note: these tokens will be made a lot of times. make it a separeate method
   const {accessToken, refreshToken}= await generateAceessAndRefreshTokens(user._id)

   //! send cookies
   //? what information to send to user (we should not send password so remove it)(also it doesnt has refresh token its separate)
   const loggedInUser = await User.findById(user._id).
   select("-password -refreshToken")

   const options = { //* options for cookies
      httpOnly: true, 
      secure: true  // makes the cookie only server modifable (frontend can no longer modify cookies) just see it
   }

   return res
   .status(200)
   .cookie("accessToken", accessToken, options)
   .cookie("refreshToken", refreshToken, options)
   .json(
      new ApiResponse(
         200,
         {
            user: loggedInUser, accessToken, refreshToken // good practice to send again here
         },
         "User logged In Successfully"
      )
   ) // send the final json response
   // we can set multiple cookies with .cookie again and again
})


//! logout user

const logoutUser = asyncHandler(async(req, res) => {
   // clear cookies
   // reset refreshToken

   User.findById

   
})

export {
   registerUser,
   loginUser
}