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
    fullName: {
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
//note: mongoose -> middlewares -> hooks -> prehook  (just before data is saved(or any other event)(by call/controller) run this hook)
userSchema.pre("save",async function(next) { // do just before save event
    // arrow functions doest have this reference . dont use here(we need current context user)
    // ecncryption takes time: make async await
    // middleware: next must be there

    if(!this.isModified("password")) return next() //! encrypt password only when it is modified not everytime any other change is made to user data
    
    this.password = await bcrypt.hash(this.password, 10) //encrypt and modify the password
    next()
}) 

// designing and injecting custom methods (using methods object of mongoose)
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password) //* compare password entered by user and encrypted password in DB
    //* returns a bool
}


//! time for jwt tokens
// another method to generate access token
userSchema.methods.generateAccessToken = function() {
    //* it is fast: async not required
    return jwt.sign( // generateds token

        {   // payload : data to store
            _id:this._id,
            email: this.email, // can get this from db query not necessary to store here
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// another method to generate refresh token
userSchema.methods.generateRefeshToken = function() {
    //* it is fast: async not required
     return jwt.sign( 
        {   
            _id: this._id,
            //* refresh token gets refreshed repeatedly: so only store id(less data)
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)