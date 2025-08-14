//note: mongo generates unique id automatically and save in bson not json
// for avatar and coverimage: upload them in third party service : get the image url string and save url only in database
// mongo allows direct upload of small images as media files but bad preactice: heavy load on db
import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unque: true,
        lowercase: true,
        trim: true,
        index: true // makes the field searchable optimisely but expensive: comes in searching of DB : not compulsory but optimises search
    },
    
    email: {
        type: String,
        required: true,
        unque: true,
        lowercase: true,
        trim: true,
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String, // cloudinary url
        required: true,
    },
    coverImage: {
        type: String // cloudinary url
    },
    watchHistory: [ // multiple videos: make it array
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {  //! we dont store password as it is in DB(db may get leaked) :: store encrypted 

        type: String, //bcrypt
        required: [true, 'Password is required']
    },
    refreshToken :{ //* jwt
        type: String
    }
    
}, {
    timestamps: true
})

// direct encryption is not possible
//note: mongoose -> middlewares -> hooks -> prehook  (just before data is saved(by call/controller) run this hook)
userSchema.pre("save",async function(next) { // do just before save event
    // arrow functions doest have this reference . dont use here(we need current context user)
    // ecncryption takes time: make async
    // middleware: next must be there

    if(! this.isModified("password")) return next()
    
    this.password = bcrypt.hash(this.password, 10) //encrypt and modify the password
    next()
}) 
export const User = mongoose.model("User", userSchema)