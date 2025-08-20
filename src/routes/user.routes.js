import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

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

export default router