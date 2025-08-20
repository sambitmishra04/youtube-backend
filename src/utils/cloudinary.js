import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

//note: as per our step: file on local server uploaded to cloudinary
//* give local path here
// after uploading to cloudinary remove file from local server

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//* method to upload 
const uploadOnCLoudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null // filepathnotgiven => return null or else can pass an error message

        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // auto-detect the file type
        }) //can give other options too :read docs

        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary ",response.url ) // log the whole response to study

        fs.unlinkSync(localFilePath) //unlink from local serverafter uploading
        return response 
        // return the whole response to user: can give the url only
        

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locallly saved temp file as the upload operation got failed
        return null
    }

}


export {uploadOnCLoudinary}