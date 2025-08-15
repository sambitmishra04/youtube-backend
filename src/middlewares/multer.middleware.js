import multer from "multer"
//todo: multer github readme
// we use disk storage instead of memory buffer storage here: limited memory

/*
file is with multer
req is from user(json data in body)
file has all files(if file sent by user)
file cant be configured in express so we use multer
*/
const storage = multer.diskStorage({
    destination: function (req,file,cb) { 
        cb(null, "./public/temp")    // cb is callback, the destination where we store files temporarily in local server
    },
    filename: function (req, file, cb) { // what filename we want to give
        cb(null, file.originalname) // user uploaded original name: not good practice: same name files may over-write :: no worry cause we keep in short time in temp quick upload to cloudinary
    }
})

export const upload = multer({
    // storage: storage
    storage, // es-6 new syntax
})