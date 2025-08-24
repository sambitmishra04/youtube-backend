// self made middleware
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
// Verifies if usr there or not

export const verifyJWT = asyncHandler(async(req, _ , next) => { // res not used so can replace it with _
    try {
        const token = req.cookies?.accessToken || req.header("Authorisation")?.replace("Bearer ","")                //req has cookie access(by cookie parser) and cookie has auth tokens
        //also check custom header auth-> bearer : extract tokem from it
    
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }
    
        // now we have the token
    
        // verify the token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select   // in our model we had injected id to the tokem
        ("-password -refreshToken")
    
        if (!user) {
            //todo: discuss about frontend
            throw new ApiError(401, "Invalid Access Tokem")
        }
    
    
        // now we have the user
        req.user = user; // inject user to req body
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
    //* tru catch shortcut vscode
})