import { Router } from "express";
import { logoutUser,loginUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// file uploading done here using upload from multer middleware
const router = Router()

router.route("/register").post(
    // injecting middleware: this injects file support to express req
    upload.fields([  // accepts array
        {
            name: "avatar", // name of first file
            maxCount: 1  // no. of avatar to accept
        },  
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),  
    registerUser
)
// whenver request is sent to /register the function registerUser executed : now add a middleware in between them

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT, logoutUser)  // injected the middleware, the methods will execute in the order mentioned and next() tells to run the next method
router.route("/refresh-token").post(refreshAccessToken)

export default router